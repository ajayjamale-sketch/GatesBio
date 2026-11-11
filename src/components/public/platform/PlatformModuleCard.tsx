import React from 'react';
import { Box, Typography, Paper, Chip, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { PlatformModule } from '../../../data/platformModulesData';

interface PlatformModuleCardProps {
  module: PlatformModule;
  accentColor: string;
  accentBg: string;
  icon: React.ReactNode;
  onExplore: (module: PlatformModule) => void;
}

export const PlatformModuleCard: React.FC<PlatformModuleCardProps> = ({
  module,
  accentColor,
  accentBg,
  icon,
  onExplore,
}) => {
  return (
    <Paper
      elevation={0}
      onClick={() => onExplore(module)}
      sx={{
        p: { xs: 2.5, sm: 3 },
        borderRadius: 3.5,
        border: '1px solid #E2E8F0',
        bgcolor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          borderColor: accentColor,
          boxShadow: '0 16px 36px -14px rgba(15, 23, 42, 0.14)',
        },
        '&:hover .explore-arrow': {
          transform: 'translateX(4px)',
        },
      }}
    >
      {/* Top Color Accent Strip */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          bgcolor: accentColor,
          opacity: 0.9,
        }}
      />

      <Box>
        {/* Card Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1.5,
            mb: 2,
            pt: 0.5,
          }}
        >
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: 2.5,
              bgcolor: accentBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.35, flexWrap: 'wrap' }}>
              <Typography
                variant="caption"
                sx={{
                  color: accentColor,
                  fontWeight: 800,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  fontSize: '11px',
                }}
              >
                Module {module.code}
              </Typography>
              {module.badge && (
                <Chip
                  size="small"
                  label={module.badge}
                  sx={{
                    bgcolor: accentBg,
                    color: accentColor,
                    fontWeight: 700,
                    fontSize: '10.5px',
                    height: 20,
                  }}
                />
              )}
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: '#0F172A',
                fontSize: { xs: '16.5px', sm: '18px' },
                lineHeight: 1.25,
              }}
            >
              {module.name}
            </Typography>
          </Box>
        </Box>

        {/* Plain-English Tagline & Summary */}
        <Typography
          variant="subtitle2"
          sx={{ color: '#0F766E', fontWeight: 700, mb: 0.75, fontSize: '13.5px' }}
        >
          {module.tagline}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#475569',
            lineHeight: 1.6,
            mb: 2.25,
            fontSize: '13.5px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {module.description}
        </Typography>

        {/* Scannable Capability Tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2.25 }}>
          {module.quickTags.map((tag) => (
            <Chip
              key={tag}
              size="small"
              label={tag}
              sx={{
                bgcolor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                color: '#334155',
                fontWeight: 600,
                fontSize: '11.5px',
                height: 25,
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Footer Strip: Impact Metric + Explore Action */}
      <Box
        sx={{
          pt: 1.5,
          borderTop: '1px dashed #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        {module.highlightMetric ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
            <TrendingUpIcon sx={{ fontSize: 16, color: '#10B981' }} />
            <Typography
              variant="caption"
              sx={{ color: '#065F46', fontWeight: 700, fontSize: '12px' }}
            >
              {module.highlightMetric}
            </Typography>
          </Box>
        ) : (
          <Box />
        )}

        <Button
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onExplore(module);
          }}
          endIcon={
            <ArrowForwardIcon
              className="explore-arrow"
              sx={{ fontSize: '15px !important', transition: 'transform 0.2s ease' }}
            />
          }
          sx={{
            color: accentColor,
            fontWeight: 700,
            fontSize: '12.5px',
            px: 1,
            py: 0.4,
            minWidth: 'auto',
            '&:hover': { bgcolor: accentBg },
          }}
        >
          Explore Details
        </Button>
      </Box>
    </Paper>
  );
};
