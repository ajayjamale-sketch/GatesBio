import type {
  AdverseEventItem,
  AiInsightItem,
  BioDatasetRecord,
  BudgetAllocation,
  CapaDeviationItem,
  ClinicalBiospecimen,
  ClinicalParticipant,
  ClinicalTeamNote,
  ClinicalTrialItem,
  CollaborationMessage,
  EquipmentBooking,
  EquipmentUtilizationMetric,
  ExperimentRun,
  IotGatewayRecord,
  LabTestTask,
  MaintenanceLogEntry,
  OrganizationRecord,
  OrgUserRecord,
  PendingSignOffItem,
  PublicationRecord,
  PurchaseRequisition,
  ResearchProjectItem,
  SampleCustodyEvent,
  SampleTestRequest,
  SopDocumentItem,
  SsoProviderRecord,
  SystemEventLog,
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
    hypothesis:
      'Dual sgRNA targeting of KRAS-G12D exon 2 combined with MEK inhibition produces >=65% synthetic lethality in pancreatic organoids.',
    charter: 'Evaluate CRISPRmax RNP knockout kinetics across 48 barcoded clones under GLP traceability.',
    teamMembers: ['Dr. Elena Vance', 'Dr. Liam Patel', 'Marcus Chen'],
    budgetAllocatedUsd: 420000,
    budgetSpentUsd: 294000,
    reagentBurnMonthlyUsd: 18500,
    instrumentHoursUsed: 142,
    milestones: [
      { id: 'M1', title: 'sgRNA Library Design & Synthesis', dueDate: '2026-09-15', startWeek: 1, durationWeeks: 3, completed: true },
      { id: 'M2', title: 'HEK293 & Organoid Transfection', dueDate: '2026-10-20', startWeek: 4, durationWeeks: 4, completed: true, dependsOn: 'M1', dependencyType: 'FS' },
      { id: 'M3', title: 'Luciferase Knockdown & QC Sign-off', dueDate: '2026-11-28', startWeek: 8, durationWeeks: 3, completed: false, dependsOn: 'M2', dependencyType: 'FS' },
      { id: 'M4', title: 'RNA-Seq & Differential Expression', dueDate: '2026-12-18', startWeek: 10, durationWeeks: 3, completed: false, dependsOn: 'M3', dependencyType: 'SS' },
    ],
  },
  {
    id: 'PRJ-2026-02',
    title: 'Single-Cell RNA-Seq Tumor Microenvironment Atlas',
    leadPi: 'Dr. Elena Vance, Ph.D.',
    grantCode: 'VGB-ONC-402',
    milestoneProgress: 92,
    status: 'In Review',
    targetDate: '2026-11-30',
    hypothesis: 'CD8+ exhausted T-cell subclusters correlate with TGF-beta stromal expression gradients.',
    charter: 'Map 120,000 single-cell transcriptomes across 18 biobanked FFPE & cryo resection biopsies.',
    teamMembers: ['Dr. Elena Vance', 'Dr. Priya Nair', 'Marcus Chen'],
    budgetAllocatedUsd: 310000,
    budgetSpentUsd: 279000,
    reagentBurnMonthlyUsd: 14200,
    instrumentHoursUsed: 98,
    milestones: [
      { id: 'M1', title: '10x Chromium GEM Capture', dueDate: '2026-08-30', startWeek: 1, durationWeeks: 3, completed: true },
      { id: 'M2', title: 'NovaSeq Alignment & Doublet QC', dueDate: '2026-10-05', startWeek: 4, durationWeeks: 4, completed: true, dependsOn: 'M1', dependencyType: 'FS' },
      { id: 'M3', title: 'PCA / UMAP Cluster Annotation', dueDate: '2026-11-18', startWeek: 8, durationWeeks: 3, completed: true, dependsOn: 'M2', dependencyType: 'FS' },
      { id: 'M4', title: 'Manuscript Figures & Peer Sign-off', dueDate: '2026-11-30', startWeek: 11, durationWeeks: 2, completed: false, dependsOn: 'M3', dependencyType: 'FS' },
    ],
  },
  {
    id: 'PRJ-2026-03',
    title: 'Bispecific Antibody Affinity Maturation Assay',
    leadPi: 'Dr. Liam Patel',
    grantCode: 'VGB-BIO-118',
    milestoneProgress: 54,
    status: 'Active',
    targetDate: '2027-01-22',
    hypothesis: 'CDR-H3 point mutagenesis improves KD affinity below 0.8 nM without inducing aggregation.',
    charter: 'Screen 32 affinity variants via ELISA dose-response and SPR binding kinetics.',
    teamMembers: ['Dr. Liam Patel', 'Dr. Elena Vance'],
    budgetAllocatedUsd: 265000,
    budgetSpentUsd: 138000,
    reagentBurnMonthlyUsd: 11000,
    instrumentHoursUsed: 64,
    milestones: [
      { id: 'M1', title: 'Variant Plasmid Cloning', dueDate: '2026-10-12', startWeek: 1, durationWeeks: 4, completed: true },
      { id: 'M2', title: 'ELISA Serial Dilution Curves', dueDate: '2026-12-02', startWeek: 5, durationWeeks: 4, completed: false, dependsOn: 'M1', dependencyType: 'FS' },
      { id: 'M3', title: 'SPR Biacore Validation', dueDate: '2027-01-22', startWeek: 9, durationWeeks: 4, completed: false, dependsOn: 'M2', dependencyType: 'FS' },
    ],
  },
  {
    id: 'PRJ-2026-04',
    title: 'Lipid Nanoparticle Stability & Cryo-Formulation',
    leadPi: 'Dr. Elena Vance, Ph.D.',
    grantCode: 'NSF-BIO-7741',
    milestoneProgress: 100,
    status: 'Completed',
    targetDate: '2026-10-28',
    hypothesis: 'Trehalose 8% cryoprotectant preserves >94% mRNA encapsulation after 6 freeze-thaw cycles.',
    charter: 'Complete stability profiling for USPTO provisional filing #63/991,204.',
    teamMembers: ['Dr. Elena Vance', 'Sarah Jenkins'],
    budgetAllocatedUsd: 190000,
    budgetSpentUsd: 184500,
    reagentBurnMonthlyUsd: 6400,
    instrumentHoursUsed: 81,
    milestones: [
      { id: 'M1', title: 'Microfluidic LNP Mixing', dueDate: '2026-08-14', startWeek: 1, durationWeeks: 3, completed: true },
      { id: 'M2', title: 'DLS & RiboGreen Encapsulation QC', dueDate: '2026-09-25', startWeek: 4, durationWeeks: 4, completed: true, dependsOn: 'M1', dependencyType: 'FS' },
      { id: 'M3', title: 'USPTO Provisional Data Package', dueDate: '2026-10-28', startWeek: 8, durationWeeks: 3, completed: true, dependsOn: 'M2', dependencyType: 'FS' },
    ],
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
    sopVersion: 'v3.2',
    plateId: 'PLT-09',
    linkedSampleIds: ['SMP-2026-9041', 'SMP-2026-9042'],
    observationNotes:
      'Triplicate luciferase luminescence ratios show **68% knockdown efficiency** in KRAS-G12D cohort. Wells C3–F10 equilibrated cleanly; recommending 100 nM trametinib positive control.',
    latexFormula: 'IC_{50} = [I]_{0.5} = 42.8\\,\\text{nM} \\quad (R^2 = 0.992,\\; n = 3)',
    smilesNotation: 'CC1=C(C(=O)N(C2=C1C(=O)N(C(=O)N2C3CC3)C4=CC=C(C=C4F)I)C)NC5=CC(=C(C=C5)I)F',
    pdbTargetId: 'PDB: 6OIM (KRAS G12C/D Switch-II Pocket)',
    steps: [
      {
        id: 'step-1',
        label: 'Equilibrate HEK293-Cas9-KO aliquots to 37.0 °C water bath (12 min)',
        targetNote: 'Target: 37.0 °C ± 0.5 °C',
        completed: true,
        stampedBy: '09:12 UTC',
      },
      {
        id: 'step-2',
        label: 'Dispense 50.0 µL Lipofectamine CRISPRMAX complex across wells C3–F10',
        targetNote: 'Plate #PLT-09 · 96-well',
        completed: true,
        stampedBy: '09:28 UTC',
      },
      {
        id: 'step-3',
        label: 'Incubate at 5.0% CO2, 37.0 °C for 48 hours prior to luciferase readout',
        targetNote: 'Incubator INC-04',
        completed: false,
      },
      {
        id: 'step-4',
        label: 'Capture luminescence curve and execute 21 CFR Part 11 protocol sign-off',
        targetNote: 'Required for milestone M3',
        completed: false,
      },
    ],
    attachments: [
      { id: 'ATT-1', name: 'PLT-09_Luminescence_Readout.csv', fileType: 'Plate CSV', size: '412 KB', uploadedAt: '09:35 UTC' },
      { id: 'ATT-2', name: 'CRISPR_Exon3_Gel_Verify.tiff', fileType: 'Gel Image', size: '3.8 MB', uploadedAt: '09:19 UTC' },
    ],
    auditTrail: [
      { id: 'AUD-1', timestamp: '2026-11-11 09:12 UTC', actor: 'Dr. Elena Vance', action: 'CREATE', summary: 'Initialized EXP-104 from SOP-ELN-042 v3.2', hash: 'sha256:9f84b2c1e0...' },
      { id: 'AUD-2', timestamp: '2026-11-11 09:28 UTC', actor: 'Dr. Elena Vance', action: 'UPDATE', summary: 'Completed Step 2 aliquot dispense on Plate PLT-09', hash: 'sha256:4a17d8c3b9...' },
    ],
  },
  {
    id: 'EXP-105',
    projectId: 'PRJ-2026-02',
    protocolName: 'SOP-NGS-019 · 10x Genomics scRNA Library Prep',
    stage: 'Completed',
    sampleCount: 24,
    updatedAt: 'Yesterday, 17:15 UTC',
    sopVersion: 'v2.4',
    plateId: 'PLT-12',
    linkedSampleIds: ['SMP-2026-9043'],
    observationNotes:
      'Qubit dsDNA yield averaged 24.6 ng/µL across 24 indexed libraries; fragment analyzer peak centered at 468 bp.',
    latexFormula: 'C_{\\text{lib}} = \\frac{\\text{ng}/\\mu\\text{L} \\times 10^6}{660 \\times 468\\,\\text{bp}} = 79.6\\,\\text{nM}',
    smilesNotation: 'C1=NC2=C(N1)C(=NC=N2)N',
    pdbTargetId: 'PDB: 7K3N (TGF-beta Receptor I Kinase)',
    steps: [
      { id: 's105-1', label: 'Validate single-cell suspension viability > 90% on Countess 3', targetNote: 'Target >= 90%', completed: true, stampedBy: '14:05 UTC' },
      { id: 's105-2', label: 'Perform Chromium Next GEM reverse transcription & cDNA amplification', targetNote: '12 PCR cycles', completed: true, stampedBy: '16:10 UTC' },
      { id: 's105-3', label: 'QC pooled libraries on TapeStation 4200 & upload FASTQ metadata', targetNote: 'Q30 >= 90%', completed: true, stampedBy: '17:15 UTC' },
    ],
    attachments: [
      { id: 'ATT-3', name: 'TapeStation_Library_Trace.pdf', fileType: 'Spectra PDF', size: '1.2 MB', uploadedAt: 'Yesterday' },
    ],
    auditTrail: [
      { id: 'AUD-3', timestamp: '2026-11-10 17:15 UTC', actor: 'Dr. Elena Vance', action: 'SIGN', summary: 'Sealed scRNA library prep run EXP-105', hash: 'sha256:c10e77a4f2...' },
    ],
  },
  {
    id: 'EXP-106',
    projectId: 'PRJ-2026-03',
    protocolName: 'SOP-ELN-088 · ELISA Dose-Response Serial Dilution',
    stage: 'Draft',
    sampleCount: 32,
    updatedAt: '2 days ago',
    sopVersion: 'v1.9',
    plateId: 'PLT-15',
    linkedSampleIds: ['SMP-2026-9044'],
    observationNotes:
      'Drafting 8-point 1:3 serial dilution from 10 mM stock down to 50 nM across triplicate columns.',
    latexFormula: 'C_1 V_1 = C_2 V_2 \\implies V_1 = \\frac{50\\,\\text{nM} \\times 200\\,\\mu\\text{L}}{10\\,\\text{mM}}',
    smilesNotation: 'CC(=O)NC1=CC=C(C=C1)O',
    pdbTargetId: 'PDB: 8G9P (Bispecific Fab-Fc Complex)',
    steps: [
      { id: 's106-1', label: 'Coat 96-well high-bind plate with 2.0 µg/mL capture antigen overnight', targetNote: '4.0 °C', completed: false },
      { id: 's106-2', label: 'Execute 8-point serial dilution in blocking buffer (triplicate)', targetNote: '10 mM -> 50 nM', completed: false },
      { id: 's106-3', label: 'Read absorbance at 450 nm and fit 4PL EC50 curve', targetNote: 'SpectraMax iD5', completed: false },
    ],
    attachments: [],
    auditTrail: [
      { id: 'AUD-4', timestamp: '2026-11-09 11:00 UTC', actor: 'Dr. Liam Patel', action: 'CREATE', summary: 'Created draft protocol EXP-106 from SOP-ELN-088 v1.9', hash: 'sha256:7b21f09a8e...' },
    ],
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
    doi: 'https://doi.org/10.1038/s41586-026-04120-9',
    sourcePlatform: 'PubMed Central',
    relevanceScore: 96,
    targetLigandNote: 'KRAS-G12D / Trametinib allosteric MEK1/2 synergy (KD = 1.4 nM)',
  },
  {
    id: 'AI-02',
    category: 'Hypothesis',
    title: 'Unexplored Phospho-ERK Feedback Loop in Cohort B',
    summary:
      'Clustering anomalies in Run EXP-104 indicate secondary resistance markers emerging above 250 nM concentration.',
    sourceRef: 'GatsBio Anomaly Engine · Run EXP-104',
    doi: 'https://doi.org/10.1101/2026.09.14.612904',
    sourcePlatform: 'bioRxiv',
    relevanceScore: 91,
    targetLigandNote: 'DUSP6 / MAPK phosphatase reactivation loop',
  },
  {
    id: 'AI-03',
    category: 'Gap Alert',
    title: 'Missing Negative Control Replicates in Plate #PLT-09',
    summary:
      'Automated QC pre-check recommends adding 2 additional DMSO vehicle wells before NovaSeq submission.',
    sourceRef: 'ELN Protocol Advisor · SOP-ELN-042',
    sourcePlatform: 'Internal ELN',
    relevanceScore: 89,
  },
  {
    id: 'AI-04',
    category: 'Drug Target',
    title: 'USPTO Patent Window & Off-Target Kinome Alert (MRTX1133 Analog)',
    summary:
      'Cross-referencing USPTO filings highlights clear freedom-to-operate on C4-substituted quinazoline scaffolds; monitor hERG IC50 > 10 µM.',
    sourceRef: 'IEEE Life Sciences + Patent RAG',
    doi: 'https://doi.org/10.1021/acs.jmedchem.6c00412',
    sourcePlatform: 'IEEE Life Sciences',
    relevanceScore: 88,
    targetLigandNote: 'Switch-II pocket covalent/non-covalent selectivity index: 340x',
    patentAlert: 'Related composition patent expires Q4 2028 (WO2022/187412)',
  },
];

export const PUBLICATION_RECORDS: PublicationRecord[] = [
  {
    id: 'PUB-01',
    title: 'High-Throughput CRISPR Perturbation Mapping in Solid Tumors',
    journalOrPatent: 'Nature Biotechnology (Manuscript)',
    status: 'Peer Review',
    owners: 'E. Vance, M. Chen, L. Patel',
    type: 'Manuscript',
    doi: '10.1038/s41587-026-02188-4',
    citations: 18,
    altmetricScore: 142,
  },
  {
    id: 'PUB-02',
    title: 'Modified LNP Formulation for Cold-Chain mRNA Stability',
    journalOrPatent: 'USPTO Provisional #63/991,204',
    status: 'Patent Filed',
    owners: 'E. Vance, S. Jenkins',
    type: 'Patent',
    inventorSplits: 'E. Vance (65%), S. Jenkins (35%)',
    filingDeadline: '2027-04-12 (PCT Conversion)',
    patentOffice: 'USPTO',
    priorArtNotes: 'Distinguished over US2023/014421A1 via 8% trehalose cryo-excipient ratio.',
  },
  {
    id: 'PUB-03',
    title: 'Automated 384-Well Cytotoxicity Normalization Pipeline',
    journalOrPatent: 'Journal of Biomolecular Screening',
    status: 'Drafting',
    owners: 'E. Vance, D. Ross',
    type: 'Manuscript',
    doi: 'Pending DOI Assignment',
    citations: 0,
    altmetricScore: 12,
  },
];

export const INITIAL_BIO_DATASETS: BioDatasetRecord[] = [
  {
    id: 'DS-901',
    name: 'CRISPR_KRAS_Screen_R1.fastq.gz',
    format: 'FASTQ',
    version: 'v1.4.0',
    size: '18.4 GB',
    qc: 'Pass',
    ontologyTags: ['NCBITaxon:9606 (Homo sapiens)', 'GO:0007265 (Ras signaling)', 'OBO:OBI_0000711'],
    sequencePreview: '5\'-ATGGACTGAATATAAACTTGTGGTAGTTGGAGCTGATGGCGTAGGCAAGAGTGCCTTGACGATACAGCTAATTCAG-3\'',
    restrictionSites: ['EcoRI (pos 14)', 'BamHI (pos 41)', 'NotI (pos 63)'],
    versions: [
      { version: 'v1.4.0', date: '2026-11-10', author: 'Dr. Elena Vance', diffSummary: 'Trimmed adapter dimers; Q30 improved from 91.2% to 94.8%' },
      { version: 'v1.3.0', date: '2026-11-04', author: 'Marcus Chen', diffSummary: 'Merged Lane 1 & Lane 2 demultiplexed FASTQ reads' },
    ],
  },
  {
    id: 'DS-902',
    name: 'Tumor_Atlas_scRNA_Aligned.bam',
    format: 'AnnData',
    version: 'v2.1.0',
    size: '42.1 GB',
    qc: 'Pass',
    ontologyTags: ['MeSH:D009369 (Neoplasms)', 'CL:0000625 (CD8+ T cell)', 'GO:0006955'],
    sequencePreview: '5\'-GCGATCGATCGATGGCCCTGACCAGCTTCAAGGAGGTCCTGAAGAACTACTTCCTGGAGGACGAGGTGTGA-3\'',
    restrictionSites: ['HindIII (pos 22)', 'XhoI (pos 54)'],
    versions: [
      { version: 'v2.1.0', date: '2026-11-09', author: 'Dr. Elena Vance', diffSummary: 'Filtered mitochondrial reads > 12% and annotated 14 Leiden clusters' },
      { version: 'v2.0.0', date: '2026-10-29', author: 'Dr. Priya Nair', diffSummary: 'GRCh38 STARsolo initial alignment (120,412 cells)' },
    ],
  },
  {
    id: 'DS-903',
    name: 'Variant_Call_CohortB.vcf',
    format: 'VCF',
    version: 'v1.0.2',
    size: '1.9 GB',
    qc: 'In Review',
    ontologyTags: ['SO:0001583 (missense_variant)', 'NCBITaxon:9606', 'MeSH:D010190'],
    sequencePreview: '5\'-CTGTGGTAGTTGGAGCTGGTGGCGTAGGCAAGAGTGCCTTGACGATACAGCTAATTCAGAATCATTTTGTGGAC-3\'',
    restrictionSites: ['BstXI (pos 19)', 'SalI (pos 49)'],
    versions: [
      { version: 'v1.0.2', date: '2026-11-08', author: 'Dr. Liam Patel', diffSummary: 'Added Mutect2 somatic filter flags for low-VAF alleles (< 0.05)' },
    ],
  },
  {
    id: 'DS-904',
    name: 'Organoid_Confocal_KRAS_ZStack.tiff',
    format: 'TIFF',
    version: 'v1.1.0',
    size: '6.7 GB',
    qc: 'Pass',
    ontologyTags: ['FBbi:00000251 (confocal microscopy)', 'GO:0005737 (cytoplasm)'],
    versions: [
      { version: 'v1.1.0', date: '2026-11-06', author: 'Marcus Chen', diffSummary: 'Deconvolved 488 nm / 594 nm channels and calibrated micron scale bar' },
    ],
  },
];

export const INITIAL_SAMPLE_TEST_REQUESTS: SampleTestRequest[] = [
  {
    id: 'REQ-401',
    experimentId: 'EXP-104',
    sampleId: 'SMP-2026-9041',
    sampleName: 'HEK293-Cas9-KO Cell Line (P4)',
    assayType: 'RT-qPCR Triplicate Panel',
    aliquotUl: 50,
    priority: 'STAT',
    status: 'In Lab',
    requestedAt: 'Today, 08:50 UTC',
  },
  {
    id: 'REQ-402',
    experimentId: 'EXP-105',
    sampleId: 'SMP-2026-9043',
    sampleName: 'PBMC Donor #442 Cryo Vial',
    assayType: '10x Genomics scRNA Sequencing',
    aliquotUl: 100,
    priority: 'Standard',
    status: 'Completed',
    requestedAt: 'Yesterday, 13:20 UTC',
  },
];

export const INITIAL_COLLABORATION_MESSAGES: CollaborationMessage[] = [
  {
    id: 'MSG-1',
    channel: '#kras-crispr-screen',
    author: 'Dr. Liam Patel',
    role: 'Senior Scientist',
    time: '24m ago',
    text: 'Confirmed gRNA off-target score < 0.02 across Exon 3. Ready to lock Plate #PLT-09 controls.',
    attachmentBadge: 'SOP-ELN-042 · Plate PLT-09',
    reactions: [
      { emoji: '🧬', count: 3 },
      { emoji: '✅', count: 2 },
    ],
    replies: [
      {
        id: 'REP-1',
        author: 'Dr. Elena Vance, Ph.D.',
        time: '12m ago',
        text: 'Logged 2 extra DMSO vehicle wells per AI QC check. Signing off Run EXP-104 after incubation.',
      },
    ],
  },
  {
    id: 'MSG-2',
    channel: '#cross-lab-handoffs',
    author: 'Marcus Chen',
    role: 'Laboratory Technician',
    time: '1h ago',
    text: 'Samples SMP-2026-9041 and SMP-2026-9042 plated and verified on Qubit 4 (RIN 9.4).',
    attachmentBadge: 'REQ-401 · Qubit QC Pass',
    reactions: [{ emoji: '🔬', count: 4 }],
    replies: [],
  },
  {
    id: 'MSG-3',
    channel: '#scrna-tumor-atlas',
    author: 'Dr. Priya Nair',
    role: 'Clinical Coordinator',
    time: '3h ago',
    text: 'Cohort B de-identified biopsy manifests matched to DS-902 AnnData cluster labels.',
    attachmentBadge: 'DS-902 v2.1.0',
    reactions: [{ emoji: '📊', count: 2 }],
    replies: [],
  },
];

export const SCIENTIST_VOLCANO_DATA = [
  { gene: 'KRAS', log2Fc: -3.2, negLog10P: 6.4, significant: true },
  { gene: 'DUSP6', log2Fc: -2.4, negLog10P: 5.1, significant: true },
  { gene: 'MYC', log2Fc: -1.9, negLog10P: 4.3, significant: true },
  { gene: 'CCND1', log2Fc: -1.5, negLog10P: 3.1, significant: true },
  { gene: 'GAPDH', log2Fc: 0.1, negLog10P: 0.4, significant: false },
  { gene: 'ACTB', log2Fc: -0.2, negLog10P: 0.6, significant: false },
  { gene: 'TP53', log2Fc: 1.4, negLog10P: 2.8, significant: true },
  { gene: 'CDKN1A', log2Fc: 2.3, negLog10P: 4.9, significant: true },
  { gene: 'BAX', log2Fc: 2.8, negLog10P: 5.7, significant: true },
  { gene: 'BCL2', log2Fc: -0.9, negLog10P: 1.2, significant: false },
  { gene: 'EGFR', log2Fc: 0.6, negLog10P: 0.9, significant: false },
  { gene: 'STAT3', log2Fc: -0.4, negLog10P: 1.1, significant: false },
];

export const SCIENTIST_PCA_DATA = [
  { pc1: -4.1, pc2: 1.8, cohort: 'Vehicle Control', pc1Treated: null, pc2Treated: null },
  { pc1: -3.6, pc2: 2.2, cohort: 'Vehicle Control', pc1Treated: null, pc2Treated: null },
  { pc1: -3.9, pc2: 1.4, cohort: 'Vehicle Control', pc1Treated: null, pc2Treated: null },
  { pc1: 2.8, pc2: -1.2, cohort: 'KRAS-KO + MEKi', pc1Treated: 2.8, pc2Treated: -1.2 },
  { pc1: 3.4, pc2: -1.9, cohort: 'KRAS-KO + MEKi', pc1Treated: 3.4, pc2Treated: -1.9 },
  { pc1: 3.1, pc2: -1.5, cohort: 'KRAS-KO + MEKi', pc1Treated: 3.1, pc2Treated: -1.5 },
];

export const SCIENTIST_BURNDOWN_DATA = [
  { month: 'Jul', planned: 18, completed: 16, spendK: 42 },
  { month: 'Aug', planned: 35, completed: 34, spendK: 96 },
  { month: 'Sep', planned: 54, completed: 52, spendK: 158 },
  { month: 'Oct', planned: 72, completed: 74, spendK: 224 },
  { month: 'Nov', planned: 88, completed: 86, spendK: 294 },
];

export const INITIAL_LAB_TASKS: LabTestTask[] = [
  {
    id: 'TST-901',
    sampleId: 'SMP-2026-9041',
    assayType: 'RT-qPCR Triplicate Panel',
    instrument: 'QuantStudio 7 Flex',
    priority: 'STAT',
    status: 'Running',
    assayCategory: 'PCR',
    steps: [
      { id: 't901-1', label: 'Thaw master mix on ice & verify TaqMan probe lot', tolerance: '2–8 °C', measuredValue: '4.1 °C', completed: true },
      { id: 't901-2', label: 'Load 20 µL reaction mix across Plate #PLT-09 wells', tolerance: '20 ± 0.5 µL', measuredValue: '20.0 µL', completed: true },
      { id: 't901-3', label: 'Confirm Ct amplification threshold & melt curve', tolerance: 'Ct 14–32', measuredValue: '', completed: false },
    ],
  },
  {
    id: 'TST-902',
    sampleId: 'SMP-2026-8812',
    assayType: 'WGS Library Prep (2x150bp)',
    instrument: 'Illumina NovaSeq 6000',
    priority: 'Standard',
    status: 'Queued',
    assayCategory: 'NGS',
    steps: [
      { id: 't902-1', label: 'Verify RNA/DNA integrity & Qubit concentration', tolerance: '>= 20 ng/µL', measuredValue: '', completed: false },
      { id: 't902-2', label: 'Adapter ligation & SPRI bead cleanup', tolerance: 'Peak 450 bp', measuredValue: '', completed: false },
    ],
  },
  {
    id: 'TST-903',
    sampleId: 'SMP-2026-7734',
    assayType: 'Flow Cytometry Immunophenotyping',
    instrument: 'BD FACSAria Fusion',
    priority: 'STAT',
    status: 'Queued',
    assayCategory: 'Flow Cytometry',
    steps: [
      { id: 't903-1', label: 'Run CST calibration beads prior to sample acquisition', tolerance: 'CV < 3.0%', measuredValue: '', completed: false },
      { id: 't903-2', label: 'Acquire 50,000 gated CD8+ events & export FCS', tolerance: 'Viability >= 85%', measuredValue: '', completed: false },
    ],
  },
  {
    id: 'TST-904',
    sampleId: 'SMP-2026-6520',
    assayType: 'Qubit dsDNA Fluorometric QC',
    instrument: 'Thermo Qubit 4',
    priority: 'Standard',
    status: 'Completed',
    assayCategory: 'ELISA',
    uploadedResultFile: 'Qubit4_SMP-6520_QC.csv',
    rawMetrics: { q30Pct: 95.4, rinScore: 9.2, od450: 1.84 },
    signedBy: 'Marcus Chen',
    steps: [
      { id: 't904-1', label: 'Calibrate Qubit dsDNA BR standards #1 and #2', tolerance: 'R^2 >= 0.99', measuredValue: '0.998', completed: true },
      { id: 't904-2', label: 'Record duplicate dsDNA concentration readings', tolerance: '>= 50 ng/µL', measuredValue: '340.0 ng/µL', completed: true },
    ],
  },
];

export const INITIAL_CUSTODY_EVENTS: SampleCustodyEvent[] = [
  {
    id: 'CUS-101',
    sampleId: 'SMP-2026-9041',
    timestamp: '2026-11-11 08:30 UTC',
    actor: 'Marcus Chen',
    action: 'ACCESSION',
    purpose: 'Initial CRISPR-Cas9 screen accessioning',
    volumeConsumedUl: 0,
    freezeThawAfter: 1,
    location: 'Cryo-Freezer Ultra -80°C #02 · Rack B · BX-CRISPR-04 (C3)',
  },
  {
    id: 'CUS-102',
    sampleId: 'SMP-2026-8812',
    timestamp: '2026-11-11 09:15 UTC',
    actor: 'Marcus Chen',
    action: 'CHECK_OUT',
    purpose: 'Aliquoted 6.8 µL for RT-qPCR assay TST-901',
    volumeConsumedUl: 6.8,
    freezeThawAfter: 2,
    location: 'Genomics Wet Bench #2',
  },
];

export const INITIAL_EQUIPMENT_BOOKINGS: EquipmentBooking[] = [
  {
    id: 'BKG-201',
    equipmentId: 'EQP-01',
    operator: 'Marcus Chen',
    date: '2026-11-11',
    startHour: 9,
    endHour: 12,
    priority: 'Trial / STAT',
    purpose: 'NovaSeq S4 Cohort B Run',
  },
  {
    id: 'BKG-202',
    equipmentId: 'EQP-03',
    operator: 'Dr. Elena Vance',
    date: '2026-11-11',
    startHour: 14,
    endHour: 16,
    priority: 'Standard',
    purpose: '96-Well ELISA Serial Dilution',
  },
];

export const INITIAL_MAINTENANCE_LOGS: MaintenanceLogEntry[] = [
  {
    id: 'MNT-301',
    equipmentId: 'EQP-01',
    type: 'Calibration',
    performedBy: 'Marcus Chen',
    date: '2026-11-08',
    driftNote: 'Optical flow cell alignment drift +0.02 µm (within ±0.10 µm ISO 17025 spec)',
    passed: true,
  },
  {
    id: 'MNT-302',
    equipmentId: 'EQP-03',
    type: 'Cleaning',
    performedBy: 'Marcus Chen',
    date: '2026-11-10',
    driftNote: '8-channel manifold ethanol flush & HEPA filter check',
    passed: true,
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
    blindingMode: 'Double-Blind',
    cohortArms: [
      { name: 'Blinded Cohort A (Treatment)', ratio: '1:1', enrolled: 50 },
      { name: 'Blinded Cohort B (Placebo)', ratio: '1:1', enrolled: 48 },
    ],
    inclusionCriteria: [
      'Adults aged 18–75 with histologically confirmed KRAS-G12D solid tumor',
      'ECOG performance status 0–1 and adequate organ function',
    ],
    exclusionCriteria: [
      'Prior systemic MEK/KRAS inhibitor therapy within 28 days',
      'Active CNS metastases or uncontrolled cardiac arrhythmia',
    ],
  },
  {
    id: 'VGB-IMM-108',
    title: 'Phase I Safety & PK Cohort for Bispecific mAb-09',
    phase: 'Phase I',
    enrolled: 36,
    target: 36,
    status: 'Active',
    blindingMode: 'Single-Blind',
    cohortArms: [
      { name: 'Dose Escalation 1.5 mg/kg', ratio: '1:1', enrolled: 18 },
      { name: 'Dose Escalation 3.0 mg/kg', ratio: '1:1', enrolled: 18 },
    ],
    inclusionCriteria: [
      'Refractory solid tumors with measurable RECIST v1.1 lesions',
      'Signed 21 CFR Part 11 e-Consent prior to baseline PK draw',
    ],
    exclusionCriteria: ['Grade >= 3 autoimmune toxicity within past 6 months'],
  },
  {
    id: 'VGB-OBS-051',
    title: 'Longitudinal Liquid Biopsy cfDNA Registry',
    phase: 'Observational',
    enrolled: 214,
    target: 300,
    status: 'Recruiting',
    blindingMode: 'Open-Label',
    cohortArms: [{ name: 'Prospective cfDNA Cohort', ratio: '100%', enrolled: 214 }],
    inclusionCriteria: ['Stage II–IV oncology patients undergoing standard care'],
    exclusionCriteria: ['Hemolyzed baseline plasma collection'],
  },
];

export const INITIAL_CLINICAL_PARTICIPANTS: ClinicalParticipant[] = [
  {
    subjectCode: 'SUBJ-0842',
    trialId: 'VGB-ONC-204',
    arm: 'Blinded Cohort A',
    visitWindow: 'Week 12 · Cycle 4',
    consentStatus: 'Approved',
    consentTimestamp: '2026-08-19 10:15 UTC',
    consentSignedBy: 'Dr. Priya Nair (21 CFR Part 11)',
    vialId: 'SMP-CLN-8420',
    reminderEnabled: true,
    visits: [
      { id: 'VST-1', label: 'Screening & e-Consent', scheduledDate: '2026-08-19', status: 'Completed' },
      { id: 'VST-2', label: 'Week 4 Cycle 2 PK Draw', scheduledDate: '2026-09-18', status: 'Completed' },
      { id: 'VST-3', label: 'Week 12 Cycle 4 Imaging', scheduledDate: '2026-11-14', status: 'Scheduled' },
    ],
    dosageLogs: [
      { id: 'DOS-1', dose: 'Blinded Kit #A-402 (150 mg BID)', administeredAt: '2026-10-16 09:00 UTC', administeredBy: 'Dr. Priya Nair' },
    ],
  },
  {
    subjectCode: 'SUBJ-0319',
    trialId: 'VGB-IMM-108',
    arm: 'Blinded Cohort B',
    visitWindow: 'Week 4 · PK Draw',
    consentStatus: 'Approved',
    consentTimestamp: '2026-10-08 14:40 UTC',
    consentSignedBy: 'Dr. Priya Nair (21 CFR Part 11)',
    vialId: 'SMP-CLN-3194',
    reminderEnabled: true,
    visits: [
      { id: 'VST-4', label: 'Baseline PK Infusion', scheduledDate: '2026-10-08', status: 'Completed' },
      { id: 'VST-5', label: 'Week 4 Cytokine & PK Draw', scheduledDate: '2026-11-12', status: 'Scheduled' },
    ],
    dosageLogs: [
      { id: 'DOS-2', dose: 'Blinded Infusion Vial #B-118 (3.0 mg/kg)', administeredAt: '2026-10-08 15:10 UTC', administeredBy: 'Dr. Priya Nair' },
    ],
  },
  {
    subjectCode: 'SUBJ-0915',
    trialId: 'VGB-ONC-204',
    arm: 'Blinded Cohort A',
    visitWindow: 'Screening Baseline',
    consentStatus: 'Pending',
    vialId: 'SMP-CLN-9152',
    reminderEnabled: false,
    visits: [
      { id: 'VST-6', label: 'Screening Baseline & Consent', scheduledDate: '2026-11-13', status: 'Scheduled' },
    ],
    dosageLogs: [],
  },
];

export const INITIAL_CLINICAL_BIOSPECIMENS: ClinicalBiospecimen[] = [
  {
    vialId: 'SMP-CLN-8420',
    subjectCode: 'SUBJ-0842',
    trialId: 'VGB-ONC-204',
    specimenType: 'cfDNA',
    volumeMl: 4.5,
    storageLocation: 'Cryo Vault ULT-01 · Rack C · Box CLN-04 (A2)',
    custodyStatus: 'Available',
    clinicalAttachment: 'DICOM_CT_Chest_SUBJ0842.dcm',
    lastUpdatedBy: 'Dr. Priya Nair',
  },
  {
    vialId: 'SMP-CLN-3194',
    subjectCode: 'SUBJ-0319',
    trialId: 'VGB-IMM-108',
    specimenType: 'Plasma / Serum',
    volumeMl: 2.8,
    storageLocation: 'Central BioBank Transit Cooler #07',
    custodyStatus: 'In Transit',
    clinicalAttachment: 'FACS_Cytokine_SUBJ0319.fcs',
    lastUpdatedBy: 'Marcus Chen',
  },
  {
    vialId: 'SMP-CLN-9152',
    subjectCode: 'SUBJ-0915',
    trialId: 'VGB-ONC-204',
    specimenType: 'Whole Blood',
    volumeMl: 8.0,
    storageLocation: 'Site 04 Collection Station · 4°C Rack 1',
    custodyStatus: 'In Use',
    lastUpdatedBy: 'Dr. Priya Nair',
  },
];

export const ADVERSE_EVENTS_LIST: AdverseEventItem[] = [
  {
    id: 'AE-4401',
    trialId: 'VGB-ONC-204',
    subjectCode: 'SUBJ-0842',
    term: 'Grade 1 Injection Site Erythema',
    severity: 'Mild',
    reportedAt: '2026-11-10 14:20 UTC',
    meddraCode: 'MedDRA 10022061',
    isSae: false,
    blindedNotes: 'Resolved within 48h without dosing interruption; blinding preserved.',
    regulatoryDraftStatus: 'Not Required',
  },
  {
    id: 'AE-4402',
    trialId: 'VGB-IMM-108',
    subjectCode: 'SUBJ-0319',
    term: 'Transient Pyrexia 38.2°C (Infusion Reaction)',
    severity: 'Moderate',
    reportedAt: '2026-11-09 09:05 UTC',
    meddraCode: 'MedDRA 10037660',
    isSae: false,
    blindedNotes: 'Managed with acetaminophen 650 mg PO; PK draw completed on schedule.',
    regulatoryDraftStatus: 'Not Required',
  },
];

export const INITIAL_CLINICAL_NOTES: ClinicalTeamNote[] = [
  {
    id: 'CN-01',
    author: 'Dr. Elena Vance, Ph.D.',
    role: 'Principal Investigator',
    time: '35m ago',
    trialRef: 'VGB-ONC-204',
    text: 'Please prioritize cfDNA vial SMP-CLN-8420 for NGS biomarker batch #14 while maintaining cohort masking.',
  },
  {
    id: 'CN-02',
    author: 'David Ross, RAC',
    role: 'QA / Compliance Officer',
    time: '2h ago',
    trialRef: 'VGB-IMM-108',
    text: 'All Week 4 PK e-Consent timestamps verified against 21 CFR Part 11 audit ledger.',
  },
];

export const BUDGET_ALLOCATIONS: BudgetAllocation[] = [
  { department: 'Functional Genomics', allocatedUsd: 420000, spentUsd: 318000, grantCode: 'NIH-R01', reagentBurnUsd: 18500, instrumentHoursBilled: 248 },
  { department: 'Cellular Pharmacology', allocatedUsd: 290000, spentUsd: 215000, grantCode: 'VGB-BIO', reagentBurnUsd: 12400, instrumentHoursBilled: 176 },
  { department: 'Clinical Operations', allocatedUsd: 540000, spentUsd: 412000, grantCode: 'VGB-GCP', reagentBurnUsd: 24900, instrumentHoursBilled: 310 },
  { department: 'Bioinformatics & AI', allocatedUsd: 210000, spentUsd: 164000, grantCode: 'NSF-774', reagentBurnUsd: 5200, instrumentHoursBilled: 92 },
];

export const INITIAL_PURCHASE_REQUISITIONS: PurchaseRequisition[] = [
  {
    id: 'PO-2026-814',
    vendor: 'Illumina Direct',
    itemDescription: 'NovaSeq S4 Reagent Kit v1.5 (300 cycles)',
    department: 'Functional Genomics',
    grantCode: 'NIH-R01',
    amountUsd: 14800,
    status: 'Pending',
    requestedBy: 'Dr. Elena Vance, Ph.D.',
  },
  {
    id: 'PO-2026-813',
    vendor: 'Thermo Fisher Scientific',
    itemDescription: 'Lipofectamine CRISPRMAX & TaqMan Master Mix (10x)',
    department: 'Cellular Pharmacology',
    grantCode: 'VGB-BIO',
    amountUsd: 6400,
    status: 'Pending',
    requestedBy: 'Marcus Chen',
  },
  {
    id: 'PO-2026-810',
    vendor: '10x Genomics',
    itemDescription: 'Chromium Next GEM Single Cell 3\' Kit v3.1',
    department: 'Clinical Operations',
    grantCode: 'VGB-GCP',
    amountUsd: 9200,
    status: 'Approved',
    requestedBy: 'Dr. Priya Nair',
  },
];

export const EQUIPMENT_UTILIZATION_SERIES: EquipmentUtilizationMetric[] = [
  { equipmentId: 'EQP-01', name: 'NovaSeq 6000', utilizationPct: 89, activeHours: 142, idleHours: 18, tatHours: 14.2 },
  { equipmentId: 'EQP-02', name: 'TSX -80°C Vault', utilizationPct: 96, activeHours: 168, idleHours: 0, tatHours: 0.5 },
  { equipmentId: 'EQP-03', name: 'Tecan Fluent 780', utilizationPct: 74, activeHours: 118, idleHours: 42, tatHours: 3.8 },
  { equipmentId: 'EQP-04', name: 'Agilent LC/MS', utilizationPct: 62, activeHours: 98, idleHours: 62, tatHours: 6.4 },
];

export const CAPA_DEVIATIONS: CapaDeviationItem[] = [
  {
    id: 'CAPA-2026-19',
    source: 'Plate #PLT-09 · qPCR Run',
    category: 'OOS Assay',
    severity: 'Medium',
    status: 'Under Review',
    rootCause: 'Pipette tip aspiration variability in Column 6 positive control wells.',
    preventiveAction: 'Recalibrate 8-channel Tecan head & require dual-well duplicate controls.',
    owner: 'David Ross, RAC',
    dueDate: '2026-11-22',
    isOosInvestigation: true,
  },
  {
    id: 'CAPA-2026-18',
    source: 'HPLC-Agilent-02',
    category: 'Calibration Drift',
    severity: 'High',
    status: 'Open',
    rootCause: 'UV detector lamp intensity drifted below 85% baseline threshold.',
    preventiveAction: 'Replace deuterium lamp assembly and execute ISO 17025 PQ verification.',
    owner: 'Marcus Chen',
    dueDate: '2026-11-15',
    isOosInvestigation: false,
  },
  {
    id: 'CAPA-2026-17',
    source: 'SOP-LIMS-014 Rev 3',
    category: 'SOP Deviation',
    severity: 'Low',
    status: 'Closed',
    rootCause: 'Legacy cryo label template lacked freeze-thaw cycle counter field.',
    preventiveAction: 'Updated SOP-LIMS-014 to v4.2 and rolled out thermal ZPL template.',
    owner: 'David Ross, RAC',
    dueDate: '2026-10-30',
    isOosInvestigation: false,
    closedSignatureHash: 'sha256:8c4a91d2f0e3b7712...',
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
    attestedCount: 19,
    totalStaff: 20,
    effectiveDate: '2026-10-15',
    revisionNotes: 'Added mandatory freeze-thaw threshold check before aliquot checkout.',
  },
  {
    id: 'SOP-2',
    code: 'SOP-EQP-008',
    title: 'Illumina NovaSeq Optical Alignment & Calibration',
    version: 'v3.0',
    framework: 'ISO 17025',
    reviewDue: '2026-12-01',
    attestedCount: 18,
    totalStaff: 20,
    effectiveDate: '2026-09-01',
    revisionNotes: 'Updated optical flow cell tolerance to ±0.10 µm.',
  },
  {
    id: 'SOP-3',
    code: 'SOP-GMP-021',
    title: 'Batch Record Dual-Key Electronic Signature Release',
    version: 'v5.1',
    framework: 'GMP',
    reviewDue: '2027-03-10',
    attestedCount: 20,
    totalStaff: 20,
    effectiveDate: '2026-11-01',
    revisionNotes: 'Enforced FIDO2 hardware key requirement for final QA release.',
  },
];

export const INITIAL_PENDING_SIGNS: PendingSignOffItem[] = [
  {
    id: 'SIG-REQ-301',
    recordTitle: 'Batch Release #RUN-104 — CRISPR KRAS Screen',
    submittedBy: 'Dr. Elena Vance, Ph.D.',
    framework: 'FDA 21 CFR Part 11',
    submittedAt: 'Today, 09:50 UTC',
    status: 'Pending',
  },
  {
    id: 'SIG-REQ-302',
    recordTitle: 'SOP-EQP-008 Rev 3.0 — NovaSeq Optical Calibration',
    submittedBy: 'Marcus Chen',
    framework: 'ISO 17025',
    submittedAt: 'Today, 08:15 UTC',
    status: 'Pending',
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

export const INITIAL_ORGANIZATIONS: OrganizationRecord[] = [
  {
    id: 'ORG-01',
    name: 'Vanguard Biotherapeutics',
    tier: 'Enterprise Biopharma',
    region: 'us-east-1 (Boston)',
    seatsUsed: 38,
    seatsLimit: 50,
    status: 'Active',
  },
  {
    id: 'ORG-02',
    name: 'Vanguard Clinical Network',
    tier: 'Enterprise Biopharma',
    region: 'eu-central-1 (Frankfurt)',
    seatsUsed: 22,
    seatsLimit: 30,
    status: 'Active',
  },
  {
    id: 'ORG-03',
    name: 'GatsBio Academic Consortium',
    tier: 'Academic & Research',
    region: 'us-west-2 (Seattle)',
    seatsUsed: 14,
    seatsLimit: 15,
    status: 'Active',
  },
];

export const INITIAL_SSO_PROVIDERS: SsoProviderRecord[] = [
  {
    id: 'SSO-01',
    name: 'Okta Enterprise SAML',
    protocol: 'SAML 2.0',
    domain: 'vanguardbio.com',
    enabled: true,
  },
  {
    id: 'SSO-02',
    name: 'Microsoft Entra ID',
    protocol: 'OIDC',
    domain: 'clinical.vanguardbio.com',
    enabled: true,
  },
  {
    id: 'SSO-03',
    name: 'ORCID & InCommon Federated',
    protocol: 'ORCID / eduGAIN',
    domain: 'consortium.edu',
    enabled: true,
  },
];

export const INITIAL_IOT_GATEWAYS: IotGatewayRecord[] = [
  {
    id: 'IOT-GW-01',
    name: 'Cryo Vault B Telemetry Node',
    protocol: 'MQTT',
    location: 'Boston BioHub · Vault B',
    metric: '-80.1 °C · 12 probes',
    status: 'Operational',
  },
  {
    id: 'IOT-GW-02',
    name: 'NovaSeq Sequencing Data Bridge',
    protocol: 'HTTPS',
    location: 'Genomics Core Rm 204',
    metric: '1.8 Gbps FASTQ stream',
    status: 'Operational',
  },
  {
    id: 'IOT-GW-03',
    name: 'Clinical LIS Accessioning Connector',
    protocol: 'HL7',
    location: 'Clinical Lab Rm 112',
    metric: '412 msgs/hr · TLS 1.3',
    status: 'Operational',
  },
];

export const INITIAL_SYSTEM_LOGS: SystemEventLog[] = [
  {
    id: 'SYS-1003',
    timestamp: '2026-11-11 06:18 UTC',
    actor: 'Alex Rivera',
    category: 'SECURITY',
    message: 'Verified Okta Enterprise SAML 2.0 certificate rotation schedule.',
  },
  {
    id: 'SYS-1002',
    timestamp: '2026-11-11 05:42 UTC',
    actor: 'Alex Rivera',
    category: 'IOT',
    message: 'Confirmed MQTT heartbeat across 12 cryo probes in Vault B.',
  },
  {
    id: 'SYS-1001',
    timestamp: '2026-11-10 21:10 UTC',
    actor: 'Alex Rivera',
    category: 'ORG',
    message: 'Provisioned Vanguard Clinical Network EU region workspace.',
  },
];
