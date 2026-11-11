import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {
  FEATURED_RESOURCE,
  RESOURCE_ITEMS,
  type ResourceCategoryId,
} from '../../../data/resourcesData';
import type { PublicRoute } from '../../../types';

interface ResourcesLibraryExplorerProps {
  selectedCategory: ResourceCategoryId;
  onChangeCategory: (category: ResourceCategoryId) => void;
  onOpenDemo: () => void;
  onNavigate: (route: PublicRoute) => void;
}

const CATEGORIES: { id: ResourceCategoryId; label: string }[] = [
  { id: 'all', label: 'All Resources' },
  { id: 'whitepapers', label: 'Whitepapers' },
  { id: 'templates', label: 'SOP Templates' },
  { id: 'validation', label: 'Validation & GxP' },
  { id: 'case-studies', label: 'Case Studies' },
];

export const ResourcesLibraryExplorer: React.FC<ResourcesLibraryExplorerProps> = ({
  selectedCategory,
  onChangeCategory,
  onOpenDemo,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return RESOURCE_ITEMS.filter((item) => {
      const matchesCat =
        selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchesCat) return false;
      if (!query) return true;
      return (
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query) ||
        item.highlights.some((h) => h.toLowerCase().includes(query))
      );
    });
  }, [selectedCategory, searchQuery]);

  return (
    <Box id="resources-library" sx={{ py: { xs: 6, md: 9 }, bgcolor: '#FFFFFF' }}>
      <Box className="container-custom">
        {/* Header + Search */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            justifyContent: 'space-between',
            gap: 2.5,
            mb: 3.5,
          }}
        >
          <Box sx={{ maxWidth: 680 }}>
            <Chip
              label="Scientific Knowledge Library"
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
              Whitepapers, SOP Templates & Case Studies
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#475569', fontSize: { xs: '14.5px', md: '16px' }, lineHeight: 1.6 }}
            >
              Practical playbooks authored by GatsBio solutions architects, bioinformaticians, and regulatory quality engineers.
            </Typography>
          </Box>

          <TextField
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, SOPs, 21 CFR..."
            sx={{
              width: { xs: '100%', md: 290 },
              '& .MuiOutlinedInput-root': {
                borderRadius: 2.5,
                bgcolor: '#F8FAFC',
                fontSize: '13.5px',
                '& fieldset': { borderColor: '#E2E8F0' },
                '&:hover fieldset': { borderColor: '#CBD5E1' },
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#64748B', fontSize: 18 }} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery('')}>
                      <CloseIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
          />
        </Box>

        {/* Featured Regulatory Blueprint Card */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            border: '1px solid #E2E8F0',
            bgcolor: '#F8FAFC',
            overflow: 'hidden',
            mb: 4.5,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.05fr 1.25fr' },
            boxShadow: '0 8px 26px -12px rgba(15, 23, 42, 0.08)',
          }}
        >
          <Box sx={{ position: 'relative', minHeight: { xs: 240, sm: 300, lg: 340 } }}>
            <Box
              component="img"
              src="/images/resources-library-featured.jpg"
              alt="QA specialist reviewing regulatory validation checklists on a glass tablet in a clean lab"
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.15) 60%)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 20,
                left: 20,
                right: 20,
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              <Chip
                label={FEATURED_RESOURCE.format}
                size="small"
                sx={{
                  bgcolor: 'rgba(15, 23, 42, 0.8)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  fontWeight: 700,
                }}
              />
              <Typography variant="caption" sx={{ color: '#93C5FD', fontWeight: 700 }}>
                {FEATURED_RESOURCE.readTime}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              p: { xs: 3, sm: 4, md: 4.5 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              bgcolor: '#FFFFFF',
            }}
          >
            <Box>
              <Chip
                label={`FEATURED · ${FEATURED_RESOURCE.categoryLabel.toUpperCase()}`}
                size="small"
                sx={{
                  bgcolor: FEATURED_RESOURCE.bgTint,
                  color: FEATURED_RESOURCE.accentColor,
                  fontWeight: 800,
                  fontSize: '11px',
                  mb: 1.5,
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: '#0F172A',
                  fontSize: { xs: '20px', sm: '24px' },
                  lineHeight: 1.25,
                  mb: 1.25,
                }}
              >
                {FEATURED_RESOURCE.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#475569', lineHeight: 1.65, fontSize: '14.5px', mb: 2.5 }}
              >
                {FEATURED_RESOURCE.summary}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                {FEATURED_RESOURCE.highlights.map((h, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <CheckCircleIcon sx={{ color: '#10B981', fontSize: 18, mt: '2px', flexShrink: 0 }} />
                    <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600 }}>
                      {h}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              <Button
                variant="contained"
                onClick={onOpenDemo}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: '#1E40AF',
                  '&:hover': { bgcolor: '#1E3A8A' },
                  fontWeight: 700,
                  px: 3,
                  py: 1.1,
                  borderRadius: 2,
                }}
              >
                Request Full Validation Pack
              </Button>
              <Button
                variant="outlined"
                onClick={() => onNavigate('compliance')}
                sx={{
                  borderColor: '#CBD5E1',
                  color: '#0F172A',
                  fontWeight: 700,
                  px: 2.5,
                  py: 1.1,
                  borderRadius: 2,
                  '&:hover': { borderColor: '#1E40AF', bgcolor: '#EFF6FF' },
                }}
              >
                Open Trust Center
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Category Filter Tabs */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3.5 }}>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <Button
                key={cat.id}
                size="small"
                onClick={() => onChangeCategory(cat.id)}
                variant={isActive ? 'contained' : 'outlined'}
                sx={{
                  px: 2.25,
                  py: 0.85,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: '13px',
                  bgcolor: isActive ? '#1E40AF' : '#F8FAFC',
                  color: isActive ? '#FFFFFF' : '#334155',
                  borderColor: isActive ? '#1E40AF' : '#E2E8F0',
                  '&:hover': {
                    bgcolor: isActive ? '#1E3A8A' : '#EFF6FF',
                    borderColor: '#1E40AF',
                  },
                }}
              >
                {cat.label}
              </Button>
            );
          })}
        </Box>

        {/* 3-Column Resource Cards Grid */}
        {filteredItems.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 5,
              textAlign: 'center',
              borderRadius: 3,
              border: '1px dashed #CBD5E1',
              bgcolor: '#F8FAFC',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
              No matching resources found
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', mb: 2 }}>
              Clear your search filter or browse all scientific guides and templates.
            </Typography>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                setSearchQuery('');
                onChangeCategory('all');
              }}
            >
              Reset Filters
            </Button>
          </Paper>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
              gap: 2.5,
            }}
          >
            {filteredItems.map((item) => (
              <Paper
                key={item.id}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid #E2E8F0',
                  bgcolor: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    borderColor: item.accentColor,
                    boxShadow: '0 14px 28px -12px rgba(15, 23, 42, 0.12)',
                  },
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 1,
                      mb: 1.5,
                    }}
                  >
                    <Chip
                      label={item.categoryLabel}
                      size="small"
                      sx={{
                        bgcolor: item.bgTint,
                        color: item.accentColor,
                        fontWeight: 800,
                        fontSize: '11px',
                      }}
                    />
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                      {item.readTime}
                    </Typography>
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      color: '#0F172A',
                      fontSize: '16.5px',
                      lineHeight: 1.35,
                      mb: 1,
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: '#475569', lineHeight: 1.55, fontSize: '13.5px', mb: 2 }}
                  >
                    {item.summary}
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.85, mb: 2.5 }}>
                    {item.highlights.map((hl, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                        <CheckCircleIcon
                          sx={{ color: '#10B981', fontSize: 16, mt: '2px', flexShrink: 0 }}
                        />
                        <Typography variant="caption" sx={{ color: '#334155', fontWeight: 600, lineHeight: 1.45 }}>
                          {hl}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Box
                  sx={{
                    pt: 2,
                    borderTop: '1px solid #F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                    <MenuBookIcon sx={{ fontSize: 15, color: '#64748B' }} />
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700 }}>
                      {item.format}
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    endIcon={<ArrowForwardIcon sx={{ fontSize: '14px !important' }} />}
                    onClick={() => {
                      if (item.targetRoute) {
                        onNavigate(item.targetRoute);
                      } else {
                        onOpenDemo();
                      }
                    }}
                    sx={{
                      color: item.accentColor,
                      fontWeight: 800,
                      fontSize: '12.5px',
                      px: 1,
                      '&:hover': { bgcolor: item.bgTint },
                    }}
                  >
                    {item.targetRoute ? 'View Interactive' : 'Access Guide'}
                  </Button>
                </Box>
              </Paper>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};
