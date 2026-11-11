import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
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
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import type {
  ClinicalParticipant,
  ClinicalTrialItem,
  DashboardSession,
} from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';
import { ESignatureModal } from '../shared/ESignatureModal';

interface ClinicalParticipantsPanelProps {
  session: DashboardSession;
  trials: ClinicalTrialItem[];
  participants: ClinicalParticipant[];
  onEnrollParticipant: (participant: ClinicalParticipant) => void;
  onUpdateParticipant: (participant: ClinicalParticipant) => void;
  onOpenVialBarcode: (participant: ClinicalParticipant) => void;
  onNotify: (msg: string) => void;
}

export const ClinicalParticipantsPanel: React.FC<ClinicalParticipantsPanelProps> = ({
  session,
  trials,
  participants,
  onEnrollParticipant,
  onUpdateParticipant,
  onOpenVialBarcode,
  onNotify,
}) => {
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [consentTarget, setConsentTarget] = useState<ClinicalParticipant | null>(null);
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string | null>(null);

  // Enroll Form
  const [trialId, setTrialId] = useState(trials[0]?.id ?? 'VGB-ONC-204');
  const [eligibilityConfirmed, setEligibilityConfirmed] = useState(true);
  const [visitWindow, setVisitWindow] = useState('Screening Baseline');
  const [doseInput, setDoseInput] = useState('150 mg BID Blinded Kit');

  const selectedParticipant = participants.find((p) => p.subjectCode === selectedSubjectCode) ?? null;

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eligibilityConfirmed) {
      onNotify('Confirm inclusion/exclusion screening criteria before enrollment.');
      return;
    }
    const trial = trials.find((t) => t.id === trialId) ?? trials[0];
    const arms = trial?.cohortArms ?? [{ name: 'Blinded Cohort A', ratio: '1:1', enrolled: 0 }];
    const randomizedArm = arms[participants.length % arms.length]?.name ?? 'Blinded Cohort A';
    const nextNum = 1010 + participants.length;
    const created: ClinicalParticipant = {
      subjectCode: `SUBJ-${nextNum}`,
      trialId,
      arm: randomizedArm,
      visitWindow,
      consentStatus: 'Pending',
      vialId: `SMP-CLN-${nextNum}`,
      reminderEnabled: true,
      visits: [
        {
          id: `VST-${participants.length + 10}`,
          label: visitWindow,
          scheduledDate: '2026-11-18',
          status: 'Scheduled',
        },
      ],
      dosageLogs: [],
    };
    onEnrollParticipant(created);
    setEnrollOpen(false);
  };

  const handleLogDose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedParticipant || !doseInput.trim()) return;
    const nextDose = {
      id: `DOS-${selectedParticipant.dosageLogs.length + 10}`,
      dose: doseInput.trim(),
      administeredAt: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
      administeredBy: session.userName,
    };
    onUpdateParticipant({
      ...selectedParticipant,
      dosageLogs: [nextDose, ...selectedParticipant.dosageLogs],
    });
    onNotify(`Logged dosage administration for ${selectedParticipant.subjectCode}.`);
  };

  const handleToggleVisit = (visitId: string) => {
    if (!selectedParticipant) return;
    onUpdateParticipant({
      ...selectedParticipant,
      visits: selectedParticipant.visits.map((v) =>
        v.id === visitId
          ? { ...v, status: v.status === 'Completed' ? 'Scheduled' : 'Completed' }
          : v
      ),
    });
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
      >
        <DashboardSectionHeader
          title="Participant Recruitment, e-Consent Vault & Visit Schedules"
          subtitle={`De-identified subject screening, randomization, and 21 CFR Part 11 consent managed by ${session.userName}`}
          moduleRef="2.7"
          actionLabel="Enroll Participant"
          actionIcon={<AddIcon fontSize="small" />}
          onAction={() => setEnrollOpen(true)}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(3, minmax(0, 1fr))' },
            gap: 2,
            '& > *': { minWidth: 0 },
          }}
        >
          {participants.map((p) => (
            <Box
              key={p.subjectCode}
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
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 0.75, mb: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', fontFamily: 'var(--font-mono)' }}>
                    {p.subjectCode} · {p.trialId}
                  </Typography>
                  <StatusChip label={p.consentStatus} />
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  {p.arm}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 0.25 }}>
                  {p.visitWindow} · Vial {p.vialId}
                </Typography>
                {p.consentTimestamp && (
                  <Typography variant="caption" sx={{ color: '#1E40AF', display: 'block', mt: 0.5, fontSize: '11px', fontWeight: 600 }}>
                    Signed: {p.consentTimestamp}
                  </Typography>
                )}
              </Box>

              <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<CalendarMonthIcon sx={{ fontSize: '14px !important' }} />}
                  onClick={() => setSelectedSubjectCode(p.subjectCode)}
                  sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 700, borderRadius: '6px' }}
                >
                  Visits & Dose
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<QrCodeScannerIcon sx={{ fontSize: '14px !important' }} />}
                  onClick={() => onOpenVialBarcode(p)}
                  sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 700, borderRadius: '6px' }}
                >
                  Blinded Vial
                </Button>
                {p.consentStatus === 'Pending' && (
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<FingerprintIcon sx={{ fontSize: '14px !important' }} />}
                    onClick={() => setConsentTarget(p)}
                    sx={{ bgcolor: '#1E40AF', '&:hover': { bgcolor: '#1E3A8A' }, fontWeight: 700, borderRadius: '6px' }}
                  >
                    Sign e-Consent
                  </Button>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Enroll & Randomize Participant Modal */}
      <Dialog open={enrollOpen} onClose={() => setEnrollOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Screen & Enroll Participant</DialogTitle>
        <form onSubmit={handleEnrollSubmit}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField select label="Clinical Trial" size="small" fullWidth value={trialId} onChange={(e) => setTrialId(e.target.value)}>
              {trials.map((t) => (
                <MenuItem key={t.id} value={t.id}>
                  {t.id} · {t.title}
                </MenuItem>
              ))}
            </TextField>
            <TextField label="Initial Visit Window" size="small" fullWidth value={visitWindow} onChange={(e) => setVisitWindow(e.target.value)} />
            <FormControlLabel
              control={
                <Checkbox
                  checked={eligibilityConfirmed}
                  onChange={(e) => setEligibilityConfirmed(e.target.checked)}
                  sx={{ color: '#1E40AF' }}
                />
              }
              label={
                <Typography variant="caption" sx={{ fontWeight: 600, color: '#0F172A' }}>
                  Confirmed inclusion/exclusion criteria met; assign randomized blinded arm
                </Typography>
              }
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setEnrollOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}>
              Enroll & Randomize
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Longitudinal Visits, Dosage Log & Reminders Drawer */}
      <Drawer
        anchor="right"
        open={Boolean(selectedParticipant)}
        onClose={() => setSelectedSubjectCode(null)}
        slotProps={{ paper: { sx: { width: { xs: '100%', sm: 430 }, p: 3 } } }}
      >
        {selectedParticipant && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                  {selectedParticipant.subjectCode} · {selectedParticipant.trialId}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  Longitudinal Visits & Dosing
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => setSelectedSubjectCode(null)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                p: 1.5,
                borderRadius: '8px',
                bgcolor: '#EFF6FF',
                border: '1px solid #DBEAFE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <NotificationsActiveIcon sx={{ color: '#1E40AF', fontSize: 18 }} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A' }}>
                  Automated Appointment Reminders
                </Typography>
              </Box>
              <Switch
                size="small"
                checked={selectedParticipant.reminderEnabled}
                onChange={(e) => {
                  onUpdateParticipant({ ...selectedParticipant, reminderEnabled: e.target.checked });
                  onNotify(`Updated appointment reminders for ${selectedParticipant.subjectCode}.`);
                }}
              />
            </Box>

            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
              Visit Schedule
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              {selectedParticipant.visits.map((v) => (
                <Box
                  key={v.id}
                  onClick={() => handleToggleVisit(v.id)}
                  sx={{
                    p: 1.25,
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    bgcolor: '#F8FAFC',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                  }}
                >
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A', display: 'block' }}>
                      {v.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      {v.scheduledDate}
                    </Typography>
                  </Box>
                  <StatusChip label={v.status} />
                </Box>
              ))}
            </Box>

            <Divider />

            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
              Dosage Administration Log
            </Typography>
            <form onSubmit={handleLogDose}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  fullWidth
                  value={doseInput}
                  onChange={(e) => setDoseInput(e.target.value)}
                  placeholder="Blinded kit / dosage..."
                />
                <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px', whiteSpace: 'nowrap' }}>
                  Log Dose
                </Button>
              </Box>
            </form>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              {selectedParticipant.dosageLogs.map((d) => (
                <Box key={d.id} sx={{ p: 1.25, borderRadius: '6px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A', display: 'block' }}>
                    {d.dose}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B' }}>
                    {d.administeredAt} · {d.administeredBy}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Drawer>

      {consentTarget && (
        <ESignatureModal
          open={Boolean(consentTarget)}
          onClose={() => setConsentTarget(null)}
          recordTitle={`e-Consent Vault · ${consentTarget.subjectCode} (${consentTarget.trialId})`}
          signerName={session.userName}
          signerRole={session.roleTitle}
          onConfirm={() => {
            onUpdateParticipant({
              ...consentTarget,
              consentStatus: 'Approved',
              consentTimestamp: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
              consentSignedBy: session.userName,
            });
            setConsentTarget(null);
            onNotify(`Verified 21 CFR Part 11 e-Consent for ${consentTarget.subjectCode}.`);
          }}
        />
      )}
    </>
  );
};
