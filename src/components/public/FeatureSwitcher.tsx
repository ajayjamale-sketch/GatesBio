import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Chip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BiotechIcon from '@mui/icons-material/Biotech';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

interface FeatureSwitcherProps {
  onOpenDemo: () => void;
  onNavigate: (route: string) => void;
}

export const FeatureSwitcher: React.FC<FeatureSwitcherProps> = ({ onOpenDemo, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'lims' | 'eln' | 'ai' | 'compliance'>('lims');

  const tabs = [
    { id: 'lims', label: 'LIMS & Sample Logistics', icon: <QrCodeScannerIcon fontSize="small" /> },
    { id: 'eln', label: 'Electronic Lab Notebook (ELN)', icon: <MenuBookIcon fontSize="small" /> },
    { id: 'ai', label: 'AI Scientific Engine', icon: <AutoAwesomeIcon fontSize="small" /> },
    { id: 'compliance', label: 'FDA 21 CFR Part 11 Compliance', icon: <FactCheckIcon fontSize="small" /> },
  ] as const;

  return (
    <Box sx={{ my: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="overline" sx={{ color: '#0F766E', fontWeight: 700, letterSpacing: '1px' }}>
          Unified Laboratory Ecosystem
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mt: 1 }}>
          Everything Your Biotech Requires. Zero Data Silos.
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 640, mx: 'auto', mt: 1.5 }}>
          Switch effortlessly between digital sample tracking, collaborative protocol execution, literature synthesis,
          and regulatory compliance.
        </Typography>
      </Box>

      {/* Tab Navigation Pill Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, px: 2 }}>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            p: 0.8,
            bgcolor: '#F1F5F9',
            borderRadius: 3,
            border: '1px solid #E2E8F0',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                startIcon={tab.icon}
                sx={{
                  px: 2.5,
                  py: 1,
                  borderRadius: 2.5,
                  fontWeight: 600,
                  fontSize: '14px',
                  bgcolor: isActive ? '#FFFFFF' : 'transparent',
                  color: isActive ? '#1E40AF' : '#64748B',
                  boxShadow: isActive ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                  '&:hover': {
                    bgcolor: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                  },
                }}
              >
                {tab.label}
              </Button>
            );
          })}
        </Box>
      </Box>

      {/* Tab Content Display Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'lims' && (
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' }, gap: 4, alignItems: 'center' }}>
                <div>
                  <Chip
                    icon={<QrCodeScannerIcon />}
                    label="Laboratory Information Management System"
                    sx={{ bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 600, mb: 2 }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
                    End-to-End Sample Traceability with 2D Barcode Integration
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748B', mb: 3 }}>
                    Log DNA, RNA, antibodies, and tissue specimens with automatic Code 128 and DataMatrix generation.
                    Navigate multi-room cryogenic storage from -80°C freezers to individual 96-well plate coordinates.
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <CheckCircleIcon sx={{ color: '#10B981', fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600 }}>
                        Automated freeze-thaw cycle monitoring with alert thresholds
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <CheckCircleIcon sx={{ color: '#10B981', fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600 }}>
                        96/384-Well Plate Coordinate Mapper with liquid handler export
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <CheckCircleIcon sx={{ color: '#10B981', fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600 }}>
                        Instant thermal label printing for cryogenic microcentrifuge tubes
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    onClick={onOpenDemo}
                    endIcon={<ArrowForwardIcon />}
                    sx={{ bgcolor: '#1E40AF', px: 3, py: 1.2, fontWeight: 700 }}
                  >
                    Tour LIMS Features
                  </Button>
                </div>

                {/* Simulated UI Card */}
                <Box sx={{ p: 3, bgcolor: '#F8FAFC', borderRadius: 2.5, border: '1px solid #E2E8F0' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                      Sample Lineage & Cold Chain
                    </Typography>
                    <Chip size="small" label="-81.2 °C Verified" sx={{ bgcolor: '#ECFDF5', color: '#065F46', fontWeight: 700 }} />
                  </Box>
                  <Box sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #CBD5E1', mb: 2 }}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>SPECIMEN ID</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1E40AF' }}>SMP-2026-9041</Typography>
                    <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600 }}>HEK293-Cas9-KO (Exon 3)</Typography>
                    <Typography variant="caption" sx={{ color: '#94A3B8' }}>Storage: Cryo Vault 2 &gt; Shelf 2 &gt; Box BX-CRISPR-04 [Slot C3]</Typography>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                    <Box sx={{ p: 1.5, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #E2E8F0', textAlign: 'center' }}>
                      <Typography variant="caption" sx={{ color: '#64748B' }}>Concentration</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: '#0F766E' }}>124.8 ng/µL</Typography>
                    </Box>
                    <Box sx={{ p: 1.5, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #E2E8F0', textAlign: 'center' }}>
                      <Typography variant="caption" sx={{ color: '#64748B' }}>Freeze-Thaw</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: '#10B981' }}>1 / 4 Cycles</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          )}

          {activeTab === 'eln' && (
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' }, gap: 4, alignItems: 'center' }}>
                <div>
                  <Chip
                    icon={<MenuBookIcon />}
                    label="Electronic Lab Notebook (ELN)"
                    sx={{ bgcolor: '#F0FDF4', color: '#0F766E', fontWeight: 600, mb: 2 }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
                    Standardized Protocols, Inline Math & Collaborative Checklists
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748B', mb: 3 }}>
                    Replace handwritten notebooks with dynamic digital protocols. Technicians can follow step-by-step
                    workflows, verify centrifuge RPM and incubation timers, and log deviations in real time.
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <CheckCircleIcon sx={{ color: '#10B981', fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600 }}>
                        LaTeX mathematical formulas for reaction kinetics and enzyme buffers
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <CheckCircleIcon sx={{ color: '#10B981', fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600 }}>
                        Interactive nucleotide sequence viewers with reading frame overlays
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <CheckCircleIcon sx={{ color: '#10B981', fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600 }}>
                        Operator timestamps and SOP version control for ISO/GLP auditability
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    onClick={onOpenDemo}
                    endIcon={<ArrowForwardIcon />}
                    sx={{ bgcolor: '#0F766E', px: 3, py: 1.2, fontWeight: 700 }}
                  >
                    Explore ELN Capabilities
                  </Button>
                </div>

                {/* Simulated UI Card */}
                <Box sx={{ p: 3, bgcolor: '#F8FAFC', borderRadius: 2.5, border: '1px solid #E2E8F0' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', mb: 2 }}>
                    Active Protocol: CRISPR-Cas9 Target Cleavage Assay (v2.4)
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Box sx={{ p: 1.5, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #10B981', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <CheckCircleIcon sx={{ color: '#10B981' }} />
                      <div>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>Step 1: Reagent Thawing (NEBuffer 3.1)</Typography>
                        <Typography variant="caption" sx={{ color: '#64748B' }}>Completed at 08:14 UTC by Marcus Chen</Typography>
                      </div>
                    </Box>
                    <Box sx={{ p: 1.5, bgcolor: '#EFF6FF', borderRadius: 2, border: '1px solid #93C5FD', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <BiotechIcon sx={{ color: '#1E40AF' }} />
                      <div>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E40AF' }}>Step 2: 37°C Cleavage Incubation</Typography>
                        <Typography variant="caption" sx={{ color: '#1E40AF' }}>Timer: 18m 42s remaining [Active]</Typography>
                      </div>
                    </Box>
                    <Box sx={{ p: 1.5, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #E2E8F0', opacity: 0.6 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>Step 3: Heat Inactivation (65°C for 5 min)</Typography>
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>Pending Step 2 completion</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          )}

          {activeTab === 'ai' && (
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' }, gap: 4, alignItems: 'center' }}>
                <div>
                  <Chip
                    icon={<AutoAwesomeIcon />}
                    label="AI Scientific Intelligence Engine"
                    sx={{ bgcolor: '#FAF5FF', color: '#7E22CE', fontWeight: 600, mb: 2 }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
                    Retrieval-Augmented Literature & Molecular Hypothesis Generation
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748B', mb: 3 }}>
                    Empower scientists with an AI assistant that queries millions of PubMed, bioRxiv, and internal
                    historical notebooks. Synthesize prior art, identify research gaps, and suggest optimized assay parameters.
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <CheckCircleIcon sx={{ color: '#10B981', fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600 }}>
                        PubMed Central & medRxiv live retrieval with verifiable DOI citations
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <CheckCircleIcon sx={{ color: '#10B981', fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600 }}>
                        Target-to-pathway synthesis and known off-target toxicity flags
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <CheckCircleIcon sx={{ color: '#10B981', fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600 }}>
                        Natural language assay troubleshooting: "Why did my PCR yield 2 bands at 52°C?"
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    onClick={onOpenDemo}
                    endIcon={<ArrowForwardIcon />}
                    sx={{ bgcolor: '#7E22CE', px: 3, py: 1.2, fontWeight: 700, '&:hover': { bgcolor: '#6B21A8' } }}
                  >
                    See AI Assistant in Action
                  </Button>
                </div>

                {/* Simulated UI Card */}
                <Box sx={{ p: 3, bgcolor: '#F8FAFC', borderRadius: 2.5, border: '1px solid #E2E8F0' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', mb: 2 }}>
                    AI Literature Synthesis Card
                  </Typography>
                  <Box sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #E2E8F0', mb: 2 }}>
                    <Typography variant="caption" sx={{ color: '#7E22CE', fontWeight: 700 }}>QUERY</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#0F172A', my: 0.5 }}>
                      "Recommend sgRNA design strategy for Cas9 cleavage in human Exon 3 without BsmBI sites."
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2, bgcolor: '#FAF5FF', borderRadius: 2, border: '1px solid #E9D5FF' }}>
                    <Typography variant="caption" sx={{ color: '#7E22CE', fontWeight: 700 }}>SYNTHESIZED INSIGHT</Typography>
                    <Typography variant="body2" sx={{ color: '#334155', mt: 0.5 }}>
                      Identified 3 prospective 20-nt protospacers with &gt;88% cutting efficiency score. Off-target
                      homology in non-coding introns only.
                    </Typography>
                    <Chip size="small" label="Cited: Nature Biotech (DOI: 10.1038/nbt.3437)" sx={{ mt: 1.5, fontSize: '11px', bgcolor: '#FFFFFF' }} />
                  </Box>
                </Box>
              </Box>
            </Paper>
          )}

          {activeTab === 'compliance' && (
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' }, gap: 4, alignItems: 'center' }}>
                <div>
                  <Chip
                    icon={<FactCheckIcon />}
                    label="Regulatory & Compliance Standard"
                    sx={{ bgcolor: '#FEF3C7', color: '#92400E', fontWeight: 600, mb: 2 }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
                    FDA 21 CFR Part 11, GAMP 5 & Immutable Audit Trails
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748B', mb: 3 }}>
                    Be audit-ready at any second. Every record change creates a cryptographically signed, unalterable
                    audit log with dual-factor electronic signatures, timestamp provenance, and reasons for modification.
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <CheckCircleIcon sx={{ color: '#10B981', fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600 }}>
                        Dual-credential electronic signature challenges (Password/TOTP)
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <CheckCircleIcon sx={{ color: '#10B981', fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600 }}>
                        System-enforced session timeouts and automatic password rotation
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <CheckCircleIcon sx={{ color: '#10B981', fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600 }}>
                        One-click PDF package export for FDA, ISO 17025, and GMP audits
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    onClick={() => onNavigate('compliance')}
                    endIcon={<ArrowForwardIcon />}
                    sx={{ bgcolor: '#92400E', px: 3, py: 1.2, fontWeight: 700, '&:hover': { bgcolor: '#78350F' } }}
                  >
                    View Compliance Portal
                  </Button>
                </div>

                {/* Simulated UI Card */}
                <Box sx={{ p: 3, bgcolor: '#F8FAFC', borderRadius: 2.5, border: '1px solid #E2E8F0' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                      21 CFR Part 11 Electronic Signature Stamp
                    </Typography>
                    <FingerprintIcon sx={{ color: '#1E40AF' }} />
                  </Box>
                  <Box sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #CBD5E1', mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>SIGNER</Typography>
                      <Chip size="small" label="QA Approved" sx={{ bgcolor: '#ECFDF5', color: '#065F46', fontWeight: 700 }} />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>Dr. Elena Vance, Ph.D.</Typography>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>Meaning: Formal protocol release & batch verification</Typography>
                  </Box>
                  <Box sx={{ p: 1.5, bgcolor: '#EFF6FF', borderRadius: 2, border: '1px solid #BFDBFE' }}>
                    <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 700, display: 'block' }}>
                      CRYPTOGRAPHIC RECORD HASH (SHA-256)
                    </Typography>
                    <Typography variant="caption" sx={{ fontFamily: 'var(--font-mono)', color: '#1E3A8A', wordBreak: 'break-all' }}>
                      e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          )}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};
