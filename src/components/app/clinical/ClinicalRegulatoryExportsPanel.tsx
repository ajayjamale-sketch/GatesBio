import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import SendIcon from '@mui/icons-material/Send';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import type {
  AdverseEventItem,
  ClinicalParticipant,
  ClinicalTeamNote,
  ClinicalTrialItem,
  DashboardSession,
} from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';
import { WorkstationSplitView } from '../shared/WorkstationSplitView';
import { ESignatureModal, type ESignatureResult } from '../shared/ESignatureModal';

interface ClinicalRegulatoryExportsPanelProps {
  session: DashboardSession;
  trials: ClinicalTrialItem[];
  participants: ClinicalParticipant[];
  adverseEvents: AdverseEventItem[];
  notes: ClinicalTeamNote[];
  onAddNote: (note: ClinicalTeamNote) => void;
  onNotify: (msg: string) => void;
}

export const ClinicalRegulatoryExportsPanel: React.FC<ClinicalRegulatoryExportsPanelProps> = ({
  session,
  trials,
  participants,
  adverseEvents,
  notes,
  onAddNote,
  onNotify,
}) => {
  const [esignOpen, setEsignOpen] = useState(false);
  const [signedResult, setSignedResult] = useState<ESignatureResult | null>(null);
  const [newNote, setNewNote] = useState('');

  const verifiedConsents = participants.filter((p) => p.consentStatus === 'Approved').length;
  const pendingSaeDrafts = adverseEvents.filter((ae) => ae.regulatoryDraftStatus === '24h Draft Ready').length;

  const handleExportCsv = () => {
    const rows = [
      'Section,ID,Trial,Subject,Status,Details',
      ...trials.map((t) => `Trial,${t.id},${t.id},-,"${t.status}","${t.title} (${t.enrolled}/${t.target})"`),
      ...participants.map((p) => `Participant,${p.subjectCode},${p.trialId},${p.subjectCode},"${p.consentStatus}","${p.arm} · ${p.visitWindow}"`),
      ...adverseEvents.map((ae) => `AdverseEvent,${ae.id},${ae.trialId},${ae.subjectCode},"${ae.severity}","${ae.term} (${ae.regulatoryDraftStatus ?? 'Not Required'})"`),
    ];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'gatsbio_irb_gcp_compliance_package.csv';
    link.click();
    URL.revokeObjectURL(url);
    onNotify('Downloaded IRB / GCP Regulatory Package (CSV).');
  };

  const handlePostNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    onAddNote({
      id: `CN-${notes.length + 10}`,
      author: session.userName,
      role: session.roleTitle,
      time: 'Just now',
      trialRef: trials[0]?.id ?? 'VGB-ONC-204',
      text: newNote.trim(),
    });
    setNewNote('');
  };

  return (
    <>
      <WorkstationSplitView
        primary={
          <Paper
            elevation={0}
            sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
          >
            <DashboardSectionHeader
              title="IRB Regulatory Submissions & GCP Readiness"
              subtitle="Export signed submission bundles for Institutional Review Boards and FDA audits"
              moduleRef="2.10"
              actionLabel={signedResult ? 'Package Signed' : 'Sign IRB Package'}
              actionIcon={<FingerprintIcon fontSize="small" />}
              onAction={() => setEsignOpen(true)}
              rightSlot={
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<DownloadIcon fontSize="small" />}
                    onClick={handleExportCsv}
                    sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 700, borderRadius: '6px' }}
                  >
                    Export CSV
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => window.print()}
                    sx={{ borderColor: '#CBD5E1', color: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}
                  >
                    Print / PDF
                  </Button>
                </Box>
              }
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              {[
                {
                  title: '21 CFR Part 11 Informed Consent Vault',
                  detail: `${verifiedConsents} of ${participants.length} participant consents cryptographically signed`,
                  status: verifiedConsents === participants.length ? 'Approved' : 'Pending',
                },
                {
                  title: 'Double-Blind Biospecimen Chain-of-Custody',
                  detail: 'De-identified barcode logs verified with zero unmasked arm leaks',
                  status: 'Approved',
                },
                {
                  title: 'MedDRA Statutory SAE Safety Filings (24–48h)',
                  detail:
                    pendingSaeDrafts === 0
                      ? 'All statutory SAE safety notifications clear'
                      : `${pendingSaeDrafts} SAE draft(s) awaiting IRB submission`,
                  status: pendingSaeDrafts === 0 ? 'Approved' : '24h Draft Ready',
                },
              ].map((item) => (
                <Box
                  key={item.title}
                  sx={{
                    p: 1.5,
                    borderRadius: '8px',
                    bgcolor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box sx={{ minWidth: 0, flex: '1 1 200px' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      {item.detail}
                    </Typography>
                  </Box>
                  <StatusChip label={item.status} />
                </Box>
              ))}
            </Box>

            {signedResult && (
              <Box sx={{ mt: 2, p: 1.5, borderRadius: '8px', bgcolor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.4 }}>
                  <VerifiedUserIcon sx={{ color: '#1E40AF', fontSize: 16 }} />
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF' }}>
                    21 CFR Part 11 IRB Package Signed · {signedResult.meaning}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: '#0F172A', wordBreak: 'break-all' }}>
                  {signedResult.sha256Hash}
                </Typography>
              </Box>
            )}
          </Paper>
        }
        inspector={
          <Paper
            elevation={0}
            sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
          >
            <DashboardSectionHeader
              title="Clinical Monitor & PI Handoffs"
              subtitle="Cross-team GCP coordination feed"
              moduleRef="2.8"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mb: 2 }}>
              {notes.map((n) => (
                <Box key={n.id} sx={{ p: 1.5, borderRadius: '8px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 0.5, mb: 0.4 }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#0F172A' }}>
                      {n.author} <span style={{ color: '#64748B', fontWeight: 500 }}>· {n.time}</span>
                    </Typography>
                    <Chip size="small" label={n.trialRef} sx={{ height: 19, bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 700, fontSize: '10px', borderRadius: '4px' }} />
                  </Box>
                  <Typography variant="body2" sx={{ color: '#334155', fontSize: '13px', wordBreak: 'break-word' }}>
                    {n.text}
                  </Typography>
                </Box>
              ))}
            </Box>
            <form onSubmit={handlePostNote}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Add PI / monitor handoff note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
                <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', '&:hover': { bgcolor: '#1E3A8A' }, minWidth: 44, borderRadius: '6px' }}>
                  <SendIcon fontSize="small" />
                </Button>
              </Box>
            </form>
          </Paper>
        }
      />

      <ESignatureModal
        open={esignOpen}
        onClose={() => setEsignOpen(false)}
        recordTitle="Clinical IRB / GCP Regulatory Submission Package"
        signerName={session.userName}
        signerRole={session.roleTitle}
        onConfirm={(res) => {
          setSignedResult(res);
          onNotify('21 CFR Part 11 IRB regulatory package sealed with SHA-256.');
        }}
      />
    </>
  );
};
