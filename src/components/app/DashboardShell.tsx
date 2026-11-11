import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  Badge,
  Popover,
  Drawer,
  Button,
  Chip,
  Tooltip,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import BiotechIcon from '@mui/icons-material/Biotech';
import ScienceIcon from '@mui/icons-material/Science';
import StorageIcon from '@mui/icons-material/Storage';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GroupsIcon from '@mui/icons-material/Groups';
import ArticleIcon from '@mui/icons-material/Article';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import GridOnIcon from '@mui/icons-material/GridOn';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import MedicationIcon from '@mui/icons-material/Medication';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import InsightsIcon from '@mui/icons-material/Insights';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SecurityIcon from '@mui/icons-material/Security';
import LogoutIcon from '@mui/icons-material/Logout';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { ROLE_CONFIGS, ROLE_LIST } from '../../config/roleAccess';
import { ORGANIZATIONS_LIST, ROLE_NOTIFICATIONS } from '../../data/roleDashboardData';
import type { DashboardSession, UserRoleId } from '../../types/dashboard';

interface DashboardShellProps {
  session: DashboardSession;
  activeNavId: string;
  onSelectNav: (navId: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSwitchRole: (roleId: UserRoleId) => void;
  onChangeOrganization: (org: string) => void;
  onSignOut: () => void;
  children: React.ReactNode;
}

const NAV_ICONS: Record<string, React.ReactNode> = {
  overview: <InsightsIcon fontSize="small" />,
  projects: <BiotechIcon fontSize="small" />,
  eln: <ArticleIcon fontSize="small" />,
  datasets: <StorageIcon fontSize="small" />,
  'ai-engine': <AutoAwesomeIcon fontSize="small" />,
  collaboration: <GroupsIcon fontSize="small" />,
  publications: <ArticleIcon fontSize="small" />,
  'sample-queue': <QrCodeScannerIcon fontSize="small" />,
  'plate-runs': <GridOn fontSize="small" />,
  'cryo-storage': <AcUnitIcon fontSize="small" />,
  'results-upload': <ScienceIcon fontSize="small" />,
  equipment: <DeviceHubIcon fontSize="small" />,
  trials: <MedicationIcon fontSize="small" />,
  participants: <GroupsIcon fontSize="small" />,
  biospecimens: <QrCodeScannerIcon fontSize="small" />,
  'adverse-events': <FactCheckIcon fontSize="small" />,
  'regulatory-exports': <ArticleIcon fontSize="small" />,
  'executive-bi': <InsightsIcon fontSize="small" />,
  portfolio: <BiotechIcon fontSize="small" />,
  funding: <InsightsIcon fontSize="small" />,
  'lab-utilization': <DeviceHubIcon fontSize="small" />,
  'teams-ip': <GroupsIcon fontSize="small" />,
  'esign-queue': <FactCheckIcon fontSize="small" />,
  'audit-trail': <SecurityIcon fontSize="small" />,
  'sop-control': <ArticleIcon fontSize="small" />,
  'capa-deviations': <DeviceHubIcon fontSize="small" />,
  'reg-reports': <FactCheckIcon fontSize="small" />,
  'users-rbac': <AdminPanelSettingsIcon fontSize="small" />,
  'security-sso': <SecurityIcon fontSize="small" />,
  infrastructure: <StorageIcon fontSize="small" />,
  'iot-gateways': <DeviceHubIcon fontSize="small" />,
  subscriptions: <InsightsIcon fontSize="small" />,
};

export const DashboardShell: React.FC<DashboardShellProps> = ({
  session,
  activeNavId,
  onSelectNav,
  searchQuery,
  onSearchChange,
  onSwitchRole,
  onChangeOrganization,
  onSignOut,
  children,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);

  const roleCfg = ROLE_CONFIGS[session.roleId];
  const notifications = ROLE_NOTIFICATIONS[session.roleId] || [];
  const sidebarWidth = sidebarCollapsed ? 68 : 244;

  const renderSidebarContent = (isMobile = false) => (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        bgcolor: '#FFFFFF',
      }}
    >
      <Box>
        {/* Brand Header */}
        <Box
          sx={{
            height: 64,
            px: sidebarCollapsed && !isMobile ? 1.5 : 2.25,
            display: 'flex',
            alignItems: 'center',
            justifyContent: sidebarCollapsed && !isMobile ? 'center' : 'space-between',
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: 2,
                bgcolor: roleCfg.accentColor,
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <BiotechIcon sx={{ fontSize: 20 }} />
            </Box>
            {(!sidebarCollapsed || isMobile) && (
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>
                  Gats<span style={{ color: '#0F766E' }}>Bio</span>
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, fontSize: '10px' }}>
                  {roleCfg.shortLabel.toUpperCase()}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Role-Filtered Navigation Items */}
        <Box sx={{ p: 1.5, display: 'flex', flexDirection: 'column', gap: 0.6 }}>
          {(!sidebarCollapsed || isMobile) && (
            <Typography
              variant="caption"
              sx={{
                px: 1.25,
                py: 0.5,
                color: '#94A3B8',
                fontWeight: 800,
                fontSize: '10.5px',
                letterSpacing: '0.7px',
                textTransform: 'uppercase',
              }}
            >
              Workspace Modules
            </Typography>
          )}

          {roleCfg.navItems.map((item) => {
            const isActive = activeNavId === item.id;
            const icon = NAV_ICONS[item.id] || <BiotechIcon fontSize="small" />;

            const buttonNode = (
              <Box
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  onSelectNav(item.id);
                  if (isMobile) setMobileNavOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectNav(item.id);
                    if (isMobile) setMobileNavOpen(false);
                  }
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: sidebarCollapsed && !isMobile ? 'center' : 'space-between',
                  gap: 1.25,
                  px: sidebarCollapsed && !isMobile ? 1 : 1.5,
                  py: 1.1,
                  borderRadius: 2,
                  cursor: 'pointer',
                  bgcolor: isActive ? roleCfg.bgTint : 'transparent',
                  color: isActive ? roleCfg.accentColor : '#334155',
                  borderLeft: isActive ? `3px solid ${roleCfg.accentColor}` : '3px solid transparent',
                  fontWeight: isActive ? 800 : 600,
                  transition: 'background-color 0.15s ease, color 0.15s ease',
                  '&:hover': {
                    bgcolor: isActive ? roleCfg.bgTint : '#F8FAFC',
                    color: roleCfg.accentColor,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
                  {icon}
                  {(!sidebarCollapsed || isMobile) && (
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 'inherit',
                        fontSize: '13.5px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.label}
                    </Typography>
                  )}
                </Box>
                {(!sidebarCollapsed || isMobile) && (
                  <Typography
                    variant="caption"
                    sx={{ fontSize: '10px', fontWeight: 700, color: '#94A3B8', flexShrink: 0 }}
                  >
                    {item.moduleRef}
                  </Typography>
                )}
              </Box>
            );

            return sidebarCollapsed && !isMobile ? (
              <Tooltip key={item.id} title={`${item.label} (Spec ${item.moduleRef})`} placement="right">
                {buttonNode}
              </Tooltip>
            ) : (
              buttonNode
            );
          })}
        </Box>
      </Box>

      {/* Bottom User Card */}
      <Box sx={{ p: 1.5, borderTop: '1px solid #E2E8F0' }}>
        {(!sidebarCollapsed || isMobile) && (
          <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: '#F8FAFC', border: '1px solid #E2E8F0', mb: 1.25 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#0F172A', display: 'block' }}>
              {session.userName}
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: '11px' }}>
              {session.roleTitle}
            </Typography>
          </Box>
        )}
        <Button
          fullWidth
          size="small"
          variant="outlined"
          onClick={onSignOut}
          startIcon={<LogoutIcon sx={{ fontSize: '16px !important' }} />}
          sx={{
            borderColor: '#CBD5E1',
            color: '#0F172A',
            fontWeight: 700,
            minWidth: 0,
            px: sidebarCollapsed && !isMobile ? 1 : 2,
            '& .MuiButton-startIcon': {
              mr: sidebarCollapsed && !isMobile ? 0 : 1,
            },
          }}
        >
          {(!sidebarCollapsed || isMobile) && 'Exit to Site'}
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAFC', width: '100%' }}>
      {/* Desktop Collapsible Sidebar */}
      <Box
        component="aside"
        sx={{
          display: { xs: 'none', lg: 'block' },
          width: sidebarWidth,
          flexShrink: 0,
          borderRight: '1px solid #E2E8F0',
          bgcolor: '#FFFFFF',
          transition: 'width 0.2s ease',
          position: 'sticky',
          top: 0,
          height: '100vh',
        }}
      >
        {renderSidebarContent(false)}
      </Box>

      {/* Mobile Drawer Sidebar */}
      <Drawer
        anchor="left"
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        slotProps={{ paper: { sx: { width: 264 } } }}
      >
        {renderSidebarContent(true)}
      </Drawer>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Top Workstation Header */}
        <Box
          component="header"
          sx={{
            height: 64,
            bgcolor: '#FFFFFF',
            borderBottom: '1px solid #E2E8F0',
            px: { xs: 1.5, sm: 3 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1.5,
            position: 'sticky',
            top: 0,
            zIndex: 20,
          }}
        >
          {/* Left: Collapse / Mobile Drawer + Search */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flex: 1, minWidth: 0 }}>
            <IconButton
              size="small"
              onClick={() => setMobileNavOpen(true)}
              sx={{ display: { xs: 'inline-flex', lg: 'none' }, color: '#0F172A' }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => setSidebarCollapsed((c) => !c)}
              sx={{ display: { xs: 'none', lg: 'inline-flex' }, color: '#475569' }}
            >
              {sidebarCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
            </IconButton>

            <TextField
              size="small"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search projects, samples, SOPs... (Ctrl+K)"
              sx={{
                maxWidth: 360,
                width: '100%',
                display: { xs: 'none', sm: 'block' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: '#F8FAFC',
                  fontSize: '13px',
                  '& fieldset': { borderColor: '#E2E8F0' },
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#64748B', fontSize: 18 }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          {/* Right: Org Switcher, Role Switcher, Alerts */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexShrink: 0 }}>
            <Select
              size="small"
              value={session.organization}
              onChange={(e) => onChangeOrganization(e.target.value)}
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                fontSize: '12.5px',
                fontWeight: 700,
                bgcolor: '#F8FAFC',
                borderRadius: 2,
                height: 34,
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E2E8F0' },
              }}
            >
              {ORGANIZATIONS_LIST.map((org) => (
                <MenuItem key={org} value={org} sx={{ fontSize: '13px' }}>
                  {org}
                </MenuItem>
              ))}
            </Select>

            <Select
              size="small"
              value={session.roleId}
              onChange={(e) => onSwitchRole(e.target.value as UserRoleId)}
              startAdornment={
                <SwapHorizIcon sx={{ color: roleCfg.accentColor, fontSize: 17, mr: 0.75 }} />
              }
              sx={{
                fontSize: '12.5px',
                fontWeight: 800,
                bgcolor: roleCfg.bgTint,
                color: roleCfg.accentColor,
                borderRadius: 2,
                height: 34,
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#CBD5E1' },
              }}
            >
              {ROLE_LIST.map((r) => (
                <MenuItem key={r.roleId} value={r.roleId} sx={{ fontSize: '13px', fontWeight: 600 }}>
                  {r.shortLabel}
                </MenuItem>
              ))}
            </Select>

            <IconButton
              size="small"
              onClick={(e) => setNotifAnchor(e.currentTarget)}
              sx={{ border: '1px solid #E2E8F0', borderRadius: 2, color: '#334155' }}
            >
              <Badge badgeContent={notifications.length} color="primary">
                <NotificationsNoneIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Box>
        </Box>

        {/* Notifications Popover */}
        <Popover
          open={Boolean(notifAnchor)}
          anchorEl={notifAnchor}
          onClose={() => setNotifAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          slotProps={{
            paper: {
              sx: { width: 320, p: 2, mt: 1, borderRadius: 2.5, border: '1px solid #E2E8F0' },
            },
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
            {roleCfg.shortLabel} Alerts
          </Typography>
          <Divider sx={{ mb: 1.5 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            {notifications.map((n) => (
              <Box key={n.id} sx={{ p: 1.25, borderRadius: 2, bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A', display: 'block' }}>
                  {n.title}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  {n.time}
                </Typography>
              </Box>
            ))}
          </Box>
        </Popover>

        {/* Main Role Dashboard Content */}
        <Box component="main" sx={{ flex: 1, p: { xs: 2, sm: 3, md: 3.5 } }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
