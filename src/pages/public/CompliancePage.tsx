import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Chip } from '@mui/material';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SecurityIcon from '@mui/icons-material/Security';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { MOCK_AUDIT_LOGS } from '../../data/mockData';
import type { AuditLogEntry } from '../../types';

interface CompliancePageProps {
  onOpenDemo: () => void;
}

export const CompliancePage: React.FC<CompliancePageProps> = ({ onOpenDemo }) => {
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(MOCK_AUDIT_LOGS);
  const [simulatedSampleVol, setSimulatedSampleVol] = useState<number>(45.5);

  const handleSimulateUpdate = () => {
    const newVol = Math.round((simulatedSampleVol - 2.5) * 10) / 10;
    setSimulatedSampleVol(newVol);

    // Generate simulated SHA-256 hash string
    const hexChars = '0123456789abcdef';
    let randHash = '';
    for (let i = 0; i < 64; i++) {
      randHash += hexChars[Math.floor(Math.random() * hexChars.length)];
    }

    const newEntry: AuditLogEntry = {
      id: `AUD-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toISOString(),
      operator: 'Dr. Elena Vance',
      role: 'Principal Investigator',
      action: 'UPDATE',
      entity: 'Sample Aliquot',
      entityId: 'SMP-2026-9041',
      description: `Consumed 2.5 µL for RT-qPCR. Remaining: ${newVol} µL. Reason: Triplicate Assay Run.`,
      hash: randHash,
    };

    setAuditLogs([newEntry, ...auditLogs]);
  };

  const handleSimulateSign = () => {
    const hexChars = '0123456789abcdef';
    let randHash = '';
    for (let i = 0; i < 64; i++) {
      randHash += hexChars[Math.floor(Math.random() * hexChars.length)];
    }

    const newEntry: AuditLogEntry = {
      id: `AUD-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toISOString(),
      operator: 'David Ross, RAC',
      role: 'QA / Compliance Auditor',
      action: 'SIGN',
      entity: 'Assay Batch Record #RUN-104',
      entityId: 'BATCH-104-REL',
      description: 'Formal Electronic Signature executed: "I have verified and approved these assay records."',
      hash: randHash,
      signatureMeaning: 'VERIFICATION_AND_APPROVAL',
    };

    setAuditLogs([newEntry, ...auditLogs]);
  };

  return (
    <Box className="container-custom" sx={{ py: 8 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Chip
          icon={<FactCheckIcon sx={{ color: '#1E40AF !important' }} />}
          label="Regulatory Trust Center"
          sx={{ bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 700, mb: 2 }}
        />
        <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
          FDA 21 CFR Part 11, GAMP 5 & Immutable Audit Trails
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 720, mx: 'auto' }}>
          GatsBio provides mathematically verifiable, tamper-evident record keeping that satisfies stringent FDA, EMA, and ISO requirements.
        </Typography>
      </Box>

      {/* Interactive Audit Trail Simulator */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          border: '1px solid #E2E8F0',
          bgcolor: '#FFFFFF',
          mb: 8,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <div>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A' }}>
              Live 21 CFR Part 11 Audit Trail Simulator
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B' }}>
              Trigger real-time sample state changes below to witness immediate cryptographic SHA-256 hash generation and immutable timestamping.
            </Typography>
          </div>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              variant="outlined"
              onClick={handleSimulateUpdate}
              startIcon={<PlayArrowIcon />}
              sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 600 }}
            >
              Simulate Sample Consumption
            </Button>
            <Button
              variant="contained"
              onClick={handleSimulateSign}
              startIcon={<FingerprintIcon />}
              sx={{ bgcolor: '#1E40AF', fontWeight: 700 }}
            >
              Simulate 21 CFR E-Signature
            </Button>
          </Box>
        </Box>

        {/* Audit Log Table */}
        <Box sx={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: 2 }}>
          <Box sx={{ minWidth: 700 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '120px 180px 100px 1.5fr 1.8fr',
                p: 1.5,
                bgcolor: '#F8FAFC',
                borderBottom: '1px solid #E2E8F0',
                fontWeight: 700,
                fontSize: '12px',
                color: '#475569',
              }}
            >
              <div>TIMESTAMP (UTC)</div>
              <div>OPERATOR & ROLE</div>
              <div>ACTION</div>
              <div>DESCRIPTION & REASON</div>
              <div>CRYPTOGRAPHIC SHA-256 HASH</div>
            </Box>

            {auditLogs.slice(0, 5).map((log) => (
              <Box
                key={log.id}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '120px 180px 100px 1.5fr 1.8fr',
                  p: 1.8,
                  borderBottom: '1px solid #F1F5F9',
                  alignItems: 'center',
                  fontSize: '13px',
                  '&:hover': { bgcolor: '#F8FAFC' },
                }}
              >
                <div style={{ color: '#64748B', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                  {new Date(log.timestamp).toLocaleTimeString()}
                </div>
                <div>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>
                    {log.operator}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B' }}>
                    {log.role}
                  </Typography>
                </div>
                <div>
                  <Chip
                    size="small"
                    label={log.action}
                    sx={{
                      bgcolor: log.action === 'SIGN' ? '#FEF3C7' : log.action === 'UPDATE' ? '#EFF6FF' : '#ECFDF5',
                      color: log.action === 'SIGN' ? '#92400E' : log.action === 'UPDATE' ? '#1E40AF' : '#065F46',
                      fontWeight: 700,
                      fontSize: '10px',
                    }}
                  />
                </div>
                <div>
                  <Typography variant="body2" sx={{ color: '#334155' }}>
                    {log.description}
                  </Typography>
                </div>
                <div>
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: 'var(--font-mono)',
                      bgcolor: '#F1F5F9',
                      p: 0.6,
                      borderRadius: 1,
                      fontSize: '10px',
                      color: '#1E3A8A',
                      wordBreak: 'break-all',
                      display: 'block',
                    }}
                  >
                    {log.hash}
                  </Typography>
                </div>
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>

      {/* Compliance Frameworks Grid */}
      <Box sx={{ mb: 10 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', textAlign: 'center', mb: 5 }}>
          Comprehensive Regulatory Frameworks Supported
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <FactCheckIcon sx={{ color: '#1E40AF' }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>FDA 21 CFR Part 11 Validation</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.6, mb: 2 }}>
              Ensures electronic records and electronic signatures are considered trustworthy, reliable, and equivalent to paper records.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="caption" sx={{ color: '#334155', fontWeight: 600 }}>• Cryptographic dual-credential signature challenges (password/TOTP)</Typography>
              <Typography variant="caption" sx={{ color: '#334155', fontWeight: 600 }}>• Automated reason-for-change prompt on any specimen modification</Typography>
              <Typography variant="caption" sx={{ color: '#334155', fontWeight: 600 }}>• System-enforced password aging, complexity, and account lockout</Typography>
            </Box>
          </Paper>

          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <SecurityIcon sx={{ color: '#0F766E' }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>HIPAA & Patient Specimen Security</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.6, mb: 2 }}>
              Protects Protected Health Information (PHI) and clinical trial biospecimens with enterprise encryption and access governance.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="caption" sx={{ color: '#334155', fontWeight: 600 }}>• AES-256 cloud encryption at rest & TLS 1.3 in transit</Typography>
              <Typography variant="caption" sx={{ color: '#334155', fontWeight: 600 }}>• Business Associate Agreement (BAA) execution ready</Typography>
              <Typography variant="caption" sx={{ color: '#334155', fontWeight: 600 }}>• Double-blind cohort randomization for clinical trial coordinators</Typography>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* CTA */}
      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={onOpenDemo}
          sx={{ bgcolor: '#1E40AF', px: 4, py: 1.5, fontWeight: 700, borderRadius: 2 }}
        >
          Request 21 CFR Part 11 Audit Package Walkthrough
        </Button>
      </Box>
    </Box>
  );
};
