import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

export const ProblemSolutionMatrix: React.FC = () => {
  const comparisons = [
    {
      problem: 'Paper Notebooks & Excel Silos',
      problemDesc: 'Handwritten protocols get lost, Excel formulas corrupt easily, and data remains trapped in personal drives.',
      solution: 'Cloud Electronic Lab Notebook (ELN)',
      solutionDesc: 'Version-controlled standardized SOPs, inline LaTeX chemical math, and real-time multi-scientist co-authoring.',
      badge: 'Zero Protocol Drift',
    },
    {
      problem: 'Lost Freezer Tubes & Expired Aliquots',
      problemDesc: 'Unlabeled cryovials in -80°C freezers lead to repeated assays, wasted reagents, and degraded cell lines.',
      solution: 'Barcode-Driven Multi-Tier LIMS',
      solutionDesc: '1D/2D DataMatrix scanning, automated freeze-thaw count warnings, and coordinate mapping down to individual box slots.',
      badge: '0% Lost Specimen Rate',
    },
    {
      problem: 'Audit Panic Ahead of FDA / ISO Reviews',
      problemDesc: 'Scrambling for weeks to reconstruct paper batch records, signatures, and calibration histories during inspections.',
      solution: 'Continuous 21 CFR Part 11 Integrity',
      solutionDesc: 'Automatic, immutable SHA-256 Merkle audit trails capturing every record modification with dual-factor digital signatures.',
      badge: 'Audit-Ready 24/7/365',
    },
    {
      problem: 'Isolated Instruments & Manual Transcription',
      problemDesc: 'Exporting raw spectrophotometer or sequencer CSVs onto USB sticks, risking data loss and human transcription errors.',
      solution: 'Automated Bio Data Lake & Robotics API',
      solutionDesc: 'Native streaming ingestion for FASTQ, BAM, and plate readers, with direct export to Tecan and Hamilton liquid handlers.',
      badge: '60% Faster Turnaround',
    },
  ];

  return (
    <Box sx={{ my: 10 }}>
      {/* Section Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Chip
          icon={<CompareArrowsIcon sx={{ color: '#0F766E !important' }} />}
          label="Why Modern Biotechs Switch to GatsBio"
          sx={{ bgcolor: '#F0FDF4', color: '#0F766E', fontWeight: 700, mb: 2 }}
        />
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mt: 1 }}>
          The Shift from Fragmented Tools to an Integrated Scientific OS
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 680, mx: 'auto', mt: 1.5 }}>
          Traditional life sciences workflows are hindered by manual transcription, lost freezer samples, and regulatory vulnerabilities.
          Here is how GatsBio transforms daily research operations.
        </Typography>
      </Box>

      {/* Comparison Grid */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {comparisons.map((item, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              borderRadius: 3.5,
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1.2fr' },
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: '#CBD5E1',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
              },
            }}
          >
            {/* The Old Way (Problem) */}
            <Box
              sx={{
                p: { xs: 3, md: 4 },
                bgcolor: '#FFF5F5',
                borderRight: { md: '1px solid #FEE2E2' },
                borderBottom: { xs: '1px solid #FEE2E2', md: 'none' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <CancelOutlinedIcon sx={{ color: '#DC2626', fontSize: 24 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#991B1B' }}>
                  {item.problem}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#7F1D1D', lineHeight: 1.6 }}>
                {item.problemDesc}
              </Typography>
            </Box>

            {/* The GatsBio Way (Solution) */}
            <Box
              sx={{
                p: { xs: 3, md: 4 },
                bgcolor: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckCircleIcon sx={{ color: '#10B981', fontSize: 24 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A' }}>
                    {item.solution}
                  </Typography>
                </Box>
                <Chip
                  size="small"
                  label={item.badge}
                  sx={{ bgcolor: '#ECFDF5', color: '#065F46', fontWeight: 700, fontSize: '11px' }}
                />
              </Box>
              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6 }}>
                {item.solutionDesc}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};
