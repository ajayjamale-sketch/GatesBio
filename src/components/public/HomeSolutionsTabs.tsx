import React from 'react';
import { Box, Typography, Paper, Button, Chip } from '@mui/material';
import BiotechIcon from '@mui/icons-material/Biotech';
import SchoolIcon from '@mui/icons-material/School';
import HubIcon from '@mui/icons-material/Hub';
import ScienceIcon from '@mui/icons-material/Science';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface HomeSolutionsTabsProps {
  onOpenDemo: () => void;
  onNavigateSolutions: () => void;
}

interface SolutionCard {
  id: string;
  category: string;
  icon: React.ReactNode;
  iconColor: string;
  headline: string;
  benefits: string[];
  impactBadge: string;
  imageUrl: string;
}

export const HomeSolutionsTabs: React.FC<HomeSolutionsTabsProps> = ({
  onOpenDemo,
  onNavigateSolutions,
}) => {
  const solutions: SolutionCard[] = [
    {
      id: 'biopharma',
      category: 'Biopharma & Therapeutics',
      icon: <BiotechIcon fontSize="small" />,
      iconColor: '#1E40AF',
      headline: 'Bring New Treatments to Patients Faster',
      benefits: [
        'Save 8+ hours per researcher every week by cutting manual data entry',
        'Keep proprietary drug formulas and patent documentation fully protected',
      ],
      impactBadge: '8.4 Hrs Saved / Wk',
      imageUrl: '/images/solution-biopharma.jpg',
    },
    {
      id: 'academic',
      category: 'Universities & Research Labs',
      icon: <SchoolIcon fontSize="small" />,
      iconColor: '#0F766E',
      headline: 'Keep Lab Knowledge Safe When Students Graduate',
      benefits: [
        'Preserve all laboratory protocols permanently across rotating lab cohorts',
        'Track grant budgets and supplies in real time without messy spreadsheets',
      ],
      impactBadge: '100% Protocols Retained',
      imageUrl: '/images/solution-academic.jpg',
    },
    {
      id: 'cro',
      category: 'Contract Research Labs (CROs)',
      icon: <HubIcon fontSize="small" />,
      iconColor: '#7E22CE',
      headline: 'Deliver Study Results to Clients in Hours, Not Weeks',
      benefits: [
        'Send finished test reports to sponsors 4x faster with automated summaries',
        'Keep each client’s proprietary study data strictly isolated and secure',
      ],
      impactBadge: '4x Faster Client Reports',
      imageUrl: '/images/solution-cro.jpg',
    },
    {
      id: 'diagnostics',
      category: 'Clinical Testing & Diagnostics',
      icon: <ScienceIcon fontSize="small" />,
      iconColor: '#B45309',
      headline: 'Zero-Error Patient Sample Tracking at Any Scale',
      benefits: [
        'Prevent sample mix-ups with instant 2D barcode accessioning',
        'Full patient privacy compliance to keep all medical records secure',
      ],
      impactBadge: 'Zero Lost Samples',
      imageUrl: '/images/solution-diagnostics.jpg',
    },
  ];

  return (
    <Box sx={{ my: { xs: 6, md: 9 } }}>
      {/* Clean Section Header */}
      <Box sx={{ textAlign: 'center', mb: { xs: 3.5, md: 5 } }}>
        <Typography
          variant="caption"
          sx={{
            color: '#0F766E',
            fontWeight: 800,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontSize: '11px',
            display: 'block',
            mb: 1,
          }}
        >
          Tailored Solutions
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
          Built for the Way Your Team Works
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
          Whether you are discovering new medicines, running a university lab, testing for clients, or processing patient diagnostics, GatsBio adapts to your specific routine.
        </Typography>
      </Box>

      {/* Responsive 2x2 Grid Layout */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: { xs: 2.5, sm: 3, md: 3.5 },
          width: '100%',
        }}
      >
        {solutions.map((item) => (
          <Paper
            key={item.id}
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              bgcolor: '#FFFFFF',
              boxShadow: '0 2px 8px -2px rgba(15, 23, 42, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 12px 28px -4px rgba(15, 23, 42, 0.08)',
                borderColor: '#CBD5E1',
                '& .card-image': {
                  transform: 'scale(1.03)',
                },
              },
            }}
          >
            {/* Pure Unobstructed Visual Image Header (Zero Text Overlays) */}
            <Box
              sx={{
                height: { xs: 180, sm: 210, md: 230 },
                width: '100%',
                overflow: 'hidden',
                position: 'relative',
                bgcolor: '#0F172A',
                transform: 'translateZ(0)',
                isolation: 'isolate',
              }}
            >
              <Box
                component="img"
                className="card-image"
                src={item.imageUrl}
                alt={item.headline}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'brightness(1.02) contrast(1.02)',
                  transition: 'transform 0.4s ease',
                }}
              />
            </Box>

            {/* Card Content Body */}
            <Box
              sx={{
                p: { xs: 2, sm: 2.5, md: 3 },
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'space-between',
              }}
            >
              <Box>
                {/* Sector Category & ROI Metric Badges */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1,
                    mb: 1.5,
                    flexWrap: 'wrap',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <Box sx={{ display: 'flex', color: item.iconColor }}>{item.icon}</Box>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: '11px', sm: '12px' },
                        color: '#0F172A',
                      }}
                    >
                      {item.category}
                    </Typography>
                  </Box>

                  <Chip
                    label={item.impactBadge}
                    size="small"
                    sx={{
                      bgcolor: '#ECFDF5',
                      color: '#065F46',
                      fontWeight: 700,
                      fontSize: '10.5px',
                      height: 22,
                      border: '1px solid #A7F3D0',
                    }}
                  />
                </Box>

                {/* Clear, Concise Headline */}
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    color: '#0F172A',
                    fontSize: { xs: '16px', sm: '18px' },
                    lineHeight: 1.3,
                    mb: 2,
                  }}
                >
                  {item.headline}
                </Typography>

                {/* Key Benefits (No Redundant Description) */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, mb: 2.5 }}>
                  {item.benefits.map((b, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <CheckCircleIcon sx={{ color: '#10B981', fontSize: 16, mt: '2px', flexShrink: 0 }} />
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#334155',
                          fontWeight: 600,
                          fontSize: { xs: '12.5px', sm: '13px' },
                          lineHeight: 1.45,
                        }}
                      >
                        {b}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box
                sx={{
                  pt: 2,
                  borderTop: '1px solid #F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1.5,
                  flexWrap: 'wrap',
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  onClick={onOpenDemo}
                  endIcon={<ArrowForwardIcon sx={{ fontSize: '14px !important' }} />}
                  sx={{
                    bgcolor: '#1E40AF',
                    '&:hover': { bgcolor: '#1D4ED8' },
                    py: 0.7,
                    px: 2,
                    fontSize: '12px',
                    fontWeight: 700,
                    borderRadius: 2,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Schedule Demo
                </Button>

                <Button
                  size="small"
                  onClick={onNavigateSolutions}
                  sx={{
                    color: '#475569',
                    fontSize: '12px',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    '&:hover': { color: '#0F172A', bgcolor: 'transparent' },
                  }}
                >
                  Learn More →
                </Button>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};
