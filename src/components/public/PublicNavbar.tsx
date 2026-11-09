import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Popover,
  Drawer,
  Chip,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BiotechIcon from '@mui/icons-material/Biotech';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import StorageIcon from '@mui/icons-material/Storage';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import MedicationIcon from '@mui/icons-material/Medication';
import SchoolIcon from '@mui/icons-material/School';
import HubIcon from '@mui/icons-material/Hub';
import ScienceIcon from '@mui/icons-material/Science';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CalculateIcon from '@mui/icons-material/Calculate';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArticleIcon from '@mui/icons-material/Article';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
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
  const [platformAnchor, setPlatformAnchor] = useState<null | HTMLElement>(null);
  const [solutionsAnchor, setSolutionsAnchor] = useState<null | HTMLElement>(null);
  const [resourcesAnchor, setResourcesAnchor] = useState<null | HTMLElement>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleCloseMenus = () => {
    setPlatformAnchor(null);
    setSolutionsAnchor(null);
    setResourcesAnchor(null);
  };

  const handleRouteSelect = (route: PublicRoute) => {
    handleCloseMenus();
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
            {/* Platform Mega-Menu Trigger */}
            <Button
              onClick={(e) => setPlatformAnchor(e.currentTarget)}
              endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 16 }} />}
              sx={{
                color: currentRoute === 'platform' ? '#1E40AF' : '#334155',
                fontWeight: 600,
                fontSize: '14px',
                px: 1.5,
                py: 0.8,
                borderRadius: 2,
                '&:hover': { bgcolor: '#F8FAFC', color: '#1E40AF' },
              }}
            >
              Platform
            </Button>

            {/* Solutions Mega-Menu Trigger */}
            <Button
              onClick={(e) => setSolutionsAnchor(e.currentTarget)}
              endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 16 }} />}
              sx={{
                color: currentRoute === 'solutions' ? '#1E40AF' : '#334155',
                fontWeight: 600,
                fontSize: '14px',
                px: 1.5,
                py: 0.8,
                borderRadius: 2,
                '&:hover': { bgcolor: '#F8FAFC', color: '#1E40AF' },
              }}
            >
              Solutions
            </Button>

            {/* Resources Dropdown Trigger */}
            <Button
              onClick={(e) => setResourcesAnchor(e.currentTarget)}
              endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 16 }} />}
              sx={{
                color: currentRoute === 'tools' ? '#1E40AF' : '#334155',
                fontWeight: 600,
                fontSize: '14px',
                px: 1.5,
                py: 0.8,
                borderRadius: 2,
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
          PRODUCTION MEGA-MENU: PLATFORM (Rich 2-Column Flyout)
          ========================================================================= */}
      <Popover
        open={Boolean(platformAnchor)}
        anchorEl={platformAnchor}
        onClose={handleCloseMenus}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              width: 720,
              maxWidth: '90vw',
              mt: 1.5,
              borderRadius: 3,
              boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(226, 232, 240, 0.8)',
              overflow: 'hidden',
              p: 0,
            },
          },
        }}
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr' }}>
          {/* Main Capabilities Column */}
          <Box sx={{ p: 3, bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 800, letterSpacing: '0.8px', textTransform: 'uppercase', mb: 2, display: 'block' }}>
              Platform Capabilities
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                {
                  icon: <QrCodeScannerIcon sx={{ color: '#1E40AF' }} />,
                  title: 'LIMS & Sample Logistics',
                  desc: '2D Barcodes, 96/384-well microplates & cold-chain storage',
                  route: 'platform' as PublicRoute,
                },
                {
                  icon: <MenuBookIcon sx={{ color: '#0F766E' }} />,
                  title: 'Electronic Lab Notebook (ELN)',
                  desc: 'Protocol SOP checklists, LaTeX chemical math & reaction timers',
                  route: 'platform' as PublicRoute,
                },
                {
                  icon: <AutoAwesomeIcon sx={{ color: '#7E22CE' }} />,
                  title: 'AI Scientific Research Engine',
                  desc: 'PubMed Central & bioRxiv RAG literature synthesis',
                  badge: 'v2.4',
                  route: 'platform' as PublicRoute,
                },
                {
                  icon: <StorageIcon sx={{ color: '#0284C7' }} />,
                  title: 'Biological Data Lake',
                  desc: 'FASTQ, BAM, VCF & multi-omics data versioning',
                  route: 'platform' as PublicRoute,
                },
                {
                  icon: <DeviceHubIcon sx={{ color: '#F59E0B' }} />,
                  title: 'Equipment IoT & Maintenance',
                  desc: 'Instrument calibration schedules & live freezer sensor telemetry',
                  route: 'platform' as PublicRoute,
                },
                {
                  icon: <MedicationIcon sx={{ color: '#DC2626' }} />,
                  title: 'Clinical Trials (GCP)',
                  desc: 'Cohort management, e-Consent & MedDRA adverse event reporting',
                  route: 'platform' as PublicRoute,
                },
              ].map((item, idx) => (
                <Box
                  key={idx}
                  onClick={() => handleRouteSelect(item.route)}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.5,
                    p: 1.2,
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    '&:hover': { bgcolor: '#F8FAFC' },
                  }}
                >
                  <Box sx={{ p: 1, bgcolor: '#F1F5F9', borderRadius: 2, display: 'flex', mt: 0.3 }}>
                    {item.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', fontSize: '13px' }}>
                        {item.title}
                      </Typography>
                      {item.badge && (
                        <Chip size="small" label={item.badge} sx={{ height: 16, fontSize: '9px', fontWeight: 800, bgcolor: '#FAF5FF', color: '#7E22CE' }} />
                      )}
                    </Box>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block', lineHeight: 1.3 }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right Highlight / Automation Box */}
          <Box sx={{ p: 3, bgcolor: '#F8FAFC', borderLeft: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 800, letterSpacing: '0.8px', textTransform: 'uppercase', mb: 2, display: 'block' }}>
                Hardware & Automation
              </Typography>

              <Box sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #E2E8F0', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <PrecisionManufacturingIcon sx={{ color: '#1E40AF', fontSize: 18 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '12px' }}>
                    Robotics Liquid Handlers
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#64748B', lineHeight: 1.4, display: 'block' }}>
                  Direct automated well instructions for Tecan Fluent & Hamilton Microlab STAR workstations.
                </Typography>
              </Box>

              <Box sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <VerifiedUserIcon sx={{ color: '#10B981', fontSize: 18 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '12px' }}>
                    FDA 21 CFR Part 11
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#64748B', lineHeight: 1.4, display: 'block' }}>
                  Cryptographic dual-key e-signatures and immutable SHA-256 Merkle audit trails.
                </Typography>
              </Box>
            </div>

            <Button
              onClick={() => handleRouteSelect('platform')}
              endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
              sx={{ color: '#1E40AF', fontWeight: 700, fontSize: '12px', justifyContent: 'flex-start', p: 0, mt: 2 }}
            >
              View Full Platform Architecture
            </Button>
          </Box>
        </Box>
      </Popover>

      {/* =========================================================================
          PRODUCTION MEGA-MENU: SOLUTIONS (Segmented by Sector & Persona)
          ========================================================================= */}
      <Popover
        open={Boolean(solutionsAnchor)}
        anchorEl={solutionsAnchor}
        onClose={handleCloseMenus}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              width: 600,
              maxWidth: '90vw',
              mt: 1.5,
              borderRadius: 3,
              boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(226, 232, 240, 0.8)',
              p: 3,
            },
          },
        }}
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
          {/* By Industry */}
          <div>
            <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 800, letterSpacing: '0.8px', textTransform: 'uppercase', mb: 2, display: 'block' }}>
              By Industry
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {[
                { icon: <BiotechIcon sx={{ color: '#1E40AF', fontSize: 18 }} />, name: 'Biopharma & Therapeutics', desc: 'Preclinical lead discovery to IND filing' },
                { icon: <SchoolIcon sx={{ color: '#0F766E', fontSize: 18 }} />, name: 'Academic Research Labs', desc: 'Protocol preservation & grant budgets' },
                { icon: <HubIcon sx={{ color: '#7E22CE', fontSize: 18 }} />, name: 'CRO Testing Services', desc: 'Client isolation & rapid CoA reports' },
                { icon: <ScienceIcon sx={{ color: '#0284C7', fontSize: 18 }} />, name: 'Clinical Diagnostics', desc: 'High-throughput barcode accessioning' },
              ].map((s, idx) => (
                <Box
                  key={idx}
                  onClick={() => handleRouteSelect('solutions')}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#F8FAFC' },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {s.icon}
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>
                      {s.name}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block', pl: 3.2 }}>
                    {s.desc}
                  </Typography>
                </Box>
              ))}
            </Box>
          </div>

          {/* By Scientific Role */}
          <Box sx={{ pl: 2, borderLeft: '1px solid #E2E8F0' }}>
            <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 800, letterSpacing: '0.8px', textTransform: 'uppercase', mb: 2, display: 'block' }}>
              By Role
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              <Box onClick={() => handleRouteSelect('solutions')} sx={{ p: 1, borderRadius: 2, cursor: 'pointer', '&:hover': { bgcolor: '#F8FAFC' } }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>
                  Principal Investigators (PIs)
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  Ensure reproducibility and monitor milestone progress
                </Typography>
              </Box>
              <Box onClick={() => handleRouteSelect('solutions')} sx={{ p: 1, borderRadius: 2, cursor: 'pointer', '&:hover': { bgcolor: '#F8FAFC' } }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>
                  Lab Operations Directors
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  Optimize instrument booking, calibration, and reagent spend
                </Typography>
              </Box>
              <Box onClick={() => handleRouteSelect('compliance')} sx={{ p: 1, borderRadius: 2, cursor: 'pointer', '&:hover': { bgcolor: '#F8FAFC' } }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>
                  QA & Compliance Officers
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  Audit logs, electronic signatures, and GxP validation
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Popover>

      {/* =========================================================================
          PRODUCTION MEGA-MENU: RESOURCES & FREE LAB TOOLS
          ========================================================================= */}
      <Popover
        open={Boolean(resourcesAnchor)}
        anchorEl={resourcesAnchor}
        onClose={handleCloseMenus}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              width: 500,
              maxWidth: '90vw',
              mt: 1.5,
              borderRadius: 3,
              boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(226, 232, 240, 0.8)',
              p: 3,
            },
          },
        }}
      >
        <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 800, letterSpacing: '0.8px', textTransform: 'uppercase', mb: 2, display: 'block' }}>
          Free Scientific Utilities & Insights
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box
            onClick={() => handleRouteSelect('tools')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1.2,
              borderRadius: 2,
              cursor: 'pointer',
              '&:hover': { bgcolor: '#F8FAFC' },
            }}
          >
            <Box sx={{ p: 1, bgcolor: '#EFF6FF', borderRadius: 2, color: '#1E40AF', display: 'flex' }}>
              <CalculateIcon fontSize="small" />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>
                Free Laboratory Calculators
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                Interactive serial dilution gradient & DNA/RNA primer Tm calculator
              </Typography>
            </Box>
          </Box>

          <Box
            onClick={() => handleRouteSelect('compliance')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1.2,
              borderRadius: 2,
              cursor: 'pointer',
              '&:hover': { bgcolor: '#F8FAFC' },
            }}
          >
            <Box sx={{ p: 1, bgcolor: '#F0FDF4', borderRadius: 2, color: '#0F766E', display: 'flex' }}>
              <ArticleIcon fontSize="small" />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>
                FDA 21 CFR Part 11 Regulatory Whitepaper
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                Complete computerized validation guide for life sciences teams
              </Typography>
            </Box>
          </Box>

          <Box
            onClick={() => handleRouteSelect('pricing')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1.2,
              borderRadius: 2,
              cursor: 'pointer',
              '&:hover': { bgcolor: '#F8FAFC' },
            }}
          >
            <Box sx={{ p: 1, bgcolor: '#FAF5FF', borderRadius: 2, color: '#7E22CE', display: 'flex' }}>
              <FactCheckIcon fontSize="small" />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>
                Interactive ROI & Headcount Estimator
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                Model weekly research labor hours reclaimed by migrating to GatsBio
              </Typography>
            </Box>
          </Box>
        </Box>
      </Popover>

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
              { label: 'Tailored Solutions', route: 'solutions' as PublicRoute, icon: <HubIcon fontSize="small" /> },
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
