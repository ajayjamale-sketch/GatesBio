import React, { useEffect, useRef } from 'react';
import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

interface CaptchaChallengeProps {
  code: string;
  onRefresh: () => void;
  value: string;
  onChange: (val: string) => void;
  error?: string | null;
  inputRef?: React.Ref<HTMLInputElement>;
}

/**
 * Interactive HTML5 Canvas CAPTCHA widget styled in the GatsBio blue theme.
 */
export const CaptchaChallenge: React.FC<CaptchaChallengeProps> = ({
  code,
  onRefresh,
  value,
  onChange,
  error,
  inputRef,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !code) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#EFF6FF');
    grad.addColorStop(1, '#DBEAFE');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle noise lines
    const lineColors = ['#93C5FD', '#60A5FA', '#BFDBFE', '#1E40AF'];
    for (let i = 0; i < 6; i += 1) {
      ctx.strokeStyle = lineColors[i % lineColors.length];
      ctx.lineWidth = 1.1;
      ctx.globalAlpha = 0.45;
      ctx.beginPath();
      ctx.moveTo((i * 34) % width, (i * 13) % height);
      ctx.bezierCurveTo(
        (i * 47 + 30) % width,
        (i * 29) % height,
        (i * 61 + 15) % width,
        height - ((i * 17) % height),
        width - ((i * 19) % 40),
        (i * 23 + 10) % height
      );
      ctx.stroke();
    }

    // Noise dots
    for (let d = 0; d < 32; d += 1) {
      ctx.fillStyle = d % 2 === 0 ? '#93C5FD' : '#3B82F6';
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.arc((d * 37 + 11) % width, (d * 23 + 7) % height, 1.3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Render distorted characters
    ctx.globalAlpha = 1;
    const charColors = ['#1E3A8A', '#1E40AF', '#0F172A', '#1D4ED8'];
    const step = (width - 28) / code.length;
    for (let i = 0; i < code.length; i += 1) {
      const ch = code[i];
      const angle = ((i % 2 === 0 ? 1 : -1) * (8 + ((ch.charCodeAt(0) + i * 7) % 14)) * Math.PI) / 180;
      const x = 18 + i * step + step * 0.35;
      const y = height / 2 + ((i % 3) - 1) * 4 + 7;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.font = '800 22px "JetBrains Mono", "Inter", monospace';
      ctx.fillStyle = charColors[i % charColors.length];
      ctx.fillText(ch, -7, 0);
      ctx.restore();
    }
  }, [code]);

  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: '8px',
        bgcolor: '#F8FAFC',
        border: `1px solid ${error ? '#FCA5A5' : '#E2E8F0'}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.25,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', letterSpacing: '0.4px' }}>
          SECURITY CAPTCHA VERIFICATION
        </Typography>
        <Typography variant="caption" sx={{ color: '#64748B', fontSize: '11px' }}>
          Enter characters shown below
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 1.25,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexShrink: 0 }}>
          <Box
            component="canvas"
            ref={canvasRef}
            width={186}
            height={50}
            aria-label="CAPTCHA security image"
            sx={{
              borderRadius: '6px',
              border: '1px solid #BFDBFE',
              display: 'block',
              maxWidth: '100%',
            }}
          />
          <Tooltip title="Refresh CAPTCHA">
            <IconButton
              type="button"
              size="small"
              aria-label="Refresh CAPTCHA"
              onClick={onRefresh}
              sx={{
                border: '1px solid #CBD5E1',
                bgcolor: '#FFFFFF',
                borderRadius: '6px',
                color: '#1E40AF',
                '&:hover': { bgcolor: '#EFF6FF' },
              }}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <TextField
          inputRef={inputRef}
          size="small"
          fullWidth
          label="Enter CAPTCHA"
          placeholder="6-char code"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          error={Boolean(error)}
          helperText={error || undefined}
          slotProps={{
            htmlInput: {
              maxLength: 8,
              style: { fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '2px' },
            },
          }}
          sx={{ bgcolor: '#FFFFFF', '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
        />
      </Box>
    </Box>
  );
};
