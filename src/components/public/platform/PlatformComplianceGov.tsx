import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import GppGoodIcon from '@mui/icons-material/GppGood';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

export const PlatformComplianceGov: React.FC = () => {
  const standards = [
    {
      icon: <HistoryEduIcon sx={{ fontSize: 28, color: '#1E40AF' }} />,
      code: 'FDA 21 CFR Part 11',
      title: 'Electronic Records & Dual-Key Signatures',
      desc: 'Cryptographic dual-key electronic signatures with signature meanings (Authored, Reviewed, Approved) and append-only SHA-256 Merkle audit logs.',
      bg: '#EFF6FF',
    },
    {
      icon: <AssignmentTurnedInIcon sx={{ fontSize: 28, color: '#0F766E' }} />,
      code: 'GLP / GMP & GAMP 5',
      title: 'Validated Batch & SOP Workflows',
      desc: 'Version-controlled protocol SOPs with mandatory staff read-and-understood attestations, OOS deviation tracking, and integrated CAPA workflows.',
      bg: '#F0FDFA',
    },
    {
      icon: <GppGoodIcon sx={{ fontSize: 28, color: '#10B981' }} />,
      code: 'ISO 17025 & ISO 9001',
      title: 'Testing Lab Quality & Calibration',
      desc: 'Automated equipment calibration lockouts preventing unverified instruments from entering clinical or regulated testing pipelines.',
      bg: '#ECFDF5',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 28, color: '#7E22CE' }} />,
      code: 'HIPAA & GDPR',
      title: 'Protected Health Data Sovereignty',
      desc: 'End-to-end AES-256 encryption at rest, TLS 1.3 in transit, automated PHI de-identification for multi-omics data sharing, and tenant isolation.',
      bg: '#FAF5FF',
    },
  ];

  return (
    <Box
      id="compliance-governance"
      sx={{
        py: { xs: 7, md: 9 },
        bgcolor: '#0F172A',
        color: '#FFFFFF',
      }}
    >
      <Box className="container-custom">
        <Box sx={{ textAlign: 'center', maxWidth: 740, mx: 'auto', mb: 6 }}>
          <Chip
            label="Audit-Ready by Design"
            sx={{
              bgcolor: 'rgba(16, 185, 129, 0.16)',
              color: '#34D399',
              fontWeight: 700,
              border: '1px solid rgba(16, 185, 129, 0.35)',
              mb: 1.5,
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: '#FFFFFF',
              fontSize: { xs: '26px', md: '36px' },
              mb: 1.5,
            }}
          >
            Built-In Regulatory Compliance & Enterprise Security
          </Typography>
          <Typography variant="body1" sx={{ color: '#94A3B8' }}>
            Every laboratory sample transfer, protocol edit, and biological dataset mutation is cryptographically verified and audit-ready for FDA, EMA, and ISO inspections.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
            gap: 3,
          }}
        >
          {standards.map((std, idx) => (
            <Paper
              key={idx}
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2.5,
                  bgcolor: std.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                {std.icon}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: '#34D399',
                  fontWeight: 800,
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  mb: 0.75,
                }}
              >
                {std.code}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.25, fontSize: '17px' }}>
                {std.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#CBD5E1', lineHeight: 1.6 }}>
                {std.desc}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
