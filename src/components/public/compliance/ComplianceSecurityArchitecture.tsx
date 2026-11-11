import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { SECURITY_CONTROLS } from '../../../data/complianceData';

const SECURITY_ICONS: Record<string, React.ReactNode> = {
  encryption: <LockIcon sx={{ color: '#1E40AF', fontSize: 20 }} />,
  'rbac-abac': <AdminPanelSettingsIcon sx={{ color: '#0F766E', fontSize: 20 }} />,
  'sso-mfa': <VpnKeyIcon sx={{ color: '#7E22CE', fontSize: 20 }} />,
  continuity: <VerifiedUserIcon sx={{ color: '#10B981', fontSize: 20 }} />,
};

export const ComplianceSecurityArchitecture: React.FC = () => {
  return (
    <Box id="security-architecture" sx={{ py: { xs: 6, md: 9 }, bgcolor: '#FFFFFF' }}>
      <Box className="container-custom">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 740, mx: 'auto', mb: { xs: 4, md: 5.5 } }}>
          <Chip
            label="Zero-Trust Data Infrastructure"
            size="small"
            sx={{
              bgcolor: '#EFF6FF',
              color: '#1E40AF',
              fontWeight: 800,
              fontSize: '11px',
              mb: 1.5,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: '#0F172A',
              fontSize: { xs: '24px', sm: '30px', md: '36px' },
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              mb: 1.25,
            }}
          >
            Enterprise Encryption, Identity & Isolation
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#475569', fontSize: { xs: '14.5px', md: '16px' }, lineHeight: 1.6 }}
          >
            Safeguard intellectual property, patient PHI, and multi-terabyte genomic datasets with defense-in-depth cloud and VPC security controls.
          </Typography>
        </Box>

        {/* Responsive 2-Column Layout: 4 Security Cards + Cryptographic Vault Photo */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.25fr 1fr' },
            gap: 3,
            alignItems: 'stretch',
          }}
        >
          {/* Left: 2x2 Security Controls */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2.25,
            }}
          >
            {SECURITY_CONTROLS.map((ctrl) => (
              <Paper
                key={ctrl.id}
                elevation={0}
                sx={{
                  p: 2.75,
                  borderRadius: 3,
                  border: '1px solid #E2E8F0',
                  bgcolor: '#F8FAFC',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    borderColor: ctrl.accentColor,
                    boxShadow: '0 10px 24px -12px rgba(15, 23, 42, 0.1)',
                  },
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 1,
                      mb: 1.75,
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        bgcolor: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {SECURITY_ICONS[ctrl.id]}
                    </Box>
                    <Chip
                      label={ctrl.badge}
                      size="small"
                      sx={{
                        bgcolor: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        color: ctrl.accentColor,
                        fontWeight: 800,
                        fontSize: '11px',
                      }}
                    />
                  </Box>

                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 800, color: '#0F172A', fontSize: '15.5px', mb: 0.75 }}
                  >
                    {ctrl.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6, fontSize: '13.5px' }}>
                    {ctrl.desc}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>

          {/* Right: Cryptographic Security Vault Photo Card */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3.5,
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              bgcolor: '#0F172A',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ position: 'relative', minHeight: { xs: 230, sm: 270 }, flex: 1 }}>
              <Box
                component="img"
                src="/images/compliance-security-vault.jpg"
                alt="High-security biomedical cryptographic vault with glass-enclosed server racks and biometric access"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.35) 60%, rgba(15, 23, 42, 0.1) 100%)',
                }}
              />
            </Box>

            <Box sx={{ p: { xs: 3, md: 3.5 }, bgcolor: '#0F172A' }}>
              <Typography
                variant="overline"
                sx={{ color: '#6EE7B7', fontWeight: 800, letterSpacing: '0.8px' }}
              >
                SOC 2 Type II & HIPAA BAA
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, fontSize: { xs: '19px', md: '21px' }, mb: 1 }}>
                Dedicated Single-Tenant VPC & BYOK Encryption
              </Typography>
              <Typography variant="body2" sx={{ color: '#CBD5E1', lineHeight: 1.6 }}>
                Deploy in GatsBio’s SOC 2 Type II cloud, dedicated single-tenant VPC, or hybrid on-premises topology with full customer key custody and immutable audit archival.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};
