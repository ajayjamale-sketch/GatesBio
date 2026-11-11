import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Box,
  Snackbar,
  Alert,
  Paper,
  Typography,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import BiotechIcon from '@mui/icons-material/Biotech';
import LogoutIcon from '@mui/icons-material/Logout';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { gatsBioTheme } from './theme/muiTheme';
import { PublicNavbar } from './components/public/PublicNavbar';
import { PublicFooter } from './components/public/PublicFooter';
import { DemoBookingModal } from './components/public/DemoBookingModal';
import { AuthModal } from './components/public/AuthModal';
import { HomePage } from './pages/public/HomePage';
import { PlatformPage } from './pages/public/PlatformPage';
import { SolutionsPage } from './pages/public/SolutionsPage';
import { CompliancePage } from './pages/public/CompliancePage';
import { PricingPage } from './pages/public/PricingPage';
import { ToolsPage } from './pages/public/ToolsPage';
import { ResourcesPage } from './pages/public/ResourcesPage';
import {
  ROLE_CONFIGS,
  ROLE_LIST,
  createDefaultSessionForRole,
  getRoleByAppRoute,
} from './config/roleAccess';
import type {
  AnyRoute,
  AppRoute,
  DashboardSession,
  PublicRoute,
  UserRoleId,
} from './types';

const SESSION_STORAGE_KEY = 'gatsbio_active_session';

const ROUTE_PATHS: Record<AnyRoute, string> = {
  home: '/',
  platform: '/platform',
  'tailored-solutions': '/tailored-solutions',
  resources: '/resources',
  compliance: '/compliance',
  pricing: '/pricing',
  tools: '/tools',
  demo: '/demo',
  'app-scientist': '/app/scientist',
  'app-technician': '/app/technician',
  'app-clinical': '/app/clinical',
  'app-biotech-admin': '/app/biotech-admin',
  'app-compliance': '/app/compliance',
  'app-system-admin': '/app/system-admin',
};

const ROUTE_ALIASES: Record<string, AnyRoute> = {
  '/solutions': 'tailored-solutions',
  '/app': 'app-scientist',
  '/app/dashboard': 'app-scientist',
};

const isAppRoute = (route: AnyRoute): route is AppRoute =>
  route.startsWith('app-');

const getRouteFromPathname = (pathname: string): AnyRoute => {
  const normalized = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  if (ROUTE_ALIASES[normalized]) {
    return ROUTE_ALIASES[normalized];
  }
  const match = (Object.entries(ROUTE_PATHS) as [AnyRoute, string][]).find(
    ([, path]) => path === normalized
  );
  return match ? match[0] : 'home';
};

const loadStoredSession = (): DashboardSession | null => {
  try {
    const raw = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DashboardSession;
    return parsed && parsed.roleId && ROLE_CONFIGS[parsed.roleId] ? parsed : null;
  } catch {
    return null;
  }
};

export function App() {
  const [currentRoute, setCurrentRoute] = useState<AnyRoute>(() =>
    getRouteFromPathname(window.location.pathname)
  );
  const [activeSession, setActiveSession] = useState<DashboardSession | null>(() => {
    const initialRoute = getRouteFromPathname(window.location.pathname);
    const stored = loadStoredSession();
    if (isAppRoute(initialRoute)) {
      const roleCfg = getRoleByAppRoute(initialRoute);
      if (roleCfg) {
        return stored && stored.roleId === roleCfg.roleId
          ? stored
          : createDefaultSessionForRole(roleCfg.roleId);
      }
    }
    return stored;
  });
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (activeSession) {
      try {
        window.sessionStorage.setItem(
          SESSION_STORAGE_KEY,
          JSON.stringify(activeSession)
        );
      } catch {
        // Ignore storage quota errors in sandboxed contexts
      }
    } else {
      try {
        window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
      } catch {
        // Ignore storage errors
      }
    }
  }, [activeSession]);

  useEffect(() => {
    const handlePopState = () => {
      const nextRoute = getRouteFromPathname(window.location.pathname);
      setCurrentRoute(nextRoute);
      if (isAppRoute(nextRoute)) {
        const roleCfg = getRoleByAppRoute(nextRoute);
        if (roleCfg) {
          setActiveSession((prev) =>
            prev && prev.roleId === roleCfg.roleId
              ? prev
              : createDefaultSessionForRole(roleCfg.roleId)
          );
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (route: string) => {
    const targetRoute: AnyRoute =
      route === 'solutions' ? 'tailored-solutions' : (route as AnyRoute);
    const targetPath = ROUTE_PATHS[targetRoute] || '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    if (isAppRoute(targetRoute)) {
      const roleCfg = getRoleByAppRoute(targetRoute);
      if (roleCfg) {
        setActiveSession((prev) =>
          prev && prev.roleId === roleCfg.roleId
            ? prev
            : createDefaultSessionForRole(roleCfg.roleId)
        );
      }
    }
    setCurrentRoute(targetRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (session: DashboardSession) => {
    const roleCfg = ROLE_CONFIGS[session.roleId];
    setActiveSession(session);
    setAuthModalOpen(false);
    handleNavigate(roleCfg.routeKey);
    setToastMessage(
      `Signed in as ${session.userName} (${session.roleTitle}).`
    );
  };

  const handleSwitchRole = (roleId: UserRoleId) => {
    const nextSession = createDefaultSessionForRole(roleId);
    const roleCfg = ROLE_CONFIGS[roleId];
    setActiveSession(nextSession);
    handleNavigate(roleCfg.routeKey);
    setToastMessage(`Switched workstation role to ${roleCfg.roleTitle}.`);
  };

  const handleSignOut = () => {
    setActiveSession(null);
    handleNavigate('home');
    setToastMessage('Signed out of GatsBio Workstation.');
  };

  const activeAppRole = isAppRoute(currentRoute)
    ? getRoleByAppRoute(currentRoute)
    : undefined;

  const activeSessionForView =
    activeSession ||
    (activeAppRole ? createDefaultSessionForRole(activeAppRole.roleId) : null);

  return (
    <ThemeProvider theme={gatsBioTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: '#FFFFFF',
          width: '100%',
          maxWidth: '100%',
          overflowX: 'hidden',
        }}
      >
        {activeAppRole && activeSessionForView ? (
          /* =====================================================================
             PHASE 1 AUTHENTICATED ROLE ROUTING SHELL (Upgraded in Phases 2–5)
             ===================================================================== */
          <Box sx={{ minHeight: '100vh', bgcolor: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
            {/* Top Bar */}
            <Box
              component="header"
              sx={{
                height: 64,
                bgcolor: '#FFFFFF',
                borderBottom: '1px solid #E2E8F0',
                px: { xs: 2, sm: 4 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: 2,
                    bgcolor: '#1E40AF',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <BiotechIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>
                    Gats<span style={{ color: '#0F766E' }}>Bio</span> Workstation
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                    {activeSessionForView.organization} · {activeSessionForView.department}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Chip
                  icon={<VerifiedUserIcon sx={{ fontSize: '15px !important', color: '#059669 !important' }} />}
                  label={`${activeSessionForView.userName} · ${activeAppRole.shortLabel}`}
                  size="small"
                  sx={{
                    display: { xs: 'none', sm: 'inline-flex' },
                    bgcolor: '#ECFDF5',
                    color: '#065F46',
                    fontWeight: 700,
                  }}
                />
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleSignOut}
                  startIcon={<LogoutIcon sx={{ fontSize: '16px !important' }} />}
                  sx={{
                    borderColor: '#CBD5E1',
                    color: '#0F172A',
                    fontWeight: 700,
                    borderRadius: 2,
                    '&:hover': { borderColor: '#1E40AF', bgcolor: '#EFF6FF' },
                  }}
                >
                  Exit to Site
                </Button>
              </Box>
            </Box>

            {/* Role Route Body */}
            <Box className="container-custom" sx={{ py: { xs: 4, md: 6 }, flex: 1 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4.5 },
                  borderRadius: 3.5,
                  border: '1px solid #E2E8F0',
                  bgcolor: '#FFFFFF',
                  mb: 3.5,
                }}
              >
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.25, mb: 1.5 }}>
                  <Chip
                    label={activeAppRole.roleTitle}
                    size="small"
                    sx={{
                      bgcolor: activeAppRole.bgTint,
                      color: activeAppRole.accentColor,
                      fontWeight: 800,
                    }}
                  />
                  <Chip
                    label={activeAppRole.routePath}
                    size="small"
                    sx={{
                      bgcolor: '#F1F5F9',
                      color: '#334155',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                    }}
                  />
                </Box>

                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mb: 1, fontSize: { xs: '22px', md: '28px' } }}>
                  {activeAppRole.roleTitle} Dashboard Route Ready
                </Typography>
                <Typography variant="body2" sx={{ color: '#475569', mb: 3, lineHeight: 1.6 }}>
                  <strong>Core Workflow:</strong> {activeAppRole.flowSummary}
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 800, textTransform: 'uppercase', display: 'block', mb: 1.25 }}>
                      Role-Filtered Sidebar Sections (Phase 2)
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {activeAppRole.navItems.map((nav) => (
                        <Box
                          key={nav.id}
                          sx={{
                            p: 1.25,
                            px: 1.75,
                            borderRadius: 2,
                            bgcolor: '#F8FAFC',
                            border: '1px solid #E2E8F0',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                            {nav.label}
                          </Typography>
                          <Chip
                            label={`Module ${nav.moduleRef}`}
                            size="small"
                            sx={{ height: 20, fontSize: '10.5px', fontWeight: 700, bgcolor: activeAppRole.bgTint, color: activeAppRole.accentColor }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 800, textTransform: 'uppercase', display: 'block', mb: 1.25 }}>
                      Permitted Platform Modules & Quick Role Switcher
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 3 }}>
                      {activeAppRole.permittedModules.map((mod) => (
                        <Chip
                          key={mod}
                          label={`Spec ${mod}`}
                          size="small"
                          sx={{ bgcolor: '#ECFDF5', color: '#065F46', fontWeight: 700 }}
                        />
                      ))}
                    </Box>

                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 800, textTransform: 'uppercase', display: 'block', mb: 1.25 }}>
                      Test RBAC Route Switching (All 6 Roles)
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {ROLE_LIST.map((r) => {
                        const isCurrent = r.roleId === activeAppRole.roleId;
                        return (
                          <Button
                            key={r.roleId}
                            size="small"
                            variant={isCurrent ? 'contained' : 'outlined'}
                            endIcon={!isCurrent ? <ArrowForwardIcon sx={{ fontSize: '13px !important' }} /> : undefined}
                            onClick={() => handleSwitchRole(r.roleId)}
                            sx={{
                              bgcolor: isCurrent ? r.accentColor : '#FFFFFF',
                              borderColor: isCurrent ? r.accentColor : '#CBD5E1',
                              color: isCurrent ? '#FFFFFF' : '#334155',
                              fontWeight: 700,
                              fontSize: '12px',
                              borderRadius: 2,
                            }}
                          >
                            {r.shortLabel}
                          </Button>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Box>
        ) : (
          <>
            {/* Sticky Public Header */}
            <PublicNavbar
              currentRoute={currentRoute as PublicRoute}
              onNavigate={(route) => handleNavigate(route)}
              onOpenDemo={() => setDemoModalOpen(true)}
              onOpenLogin={() => setAuthModalOpen(true)}
            />

            {/* Main Public Route Content */}
            <Box component="main" sx={{ flex: 1 }}>
              {currentRoute === 'home' && (
                <HomePage
                  onOpenDemo={() => setDemoModalOpen(true)}
                  onNavigate={handleNavigate}
                />
              )}
              {currentRoute === 'platform' && (
                <PlatformPage
                  onOpenDemo={() => setDemoModalOpen(true)}
                  onExploreTools={() => handleNavigate('tools')}
                />
              )}
              {currentRoute === 'tailored-solutions' && (
                <SolutionsPage
                  onOpenDemo={() => setDemoModalOpen(true)}
                  onExplorePricing={() => handleNavigate('pricing')}
                />
              )}
              {currentRoute === 'resources' && (
                <ResourcesPage
                  onOpenDemo={() => setDemoModalOpen(true)}
                  onNavigate={(route) => handleNavigate(route)}
                />
              )}
              {currentRoute === 'compliance' && (
                <CompliancePage
                  onOpenDemo={() => setDemoModalOpen(true)}
                  onExploreResources={() => handleNavigate('resources')}
                />
              )}
              {currentRoute === 'pricing' && (
                <PricingPage onOpenDemo={() => setDemoModalOpen(true)} />
              )}
              {currentRoute === 'tools' && (
                <ToolsPage onOpenDemo={() => setDemoModalOpen(true)} />
              )}
            </Box>

            {/* Enterprise Footer */}
            <PublicFooter
              onNavigate={(route) => handleNavigate(route)}
              onOpenDemo={() => setDemoModalOpen(true)}
            />
          </>
        )}

        {/* Modals */}
        <DemoBookingModal
          open={demoModalOpen}
          onClose={() => setDemoModalOpen(false)}
        />

        <AuthModal
          open={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />

        {/* Feedback Snackbar */}
        <Snackbar
          open={Boolean(toastMessage)}
          autoHideDuration={5000}
          onClose={() => setToastMessage(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setToastMessage(null)}
            severity="success"
            sx={{ width: '100%', fontWeight: 600, bgcolor: '#ECFDF5', color: '#065F46' }}
          >
            {toastMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
