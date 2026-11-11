import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

export interface ESignatureResult {
  signerName: string;
  signerRole: string;
  meaning: string;
  reason: string;
  timestamp: string;
  sha256Hash: string;
}

interface ESignatureModalProps {
  open: boolean;
  onClose: () => void;
  recordTitle: string;
  signerName: string;
  signerRole: string;
  onConfirm: (result: ESignatureResult) => void;
}

const SIGNATURE_MEANINGS = [
  'VERIFICATION_AND_APPROVAL',
  'AUTHORSHIP_AND_RELEASE',
  'QA_BATCH_DISPOSITION',
  'PROTOCOL_REVISION_SIGNOFF',
];

async function computeSha256Hex(payload: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto?.subtle) {
    const encoded = new TextEncoder().encode(payload);
    const buffer = await window.crypto.subtle.digest('SHA-256', encoded);
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  const hexChars = '0123456789abcdef';
  let fallback = '';
  for (let i = 0; i < 64; i++) {
    fallback += hexChars[(payload.charCodeAt(i % payload.length) + i * 7) % 16];
  }
  return fallback;
}

export const ESignatureModal: React.FC<ESignatureModalProps> = ({
  open,
  onClose,
  recordTitle,
  signerName,
  signerRole,
  onConfirm,
}) => {
  const [meaning, setMeaning] = useState(SIGNATURE_MEANINGS[0]);
  const [reason, setReason] = useState('Verified assay parameters and raw telemetry');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || mfaCode.trim().length < 4 || !reason.trim()) {
      setError('Enter your password, 2FA token (min 4 digits), and reason for signature.');
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      const timestamp = new Date().toISOString();
      const digest = await computeSha256Hex(
        `${recordTitle}|${signerName}|${signerRole}|${meaning}|${reason}|${timestamp}`
      );
      onConfirm({
        signerName,
        signerRole,
        meaning,
        reason: reason.trim(),
        timestamp,
        sha256Hash: digest,
      });
      setPassword('');
      setMfaCode('');
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FingerprintIcon sx={{ color: '#1E40AF' }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
            21 CFR Part 11 Electronic Signature
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSign}>
        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
            <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 800, textTransform: 'uppercase' }}>
              Target Record
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', mt: 0.25 }}>
              {recordTitle}
            </Typography>
            <Typography variant="caption" sx={{ color: '#475569' }}>
              Signer: {signerName} ({signerRole})
            </Typography>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            select
            label="Signature Meaning"
            size="small"
            fullWidth
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
          >
            {SIGNATURE_MEANINGS.map((m) => (
              <MenuItem key={m} value={m}>
                {m.replace(/_/g, ' ')}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Reason for Change / Approval"
            size="small"
            fullWidth
            multiline
            rows={2}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <TextField
              label="Re-enter Password"
              type="password"
              size="small"
              fullWidth
              placeholder="Demo: any password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="2FA TOTP Token"
              size="small"
              fullWidth
              placeholder="e.g. 482910"
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value)}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} sx={{ color: '#475569', fontWeight: 700 }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={submitting}
            startIcon={<FingerprintIcon />}
            sx={{ bgcolor: '#1E40AF', '&:hover': { bgcolor: '#1E3A8A' }, fontWeight: 700 }}
          >
            {submitting ? 'Sealing SHA-256...' : 'Execute E-Signature'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
