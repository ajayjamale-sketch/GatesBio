import React, { useState } from 'react';
import { Box } from '@mui/material';
import { PricingMatrix } from '../../components/public/PricingMatrix';
import { PaymentCheckoutModal } from '../../components/public/PaymentCheckoutModal';
import type { PricingPlan } from '../../types';
import type { DashboardSession } from '../../types/dashboard';

interface PricingPageProps {
  session: DashboardSession | null;
  onOpenDemo: () => void;
  onRequireLogin: () => void;
  onPaymentSuccess: (message: string) => void;
  onGoToDashboard: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  session,
  onOpenDemo,
  onRequireLogin,
  onPaymentSuccess,
  onGoToDashboard,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [checkoutAnnual, setCheckoutAnnual] = useState(true);
  const [checkoutSeats, setCheckoutSeats] = useState(12);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleSelectPlan = (plan: PricingPlan, annualBilling: boolean, seats: number) => {
    if (!session) {
      onRequireLogin();
      return;
    }
    setSelectedPlan(plan);
    setCheckoutAnnual(annualBilling);
    setCheckoutSeats(seats);
    setCheckoutOpen(true);
  };

  return (
    <Box className="container-custom" sx={{ py: 6 }}>
      <PricingMatrix
        onOpenDemo={onOpenDemo}
        onSelectPlan={handleSelectPlan}
        isLoggedIn={Boolean(session)}
      />

      <PaymentCheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        plan={selectedPlan}
        session={session}
        initialAnnual={checkoutAnnual}
        initialSeats={checkoutSeats}
        onPaymentSuccess={onPaymentSuccess}
        onGoToDashboard={onGoToDashboard}
      />
    </Box>
  );
};
