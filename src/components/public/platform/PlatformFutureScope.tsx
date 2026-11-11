import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import BiotechIcon from '@mui/icons-material/Biotech';
import PublicIcon from '@mui/icons-material/Public';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { FUTURE_TECH_ROADMAP } from '../../../data/platformModulesData';

const FUTURE_ICONS: Record<string, React.ReactNode> = {
  alphafold: <AutoAwesomeIcon sx={{ color: '#7E22CE', fontSize: 26 }} />,
  'digital-twin': <ViewInArIcon sx={{ color: '#1E40AF', fontSize: 26 }} />,
  'genomic-engine': <BiotechIcon sx={{ color: '#0F766E', fontSize: 26 }} />,
  'research-network': <PublicIcon sx={{ color: '#10B981', fontSize: 26 }} />,
};

export const PlatformFutureScope: React.FC = () => {
  return (
    <Box
      id="future-innovation"
      sx={{ py: { xs: 7, md: 9 }, bgcolor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}
    >
      <Box className="container-custom">
        <Box sx={{ textAlign: 'center', maxWidth: 740, mx: 'auto', mb: 6 }}>
          <Chip
            label="Next-Gen Biotech Roadmap"
            sx={{
              bgcolor: '#FAF5FF',
              color: '#7E22CE',
              fontWeight: 700,
              border: '1px solid #E9D5FF',
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
            Future-Ready Biotechnology Capabilities
          </Typography>
          <Typography variant="body1" sx={{ color: '#475569' }}>
            Designed for tomorrow's automated smart laboratories—extending into AlphaFold protein simulations, digital twin facilities, and federated global research networks.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}
        >
          {FUTURE_TECH_ROADMAP.map((item) => (
            <Paper
              key={item.id}
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3.5,
                bgcolor: '#FFFFFF',
                border: '1px solid #E2E8F0',
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
                    mb: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        p: 1.25,
                        borderRadius: 2.5,
                        bgcolor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                      }}
                    >
                      {FUTURE_ICONS[item.id]}
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 800,
                        color: '#64748B',
                        textTransform: 'uppercase',
                        letterSpacing: '0.6px',
                      }}
                    >
                      {item.category}
                    </Typography>
                  </Box>
                  <Chip
                    size="small"
                    label={item.readinessBadge}
                    sx={{
                      bgcolor: '#EFF6FF',
                      color: '#1E40AF',
                      fontWeight: 700,
                      fontSize: '11px',
                    }}
                  />
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5, fontSize: '20px' }}>
                  {item.title}
                </Typography>

                <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.65, mb: 2.5 }}>
                  {item.description}
                </Typography>
              </Box>

              <Box
                sx={{
                  pt: 2,
                  borderTop: '1px solid #F1F5F9',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                {item.bulletPoints.map((bp, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ArrowRightIcon sx={{ color: '#0F766E', fontSize: 18 }} />
                    <Typography variant="caption" sx={{ color: '#334155', fontWeight: 600, fontSize: '13px' }}>
                      {bp}
                    </Typography>
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
