import React from 'react';
import { Box, Paper, Typography, Chip } from '@mui/material';

interface KpiStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  delta?: string;
  deltaPositive?: boolean;
  icon: React.ReactNode;
  accentColor?: string;
  onClick?: () => void;
}

export const KpiStatCard: React.FC<KpiStatCardProps> = ({
  title,
  value,
  subtitle,
  delta,
  deltaPositive = true,
  icon,
  accentColor = '#1E40AF',
  onClick,
}) => {
  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: '1px solid #E2E8F0',
        bgcolor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 1.5,
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          bgcolor: accentColor,
        },
        ...(onClick && {
          '&:hover': {
            borderColor: accentColor,
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 24px -10px rgba(15, 23, 42, 0.12)',
          },
        }),
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
        <Typography
          variant="caption"
          sx={{
            color: '#64748B',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontSize: '11px',
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            bgcolor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
      </Box>

      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: '#0F172A',
            fontSize: { xs: '24px', md: '28px' },
            lineHeight: 1.15,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mt: 0.75 }}>
          {delta && (
            <Chip
              label={delta}
              size="small"
              sx={{
                height: 20,
                fontSize: '10.5px',
                fontWeight: 800,
                bgcolor: deltaPositive ? '#ECFDF5' : '#FEF2F2',
                color: deltaPositive ? '#065F46' : '#991B1B',
              }}
            />
          )}
          {subtitle && (
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 500 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
};
