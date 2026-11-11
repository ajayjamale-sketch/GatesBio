import React, { useState } from 'react';
import { Box, Button, Paper, Tab, Tabs, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import {
  SCIENTIST_BURNDOWN_DATA,
  SCIENTIST_PCA_DATA,
  SCIENTIST_VOLCANO_DATA,
} from '../../../data/roleDashboardData';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';

interface ScientistAnalyticsPanelProps {
  onNotify: (msg: string) => void;
}

export const ScientistAnalyticsPanel: React.FC<ScientistAnalyticsPanelProps> = ({ onNotify }) => {
  const [chartTab, setChartTab] = useState<'volcano' | 'pca' | 'burndown'>('volcano');

  const sigGenes = SCIENTIST_VOLCANO_DATA.filter((d) => d.significant);
  const nonSigGenes = SCIENTIST_VOLCANO_DATA.filter((d) => !d.significant);
  const controlCluster = SCIENTIST_PCA_DATA.filter((d) => d.cohort === 'Vehicle Control');
  const treatedCluster = SCIENTIST_PCA_DATA.filter((d) => d.cohort !== 'Vehicle Control');

  const handleExportCsv = () => {
    const csvRows = [
      'Gene,Log2FC,NegLog10P,Significant',
      ...SCIENTIST_VOLCANO_DATA.map((r) => `${r.gene},${r.log2Fc},${r.negLog10P},${r.significant}`),
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'gatsbio_differential_expression_report.csv';
    link.click();
    URL.revokeObjectURL(url);
    onNotify('Exported differential expression & analytics report (CSV).');
  };

  return (
    <Paper
      elevation={0}
      sx={{ p: { xs: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}
    >
      <DashboardSectionHeader
        title="Scientific Visualizations & Research Velocity"
        subtitle="Interactive Volcano differential expression, PCA cohort clustering, and milestone/grant burndown"
        moduleRef="2.11"
        actionLabel="Export CSV"
        actionIcon={<DownloadIcon fontSize="small" />}
        onAction={handleExportCsv}
        rightSlot={
          <Tabs
            value={chartTab}
            onChange={(_, v) => setChartTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              minHeight: 34,
              maxWidth: '100%',
              '& .MuiTab-root': { minHeight: 34, fontSize: '12px', fontWeight: 700, px: 1.5 },
            }}
          >
            <Tab value="volcano" label="Volcano Plot" />
            <Tab value="pca" label="PCA Clusters" />
            <Tab value="burndown" label="Milestone & Spend" />
          </Tabs>
        }
      />

      <Box sx={{ height: { xs: 220, sm: 270 }, width: '100%' }}>
        {chartTab === 'volcano' && (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis type="number" dataKey="log2Fc" name="log2 Fold Change" domain={[-4, 4]} tick={{ fontSize: 11 }} />
              <YAxis type="number" dataKey="negLog10P" name="-log10(p)" domain={[0, 7]} tick={{ fontSize: 11 }} />
              <ZAxis range={[60, 60]} />
              <ReferenceLine x={-1} stroke="#94A3B8" strokeDasharray="4 4" />
              <ReferenceLine x={1} stroke="#94A3B8" strokeDasharray="4 4" />
              <ReferenceLine y={2} stroke="#94A3B8" strokeDasharray="4 4" />
              <RechartsTooltip
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(val, name) => [String(val), String(name)]}
              />
              <Scatter name="Significant Hits" data={sigGenes} fill="#1E40AF" />
              <Scatter name="Background" data={nonSigGenes} fill="#94A3B8" />
            </ScatterChart>
          </ResponsiveContainer>
        )}

        {chartTab === 'pca' && (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis type="number" dataKey="pc1" name="PC1 (48.2%)" domain={[-5, 5]} tick={{ fontSize: 11 }} />
              <YAxis type="number" dataKey="pc2" name="PC2 (21.6%)" domain={[-3, 3]} tick={{ fontSize: 11 }} />
              <ZAxis range={[90, 90]} />
              <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Vehicle Control" data={controlCluster} fill="#64748B" />
              <Scatter name="KRAS-KO + MEKi" data={treatedCluster} fill="#1E40AF" />
            </ScatterChart>
          </ResponsiveContainer>
        )}

        {chartTab === 'burndown' && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SCIENTIST_BURNDOWN_DATA} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <RechartsTooltip />
              <Area type="monotone" dataKey="planned" name="Planned Progress (%)" stroke="#93C5FD" fill="#EFF6FF" strokeWidth={2} />
              <Area type="monotone" dataKey="completed" name="Actual Progress (%)" stroke="#1E40AF" fill="#DBEAFE" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5, flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="caption" sx={{ color: '#64748B' }}>
          {chartTab === 'volcano'
            ? 'Blue points: |log2FC| >= 1.0 and -log10(p) >= 2.0 (KRAS, DUSP6, MYC, CDKN1A, BAX).'
            : chartTab === 'pca'
              ? 'Distinct transcriptional separation along PC1 (48.2% variance explained) between Vehicle and KRAS-KO + MEKi.'
              : 'Cumulative milestone completion tracking within 2% of quarterly grant plan.'}
        </Typography>
        <Button size="small" onClick={() => window.print()} sx={{ color: '#1E40AF', fontWeight: 700, fontSize: '12px' }}>
          Print / PDF Summary
        </Button>
      </Box>
    </Paper>
  );
};
