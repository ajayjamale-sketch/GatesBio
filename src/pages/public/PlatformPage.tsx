import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalculateIcon from '@mui/icons-material/Calculate';
import { PlatformHero } from '../../components/public/platform/PlatformHero';
import { PlatformModulesExplorer } from '../../components/public/platform/PlatformModulesExplorer';
import { PlatformPersonaFlows } from '../../components/public/platform/PlatformPersonaFlows';
import { PlatformArchitecture } from '../../components/public/platform/PlatformArchitecture';

interface PlatformPageProps {
  onOpenDemo: () => void;
  onExploreTools?: () => void;
}

export const PlatformPage: React.FC<PlatformPageProps> = ({
  onOpenDemo,
  onExploreTools,
}) => {
  return (
    <Box sx={{ width: '100%', bgcolor: '#FFFFFF' }}>
      {/* 1. Hero & Ecosystem Overview */}
      <PlatformHero onOpenDemo={onOpenDemo} />

      {/* 2. Sticky Filter & All 12 PRD Modules Grouped by 4 Pillars */}
      <PlatformModulesExplorer onOpenDemo={onOpenDemo} />

      {/* 3. Interactive End-to-End Persona Workflow Explorer */}
      <PlatformPersonaFlows onOpenDemo={onOpenDemo} />

      {/* 4. Unified Data Architecture & Instrument Connectivity */}
      <PlatformArchitecture />

      {/* 5. Bottom Enterprise Conversion Banner */}
      <Box id="platform-cta" sx={{ py: { xs: 7, md: 9 }, bgcolor: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <Box className="container-custom">
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              p: { xs: 4, md: 7 },
              bgcolor: '#0F172A',
              borderRadius: 4,
              color: '#FFFFFF',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backgroundImage: `
                linear-gradient(135deg, rgba(15, 23, 42, 0.78) 0%, rgba(30, 64, 175, 0.52) 50%, rgba(15, 118, 110, 0.58) 100%),
                radial-gradient(ellipse at 50% 35%, rgba(15, 23, 42, 0.55) 0%, rgba(15, 23, 42, 0.25) 75%),
                url('/images/platform-cta-banner.jpg')
              `,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              boxShadow: '0 20px 45px -12px rgba(15, 23, 42, 0.4)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, #1E40AF 0%, #10B981 50%, #1E40AF 100%)',
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '24px', md: '36px' },
                mb: 2,
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.75)',
              }}
            >
              Experience the Unified GatsBio Platform in Your Lab
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 660,
                mx: 'auto',
                mb: 4,
                color: '#F1F5F9',
                fontSize: { xs: '15px', md: '17px' },
                lineHeight: 1.6,
                textShadow: '0 1px 8px rgba(0, 0, 0, 0.75)',
              }}
            >
              Schedule a tailored technical walkthrough covering your sample accessioning throughput, omics pipelines, and FDA 21 CFR Part 11 validation requirements.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={onOpenDemo}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: '#FFFFFF',
                  color: '#1E40AF',
                  fontWeight: 800,
                  px: 4,
                  py: 1.5,
                  '&:hover': { bgcolor: '#F1F5F9' },
                }}
              >
                Book Your Scientific Consultation
              </Button>
              {onExploreTools && (
                <Button
                  variant="outlined"
                  size="large"
                  onClick={onExploreTools}
                  startIcon={<CalculateIcon />}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.45)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    px: 3.5,
                    py: 1.5,
                    '&:hover': {
                      borderColor: '#FFFFFF',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Open Lab Calculators
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
