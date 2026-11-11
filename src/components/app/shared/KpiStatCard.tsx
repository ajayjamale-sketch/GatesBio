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

const KPI_BLUE_THEME = {
  primary: '#1E40AF',
  borderHover: '#93C5FD',
  tint: '#EFF6FF',
  tintBorder: '#DBEAFE',
} as const;

export const KpiStatCard: React.FC<KpiStatCardProps> = ({
  title,
  value,
  subtitle,
  delta,
  deltaPositive = true,
  icon,
  onClick,
}) => {
  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: 2.25,
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
        borderLeft: `3px solid ${KPI_BLUE_THEME.primary}`,
        bgcolor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 1.5,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
        ...(onClick && {
          '&:hover': {
            borderColor: KPI_BLUE_THEME.borderHover,
            borderLeftColor: KPI_BLUE_THEME.primary,
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 24px -10px rgba(30, 64, 175, 0.16)',
            '& .kpi-icon-badge': {
              bgcolor: KPI_BLUE_THEME.primary,
              borderColor: KPI_BLUE_THEME.primary,
              '& svg': {
                color: '#FFFFFF !important',
              },
            },
          },
        }),
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="caption"
            sx={{
              color: '#475569',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontSize: '11px',
              display: 'block',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              mt: 0.75,
              fontWeight: 800,
              color: '#0F172A',
              fontSize: { xs: '24px', md: '28px' },
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {value}
          </Typography>
        </Box>

        <Box
          className="kpi-icon-badge"
          sx={{
            width: 40,
            height: 40,
            borderRadius: '8px',
            bgcolor: KPI_BLUE_THEME.tint,
            border: `1px solid ${KPI_BLUE_THEME.tintBorder}`,
            color: KPI_BLUE_THEME.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background-color 0.2s ease, border-color 0.2s ease',
            '& svg': {
              color: `${KPI_BLUE_THEME.primary} !important`,
              fontSize: 20,
              transition: 'color 0.2s ease',
            },
          }}
        >
          {icon}
        </Box>
      </Box>

      {(subtitle || delta) && (
        <Box
          sx={{
            pt: 1.25,
            borderTop: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          {subtitle ? (
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 500, fontSize: '12px' }}>
              {subtitle}
            </Typography>
          ) : (
            <Box />
          )}
          {delta && (
            <Chip
              label={delta}
              size="small"
              sx={{
                height: 22,
                borderRadius: '6px',
                fontSize: '10.5px',
                fontWeight: 700,
                bgcolor: deltaPositive ? KPI_BLUE_THEME.tint : '#FEF2F2',
                color: deltaPositive ? KPI_BLUE_THEME.primary : '#DC2626',
                border: `1px solid ${deltaPositive ? KPI_BLUE_THEME.tintBorder : '#FECACA'}`,
              }}
            />
          )}
        </Box>
      )}
    </Paper>
  );
};
