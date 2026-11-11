import React from 'react';
import { Box, Typography, Paper, Chip, Button } from '@mui/material';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import GavelIcon from '@mui/icons-material/Gavel';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { REGULATORY_FRAMEWORKS } from '../../../data/complianceData';

interface ComplianceFrameworksGridProps {
  onOpenDemo: () => void;
}

const FRAMEWORK_ICONS: Record<string, React.ReactNode> = {
  'fda-part11': <FactCheckIcon sx={{ color: '#1E40AF', fontSize: 22 }} />,
  'gamp5-gxp': <GavelIcon sx={{ color: '#0F766E', fontSize: 22 }} />,
  'iso-17025': <VerifiedUserIcon sx={{ color: '#10B981', fontSize: 22 }} />,
  'hipaa-soc2': <SecurityIcon sx={{ color: '#0284C7', fontSize: 22 }} />,
};

export const ComplianceFrameworksGrid: React.FC<ComplianceFrameworksGridProps> = ({
  onOpenDemo,
}) => {
  return (
    <Box
      id="regulatory-frameworks"
      sx={{
        py: { xs: 6, md: 9 },
        bgcolor: '#F8FAFC',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      <Box className="container-custom">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 740, mx: 'auto', mb: { xs: 4, md: 5.5 } }}>
          <Chip
            label="Global Regulatory Alignment"
            size="small"
            sx={{
              bgcolor: '#ECFDF5',
              color: '#0F766E',
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
            Built to Satisfy FDA, EMA, ISO & HIPAA Audits
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#475569', fontSize: { xs: '14.5px', md: '16px' }, lineHeight: 1.6 }}
          >
            Every sample lineage, protocol execution, and instrument calibration record ships with inspection-ready controls out of the box.
          </Typography>
        </Box>

        {/* Top Spotlight Banner with QA Cleanroom Photography */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            border: '1px solid #E2E8F0',
            bgcolor: '#FFFFFF',
            overflow: 'hidden',
            mb: 4,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.05fr 1.25fr' },
            boxShadow: '0 8px 24px -12px rgba(15, 23, 42, 0.08)',
          }}
        >
          <Box sx={{ position: 'relative', minHeight: { xs: 240, sm: 300, lg: 320 } }}>
            <Box
              component="img"
              src="/images/compliance-inspection-lab.jpg"
              alt="Pharmaceutical quality assurance officers reviewing electronic batch records in a cleanroom laboratory"
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
                  'linear-gradient(to top, rgba(15, 23, 42, 0.86) 0%, rgba(15, 23, 42, 0.18) 60%)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 20,
                left: 20,
                right: 20,
                zIndex: 2,
                color: '#FFFFFF',
              }}
            >
              <Typography variant="overline" sx={{ color: '#6EE7B7', fontWeight: 800, letterSpacing: '0.8px' }}>
                Continuous GxP Readiness
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, fontSize: '20px' }}>
                99.98% Audit Readiness Score
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              p: { xs: 3, sm: 4, md: 4.5 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Chip
                label="AUTOMATED VALIDATION EVIDENCE"
                size="small"
                sx={{ bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 800, fontSize: '11px', mb: 1.5 }}
              />
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '20px', md: '24px' }, mb: 1.25 }}>
                Eliminate Manual Binder Preparation Before Regulatory Inspections
              </Typography>
              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.65, fontSize: '14.5px', mb: 2.5 }}>
                Export verified electronic batch records, instrument calibration histories, SOP training matrices, and cryptographic audit trails in seconds during FDA, EMA, CLIA/CAP, or sponsor audits.
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              <Button
                variant="contained"
                onClick={onOpenDemo}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: '#1E40AF',
                  '&:hover': { bgcolor: '#1E3A8A' },
                  fontWeight: 700,
                  px: 3,
                  py: 1.15,
                  borderRadius: 2,
                }}
              >
                Schedule QA Compliance Review
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* 2x2 Regulatory Frameworks Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}
        >
          {REGULATORY_FRAMEWORKS.map((fw) => (
            <Paper
              key={fw.id}
              elevation={0}
              sx={{
                p: { xs: 3, md: 3.75 },
                borderRadius: 3.5,
                border: '1px solid #E2E8F0',
                bgcolor: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  borderColor: fw.accentColor,
                  boxShadow: '0 12px 28px -12px rgba(15, 23, 42, 0.1)',
                },
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1.5,
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        bgcolor: fw.bgTint,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {FRAMEWORK_ICONS[fw.id]}
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: fw.accentColor, fontWeight: 800, letterSpacing: '0.5px' }}>
                        {fw.code}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', fontSize: '17px', lineHeight: 1.2 }}>
                        {fw.title}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={fw.badge}
                    size="small"
                    sx={{
                      bgcolor: fw.bgTint,
                      color: fw.accentColor,
                      fontWeight: 800,
                      fontSize: '11px',
                    }}
                  />
                </Box>

                <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6, mb: 2.25 }}>
                  {fw.summary}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pt: 2, borderTop: '1px solid #F1F5F9' }}>
                {fw.controls.map((ctrl, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <CheckCircleIcon sx={{ color: '#10B981', fontSize: 17, mt: '2px', flexShrink: 0 }} />
                    <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600, fontSize: '13px', lineHeight: 1.45 }}>
                      {ctrl}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
