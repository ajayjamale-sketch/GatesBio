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
  IconButton,
  LinearProgress,
  MenuItem,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import TimelineIcon from '@mui/icons-material/Timeline';
import type { DashboardSession, ProjectMilestone, ResearchProjectItem } from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';

interface ScientistProjectsPanelProps {
  session: DashboardSession;
  projects: ResearchProjectItem[];
  onAddProject: (project: ResearchProjectItem) => void;
  onUpdateProject: (project: ResearchProjectItem) => void;
  onNotify: (msg: string) => void;
}

type ProjectViewMode = 'cards' | 'kanban' | 'gantt';
const STATUS_COLUMNS: ResearchProjectItem['status'][] = ['Active', 'In Review', 'At Risk', 'Completed'];

export const ScientistProjectsPanel: React.FC<ScientistProjectsPanelProps> = ({
  session,
  projects,
  onAddProject,
  onUpdateProject,
  onNotify,
}) => {
  const [viewMode, setViewMode] = useState<ProjectViewMode>('cards');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);

  // Project creation wizard state
  const [title, setTitle] = useState('');
  const [grantCode, setGrantCode] = useState('NIH-R01-NEW');
  const [targetDate, setTargetDate] = useState('2027-03-15');
  const [hypothesis, setHypothesis] = useState('');
  const [charter, setCharter] = useState('');
  const [teamInput, setTeamInput] = useState(`${session.userName}, Dr. Liam Patel, Marcus Chen`);
  const [budgetAllocated, setBudgetAllocated] = useState('250000');
  const [firstMilestone, setFirstMilestone] = useState('Assay Design & Sample Accessioning');

  const visibleProjects = projects.filter(
    (p) => statusFilter === 'ALL' || p.status === statusFilter
  );

  const selectedProject = projects.find((p) => p.id === selectedProjectId) ?? null;

  const resetWizard = () => {
    setWizardStep(0);
    setTitle('');
    setGrantCode('NIH-R01-NEW');
    setTargetDate('2027-03-15');
    setHypothesis('');
    setCharter('');
    setBudgetAllocated('250000');
    setFirstMilestone('Assay Design & Sample Accessioning');
  };

  const handleCreateProject = () => {
    if (!title.trim()) {
      onNotify('Project title is required.');
      return;
    }
    const milestones: ProjectMilestone[] = [
      {
        id: 'M1',
        title: firstMilestone.trim() || 'Protocol Design & Validation',
        dueDate: targetDate,
        startWeek: 1,
        durationWeeks: 4,
        completed: false,
      },
      {
        id: 'M2',
        title: 'Wet-Lab Execution & QC Sign-Off',
        dueDate: targetDate,
        startWeek: 5,
        durationWeeks: 4,
        completed: false,
        dependsOn: 'M1',
        dependencyType: 'FS',
      },
    ];
    const created: ResearchProjectItem = {
      id: `PRJ-2026-0${projects.length + 1}`,
      title: title.trim(),
      leadPi: session.userName,
      grantCode: grantCode.trim() || 'INTERNAL-R&D',
      milestoneProgress: 10,
      status: 'Active',
      targetDate,
      hypothesis: hypothesis.trim() || 'Hypothesis under initial protocol design.',
      charter: charter.trim() || 'GLP-compliant experimental charter.',
      teamMembers: teamInput
        .split(',')
        .map((m) => m.trim())
        .filter(Boolean),
      budgetAllocatedUsd: Number(budgetAllocated) || 250000,
      budgetSpentUsd: 12500,
      reagentBurnMonthlyUsd: 6500,
      instrumentHoursUsed: 12,
      milestones,
    };
    onAddProject(created);
    setWizardOpen(false);
    resetWizard();
  };

  const handleToggleMilestone = (proj: ResearchProjectItem, milestoneId: string) => {
    const updatedMilestones = (proj.milestones ?? []).map((m) =>
      m.id === milestoneId ? { ...m, completed: !m.completed } : m
    );
    const doneCount = updatedMilestones.filter((m) => m.completed).length;
    const progress =
      updatedMilestones.length > 0
        ? Math.round((doneCount / updatedMilestones.length) * 100)
        : proj.milestoneProgress;
    onUpdateProject({
      ...proj,
      milestones: updatedMilestones,
      milestoneProgress: progress,
      status: progress === 100 ? 'Completed' : proj.status === 'Completed' ? 'Active' : proj.status,
    });
  };

  const handleMoveStatus = (proj: ResearchProjectItem, nextStatus: ResearchProjectItem['status']) => {
    onUpdateProject({ ...proj, status: nextStatus });
    onNotify(`Updated ${proj.id} status to ${nextStatus}.`);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 3 },
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
        bgcolor: '#FFFFFF',
      }}
    >
      <DashboardSectionHeader
        title="Research Projects & Milestone Tracker"
        subtitle="Project charters, hypotheses, Kanban states, Gantt dependencies, and grant burn tracking"
        moduleRef="2.2"
        actionLabel="New Research Project"
        actionIcon={<AddIcon fontSize="small" />}
        onAction={() => setWizardOpen(true)}
        rightSlot={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', width: { xs: '100%', sm: 'auto' } }}>
            <TextField
              select
              size="small"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ minWidth: { xs: '100%', sm: 125 }, '& .MuiOutlinedInput-root': { borderRadius: '6px', fontSize: '12.5px' } }}
            >
              <MenuItem value="ALL">All Statuses</MenuItem>
              {STATUS_COLUMNS.map((st) => (
                <MenuItem key={st} value={st}>
                  {st}
                </MenuItem>
              ))}
            </TextField>
            <ToggleButtonGroup
              size="small"
              exclusive
              value={viewMode}
              onChange={(_, val) => val && setViewMode(val)}
              sx={{
                width: { xs: '100%', sm: 'auto' },
                '& .MuiToggleButton-root': {
                  flex: { xs: 1, sm: 'initial' },
                  borderRadius: '6px',
                  px: 1.25,
                  py: 0.5,
                  fontSize: '12px',
                  fontWeight: 700,
                },
              }}
            >
              <ToggleButton value="cards">
                <TableRowsIcon sx={{ fontSize: 16, mr: 0.5 }} />
                Cards
              </ToggleButton>
              <ToggleButton value="kanban">
                <ViewKanbanIcon sx={{ fontSize: 16, mr: 0.5 }} />
                Kanban
              </ToggleButton>
              <ToggleButton value="gantt">
                <TimelineIcon sx={{ fontSize: 16, mr: 0.5 }} />
                Gantt
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        }
      />

      {viewMode === 'cards' && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' }, gap: 2, '& > *': { minWidth: 0 } }}>
          {visibleProjects.map((proj) => {
            const allocated = proj.budgetAllocatedUsd ?? 200000;
            const spent = proj.budgetSpentUsd ?? 90000;
            const burnPct = Math.round((spent / Math.max(allocated, 1)) * 100);
            return (
              <Box
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                sx={{
                  p: 2.25,
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  bgcolor: '#F8FAFC',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.25,
                  cursor: 'pointer',
                  transition: 'border-color 0.15s ease, background-color 0.15s ease',
                  '&:hover': { borderColor: '#93C5FD', bgcolor: '#EFF6FF' },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                      {proj.id} · {proj.grantCode}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', fontSize: '15px' }}>
                      {proj.title}
                    </Typography>
                  </Box>
                  <StatusChip label={proj.status} />
                </Box>
                {proj.hypothesis && (
                  <Typography variant="caption" sx={{ color: '#475569', lineHeight: 1.45 }}>
                    <strong>Hypothesis:</strong> {proj.hypothesis}
                  </Typography>
                )}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                      Milestone Completion ({(proj.milestones ?? []).filter((m) => m.completed).length}/{(proj.milestones ?? []).length || 1})
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
                      {proj.milestoneProgress}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={proj.milestoneProgress}
                    sx={{
                      height: 7,
                      borderRadius: 4,
                      bgcolor: '#E2E8F0',
                      '& .MuiLinearProgress-bar': { bgcolor: '#1E40AF', borderRadius: 4 },
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                  <Typography variant="caption" sx={{ color: '#64748B' }}>
                    Lead PI: {proj.leadPi} · Target: {proj.targetDate}
                  </Typography>
                  <Chip
                    size="small"
                    label={`Grant Burn: ${burnPct}% ($${Math.round(spent / 1000)}k/$${Math.round(allocated / 1000)}k)`}
                    sx={{
                      height: 20,
                      borderRadius: '6px',
                      bgcolor: '#EFF6FF',
                      color: '#1E40AF',
                      border: '1px solid #DBEAFE',
                      fontSize: '10.5px',
                      fontWeight: 700,
                    }}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      )}

      {viewMode === 'kanban' && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' }, gap: 1.5, '& > *': { minWidth: 0 } }}>
          {STATUS_COLUMNS.map((col) => {
            const colItems = visibleProjects.filter((p) => p.status === col);
            return (
              <Box
                key={col}
                sx={{
                  p: 1.5,
                  borderRadius: '8px',
                  bgcolor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  minHeight: 220,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.25,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <StatusChip label={col} />
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748B' }}>
                    {colItems.length}
                  </Typography>
                </Box>
                {colItems.map((proj) => (
                  <Box
                    key={proj.id}
                    sx={{
                      p: 1.5,
                      borderRadius: '6px',
                      bgcolor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0.75,
                    }}
                  >
                    <Typography
                      variant="caption"
                      onClick={() => setSelectedProjectId(proj.id)}
                      sx={{ color: '#1E40AF', fontWeight: 800, cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
                    >
                      {proj.id}
                    </Typography>
                    <Typography
                      variant="body2"
                      onClick={() => setSelectedProjectId(proj.id)}
                      sx={{ fontWeight: 700, color: '#0F172A', fontSize: '13px', cursor: 'pointer' }}
                    >
                      {proj.title}
                    </Typography>
                    <TextField
                      select
                      size="small"
                      value={proj.status}
                      onChange={(e) => handleMoveStatus(proj, e.target.value as ResearchProjectItem['status'])}
                      sx={{ '& .MuiOutlinedInput-root': { fontSize: '11.5px', borderRadius: '6px' } }}
                    >
                      {STATUS_COLUMNS.map((st) => (
                        <MenuItem key={st} value={st} sx={{ fontSize: '12px' }}>
                          Move to {st}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                ))}
              </Box>
            );
          })}
        </Box>
      )}

      {viewMode === 'gantt' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {visibleProjects.map((proj) => (
            <Box
              key={proj.id}
              sx={{
                p: 2,
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                bgcolor: '#F8FAFC',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.25 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  {proj.id} · {proj.title}
                </Typography>
                <Button size="small" onClick={() => setSelectedProjectId(proj.id)} sx={{ fontWeight: 700, color: '#1E40AF' }}>
                  Manage Milestones
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {(proj.milestones ?? []).map((m) => {
                  const leftPct = ((m.startWeek - 1) / 13) * 100;
                  const widthPct = Math.max((m.durationWeeks / 13) * 100, 14);
                  return (
                    <Box key={m.id} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '240px 1fr' }, gap: 1.5, alignItems: 'center' }}>
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A', display: 'block' }}>
                          {m.id}: {m.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748B', fontSize: '10.5px' }}>
                          Due {m.dueDate} {m.dependsOn ? `· Depends on ${m.dependsOn} (${m.dependencyType ?? 'FS'})` : ''}
                        </Typography>
                      </Box>
                      <Box sx={{ position: 'relative', height: 22, bgcolor: '#E2E8F0', borderRadius: '6px', overflow: 'hidden' }}>
                        <Box
                          sx={{
                            position: 'absolute',
                            left: `${Math.min(leftPct, 82)}%`,
                            width: `${Math.min(widthPct, 100 - leftPct)}%`,
                            top: 2,
                            bottom: 2,
                            borderRadius: '4px',
                            bgcolor: m.completed ? '#10B981' : '#1E40AF',
                            display: 'flex',
                            alignItems: 'center',
                            px: 1,
                          }}
                        >
                          <Typography variant="caption" sx={{ color: '#FFFFFF', fontSize: '10px', fontWeight: 700 }} noWrap>
                            W{m.startWeek}–W{m.startWeek + m.durationWeeks - 1}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* Multi-Step Project Creation Wizard */}
      <Dialog open={wizardOpen} onClose={() => setWizardOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Create Research Project (Wizard)</DialogTitle>
        <DialogContent dividers>
          <Stepper activeStep={wizardStep} sx={{ mb: 2.5 }}>
            <Step><StepLabel>Charter & Hypothesis</StepLabel></Step>
            <Step><StepLabel>Team & Budget</StepLabel></Step>
            <Step><StepLabel>Initial Milestones</StepLabel></Step>
          </Stepper>

          {wizardStep === 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Project Title"
                size="small"
                fullWidth
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="Scientific Hypothesis"
                size="small"
                fullWidth
                multiline
                rows={2}
                value={hypothesis}
                onChange={(e) => setHypothesis(e.target.value)}
                placeholder="State measurable biological hypothesis..."
              />
              <TextField
                label="Project Charter & Scope"
                size="small"
                fullWidth
                multiline
                rows={2}
                value={charter}
                onChange={(e) => setCharter(e.target.value)}
              />
            </Box>
          )}

          {wizardStep === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Grant / Funding Code"
                size="small"
                fullWidth
                value={grantCode}
                onChange={(e) => setGrantCode(e.target.value)}
              />
              <TextField
                label="Allocated Grant Budget (USD)"
                type="number"
                size="small"
                fullWidth
                value={budgetAllocated}
                onChange={(e) => setBudgetAllocated(e.target.value)}
              />
              <TextField
                label="Research Team Roster (comma-separated)"
                size="small"
                fullWidth
                value={teamInput}
                onChange={(e) => setTeamInput(e.target.value)}
              />
            </Box>
          )}

          {wizardStep === 2 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Primary Milestone M1"
                size="small"
                fullWidth
                value={firstMilestone}
                onChange={(e) => setFirstMilestone(e.target.value)}
              />
              <TextField
                select
                label="Target Completion Quarter"
                size="small"
                fullWidth
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
              >
                <MenuItem value="2027-03-15">Q1 2027 (2027-03-15)</MenuItem>
                <MenuItem value="2027-06-30">Q2 2027 (2027-06-30)</MenuItem>
                <MenuItem value="2027-09-30">Q3 2027 (2027-09-30)</MenuItem>
              </TextField>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setWizardOpen(false)}>Cancel</Button>
          {wizardStep > 0 && (
            <Button onClick={() => setWizardStep((s) => s - 1)}>Back</Button>
          )}
          {wizardStep < 2 ? (
            <Button
              variant="contained"
              onClick={() => setWizardStep((s) => s + 1)}
              sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleCreateProject}
              sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}
            >
              Launch Project
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Project Drill-Down Drawer */}
      <Drawer
        anchor="right"
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProjectId(null)}
        slotProps={{ paper: { sx: { width: { xs: '100%', sm: 460 }, p: 3 } } }}
      >
        {selectedProject && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                  {selectedProject.id} · {selectedProject.grantCode}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  {selectedProject.title}
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => setSelectedProjectId(null)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <StatusChip label={selectedProject.status} />

            {selectedProject.hypothesis && (
              <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
                <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 800, display: 'block' }}>
                  HYPOTHESIS & CHARTER
                </Typography>
                <Typography variant="body2" sx={{ color: '#0F172A', fontSize: '13px', mt: 0.5 }}>
                  {selectedProject.hypothesis}
                </Typography>
                {selectedProject.charter && (
                  <Typography variant="caption" sx={{ color: '#475569', display: 'block', mt: 0.5 }}>
                    {selectedProject.charter}
                  </Typography>
                )}
              </Box>
            )}

            <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#0F172A', display: 'block', mb: 1 }}>
                Grant & Resource Allocation
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1 }}>
                <Typography variant="caption" sx={{ color: '#475569' }}>
                  Spent: <strong>${(selectedProject.budgetSpentUsd ?? 90000).toLocaleString()}</strong> / ${(selectedProject.budgetAllocatedUsd ?? 200000).toLocaleString()}
                </Typography>
                <Typography variant="caption" sx={{ color: '#475569' }}>
                  Reagent Burn: <strong>${(selectedProject.reagentBurnMonthlyUsd ?? 8000).toLocaleString()}/mo</strong>
                </Typography>
                <Typography variant="caption" sx={{ color: '#475569' }}>
                  Instrument Hours: <strong>{selectedProject.instrumentHoursUsed ?? 48} hrs</strong>
                </Typography>
                <Typography variant="caption" sx={{ color: '#475569' }}>
                  Team: <strong>{(selectedProject.teamMembers ?? [selectedProject.leadPi]).join(', ')}</strong>
                </Typography>
              </Box>
            </Box>

            <Divider />

            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
              Milestones & Dependencies
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {(selectedProject.milestones ?? []).map((m) => (
                <Box
                  key={m.id}
                  onClick={() => handleToggleMilestone(selectedProject, m.id)}
                  sx={{
                    p: 1.25,
                    borderRadius: '6px',
                    border: '1px solid #E2E8F0',
                    bgcolor: m.completed ? '#EFF6FF' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                  }}
                >
                  <Checkbox checked={m.completed} size="small" sx={{ p: 0.25, color: '#1E40AF' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '13px', color: '#0F172A' }}>
                      {m.id} · {m.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      Due {m.dueDate} {m.dependsOn ? `· Dep: ${m.dependsOn} (${m.dependencyType ?? 'FS'})` : ''}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Drawer>
    </Paper>
  );
};
