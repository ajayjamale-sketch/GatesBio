import React from 'react';
import { Box, Typography, Paper, Button, Chip } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { AUDIT_GUARDRAILS } from '../../../data/complianceData';

interface ComplianceAuditWorkflowProps {
  onOpenDemo: () => void;
}

export const ComplianceAuditWorkflow: React.FC<ComplianceAuditWorkflowProps> = ({
  onOpenDemo,
}) => {
  const workflowSteps = [
    {
      step: '01',
      title: 'Action & Reason-for-Change Capture',
      desc: 'Any modification to specimen custody, aliquot volume, protocol version, or calibration record prompts an attributed change reason before saving.',
      icon: <EditNoteIcon sx={{ color: '#1E40AF', fontSize: 22 }} />,
      bgTint: '#EFF6FF',
      accentColor: '#1E40AF',
    },
    {
      step: '02',
      title: 'Dual-Credential Electronic Signature',
      desc: 'Batch releases and SOP approvals enforce password re-authentication plus TOTP or FIDO2 hardware key verification with explicit signature meaning.',
      icon: <FingerprintIcon sx={{ color: '#0F766E', fontSize: 22 }} />,
      bgTint: '#F0FDFA',
      accentColor: '#0F766E',
    },
    {
      step: '03',
      title: 'SHA-256 Merkle Chain & Audit Export',
      desc: 'Records are sealed into an append-only cryptographic hash chain with UTC timestamps, ready for one-click PDF/JSON export during FDA or ISO audits.',
      icon: <VerifiedUserIcon sx={{ color: '#10B981', fontSize: 22 }} />,
      bgTint: '#ECFDF5',
      accentColor: '#10B981',
    },
  ];

  return (
    <Box id="audit-workflow" sx={{ py: { xs: 6, md: 9 }, bgcolor: '#FFFFFF' }}>
      <Box className="container-custom">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: { xs: 4, md: 5.5 } }}>
          <Chip
            label="21 CFR Part 11 Control Architecture"
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
            Tamper-Evident Audit Trails & Electronic Signatures
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#475569', fontSize: { xs: '14.5px', md: '16px' }, lineHeight: 1.6 }}
          >
            Every record mutation and regulatory sign-off follows a strict three-stage cryptographic verification pipeline built directly into GatsBio.
          </Typography>
        </Box>

        {/* 3-Stage Verification Pipeline */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 2.5,
            mb: 4,
          }}
        >
          {workflowSteps.map((item) => (
            <Paper
              key={item.step}
              elevation={0}
              sx={{
                p: { xs: 3, md: 3.5 },
                borderRadius: 3.5,
                border: '1px solid #E2E8F0',
                bgcolor: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 16px -8px rgba(15, 23, 42, 0.06)',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
                '&:hover': {
                  borderColor: item.accentColor,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2.5,
                      bgcolor: item.bgTint,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 900, color: '#94A3B8', fontSize: '13px' }}
                  >
                    STAGE {item.step}
                  </Typography>
                </Box>

                <Typography
                  variant="h6"
                  sx={{ fontWeight: 800, color: '#0F172A', fontSize: '17px', mb: 1, lineHeight: 1.3 }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#475569', lineHeight: 1.6, fontSize: '13.5px' }}
                >
                  {item.desc}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Guardrails Strip + Guided Sandbox CTA */}
        <Box
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3.5,
            bgcolor: '#F8FAFC',
            border: '1px solid #E2E8F0',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 2.5,
              mb: 3,
            }}
          >
            {AUDIT_GUARDRAILS.map((guard, idx) => (
              <Box
                key={idx}
                sx={{
                  p: 2.5,
                  borderRadius: 2.5,
                  bgcolor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 800, color: '#0F172A', mb: 0.75, fontSize: '15px' }}
                >
                  {guard.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.55, fontSize: '13.5px' }}>
                  {guard.desc}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              gap: 2,
              pt: 2.5,
              borderTop: '1px solid #E2E8F0',
            }}
          >
            <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600 }}>
              Want to test dual-credential e-signatures and audit exports in your own lab sandbox?
            </Typography>
            <Button
              variant="contained"
              onClick={onOpenDemo}
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: '#1E40AF',
                '&:hover': { bgcolor: '#1E3A8A' },
                fontWeight: 700,
                px: 3,
                py: 1.1,
                borderRadius: 2,
                whiteSpace: 'nowrap',
              }}
            >
              Request Compliance Sandbox
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
