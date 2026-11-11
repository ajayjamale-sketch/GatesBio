import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import type { CapaDeviationItem, DashboardSession } from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';
import { ESignatureModal, type ESignatureResult } from '../shared/ESignatureModal';

interface ComplianceCapaPanelProps {
  session: DashboardSession;
  capas: CapaDeviationItem[];
  onAddCapa: (capa: CapaDeviationItem) => void;
  onUpdateCapa: (capa: CapaDeviationItem) => void;
  onCloseCapaWithSignature: (capa: CapaDeviationItem, sig: ESignatureResult) => void;
  onNotify: (msg: string) => void;
}

export const ComplianceCapaPanel: React.FC<ComplianceCapaPanelProps> = ({
  session,
  capas,
  onAddCapa,
  onUpdateCapa,
  onCloseCapaWithSignature,
  onNotify,
}) => {
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedCapaId, setSelectedCapaId] = useState<string | null>(null);
  const [closeTarget, setCloseTarget] = useState<CapaDeviationItem | null>(null);

  const [source, setSource] = useState('');
  const [category, setCategory] = useState<CapaDeviationItem['category']>('OOS Assay');
  const [severity, setSeverity] = useState<CapaDeviationItem['severity']>('Medium');
  const [isOos, setIsOos] = useState(true);
  const [rootCause, setRootCause] = useState('');
  const [preventiveAction, setPreventiveAction] = useState('');

  const selectedCapa = capas.find((c) => c.id === selectedCapaId) ?? null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!source.trim()) return;
    const created: CapaDeviationItem = {
      id: `CAPA-2026-${20 + capas.length}`,
      source: source.trim(),
      category,
      severity,
      status: 'Open',
      isOosInvestigation: isOos || category === 'OOS Assay',
      rootCause: rootCause.trim() || 'Root cause investigation initiated.',
      preventiveAction: preventiveAction.trim() || 'Pending QA preventive action review.',
      owner: session.userName,
      dueDate: '2026-11-30',
    };
    onAddCapa(created);
    setSource('');
    setRootCause('');
    setPreventiveAction('');
    setCreateOpen(false);
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
      >
        <DashboardSectionHeader
          title="CAPA & Out-of-Specification (OOS) Investigation Monitor"
          subtitle="Root cause analysis (RCA), corrective/preventive action plans, and e-signature closure"
          moduleRef="2.6 / 2.10"
          actionLabel="Log CAPA / OOS"
          actionIcon={<AddIcon fontSize="small" />}
          onAction={() => setCreateOpen(true)}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(3, minmax(0, 1fr))' },
            gap: 2,
            '& > *': { minWidth: 0 },
          }}
        >
          {capas.map((capa) => (
            <Box
              key={capa.id}
              sx={{
                p: 2,
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                bgcolor: '#F8FAFC',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 1.25,
              }}
            >
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 0.75 }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', fontFamily: 'var(--font-mono)' }}>
                    {capa.id}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {capa.isOosInvestigation && (
                      <Chip size="small" label="OOS" sx={{ height: 20, bgcolor: '#FEF2F2', color: '#991B1B', fontWeight: 800, fontSize: '10px', borderRadius: '4px' }} />
                    )}
                    <StatusChip label={capa.severity} />
                    <StatusChip label={capa.status} />
                  </Box>
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', wordBreak: 'break-word' }}>
                  {capa.source}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 0.25 }}>
                  Category: {capa.category} · Owner: {capa.owner ?? session.userName}
                </Typography>
                {capa.rootCause && (
                  <Typography variant="caption" sx={{ color: '#334155', display: 'block', mt: 0.75 }}>
                    <strong>RCA:</strong> {capa.rootCause}
                  </Typography>
                )}
              </Box>

              <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', pt: 1, borderTop: '1px solid #E2E8F0' }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setSelectedCapaId(capa.id)}
                  sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 700, borderRadius: '6px' }}
                >
                  Inspect RCA
                </Button>
                {capa.status === 'Open' && (
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                      onUpdateCapa({ ...capa, status: 'Under Review' });
                      onNotify(`Moved ${capa.id} to Under Review.`);
                    }}
                    sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}
                  >
                    Move to Review
                  </Button>
                )}
                {capa.status === 'Under Review' && (
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<FingerprintIcon fontSize="small" />}
                    onClick={() => setCloseTarget(capa)}
                    sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}
                  >
                    Sign & Close
                  </Button>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* RCA & CAPA Plan Drawer */}
      <Drawer
        anchor="right"
        open={Boolean(selectedCapa)}
        onClose={() => setSelectedCapaId(null)}
        slotProps={{ paper: { sx: { width: { xs: '100%', sm: 440 }, p: 3 } } }}
      >
        {selectedCapa && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                  {selectedCapa.id} · {selectedCapa.category}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  {selectedCapa.source}
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => setSelectedCapaId(null)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', gap: 0.75 }}>
              <StatusChip label={selectedCapa.severity} />
              <StatusChip label={selectedCapa.status} />
            </Box>

            <TextField
              label="Root Cause Analysis (RCA)"
              multiline
              rows={3}
              size="small"
              fullWidth
              value={selectedCapa.rootCause ?? ''}
              onChange={(e) => onUpdateCapa({ ...selectedCapa, rootCause: e.target.value })}
            />
            <TextField
              label="Corrective & Preventive Action Plan"
              multiline
              rows={3}
              size="small"
              fullWidth
              value={selectedCapa.preventiveAction ?? ''}
              onChange={(e) => onUpdateCapa({ ...selectedCapa, preventiveAction: e.target.value })}
            />
            {selectedCapa.closedSignatureHash && (
              <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', display: 'block' }}>
                  21 CFR PART 11 CLOSURE SEAL
                </Typography>
                <Typography variant="caption" sx={{ fontFamily: 'var(--font-mono)', wordBreak: 'break-all' }}>
                  {selectedCapa.closedSignatureHash}
                </Typography>
              </Box>
            )}
            <Divider />
            <Button
              variant="contained"
              onClick={() => {
                onNotify(`Saved RCA & CAPA plan updates for ${selectedCapa.id}.`);
                setSelectedCapaId(null);
              }}
              sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}
            >
              Save Investigation Notes
            </Button>
          </Box>
        )}
      </Drawer>

      {/* Log New CAPA / OOS Dialog */}
      <Dialog open={createOpen} onClose={() => setCreateOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Log CAPA / OOS Investigation</DialogTitle>
        <form onSubmit={handleCreate}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Source (Assay, Instrument, SOP)" size="small" fullWidth required value={source} onChange={(e) => setSource(e.target.value)} />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.25 }}>
              <TextField select label="Category" size="small" fullWidth value={category} onChange={(e) => setCategory(e.target.value as CapaDeviationItem['category'])}>
                <MenuItem value="OOS Assay">OOS Assay</MenuItem>
                <MenuItem value="Calibration Drift">Calibration Drift</MenuItem>
                <MenuItem value="SOP Deviation">SOP Deviation</MenuItem>
                <MenuItem value="Trial Query">Trial Query</MenuItem>
              </TextField>
              <TextField select label="Severity" size="small" fullWidth value={severity} onChange={(e) => setSeverity(e.target.value as CapaDeviationItem['severity'])}>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </TextField>
            </Box>
            <TextField label="Initial Root Cause" multiline rows={2} size="small" fullWidth value={rootCause} onChange={(e) => setRootCause(e.target.value)} />
            <TextField label="Corrective / Preventive Action" multiline rows={2} size="small" fullWidth value={preventiveAction} onChange={(e) => setPreventiveAction(e.target.value)} />
            <FormControlLabel
              control={<Checkbox checked={isOos} onChange={(e) => setIsOos(e.target.checked)} sx={{ color: '#1E40AF' }} />}
              label={<Typography variant="caption" sx={{ fontWeight: 700 }}>Flag as Out-of-Specification (OOS) Investigation</Typography>}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}>
              Create CAPA
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {closeTarget && (
        <ESignatureModal
          open={Boolean(closeTarget)}
          onClose={() => setCloseTarget(null)}
          recordTitle={`CAPA Closure · ${closeTarget.id} (${closeTarget.source})`}
          signerName={session.userName}
          signerRole={session.roleTitle}
          onConfirm={(res) => {
            onCloseCapaWithSignature(closeTarget, res);
            setCloseTarget(null);
          }}
        />
      )}
    </>
  );
};
