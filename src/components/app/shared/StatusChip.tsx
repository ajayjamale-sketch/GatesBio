import React from 'react';
import { Chip } from '@mui/material';

interface StatusChipProps {
  label: string;
}

const STATUS_STYLE_MAP: Record<string, { bg: string; color: string }> = {
  // Emerald / Success
  pass: { bg: '#ECFDF5', color: '#065F46' },
  'pass qc': { bg: '#ECFDF5', color: '#065F46' },
  operational: { bg: '#ECFDF5', color: '#065F46' },
  active: { bg: '#ECFDF5', color: '#065F46' },
  approved: { bg: '#ECFDF5', color: '#065F46' },
  completed: { bg: '#ECFDF5', color: '#065F46' },
  closed: { bg: '#ECFDF5', color: '#065F46' },
  'patent filed': { bg: '#ECFDF5', color: '#065F46' },
  available: { bg: '#ECFDF5', color: '#065F46' },

  // Blue / Active Workflow
  'in progress': { bg: '#EFF6FF', color: '#1E40AF' },
  'in lab': { bg: '#EFF6FF', color: '#1E40AF' },
  'double-blind': { bg: '#EFF6FF', color: '#1E40AF' },
  'single-blind': { bg: '#EFF6FF', color: '#1E40AF' },
  'open-label': { bg: '#F1F5F9', color: '#334155' },
  scheduled: { bg: '#EFF6FF', color: '#1E40AF' },
  'submitted to irb': { bg: '#ECFDF5', color: '#065F46' },
  'in transit': { bg: '#FFFBEB', color: '#92400E' },
  '24h draft ready': { bg: '#FEF2F2', color: '#991B1B' },
  missed: { bg: '#FEF2F2', color: '#991B1B' },
  running: { bg: '#EFF6FF', color: '#1E40AF' },
  'in use': { bg: '#EFF6FF', color: '#1E40AF' },
  recruiting: { bg: '#EFF6FF', color: '#1E40AF' },
  submitted: { bg: '#EFF6FF', color: '#1E40AF' },
  standard: { bg: '#EFF6FF', color: '#1E40AF' },

  // Amber / Pending / Attention
  'in review': { bg: '#FFFBEB', color: '#92400E' },
  'internal ip sign-off': { bg: '#FFFBEB', color: '#92400E' },
  'under review': { bg: '#FFFBEB', color: '#92400E' },
  'peer review': { bg: '#FFFBEB', color: '#92400E' },
  'irb review': { bg: '#FFFBEB', color: '#92400E' },
  'calibration due': { bg: '#FFFBEB', color: '#92400E' },
  maintenance: { bg: '#FFFBEB', color: '#92400E' },
  queued: { bg: '#FFFBEB', color: '#92400E' },
  pending: { bg: '#FFFBEB', color: '#92400E' },
  medium: { bg: '#FFFBEB', color: '#92400E' },
  moderate: { bg: '#FFFBEB', color: '#92400E' },

  // Crimson / Critical / Alert
  stat: { bg: '#FEF2F2', color: '#991B1B' },
  oos: { bg: '#FEF2F2', color: '#991B1B' },
  blocked: { bg: '#FEF2F2', color: '#991B1B' },
  flagged: { bg: '#FEF2F2', color: '#991B1B' },
  'at risk': { bg: '#FEF2F2', color: '#991B1B' },
  open: { bg: '#FEF2F2', color: '#991B1B' },
  high: { bg: '#FEF2F2', color: '#991B1B' },
  severe: { bg: '#FEF2F2', color: '#991B1B' },
  suspended: { bg: '#FEF2F2', color: '#991B1B' },
  degraded: { bg: '#FEF2F2', color: '#991B1B' },
  quarantined: { bg: '#FEF2F2', color: '#991B1B' },
  depleted: { bg: '#FEF2F2', color: '#991B1B' },
  disposed: { bg: '#F1F5F9', color: '#475569' },
};

export const StatusChip: React.FC<StatusChipProps> = ({ label }) => {
  const style = STATUS_STYLE_MAP[label.toLowerCase()] || {
    bg: '#F1F5F9',
    color: '#334155',
  };

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        height: 22,
        fontSize: '11px',
        fontWeight: 800,
        bgcolor: style.bg,
        color: style.color,
      }}
    />
  );
};
