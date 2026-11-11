import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import type { AiInsightItem } from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';

interface ScientistAiPanelProps {
  insights: AiInsightItem[];
  onAddInsight: (insight: AiInsightItem) => void;
  onAppendProtocolStep: (stepLabel: string) => void;
  onNotify: (msg: string) => void;
}

const SOURCES = ['PubMed Central', 'bioRxiv', 'medRxiv', 'IEEE Life Sciences', 'Internal ELN'] as const;
const CATEGORIES: ('ALL' | AiInsightItem['category'])[] = ['ALL', 'Literature', 'Hypothesis', 'Drug Target', 'Gap Alert'];

export const ScientistAiPanel: React.FC<ScientistAiPanelProps> = ({
  insights,
  onAddInsight,
  onAppendProtocolStep,
  onNotify,
}) => {
  const [aiQuery, setAiQuery] = useState('');
  const [activeSources, setActiveSources] = useState<string[]>(['PubMed Central', 'bioRxiv', 'Internal ELN']);
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | AiInsightItem['category']>('ALL');

  const toggleSource = (src: string) => {
    setActiveSources((prev) =>
      prev.includes(src) ? (prev.length > 1 ? prev.filter((s) => s !== src) : prev) : [...prev, src]
    );
  };

  const handleRunQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    const isDilutionPrompt = aiQuery.toLowerCase().includes('dilution') || aiQuery.toLowerCase().includes('stock');
    const generated: AiInsightItem = {
      id: `AI-${Date.now()}`,
      category: isDilutionPrompt ? 'Hypothesis' : 'Drug Target',
      title: `RAG Synthesis: ${aiQuery.trim()}`,
      summary: isDilutionPrompt
        ? 'Serial dilution protocol calculated: 1:3 step transfer (25 µL into 50 µL buffer) across 8 wells in triplicate yields 10 mM → 50 nM coverage.'
        : 'Cross-referenced indexed preprints and internal ELNs. Identified dual MEK/KRAS-G12D synergy and recommended 100 nM positive control.',
      sourceRef: `GatsBio RAG · ${activeSources.join(', ')}`,
      doi: 'https://doi.org/10.1038/s41586-026-04120-9',
      sourcePlatform: (activeSources[0] as AiInsightItem['sourcePlatform']) ?? 'PubMed Central',
      relevanceScore: 94,
      targetLigandNote: isDilutionPrompt ? 'Protocol step ready to append to active ELN run' : 'Switch-II pocket KD = 1.4 nM',
    };
    onAddInsight(generated);
    setAiQuery('');
    onNotify('Generated AI literature & hypothesis synthesis.');
  };

  const visibleInsights = insights.filter(
    (ins) => categoryFilter === 'ALL' || ins.category === categoryFilter
  );

  return (
    <Paper
      elevation={0}
      sx={{ p: { xs: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}
    >
      <DashboardSectionHeader
        title="AI Research Intelligence Engine"
        subtitle="PubMed/bioRxiv RAG synthesis, drug target & patent alerts, and protocol optimization assistant"
        moduleRef="2.5"
      />

      {/* Corpus Source Toggles */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1.5, alignItems: 'center' }}>
        <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mr: 0.5 }}>
          RAG Sources:
        </Typography>
        {SOURCES.map((src) => {
          const active = activeSources.includes(src);
          return (
            <Chip
              key={src}
              size="small"
              label={src}
              onClick={() => toggleSource(src)}
              sx={{
                height: 22,
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 700,
                bgcolor: active ? '#EFF6FF' : '#F8FAFC',
                color: active ? '#1E40AF' : '#64748B',
                border: `1px solid ${active ? '#93C5FD' : '#E2E8F0'}`,
              }}
            />
          );
        })}
      </Box>

      <form onSubmit={handleRunQuery}>
        <Box sx={{ display: 'flex', gap: 1.25, flexDirection: { xs: 'column', sm: 'row' }, mb: 1.5 }}>
          <TextField
            size="small"
            fullWidth
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            placeholder="Ask PubMed + ELNs (e.g. 'Calculate serial dilution for 10 mM stock to 50 nM across 8 wells')..."
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<AutoAwesomeIcon />}
            sx={{
              bgcolor: '#1E40AF',
              '&:hover': { bgcolor: '#1E3A8A' },
              fontWeight: 700,
              whiteSpace: 'nowrap',
              px: 2.5,
              borderRadius: '6px',
            }}
          >
            Synthesize Insights
          </Button>
        </Box>
      </form>

      {/* Quick AI Lab Assistant Preset + Category Filters */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        <Button
          size="small"
          onClick={() =>
            setAiQuery('Calculate serial dilution for 10 mM stock to 50 nM across 8 wells in triplicate')
          }
          sx={{ fontSize: '11.5px', fontWeight: 700, color: '#1E40AF', p: 0 }}
        >
          Try AI Lab Assistant: Serial dilution prompt →
        </Button>

        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {CATEGORIES.map((cat) => (
            <Chip
              key={cat}
              size="small"
              label={cat}
              onClick={() => setCategoryFilter(cat)}
              sx={{
                height: 22,
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 700,
                bgcolor: categoryFilter === cat ? '#1E40AF' : '#F8FAFC',
                color: categoryFilter === cat ? '#FFFFFF' : '#475569',
              }}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' }, gap: 2, '& > *': { minWidth: 0 } }}>
        {visibleInsights.map((ins) => (
          <Box
            key={ins.id}
            sx={{
              p: 2,
              borderRadius: '8px',
              bgcolor: '#EFF6FF',
              border: '1px solid #DBEAFE',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 1,
            }}
          >
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, gap: 1 }}>
                <Chip
                  label={ins.category}
                  size="small"
                  sx={{ bgcolor: '#FFFFFF', color: '#1E40AF', border: '1px solid #DBEAFE', fontWeight: 800, fontSize: '10.5px', borderRadius: '6px' }}
                />
                {ins.relevanceScore && (
                  <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 800 }}>
                    {ins.relevanceScore}% RAG Match
                  </Typography>
                )}
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5 }}>
                {ins.title}
              </Typography>
              <Typography variant="caption" sx={{ color: '#334155', display: 'block', lineHeight: 1.5 }}>
                {ins.summary}
              </Typography>
              {ins.targetLigandNote && (
                <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 700, display: 'block', mt: 0.75 }}>
                  Molecular / Protocol Note: {ins.targetLigandNote}
                </Typography>
              )}
              {ins.patentAlert && (
                <Typography variant="caption" sx={{ color: '#B45309', fontWeight: 700, display: 'block', mt: 0.25 }}>
                  Patent Alert: {ins.patentAlert}
                </Typography>
              )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1, pt: 1, borderTop: '1px solid #DBEAFE' }}>
              {ins.doi ? (
                <Link
                  href={ins.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.4, fontSize: '11.5px', fontWeight: 700, color: '#1E40AF' }}
                >
                  {ins.sourceRef}
                  <OpenInNewIcon sx={{ fontSize: 13 }} />
                </Link>
              ) : (
                <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 700 }}>
                  {ins.sourceRef}
                </Typography>
              )}
              <Button
                size="small"
                startIcon={<AddIcon sx={{ fontSize: 14 }} />}
                onClick={() => onAppendProtocolStep(ins.title)}
                sx={{ fontSize: '11px', fontWeight: 700, color: '#1E40AF', py: 0.25 }}
              >
                Add to ELN
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};
