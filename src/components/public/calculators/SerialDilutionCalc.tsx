import React, { useState } from 'react';
import { Box, Typography, TextField, Paper } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';

export const SerialDilutionCalc: React.FC = () => {
  const [initialConc, setInitialConc] = useState<number>(100); // 100 µM
  const [dilutionFactor, setDilutionFactor] = useState<number>(2); // 1:2
  const [wellVolume, setWellVolume] = useState<number>(100); // 100 µL
  const [numWells, setNumWells] = useState<number>(8);

  // Math: Transfer volume = Final volume / (Factor - 1)
  // Diluent volume = Final volume
  const transferVol = Math.round((wellVolume / (dilutionFactor - 1)) * 10) / 10;
  const diluentVol = wellVolume;

  const concentrations = Array.from({ length: numWells }, (_, i) => {
    const conc = initialConc / Math.pow(dilutionFactor, i);
    return Math.round(conc * 100) / 100;
  });

  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <Box sx={{ p: 1, bgcolor: '#EFF6FF', borderRadius: 2, color: '#1E40AF', display: 'flex' }}>
          <CalculateIcon />
        </Box>
        <div>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A' }}>
            Serial Dilution Protocol Calculator
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B' }}>
            Calculate transfer volumes, diluent volumes, and final step concentrations across multi-well plates.
          </Typography>
        </div>
      </Box>

      {/* Input Parameters */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(4, 1fr)' }, gap: 2, mb: 4, mt: 3 }}>
        <TextField
          label="Initial Conc (C₁)"
          type="number"
          size="small"
          value={initialConc}
          onChange={(e) => setInitialConc(Math.max(0.1, Number(e.target.value)))}
          helperText="Unit: µM or ng/µL"
        />
        <TextField
          label="Dilution Ratio (1 : X)"
          type="number"
          size="small"
          value={dilutionFactor}
          onChange={(e) => setDilutionFactor(Math.max(1.1, Number(e.target.value)))}
          helperText="e.g. 2 for 2-fold, 10 for 10-fold"
        />
        <TextField
          label="Final Well Vol (V₂)"
          type="number"
          size="small"
          value={wellVolume}
          onChange={(e) => setWellVolume(Math.max(1, Number(e.target.value)))}
          helperText="Unit: µL per well"
        />
        <TextField
          label="Number of Steps"
          type="number"
          size="small"
          value={numWells}
          onChange={(e) => setNumWells(Math.min(12, Math.max(2, Number(e.target.value))))}
          helperText="Max 12 wells per row"
        />
      </Box>

      {/* Pipetting Instructions */}
      <Box
        sx={{
          bgcolor: '#F8FAFC',
          p: 2.5,
          borderRadius: 2,
          border: '1px solid #E2E8F0',
          mb: 4,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
        }}
      >
        <div>
          <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
            Pre-Load Diluent / Buffer
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F766E' }}>
            {diluentVol} µL
          </Typography>
          <Typography variant="caption" sx={{ color: '#94A3B8' }}>into Wells 2 to {numWells}</Typography>
        </div>
        <div style={{ borderLeft: '1px solid #E2E8F0', paddingLeft: '1.5rem' }}>
          <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
            Serial Transfer Volume
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1E40AF' }}>
            {transferVol} µL
          </Typography>
          <Typography variant="caption" sx={{ color: '#94A3B8' }}>aliquot from Well N → N+1</Typography>
        </div>
        <div style={{ borderLeft: '1px solid #E2E8F0', paddingLeft: '1.5rem' }}>
          <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
            Total Dynamic Range
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A' }}>
            {concentrations[0]} → {concentrations[concentrations.length - 1]}
          </Typography>
          <Typography variant="caption" sx={{ color: '#94A3B8' }}>{Math.round(Math.pow(dilutionFactor, numWells - 1))}-fold span</Typography>
        </div>
      </Box>

      {/* Visual Well Representation */}
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#0F172A' }}>
        Calculated Multi-Well Concentration Gradient (Row A, Wells 1 to {numWells})
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${numWells}, 1fr)`, gap: 1 }}>
        {concentrations.map((c, i) => {
          const intensity = Math.max(0.12, c / initialConc);
          return (
            <Box
              key={i}
              sx={{
                p: 1.5,
                borderRadius: 2,
                border: '1px solid #CBD5E1',
                bgcolor: `rgba(30, 64, 175, ${intensity})`,
                color: intensity > 0.5 ? '#FFFFFF' : '#0F172A',
                textAlign: 'center',
                transition: 'all 0.2s',
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', opacity: 0.85 }}>
                Well {i + 1}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, my: 0.5 }}>
                {c}
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '10px', opacity: 0.8 }}>
                {i === 0 ? 'Stock' : `1:${Math.pow(dilutionFactor, i)}`}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};
