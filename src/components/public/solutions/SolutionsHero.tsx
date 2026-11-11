import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BiotechIcon from '@mui/icons-material/Biotech';
import SchoolIcon from '@mui/icons-material/School';
import HubIcon from '@mui/icons-material/Hub';
import ScienceIcon from '@mui/icons-material/Science';
import { SECTOR_SOLUTIONS, type SectorId } from '../../../data/tailoredSolutionsData';

interface SolutionsHeroProps {
  onOpenDemo: () => void;
  onSelectSector: (sectorId: SectorId) => void;
}

const SECTOR_ICONS: Record<SectorId, React.ReactNode> = {
  biopharma: <BiotechIcon sx={{ color: '#1E40AF', fontSize: 20 }} />,
  academia: <SchoolIcon sx={{ color: '#0F766E', fontSize: 20 }} />,
  cro: <HubIcon sx={{ color: '#7E22CE', fontSize: 20 }} />,
  diagnostics: <ScienceIcon sx={{ color: '#0284C7', fontSize: 20 }} />,
};

export const SolutionsHero: React.FC<SolutionsHeroProps> = ({
  onOpenDemo,
  onSelectSector,
}) => {
  const scrollToExplorer = (sectorId?: SectorId) => {
    if (sectorId) {
      onSelectSector(sectorId);
    }
    const el = document.getElementById('sector-explorer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        pb: { xs: 4, md: 5.5 },
      }}
    >
      {/* Full-Width Responsive Hero Banner */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: { xs: 360, sm: 420, md: 480 },
          display: 'flex',
          alignItems: 'flex-end',
          bgcolor: '#0F172A',
          overflow: 'hidden',
        }}
      >
        {/* Background Hero Image */}
        <Box
          component="img"
          src="/images/solutions-hero.jpg"
          alt="Multidisciplinary biotechnology cleanroom with robotic liquid handlers and genomic analytics"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: { xs: '70% center', sm: '62% center', md: 'center center' },
            zIndex: 0,
          }}
        />

        {/* Directional Gradient Scrim for Crisp Legibility */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: {
              xs: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.5) 58%, rgba(15, 23, 42, 0.12) 100%)',
              md: 'linear-gradient(90deg, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.48) 46%, rgba(15, 23, 42, 0.08) 100%), linear-gradient(to top, rgba(15, 23, 42, 0.62) 0%, transparent 45%)',
            },
          }}
        />

        {/* Bottom-Left Foreground Content */}
        <Box
          className="container-custom"
          sx={{
            position: 'relative',
            zIndex: 2,
            pt: { xs: 4, sm: 5 },
            pb: { xs: 4.5, sm: 6, md: 7 },
            color: '#FFFFFF',
          }}
        >
          <Box sx={{ maxWidth: { xs: '100%', sm: 500, md: 560 } }}>
            <Chip
              label="TAILORED SOLUTIONS"
              size="small"
              sx={{
                bgcolor: '#1E40AF',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: { xs: '10px', sm: '11px' },
                letterSpacing: '0.6px',
                mb: 1.5,
                height: 24,
              }}
            />

            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                color: '#FFFFFF',
                fontSize: { xs: '24px', sm: '32px', md: '40px' },
                lineHeight: 1.18,
                letterSpacing: '-0.02em',
                mb: 1.25,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
              }}
            >
              Engineered for Every Scientific Mission
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#F1F5F9',
                fontSize: { xs: '13.5px', sm: '15px', md: '16px' },
                lineHeight: 1.55,
                mb: 2.5,
                textShadow: '0 1px 6px rgba(0, 0, 0, 0.8)',
              }}
            >
              Purpose-built laboratory configurations for biopharma R&D, university research institutes, contract research organizations, and clinical diagnostics labs.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              <Button
                variant="contained"
                size="medium"
                onClick={onOpenDemo}
                endIcon={<ArrowForwardIcon sx={{ fontSize: '16px !important' }} />}
                sx={{
                  bgcolor: '#1E40AF',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  px: { xs: 2.5, sm: 3 },
                  py: { xs: 0.9, sm: 1.1 },
                  fontSize: { xs: '13px', sm: '14px' },
                  borderRadius: 2,
                  boxShadow: '0 4px 14px rgba(30, 64, 175, 0.45)',
                  '&:hover': { bgcolor: '#1D4ED8' },
                }}
              >
                Book Sector Demo
              </Button>
              <Button
                variant="outlined"
                size="medium"
                onClick={() => scrollToExplorer()}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.45)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  px: { xs: 2.2, sm: 2.8 },
                  py: { xs: 0.9, sm: 1.1 },
                  fontSize: { xs: '13px', sm: '14px' },
                  borderRadius: 2,
                  bgcolor: 'rgba(15, 23, 42, 0.35)',
                  '&:hover': {
                    borderColor: '#FFFFFF',
                    bgcolor: 'rgba(255, 255, 255, 0.12)',
                  },
                }}
              >
                Explore 4 Sectors
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Responsive Sector Quick-Jump Highlight Bar */}
      <Box className="container-custom" sx={{ mt: { xs: 3, md: 4.5 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
            gap: 2.5,
          }}
        >
          {SECTOR_SOLUTIONS.map((sector) => (
            <Box
              key={sector.id}
              onClick={() => scrollToExplorer(sector.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  scrollToExplorer(sector.id);
                }
              }}
              sx={{
                bgcolor: '#F8FAFC',
                p: 2.25,
                borderRadius: 3,
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
                transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  borderColor: sector.accentColor,
                  boxShadow: '0 10px 24px -8px rgba(15, 23, 42, 0.12)',
                },
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2.5,
                  bgcolor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {SECTOR_ICONS[sector.id]}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.2, fontSize: '15px' }}
                >
                  {sector.shortName} · {sector.roiMetric}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: '#64748B', fontWeight: 500, display: 'block', mt: 0.25 }}
                >
                  {sector.badge}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
