import React, { useState } from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import BiotechIcon from '@mui/icons-material/Biotech';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { SerialDilutionCalc } from '../calculators/SerialDilutionCalc';
import { DnaTmCalculator } from '../calculators/DnaTmCalculator';

interface ResourcesCalculatorsHubProps {
  onOpenToolsPage?: () => void;
}

export const ResourcesCalculatorsHub: React.FC<ResourcesCalculatorsHubProps> = ({
  onOpenToolsPage,
}) => {
  const [activeTab, setActiveTab] = useState<'dilution' | 'tm'>('dilution');

  return (
    <Box
      id="resources-calculators"
      sx={{
        py: { xs: 6, md: 9 },
        bgcolor: '#F8FAFC',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      <Box className="container-custom">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 740, mx: 'auto', mb: { xs: 3.5, md: 4.5 } }}>
          <Chip
            icon={<CalculateIcon sx={{ color: '#0F766E !important', fontSize: 16 }} />}
            label="Free Benchtop Utilities"
            size="small"
            sx={{
              bgcolor: '#ECFDF5',
              color: '#0F766E',
              fontWeight: 800,
              fontSize: '11px',
              mb: 1.5,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: '#0F172A',
              fontSize: { xs: '24px', sm: '30px', md: '36px' },
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              mb: 1.25,
            }}
          >
            Interactive Scientific Lab Calculators
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#475569', fontSize: { xs: '14.5px', md: '16px' }, lineHeight: 1.6 }}
          >
            Calculate 8-well serial dilution gradients and primer annealing temperatures right from your browser—the same calculation engine built into GatsBio’s ELN.
          </Typography>
        </Box>

        {/* Tab Switcher */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 1.5,
            mb: 4,
          }}
        >
          <Button
            variant={activeTab === 'dilution' ? 'contained' : 'outlined'}
            onClick={() => setActiveTab('dilution')}
            startIcon={<CalculateIcon />}
            sx={{
              bgcolor: activeTab === 'dilution' ? '#1E40AF' : '#FFFFFF',
              borderColor: activeTab === 'dilution' ? '#1E40AF' : '#CBD5E1',
              color: activeTab === 'dilution' ? '#FFFFFF' : '#334155',
              fontWeight: 700,
              px: { xs: 2.25, sm: 3 },
              py: 1.1,
              borderRadius: 2.5,
              '&:hover': {
                bgcolor: activeTab === 'dilution' ? '#1E3A8A' : '#EFF6FF',
                borderColor: '#1E40AF',
              },
            }}
          >
            Serial Dilution Calculator
          </Button>
          <Button
            variant={activeTab === 'tm' ? 'contained' : 'outlined'}
            onClick={() => setActiveTab('tm')}
            startIcon={<BiotechIcon />}
            sx={{
              bgcolor: activeTab === 'tm' ? '#0F766E' : '#FFFFFF',
              borderColor: activeTab === 'tm' ? '#0F766E' : '#CBD5E1',
              color: activeTab === 'tm' ? '#FFFFFF' : '#334155',
              fontWeight: 700,
              px: { xs: 2.25, sm: 3 },
              py: 1.1,
              borderRadius: 2.5,
              '&:hover': {
                bgcolor: activeTab === 'tm' ? '#115E59' : '#F0FDFA',
                borderColor: '#0F766E',
              },
            }}
          >
            DNA / RNA Tm Calculator
          </Button>
        </Box>

        {/* Interactive Calculator Container */}
        <Box sx={{ maxWidth: 960, mx: 'auto' }}>
          {activeTab === 'dilution' ? <SerialDilutionCalc /> : <DnaTmCalculator />}
        </Box>

        {onOpenToolsPage && (
          <Box sx={{ textAlign: 'center', mt: 3.5 }}>
            <Button
              size="small"
              onClick={onOpenToolsPage}
              endIcon={<ArrowForwardIcon sx={{ fontSize: '15px !important' }} />}
              sx={{ color: '#1E40AF', fontWeight: 700 }}
            >
              Open Fullscreen Calculators Suite
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
