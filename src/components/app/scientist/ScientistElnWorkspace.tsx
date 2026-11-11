import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import FunctionsIcon from '@mui/icons-material/Functions';
import GridOnIcon from '@mui/icons-material/GridOn';
import HistoryIcon from '@mui/icons-material/History';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ScienceIcon from '@mui/icons-material/Science';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { MOCK_SAMPLES } from '../../../data/mockData';
import type {
  DashboardSession,
  ExperimentRun,
  SampleTestRequest,
} from '../../../types/dashboard';
import { DashboardSectionHeader } from '../shared/DashboardSectionHeader';
import { StatusChip } from '../shared/StatusChip';
import { WorkstationSplitView } from '../shared/WorkstationSplitView';
import { ESignatureModal, type ESignatureResult } from '../shared/ESignatureModal';
import { BarcodeLabelModal } from '../shared/BarcodeLabelModal';

interface ScientistElnWorkspaceProps {
  session: DashboardSession;
  experiments: ExperimentRun[];
  selectedExpId: string;
  onSelectExpId: (id: string) => void;
  onUpdateExperiment: (exp: ExperimentRun) => void;
  onCreateExperiment: (exp: ExperimentRun) => void;
  sampleRequests: SampleTestRequest[];
  onSubmitSampleRequest: (req: SampleTestRequest) => void;
  onNotify: (msg: string) => void;
}

const PLATE_ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const PLATE_COLS = Array.from({ length: 12 }, (_, i) => i + 1);
const STAGES: ExperimentRun['stage'][] = ['Draft', 'In Review', 'In Progress', 'Blocked', 'Completed', 'Archived'];
const SOP_TEMPLATES = [
  { label: 'SOP-ELN-042 · 96-Well Luciferase Knockdown Assay (v3.2)', version: 'v3.2' },
  { label: 'SOP-NGS-019 · 10x Genomics scRNA Library Prep (v2.4)', version: 'v2.4' },
  { label: 'SOP-ELN-088 · ELISA Dose-Response Serial Dilution (v1.9)', version: 'v1.9' },
];

function computeShortDigest(input: string): string {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `sha256:${(hash >>> 0).toString(16).padStart(8, '0')}e4a9...`;
}

function createAuditEntry(
  seq: number,
  actor: string,
  action: 'CREATE' | 'UPDATE' | 'SIGN' | 'SAMPLE_REQUEST',
  summary: string
) {
  const timestamp = new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC';
  return {
    id: `AUD-${seq}`,
    timestamp,
    actor,
    action,
    summary,
    hash: computeShortDigest(`${seq}|${actor}|${action}|${summary}|${timestamp}`),
  };
}

export const ScientistElnWorkspace: React.FC<ScientistElnWorkspaceProps> = ({
  session,
  experiments,
  selectedExpId,
  onSelectExpId,
  onUpdateExperiment,
  onCreateExperiment,
  sampleRequests,
  onSubmitSampleRequest,
  onNotify,
}) => {
  const [inspectorTab, setInspectorTab] = useState<'samples' | 'plate' | 'molecular'>('samples');
  const [esignOpen, setEsignOpen] = useState(false);
  const [signedRecords, setSignedRecords] = useState<Record<string, ESignatureResult>>({});
  const [auditOpen, setAuditOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [templateOpen, setTemplateOpen] = useState(false);
  const [barcodeSampleId, setBarcodeSampleId] = useState<string | null>(null);
  const [selectedWell, setSelectedWell] = useState<string>('C3');

  // Sample & Test Request form
  const [reqSampleId, setReqSampleId] = useState(MOCK_SAMPLES[0]?.id ?? 'SMP-2026-9041');
  const [reqAssay, setReqAssay] = useState('RT-qPCR Triplicate Panel');
  const [reqVolume, setReqVolume] = useState('50');
  const [reqPriority, setReqPriority] = useState<'Standard' | 'STAT'>('STAT');

  // New Run from SOP Template
  const [newRunTemplate, setNewRunTemplate] = useState(SOP_TEMPLATES[0].label);

  const activeExp = experiments.find((e) => e.id === selectedExpId) ?? experiments[0];
  const steps = activeExp.steps ?? [];
  const signedRecord = signedRecords[activeExp.id] ?? null;
  const linkedSamples = MOCK_SAMPLES.filter((s) =>
    (activeExp.linkedSampleIds ?? []).includes(s.id)
  );
  const barcodeSample = MOCK_SAMPLES.find((s) => s.id === barcodeSampleId) ?? null;

  const handleToggleStep = (stepId: string) => {
    const updatedSteps = steps.map((s) =>
      s.id === stepId
        ? {
            ...s,
            completed: !s.completed,
            stampedBy: !s.completed
              ? `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC`
              : undefined,
          }
        : s
    );
    const stepTarget = steps.find((s) => s.id === stepId);
    const prevTrail = activeExp.auditTrail ?? [];
    onUpdateExperiment({
      ...activeExp,
      steps: updatedSteps,
      auditTrail: [
        createAuditEntry(
          prevTrail.length + 1,
          session.userName,
          'UPDATE',
          `Toggled step "${stepTarget?.label.slice(0, 42) ?? stepId}..."`
        ),
        ...prevTrail,
      ],
    });
  };

  const handleAttachMockFile = () => {
    const seq = (activeExp.attachments?.length ?? 0) + 1;
    const nextFile = {
      id: `ATT-${activeExp.id}-${seq}`,
      name: `${activeExp.id}_Gel_Scan_${seq}.tiff`,
      fileType: 'Gel Image' as const,
      size: '2.4 MB',
      uploadedAt: 'Just now',
    };
    onUpdateExperiment({
      ...activeExp,
      attachments: [nextFile, ...(activeExp.attachments ?? [])],
    });
    onNotify(`Attached ${nextFile.name} to ${activeExp.id}.`);
  };

  const handleCreateRun = () => {
    const tpl = SOP_TEMPLATES.find((t) => t.label === newRunTemplate) ?? SOP_TEMPLATES[0];
    const nextId = `EXP-${104 + experiments.length}`;
    const created: ExperimentRun = {
      id: nextId,
      projectId: 'PRJ-2026-01',
      protocolName: tpl.label,
      stage: 'Draft',
      sampleCount: 24,
      updatedAt: 'Just now',
      sopVersion: tpl.version,
      plateId: `PLT-${15 + experiments.length}`,
      linkedSampleIds: [MOCK_SAMPLES[0].id],
      observationNotes: 'Initialized from versioned SOP template.',
      latexFormula: 'C_1 V_1 = C_2 V_2',
      smilesNotation: 'CC(=O)NC1=CC=C(C=C1)O',
      pdbTargetId: 'PDB: 6OIM',
      steps: [
        { id: `${nextId}-1`, label: 'Verify reagent lot numbers & expiration', targetNote: 'ISO 17025', completed: false },
        { id: `${nextId}-2`, label: 'Prepare plate layout and run controls', targetNote: '96-well', completed: false },
      ],
      attachments: [],
      auditTrail: [
        createAuditEntry(1, session.userName, 'CREATE', `Created ${nextId} from ${tpl.label}`),
      ],
    };
    onCreateExperiment(created);
    onSelectExpId(created.id);
    setTemplateOpen(false);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sample = MOCK_SAMPLES.find((s) => s.id === reqSampleId) ?? MOCK_SAMPLES[0];
    const newReq: SampleTestRequest = {
      id: `REQ-${401 + sampleRequests.length}`,
      experimentId: activeExp.id,
      sampleId: sample.id,
      sampleName: sample.name,
      assayType: reqAssay,
      aliquotUl: Number(reqVolume) || 50,
      priority: reqPriority,
      status: 'Queued',
      requestedAt: 'Just now',
    };
    onSubmitSampleRequest(newReq);
    if (!(activeExp.linkedSampleIds ?? []).includes(sample.id)) {
      onUpdateExperiment({
        ...activeExp,
        linkedSampleIds: [...(activeExp.linkedSampleIds ?? []), sample.id],
      });
    }
    setRequestOpen(false);
  };

  return (
    <Box>
      <WorkstationSplitView
        primary={
          <Paper
            elevation={0}
            sx={{ p: { xs: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}
          >
            <DashboardSectionHeader
              title={`ELN Experiment Runner — ${activeExp.id}`}
              subtitle={`${activeExp.protocolName} · ${activeExp.sopVersion ?? 'v1.0'}`}
              moduleRef="2.2 / 2.3"
              actionLabel={signedRecord ? 'Protocol Signed' : 'Sign Off Run'}
              actionIcon={<FingerprintIcon fontSize="small" />}
              onAction={() => setEsignOpen(true)}
              rightSlot={
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<HistoryIcon fontSize="small" />}
                    onClick={() => setAuditOpen(true)}
                    sx={{ borderColor: '#CBD5E1', color: '#0F172A', fontWeight: 700, borderRadius: '6px' }}
                  >
                    Audit Trail
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<AddIcon fontSize="small" />}
                    onClick={() => setTemplateOpen(true)}
                    sx={{ borderColor: '#CBD5E1', color: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}
                  >
                    New from SOP
                  </Button>
                </Box>
              }
            />

            {/* Experiment Run Selector & Stage Control */}
            <Box sx={{ display: 'flex', gap: 1.25, flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
              <TextField
                select
                size="small"
                label="Experiment Run"
                value={activeExp.id}
                onChange={(e) => onSelectExpId(e.target.value)}
                sx={{ minWidth: { xs: '100%', sm: 230 }, '& .MuiOutlinedInput-root': { borderRadius: '6px', fontSize: '13px' } }}
              >
                {experiments.map((exp) => (
                  <MenuItem key={exp.id} value={exp.id}>
                    {exp.id} · {exp.stage}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                size="small"
                label="Workflow Stage"
                value={activeExp.stage}
                onChange={(e) =>
                  onUpdateExperiment({ ...activeExp, stage: e.target.value as ExperimentRun['stage'] })
                }
                sx={{ minWidth: { xs: '100%', sm: 150 }, '& .MuiOutlinedInput-root': { borderRadius: '6px', fontSize: '13px' } }}
              >
                {STAGES.map((st) => (
                  <MenuItem key={st} value={st}>
                    {st}
                  </MenuItem>
                ))}
              </TextField>

              <StatusChip label={activeExp.stage} />
            </Box>

            {/* Interactive Checklist Steps */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mb: 2.5 }}>
              {steps.map((step) => (
                <Box
                  key={step.id}
                  onClick={() => handleToggleStep(step.id)}
                  sx={{
                    p: 1.5,
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    bgcolor: step.completed ? '#EFF6FF' : '#F8FAFC',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                    cursor: 'pointer',
                  }}
                >
                  <Checkbox checked={step.completed} size="small" sx={{ p: 0.25, color: '#1E40AF' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: '#0F172A',
                        textDecoration: step.completed ? 'line-through' : 'none',
                      }}
                    >
                      {step.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      {step.targetNote} {step.stampedBy ? `· Verified ${step.stampedBy}` : ''}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Rich ELN Notes, Formula & Attachments */}
            <Box sx={{ p: 2, borderRadius: '8px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF' }}>
                  ELN OBSERVATIONS, FORMULAS & ATTACHMENTS
                </Typography>
                <Button
                  size="small"
                  startIcon={<UploadFileIcon sx={{ fontSize: 15 }} />}
                  onClick={handleAttachMockFile}
                  sx={{ fontWeight: 700, color: '#1E40AF', fontSize: '12px' }}
                >
                  Attach Gel / CSV
                </Button>
              </Box>
              <TextField
                multiline
                rows={3}
                size="small"
                fullWidth
                value={activeExp.observationNotes ?? ''}
                onChange={(e) => onUpdateExperiment({ ...activeExp, observationNotes: e.target.value })}
                sx={{ bgcolor: '#FFFFFF', mb: 1.5 }}
              />

              {activeExp.latexFormula && (
                <Box sx={{ p: 1.25, borderRadius: '6px', bgcolor: '#EFF6FF', border: '1px solid #DBEAFE', mb: 1.25 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <FunctionsIcon sx={{ color: '#1E40AF', fontSize: 16 }} />
                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF' }}>
                      Equation / Kinetic Fit
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ fontFamily: 'var(--font-mono)', color: '#0F172A', display: 'block', mt: 0.4 }}>
                    {activeExp.latexFormula}
                  </Typography>
                </Box>
              )}

              {(activeExp.attachments ?? []).length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  {(activeExp.attachments ?? []).map((att) => (
                    <Chip
                      key={att.id}
                      size="small"
                      label={`${att.name} (${att.size})`}
                      sx={{
                        borderRadius: '6px',
                        bgcolor: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        fontWeight: 600,
                        fontSize: '11px',
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Paper>
        }
        inspector={
          <Paper
            elevation={0}
            sx={{ p: { xs: 2.5, md: 3 }, borderRadius: '10px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}
          >
            <Tabs
              value={inspectorTab}
              onChange={(_, v) => setInspectorTab(v)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                mb: 2,
                minHeight: 36,
                maxWidth: '100%',
                '& .MuiTab-root': { minHeight: 36, fontSize: '12px', fontWeight: 700 },
              }}
            >
              <Tab value="samples" label="Samples & Requests" />
              <Tab value="plate" label="96-Well Plate" />
              <Tab value="molecular" label="SMILES / 3D" />
            </Tabs>

            {inspectorTab === 'samples' && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.25 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                    Linked Aliquots ({linkedSamples.length})
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<ScienceIcon sx={{ fontSize: 15 }} />}
                    onClick={() => setRequestOpen(true)}
                    sx={{ bgcolor: '#1E40AF', '&:hover': { bgcolor: '#1E3A8A' }, fontWeight: 700, borderRadius: '6px', fontSize: '11.5px' }}
                  >
                    Request Sample / Test
                  </Button>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                  {linkedSamples.map((s) => (
                    <Box key={s.id} sx={{ p: 1.25, borderRadius: '8px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', fontFamily: 'var(--font-mono)' }}>
                          {s.id}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Tooltip title="Preview 1D/2D Cryo Barcode">
                            <IconButton size="small" onClick={() => setBarcodeSampleId(s.id)} sx={{ color: '#1E40AF' }}>
                              <QrCode2Icon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <StatusChip label={s.status} />
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', mt: 0.25 }}>
                        {s.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748B' }}>
                        {s.volumeUl} µL · {s.concentrationNgPerUl ?? 45} ng/µL · Well {s.storageLocation.well ?? 'A1'}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Typography variant="caption" sx={{ fontWeight: 800, color: '#475569', display: 'block', mb: 1 }}>
                  RECENT LAB SAMPLE / ASSAY REQUESTS
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                  {sampleRequests.map((req) => (
                    <Box key={req.id} sx={{ p: 1, borderRadius: '6px', bgcolor: '#EFF6FF', border: '1px solid #DBEAFE', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#0F172A', display: 'block' }} noWrap>
                          {req.id} · {req.assayType}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#475569', fontSize: '11px' }}>
                          {req.sampleId} · {req.aliquotUl} µL · {req.priority}
                        </Typography>
                      </Box>
                      <StatusChip label={req.status} />
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {inspectorTab === 'plate' && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <GridOnIcon sx={{ color: '#1E40AF', fontSize: 18 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                      Plate #{activeExp.plateId ?? 'PLT-09'} (96-Well)
                    </Typography>
                  </Box>
                  <Chip size="small" label={`Selected: ${selectedWell}`} sx={{ height: 20, bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 700, borderRadius: '4px' }} />
                </Box>
                <Box sx={{ overflowX: 'auto', pb: 0.5, mb: 1 }}>
                  <Box sx={{ minWidth: 300, display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 0.4 }}>
                    {PLATE_ROWS.flatMap((row) =>
                      PLATE_COLS.map((col) => {
                        const coord = `${row}${col}`;
                        const isActiveRegion = ['C', 'D', 'E', 'F'].includes(row) && col >= 3 && col <= 10;
                        const isControl = row === 'A' && col <= 2;
                        const isSelected = selectedWell === coord;
                        return (
                          <Tooltip key={coord} title={`Well ${coord}: ${isControl ? 'DMSO Control' : isActiveRegion ? 'CRISPRMAX Treated' : 'Empty'}`}>
                            <Box
                              onClick={() => setSelectedWell(coord)}
                              sx={{
                                aspectRatio: '1 / 1',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                border: isSelected ? '2px solid #0F172A' : '1px solid #CBD5E1',
                                bgcolor: isControl ? '#10B981' : isActiveRegion ? '#1E40AF' : '#F8FAFC',
                                opacity: isActiveRegion ? 0.55 + ((col - 2) / 10) * 0.45 : 1,
                              }}
                            />
                          </Tooltip>
                        );
                      })
                    )}
                  </Box>
                </Box>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                  Well <strong>{selectedWell}</strong>: {['C', 'D', 'E', 'F'].includes(selectedWell[0]) ? 'KRAS-G12D Assay Replicate · 50.0 µL' : selectedWell.startsWith('A') ? 'DMSO Vehicle Control' : 'Unassigned'}
                </Typography>
              </Box>
            )}

            {inspectorTab === 'molecular' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: '#EFF6FF', border: '1px solid #DBEAFE' }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E40AF', display: 'block' }}>
                    3D MOLECULAR TARGET PREVIEW
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: '#0F172A', mt: 0.25 }}>
                    {activeExp.pdbTargetId ?? 'PDB: 6OIM (KRAS Switch-II Pocket)'}
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                      p: 1.5,
                      borderRadius: '6px',
                      bgcolor: '#0F172A',
                      color: '#DBEAFE',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                    }}
                  >
                    HELIX-A2 · GLY12ASP · RMSD 0.84 Å · Ligand Binding Energy: -9.8 kcal/mol
                  </Box>
                </Box>
                <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#475569', display: 'block', mb: 0.5 }}>
                    INLINE SMILES STRUCTURE NOTATION
                  </Typography>
                  <Typography variant="caption" sx={{ fontFamily: 'var(--font-mono)', color: '#0F172A', wordBreak: 'break-all' }}>
                    {activeExp.smilesNotation ?? 'CC(=O)NC1=CC=C(C=C1)O'}
                  </Typography>
                </Box>
              </Box>
            )}

            {signedRecord && (
              <Box sx={{ mt: 2, p: 1.5, borderRadius: '8px', bgcolor: '#ECFDF5', border: '1px solid #A7F3D0' }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#065F46', display: 'block' }}>
                  21 CFR Signed · {signedRecord.meaning}
                </Typography>
                <Typography variant="caption" sx={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#064E3B', wordBreak: 'break-all' }}>
                  {signedRecord.sha256Hash}
                </Typography>
              </Box>
            )}
          </Paper>
        }
      />

      {/* Request Lab Sample / Assay Modal */}
      <Dialog open={requestOpen} onClose={() => setRequestOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Request Lab Sample & Assay Test</DialogTitle>
        <form onSubmit={handleRequestSubmit}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              select
              label="Specimen / Aliquot"
              size="small"
              fullWidth
              value={reqSampleId}
              onChange={(e) => setReqSampleId(e.target.value)}
            >
              {MOCK_SAMPLES.map((s) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.id} · {s.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Assay / Lab Test Pipeline"
              size="small"
              fullWidth
              required
              value={reqAssay}
              onChange={(e) => setReqAssay(e.target.value)}
            />
            <TextField
              label="Requested Aliquot Volume (µL)"
              type="number"
              size="small"
              fullWidth
              value={reqVolume}
              onChange={(e) => setReqVolume(e.target.value)}
            />
            <TextField
              select
              label="Priority"
              size="small"
              fullWidth
              value={reqPriority}
              onChange={(e) => setReqPriority(e.target.value as 'Standard' | 'STAT')}
            >
              <MenuItem value="Standard">Standard</MenuItem>
              <MenuItem value="STAT">STAT (Urgent)</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setRequestOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}>
              Submit to LIMS Queue
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* New Run from SOP Template Modal */}
      <Dialog open={templateOpen} onClose={() => setTemplateOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>New Experiment from SOP Template</DialogTitle>
        <DialogContent dividers>
          <TextField
            select
            label="Version-Controlled SOP Template"
            size="small"
            fullWidth
            value={newRunTemplate}
            onChange={(e) => setNewRunTemplate(e.target.value)}
          >
            {SOP_TEMPLATES.map((tpl) => (
              <MenuItem key={tpl.label} value={tpl.label}>
                {tpl.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setTemplateOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateRun} variant="contained" sx={{ bgcolor: '#1E40AF', fontWeight: 700, borderRadius: '6px' }}>
            Create ELN Run
          </Button>
        </DialogActions>
      </Dialog>

      {/* Audit Trail Inspector Drawer */}
      <Drawer
        anchor="right"
        open={auditOpen}
        onClose={() => setAuditOpen(false)}
        slotProps={{ paper: { sx: { width: { xs: '100%', sm: 420 }, p: 3 } } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
            21 CFR Part 11 Audit Trail — {activeExp.id}
          </Typography>
          <IconButton size="small" onClick={() => setAuditOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          {(activeExp.auditTrail ?? []).map((entry) => (
            <Box key={entry.id} sx={{ p: 1.5, borderRadius: '8px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Chip size="small" label={entry.action} sx={{ height: 20, bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 800, fontSize: '10px', borderRadius: '4px' }} />
                <Typography variant="caption" sx={{ color: '#64748B' }}>{entry.timestamp}</Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>
                {entry.summary}
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                Actor: {entry.actor}
              </Typography>
              <Typography variant="caption" sx={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: '#1E40AF' }}>
                {entry.hash}
              </Typography>
            </Box>
          ))}
        </Box>
      </Drawer>

      <ESignatureModal
        open={esignOpen}
        onClose={() => setEsignOpen(false)}
        recordTitle={`${activeExp.id} · ${activeExp.protocolName}`}
        signerName={session.userName}
        signerRole={session.roleTitle}
        onConfirm={(res) => {
          setSignedRecords((prev) => ({ ...prev, [activeExp.id]: res }));
          onUpdateExperiment({
            ...activeExp,
            stage: 'Completed',
            auditTrail: [
              {
                id: `AUD-${Date.now()}`,
                timestamp: new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC',
                actor: session.userName,
                action: 'SIGN',
                summary: `Signed off protocol (${res.meaning})`,
                hash: res.sha256Hash,
              },
              ...(activeExp.auditTrail ?? []),
            ],
          });
          onNotify('21 CFR Part 11 protocol signature sealed with SHA-256.');
        }}
      />

      {barcodeSample && (
        <BarcodeLabelModal
          open={Boolean(barcodeSample)}
          onClose={() => setBarcodeSampleId(null)}
          sampleId={barcodeSample.id}
          sampleName={barcodeSample.name}
          sampleType={barcodeSample.type}
          storagePath={`${barcodeSample.storageLocation.freezer} / ${barcodeSample.storageLocation.rack} / ${barcodeSample.storageLocation.boxId}`}
          onPrintConfirm={() => onNotify(`Sent cryo label ${barcodeSample.id} to ZPL printer.`)}
        />
      )}
    </Box>
  );
};
