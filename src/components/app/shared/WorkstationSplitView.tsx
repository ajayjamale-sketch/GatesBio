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
        gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'minmax(0, 1.65fr) minmax(0, 1fr)' },
        gap: 2.5,
        alignItems: 'start',
        width: '100%',
        '& > *': { minWidth: 0 },
      }}
    >
      <Box sx={{ minWidth: 0, width: '100%' }}>{primary}</Box>
      <Box sx={{ minWidth: 0, width: '100%' }}>{inspector}</Box>
    </Box>
  );
};
