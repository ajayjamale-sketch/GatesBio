import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import PrintIcon from '@mui/icons-material/Print';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import SearchIcon from '@mui/icons-material/Search';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import type { BioSample, SampleType } from '../../../types';
import type { DashboardSession, SampleCustodyEvent } from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';
import { WorkstationSplitView } from '../shared/WorkstationSplitView';

interface TechSampleRegistryPanelProps {
  session: DashboardSession;
  samples: BioSample[];
  custodyEvents: SampleCustodyEvent[];
  onAccessionSample: (sample: BioSample, event: SampleCustodyEvent) => void;
  onBulkAccession: (newSamples: BioSample[], events: SampleCustodyEvent[]) => void;
  onCustodyAction: (updatedSample: BioSample, event: SampleCustodyEvent) => void;
  onOpenBarcode: (sample: BioSample) => void;
  onNotify: (msg: string) => void;
}

const ALL_SAMPLE_TYPES: SampleType[] = [
  'DNA',
  'RNA',
  'Blood',
  'Cell Line',
  'Tissue',
  'Protein',
  'Serum',
  'Plasmid',
  'Reagent',
  'Synthetic',
];

const FREEZERS = [
  'Cryo-Freezer Ultra -80°C #01',
  'Cryo-Freezer Ultra -80°C #02',
  'Freezer -20°C Unit #05',
  'Cold Storage Room 4°C Unit #3',
];

export const TechSampleRegistryPanel: React.FC<TechSampleRegistryPanelProps> = ({
  session,
  samples,
  custodyEvents,
  onAccessionSample,
  onBulkAccession,
  onCustodyAction,
  onOpenBarcode,
  onNotify,
}) => {
  // Barcode Scan / Lookup
  const [scanInput, setScanInput] = useState('');
  const [scannedId, setScannedId] = useState<string | null>(null);

  // Quick Accession Form
  const [newSampleName, setNewSampleName] = useState('');
  const [newSampleType, setNewSampleType] = useState<SampleType>('DNA');
  const [newSampleVol, setNewSampleVol] = useState('50');
  const [newFreezer, setNewFreezer] = useState(FREEZERS[0]);
  const [newShelf, setNewShelf] = useState('2');
  const [newRack, setNewRack] = useState('Rack A');
  const [newBox, setNewBox] = useState('BX-NEW-01');
  const [newWell, setNewWell] = useState('A1');

  // Bulk Entry Dialog
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkText, setBulkText] = useState(
    'PBMC-CohortB-01, Blood, 100\nKRAS-sgRNA-Pool2, DNA, 50\nLNP-Batch-19, Synthetic, 75'
  );

  // Rich Custody Action Modal
  const [custodyTarget, setCustodyTarget] = useState<BioSample | null>(null);
  const [custodyAction, setCustodyAction] = useState<SampleCustodyEvent['action']>('CHECK_OUT');
  const [custodyPurpose, setCustodyPurpose] = useState('RT-qPCR / NGS assay preparation');
  const [volumeConsumed, setVolumeConsumed] = useState('5');

  // Custody History Drawer
  const [historySample, setHistorySample] = useState<BioSample | null>(null);

  const handleScanLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const token = scanInput.trim().toLowerCase();
    if (!token) return;
    const match = samples.find(
      (s) => s.id.toLowerCase() === token || s.barcode.toLowerCase() === token
    );
    if (match) {
      setScannedId(match.id);
      onNotify(`Barcode verified (100% match): ${match.id} · ${match.name}`);
    } else {
      setScannedId(null);
      onNotify(`No specimen matched barcode "${scanInput.trim()}".`);
    }
  };

  const handleSingleAccession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSampleName.trim()) return;
    const nextNum = 9045 + samples.length;
    const vol = Number(newSampleVol) || 50;
    const id = `SMP-2026-${nextNum}`;
    const created: BioSample = {
      id,
      barcode: `GB-${nextNum}-${newSampleType.slice(0, 3).toUpperCase()}`,
      name: newSampleName.trim(),
      type: newSampleType,
      volumeUl: vol,
      initialVolumeUl: vol,
      concentrationNgPerUl: 112.4,
      freezeThawCycles: 0,
      maxRecommendedCycles: 4,
      storageLocation: {
        facility: 'Boston BioHub Bldg 4',
        freezer: newFreezer,
        shelf: Number(newShelf) || 1,
        rack: newRack.trim() || 'Rack A',
        boxId: newBox.trim() || 'BX-NEW-01',
        well: newWell.trim() || 'A1',
      },
      custody: {
        holder: session.userName,
        department: session.department,
        updatedAt: new Date().toISOString(),
      },
      status: 'Available',
      qcPassed: true,
    };
    const ev: SampleCustodyEvent = {
      id: `CUS-${101 + custodyEvents.length}`,
      sampleId: id,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC',
      actor: session.userName,
      action: 'ACCESSION',
      purpose: 'Specimen accessioning & barcode registration',
      volumeConsumedUl: 0,
      freezeThawAfter: 0,
      location: `${created.storageLocation.freezer} · ${created.storageLocation.rack} · ${created.storageLocation.boxId} (${created.storageLocation.well})`,
    };
    onAccessionSample(created, ev);
    setNewSampleName('');
    setScannedId(created.id);
    onOpenBarcode(created);
  };

  const handleBulkSubmit = () => {
    const lines = bulkText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length === 0) return;

    const createdList: BioSample[] = [];
    const createdEvents: SampleCustodyEvent[] = [];
    lines.forEach((line, idx) => {
      const [rawName, rawType, rawVol] = line.split(',').map((p) => p.trim());
      if (!rawName) return;
      const typeMatch = ALL_SAMPLE_TYPES.find((t) => t.toLowerCase() === (rawType || '').toLowerCase()) ?? 'DNA';
      const vol = Number(rawVol) || 50;
      const nextNum = 9045 + samples.length + idx;
      const id = `SMP-2026-${nextNum}`;
      const sample: BioSample = {
        id,
        barcode: `GB-${nextNum}-${typeMatch.slice(0, 3).toUpperCase()}`,
        name: rawName,
        type: typeMatch,
        volumeUl: vol,
        initialVolumeUl: vol,
        concentrationNgPerUl: 98.5,
        freezeThawCycles: 0,
        maxRecommendedCycles: 4,
        storageLocation: {
          facility: 'Boston BioHub Bldg 4',
          freezer: newFreezer,
          shelf: Number(newShelf) || 1,
          rack: newRack,
          boxId: newBox,
          well: `A${idx + 1}`,
        },
        custody: {
          holder: session.userName,
          department: session.department,
          updatedAt: new Date().toISOString(),
        },
        status: 'Available',
        qcPassed: true,
      };
      createdList.push(sample);
      createdEvents.push({
        id: `CUS-${101 + custodyEvents.length + idx}`,
        sampleId: id,
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC',
        actor: session.userName,
        action: 'ACCESSION',
        purpose: 'Bulk CSV accession import',
        volumeConsumedUl: 0,
        freezeThawAfter: 0,
        location: `${sample.storageLocation.freezer} · ${sample.storageLocation.boxId} (${sample.storageLocation.well})`,
      });
    });

    if (createdList.length > 0) {
      onBulkAccession(createdList, createdEvents);
      setBulkOpen(false);
    }
  };

  const openCustodyDialog = (sample: BioSample) => {
    setCustodyTarget(sample);
    setCustodyAction(sample.status === 'Available' ? 'CHECK_OUT' : 'RETURN');
    setCustodyPurpose('Assay aliquot preparation');
    setVolumeConsumed('5');
  };

  const handleConfirmCustody = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custodyTarget) return;
    const consumed = custodyAction === 'CHECK_OUT' || custodyAction === 'ALIQUOT' ? Math.max(0, Number(volumeConsumed) || 0) : 0;
    const nextVol = Math.max(0, Math.round((custodyTarget.volumeUl - consumed) * 10) / 10);
    const incrementCycle = custodyAction === 'CHECK_OUT' || custodyAction === 'ALIQUOT' ? 1 : 0;
    const nextCycles = custodyTarget.freezeThawCycles + incrementCycle;

    let nextStatus = custodyTarget.status;
    if (custodyAction === 'CHECK_OUT') nextStatus = 'In Use';
    else if (custodyAction === 'RETURN') nextStatus = nextVol <= 0 ? 'Depleted' : 'Available';
    else if (custodyAction === 'ALIQUOT') nextStatus = nextVol <= 0 ? 'Depleted' : custodyTarget.status;
    else if (custodyAction === 'QUARANTINE') nextStatus = 'Quarantined';
    else if (custodyAction === 'DISPOSE') nextStatus = 'Disposed';

    const updatedSample: BioSample = {
      ...custodyTarget,
      volumeUl: nextVol,
      freezeThawCycles: nextCycles,
      status: nextStatus,
      custody: {
        holder: session.userName,
        department: session.department,
        updatedAt: new Date().toISOString(),
      },
    };
    const ev: SampleCustodyEvent = {
      id: `CUS-${101 + custodyEvents.length}`,
      sampleId: custodyTarget.id,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC',
      actor: session.userName,
      action: custodyAction,
      purpose: custodyPurpose.trim() || custodyAction,
      volumeConsumedUl: consumed,
      freezeThawAfter: nextCycles,
      location:
        custodyAction === 'DISPOSE'
          ? 'Biohazard Disposal Log'
          : `${custodyTarget.storageLocation.freezer} · ${custodyTarget.storageLocation.boxId} (${custodyTarget.storageLocation.well ?? 'A1'})`,
    };
    onCustodyAction(updatedSample, ev);
    setCustodyTarget(null);
  };

  return (
    <>
      <WorkstationSplitView
        primary={
          <Paper
            elevation={0}
            sx={{ p: { xs: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}
          >
            <DashboardSectionHeader
              title="Specimen Registry & Barcode Queue"
              subtitle="Scan barcodes, inspect freeze-thaw limits, and record aliquot consumption"
              moduleRef="2.3"
              rightSlot={
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<UploadFileIcon fontSize="small" />}
                  onClick={() => setBulkOpen(true)}
                  sx={{ borderColor: '#CBD5E1', color: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}
                >
                  Bulk Accession
                </Button>
              }
            />

            {/* Barcode Scanner / Verification Bar (PRD 3.2.2 & 8) */}
            <form onSubmit={handleScanLookup}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  size="small"
                  fullWidth
                  value={scanInput}
                  onChange={(e) => setScanInput(e.target.value)}
                  placeholder="Scan or enter Sample ID / Barcode (e.g. SMP-2026-9041 or GB-9041-DNA)..."
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <QrCodeScannerIcon sx={{ color: '#1E40AF', fontSize: 18 }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px', bgcolor: '#F8FAFC' } }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SearchIcon fontSize="small" />}
                  sx={{ bgcolor: '#1E40AF', '&:hover': { bgcolor: '#1E3A8A' }, fontWeight: 700, borderRadius: '6px', whiteSpace: 'nowrap' }}
                >
                  Verify Scan
                </Button>
              </Box>
            </form>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              {samples.map((s) => {
                const isScanned = scannedId === s.id;
                const cycleWarning = s.freezeThawCycles >= s.maxRecommendedCycles - 1;
                return (
                  <Box
                    key={s.id}
                    sx={{
                      p: 1.75,
                      borderRadius: '8px',
                      border: isScanned ? '2px solid #1E40AF' : '1px solid #E2E8F0',
                      bgcolor: isScanned ? '#EFF6FF' : '#F8FAFC',
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      flexWrap: { sm: 'wrap' },
                      alignItems: { xs: 'stretch', sm: 'center' },
                      justifyContent: 'space-between',
                      gap: 1.5,
                    }}
                  >
                    <Box sx={{ minWidth: 0, flex: { xs: 'none', sm: '1 1 220px' } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', fontFamily: 'var(--font-mono)' }}>
                          {s.id} ({s.barcode})
                        </Typography>
                        <Chip label={s.type} size="small" sx={{ height: 19, fontSize: '10px', fontWeight: 700, borderRadius: '4px' }} />
                        <StatusChip label={s.status} />
                        {cycleWarning && (
                          <Chip
                            icon={<WarningAmberIcon sx={{ fontSize: '13px !important', color: '#B45309 !important' }} />}
                            label={`F/T ${s.freezeThawCycles}/${s.maxRecommendedCycles}`}
                            size="small"
                            sx={{ height: 19, fontSize: '10px', fontWeight: 800, bgcolor: '#FFFBEB', color: '#92400E', borderRadius: '4px' }}
                          />
                        )}
                      </Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', mt: 0.35 }}>
                        {s.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                        {s.volumeUl}/{s.initialVolumeUl} µL · F/T Cycles: {s.freezeThawCycles}/{s.maxRecommendedCycles} · {s.storageLocation.freezer} · Box {s.storageLocation.boxId} ({s.storageLocation.well})
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<HistoryIcon sx={{ fontSize: '15px !important' }} />}
                        onClick={() => setHistorySample(s)}
                        sx={{ borderColor: '#CBD5E1', color: '#334155', fontWeight: 700, borderRadius: '6px' }}
                      >
                        History
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<PrintIcon sx={{ fontSize: '15px !important' }} />}
                        onClick={() => onOpenBarcode(s)}
                        sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 700, borderRadius: '6px' }}
                      >
                        Barcode
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => openCustodyDialog(s)}
                        sx={{ bgcolor: '#1E40AF', '&:hover': { bgcolor: '#1E3A8A' }, fontWeight: 700, borderRadius: '6px' }}
                      >
                        Custody
                      </Button>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Paper>
        }
        inspector={
          <Paper
            elevation={0}
            sx={{ p: { xs: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5 }}>
              Quick Sample Accessioning
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2 }}>
              Assigns freezer coordinates and prints Code 128 + 2D QR/DataMatrix label.
            </Typography>
            <form onSubmit={handleSingleAccession}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <TextField
                  label="Specimen Name / Cell Line"
                  size="small"
                  fullWidth
                  required
                  placeholder="e.g. PBMC-Donor-409"
                  value={newSampleName}
                  onChange={(e) => setNewSampleName(e.target.value)}
                />
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.25, '& > *': { minWidth: 0 } }}>
                  <TextField
                    select
                    label="Specimen Type"
                    size="small"
                    fullWidth
                    value={newSampleType}
                    onChange={(e) => setNewSampleType(e.target.value as SampleType)}
                  >
                    {ALL_SAMPLE_TYPES.map((t) => (
                      <MenuItem key={t} value={t}>
                        {t}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label="Volume (µL)"
                    type="number"
                    size="small"
                    fullWidth
                    value={newSampleVol}
                    onChange={(e) => setNewSampleVol(e.target.value)}
                  />
                </Box>
                <TextField
                  select
                  label="Storage Freezer"
                  size="small"
                  fullWidth
                  value={newFreezer}
                  onChange={(e) => setNewFreezer(e.target.value)}
                >
                  {FREEZERS.map((f) => (
                    <MenuItem key={f} value={f}>
                      {f}
                    </MenuItem>
                  ))}
                </TextField>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(4, minmax(0, 1fr))' }, gap: 1, '& > *': { minWidth: 0 } }}>
                  <TextField label="Shelf" size="small" value={newShelf} onChange={(e) => setNewShelf(e.target.value)} />
                  <TextField label="Rack" size="small" value={newRack} onChange={(e) => setNewRack(e.target.value)} />
                  <TextField label="Box" size="small" value={newBox} onChange={(e) => setNewBox(e.target.value)} />
                  <TextField label="Well" size="small" value={newWell} onChange={(e) => setNewWell(e.target.value)} />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{ bgcolor: '#1E40AF', '&:hover': { bgcolor: '#1E3A8A' }, fontWeight: 700, py: 1.1, borderRadius: '6px' }}
                >
                  Accession & Generate Barcode
                </Button>
              </Box>
            </form>
          </Paper>
        }
      />

      {/* Bulk Accession Dialog */}
      <Dialog open={bulkOpen} onClose={() => setBulkOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Bulk Specimen Accessioning (CSV Lines)</DialogTitle>
        <DialogContent dividers>
          <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 1.5 }}>
            Enter one sample per line using <code>Name, Type, Volume_uL</code>. All items inherit the selected freezer/rack coordinates.
          </Typography>
          <TextField
            multiline
            rows={5}
            fullWidth
            size="small"
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
            sx={{ fontFamily: 'var(--font-mono)' }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setBulkOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleBulkSubmit} sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}>
            Import & Accession All
          </Button>
        </DialogActions>
      </Dialog>

      {/* Rich Chain-of-Custody Action Dialog */}
      <Dialog open={Boolean(custodyTarget)} onClose={() => setCustodyTarget(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>
          Chain of Custody — {custodyTarget?.id}
        </DialogTitle>
        <form onSubmit={handleConfirmCustody}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {custodyTarget && custodyTarget.freezeThawCycles >= custodyTarget.maxRecommendedCycles - 1 && (
              <Box sx={{ p: 1.25, borderRadius: '6px', bgcolor: '#FFFBEB', border: '1px solid #FDE68A' }}>
                <Typography variant="caption" sx={{ color: '#92400E', fontWeight: 700 }}>
                  Freeze-Thaw Warning: {custodyTarget.freezeThawCycles}/{custodyTarget.maxRecommendedCycles} recommended cycles used.
                </Typography>
              </Box>
            )}
            <TextField
              select
              label="Custody Action"
              size="small"
              fullWidth
              value={custodyAction}
              onChange={(e) => setCustodyAction(e.target.value as SampleCustodyEvent['action'])}
            >
              <MenuItem value="CHECK_OUT">Check Out Vial (Increment F/T)</MenuItem>
              <MenuItem value="ALIQUOT">Consume Aliquot Volume</MenuItem>
              <MenuItem value="RETURN">Return to Cryo Location</MenuItem>
              <MenuItem value="QUARANTINE">Quarantine (QC / Contamination)</MenuItem>
              <MenuItem value="DISPOSE">Dispose Specimen (Biohazard Log)</MenuItem>
            </TextField>
            {(custodyAction === 'CHECK_OUT' || custodyAction === 'ALIQUOT') && (
              <TextField
                label="Aliquot Volume Consumed (µL)"
                type="number"
                size="small"
                fullWidth
                value={volumeConsumed}
                onChange={(e) => setVolumeConsumed(e.target.value)}
                helperText={`Available: ${custodyTarget?.volumeUl ?? 0} µL`}
              />
            )}
            <TextField
              label="Purpose / Assay Reference"
              size="small"
              fullWidth
              required
              value={custodyPurpose}
              onChange={(e) => setCustodyPurpose(e.target.value)}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setCustodyTarget(null)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}>
              Log Custody Event
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Custody Audit Drawer */}
      <Drawer
        anchor="right"
        open={Boolean(historySample)}
        onClose={() => setHistorySample(null)}
        slotProps={{ paper: { sx: { width: { xs: '100%', sm: 420 }, p: 3 } } }}
      >
        {historySample && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                  {historySample.id}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  Chain-of-Custody Log
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => setHistorySample(null)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              {custodyEvents
                .filter((ev) => ev.sampleId === historySample.id)
                .map((ev) => (
                  <Box key={ev.id} sx={{ p: 1.5, borderRadius: '8px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Chip size="small" label={ev.action} sx={{ height: 20, bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 800, fontSize: '10px', borderRadius: '4px' }} />
                      <Typography variant="caption" sx={{ color: '#64748B' }}>{ev.timestamp}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>
                      {ev.purpose}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#475569', display: 'block' }}>
                      Actor: {ev.actor} · Consumed: {ev.volumeConsumedUl} µL · F/T: {ev.freezeThawAfter}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                      {ev.location}
                    </Typography>
                  </Box>
                ))}
              {custodyEvents.filter((ev) => ev.sampleId === historySample.id).length === 0 && (
                <Typography variant="body2" sx={{ color: '#64748B' }}>
                  Last held by {historySample.custody.holder} ({historySample.custody.department}).
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </Drawer>
    </>
  );
};
