import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArticleIcon from '@mui/icons-material/Article';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalculateIcon from '@mui/icons-material/Calculate';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import {
  RESOURCE_QUICK_JUMPS,
  type ResourceCategoryId,
} from '../../../data/resourcesData';

interface ResourcesHeroProps {
  onOpenDemo: () => void;
  onSelectCategory: (category: ResourceCategoryId) => void;
}

const JUMP_ICONS: Record<string, React.ReactNode> = {
  whitepapers: <ArticleIcon sx={{ color: '#1E40AF', fontSize: 20 }} />,
  templates: <MenuBookIcon sx={{ color: '#0F766E', fontSize: 20 }} />,
  calculators: <CalculateIcon sx={{ color: '#7E22CE', fontSize: 20 }} />,
  webinars: <VideoLibraryIcon sx={{ color: '#0284C7', fontSize: 20 }} />,
};

export const ResourcesHero: React.FC<ResourcesHeroProps> = ({
  onOpenDemo,
  onSelectCategory,
}) => {
  const handleJump = (sectionId: string, category?: ResourceCategoryId) => {
    if (category) {
      onSelectCategory(category);
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        pb: { xs: 4, md: 5.5 },
      }}
    >
      {/* Full-Width Responsive Hero Banner */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: { xs: 360, sm: 420, md: 480 },
          display: 'flex',
          alignItems: 'flex-end',
          bgcolor: '#0F172A',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src="/images/resources-hero.jpg"
          alt="Modern life sciences informatics center with scientists reviewing molecular and genomic data"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: { xs: '72% center', sm: '62% center', md: 'center center' },
            zIndex: 0,
          }}
        />

        {/* Directional Gradient Scrim */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: {
              xs: 'linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.52) 58%, rgba(15, 23, 42, 0.14) 100%)',
              md: 'linear-gradient(90deg, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.48) 46%, rgba(15, 23, 42, 0.08) 100%), linear-gradient(to top, rgba(15, 23, 42, 0.62) 0%, transparent 45%)',
            },
          }}
        />

        {/* Bottom-Left Foreground Content */}
        <Box
          className="container-custom"
          sx={{
            position: 'relative',
            zIndex: 2,
            pt: { xs: 4, sm: 5 },
            pb: { xs: 4.5, sm: 6, md: 7 },
            color: '#FFFFFF',
          }}
        >
          <Box sx={{ maxWidth: { xs: '100%', sm: 500, md: 570 } }}>
            <Chip
              label="RESOURCES & LAB UTILITIES"
              size="small"
              sx={{
                bgcolor: '#1E40AF',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: { xs: '10px', sm: '11px' },
                letterSpacing: '0.6px',
                mb: 1.5,
                height: 24,
              }}
            />

            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                color: '#FFFFFF',
                fontSize: { xs: '24px', sm: '32px', md: '40px' },
                lineHeight: 1.18,
                letterSpacing: '-0.02em',
                mb: 1.25,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
              }}
            >
              Scientific Blueprints, Regulatory Guides & Lab Calculators
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#F1F5F9',
                fontSize: { xs: '13.5px', sm: '15px', md: '16px' },
                lineHeight: 1.55,
                mb: 2.5,
                textShadow: '0 1px 6px rgba(0, 0, 0, 0.8)',
              }}
            >
              Access FDA 21 CFR Part 11 validation kits, ELN SOP templates, interactive dilution and primer Tm utilities, and technical workshops.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              <Button
                variant="contained"
                size="medium"
                onClick={onOpenDemo}
                endIcon={<ArrowForwardIcon sx={{ fontSize: '16px !important' }} />}
                sx={{
                  bgcolor: '#1E40AF',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  px: { xs: 2.5, sm: 3 },
                  py: { xs: 0.9, sm: 1.1 },
                  fontSize: { xs: '13px', sm: '14px' },
                  borderRadius: 2,
                  boxShadow: '0 4px 14px rgba(30, 64, 175, 0.45)',
                  '&:hover': { bgcolor: '#1D4ED8' },
                }}
              >
                Request Validation Kit
              </Button>
              <Button
                variant="outlined"
                size="medium"
                onClick={() => handleJump('resources-library', 'all')}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.45)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  px: { xs: 2.2, sm: 2.8 },
                  py: { xs: 0.9, sm: 1.1 },
                  fontSize: { xs: '13px', sm: '14px' },
                  borderRadius: 2,
                  bgcolor: 'rgba(15, 23, 42, 0.35)',
                  '&:hover': {
                    borderColor: '#FFFFFF',
                    bgcolor: 'rgba(255, 255, 255, 0.12)',
                  },
                }}
              >
                Browse Resource Library
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Responsive Quick-Jump Resource Category Bar */}
      <Box className="container-custom" sx={{ mt: { xs: 3, md: 4.5 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
            gap: 2.5,
          }}
        >
          {RESOURCE_QUICK_JUMPS.map((item) => (
            <Box
              key={item.id}
              onClick={() => handleJump(item.targetSection, item.categoryFilter)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleJump(item.targetSection, item.categoryFilter);
                }
              }}
              sx={{
                bgcolor: '#F8FAFC',
                p: 2.25,
                borderRadius: 3,
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
                transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  borderColor: item.accentColor,
                  boxShadow: '0 10px 24px -8px rgba(15, 23, 42, 0.12)',
                },
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2.5,
                  bgcolor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {JUMP_ICONS[item.id]}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.2, fontSize: '15px' }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: '#64748B', fontWeight: 500, display: 'block', mt: 0.25 }}
                >
                  {item.subtitle}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
