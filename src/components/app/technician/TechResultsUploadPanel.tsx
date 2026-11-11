import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import type { LabTestTask } from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';

interface TechResultsUploadPanelProps {
  tasks: LabTestTask[];
  onUploadResult: (
    taskId: string,
    fileName: string,
    metrics: { q30Pct?: number; rinScore?: number; ctValue?: number; od450?: number },
    isOos: boolean
  ) => void;
  onNotify: (msg: string) => void;
}

export const TechResultsUploadPanel: React.FC<TechResultsUploadPanelProps> = ({
  tasks,
  onUploadResult,
  onNotify,
}) => {
  const [selectedTaskId, setSelectedTaskId] = useState(tasks[0]?.id ?? 'TST-901');
  const [fileName, setFileName] = useState('QuantStudio_Run901_Raw.csv');
  const [q30Pct, setQ30Pct] = useState('94.6');
  const [rinScore, setRinScore] = useState('9.1');
  const [ctValue, setCtValue] = useState('21.4');
  const [od450, setOd450] = useState('1.62');

  const q30Num = Number(q30Pct) || 0;
  const rinNum = Number(rinScore) || 0;
  const ctNum = Number(ctValue) || 0;
  const odNum = Number(od450) || 0;

  // Automatic OOS threshold check (Q30 >= 85%, RIN >= 7.0, Ct 12-35)
  const isOos = q30Num < 85 || rinNum < 7.0 || ctNum < 12 || ctNum > 35;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) return;
    onUploadResult(
      selectedTaskId,
      fileName.trim(),
      { q30Pct: q30Num, rinScore: rinNum, ctValue: ctNum, od450: odNum },
      isOos
    );
    onNotify(
      isOos
        ? `Uploaded ${fileName} — OOS threshold breached! Deviation flagged on ${selectedTaskId}.`
        : `Uploaded ${fileName} — All QC tolerances passed for ${selectedTaskId}.`
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0, width: '100%' }}
    >
      <DashboardSectionHeader
        title="Raw Test Results Upload & Automated QC Validation"
        subtitle="Attach CSV, TSV, FCS, FASTQ, or TIFF instrument outputs and validate against SOP tolerances"
        moduleRef="2.4"
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'minmax(0, 1.1fr) minmax(0, 1fr)' },
          gap: 2.5,
          '& > *': { minWidth: 0 },
        }}
      >
        <form onSubmit={handleSubmit} style={{ minWidth: 0, width: '100%' }}>
          <Box sx={{ minWidth: 0, width: '100%', p: { xs: 1.5, sm: 2 }, borderRadius: '8px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <TextField
              select
              label="Target Assay Task"
              size="small"
              fullWidth
              value={selectedTaskId}
              onChange={(e) => setSelectedTaskId(e.target.value)}
            >
              {tasks.map((t) => (
                <MenuItem key={t.id} value={t.id}>
                  {t.id} · {t.sampleId} ({t.assayType})
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Instrument Output File (CSV / FCS / FASTQ / TIFF)"
              size="small"
              fullWidth
              required
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.25, '& > *': { minWidth: 0 } }}>
              <TextField
                label="Sequencing Q30 (% >= 85)"
                type="number"
                size="small"
                value={q30Pct}
                onChange={(e) => setQ30Pct(e.target.value)}
              />
              <TextField
                label="RNA Integrity RIN (>= 7.0)"
                type="number"
                size="small"
                value={rinScore}
                onChange={(e) => setRinScore(e.target.value)}
              />
              <TextField
                label="qPCR Ct (12–35)"
                type="number"
                size="small"
                value={ctValue}
                onChange={(e) => setCtValue(e.target.value)}
              />
              <TextField
                label="ELISA OD450"
                type="number"
                size="small"
                value={od450}
                onChange={(e) => setOd450(e.target.value)}
              />
            </Box>

            <Box
              sx={{
                p: 1.25,
                borderRadius: '6px',
                bgcolor: isOos ? '#FEF2F2' : '#EFF6FF',
                border: `1px solid ${isOos ? '#FECACA' : '#DBEAFE'}`,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 700, color: isOos ? '#991B1B' : '#1E40AF', minWidth: 0, flex: '1 1 180px' }}>
                {isOos ? 'OOS Alert: One or more metrics outside SOP specification' : 'Pre-Check: Metrics within SOP specification'}
              </Typography>
              <StatusChip label={isOos ? 'OOS' : 'Pass QC'} />
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              startIcon={<UploadFileIcon />}
              sx={{ bgcolor: '#1E40AF', '&:hover': { bgcolor: '#1E3A8A' }, fontWeight: 700, borderRadius: '6px' }}
            >
              Upload Results & Seal QC
            </Button>
          </Box>
        </form>

        {/* Uploaded Assay Outputs Registry */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, minWidth: 0 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
            Uploaded Instrument Outputs
          </Typography>
          {tasks
            .filter((t) => t.uploadedResultFile || t.status === 'Completed')
            .map((t) => (
              <Box key={t.id} sx={{ p: 1.5, borderRadius: '8px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0', minWidth: 0 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', fontFamily: 'var(--font-mono)', wordBreak: 'break-all', minWidth: 0 }}>
                    {t.id} · {t.uploadedResultFile ?? 'Assay_Output.csv'}
                  </Typography>
                  <StatusChip label={t.deviationFlagged ? 'OOS' : 'Pass QC'} />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '13px', wordBreak: 'break-word' }}>
                  {t.assayType} ({t.sampleId})
                </Typography>
                {t.rawMetrics && (
                  <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mt: 0.75 }}>
                    <Chip size="small" label={`Q30: ${t.rawMetrics.q30Pct ?? '-'}%`} sx={{ height: 20, fontSize: '10.5px', fontWeight: 700, bgcolor: '#EFF6FF', color: '#1E40AF', borderRadius: '4px' }} />
                    <Chip size="small" label={`RIN: ${t.rawMetrics.rinScore ?? '-'}`} sx={{ height: 20, fontSize: '10.5px', fontWeight: 700, bgcolor: '#EFF6FF', color: '#1E40AF', borderRadius: '4px' }} />
                    {t.rawMetrics.ctValue !== undefined && (
                      <Chip size="small" label={`Ct: ${t.rawMetrics.ctValue}`} sx={{ height: 20, fontSize: '10.5px', fontWeight: 700, bgcolor: '#EFF6FF', color: '#1E40AF', borderRadius: '4px' }} />
                    )}
                  </Box>
                )}
              </Box>
            ))}
        </Box>
      </Box>
    </Paper>
  );
};
