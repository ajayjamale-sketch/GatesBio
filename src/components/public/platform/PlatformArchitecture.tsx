import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import StorageIcon from '@mui/icons-material/Storage';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ARCHITECTURE_INTEGRATIONS } from '../../../data/platformModulesData';

export const PlatformArchitecture: React.FC = () => {
  const layers = [
    {
      step: 'Layer 1',
      title: 'Edge & Wet Lab Hardware',
      desc: 'Barcode scanners, Tecan/Hamilton liquid handlers, sequencers & IoT cryo sensors',
      icon: <PrecisionManufacturingIcon sx={{ color: '#1E40AF', fontSize: 26 }} />,
      bg: '#EFF6FF',
      border: '#BFDBFE',
    },
    {
      step: 'Layer 2',
      title: 'Unified Core Bus & Data Lake',
      desc: 'LIMS specimen engine, ELN protocols & multi-omics raw storage (FASTQ, BAM, VCF)',
      icon: <StorageIcon sx={{ color: '#0F766E', fontSize: 26 }} />,
      bg: '#F0FDFA',
      border: '#99F6E4',
    },
    {
      step: 'Layer 3',
      title: 'AI Intelligence & Clinical',
      desc: 'PubMed Central RAG citations, hypothesis synthesis & GCP trial orchestration',
      icon: <AutoAwesomeIcon sx={{ color: '#7E22CE', fontSize: 26 }} />,
      bg: '#FAF5FF',
      border: '#E9D5FF',
    },
    {
      step: 'Layer 4',
      title: 'Compliance & Executive BI',
      desc: 'FDA 21 CFR Part 11 audit vaults, IP logs, ISO 17025 & real-time grant analytics',
      icon: <VerifiedUserIcon sx={{ color: '#10B981', fontSize: 26 }} />,
      bg: '#ECFDF5',
      border: '#A7F3D0',
    },
  ];

  return (
    <Box id="data-architecture" sx={{ py: { xs: 7, md: 9 }, bgcolor: '#FFFFFF' }}>
      <Box className="container-custom">
        <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: 6 }}>
          <Chip
            label="Interoperability & Data Bus"
            sx={{
              bgcolor: '#EFF6FF',
              color: '#1E40AF',
              fontWeight: 700,
              mb: 1.5,
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: '#0F172A',
              fontSize: { xs: '26px', md: '36px' },
              mb: 1.5,
            }}
          >
            Unified Scientific Data Flow & Instrument Connectivity
          </Typography>
          <Typography variant="body1" sx={{ color: '#475569' }}>
            GatsBio replaces brittle point-to-point scripts with an event-driven architecture connecting bench instruments directly to compliance-ready analytics.
          </Typography>
        </Box>

        {/* 4-Layer Architectural Pipeline */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
            gap: 2.5,
            mb: 6,
            position: 'relative',
          }}
        >
          {layers.map((layer, idx) => (
            <Paper
              key={idx}
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: layer.bg,
                border: `1px solid ${layer.border}`,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      p: 1.2,
                      bgcolor: '#FFFFFF',
                      borderRadius: 2,
                      display: 'inline-flex',
                      boxShadow: '0 2px 6px rgba(15, 23, 42, 0.05)',
                    }}
                  >
                    {layer.icon}
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 800,
                      color: '#475569',
                      textTransform: 'uppercase',
                      letterSpacing: '0.7px',
                    }}
                  >
                    {layer.step}
                  </Typography>
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}
                >
                  {layer.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#475569', lineHeight: 1.55, fontSize: '13.5px' }}
                >
                  {layer.desc}
                </Typography>
              </Box>

              {idx < layers.length - 1 && (
                <Box
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    position: 'absolute',
                    right: -18,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    bgcolor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
                  }}
                >
                  <ArrowForwardIcon sx={{ fontSize: 15, color: '#1E40AF' }} />
                </Box>
              )}
            </Paper>
          ))}
        </Box>

        {/* Supported Hardware & Cloud Matrix */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
            gap: 2.5,
          }}
        >
          {ARCHITECTURE_INTEGRATIONS.map((group, idx) => (
            <Paper
              key={idx}
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: '1px solid #E2E8F0',
                bgcolor: '#F8FAFC',
              }}
            >
              <Chip
                size="small"
                label={group.tag}
                sx={{
                  bgcolor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  color: '#0F766E',
                  fontSize: '10px',
                  fontWeight: 800,
                  mb: 1.5,
                }}
              />
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5 }}
              >
                {group.category}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                {group.items.map((item, itemIdx) => (
                  <Box
                    key={itemIdx}
                    sx={{
                      px: 1.5,
                      py: 0.75,
                      bgcolor: '#FFFFFF',
                      borderRadius: 1.5,
                      border: '1px solid #E2E8F0',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      color: '#334155',
                    }}
                  >
                    {item}
                  </Box>
                ))}
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
