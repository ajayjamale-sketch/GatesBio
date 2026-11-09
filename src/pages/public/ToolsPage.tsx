import React, { useState } from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import BiotechIcon from '@mui/icons-material/Biotech';
import { SerialDilutionCalc } from '../../components/public/calculators/SerialDilutionCalc';
import { DnaTmCalculator } from '../../components/public/calculators/DnaTmCalculator';

interface ToolsPageProps {
  onOpenDemo: () => void;
}

export const ToolsPage: React.FC<ToolsPageProps> = ({ onOpenDemo }) => {
  const [activeTab, setActiveTab] = useState<'dilution' | 'tm'>('dilution');

  return (
    <Box className="container-custom" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Chip
          icon={<CalculateIcon sx={{ color: '#1E40AF !important' }} />}
          label="Free Life Sciences Utilities"
          sx={{ bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 700, mb: 2 }}
        />
        <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
          Interactive Scientific Lab Calculators
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 640, mx: 'auto' }}>
          Free, browser-based calculators designed for molecular biologists, assay developers, and laboratory technicians.
        </Typography>
      </Box>

      {/* Tab Switcher */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 6 }}>
        <Button
          variant={activeTab === 'dilution' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('dilution')}
          startIcon={<CalculateIcon />}
          sx={{
            bgcolor: activeTab === 'dilution' ? '#1E40AF' : 'transparent',
            borderColor: activeTab === 'dilution' ? '#1E40AF' : '#CBD5E1',
            color: activeTab === 'dilution' ? '#FFFFFF' : '#334155',
            fontWeight: 700,
            px: 3,
            py: 1.2,
            borderRadius: 2.5,
          }}
        >
          Serial Dilution Calculator
        </Button>
        <Button
          variant={activeTab === 'tm' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('tm')}
          startIcon={<BiotechIcon />}
          sx={{
            bgcolor: activeTab === 'tm' ? '#0F766E' : 'transparent',
            borderColor: activeTab === 'tm' ? '#0F766E' : '#CBD5E1',
            color: activeTab === 'tm' ? '#FFFFFF' : '#334155',
            fontWeight: 700,
            px: 3,
            py: 1.2,
            borderRadius: 2.5,
          }}
        >
          DNA / RNA Tm Calculator
        </Button>
      </Box>

      {/* Active Calculator Display */}
      <Box sx={{ maxWidth: 960, mx: 'auto', mb: 8 }}>
        {activeTab === 'dilution' ? <SerialDilutionCalc /> : <DnaTmCalculator />}
      </Box>

      {/* Upsell Banner */}
      <Box
        sx={{
          p: 5,
          bgcolor: '#F8FAFC',
          borderRadius: 3.5,
          border: '1px solid #E2E8F0',
          textAlign: 'center',
          maxWidth: 800,
          mx: 'auto',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
          Automate Calculations Directly Inside Your Protocols
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 520, mx: 'auto', mb: 3 }}>
          GatsBio’s Electronic Lab Notebook automatically calculates serial dilutions, primer annealing parameters, and reagent volume master mixes as you execute assays.
        </Typography>
        <Button
          variant="contained"
          onClick={onOpenDemo}
          sx={{ bgcolor: '#1E40AF', px: 3.5, py: 1.2, fontWeight: 700, borderRadius: 2 }}
        >
          See GatsBio ELN Automation
        </Button>
      </Box>
    </Box>
  );
};
