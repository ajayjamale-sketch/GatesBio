import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import GavelIcon from '@mui/icons-material/Gavel';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const TrustCertifications: React.FC = () => {
  const certifications = [
    {
      title: 'FDA 21 CFR Part 11',
      summary: 'Dual-credential electronic signatures and immutable audit trails with reason-for-change logging.',
      badge: 'FDA Validated',
      icon: <FactCheckIcon fontSize="small" />,
    },
    {
      title: 'GAMP 5 & GLP/GMP',
      summary: 'Computerized system validation protocols adhering to Good Laboratory & Manufacturing Practices.',
      badge: 'GxP Compliant',
      icon: <GavelIcon fontSize="small" />,
    },
    {
      title: 'ISO 17025 & ISO 9001',
      summary: 'Calibration drift tracking, instrument maintenance schedules, and testing laboratory competency.',
      badge: 'ISO Certified',
      icon: <VerifiedUserIcon fontSize="small" />,
    },
    {
      title: 'HIPAA & SOC 2 Type II',
      summary: 'AES-256 cloud encryption at rest, TLS 1.3 in transit, and signed Business Associate Agreements.',
      badge: 'HIPAA Verified',
      icon: <SecurityIcon fontSize="small" />,
    },
  ];

  return (
    <Box sx={{ my: { xs: 6, md: 9 } }}>
      {/* Section Header */}
      <Box sx={{ textAlign: 'center', mb: { xs: 3.5, md: 5 } }}>
        <Typography
          variant="caption"
          sx={{
            color: '#1E40AF',
            fontWeight: 800,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontSize: '11px',
            display: 'block',
            mb: 1,
          }}
        >
          Compliance & Governance
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '22px', sm: '28px', md: '34px' },
            fontWeight: 800,
            color: '#0F172A',
            letterSpacing: '-0.02em',
            mb: 1.5,
          }}
        >
          Engineered for Inspection-Ready Life Sciences
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#64748B',
            maxWidth: 620,
            mx: 'auto',
            fontSize: { xs: '13.5px', sm: '15px' },
            lineHeight: 1.55,
          }}
        >
          Built from the ground up to satisfy the strictest regulatory standards enforced by the FDA, EMA, and ISO auditing bodies.
        </Typography>
      </Box>

      {/* Unified Single-Color Responsive Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: { xs: 2, sm: 2.5, md: 3 },
          width: '100%',
        }}
      >
        {certifications.map((item, i) => (
          <Paper
            key={i}
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3 },
              borderRadius: 3,
              border: '1px solid #E2E8F0',
              bgcolor: '#FFFFFF',
              boxShadow: '0 2px 8px -2px rgba(15, 23, 42, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 10px 24px -4px rgba(30, 64, 175, 0.08)',
                borderColor: '#BFDBFE',
              },
            }}
          >
            <div>
              {/* Header: Unified Blue Icon + Status Chip */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    bgcolor: '#EFF6FF',
                    color: '#1E40AF',
                    border: '1px solid #DBEAFE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </Box>
                <Chip
                  size="small"
                  label={item.badge}
                  sx={{
                    bgcolor: '#F8FAFC',
                    color: '#1E40AF',
                    fontWeight: 700,
                    fontSize: '10.5px',
                    border: '1px solid #E2E8F0',
                    height: 24,
                  }}
                />
              </Box>

              {/* Title */}
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 800,
                  color: '#0F172A',
                  fontSize: { xs: '15px', sm: '16px' },
                  mb: 1,
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </Typography>

              {/* Clean Summary (No Fluff) */}
              <Typography
                variant="body2"
                sx={{
                  color: '#64748B',
                  lineHeight: 1.5,
                  fontSize: { xs: '12.5px', sm: '13px' },
                }}
              >
                {item.summary}
              </Typography>
            </div>

            {/* Clean Verification Status */}
            <Box
              sx={{
                mt: 2.5,
                pt: 1.5,
                borderTop: '1px solid #F1F5F9',
                display: 'flex',
                alignItems: 'center',
                gap: 0.8,
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 15, color: '#1E40AF' }} />
              <Typography
                variant="caption"
                sx={{
                  color: '#1E40AF',
                  fontWeight: 700,
                  fontSize: '11px',
                }}
              >
                Inspection Verified
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};
