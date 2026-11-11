import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { PlatformModule, PlatformPillar } from '../../../data/platformModulesData';

interface PlatformModuleDrawerProps {
  module: PlatformModule | null;
  pillar: PlatformPillar | null;
  icon: React.ReactNode;
  onClose: () => void;
  onOpenDemo: () => void;
}

export const PlatformModuleDrawer: React.FC<PlatformModuleDrawerProps> = ({
  module,
  pillar,
  icon,
  onClose,
  onOpenDemo,
}) => {
  if (!module || !pillar) return null;

  return (
    <Drawer
      anchor="right"
      open={Boolean(module)}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: '100%', sm: 480, md: 520 },
            maxWidth: '100vw',
            bgcolor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
          },
        },
      }}
    >
      {/* Top Sticky Header */}
      <Box
        sx={{
          px: { xs: 2.5, sm: 3.5 },
          py: 2.25,
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          bgcolor: '#FFFFFF',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: pillar.bgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: pillar.color,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                display: 'block',
              }}
            >
              Module {module.code} • {pillar.shortTitle}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.25 }}>
              {module.name}
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={onClose}
          aria-label="Close module details"
          sx={{
            bgcolor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            '&:hover': { bgcolor: '#F1F5F9' },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Scrollable Body */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: { xs: 2.5, sm: 3.5 } }}>
        {/* Authentic Editorial Visual Header */}
        <Box
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid #E2E8F0',
            mb: 2.5,
            height: 170,
          }}
        >
          <Box
            component="img"
            src={pillar.imageUrl}
            alt={pillar.imageAlt}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </Box>

        {/* Tagline & Description */}
        <Box sx={{ mb: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
            {module.badge && (
              <Chip
                size="small"
                label={module.badge}
                sx={{
                  bgcolor: pillar.bgColor,
                  color: pillar.color,
                  fontWeight: 700,
                  fontSize: '11px',
                }}
              />
            )}
            {module.highlightMetric && (
              <Chip
                size="small"
                icon={<TrendingUpIcon sx={{ fontSize: '14px !important', color: '#065F46 !important' }} />}
                label={module.highlightMetric}
                sx={{
                  bgcolor: '#ECFDF5',
                  color: '#065F46',
                  fontWeight: 700,
                  fontSize: '11px',
                }}
              />
            )}
          </Box>

          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F766E', mb: 0.75 }}>
            {module.tagline}
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.65 }}>
            {module.description}
          </Typography>
        </Box>

        <Divider sx={{ my: 2.5 }} />

        {/* Complete Sub-Features */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              color: '#0F172A',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              mb: 1.5,
            }}
          >
            Core Capabilities ({module.subFeatures.length})
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.1 }}>
            {module.subFeatures.map((feat, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
                <CheckCircleIcon sx={{ color: '#10B981', fontSize: 18, mt: '2px', flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.5 }}>
                  {feat}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Team Actions */}
        <Box
          sx={{
            p: 2.25,
            borderRadius: 2.5,
            bgcolor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            mb: 2,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              color: '#1E40AF',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              mb: 1.25,
            }}
          >
            What Your Team Does
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {module.userActions.map((act, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <TouchAppIcon sx={{ color: '#1E40AF', fontSize: 17, mt: '2px', flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: '#334155', fontSize: '13.5px', lineHeight: 1.5 }}>
                  {act}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* System Automation */}
        <Box
          sx={{
            p: 2.25,
            borderRadius: 2.5,
            bgcolor: '#F0FDFA',
            border: '1px solid #CCFBF1',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              color: '#0F766E',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              mb: 1.25,
            }}
          >
            What GatsBio Automates
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {module.systemBehavior.map((sys, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <SettingsSuggestIcon sx={{ color: '#0F766E', fontSize: 17, mt: '2px', flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: '#334155', fontSize: '13.5px', lineHeight: 1.5 }}>
                  {sys}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Bottom Sticky CTA */}
      <Box
        sx={{
          p: { xs: 2, sm: 2.5 },
          borderTop: '1px solid #E2E8F0',
          bgcolor: '#FFFFFF',
        }}
      >
        <Button
          fullWidth
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIcon />}
          onClick={() => {
            onClose();
            onOpenDemo();
          }}
          sx={{
            bgcolor: '#1E40AF',
            fontWeight: 700,
            py: 1.35,
            borderRadius: 2.5,
            '&:hover': { bgcolor: '#1E3A8A' },
          }}
        >
          Schedule Walkthrough for Module {module.code}
        </Button>
      </Box>
    </Drawer>
  );
};
