import React from 'react';
import { Box } from '@mui/material';
import { PricingMatrix } from '../../components/public/PricingMatrix';

interface PricingPageProps {
  onOpenDemo: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenDemo }) => {
  return (
    <Box className="container-custom" sx={{ py: 6 }}>
      <PricingMatrix onOpenDemo={onOpenDemo} />
    </Box>
  );
};
