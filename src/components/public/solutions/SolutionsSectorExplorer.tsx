import React from 'react';
import { Box, Typography, Paper, Button, Chip } from '@mui/material';
import BiotechIcon from '@mui/icons-material/Biotech';
import SchoolIcon from '@mui/icons-material/School';
import HubIcon from '@mui/icons-material/Hub';
import ScienceIcon from '@mui/icons-material/Science';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import {
  SECTOR_SOLUTIONS,
  type SectorId,
} from '../../../data/tailoredSolutionsData';

interface SolutionsSectorExplorerProps {
  activeSector: SectorId;
  onChangeSector: (sectorId: SectorId) => void;
  onOpenDemo: () => void;
}

const SECTOR_ICONS: Record<SectorId, React.ReactNode> = {
  biopharma: <BiotechIcon fontSize="small" />,
  academia: <SchoolIcon fontSize="small" />,
  cro: <HubIcon fontSize="small" />,
  diagnostics: <ScienceIcon fontSize="small" />,
};

export const SolutionsSectorExplorer: React.FC<SolutionsSectorExplorerProps> = ({
  activeSector,
  onChangeSector,
  onOpenDemo,
}) => {
  const current =
    SECTOR_SOLUTIONS.find((s) => s.id === activeSector) || SECTOR_SOLUTIONS[0];

  return (
    <Box id="sector-explorer" sx={{ py: { xs: 6, md: 9 }, bgcolor: '#FFFFFF' }}>
      <Box className="container-custom">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 740, mx: 'auto', mb: { xs: 3.5, md: 5 } }}>
          <Chip
            label="Solutions By Sector"
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
            Built for the Way Your Organization Operates
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#475569', fontSize: { xs: '14.5px', md: '16px' }, lineHeight: 1.6 }}
          >
            Select your industry vertical to inspect pre-configured LIMS, ELN, data governance, and compliance workflows tailored to your lab.
          </Typography>
        </Box>

        {/* Sector Selector Tabs */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 1.25,
            mb: { xs: 3.5, md: 5 },
          }}
        >
          {SECTOR_SOLUTIONS.map((sector) => {
            const isSelected = sector.id === current.id;
            return (
              <Button
                key={sector.id}
                onClick={() => onChangeSector(sector.id)}
                startIcon={SECTOR_ICONS[sector.id]}
                variant={isSelected ? 'contained' : 'outlined'}
                sx={{
                  px: { xs: 2, sm: 2.75 },
                  py: 1.1,
                  borderRadius: 2.5,
                  fontWeight: 700,
                  fontSize: { xs: '12.5px', sm: '13.5px' },
                  bgcolor: isSelected ? sector.accentColor : '#F8FAFC',
                  color: isSelected ? '#FFFFFF' : '#334155',
                  borderColor: isSelected ? sector.accentColor : '#CBD5E1',
                  boxShadow: isSelected ? '0 4px 12px rgba(15, 23, 42, 0.14)' : 'none',
                  '&:hover': {
                    bgcolor: isSelected ? sector.accentColor : '#EFF6FF',
                    borderColor: sector.accentColor,
                  },
                }}
              >
                {sector.name}
              </Button>
            );
          })}
        </Box>

        {/* Sector Deep-Dive Card */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            border: '1px solid #E2E8F0',
            bgcolor: '#FFFFFF',
            overflow: 'hidden',
            boxShadow: '0 10px 30px -12px rgba(15, 23, 42, 0.08)',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.05fr 1.25fr' },
          }}
        >
          {/* Left Visual Column with Sector Photo & Metric Overlay */}
          <Box
            sx={{
              position: 'relative',
              minHeight: { xs: 260, sm: 340, lg: 480 },
              bgcolor: '#0F172A',
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src={current.imageUrl}
              alt={current.name}
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.35) 55%, rgba(15, 23, 42, 0.1) 100%)',
              }}
            />

            {/* Top Compliance Chips */}
            <Box
              sx={{
                position: 'relative',
                zIndex: 2,
                p: { xs: 2.5, md: 3 },
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              {current.complianceTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(15, 23, 42, 0.72)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
                    backdropFilter: 'blur(6px)',
                    fontWeight: 700,
                    fontSize: '11px',
                  }}
                />
              ))}
            </Box>

            {/* Bottom Verified Impact Overlay */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 2,
                p: { xs: 2.5, md: 3.5 },
                color: '#FFFFFF',
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: '#6EE7B7',
                  fontWeight: 800,
                  letterSpacing: '0.8px',
                  fontSize: '11px',
                  display: 'block',
                }}
              >
                Verified Sector Impact
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '28px', md: '36px' },
                  lineHeight: 1.15,
                  mt: 0.25,
                }}
              >
                {current.roiMetric}
              </Typography>
              <Typography variant="body2" sx={{ color: '#E2E8F0', fontWeight: 500, mt: 0.5 }}>
                {current.roiLabel}
              </Typography>
            </Box>
          </Box>

          {/* Right Content Column */}
          <Box
            sx={{
              p: { xs: 3, sm: 4, md: 5 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 1.5 }}>
                <Chip
                  label={current.name}
                  size="small"
                  sx={{
                    bgcolor: current.bgTint,
                    color: current.accentColor,
                    fontWeight: 800,
                  }}
                />
                <Chip
                  label={current.badge}
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: '#E2E8F0', color: '#475569', fontWeight: 600 }}
                />
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: '#0F172A',
                  fontSize: { xs: '21px', sm: '25px', md: '28px' },
                  lineHeight: 1.25,
                  mb: 1.5,
                }}
              >
                {current.headline}
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: '#475569', lineHeight: 1.65, fontSize: '14.5px', mb: 3 }}
              >
                {current.desc}
              </Typography>

              {/* Legacy Pain vs GatsBio Fix Strip */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 1.5,
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    p: 1.75,
                    borderRadius: 2.5,
                    bgcolor: '#FEF2F2',
                    border: '1px solid #FECACA',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                    <WarningAmberIcon sx={{ fontSize: 15, color: '#DC2626' }} />
                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#991B1B', textTransform: 'uppercase' }}>
                      Legacy Bottleneck
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#7F1D1D', lineHeight: 1.45, display: 'block' }}>
                    {current.legacyPain}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    p: 1.75,
                    borderRadius: 2.5,
                    bgcolor: '#ECFDF5',
                    border: '1px solid #A7F3D0',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                    <AutoAwesomeIcon sx={{ fontSize: 15, color: '#059669' }} />
                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#065F46', textTransform: 'uppercase' }}>
                      GatsBio Solution
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#064E3B', lineHeight: 1.45, display: 'block' }}>
                    {current.gatsBioFix}
                  </Typography>
                </Box>
              </Box>

              {/* Key Capabilities */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.4, mb: 3 }}>
                {current.benefits.map((b, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
                    <CheckCircleIcon sx={{ color: '#10B981', fontSize: 19, mt: '2px', flexShrink: 0 }} />
                    <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600, lineHeight: 1.5 }}>
                      {b}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Recommended Modules */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#64748B',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                    display: 'block',
                    mb: 1,
                  }}
                >
                  Pre-Configured Platform Modules
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                  {current.recommendedModules.map((mod) => (
                    <Chip
                      key={mod}
                      label={mod}
                      size="small"
                      sx={{
                        bgcolor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        color: '#0F172A',
                        fontWeight: 700,
                        fontSize: '11.5px',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>

            <Box sx={{ pt: 2, borderTop: '1px solid #E2E8F0', display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              <Button
                variant="contained"
                onClick={onOpenDemo}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: current.accentColor,
                  '&:hover': { bgcolor: '#1E3A8A' },
                  px: 3.25,
                  py: 1.25,
                  borderRadius: 2,
                  fontWeight: 700,
                }}
              >
                Request a {current.shortName} Demo
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
