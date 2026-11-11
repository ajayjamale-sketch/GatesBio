import React from 'react';
import { Box, Typography, Chip, Button } from '@mui/material';

interface DashboardSectionHeaderProps {
  title: string;
  subtitle?: string;
  moduleRef?: string;
  actionLabel?: string;
  actionIcon?: React.ReactNode;
  onAction?: () => void;
  rightSlot?: React.ReactNode;
}

export const DashboardSectionHeader: React.FC<DashboardSectionHeaderProps> = ({
  title,
  subtitle,
  moduleRef,
  actionLabel,
  actionIcon,
  onAction,
  rightSlot,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        gap: 1.5,
        mb: 2.5,
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '16.5px', md: '18px' } }}
          >
            {title}
          </Typography>
          {moduleRef && (
            <Chip
              label={`Spec ${moduleRef}`}
              size="small"
              sx={{
                height: 20,
                fontSize: '10.5px',
                fontWeight: 700,
                bgcolor: '#EFF6FF',
                color: '#1E40AF',
              }}
            />
          )}
        </Box>
        {subtitle && (
          <Typography variant="body2" sx={{ color: '#64748B', fontSize: '13px', mt: 0.25 }}>
            {subtitle}
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexWrap: 'wrap' }}>
        {rightSlot}
        {actionLabel && onAction && (
          <Button
            size="small"
            variant="contained"
            onClick={onAction}
            startIcon={actionIcon}
            sx={{
              bgcolor: '#1E40AF',
              '&:hover': { bgcolor: '#1E3A8A' },
              fontWeight: 700,
              borderRadius: 2,
              px: 2,
              py: 0.75,
            }}
          >
            {actionLabel}
          </Button>
        )}
      </Box>
    </Box>
  );
};
