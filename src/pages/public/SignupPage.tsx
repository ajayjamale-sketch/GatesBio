import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  LinearProgress,
  Link,
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ROLE_LIST, createDefaultSessionForRole } from '../../config/roleAccess';
import { ORGANIZATIONS_LIST } from '../../data/roleDashboardData';
import type { PublicRoute } from '../../types';
import type { DashboardSession, UserRoleId } from '../../types/dashboard';
import { AuthSplitLayout } from '../../components/public/AuthSplitLayout';
import { CaptchaChallenge } from '../../components/public/CaptchaChallenge';
import { generateCaptchaCode } from '../../utils/captcha';

interface SignupPageProps {
  onSignupSuccess: (session: DashboardSession) => void;
  onNavigate: (route: PublicRoute) => void;
}

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score += 25;
  if (/[A-Z]/.test(password)) score += 25;
  if (/[0-9]/.test(password)) score += 25;
  if (/[^A-Za-z0-9]/.test(password)) score += 25;
  if (score <= 25) return { score, label: 'Weak', color: '#DC2626' };
  if (score <= 50) return { score, label: 'Fair', color: '#F59E0B' };
  if (score <= 75) return { score, label: 'Good', color: '#2563EB' };
  return { score, label: 'Strong (NIST Compliant)', color: '#10B981' };
}

export const SignupPage: React.FC<SignupPageProps> = ({ onSignupSuccess, onNavigate }) => {
  const [authMethod, setAuthMethod] = useState<'email' | 'mobile'>('email');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [organization, setOrganization] = useState(ORGANIZATIONS_LIST[0]);
  const [selectedRole, setSelectedRole] = useState<UserRoleId>('research-scientist');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  const [captchaCode, setCaptchaCode] = useState(() => generateCaptchaCode());
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const strength = getPasswordStrength(password);

  const handleRefreshCaptcha = () => {
    setCaptchaCode(generateCaptchaCode());
    setCaptchaInput('');
    setCaptchaError(null);
  };

  const handleSendOtp = () => {
    const digits = mobileNumber.replace(/\D/g, '');
    if (digits.length < 7) {
      setFormError('Enter a valid mobile number to receive a verification OTP.');
      return;
    }
    setFormError(null);
    setOtpSent(true);
    setOtpCode('482910');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setCaptchaError(null);

    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (authMethod === 'email') {
      if (!email.trim() || !email.includes('@')) {
        setFormError('Please enter a valid work or academic email address.');
        return;
      }
    } else {
      const digits = mobileNumber.replace(/\D/g, '');
      if (digits.length < 7) {
        setFormError('Please enter a valid mobile number.');
        return;
      }
      if (otpCode.trim().length < 6) {
        setFormError('Please request and enter the 6-digit mobile verification OTP.');
        return;
      }
    }

    if (password.length < 8) {
      setFormError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }
    if (!acceptedTerms) {
      setFormError('Please accept the Terms of Service & 21 CFR Part 11 policy.');
      return;
    }

    if (!captchaInput.trim() || captchaInput.trim().toUpperCase() !== captchaCode) {
      setCaptchaError('CAPTCHA does not match. Please enter the new code.');
      setCaptchaCode(generateCaptchaCode());
      setCaptchaInput('');
      return;
    }

    const derivedEmail =
      authMethod === 'email'
        ? email.trim()
        : `${fullName.trim().toLowerCase().replace(/\s+/g, '.')}@gatsbio.org`;

    const session = createDefaultSessionForRole(selectedRole, {
      userName: fullName.trim(),
      email: derivedEmail,
      organization,
    });
    onSignupSuccess(session);
  };

  return (
    <AuthSplitLayout
      badgeLabel="Multi-Org Biotech Onboarding"
      headline="Create your GatsBio Research Account"
      subheadline="Provision an audit-ready workstation with role-based ELN, LIMS sample tracking, and AI literature intelligence."
      imageSrc="/images/auth-signup-hero.jpg"
      imageAlt="GatsBio genomic cloud and collaborative research illustration"
      highlights={[
        'Instant provisioning across 6 enterprise life-sciences roles',
        'Supports Email & Mobile OTP registration with CAPTCHA check',
        'NIST-compliant password security & 2FA hardware readiness',
      ]}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <PersonAddOutlinedIcon sx={{ color: '#1E40AF', fontSize: 22 }} />
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#0F172A', fontSize: { xs: '20px', sm: '22px' } }}>
              Create Account
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#64748B', fontSize: '13.5px' }}>
            Register with your Email or Mobile Number and complete CAPTCHA verification.
          </Typography>
        </Box>

        <ToggleButtonGroup
          exclusive
          fullWidth
          size="small"
          value={authMethod}
          onChange={(_, val) => {
            if (!val) return;
            setAuthMethod(val);
            setFormError(null);
          }}
          sx={{
            '& .MuiToggleButton-root': {
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '13px',
              textTransform: 'none',
              py: 0.8,
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
            Sign Up with Email
          </ToggleButton>
          <ToggleButton value="mobile">
            <PhoneAndroidOutlinedIcon sx={{ fontSize: 17, mr: 0.75 }} />
            Sign Up with Mobile
          </ToggleButton>
        </ToggleButtonGroup>

        {formError && (
          <Alert severity="error" sx={{ borderRadius: '8px', py: 0.5 }}>
            {formError}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <TextField
              label="Full Name"
              size="small"
              fullWidth
              required
              placeholder="Dr. Elena Vance"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            {authMethod === 'email' ? (
              <TextField
                label="Work or Academic Email"
                type="email"
                size="small"
                fullWidth
                required
                placeholder="name@institution.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                    required
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
                    label="6-Digit Mobile OTP (Demo: 482910)"
                    size="small"
                    fullWidth
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                  />
                )}
              </Box>
            )}

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' },
                gap: 1.25,
                '& > *': { minWidth: 0 },
              }}
            >
              <TextField
                select
                label="Organization"
                size="small"
                fullWidth
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              >
                {ORGANIZATIONS_LIST.map((org) => (
                  <MenuItem key={org} value={org}>{org}</MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Primary Role"
                size="small"
                fullWidth
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRoleId)}
              >
                {ROLE_LIST.map((r) => (
                  <MenuItem key={r.roleId} value={r.roleId}>{r.shortLabel}</MenuItem>
                ))}
              </TextField>
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' },
                gap: 1.25,
                '& > *': { minWidth: 0 },
              }}
            >
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                size="small"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton type="button" size="small" onClick={() => setShowPassword((s) => !s)}>
                          {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                size="small"
                fullWidth
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Box>

            {password.length > 0 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4 }}>
                  <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                    Password Strength
                  </Typography>
                  <Typography variant="caption" sx={{ color: strength.color, fontWeight: 700 }}>
                    {strength.label}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={strength.score}
                  sx={{
                    height: 5,
                    borderRadius: 3,
                    bgcolor: '#E2E8F0',
                    '& .MuiLinearProgress-bar': { bgcolor: strength.color },
                  }}
                />
              </Box>
            )}

            <CaptchaChallenge
              code={captchaCode}
              onRefresh={handleRefreshCaptcha}
              value={captchaInput}
              onChange={(val) => {
                setCaptchaInput(val);
                if (captchaError) setCaptchaError(null);
              }}
              error={captchaError}
            />

            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  sx={{ color: '#1E40AF' }}
                />
              }
              label={
                <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>
                  I agree to the GatsBio Terms of Service and 21 CFR Part 11 Electronic Record Policy.
                </Typography>
              }
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: '#1E40AF',
                '&:hover': { bgcolor: '#1E3A8A' },
                py: 1.2,
                fontWeight: 800,
                fontSize: '14px',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(30, 64, 175, 0.25)',
              }}
            >
              Verify CAPTCHA & Create Account
            </Button>
          </Box>
        </form>

        <Divider />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="caption" sx={{ color: '#64748B', fontSize: '12.5px' }}>
            Already have an account?
          </Typography>
          <Link
            component="button"
            type="button"
            underline="hover"
            onClick={() => onNavigate('login')}
            sx={{ fontWeight: 800, fontSize: '13px', color: '#1E40AF', cursor: 'pointer' }}
          >
            Sign In to Workstation →
          </Link>
        </Box>
      </Box>
    </AuthSplitLayout>
  );
};
