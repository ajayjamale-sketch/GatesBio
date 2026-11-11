import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import type {
  ClinicalBiospecimen,
  ClinicalParticipant,
  DashboardSession,
} from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';
import { BarcodeLabelModal } from '../shared/BarcodeLabelModal';

interface ClinicalBiospecimensPanelProps {
  session: DashboardSession;
  participants: ClinicalParticipant[];
  biospecimens: ClinicalBiospecimen[];
  onAddSpecimen: (spec: ClinicalBiospecimen) => void;
  onUpdateSpecimen: (spec: ClinicalBiospecimen) => void;
  onNotify: (msg: string) => void;
}

const SPECIMEN_TYPES: ClinicalBiospecimen['specimenType'][] = [
  'Whole Blood',
  'Plasma / Serum',
  'FFPE Tissue',
  'cfDNA',
  'PBMC',
];

export const ClinicalBiospecimensPanel: React.FC<ClinicalBiospecimensPanelProps> = ({
  session,
  participants,
  biospecimens,
  onAddSpecimen,
  onUpdateSpecimen,
  onNotify,
}) => {
  const [drawOpen, setDrawOpen] = useState(false);
  const [barcodeTarget, setBarcodeTarget] = useState<ClinicalBiospecimen | null>(null);

  const [subjectCode, setSubjectCode] = useState(participants[0]?.subjectCode ?? 'SUBJ-0842');
  const [specimenType, setSpecimenType] = useState<ClinicalBiospecimen['specimenType']>('cfDNA');
  const [volumeMl, setVolumeMl] = useState('4.0');
  const [storageLocation, setStorageLocation] = useState('Cryo Vault ULT-01 · Rack C · Box CLN-04');
  const [attachment, setAttachment] = useState('FACS_Biomarker_Panel.fcs');

  const handleLogDraw = (e: React.FormEvent) => {
    e.preventDefault();
    const participant = participants.find((p) => p.subjectCode === subjectCode) ?? participants[0];
    const nextNum = 8421 + biospecimens.length;
    const created: ClinicalBiospecimen = {
      vialId: `SMP-CLN-${nextNum}`,
      subjectCode: participant?.subjectCode ?? subjectCode,
      trialId: participant?.trialId ?? 'VGB-ONC-204',
      specimenType,
      volumeMl: Number(volumeMl) || 4.0,
      storageLocation: storageLocation.trim() || 'Cryo Vault ULT-01',
      custodyStatus: 'Available',
      clinicalAttachment: attachment.trim() || undefined,
      lastUpdatedBy: session.userName,
    };
    onAddSpecimen(created);
    setDrawOpen(false);
    setBarcodeTarget(created);
    onNotify(`Logged blinded biospecimen draw ${created.vialId} for ${created.subjectCode}.`);
  };

  const handleCycleCustody = (spec: ClinicalBiospecimen) => {
    const nextStatus: ClinicalBiospecimen['custodyStatus'] =
      spec.custodyStatus === 'Available'
        ? 'In Transit'
        : spec.custodyStatus === 'In Transit'
          ? 'In Use'
          : 'Available';
    onUpdateSpecimen({ ...spec, custodyStatus: nextStatus, lastUpdatedBy: session.userName });
    onNotify(`Updated blinded custody for ${spec.vialId} → ${nextStatus}.`);
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
      >
        <DashboardSectionHeader
          title="Blinded Biospecimen Chain-of-Custody & Clinical Data"
          subtitle="De-identified specimen draws, transit tracking, and DICOM / FCS clinical attachments"
          moduleRef="2.3 / 2.4"
          actionLabel="Log Biospecimen Draw"
          actionIcon={<AddIcon fontSize="small" />}
          onAction={() => setDrawOpen(true)}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          {biospecimens.map((spec) => (
            <Box
              key={spec.vialId}
              sx={{
                p: 1.75,
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                bgcolor: '#F8FAFC',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                flexWrap: { sm: 'wrap' },
                justifyContent: 'space-between',
                alignItems: { xs: 'stretch', sm: 'center' },
                gap: 1.5,
              }}
            >
              <Box sx={{ minWidth: 0, flex: { xs: 'none', sm: '1 1 240px' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', fontFamily: 'var(--font-mono)' }}>
                    {spec.vialId} · {spec.subjectCode}
                  </Typography>
                  <Chip size="small" label={spec.specimenType} sx={{ height: 19, fontSize: '10px', fontWeight: 700, borderRadius: '4px' }} />
                  <StatusChip label={spec.custodyStatus} />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', mt: 0.35, wordBreak: 'break-word' }}>
                  Trial {spec.trialId} · {spec.volumeMl} mL · {spec.storageLocation}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', wordBreak: 'break-word' }}>
                  Custody: {spec.lastUpdatedBy} {spec.clinicalAttachment ? `· Attachment: ${spec.clinicalAttachment}` : ''}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<QrCodeScannerIcon sx={{ fontSize: '15px !important' }} />}
                  onClick={() => setBarcodeTarget(spec)}
                  sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 700, borderRadius: '6px' }}
                >
                  Blinded Label
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleCycleCustody(spec)}
                  sx={{ bgcolor: '#1E40AF', '&:hover': { bgcolor: '#1E3A8A' }, fontWeight: 700, borderRadius: '6px' }}
                >
                  Advance Custody
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Log Biospecimen Draw Dialog */}
      <Dialog open={drawOpen} onClose={() => setDrawOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Log Blinded Biospecimen Draw</DialogTitle>
        <form onSubmit={handleLogDraw}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField select label="De-identified Subject" size="small" fullWidth value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)}>
              {participants.map((p) => (
                <MenuItem key={p.subjectCode} value={p.subjectCode}>
                  {p.subjectCode} ({p.trialId})
                </MenuItem>
              ))}
            </TextField>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.25, '& > *': { minWidth: 0 } }}>
              <TextField select label="Specimen Type" size="small" fullWidth value={specimenType} onChange={(e) => setSpecimenType(e.target.value as ClinicalBiospecimen['specimenType'])}>
                {SPECIMEN_TYPES.map((st) => (
                  <MenuItem key={st} value={st}>{st}</MenuItem>
                ))}
              </TextField>
              <TextField label="Volume (mL)" type="number" size="small" fullWidth value={volumeMl} onChange={(e) => setVolumeMl(e.target.value)} />
            </Box>
            <TextField label="Blinded Storage Location" size="small" fullWidth value={storageLocation} onChange={(e) => setStorageLocation(e.target.value)} />
            <TextField label="Clinical Data File (DICOM / FCS / CSV)" size="small" fullWidth value={attachment} onChange={(e) => setAttachment(e.target.value)} />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setDrawOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}>
              Log Draw & Barcode
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {barcodeTarget && (
        <BarcodeLabelModal
          open={Boolean(barcodeTarget)}
          onClose={() => setBarcodeTarget(null)}
          sampleId={barcodeTarget.vialId}
          sampleName={`${barcodeTarget.subjectCode} · Blinded Biospecimen`}
          sampleType={barcodeTarget.specimenType}
          storagePath={`${barcodeTarget.trialId} · ${barcodeTarget.storageLocation}`}
          onPrintConfirm={() => onNotify(`Printed blinded cryo label for ${barcodeTarget.vialId}.`)}
        />
      )}
    </>
  );
};
