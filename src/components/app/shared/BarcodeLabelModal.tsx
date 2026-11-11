import React, { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  MenuItem,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import PrintIcon from '@mui/icons-material/Print';
import JsBarcode from 'jsbarcode';
import { QRCodeSVG } from 'qrcode.react';

interface BarcodeLabelModalProps {
  open: boolean;
  onClose: () => void;
  sampleId: string;
  sampleName: string;
  sampleType: string;
  storagePath: string;
  onPrintConfirm?: () => void;
}

export const BarcodeLabelModal: React.FC<BarcodeLabelModalProps> = ({
  open,
  onClose,
  sampleId,
  sampleName,
  sampleType,
  storagePath,
  onPrintConfirm,
}) => {
  const barcodeRef = useRef<SVGSVGElement | null>(null);
  const [labelFormat, setLabelFormat] = useState<'Zebra ZPL (Code 128 + QR)' | 'Brady Cryo (DataMatrix 2D)'>('Zebra ZPL (Code 128 + QR)');

  useEffect(() => {
    if (open && barcodeRef.current && sampleId) {
      try {
        JsBarcode(barcodeRef.current, sampleId, {
          format: 'CODE128',
          width: 1.8,
          height: 44,
          displayValue: true,
          fontSize: 12,
          margin: 4,
        });
      } catch {
        // Ignore invalid barcode characters
      }
    }
  }, [open, sampleId, labelFormat]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <QrCodeScannerIcon sx={{ color: '#1E40AF' }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
            Cryo Label Preview (ZPL)
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <TextField
          select
          size="small"
          fullWidth
          label="Thermal Label Format"
          value={labelFormat}
          onChange={(e) => setLabelFormat(e.target.value as 'Zebra ZPL (Code 128 + QR)' | 'Brady Cryo (DataMatrix 2D)')}
          sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '6px', fontSize: '12.5px' } }}
        >
          <MenuItem value="Zebra ZPL (Code 128 + QR)">Zebra ZPL (Code 128 + QR)</MenuItem>
          <MenuItem value="Brady Cryo (DataMatrix 2D)">Brady Cryo (DataMatrix 2D + Code 128)</MenuItem>
        </TextField>

        <Box
          sx={{
            p: 2.5,
            borderRadius: '8px',
            border: '2px dashed #CBD5E1',
            bgcolor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1.5 }}>
            <Box sx={{ minWidth: 0 }}>
              <Chip
                label={sampleType}
                size="small"
                sx={{ bgcolor: '#EFF6FF', color: '#1E40AF', border: '1px solid #DBEAFE', fontWeight: 800, fontSize: '10px', height: 20, mb: 0.75, borderRadius: '4px' }}
              />
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.25 }}>
                {sampleName}
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 0.25 }}>
                {storagePath}
              </Typography>
            </Box>
            <Box sx={{ p: 0.75, border: '1px solid #E2E8F0', borderRadius: 1.5, bgcolor: '#FFFFFF', flexShrink: 0 }}>
              <QRCodeSVG value={`gatsbio://sample/${sampleId}`} size={64} />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1, borderTop: '1px solid #F1F5F9' }}>
            <svg ref={barcodeRef} />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} sx={{ color: '#475569', fontWeight: 700 }}>
          Close
        </Button>
        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={() => {
            onPrintConfirm?.();
            onClose();
          }}
          sx={{ bgcolor: '#1E40AF', '&:hover': { bgcolor: '#1E3A8A' }, fontWeight: 700, borderRadius: '6px' }}
        >
          Send to {labelFormat.startsWith('Brady') ? 'Brady Printer' : 'Zebra Printer'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
