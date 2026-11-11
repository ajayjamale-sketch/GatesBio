import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  MenuItem,
  Paper,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AddIcon from '@mui/icons-material/Add';
import { ROLE_CONFIGS, getUserInitials } from '../../config/roleAccess';
import { ORGANIZATIONS_LIST } from '../../data/roleDashboardData';
import type { DashboardSession } from '../../types/dashboard';
import { DashboardSectionHeader } from '../../components/app/shared/DashboardSectionHeader';
import { WorkstationSplitView } from '../../components/app/shared/WorkstationSplitView';

interface UserProfilePageProps {
  session: DashboardSession;
  onUpdateSession: (updates: Partial<DashboardSession>) => void;
  onBackToDashboard: () => void;
  onSignOut: () => void;
  onNotify: (msg: string) => void;
}

const SSO_PROVIDERS = ['ORCID', 'Google Workspace', 'Microsoft Entra ID', 'InCommon / eduGAIN'];

/**
 * User Profile & Session Settings page inside the authenticated DashboardShell.
 */
export const UserProfilePage: React.FC<UserProfilePageProps> = ({
  session,
  onUpdateSession,
  onBackToDashboard,
  onSignOut,
  onNotify,
}) => {
  const [userName, setUserName] = useState(session.userName);
  const [email, setEmail] = useState(session.email);
  const [department, setDepartment] = useState(session.department);
  const [organization, setOrganization] = useState(session.organization);
  const [mfaVerified, setMfaVerified] = useState(session.mfaVerified);
  const [orcidId, setOrcidId] = useState(session.orcidId ?? '0000-0002-1825-0097');
  const [scopusId, setScopusId] = useState(session.scopusId ?? '57204891234');
  const [pubmedAffiliation, setPubmedAffiliation] = useState(
    session.pubmedAffiliation ?? 'Vanguard Biotherapeutics · Functional Genomics'
  );
  const [degrees, setDegrees] = useState(session.degrees ?? 'Ph.D. Molecular Oncology, Harvard Medical School');
  const [bio, setBio] = useState(
    session.bio ??
      'Principal Investigator leading functional CRISPR perturbation screens, scRNA-seq tumor atlas profiling, and LNP mRNA formulation studies.'
  );
  const [expertiseTags, setExpertiseTags] = useState<string[]>(
    session.expertiseTags ?? ['CRISPR/Cas9', 'Oncology', 'Single-Cell RNA-Seq', 'Proteomics']
  );
  const [newTag, setNewTag] = useState('');
  const [linkedSsoProviders, setLinkedSsoProviders] = useState<string[]>(
    session.linkedSsoProviders ?? ['ORCID', 'Google Workspace']
  );

  const roleCfg = ROLE_CONFIGS[session.roleId];
  const initials = getUserInitials(userName || session.userName);
  const hIndex = session.hIndex ?? 28;
  const citationCount = session.citationCount ?? 3420;

  const handleAddTag = () => {
    const trimmed = newTag.trim();
    if (!trimmed || expertiseTags.includes(trimmed)) return;
    setExpertiseTags((prev) => [...prev, trimmed]);
    setNewTag('');
  };

  const handleToggleSso = (provider: string) => {
    setLinkedSsoProviders((prev) =>
      prev.includes(provider) ? prev.filter((p) => p !== provider) : [...prev, provider]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = userName.trim();
    const trimmedEmail = email.trim();
    const trimmedDept = department.trim();

    if (!trimmedName || !trimmedEmail) {
      onNotify('Full name and work email are required.');
      return;
    }

    onUpdateSession({
      userName: trimmedName,
      email: trimmedEmail,
      department: trimmedDept || session.department,
      organization,
      mfaVerified,
      orcidId: orcidId.trim(),
      scopusId: scopusId.trim(),
      pubmedAffiliation: pubmedAffiliation.trim(),
      degrees: degrees.trim(),
      bio: bio.trim(),
      expertiseTags,
      hIndex,
      citationCount,
      linkedSsoProviders,
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <DashboardSectionHeader
        title="User Profile & Security"
        subtitle="Manage your GatsBio identity, organization workspace, and 21 CFR Part 11 credentials"
        moduleRef="2.1"
        rightSlot={
          <Button
            size="small"
            variant="outlined"
            startIcon={<ArrowBackIcon sx={{ fontSize: '16px !important' }} />}
            onClick={onBackToDashboard}
            sx={{
              borderColor: '#CBD5E1',
              color: '#0F172A',
              fontWeight: 700,
              borderRadius: '6px',
            }}
          >
            Back to Dashboard
          </Button>
        }
      />

      {/* Profile Identity Banner */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3 },
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          borderLeft: '3px solid #1E40AF',
          bgcolor: '#FFFFFF',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: '#1E40AF',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '18px',
              border: '2px solid #DBEAFE',
            }}
          >
            {initials}
          </Avatar>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                {session.userName}
              </Typography>
              <Chip
                size="small"
                label={session.roleTitle}
                sx={{
                  height: 22,
                  borderRadius: '6px',
                  bgcolor: '#EFF6FF',
                  color: '#1E40AF',
                  border: '1px solid #DBEAFE',
                  fontWeight: 700,
                  fontSize: '11px',
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ color: '#64748B', mt: 0.4, fontSize: '13px' }}>
              {session.email} · {session.department} · {session.organization}
            </Typography>
          </Box>
        </Box>

        <Chip
          icon={<VerifiedUserIcon sx={{ fontSize: '15px !important', color: '#1E40AF !important' }} />}
          label={mfaVerified ? 'FIDO2 / MFA Verified' : 'MFA Disabled'}
          sx={{
            borderRadius: '6px',
            bgcolor: mfaVerified ? '#EFF6FF' : '#FEF2F2',
            color: mfaVerified ? '#1E40AF' : '#DC2626',
            border: `1px solid ${mfaVerified ? '#DBEAFE' : '#FECACA'}`,
            fontWeight: 700,
            fontSize: '12px',
          }}
        />
      </Paper>

      <WorkstationSplitView
        primary={
          <Paper
            component="form"
            onSubmit={handleSave}
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 3 },
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              bgcolor: '#FFFFFF',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <BadgeOutlinedIcon sx={{ color: '#1E40AF', fontSize: 20 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A' }}>
                Account & Workspace Details
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' },
                gap: 2,
                '& > *': { minWidth: 0 },
              }}
            >
              <TextField
                label="Full Name"
                size="small"
                fullWidth
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <TextField
                label="Work Email"
                type="email"
                size="small"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Department"
                size="small"
                fullWidth
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
              <TextField
                select
                label="Active Organization"
                size="small"
                fullWidth
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              >
                {Array.from(new Set([...ORGANIZATIONS_LIST, session.organization])).map((org) => (
                  <MenuItem key={org} value={org}>
                    {org}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Assigned Role"
                size="small"
                fullWidth
                value={session.roleTitle}
                slotProps={{ input: { readOnly: true } }}
                helperText="Role switches are managed from the top bar switcher"
              />
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  bgcolor: '#F8FAFC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>
                    2FA Hardware / MFA Enforcement
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B' }}>
                    Required for 21 CFR Part 11 sign-offs
                  </Typography>
                </Box>
                <Switch
                  checked={mfaVerified}
                  onChange={(e) => setMfaVerified(e.target.checked)}
                  color="primary"
                />
              </Box>
            </Box>

            <Divider sx={{ my: 2.5 }} />

            {/* Scientific Identity & Researcher Credentials (PRD 2.1) */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <SchoolOutlinedIcon sx={{ color: '#1E40AF', fontSize: 20 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A' }}>
                Scientific Identity & Academic Credentials
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' },
                gap: 2,
                '& > *': { minWidth: 0 },
              }}
            >
              <TextField
                label="ORCID iD"
                size="small"
                fullWidth
                value={orcidId}
                onChange={(e) => setOrcidId(e.target.value)}
                placeholder="0000-0002-1825-0097"
              />
              <TextField
                label="Scopus Author ID"
                size="small"
                fullWidth
                value={scopusId}
                onChange={(e) => setScopusId(e.target.value)}
              />
              <TextField
                label="PubMed Institutional Affiliation"
                size="small"
                fullWidth
                value={pubmedAffiliation}
                onChange={(e) => setPubmedAffiliation(e.target.value)}
              />
              <TextField
                label="Degrees & Qualifications"
                size="small"
                fullWidth
                value={degrees}
                onChange={(e) => setDegrees(e.target.value)}
              />
            </Box>

            <TextField
              label="Researcher Bio"
              size="small"
              fullWidth
              multiline
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              sx={{ mt: 2 }}
            />

            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', display: 'block', mb: 1 }}>
                Fields of Expertise
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1.25 }}>
                {expertiseTags.map((tag) => (
                  <Chip
                    key={tag}
                    size="small"
                    label={tag}
                    onDelete={() => setExpertiseTags((prev) => prev.filter((t) => t !== tag))}
                    sx={{
                      borderRadius: '6px',
                      bgcolor: '#EFF6FF',
                      color: '#1E40AF',
                      border: '1px solid #DBEAFE',
                      fontWeight: 700,
                      fontSize: '11.5px',
                    }}
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' }, maxWidth: { xs: '100%', sm: 360 } }}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Add expertise tag (e.g. Epigenetics)"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button
                  type="button"
                  size="small"
                  variant="outlined"
                  startIcon={<AddIcon fontSize="small" />}
                  onClick={handleAddTag}
                  sx={{ borderColor: '#CBD5E1', color: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}
                >
                  Add
                </Button>
              </Box>
            </Box>

            <Divider sx={{ my: 2.5 }} />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.25 }}>
              <Button
                type="button"
                variant="outlined"
                onClick={() => {
                  setUserName(session.userName);
                  setEmail(session.email);
                  setDepartment(session.department);
                  setOrganization(session.organization);
                  setMfaVerified(session.mfaVerified);
                }}
                sx={{ borderColor: '#CBD5E1', color: '#475569', fontWeight: 700, borderRadius: '6px' }}
              >
                Reset
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveOutlinedIcon sx={{ fontSize: '17px !important' }} />}
                sx={{
                  bgcolor: '#1E40AF',
                  '&:hover': { bgcolor: '#1E3A8A' },
                  fontWeight: 700,
                  borderRadius: '6px',
                  px: 2.5,
                }}
              >
                Save Profile
              </Button>
            </Box>
          </Paper>
        }
        inspector={
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                bgcolor: '#FFFFFF',
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.25 }}>
                Citation & Impact Metrics
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.25, mb: 1.5 }}>
                <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
                  <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 700 }}>
                    h-index (Synced)
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontVariantNumeric: 'tabular-nums' }}>
                    {hIndex}
                  </Typography>
                </Box>
                <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
                  <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 700 }}>
                    Total Citations
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontVariantNumeric: 'tabular-nums' }}>
                    {citationCount.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#475569', display: 'block', mb: 1 }}>
                Federated Academic & Enterprise SSO
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                {SSO_PROVIDERS.map((provider) => {
                  const connected = linkedSsoProviders.includes(provider);
                  return (
                    <Box
                      key={provider}
                      sx={{
                        px: 1.25,
                        py: 0.75,
                        borderRadius: '6px',
                        bgcolor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A' }}>
                        {provider}
                      </Typography>
                      <Chip
                        size="small"
                        label={connected ? 'Connected' : 'Link'}
                        onClick={() => handleToggleSso(provider)}
                        sx={{
                          height: 20,
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: 700,
                          fontSize: '10.5px',
                          bgcolor: connected ? '#EFF6FF' : '#FFFFFF',
                          color: connected ? '#1E40AF' : '#64748B',
                          border: `1px solid ${connected ? '#DBEAFE' : '#CBD5E1'}`,
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                bgcolor: '#FFFFFF',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <SecurityIcon sx={{ color: '#1E40AF', fontSize: 19 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  Permitted Workstation Modules
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 1.5 }}>
                Active RBAC scope for {roleCfg.shortLabel}:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
                {roleCfg.permittedModules.map((mod) => (
                  <Chip
                    key={mod}
                    size="small"
                    label={`Spec ${mod}`}
                    sx={{
                      height: 22,
                      borderRadius: '6px',
                      bgcolor: '#EFF6FF',
                      color: '#1E40AF',
                      border: '1px solid #DBEAFE',
                      fontWeight: 700,
                      fontSize: '11px',
                    }}
                  />
                ))}
              </Box>
              <Typography variant="caption" sx={{ color: '#475569', display: 'block', lineHeight: 1.5 }}>
                Workflow: {roleCfg.flowSummary}
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                bgcolor: '#FFFFFF',
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.75 }}>
                Session Actions
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2 }}>
                Sign out to terminate your workstation session and return to the public portal.
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                startIcon={<LogoutIcon sx={{ fontSize: '16px !important' }} />}
                onClick={onSignOut}
                sx={{ fontWeight: 700, borderRadius: '6px' }}
              >
                Logout
              </Button>
            </Paper>
          </Box>
        }
      />
    </Box>
  );
};
