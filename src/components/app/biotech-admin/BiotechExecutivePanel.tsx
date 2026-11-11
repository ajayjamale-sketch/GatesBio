import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Switch,
  Typography,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import SpeedIcon from '@mui/icons-material/Speed';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { EquipmentItem } from '../../../types';
import type {
  BudgetAllocation,
  CapaDeviationItem,
  ResearchProjectItem,
} from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';
import { WorkstationSplitView } from '../shared/WorkstationSplitView';

interface BiotechExecutivePanelProps {
  budgets: BudgetAllocation[];
  projects: ResearchProjectItem[];
  equipment: EquipmentItem[];
  capas: CapaDeviationItem[];
  onCycleCapaStatus: (capaId: string) => void;
  onNavigateTab: (tabId: string) => void;
  onNotify: (msg: string) => void;
}

export const BiotechExecutivePanel: React.FC<BiotechExecutivePanelProps> = ({
  budgets,
  projects,
  equipment,
  capas,
  onCycleCapaStatus,
  onNavigateTab,
  onNotify,
}) => {
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  const chartData = budgets.map((b) => ({
    ...b,
    shortDept: b.department.split(' ')[0],
  }));

  const avgProgress = Math.round(
    projects.reduce((a, p) => a + p.milestoneProgress, 0) / Math.max(projects.length, 1)
  );
  const openCapas = capas.filter((c) => c.status !== 'Closed').length;
  const calDueCount = equipment.filter((e) => e.status === 'Calibration Due').length;

  const handleExportCsv = () => {
    const rows = [
      'Category,Name,GrantOrStatus,MetricA,MetricB',
      ...budgets.map(
        (b) => `Budget,"${b.department}",${b.grantCode},Allocated $${b.allocatedUsd},Spent $${b.spentUsd}`
      ),
      ...projects.map(
        (p) => `Project,"${p.title}",${p.status},${p.milestoneProgress}% Complete,${p.grantCode}`
      ),
      ...capas.map(
        (c) => `Compliance,"${c.id} ${c.source}",${c.status},${c.category},Severity ${c.severity}`
      ),
    ];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'gatsbio_executive_bi_report.csv';
    link.click();
    URL.revokeObjectURL(url);
    onNotify('Downloaded Executive R&D BI Report (CSV).');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <WorkstationSplitView
        primary={
          <Paper
            elevation={0}
            sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
          >
            <DashboardSectionHeader
              title="Department Grant & R&D Budget Utilization"
              subtitle="Allocated funding vs. reagent, sequencing, and instrument spend"
              moduleRef="2.11"
              rightSlot={
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onNavigateTab('funding')}
                    sx={{ borderColor: '#CBD5E1', color: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}
                  >
                    Manage Budgets
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<PrintIcon fontSize="small" />}
                    onClick={() => window.print()}
                    sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 700, borderRadius: '6px' }}
                  >
                    Print / PDF
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<DownloadIcon fontSize="small" />}
                    onClick={handleExportCsv}
                    sx={{ bgcolor: '#1E40AF', '&:hover': { bgcolor: '#1E3A8A' }, fontWeight: 700, borderRadius: '6px' }}
                  >
                    Export BI
                  </Button>
                </Box>
              }
            />

            {/* Operational Velocity Strip (PRD 2.11) */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(3, minmax(0, 1fr))' },
                gap: 1.25,
                mb: 2,
                '& > *': { minWidth: 0 },
              }}
            >
              <Box sx={{ p: 1.25, borderRadius: '8px', bgcolor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
                <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <SpeedIcon sx={{ fontSize: 15 }} /> Avg Sample TAT
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  6.2 hrs
                </Typography>
              </Box>
              <Box sx={{ p: 1.25, borderRadius: '8px', bgcolor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
                <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 700 }}>
                  Open Test Queue Depth
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  14 Assays
                </Typography>
              </Box>
              <Box sx={{ p: 1.25, borderRadius: '8px', bgcolor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
                <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 700 }}>
                  On-Time Milestone Rate
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  {avgProgress}%
                </Typography>
              </Box>
            </Box>

            <Box sx={{ width: '100%', height: { xs: 220, sm: 260 } }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="shortDept" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} tickFormatter={(v) => `$${v / 1000}k`} />
                  <RechartsTooltip />
                  <Bar dataKey="allocatedUsd" name="Allocated ($)" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="spentUsd" name="Spent ($)" fill="#1E40AF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        }
        inspector={
          <Paper
            elevation={0}
            sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <AutoAwesomeIcon sx={{ color: '#1E40AF', fontSize: 20 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A' }}>
                AI Executive Productivity Brief
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF' }}>
                  THROUGHPUT GAIN
                </Typography>
                <Typography variant="body2" sx={{ color: '#0F172A', fontWeight: 600, mt: 0.4, fontSize: '13px' }}>
                  Automated barcode accessioning saved 31.4 lab hours across Functional Genomics this week.
                </Typography>
              </Box>
              <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: calDueCount > 0 ? '#FFFBEB' : '#EFF6FF', border: `1px solid ${calDueCount > 0 ? '#FDE68A' : '#DBEAFE'}` }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: calDueCount > 0 ? '#92400E' : '#1E40AF' }}>
                  EQUIPMENT & CALIBRATION
                </Typography>
                <Typography variant="body2" sx={{ color: '#0F172A', fontWeight: 600, mt: 0.4, fontSize: '13px' }}>
                  {calDueCount} instrument(s) pending ISO 17025 calibration review.
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: '8px',
                  bgcolor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1,
                }}
              >
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#0F172A', display: 'block' }}>
                    Scheduled Executive Digest
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B' }}>
                    Weekly PDF/CSV summary (Mondays 08:00)
                  </Typography>
                </Box>
                <Switch
                  size="small"
                  checked={weeklyDigest}
                  onChange={(e) => {
                    setWeeklyDigest(e.target.checked);
                    onNotify(
                      e.target.checked
                        ? 'Enabled weekly scheduled BI executive digest.'
                        : 'Paused scheduled BI executive digest.'
                    );
                  }}
                />
              </Box>
            </Box>
          </Paper>
        }
      />

      {/* Portfolio Health Summary + Compliance & CAPA Oversight (PRD 2.10) */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'minmax(0, 1fr) minmax(0, 1fr)' },
          gap: 2.5,
          '& > *': { minWidth: 0 },
        }}
      >
        <Paper
          elevation={0}
          sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
        >
          <DashboardSectionHeader
            title="Portfolio Milestone Snapshot"
            subtitle="Cross-department progress summary"
            rightSlot={
              <Button size="small" onClick={() => onNavigateTab('portfolio')} sx={{ fontWeight: 700, color: '#1E40AF' }}>
                Open Full Portfolio →
              </Button>
            }
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            {projects.slice(0, 4).map((p) => (
              <Box key={p.id} sx={{ p: 1.25, borderRadius: '8px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#0F172A' }}>
                    {p.id} · {p.title}
                  </Typography>
                  <StatusChip label={p.status} />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={p.milestoneProgress}
                  sx={{ height: 6, borderRadius: 4, bgcolor: '#E2E8F0', '& .MuiLinearProgress-bar': { bgcolor: '#1E40AF', borderRadius: 4 } }}
                />
              </Box>
            ))}
          </Box>
        </Paper>

        <Paper
          elevation={0}
          sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
        >
          <DashboardSectionHeader
            title="Compliance, CAPA & SOP Oversight"
            subtitle="21 CFR Part 11 audit readiness and active deviations"
            moduleRef="2.10"
            rightSlot={
              <Chip
                icon={<VerifiedUserIcon sx={{ fontSize: '15px !important', color: '#1E40AF !important' }} />}
                label={`SOP Attestation: 98.4% · ${openCapas} Open CAPA`}
                sx={{ bgcolor: '#EFF6FF', color: '#1E40AF', border: '1px solid #DBEAFE', fontWeight: 700, borderRadius: '6px' }}
              />
            }
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            {capas.map((capa) => (
              <Box
                key={capa.id}
                sx={{
                  p: 1.5,
                  borderRadius: '8px',
                  bgcolor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  alignItems: { xs: 'stretch', sm: 'center' },
                  gap: 1,
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', fontFamily: 'var(--font-mono)' }}>
                    {capa.id} · {capa.category}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>
                    {capa.source}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
                  <StatusChip label={capa.severity} />
                  <StatusChip label={capa.status} />
                  {capa.status !== 'Closed' && (
                    <Button
                      size="small"
                      onClick={() => onCycleCapaStatus(capa.id)}
                      sx={{ fontSize: '11px', fontWeight: 700, color: '#1E40AF' }}
                    >
                      Advance →
                    </Button>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
