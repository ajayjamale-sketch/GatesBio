import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Snackbar, Alert } from '@mui/material';
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
import type { PublicRoute } from './types';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<PublicRoute>('home');
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleNavigate = (route: string) => {
    setCurrentRoute(route as PublicRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (name: string, role: string) => {
    setAuthModalOpen(false);
    setToastMessage(`Signed in as ${name} (${role}). Welcome to GatsBio Workstation.`);
  };

  return (
    <ThemeProvider theme={gatsBioTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#FFFFFF' }}>
        {/* Sticky Public Header */}
        <PublicNavbar
          currentRoute={currentRoute}
          onNavigate={(route) => handleNavigate(route)}
          onOpenDemo={() => setDemoModalOpen(true)}
          onOpenLogin={() => setAuthModalOpen(true)}
        />

        {/* Main Route Content */}
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
          {currentRoute === 'solutions' && (
            <SolutionsPage onOpenDemo={() => setDemoModalOpen(true)} />
          )}
          {currentRoute === 'compliance' && (
            <CompliancePage onOpenDemo={() => setDemoModalOpen(true)} />
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
