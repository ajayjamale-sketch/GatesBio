import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Chip } from '@mui/material';
import BiotechIcon from '@mui/icons-material/Biotech';
import SchoolIcon from '@mui/icons-material/School';
import HubIcon from '@mui/icons-material/Hub';
import ScienceIcon from '@mui/icons-material/Science';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface SolutionsPageProps {
  onOpenDemo: () => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({ onOpenDemo }) => {
  const [activeTab, setActiveTab] = useState<'biopharma' | 'academia' | 'cro' | 'diagnostics'>('biopharma');

  const industries = [
    {
      id: 'biopharma',
      name: 'Biopharma & Therapeutics',
      icon: <BiotechIcon />,
      headline: 'Accelerate Preclinical Lead Optimization to IND Filing',
      desc: 'Therapeutics startups and biotech spinouts require rapid iteration without compromising intellectual property or regulatory integrity. GatsBio accelerates drug discovery by linking assay plates to bioinformatics pipelines and 21 CFR Part 11 batch records.',
      benefits: [
        'Shorten target validation and screening turnaround by up to 60%',
        'Protect IP with immutable digital timestamps and inventor contribution logs',
        'Streamline IND filing packages with audit-ready electronic signatures',
        'Centralize multi-omics data across discovery, in vitro, and in vivo phases',
      ],
      roi: '8.4 hrs saved / researcher / week',
    },
    {
      id: 'academia',
      name: 'Academic Research Institutes',
      icon: <SchoolIcon />,
      headline: 'Multi-Lab Collaboration & Grant Budget Management',
      desc: 'University labs and medical centers balance multiple grant budgets, rotating graduate researchers, and shared core facilities. GatsBio provides unified protocol libraries, reagent inventory tracking, and publication DOI citation management.',
      benefits: [
        'Prevent loss of protocols and institutional knowledge when postdocs graduate',
        'Track grant funding burn rates linked directly to reagent purchases and instrument hours',
        'Facilitate inter-departmental and multi-institution consortium collaborations',
        'Special academic pricing with zero setup costs for NSF/NIH grant holders',
      ],
      roi: '0% institutional protocol loss',
    },
    {
      id: 'cro',
      name: 'Contract Research (CROs)',
      icon: <HubIcon />,
      headline: 'Multi-Sponsor Data Isolation & High-Throughput Turnaround',
      desc: 'CROs handle testing services for dozens of pharmaceutical sponsors simultaneously. GatsBio enforces strict multi-tenant boundary isolation, automated Certificate of Analysis (CoA) generation, and fast client report delivery.',
      benefits: [
        'Strict role-based sponsor sandboxes ensuring zero cross-client data contamination',
        'Automated batch report and Certificate of Analysis (CoA) PDF generation',
        'High-density 384-well plate visualizer for rapid assay batch processing',
        'Client portal with read-only audit-trail review rights for sponsor QA teams',
      ],
      roi: '4x faster client report generation',
    },
    {
      id: 'diagnostics',
      name: 'Clinical Diagnostics',
      icon: <ScienceIcon />,
      headline: 'High-Volume Specimen Accessioning & CLIA/CAP Compliance',
      desc: 'Clinical laboratories processing thousands of patient blood, biopsy, and molecular specimens daily need zero error rates. GatsBio provides rapid barcode accessioning, automated liquid handler exports, and HIPAA-compliant audit trails.',
      benefits: [
        'Sub-second barcode scan response for handheld laboratory scanners',
        'Automated aliquot tube label printing with 2D DataMatrix verification',
        'HIPAA Business Associate Agreement (BAA) with AES-256 cloud encryption',
        'Direct interface with hospital LIS and diagnostic instrument feeds',
      ],
      roi: '0 lost specimens across 1.4M+ logged vials',
    },
  ] as const;

  const current = industries.find((i) => i.id === activeTab) || industries[0];

  return (
    <Box className="container-custom" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Chip label="Tailored Solutions" sx={{ bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 700, mb: 2 }} />
        <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
          Engineered for Your Scientific Mission
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 640, mx: 'auto' }}>
          Explore how GatsBio aligns with the specific operational demands of your organization.
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6, flexWrap: 'wrap', gap: 1 }}>
        {industries.map((ind) => (
          <Button
            key={ind.id}
            onClick={() => setActiveTab(ind.id)}
            startIcon={ind.icon}
            sx={{
              px: 3,
              py: 1.2,
              borderRadius: 3,
              fontWeight: 700,
              bgcolor: activeTab === ind.id ? '#1E40AF' : '#F1F5F9',
              color: activeTab === ind.id ? '#FFFFFF' : '#475569',
              '&:hover': {
                bgcolor: activeTab === ind.id ? '#1E3A8A' : '#E2E8F0',
              },
            }}
          >
            {ind.name}
          </Button>
        ))}
      </Box>

      {/* Content Card */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 6 },
          borderRadius: 4,
          border: '1px solid #E2E8F0',
          bgcolor: '#FFFFFF',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1.4fr 1fr' },
          gap: 5,
          alignItems: 'center',
          mb: 8,
        }}
      >
        <div>
          <Chip label={current.name} sx={{ bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 700, mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
            {current.headline}
          </Typography>
          <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.6, mb: 4 }}>
            {current.desc}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
            {current.benefits.map((b, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <CheckCircleIcon sx={{ color: '#10B981', fontSize: 22, mt: '2px' }} />
                <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600, lineHeight: 1.5 }}>
                  {b}
                </Typography>
              </Box>
            ))}
          </Box>

          <Button
            variant="contained"
            onClick={onOpenDemo}
            endIcon={<ArrowForwardIcon />}
            sx={{ bgcolor: '#1E40AF', '&:hover': { bgcolor: '#1E3A8A' }, px: 3.5, py: 1.4, fontWeight: 700 }}
          >
            Request a {current.name} Demo
          </Button>
        </div>

        <Box sx={{ p: 4, bgcolor: '#F8FAFC', borderRadius: 3, border: '1px solid #E2E8F0', textAlign: 'center' }}>
          <Typography variant="overline" sx={{ color: '#0F766E', fontWeight: 800, letterSpacing: '1px' }}>
            Proven Operational Impact
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, color: '#0F172A', my: 2 }}>
            {current.roi}
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 300, mx: 'auto' }}>
            Quantified across active customer deployment audits and laboratory efficiency benchmarks.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
