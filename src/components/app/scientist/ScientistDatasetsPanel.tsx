import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import StorageIcon from '@mui/icons-material/Storage';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import type { BioDatasetRecord } from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';

interface ScientistDatasetsPanelProps {
  datasets: BioDatasetRecord[];
  onAddDataset: (ds: BioDatasetRecord) => void;
  onNotify: (msg: string) => void;
}

const FORMAT_OPTIONS: BioDatasetRecord['format'][] = [
  'FASTQ',
  'BAM',
  'VCF',
  'DICOM',
  'TIFF',
  'FCS',
  'PDB',
  'CSV',
  'HDF5',
  'AnnData',
];

export const ScientistDatasetsPanel: React.FC<ScientistDatasetsPanelProps> = ({
  datasets,
  onAddDataset,
  onNotify,
}) => {
  const [formatFilter, setFormatFilter] = useState<string>('ALL');
  const [selectedDataset, setSelectedDataset] = useState<BioDatasetRecord | null>(datasets[0] ?? null);
  const [versionDataset, setVersionDataset] = useState<BioDatasetRecord | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  const [newName, setNewName] = useState('');
  const [newFormat, setNewFormat] = useState<BioDatasetRecord['format']>('AnnData');
  const [newOntology, setNewOntology] = useState('NCBITaxon:9606, GO:0007265');

  const visibleDatasets = datasets.filter(
    (ds) => formatFilter === 'ALL' || ds.format === formatFilter
  );

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const created: BioDatasetRecord = {
      id: `DS-${901 + datasets.length}`,
      name: newName.trim(),
      format: newFormat,
      version: 'v1.0.0',
      size: '4.2 GB',
      qc: 'Pass',
      ontologyTags: newOntology
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      sequencePreview:
        newFormat === 'FASTQ' || newFormat === 'BAM' || newFormat === 'VCF'
          ? "5'-ATGGACTGAATATAAACTTGTGGTAGTTGGAGCTGATGGCGTAG-3'"
          : undefined,
      restrictionSites: ['EcoRI (pos 14)'],
      versions: [
        {
          version: 'v1.0.0',
          date: new Date().toISOString().slice(0, 10),
          author: 'Current Investigator',
          diffSummary: 'Initial ingested dataset indexed with OBO/MeSH ontology tags',
        },
      ],
    };
    onAddDataset(created);
    setSelectedDataset(created);
    setNewName('');
    setUploadOpen(false);
    onNotify(`Indexed biological dataset ${created.id} (${created.format}).`);
  };

  return (
    <Paper
      elevation={0}
      sx={{ p: { xs: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}
    >
      <DashboardSectionHeader
        title="Biological Data Repository"
        subtitle="Versioned genomic, imaging, and single-cell datasets with OBO/MeSH ontologies & sequence viewer"
        moduleRef="2.4"
        actionLabel="Ingest Dataset"
        actionIcon={<UploadFileIcon fontSize="small" />}
        onAction={() => setUploadOpen(true)}
        rightSlot={
          <TextField
            select
            size="small"
            value={formatFilter}
            onChange={(e) => setFormatFilter(e.target.value)}
            sx={{ minWidth: { xs: '100%', sm: 130 }, '& .MuiOutlinedInput-root': { borderRadius: '6px', fontSize: '12.5px' } }}
          >
            <MenuItem value="ALL">All Formats</MenuItem>
            {FORMAT_OPTIONS.map((fmt) => (
              <MenuItem key={fmt} value={fmt}>
                {fmt}
              </MenuItem>
            ))}
          </TextField>
        }
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mb: 2 }}>
        {visibleDatasets.map((ds) => {
          const isSelected = selectedDataset?.id === ds.id;
          return (
            <Box
              key={ds.id}
              onClick={() => setSelectedDataset(ds)}
              sx={{
                p: 1.5,
                borderRadius: '8px',
                bgcolor: isSelected ? '#EFF6FF' : '#F8FAFC',
                border: `1px solid ${isSelected ? '#93C5FD' : '#E2E8F0'}`,
                cursor: 'pointer',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
                  <StorageIcon sx={{ color: '#1E40AF', fontSize: 20, flexShrink: 0 }} />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', fontFamily: 'var(--font-mono)', fontSize: '12.5px', wordBreak: 'break-all' }}>
                      {ds.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      {ds.format} · {ds.version} · {ds.size}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Button
                    size="small"
                    startIcon={<HistoryIcon sx={{ fontSize: 14 }} />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setVersionDataset(ds);
                    }}
                    sx={{ fontSize: '11px', fontWeight: 700, color: '#1E40AF', py: 0.25 }}
                  >
                    Versions ({ds.versions.length})
                  </Button>
                  <StatusChip label={ds.qc} />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                {ds.ontologyTags.map((tag) => (
                  <Chip
                    key={tag}
                    size="small"
                    label={tag}
                    sx={{
                      height: 20,
                      borderRadius: '4px',
                      bgcolor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      color: '#334155',
                      fontSize: '10px',
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* DNA/RNA Sequence Ribbon & Dataset Inspector (PRD 5.3) */}
      {selectedDataset && (
        <Box sx={{ p: 1.75, borderRadius: '8px', bgcolor: '#0F172A', color: '#F8FAFC' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#93C5FD' }}>
              SEQUENCE RIBBON & METADATA INSPECTOR — {selectedDataset.id} ({selectedDataset.format})
            </Typography>
            <Typography variant="caption" sx={{ color: '#CBD5E1', fontFamily: 'var(--font-mono)' }}>
              {selectedDataset.version}
            </Typography>
          </Box>
          {selectedDataset.sequencePreview ? (
            <>
              <Box
                sx={{
                  p: 1.25,
                  borderRadius: '6px',
                  bgcolor: '#1E293B',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  letterSpacing: '0.6px',
                  overflowX: 'auto',
                  whiteSpace: 'nowrap',
                  color: '#E2E8F0',
                }}
              >
                {selectedDataset.sequencePreview}
              </Box>
              {selectedDataset.restrictionSites && (
                <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mt: 1 }}>
                  <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700 }}>
                    Cut Sites / Reading Frame (+1):
                  </Typography>
                  {selectedDataset.restrictionSites.map((site) => (
                    <Chip
                      key={site}
                      size="small"
                      label={site}
                      sx={{ height: 18, bgcolor: '#1E40AF', color: '#FFFFFF', fontSize: '10px', fontWeight: 700, borderRadius: '4px' }}
                    />
                  ))}
                </Box>
              )}
            </>
          ) : (
            <Typography variant="caption" sx={{ color: '#CBD5E1' }}>
              Binary {selectedDataset.format} object indexed cleanly · Ontologies: {selectedDataset.ontologyTags.join(' | ')}
            </Typography>
          )}
        </Box>
      )}

      {/* Dataset Ingestion Dialog */}
      <Dialog open={uploadOpen} onClose={() => setUploadOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Ingest Biological Dataset</DialogTitle>
        <form onSubmit={handleUpload}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Dataset Filename"
              size="small"
              fullWidth
              required
              placeholder="e.g. Tumor_Cohort_scRNA.h5ad"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <TextField
              select
              label="File Format"
              size="small"
              fullWidth
              value={newFormat}
              onChange={(e) => setNewFormat(e.target.value as BioDatasetRecord['format'])}
            >
              {FORMAT_OPTIONS.map((fmt) => (
                <MenuItem key={fmt} value={fmt}>
                  {fmt}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Ontology Tags (OBO / NCBI / GO / MeSH)"
              size="small"
              fullWidth
              value={newOntology}
              onChange={(e) => setNewOntology(e.target.value)}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setUploadOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}>
              Index Dataset
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Version History & Diff Modal */}
      <Dialog open={Boolean(versionDataset)} onClose={() => setVersionDataset(null)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>
          Version Provenance — {versionDataset?.name}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {versionDataset?.versions.map((ver, idx) => (
              <Box key={ver.version}>
                <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Chip size="small" label={ver.version} sx={{ height: 20, bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 800, borderRadius: '4px' }} />
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      {ver.date} · {ver.author}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#0F172A', fontSize: '13px' }}>
                    {ver.diffSummary}
                  </Typography>
                </Box>
                {idx < (versionDataset?.versions.length ?? 0) - 1 && <Divider sx={{ mt: 1.5 }} />}
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 1.5 }}>
          <Button onClick={() => setVersionDataset(null)} sx={{ fontWeight: 700 }}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
