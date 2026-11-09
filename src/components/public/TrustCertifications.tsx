import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SecurityIcon from '@mui/icons-material/Security';
import GavelIcon from '@mui/icons-material/Gavel';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import LockIcon from '@mui/icons-material/Lock';

export const TrustCertifications: React.FC = () => {
  const certifications = [
    {
      title: 'FDA 21 CFR Part 11',
      desc: 'Dual-credential electronic signatures, password aging policies, and unalterable audit trails with reason-for-change logging.',
      badge: 'FDA Validated',
      icon: <FactCheckIcon sx={{ color: '#1E40AF' }} />,
    },
    {
      title: 'GAMP 5 & GLP/GMP',
      desc: 'Standard computerized system validation protocols for Good Laboratory & Manufacturing Practices.',
      badge: 'GxP Ready',
      icon: <GavelIcon sx={{ color: '#0F766E' }} />,
    },
    {
      title: 'ISO 17025 & ISO 9001',
      desc: 'Calibration drift tracking, instrument maintenance schedules, and testing laboratory competency management.',
      badge: 'ISO Certified',
      icon: <VerifiedUserIcon sx={{ color: '#10B981' }} />,
    },
    {
      title: 'HIPAA & SOC 2 Type II',
      desc: 'AES-256 cloud encryption at rest, TLS 1.3 in transit, and business associate agreement (BAA) execution for patient specimens.',
      badge: 'HIPAA Compliant',
      icon: <SecurityIcon sx={{ color: '#7E22CE' }} />,
    },
  ];

  return (
    <Box sx={{ my: 10 }}>
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="overline" sx={{ color: '#1E40AF', fontWeight: 700, letterSpacing: '1px' }}>
          Regulatory Rigor & Data Governance
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mt: 1 }}>
          Engineered for Inspection-Ready Life Sciences
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 640, mx: 'auto', mt: 1.5 }}>
          Built from the ground up to satisfy the strictest regulatory standards enforced by the FDA, EMA, and ISO auditing bodies.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
          gap: 3,
        }}
      >
        {certifications.map((c, i) => (
          <Paper
            key={i}
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid #E2E8F0',
              bgcolor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 20px -5px rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            <div>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ p: 1, bgcolor: '#F8FAFC', borderRadius: 2, display: 'flex' }}>
                  {c.icon}
                </Box>
                <Chip size="small" label={c.badge} sx={{ bgcolor: '#F1F5F9', color: '#0F172A', fontWeight: 700, fontSize: '11px' }} />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
                {c.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.5 }}>
                {c.desc}
              </Typography>
            </div>

            <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 1 }}>
              <LockIcon sx={{ fontSize: 16, color: '#10B981' }} />
              <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 700 }}>
                Continuous Cryptographic Integrity
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};
