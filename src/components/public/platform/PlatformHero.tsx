import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ScienceIcon from '@mui/icons-material/Science';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SpeedIcon from '@mui/icons-material/Speed';
import HubIcon from '@mui/icons-material/Hub';

interface PlatformHeroProps {
  onOpenDemo: () => void;
}

export const PlatformHero: React.FC<PlatformHeroProps> = ({ onOpenDemo }) => {
  const highlights = [
    {
      icon: <HubIcon sx={{ color: '#1E40AF', fontSize: 20 }} />,
      value: '12 Core Modules',
      label: 'Unified LIMS, ELN, Data Lake & AI',
    },
    {
      icon: <VerifiedUserIcon sx={{ color: '#10B981', fontSize: 20 }} />,
      value: '21 CFR Part 11',
      label: 'Cryptographic e-Signatures & Audits',
    },
    {
      icon: <SpeedIcon sx={{ color: '#0F766E', fontSize: 20 }} />,
      value: '-60% Accessioning Time',
      label: 'Automated Barcode & Plate Sync',
    },
    {
      icon: <ScienceIcon sx={{ color: '#7E22CE', fontSize: 20 }} />,
      value: 'Zero-Silo Omics',
      label: 'FASTQ, BAM, VCF & FCS Native',
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        pb: { xs: 4, md: 5.5 },
      }}
    >
      {/* Full-Width Responsive Hero Banner with Concise Text Overlay */}
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
          src="/images/platform-hero.jpg"
          alt="Automated biotechnology laboratory with robotic liquid handlers and genomic displays"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: { xs: '72% center', sm: '65% center', md: 'center center' },
            zIndex: 0,
          }}
        />

        {/* Subtle Directional Gradient Scrim for Crisp Legibility */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: {
              xs: 'linear-gradient(to top, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.45) 55%, rgba(15, 23, 42, 0.1) 100%)',
              md: 'linear-gradient(90deg, rgba(15, 23, 42, 0.84) 0%, rgba(15, 23, 42, 0.42) 45%, rgba(15, 23, 42, 0.05) 100%), linear-gradient(to top, rgba(15, 23, 42, 0.6) 0%, transparent 45%)',
            },
          }}
        />

        {/* Concise Bottom-Left Foreground Content */}
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
          <Box sx={{ maxWidth: { xs: '100%', sm: 480, md: 540 } }}>
            <Chip
              label="GATSBIO PLATFORM"
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
              One Unified Biotech Platform
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#F1F5F9',
                fontSize: { xs: '13.5px', sm: '15px', md: '16px' },
                lineHeight: 1.5,
                mb: 2.5,
                textShadow: '0 1px 6px rgba(0, 0, 0, 0.8)',
              }}
            >
              LIMS, multi-omics data, AI research intelligence, and 21 CFR Part 11 compliance in a single ecosystem.
            </Typography>

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
              Book Scientific Demo
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Responsive Platform KPI Highlight Bar */}
      <Box className="container-custom" sx={{ mt: { xs: 3, md: 4.5 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
            gap: 2.5,
          }}
        >
          {highlights.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                bgcolor: '#F8FAFC',
                p: 2.5,
                borderRadius: 3,
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
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
                {item.icon}
              </Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}
                >
                  {item.value}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 500 }}>
                  {item.label}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
