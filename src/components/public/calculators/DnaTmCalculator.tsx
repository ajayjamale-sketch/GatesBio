import React, { useState } from 'react';
import { Box, Typography, TextField, Paper, Chip } from '@mui/material';
import BiotechIcon from '@mui/icons-material/Biotech';

export const DnaTmCalculator: React.FC = () => {
  const [sequence, setSequence] = useState<string>('GATCGATCGAATTCGATCGGCC');

  const cleanSeq = sequence.toUpperCase().replace(/[^ATCGU]/g, '');
  const len = cleanSeq.length;

  const countA = (cleanSeq.match(/A/g) || []).length;
  const countT = (cleanSeq.match(/[TU]/g) || []).length;
  const countC = (cleanSeq.match(/C/g) || []).length;
  const countG = (cleanSeq.match(/G/g) || []).length;

  const gcCount = countC + countG;
  const gcPercent = len > 0 ? Math.round((gcCount / len) * 1000) / 10 : 0;

  // Standard Wallace rule for < 14 bp, or Nearest-Neighbor approximation for >= 14 bp:
  // Tm = 64.9 + 41 * (yG + zC - 16.4) / (wA + xT + yG + zC)
  let tm = 0;
  if (len > 0) {
    if (len < 14) {
      tm = (countA + countT) * 2 + (countG + countC) * 4;
    } else {
      tm = Math.round((64.9 + 41 * (gcCount - 16.4) / len) * 10) / 10;
    }
  }

  const ta = Math.round((tm - 5) * 10) / 10; // Rule of thumb: Ta = Tm - 5°C

  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <Box sx={{ p: 1, bgcolor: '#F0FDF4', borderRadius: 2, color: '#10B981', display: 'flex' }}>
          <BiotechIcon />
        </Box>
        <div>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A' }}>
            DNA / RNA Primer Melting Temperature ($T_m$) Calculator
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B' }}>
            Analyze oligonucleotide GC content (%), length, and recommended PCR annealing temperature ($T_a$).
          </Typography>
        </div>
      </Box>

      <TextField
        label="Oligo Nucleotide Sequence (5' → 3')"
        multiline
        rows={2}
        fullWidth
        value={sequence}
        onChange={(e) => setSequence(e.target.value)}
        placeholder="Enter 5' to 3' nucleotide sequence (e.g. ATGCGATCGG...)"
        sx={{
          mb: 3,
          mt: 2,
          '& .MuiInputBase-input': {
            fontFamily: 'var(--font-mono)',
            letterSpacing: '1px',
            fontWeight: 600,
          },
        }}
      />

      {/* Metrics Row */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
          gap: 2,
          mb: 4,
        }}
      >
        <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0', textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Length</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A' }}>{len} bp</Typography>
        </Box>
        <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0', textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>GC Content</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F766E' }}>{gcPercent}%</Typography>
        </Box>
        <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0', textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Melting Temp (Tm)</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1E40AF' }}>{tm} °C</Typography>
        </Box>
        <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0', textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Recommended Ta</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#10B981' }}>{ta} °C</Typography>
        </Box>
      </Box>

      {/* Nucleotide Breakdown Chips */}
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        <Chip label={`Adenine (A): ${countA}`} sx={{ bgcolor: '#ECFDF5', color: '#065F46', fontWeight: 600 }} />
        <Chip label={`Thymine/Uracil (T/U): ${countT}`} sx={{ bgcolor: '#FEF2F2', color: '#991B1B', fontWeight: 600 }} />
        <Chip label={`Cytosine (C): ${countC}`} sx={{ bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 600 }} />
        <Chip label={`Guanine (G): ${countG}`} sx={{ bgcolor: '#FFFBEB', color: '#92400E', fontWeight: 600 }} />
      </Box>
    </Paper>
  );
};
