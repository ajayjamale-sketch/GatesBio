import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { EQUIPMENT_UTILIZATION_SERIES } from '../../../data/roleDashboardData';
import type { EquipmentItem } from '../../../types';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';

interface BiotechLabUtilizationPanelProps {
  equipment: EquipmentItem[];
  onSaveEquipment: (eq: EquipmentItem, isEdit: boolean) => void;
  onMarkCalibrated: (eq: EquipmentItem) => void;
  onDeleteEquipment: (eq: EquipmentItem) => void;
}

export const BiotechLabUtilizationPanel: React.FC<BiotechLabUtilizationPanelProps> = ({
  equipment,
  onSaveEquipment,
  onMarkCalibrated,
  onDeleteEquipment,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEqp, setEditingEqp] = useState<EquipmentItem | null>(null);
  const [form, setForm] = useState<{
    name: string;
    model: string;
    location: string;
    status: EquipmentItem['status'];
    nextCalibration: string;
  }>({
    name: '',
    model: '',
    location: 'Genomics Core Lab',
    status: 'Operational',
    nextCalibration: '2027-04-01',
  });

  const openCreate = () => {
    setEditingEqp(null);
    setForm({
      name: '',
      model: '',
      location: 'Genomics Core Lab',
      status: 'Operational',
      nextCalibration: '2027-04-01',
    });
    setModalOpen(true);
  };

  const openEdit = (eq: EquipmentItem) => {
    setEditingEqp(eq);
    setForm({
      name: eq.name,
      model: eq.model,
      location: eq.location,
      status: eq.status,
      nextCalibration: eq.nextCalibration,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const item: EquipmentItem = editingEqp
      ? {
          ...editingEqp,
          name: form.name.trim(),
          model: form.model.trim(),
          location: form.location.trim(),
          status: form.status,
          nextCalibration: form.nextCalibration,
        }
      : {
          id: `EQP-0${equipment.length + 1}`,
          name: form.name.trim(),
          model: form.model.trim() || 'Analytical System',
          location: form.location.trim(),
          status: form.status,
          nextCalibration: form.nextCalibration,
        };
    onSaveEquipment(item, Boolean(editingEqp));
    setModalOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Instrument Utilization Analytics Chart (PRD 2.6 & 2.11) */}
      <Paper
        elevation={0}
        sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
      >
        <DashboardSectionHeader
          title="Instrument Utilization & Active Hours"
          subtitle="Weekly active vs. idle run hours across core laboratory platforms"
          moduleRef="2.6 / 2.11"
        />
        <Box sx={{ width: '100%', height: { xs: 210, sm: 245 }, mb: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={EQUIPMENT_UTILIZATION_SERIES}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{ fontSize: 10.5, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} unit="h" />
              <RechartsTooltip />
              <Bar dataKey="activeHours" name="Active Hours" fill="#1E40AF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="idleHours" name="Idle Hours" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {EQUIPMENT_UTILIZATION_SERIES.map((m) => (
            <Chip
              key={m.equipmentId}
              size="small"
              label={`${m.name}: ${m.utilizationPct}% util · TAT ${m.tatHours}h`}
              sx={{
                borderRadius: '6px',
                bgcolor: '#EFF6FF',
                color: '#1E40AF',
                border: '1px solid #DBEAFE',
                fontWeight: 700,
                fontSize: '11px',
              }}
            />
          ))}
        </Box>
      </Paper>

      {/* Equipment Inventory & Calibration CRUD */}
      <Paper
        elevation={0}
        sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
      >
        <DashboardSectionHeader
          title="Laboratory Equipment & Calibration Inventory"
          subtitle="Register instruments, update calibration dates, or decommission assets"
          moduleRef="2.6"
          actionLabel="Add Instrument"
          actionIcon={<AddIcon fontSize="small" />}
          onAction={openCreate}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          {equipment.map((eq) => (
            <Box
              key={eq.id}
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', fontFamily: 'var(--font-mono)' }}>
                    {eq.id}
                  </Typography>
                  <StatusChip label={eq.status} />
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', mt: 0.25, wordBreak: 'break-word' }}>
                  {eq.name}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', wordBreak: 'break-word' }}>
                  {eq.model} · {eq.location} · Next Cal: {eq.nextCalibration}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
                {eq.status === 'Calibration Due' && (
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => onMarkCalibrated(eq)}
                    sx={{ bgcolor: '#1E40AF', '&:hover': { bgcolor: '#1E3A8A' }, fontWeight: 700, borderRadius: '6px' }}
                  >
                    Mark Calibrated
                  </Button>
                )}
                <IconButton size="small" onClick={() => openEdit(eq)} aria-label={`Edit ${eq.name}`}>
                  <EditIcon fontSize="small" sx={{ color: '#1E40AF' }} />
                </IconButton>
                <IconButton size="small" onClick={() => onDeleteEquipment(eq)} aria-label={`Delete ${eq.name}`}>
                  <DeleteOutlineIcon fontSize="small" sx={{ color: '#DC2626' }} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>{editingEqp ? 'Edit Lab Instrument' : 'Add Lab Instrument'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Instrument Name" size="small" fullWidth required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <TextField label="Model" size="small" fullWidth value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
            <TextField label="Location" size="small" fullWidth value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            <TextField select label="Status" size="small" fullWidth value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as EquipmentItem['status'] })}>
              <MenuItem value="Operational">Operational</MenuItem>
              <MenuItem value="In Use">In Use</MenuItem>
              <MenuItem value="Calibration Due">Calibration Due</MenuItem>
              <MenuItem value="Maintenance">Maintenance</MenuItem>
            </TextField>
            <TextField label="Next Calibration Date" size="small" fullWidth value={form.nextCalibration} onChange={(e) => setForm({ ...form, nextCalibration: e.target.value })} />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}>
              {editingEqp ? 'Save Instrument' : 'Add Instrument'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
