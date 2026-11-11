import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  Chip,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import BiotechIcon from '@mui/icons-material/Biotech';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import HubIcon from '@mui/icons-material/Hub';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CalculateIcon from '@mui/icons-material/Calculate';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArticleIcon from '@mui/icons-material/Article';
import type { PublicRoute } from '../../types';

interface PublicNavbarProps {
  currentRoute: PublicRoute;
  onNavigate: (route: PublicRoute) => void;
  onOpenDemo: () => void;
  onOpenLogin: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenDemo,
  onOpenLogin,
}) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleRouteSelect = (route: PublicRoute) => {
    setMobileDrawerOpen(false);
    onNavigate(route);
  };

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      {/* 1. Sleek Production Announcement Ribbon */}
     

      {/* 2. Main Navigation Bar */}
      <Box
        className="container-custom"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: { xs: 60, sm: 68 },
          px: { xs: 1.5, sm: 2 },
        }}
      >
        {/* Left: Brand Identity */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, lg: 3 } }}>
          <Box
            onClick={() => handleRouteSelect('home')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <Box
              sx={{
                width: { xs: 32, sm: 38 },
                height: { xs: 32, sm: 38 },
                borderRadius: 2,
                bgcolor: '#1E40AF',
                background: 'linear-gradient(135deg, #1E40AF 0%, #0F766E 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 4px 10px rgba(30, 64, 175, 0.3)',
                flexShrink: 0,
              }}
            >
              <BiotechIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
            </Box>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    color: '#0F172A',
                    fontSize: { xs: '18px', sm: '21px' },
                    whiteSpace: 'nowrap',
                  }}
                >
                  Gats<span style={{ color: '#0F766E' }}>Bio</span>
                </Typography>
                <Chip
                  label="Enterprise"
                  size="small"
                  sx={{
                    display: { xs: 'none', md: 'inline-flex' },
                    bgcolor: '#EFF6FF',
                    color: '#1E40AF',
                    fontWeight: 700,
                    fontSize: '10px',
                    height: 18,
                  }}
                />
              </Box>
              <Typography
                variant="caption"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  color: '#64748B',
                  fontWeight: 600,
                  fontSize: '10px',
                  letterSpacing: '0.5px',
                  whiteSpace: 'nowrap',
                }}
              >
                LIFE SCIENCES OPERATING SYSTEM
              </Typography>
            </Box>
          </Box>

          {/* Desktop Navigation Links */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {/* Direct Link: Platform */}
            <Button
              onClick={() => handleRouteSelect('platform')}
              sx={{
                color: currentRoute === 'platform' ? '#1E40AF' : '#334155',
                fontWeight: 600,
                fontSize: '14px',
                px: 1.5,
                py: 0.8,
                borderRadius: 2,
                bgcolor: currentRoute === 'platform' ? '#EFF6FF' : 'transparent',
                '&:hover': { bgcolor: '#F8FAFC', color: '#1E40AF' },
              }}
            >
              Platform
            </Button>

            {/* Direct Link: Tailored Solutions */}
            <Button
              onClick={() => handleRouteSelect('tailored-solutions')}
              sx={{
                color: currentRoute === 'tailored-solutions' ? '#1E40AF' : '#334155',
                fontWeight: 600,
                fontSize: '14px',
                px: 1.5,
                py: 0.8,
                borderRadius: 2,
                bgcolor: currentRoute === 'tailored-solutions' ? '#EFF6FF' : 'transparent',
                '&:hover': { bgcolor: '#F8FAFC', color: '#1E40AF' },
              }}
            >
              Tailored Solutions
            </Button>

            {/* Direct Link: Resources */}
            <Button
              onClick={() => handleRouteSelect('resources')}
              sx={{
                color: currentRoute === 'resources' ? '#1E40AF' : '#334155',
                fontWeight: 600,
                fontSize: '14px',
                px: 1.5,
                py: 0.8,
                borderRadius: 2,
                bgcolor: currentRoute === 'resources' ? '#EFF6FF' : 'transparent',
                '&:hover': { bgcolor: '#F8FAFC', color: '#1E40AF' },
              }}
            >
              Resources
            </Button>

            {/* Direct Link: Compliance */}
            <Button
              onClick={() => handleRouteSelect('compliance')}
              sx={{
                color: currentRoute === 'compliance' ? '#1E40AF' : '#334155',
                fontWeight: 600,
                fontSize: '14px',
                px: 1.5,
                py: 0.8,
                borderRadius: 2,
                bgcolor: currentRoute === 'compliance' ? '#EFF6FF' : 'transparent',
                '&:hover': { bgcolor: '#F8FAFC', color: '#1E40AF' },
              }}
            >
              Trust & Compliance
            </Button>

            {/* Direct Link: Pricing */}
            <Button
              onClick={() => handleRouteSelect('pricing')}
              sx={{
                color: currentRoute === 'pricing' ? '#1E40AF' : '#334155',
                fontWeight: 600,
                fontSize: '14px',
                px: 1.5,
                py: 0.8,
                borderRadius: 2,
                '&:hover': { bgcolor: '#F8FAFC', color: '#1E40AF' },
              }}
            >
              Pricing
            </Button>
          </Box>
        </Box>

       

        {/* Right Actions Suite */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.8, sm: 1.5 }, flexShrink: 0 }}>
          <Button
            onClick={onOpenLogin}
            variant="text"
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              color: '#334155',
              fontWeight: 700,
              fontSize: '14px',
              px: 1.8,
              py: 0.8,
              borderRadius: 2,
              whiteSpace: 'nowrap',
              '&:hover': { bgcolor: '#F1F5F9' },
            }}
          >
            Sign In
          </Button>

          <Button
            variant="contained"
            onClick={onOpenDemo}
            endIcon={<ArrowForwardIcon sx={{ fontSize: '14px !important', display: { xs: 'none', sm: 'inline-block' } }} />}
            sx={{
              bgcolor: '#1E40AF',
              '&:hover': { bgcolor: '#1D4ED8' },
              fontWeight: 800,
              fontSize: { xs: '11px', sm: '13px' },
              px: { xs: 1.4, sm: 2.4 },
              py: { xs: 0.6, sm: 0.9 },
              borderRadius: 2,
              whiteSpace: 'nowrap',
              minWidth: 'auto',
              boxShadow: '0 4px 10px rgba(30, 64, 175, 0.3)',
            }}
          >
            Book a Demo
          </Button>

          {/* Mobile Hamburger Toggle */}
          <IconButton
            onClick={() => setMobileDrawerOpen(true)}
            sx={{
              display: { xs: 'inline-flex', lg: 'none' },
              color: '#0F172A',
              p: { xs: 0.8, sm: 1 },
              ml: { xs: 0.2, sm: 0.5 },
            }}
          >
            <MenuIcon sx={{ fontSize: { xs: 24, sm: 26 } }} />
          </IconButton>
        </Box>
      </Box>

      {/* =========================================================================
          MOBILE ENTERPRISE SLIDE-OVER DRAWER
          ========================================================================= */}
      <Drawer
        anchor="right"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 320,
              maxWidth: '85vw',
              p: 2.5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            },
          },
        }}
      >
        <Box>
          {/* Drawer Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 2,
                  bgcolor: '#1E40AF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                <BiotechIcon sx={{ fontSize: 20 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 900, color: '#0F172A', fontSize: '18px' }}>
                Gats<span style={{ color: '#0F766E' }}>Bio</span>
              </Typography>
            </Box>
            <IconButton onClick={() => setMobileDrawerOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
            {[
              { label: 'Home', route: 'home' as PublicRoute, icon: <BiotechIcon fontSize="small" /> },
              { label: 'Platform Overview', route: 'platform' as PublicRoute, icon: <QrCodeScannerIcon fontSize="small" /> },
              { label: 'Tailored Solutions', route: 'tailored-solutions' as PublicRoute, icon: <HubIcon fontSize="small" /> },
              { label: 'Resources & Lab Utilities', route: 'resources' as PublicRoute, icon: <ArticleIcon fontSize="small" /> },
              { label: 'Trust & Compliance (21 CFR)', route: 'compliance' as PublicRoute, icon: <FactCheckIcon fontSize="small" /> },
              { label: 'Pricing & Plans', route: 'pricing' as PublicRoute, icon: <VerifiedUserIcon fontSize="small" /> },
              { label: 'Free Lab Calculators', route: 'tools' as PublicRoute, icon: <CalculateIcon fontSize="small" /> },
            ].map((link, idx) => (
              <Box
                key={idx}
                onClick={() => handleRouteSelect(link.route)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1.2,
                  borderRadius: 2,
                  cursor: 'pointer',
                  color: currentRoute === link.route ? '#1E40AF' : '#334155',
                  bgcolor: currentRoute === link.route ? '#EFF6FF' : 'transparent',
                  fontWeight: currentRoute === link.route ? 800 : 600,
                  fontSize: '14px',
                  '&:hover': { bgcolor: '#F8FAFC' },
                }}
              >
                {link.icon}
                <span>{link.label}</span>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Drawer Bottom Actions */}
        <Box sx={{ pt: 2, borderTop: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              setMobileDrawerOpen(false);
              onOpenLogin();
            }}
            sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 700, py: 1 }}
          >
            Sign In to Lab Workstation
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              setMobileDrawerOpen(false);
              onOpenDemo();
            }}
            sx={{ bgcolor: '#1E40AF', fontWeight: 800, py: 1 }}
          >
            Book a Guided Demo
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
            <Chip size="small" label="ISO 17025" sx={{ height: 18, fontSize: '9px' }} />
            <Chip size="small" label="FDA 21 CFR Part 11" sx={{ height: 18, fontSize: '9px' }} />
            <Chip size="small" label="HIPAA" sx={{ height: 18, fontSize: '9px' }} />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
