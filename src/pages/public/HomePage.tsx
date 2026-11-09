import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { HeroSection } from '../../components/public/HeroSection';
import { FeatureSwitcher } from '../../components/public/FeatureSwitcher';
import { InteractivePlateTeaser } from '../../components/public/InteractivePlateTeaser';
import { ProblemSolutionMatrix } from '../../components/public/ProblemSolutionMatrix';
import { HomeSolutionsTabs } from '../../components/public/HomeSolutionsTabs';
import { TrustCertifications } from '../../components/public/TrustCertifications';
import { HomeRoiSection } from '../../components/public/HomeRoiSection';
import { TESTIMONIALS } from '../../data/mockData';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import VerifiedIcon from '@mui/icons-material/Verified';

interface HomePageProps {
  onOpenDemo: () => void;
  onNavigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenDemo, onNavigate }) => {
  return (
    <Box className="container-custom">
      {/* =========================================================================
          SECTION 1: HERO & REAL-TIME BIO-METRIC TICKER
          ========================================================================= */}
      <Box component="section" id="hero-section">
        <HeroSection onOpenDemo={onOpenDemo} onExploreTools={() => onNavigate('tools')} />
      </Box>

      {/* =========================================================================
          SECTION 2: THE CORE LABORATORY PLATFORM (INTERACTIVE 4-PILLAR FEATURE SWITCHER)
          ========================================================================= */}
      <Box component="section" id="platform-pillars-section">
        <FeatureSwitcher onOpenDemo={onOpenDemo} onNavigate={onNavigate} />
      </Box>

      {/* =========================================================================
          SECTION 3: HANDS-ON 96-WELL MICROPLATE WORKSTATION (LIVE INTERACTIVE PREVIEW)
          ========================================================================= */}
      <Box component="section" id="microplate-workstation-section" sx={{ my: { xs: 6, md: 10 } }}>
        <InteractivePlateTeaser />
      </Box>

      {/* =========================================================================
          SECTION 4: PROBLEM VS. SOLUTION COMPARISON MATRIX (LEGACY VS. GATSBIO)
          ========================================================================= */}
      <Box component="section" id="problem-solution-section">
        <ProblemSolutionMatrix />
      </Box>

      {/* =========================================================================
          SECTION 5: TAILORED SOLUTIONS BY INDUSTRY & RESEARCH ROLE
          ========================================================================= */}
      <Box component="section" id="solutions-by-industry-section">
        <HomeSolutionsTabs
          onOpenDemo={onOpenDemo}
          onNavigateSolutions={() => onNavigate('solutions')}
        />
      </Box>

      {/* =========================================================================
          SECTION 6: REGULATORY RIGOR & COMPLIANCE STANDARDS (TRUST CENTER PREVIEW)
          ========================================================================= */}
      <Box component="section" id="compliance-trust-section">
        <TrustCertifications />
      </Box>

      {/* =========================================================================
          SECTION 7: SCIENTIFIC CASE STUDIES & SOCIAL PROOF
          ========================================================================= */}
      <Box component="section" id="testimonials-section" sx={{ my: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip
            icon={<VerifiedIcon sx={{ color: '#0F766E !important' }} />}
            label="Validated by Scientific Leaders"
            sx={{ bgcolor: '#F0FDF4', color: '#0F766E', fontWeight: 700, mb: 2 }}
          />
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mt: 1 }}>
            Accelerating Preclinical Discovery Across Global Biopharma
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 640, mx: 'auto', mt: 1.5 }}>
            Hear from the directors, principal investigators, and regulatory officers who rely on GatsBio every day.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3.5,
          }}
        >
          {TESTIMONIALS.map((t, idx) => (
            <Paper
              key={idx}
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3.5,
                border: '1px solid #E2E8F0',
                bgcolor: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 20px -5px rgba(0, 0, 0, 0.08)',
                },
              }}
            >
              <div>
                <FormatQuoteIcon sx={{ fontSize: 36, color: '#1E40AF', opacity: 0.25, mb: 1 }} />
                <Typography variant="body1" sx={{ color: '#334155', lineHeight: 1.6, fontStyle: 'italic', mb: 3 }}>
                  "{t.quote}"
                </Typography>
              </div>

              <Box sx={{ pt: 2, borderTop: '1px solid #F1F5F9' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  {t.author}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontWeight: 600 }}>
                  {t.role}
                </Typography>
                <Chip
                  size="small"
                  label={t.org}
                  sx={{ mt: 1, bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 700, fontSize: '11px' }}
                />
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* =========================================================================
          SECTION 8: INTERACTIVE LAB ROI CALCULATOR & FINAL CONVERSION CTA
          ========================================================================= */}
      <Box component="section" id="roi-conversion-section">
        <HomeRoiSection
          onOpenDemo={onOpenDemo}
          onNavigatePricing={() => onNavigate('pricing')}
        />
      </Box>
    </Box>
  );
};
