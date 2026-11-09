import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Chip } from '@mui/material';
import BiotechIcon from '@mui/icons-material/Biotech';
import SchoolIcon from '@mui/icons-material/School';
import HubIcon from '@mui/icons-material/Hub';
import ScienceIcon from '@mui/icons-material/Science';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface HomeSolutionsTabsProps {
  onOpenDemo: () => void;
  onNavigateSolutions: () => void;
}

export const HomeSolutionsTabs: React.FC<HomeSolutionsTabsProps> = ({
  onOpenDemo,
  onNavigateSolutions,
}) => {
  const [activeTab, setActiveTab] = useState<'biopharma' | 'academia' | 'cro' | 'diagnostics'>('biopharma');

  const tabs = [
    {
      id: 'biopharma',
      label: 'Biopharma Therapeutics',
      icon: <BiotechIcon fontSize="small" />,
      tag: 'Preclinical Lead Discovery to IND Filing',
      title: 'Accelerate Screening Assays While Protecting Proprietary IP',
      desc: 'Link molecular target validation directly to 21 CFR Part 11 compliant batch records. Automate sgRNA selection and CRISPR off-target analysis with our embedded AI intelligence engine.',
      metrics: [
        '60% reduction in assay turnaround times',
        'Cryptographic audit trails ready for FDA IND submissions',
        'Direct multi-omics linkage (FASTQ, BAM, Proteomics)',
      ],
      impactNumber: '8.4 hrs',
      impactLabel: 'saved per researcher / week',
    },
    {
      id: 'academia',
      label: 'Academic Research Labs',
      icon: <SchoolIcon fontSize="small" />,
      tag: 'Multi-Lab Consortia & Grant Governance',
      title: 'Institutional Memory That Never Leaves When Postdocs Graduate',
      desc: 'Standardize protocol libraries and preserve experimental procedures across rotating students and postdocs. Link grant codes directly to reagent consumption and core instrument billing.',
      metrics: [
        '100% preservation of lab protocols and SOP versions',
        'Real-time grant funding burndown and reagent burn rates',
        'Integrated DOI citation generation for paper submissions',
      ],
      impactNumber: '0%',
      impactLabel: 'institutional protocol loss',
    },
    {
      id: 'cro',
      label: 'Contract Research (CROs)',
      icon: <HubIcon fontSize="small" />,
      tag: 'Multi-Sponsor Isolation & Batch Testing',
      title: 'Strict Sponsor Sandboxing with Automated Certificate of Analysis',
      desc: 'Deliver client study data 4x faster. Enforce airtight cryptographic data isolation between competitive pharmaceutical sponsors while running high-throughput 384-well batches.',
      metrics: [
        'Zero cross-sponsor data contamination via tenant boundaries',
        'Automated one-click Certificate of Analysis (CoA) PDF exports',
        'Direct read-only client audit portal for sponsor QA audits',
      ],
      impactNumber: '4x',
      impactLabel: 'faster client report turnaround',
    },
    {
      id: 'diagnostics',
      label: 'Clinical Diagnostics',
      icon: <ScienceIcon fontSize="small" />,
      tag: 'CLIA / CAP High-Volume Accessioning',
      title: 'Zero-Error Specimen Accessioning at Massive Diagnostic Scale',
      desc: 'Process thousands of patient bio-specimens with automated barcode validation. Enforce HIPAA security rules with AES-256 cloud encryption and direct laboratory instrument interfaces.',
      metrics: [
        'Sub-second handheld barcode scan accessioning',
        'Automated aliquot tube label printing with 2D DataMatrix verification',
        'HIPAA Business Associate Agreement (BAA) with audit logs',
      ],
      impactNumber: '0',
      impactLabel: 'lost specimens across 1.4M+ logged vials',
    },
  ] as const;

  const current = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <Box sx={{ my: 10 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Chip
          label="Purpose-Built Across Life Sciences"
          sx={{ bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 700, mb: 2 }}
        />
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mt: 1 }}>
          Tailored for Every Stage of the Scientific Journey
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 640, mx: 'auto', mt: 1.5 }}>
          Whether you are a venture-backed biopharma spinout, an academic medical center, or a high-throughput CRO,
          GatsBio adapts to your specific operational workflows.
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5, flexWrap: 'wrap', gap: 1.5 }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              startIcon={tab.icon}
              sx={{
                px: 2.5,
                py: 1.2,
                borderRadius: 2.5,
                fontWeight: 700,
                fontSize: '14px',
                bgcolor: isActive ? '#1E40AF' : '#F1F5F9',
                color: isActive ? '#FFFFFF' : '#475569',
                boxShadow: isActive ? '0 4px 6px -1px rgba(30, 64, 175, 0.25)' : 'none',
                '&:hover': {
                  bgcolor: isActive ? '#1E3A8A' : '#E2E8F0',
                },
              }}
            >
              {tab.label}
            </Button>
          );
        })}
      </Box>

      {/* Active Tab Showcase Card */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3.5, md: 6 },
          borderRadius: 4,
          border: '1px solid #E2E8F0',
          bgcolor: '#FFFFFF',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1.4fr 1fr' },
          gap: 5,
          alignItems: 'center',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div>
          <Chip label={current.tag} sx={{ bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 700, mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 2, fontSize: { xs: '20px', md: '26px' } }}>
            {current.title}
          </Typography>
          <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.6, mb: 4 }}>
            {current.desc}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8, mb: 4 }}>
            {current.metrics.map((m, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <CheckCircleIcon sx={{ color: '#10B981', fontSize: 20, mt: '2px' }} />
                <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600 }}>
                  {m}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              onClick={onOpenDemo}
              endIcon={<ArrowForwardIcon />}
              sx={{ bgcolor: '#1E40AF', '&:hover': { bgcolor: '#1E3A8A' }, px: 3, py: 1.2, fontWeight: 700 }}
            >
              Request {current.label} Demo
            </Button>
            <Button
              variant="outlined"
              onClick={onNavigateSolutions}
              sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 700 }}
            >
              Read Full Solution Brief
            </Button>
          </Box>
        </div>

        {/* Quantified Impact Badge Box */}
        <Box
          sx={{
            p: 5,
            bgcolor: '#F8FAFC',
            borderRadius: 3.5,
            border: '1px solid #E2E8F0',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="overline" sx={{ color: '#0F766E', fontWeight: 800, letterSpacing: '1px' }}>
            Documented ROI Benchmark
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, color: '#1E40AF', my: 1.5 }}>
            {current.impactNumber}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
            {current.impactLabel}
          </Typography>
          <Typography variant="caption" sx={{ color: '#64748B', maxWidth: 280, mx: 'auto' }}>
            Validated across active biotech laboratory deployments and time-motion study audits.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
