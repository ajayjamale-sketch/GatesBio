import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton, Chip } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BiotechIcon from '@mui/icons-material/Biotech';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FactCheckIcon from '@mui/icons-material/FactCheck';

interface HeroCarouselProps {
  onOpenDemo: () => void;
  onExploreTools?: () => void;
}

interface SlideItem {
  id: number;
  tag: string;
  tagIcon: React.ReactNode;
  headline: string;
  subhead: string;
  imageUrl: string;
  ctaText: string;
  accentColor: string;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onOpenDemo }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const slides: SlideItem[] = [
    {
      id: 0,
      tag: 'UNIFIED BIOTECH OS',
      tagIcon: <BiotechIcon fontSize="small" />,
      headline: 'The Digital Operating System for Life Sciences',
      subhead: 'Connect sample logistics, 96-well plates, ELN protocols, and 21 CFR Part 11 audit trails in one unified platform.',
      imageUrl: '/images/hero-biotech-os.jpg',
      ctaText: 'Schedule a Guided Demo',
      accentColor: '#1E40AF',
    },
    {
      id: 1,
      tag: 'LIMS & SPECIMEN LOGISTICS',
      tagIcon: <QrCodeScannerIcon fontSize="small" />,
      headline: 'Zero-Error Sample Tracking from Freezer to Assay',
      subhead: '2D barcode accessioning, automated freeze-thaw alerts, and robotic liquid handler integration.',
      imageUrl: '/images/hero-lims-logistics.jpg',
      ctaText: 'Explore LIMS Features',
      accentColor: '#1E40AF',
    },
    {
      id: 2,
      tag: 'ELECTRONIC LAB NOTEBOOK',
      tagIcon: <MenuBookIcon fontSize="small" />,
      headline: 'Standardized Protocols with Real-Time Timers & Math',
      subhead: 'Replace handwritten notebooks with dynamic digital SOPs, reaction timers, and inline LaTeX formulas.',
      imageUrl: '/images/hero-eln-protocols.jpg',
      ctaText: 'Tour ELN Notebook',
      accentColor: '#1E40AF',
    },
    {
      id: 3,
      tag: 'AI RESEARCH INTELLIGENCE',
      tagIcon: <AutoAwesomeIcon fontSize="small" />,
      headline: 'Literature Synthesis & Molecular Target Insights',
      subhead: 'Query PubMed Central and bioRxiv literature with verifiable DOI citations and target pathway predictions.',
      imageUrl: '/images/hero-ai-intelligence.jpg',
      ctaText: 'Try AI Scientific Engine',
      accentColor: '#1E40AF',
    },
    {
      id: 4,
      tag: 'REGULATORY COMPLIANCE',
      tagIcon: <FactCheckIcon fontSize="small" />,
      headline: 'Audit-Ready 21 CFR Part 11 Electronic Signatures',
      subhead: 'Cryptographic SHA-256 Merkle chain audit trails and dual-factor sign-offs for continuous inspection readiness.',
      imageUrl: '/images/hero-compliance-audit.jpg',
      ctaText: 'View Compliance Portal',
      accentColor: '#1E40AF',
    },
  ];

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  const slide = slides[currentSlide];

  return (
    <Box
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        minHeight: { xs: 440, sm: 480, md: 520 },
        borderRadius: 0,
        m: 0,
        p: 0,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        bgcolor: '#0F172A',
        userSelect: 'none',
      }}
    >
      {/* Background Images with Cross-Fade */}
      {slides.map((s, idx) => (
        <Box
          key={s.id}
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${s.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: idx === currentSlide ? 1 : 0,
            transform: idx === currentSlide ? 'scale(1)' : 'scale(1.03)',
            transition: 'opacity 0.7s ease-in-out, transform 1.2s ease-out',
            zIndex: 1,
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: {
                xs: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.45) 50%, rgba(15, 23, 42, 0.1) 100%)',
                md: 'linear-gradient(90deg, rgba(15, 23, 42, 0.78) 0%, rgba(15, 23, 42, 0.42) 48%, rgba(15, 23, 42, 0.05) 100%), linear-gradient(to top, rgba(15, 23, 42, 0.65) 0%, transparent 45%)',
              },
            },
          }}
        />
      ))}

      {/* Slide Foreground Content (Aligned towards the bottom) */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 1280,
          mx: 'auto',
          px: { xs: 2.5, sm: 5, md: 8 },
          pt: { xs: 4, sm: 5 },
          pb: { xs: 6.5, sm: 7, md: 8 },
          color: '#FFFFFF',
          boxSizing: 'border-box',
        }}
      >
        <Box sx={{ maxWidth: { xs: '100%', sm: 600, md: 680 } }}>
          {/* Minimal Tag Pill */}
          <Chip
            icon={<Box component="span" sx={{ display: 'flex', color: '#FFFFFF !important' }}>{slide.tagIcon}</Box>}
            label={slide.tag}
            size="small"
            sx={{
              bgcolor: slide.accentColor,
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: { xs: '10px', sm: '11px' },
              letterSpacing: '0.6px',
              mb: { xs: 1.5, sm: 2 },
              height: { xs: 24, sm: 26 },
            }}
          />

          {/* Clean Responsive Headline */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '22px', sm: '30px', md: '38px' },
              fontWeight: 800,
              lineHeight: { xs: 1.25, sm: 1.2 },
              letterSpacing: '-0.02em',
              mb: { xs: 1.2, sm: 1.5 },
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.85), 0 1px 3px rgba(0, 0, 0, 0.9)',
              wordBreak: 'break-word',
            }}
          >
            {slide.headline}
          </Typography>

          {/* Concise Subhead */}
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '13px', sm: '14px', md: '16px' },
              lineHeight: 1.5,
              color: '#F1F5F9',
              mb: { xs: 2.5, sm: 3 },
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 0.9)',
            }}
          >
            {slide.subhead}
          </Typography>

          {/* Single High-Intent CTA */}
          <Button
            variant="contained"
            size="medium"
            onClick={onOpenDemo}
            endIcon={<ArrowForwardIcon sx={{ fontSize: '15px !important' }} />}
            sx={{
              bgcolor: '#1E40AF',
              '&:hover': { bgcolor: '#1D4ED8' },
              px: { xs: 2.5, sm: 3 },
              py: { xs: 0.8, sm: 1 },
              fontSize: { xs: '12px', sm: '13px' },
              fontWeight: 700,
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(30, 64, 175, 0.4)',
              whiteSpace: 'nowrap',
            }}
          >
            {slide.ctaText}
          </Button>
        </Box>
      </Box>

      {/* Sleek Left / Right Navigation (Desktop only to prevent mobile overlap) */}
      <IconButton
        onClick={handlePrev}
        aria-label="Previous Slide"
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'absolute',
          left: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
          color: 'rgba(255, 255, 255, 0.75)',
          bgcolor: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(4px)',
          '&:hover': {
            bgcolor: 'rgba(30, 64, 175, 0.85)',
            color: '#FFFFFF',
          },
          p: 1.2,
        }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
      </IconButton>

      <IconButton
        onClick={handleNext}
        aria-label="Next Slide"
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'absolute',
          right: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
          color: 'rgba(255, 255, 255, 0.75)',
          bgcolor: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(4px)',
          '&:hover': {
            bgcolor: 'rgba(30, 64, 175, 0.85)',
            color: '#FFFFFF',
          },
          p: 1.2,
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
      </IconButton>

      {/* Minimal Bottom Indicator Dots */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 12, sm: 16 },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 0.8, sm: 1 },
          px: 1.2,
          py: 0.6,
          borderRadius: 999,
          bgcolor: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(4px)',
        }}
      >
        {slides.map((s, idx) => (
          <Box
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            sx={{
              width: idx === currentSlide ? { xs: 20, sm: 24 } : { xs: 6, sm: 8 },
              height: { xs: 5, sm: 6 },
              borderRadius: 3,
              bgcolor: idx === currentSlide ? '#10B981' : 'rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: idx === currentSlide ? '#10B981' : 'rgba(255, 255, 255, 0.8)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
