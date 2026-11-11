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
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import CloseIcon from '@mui/icons-material/Close';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CRYO_TELEMETRY_SERIES } from '../../../data/roleDashboardData';
import type { EquipmentItem } from '../../../types';
import type {
  DashboardSession,
  EquipmentBooking,
  MaintenanceLogEntry,
} from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';

interface TechEquipmentTelemetryPanelProps {
  session: DashboardSession;
  equipment: EquipmentItem[];
  bookings: EquipmentBooking[];
  maintenanceLogs: MaintenanceLogEntry[];
  onLogMaintenance: (eqpId: string, log: MaintenanceLogEntry) => void;
  onAddBooking: (booking: EquipmentBooking) => void;
  onNotify: (msg: string) => void;
}

export const TechEquipmentTelemetryPanel: React.FC<TechEquipmentTelemetryPanelProps> = ({
  session,
  equipment,
  bookings,
  maintenanceLogs,
  onLogMaintenance,
  onAddBooking,
  onNotify,
}) => {
  const [selectedEqpId, setSelectedEqpId] = useState<string | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [maintenanceOpen, setMaintenanceOpen] = useState(false);

  // Booking form state
  const [bookEqpId, setBookEqpId] = useState(equipment[0]?.id ?? 'EQP-01');
  const [bookStart, setBookStart] = useState('13');
  const [bookEnd, setBookEnd] = useState('15');
  const [bookPriority, setBookPriority] = useState<'Trial / STAT' | 'Standard'>('Standard');
  const [bookPurpose, setBookPurpose] = useState('WGS Library Sequencing Run');

  // Maintenance / Cleaning log form
  const [maintEqpId, setMaintEqpId] = useState(equipment[3]?.id ?? 'EQP-04');
  const [maintType, setMaintType] = useState<MaintenanceLogEntry['type']>('Calibration');
  const [maintNote, setMaintNote] = useState('Verified within ISO 17025 drift tolerance limits.');

  const selectedEqp = equipment.find((e) => e.id === selectedEqpId) ?? null;

  // Threshold alert check for telemetry
  const latestPoint = CRYO_TELEMETRY_SERIES[CRYO_TELEMETRY_SERIES.length - 1];
  const tempAlert = latestPoint.ult01 > -77 || latestPoint.ult02 > -77;
  const co2Alert = latestPoint.co2 < 4.5 || latestPoint.co2 > 5.5;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const startH = Number(bookStart);
    const endH = Number(bookEnd);
    if (Number.isNaN(startH) || Number.isNaN(endH) || endH <= startH) {
      onNotify('End hour must be after start hour.');
      return;
    }

    // Anti-collision check
    const conflict = bookings.find(
      (b) =>
        b.equipmentId === bookEqpId &&
        b.date === '2026-11-11' &&
        startH < b.endHour &&
        endH > b.startHour
    );
    if (conflict) {
      onNotify(
        `Slot collision on ${bookEqpId}: conflicts with ${conflict.operator} (${conflict.startHour}:00–${conflict.endHour}:00).`
      );
      return;
    }

    const created: EquipmentBooking = {
      id: `BKG-${201 + bookings.length}`,
      equipmentId: bookEqpId,
      operator: session.userName,
      date: '2026-11-11',
      startHour: startH,
      endHour: endH,
      priority: bookPriority,
      purpose: bookPurpose.trim() || 'Instrument Run',
    };
    onAddBooking(created);
    setBookingOpen(false);
    onNotify(`Reserved ${bookEqpId} (${startH}:00–${endH}:00, ${bookPriority}).`);
  };

  const handleMaintenanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: MaintenanceLogEntry = {
      id: `MNT-${301 + maintenanceLogs.length}`,
      equipmentId: maintEqpId,
      type: maintType,
      performedBy: session.userName,
      date: '2026-11-11',
      driftNote: maintNote.trim() || 'Completed preventive checklist',
      passed: true,
    };
    onLogMaintenance(maintEqpId, entry);
    setMaintenanceOpen(false);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'minmax(0, 1fr) minmax(0, 1.15fr)' }, gap: 2.5, '& > *': { minWidth: 0 } }}>
      {/* Equipment Inventory, Booking & Maintenance */}
      <Paper
        elevation={0}
        sx={{ p: { xs: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}
      >
        <DashboardSectionHeader
          title="Equipment, Booking & Maintenance"
          subtitle="Anti-collision instrument slots, cleaning logs, and ISO 17025 calibration"
          moduleRef="2.6"
          rightSlot={
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<BuildIcon fontSize="small" />}
                onClick={() => setMaintenanceOpen(true)}
                sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 700, borderRadius: '6px' }}
              >
                Log Maint / Clean
              </Button>
              <Button
                size="small"
                variant="contained"
                startIcon={<EventAvailableIcon fontSize="small" />}
                onClick={() => setBookingOpen(true)}
                sx={{ bgcolor: '#1E40AF', '&:hover': { bgcolor: '#1E3A8A' }, fontWeight: 700, borderRadius: '6px' }}
              >
                Book Slot
              </Button>
            </Box>
          }
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mb: 2 }}>
          {equipment.map((eq) => (
            <Box
              key={eq.id}
              onClick={() => setSelectedEqpId(eq.id)}
              sx={{
                p: 1.5,
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                bgcolor: '#F8FAFC',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                '&:hover': { borderColor: '#93C5FD', bgcolor: '#EFF6FF' },
              }}
            >
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  {eq.name}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  {eq.location} · Next Cal: {eq.nextCalibration}
                </Typography>
              </Box>
              <StatusChip label={eq.status} />
            </Box>
          ))}
        </Box>

        <Typography variant="caption" sx={{ fontWeight: 800, color: '#475569', display: 'block', mb: 1 }}>
          TODAY&apos;S INSTRUMENT RESERVATIONS
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          {bookings.map((b) => (
            <Box
              key={b.id}
              sx={{
                p: 1,
                borderRadius: '6px',
                bgcolor: '#EFF6FF',
                border: '1px solid #DBEAFE',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF' }}>
                  {b.equipmentId} · {b.startHour}:00–{b.endHour}:00
                </Typography>
                <Typography variant="caption" sx={{ color: '#334155', display: 'block' }}>
                  {b.purpose} ({b.operator})
                </Typography>
              </Box>
              <Chip
                size="small"
                label={b.priority}
                sx={{
                  height: 20,
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: 700,
                  bgcolor: b.priority === 'Trial / STAT' ? '#FEF2F2' : '#FFFFFF',
                  color: b.priority === 'Trial / STAT' ? '#991B1B' : '#1E40AF',
                }}
              />
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Cryo & CO2 IoT Telemetry */}
      <Paper
        elevation={0}
        sx={{ p: { xs: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}
      >
        <DashboardSectionHeader
          title="Cryo Freezer & Incubator CO2 Telemetry"
          subtitle="Live MQTT sensor feeds with threshold tolerance bands (-80°C ± 3°C, CO2 5.0%)"
          moduleRef="2.6"
          rightSlot={
            <Chip
              size="small"
              label={tempAlert || co2Alert ? 'Threshold Alert' : `CO2: ${latestPoint.co2}% Nominal`}
              sx={{
                borderRadius: '6px',
                fontWeight: 700,
                bgcolor: tempAlert || co2Alert ? '#FEF2F2' : '#EFF6FF',
                color: tempAlert || co2Alert ? '#991B1B' : '#1E40AF',
                border: `1px solid ${tempAlert || co2Alert ? '#FECACA' : '#DBEAFE'}`,
              }}
            />
          }
        />

        <Box sx={{ width: '100%', height: { xs: 210, sm: 245 } }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={CRYO_TELEMETRY_SERIES}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis yAxisId="temp" domain={[-82, -76]} tick={{ fontSize: 11, fill: '#64748B' }} unit="°C" />
              <YAxis yAxisId="co2" orientation="right" domain={[4.0, 6.0]} tick={{ fontSize: 11, fill: '#64748B' }} unit="%" />
              <ReferenceLine yAxisId="temp" y={-77} stroke="#DC2626" strokeDasharray="4 4" />
              <RechartsTooltip />
              <Line yAxisId="temp" type="monotone" dataKey="ult01" name="ULT-01 (°C)" stroke="#1E40AF" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line yAxisId="temp" type="monotone" dataKey="ult02" name="ULT-02 (°C)" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
              <Line yAxisId="co2" type="monotone" dataKey="co2" name="Incubator CO2 (%)" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 1.5 }}>
          Red dashed line indicates -77°C upper alarm threshold (SMS + email alert dispatch active).
        </Typography>
      </Paper>

      {/* Equipment Spec & Maintenance Drawer */}
      <Drawer
        anchor="right"
        open={Boolean(selectedEqp)}
        onClose={() => setSelectedEqpId(null)}
        slotProps={{ paper: { sx: { width: { xs: '100%', sm: 420 }, p: 3 } } }}
      >
        {selectedEqp && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                  {selectedEqp.id}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  {selectedEqp.name}
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => setSelectedEqpId(null)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <StatusChip label={selectedEqp.status} />

            <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', display: 'block', mb: 0.5 }}>
                SPEC SHEET & VENDOR CONTRACT
              </Typography>
              <Typography variant="caption" sx={{ color: '#0F172A', display: 'block' }}>
                Model: {selectedEqp.model}
              </Typography>
              <Typography variant="caption" sx={{ color: '#475569', display: 'block' }}>
                Location: {selectedEqp.location} · Next Cal: {selectedEqp.nextCalibration}
              </Typography>
              <Typography variant="caption" sx={{ color: '#475569', display: 'block' }}>
                Warranty: Enterprise Platinum SLA · Emergency Vendor: +1 (800) 555-0194
              </Typography>
            </Box>

            <Divider />

            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
              Calibration & Cleaning History
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {maintenanceLogs
                .filter((m) => m.equipmentId === selectedEqp.id)
                .map((m) => (
                  <Box key={m.id} sx={{ p: 1.25, borderRadius: '8px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4 }}>
                      <Chip size="small" label={m.type} sx={{ height: 20, bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 700, borderRadius: '4px' }} />
                      <Typography variant="caption" sx={{ color: '#64748B' }}>{m.date}</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 600, display: 'block' }}>
                      {m.driftNote}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      Logged by {m.performedBy}
                    </Typography>
                  </Box>
                ))}
            </Box>
          </Box>
        )}
      </Drawer>

      {/* Book Instrument Slot Dialog */}
      <Dialog open={bookingOpen} onClose={() => setBookingOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Book Instrument Time Slot</DialogTitle>
        <form onSubmit={handleBookingSubmit}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField select label="Instrument" size="small" fullWidth value={bookEqpId} onChange={(e) => setBookEqpId(e.target.value)}>
              {equipment.map((eq) => (
                <MenuItem key={eq.id} value={eq.id}>{eq.id} · {eq.name}</MenuItem>
              ))}
            </TextField>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.25, '& > *': { minWidth: 0 } }}>
              <TextField label="Start Hour (24h)" type="number" size="small" value={bookStart} onChange={(e) => setBookStart(e.target.value)} />
              <TextField label="End Hour (24h)" type="number" size="small" value={bookEnd} onChange={(e) => setBookEnd(e.target.value)} />
            </Box>
            <TextField select label="Booking Priority Tier" size="small" fullWidth value={bookPriority} onChange={(e) => setBookPriority(e.target.value as 'Trial / STAT' | 'Standard')}>
              <MenuItem value="Standard">Standard Run</MenuItem>
              <MenuItem value="Trial / STAT">Mission-Critical Trial / STAT</MenuItem>
            </TextField>
            <TextField label="Run Purpose" size="small" fullWidth required value={bookPurpose} onChange={(e) => setBookPurpose(e.target.value)} />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setBookingOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}>
              Reserve Slot
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Log Maintenance / Cleaning / Calibration Dialog */}
      <Dialog open={maintenanceOpen} onClose={() => setMaintenanceOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Log Calibration, Maintenance or Cleaning</DialogTitle>
        <form onSubmit={handleMaintenanceSubmit}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField select label="Instrument" size="small" fullWidth value={maintEqpId} onChange={(e) => setMaintEqpId(e.target.value)}>
              {equipment.map((eq) => (
                <MenuItem key={eq.id} value={eq.id}>{eq.id} · {eq.name}</MenuItem>
              ))}
            </TextField>
            <TextField select label="Activity Type" size="small" fullWidth value={maintType} onChange={(e) => setMaintType(e.target.value as MaintenanceLogEntry['type'])}>
              <MenuItem value="Calibration">ISO 17025 Calibration</MenuItem>
              <MenuItem value="Preventive Maintenance">Preventive Maintenance</MenuItem>
              <MenuItem value="Cleaning">Decontamination & Cleaning</MenuItem>
            </TextField>
            <TextField label="Drift / Inspection Notes" multiline rows={2} size="small" fullWidth required value={maintNote} onChange={(e) => setMaintNote(e.target.value)} />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setMaintenanceOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}>
              Save Maintenance Log
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
