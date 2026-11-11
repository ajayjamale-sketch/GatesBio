import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import BiotechIcon from '@mui/icons-material/Biotech';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { PublicRoute } from '../../types';

interface PublicFooterProps {
  onNavigate: (route: PublicRoute) => void;
  onOpenDemo: () => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ onNavigate, onOpenDemo }) => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#0B1120',
        color: '#94A3B8',
        pt: { xs: 6, sm: 8, md: 9 },
        pb: { xs: 5, sm: 6 },
        borderTop: '1px solid #1E293B',
      }}
    >
      <Box className="container-custom">
        {/* Main Footer Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: '2fr 1fr 1fr 1fr',
            },
            gap: { xs: 4, sm: 5, md: 6 },
            mb: { xs: 5, md: 7 },
          }}
        >
          {/* Column 1: Brand & Enterprise Readiness */}
          <Box sx={{ pr: { md: 4 } }}>
            <Box
              onClick={() => onNavigate('home')}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.25,
                mb: 2,
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: 2,
                  bgcolor: '#1E40AF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 2px 8px rgba(30, 64, 175, 0.4)',
                }}
              >
                <BiotechIcon sx={{ fontSize: 21 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  fontSize: '19px',
                }}
              >
                Gats<span style={{ color: '#14B8A6' }}>Bio</span>
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: '#94A3B8',
                lineHeight: 1.65,
                fontSize: { xs: '13px', sm: '13.5px' },
                mb: 2.5,
                maxWidth: 360,
              }}
            >
              The unified life sciences operating system bridging sample logistics, electronic lab notebooks, bio-data lakes, and FDA 21 CFR Part 11 compliance.
            </Typography>

            {/* Live Infrastructure Status */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 1.5,
                py: 0.6,
                bgcolor: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: 2,
                mb: 2.5,
              }}
            >
              <CircleIcon
                sx={{
                  fontSize: 8,
                  color: '#10B981',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 0.6 },
                    '50%': { opacity: 1 },
                    '100%': { opacity: 0.6 },
                  },
                }}
              />
              <Typography
                sx={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#34D399',
                  letterSpacing: '0.02em',
                }}
              >
                All Systems Operational · 99.99% Uptime SLA
              </Typography>
            </Box>

            {/* Compliance Badges */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {['21 CFR Part 11', 'ISO 27001', 'SOC 2 Type II', 'GLP / GMP Ready'].map((badge) => (
                <Box
                  key={badge}
                  sx={{
                    px: 1.1,
                    py: 0.35,
                    bgcolor: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: 1.5,
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#CBD5E1',
                    letterSpacing: '0.01em',
                  }}
                >
                  {badge}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Column 2: Platform */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '12.5px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                mb: 2.2,
              }}
            >
              Platform
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.4 }}>
              {[
                { label: 'Platform Overview', route: 'platform' as PublicRoute },
                { label: 'Sample Registry & LIMS', route: 'platform' as PublicRoute },
                { label: 'Electronic Lab Notebook (ELN)', route: 'platform' as PublicRoute },
                { label: 'AI Literature Intelligence', route: 'platform' as PublicRoute },
                { label: 'Free Dilution & Tm Tools', route: 'tools' as PublicRoute },
              ].map((item) => (
                <Typography
                  key={item.label}
                  variant="body2"
                  onClick={() => onNavigate(item.route)}
                  sx={{
                    color: '#94A3B8',
                    cursor: 'pointer',
                    fontSize: '13.5px',
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      color: '#FFFFFF',
                      transform: 'translateX(3px)',
                    },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Column 3: Solutions */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '12.5px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                mb: 2.2,
              }}
            >
              Solutions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.4 }}>
              {[
                { label: 'Biopharma Therapeutics', route: 'tailored-solutions' as PublicRoute },
                { label: 'Academic & Institute Labs', route: 'tailored-solutions' as PublicRoute },
                { label: 'Contract Research (CROs)', route: 'tailored-solutions' as PublicRoute },
                { label: 'Clinical Diagnostics', route: 'tailored-solutions' as PublicRoute },
              ].map((item) => (
                <Typography
                  key={item.label}
                  variant="body2"
                  onClick={() => onNavigate(item.route)}
                  sx={{
                    color: '#94A3B8',
                    cursor: 'pointer',
                    fontSize: '13.5px',
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      color: '#FFFFFF',
                      transform: 'translateX(3px)',
                    },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Column 4: Enterprise & Compliance */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '12.5px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                mb: 2.2,
              }}
            >
              Enterprise
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.4 }}>
              <Typography
                variant="body2"
                onClick={() => onNavigate('compliance')}
                sx={{
                  color: '#94A3B8',
                  cursor: 'pointer',
                  fontSize: '13.5px',
                  transition: 'all 0.15s ease',
                  '&:hover': { color: '#FFFFFF', transform: 'translateX(3px)' },
                }}
              >
                Trust & Security Center
              </Typography>
              <Typography
                variant="body2"
                onClick={() => onNavigate('resources')}
                sx={{
                  color: '#94A3B8',
                  cursor: 'pointer',
                  fontSize: '13.5px',
                  transition: 'all 0.15s ease',
                  '&:hover': { color: '#FFFFFF', transform: 'translateX(3px)' },
                }}
              >
                Resources & Whitepapers
              </Typography>
              <Typography
                variant="body2"
                onClick={() => onNavigate('compliance')}
                sx={{
                  color: '#94A3B8',
                  cursor: 'pointer',
                  fontSize: '13.5px',
                  transition: 'all 0.15s ease',
                  '&:hover': { color: '#FFFFFF', transform: 'translateX(3px)' },
                }}
              >
                21 CFR Part 11 Whitepaper
              </Typography>
              <Typography
                variant="body2"
                onClick={() => onNavigate('pricing')}
                sx={{
                  color: '#94A3B8',
                  cursor: 'pointer',
                  fontSize: '13.5px',
                  transition: 'all 0.15s ease',
                  '&:hover': { color: '#FFFFFF', transform: 'translateX(3px)' },
                }}
              >
                Pricing & Edition Comparison
              </Typography>

              <Box sx={{ pt: 1.5 }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={onOpenDemo}
                  endIcon={<ArrowForwardIcon sx={{ fontSize: '13px !important' }} />}
                  sx={{
                    borderColor: '#334155',
                    color: '#F8FAFC',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'none',
                    py: 0.6,
                    px: 1.5,
                    borderRadius: 1.5,
                    '&:hover': {
                      borderColor: '#1E40AF',
                      bgcolor: 'rgba(30, 64, 175, 0.12)',
                      color: '#60A5FA',
                    },
                  }}
                >
                  Book Private Demo
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Bottom Bar: Copyright & Regulatory Notice */}
        <Box
          sx={{
            pt: 3.5,
            borderTop: '1px solid #1E293B',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <Typography variant="caption" sx={{ color: '#64748B', fontSize: '12px' }}>
            © 2026 GatsBio Technologies Inc. All rights reserved.
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap' }}>
            <Typography
              variant="caption"
              onClick={() => onNavigate('compliance')}
              sx={{
                color: '#64748B',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'color 0.15s ease',
                '&:hover': { color: '#94A3B8' },
              }}
            >
              FDA 21 CFR Part 11 Validated Architecture
            </Typography>
            <Typography
              variant="caption"
              onClick={() => onNavigate('compliance')}
              sx={{
                color: '#64748B',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'color 0.15s ease',
                '&:hover': { color: '#94A3B8' },
              }}
            >
              Trust & Security Center
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
