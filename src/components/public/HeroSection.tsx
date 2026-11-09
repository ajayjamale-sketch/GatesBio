import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import BiotechIcon from '@mui/icons-material/Biotech';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SpeedIcon from '@mui/icons-material/Speed';
import StorageIcon from '@mui/icons-material/Storage';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SchoolIcon from '@mui/icons-material/School';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BusinessIcon from '@mui/icons-material/Business';

interface HeroSectionProps {
  onOpenDemo: () => void;
  onExploreTools: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDemo, onExploreTools }) => {
  const trustInstitutions = [
    { name: 'Broad Institute Partner Labs', icon: <SchoolIcon fontSize="small" /> },
    { name: 'Mass General Brigham Clinical Units', icon: <LocalHospitalIcon fontSize="small" /> },
    { name: 'Vanguard Biotherapeutics', icon: <BusinessIcon fontSize="small" /> },
    { name: 'Stanford Cancer Center Core', icon: <SchoolIcon fontSize="small" /> },
    { name: 'Apex Cell Therapies', icon: <BiotechIcon fontSize="small" /> },
  ];

  return (
    <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 8 }, textAlign: 'center' }}>
      {/* Pre-Header Pill */}
      <Box sx={{ display: 'inline-flex', alignItems: 'center', mb: 3 }}>
        <Chip
          icon={<BiotechIcon sx={{ color: '#1E40AF !important' }} />}
          label="Next-Generation Enterprise Life Sciences & LIMS Platform"
          sx={{
            bgcolor: '#EFF6FF',
            color: '#1E40AF',
            fontWeight: 700,
            fontSize: '13px',
            border: '1px solid #BFDBFE',
            py: 2.2,
            px: 1,
          }}
        />
      </Box>

      {/* Main Headline */}
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '36px', sm: '48px', md: '64px' },
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.025em',
          color: '#0F172A',
          maxWidth: 960,
          mx: 'auto',
          mb: 3,
        }}
      >
        The Unified Operating System for{' '}
        <span style={{ color: '#1E40AF' }}>Biotechnology</span> &{' '}
        <span style={{ color: '#0F766E' }}>Life Sciences</span>
      </Typography>

      {/* Subhead */}
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: '16px', md: '20px' },
          lineHeight: 1.6,
          color: '#64748B',
          maxWidth: 760,
          mx: 'auto',
          mb: 5,
        }}
      >
        Unify sample logistics, 96-well microplates, collaborative electronic lab notebooks, genomic data, and{' '}
        <strong>FDA 21 CFR Part 11 compliance</strong> into one digital laboratory ecosystem.
      </Typography>

      {/* Action CTA Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 8 }}>
        <Button
          variant="contained"
          size="large"
          onClick={onOpenDemo}
          endIcon={<ArrowForwardIcon />}
          sx={{
            bgcolor: '#1E40AF',
            '&:hover': { bgcolor: '#1E3A8A' },
            px: 4,
            py: 1.6,
            fontSize: '16px',
            fontWeight: 700,
            borderRadius: 2.5,
            boxShadow: '0 10px 20px -5px rgba(30, 64, 175, 0.35)',
          }}
        >
          Book a Guided Scientific Demo
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={onExploreTools}
          sx={{
            borderColor: '#CBD5E1',
            color: '#0F172A',
            '&:hover': { borderColor: '#1E40AF', bgcolor: '#F8FAFC' },
            px: 3.5,
            py: 1.6,
            fontSize: '16px',
            fontWeight: 700,
            borderRadius: 2.5,
          }}
        >
          Explore Free Lab Calculators
        </Button>
      </Box>

      {/* Live Metric Tickers */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: 3,
          maxWidth: 900,
          mx: 'auto',
          p: 3,
          bgcolor: '#F8FAFC',
          borderRadius: 3,
          border: '1px solid #E2E8F0',
          mb: 6,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
          <Box sx={{ p: 1.5, bgcolor: '#EFF6FF', borderRadius: 2, color: '#1E40AF', display: 'flex' }}>
            <StorageIcon />
          </Box>
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>
              1.4M+
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
              Specimens Accessioned & Tracked
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center', borderLeft: { sm: '1px solid #E2E8F0' } }}>
          <Box sx={{ p: 1.5, bgcolor: '#ECFDF5', borderRadius: 2, color: '#10B981', display: 'flex' }}>
            <VerifiedUserIcon />
          </Box>
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>
              99.98%
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
              21 CFR Part 11 Audit Integrity
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center', borderLeft: { sm: '1px solid #E2E8F0' } }}>
          <Box sx={{ p: 1.5, bgcolor: '#F0FDF4', borderRadius: 2, color: '#0F766E', display: 'flex' }}>
            <SpeedIcon />
          </Box>
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>
              65%
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
              Shorter Experimental Turnaround
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Institutional Trust Ribbon */}
      <Box sx={{ pt: 2, borderTop: '1px solid #F1F5F9' }}>
        <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', mb: 2, display: 'block' }}>
          Trusted By Scientists At Leading Biotechnology & Research Organizations
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 2, sm: 4 }, flexWrap: 'wrap', opacity: 0.85 }}>
          {trustInstitutions.map((inst, i) => (
            <Chip
              key={i}
              icon={inst.icon}
              label={inst.name}
              variant="outlined"
              sx={{ borderColor: '#E2E8F0', color: '#475569', fontWeight: 600, fontSize: '12px' }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
