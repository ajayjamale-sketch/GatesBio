export type ResourceCategoryId =
  | 'all'
  | 'whitepapers'
  | 'templates'
  | 'validation'
  | 'case-studies';

export interface ResourceItem {
  id: string;
  category: Exclude<ResourceCategoryId, 'all'>;
  categoryLabel: string;
  format: string;
  readTime: string;
  title: string;
  summary: string;
  highlights: string[];
  accentColor: string;
  bgTint: string;
  targetRoute?: 'compliance' | 'tools' | 'pricing';
}

export interface ResourceQuickJump {
  id: string;
  title: string;
  subtitle: string;
  targetSection: string;
  categoryFilter?: ResourceCategoryId;
  accentColor: string;
}

export interface WebinarSession {
  id: string;
  status: 'On-Demand' | 'Live Workshop';
  duration: string;
  title: string;
  speaker: string;
  summary: string;
  tags: string[];
}

export interface DeveloperSpec {
  id: string;
  badge: string;
  title: string;
  desc: string;
}

export const RESOURCE_QUICK_JUMPS: ResourceQuickJump[] = [
  {
    id: 'whitepapers',
    title: 'Whitepapers & Guides',
    subtitle: '21 CFR Part 11 & GAMP 5 blueprints',
    targetSection: 'resources-library',
    categoryFilter: 'whitepapers',
    accentColor: '#1E40AF',
  },
  {
    id: 'templates',
    title: 'SOP & ELN Templates',
    subtitle: 'PCR, NGS, ELISA & plate protocols',
    targetSection: 'resources-library',
    categoryFilter: 'templates',
    accentColor: '#0F766E',
  },
  {
    id: 'calculators',
    title: 'Lab Calculators',
    subtitle: 'Serial dilution & primer Tm suite',
    targetSection: 'resources-calculators',
    accentColor: '#7E22CE',
  },
  {
    id: 'webinars',
    title: 'Webinars & API Docs',
    subtitle: 'Tecan/Hamilton & HL7 schemas',
    targetSection: 'resources-webinars',
    accentColor: '#0284C7',
  },
];

export const FEATURED_RESOURCE: ResourceItem = {
  id: 'part11-gamp5-blueprint',
  category: 'validation',
  categoryLabel: 'Regulatory Blueprint',
  format: 'PDF Whitepaper · 34 Pages',
  readTime: '12 min read',
  title: 'FDA 21 CFR Part 11 & GAMP 5 Computerized Validation Guide',
  summary:
    'A complete technical architecture handbook for QA Officers and Lab Directors detailing dual-key cryptographic e-signatures, SHA-256 Merkle audit chains, and automated IQ/OQ validation scripts.',
  highlights: [
    'Ready-to-use IQ/OQ/PQ validation matrix for GxP lab deployments',
    'Dual-credential sign-off & session timeout policy templates',
    'Audit-trail inspection checklist for FDA, ISO 17025, and CLIA/CAP',
  ],
  accentColor: '#1E40AF',
  bgTint: '#EFF6FF',
  targetRoute: 'compliance',
};

export const RESOURCE_ITEMS: ResourceItem[] = [
  {
    id: 'lims-migration-checklist',
    category: 'whitepapers',
    categoryLabel: 'Architecture Guide',
    format: 'PDF Playbook · 18 Pages',
    readTime: '8 min read',
    title: 'Zero-Downtime Migration from Excel & Legacy ELNs',
    summary:
      'Step-by-step schema mapping guide for migrating 100k+ freezer vials, 96-well plate maps, and unstructured protocol Word docs into GatsBio.',
    highlights: [
      'CSV/JSON bulk accessioning schema template',
      'Cryo rack & box coordinate normalization guide',
    ],
    accentColor: '#1E40AF',
    bgTint: '#EFF6FF',
  },
  {
    id: 'ngs-sop-template',
    category: 'templates',
    categoryLabel: 'ELN SOP Template',
    format: 'Interactive Protocol Pack',
    readTime: 'Ready to Deploy',
    title: 'High-Throughput NGS Library Prep & 384-Well QC SOP',
    summary:
      'Version-controlled electronic protocol template featuring automated master-mix volume scaling, barcode checkpoints, and FASTQ lineage tagging.',
    highlights: [
      'Direct Tecan Fluent & Hamilton STAR worklist export',
      'Embedded concentration QC acceptance thresholds',
    ],
    accentColor: '#0F766E',
    bgTint: '#F0FDFA',
  },
  {
    id: 'cro-sponsor-isolation',
    category: 'case-studies',
    categoryLabel: 'CRO Benchmark Study',
    format: 'Case Study · 4x Turnaround',
    readTime: '6 min read',
    title: 'How Multi-Sponsor CROs Cut CoA Delivery from 5 Days to 4 Hours',
    summary:
      'Operational audit of how contract testing teams isolate sponsor workspaces while automating Certificate of Analysis PDF exports.',
    highlights: [
      'Zero cross-tenant data exposure across 28 concurrent sponsors',
      'Automated QA sign-off and client portal delivery',
    ],
    accentColor: '#7E22CE',
    bgTint: '#FAF5FF',
  },
  {
    id: 'cryo-telemetry-validation',
    category: 'validation',
    categoryLabel: 'IoT & Calibration Kit',
    format: 'ISO 17025 Checklist',
    readTime: '7 min read',
    title: 'Continuous -80°C Cryo Monitoring & Calibration Drift SOP',
    summary:
      'Standardized validation framework for streaming MQTT freezer sensor telemetry into immutable deviation and CAPA logs.',
    highlights: [
      'NIST-traceable probe calibration schedule template',
      'SMS/Email excursion escalation matrix',
    ],
    accentColor: '#0284C7',
    bgTint: '#F0F9FF',
    targetRoute: 'compliance',
  },
  {
    id: 'elisa-serial-dilution-sop',
    category: 'templates',
    categoryLabel: 'Assay Template',
    format: '96-Well Plate Blueprint',
    readTime: 'Ready to Deploy',
    title: 'ELISA & Serial Dilution Standard Curve Protocol',
    summary:
      'Pre-built 96-well plate layout with positive/negative control zoning, automated dilution factor math, and spectrophotometer import.',
    highlights: [
      'Duplicate/triplicate standard curve well mapping',
      'Automated OOS (Out-of-Spec) flag rules',
    ],
    accentColor: '#0F766E',
    bgTint: '#F0FDFA',
    targetRoute: 'tools',
  },
  {
    id: 'biopharma-roi-report',
    category: 'case-studies',
    categoryLabel: 'Biopharma Impact',
    format: 'Benchmark Report',
    readTime: '9 min read',
    title: 'Reclaiming 8.4 Hours Per Scientist Weekly in Preclinical R&D',
    summary:
      'Quantified time-motion study across discovery biology teams unifying sample logistics, AI literature RAG, and IND documentation.',
    highlights: [
      '60% faster sample accessioning with 2D DataMatrix labels',
      '100% IP timestamp coverage across assay iterations',
    ],
    accentColor: '#1E40AF',
    bgTint: '#EFF6FF',
    targetRoute: 'pricing',
  },
];

export const WEBINAR_SESSIONS: WebinarSession[] = [
  {
    id: 'robotics-worklist',
    status: 'On-Demand',
    duration: '42 min',
    title: 'Automating Tecan & Hamilton Liquid Handlers Directly from 384-Well LIMS Plates',
    speaker: 'Dr. Elena Vance · Principal Solutions Architect',
    summary:
      'Live walkthrough showing zero-error plate mapping, barcode handshakes, and bidirectional run telemetry ingestion.',
    tags: ['Robotics API', '384-Well LIMS', 'LIMS-to-Instrument'],
  },
  {
    id: 'omics-data-lake',
    status: 'Live Workshop',
    duration: 'Thu · 11:00 AM EST',
    title: 'Designing Zero-Silo Multi-Omics Repositories (FASTQ, BAM, VCF & AnnData)',
    speaker: 'Marcus Chen · Head of Bioinformatics Engineering',
    summary:
      'Learn how to index raw sequencing artifacts with OBO Foundry ontologies and Git-like dataset versioning.',
    tags: ['Bio Data Lake', 'Versioning', 'PubMed RAG'],
  },
  {
    id: 'part11-audit-prep',
    status: 'On-Demand',
    duration: '35 min',
    title: 'Audit-Ready by Design: Passing FDA 21 CFR Part 11 & ISO 17025 Inspections',
    speaker: 'Priya Nair, MS · Director of Quality & Regulatory',
    summary:
      'Inspect live SHA-256 hash verification, dual-key e-signatures, and instant CAPA evidence package generation.',
    tags: ['21 CFR Part 11', 'GxP Validation', 'QA Workflows'],
  },
];

export const DEVELOPER_SPECS: DeveloperSpec[] = [
  {
    id: 'rest-graphql',
    badge: 'REST / GraphQL',
    title: 'Sample & Plate Telemetry API',
    desc: 'Programmatic endpoints for bulk specimen accessioning, well assignments, and assay result ingestion.',
  },
  {
    id: 'zpl-brady',
    badge: 'Zebra ZPL / Brady',
    title: 'Thermal 2D Barcode Print Spec',
    desc: 'Pre-tested label templates for cryo-resistant 2D DataMatrix and Code 128 vial tags.',
  },
  {
    id: 'hl7-mqtt',
    badge: 'HL7 / MQTT IoT',
    title: 'LIS & Cryo Sensor Streaming',
    desc: 'Bi-directional clinical LIS connectors and real-time freezer temperature webhook payloads.',
  },
];
