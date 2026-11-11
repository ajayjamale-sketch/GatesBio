import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Snackbar, Alert } from '@mui/material';
import { gatsBioTheme } from './theme/muiTheme';
import { PublicNavbar } from './components/public/PublicNavbar';
import { PublicFooter } from './components/public/PublicFooter';
import { DemoBookingModal } from './components/public/DemoBookingModal';
import { DashboardShell } from './components/app/DashboardShell';
import { ResearchScientistDashboard } from './pages/app/ResearchScientistDashboard';
import { LabTechnicianDashboard } from './pages/app/LabTechnicianDashboard';
import { ClinicalCoordinatorDashboard } from './pages/app/ClinicalCoordinatorDashboard';
import { BiotechAdminDashboard } from './pages/app/BiotechAdminDashboard';
import { ComplianceOfficerDashboard } from './pages/app/ComplianceOfficerDashboard';
import { SystemAdminDashboard } from './pages/app/SystemAdminDashboard';
import { UserProfilePage } from './pages/app/UserProfilePage';
import { HomePage } from './pages/public/HomePage';
import { PlatformPage } from './pages/public/PlatformPage';
import { SolutionsPage } from './pages/public/SolutionsPage';
import { CompliancePage } from './pages/public/CompliancePage';
import { PricingPage } from './pages/public/PricingPage';
import { ToolsPage } from './pages/public/ToolsPage';
import { ResourcesPage } from './pages/public/ResourcesPage';
import { LoginPage } from './pages/public/LoginPage';
import { SignupPage } from './pages/public/SignupPage';
import {
  ROLE_CONFIGS,
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
  login: '/login',
  signup: '/signup',
  'app-scientist': '/app/scientist',
  'app-technician': '/app/technician',
  'app-clinical': '/app/clinical',
  'app-biotech-admin': '/app/biotech-admin',
  'app-compliance': '/app/compliance',
  'app-system-admin': '/app/system-admin',
};

const ROUTE_ALIASES: Record<string, AnyRoute> = {
  '/solutions': 'tailored-solutions',
  '/signin': 'login',
  '/register': 'signup',
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
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeNavId, setActiveNavId] = useState<string>(() => {
    const initialRoute = getRouteFromPathname(window.location.pathname);
    if (isAppRoute(initialRoute)) {
      const cfg = getRoleByAppRoute(initialRoute);
      if (cfg && cfg.navItems.length > 0) return cfg.navItems[0].id;
    }
    return 'overview';
  });
  const [workspaceSearch, setWorkspaceSearch] = useState('');

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
          if (roleCfg.navItems.length > 0) {
            setActiveNavId(roleCfg.navItems[0].id);
          }
          setWorkspaceSearch('');
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (route: string, initialNavId?: string) => {
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
        if (initialNavId) {
          setActiveNavId(initialNavId);
        } else if (roleCfg.navItems.length > 0) {
          setActiveNavId(roleCfg.navItems[0].id);
        }
      }
    }
    setWorkspaceSearch('');
    setCurrentRoute(targetRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (session: DashboardSession) => {
    const roleCfg = ROLE_CONFIGS[session.roleId];
    setActiveSession(session);
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

  const handleChangeOrganization = (organization: string) => {
    setActiveSession((prev) => (prev ? { ...prev, organization } : prev));
    setToastMessage(`Active organization switched to ${organization}.`);
  };

  const handleUpdateSession = (updates: Partial<DashboardSession>) => {
    setActiveSession((prev) => {
      const base = prev ?? activeSessionForView;
      return base ? { ...base, ...updates } : prev;
    });
    setToastMessage('Profile details updated.');
  };

  const handleGoToDashboard = () => {
    if (!activeSession) {
      handleNavigate('login');
      return;
    }
    const roleCfg = ROLE_CONFIGS[activeSession.roleId];
    handleNavigate(roleCfg.routeKey);
  };

  const handleOpenProfile = () => {
    if (!activeSession) {
      handleNavigate('login');
      return;
    }
    const roleCfg = ROLE_CONFIGS[activeSession.roleId];
    handleNavigate(roleCfg.routeKey, 'profile');
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
          overflowX: 'clip',
        }}
      >
        {activeAppRole && activeSessionForView ? (
          <DashboardShell
            session={activeSessionForView}
            activeNavId={activeNavId}
            onSelectNav={setActiveNavId}
            searchQuery={workspaceSearch}
            onSearchChange={setWorkspaceSearch}
            onSwitchRole={handleSwitchRole}
            onChangeOrganization={handleChangeOrganization}
            onNavigateHome={() => handleNavigate('home')}
            onSignOut={handleSignOut}
          >
            {activeNavId === 'profile' ? (
              <UserProfilePage
                key={`${activeSessionForView.roleId}-${activeSessionForView.organization}-${activeSessionForView.userName}`}
                session={activeSessionForView}
                onUpdateSession={handleUpdateSession}
                onBackToDashboard={() => {
                  if (activeAppRole.navItems.length > 0) {
                    setActiveNavId(activeAppRole.navItems[0].id);
                  }
                }}
                onSignOut={handleSignOut}
                onNotify={setToastMessage}
              />
            ) : currentRoute === 'app-scientist' ? (
              <ResearchScientistDashboard
                session={activeSessionForView}
                activeNavId={activeNavId}
                searchQuery={workspaceSearch}
                onSelectNav={setActiveNavId}
                onNotify={setToastMessage}
              />
            ) : currentRoute === 'app-technician' ? (
              <LabTechnicianDashboard
                session={activeSessionForView}
                activeNavId={activeNavId}
                searchQuery={workspaceSearch}
                onSelectNav={setActiveNavId}
                onNotify={setToastMessage}
              />
            ) : currentRoute === 'app-clinical' ? (
              <ClinicalCoordinatorDashboard
                session={activeSessionForView}
                activeNavId={activeNavId}
                searchQuery={workspaceSearch}
                onSelectNav={setActiveNavId}
                onNotify={setToastMessage}
              />
            ) : currentRoute === 'app-biotech-admin' ? (
              <BiotechAdminDashboard
                session={activeSessionForView}
                activeNavId={activeNavId}
                searchQuery={workspaceSearch}
                onSelectNav={setActiveNavId}
                onNotify={setToastMessage}
              />
            ) : currentRoute === 'app-compliance' ? (
              <ComplianceOfficerDashboard
                session={activeSessionForView}
                activeNavId={activeNavId}
                searchQuery={workspaceSearch}
                onSelectNav={setActiveNavId}
                onNotify={setToastMessage}
              />
            ) : (
              <SystemAdminDashboard
                session={activeSessionForView}
                activeNavId={activeNavId}
                searchQuery={workspaceSearch}
                onSelectNav={setActiveNavId}
                onNotify={setToastMessage}
              />
            )}
          </DashboardShell>
        ) : (
          <>
            {/* Sticky Public Header */}
            <PublicNavbar
              currentRoute={currentRoute as PublicRoute}
              session={activeSession}
              onNavigate={(route) => handleNavigate(route)}
              onOpenDemo={() => setDemoModalOpen(true)}
              onOpenLogin={() => handleNavigate('login')}
              onOpenSignup={() => handleNavigate('signup')}
              onGoToDashboard={handleGoToDashboard}
              onOpenProfile={handleOpenProfile}
              onSignOut={handleSignOut}
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
              {currentRoute === 'login' && (
                <LoginPage
                  onLoginSuccess={handleLoginSuccess}
                  onNavigate={(route) => handleNavigate(route)}
                />
              )}
              {currentRoute === 'signup' && (
                <SignupPage
                  onSignupSuccess={handleLoginSuccess}
                  onNavigate={(route) => handleNavigate(route)}
                />
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
