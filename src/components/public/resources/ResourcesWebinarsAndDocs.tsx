import React from 'react';
import { Box, Typography, Paper, Button, Chip } from '@mui/material';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import CodeIcon from '@mui/icons-material/Code';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  WEBINAR_SESSIONS,
  DEVELOPER_SPECS,
} from '../../../data/resourcesData';

interface ResourcesWebinarsAndDocsProps {
  onOpenDemo: () => void;
}

export const ResourcesWebinarsAndDocs: React.FC<ResourcesWebinarsAndDocsProps> = ({
  onOpenDemo,
}) => {
  return (
    <Box id="resources-webinars" sx={{ py: { xs: 6, md: 9 }, bgcolor: '#FFFFFF' }}>
      <Box className="container-custom">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 740, mx: 'auto', mb: { xs: 4, md: 5.5 } }}>
          <Chip
            label="Workshops & Technical Specifications"
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
              mb: 1.25,
            }}
          >
            Technical Webinars & Integration Docs
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#475569', fontSize: { xs: '14.5px', md: '16px' }, lineHeight: 1.6 }}
          >
            Join GatsBio solutions engineers for deep-dive architecture sessions and explore hardware/API documentation for laboratory automation.
          </Typography>
        </Box>

        {/* Main 2-Column Responsive Layout */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.15fr 1fr' },
            gap: 3.5,
            alignItems: 'stretch',
            mb: 4.5,
          }}
        >
          {/* Left: 3 Webinar & Workshop Cards */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {WEBINAR_SESSIONS.map((session) => {
              const isLive = session.status === 'Live Workshop';
              return (
                <Paper
                  key={session.id}
                  elevation={0}
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    borderRadius: 3,
                    border: '1px solid #E2E8F0',
                    bgcolor: '#F8FAFC',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.25,
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      borderColor: '#1E40AF',
                      boxShadow: '0 10px 24px -12px rgba(15, 23, 42, 0.1)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 1,
                    }}
                  >
                    <Chip
                      icon={<PlayCircleOutlinedIcon sx={{ fontSize: '15px !important' }} />}
                      label={`${session.status} · ${session.duration}`}
                      size="small"
                      sx={{
                        bgcolor: isLive ? '#ECFDF5' : '#EFF6FF',
                        color: isLive ? '#065F46' : '#1E40AF',
                        fontWeight: 800,
                        fontSize: '11px',
                      }}
                    />
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                      {session.speaker}
                    </Typography>
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 800, color: '#0F172A', fontSize: '16.5px', lineHeight: 1.35 }}
                  >
                    {session.title}
                  </Typography>

                  <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.55, fontSize: '13.5px' }}>
                    {session.summary}
                  </Typography>

                  <Box
                    sx={{
                      pt: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 1.5,
                    }}
                  >
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {session.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            bgcolor: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            color: '#334155',
                            fontWeight: 700,
                            fontSize: '11px',
                            height: 22,
                          }}
                        />
                      ))}
                    </Box>

                    <Button
                      size="small"
                      onClick={onOpenDemo}
                      endIcon={<ArrowForwardIcon sx={{ fontSize: '14px !important' }} />}
                      sx={{ color: '#1E40AF', fontWeight: 800, fontSize: '12.5px' }}
                    >
                      {isLive ? 'Reserve Seat' : 'Watch Session'}
                    </Button>
                  </Box>
                </Paper>
              );
            })}
          </Box>

          {/* Right: Editorial Briefing Visual Card */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3.5,
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              bgcolor: '#0F172A',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ position: 'relative', minHeight: { xs: 250, sm: 310 }, flex: 1 }}>
              <Box
                component="img"
                src="/images/resources-webinar-studio.jpg"
                alt="Solutions architect presenting genomic pipelines and microplate grids in a laboratory briefing room"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(15, 23, 42, 0.94) 0%, rgba(15, 23, 42, 0.28) 60%, rgba(15, 23, 42, 0.08) 100%)',
                }}
              />
            </Box>

            <Box sx={{ p: { xs: 3, md: 3.5 }, bgcolor: '#0F172A' }}>
              <Typography
                variant="overline"
                sx={{ color: '#93C5FD', fontWeight: 800, letterSpacing: '0.8px' }}
              >
                Architect Office Hours
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, fontSize: { xs: '19px', md: '22px' }, mb: 1 }}>
                Live Lab Automation & Instrument Deep-Dives
              </Typography>
              <Typography variant="body2" sx={{ color: '#CBD5E1', lineHeight: 1.6, mb: 2.5 }}>
                Bring your sequencing schema, liquid handler models, or audit questions directly to our bioinformatics and regulatory engineering leads.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={onOpenDemo}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: '#1E40AF',
                  '&:hover': { bgcolor: '#1D4ED8' },
                  fontWeight: 700,
                  py: 1.25,
                  borderRadius: 2,
                }}
              >
                Schedule Private Technical Briefing
              </Button>
            </Box>
          </Paper>
        </Box>

        {/* Bottom 3-Column Developer & Hardware Specs */}
        <Box
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3.5,
            bgcolor: '#F8FAFC',
            border: '1px solid #E2E8F0',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
            <CodeIcon sx={{ color: '#1E40AF', fontSize: 22 }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '18px', md: '20px' } }}>
              Developer API & Laboratory Hardware Specifications
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 2.5,
            }}
          >
            {DEVELOPER_SPECS.map((spec) => (
              <Paper
                key={spec.id}
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 2.5,
                  bgcolor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                }}
              >
                <Chip
                  label={spec.badge}
                  size="small"
                  sx={{
                    bgcolor: '#EFF6FF',
                    color: '#1E40AF',
                    fontWeight: 800,
                    fontSize: '11px',
                    mb: 1.25,
                  }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.6, fontSize: '15px' }}>
                  {spec.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.55, fontSize: '13.5px' }}>
                  {spec.desc}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
