import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  List,
  ListItem,
  ListItemButton,
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
import LoginIcon from '@mui/icons-material/Login';
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
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handlePlatformClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPlatformAnchor(event.currentTarget);
  };
  const handleSolutionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSolutionsAnchor(event.currentTarget);
  };

  const handleCloseMenus = () => {
    setPlatformAnchor(null);
    setSolutionsAnchor(null);
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
        bgcolor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      <Box
        className="container-custom"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 72,
        }}
      >
        {/* Brand Logo */}
        <Box
          onClick={() => handleRouteSelect('home')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.2,
            cursor: 'pointer',
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2.5,
              bgcolor: '#1E40AF',
              background: 'linear-gradient(135deg, #1E40AF 0%, #0F766E 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 4px 6px -1px rgba(30, 64, 175, 0.25)',
            }}
          >
            <BiotechIcon sx={{ fontSize: 26 }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: '#0F172A',
                fontSize: '22px',
              }}
            >
              Gats<span style={{ color: '#0F766E' }}>Bio</span>
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, fontSize: '10px' }}>
              LIFE SCIENCES OS
            </Typography>
          </Box>
        </Box>

        {/* Desktop Navigation Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
          {/* Platform Dropdown */}
          <Button
            onClick={handlePlatformClick}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              color: currentRoute === 'platform' ? '#1E40AF' : '#334155',
              fontWeight: 600,
              px: 1.5,
              '&:hover': { bgcolor: '#F8FAFC' },
            }}
          >
            Platform
          </Button>
          <Menu
            anchorEl={platformAnchor}
            open={Boolean(platformAnchor)}
            onClose={handleCloseMenus}
            sx={{ mt: 1 }}
            slotProps={{
              paper: {
                sx: {
                  width: 320,
                  borderRadius: 2.5,
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                  p: 1,
                },
              },
            }}
          >
            <MenuItem onClick={() => handleRouteSelect('platform')}>
              <ListItemIcon><QrCodeScannerIcon fontSize="small" sx={{ color: '#1E40AF' }} /></ListItemIcon>
              <ListItemText primary="LIMS & Sample Logistics" secondary="2D Barcodes, 96-well plates, freezers" />
            </MenuItem>
            <MenuItem onClick={() => handleRouteSelect('platform')}>
              <ListItemIcon><MenuBookIcon fontSize="small" sx={{ color: '#0F766E' }} /></ListItemIcon>
              <ListItemText primary="Electronic Lab Notebook (ELN)" secondary="Protocol checklists & math formulas" />
            </MenuItem>
            <MenuItem onClick={() => handleRouteSelect('platform')}>
              <ListItemIcon><AutoAwesomeIcon fontSize="small" sx={{ color: '#7E22CE' }} /></ListItemIcon>
              <ListItemText primary="AI Research Intelligence" secondary="PubMed RAG & hypothesis synthesis" />
            </MenuItem>
            <MenuItem onClick={() => handleRouteSelect('platform')}>
              <ListItemIcon><StorageIcon fontSize="small" sx={{ color: '#0284C7' }} /></ListItemIcon>
              <ListItemText primary="Biological Big Data Lake" secondary="FASTQ, BAM, VCF & phenotypic sets" />
            </MenuItem>
            <MenuItem onClick={() => handleRouteSelect('platform')}>
              <ListItemIcon><DeviceHubIcon fontSize="small" sx={{ color: '#F59E0B' }} /></ListItemIcon>
              <ListItemText primary="Equipment IoT & Maintenance" secondary="Calibration calendars & sensors" />
            </MenuItem>
            <MenuItem onClick={() => handleRouteSelect('platform')}>
              <ListItemIcon><MedicationIcon fontSize="small" sx={{ color: '#DC2626' }} /></ListItemIcon>
              <ListItemText primary="Clinical Trials (GCP)" secondary="Cohorts, e-Consent & adverse events" />
            </MenuItem>
          </Menu>

          {/* Solutions Dropdown */}
          <Button
            onClick={handleSolutionsClick}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              color: currentRoute === 'solutions' ? '#1E40AF' : '#334155',
              fontWeight: 600,
              px: 1.5,
              '&:hover': { bgcolor: '#F8FAFC' },
            }}
          >
            Solutions
          </Button>
          <Menu
            anchorEl={solutionsAnchor}
            open={Boolean(solutionsAnchor)}
            onClose={handleCloseMenus}
            sx={{ mt: 1 }}
            slotProps={{
              paper: {
                sx: {
                  width: 300,
                  borderRadius: 2.5,
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                  p: 1,
                },
              },
            }}
          >
            <MenuItem onClick={() => handleRouteSelect('solutions')}>
              <ListItemIcon><BiotechIcon fontSize="small" sx={{ color: '#1E40AF' }} /></ListItemIcon>
              <ListItemText primary="Biopharma & Therapeutics" secondary="Preclinical discovery to clinical phase" />
            </MenuItem>
            <MenuItem onClick={() => handleRouteSelect('solutions')}>
              <ListItemIcon><SchoolIcon fontSize="small" sx={{ color: '#0F766E' }} /></ListItemIcon>
              <ListItemText primary="Academic Research Institutes" secondary="Grant budgeting & multi-lab sharing" />
            </MenuItem>
            <MenuItem onClick={() => handleRouteSelect('solutions')}>
              <ListItemIcon><HubIcon fontSize="small" sx={{ color: '#7E22CE' }} /></ListItemIcon>
              <ListItemText primary="CROs & Testing Labs" secondary="Client data isolation & rapid turnaround" />
            </MenuItem>
            <MenuItem onClick={() => handleRouteSelect('solutions')}>
              <ListItemIcon><ScienceIcon fontSize="small" sx={{ color: '#0284C7' }} /></ListItemIcon>
              <ListItemText primary="Diagnostics Laboratories" secondary="Automated accessioning & CLIA compliance" />
            </MenuItem>
          </Menu>

          {/* Direct Navigation Links */}
          <Button
            onClick={() => handleRouteSelect('compliance')}
            startIcon={<FactCheckIcon fontSize="small" sx={{ color: '#0F766E' }} />}
            sx={{
              color: currentRoute === 'compliance' ? '#1E40AF' : '#334155',
              fontWeight: 600,
              px: 1.5,
              '&:hover': { bgcolor: '#F8FAFC' },
            }}
          >
            Trust & Compliance
          </Button>

          <Button
            onClick={() => handleRouteSelect('pricing')}
            sx={{
              color: currentRoute === 'pricing' ? '#1E40AF' : '#334155',
              fontWeight: 600,
              px: 1.5,
              '&:hover': { bgcolor: '#F8FAFC' },
            }}
          >
            Pricing
          </Button>

          <Button
            onClick={() => handleRouteSelect('tools')}
            startIcon={<CalculateIcon fontSize="small" sx={{ color: '#1E40AF' }} />}
            sx={{
              color: currentRoute === 'tools' ? '#1E40AF' : '#334155',
              fontWeight: 600,
              px: 1.5,
              '&:hover': { bgcolor: '#F8FAFC' },
            }}
          >
            Free Lab Tools
          </Button>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5 }}>
          <Button
            onClick={onOpenLogin}
            startIcon={<LoginIcon fontSize="small" />}
            sx={{
              color: '#334155',
              fontWeight: 600,
              px: 2,
              '&:hover': { bgcolor: '#F1F5F9' },
            }}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            onClick={onOpenDemo}
            sx={{
              bgcolor: '#1E40AF',
              '&:hover': { bgcolor: '#1E3A8A' },
              fontWeight: 700,
              px: 2.8,
              py: 1,
              borderRadius: 2,
            }}
          >
            Book a Demo
          </Button>
        </Box>

        {/* Mobile Hamburger Toggle */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton onClick={() => setMobileDrawerOpen(true)} sx={{ color: '#0F172A' }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        slotProps={{ paper: { sx: { width: 300, p: 2 } } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1E40AF' }}>
            GatsBio
          </Typography>
          <IconButton onClick={() => setMobileDrawerOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleRouteSelect('home')}>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleRouteSelect('platform')}>
              <ListItemText primary="Platform Overview" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleRouteSelect('solutions')}>
              <ListItemText primary="Solutions" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleRouteSelect('compliance')}>
              <ListItemText primary="Trust & Compliance" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleRouteSelect('pricing')}>
              <ListItemText primary="Pricing" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleRouteSelect('tools')}>
              <ListItemText primary="Free Lab Calculators" />
            </ListItemButton>
          </ListItem>
        </List>

        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Button variant="outlined" fullWidth onClick={() => { setMobileDrawerOpen(false); onOpenLogin(); }}>
            Sign In
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={() => { setMobileDrawerOpen(false); onOpenDemo(); }}
            sx={{ bgcolor: '#1E40AF' }}
          >
            Book a Demo
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};
