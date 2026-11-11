import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Divider,
  MenuItem,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BiotechIcon from '@mui/icons-material/Biotech';
import ScienceIcon from '@mui/icons-material/Science';
import MedicationIcon from '@mui/icons-material/Medication';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LockIcon from '@mui/icons-material/Lock';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  ROLE_LIST,
  createDefaultSessionForRole,
} from '../../config/roleAccess';
import type { DashboardSession, UserRoleId } from '../../types/dashboard';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: (session: DashboardSession) => void;
}

const ROLE_ICONS: Record<UserRoleId, React.ReactNode> = {
  'research-scientist': <BiotechIcon sx={{ color: '#1E40AF', fontSize: 20 }} />,
  'lab-technician': <ScienceIcon sx={{ color: '#0F766E', fontSize: 20 }} />,
  'clinical-coordinator': <MedicationIcon sx={{ color: '#7E22CE', fontSize: 20 }} />,
  'biotech-admin': <AnalyticsIcon sx={{ color: '#0284C7', fontSize: 20 }} />,
  'compliance-officer': <FactCheckIcon sx={{ color: '#10B981', fontSize: 20 }} />,
  'system-admin': <AdminPanelSettingsIcon sx={{ color: '#334155', fontSize: 20 }} />,
};

export const AuthModal: React.FC<AuthModalProps> = ({
  open,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRoleId>('research-scientist');

  const handlePersonaSelect = (roleId: UserRoleId) => {
    onLoginSuccess(createDefaultSessionForRole(roleId));
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const derivedName = trimmedEmail
      ? trimmedEmail.split('@')[0].replace(/[._-]/g, ' ')
      : undefined;

    onLoginSuccess(
      createDefaultSessionForRole(selectedRole, {
        email: trimmedEmail || undefined,
        userName: derivedName,
      })
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LockIcon sx={{ color: '#1E40AF' }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
            Sign In to GatsBio Workstation
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Typography
          variant="caption"
          sx={{
            color: '#64748B',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
            mb: 1.5,
            display: 'block',
          }}
        >
          One-Click Role Sandbox (6 User Roles)
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 1.25,
            mb: 3,
          }}
        >
          {ROLE_LIST.map((role) => (
            <Box
              key={role.roleId}
              onClick={() => handlePersonaSelect(role.roleId)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePersonaSelect(role.roleId);
                }
              }}
              sx={{
                p: 1.5,
                borderRadius: 2.5,
                border: '1px solid #E2E8F0',
                bgcolor: role.bgTint,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: role.accentColor,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 14px -4px rgba(15, 23, 42, 0.12)',
                },
              }}
            >
              <Box
                sx={{
                  p: 0.9,
                  bgcolor: '#FFFFFF',
                  borderRadius: 1.5,
                  display: 'flex',
                  border: '1px solid #E2E8F0',
                  flexShrink: 0,
                }}
              >
                {ROLE_ICONS[role.roleId]}
              </Box>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 800,
                    color: '#0F172A',
                    lineHeight: 1.2,
                    fontSize: '13px',
                  }}
                >
                  {role.shortLabel}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#475569',
                    fontWeight: 600,
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {role.defaultPersonName}
                </Typography>
                <Chip
                  label={role.routePath}
                  size="small"
                  sx={{
                    mt: 0.4,
                    height: 18,
                    fontSize: '10px',
                    fontWeight: 700,
                    bgcolor: '#FFFFFF',
                    color: role.accentColor,
                    fontFamily: 'var(--font-mono)',
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 2.5 }}>
          <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700 }}>
            OR INSTITUTIONAL SSO / 2FA
          </Typography>
        </Divider>

        <form onSubmit={handleCustomLogin}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
            <TextField
              select
              label="Assigned Workspace Role"
              size="small"
              fullWidth
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRoleId)}
            >
              {ROLE_LIST.map((role) => (
                <MenuItem key={role.roleId} value={role.roleId}>
                  {role.roleTitle} ({role.department})
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Work or Academic Email"
              type="email"
              placeholder="name@institution.edu"
              size="small"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password / Security Token"
              type="password"
              size="small"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: '#1E40AF',
                '&:hover': { bgcolor: '#1E3A8A' },
                py: 1.2,
                fontWeight: 700,
                borderRadius: 2,
              }}
            >
              Sign In with 2FA / SSO
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};
