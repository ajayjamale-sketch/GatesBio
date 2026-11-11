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
  FormControlLabel,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import type {
  AdverseEventItem,
  ClinicalParticipant,
  ClinicalTrialItem,
} from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';

interface ClinicalAdverseEventsPanelProps {
  trials: ClinicalTrialItem[];
  participants: ClinicalParticipant[];
  adverseEvents: AdverseEventItem[];
  onAddAdverseEvent: (ae: AdverseEventItem) => void;
  onUpdateAdverseEvent: (ae: AdverseEventItem) => void;
  onNotify: (msg: string) => void;
}

export const ClinicalAdverseEventsPanel: React.FC<ClinicalAdverseEventsPanelProps> = ({
  trials,
  participants,
  adverseEvents,
  onAddAdverseEvent,
  onUpdateAdverseEvent,
  onNotify,
}) => {
  const [aeModalOpen, setAeModalOpen] = useState(false);
  const [trialId, setTrialId] = useState(trials[0]?.id ?? 'VGB-ONC-204');
  const [subjectCode, setSubjectCode] = useState(participants[0]?.subjectCode ?? 'SUBJ-0842');
  const [aeTerm, setAeTerm] = useState('');
  const [meddraCode, setMeddraCode] = useState('MedDRA 10016256');
  const [severity, setSeverity] = useState<AdverseEventItem['severity']>('Mild');
  const [isSae, setIsSae] = useState(false);
  const [blindedNotes, setBlindedNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aeTerm.trim()) return;
    const triggersRegulatory = isSae || severity === 'Severe';
    const created: AdverseEventItem = {
      id: `AE-${4403 + adverseEvents.length}`,
      trialId,
      subjectCode,
      term: aeTerm.trim(),
      severity,
      reportedAt: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
      meddraCode: meddraCode.trim() || 'MedDRA 10000000',
      isSae: triggersRegulatory,
      blindedNotes: blindedNotes.trim() || 'Blinded investigator assessment logged.',
      regulatoryDraftStatus: triggersRegulatory ? '24h Draft Ready' : 'Not Required',
      statutoryDeadline: triggersRegulatory ? 'Due within 24–48h (FDA / IRB)' : undefined,
    };
    onAddAdverseEvent(created);
    setAeTerm('');
    setBlindedNotes('');
    setIsSae(false);
    setAeModalOpen(false);
    onNotify(
      triggersRegulatory
        ? `SAE ${created.id} logged — 24–48h statutory regulatory draft triggered!`
        : `Logged ${created.severity} adverse event ${created.id}.`
    );
  };

  const handleSubmitDraftToIrb = (ae: AdverseEventItem) => {
    onUpdateAdverseEvent({ ...ae, regulatoryDraftStatus: 'Submitted to IRB' });
    onNotify(`Submitted statutory SAE safety notification ${ae.id} to IRB.`);
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
      >
        <DashboardSectionHeader
          title="Adverse Event (AE / SAE) Safety Telemetry"
          subtitle="MedDRA-coded observations with automated 24–48h statutory SAE notification drafts"
          moduleRef="2.7"
          actionLabel="Log Adverse Event"
          actionIcon={<AddIcon fontSize="small" />}
          onAction={() => setAeModalOpen(true)}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          {adverseEvents.map((ae) => (
            <Box
              key={ae.id}
              sx={{
                p: 1.75,
                borderRadius: '8px',
                border: ae.isSae ? '1px solid #FECACA' : '1px solid #E2E8F0',
                bgcolor: ae.isSae ? '#FEF2F2' : '#F8FAFC',
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
                    {ae.id} · {ae.trialId} · {ae.subjectCode}
                  </Typography>
                  {ae.meddraCode && (
                    <Chip size="small" label={ae.meddraCode} sx={{ height: 19, fontSize: '10px', fontWeight: 700, borderRadius: '4px' }} />
                  )}
                  {ae.isSae && (
                    <Chip
                      icon={<WarningAmberIcon sx={{ fontSize: '13px !important', color: '#991B1B !important' }} />}
                      size="small"
                      label="SAE"
                      sx={{ height: 19, bgcolor: '#FFFFFF', color: '#991B1B', fontWeight: 800, fontSize: '10px', borderRadius: '4px' }}
                    />
                  )}
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', mt: 0.35, wordBreak: 'break-word' }}>
                  {ae.term}
                </Typography>
                {ae.blindedNotes && (
                  <Typography variant="caption" sx={{ color: '#475569', display: 'block', wordBreak: 'break-word' }}>
                    {ae.blindedNotes}
                  </Typography>
                )}
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 0.25 }}>
                  Reported: {ae.reportedAt} {ae.statutoryDeadline ? `· ${ae.statutoryDeadline}` : ''}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center', flexWrap: 'wrap' }}>
                <StatusChip label={ae.severity} />
                {ae.regulatoryDraftStatus && ae.regulatoryDraftStatus !== 'Not Required' && (
                  <StatusChip label={ae.regulatoryDraftStatus} />
                )}
                {ae.regulatoryDraftStatus === '24h Draft Ready' && (
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => handleSubmitDraftToIrb(ae)}
                    sx={{ fontWeight: 700, borderRadius: '6px' }}
                  >
                    Submit IRB Report
                  </Button>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Log Adverse Event Modal */}
      <Dialog open={aeModalOpen} onClose={() => setAeModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Log Adverse Event (MedDRA)</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField select label="Clinical Trial" size="small" fullWidth value={trialId} onChange={(e) => setTrialId(e.target.value)}>
              {trials.map((t) => (
                <MenuItem key={t.id} value={t.id}>{t.id} · {t.title}</MenuItem>
              ))}
            </TextField>
            <TextField select label="Participant Subject" size="small" fullWidth value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)}>
              {participants.map((p) => (
                <MenuItem key={p.subjectCode} value={p.subjectCode}>{p.subjectCode} ({p.trialId})</MenuItem>
              ))}
            </TextField>
            <TextField
              label="MedDRA Event Term"
              size="small"
              fullWidth
              required
              placeholder="e.g. Grade 1 Fatigue"
              value={aeTerm}
              onChange={(e) => setAeTerm(e.target.value)}
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.25, '& > *': { minWidth: 0 } }}>
              <TextField label="MedDRA Code" size="small" fullWidth value={meddraCode} onChange={(e) => setMeddraCode(e.target.value)} />
              <TextField
                select
                label="Severity"
                size="small"
                fullWidth
                value={severity}
                onChange={(e) => setSeverity(e.target.value as AdverseEventItem['severity'])}
              >
                {(['Mild', 'Moderate', 'Severe'] as AdverseEventItem['severity'][]).map((sev) => (
                  <MenuItem key={sev} value={sev}>{sev}</MenuItem>
                ))}
              </TextField>
            </Box>
            <TextField
              label="Blinded Clinical Observation Notes"
              multiline
              rows={2}
              size="small"
              fullWidth
              value={blindedNotes}
              onChange={(e) => setBlindedNotes(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox checked={isSae || severity === 'Severe'} onChange={(e) => setIsSae(e.target.checked)} color="error" />}
              label={
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#991B1B' }}>
                  Flag as Serious Adverse Event (SAE) — triggers 24–48h IRB draft
                </Typography>
              }
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setAeModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}>
              Submit AE Report
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
