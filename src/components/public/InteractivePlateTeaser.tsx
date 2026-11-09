import React, { useState } from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { MOCK_WELLS_96 } from '../../data/mockData';
import type { WellInfo } from '../../types';

export const InteractivePlateTeaser: React.FC = () => {
  const [selectedWell, setSelectedWell] = useState<WellInfo>(
    MOCK_WELLS_96.find((w) => w.coordinate === 'C4') || MOCK_WELLS_96[0]
  );

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cols = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <Box sx={{ my: { xs: 6, md: 10 } }}>
      {/* Section Header */}
      <Box sx={{ textAlign: 'center', mb: { xs: 3.5, md: 5 } }}>
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
          Wet-Lab Workstation Module
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
          Interactive 96-Well Microplate Array
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
          Live coordinate mapper with real-time dilution series heatmaps, volume inspection, and automated robotic liquid handler integration.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3.5, md: 4 },
          borderRadius: 3.5,
          border: '1px solid #E2E8F0',
          bgcolor: '#FFFFFF',
          maxWidth: '100%',
          overflow: 'hidden',
          boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        }}
      >
        {/* Clean Header Bar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3.5,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2.5,
                bgcolor: '#EFF6FF',
                color: '#1E40AF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <GridOnIcon sx={{ fontSize: 22 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '16px', sm: '18px' }, lineHeight: 1.2 }}>
                96-Well Microplate Workstation
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', fontSize: { xs: '12.5px', sm: '13.5px' }, mt: '2px' }}>
                Click any well to inspect sample dilution, volume, and QC parameters.
              </Typography>
            </Box>
          </Box>

          <Chip
            icon={<CheckCircleIcon sx={{ fontSize: '15px !important', color: '#10B981 !important' }} />}
            label="CRISPR-Cas9 Screen #104"
            size="small"
            sx={{
              bgcolor: '#ECFDF5',
              color: '#065F46',
              fontWeight: 700,
              fontSize: '11.5px',
              height: 28,
              border: '1px solid #A7F3D0',
            }}
          />
        </Box>

        {/* Workstation Grid & Inspector */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '2.3fr 1.1fr' },
            gap: { xs: 3, md: 4 },
            alignItems: 'start',
            minWidth: 0,
            width: '100%',
          }}
        >
          {/* Microplate 8x12 Matrix */}
          <Box sx={{ minWidth: 0, width: '100%' }}>
            <Box
              sx={{
                overflowX: 'auto',
                pb: 1,
                minWidth: 0,
                width: '100%',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <Box
                sx={{
                  minWidth: 540,
                  p: { xs: 2, sm: 2.5 },
                  bgcolor: '#F8FAFC',
                  borderRadius: 3,
                  border: '1px solid #E2E8F0',
                }}
              >
                {/* Column Headers (1 to 12) */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '32px repeat(12, 1fr)',
                    gap: '5px',
                    mb: '6px',
                    textAlign: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div />
                  {cols.map((c) => (
                    <Typography
                      key={c}
                      variant="caption"
                      sx={{
                        color: selectedWell.col === c ? '#1E40AF' : '#64748B',
                        fontWeight: selectedWell.col === c ? 800 : 700,
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {c}
                    </Typography>
                  ))}
                </Box>

                {/* Rows A through H */}
                {rows.map((r) => (
                  <Box
                    key={r}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '32px repeat(12, 1fr)',
                      gap: '5px',
                      mb: '5px',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: selectedWell.row === r ? '#1E40AF' : '#64748B',
                        fontWeight: selectedWell.row === r ? 800 : 700,
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        textAlign: 'center',
                      }}
                    >
                      {r}
                    </Typography>

                    {cols.map((c) => {
                      const coord = `${r}${c}`;
                      const well = MOCK_WELLS_96.find((w) => w.coordinate === coord);
                      const isSelected = selectedWell?.coordinate === coord;

                      let bgColor = '#F1F5F9';
                      let borderColor = '#E2E8F0';

                      if (well?.isControl === 'Positive') {
                        bgColor = '#10B981';
                        borderColor = '#059669';
                      } else if (well?.isControl === 'Negative') {
                        bgColor = '#EF4444';
                        borderColor = '#DC2626';
                      } else if (well?.isControl === 'Blank') {
                        bgColor = '#94A3B8';
                        borderColor = '#64748B';
                      } else if (well?.concentration) {
                        const opacity = Math.min(1, Math.max(0.18, well.concentration / 120));
                        bgColor = `rgba(30, 64, 175, ${opacity})`;
                        borderColor = isSelected ? '#1E40AF' : `rgba(30, 64, 175, ${Math.min(1, opacity + 0.3)})`;
                      }

                      return (
                        <Box
                          key={coord}
                          onClick={() => well && setSelectedWell(well)}
                          sx={{
                            width: '100%',
                            aspectRatio: '1',
                            borderRadius: '50%',
                            bgcolor: bgColor,
                            border: isSelected ? '2px solid #0F172A' : `1px solid ${borderColor}`,
                            boxShadow: isSelected ? '0 0 0 2.5px #3B82F6' : 'none',
                            cursor: 'pointer',
                            transition: 'transform 0.15s ease',
                            '&:hover': {
                              transform: 'scale(1.25)',
                              zIndex: 10,
                            },
                          }}
                          title={`${coord}: ${well?.sampleName || 'Empty Well'} (${well?.concentration || 0} ng/µL)`}
                        />
                      );
                    })}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Scientific Legend */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2,
                mt: 2,
                px: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2.5 }, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#10B981' }} />
                  <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600, fontSize: '11px' }}>
                    Positive Control
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#EF4444' }} />
                  <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600, fontSize: '11px' }}>
                    Negative Control
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#94A3B8' }} />
                  <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600, fontSize: '11px' }}>
                    Buffer Blank
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, fontSize: '10.5px' }}>
                  5 ng/µL
                </Typography>
                <Box
                  sx={{
                    width: 50,
                    height: 7,
                    borderRadius: 4,
                    background: 'linear-gradient(90deg, rgba(30,64,175,0.2) 0%, rgba(30,64,175,1) 100%)',
                  }}
                />
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, fontSize: '10.5px' }}>
                  120 ng/µL
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Inspector Panel */}
          <Box
            sx={{
              p: 2.5,
              bgcolor: '#F8FAFC',
              borderRadius: 3,
              border: '1px solid #E2E8F0',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, textTransform: 'uppercase', fontSize: '11px' }}>
                Well Inspector
              </Typography>
              <Chip
                label={selectedWell?.coordinate}
                sx={{
                  bgcolor: '#1E40AF',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  height: 24,
                  px: 0.5,
                }}
              />
            </Box>

            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5, fontSize: '15px' }}>
              {selectedWell?.sampleName || 'Empty Well Slot'}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: '#64748B', fontSize: '13px' }}>Concentration:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F766E', fontSize: '13px' }}>
                  {selectedWell?.concentration ? `${selectedWell.concentration} ng/µL` : 'N/A'}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: '#64748B', fontSize: '13px' }}>Volume:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>
                  {selectedWell?.volume ? `${selectedWell.volume} µL` : '0 µL'}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: '#64748B', fontSize: '13px' }}>Type:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E40AF', fontSize: '13px' }}>
                  {selectedWell?.type || (selectedWell?.isControl ? 'Reference Control' : 'Genomic DNA')}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: '#64748B', fontSize: '13px' }}>Status:</Typography>
                <Chip
                  size="small"
                  label={selectedWell?.concentration ? 'Passed Spec' : 'Standby'}
                  sx={{
                    bgcolor: selectedWell?.concentration ? '#ECFDF5' : '#F1F5F9',
                    color: selectedWell?.concentration ? '#065F46' : '#64748B',
                    fontWeight: 700,
                    fontSize: '10.5px',
                    height: 20,
                  }}
                />
              </Box>
            </Box>

            <Typography
              variant="caption"
              sx={{
                color: '#94A3B8',
                display: 'block',
                pt: 1.5,
                borderTop: '1px solid #E2E8F0',
                fontSize: '11px',
                lineHeight: 1.4,
              }}
            >
              Direct export compatible with Tecan Fluent & Hamilton Microlab STAR liquid handling platforms.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
