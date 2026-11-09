import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import BiotechIcon from '@mui/icons-material/Biotech';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import type { PublicRoute } from '../../types';

interface PublicFooterProps {
  onNavigate: (route: PublicRoute) => void;
  onOpenDemo: () => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ onNavigate, onOpenDemo }) => {
  return (
    <Box component="footer" sx={{ bgcolor: '#0F172A', color: '#CBD5E1', pt: 10, pb: 6 }}>
      <Box className="container-custom">
        {/* Top Newsletter / Consultation Banner */}
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            bgcolor: '#1E293B',
            borderRadius: 3,
            border: '1px solid #334155',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 3,
            mb: 8,
          }}
        >
          <div>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFFFFF', mb: 1 }}>
              Ready to modernize your laboratory operations?
            </Typography>
            <Typography variant="body2" sx={{ color: '#94A3B8', maxWidth: 560 }}>
              Join forward-thinking biopharmas and research institutes accelerating biological discovery with GatsBio.
            </Typography>
          </div>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              onClick={onOpenDemo}
              sx={{
                bgcolor: '#1E40AF',
                '&:hover': { bgcolor: '#1D4ED8' },
                fontWeight: 700,
                px: 3.5,
                py: 1.2,
                borderRadius: 2,
              }}
            >
              Request a Guided Demo
            </Button>
            <Button
              variant="outlined"
              onClick={() => onNavigate('pricing')}
              sx={{
                borderColor: '#475569',
                color: '#FFFFFF',
                '&:hover': { borderColor: '#94A3B8', bgcolor: '#334155' },
                fontWeight: 600,
                px: 3,
                py: 1.2,
                borderRadius: 2,
              }}
            >
              View Pricing Tiers
            </Button>
          </Box>
        </Box>

        {/* 5-Column Sitemap */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' },
            gap: 4,
            mb: 8,
          }}
        >
          {/* Brand Info */}
          <Box sx={{ gridColumn: { xs: '1 / -1', md: '1 / 2' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 2,
                  bgcolor: '#1E40AF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                <BiotechIcon sx={{ fontSize: 20 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 900, color: '#FFFFFF' }}>
                Gats<span style={{ color: '#14B8A6' }}>Bio</span>
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.6, mb: 3 }}>
              The unified life sciences operating system bridging LIMS, ELN, biological data, and 21 CFR Part 11 compliance.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip size="small" icon={<FactCheckIcon sx={{ fontSize: 14 }} />} label="FDA 21 CFR Part 11" sx={{ bgcolor: '#1E293B', color: '#94A3B8' }} />
              <Chip size="small" icon={<VerifiedUserIcon sx={{ fontSize: 14 }} />} label="ISO 17025" sx={{ bgcolor: '#1E293B', color: '#94A3B8' }} />
            </Box>
          </Box>

          {/* Column 2: Platform */}
          <div>
            <Typography variant="subtitle2" sx={{ color: '#FFFFFF', fontWeight: 700, mb: 2 }}>
              Platform
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              <Typography variant="body2" onClick={() => onNavigate('platform')} sx={{ color: '#94A3B8', cursor: 'pointer', '&:hover': { color: '#FFFFFF' } }}>
                Sample Accessioning & LIMS
              </Typography>
              <Typography variant="body2" onClick={() => onNavigate('platform')} sx={{ color: '#94A3B8', cursor: 'pointer', '&:hover': { color: '#FFFFFF' } }}>
                Electronic Lab Notebook (ELN)
              </Typography>
              <Typography variant="body2" onClick={() => onNavigate('platform')} sx={{ color: '#94A3B8', cursor: 'pointer', '&:hover': { color: '#FFFFFF' } }}>
                AI Research Engine
              </Typography>
              <Typography variant="body2" onClick={() => onNavigate('platform')} sx={{ color: '#94A3B8', cursor: 'pointer', '&:hover': { color: '#FFFFFF' } }}>
                Biological Big Data Lake
              </Typography>
              <Typography variant="body2" onClick={() => onNavigate('platform')} sx={{ color: '#94A3B8', cursor: 'pointer', '&:hover': { color: '#FFFFFF' } }}>
                Equipment & IoT Telemetry
              </Typography>
            </Box>
          </div>

          {/* Column 3: Solutions */}
          <div>
            <Typography variant="subtitle2" sx={{ color: '#FFFFFF', fontWeight: 700, mb: 2 }}>
              Solutions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              <Typography variant="body2" onClick={() => onNavigate('solutions')} sx={{ color: '#94A3B8', cursor: 'pointer', '&:hover': { color: '#FFFFFF' } }}>
                Biopharma Therapeutics
              </Typography>
              <Typography variant="body2" onClick={() => onNavigate('solutions')} sx={{ color: '#94A3B8', cursor: 'pointer', '&:hover': { color: '#FFFFFF' } }}>
                Academic Medical Labs
              </Typography>
              <Typography variant="body2" onClick={() => onNavigate('solutions')} sx={{ color: '#94A3B8', cursor: 'pointer', '&:hover': { color: '#FFFFFF' } }}>
                Contract Research (CROs)
              </Typography>
              <Typography variant="body2" onClick={() => onNavigate('solutions')} sx={{ color: '#94A3B8', cursor: 'pointer', '&:hover': { color: '#FFFFFF' } }}>
                Clinical Diagnostics
              </Typography>
            </Box>
          </div>

          {/* Column 4: Free Tools & Resources */}
          <div>
            <Typography variant="subtitle2" sx={{ color: '#FFFFFF', fontWeight: 700, mb: 2 }}>
              Free Lab Tools
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              <Typography variant="body2" onClick={() => onNavigate('tools')} sx={{ color: '#94A3B8', cursor: 'pointer', '&:hover': { color: '#FFFFFF' } }}>
                Serial Dilution Calculator
              </Typography>
              <Typography variant="body2" onClick={() => onNavigate('tools')} sx={{ color: '#94A3B8', cursor: 'pointer', '&:hover': { color: '#FFFFFF' } }}>
                DNA/RNA Tm Calculator
              </Typography>
              <Typography variant="body2" onClick={() => onNavigate('compliance')} sx={{ color: '#94A3B8', cursor: 'pointer', '&:hover': { color: '#FFFFFF' } }}>
                21 CFR Part 11 Whitepaper
              </Typography>
              <Typography variant="body2" onClick={() => onNavigate('pricing')} sx={{ color: '#94A3B8', cursor: 'pointer', '&:hover': { color: '#FFFFFF' } }}>
                Pricing Calculator
              </Typography>
            </Box>
          </div>

          {/* Column 5: Trust & Compliance */}
          <div>
            <Typography variant="subtitle2" sx={{ color: '#FFFFFF', fontWeight: 700, mb: 2 }}>
              Trust & Legal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              <Typography variant="body2" onClick={() => onNavigate('compliance')} sx={{ color: '#94A3B8', cursor: 'pointer', '&:hover': { color: '#FFFFFF' } }}>
                Trust & Security Center
              </Typography>
              <Typography variant="body2" onClick={() => onNavigate('compliance')} sx={{ color: '#94A3B8', cursor: 'pointer', '&:hover': { color: '#FFFFFF' } }}>
                FDA Compliance Statement
              </Typography>
              <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                HIPAA Business Associate (BAA)
              </Typography>
              <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                Privacy Policy & Terms
              </Typography>
            </Box>
          </div>
        </Box>

        {/* Bottom Bar */}
        <Box
          sx={{
            pt: 4,
            borderTop: '1px solid #1E293B',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="caption" sx={{ color: '#64748B' }}>
            © 2026 GatsBio Technologies Inc. All rights reserved. ISO 27001 & SOC 2 Type II Audited.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              Designed for Biotech Scientists & Regulatory Auditors Worldwide
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
