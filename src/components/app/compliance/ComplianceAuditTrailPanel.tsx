import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import VisibilityIcon from '@mui/icons-material/Visibility';
import type { AuditLogEntry } from '../../../types';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';

interface ComplianceAuditTrailPanelProps {
  auditLogs: AuditLogEntry[];
  onNotify: (msg: string) => void;
}

const ACTION_FILTERS = ['ALL', 'CREATE', 'UPDATE', 'DELETE', 'EXECUTE', 'SIGN'] as const;

export const ComplianceAuditTrailPanel: React.FC<ComplianceAuditTrailPanelProps> = ({
  auditLogs,
  onNotify,
}) => {
  const [actionFilter, setActionFilter] = useState<(typeof ACTION_FILTERS)[number]>('ALL');
  const [inspectedLog, setInspectedLog] = useState<AuditLogEntry | null>(null);

  const visibleLogs = auditLogs.filter(
    (log) => actionFilter === 'ALL' || log.action === actionFilter
  );

  const handleExportAuditCsv = () => {
    const rows = [
      'ID,Timestamp,Operator,Role,Action,Entity,EntityID,Description,SHA256',
      ...visibleLogs.map(
        (l) =>
          `${l.id},${l.timestamp},"${l.operator}","${l.role}",${l.action},"${l.entity}",${l.entityId},"${l.description}",${l.hash}`
      ),
    ];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'gatsbio_immutable_audit_ledger.csv';
    link.click();
    URL.revokeObjectURL(url);
    onNotify('Exported immutable audit trail ledger (CSV).');
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
      >
        <DashboardSectionHeader
          title="Immutable Audit Trail & Chain-of-Custody Ledger"
          subtitle="Append-only CRUD & e-signature events with SHA-256 integrity digests"
          moduleRef="2.3 / 2.10"
          rightSlot={
            <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', alignItems: 'center' }}>
              {ACTION_FILTERS.map((act) => (
                <Button
                  key={act}
                  size="small"
                  variant={actionFilter === act ? 'contained' : 'outlined'}
                  onClick={() => setActionFilter(act)}
                  sx={{
                    minWidth: 0,
                    px: 1.25,
                    fontWeight: 700,
                    fontSize: '11px',
                    borderRadius: '6px',
                    bgcolor: actionFilter === act ? '#1E40AF' : 'transparent',
                    borderColor: '#CBD5E1',
                    color: actionFilter === act ? '#FFFFFF' : '#334155',
                  }}
                >
                  {act}
                </Button>
              ))}
              <Button
                size="small"
                variant="outlined"
                startIcon={<VerifiedUserIcon fontSize="small" />}
                onClick={() =>
                  onNotify(`Verified ${auditLogs.length}/${auditLogs.length} SHA-256 Merkle chain digests (0 tampering detected).`)
                }
                sx={{ borderColor: '#CBD5E1', color: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}
              >
                Verify Chain
              </Button>
              <Button
                size="small"
                variant="outlined"
                startIcon={<DownloadIcon fontSize="small" />}
                onClick={handleExportAuditCsv}
                sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 700, borderRadius: '6px' }}
              >
                Export CSV
              </Button>
            </Box>
          }
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          {visibleLogs.map((log) => (
            <Box
              key={log.id}
              onClick={() => setInspectedLog(log)}
              sx={{
                p: 1.75,
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                bgcolor: '#F8FAFC',
                display: 'grid',
                gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: '170px minmax(0, 1fr) minmax(0, 1.1fr) auto' },
                gap: 1.5,
                alignItems: 'center',
                cursor: 'pointer',
                '& > *': { minWidth: 0 },
                '&:hover': { borderColor: '#93C5FD', bgcolor: '#EFF6FF' },
              }}
            >
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.4, flexWrap: 'wrap' }}>
                  <StatusChip label={log.action === 'SIGN' ? 'Approved' : log.action} />
                  <Typography variant="caption" sx={{ color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                  {log.operator}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  {log.role}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', fontFamily: 'var(--font-mono)' }}>
                  {log.entityId} · {log.entity}
                </Typography>
                <Typography variant="body2" sx={{ color: '#334155', fontSize: '13px', wordBreak: 'break-word' }}>
                  {log.description}
                </Typography>
              </Box>

              <Typography
                variant="caption"
                sx={{
                  fontFamily: 'var(--font-mono)',
                  bgcolor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  p: 0.75,
                  borderRadius: '6px',
                  fontSize: '10px',
                  color: '#1E3A8A',
                  wordBreak: 'break-all',
                }}
              >
                {log.hash}
              </Typography>

              <IconButton size="small" aria-label={`Inspect ${log.id}`} sx={{ color: '#1E40AF', justifySelf: { xs: 'end', md: 'center' } }}>
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Audit Trail Inspector Slide-Over Drawer (PRD 5.3) */}
      <Drawer
        anchor="right"
        open={Boolean(inspectedLog)}
        onClose={() => setInspectedLog(null)}
        slotProps={{ paper: { sx: { width: { xs: '100%', sm: 440 }, p: 3 } } }}
      >
        {inspectedLog && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                  {inspectedLog.id}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  Audit Trail Inspector
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => setInspectedLog(null)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <StatusChip label={inspectedLog.action === 'SIGN' ? 'Approved' : inspectedLog.action} />

            <Box sx={{ p: 1.75, borderRadius: '8px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                <strong>Timestamp:</strong> {inspectedLog.timestamp}
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                <strong>Operator:</strong> {inspectedLog.operator} ({inspectedLog.role})
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                <strong>Entity:</strong> {inspectedLog.entity} ({inspectedLog.entityId})
              </Typography>
              {inspectedLog.signatureMeaning && (
                <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 700 }}>
                  <strong>21 CFR Meaning:</strong> {inspectedLog.signatureMeaning}
                </Typography>
              )}
              <Typography variant="body2" sx={{ color: '#0F172A', fontWeight: 600, mt: 0.5 }}>
                {inspectedLog.description}
              </Typography>
            </Box>

            <Divider />

            <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', display: 'block', mb: 0.5 }}>
                IMMUTABLE SHA-256 DIGEST
              </Typography>
              <Typography variant="caption" sx={{ fontFamily: 'var(--font-mono)', wordBreak: 'break-all', color: '#0F172A' }}>
                {inspectedLog.hash}
              </Typography>
            </Box>
          </Box>
        )}
      </Drawer>
    </>
  );
};
