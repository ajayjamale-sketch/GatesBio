import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Slider, Chip } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface HomeRoiSectionProps {
  onOpenDemo: () => void;
  onNavigatePricing: () => void;
}

export const HomeRoiSection: React.FC<HomeRoiSectionProps> = ({
  onOpenDemo,
  onNavigatePricing,
}) => {
  const [teamSize, setTeamSize] = useState<number>(14);

  // Growth tier pricing: $199/user/month billed annually
  const monthlyCost = teamSize * 199;
  // An average researcher spends ~6.5 hours/week on manual sample logging, protocol copying, and audit paperwork
  const hoursSavedWeekly = Math.round(teamSize * 6.5);
  // Estimated economic value saved annually (assuming $65/hr fully loaded research labor rate)
  const annualSavingsValue = Math.round(hoursSavedWeekly * 50 * 65);

  return (
    <Box sx={{ my: 12 }}>
      {/* ROI Calculator Card */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3.5, md: 6 },
          borderRadius: 4,
          border: '1px solid #E2E8F0',
          bgcolor: '#FFFFFF',
          mb: 6,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Chip
            icon={<CalculateIcon sx={{ color: '#1E40AF !important' }} />}
            label="Interactive Laboratory ROI Estimator"
            sx={{ bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 700, mb: 2 }}
          />
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mt: 1 }}>
            Calculate What Your Biotech Saves with GatsBio
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 640, mx: 'auto', mt: 1.5 }}>
            Adjust your active research headcount to model operational time reclaimed from manual paper documentation,
            freezer searches, and audit prep.
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.2fr 1fr' }, gap: 5, alignItems: 'center' }}>
          {/* Slider Control */}
          <Box sx={{ p: 4, bgcolor: '#F8FAFC', borderRadius: 3, border: '1px solid #E2E8F0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A' }}>
                Active Research Scientists & Technicians
              </Typography>
              <Chip
                label={`${teamSize} Researchers`}
                sx={{ bgcolor: '#1E40AF', color: '#FFFFFF', fontWeight: 800, fontSize: '14px', py: 0.5 }}
              />
            </Box>

            <Slider
              value={teamSize}
              min={2}
              max={60}
              step={1}
              onChange={(_, val) => setTeamSize(val as number)}
              sx={{
                color: '#1E40AF',
                height: 8,
                '& .MuiSlider-thumb': {
                  width: 22,
                  height: 22,
                  bgcolor: '#FFFFFF',
                  border: '3px solid #1E40AF',
                },
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>2 Scientists</Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>30 Team</Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>60+ Enterprise</Typography>
            </Box>

            <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 3, pt: 2, borderTop: '1px solid #E2E8F0' }}>
              Includes full LIMS, 96/384-well plate visualizer, cryogenic freezer hierarchy, and 21 CFR Part 11 audit trails.
            </Typography>
          </Box>

          {/* Metrics Outcome Cards */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2 }}>
            <Box
              sx={{
                p: 2.5,
                bgcolor: '#F0FDF4',
                borderRadius: 2.5,
                border: '1px solid #BBF7D0',
                display: 'flex',
                alignItems: 'center',
                gap: 2.5,
              }}
            >
              <Box sx={{ p: 1.5, bgcolor: '#FFFFFF', borderRadius: 2, color: '#10B981', display: 'flex' }}>
                <AccessTimeIcon sx={{ fontSize: 28 }} />
              </Box>
              <div>
                <Typography variant="caption" sx={{ color: '#166534', fontWeight: 700, textTransform: 'uppercase' }}>
                  Labor Time Reclaimed
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 900, color: '#14532D' }}>
                  ~{hoursSavedWeekly} Hours / Week
                </Typography>
                <Typography variant="caption" sx={{ color: '#15803D' }}>
                  Redirected into experimental design & lead optimization
                </Typography>
              </div>
            </Box>

            <Box
              sx={{
                p: 2.5,
                bgcolor: '#EFF6FF',
                borderRadius: 2.5,
                border: '1px solid #BFDBFE',
                display: 'flex',
                alignItems: 'center',
                gap: 2.5,
              }}
            >
              <Box sx={{ p: 1.5, bgcolor: '#FFFFFF', borderRadius: 2, color: '#1E40AF', display: 'flex' }}>
                <TrendingUpIcon sx={{ fontSize: 28 }} />
              </Box>
              <div>
                <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 700, textTransform: 'uppercase' }}>
                  Est. Annual Research Value
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 900, color: '#1E3A8A' }}>
                  ${annualSavingsValue.toLocaleString()} / Year
                </Typography>
                <Typography variant="caption" sx={{ color: '#1D4ED8' }}>
                  Based on benchmark $65/hr biopharma researcher rate
                </Typography>
              </div>
            </Box>

            <Box
              sx={{
                p: 2.5,
                bgcolor: '#F8FAFC',
                borderRadius: 2.5,
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: 2.5,
              }}
            >
              <Box sx={{ p: 1.5, bgcolor: '#FFFFFF', borderRadius: 2, color: '#0F766E', display: 'flex' }}>
                <AttachMoneyIcon sx={{ fontSize: 28 }} />
              </Box>
              <div>
                <Typography variant="caption" sx={{ color: '#0F766E', fontWeight: 700, textTransform: 'uppercase' }}>
                  Total SaaS Investment
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  ${monthlyCost.toLocaleString()} / Month
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  Billed annually ($199/user/mo Growth Biotech Plan)
                </Typography>
              </div>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Closing High-Contrast CTA Banner */}
      <Box
        sx={{
          p: { xs: 4, md: 8 },
          borderRadius: 4,
          bgcolor: '#1E40AF',
          background: 'linear-gradient(135deg, #1E40AF 0%, #0F766E 100%)',
          color: '#FFFFFF',
          textAlign: 'center',
          boxShadow: '0 25px 50px -12px rgba(30, 64, 175, 0.35)',
        }}
      >
        <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: '1.5px', color: '#93C5FD', display: 'block', mb: 1 }}>
          JOIN THE REVOLUTION IN LIFE SCIENCES
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: '26px', md: '40px' } }}>
          Ready to Modernize Your Laboratory Operations?
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 640, mx: 'auto', mb: 5, color: '#E0E7FF', fontSize: '18px', lineHeight: 1.6 }}>
          Experience how GatsBio connects your samples, protocols, bioinformatics, and 21 CFR Part 11 audit trails into one
          unified digital ecosystem.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2.5, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            onClick={onOpenDemo}
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: '#FFFFFF',
              color: '#1E40AF',
              fontWeight: 800,
              fontSize: '16px',
              px: 4,
              py: 1.6,
              borderRadius: 2.5,
              '&:hover': { bgcolor: '#F8FAFC' },
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
            }}
          >
            Book a Guided Scientific Demo
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={onNavigatePricing}
            sx={{
              borderColor: '#93C5FD',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '16px',
              px: 3.5,
              py: 1.6,
              borderRadius: 2.5,
              '&:hover': { borderColor: '#FFFFFF', bgcolor: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            Compare All Plans
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
