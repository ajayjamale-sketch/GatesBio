import React from 'react';
import { Box, Typography, Button, Paper, Chip } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface FeatureSwitcherProps {
  onOpenDemo: () => void;
  onNavigate: (route: string) => void;
}

interface FeatureItem {
  id: string;
  category: string;
  categoryColor: string;
  icon: React.ReactNode;
  headline: string;
  summary: string;
  keyFeatures: string[];
  ctaLabel: string;
  ctaAction: (props: { onOpenDemo: () => void; onNavigate: (route: string) => void }) => void;
  imageUrl: string;
}

export const FeatureSwitcher: React.FC<FeatureSwitcherProps> = ({ onOpenDemo, onNavigate }) => {
  const features: FeatureItem[] = [
    {
      id: 'lims',
      category: 'LIMS & INVENTORY',
      categoryColor: '#1E40AF',
      icon: <QrCodeScannerIcon fontSize="small" />,
      headline: 'Zero-Error Specimen Tracking from Freezer to Assay',
      summary:
        'Manage biological samples, 2D DataMatrix barcodes, -80°C freezer hierarchies, and 96-well microplate coordinates with automated cold-chain audit logs.',
      keyFeatures: [
        'Automated 2D DataMatrix & Code 128 barcode accessioning',
        'Multi-facility freezer rack mapping with freeze-thaw alerts',
        'Direct export to Hamilton & Tecan liquid handling robots',
      ],
      ctaLabel: 'Explore LIMS Platform',
      ctaAction: ({ onOpenDemo }) => onOpenDemo(),
      imageUrl: '/images/lims-workstation.jpg',
    },
    {
      id: 'eln',
      category: 'ELECTRONIC NOTEBOOK',
      categoryColor: '#0F766E',
      icon: <MenuBookIcon fontSize="small" />,
      headline: 'Standardized SOPs with Dynamic Timers & Live Math',
      summary:
        'Digitize laboratory protocols into interactive checklists. Technicians track incubation timers, inline LaTeX reaction math, and deviations with zero lag.',
      keyFeatures: [
        'Step-by-step interactive SOP checklists with audio/visual timers',
        'Inline LaTeX chemical reaction equations and buffer calculators',
        'Immutable operator timestamps and SOP version control',
      ],
      ctaLabel: 'Tour ELN Notebook',
      ctaAction: ({ onOpenDemo }) => onOpenDemo(),
      imageUrl: '/images/eln-protocols.jpg',
    },
    {
      id: 'ai',
      category: 'AI RESEARCH INTELLIGENCE',
      categoryColor: '#7E22CE',
      icon: <AutoAwesomeIcon fontSize="small" />,
      headline: 'Literature Synthesis & Molecular Target Predictions',
      summary:
        'Empower research teams with retrieval-augmented intelligence connected to PubMed Central, bioRxiv, and internal historical experiment archives.',
      keyFeatures: [
        'Live PubMed Central & bioRxiv retrieval with verified DOI citations',
        'Target-to-pathway mapping and off-target toxicity risk flags',
        'Natural language protocol troubleshooting and optimization suggestions',
      ],
      ctaLabel: 'Try AI Scientific Engine',
      ctaAction: ({ onOpenDemo }) => onOpenDemo(),
      imageUrl: '/images/ai-molecular.jpg',
    },
    {
      id: 'compliance',
      category: 'REGULATORY COMPLIANCE',
      categoryColor: '#B45309',
      icon: <FactCheckIcon fontSize="small" />,
      headline: 'Audit-Ready Electronic Signatures & Cryptographic Chains',
      summary:
        'Maintain continuous inspection readiness with unalterable SHA-256 Merkle chain audit logs, dual-factor signature challenges, and validated export packages.',
      keyFeatures: [
        'Dual-credential electronic signature challenges (Password + 2FA)',
        'Cryptographic SHA-256 Merkle chain audit log immutability',
        'One-click validated audit dossier export for FDA & ISO inspections',
      ],
      ctaLabel: 'View Compliance Suite',
      ctaAction: ({ onNavigate }) => onNavigate('compliance'),
      imageUrl: '/images/compliance-audit.jpg',
    },
  ];

  return (
    <Box sx={{ my: { xs: 6, md: 10 } }}>
      {/* Section Header */}
      <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
        <Typography
          variant="caption"
          sx={{
            color: '#0F766E',
            fontWeight: 800,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontSize: '11px',
            display: 'block',
            mb: 1,
          }}
        >
          Core Laboratory Platform
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '22px', sm: '28px', md: '34px' },
            fontWeight: 800,
            color: '#0F172A',
            letterSpacing: '-0.02em',
            mb: 1.5,
          }}
        >
          Everything Your Lab Needs. In One Connected Platform.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#64748B',
            maxWidth: 620,
            mx: 'auto',
            fontSize: { xs: '13.5px', sm: '15px' },
            lineHeight: 1.55,
          }}
        >
          Explore how GatsBio unifies biological sample tracking, digital protocol execution, literature intelligence, and regulatory compliance into a seamless daily workflow.
        </Typography>
      </Box>

      {/* Sequential One-by-One Feature Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3.5, md: 5 } }}>
        {features.map((feature, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <Paper
              key={feature.id}
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3.5, md: 4.5 },
                borderRadius: 3.5,
                border: '1px solid #E2E8F0',
                bgcolor: '#FFFFFF',
                boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.04)',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1.05fr 1fr' },
                  gap: { xs: 3.5, md: 5 },
                  alignItems: 'center',
                }}
              >
                {/* Text Content Column */}
                <Box sx={{ order: { xs: 1, md: isEven ? 1 : 2 } }}>
                  <Chip
                    icon={<Box component="span" sx={{ display: 'flex', color: `${feature.categoryColor} !important` }}>{feature.icon}</Box>}
                    label={feature.category}
                    size="small"
                    sx={{
                      bgcolor: '#F8FAFC',
                      color: feature.categoryColor,
                      border: '1px solid #E2E8F0',
                      fontWeight: 800,
                      fontSize: '10.5px',
                      letterSpacing: '0.6px',
                      mb: 1.5,
                      height: 26,
                      px: 0.5,
                    }}
                  />

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: '#0F172A',
                      fontSize: { xs: '19px', sm: '23px', md: '26px' },
                      lineHeight: 1.25,
                      letterSpacing: '-0.02em',
                      mb: 1.5,
                    }}
                  >
                    {feature.headline}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: '#64748B',
                      lineHeight: 1.55,
                      fontSize: { xs: '13.5px', sm: '14.5px' },
                      mb: 3,
                    }}
                  >
                    {feature.summary}
                  </Typography>

                  {/* 3 Key Capability Highlights */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, mb: 3.5 }}>
                    {feature.keyFeatures.map((feat, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                        <CheckCircleIcon sx={{ color: '#10B981', fontSize: 18, flexShrink: 0 }} />
                        <Typography
                          variant="body2"
                          sx={{ color: '#334155', fontWeight: 600, fontSize: { xs: '12.5px', sm: '13.5px' } }}
                        >
                          {feat}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* Action CTA */}
                  <Button
                    variant="contained"
                    onClick={() => feature.ctaAction({ onOpenDemo, onNavigate })}
                    endIcon={<ArrowForwardIcon sx={{ fontSize: '15px !important' }} />}
                    sx={{
                      bgcolor: '#1E40AF',
                      '&:hover': { bgcolor: '#1D4ED8' },
                      px: 3,
                      py: 1,
                      fontWeight: 700,
                      fontSize: '13px',
                      borderRadius: 2,
                      boxShadow: '0 4px 12px rgba(30, 64, 175, 0.3)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {feature.ctaLabel}
                  </Button>
                </Box>

                {/* Visual Image Column */}
                <Box
                  sx={{
                    order: { xs: 2, md: isEven ? 2 : 1 },
                    position: 'relative',
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: '1px solid #E2E8F0',
                    bgcolor: '#0F172A',
                    boxShadow: '0 8px 24px -4px rgba(15, 23, 42, 0.08)',
                    height: { xs: 240, sm: 290, md: 340 },
                    width: '100%',
                    transform: 'translateZ(0)',
                    isolation: 'isolate',
                  }}
                >
                  <Box
                    component="img"
                    src={feature.imageUrl}
                    alt={feature.headline}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      borderRadius: 'inherit',
                      filter: 'brightness(1.02) contrast(1.02)',
                      transition: 'transform 0.4s ease',
                      '&:hover': {
                        transform: 'scale(1.03)',
                      },
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
};
