import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import SecurityIcon from '@mui/icons-material/Security';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {
  SECTOR_COMPLIANCE_MATRIX,
  ONBOARDING_PHASES,
} from '../../../data/tailoredSolutionsData';

export const SolutionsComplianceMatrix: React.FC = () => {
  return (
    <Box id="compliance-deployment-fit" sx={{ py: { xs: 6, md: 9 }, bgcolor: '#FFFFFF' }}>
      <Box className="container-custom">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: { xs: 4, md: 6 } }}>
          <Chip
            label="Compliance, Deployment & Migration"
            size="small"
            sx={{
              bgcolor: '#EFF6FF',
              color: '#1E40AF',
              fontWeight: 800,
              fontSize: '11px',
              mb: 1.5,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: '#0F172A',
              fontSize: { xs: '24px', sm: '30px', md: '36px' },
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              mb: 1.25,
            }}
          >
            Tailored Security Posture & 3-Week Lab Onboarding
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#475569', fontSize: { xs: '14.5px', md: '16px' }, lineHeight: 1.6 }}
          >
            Every sector deployment aligns with its exact regulatory mandates, isolation topology, and legacy data migration path.
          </Typography>
        </Box>

        {/* Top Grid: Compliance Fit Matrix + Infrastructure Photo */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.35fr 0.95fr' },
            gap: 3,
            alignItems: 'stretch',
            mb: { xs: 4, md: 5 },
          }}
        >
          {/* Left: Sector Compliance & Deployment Cards / Matrix */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2,
            }}
          >
            {SECTOR_COMPLIANCE_MATRIX.map((row) => (
              <Paper
                key={row.sectorId}
                elevation={0}
                sx={{
                  p: 2.75,
                  borderRadius: 3,
                  border: '1px solid #E2E8F0',
                  bgcolor: '#F8FAFC',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 2,
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    borderColor: row.accentColor,
                    boxShadow: '0 8px 20px -10px rgba(15, 23, 42, 0.1)',
                  },
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25 }}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        bgcolor: row.accentColor,
                        flexShrink: 0,
                      }}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', fontSize: '15px' }}>
                      {row.sectorName}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
                    {row.standards.map((std) => (
                      <Chip
                        key={std}
                        label={std}
                        size="small"
                        sx={{
                          bgcolor: '#FFFFFF',
                          border: '1px solid #E2E8F0',
                          color: '#0F172A',
                          fontWeight: 700,
                          fontSize: '11px',
                          height: 23,
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pt: 1.5, borderTop: '1px solid #E2E8F0' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CloudDoneIcon sx={{ fontSize: 16, color: row.accentColor }} />
                    <Typography variant="caption" sx={{ color: '#334155', fontWeight: 700 }}>
                      {row.deploymentModel}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SecurityIcon sx={{ fontSize: 16, color: '#0F766E' }} />
                    <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>
                      {row.isolationLevel}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <RocketLaunchIcon sx={{ fontSize: 16, color: '#10B981' }} />
                    <Typography variant="caption" sx={{ color: '#065F46', fontWeight: 700 }}>
                      Go-Live: {row.onboardingTime}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>

          {/* Right: Enterprise Deployment Infrastructure Image Card */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3.5,
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              bgcolor: '#0F172A',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ position: 'relative', minHeight: { xs: 220, sm: 260 }, flex: 1 }}>
              <Box
                component="img"
                src="/images/solutions-deployment-lab.jpg"
                alt="Automated sample carousel and barcode scanner linked to enterprise VPC infrastructure"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.35) 60%, rgba(15, 23, 42, 0.1) 100%)',
                }}
              />
            </Box>

            <Box sx={{ p: { xs: 2.75, md: 3.5 }, bgcolor: '#0F172A' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <VerifiedUserIcon sx={{ color: '#10B981', fontSize: 20 }} />
                <Typography variant="overline" sx={{ color: '#6EE7B7', fontWeight: 800, letterSpacing: '0.8px' }}>
                  Zero-Compromise Architecture
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, fontSize: { xs: '18px', md: '21px' }, mb: 1 }}>
                Instrument-to-Cloud Encryption & Validation
              </Typography>
              <Typography variant="body2" sx={{ color: '#CBD5E1', lineHeight: 1.6 }}>
                Connect liquid handlers, sequencers, and cryo sensors directly to AES-256 encrypted vaults with Bring-Your-Own-Key (BYOK) KMS and automated IQ/OQ scripts.
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Bottom 3-Week Migration & Onboarding Timeline */}
        <Box
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3.5,
            bgcolor: '#F8FAFC',
            border: '1px solid #E2E8F0',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 1.5,
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '18px', md: '20px' } }}>
                Rapid 3-Week Scientific Migration Path
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B' }}>
                Assisted by GatsBio Solutions Engineers—zero downtime for active wet-lab runs.
              </Typography>
            </Box>
            <Chip
              label="CSV / JSON / Legacy ELN Importers"
              size="small"
              sx={{ bgcolor: '#ECFDF5', color: '#065F46', fontWeight: 700 }}
            />
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 2.5,
            }}
          >
            {ONBOARDING_PHASES.map((phase) => (
              <Paper
                key={phase.step}
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 2.5,
                  bgcolor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.25 }}>
                  <Chip
                    label={phase.timeframe}
                    size="small"
                    sx={{ bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 800, fontSize: '11px' }}
                  />
                  <Typography variant="caption" sx={{ fontWeight: 900, color: '#94A3B8', fontSize: '13px' }}>
                    STEP {phase.step}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.75, fontSize: '15px' }}>
                  {phase.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.55, fontSize: '13.5px' }}>
                  {phase.desc}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
