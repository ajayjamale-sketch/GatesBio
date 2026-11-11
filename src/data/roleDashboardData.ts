import type {
  AdverseEventItem,
  AiInsightItem,
  BudgetAllocation,
  CapaDeviationItem,
  ClinicalTrialItem,
  ExperimentRun,
  LabTestTask,
  OrgUserRecord,
  PublicationRecord,
  ResearchProjectItem,
  SopDocumentItem,
  SystemServiceHealth,
} from '../types/dashboard';

export const ORGANIZATIONS_LIST = [
  'Vanguard Biotherapeutics',
  'Vanguard Clinical Network',
  'GatsBio Academic Consortium',
  'GatsBio Enterprise Tenant',
];

export const ROLE_NOTIFICATIONS: Record<string, { id: string; title: string; time: string; severity: 'info' | 'warning' | 'success' }[]> = {
  'research-scientist': [
    { id: 'N-101', title: 'CRISPR-RUN-104 sequencing QC passed (Q30: 94.8%)', time: '8m ago', severity: 'success' },
    { id: 'N-102', title: 'AI Literature Engine flagged 3 new oncology preprints', time: '42m ago', severity: 'info' },
  ],
  'lab-technician': [
    { id: 'N-201', title: 'STAT Sample SMP-2026-9045 queued for RT-qPCR', time: '4m ago', severity: 'warning' },
    { id: 'N-202', title: 'Freezer ULT-01 (-80°C) telemetry nominal at -79.8°C', time: '15m ago', severity: 'success' },
  ],
  'clinical-coordinator': [
    { id: 'N-301', title: 'Trial VGB-ONC-204 reached 82% cohort enrollment', time: '12m ago', severity: 'success' },
    { id: 'N-302', title: '2 participant e-Consent forms pending PI counter-sign', time: '1h ago', severity: 'warning' },
  ],
  'biotech-admin': [
    { id: 'N-401', title: 'Q4 Genomics Grant burn rate tracking 6% under budget', time: '25m ago', severity: 'success' },
    { id: 'N-402', title: 'NovaSeq 6000 utilization reached 89% this week', time: '2h ago', severity: 'info' },
  ],
  'compliance-officer': [
    { id: 'N-501', title: '2 batch records awaiting 21 CFR Part 11 e-signature', time: '6m ago', severity: 'warning' },
    { id: 'N-502', title: 'SOP-LIMS-014 annual QA review completed', time: '1d ago', severity: 'success' },
  ],
  'system-admin': [
    { id: 'N-601', title: 'All 14 IoT cryo telemetry gateways online (99.99% SLA)', time: '3m ago', severity: 'success' },
    { id: 'N-602', title: 'Okta SAML certificate rotation scheduled in 14 days', time: '3h ago', severity: 'info' },
  ],
};

export const INITIAL_PROJECTS: ResearchProjectItem[] = [
  {
    id: 'PRJ-2026-01',
    title: 'CRISPR-Cas9 KRAS Target Validation Screen',
    leadPi: 'Dr. Elena Vance, Ph.D.',
    grantCode: 'NIH-R01-CA28910',
    milestoneProgress: 78,
    status: 'Active',
    targetDate: '2026-12-18',
  },
  {
    id: 'PRJ-2026-02',
    title: 'Single-Cell RNA-Seq Tumor Microenvironment Atlas',
    leadPi: 'Dr. Elena Vance, Ph.D.',
    grantCode: 'VGB-ONC-402',
    milestoneProgress: 92,
    status: 'In Review',
    targetDate: '2026-11-30',
  },
  {
    id: 'PRJ-2026-03',
    title: 'Bispecific Antibody Affinity Maturation Assay',
    leadPi: 'Dr. Liam Patel',
    grantCode: 'VGB-BIO-118',
    milestoneProgress: 54,
    status: 'Active',
    targetDate: '2027-01-22',
  },
  {
    id: 'PRJ-2026-04',
    title: 'Lipid Nanoparticle Stability & Cryo-Formulation',
    leadPi: 'Dr. Elena Vance, Ph.D.',
    grantCode: 'NSF-BIO-7741',
    milestoneProgress: 100,
    status: 'Completed',
    targetDate: '2026-10-28',
  },
];

export const INITIAL_EXPERIMENTS: ExperimentRun[] = [
  {
    id: 'EXP-104',
    projectId: 'PRJ-2026-01',
    protocolName: 'SOP-ELN-042 · 96-Well Luciferase Knockdown Assay',
    stage: 'In Progress',
    sampleCount: 48,
    updatedAt: 'Today, 09:40 UTC',
  },
  {
    id: 'EXP-105',
    projectId: 'PRJ-2026-02',
    protocolName: 'SOP-NGS-019 · 10x Genomics scRNA Library Prep',
    stage: 'Completed',
    sampleCount: 24,
    updatedAt: 'Yesterday, 17:15 UTC',
  },
  {
    id: 'EXP-106',
    projectId: 'PRJ-2026-03',
    protocolName: 'SOP-ELN-088 · ELISA Dose-Response Serial Dilution',
    stage: 'Draft',
    sampleCount: 32,
    updatedAt: '2 days ago',
  },
];

export const AI_RESEARCH_INSIGHTS: AiInsightItem[] = [
  {
    id: 'AI-01',
    category: 'Literature',
    title: 'Synergistic MEK + KRAS G12D Inhibition Kinetics',
    summary:
      'PubMed RAG synthesis across 14 recent oncology studies suggests pre-incubating HEK293-KRAS lines for 18h reduces assay variance by 22%.',
    sourceRef: 'PubMed Central · DOI 10.1038/s41586-026',
  },
  {
    id: 'AI-02',
    category: 'Hypothesis',
    title: 'Unexplored Phospho-ERK Feedback Loop in Cohort B',
    summary:
      'Clustering anomalies in Run EXP-104 indicate secondary resistance markers emerging above 250 nM concentration.',
    sourceRef: 'GatsBio Anomaly Engine · Run EXP-104',
  },
  {
    id: 'AI-03',
    category: 'Gap Alert',
    title: 'Missing Negative Control Replicates in Plate #PLT-09',
    summary:
      'Automated QC pre-check recommends adding 2 additional DMSO vehicle wells before NovaSeq submission.',
    sourceRef: 'ELN Protocol Advisor',
  },
];

export const PUBLICATION_RECORDS: PublicationRecord[] = [
  {
    id: 'PUB-01',
    title: 'High-Throughput CRISPR Perturbation Mapping in Solid Tumors',
    journalOrPatent: 'Nature Biotechnology (Manuscript)',
    status: 'Peer Review',
    owners: 'E. Vance, M. Chen, L. Patel',
  },
  {
    id: 'PUB-02',
    title: 'Modified LNP Formulation for Cold-Chain mRNA Stability',
    journalOrPatent: 'USPTO Provisional #63/991,204',
    status: 'Patent Filed',
    owners: 'E. Vance, S. Jenkins',
  },
  {
    id: 'PUB-03',
    title: 'Automated 384-Well Cytotoxicity Normalization Pipeline',
    journalOrPatent: 'Journal of Biomolecular Screening',
    status: 'Drafting',
    owners: 'E. Vance, D. Ross',
  },
];

export const INITIAL_LAB_TASKS: LabTestTask[] = [
  {
    id: 'TST-901',
    sampleId: 'SMP-2026-9041',
    assayType: 'RT-qPCR Triplicate Panel',
    instrument: 'QuantStudio 7 Flex',
    priority: 'STAT',
    status: 'Running',
  },
  {
    id: 'TST-902',
    sampleId: 'SMP-2026-9042',
    assayType: 'WGS Library Prep (2x150bp)',
    instrument: 'Illumina NovaSeq 6000',
    priority: 'Standard',
    status: 'Queued',
  },
  {
    id: 'TST-903',
    sampleId: 'SMP-2026-9043',
    assayType: 'Flow Cytometry Immunophenotyping',
    instrument: 'BD FACSAria Fusion',
    priority: 'STAT',
    status: 'Queued',
  },
  {
    id: 'TST-904',
    sampleId: 'SMP-2026-9044',
    assayType: 'Qubit dsDNA Fluorometric QC',
    instrument: 'Thermo Qubit 4',
    priority: 'Standard',
    status: 'Completed',
  },
];

export const CRYO_TELEMETRY_SERIES = [
  { time: '00:00', ult01: -80.2, ult02: -79.9, co2: 5.0 },
  { time: '04:00', ult01: -80.0, ult02: -79.8, co2: 5.0 },
  { time: '08:00', ult01: -79.6, ult02: -79.7, co2: 5.1 },
  { time: '12:00', ult01: -79.8, ult02: -80.1, co2: 5.0 },
  { time: '16:00', ult01: -80.1, ult02: -80.0, co2: 4.9 },
  { time: '20:00', ult01: -80.3, ult02: -79.9, co2: 5.0 },
];

export const INITIAL_TRIALS: ClinicalTrialItem[] = [
  {
    id: 'VGB-ONC-204',
    title: 'Phase II Multi-Center Solid Tumor Biomarker Study',
    phase: 'Phase II',
    enrolled: 98,
    target: 120,
    status: 'Recruiting',
  },
  {
    id: 'VGB-IMM-108',
    title: 'Phase I Safety & PK Cohort for Bispecific mAb-09',
    phase: 'Phase I',
    enrolled: 36,
    target: 36,
    status: 'Active',
  },
  {
    id: 'VGB-OBS-051',
    title: 'Longitudinal Liquid Biopsy cfDNA Registry',
    phase: 'Observational',
    enrolled: 214,
    target: 300,
    status: 'Recruiting',
  },
];

export const ADVERSE_EVENTS_LIST: AdverseEventItem[] = [
  {
    id: 'AE-4401',
    trialId: 'VGB-ONC-204',
    subjectCode: 'SUBJ-0842',
    term: 'Grade 1 Injection Site Erythema (MedDRA 10022061)',
    severity: 'Mild',
    reportedAt: '2026-11-10 14:20 UTC',
  },
  {
    id: 'AE-4402',
    trialId: 'VGB-IMM-108',
    subjectCode: 'SUBJ-0319',
    term: 'Transient Pyrexia 38.2°C (MedDRA 10037660)',
    severity: 'Moderate',
    reportedAt: '2026-11-09 09:05 UTC',
  },
];

export const BUDGET_ALLOCATIONS: BudgetAllocation[] = [
  { department: 'Functional Genomics', allocatedUsd: 420000, spentUsd: 318000, grantCode: 'NIH-R01' },
  { department: 'Cellular Pharmacology', allocatedUsd: 290000, spentUsd: 215000, grantCode: 'VGB-BIO' },
  { department: 'Clinical Operations', allocatedUsd: 540000, spentUsd: 412000, grantCode: 'VGB-GCP' },
  { department: 'Bioinformatics & AI', allocatedUsd: 210000, spentUsd: 164000, grantCode: 'NSF-774' },
];

export const CAPA_DEVIATIONS: CapaDeviationItem[] = [
  {
    id: 'CAPA-2026-19',
    source: 'Plate #PLT-09 · qPCR Run',
    category: 'OOS Assay',
    severity: 'Medium',
    status: 'Under Review',
  },
  {
    id: 'CAPA-2026-18',
    source: 'HPLC-Agilent-02',
    category: 'Calibration Drift',
    severity: 'High',
    status: 'Open',
  },
  {
    id: 'CAPA-2026-17',
    source: 'SOP-LIMS-014 Rev 3',
    category: 'SOP Deviation',
    severity: 'Low',
    status: 'Closed',
  },
];

export const SOP_DOCUMENTS: SopDocumentItem[] = [
  {
    id: 'SOP-1',
    code: 'SOP-LIMS-014',
    title: '2D Barcode Accessioning & Cryo Custody Verification',
    version: 'v4.2',
    framework: 'FDA 21 CFR Part 11',
    reviewDue: '2027-02-15',
  },
  {
    id: 'SOP-2',
    code: 'SOP-EQP-008',
    title: 'Illumina NovaSeq Optical Alignment & Calibration',
    version: 'v3.0',
    framework: 'ISO 17025',
    reviewDue: '2026-12-01',
  },
  {
    id: 'SOP-3',
    code: 'SOP-GMP-021',
    title: 'Batch Record Dual-Key Electronic Signature Release',
    version: 'v5.1',
    framework: 'GMP',
    reviewDue: '2027-03-10',
  },
];

export const INITIAL_ORG_USERS: OrgUserRecord[] = [
  {
    id: 'USR-01',
    name: 'Dr. Elena Vance, Ph.D.',
    email: 'e.vance@gatsbio.org',
    roleId: 'research-scientist',
    organization: 'Vanguard Biotherapeutics',
    mfaEnabled: true,
    status: 'Active',
  },
  {
    id: 'USR-02',
    name: 'Marcus Chen',
    email: 'm.chen@gatsbio.org',
    roleId: 'lab-technician',
    organization: 'Vanguard Biotherapeutics',
    mfaEnabled: true,
    status: 'Active',
  },
  {
    id: 'USR-03',
    name: 'Dr. Priya Nair',
    email: 'p.nair@gatsbio.org',
    roleId: 'clinical-coordinator',
    organization: 'Vanguard Clinical Network',
    mfaEnabled: true,
    status: 'Active',
  },
  {
    id: 'USR-04',
    name: 'Sarah Jenkins, MBA',
    email: 's.jenkins@gatsbio.org',
    roleId: 'biotech-admin',
    organization: 'Vanguard Biotherapeutics',
    mfaEnabled: true,
    status: 'Active',
  },
  {
    id: 'USR-05',
    name: 'David Ross, RAC',
    email: 'd.ross@gatsbio.org',
    roleId: 'compliance-officer',
    organization: 'Vanguard Biotherapeutics',
    mfaEnabled: true,
    status: 'Active',
  },
];

export const SYSTEM_SERVICES_HEALTH: SystemServiceHealth[] = [
  { id: 'SRV-1', service: 'LIMS Specimen & Barcode API', status: 'Operational', uptime: '99.99%', latencyMs: 38 },
  { id: 'SRV-2', service: 'Bio Data Lake (FASTQ / VCF Object Store)', status: 'Operational', uptime: '99.98%', latencyMs: 64 },
  { id: 'SRV-3', service: 'MQTT Cryo IoT Telemetry Broker', status: 'Operational', uptime: '99.99%', latencyMs: 21 },
  { id: 'SRV-4', service: '21 CFR Part 11 SHA-256 Audit Ledger', status: 'Operational', uptime: '100.00%', latencyMs: 29 },
];

export const INFRA_TRAFFIC_SERIES = [
  { hour: '06:00', apiCalls: 14200, iotEvents: 38400 },
  { hour: '09:00', apiCalls: 31800, iotEvents: 41200 },
  { hour: '12:00', apiCalls: 46500, iotEvents: 42900 },
  { hour: '15:00', apiCalls: 49200, iotEvents: 43100 },
  { hour: '18:00', apiCalls: 28400, iotEvents: 39800 },
  { hour: '21:00', apiCalls: 19600, iotEvents: 38900 },
];
