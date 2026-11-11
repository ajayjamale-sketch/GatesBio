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
  MenuItem,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import type { BioSample, WellInfo } from '../../../types';
import type { DashboardSession, LabTestTask } from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';
import { WorkstationSplitView } from '../shared/WorkstationSplitView';
import { ESignatureModal } from '../shared/ESignatureModal';

interface TechMicroplateAssayPanelProps {
  session: DashboardSession;
  wells: WellInfo[];
  samples: BioSample[];
  tasks: LabTestTask[];
  onAssignWell: (coordinate: string, sample: BioSample) => void;
  onUpdateTask: (task: LabTestTask) => void;
  onNotify: (msg: string) => void;
}

const ASSAY_CATEGORIES = ['ALL', 'PCR', 'NGS', 'Western Blot', 'Flow Cytometry', 'ELISA', 'Mass Spectrometry'] as const;

export const TechMicroplateAssayPanel: React.FC<TechMicroplateAssayPanelProps> = ({
  session,
  wells,
  samples,
  tasks,
  onAssignWell,
  onUpdateTask,
  onNotify,
}) => {
  const [plateFormat, setPlateFormat] = useState<'96' | '384'>('96');
  const [selectedWellCoord, setSelectedWellCoord] = useState<string>('C4');
  const [assignSampleId, setAssignSampleId] = useState<string>(samples[0]?.id ?? 'SMP-2026-9041');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [activeTaskId, setActiveTaskId] = useState<string>(tasks[0]?.id ?? 'TST-901');
  const [deviationOpen, setDeviationOpen] = useState(false);
  const [deviationText, setDeviationText] = useState('');
  const [esignTask, setEsignTask] = useState<LabTestTask | null>(null);

  const selectedWell = wells.find((w) => w.coordinate === selectedWellCoord) ?? wells[0];
  const visibleTasks = tasks.filter(
    (t) => categoryFilter === 'ALL' || t.assayCategory === categoryFilter
  );
  const activeTask = tasks.find((t) => t.id === activeTaskId) ?? tasks[0];

  const handleAssignSampleToWell = () => {
    const sample = samples.find((s) => s.id === assignSampleId);
    if (!sample) return;
    onAssignWell(selectedWellCoord, sample);
    onNotify(`Assigned ${sample.id} to Well ${selectedWellCoord} (${plateFormat}-well plate).`);
  };

  const handleToggleStep = (task: LabTestTask, stepId: string) => {
    const updatedSteps = (task.steps ?? []).map((st) =>
      st.id === stepId
        ? {
            ...st,
            completed: !st.completed,
            measuredValue: st.measuredValue || 'Within Spec',
          }
        : st
    );
    onUpdateTask({ ...task, steps: updatedSteps, status: task.status === 'Queued' ? 'Running' : task.status });
  };

  const handleStepMeasureChange = (task: LabTestTask, stepId: string, value: string) => {
    const updatedSteps = (task.steps ?? []).map((st) =>
      st.id === stepId ? { ...st, measuredValue: value } : st
    );
    onUpdateTask({ ...task, steps: updatedSteps });
  };

  const handleFlagDeviation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTask || !deviationText.trim()) return;
    onUpdateTask({
      ...activeTask,
      deviationFlagged: true,
      deviationNotes: deviationText.trim(),
    });
    setDeviationText('');
    setDeviationOpen(false);
    onNotify(`Flagged OOS / protocol deviation on ${activeTask.id}.`);
  };

  // Build 384 preview grid from 96 wells when 384-well mode is selected
  const plateCells =
    plateFormat === '96'
      ? wells
      : Array.from({ length: 384 }, (_, idx) => {
          const base = wells[idx % wells.length];
          const rowChar = String.fromCharCode(65 + Math.floor(idx / 24));
          const colNum = (idx % 24) + 1;
          return {
            ...base,
            coordinate: `${rowChar}${colNum}`,
          };
        });

  return (
    <>
      <WorkstationSplitView
        primary={
          <Paper
            elevation={0}
            sx={{ p: { xs: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}
          >
            <DashboardSectionHeader
              title={`${plateFormat}-Well Assay Microplate Grid (#PLT-09)`}
              subtitle="Click any well to inspect concentration or assign a specimen aliquot"
              moduleRef="2.3"
              rightSlot={
                <ToggleButtonGroup
                  size="small"
                  exclusive
                  value={plateFormat}
                  onChange={(_, v) => v && setPlateFormat(v)}
                  sx={{ '& .MuiToggleButton-root': { borderRadius: '6px', px: 1.25, py: 0.4, fontSize: '12px', fontWeight: 700 } }}
                >
                  <ToggleButton value="96">96-Well</ToggleButton>
                  <ToggleButton value="384">384-Well</ToggleButton>
                </ToggleButtonGroup>
              }
            />

            {/* Concentration Heatmap Legend */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1.5 }}>
              {[
                { label: 'Positive Ctrl', color: '#10B981' },
                { label: 'Negative Ctrl', color: '#F59E0B' },
                { label: 'High Conc (>50 ng/µL)', color: '#1E40AF' },
                { label: 'Standard Sample', color: '#3B82F6' },
                { label: 'Empty / Blank', color: '#F1F5F9' },
              ].map((item) => (
                <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                  <Box sx={{ width: 11, height: 11, borderRadius: '3px', bgcolor: item.color, border: '1px solid #CBD5E1' }} />
                  <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, fontSize: '11px' }}>
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ overflowX: 'auto', pb: 1 }}>
              <Box
                sx={{
                  minWidth: plateFormat === '384' ? 620 : 460,
                  display: 'grid',
                  gridTemplateColumns: plateFormat === '384' ? 'repeat(24, 1fr)' : 'repeat(12, 1fr)',
                  gap: plateFormat === '384' ? 0.3 : 0.6,
                }}
              >
                {plateCells.map((well) => {
                  const isSelected = selectedWellCoord === well.coordinate;
                  let bg = '#F1F5F9';
                  let border = '#CBD5E1';
                  if (well.isControl === 'Positive') {
                    bg = '#10B981';
                    border = '#059669';
                  } else if (well.isControl === 'Negative') {
                    bg = '#F59E0B';
                    border = '#D97706';
                  } else if (well.concentration && well.concentration > 50) {
                    bg = '#1E40AF';
                    border = '#1E3A8A';
                  } else if (well.concentration) {
                    bg = '#3B82F6';
                    border = '#2563EB';
                  }

                  return (
                    <Tooltip key={well.coordinate} title={`${well.coordinate}: ${well.sampleName || 'Empty Well'}`}>
                      <Box
                        onClick={() => setSelectedWellCoord(well.coordinate)}
                        sx={{
                          aspectRatio: '1 / 1',
                          borderRadius: '4px',
                          bgcolor: bg,
                          border: isSelected ? '2px solid #0F172A' : `1px solid ${border}`,
                          color: well.concentration || well.isControl ? '#FFFFFF' : '#64748B',
                          fontSize: plateFormat === '384' ? '7px' : '9.5px',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        {plateFormat === '96' ? well.coordinate : ''}
                      </Box>
                    </Tooltip>
                  );
                })}
              </Box>
            </Box>

            {/* Selected Well Inspector + Direct Assignment */}
            <Box
              sx={{
                mt: 2,
                p: 1.75,
                borderRadius: '8px',
                bgcolor: '#EFF6FF',
                border: '1px solid #DBEAFE',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', fontFamily: 'var(--font-mono)' }}>
                  WELL {selectedWellCoord} ({plateFormat}-WELL)
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  {selectedWell?.sampleName || 'Unassigned Well'}
                </Typography>
                <Typography variant="caption" sx={{ color: '#475569' }}>
                  Concentration: {selectedWell?.concentration ?? 0} ng/µL · Control: {selectedWell?.isControl || 'Sample'}
                </Typography>
              </Box>

              {plateFormat === '96' && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap', width: { xs: '100%', sm: 'auto' } }}>
                  <TextField
                    select
                    size="small"
                    value={assignSampleId}
                    onChange={(e) => setAssignSampleId(e.target.value)}
                    sx={{ minWidth: { xs: '100%', sm: 190 }, bgcolor: '#FFFFFF', '& .MuiOutlinedInput-root': { borderRadius: '6px', fontSize: '12px' } }}
                  >
                    {samples.map((s) => (
                      <MenuItem key={s.id} value={s.id} sx={{ fontSize: '12px' }}>
                        {s.id} · {s.type}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleAssignSampleToWell}
                    sx={{ width: { xs: '100%', sm: 'auto' }, bgcolor: '#1E40AF', '&:hover': { bgcolor: '#1E3A8A' }, fontWeight: 700, borderRadius: '6px' }}
                  >
                    Assign to {selectedWellCoord}
                  </Button>
                </Box>
              )}
            </Box>
          </Paper>
        }
        inspector={
          <Paper
            elevation={0}
            sx={{ p: { xs: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}
          >
            <DashboardSectionHeader
              title="Assay Execution Pipeline"
              subtitle="Step-by-step protocol checks, deviations, and 21 CFR sign-off"
              moduleRef="2.3 / 2.4"
            />

            <TextField
              select
              size="small"
              fullWidth
              label="Filter Pipeline"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              sx={{ mb: 1.5, '& .MuiOutlinedInput-root': { borderRadius: '6px', fontSize: '12.5px' } }}
            >
              {ASSAY_CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat === 'ALL' ? 'All Assay Pipelines' : cat}
                </MenuItem>
              ))}
            </TextField>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
              {visibleTasks.map((task) => {
                const isSelected = activeTask?.id === task.id;
                return (
                  <Box
                    key={task.id}
                    onClick={() => setActiveTaskId(task.id)}
                    sx={{
                      p: 1.25,
                      borderRadius: '8px',
                      border: `1px solid ${isSelected ? '#93C5FD' : '#E2E8F0'}`,
                      bgcolor: isSelected ? '#EFF6FF' : '#F8FAFC',
                      cursor: 'pointer',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.4 }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', fontFamily: 'var(--font-mono)' }}>
                        {task.id} · {task.sampleId}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <StatusChip label={task.priority} />
                        <StatusChip label={task.status} />
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>
                      {task.assayType}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      {task.instrument} {task.assayCategory ? `· ${task.assayCategory}` : ''}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            {/* Step-by-Step Technician Execution Checklist */}
            {activeTask && (
              <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#0F172A' }}>
                    EXECUTION CHECKLIST — {activeTask.id}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.75 }}>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<WarningAmberIcon sx={{ fontSize: 14 }} />}
                      onClick={() => setDeviationOpen(true)}
                      sx={{ fontSize: '11px', fontWeight: 700, py: 0.25 }}
                    >
                      Flag Deviation
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<FingerprintIcon sx={{ fontSize: 14 }} />}
                      onClick={() => setEsignTask(activeTask)}
                      sx={{ bgcolor: '#1E40AF', fontSize: '11px', fontWeight: 700, borderRadius: '6px', py: 0.25 }}
                    >
                      Sign Off
                    </Button>
                  </Box>
                </Box>

                {activeTask.deviationFlagged && (
                  <Chip
                    size="small"
                    label={`Deviation Flagged: ${activeTask.deviationNotes}`}
                    sx={{ mb: 1, bgcolor: '#FEF2F2', color: '#991B1B', fontWeight: 700, fontSize: '10.5px', borderRadius: '4px' }}
                  />
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                  {(activeTask.steps ?? []).map((st) => (
                    <Box
                      key={st.id}
                      sx={{
                        p: 1,
                        borderRadius: '6px',
                        bgcolor: st.completed ? '#EFF6FF' : '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.5,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.75 }}>
                        <Checkbox
                          checked={st.completed}
                          size="small"
                          onChange={() => handleToggleStep(activeTask, st.id)}
                          sx={{ p: 0.25, color: '#1E40AF' }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A', display: 'block' }}>
                            {st.label}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#64748B', fontSize: '10.5px' }}>
                            Tolerance: {st.tolerance}
                          </Typography>
                        </Box>
                      </Box>
                      <TextField
                        size="small"
                        placeholder="Measured parameter..."
                        value={st.measuredValue}
                        onChange={(e) => handleStepMeasureChange(activeTask, st.id, e.target.value)}
                        sx={{ '& .MuiOutlinedInput-root': { fontSize: '11.5px', borderRadius: '4px', bgcolor: '#FFFFFF' } }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Paper>
        }
      />

      {/* Deviation Flag Modal */}
      <Dialog open={deviationOpen} onClose={() => setDeviationOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Flag Assay Deviation / OOS</DialogTitle>
        <form onSubmit={handleFlagDeviation}>
          <DialogContent dividers>
            <TextField
              label="Deviation / Out-of-Spec Observation"
              multiline
              rows={3}
              size="small"
              fullWidth
              required
              value={deviationText}
              onChange={(e) => setDeviationText(e.target.value)}
              placeholder="e.g. Ct value shifted >2 cycles on replicate C4; rerunning positive control."
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setDeviationOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="error" sx={{ fontWeight: 700, borderRadius: '6px' }}>
              Log Deviation
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {esignTask && (
        <ESignatureModal
          open={Boolean(esignTask)}
          onClose={() => setEsignTask(null)}
          recordTitle={`${esignTask.id} · ${esignTask.assayType}`}
          signerName={session.userName}
          signerRole={session.roleTitle}
          onConfirm={() => {
            onUpdateTask({ ...esignTask, status: 'Completed', signedBy: session.userName });
            setEsignTask(null);
            onNotify(`Signed off assay execution ${esignTask.id} (21 CFR Part 11).`);
          }}
        />
      )}
    </>
  );
};
