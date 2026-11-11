import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PrintIcon from '@mui/icons-material/Print';
import type { AuditLogEntry } from '../../../types';
import type { DashboardSession, PendingSignOffItem } from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';
import { ESignatureModal, type ESignatureResult } from '../shared/ESignatureModal';

interface ComplianceESignQueuePanelProps {
  session: DashboardSession;
  pendingSigns: PendingSignOffItem[];
  auditLogs: AuditLogEntry[];
  onSignRecord: (item: PendingSignOffItem, result: ESignatureResult) => void;
  onRejectRecord: (item: PendingSignOffItem, reason: string) => void;
  onNotify: (msg: string) => void;
}

export const ComplianceESignQueuePanel: React.FC<ComplianceESignQueuePanelProps> = ({
  session,
  pendingSigns,
  auditLogs,
  onSignRecord,
  onRejectRecord,
  onNotify,
}) => {
  const [signTarget, setSignTarget] = useState<PendingSignOffItem | null>(null);
  const [rejectTarget, setRejectTarget] = useState<PendingSignOffItem | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const handleExportPack = () => {
    const rows = [
      'Type,ID,TitleOrEntity,Actor,FrameworkOrAction,HashOrStatus',
      ...pendingSigns.map(
        (p) => `PendingSignOff,${p.id},"${p.recordTitle}","${p.submittedBy}",${p.framework},${p.status ?? 'Pending'}`
      ),
      ...auditLogs.map(
        (a) => `AuditEvent,${a.id},"${a.entity}","${a.operator}",${a.action},${a.hash}`
      ),
    ];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'gatsbio_21cfr_part11_audit_pack.csv';
    link.click();
    URL.revokeObjectURL(url);
    onNotify('Exported FDA 21 CFR Part 11 Inspection Evidence Pack (CSV).');
  };

  const handleConfirmReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectTarget || !rejectReason.trim()) return;
    onRejectRecord(rejectTarget, rejectReason.trim());
    setRejectReason('');
    setRejectTarget(null);
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
      >
        <DashboardSectionHeader
          title="21 CFR Part 11 Electronic Signature Queue"
          subtitle="Execute dual-credential QA sign-offs or return records for revision with immutable audit logging"
          moduleRef="2.10"
          rightSlot={
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<PrintIcon fontSize="small" />}
                onClick={() => window.print()}
                sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 700, borderRadius: '6px' }}
              >
                Print Pack
              </Button>
              <Button
                size="small"
                variant="outlined"
                startIcon={<DownloadIcon fontSize="small" />}
                onClick={handleExportPack}
                sx={{ borderColor: '#CBD5E1', color: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}
              >
                Export Audit Pack
              </Button>
            </Box>
          }
        />

        {pendingSigns.length === 0 ? (
          <Box sx={{ p: 3, borderRadius: '8px', bgcolor: '#EFF6FF', border: '1px solid #DBEAFE', textAlign: 'center' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1E40AF' }}>
              All Pending Records Signed & Sealed
            </Typography>
            <Typography variant="caption" sx={{ color: '#475569' }}>
              Every batch release and SOP revision has been sealed in the immutable SHA-256 audit ledger.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {pendingSigns.map((item) => (
              <Box
                key={item.id}
                sx={{
                  p: 2,
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  bgcolor: '#F8FAFC',
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  alignItems: { xs: 'stretch', sm: 'center' },
                  gap: 1.5,
                }}
              >
                <Box sx={{ minWidth: 0, flex: { xs: 'none', sm: '1 1 240px' } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.4, flexWrap: 'wrap' }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', fontFamily: 'var(--font-mono)' }}>
                      {item.id}
                    </Typography>
                    <Chip label={item.framework} size="small" sx={{ height: 19, fontSize: '10px', fontWeight: 700, borderRadius: '4px' }} />
                    <StatusChip label={item.status ?? 'Pending'} />
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', wordBreak: 'break-word' }}>
                    {item.recordTitle}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                    Submitted by {item.submittedBy} · {item.submittedAt}
                  </Typography>
                  {item.rejectionReason && (
                    <Typography variant="caption" sx={{ color: '#991B1B', fontWeight: 700, display: 'block', mt: 0.25 }}>
                      Revision Note: {item.rejectionReason}
                    </Typography>
                  )}
                </Box>

                {item.status !== 'Rejected' && (
                  <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      startIcon={<CloseIcon fontSize="small" />}
                      onClick={() => setRejectTarget(item)}
                      sx={{ fontWeight: 700, borderRadius: '6px' }}
                    >
                      Request Revision
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<FingerprintIcon />}
                      onClick={() => setSignTarget(item)}
                      sx={{ bgcolor: '#1E40AF', '&:hover': { bgcolor: '#1E3A8A' }, fontWeight: 700, borderRadius: '6px' }}
                    >
                      Sign & Seal
                    </Button>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Paper>

      {/* Reject / Request Revision Dialog */}
      <Dialog open={Boolean(rejectTarget)} onClose={() => setRejectTarget(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Request Revision — {rejectTarget?.id}</DialogTitle>
        <form onSubmit={handleConfirmReject}>
          <DialogContent dividers>
            <TextField
              label="Compliance Rejection / Revision Reason"
              multiline
              rows={3}
              size="small"
              fullWidth
              required
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Missing duplicate negative control well verification..."
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setRejectTarget(null)}>Cancel</Button>
            <Button type="submit" variant="contained" color="error" sx={{ fontWeight: 700, borderRadius: '6px' }}>
              Log Revision Request
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {signTarget && (
        <ESignatureModal
          open={Boolean(signTarget)}
          onClose={() => setSignTarget(null)}
          recordTitle={signTarget.recordTitle}
          signerName={session.userName}
          signerRole={session.roleTitle}
          onConfirm={(res) => {
            onSignRecord(signTarget, res);
            setSignTarget(null);
          }}
        />
      )}
    </>
  );
};
