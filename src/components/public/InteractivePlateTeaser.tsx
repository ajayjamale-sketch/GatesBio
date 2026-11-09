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
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 4 },
        borderRadius: 3,
        border: '1px solid #E2E8F0',
        bgcolor: '#FFFFFF',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ p: 1, bgcolor: '#EFF6FF', borderRadius: 2, color: '#1E40AF', display: 'flex' }}>
            <GridOnIcon />
          </Box>
          <div>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A' }}>
              Interactive 96-Well Microplate Visualizer
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B' }}>
              Click any well to inspect real-time aliquot volume, concentration gradient, and QC status.
            </Typography>
          </div>
        </Box>
        <Chip
          icon={<CheckCircleIcon sx={{ fontSize: '16px !important' }} />}
          label="Live Assay Run: CRISPR-Cas9 Screen #104"
          sx={{ bgcolor: '#ECFDF5', color: '#065F46', fontWeight: 600 }}
        />
      </Box>

      {/* Grid and Inspector Container */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2.2fr 1fr' }, gap: 3, alignItems: 'start' }}>
        {/* 96-Well Matrix */}
        <Box sx={{ overflowX: 'auto', pb: 1 }}>
          <Box sx={{ minWidth: 540 }}>
            {/* Column Headers */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '32px repeat(12, 1fr)', gap: '4px', mb: '4px', textAlign: 'center' }}>
              <div />
              {cols.map((c) => (
                <Typography key={c} variant="caption" sx={{ color: '#64748B', fontWeight: 700, fontSize: '11px' }}>
                  {c}
                </Typography>
              ))}
            </Box>

            {/* Rows A through H */}
            {rows.map((r) => (
              <Box key={r} sx={{ display: 'grid', gridTemplateColumns: '32px repeat(12, 1fr)', gap: '4px', mb: '4px', alignItems: 'center' }}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, fontSize: '11px', textAlign: 'center' }}>
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
                    const opacity = Math.min(1, Math.max(0.2, well.concentration / 120));
                    bgColor = `rgba(30, 64, 175, ${opacity})`;
                    borderColor = isSelected ? '#1E40AF' : '#93C5FD';
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
                        boxShadow: isSelected ? '0 0 0 2px #3B82F6' : 'none',
                        cursor: 'pointer',
                        transition: 'transform 0.15s, box-shadow 0.15s',
                        '&:hover': {
                          transform: 'scale(1.2)',
                          zIndex: 10,
                        },
                      }}
                      title={`${coord}: ${well?.sampleName || 'Empty Well'}`}
                    />
                  );
                })}
              </Box>
            ))}
          </Box>

          {/* Legend */}
          <Box sx={{ display: 'flex', gap: 2.5, mt: 2.5, flexWrap: 'wrap', pt: 1, borderTop: '1px solid #F1F5F9' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#10B981' }} />
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Positive Control</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#EF4444' }} />
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Negative Control</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#94A3B8' }} />
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Buffer Blank</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#1E40AF' }} />
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Sample Gradient (5 - 120 ng/µL)</Typography>
            </Box>
          </Box>
        </Box>

        {/* Selected Well Inspector */}
        <Box
          sx={{
            p: 2.5,
            bgcolor: '#F8FAFC',
            borderRadius: 2.5,
            border: '1px solid #E2E8F0',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
              Well Coordinate
            </Typography>
            <Chip
              label={selectedWell?.coordinate}
              sx={{ bgcolor: '#1E40AF', color: '#FFFFFF', fontWeight: 700, fontSize: '13px' }}
            />
          </Box>

          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
            {selectedWell?.sampleName || 'Empty Well Slot'}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, my: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: '#64748B' }}>Concentration:</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F766E' }}>
                {selectedWell?.concentration ? `${selectedWell.concentration} ng/µL` : 'N/A'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: '#64748B' }}>Aliquoted Volume:</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                {selectedWell?.volume ? `${selectedWell.volume} µL` : '0 µL'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: '#64748B' }}>Specimen Type:</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E40AF' }}>
                {selectedWell?.type || (selectedWell?.isControl ? 'Standard / Control' : 'Unassigned')}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: '#64748B' }}>Assay QC Flag:</Typography>
              <Chip
                size="small"
                label={selectedWell?.concentration ? 'Passed Spec' : 'Standby'}
                sx={{
                  bgcolor: selectedWell?.concentration ? '#ECFDF5' : '#F1F5F9',
                  color: selectedWell?.concentration ? '#065F46' : '#64748B',
                  fontWeight: 600,
                  fontSize: '11px',
                }}
              />
            </Box>
          </Box>

          <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', mt: 2, pt: 1.5, borderTop: '1px solid #E2E8F0' }}>
            Direct export compatible with Tecan Fluent & Hamilton Microlab STAR liquid handling platforms.
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
