import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import type { ResearchProjectItem } from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';

interface BiotechPortfolioPanelProps {
  projects: ResearchProjectItem[];
  onSaveProject: (proj: ResearchProjectItem, isEdit: boolean) => void;
  onDeleteProject: (proj: ResearchProjectItem) => void;
}

const PROJECT_STATUSES: ('ALL' | ResearchProjectItem['status'])[] = [
  'ALL',
  'Active',
  'In Review',
  'At Risk',
  'Completed',
];

export const BiotechPortfolioPanel: React.FC<BiotechPortfolioPanelProps> = ({
  projects,
  onSaveProject,
  onDeleteProject,
}) => {
  const [statusFilter, setStatusFilter] = useState<'ALL' | ResearchProjectItem['status']>('ALL');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProj, setEditingProj] = useState<ResearchProjectItem | null>(null);
  const [form, setForm] = useState<{
    title: string;
    leadPi: string;
    grantCode: string;
    milestoneProgress: string;
    status: ResearchProjectItem['status'];
    targetDate: string;
    budgetAllocatedUsd: string;
  }>({
    title: '',
    leadPi: 'Dr. Elena Vance, Ph.D.',
    grantCode: 'VGB-BIO-204',
    milestoneProgress: '20',
    status: 'Active',
    targetDate: '2027-03-15',
    budgetAllocatedUsd: '250000',
  });

  const visibleProjects = projects.filter(
    (p) => statusFilter === 'ALL' || p.status === statusFilter
  );

  const openCreate = () => {
    setEditingProj(null);
    setForm({
      title: '',
      leadPi: 'Dr. Elena Vance, Ph.D.',
      grantCode: 'VGB-BIO-204',
      milestoneProgress: '15',
      status: 'Active',
      targetDate: '2027-03-15',
      budgetAllocatedUsd: '250000',
    });
    setModalOpen(true);
  };

  const openEdit = (p: ResearchProjectItem) => {
    setEditingProj(p);
    setForm({
      title: p.title,
      leadPi: p.leadPi,
      grantCode: p.grantCode,
      milestoneProgress: String(p.milestoneProgress),
      status: p.status,
      targetDate: p.targetDate,
      budgetAllocatedUsd: String(p.budgetAllocatedUsd ?? 250000),
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const progress = Math.min(100, Math.max(0, Number(form.milestoneProgress) || 0));
    const item: ResearchProjectItem = editingProj
      ? {
          ...editingProj,
          title: form.title.trim(),
          leadPi: form.leadPi.trim(),
          grantCode: form.grantCode.trim(),
          milestoneProgress: progress,
          status: form.status,
          targetDate: form.targetDate,
          budgetAllocatedUsd: Number(form.budgetAllocatedUsd) || 250000,
        }
      : {
          id: `PRJ-2026-0${projects.length + 1}`,
          title: form.title.trim(),
          leadPi: form.leadPi.trim(),
          grantCode: form.grantCode.trim() || 'INTERNAL',
          milestoneProgress: progress,
          status: form.status,
          targetDate: form.targetDate,
          budgetAllocatedUsd: Number(form.budgetAllocatedUsd) || 250000,
          budgetSpentUsd: 15000,
        };
    onSaveProject(item, Boolean(editingProj));
    setModalOpen(false);
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
      >
        <DashboardSectionHeader
          title="Research Portfolio & Milestone Governance"
          subtitle="Create, filter by risk state, update milestone progress, or reassign PIs"
          moduleRef="2.2"
          actionLabel="New Project"
          actionIcon={<AddIcon fontSize="small" />}
          onAction={openCreate}
          rightSlot={
            <TextField
              select
              size="small"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'ALL' | ResearchProjectItem['status'])}
              sx={{ minWidth: { xs: '100%', sm: 145 }, '& .MuiOutlinedInput-root': { borderRadius: '6px', fontSize: '12.5px' } }}
            >
              {PROJECT_STATUSES.map((st) => (
                <MenuItem key={st} value={st}>
                  {st === 'ALL' ? 'All Project States' : st}
                </MenuItem>
              ))}
            </TextField>
          }
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' },
            gap: 2,
            '& > *': { minWidth: 0 },
          }}
        >
          {visibleProjects.map((proj) => (
            <Box key={proj.id} sx={{ p: 2, borderRadius: '8px', border: '1px solid #E2E8F0', bgcolor: '#F8FAFC' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75, flexWrap: 'wrap', gap: 0.75 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', fontFamily: 'var(--font-mono)' }}>
                  {proj.id} · {proj.grantCode}
                </Typography>
                <StatusChip label={proj.status} />
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', mb: 1, wordBreak: 'break-word' }}>
                {proj.title}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={proj.milestoneProgress}
                sx={{
                  height: 6,
                  borderRadius: 4,
                  bgcolor: '#E2E8F0',
                  mb: 0.75,
                  '& .MuiLinearProgress-bar': { bgcolor: '#1E40AF', borderRadius: 4 },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, flexWrap: 'wrap', gap: 1 }}>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  {proj.leadPi} · {proj.milestoneProgress}% · Target {proj.targetDate}
                </Typography>
                <Box>
                  <IconButton size="small" onClick={() => openEdit(proj)} aria-label={`Edit ${proj.title}`}>
                    <EditIcon fontSize="small" sx={{ color: '#1E40AF' }} />
                  </IconButton>
                  <IconButton size="small" onClick={() => onDeleteProject(proj)} aria-label={`Delete ${proj.title}`}>
                    <DeleteOutlineIcon fontSize="small" sx={{ color: '#DC2626' }} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>{editingProj ? 'Edit Project' : 'New Research Project'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Project Title" size="small" fullWidth required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <TextField label="Lead PI" size="small" fullWidth value={form.leadPi} onChange={(e) => setForm({ ...form, leadPi: e.target.value })} />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.25 }}>
              <TextField label="Grant Code" size="small" fullWidth value={form.grantCode} onChange={(e) => setForm({ ...form, grantCode: e.target.value })} />
              <TextField label="Budget (USD)" type="number" size="small" fullWidth value={form.budgetAllocatedUsd} onChange={(e) => setForm({ ...form, budgetAllocatedUsd: e.target.value })} />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.25 }}>
              <TextField label="Progress (%)" type="number" size="small" fullWidth value={form.milestoneProgress} onChange={(e) => setForm({ ...form, milestoneProgress: e.target.value })} />
              <TextField select label="Status" size="small" fullWidth value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as ResearchProjectItem['status'] })}>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="In Review">In Review</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="At Risk">At Risk</MenuItem>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}>
              {editingProj ? 'Save Project' : 'Create Project'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
