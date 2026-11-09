import React from 'react';
import { Box, Typography } from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import StorageIcon from '@mui/icons-material/Storage';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { HeroCarousel } from './HeroCarousel';

interface HeroSectionProps {
  onOpenDemo: () => void;
  onExploreTools: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDemo, onExploreTools }) => {
  const brandLogos = [
    {
      name: 'VERTEX',
      svg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 19.5h5l5-9 5 9h5L12 2zm0 6l3 5.5h-6L12 8z" />
        </svg>
      ),
      fontSize: '15px',
      letterSpacing: '2.5px',
    },
    {
      name: 'illumina',
      svg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="5" cy="12" r="2.2" />
          <circle cx="12" cy="5.5" r="2.2" />
          <circle cx="12" cy="18.5" r="2.2" />
          <circle cx="19" cy="12" r="2.2" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
      ),
      fontSize: '16px',
      letterSpacing: '1px',
    },
    {
      name: 'REGENERON',
      svg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 4h7a5 5 0 0 1 5 5c0 2-1.2 3.8-3 4.6L17 20h-4l-3.5-5.5H8V20H4V4zm4 4v3.5h3a1.75 1.75 0 1 0 0-3.5H8z" />
        </svg>
      ),
      fontSize: '13.5px',
      letterSpacing: '2px',
    },
    {
      name: 'GINKGO BIOWORKS',
      svg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3a9 9 0 0 0-9 9c0 4.97 4.03 9 9 9 4.97 0 9-4.03 9-9 0-1.85-.56-3.57-1.52-5L12 12V3z" />
        </svg>
      ),
      fontSize: '12.5px',
      letterSpacing: '1.8px',
    },
    {
      name: 'BROAD INSTITUTE',
      svg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="7.5" height="7.5" rx="1" />
          <rect x="13.5" y="3" width="7.5" height="7.5" rx="1" />
          <rect x="3" y="13.5" width="7.5" height="7.5" rx="1" />
          <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1" />
        </svg>
      ),
      fontSize: '12.5px',
      letterSpacing: '1.6px',
    },
    {
      name: 'NOVARTIS',
      svg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3a9 9 0 0 0-9 9c0 3.8 2.4 7 5.8 8.3L12 13l3.2 7.3C18.6 19 21 15.8 21 12a9 9 0 0 0-9-9z" />
        </svg>
      ),
      fontSize: '14.5px',
      letterSpacing: '2px',
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', p: 0, m: 0, pb: { xs: 5, md: 7 }, overflowX: 'hidden' }}>
      {/* 1. Full-Width Rectangular Hero Carousel */}
      <HeroCarousel onOpenDemo={onOpenDemo} onExploreTools={onExploreTools} />

      {/* 2. Responsive Metrics & Trust Ribbon Container */}
      <Box className="container-custom" sx={{ mt: { xs: 3.5, sm: 4.5, md: 5 } }}>
        {/* Metric Tickers */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            width: '100%',
            maxWidth: 1040,
            mx: 'auto',
            p: { xs: 2, sm: 3 },
            bgcolor: '#FFFFFF',
            borderRadius: { xs: 3, sm: 3.5 },
            border: '1px solid #E2E8F0',
            mb: { xs: 3.5, sm: 4.5 },
            boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)',
            boxSizing: 'border-box',
          }}
        >
          {/* Card 1 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              justifyContent: { xs: 'flex-start', sm: 'center' },
              p: { xs: 1.5, sm: 2 },
            }}
          >
            <Box
              sx={{
                width: { xs: 42, sm: 48 },
                height: { xs: 42, sm: 48 },
                bgcolor: '#EFF6FF',
                borderRadius: 2.5,
                color: '#1E40AF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <StorageIcon sx={{ fontSize: { xs: 22, sm: 26 } }} />
            </Box>
            <Box sx={{ textAlign: 'left' }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: '#0F172A',
                  fontSize: { xs: '20px', sm: '22px', md: '26px' },
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                }}
              >
                1.4M+
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#64748B',
                  fontWeight: 600,
                  display: 'block',
                  mt: '2px',
                  fontSize: { xs: '11px', sm: '12px' },
                  lineHeight: 1.3,
                }}
              >
                Specimens Accessioned & Tracked
              </Typography>
            </Box>
          </Box>

          {/* Card 2 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              justifyContent: { xs: 'flex-start', sm: 'center' },
              borderLeft: { sm: '1px solid #E2E8F0' },
              borderTop: { xs: '1px solid #E2E8F0', sm: 'none' },
              p: { xs: 1.5, sm: 2 },
              pt: { xs: 2, sm: 2 },
            }}
          >
            <Box
              sx={{
                width: { xs: 42, sm: 48 },
                height: { xs: 42, sm: 48 },
                bgcolor: '#ECFDF5',
                borderRadius: 2.5,
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <VerifiedUserIcon sx={{ fontSize: { xs: 22, sm: 26 } }} />
            </Box>
            <Box sx={{ textAlign: 'left' }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: '#0F172A',
                  fontSize: { xs: '20px', sm: '22px', md: '26px' },
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                }}
              >
                99.98%
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#64748B',
                  fontWeight: 600,
                  display: 'block',
                  mt: '2px',
                  fontSize: { xs: '11px', sm: '12px' },
                  lineHeight: 1.3,
                }}
              >
                21 CFR Part 11 Audit Integrity
              </Typography>
            </Box>
          </Box>

          {/* Card 3 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              justifyContent: { xs: 'flex-start', sm: 'center' },
              borderLeft: { sm: '1px solid #E2E8F0' },
              borderTop: { xs: '1px solid #E2E8F0', sm: 'none' },
              p: { xs: 1.5, sm: 2 },
              pt: { xs: 2, sm: 2 },
            }}
          >
            <Box
              sx={{
                width: { xs: 42, sm: 48 },
                height: { xs: 42, sm: 48 },
                bgcolor: '#F0FDF4',
                borderRadius: 2.5,
                color: '#0F766E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <SpeedIcon sx={{ fontSize: { xs: 22, sm: 26 } }} />
            </Box>
            <Box sx={{ textAlign: 'left' }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: '#0F172A',
                  fontSize: { xs: '20px', sm: '22px', md: '26px' },
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                }}
              >
                65%
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#64748B',
                  fontWeight: 600,
                  display: 'block',
                  mt: '2px',
                  fontSize: { xs: '11px', sm: '12px' },
                  lineHeight: 1.3,
                }}
              >
                Shorter Experimental Turnaround
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Enterprise Brand Trust Ribbon */}
        <Box sx={{ pt: { xs: 2.5, sm: 3 }, borderTop: '1px solid #F1F5F9', textAlign: 'center', width: '100%' }}>
          <Typography
            variant="caption"
            sx={{
              color: '#94A3B8',
              fontWeight: 700,
              letterSpacing: { xs: '0.8px', sm: '1.2px' },
              textTransform: 'uppercase',
              fontSize: { xs: '10px', sm: '11px' },
              mb: { xs: 2, sm: 2.5 },
              display: 'block',
            }}
          >
            Trusted by Scientists at Leading Life Sciences Organizations
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              columnGap: { xs: 3, sm: 4.5, md: 6 },
              rowGap: { xs: 2, sm: 2.5 },
              px: { xs: 1, sm: 2 },
            }}
          >
            {brandLogos.map((brand, i) => (
              <Box
                key={i}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  color: '#64748B',
                  opacity: 0.65,
                  transition: 'all 0.25s ease',
                  cursor: 'default',
                  userSelect: 'none',
                  '&:hover': {
                    color: '#0F172A',
                    opacity: 1,
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'inherit',
                  }}
                >
                  {brand.svg}
                </Box>
                <Typography
                  component="span"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: `calc(${brand.fontSize} - 1.5px)`, sm: brand.fontSize },
                    letterSpacing: brand.letterSpacing,
                    color: 'inherit',
                    fontFamily: 'inherit',
                    lineHeight: 1,
                  }}
                >
                  {brand.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
