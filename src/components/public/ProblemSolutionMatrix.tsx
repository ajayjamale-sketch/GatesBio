import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import StorageIcon from '@mui/icons-material/Storage';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';

interface ComparisonRow {
  category: string;
  icon: React.ReactNode;
  iconColor: string;
  problemTitle: string;
  problemDesc: string;
  solutionTitle: string;
  solutionDesc: string;
  metric: string;
}

export const ProblemSolutionMatrix: React.FC = () => {
  const comparisons: ComparisonRow[] = [
    {
      category: 'PROTOCOL EXECUTION',
      icon: <MenuBookIcon fontSize="small" />,
      iconColor: '#0F766E',
      problemTitle: 'Paper Notebooks & Excel Silos',
      problemDesc:
        'Handwritten protocols get lost, Excel formulas corrupt, and experimental IP remains trapped on personal hard drives.',
      solutionTitle: 'Cloud Electronic Lab Notebook (ELN)',
      solutionDesc:
        'Standardized digital SOPs, inline LaTeX reaction math, and real-time team co-authoring with zero protocol drift.',
      metric: 'Zero Protocol Drift',
    },
    {
      category: 'SAMPLE INVENTORY',
      icon: <StorageIcon fontSize="small" />,
      iconColor: '#1E40AF',
      problemTitle: 'Lost Cryovials & Degraded Aliquots',
      problemDesc:
        'Unlabeled cryovials in -80°C freezers cause repeated assays, wasted reagents, and degraded cell lines.',
      solutionTitle: 'Barcode-Driven Multi-Tier LIMS',
      solutionDesc:
        'Automated 2D DataMatrix scanning, freeze-thaw alerts, and coordinate mapping down to specific freezer rack slots.',
      metric: '0% Lost Specimen Rate',
    },
    {
      category: 'REGULATORY COMPLIANCE',
      icon: <VerifiedUserIcon fontSize="small" />,
      iconColor: '#B45309',
      problemTitle: 'Audit Panic Ahead of FDA / ISO Reviews',
      problemDesc:
        'Scrambling for weeks to reconstruct paper batch records, signatures, and calibration histories during inspections.',
      solutionTitle: 'Continuous 21 CFR Part 11 Integrity',
      solutionDesc:
        'Automated, immutable SHA-256 Merkle audit trails capturing every record modification with dual-factor electronic signatures.',
      metric: 'Audit-Ready 24/7/365',
    },
    {
      category: 'INSTRUMENT AUTOMATION',
      icon: <DeviceHubIcon fontSize="small" />,
      iconColor: '#7E22CE',
      problemTitle: 'Isolated Instruments & USB Transfers',
      problemDesc:
        'Exporting raw plate reader CSVs onto flash drives, risking data loss, formatting corruption, and manual entry errors.',
      solutionTitle: 'Bio Data Lake & Robotics API',
      solutionDesc:
        'Native streaming ingestion for plate readers and sequencers, with automated export to Hamilton and Tecan liquid handlers.',
      metric: '60% Faster Turnaround',
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
          The Paradigm Shift
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
          From Fragmented Tools to a Unified Scientific OS
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#64748B',
            maxWidth: 640,
            mx: 'auto',
            fontSize: { xs: '13.5px', sm: '15px' },
            lineHeight: 1.55,
          }}
        >
          Traditional life sciences workflows lose thousands of hours to manual transcription, lost freezer samples, and regulatory vulnerabilities. See how GatsBio transforms operations.
        </Typography>
      </Box>

      {/* Comparison Rows */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, md: 3 } }}>
        {comparisons.map((item, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              borderRadius: 3.5,
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              bgcolor: '#FFFFFF',
              boxShadow: '0 2px 8px -2px rgba(15, 23, 42, 0.04)',
              transition: 'all 0.25s ease',
              '&:hover': {
                borderColor: '#CBD5E1',
                boxShadow: '0 8px 24px -4px rgba(15, 23, 42, 0.08)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            {/* Top Domain Category Header */}
            <Box
              sx={{
                px: { xs: 2.5, sm: 3.5 },
                py: 1,
                bgcolor: '#F8FAFC',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ display: 'flex', color: item.iconColor }}>{item.icon}</Box>
                <Typography sx={{ fontWeight: 800, fontSize: '11px', color: '#64748B', letterSpacing: '0.6px' }}>
                  {item.category}
                </Typography>
              </Box>

              <Chip
                label={item.metric}
                size="small"
                sx={{
                  bgcolor: '#ECFDF5',
                  color: '#065F46',
                  fontWeight: 700,
                  fontSize: '11px',
                  height: 22,
                  border: '1px solid #A7F3D0',
                }}
              />
            </Box>

            {/* Split Comparison Columns */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1.15fr' },
              }}
            >
              {/* Left Column: The Legacy Friction */}
              <Box
                sx={{
                  p: { xs: 2.5, sm: 3.5 },
                  bgcolor: '#FAFAFA',
                  borderRight: { md: '1px solid #E2E8F0' },
                  borderBottom: { xs: '1px solid #E2E8F0', md: 'none' },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Box
                    sx={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      bgcolor: '#FEE2E2',
                      color: '#DC2626',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    ✕
                  </Box>
                  <Typography variant="caption" sx={{ color: '#DC2626', fontWeight: 800, letterSpacing: '0.5px' }}>
                    THE OLD WAY
                  </Typography>
                </Box>

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 800,
                    color: '#1E293B',
                    fontSize: { xs: '14.5px', sm: '15.5px' },
                    mb: 0.8,
                  }}
                >
                  {item.problemTitle}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: '#64748B',
                    lineHeight: 1.55,
                    fontSize: { xs: '12.5px', sm: '13.5px' },
                  }}
                >
                  {item.problemDesc}
                </Typography>
              </Box>

              {/* Right Column: The GatsBio Solution */}
              <Box
                sx={{
                  p: { xs: 2.5, sm: 3.5 },
                  bgcolor: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Box
                    sx={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      bgcolor: '#ECFDF5',
                      color: '#10B981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </Box>
                  <Typography variant="caption" sx={{ color: '#0F766E', fontWeight: 800, letterSpacing: '0.5px' }}>
                    WITH GATSBIO
                  </Typography>
                </Box>

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 800,
                    color: '#0F172A',
                    fontSize: { xs: '14.5px', sm: '15.5px' },
                    mb: 0.8,
                  }}
                >
                  {item.solutionTitle}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: '#334155',
                    lineHeight: 1.55,
                    fontSize: { xs: '12.5px', sm: '13.5px' },
                  }}
                >
                  {item.solutionDesc}
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};
