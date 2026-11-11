import React, { useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ROLE_CONFIGS, ROLE_LIST, createDefaultSessionForRole } from '../../config/roleAccess';
import type { PublicRoute } from '../../types';
import type { DashboardSession, UserRoleId } from '../../types/dashboard';
import { AuthSplitLayout } from '../../components/public/AuthSplitLayout';
import { CaptchaChallenge } from '../../components/public/CaptchaChallenge';
import { generateCaptchaCode } from '../../utils/captcha';

interface LoginPageProps {
  onLoginSuccess: (session: DashboardSession) => void;
  onNavigate: (route: PublicRoute) => void;
}

const DEMO_MOBILE_BY_ROLE: Record<UserRoleId, string> = {
  'research-scientist': '6175550142',
  'lab-technician': '6175550188',
  'clinical-coordinator': '6175550194',
  'biotech-admin': '6175550120',
  'compliance-officer': '6175550165',
  'system-admin': '6175550101',
};

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigate }) => {
  const [authMethod, setAuthMethod] = useState<'email' | 'mobile'>('email');
  const [selectedRole, setSelectedRole] = useState<UserRoleId>('research-scientist');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [credentialsFilledNote, setCredentialsFilledNote] = useState<string | null>(null);

  const [captchaCode, setCaptchaCode] = useState(() => generateCaptchaCode());
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const captchaInputRef = useRef<HTMLInputElement | null>(null);

  const handleRefreshCaptcha = () => {
    setCaptchaCode(generateCaptchaCode());
    setCaptchaInput('');
    setCaptchaError(null);
  };

  const handleFillCredentials = () => {
    const cfg = ROLE_CONFIGS[selectedRole];
    if (authMethod === 'email') {
      setEmail(cfg.defaultEmail);
    } else {
      setCountryCode('+1');
      setMobileNumber(DEMO_MOBILE_BY_ROLE[selectedRole]);
      setOtpSent(true);
      setOtpCode('482910');
    }
    setPassword('GatsBio@2026!');
    setFormError(null);
    setCaptchaError(null);
    setCredentialsFilledNote(
      `Demo credentials filled for ${cfg.defaultPersonName} (${cfg.shortLabel}). Enter the CAPTCHA code below to login.`
    );
    captchaInputRef.current?.focus();
  };

  const handleSendOtp = () => {
    const digits = mobileNumber.replace(/\D/g, '');
    if (digits.length < 7) {
      setFormError('Enter a valid mobile number before requesting an OTP.');
      return;
    }
    setFormError(null);
    setOtpSent(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setCaptchaError(null);

    if (authMethod === 'email') {
      if (!email.trim() || !email.includes('@')) {
        setFormError('Please enter a valid work or academic email address.');
        return;
      }
      if (password.trim().length < 6) {
        setFormError('Please enter your password (at least 6 characters) or click Fill Credentials.');
        return;
      }
    } else {
      const digits = mobileNumber.replace(/\D/g, '');
      if (digits.length < 7) {
        setFormError('Please enter a valid mobile number.');
        return;
      }
      if (!password.trim() && otpCode.trim().length < 6) {
        setFormError('Enter your password or the 6-digit SMS OTP code.');
        return;
      }
    }

    if (!captchaInput.trim() || captchaInput.trim().toUpperCase() !== captchaCode) {
      setCaptchaError('CAPTCHA does not match. Please enter the new code.');
      setCaptchaCode(generateCaptchaCode());
      setCaptchaInput('');
      return;
    }

    const cfg = ROLE_CONFIGS[selectedRole];
    const isDefaultEmail = email.trim().toLowerCase() === cfg.defaultEmail.toLowerCase();
    const derivedName =
      authMethod === 'email' && email.trim() && !isDefaultEmail
        ? email.trim().split('@')[0].replace(/[._-]/g, ' ')
        : undefined;

    const session = createDefaultSessionForRole(selectedRole, {
      email: authMethod === 'email' ? email.trim() : cfg.defaultEmail,
      userName: derivedName,
    });
    onLoginSuccess(session);
  };

  return (
    <AuthSplitLayout
      badgeLabel="21 CFR Part 11 Verified Access"
      headline="Sign in to your GatsBio Lab Workstation"
      subheadline="Access role-scoped ELN protocols, LIMS chain-of-custody, clinical trial cohorts, and AI literature synthesis."
      imageSrc="/images/auth-login-hero.jpg"
      imageAlt="GatsBio biotechnology laboratory and molecular telemetry visualization"
      highlights={[
        'Role-based access across 6 scientific & regulatory personas',
        'Email & Mobile OTP authentication with CAPTCHA defense',
        'Immutable SHA-256 audit logging on every session action',
      ]}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <LockOutlinedIcon sx={{ color: '#1E40AF', fontSize: 22 }} />
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#0F172A', fontSize: { xs: '20px', sm: '22px' } }}>
              Sign In
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#64748B', fontSize: '13.5px' }}>
            Authenticate with Email or Mobile Number and complete CAPTCHA verification.
          </Typography>
        </Box>

        {/* Auth Method Toggle: Email vs Mobile */}
        <ToggleButtonGroup
          exclusive
          fullWidth
          size="small"
          value={authMethod}
          onChange={(_, val) => {
            if (!val) return;
            setAuthMethod(val);
            setFormError(null);
            setCredentialsFilledNote(null);
          }}
          sx={{
            '& .MuiToggleButton-root': {
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '13px',
              textTransform: 'none',
              py: 0.85,
              '&.Mui-selected': {
                bgcolor: '#EFF6FF',
                color: '#1E40AF',
                borderColor: '#93C5FD',
              },
            },
          }}
        >
          <ToggleButton value="email">
            <EmailOutlinedIcon sx={{ fontSize: 17, mr: 0.75 }} />
            Email Login
          </ToggleButton>
          <ToggleButton value="mobile">
            <PhoneAndroidOutlinedIcon sx={{ fontSize: 17, mr: 0.75 }} />
            Mobile Login
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Role Selector + Fill Credentials Button */}
        <Box
          sx={{
            p: 1.5,
            borderRadius: '8px',
            bgcolor: '#EFF6FF',
            border: '1px solid #DBEAFE',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.25,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'stretch', sm: 'center' },
              gap: 1,
            }}
          >
            <TextField
              select
              size="small"
              label="Workspace Role"
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value as UserRoleId);
                setCredentialsFilledNote(null);
              }}
              sx={{
                flex: 1,
                bgcolor: '#FFFFFF',
                '& .MuiOutlinedInput-root': { borderRadius: '6px', fontSize: '13px' },
              }}
            >
              {ROLE_LIST.map((r) => (
                <MenuItem key={r.roleId} value={r.roleId}>
                  {r.shortLabel} ({r.defaultPersonName})
                </MenuItem>
              ))}
            </TextField>

            <Button
              type="button"
              variant="outlined"
              startIcon={<AutoFixHighIcon fontSize="small" />}
              onClick={handleFillCredentials}
              sx={{
                bgcolor: '#FFFFFF',
                borderColor: '#1E40AF',
                color: '#1E40AF',
                fontWeight: 800,
                borderRadius: '6px',
                whiteSpace: 'nowrap',
                px: 2,
                '&:hover': { bgcolor: '#DBEAFE', borderColor: '#1E3A8A' },
              }}
            >
              Fill Credentials
            </Button>
          </Box>

          {credentialsFilledNote && (
            <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 700, display: 'block' }}>
              {credentialsFilledNote}
            </Typography>
          )}
        </Box>

        {formError && (
          <Alert severity="error" sx={{ borderRadius: '8px', py: 0.5 }}>
            {formError}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
            {authMethod === 'email' ? (
              <TextField
                label="Work or Academic Email"
                type="email"
                size="small"
                fullWidth
                placeholder="name@institution.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon sx={{ fontSize: 18, color: '#64748B' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <TextField
                    select
                    size="small"
                    label="Code"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    sx={{ width: { xs: '100%', sm: 105 } }}
                  >
                    <MenuItem value="+1">+1 (US)</MenuItem>
                    <MenuItem value="+44">+44 (UK)</MenuItem>
                    <MenuItem value="+91">+91 (IN)</MenuItem>
                    <MenuItem value="+49">+49 (DE)</MenuItem>
                  </TextField>
                  <TextField
                    label="Mobile Number"
                    size="small"
                    fullWidth
                    placeholder="6175550142"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              type="button"
                              size="small"
                              onClick={handleSendOtp}
                              sx={{ fontWeight: 800, fontSize: '11.5px', color: '#1E40AF', minWidth: 'auto' }}
                            >
                              {otpSent ? 'Resend OTP' : 'Send OTP'}
                            </Button>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Box>
                {otpSent && (
                  <TextField
                    label="6-Digit SMS OTP (Demo: 482910)"
                    size="small"
                    fullWidth
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="482910"
                  />
                )}
              </Box>
            )}

            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              size="small"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        size="small"
                        aria-label="Toggle password visibility"
                        onClick={() => setShowPassword((s) => !s)}
                      >
                        {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <CaptchaChallenge
              code={captchaCode}
              onRefresh={handleRefreshCaptcha}
              value={captchaInput}
              onChange={(val) => {
                setCaptchaInput(val);
                if (captchaError) setCaptchaError(null);
              }}
              error={captchaError}
              inputRef={captchaInputRef}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: '#1E40AF',
                '&:hover': { bgcolor: '#1E3A8A' },
                py: 1.25,
                fontWeight: 800,
                fontSize: '14px',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(30, 64, 175, 0.25)',
              }}
            >
              Verify CAPTCHA & Login
            </Button>
          </Box>
        </form>

        <Divider />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="caption" sx={{ color: '#64748B', fontSize: '12.5px' }}>
            New to GatsBio?
          </Typography>
          <Link
            component="button"
            type="button"
            underline="hover"
            onClick={() => onNavigate('signup')}
            sx={{ fontWeight: 800, fontSize: '13px', color: '#1E40AF', cursor: 'pointer' }}
          >
            Create a Workspace Account →
          </Link>
        </Box>
      </Box>
    </AuthSplitLayout>
  );
};
