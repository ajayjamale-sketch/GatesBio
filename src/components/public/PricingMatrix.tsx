import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import { PRICING_PLANS } from '../../data/mockData';
import type { PricingPlan } from '../../types';

interface PricingMatrixProps {
  onOpenDemo: () => void;
  onSelectPlan?: (plan: PricingPlan, annualBilling: boolean, seats: number) => void;
  isLoggedIn?: boolean;
}

export const PricingMatrix: React.FC<PricingMatrixProps> = ({
  onOpenDemo,
  onSelectPlan,
  isLoggedIn = false,
}) => {
  const [annualBilling, setAnnualBilling] = useState(true);
  const [teamSize, setTeamSize] = useState<number>(12);

  const calculateMonthlyCost = () => {
    // Based on Growth tier ($199 annual vs $249 monthly)
    const perSeat = annualBilling ? 199 : 249;
    return teamSize * perSeat;
  };

  const hoursSaved = Math.round(teamSize * 6.5); // ~6.5 hours saved per researcher/week

  const faqs = [
    {
      q: 'Is GatsBio validated for FDA 21 CFR Part 11 and GxP environments?',
      a: 'Yes. GatsBio includes cryptographic dual-factor electronic signatures, automated system-generated audit trails, reason-for-change logging, and automated account lockout policies meeting FDA 21 CFR Part 11 and EU Annex 11 requirements.',
    },
    {
      q: 'Can we migrate historical data from Benchling, LabGuru, or Excel?',
      a: 'Absolutely. GatsBio provides automated CSV/JSON bulk accessioning importers with automatic specimen schema mapping. Our scientific solutions engineering team assists with enterprise dataset migrations.',
    },
    {
      q: 'How does GatsBio integrate with automated liquid handlers (Tecan, Hamilton)?',
      a: 'GatsBio exports standard well-coordinate instructions (CSV, XML, JSON) and provides REST and Webhook APIs that interface directly with robotic pipetting stations and LIMS middleware.',
    },
    {
      q: 'Do you offer on-premises or private cloud (VPC) deployments?',
      a: 'Yes. Our Enterprise Biopharma plan supports single-tenant VPC deployments in AWS, Azure, or Google Cloud, as well as air-gapped on-premises installations with Bring-Your-Own-Key (BYOK) encryption.',
    },
  ];

  return (
    <Box sx={{ my: 8 }}>
      {/* Header & Annual Toggle */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="overline" sx={{ color: '#1E40AF', fontWeight: 700, letterSpacing: '1px' }}>
          Transparent Enterprise Biotech Pricing
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mt: 1 }}>
          Predictable Plans Designed to Scale with Your Science
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 640, mx: 'auto', mt: 1.5, mb: 4 }}>
          No hidden fees. Every plan includes core LIMS, protocol templating, and secure cloud storage.
        </Typography>

        {/* Billing Switcher */}
        <Box sx={{ display: 'inline-flex', alignItems: 'center', p: 0.6, bgcolor: '#F1F5F9', borderRadius: 3, border: '1px solid #CBD5E1' }}>
          <Button
            size="small"
            onClick={() => setAnnualBilling(false)}
            sx={{
              px: 2.5,
              py: 0.8,
              borderRadius: 2.5,
              fontWeight: 700,
              bgcolor: !annualBilling ? '#FFFFFF' : 'transparent',
              color: !annualBilling ? '#1E40AF' : '#64748B',
              boxShadow: !annualBilling ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
            }}
          >
            Monthly Billing
          </Button>
          <Button
            size="small"
            onClick={() => setAnnualBilling(true)}
            sx={{
              px: 2.5,
              py: 0.8,
              borderRadius: 2.5,
              fontWeight: 700,
              bgcolor: annualBilling ? '#FFFFFF' : 'transparent',
              color: annualBilling ? '#1E40AF' : '#64748B',
              boxShadow: annualBilling ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
              display: 'flex',
              gap: 1,
            }}
          >
            <span>Annual Billing</span>
            <Chip size="small" label="Save 20%" sx={{ bgcolor: '#ECFDF5', color: '#065F46', fontWeight: 700, height: 20 }} />
          </Button>
        </Box>
      </Box>

      {/* Pricing Cards Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' },
          gap: 3.5,
          alignItems: 'stretch',
          mb: 8,
        }}
      >
        {PRICING_PLANS.map((plan) => {
          const price = annualBilling ? plan.annualPrice : plan.monthlyPrice;
          return (
            <Paper
              key={plan.id}
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3.5,
                border: plan.popular ? '2px solid #1E40AF' : '1px solid #E2E8F0',
                bgcolor: '#FFFFFF',
                boxShadow: plan.popular ? '0 20px 25px -5px rgba(30, 64, 175, 0.1)' : 'none',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {plan.badge && (
                  <Chip
                    icon={plan.popular ? <StarIcon sx={{ fontSize: '14px !important', color: '#FFFFFF !important' }} /> : undefined}
                    label={plan.badge}
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      bgcolor: plan.popular ? '#1E40AF' : '#F1F5F9',
                      color: plan.popular ? '#FFFFFF' : '#334155',
                      fontWeight: 700,
                      fontSize: '11px',
                    }}
                  />
                )}

                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
                  {plan.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B', minHeight: 40, mb: 3 }}>
                  {plan.tagline}
                </Typography>

                {/* Price Display */}
                <Box sx={{ mb: 4, pb: 3, borderBottom: '1px solid #F1F5F9' }}>
                  {price > 0 ? (
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                      <Typography variant="h3" sx={{ fontWeight: 900, color: '#0F172A' }}>
                        ${price}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 600 }}>
                        / user / month
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#0F172A' }}>
                      Custom
                    </Typography>
                  )}
                  <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                    {price > 0 ? (annualBilling ? 'Billed annually' : 'Billed monthly') : 'Tailored infrastructure & SLA'}
                  </Typography>
                </Box>

                {/* Feature List */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.6, mb: 4 }}>
                  {plan.features.map((feat, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                      <CheckCircleIcon sx={{ color: '#10B981', fontSize: 18, mt: '2px' }} />
                      <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.4 }}>
                        {feat}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </div>

              <Box>
                <Button
                  variant={plan.popular ? 'contained' : 'outlined'}
                  onClick={() => (onSelectPlan ? onSelectPlan(plan, annualBilling, teamSize) : onOpenDemo())}
                  fullWidth
                  size="large"
                  sx={{
                    py: 1.4,
                    fontWeight: 700,
                    borderRadius: '6px',
                    bgcolor: plan.popular ? '#1E40AF' : 'transparent',
                    borderColor: plan.popular ? '#1E40AF' : '#CBD5E1',
                    color: plan.popular ? '#FFFFFF' : '#0F172A',
                    '&:hover': {
                      bgcolor: plan.popular ? '#1E3A8A' : '#F8FAFC',
                      borderColor: '#1E40AF',
                    },
                  }}
                >
                  {isLoggedIn ? `Proceed with ${plan.name}` : plan.ctaText}
                </Button>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    textAlign: 'center',
                    mt: 1,
                    color: isLoggedIn ? '#1E40AF' : '#64748B',
                    fontWeight: 600,
                    fontSize: '11.5px',
                  }}
                >
                  {isLoggedIn ? 'Instant billing checkout enabled' : 'Sign in required to proceed to payment'}
                </Typography>
              </Box>
            </Paper>
          );
        })}
      </Box>

      {/* Interactive Seat & ROI Estimator */}
      <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3.5, border: '1px solid #E2E8F0', bgcolor: '#F8FAFC', mb: 8 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
          Interactive Lab ROI & Team Investment Calculator
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748B', mb: 4 }}>
          Adjust your active research team headcount to estimate monthly expenditure and operational time saved.
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.5fr 1fr' }, gap: 4, alignItems: 'center' }}>
          <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#334155' }}>
                Active Research Scientists & Lab Technicians
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1E40AF' }}>
                {teamSize} Users
              </Typography>
            </Box>
            <Slider
              value={teamSize}
              min={2}
              max={60}
              step={1}
              onChange={(_, val) => setTeamSize(val as number)}
              sx={{ color: '#1E40AF', mb: 2 }}
            />
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              Includes full LIMS, 96/384-well plate visualizer, freezer hierarchy, and 21 CFR Part 11 audit trails.
            </Typography>
          </div>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', borderRadius: 2.5, border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Estimated Investment</Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#1E40AF', my: 0.5 }}>
                ${calculateMonthlyCost().toLocaleString()}
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>/ month total</Typography>
            </Box>
            <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', borderRadius: 2.5, border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Hours Reclaimed</Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#10B981', my: 0.5 }}>
                ~{hoursSaved} hrs
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>saved per week</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Frequently Asked Questions */}
      <Box sx={{ maxWidth: 840, mx: 'auto' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', textAlign: 'center', mb: 4 }}>
          Frequently Asked Questions
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {faqs.map((faq, i) => (
            <Accordion key={i} elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '12px !important', '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A' }}>
                  {faq.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.6 }}>
                  {faq.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
