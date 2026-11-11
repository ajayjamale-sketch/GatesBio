import React from 'react';
import { Box, Chip, Paper, Typography } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

interface AuthSplitLayoutProps {
  badgeLabel: string;
  headline: string;
  subheadline: string;
  imageSrc: string;
  imageAlt: string;
  highlights: string[];
  children: React.ReactNode;
}

export const AuthSplitLayout: React.FC<AuthSplitLayoutProps> = ({
  badgeLabel,
  headline,
  subheadline,
  imageSrc,
  imageAlt,
  highlights,
  children,
}) => {
  return (
    <Box
      sx={{
        bgcolor: '#F8FAFC',
        py: { xs: 3, sm: 5, md: 6 },
        px: { xs: 1.5, sm: 3 },
        minHeight: 'calc(100vh - 140px)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1120,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 0.92fr) minmax(0, 1.08fr)' },
          gap: { xs: 2.5, md: 3.5 },
          alignItems: 'stretch',
          '& > *': { minWidth: 0 },
        }}
      >
        {/* Visual Showcase Panel */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: '10px',
            border: '1px solid #DBEAFE',
            bgcolor: '#0F172A',
            color: '#FFFFFF',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              height: { xs: 190, sm: 230, md: 290 },
              overflow: 'hidden',
              bgcolor: '#1E3A8A',
            }}
          >
            <Box
              component="img"
              src={imageSrc}
              alt={imageAlt}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.12) 0%, rgba(15, 23, 42, 0.85) 100%)',
              }}
            />
            <Chip
              icon={<VerifiedUserIcon sx={{ fontSize: '14px !important', color: '#FFFFFF !important' }} />}
              label={badgeLabel}
              size="small"
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                bgcolor: 'rgba(30, 64, 175, 0.9)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '11px',
                borderRadius: '6px',
                border: '1px solid rgba(219, 234, 254, 0.35)',
              }}
            />
          </Box>

          <Box sx={{ p: { xs: 2.25, sm: 3 }, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.25, color: '#FFFFFF', fontSize: { xs: '20px', sm: '23px' } }}>
                {headline}
              </Typography>
              <Typography variant="body2" sx={{ color: '#CBD5E1', mt: 0.75, fontSize: '13.5px', lineHeight: 1.55 }}>
                {subheadline}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              {highlights.map((item) => (
                <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#60A5FA', flexShrink: 0 }} />
                  <Typography variant="caption" sx={{ color: '#E2E8F0', fontSize: '12.5px' }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', pt: 1, borderTop: '1px solid rgba(148, 163, 184, 0.25)' }}>
              {['FDA 21 CFR Part 11', 'ISO 17025', 'HIPAA / SOC 2'].map((tag) => (
                <Chip
                  key={tag}
                  size="small"
                  label={tag}
                  sx={{
                    height: 22,
                    borderRadius: '6px',
                    bgcolor: 'rgba(30, 64, 175, 0.45)',
                    color: '#DBEAFE',
                    fontSize: '10.5px',
                    fontWeight: 700,
                  }}
                />
              ))}
            </Box>
          </Box>
        </Paper>

        {/* Interactive Form Card */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3, md: 3.5 },
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            bgcolor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minWidth: 0,
          }}
        >
          {children}
        </Paper>
      </Box>
    </Box>
  );
};
