import React, { useState } from 'react';
import { Box, Typography, Paper, Chip, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BiotechIcon from '@mui/icons-material/Biotech';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import MedicationIcon from '@mui/icons-material/Medication';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { PERSONA_WORKFLOWS } from '../../../data/platformModulesData';

interface PlatformPersonaFlowsProps {
  onOpenDemo: () => void;
}

const ROLE_ICONS: Record<string, React.ReactNode> = {
  scientist: <BiotechIcon fontSize="small" />,
  'lab-tech': <QrCodeScannerIcon fontSize="small" />,
  'clinical-coord': <MedicationIcon fontSize="small" />,
  'biotech-admin': <AnalyticsIcon fontSize="small" />,
  'qa-officer': <FactCheckIcon fontSize="small" />,
  'sys-admin': <AdminPanelSettingsIcon fontSize="small" />,
};

export const PlatformPersonaFlows: React.FC<PlatformPersonaFlowsProps> = ({
  onOpenDemo,
}) => {
  const [selectedId, setSelectedId] = useState<string>(PERSONA_WORKFLOWS[0].id);

  const activeWorkflow =
    PERSONA_WORKFLOWS.find((w) => w.id === selectedId) || PERSONA_WORKFLOWS[0];

  return (
    <Box
      id="persona-workflows"
      sx={{
        py: { xs: 7, md: 9 },
        bgcolor: '#F8FAFC',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      <Box className="container-custom">
        <Box sx={{ textAlign: 'center', maxWidth: 740, mx: 'auto', mb: 5 }}>
          <Chip
            label="End-to-End Role Workflows"
            sx={{
              bgcolor: '#ECFDF5',
              color: '#0F766E',
              fontWeight: 700,
              mb: 1.5,
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: '#0F172A',
              fontSize: { xs: '26px', md: '36px' },
              mb: 1.5,
            }}
          >
            Engineered for Every Role in the Life Sciences Ecosystem
          </Typography>
          <Typography variant="body1" sx={{ color: '#475569' }}>
            Explore how each specialist interacts seamlessly within the same unified data environment without switching disconnected tools.
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
          {PERSONA_WORKFLOWS.map((persona) => {
            const isSelected = persona.id === selectedId;
            return (
              <Button
                key={persona.id}
                onClick={() => setSelectedId(persona.id)}
                startIcon={ROLE_ICONS[persona.id]}
                variant={isSelected ? 'contained' : 'outlined'}
                sx={{
                  bgcolor: isSelected ? '#1E40AF' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#334155',
                  borderColor: isSelected ? '#1E40AF' : '#CBD5E1',
                  fontWeight: 700,
                  px: 2.2,
                  py: 1,
                  borderRadius: 2.5,
                  '&:hover': {
                    bgcolor: isSelected ? '#1E3A8A' : '#EFF6FF',
                    borderColor: '#1E40AF',
                  },
                }}
              >
                {persona.role}
              </Button>
            );
          })}
        </Box>

        {/* Active Workflow Panel */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4.5 },
            borderRadius: 4,
            border: '1px solid #E2E8F0',
            bgcolor: '#FFFFFF',
            boxShadow: '0 8px 30px -12px rgba(15, 23, 42, 0.08)',
          }}
        >
          {/* Header Row */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              justifyContent: 'space-between',
              gap: 2,
              pb: 3,
              mb: 4,
              borderBottom: '1px solid #E2E8F0',
            }}
          >
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 0.75 }}>
                <Chip
                  size="small"
                  label={activeWorkflow.badge}
                  sx={{
                    bgcolor: '#EFF6FF',
                    color: '#1E40AF',
                    fontWeight: 700,
                    fontSize: '11px',
                  }}
                />
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                  {activeWorkflow.personaTitle}
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5 }}>
                {activeWorkflow.role} Operational Flow
              </Typography>
              <Typography variant="body2" sx={{ color: '#475569' }}>
                {activeWorkflow.summary}
              </Typography>
            </Box>

            <Button
              variant="outlined"
              onClick={onOpenDemo}
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderColor: '#1E40AF',
                color: '#1E40AF',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              Demo {activeWorkflow.role} View
            </Button>
          </Box>

          {/* 5-Step Flow Cards */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                lg: 'repeat(5, 1fr)',
              },
              gap: 2,
              mb: 4,
            }}
          >
            {activeWorkflow.steps.map((step) => (
              <Box
                key={step.stepNumber}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  bgcolor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      bgcolor: '#1E40AF',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {step.stepNumber}
                  </Box>
                  <Chip
                    size="small"
                    label={step.actionTag}
                    sx={{
                      height: 20,
                      fontSize: '10px',
                      fontWeight: 700,
                      bgcolor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      color: '#0F766E',
                    }}
                  />
                </Box>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 800, color: '#0F172A', mb: 0.75, fontSize: '14px' }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: '#475569', lineHeight: 1.5, fontSize: '12.5px' }}
                >
                  {step.description}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Outcome Banner */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2.5,
              bgcolor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <CheckCircleIcon sx={{ color: '#10B981', flexShrink: 0 }} />
            <Typography variant="body2" sx={{ color: '#065F46', fontWeight: 700 }}>
              Verified Platform Impact: {activeWorkflow.systemOutcome}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
