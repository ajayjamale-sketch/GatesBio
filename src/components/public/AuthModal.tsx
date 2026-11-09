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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BiotechIcon from '@mui/icons-material/Biotech';
import ScienceIcon from '@mui/icons-material/Science';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import LockIcon from '@mui/icons-material/Lock';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: (personaName: string, role: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const personas = [
    {
      name: 'Dr. Elena Vance, Ph.D.',
      role: 'Principal Investigator (PI)',
      department: 'Functional Genomics',
      avatarIcon: <BiotechIcon sx={{ color: '#1E40AF' }} />,
      bg: '#EFF6FF',
    },
    {
      name: 'Marcus Chen',
      role: 'Lead Lab Technician',
      department: 'Cellular Pharmacology',
      avatarIcon: <ScienceIcon sx={{ color: '#0F766E' }} />,
      bg: '#F0FDF4',
    },
    {
      name: 'David Ross, RAC',
      role: 'QA & Compliance Auditor',
      department: 'Regulatory Affairs',
      avatarIcon: <FactCheckIcon sx={{ color: '#92400E' }} />,
      bg: '#FEF3C7',
    },
  ];

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(email || 'Researcher', 'Scientific Researcher');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LockIcon sx={{ color: '#1E40AF' }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
            Sign In to GatsBio
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, textTransform: 'uppercase', mb: 1.5, display: 'block' }}>
          One-Click Scientific Persona Sandbox
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
          {personas.map((p, idx) => (
            <Box
              key={idx}
              onClick={() => onLoginSuccess(p.name, p.role)}
              sx={{
                p: 1.8,
                borderRadius: 2,
                border: '1px solid #E2E8F0',
                bgcolor: p.bg,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: '#1E40AF',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.08)',
                },
              }}
            >
              <Box sx={{ p: 1, bgcolor: '#FFFFFF', borderRadius: 1.5, display: 'flex' }}>
                {p.avatarIcon}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>
                  {p.name}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                  {p.role} • {p.department}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 2.5 }}>
          <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>
            OR INSTITUTIONAL SSO
          </Typography>
        </Divider>

        <form onSubmit={handleCustomLogin}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
              sx={{
                bgcolor: '#1E40AF',
                '&:hover': { bgcolor: '#1E3A8A' },
                py: 1.2,
                fontWeight: 700,
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
