import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import type { AuditLogEntry } from '../../../types';
import type {
  CapaDeviationItem,
  PendingSignOffItem,
  SopDocumentItem,
} from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';

interface ComplianceRegReportsPanelProps {
  pendingSigns: PendingSignOffItem[];
  auditLogs: AuditLogEntry[];
  sops: SopDocumentItem[];
  capas: CapaDeviationItem[];
  onNotify: (msg: string) => void;
}

const FRAMEWORKS = [
  { name: 'FDA 21 CFR Part 11', score: 100, status: 'Approved', detail: 'Dual-key e-signatures & SHA-256 audit ledger active' },
  { name: 'GMP (21 CFR 210/211)', score: 98, status: 'Approved', detail: 'Batch release sign-off & OOS investigation controls' },
  { name: 'GLP (21 CFR Part 58)', score: 99, status: 'Approved', detail: 'ELN protocol versioning & sample custody intact' },
  { name: 'ISO 17025', score: 95, status: 'In Review', detail: 'Instrument calibration drift & analytical tolerance tracking' },
  { name: 'ISO 9001 & HIPAA', score: 100, status: 'Approved', detail: 'De-identified subject codes & AES-256 BAA safeguards' },
];

export const ComplianceRegReportsPanel: React.FC<ComplianceRegReportsPanelProps> = ({
  pendingSigns,
  auditLogs,
  sops,
  capas,
  onNotify,
}) => {
  const [checklist, setChecklist] = useState([
    { id: 'CHK-1', label: 'Users authenticate with MFA / FIDO2 & dual-factor e-signature challenge', passed: true },
    { id: 'CHK-2', label: 'Audit trail captures CREATE, UPDATE, DELETE, EXECUTE & SIGN with SHA-256 hashes', passed: auditLogs.length >= 3 },
    { id: 'CHK-3', label: 'All controlled SOP revisions maintain >= 90% employee attestation coverage', passed: sops.every((s) => ((s.attestedCount ?? 18) / (s.totalStaff ?? 20)) >= 0.9) },
    { id: 'CHK-4', label: 'Clinical trial e-Consent & IP disclosure logs verified without unmasked leaks', passed: true },
    { id: 'CHK-5', label: 'All open OOS / High-severity CAPA deviations assigned an active RCA owner', passed: capas.every((c) => Boolean(c.rootCause)) },
  ]);

  const handleToggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, passed: !item.passed } : item))
    );
  };

  const handleExportRegulatoryDossier = () => {
    const rows = [
      'Section,ID,Status,Details',
      ...FRAMEWORKS.map((f) => `Framework,"${f.name}",${f.status},"Score ${f.score}% - ${f.detail}"`),
      ...checklist.map((c) => `InspectionCheck,${c.id},${c.passed ? 'PASS' : 'FAIL'},"${c.label}"`),
      ...sops.map((s) => `SOP,${s.code} ${s.version},${s.framework},"Attested ${s.attestedCount ?? 18}/${s.totalStaff ?? 20}"`),
      ...capas.map((ca) => `CAPA,${ca.id},${ca.status},"${ca.source} - ${ca.rootCause ?? ''}"`),
      ...pendingSigns.map((ps) => `SignQueue,${ps.id},${ps.status ?? 'Pending'},"${ps.recordTitle}"`),
    ];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'gatsbio_regulatory_inspection_dossier.csv';
    link.click();
    URL.revokeObjectURL(url);
    onNotify('Exported Consolidated Regulatory Inspection Dossier (CSV).');
  };

  const passedCount = checklist.filter((c) => c.passed).length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Framework Readiness Matrix */}
      <Paper
        elevation={0}
        sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
      >
        <DashboardSectionHeader
          title="Regulatory Framework Readiness & Audit Dossier"
          subtitle="FDA 21 CFR Part 11, GMP, GLP, ISO 17025, ISO 9001, and HIPAA compliance telemetry"
          moduleRef="2.10 / 2.11"
          rightSlot={
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
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
                onClick={handleExportRegulatoryDossier}
                sx={{ bgcolor: '#1E40AF', '&:hover': { bgcolor: '#1E3A8A' }, fontWeight: 700, borderRadius: '6px' }}
              >
                Export Inspection Dossier
              </Button>
            </Box>
          }
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(3, minmax(0, 1fr))' },
            gap: 2,
            '& > *': { minWidth: 0 },
          }}
        >
          {FRAMEWORKS.map((fw) => (
            <Box key={fw.name} sx={{ p: 2, borderRadius: '8px', border: '1px solid #E2E8F0', bgcolor: '#F8FAFC' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75, flexWrap: 'wrap', gap: 0.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  {fw.name}
                </Typography>
                <StatusChip label={fw.status} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1E40AF', mb: 0.5 }}>
                {fw.score}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={fw.score}
                sx={{ height: 6, borderRadius: 3, mb: 1, bgcolor: '#E2E8F0', '& .MuiLinearProgress-bar': { bgcolor: '#1E40AF' } }}
              />
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                {fw.detail}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Mock 21 CFR Part 11 Inspection Checklist (PRD Section 8) */}
      <Paper
        elevation={0}
        sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
      >
        <DashboardSectionHeader
          title="Mock 21 CFR Part 11 Inspection Checklist"
          subtitle="Pre-audit verification across clinical trials, IP filings, SOP attestations, and audit trails"
          moduleRef="2.7 / 2.9 / 2.10"
          rightSlot={
            <Chip
              icon={<VerifiedUserIcon sx={{ fontSize: '15px !important', color: '#1E40AF !important' }} />}
              label={`${passedCount}/${checklist.length} Controls Passed`}
              sx={{ bgcolor: '#EFF6FF', color: '#1E40AF', border: '1px solid #DBEAFE', fontWeight: 700, borderRadius: '6px' }}
            />
          }
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {checklist.map((item) => (
            <Box
              key={item.id}
              onClick={() => handleToggleCheck(item.id)}
              sx={{
                p: 1.25,
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                bgcolor: item.passed ? '#EFF6FF' : '#FEF2F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
                cursor: 'pointer',
                flexWrap: 'wrap',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0, flex: '1 1 240px' }}>
                <Checkbox checked={item.passed} size="small" sx={{ p: 0.25, color: '#1E40AF' }} />
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>
                  {item.label}
                </Typography>
              </Box>
              <StatusChip label={item.passed ? 'Pass' : 'Flagged'} />
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};
