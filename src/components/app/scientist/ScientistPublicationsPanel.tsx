import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { DashboardSession, PublicationRecord } from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';

interface ScientistPublicationsPanelProps {
  session: DashboardSession;
  publications: PublicationRecord[];
  onAddPublication: (pub: PublicationRecord) => void;
  onUpdatePublication: (pub: PublicationRecord) => void;
  onNotify: (msg: string) => void;
}

const PUB_STAGES: PublicationRecord['status'][] = [
  'Drafting',
  'Internal IP Sign-Off',
  'Peer Review',
  'Submitted',
  'Patent Filed',
];

export const ScientistPublicationsPanel: React.FC<ScientistPublicationsPanelProps> = ({
  session,
  publications,
  onAddPublication,
  onUpdatePublication,
  onNotify,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'Manuscript' | 'Patent'>('Manuscript');
  const [journalOrPatent, setJournalOrPatent] = useState('Nature Biotechnology');
  const [owners, setOwners] = useState(session.userName);
  const [inventorSplits, setInventorSplits] = useState('E. Vance (70%), L. Patel (30%)');
  const [filingDeadline, setFilingDeadline] = useState('2027-06-15');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const created: PublicationRecord = {
      id: `PUB-0${publications.length + 1}`,
      title: title.trim(),
      journalOrPatent: journalOrPatent.trim(),
      status: type === 'Patent' ? 'Internal IP Sign-Off' : 'Drafting',
      owners: owners.trim() || session.userName,
      type,
      doi: type === 'Manuscript' ? 'Pending DOI Assignment' : undefined,
      inventorSplits: type === 'Patent' ? inventorSplits : undefined,
      filingDeadline: type === 'Patent' ? filingDeadline : undefined,
      patentOffice: type === 'Patent' ? 'USPTO' : undefined,
      citations: 0,
      altmetricScore: 0,
    };
    onAddPublication(created);
    setTitle('');
    setModalOpen(false);
    onNotify(`Created ${type.toLowerCase()} record ${created.id}.`);
  };

  const handleAdvanceStage = (pub: PublicationRecord) => {
    const idx = PUB_STAGES.indexOf(pub.status);
    const nextStatus = PUB_STAGES[(idx + 1) % PUB_STAGES.length];
    onUpdatePublication({ ...pub, status: nextStatus });
    onNotify(`Advanced ${pub.id} to ${nextStatus}.`);
  };

  return (
    <Paper
      elevation={0}
      sx={{ p: { xs: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}
    >
      <DashboardSectionHeader
        title="Publications & Intellectual Property Pipeline"
        subtitle="Manuscript submissions, internal IP sign-offs, inventor splits, DOIs, and USPTO/EPO filings"
        moduleRef="2.9"
        actionLabel="New Manuscript / IDF"
        actionIcon={<AddIcon fontSize="small" />}
        onAction={() => setModalOpen(true)}
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(3, minmax(0, 1fr))' }, gap: 2, '& > *': { minWidth: 0 } }}>
        {publications.map((pub) => (
          <Box
            key={pub.id}
            sx={{
              p: 2,
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              bgcolor: '#F8FAFC',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 1,
            }}
          >
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, gap: 1 }}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 800 }}>
                  {pub.id} {pub.type ? `· ${pub.type}` : ''}
                </Typography>
                <StatusChip label={pub.status} />
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.75 }}>
                {pub.title}
              </Typography>
              <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 700, display: 'block' }}>
                {pub.journalOrPatent}
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 0.25 }}>
                Inventors/Authors: {pub.owners}
              </Typography>
              {pub.doi && (
                <Typography variant="caption" sx={{ color: '#334155', fontFamily: 'var(--font-mono)', display: 'block', mt: 0.5 }}>
                  DOI: {pub.doi}
                </Typography>
              )}
              {pub.inventorSplits && (
                <Typography variant="caption" sx={{ color: '#334155', display: 'block', mt: 0.5 }}>
                  Splits: {pub.inventorSplits}
                </Typography>
              )}
              {pub.filingDeadline && (
                <Typography variant="caption" sx={{ color: '#B45309', fontWeight: 700, display: 'block', mt: 0.25 }}>
                  Deadline ({pub.patentOffice ?? 'USPTO'}): {pub.filingDeadline}
                </Typography>
              )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1, borderTop: '1px solid #E2E8F0', flexWrap: 'wrap', gap: 0.75 }}>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {typeof pub.citations === 'number' && (
                  <Chip size="small" label={`Citations: ${pub.citations}`} sx={{ height: 20, bgcolor: '#EFF6FF', color: '#1E40AF', fontSize: '10.5px', fontWeight: 700, borderRadius: '4px' }} />
                )}
                {typeof pub.altmetricScore === 'number' && (
                  <Chip size="small" label={`Altmetric: ${pub.altmetricScore}`} sx={{ height: 20, bgcolor: '#FFFFFF', border: '1px solid #CBD5E1', fontSize: '10.5px', fontWeight: 700, borderRadius: '4px' }} />
                )}
              </Box>
              <Button size="small" onClick={() => handleAdvanceStage(pub)} sx={{ fontSize: '11px', fontWeight: 700, color: '#1E40AF' }}>
                Advance Stage →
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      {/* New Manuscript / Invention Disclosure Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>New Manuscript or Invention Disclosure (IDF)</DialogTitle>
        <form onSubmit={handleCreate}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              select
              label="Record Type"
              size="small"
              fullWidth
              value={type}
              onChange={(e) => setType(e.target.value as 'Manuscript' | 'Patent')}
            >
              <MenuItem value="Manuscript">Journal Manuscript</MenuItem>
              <MenuItem value="Patent">Invention Disclosure / Patent</MenuItem>
            </TextField>
            <TextField
              label="Title"
              size="small"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label={type === 'Patent' ? 'Patent Filing / Docket' : 'Target Journal'}
              size="small"
              fullWidth
              value={journalOrPatent}
              onChange={(e) => setJournalOrPatent(e.target.value)}
            />
            <TextField
              label="Authors / Inventors"
              size="small"
              fullWidth
              value={owners}
              onChange={(e) => setOwners(e.target.value)}
            />
            {type === 'Patent' && (
              <>
                <TextField
                  label="Inventor Contribution Splits"
                  size="small"
                  fullWidth
                  value={inventorSplits}
                  onChange={(e) => setInventorSplits(e.target.value)}
                />
                <TextField
                  label="Filing Deadline"
                  size="small"
                  fullWidth
                  value={filingDeadline}
                  onChange={(e) => setFilingDeadline(e.target.value)}
                />
              </>
            )}
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}>
              Create Record
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Paper>
  );
};
