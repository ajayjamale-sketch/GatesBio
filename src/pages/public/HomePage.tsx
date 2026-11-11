import React from 'react';
import { Box } from '@mui/material';
import { HeroSection } from '../../components/public/HeroSection';
import { FeatureSwitcher } from '../../components/public/FeatureSwitcher';
import { InteractivePlateTeaser } from '../../components/public/InteractivePlateTeaser';
import { ProblemSolutionMatrix } from '../../components/public/ProblemSolutionMatrix';
import { HomeSolutionsTabs } from '../../components/public/HomeSolutionsTabs';
import { TrustCertifications } from '../../components/public/TrustCertifications';
import { HomeRoiSection } from '../../components/public/HomeRoiSection';

interface HomePageProps {
  onOpenDemo: () => void;
  onNavigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenDemo, onNavigate }) => {
  return (
    <Box sx={{ width: '100%', p: 0, m: 0 }}>
      {/* =========================================================================
          SECTION 1: HERO & REAL-TIME BIO-METRIC TICKER
          (Full-width rectangular hero, sticks flush to navbar with 0 top/left/right padding)
          ========================================================================= */}
      <Box component="section" id="hero-section" sx={{ width: '100%', p: 0, m: 0 }}>
        <HeroSection onOpenDemo={onOpenDemo} onExploreTools={() => onNavigate('tools')} />
      </Box>

      {/* =========================================================================
          SECTIONS 2 THROUGH 8: CENTERED WORKSTATION CONTAINER
          ========================================================================= */}
      <Box className="container-custom">
        {/* SECTION 2: THE CORE LABORATORY PLATFORM (INTERACTIVE 4-PILLAR FEATURE SWITCHER) */}
        <Box component="section" id="platform-pillars-section">
          <FeatureSwitcher onOpenDemo={onOpenDemo} onNavigate={onNavigate} />
        </Box>

        {/* SECTION 3: HANDS-ON 96-WELL MICROPLATE WORKSTATION (LIVE INTERACTIVE PREVIEW) */}
        <Box component="section" id="microplate-workstation-section" sx={{ my: { xs: 6, md: 10 } }}>
          <InteractivePlateTeaser />
        </Box>

        {/* SECTION 4: PROBLEM VS. SOLUTION COMPARISON MATRIX (LEGACY VS. GATSBIO) */}
        <Box component="section" id="problem-solution-section">
          <ProblemSolutionMatrix />
        </Box>

        {/* SECTION 5: TAILORED SOLUTIONS BY INDUSTRY & RESEARCH ROLE */}
        <Box component="section" id="solutions-by-industry-section">
          <HomeSolutionsTabs
            onOpenDemo={onOpenDemo}
            onNavigateSolutions={() => onNavigate('tailored-solutions')}
          />
        </Box>

        {/* SECTION 6: REGULATORY RIGOR & COMPLIANCE STANDARDS (TRUST CENTER PREVIEW) */}
        <Box component="section" id="compliance-trust-section">
          <TrustCertifications />
        </Box>


        {/* SECTION 8: INTERACTIVE LAB ROI CALCULATOR & FINAL CONVERSION CTA */}
        <Box component="section" id="roi-conversion-section">
          <HomeRoiSection
            onOpenDemo={onOpenDemo}
            onNavigatePricing={() => onNavigate('pricing')}
          />
        </Box>
      </Box>
    </Box>
  );
};
