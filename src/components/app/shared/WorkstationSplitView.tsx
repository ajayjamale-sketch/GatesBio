import React from 'react';
import { Box } from '@mui/material';

interface WorkstationSplitViewProps {
  primary: React.ReactNode;
  inspector: React.ReactNode;
}

export const WorkstationSplitView: React.FC<WorkstationSplitViewProps> = ({
  primary,
  inspector,
}) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: '1.65fr 1fr' },
        gap: 2.5,
        alignItems: 'start',
      }}
    >
      <Box sx={{ minWidth: 0 }}>{primary}</Box>
      <Box sx={{ minWidth: 0 }}>{inspector}</Box>
    </Box>
  );
};
