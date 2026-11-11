import React, { useState } from 'react';
import { Box, Typography, Paper, Chip, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BiotechIcon from '@mui/icons-material/Biotech';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import MedicationIcon from '@mui/icons-material/Medication';
import { ROLE_SOLUTIONS, type RoleSolution } from '../../../data/tailoredSolutionsData';

interface SolutionsRoleWorkflowsProps {
  onOpenDemo: () => void;
}

const ROLE_ICONS: Record<RoleSolution['id'], React.ReactNode> = {
  pi: <BiotechIcon fontSize="small" />,
  'lab-ops': <AnalyticsIcon fontSize="small" />,
  'qa-officer': <FactCheckIcon fontSize="small" />,
  'clinical-coord': <MedicationIcon fontSize="small" />,
};

export const SolutionsRoleWorkflows: React.FC<SolutionsRoleWorkflowsProps> = ({
  onOpenDemo,
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState<RoleSolution['id']>('pi');

  const activeRole =
    ROLE_SOLUTIONS.find((r) => r.id === selectedRoleId) || ROLE_SOLUTIONS[0];

  return (
    <Box
      id="role-solutions"
      sx={{
        py: { xs: 6, md: 9 },
        bgcolor: '#F8FAFC',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      <Box className="container-custom">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 740, mx: 'auto', mb: { xs: 3.5, md: 5 } }}>
          <Chip
            label="Solutions By Role"
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
            Designed for Every Specialist in Your Lab
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#475569', fontSize: { xs: '14.5px', md: '16px' }, lineHeight: 1.6 }}
          >
            Each team member gets dedicated controls, permissions, and automated handoffs without switching between disconnected point tools.
          </Typography>
        </Box>

        {/* Role Selector Buttons */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 1.25,
            mb: 4,
          }}
        >
          {ROLE_SOLUTIONS.map((role) => {
            const isSelected = role.id === activeRole.id;
            return (
              <Button
                key={role.id}
                onClick={() => setSelectedRoleId(role.id)}
                startIcon={ROLE_ICONS[role.id]}
                variant={isSelected ? 'contained' : 'outlined'}
                sx={{
                  bgcolor: isSelected ? '#1E40AF' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#334155',
                  borderColor: isSelected ? '#1E40AF' : '#CBD5E1',
                  fontWeight: 700,
                  px: { xs: 2, sm: 2.5 },
                  py: 1,
                  borderRadius: 2.5,
                  fontSize: { xs: '12.5px', sm: '13.5px' },
                  '&:hover': {
                    bgcolor: isSelected ? '#1E3A8A' : '#EFF6FF',
                    borderColor: '#1E40AF',
                  },
                }}
              >
                {role.shortLabel}
              </Button>
            );
          })}
        </Box>

        {/* Active Role Workflow Showcase */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            border: '1px solid #E2E8F0',
            bgcolor: '#FFFFFF',
            overflow: 'hidden',
            boxShadow: '0 8px 24px -10px rgba(15, 23, 42, 0.06)',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.2fr 1fr' },
          }}
        >
          {/* Left: Workflow Steps & Outcomes */}
          <Box sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.5 }}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: 2,
                  bgcolor: '#EFF6FF',
                  color: activeRole.accentColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {ROLE_ICONS[activeRole.id]}
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '20px', md: '24px' } }}>
                {activeRole.roleTitle}
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ color: '#475569', mb: 2.5, fontSize: '14.5px', lineHeight: 1.6 }}>
              {activeRole.subtitle}
            </Typography>

            <Box
              sx={{
                p: 1.75,
                borderRadius: 2.5,
                bgcolor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                mb: 3,
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Legacy Friction Solved
              </Typography>
              <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600, mt: 0.4 }}>
                {activeRole.legacyChallenge}
              </Typography>
            </Box>

            {/* 3-Step Daily Flow */}
            <Typography
              variant="caption"
              sx={{
                color: '#0F172A',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                display: 'block',
                mb: 1.5,
              }}
            >
              End-to-End Daily Workflow
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
              {activeRole.workflowSteps.map((step, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.5,
                    p: 1.5,
                    borderRadius: 2.5,
                    bgcolor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: activeRole.accentColor,
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      mt: '1px',
                    }}
                  >
                    {idx + 1}
                  </Box>
                  <Typography variant="body2" sx={{ color: '#1E293B', fontWeight: 600, lineHeight: 1.5 }}>
                    {step}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Outcomes + Module Chips */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2.5 }}>
              {activeRole.outcomes.map((outcome, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon sx={{ color: '#10B981', fontSize: 18, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600 }}>
                    {outcome}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
              {activeRole.moduleTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    bgcolor: '#EFF6FF',
                    color: '#1E40AF',
                    fontWeight: 700,
                    fontSize: '11.5px',
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Right: Cross-Functional Team Photo + KPI Card */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderLeft: { xs: 'none', lg: '1px solid #E2E8F0' },
              borderTop: { xs: '1px solid #E2E8F0', lg: 'none' },
              bgcolor: '#F8FAFC',
            }}
          >
            <Box sx={{ position: 'relative', height: { xs: 230, sm: 280, lg: 300 }, overflow: 'hidden' }}>
              <Box
                component="img"
                src="/images/solutions-role-workflow.jpg"
                alt="Principal investigator, lab operations director, and QA officer collaborating at laboratory monitors"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center center',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(15, 23, 42, 0.72) 0%, rgba(15, 23, 42, 0.08) 65%)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  left: 20,
                  right: 20,
                  color: '#FFFFFF',
                }}
              >
                <Typography variant="caption" sx={{ color: '#93C5FD', fontWeight: 800, letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                  Unified Role Workspace
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                  Real-time handoffs from benchtop capture to QA sign-off
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                p: { xs: 3, md: 4 },
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 2.5,
              }}
            >
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  bgcolor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                }}
              >
                <Typography
                  variant="overline"
                  sx={{ color: '#0F766E', fontWeight: 800, letterSpacing: '0.8px' }}
                >
                  Verified Role Outcome
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 900, color: '#0F172A', fontSize: { xs: '30px', md: '36px' }, my: 0.5 }}
                >
                  {activeRole.primaryMetric}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 600 }}>
                  {activeRole.metricLabel}
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={onOpenDemo}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: '#1E40AF',
                  '&:hover': { bgcolor: '#1E3A8A' },
                  py: 1.35,
                  borderRadius: 2,
                  fontWeight: 700,
                }}
              >
                See {activeRole.shortLabel} Workflow Live
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
