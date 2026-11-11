import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import type { DashboardSession, SopDocumentItem } from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { ESignatureModal } from '../shared/ESignatureModal';

interface ComplianceSopControlPanelProps {
  session: DashboardSession;
  sops: SopDocumentItem[];
  onReleaseSop: (sop: SopDocumentItem) => void;
  onAttestSop: (sopId: string) => void;
  onNotify: (msg: string) => void;
}

export const ComplianceSopControlPanel: React.FC<ComplianceSopControlPanelProps> = ({
  session,
  sops,
  onReleaseSop,
  onAttestSop,
  onNotify,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [attestTarget, setAttestTarget] = useState<SopDocumentItem | null>(null);
  const [code, setCode] = useState('SOP-LIMS-025');
  const [title, setTitle] = useState('');
  const [version, setVersion] = useState('v1.0');
  const [framework, setFramework] = useState<SopDocumentItem['framework']>('FDA 21 CFR Part 11');
  const [revisionNotes, setRevisionNotes] = useState('');

  const handleRelease = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onReleaseSop({
      id: `SOP-${sops.length + 1}`,
      code: code.trim() || `SOP-QA-0${sops.length + 1}`,
      title: title.trim(),
      version: version.trim() || 'v1.0',
      framework,
      reviewDue: '2027-11-11',
      attestedCount: 1,
      totalStaff: 20,
      effectiveDate: '2026-11-11',
      revisionNotes: revisionNotes.trim() || 'Initial controlled release.',
    });
    setTitle('');
    setRevisionNotes('');
    setModalOpen(false);
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
      >
        <DashboardSectionHeader
          title="Controlled SOP Registry & Employee Attestations"
          subtitle="Version-controlled standard operating procedures with mandatory read-and-understood tracking"
          moduleRef="2.10"
          actionLabel="Release SOP Revision"
          actionIcon={<AddIcon fontSize="small" />}
          onAction={() => setModalOpen(true)}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {sops.map((sop) => {
            const attested = sop.attestedCount ?? 18;
            const total = sop.totalStaff ?? 20;
            const pct = Math.min(100, Math.round((attested / Math.max(total, 1)) * 100));
            return (
              <Box
                key={sop.id}
                sx={{
                  p: 2,
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  bgcolor: '#F8FAFC',
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  alignItems: { xs: 'stretch', sm: 'center' },
                  gap: 1.5,
                }}
              >
                <Box sx={{ minWidth: 0, flex: { xs: 'none', sm: '1 1 260px' } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap', mb: 0.4 }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', fontFamily: 'var(--font-mono)' }}>
                      {sop.code} ({sop.version})
                    </Typography>
                    <Chip label={sop.framework} size="small" sx={{ height: 19, fontSize: '10px', fontWeight: 700, borderRadius: '4px' }} />
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', wordBreak: 'break-word' }}>
                    {sop.title}
                  </Typography>
                  {sop.revisionNotes && (
                    <Typography variant="caption" sx={{ color: '#475569', display: 'block', mt: 0.25 }}>
                      {sop.revisionNotes}
                    </Typography>
                  )}
                  <Box sx={{ mt: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4 }}>
                      <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                        Employee Attestations: {attested}/{total} ({pct}%)
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748B' }}>
                        Review Due: {sop.reviewDue}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={pct}
                      sx={{ height: 6, borderRadius: 3, bgcolor: '#E2E8F0', '& .MuiLinearProgress-bar': { bgcolor: '#1E40AF' } }}
                    />
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                  {attested < total && (
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<NotificationsActiveIcon fontSize="small" />}
                      onClick={() => onNotify(`Sent mandatory attestation reminder for ${sop.code} to ${total - attested} staff.`)}
                      sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 700, borderRadius: '6px' }}
                    >
                      Remind ({total - attested})
                    </Button>
                  )}
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<FingerprintIcon fontSize="small" />}
                    onClick={() => setAttestTarget(sop)}
                    sx={{ bgcolor: '#1E40AF', '&:hover': { bgcolor: '#1E3A8A' }, fontWeight: 700, borderRadius: '6px' }}
                  >
                    Attest SOP
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Paper>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Release Controlled SOP Revision</DialogTitle>
        <form onSubmit={handleRelease}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.25 }}>
              <TextField label="SOP Code" size="small" fullWidth value={code} onChange={(e) => setCode(e.target.value)} />
              <TextField label="Version" size="small" fullWidth value={version} onChange={(e) => setVersion(e.target.value)} />
            </Box>
            <TextField label="SOP Title" size="small" fullWidth required value={title} onChange={(e) => setTitle(e.target.value)} />
            <TextField select label="Regulatory Framework" size="small" fullWidth value={framework} onChange={(e) => setFramework(e.target.value as SopDocumentItem['framework'])}>
              <MenuItem value="FDA 21 CFR Part 11">FDA 21 CFR Part 11</MenuItem>
              <MenuItem value="GMP">GMP</MenuItem>
              <MenuItem value="ISO 17025">ISO 17025</MenuItem>
            </TextField>
            <TextField label="Revision Summary" multiline rows={2} size="small" fullWidth value={revisionNotes} onChange={(e) => setRevisionNotes(e.target.value)} />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}>
              Publish SOP
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {attestTarget && (
        <ESignatureModal
          open={Boolean(attestTarget)}
          onClose={() => setAttestTarget(null)}
          recordTitle={`SOP Attestation · ${attestTarget.code} (${attestTarget.version})`}
          signerName={session.userName}
          signerRole={session.roleTitle}
          onConfirm={() => {
            onAttestSop(attestTarget.id);
            setAttestTarget(null);
          }}
        />
      )}
    </>
  );
};
