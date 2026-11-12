import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import type { PricingPlan } from '../../types';
import type { DashboardSession } from '../../types/dashboard';

interface PaymentCheckoutModalProps {
  open: boolean;
  onClose: () => void;
  plan: PricingPlan | null;
  session: DashboardSession | null;
  initialAnnual: boolean;
  initialSeats: number;
  onPaymentSuccess: (message: string) => void;
  onGoToDashboard?: () => void;
}

type PaymentMethod = 'card' | 'ach' | 'po';

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
}

function createTransactionId(): string {
  const randomNum =
    typeof window !== 'undefined' && window.crypto?.getRandomValues
      ? (window.crypto.getRandomValues(new Uint32Array(1))[0] % 900000) + 100000
      : 482910;
  return `GB-PAY-${randomNum}`;
}

interface InnerCheckoutFormProps {
  plan: PricingPlan;
  session: DashboardSession;
  initialAnnual: boolean;
  initialSeats: number;
  onClose: () => void;
  onPaymentSuccess: (message: string) => void;
  onGoToDashboard?: () => void;
}

const InnerCheckoutForm: React.FC<InnerCheckoutFormProps> = ({
  plan,
  session,
  initialAnnual,
  initialSeats,
  onClose,
  onPaymentSuccess,
  onGoToDashboard,
}) => {
  const [annualBilling, setAnnualBilling] = useState(initialAnnual);
  const [seats, setSeats] = useState<number>(Math.max(1, initialSeats));
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  const [cardHolder, setCardHolder] = useState(session.userName);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [billingZip, setBillingZip] = useState('');
  const [billingCountry, setBillingCountry] = useState('United States');

  const [bankName, setBankName] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const [poNumber, setPoNumber] = useState('');
  const [grantCode, setGrantCode] = useState('');

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoFeedback, setPromoFeedback] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [receiptId, setReceiptId] = useState<string | null>(null);

  const isCustomEnterprise = plan.monthlyPrice === 0;
  const baseSeatPrice = isCustomEnterprise
    ? annualBilling
      ? 399
      : 449
    : annualBilling
      ? plan.annualPrice
      : plan.monthlyPrice;

  const monthlySubtotal = seats * baseSeatPrice;
  const billingSubtotal = annualBilling ? monthlySubtotal * 12 : monthlySubtotal;
  const discountAmount = promoApplied ? Math.round(billingSubtotal * 0.2) : 0;
  const totalDue = billingSubtotal - discountAmount;

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'GATS20' || code === 'BIOTECH20') {
      setPromoApplied(true);
      setPromoFeedback(`20% lab grant discount (${code}) applied.`);
    } else {
      setPromoApplied(false);
      setPromoFeedback('Invalid code. Try GATS20 for a 20% demo discount.');
    }
  };

  const handleUseDemoCard = () => {
    setPaymentMethod('card');
    setCardHolder(session.userName);
    setCardNumber('4242 4242 4242 4242');
    setExpiry('08/29');
    setCvc('424');
    setBillingZip('02139');
    setBillingCountry('United States');
    setFormError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (seats < 1) {
      setFormError('Please specify at least 1 licensed researcher seat.');
      return;
    }

    if (paymentMethod === 'card') {
      const cleanCard = cardNumber.replace(/\s/g, '');
      if (!cardHolder.trim()) {
        setFormError('Enter the cardholder name.');
        return;
      }
      if (cleanCard.length < 15) {
        setFormError('Enter a valid 15 or 16-digit card number (or click "Fill Test Card").');
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        setFormError('Enter card expiry in MM/YY format.');
        return;
      }
      if (cvc.trim().length < 3) {
        setFormError('Enter a valid 3 or 4-digit CVC.');
        return;
      }
      if (!billingZip.trim()) {
        setFormError('Enter your billing postal / ZIP code.');
        return;
      }
    } else if (paymentMethod === 'ach') {
      if (!bankName.trim() || routingNumber.trim().length < 9 || accountNumber.trim().length < 6) {
        setFormError('Provide bank name, 9-digit routing number, and account number.');
        return;
      }
    } else if (paymentMethod === 'po') {
      if (!poNumber.trim()) {
        setFormError('Enter an institutional Purchase Order (PO) number.');
        return;
      }
    }

    const txId = createTransactionId();
    setReceiptId(txId);
    onPaymentSuccess(
      `Subscription activated: ${plan.name} (${seats} seats, $${totalDue.toLocaleString()}). Ref: ${txId}`
    );
  };

  if (receiptId) {
    return (
      <DialogContent sx={{ p: { xs: 3, sm: 4 }, textAlign: 'center' }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '10px',
            bgcolor: '#ECFDF5',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 32 }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
          Payment & Subscription Confirmed
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 480, mx: 'auto', mb: 3 }}>
          Your organization <strong>{session.organization}</strong> is now provisioned on the{' '}
          <strong>{plan.name}</strong> plan with <strong>{seats}</strong> licensed seats.
        </Typography>

        <Box
          sx={{
            maxWidth: 440,
            mx: 'auto',
            p: 2.5,
            borderRadius: '8px',
            bgcolor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            textAlign: 'left',
            mb: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
              Transaction Reference
            </Typography>
            <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 800, fontFamily: 'monospace' }}>
              {receiptId}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
              Account Holder
            </Typography>
            <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 700 }}>
              {session.userName} ({session.email})
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
              Billing Cycle
            </Typography>
            <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 700 }}>
              {annualBilling ? 'Annual Subscription' : 'Monthly Subscription'}
            </Typography>
          </Box>
          <Divider sx={{ my: 0.5 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" sx={{ color: '#0F172A', fontWeight: 800 }}>
              Total Authorized
            </Typography>
            <Typography variant="body2" sx={{ color: '#1E40AF', fontWeight: 900 }}>
              ${totalDue.toLocaleString()} USD
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          {onGoToDashboard && (
            <Button
              variant="contained"
              onClick={() => {
                onClose();
                onGoToDashboard();
              }}
              sx={{
                bgcolor: '#1E40AF',
                '&:hover': { bgcolor: '#1D4ED8' },
                fontWeight: 800,
                borderRadius: '6px',
                px: 3,
              }}
            >
              Go to Dashboard
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 700, borderRadius: '6px', px: 3 }}
          >
            Done
          </Button>
        </Box>
      </DialogContent>
    );
  }

  return (
    <DialogContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1.35fr) minmax(0, 1fr)' },
          gap: 3,
          alignItems: 'start',
        }}
      >
        {/* Left: Billing Details & Payment Form */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
          {/* Logged-in Account Banner */}
          <Box
            sx={{
              p: 1.5,
              borderRadius: '8px',
              bgcolor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1.5,
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, minWidth: 0 }}>
              <BusinessOutlinedIcon sx={{ color: '#1E40AF', fontSize: 20 }} />
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 800, display: 'block' }} noWrap>
                  {session.organization}
                </Typography>
                <Typography variant="caption" sx={{ color: '#475569', display: 'block' }} noWrap>
                  {session.userName} • {session.email}
                </Typography>
              </Box>
            </Box>
            <Chip
              size="small"
              label={session.roleTitle}
              sx={{ bgcolor: '#FFFFFF', color: '#1E40AF', fontWeight: 700, fontSize: '11px', border: '1px solid #DBEAFE' }}
            />
          </Box>

          {formError && (
            <Alert severity="error" sx={{ borderRadius: '8px' }}>
              {formError}
            </Alert>
          )}

          {/* Plan Configuration Row */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'minmax(0, 1fr) 120px' },
              gap: 1.5,
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, display: 'block', mb: 0.6 }}>
                Billing Cadence
              </Typography>
              <ToggleButtonGroup
                value={annualBilling ? 'annual' : 'monthly'}
                exclusive
                fullWidth
                size="small"
                onChange={(_, val) => {
                  if (val) setAnnualBilling(val === 'annual');
                }}
              >
                <ToggleButton
                  value="annual"
                  sx={{
                    fontWeight: 700,
                    textTransform: 'none',
                    '&.Mui-selected': { bgcolor: '#EFF6FF', color: '#1E40AF', borderColor: '#93C5FD' },
                  }}
                >
                  Annual (Save 20%)
                </ToggleButton>
                <ToggleButton
                  value="monthly"
                  sx={{
                    fontWeight: 700,
                    textTransform: 'none',
                    '&.Mui-selected': { bgcolor: '#EFF6FF', color: '#1E40AF', borderColor: '#93C5FD' },
                  }}
                >
                  Monthly
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <TextField
              label="Seats"
              type="number"
              size="small"
              value={seats}
              onChange={(e) => setSeats(Math.max(1, Math.min(500, Number(e.target.value) || 1)))}
              slotProps={{ htmlInput: { min: 1, max: 500 } }}
              sx={{ mt: { xs: 0, sm: 2.2 } }}
            />
          </Box>

          {/* Payment Method Selector */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8, flexWrap: 'wrap', gap: 1 }}>
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700 }}>
                Payment Method
              </Typography>
              <Button
                type="button"
                size="small"
                onClick={handleUseDemoCard}
                sx={{
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: '#1E40AF',
                  bgcolor: '#EFF6FF',
                  px: 1.2,
                  py: 0.25,
                  borderRadius: '6px',
                  '&:hover': { bgcolor: '#DBEAFE' },
                }}
              >
                Fill Test Card
              </Button>
            </Box>
            <ToggleButtonGroup
              value={paymentMethod}
              exclusive
              fullWidth
              size="small"
              onChange={(_, val) => {
                if (val) {
                  setPaymentMethod(val);
                  setFormError(null);
                }
              }}
            >
              <ToggleButton
                value="card"
                sx={{
                  gap: 0.7,
                  fontWeight: 700,
                  textTransform: 'none',
                  '&.Mui-selected': { bgcolor: '#EFF6FF', color: '#1E40AF', borderColor: '#93C5FD' },
                }}
              >
                <CreditCardOutlinedIcon sx={{ fontSize: 16 }} />
                Card
              </ToggleButton>
              <ToggleButton
                value="ach"
                sx={{
                  gap: 0.7,
                  fontWeight: 700,
                  textTransform: 'none',
                  '&.Mui-selected': { bgcolor: '#EFF6FF', color: '#1E40AF', borderColor: '#93C5FD' },
                }}
              >
                <AccountBalanceOutlinedIcon sx={{ fontSize: 16 }} />
                ACH Wire
              </ToggleButton>
              <ToggleButton
                value="po"
                sx={{
                  gap: 0.7,
                  fontWeight: 700,
                  textTransform: 'none',
                  '&.Mui-selected': { bgcolor: '#EFF6FF', color: '#1E40AF', borderColor: '#93C5FD' },
                }}
              >
                <ReceiptLongOutlinedIcon sx={{ fontSize: 16 }} />
                Lab PO
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Dynamic Payment Method Fields */}
          {paymentMethod === 'card' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <TextField
                label="Cardholder Name"
                size="small"
                fullWidth
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
              />
              <TextField
                label="Card Number"
                size="small"
                fullWidth
                placeholder="4242 4242 4242 4242"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <CreditCardOutlinedIcon sx={{ fontSize: 18, color: '#64748B' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                  gap: 1.5,
                }}
              >
                <TextField
                  label="Expiry (MM/YY)"
                  size="small"
                  placeholder="08/29"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                />
                <TextField
                  label="CVC"
                  size="small"
                  placeholder="424"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                />
              </Box>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                  gap: 1.5,
                }}
              >
                <TextField
                  select
                  label="Country"
                  size="small"
                  value={billingCountry}
                  onChange={(e) => setBillingCountry(e.target.value)}
                >
                  {['United States', 'United Kingdom', 'Germany', 'Switzerland', 'Canada', 'India', 'Singapore'].map(
                    (c) => (
                      <MenuItem key={c} value={c}>
                        {c}
                      </MenuItem>
                    )
                  )}
                </TextField>
                <TextField
                  label="Postal / ZIP Code"
                  size="small"
                  placeholder="02139"
                  value={billingZip}
                  onChange={(e) => setBillingZip(e.target.value)}
                />
              </Box>
            </Box>
          )}

          {paymentMethod === 'ach' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <TextField
                label="Financial Institution / Bank Name"
                size="small"
                fullWidth
                placeholder="Silicon Valley Commercial Bank"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'minmax(0, 1fr) minmax(0, 1fr)' },
                  gap: 1.5,
                }}
              >
                <TextField
                  label="Routing Number (9 digits)"
                  size="small"
                  placeholder="021000021"
                  value={routingNumber}
                  onChange={(e) => setRoutingNumber(e.target.value.replace(/\D/g, '').slice(0, 9))}
                />
                <TextField
                  label="Checking Account Number"
                  size="small"
                  placeholder="000123456789"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 17))}
                />
              </Box>
            </Box>
          )}

          {paymentMethod === 'po' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <TextField
                label="Institutional Purchase Order (PO) Number"
                size="small"
                fullWidth
                placeholder="PO-2026-88412"
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
              />
              <TextField
                label="Department / NIH Grant Code (Optional)"
                size="small"
                fullWidth
                placeholder="R01-CA284190"
                value={grantCode}
                onChange={(e) => setGrantCode(e.target.value)}
              />
            </Box>
          )}
        </Box>

        {/* Right: Order Summary */}
        <Box
          sx={{
            p: 2.5,
            borderRadius: '8px',
            bgcolor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            minWidth: 0,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A' }}>
              {plan.name}
            </Typography>
            {plan.badge && (
              <Chip
                size="small"
                label={plan.badge}
                sx={{ bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 700, fontSize: '10.5px', height: 22 }}
              />
            )}
          </Box>
          <Typography variant="caption" sx={{ color: '#64748B', lineHeight: 1.4 }}>
            {isCustomEnterprise
              ? 'Enterprise VPC, BYOK AES-256 encryption, robotics integrations & 99.99% SLA estimate.'
              : plan.tagline}
          </Typography>

          <Divider />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                Rate ({seats} seats × ${baseSeatPrice}/mo)
              </Typography>
              <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 700 }}>
                ${monthlySubtotal.toLocaleString()}/mo
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                Term ({annualBilling ? '12 months annual' : '1 month'})
              </Typography>
              <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 700 }}>
                ${billingSubtotal.toLocaleString()}
              </Typography>
            </Box>
            {promoApplied && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" sx={{ color: '#059669', fontWeight: 700 }}>
                  Grant Discount (20%)
                </Typography>
                <Typography variant="caption" sx={{ color: '#059669', fontWeight: 800 }}>
                  -${discountAmount.toLocaleString()}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                21 CFR Part 11 & HIPAA BAA
              </Typography>
              <Typography variant="caption" sx={{ color: '#059669', fontWeight: 700 }}>
                Included
              </Typography>
            </Box>
          </Box>

          {/* Grant / Promo Code */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              placeholder="Promo (e.g. GATS20)"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              sx={{ flex: 1, bgcolor: '#FFFFFF' }}
            />
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={handleApplyPromo}
              sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 700, borderRadius: '6px' }}
            >
              Apply
            </Button>
          </Box>
          {promoFeedback && (
            <Typography variant="caption" sx={{ color: promoApplied ? '#059669' : '#DC2626', fontWeight: 600 }}>
              {promoFeedback}
            </Typography>
          )}

          <Divider />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
              Total Due Today
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#1E40AF' }}>
              ${totalDue.toLocaleString()}
            </Typography>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            startIcon={<LockOutlinedIcon sx={{ fontSize: 18 }} />}
            sx={{
              bgcolor: '#1E40AF',
              '&:hover': { bgcolor: '#1D4ED8' },
              fontWeight: 800,
              py: 1.2,
              borderRadius: '6px',
              boxShadow: '0 4px 12px rgba(30, 64, 175, 0.25)',
            }}
          >
            Complete Payment
          </Button>

          <Typography variant="caption" sx={{ color: '#64748B', textAlign: 'center', fontSize: '11px' }}>
            Protected with TLS 1.3 encryption & PCI-DSS tokenized processing.
          </Typography>
        </Box>
      </Box>
    </DialogContent>
  );
};

export const PaymentCheckoutModal: React.FC<PaymentCheckoutModalProps> = ({
  open,
  onClose,
  plan,
  session,
  initialAnnual,
  initialSeats,
  onPaymentSuccess,
  onGoToDashboard,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: { borderRadius: '10px', border: '1px solid #E2E8F0', overflow: 'hidden' },
        },
      }}
    >
      <DialogTitle
        sx={{
          px: { xs: 2.5, sm: 3.5 },
          py: 2,
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LockOutlinedIcon sx={{ color: '#1E40AF', fontSize: 20 }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', fontSize: '17px' }}>
            GatsBio Workspace Billing & Checkout
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" aria-label="Close checkout dialog">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {open && plan && session && (
        <InnerCheckoutForm
          key={`${plan.id}-${initialAnnual ? 'annual' : 'monthly'}-${initialSeats}`}
          plan={plan}
          session={session}
          initialAnnual={initialAnnual}
          initialSeats={initialSeats}
          onClose={onClose}
          onPaymentSuccess={onPaymentSuccess}
          onGoToDashboard={onGoToDashboard}
        />
      )}
    </Dialog>
  );
};
