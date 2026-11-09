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
  const [teamSize, setTeamSize] = useState<number>(15);

  // Growth plan benchmark: $199/user/month
  const monthlyCost = teamSize * 199;
  // An average researcher spends ~6.5 hours/week on manual paperwork and freezer searches
  const hoursSavedWeekly = Math.round(teamSize * 6.5);
  // Estimated economic value saved annually ($65/hr fully loaded research labor rate)
  const annualSavingsValue = Math.round(hoursSavedWeekly * 50 * 65);

  return (
    <Box sx={{ my: { xs: 6, md: 10 } }}>
      {/* Section Header */}
      <Box sx={{ textAlign: 'center', mb: { xs: 3.5, md: 5 } }}>
        <Typography
          variant="caption"
          sx={{
            color: '#1E40AF',
            fontWeight: 800,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontSize: '11px',
            display: 'block',
            mb: 1,
          }}
        >
          Return on Investment
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
          Calculate Your Lab's Time & Cost Savings
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#64748B',
            maxWidth: 600,
            mx: 'auto',
            fontSize: { xs: '13.5px', sm: '15px' },
            lineHeight: 1.55,
          }}
        >
          Model the operational hours and budget reclaimed by replacing manual paper records and spreadsheets with GatsBio.
        </Typography>
      </Box>

      {/* ROI Calculator Card */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3.5, md: 5 },
          borderRadius: 3.5,
          border: '1px solid #E2E8F0',
          bgcolor: '#FFFFFF',
          mb: { xs: 5, md: 6 },
          boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.15fr 1fr' },
            gap: { xs: 3.5, md: 5 },
            alignItems: 'center',
          }}
        >
          {/* Slider Control Panel */}
          <Box
            sx={{
              p: { xs: 2.5, sm: 3.5 },
              bgcolor: '#F8FAFC',
              borderRadius: 3,
              border: '1px solid #E2E8F0',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2.5,
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              <Typography sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '14.5px', sm: '16px' } }}>
                Active Lab Team Size
              </Typography>
              <Chip
                icon={<CalculateIcon sx={{ fontSize: '15px !important', color: '#FFFFFF !important' }} />}
                label={`${teamSize} Researchers`}
                sx={{
                  bgcolor: '#1E40AF',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '12px',
                  height: 28,
                }}
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
                '& .MuiSlider-track': {
                  bgcolor: '#1E40AF',
                },
                '& .MuiSlider-rail': {
                  bgcolor: '#E2E8F0',
                  opacity: 1,
                },
                '& .MuiSlider-thumb': {
                  width: 22,
                  height: 22,
                  bgcolor: '#FFFFFF',
                  border: '3px solid #1E40AF',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: '0 0 0 6px rgba(30, 64, 175, 0.16)',
                  },
                },
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, fontSize: '11px' }}>
                2 Scientists
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, fontSize: '11px' }}>
                30 Team
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, fontSize: '11px' }}>
                60+ Enterprise
              </Typography>
            </Box>

            {/* Quick Preset Buttons */}
            <Box sx={{ display: 'flex', gap: 1, mt: 3, pt: 2, borderTop: '1px solid #E2E8F0', flexWrap: 'wrap' }}>
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, alignSelf: 'center', mr: 0.5 }}>
                Presets:
              </Typography>
              {[5, 15, 30, 50].map((preset) => (
                <Button
                  key={preset}
                  size="small"
                  onClick={() => setTeamSize(preset)}
                  sx={{
                    py: 0.3,
                    px: 1.2,
                    fontSize: '11.5px',
                    fontWeight: 700,
                    borderRadius: 1.5,
                    color: teamSize === preset ? '#1E40AF' : '#64748B',
                    bgcolor: teamSize === preset ? '#EFF6FF' : '#FFFFFF',
                    border: '1px solid',
                    borderColor: teamSize === preset ? '#BFDBFE' : '#E2E8F0',
                    minWidth: 'auto',
                  }}
                >
                  {preset} Users
                </Button>
              ))}
            </Box>
          </Box>

          {/* Clean Metric Outcome Cards */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Metric 1 */}
            <Box
              sx={{
                p: 2.2,
                bgcolor: '#FFFFFF',
                borderRadius: 2.5,
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  bgcolor: '#EFF6FF',
                  color: '#1E40AF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <AccessTimeIcon sx={{ fontSize: 24 }} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, textTransform: 'uppercase', fontSize: '10.5px' }}>
                  Labor Time Reclaimed
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '18px', sm: '21px' }, lineHeight: 1.2 }}>
                  ~{hoursSavedWeekly} Hours / Week
                </Typography>
                <Typography variant="caption" sx={{ color: '#0F766E', fontWeight: 600, fontSize: '11px' }}>
                  Redirected into experimental execution & assay optimization
                </Typography>
              </Box>
            </Box>

            {/* Metric 2 */}
            <Box
              sx={{
                p: 2.2,
                bgcolor: '#FFFFFF',
                borderRadius: 2.5,
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  bgcolor: '#EFF6FF',
                  color: '#1E40AF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <TrendingUpIcon sx={{ fontSize: 24 }} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, textTransform: 'uppercase', fontSize: '10.5px' }}>
                  Est. Annual Research Value
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '18px', sm: '21px' }, lineHeight: 1.2 }}>
                  ${annualSavingsValue.toLocaleString()} / Year
                </Typography>
                <Typography variant="caption" sx={{ color: '#0F766E', fontWeight: 600, fontSize: '11px' }}>
                  Based on benchmark $65/hr life sciences labor rate
                </Typography>
              </Box>
            </Box>

            {/* Metric 3 */}
            <Box
              sx={{
                p: 2.2,
                bgcolor: '#FFFFFF',
                borderRadius: 2.5,
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  bgcolor: '#EFF6FF',
                  color: '#1E40AF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <AttachMoneyIcon sx={{ fontSize: 24 }} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, textTransform: 'uppercase', fontSize: '10.5px' }}>
                  Estimated Investment
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '18px', sm: '21px' }, lineHeight: 1.2 }}>
                  ${monthlyCost.toLocaleString()} / Month
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, fontSize: '11px' }}>
                  Growth Plan ($199/user/month, billed annually)
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Closing High-Contrast CTA Banner with Lab Image Background */}
      <Box
        sx={{
          p: { xs: 4, sm: 5.5, md: 7.5 },
          borderRadius: 3.5,
          bgcolor: '#0F172A',
          color: '#FFFFFF',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.45)',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: `
            linear-gradient(180deg, rgba(15, 23, 42, 0.50) 0%, rgba(15, 23, 42, 0.72) 100%),
            radial-gradient(ellipse at 50% 20%, rgba(30, 64, 175, 0.28) 0%, rgba(15, 23, 42, 0.6) 80%),
            url('/images/cta-lab-banner.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          backgroundRepeat: 'no-repeat',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, #1E40AF 0%, #10B981 50%, #1E40AF 100%)',
          },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            letterSpacing: '1px',
            color: '#93C5FD',
            display: 'block',
            mb: 1.2,
            textTransform: 'uppercase',
            fontSize: '11px',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
          }}
        >
          Get Started with GatsBio
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 1.5,
            fontSize: { xs: '22px', sm: '28px', md: '34px' },
            letterSpacing: '-0.02em',
            textShadow: '0 3px 14px rgba(0, 0, 0, 0.9)',
          }}
        >
          Ready to Modernize Your Laboratory?
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: 580,
            mx: 'auto',
            mb: 4,
            color: '#E2E8F0',
            fontSize: { xs: '13.5px', sm: '15px' },
            lineHeight: 1.55,
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.85)',
          }}
        >
          Connect your samples, protocols, literature intelligence, and compliance audit trails into one unified operating system.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            onClick={onOpenDemo}
            endIcon={<ArrowForwardIcon sx={{ fontSize: '15px !important' }} />}
            sx={{
              bgcolor: '#1E40AF',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '13.5px',
              px: { xs: 3, sm: 3.5 },
              py: 1.1,
              borderRadius: 2,
              '&:hover': { bgcolor: '#1D4ED8' },
              boxShadow: '0 4px 12px rgba(30, 64, 175, 0.4)',
              whiteSpace: 'nowrap',
            }}
          >
            Schedule a Guided Demo
          </Button>

          <Button
            variant="outlined"
            onClick={onNavigatePricing}
            sx={{
              borderColor: '#334155',
              color: '#F8FAFC',
              fontWeight: 700,
              fontSize: '13.5px',
              px: { xs: 2.5, sm: 3 },
              py: 1.1,
              borderRadius: 2,
              '&:hover': { borderColor: '#64748B', bgcolor: 'rgba(255, 255, 255, 0.05)' },
              whiteSpace: 'nowrap',
            }}
          >
            Compare Plans
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
