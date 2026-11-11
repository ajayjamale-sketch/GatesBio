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
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SecurityIcon from '@mui/icons-material/Security';
import { ROLE_LIST } from '../../../config/roleAccess';
import type {
  DashboardSession,
  OrgUserRecord,
  PublicationRecord,
  UserRoleId,
} from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';

interface BiotechTeamsIpPanelProps {
  session: DashboardSession;
  teamMembers: OrgUserRecord[];
  publications: PublicationRecord[];
  onSaveMember: (member: OrgUserRecord, isEdit: boolean) => void;
  onToggleMemberMfa: (memberId: string) => void;
  onToggleMemberStatus: (memberId: string) => void;
  onDeleteMember: (member: OrgUserRecord) => void;
  onSavePublication: (pub: PublicationRecord, isEdit: boolean) => void;
  onDeletePublication: (pub: PublicationRecord) => void;
}

export const BiotechTeamsIpPanel: React.FC<BiotechTeamsIpPanelProps> = ({
  session,
  teamMembers,
  publications,
  onSaveMember,
  onToggleMemberMfa,
  onToggleMemberStatus,
  onDeleteMember,
  onSavePublication,
  onDeletePublication,
}) => {
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<OrgUserRecord | null>(null);
  const [memberForm, setMemberForm] = useState<{
    name: string;
    email: string;
    roleId: UserRoleId;
  }>({ name: '', email: '', roleId: 'research-scientist' });

  const [pubModalOpen, setPubModalOpen] = useState(false);
  const [editingPub, setEditingPub] = useState<PublicationRecord | null>(null);
  const [pubForm, setPubForm] = useState<{
    title: string;
    journalOrPatent: string;
    status: PublicationRecord['status'];
    owners: string;
    type: 'Manuscript' | 'Patent';
    inventorSplits: string;
    filingDeadline: string;
  }>({
    title: '',
    journalOrPatent: '',
    status: 'Drafting',
    owners: '',
    type: 'Patent',
    inventorSplits: '',
    filingDeadline: '2027-06-15',
  });

  const seatLimit = 50;
  const seatPct = Math.min(100, Math.round((teamMembers.length / seatLimit) * 100));
  const storageUsedTb = 18.4;
  const storageLimitTb = 25.0;

  const openCreateMember = () => {
    setEditingMember(null);
    setMemberForm({ name: '', email: '', roleId: 'research-scientist' });
    setMemberModalOpen(true);
  };

  const openEditMember = (m: OrgUserRecord) => {
    setEditingMember(m);
    setMemberForm({ name: m.name, email: m.email, roleId: m.roleId });
    setMemberModalOpen(true);
  };

  const handleMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberForm.name.trim() || !memberForm.email.trim()) return;
    const item: OrgUserRecord = editingMember
      ? { ...editingMember, name: memberForm.name.trim(), email: memberForm.email.trim(), roleId: memberForm.roleId }
      : {
          id: `USR-${10 + teamMembers.length}`,
          name: memberForm.name.trim(),
          email: memberForm.email.trim(),
          roleId: memberForm.roleId,
          organization: session.organization,
          mfaEnabled: true,
          status: 'Active',
        };
    onSaveMember(item, Boolean(editingMember));
    setMemberModalOpen(false);
  };

  const openCreatePub = () => {
    setEditingPub(null);
    setPubForm({
      title: '',
      journalOrPatent: '',
      status: 'Drafting',
      owners: session.userName,
      type: 'Patent',
      inventorSplits: 'E. Vance (65%), S. Jenkins (35%)',
      filingDeadline: '2027-06-15',
    });
    setPubModalOpen(true);
  };

  const openEditPub = (pub: PublicationRecord) => {
    setEditingPub(pub);
    setPubForm({
      title: pub.title,
      journalOrPatent: pub.journalOrPatent,
      status: pub.status,
      owners: pub.owners,
      type: pub.type ?? 'Manuscript',
      inventorSplits: pub.inventorSplits ?? '',
      filingDeadline: pub.filingDeadline ?? '2027-06-15',
    });
    setPubModalOpen(true);
  };

  const handlePubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pubForm.title.trim()) return;
    const item: PublicationRecord = editingPub
      ? {
          ...editingPub,
          title: pubForm.title.trim(),
          journalOrPatent: pubForm.journalOrPatent.trim(),
          status: pubForm.status,
          owners: pubForm.owners.trim(),
          type: pubForm.type,
          inventorSplits: pubForm.type === 'Patent' ? pubForm.inventorSplits : undefined,
          filingDeadline: pubForm.type === 'Patent' ? pubForm.filingDeadline : undefined,
        }
      : {
          id: `PUB-0${publications.length + 1}`,
          title: pubForm.title.trim(),
          journalOrPatent: pubForm.journalOrPatent.trim() || 'USPTO Provisional Filing',
          status: pubForm.status,
          owners: pubForm.owners.trim() || session.userName,
          type: pubForm.type,
          inventorSplits: pubForm.type === 'Patent' ? pubForm.inventorSplits : undefined,
          filingDeadline: pubForm.type === 'Patent' ? pubForm.filingDeadline : undefined,
          patentOffice: pubForm.type === 'Patent' ? 'USPTO' : undefined,
          citations: 0,
          altmetricScore: 0,
        };
    onSavePublication(item, Boolean(editingPub));
    setPubModalOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Seat Licensing & Cloud Storage Metering (PRD 2.12) */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 1.75, sm: 2.5 },
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          bgcolor: '#FFFFFF',
          display: 'grid',
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' },
          gap: 2,
          '& > *': { minWidth: 0 },
        }}
      >
        <Box sx={{ p: 1.75, borderRadius: '8px', bgcolor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75, flexWrap: 'wrap', gap: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <SecurityIcon sx={{ fontSize: 15 }} /> ENTERPRISE SEAT LICENSING
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#0F172A' }}>
              {teamMembers.length} / {seatLimit} Seats ({seatPct}%)
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={seatPct} sx={{ height: 6, borderRadius: 3, bgcolor: '#DBEAFE', '& .MuiLinearProgress-bar': { bgcolor: '#1E40AF' } }} />
        </Box>

        <Box sx={{ p: 1.75, borderRadius: '8px', bgcolor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75, flexWrap: 'wrap', gap: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CloudQueueIcon sx={{ fontSize: 15 }} /> BIO DATA LAKE METERING
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#0F172A' }}>
              {storageUsedTb} TB / {storageLimitTb} TB
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={Math.round((storageUsedTb / storageLimitTb) * 100)}
            sx={{ height: 6, borderRadius: 3, bgcolor: '#DBEAFE', '& .MuiLinearProgress-bar': { bgcolor: '#1E40AF' } }}
          />
        </Box>
      </Paper>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'minmax(0, 1fr) minmax(0, 1fr)' },
          gap: 2.5,
          '& > *': { minWidth: 0 },
        }}
      >
        {/* Research Teams & Staff Roster */}
        <Paper
          elevation={0}
          sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
        >
          <DashboardSectionHeader
            title="Research Teams & Staff Roster"
            subtitle="Manage organization members, RBAC roles, MFA, and account status"
            moduleRef="2.1 / 2.12"
            actionLabel="Add Member"
            actionIcon={<AddIcon fontSize="small" />}
            onAction={openCreateMember}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            {teamMembers.map((m) => (
              <Box
                key={m.id}
                sx={{
                  p: 1.5,
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  bgcolor: '#F8FAFC',
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  alignItems: { xs: 'stretch', sm: 'center' },
                  gap: 1.25,
                }}
              >
                <Box sx={{ minWidth: 0, flex: { xs: 'none', sm: '1 1 200px' } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                      {m.name}
                    </Typography>
                    <StatusChip label={m.status} />
                  </Box>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block', wordBreak: 'break-word' }}>
                    {m.email} · {ROLE_LIST.find((r) => r.roleId === m.roleId)?.shortLabel}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.5 }}>
                    <Typography variant="caption" sx={{ color: '#475569', fontWeight: 700 }}>
                      2FA:
                    </Typography>
                    <Switch size="small" checked={m.mfaEnabled} onChange={() => onToggleMemberMfa(m.id)} />
                    <Button
                      size="small"
                      onClick={() => onToggleMemberStatus(m.id)}
                      sx={{ fontSize: '11px', fontWeight: 700, color: m.status === 'Active' ? '#DC2626' : '#1E40AF', py: 0 }}
                    >
                      {m.status === 'Active' ? 'Suspend' : 'Reactivate'}
                    </Button>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <IconButton size="small" onClick={() => openEditMember(m)} aria-label={`Edit ${m.name}`}>
                    <EditIcon fontSize="small" sx={{ color: '#1E40AF' }} />
                  </IconButton>
                  <IconButton size="small" onClick={() => onDeleteMember(m)} aria-label={`Delete ${m.name}`}>
                    <DeleteOutlineIcon fontSize="small" sx={{ color: '#DC2626' }} />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Publications & Patent IP Portfolio */}
        <Paper
          elevation={0}
          sx={{ p: { xs: 1.75, sm: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', minWidth: 0 }}
        >
          <DashboardSectionHeader
            title="Publications & Patent IP Portfolio"
            subtitle="Inventor splits, filing deadlines, internal IP sign-off, and impact"
            moduleRef="2.9"
            actionLabel="Add IP Record"
            actionIcon={<AddIcon fontSize="small" />}
            onAction={openCreatePub}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            {publications.map((pub) => (
              <Box
                key={pub.id}
                sx={{
                  p: 1.5,
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  bgcolor: '#F8FAFC',
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  alignItems: { xs: 'stretch', sm: 'center' },
                  gap: 1.25,
                }}
              >
                <Box sx={{ minWidth: 0, flex: { xs: 'none', sm: '1 1 200px' } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.35, flexWrap: 'wrap' }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', fontFamily: 'var(--font-mono)' }}>
                      {pub.id} {pub.type ? `· ${pub.type}` : ''}
                    </Typography>
                    <StatusChip label={pub.status} />
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', wordBreak: 'break-word' }}>
                    {pub.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block', wordBreak: 'break-word' }}>
                    {pub.journalOrPatent} · {pub.owners}
                  </Typography>
                  {pub.inventorSplits && (
                    <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 600, display: 'block' }}>
                      Splits: {pub.inventorSplits} {pub.filingDeadline ? `· Due ${pub.filingDeadline}` : ''}
                    </Typography>
                  )}
                  {typeof pub.citations === 'number' && (
                    <Chip
                      size="small"
                      label={`Citations: ${pub.citations} · Altmetric: ${pub.altmetricScore ?? 0}`}
                      sx={{ mt: 0.5, height: 20, bgcolor: '#EFF6FF', color: '#1E40AF', fontSize: '10px', fontWeight: 700, borderRadius: '4px' }}
                    />
                  )}
                </Box>
                <Box sx={{ flexShrink: 0 }}>
                  <IconButton size="small" onClick={() => openEditPub(pub)} aria-label={`Edit ${pub.title}`}>
                    <EditIcon fontSize="small" sx={{ color: '#1E40AF' }} />
                  </IconButton>
                  <IconButton size="small" onClick={() => onDeletePublication(pub)} aria-label={`Delete ${pub.title}`}>
                    <DeleteOutlineIcon fontSize="small" sx={{ color: '#DC2626' }} />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Member Modal */}
      <Dialog open={memberModalOpen} onClose={() => setMemberModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>{editingMember ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
        <form onSubmit={handleMemberSubmit}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Full Name" size="small" fullWidth required value={memberForm.name} onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })} />
            <TextField label="Email" type="email" size="small" fullWidth required value={memberForm.email} onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })} />
            <Select size="small" fullWidth value={memberForm.roleId} onChange={(e) => setMemberForm({ ...memberForm, roleId: e.target.value as UserRoleId })}>
              {ROLE_LIST.map((r) => (
                <MenuItem key={r.roleId} value={r.roleId}>{r.roleTitle}</MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setMemberModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}>
              {editingMember ? 'Save Member' : 'Add Member'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Publication / IP Modal */}
      <Dialog open={pubModalOpen} onClose={() => setPubModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>{editingPub ? 'Edit IP Record' : 'Add Publication / Patent'}</DialogTitle>
        <form onSubmit={handlePubSubmit}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField select label="Record Type" size="small" fullWidth value={pubForm.type} onChange={(e) => setPubForm({ ...pubForm, type: e.target.value as 'Manuscript' | 'Patent' })}>
              <MenuItem value="Manuscript">Journal Manuscript</MenuItem>
              <MenuItem value="Patent">Patent / Invention Disclosure</MenuItem>
            </TextField>
            <TextField label="Title" size="small" fullWidth required value={pubForm.title} onChange={(e) => setPubForm({ ...pubForm, title: e.target.value })} />
            <TextField label="Journal or Patent Filing ID" size="small" fullWidth value={pubForm.journalOrPatent} onChange={(e) => setPubForm({ ...pubForm, journalOrPatent: e.target.value })} />
            <TextField label="Authors / Inventors" size="small" fullWidth value={pubForm.owners} onChange={(e) => setPubForm({ ...pubForm, owners: e.target.value })} />
            {pubForm.type === 'Patent' && (
              <>
                <TextField label="Inventor Contribution Splits" size="small" fullWidth value={pubForm.inventorSplits} onChange={(e) => setPubForm({ ...pubForm, inventorSplits: e.target.value })} />
                <TextField label="Filing Deadline" size="small" fullWidth value={pubForm.filingDeadline} onChange={(e) => setPubForm({ ...pubForm, filingDeadline: e.target.value })} />
              </>
            )}
            <TextField select label="Status" size="small" fullWidth value={pubForm.status} onChange={(e) => setPubForm({ ...pubForm, status: e.target.value as PublicationRecord['status'] })}>
              <MenuItem value="Drafting">Drafting</MenuItem>
              <MenuItem value="Internal IP Sign-Off">Internal IP Sign-Off</MenuItem>
              <MenuItem value="Peer Review">Peer Review</MenuItem>
              <MenuItem value="Submitted">Submitted</MenuItem>
              <MenuItem value="Patent Filed">Patent Filed</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setPubModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}>
              {editingPub ? 'Save Record' : 'Add Record'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
