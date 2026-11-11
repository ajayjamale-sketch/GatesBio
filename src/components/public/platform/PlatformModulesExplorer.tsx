import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import StorageIcon from '@mui/icons-material/Storage';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MedicationIcon from '@mui/icons-material/Medication';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupsIcon from '@mui/icons-material/Groups';
import ArticleIcon from '@mui/icons-material/Article';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import InsightsIcon from '@mui/icons-material/Insights';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AppsIcon from '@mui/icons-material/Apps';
import ScienceIcon from '@mui/icons-material/Science';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BiotechIcon from '@mui/icons-material/Biotech';
import {
  PLATFORM_PILLARS,
  type PlatformModule,
  type PlatformPillar,
} from '../../../data/platformModulesData';
import { PlatformModuleCard } from './PlatformModuleCard';
import { PlatformModuleDrawer } from './PlatformModuleDrawer';

interface PlatformModulesExplorerProps {
  onOpenDemo: () => void;
}

const MODULE_ICONS: Record<string, (color: string) => React.ReactNode> = {
  lims: (c) => <QrCodeScannerIcon sx={{ fontSize: 24, color: c }} />,
  equipment: (c) => <DeviceHubIcon sx={{ fontSize: 24, color: c }} />,
  'project-mgmt': (c) => <MenuBookIcon sx={{ fontSize: 24, color: c }} />,
  'bio-data': (c) => <StorageIcon sx={{ fontSize: 24, color: c }} />,
  'ai-engine': (c) => <AutoAwesomeIcon sx={{ fontSize: 24, color: c }} />,
  'clinical-trials': (c) => <MedicationIcon sx={{ fontSize: 24, color: c }} />,
  'auth-profiles': (c) => <BadgeIcon sx={{ fontSize: 24, color: c }} />,
  collaboration: (c) => <GroupsIcon sx={{ fontSize: 24, color: c }} />,
  'ip-pubs': (c) => <ArticleIcon sx={{ fontSize: 24, color: c }} />,
  compliance: (c) => <FactCheckIcon sx={{ fontSize: 24, color: c }} />,
  analytics: (c) => <InsightsIcon sx={{ fontSize: 24, color: c }} />,
  'admin-org': (c) => <AdminPanelSettingsIcon sx={{ fontSize: 24, color: c }} />,
};

const PILLAR_ICONS: Record<PlatformPillar['id'], React.ReactNode> = {
  'lab-ops': <BiotechIcon sx={{ fontSize: 16 }} />,
  'research-data': <ScienceIcon sx={{ fontSize: 16 }} />,
  'ai-clinical': <AutoAwesomeIcon sx={{ fontSize: 16 }} />,
  governance: <VerifiedUserIcon sx={{ fontSize: 16 }} />,
};

export const PlatformModulesExplorer: React.FC<PlatformModulesExplorerProps> = ({
  onOpenDemo,
}) => {
  const [selectedPillar, setSelectedPillar] = useState<'all' | PlatformPillar['id']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModule, setActiveModule] = useState<PlatformModule | null>(null);

  const filteredPillars = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const basePillars =
      selectedPillar === 'all'
        ? PLATFORM_PILLARS
        : PLATFORM_PILLARS.filter((p) => p.id === selectedPillar);

    if (!query) return basePillars;

    return basePillars
      .map((pillar) => ({
        ...pillar,
        modules: pillar.modules.filter(
          (m) =>
            m.name.toLowerCase().includes(query) ||
            m.tagline.toLowerCase().includes(query) ||
            m.description.toLowerCase().includes(query) ||
            m.code.toLowerCase().includes(query) ||
            m.quickTags.some((t) => t.toLowerCase().includes(query)) ||
            m.subFeatures.some((f) => f.toLowerCase().includes(query))
        ),
      }))
      .filter((pillar) => pillar.modules.length > 0);
  }, [selectedPillar, searchQuery]);

  const totalMatches = filteredPillars.reduce((acc, p) => acc + p.modules.length, 0);

  const activePillarForDrawer = useMemo(() => {
    if (!activeModule) return null;
    return PLATFORM_PILLARS.find((p) => p.id === activeModule.pillarId) || null;
  }, [activeModule]);

  const drawerIcon = useMemo(() => {
    if (!activeModule || !activePillarForDrawer) return null;
    const renderer = MODULE_ICONS[activeModule.id];
    return renderer ? (
      renderer(activePillarForDrawer.color)
    ) : (
      <QrCodeScannerIcon sx={{ fontSize: 24, color: activePillarForDrawer.color }} />
    );
  }, [activeModule, activePillarForDrawer]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box id="platform-modules" sx={{ bgcolor: '#FFFFFF' }}>
      {/* Clean Section Introduction */}
      <Box className="container-custom" sx={{ pt: { xs: 5.5, md: 7 }, pb: { xs: 3, md: 4 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            justifyContent: 'space-between',
            gap: 2.5,
          }}
        >
          <Box sx={{ maxWidth: 680 }}>
            <Chip
              label="12 Integrated Platform Modules"
              size="small"
              sx={{
                bgcolor: '#EFF6FF',
                color: '#1E40AF',
                fontWeight: 800,
                fontSize: '11px',
                mb: 1.5,
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: '#0F172A',
                fontSize: { xs: '24px', sm: '30px', md: '36px' },
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                mb: 1,
              }}
            >
              Everything Your Lab Needs In One Place
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#475569', fontSize: { xs: '14.5px', md: '16px' }, lineHeight: 1.6 }}
            >
              Explore our 4 operational pillars below. Click any module card to view full capabilities, team workflows, and automated controls.
            </Typography>
          </Box>

          {/* Compact Search Box */}
          <TextField
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search modules (e.g. LIMS, AI, FDA)..."
            sx={{
              width: { xs: '100%', md: 290 },
              '& .MuiOutlinedInput-root': {
                borderRadius: 2.5,
                bgcolor: '#F8FAFC',
                fontSize: '13.5px',
                '& fieldset': { borderColor: '#E2E8F0' },
                '&:hover fieldset': { borderColor: '#CBD5E1' },
                '&.Mui-focused fieldset': { borderColor: '#1E40AF' },
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18, color: '#64748B' }} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      aria-label="Clear search"
                      onClick={() => setSearchQuery('')}
                    >
                      <CloseIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
          />
        </Box>
      </Box>

      {/* Responsive Sticky Filter & Section Jump Bar */}
      <Box
        sx={{
          position: 'sticky',
          top: { xs: 60, sm: 68 },
          zIndex: 900,
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid #F1F5F9',
          borderBottom: '1px solid #E2E8F0',
          py: 1.25,
        }}
      >
        <Box
          className="container-custom"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          {/* Horizontally Scrollable Filter Pills */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              overflowX: 'auto',
              flexWrap: 'nowrap',
              pb: { xs: 0.25, md: 0 },
              width: { xs: '100%', xl: 'auto' },
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            <Button
              size="small"
              startIcon={<AppsIcon sx={{ fontSize: '15px !important' }} />}
              onClick={() => setSelectedPillar('all')}
              variant={selectedPillar === 'all' ? 'contained' : 'outlined'}
              sx={{
                flexShrink: 0,
                whiteSpace: 'nowrap',
                bgcolor: selectedPillar === 'all' ? '#1E40AF' : '#FFFFFF',
                color: selectedPillar === 'all' ? '#FFFFFF' : '#334155',
                borderColor: selectedPillar === 'all' ? '#1E40AF' : '#CBD5E1',
                fontWeight: 700,
                fontSize: '12.5px',
                borderRadius: 2,
                px: 1.75,
                py: 0.7,
              }}
            >
              All Modules (12)
            </Button>

            {PLATFORM_PILLARS.map((pillar) => {
              const active = selectedPillar === pillar.id;
              return (
                <Button
                  key={pillar.id}
                  size="small"
                  startIcon={PILLAR_ICONS[pillar.id]}
                  onClick={() => setSelectedPillar(pillar.id)}
                  variant={active ? 'contained' : 'outlined'}
                  sx={{
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    bgcolor: active ? pillar.color : '#FFFFFF',
                    color: active ? '#FFFFFF' : '#334155',
                    borderColor: active ? pillar.color : '#CBD5E1',
                    fontWeight: 700,
                    fontSize: '12.5px',
                    borderRadius: 2,
                    px: 1.75,
                    py: 0.7,
                    '&:hover': {
                      borderColor: pillar.color,
                      bgcolor: active ? pillar.color : pillar.bgColor,
                    },
                  }}
                >
                  {pillar.shortTitle} ({pillar.modules.length})
                </Button>
              );
            })}
          </Box>

          {/* Quick Section Jump Anchors (Desktop) */}
          <Box
            sx={{
              display: { xs: 'none', xl: 'flex' },
              alignItems: 'center',
              gap: 0.75,
              pl: 2,
              borderLeft: '1px solid #E2E8F0',
              flexShrink: 0,
            }}
          >
            {[
              { label: 'User Workflows', target: 'persona-workflows' },
              { label: 'Architecture', target: 'data-architecture' },
              { label: 'Book Demo', target: 'platform-cta' },
            ].map((anchor) => (
              <Button
                key={anchor.target}
                size="small"
                onClick={() => scrollToSection(anchor.target)}
                sx={{
                  color: '#64748B',
                  fontWeight: 600,
                  fontSize: '12.5px',
                  whiteSpace: 'nowrap',
                  '&:hover': { color: '#1E40AF', bgcolor: '#EFF6FF' },
                }}
              >
                {anchor.label}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Main Modules Showcase */}
      <Box className="container-custom" sx={{ py: { xs: 5, md: 7 } }}>
        {totalMatches === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              borderRadius: 3.5,
              border: '1px dashed #CBD5E1',
              bgcolor: '#F8FAFC',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
              No modules matched &ldquo;{searchQuery}&rdquo;
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', mb: 2.5 }}>
              Try searching for terms like LIMS, ELN, AI, clinical, barcode, or reset your filters.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchQuery('');
                setSelectedPillar('all');
              }}
              sx={{ borderColor: '#1E40AF', color: '#1E40AF', fontWeight: 700 }}
            >
              Show All 12 Modules
            </Button>
          </Paper>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedPillar}-${searchQuery}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 6.5, md: 8.5 } }}>
                {filteredPillars.map((pillar) => {
                  const useThreeCol = pillar.modules.length >= 3;
                  return (
                    <Box key={pillar.id} id={`pillar-${pillar.id}`}>
                      {/* Editorial Bento Pillar Showcase Card (Text + Authentic Photo) */}
                      <Paper
                        elevation={0}
                        sx={{
                          borderRadius: 4,
                          overflow: 'hidden',
                          border: `1px solid ${pillar.borderColor}`,
                          bgcolor: pillar.bgColor,
                          mb: 3,
                          display: 'grid',
                          gridTemplateColumns: { xs: '1fr', md: '1.25fr 1fr' },
                          alignItems: 'stretch',
                        }}
                      >
                        {/* Left Narrative Content */}
                        <Box
                          sx={{
                            p: { xs: 2.75, sm: 3.5, md: 4.5 },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25, flexWrap: 'wrap' }}>
                            <Chip
                              size="small"
                              icon={
                                <Box component="span" sx={{ display: 'flex', color: `${pillar.color} !important` }}>
                                  {PILLAR_ICONS[pillar.id]}
                                </Box>
                              }
                              label={`${pillar.modules.length} ${pillar.modules.length === 1 ? 'Module' : 'Modules'}`}
                              sx={{
                                bgcolor: '#FFFFFF',
                                color: pillar.color,
                                fontWeight: 800,
                                fontSize: '11px',
                                border: `1px solid ${pillar.borderColor}`,
                              }}
                            />
                            <Typography
                              variant="caption"
                              sx={{
                                color: pillar.color,
                                fontWeight: 800,
                                letterSpacing: '0.6px',
                                textTransform: 'uppercase',
                              }}
                            >
                              {pillar.tagline}
                            </Typography>
                          </Box>

                          <Typography
                            variant="h3"
                            sx={{
                              fontWeight: 800,
                              color: '#0F172A',
                              fontSize: { xs: '21px', sm: '25px', md: '29px' },
                              lineHeight: 1.22,
                              mb: 1.25,
                            }}
                          >
                            {pillar.title}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              color: '#475569',
                              lineHeight: 1.65,
                              fontSize: { xs: '13.5px', md: '15px' },
                              mb: 2.25,
                            }}
                          >
                            {pillar.description}
                          </Typography>

                          {/* Quick-Access Module Jump Pills */}
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                            {pillar.modules.map((m) => (
                              <Chip
                                key={m.id}
                                size="small"
                                label={`${m.code} ${m.name.split(' (')[0]}`}
                                onClick={() => setActiveModule(m)}
                                sx={{
                                  bgcolor: '#FFFFFF',
                                  border: '1px solid #E2E8F0',
                                  color: '#1E293B',
                                  fontWeight: 600,
                                  fontSize: '11.5px',
                                  cursor: 'pointer',
                                  '&:hover': {
                                    borderColor: pillar.color,
                                    color: pillar.color,
                                  },
                                }}
                              />
                            ))}
                          </Box>
                        </Box>

                        {/* Right Authentic Editorial Photograph (Clean, No Overlays) */}
                        <Box
                          sx={{
                            position: 'relative',
                            minHeight: { xs: 200, sm: 240, md: '100%' },
                            maxHeight: { xs: 240, md: 320 },
                            overflow: 'hidden',
                            bgcolor: '#E2E8F0',
                          }}
                        >
                          <Box
                            component="img"
                            src={pillar.imageUrl}
                            alt={pillar.imageAlt}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: 'center',
                              display: 'block',
                            }}
                          />
                        </Box>
                      </Paper>

                      {/* Responsive Balanced Module Grid */}
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: useThreeCol
                            ? { xs: '1fr', md: '1fr 1fr', lg: 'repeat(3, 1fr)' }
                            : { xs: '1fr', md: '1fr 1fr' },
                          gap: { xs: 2.5, md: 3 },
                        }}
                      >
                        {pillar.modules.map((mod) => {
                          const iconRenderer = MODULE_ICONS[mod.id];
                          const iconEl = iconRenderer ? (
                            iconRenderer(pillar.color)
                          ) : (
                            <QrCodeScannerIcon sx={{ fontSize: 24, color: pillar.color }} />
                          );
                          return (
                            <PlatformModuleCard
                              key={mod.id}
                              module={mod}
                              accentColor={pillar.color}
                              accentBg={pillar.bgColor}
                              icon={iconEl}
                              onExplore={(selected) => setActiveModule(selected)}
                            />
                          );
                        })}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </motion.div>
          </AnimatePresence>
        )}
      </Box>

      {/* Slide-Over Module Detail Drawer */}
      <PlatformModuleDrawer
        module={activeModule}
        pillar={activePillarForDrawer}
        icon={drawerIcon}
        onClose={() => setActiveModule(null)}
        onOpenDemo={onOpenDemo}
      />
    </Box>
  );
};
