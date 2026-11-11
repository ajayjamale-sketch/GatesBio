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
  LinearProgress,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ClinicalTrialItem, DashboardSession } from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';
import { WorkstationSplitView } from '../shared/WorkstationSplitView';
import { ESignatureModal } from '../shared/ESignatureModal';

interface ClinicalTrialsPanelProps {
  session: DashboardSession;
  trials: ClinicalTrialItem[];
  onAddTrial: (trial: ClinicalTrialItem) => void;
  onUpdateTrial: (trial: ClinicalTrialItem) => void;
  onNotify: (msg: string) => void;
}

const PHASES: ClinicalTrialItem['phase'][] = [
  'Phase I',
  'Phase II',
  'Phase III',
  'Phase IV',
  'Observational',
  'Retrospective',
];

const BLINDING_MODES: NonNullable<ClinicalTrialItem['blindingMode']>[] = [
  'Double-Blind',
  'Single-Blind',
  'Open-Label',
];

const TRIAL_STATUSES: ClinicalTrialItem['status'][] = ['IRB Review', 'Recruiting', 'Active'];

export const ClinicalTrialsPanel: React.FC<ClinicalTrialsPanelProps> = ({
  session,
  trials,
  onAddTrial,
  onUpdateTrial,
  onNotify,
}) => {
  const [newTrialOpen, setNewTrialOpen] = useState(false);
  const [selectedTrialId, setSelectedTrialId] = useState<string | null>(null);
  const [unblindTrial, setUnblindTrial] = useState<ClinicalTrialItem | null>(null);

  const [title, setTitle] = useState('');
  const [phase, setPhase] = useState<ClinicalTrialItem['phase']>('Phase II');
  const [blindingMode, setBlindingMode] = useState<NonNullable<ClinicalTrialItem['blindingMode']>>('Double-Blind');
  const [target, setTarget] = useState('80');
  const [armAName, setArmAName] = useState('Treatment Arm A');
  const [armBName, setArmBName] = useState('Placebo Control');
  const [inclusionText, setInclusionText] = useState('Confirmed diagnosis, age 18–75, ECOG 0–1');
  const [exclusionText, setExclusionText] = useState('Prior investigational drug within 28 days');

  const selectedTrial = trials.find((t) => t.id === selectedTrialId) ?? null;

  const handleCreateTrial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const created: ClinicalTrialItem = {
      id: `VGB-GCP-${300 + trials.length}`,
      title: title.trim(),
      phase,
      enrolled: 0,
      target: Number(target) || 80,
      status: 'IRB Review',
      blindingMode,
      cohortArms:
        blindingMode === 'Open-Label'
          ? [{ name: armAName.trim() || 'Primary Cohort', ratio: '100%', enrolled: 0 }]
          : [
              { name: armAName.trim() || 'Treatment Arm A', ratio: '1:1', enrolled: 0 },
              { name: armBName.trim() || 'Placebo Control', ratio: '1:1', enrolled: 0 },
            ],
      inclusionCriteria: inclusionText
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean),
      exclusionCriteria: exclusionText
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean),
    };
    onAddTrial(created);
    setTitle('');
    setNewTrialOpen(false);
    onNotify(`Created trial protocol ${created.id} (${created.phase}, ${blindingMode}).`);
  };

  return (
    <>
      <WorkstationSplitView
        primary={
          <Paper
            elevation={0}
            sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
          >
            <DashboardSectionHeader
              title="Clinical Trial Cohorts & Protocol Setup"
              subtitle="Phase I–IV & Observational trials with eligibility criteria, randomization arms, and blinding"
              moduleRef="2.7"
              actionLabel="New Clinical Trial"
              actionIcon={<AddIcon fontSize="small" />}
              onAction={() => setNewTrialOpen(true)}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {trials.map((trial) => {
                const pct = Math.min(100, Math.round((trial.enrolled / Math.max(trial.target, 1)) * 100));
                return (
                  <Box
                    key={trial.id}
                    onClick={() => setSelectedTrialId(trial.id)}
                    sx={{
                      p: 2,
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      bgcolor: '#F8FAFC',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s ease, background-color 0.15s ease',
                      '&:hover': { borderColor: '#93C5FD', bgcolor: '#EFF6FF' },
                    }}
                  >
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                      <Box sx={{ minWidth: 0, flex: '1 1 200px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', fontFamily: 'var(--font-mono)' }}>
                            {trial.id}
                          </Typography>
                          <Chip label={trial.phase} size="small" sx={{ height: 19, fontSize: '10.5px', fontWeight: 700, borderRadius: '4px' }} />
                          {trial.blindingMode && <StatusChip label={trial.blindingMode} />}
                        </Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', fontSize: '15px', mt: 0.35, wordBreak: 'break-word' }}>
                          {trial.title}
                        </Typography>
                      </Box>
                      <StatusChip label={trial.status} />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5, flexWrap: 'wrap', gap: 0.5 }}>
                      <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                        Cohort Recruitment ({(trial.cohortArms ?? []).length || 1} arms)
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
                        {trial.enrolled} / {trial.target} ({pct}%)
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={pct}
                      sx={{
                        height: 7,
                        borderRadius: 4,
                        bgcolor: '#E2E8F0',
                        '& .MuiLinearProgress-bar': { bgcolor: '#1E40AF', borderRadius: 4 },
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Paper>
        }
        inspector={
          <Paper
            elevation={0}
            sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
          >
            <DashboardSectionHeader
              title="Enrollment vs. Target"
              subtitle="Live recruitment distribution"
              moduleRef="2.7"
            />
            <Box sx={{ width: '100%', height: { xs: 220, sm: 260 } }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trials}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="id" tick={{ fontSize: 10.5, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                  <RechartsTooltip />
                  <Bar dataKey="enrolled" name="Enrolled" fill="#1E40AF" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" name="Target" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        }
      />

      {/* Trial Protocol Detail & Blinding Controls Drawer */}
      <Drawer
        anchor="right"
        open={Boolean(selectedTrial)}
        onClose={() => setSelectedTrialId(null)}
        slotProps={{ paper: { sx: { width: { xs: '100%', sm: 440 }, p: 3 } } }}
      >
        {selectedTrial && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
              <Box>
                <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                  {selectedTrial.id} · {selectedTrial.phase}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  {selectedTrial.title}
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => setSelectedTrialId(null)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
              <TextField
                select
                size="small"
                label="Protocol Status"
                value={selectedTrial.status}
                onChange={(e) => {
                  const next = e.target.value as ClinicalTrialItem['status'];
                  onUpdateTrial({ ...selectedTrial, status: next });
                  onNotify(`Updated ${selectedTrial.id} status to ${next}.`);
                }}
                sx={{ minWidth: 150 }}
              >
                {TRIAL_STATUSES.map((st) => (
                  <MenuItem key={st} value={st}>{st}</MenuItem>
                ))}
              </TextField>
              {selectedTrial.blindingMode && <StatusChip label={selectedTrial.blindingMode} />}
            </Box>

            <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', display: 'block', mb: 0.75 }}>
                RANDOMIZATION COHORT ARMS
              </Typography>
              {(selectedTrial.cohortArms ?? []).map((arm) => (
                <Box key={arm.name} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4 }}>
                  <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 700 }}>{arm.name} ({arm.ratio})</Typography>
                  <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 800 }}>{arm.enrolled} enrolled</Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#0F172A', display: 'block', mb: 0.5 }}>
                INCLUSION CRITERIA
              </Typography>
              {(selectedTrial.inclusionCriteria ?? ['Standard protocol eligibility']).map((c, idx) => (
                <Typography key={idx} variant="caption" sx={{ color: '#334155', display: 'block' }}>
                  • {c}
                </Typography>
              ))}
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#991B1B', display: 'block', mt: 1, mb: 0.5 }}>
                EXCLUSION CRITERIA
              </Typography>
              {(selectedTrial.exclusionCriteria ?? ['None recorded']).map((c, idx) => (
                <Typography key={idx} variant="caption" sx={{ color: '#475569', display: 'block' }}>
                  • {c}
                </Typography>
              ))}
            </Box>

            <Divider />

            {selectedTrial.blindingMode && selectedTrial.blindingMode !== 'Open-Label' && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<LockOpenIcon fontSize="small" />}
                onClick={() => setUnblindTrial(selectedTrial)}
                sx={{ fontWeight: 700, borderRadius: '6px' }}
              >
                Emergency Audited Unblinding
              </Button>
            )}
            {selectedTrial.unblindingAudit && (
              <Typography variant="caption" sx={{ color: '#991B1B', fontFamily: 'var(--font-mono)' }}>
                {selectedTrial.unblindingAudit}
              </Typography>
            )}
          </Box>
        )}
      </Drawer>

      {/* New Clinical Trial Modal */}
      <Dialog open={newTrialOpen} onClose={() => setNewTrialOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Set Up Clinical Trial Protocol</DialogTitle>
        <form onSubmit={handleCreateTrial}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Trial Protocol Title"
              size="small"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(3, minmax(0, 1fr))' }, gap: 1.25, '& > *': { minWidth: 0 } }}>
              <TextField select label="Clinical Phase" size="small" fullWidth value={phase} onChange={(e) => setPhase(e.target.value as ClinicalTrialItem['phase'])}>
                {PHASES.map((ph) => (
                  <MenuItem key={ph} value={ph}>{ph}</MenuItem>
                ))}
              </TextField>
              <TextField select label="Blinding Mode" size="small" fullWidth value={blindingMode} onChange={(e) => setBlindingMode(e.target.value as NonNullable<ClinicalTrialItem['blindingMode']>)}>
                {BLINDING_MODES.map((bm) => (
                  <MenuItem key={bm} value={bm}>{bm}</MenuItem>
                ))}
              </TextField>
              <TextField label="Target Cohort" type="number" size="small" fullWidth value={target} onChange={(e) => setTarget(e.target.value)} />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.25, '& > *': { minWidth: 0 } }}>
              <TextField label="Primary Cohort Arm" size="small" fullWidth value={armAName} onChange={(e) => setArmAName(e.target.value)} />
              <TextField label="Comparator / Placebo Arm" size="small" fullWidth value={armBName} onChange={(e) => setArmBName(e.target.value)} disabled={blindingMode === 'Open-Label'} />
            </Box>
            <TextField label="Inclusion Criteria (one per line)" multiline rows={2} size="small" fullWidth value={inclusionText} onChange={(e) => setInclusionText(e.target.value)} />
            <TextField label="Exclusion Criteria (one per line)" multiline rows={2} size="small" fullWidth value={exclusionText} onChange={(e) => setExclusionText(e.target.value)} />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setNewTrialOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}>
              Create Trial
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {unblindTrial && (
        <ESignatureModal
          open={Boolean(unblindTrial)}
          onClose={() => setUnblindTrial(null)}
          recordTitle={`EMERGENCY UNBLIND · ${unblindTrial.id}`}
          signerName={session.userName}
          signerRole={session.roleTitle}
          onConfirm={(res) => {
            onUpdateTrial({
              ...unblindTrial,
              blindingMode: 'Open-Label',
              unblindingAudit: `Unblinded by ${session.userName} (${res.sha256Hash})`,
            });
            setUnblindTrial(null);
            onNotify(`Audited unblinding completed for ${unblindTrial.id}.`);
          }}
        />
      )}
    </>
  );
};
