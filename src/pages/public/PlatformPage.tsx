import React from 'react';
import { Box, Typography, Paper, Button, Chip } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import StorageIcon from '@mui/icons-material/Storage';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import MedicationIcon from '@mui/icons-material/Medication';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface PlatformPageProps {
  onOpenDemo: () => void;
  onExploreTools?: () => void;
}

export const PlatformPage: React.FC<PlatformPageProps> = ({ onOpenDemo }) => {
  const pillars = [
    {
      icon: <QrCodeScannerIcon sx={{ fontSize: 32, color: '#1E40AF' }} />,
      tag: 'LIMS & Specimen Logistics',
      title: 'Digital Sample Accessioning & Freezer Mapping',
      desc: 'Trace every aliquot from reception to disposal. Automatically generate 1D Code 128 and 2D DataMatrix barcodes, map 96/384-well plates, and navigate multi-facility cryogenic storage hierarchies (-80°C freezers to liquid nitrogen dewars).',
      bullets: [
        'Interactive 96/384-well coordinate visualizer with concentration heatmaps',
        'Direct export to Tecan, Hamilton, and Beckman automated liquid handlers',
        'Freeze-thaw cycle monitoring with alert thresholds to prevent specimen degradation',
        'Complete chain-of-custody tracking with operator timestamps',
      ],
      bg: '#EFF6FF',
    },
    {
      icon: <MenuBookIcon sx={{ fontSize: 32, color: '#0F766E' }} />,
      tag: 'Electronic Lab Notebook (ELN)',
      title: 'Standardized Digital Protocols & Collaboration',
      desc: 'Replace fragmented paper notebooks with standardized digital SOPs. Scientists can execute assays step-by-step, verify incubation countdowns, input chemical formulas and LaTeX math, and document observations in real time.',
      bullets: [
        'Version-controlled protocol templates with mandatory read-and-understood attestations',
        'Integrated DNA/RNA sequence viewers with reading frame annotations',
        'Inline chemical reaction balancing and serial dilution calculations',
        'Simultaneous multi-researcher editing with comment pins on microscopy slides',
      ],
      bg: '#F0FDF4',
    },
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 32, color: '#7E22CE' }} />,
      tag: 'AI Research Intelligence Engine',
      title: 'PubMed RAG, Hypothesis Synthesis & Drug Discovery',
      desc: 'Harness state-of-the-art AI grounded in millions of scientific publications from PubMed Central, bioRxiv, and internal repositories. Synthesize prior art, formulate new assay hypotheses, and identify overlooked pathway targets.',
      bullets: [
        'Retrieval-Augmented Generation (RAG) with direct verifiable DOI citations',
        'Automated drug-target interaction insights and patent expiration tracking',
        'Hypothesis generation assisting assay design and sgRNA off-target screening',
        'Natural language protocol optimization and reagent volume troubleshooting',
      ],
      bg: '#FAF5FF',
    },
    {
      icon: <StorageIcon sx={{ fontSize: 32, color: '#0284C7' }} />,
      tag: 'Biological Big Data Management',
      title: 'Centralized Multi-Omics Data Lake',
      desc: 'Store, index, and query massive biological datasets in their native formats. Native streaming for next-generation sequencing outputs, flow cytometry raw files, and clinical imaging.',
      bullets: [
        'Direct support for FASTQ, BAM, CRAM, VCF, and single-cell AnnData (h5ad)',
        'Flow Cytometry FCS standard parser with forward/side scatter density gating',
        'Automated biological metadata tagging conforming to NCBI Taxonomy and Gene Ontology',
        'Git-like biological dataset versioning with immutable provenance tracking',
      ],
      bg: '#F0F9FF',
    },
    {
      icon: <DeviceHubIcon sx={{ fontSize: 32, color: '#F59E0B' }} />,
      tag: 'Equipment Management & IoT',
      title: 'Smart Instrument Scheduling & Calibration Drift Alarms',
      desc: 'Maximize instrument utilization and prevent test failures. Schedule sequencers, centrifuges, and mass spectrometers while capturing real-time IoT temperature and CO₂ feeds from incubators and cold rooms.',
      bullets: [
        'Anti-collision visual booking calendar with priority preemption for clinical trials',
        'Scheduled calibration maintenance alarms compliant with ISO 17025',
        'Live IoT sensor telemetry with instant SMS and email alerts upon freezer drift',
        'Utilization analytics identifying under-used and over-subscribed assets',
      ],
      bg: '#FFFBEB',
    },
    {
      icon: <MedicationIcon sx={{ fontSize: 32, color: '#DC2626' }} />,
      tag: 'Clinical Trial Management (GCP)',
      title: 'Phase I-IV Protocols, e-Consent & Safety Oversight',
      desc: 'Administer clinical trial cohorts with strict Good Clinical Practice (GCP) compliance. Enroll participants, capture electronic informed consent, manage double-blind sample randomization, and log adverse events.',
      bullets: [
        'Electronic Informed Consent (e-Consent) with cryptographic audit logging',
        'Standardized MedDRA coding for adverse events (AEs) and Serious Adverse Events (SAEs)',
        'Automated regulatory notification draft generation within statutory 24-hour windows',
        'Cohort visit schedule tracking with longitudinal biomarker sample linkage',
      ],
      bg: '#FEF2F2',
    },
  ];

  return (
    <Box className="container-custom" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Chip label="Platform Capabilities" sx={{ bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 700, mb: 2 }} />
        <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
          Six Core Pillars. One Cohesive Ecosystem.
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 720, mx: 'auto' }}>
          Explore the architecture that powers discovery, laboratory execution, and regulatory readiness for modern life sciences organizations.
        </Typography>
      </Box>

      {/* Pillars Grid */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, mb: 10 }}>
        {pillars.map((p, idx) => (
          <Paper
            key={idx}
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 3.5,
              border: '1px solid #E2E8F0',
              bgcolor: '#FFFFFF',
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 1.2fr' },
              gap: 4,
              alignItems: 'center',
            }}
          >
            <div>
              <Box sx={{ display: 'inline-flex', p: 1.5, bgcolor: p.bg, borderRadius: 2.5, mb: 2.5 }}>
                {p.icon}
              </Box>
              <Typography variant="overline" sx={{ display: 'block', color: '#64748B', fontWeight: 700, letterSpacing: '0.8px' }}>
                {p.tag}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mb: 2, fontSize: { xs: '22px', md: '28px' } }}>
                {p.title}
              </Typography>
              <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.6, mb: 3 }}>
                {p.desc}
              </Typography>
              <Button
                variant="outlined"
                onClick={onOpenDemo}
                endIcon={<ArrowForwardIcon />}
                sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 700 }}
              >
                Schedule Module Walkthrough
              </Button>
            </div>

            <Box sx={{ p: 3.5, bgcolor: '#F8FAFC', borderRadius: 2.5, border: '1px solid #E2E8F0' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', mb: 2.5 }}>
                Key Technical Capabilities
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {p.bullets.map((b, bIdx) => (
                  <Box key={bIdx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <CheckCircleIcon sx={{ color: '#10B981', fontSize: 20, mt: '2px' }} />
                    <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.5, fontWeight: 500 }}>
                      {b}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Bottom CTA */}
      <Box sx={{ p: 6, bgcolor: '#1E40AF', borderRadius: 4, color: '#FFFFFF', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
          Experience the GatsBio Advantage in Your Lab
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', mb: 4, opacity: 0.9 }}>
          Get a hands-on walkthrough tailored to your research assays, sample volume, and compliance requirements.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={onOpenDemo}
          sx={{ bgcolor: '#FFFFFF', color: '#1E40AF', fontWeight: 800, px: 4, py: 1.5, '&:hover': { bgcolor: '#F1F5F9' } }}
        >
          Book Your Scientific Consultation
        </Button>
      </Box>
    </Box>
  );
};
