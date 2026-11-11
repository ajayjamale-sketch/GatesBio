import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArticleIcon from '@mui/icons-material/Article';
import { ComplianceHero } from '../../components/public/compliance/ComplianceHero';
import { ComplianceAuditWorkflow } from '../../components/public/compliance/ComplianceAuditWorkflow';
import { ComplianceFrameworksGrid } from '../../components/public/compliance/ComplianceFrameworksGrid';
import { ComplianceSecurityArchitecture } from '../../components/public/compliance/ComplianceSecurityArchitecture';

interface CompliancePageProps {
  onOpenDemo: () => void;
  onExploreResources?: () => void;
}

export const CompliancePage: React.FC<CompliancePageProps> = ({
  onOpenDemo,
  onExploreResources,
}) => {
  return (
    <Box sx={{ width: '100%', bgcolor: '#FFFFFF' }}>
      {/* 1. Hero & Compliance Pillars Quick-Jump Bar */}
      <ComplianceHero onOpenDemo={onOpenDemo} />

      {/* 2. 21 CFR Part 11 Audit Trail & Electronic Signature Architecture */}
      <ComplianceAuditWorkflow onOpenDemo={onOpenDemo} />

      {/* 3. Global Regulatory Frameworks & QA Inspection Readiness */}
      <ComplianceFrameworksGrid onOpenDemo={onOpenDemo} />

      {/* 4. Zero-Trust Encryption, RBAC & VPC Architecture */}
      <ComplianceSecurityArchitecture />

      {/* 5. Bottom Enterprise Conversion Banner */}
      <Box
        id="compliance-cta"
        sx={{
          py: { xs: 7, md: 9 },
          bgcolor: '#F8FAFC',
          borderTop: '1px solid #E2E8F0',
        }}
      >
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
                url('/images/compliance-cta-banner.jpg')
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
              Accelerate Your Next FDA, ISO, or Sponsor Audit
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
              Schedule a 21 CFR Part 11 audit package walkthrough with our QA engineering team and review our IQ/OQ validation templates, SOC 2 report, and HIPAA BAA.
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
                Request 21 CFR Part 11 Walkthrough
              </Button>
              {onExploreResources && (
                <Button
                  variant="outlined"
                  size="large"
                  onClick={onExploreResources}
                  startIcon={<ArticleIcon />}
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
                  Browse Validation Guides
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
