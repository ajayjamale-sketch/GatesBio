import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  Chip,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  Tooltip,
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
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { getUserInitials } from '../../config/roleAccess';
import type { PublicRoute } from '../../types';
import type { DashboardSession } from '../../types/dashboard';

interface PublicNavbarProps {
  currentRoute: PublicRoute;
  session: DashboardSession | null;
  onNavigate: (route: PublicRoute) => void;
  onOpenDemo: () => void;
  onOpenLogin: () => void;
  onOpenSignup: () => void;
  onGoToDashboard: () => void;
  onOpenProfile: () => void;
  onSignOut: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  currentRoute,
  session,
  onNavigate,
  onOpenDemo,
  onOpenLogin,
  onOpenSignup,
  onGoToDashboard,
  onOpenProfile,
  onSignOut,
}) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null);

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
          {session ? (
            <>
              <Button
                variant="contained"
                onClick={onGoToDashboard}
                startIcon={<DashboardOutlinedIcon sx={{ fontSize: '16px !important' }} />}
                sx={{
                  bgcolor: '#1E40AF',
                  '&:hover': { bgcolor: '#1D4ED8' },
                  fontWeight: 800,
                  fontSize: { xs: '11px', sm: '13px' },
                  px: { xs: 1.4, sm: 2.2 },
                  py: { xs: 0.6, sm: 0.85 },
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                  minWidth: 'auto',
                  boxShadow: '0 4px 10px rgba(30, 64, 175, 0.25)',
                }}
              >
                Go to Dashboard
              </Button>

              <Tooltip title={`${session.userName} (${session.roleTitle})`}>
                <IconButton
                  size="small"
                  aria-label="Open profile menu"
                  onClick={(e) => setProfileMenuAnchor(e.currentTarget)}
                  sx={{
                    p: 0.25,
                    borderRadius: '50%',
                    border: '2px solid #DBEAFE',
                    '&:hover': { borderColor: '#1E40AF' },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 34,
                      height: 34,
                      bgcolor: '#1E40AF',
                      color: '#FFFFFF',
                      fontSize: '12.5px',
                      fontWeight: 800,
                    }}
                  >
                    {getUserInitials(session.userName)}
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={profileMenuAnchor}
                open={Boolean(profileMenuAnchor)}
                onClose={() => setProfileMenuAnchor(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 1,
                      minWidth: 230,
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.12)',
                    },
                  },
                }}
              >
                <Box sx={{ px: 2, py: 1.25 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                    {session.userName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 0.25 }}>
                    {session.email}
                  </Typography>
                  <Chip
                    size="small"
                    label={session.roleTitle}
                    sx={{
                      mt: 0.75,
                      height: 20,
                      fontSize: '10px',
                      fontWeight: 700,
                      bgcolor: '#EFF6FF',
                      color: '#1E40AF',
                      borderRadius: '4px',
                    }}
                  />
                </Box>
                <Divider />
                <MenuItem
                  onClick={() => {
                    setProfileMenuAnchor(null);
                    onOpenProfile();
                  }}
                  sx={{ fontSize: '13.5px', fontWeight: 600, py: 1 }}
                >
                  <ListItemIcon>
                    <PersonOutlineIcon fontSize="small" sx={{ color: '#1E40AF' }} />
                  </ListItemIcon>
                  My Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setProfileMenuAnchor(null);
                    onGoToDashboard();
                  }}
                  sx={{ fontSize: '13.5px', fontWeight: 600, py: 1 }}
                >
                  <ListItemIcon>
                    <DashboardOutlinedIcon fontSize="small" sx={{ color: '#1E40AF' }} />
                  </ListItemIcon>
                  Go to Dashboard
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    setProfileMenuAnchor(null);
                    onSignOut();
                  }}
                  sx={{ fontSize: '13.5px', fontWeight: 700, color: '#DC2626', py: 1 }}
                >
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" sx={{ color: '#DC2626' }} />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                onClick={onOpenLogin}
                variant="text"
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  color: '#334155',
                  fontWeight: 700,
                  fontSize: '13.5px',
                  px: 1.5,
                  py: 0.75,
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                  '&:hover': { bgcolor: '#F1F5F9', color: '#1E40AF' },
                }}
              >
                Sign In
              </Button>

              <Button
                onClick={onOpenSignup}
                variant="outlined"
                sx={{
                  display: { xs: 'none', md: 'inline-flex' },
                  color: '#1E40AF',
                  borderColor: '#BFDBFE',
                  bgcolor: '#EFF6FF',
                  fontWeight: 700,
                  fontSize: '13.5px',
                  px: 1.6,
                  py: 0.7,
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                  '&:hover': { bgcolor: '#DBEAFE', borderColor: '#93C5FD' },
                }}
              >
                Sign Up
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
                  px: { xs: 1.4, sm: 2.2 },
                  py: { xs: 0.6, sm: 0.85 },
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                  minWidth: 'auto',
                  boxShadow: '0 4px 10px rgba(30, 64, 175, 0.3)',
                }}
              >
                Book a Demo
              </Button>
            </>
          )}

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
        <Box sx={{ pt: 2, borderTop: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          {session ? (
            <>
              <Box
                sx={{
                  p: 1.25,
                  borderRadius: '8px',
                  bgcolor: '#EFF6FF',
                  border: '1px solid #DBEAFE',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.25,
                }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: '#1E40AF',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: 800,
                  }}
                >
                  {getUserInitials(session.userName)}
                </Avatar>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#0F172A', display: 'block' }} noWrap>
                    {session.userName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 600, fontSize: '11px' }} noWrap>
                    {session.roleTitle}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                fullWidth
                startIcon={<DashboardOutlinedIcon fontSize="small" />}
                onClick={() => {
                  setMobileDrawerOpen(false);
                  onGoToDashboard();
                }}
                sx={{ bgcolor: '#1E40AF', '&:hover': { bgcolor: '#1D4ED8' }, fontWeight: 800, py: 1, borderRadius: '6px' }}
              >
                Go to Dashboard
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<PersonOutlineIcon fontSize="small" />}
                onClick={() => {
                  setMobileDrawerOpen(false);
                  onOpenProfile();
                }}
                sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 700, py: 0.9, borderRadius: '6px' }}
              >
                My Profile
              </Button>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                startIcon={<LogoutIcon fontSize="small" />}
                onClick={() => {
                  setMobileDrawerOpen(false);
                  onSignOut();
                }}
                sx={{ fontWeight: 700, py: 0.9, borderRadius: '6px' }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  setMobileDrawerOpen(false);
                  onOpenLogin();
                }}
                sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 700, py: 1, borderRadius: '6px' }}
              >
                Sign In to Lab Workstation
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  setMobileDrawerOpen(false);
                  onOpenSignup();
                }}
                sx={{
                  borderColor: '#BFDBFE',
                  bgcolor: '#EFF6FF',
                  color: '#1E40AF',
                  fontWeight: 700,
                  py: 1,
                  borderRadius: '6px',
                  '&:hover': { bgcolor: '#DBEAFE', borderColor: '#93C5FD' },
                }}
              >
                Create Lab Account (Sign Up)
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  setMobileDrawerOpen(false);
                  onOpenDemo();
                }}
                sx={{ bgcolor: '#1E40AF', fontWeight: 800, py: 1, borderRadius: '6px' }}
              >
                Book a Guided Demo
              </Button>
            </>
          )}
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
