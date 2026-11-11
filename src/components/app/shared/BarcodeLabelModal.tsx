import React, { useEffect, useRef } from 'react';
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
  }, [open, sampleId]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <QrCodeScannerIcon sx={{ color: '#0F766E' }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
            Cryo Label Preview (ZPL)
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <Box
          sx={{
            p: 2.5,
            borderRadius: 2.5,
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
                sx={{ bgcolor: '#F0FDFA', color: '#0F766E', fontWeight: 800, fontSize: '10px', height: 20, mb: 0.75 }}
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
          sx={{ bgcolor: '#0F766E', '&:hover': { bgcolor: '#115E59' }, fontWeight: 700 }}
        >
          Send to Zebra Printer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
