export type SectorId = 'biopharma' | 'academia' | 'cro' | 'diagnostics';

export interface SectorSolution {
  id: SectorId;
  name: string;
  shortName: string;
  badge: string;
  accentColor: string;
  bgTint: string;
  borderColor: string;
  imageUrl: string;
  headline: string;
  desc: string;
  roiMetric: string;
  roiLabel: string;
  legacyPain: string;
  gatsBioFix: string;
  benefits: string[];
  recommendedModules: string[];
  complianceTags: string[];
}

export interface RoleSolution {
  id: 'pi' | 'lab-ops' | 'qa-officer' | 'clinical-coord';
  roleTitle: string;
  shortLabel: string;
  subtitle: string;
  accentColor: string;
  primaryMetric: string;
  metricLabel: string;
  legacyChallenge: string;
  workflowSteps: string[];
  outcomes: string[];
  moduleTags: string[];
}

export interface SectorComplianceRow {
  sectorId: SectorId;
  sectorName: string;
  accentColor: string;
  standards: string[];
  deploymentModel: string;
  isolationLevel: string;
  onboardingTime: string;
}

export interface OnboardingPhase {
  step: string;
  timeframe: string;
  title: string;
  desc: string;
}

export const SECTOR_SOLUTIONS: SectorSolution[] = [
  {
    id: 'biopharma',
    name: 'Biopharma & Therapeutics',
    shortName: 'Biopharma',
    badge: 'Preclinical to IND',
    accentColor: '#1E40AF',
    bgTint: '#EFF6FF',
    borderColor: '#BFDBFE',
    imageUrl: '/images/solution-biopharma.jpg',
    headline: 'Accelerate Preclinical Lead Optimization to IND Filing',
    desc: 'Therapeutics teams and biotech spinouts require rapid experimental iteration without compromising intellectual property or regulatory integrity. GatsBio links 96/384-well assay plates directly to bioinformatics pipelines and 21 CFR Part 11 batch records.',
    roiMetric: '8.4 hrs/wk',
    roiLabel: 'Saved per researcher',
    legacyPain: 'Disconnected ELNs, Excel plate maps, and manual IND submission assembly.',
    gatsBioFix: 'Unified LIMS + ELN + AI literature engine with SHA-256 inventor timestamps.',
    benefits: [
      'Shorten target validation and screening turnaround by up to 60%',
      'Protect IP with immutable digital timestamps and inventor contribution logs',
      'Streamline IND filing packages with dual-key FDA 21 CFR Part 11 e-signatures',
      'Centralize multi-omics data across discovery, in vitro, and in vivo phases',
    ],
    recommendedModules: [
      'LIMS Sample Registry',
      'Versioned Cloud ELN',
      'Biological Data Lake',
      'AI Literature RAG',
    ],
    complianceTags: ['FDA 21 CFR Part 11', 'GLP / GMP Ready', 'SOC 2 Type II'],
  },
  {
    id: 'academia',
    name: 'Academic Research Institutes',
    shortName: 'Academia',
    badge: 'Universities & Core Labs',
    accentColor: '#0F766E',
    bgTint: '#F0FDFA',
    borderColor: '#99F6E4',
    imageUrl: '/images/solution-academic.jpg',
    headline: 'Preserve Institutional Knowledge & Multi-Lab Grant Budgets',
    desc: 'University labs and medical research centers balance rotating graduate cohorts, multiple NIH/NSF grant codes, and shared core facilities. GatsBio provides permanent protocol libraries, reagent burn tracking, and ORCID/DOI citation workflows.',
    roiMetric: '0% Loss',
    roiLabel: 'Institutional protocol retention',
    legacyPain: 'Protocols lost when postdocs graduate and fragmented grant budget spreadsheets.',
    gatsBioFix: 'Versioned SOP repositories tied to grant cost centers and ORCID credentials.',
    benefits: [
      'Prevent loss of protocols and historical insights when researchers rotate out',
      'Track grant burn rates linked directly to reagent orders and instrument hours',
      'Facilitate inter-departmental and multi-university consortium workspaces',
      'Federated academic SSO (ORCID, InCommon / eduGAIN) with zero-friction onboarding',
    ],
    recommendedModules: [
      'Protocol & SOP Library',
      'Grant Budget Tracker',
      'Equipment Reservation',
      'IP & DOI Workspace',
    ],
    complianceTags: ['NIH / NSF Audit Ready', 'ORCID & InCommon SSO', 'FAIR Data'],
  },
  {
    id: 'cro',
    name: 'Contract Research (CROs)',
    shortName: 'CROs',
    badge: 'Multi-Sponsor Testing',
    accentColor: '#7E22CE',
    bgTint: '#FAF5FF',
    borderColor: '#E9D5FF',
    imageUrl: '/images/solution-cro.jpg',
    headline: 'Multi-Sponsor Data Isolation & High-Throughput Turnaround',
    desc: 'Contract research organizations manage parallel assay studies for dozens of pharmaceutical sponsors. GatsBio enforces strict multi-tenant sandbox isolation, automated Certificate of Analysis (CoA) generation, and client-ready QA portals.',
    roiMetric: '4x Faster',
    roiLabel: 'Client CoA report delivery',
    legacyPain: 'Risk of cross-sponsor file mix-ups and weeks spent formatting manual PDF reports.',
    gatsBioFix: 'Tenant-isolated sponsor workspaces with one-click signed CoA PDF exports.',
    benefits: [
      'Strict RBAC/ABAC sponsor sandboxes ensuring zero cross-client data leakage',
      'Automated batch summary and Certificate of Analysis (CoA) PDF generation',
      'High-density 384-well microplate visualizer with Tecan & Hamilton export',
      'Read-only sponsor QA portal with verifiable chain-of-custody audit logs',
    ],
    recommendedModules: [
      'Multi-Tenant Sponsor Portals',
      '384-Well Assay Engine',
      'Automated CoA Builder',
      '21 CFR Part 11 Audit Trail',
    ],
    complianceTags: ['Multi-Tenant Isolation', 'ISO 17025', '21 CFR Part 11'],
  },
  {
    id: 'diagnostics',
    name: 'Clinical Diagnostics',
    shortName: 'Diagnostics',
    badge: 'CLIA / CAP High-Volume',
    accentColor: '#0284C7',
    bgTint: '#F0F9FF',
    borderColor: '#BAE6FD',
    imageUrl: '/images/solution-diagnostics.jpg',
    headline: 'Zero-Error Specimen Accessioning & CLIA/CAP Compliance',
    desc: 'Clinical diagnostics laboratories processing thousands of patient blood, biopsy, and molecular assays daily require sub-second accuracy. GatsBio unites 2D barcode accessioning, automated liquid handler worklists, and HIPAA-compliant audit logs.',
    roiMetric: '1.4M+ Vials',
    roiLabel: 'Tracked with zero lost samples',
    legacyPain: 'Manual accessioning bottlenecks, label mismatches, and fragmented LIS exports.',
    gatsBioFix: 'Sub-second 2D DataMatrix barcode scanning with HIPAA BAA & LIS telemetry.',
    benefits: [
      'Sub-second barcode scan response for handheld and benchtop lab scanners',
      'Automated thermal aliquot label printing (Zebra ZPL / Brady) with verification',
      'HIPAA Business Associate Agreement (BAA) with AES-256 & BYOK encryption',
      'Bi-directional HL7 / REST interface with hospital LIS and sequencers',
    ],
    recommendedModules: [
      'Barcode Accessioning',
      'Cryo Freezer Hierarchy',
      'Instrument IoT Telemetry',
      'HIPAA & CAP Vault',
    ],
    complianceTags: ['HIPAA BAA', 'CLIA / CAP Ready', 'ISO 17025'],
  },
];

export const ROLE_SOLUTIONS: RoleSolution[] = [
  {
    id: 'pi',
    roleTitle: 'Principal Investigators (PIs)',
    shortLabel: 'Principal Investigators',
    subtitle: 'Ensure experimental reproducibility, safeguard IP, and accelerate publications.',
    accentColor: '#1E40AF',
    primaryMetric: '+25%',
    metricLabel: 'Faster research milestone velocity',
    legacyChallenge: 'Chasing status updates across lab notebooks, email threads, and siloed sequencing drives.',
    workflowSteps: [
      'Launch project charters linked to grant codes, hypotheses, and target milestones.',
      'Review live 96/384-well assay runs and multi-omics QC curves from any workstation.',
      'Query institutional ELNs + PubMed Central via AI RAG and lock IP timestamps.',
    ],
    outcomes: [
      'Zero lost protocols across postdoc and PhD cohort transitions',
      'Instant side-by-side anomaly comparison across historical runs',
    ],
    moduleTags: ['Project Lifecycle', 'Versioned ELN', 'AI RAG Assistant', 'IP Registry'],
  },
  {
    id: 'lab-ops',
    roleTitle: 'Lab Operations Directors',
    shortLabel: 'Lab Ops Directors',
    subtitle: 'Maximize instrument uptime, eliminate reagent stockouts, and standardize SOPs.',
    accentColor: '#0F766E',
    primaryMetric: '+30%',
    metricLabel: 'Instrument utilization & uptime',
    legacyChallenge: 'Double-booked sequencers, expired calibration certs, and untracked -80°C freezer inventory.',
    workflowSteps: [
      'Manage anti-collision booking calendars across sequencers, HPLCs, and biosafety cabinets.',
      'Monitor live MQTT temperature, humidity, and CO2 alerts across cryo storage racks.',
      'Automate low-stock reagent alerts and vendor requisitions tied to project budgets.',
    ],
    outcomes: [
      '60% faster sample accessioning with Zebra/Brady 2D barcode printing',
      'Real-time visibility into reagent burn rate per department and grant',
    ],
    moduleTags: ['Equipment Scheduler', 'IoT Cryo Telemetry', 'Reagent Inventory', 'Freezer Map'],
  },
  {
    id: 'qa-officer',
    roleTitle: 'QA & Compliance Officers',
    shortLabel: 'QA & Compliance',
    subtitle: 'Enforce GxP readiness with tamper-evident audit chains and instant inspection packs.',
    accentColor: '#10B981',
    primaryMetric: '99.98%',
    metricLabel: 'Continuous audit readiness score',
    legacyChallenge: 'Manual binder audits before FDA/ISO inspections and unverifiable spreadsheet edits.',
    workflowSteps: [
      'Enforce mandatory dual-key FDA 21 CFR Part 11 electronic signatures with sign-off reason codes.',
      'Inspect cryptographic SHA-256 Merkle audit trails capturing every sample and protocol edit.',
      'Trigger CAPA deviation workflows automatically when an instrument drifts out of tolerance.',
    ],
    outcomes: [
      'One-click FDA, GLP/GMP, and ISO 17025 validation evidence packages',
      'Strict ABAC/RBAC access separation across clinical and sponsor tenants',
    ],
    moduleTags: ['21 CFR Part 11 Vault', 'CAPA Workflows', 'SHA-256 Audit Logs', 'SOP Control'],
  },
  {
    id: 'clinical-coord',
    roleTitle: 'Clinical Research Coordinators',
    shortLabel: 'Clinical Coordinators',
    subtitle: 'Orchestrate Phase I–IV cohorts, e-Consent vaults, and blinded biospecimen flows.',
    accentColor: '#7E22CE',
    primaryMetric: '100%',
    metricLabel: 'Blinded chain-of-custody trace',
    legacyChallenge: 'Manual participant visit trackers disconnected from downstream biobank sample vials.',
    workflowSteps: [
      'Configure multi-arm trial protocols with inclusion/exclusion filters and randomization.',
      'Capture versioned e-Consent and link de-identified subject IDs to barcoded blood/tissue vials.',
      'Log MedDRA-coded adverse events and export regulatory packages for IRB review.',
    ],
    outcomes: [
      'End-to-end sample lineage from patient draw to genomic sequencing output',
      'Automated visit window alerts and HIPAA-compliant participant de-identification',
    ],
    moduleTags: ['GCP Cohort Engine', 'e-Consent Vault', 'Blinded LIMS Link', 'MedDRA Adverse Events'],
  },
];

export const SECTOR_COMPLIANCE_MATRIX: SectorComplianceRow[] = [
  {
    sectorId: 'biopharma',
    sectorName: 'Biopharma & Therapeutics',
    accentColor: '#1E40AF',
    standards: ['FDA 21 CFR Part 11', 'GLP / GMP', 'SOC 2 Type II'],
    deploymentModel: 'Dedicated Single-Tenant VPC',
    isolationLevel: 'BYOK KMS + IP Timestamp Lock',
    onboardingTime: '2–3 Weeks (GxP IQ/OQ)',
  },
  {
    sectorId: 'academia',
    sectorName: 'Academic Research Labs',
    accentColor: '#0F766E',
    standards: ['NIH / NSF Data Policy', 'FAIR Metadata', 'ORCID / InCommon'],
    deploymentModel: 'Multi-Tenant Academic Cloud',
    isolationLevel: 'PI Lab & Consortium RBAC',
    onboardingTime: '3–5 Days (Self-Serve SSO)',
  },
  {
    sectorId: 'cro',
    sectorName: 'Contract Research (CROs)',
    accentColor: '#7E22CE',
    standards: ['ISO 17025', 'FDA 21 CFR Part 11', 'GDPR'],
    deploymentModel: 'Multi-Sponsor Isolated Cloud',
    isolationLevel: 'Zero-Cross-Tenant Sponsor Vaults',
    onboardingTime: '1–2 Weeks (CoA Templates)',
  },
  {
    sectorId: 'diagnostics',
    sectorName: 'Clinical Diagnostics',
    accentColor: '#0284C7',
    standards: ['HIPAA BAA', 'CLIA / CAP', 'ISO 17025'],
    deploymentModel: 'VPC or Hybrid On-Premises',
    isolationLevel: 'PHI De-Identification + HL7 TLS',
    onboardingTime: '2–3 Weeks (LIS & Scanner Sync)',
  },
];

export const ONBOARDING_PHASES: OnboardingPhase[] = [
  {
    step: '01',
    timeframe: 'Week 1',
    title: 'Schema, Freezer & Barcode Mapping',
    desc: 'Import existing CSV/JSON specimen registries, map cryo freezer hierarchies, and pair Zebra/Brady label printers & Tecan/Hamilton drivers.',
  },
  {
    step: '02',
    timeframe: 'Week 2',
    title: 'SOP Migration & RBAC Calibration',
    desc: 'Convert legacy Word/Benchling protocols into versioned ELN templates and configure sector-specific sponsor sandboxes or grant codes.',
  },
  {
    step: '03',
    timeframe: 'Week 3',
    title: 'GxP Validation & Lab Go-Live',
    desc: 'Execute automated IQ/OQ validation checks, activate 21 CFR Part 11 e-signatures, and onboard bench scientists in under 45 minutes.',
  },
];
