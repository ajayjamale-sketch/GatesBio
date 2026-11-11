// GatsBio Platform Specification Data
// Based on GatsBio Product Requirements Document (PRD v1.0.0)

export interface PlatformModule {
  id: string;
  code: string; // e.g. "2.3"
  name: string;
  pillarId: 'lab-ops' | 'research-data' | 'ai-clinical' | 'governance';
  tagline: string;
  description: string;
  quickTags: string[];
  subFeatures: string[];
  userActions: string[];
  systemBehavior: string[];
  badge?: string;
  highlightMetric?: string;
}

export interface PlatformPillar {
  id: 'lab-ops' | 'research-data' | 'ai-clinical' | 'governance';
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  color: string;
  bgColor: string;
  borderColor: string;
  modules: PlatformModule[];
}

export interface PersonaWorkflow {
  id: string;
  role: string;
  personaTitle: string;
  badge: string;
  summary: string;
  steps: {
    stepNumber: number;
    title: string;
    description: string;
    actionTag: string;
  }[];
  systemOutcome: string;
}

export interface FutureTechCapability {
  id: string;
  category: string;
  title: string;
  description: string;
  readinessBadge: string;
  bulletPoints: string[];
}

export const PLATFORM_PILLARS: PlatformPillar[] = [
  {
    id: 'lab-ops',
    title: 'Laboratory Operations & Specimen Logistics',
    shortTitle: 'Lab Operations',
    tagline: 'Precision sample accessioning, microplate mapping, and instrument telemetry',
    description: 'Transform physical wet lab execution into an auditable digital workflow. From sample barcoding and cryogenic freezer hierarchy to robotic liquid handling and IoT telemetry.',
    imageUrl: '/images/pillar-lab-ops.jpg',
    imageAlt: 'Laboratory specialist inspecting barcoded cryovial rack next to microplate reader and ultra-low freezers',
    color: '#1E40AF',
    bgColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    modules: [
      {
        id: 'lims',
        code: '2.3',
        name: 'Laboratory Information Management System (LIMS)',
        pillarId: 'lab-ops',
        tagline: 'End-to-end specimen lifecycle & cold-chain custody',
        description: 'Complete digital management of physical specimens from accessioning to disposal. Features automated 1D/2D barcoding, cryogenic multi-tier freezer indexing, and automated liquid handler instructions.',
        quickTags: ['1D/2D Barcodes', '96/384-Well Maps', '-80°C Cryo Map', 'Chain of Custody'],
        subFeatures: [
          'Sample tracking with 1D Code 128 & 2D DataMatrix barcodes',
          'Interactive 96/384-well microplate coordinate visualizer with concentration heatmaps',
          'Multi-tier cryogenic cold storage mapping (-80°C freezers to liquid nitrogen dewars)',
          'Laboratory workflow automation with batch testing pipelines',
          'Equipment assignment and liquid handler run profile export',
          'Automated result management with real-time QC thresholds',
          'Chain of custody tracking with operator timestamps and freeze-thaw count alerts',
        ],
        userActions: [
          'Register incoming specimens and print barcode labels in bulk',
          'Assign samples into plate wells or freezer coordinates',
          'Queue test batches and monitor execution progress',
          'Review and approve assay result packages',
        ],
        systemBehavior: [
          'Track complete sample lifecycle across all transfers',
          'Maintain immutable 21 CFR Part 11 audit trails',
          'Enforce freeze-thaw degradation warning limits',
          'Export pipetting runfiles for Tecan, Hamilton, and Beckman liquid handlers',
        ],
        badge: 'Core Engine',
        highlightMetric: '0% Lost Specimen Incidents',
      },
      {
        id: 'equipment',
        code: '2.6',
        name: 'Laboratory Equipment Management & IoT',
        pillarId: 'lab-ops',
        tagline: 'Anti-collision instrument scheduling & live calibration drift alarms',
        description: 'Maximize multi-million dollar equipment utilization and eliminate test invalidation. Features smart booking calendars, preventive calibration scheduling, and live IoT sensor feeds.',
        quickTags: ['Smart Booking', 'ISO 17025 Logs', 'IoT Telemetry', 'Drift Alarms'],
        subFeatures: [
          'Comprehensive equipment inventory and digital passport profiles',
          'ISO 17025 compliant calibration schedule enforcement',
          'Maintenance logs, vendor service histories, and downtime tracking',
          'Visual anti-collision equipment booking calendar with clinical trial preemption',
          'Instrument utilization and idle capacity analytics',
          'IoT device telemetry (temperature, CO₂, humidity, vibration alarms)',
        ],
        userActions: [
          'Reserve instruments (sequencers, mass spectrometers, centrifuges)',
          'Log preventive maintenance and calibration test results',
          'Check real-time instrument operational status and environmental telemetry',
        ],
        systemBehavior: [
          'Monitor instrument availability and enforce priority booking queues',
          'Dispatch instant SMS/email alarms upon freezer temperature drift',
          'Lock out uncalibrated instruments from clinical assay execution',
        ],
        badge: 'IoT Connected',
        highlightMetric: '+30% Equipment Uptime',
      },
    ],
  },
  {
    id: 'research-data',
    title: 'Research Lifecycle & Scientific Data Lake',
    shortTitle: 'Research & Data',
    tagline: 'Unified protocol execution and multi-omics big data versioning',
    description: 'Empower Principal Investigators and research teams with structured experiment tracking, electronic protocol SOPs, and centralized storage for genomic, clinical, and phenotypic datasets.',
    imageUrl: '/images/pillar-research-data.jpg',
    imageAlt: 'Bioinformatician reviewing genomic alignment tracks next to calibrated micropipettes and laboratory glass wall',
    color: '#0F766E',
    bgColor: '#F0FDFA',
    borderColor: '#99F6E4',
    modules: [
      {
        id: 'project-mgmt',
        code: '2.2',
        name: 'Research Project Management',
        pillarId: 'research-data',
        tagline: 'End-to-end scientific project & milestone orchestration',
        description: 'Manage complex life sciences discovery roadmaps from grant inception through peer-reviewed publication. Track multi-stage experiments, task dependencies, and departmental grant allocations.',
        quickTags: ['Milestone Roadmaps', 'Protocol SOPs', 'Grant Budgets', 'Task Matrix'],
        subFeatures: [
          'Research project creation with hierarchical milestones and sub-studies',
          'Experiment protocol templating with SOP compliance attestations',
          'Task assignment with researcher role-based responsibility matrices',
          'Cross-disciplinary scientific team collaboration channels',
          'Grant funding and departmental budget utilization tracking',
          'Project documentation repository with version control',
          'Real-time milestone progress tracking and milestone dependency graphs',
        ],
        userActions: [
          'Create research projects and define phase milestones',
          'Delegate tasks to postdocs, scientists, and technicians',
          'Track grant spend and milestone completion timelines',
          'Attach raw experiment write-ups and protocol variations',
        ],
        systemBehavior: [
          'Monitor project timelines and alert on milestone drift',
          'Generate automated weekly progress and executive summaries',
          'Reconcile lab supply spending against assigned grant budgets',
        ],
        badge: 'Lifecycle Control',
        highlightMetric: '-25% Milestone Turnaround',
      },
      {
        id: 'bio-data',
        code: '2.4',
        name: 'Biological Data Management',
        pillarId: 'research-data',
        tagline: 'Centralized multi-omics data lake & scientific dataset versioning',
        description: 'Store, query, and index petabyte-scale multi-omics outputs in their native biological formats. Features automated taxonomic metadata enrichment and Git-like provenance tracking.',
        quickTags: ['FASTQ / BAM / VCF', 'FCS Gating', 'NCBI Metadata', 'Data Versioning'],
        subFeatures: [
          'Genomic data storage supporting FASTQ, BAM, CRAM, and VCF formats',
          'Clinical dataset management with automated HIPAA de-identification',
          'Biological specimen record indexing with donor phenotypic metadata',
          'Standardized metadata tagging conforming to NCBI Taxonomy & Gene Ontology',
          'Git-like biological dataset versioning with immutable hash provenance',
          'Flow Cytometry FCS standard parser with forward/side scatter gating',
          'Single-cell AnnData (.h5ad) matrix indexing for transcriptomics pipelines',
        ],
        userActions: [
          'Upload raw sequencer runs and flow cytometry files',
          'Search datasets by gene symbols, variant IDs, or organism taxons',
          'Branch and version experimental datasets for peer review reproducibility',
        ],
        systemBehavior: [
          'Securely catalog, index, and organize biological big data',
          'Validate file format schemas on upload and generate quick summaries',
          'Enforce granular dataset access permissions based on IRB protocols',
        ],
        badge: 'Multi-Omics Native',
        highlightMetric: 'FASTQ / BAM / VCF Support',
      },
    ],
  },
  {
    id: 'ai-clinical',
    title: 'Scientific AI & Clinical Trial Operations',
    shortTitle: 'AI & Clinical',
    tagline: 'Literature synthesis, hypothesis formulation, and GCP trial administration',
    description: 'Bridge upstream discovery and downstream clinical translation with AI-assisted research intelligence and strict Good Clinical Practice (GCP) trial workflows.',
    imageUrl: '/images/pillar-ai-clinical.jpg',
    imageAlt: 'Clinical research specialists collaborating over trial cohort metrics in a sunlit biotechnology research center',
    color: '#7E22CE',
    bgColor: '#FAF5FF',
    borderColor: '#E9D5FF',
    modules: [
      {
        id: 'ai-engine',
        code: '2.5',
        name: 'AI Research Intelligence Engine',
        pillarId: 'ai-clinical',
        tagline: 'PubMed RAG, automated hypothesis synthesis & target identification',
        description: 'Accelerate hypothesis generation using state-of-the-art AI trained on biomedical corpora. Synthesizes millions of papers from PubMed Central and bioRxiv with verifiable DOI citations.',
        quickTags: ['PubMed RAG', 'DOI Citations', 'Target Discovery', 'sgRNA Screening'],
        subFeatures: [
          'Biomedical literature analysis with automated DOI-grounded citations',
          'Hypothesis generation and sgRNA off-target screening support',
          'Drug discovery insights and molecular target-pathway interaction analysis',
          'Scientific trend analysis across patent claims and clinical trials',
          'Natural language query interface for laboratory protocols',
          'Automated research gap identification in target disease spaces',
        ],
        userActions: [
          'Query scientific literature and extract validated protocol parameters',
          'Generate target pathway hypotheses for exploratory assays',
          'Benchmark new findings against historical publications',
        ],
        systemBehavior: [
          'Generate verifiable research insights with direct bibliography links',
          'Flag contradictory findings across public biomedical databases',
          'Continually index internal lab notes to enrich organizational memory',
        ],
        badge: 'RAG Powered',
        highlightMetric: '>70% Research Time Saved',
      },
      {
        id: 'clinical-trials',
        code: '2.7',
        name: 'Clinical Trial Management (GCP)',
        pillarId: 'ai-clinical',
        tagline: 'Phase I-IV cohorts, cryptographic e-Consent & adverse event reporting',
        description: 'Administer clinical trial cohorts with strict adherence to Good Clinical Practice (GCP). Manage patient enrollment, cryptographic informed consent, and automated 24-hour safety notifications.',
        quickTags: ['Phase I–IV', 'e-Consent', 'MedDRA AEs', 'Double-Blind LIMS'],
        subFeatures: [
          'Clinical trial protocol setup across Phase I through IV studies',
          'Participant enrollment, cohort allocation, and double-blind randomization',
          'Cryptographic Electronic Informed Consent (e-Consent) with audit trail',
          'Longitudinal trial visit monitoring with biomarker sample barcode linkage',
          'MedDRA-coded Adverse Event (AE) and Serious Adverse Event (SAE) tracking',
          'Automated regulatory report draft generation within statutory 24-hour windows',
        ],
        userActions: [
          'Enroll participants and verify digital informed consent packages',
          'Schedule participant study visits and log biomarker draws',
          'Log adverse events and submit regulatory expedited safety reports',
        ],
        systemBehavior: [
          'Ensure strict GCP compliance and HIPAA privacy safeguards',
          'Link patient clinical visits to downstream biobank sample tubes',
          'Trigger emergency alerts to Principal Investigators on SAE logging',
        ],
        badge: 'GCP Validated',
        highlightMetric: '24h Statutory SAE Alerts',
      },
    ],
  },
  {
    id: 'governance',
    title: 'Enterprise Governance, IP & Collaboration',
    shortTitle: 'Governance & IP',
    tagline: 'Regulatory audit readiness, patent management, and institutional collaboration',
    description: 'Ensure institutional rigor across multi-center research consortia. Compliant by design with FDA 21 CFR Part 11, GMP, ISO 17025, and institutional intellectual property tracking.',
    imageUrl: '/images/pillar-governance.jpg',
    imageAlt: 'Quality assurance specialist reviewing SOP binders and compliance metrics beside a glass-walled GMP cleanroom',
    color: '#0F172A',
    bgColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    modules: [
      {
        id: 'auth-profiles',
        code: '2.1',
        name: 'User Authentication & Researcher Profiles',
        pillarId: 'governance',
        tagline: 'Secure academic SSO, verified scientific identity & RBAC',
        description: 'Enterprise identity management tailored for scientific consortia. Features ORCID and institutional SSO, verified publication profiles, and granular role/attribute-based access controls.',
        quickTags: ['ORCID / SSO', 'Hardware MFA', 'RBAC / ABAC', 'Multi-Tenant'],
        subFeatures: [
          'Institutional SSO integration (InCommon, Azure AD, Google Workspace, ORCID)',
          'Researcher scientific profiles with verified PubMed/ORCID publication histories',
          'Institutional affiliation tracking and lab group memberships',
          'Granular Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC)',
          'Multi-organization tenancy with secure workspace isolation',
          'Two-factor authentication (TOTP, WebAuthn/FIDO2 hardware keys)',
        ],
        userActions: [
          'Log in via institutional credentials or SSO',
          'Curate scientific credentials, expertise tags, and publication lists',
          'Switch between university and spin-out company tenant workspaces',
        ],
        systemBehavior: [
          'Verify user scientific credentials and enforce password/MFA policies',
          'Govern access permissions based on certified training & regulatory credentials',
        ],
        badge: 'ORCID / SSO',
        highlightMetric: 'Zero-Trust Architecture',
      },
      {
        id: 'collaboration',
        code: '2.8',
        name: 'Scientific Collaboration Platform',
        pillarId: 'governance',
        tagline: 'Multi-institutional shared workspaces & scientific peer reviews',
        description: 'Break down institutional research silos with real-time collaborative workspaces, microscopy image annotations, and secure inter-lab sample exchange networks.',
        quickTags: ['Shared Workspaces', 'Peer Reviews', 'NDA Controls', 'Cross-Lab Sync'],
        subFeatures: [
          'Global research community hubs and topic-based scientific forums',
          'Inter-institutional team workspaces with granular data sharing controls',
          'Peer review discussion channels on protocol designs and assay results',
          'Integrated secure document and protocol sharing repositories',
          'Video conference integrations with shared microscopy screen views',
        ],
        userActions: [
          'Invite cross-institutional peers to collaborate on joint grant projects',
          'Comment directly on specific plate wells and sequencing run charts',
          'Host virtual scientific advisory board sessions with live lab telemetry',
        ],
        systemBehavior: [
          'Facilitate secure knowledge transfer without compromising unpublished IP',
          'Enforce non-disclosure agreement (NDA) rules on restricted datasets',
        ],
        badge: 'Inter-Lab Hub',
        highlightMetric: 'Multi-Tenant Workspaces',
      },
      {
        id: 'ip-pubs',
        code: '2.9',
        name: 'Publication & Intellectual Property Management',
        pillarId: 'governance',
        tagline: 'Manuscript repositories, patent drafting logs & citation tracking',
        description: 'Track the translation of laboratory discoveries into high-impact journal articles and protected patent portfolios. Safeguard inventor timestamps and legal chain of custody.',
        quickTags: ['Patent Portfolio', 'Manuscript Repo', 'Citation Impact', 'IP Timestamps'],
        subFeatures: [
          'Publication lifecycle tracking from manuscript draft to peer review',
          'Patent portfolio management with priority filing dates and claims logs',
          'Centralized institutional research paper and preprint repository',
          'Citation impact tracking and Altmetric score integration',
          'Automated journal submission checklist verification (Nature, Cell, Science)',
          'Intellectual property ownership records and contributor royalty schedules',
        ],
        userActions: [
          'Submit manuscripts for institutional sign-off prior to external journal submission',
          'Link patent invention disclosures to underlying laboratory notebook entries',
          'Track citation velocity and journal impact factors across departments',
        ],
        systemBehavior: [
          'Timestamp laboratory proof-of-concept data for patent priority filing',
          'Automate publication export packages with formatted figure legends',
        ],
        badge: 'IP Protection',
        highlightMetric: 'Immutable Invention Logs',
      },
      {
        id: 'compliance',
        code: '2.10',
        name: 'Compliance & Regulatory Management',
        pillarId: 'governance',
        tagline: 'Audit-ready FDA 21 CFR Part 11, GMP & ISO 17025 governance',
        description: 'Eliminate audit anxiety with automated regulatory compliance. Complete with cryptographic dual-key electronic signatures, immutable audit logs, and CAPA workflows.',
        quickTags: ['21 CFR Part 11', 'GMP / CAPA', 'ISO 17025', 'Audit Binders'],
        subFeatures: [
          'FDA 21 CFR Part 11 compliant electronic signatures & meanings',
          'Good Manufacturing Practice (GMP) batch production record workflows',
          'ISO 17025 testing laboratory quality and calibration control tracking',
          'Automated Corrective and Preventive Action (CAPA) tracking',
          'Controlled documentation management with read-and-understood logging',
          'One-click regulatory audit binder export for FDA/EMA inspections',
        ],
        userActions: [
          'Review and cryptographically sign off on batch records and assay protocols',
          'Log process deviations and initiate investigation CAPAs',
          'Export audit packages with verifiable SHA-256 integrity checksums',
        ],
        systemBehavior: [
          'Maintain append-only, tamper-evident audit logs across every keystroke',
          'Enforce strict electronic signature re-authentication per FDA guidelines',
        ],
        badge: '21 CFR Part 11',
        highlightMetric: '100% Audit-Ready Logs',
      },
      {
        id: 'analytics',
        code: '2.11',
        name: 'Analytics & Research Intelligence Dashboard',
        pillarId: 'governance',
        tagline: 'Real-time laboratory KPIs, grant burn rates & throughput metrics',
        description: 'Gain executive-level clarity into scientific productivity, sample turnaround velocity, instrument ROI, and institutional grant burn rates through live interactive dashboards.',
        quickTags: ['Lab KPIs', 'Grant Burn Rate', 'Asset ROI', 'Board Exports'],
        subFeatures: [
          'Research project performance metrics and velocity forecasts',
          'Laboratory equipment utilization and operational idle analytics',
          'Departmental research productivity reports and publication metrics',
          'NIH/NSF grant funding utilization and burn rate projections',
          'AI-generated executive summaries and bottleneck diagnoses',
          'Exportable presentation dashboards for board meetings and grant renewals',
        ],
        userActions: [
          'Filter dashboards by department, lab facility, or individual grant',
          'Drill down into sample turnaround latency across testing queues',
          'Schedule automated executive reports to be emailed to stakeholders',
        ],
        systemBehavior: [
          'Aggregate millions of laboratory events into real-time metrics',
          'Project grant budget exhaustion dates based on current run rates',
        ],
        badge: 'Executive BI',
        highlightMetric: 'Live Operational KPIs',
      },
      {
        id: 'admin-org',
        code: '2.12',
        name: 'Admin & Organization Management',
        pillarId: 'governance',
        tagline: 'Centralized governance, tenancy controls & institutional security',
        description: 'Empower IT and operations directors to manage multi-center organizations, enforce data residency boundaries, configure API integrations, and oversee subscription tiers.',
        quickTags: ['User Provisioning', 'Facility Hierarchy', 'IP Allowlisting', 'API Webhooks'],
        subFeatures: [
          'Centralized user provisioning and de-provisioning workflows',
          'Organization, department, and laboratory facility hierarchy management',
          'Enterprise security controls (IP whitelisting, session timeout policies)',
          'System health, API rate limits, and infrastructure uptime monitoring',
          'Subscription tier and seat allocation management',
          'Comprehensive enterprise data retention and compliance archiving rules',
        ],
        userActions: [
          'Invite, suspend, and configure permissions for enterprise users',
          'Set up new laboratory rooms, cold-storage zones, and facilities',
          'Configure API webhooks for third-party ERP and hospital EHR integrations',
        ],
        systemBehavior: [
          'Enforce tenant isolation and cryptographic boundary separation',
          'Log all administrative actions in master tamper-proof audit vaults',
        ],
        badge: 'Enterprise IAM',
        highlightMetric: 'SOC 2 Type II Ready',
      },
    ],
  },
];

export const PERSONA_WORKFLOWS: PersonaWorkflow[] = [
  {
    id: 'scientist',
    role: 'Research Scientist',
    personaTitle: 'Principal Investigator / Postdoctoral Fellow',
    badge: 'Discovery & Assays',
    summary: 'Accelerates hypothesis formulation, protocol design, multi-omics data analysis, and peer-reviewed scientific publishing.',
    steps: [
      {
        stepNumber: 1,
        title: 'Sign In & Authenticate',
        description: 'Single sign-on via institutional ORCID or university credentials with hardware 2FA.',
        actionTag: 'SSO Auth',
      },
      {
        stepNumber: 2,
        title: 'Design Protocol & Create Project',
        description: 'Define milestones, configure electronic SOP protocol templates, and balance chemical equations.',
        actionTag: 'ELN & SOPs',
      },
      {
        stepNumber: 3,
        title: 'Conduct Experiments & Request Samples',
        description: 'Pull 96-well aliquots from cryo inventory and execute step-by-step assays with incubation timers.',
        actionTag: 'Lab Execution',
      },
      {
        stepNumber: 4,
        title: 'Analyze Results & Run AI Engine',
        description: 'Parse raw NGS/flow cytometry files and query the AI literature engine for pathway validation.',
        actionTag: 'AI & Data Lake',
      },
      {
        stepNumber: 5,
        title: 'Collaborate & Publish Findings',
        description: 'Share findings with inter-lab co-authors, timestamp invention disclosures, and draft journal papers.',
        actionTag: 'Publication & IP',
      },
    ],
    systemOutcome: 'Reduces experiment turnaround by 25% while ensuring 100% reproducible protocol documentation.',
  },
  {
    id: 'lab-tech',
    role: 'Laboratory Technician',
    personaTitle: 'Senior Lab Specialist / Instrument Operator',
    badge: 'Operations & Logistics',
    summary: 'Manages high-throughput accessioning, automated liquid handlers, test execution, and instrument calibrations.',
    steps: [
      {
        stepNumber: 1,
        title: 'Scan Sample Barcodes',
        description: 'Scan incoming 2D DataMatrix tubes in bulk and verify accession criteria in the LIMS engine.',
        actionTag: 'Barcode Scan',
      },
      {
        stepNumber: 2,
        title: 'Map Plate & Coordinate Freezers',
        description: 'Place aliquots into 96/384-well microplates and assign boxes to -80°C rack coordinates.',
        actionTag: 'Plate Visualizer',
      },
      {
        stepNumber: 3,
        title: 'Queue Tests & Reserve Instruments',
        description: 'Book sequencers or mass spectrometers and export liquid handler pipetting runfiles.',
        actionTag: 'Instrument Booking',
      },
      {
        stepNumber: 4,
        title: 'Execute Tests & Upload Results',
        description: 'Record test metrics, log QC controls, and upload raw instrument outputs directly to the data lake.',
        actionTag: 'QC Verification',
      },
      {
        stepNumber: 5,
        title: 'Log Maintenance & Calibrations',
        description: 'Record pipette calibrations, clean instruments, and resolve IoT freezer temperature warnings.',
        actionTag: 'ISO 17025 Logs',
      },
    ],
    systemOutcome: 'Achieves 0% lost specimen rate, eliminates duplicate data entry, and cuts accessioning time by 60%.',
  },
  {
    id: 'clinical-coord',
    role: 'Clinical Coordinator',
    personaTitle: 'Clinical Research Coordinator / Trial Lead',
    badge: 'Clinical & GCP',
    summary: 'Oversees Phase I-IV patient cohorts, electronic informed consent, sample blinding, and statutory adverse event reports.',
    steps: [
      {
        stepNumber: 1,
        title: 'Configure Trial Protocol',
        description: 'Define multi-center study protocols, inclusion criteria, and cohort visit milestone schedules.',
        actionTag: 'Trial Setup',
      },
      {
        stepNumber: 2,
        title: 'Enroll Participants & e-Consent',
        description: 'Capture cryptographic informed consent and verify digital patient identity and inclusion checks.',
        actionTag: 'e-Consent',
      },
      {
        stepNumber: 3,
        title: 'Track Cohorts & Blind Samples',
        description: 'Randomize patient cohorts and generate double-blinded barcode labels for biomarker blood draws.',
        actionTag: 'Double-Blind LIMS',
      },
      {
        stepNumber: 4,
        title: 'Record Adverse Events (AE/SAE)',
        description: 'Log patient symptoms using standardized MedDRA terms and flag severe events to investigators.',
        actionTag: 'MedDRA Logging',
      },
      {
        stepNumber: 5,
        title: 'Export Regulatory Dossiers',
        description: 'Generate GCP-compliant review packages for Institutional Review Boards (IRB) and the FDA.',
        actionTag: 'GCP Export',
      },
    ],
    systemOutcome: 'Guarantees 100% GCP adherence and ensures all statutory 24-hour SAE notifications are met.',
  },
  {
    id: 'biotech-admin',
    role: 'Biotech Administrator',
    personaTitle: 'Director of R&D / Department Chair',
    badge: 'Executive Oversight',
    summary: 'Oversees departmental research portfolios, allocates grant budgets, monitors equipment ROI, and protects IP.',
    steps: [
      {
        stepNumber: 1,
        title: 'Manage Research Portfolios',
        description: 'Review multi-project research roadmaps across molecular biology, oncology, and pharmacology teams.',
        actionTag: 'Portfolio View',
      },
      {
        stepNumber: 2,
        title: 'Track Grant Utilization & Budgets',
        description: 'Monitor federal and private grant expenditures against milestone achievements and lab supplies.',
        actionTag: 'Budget Analytics',
      },
      {
        stepNumber: 3,
        title: 'Evaluate Equipment Productivity',
        description: 'Inspect facility-wide instrument utilization metrics to guide new capital expenditure requests.',
        actionTag: 'Asset Analytics',
      },
      {
        stepNumber: 4,
        title: 'Safeguard Intellectual Property',
        description: 'Review invention disclosures and audit timestamps to prepare provisional patent filings.',
        actionTag: 'Patent Pipeline',
      },
      {
        stepNumber: 5,
        title: 'Generate Executive Dashboards',
        description: 'Export board-ready summaries illustrating scientific velocity, compliance metrics, and team output.',
        actionTag: 'Executive Reports',
      },
    ],
    systemOutcome: 'Maximizes scientific capital efficiency, optimizes instrument utilization, and secures institutional IP.',
  },
  {
    id: 'qa-officer',
    role: 'Compliance & QA Officer',
    personaTitle: 'Quality Assurance Director / Regulatory Auditor',
    badge: 'Audit & Compliance',
    summary: 'Validates standard operating procedures, verifies 21 CFR Part 11 electronic signatures, and manages CAPA records.',
    steps: [
      {
        stepNumber: 1,
        title: 'Review SOP Documents',
        description: 'Maintain version control over standard operating procedures and track staff read attestations.',
        actionTag: 'SOP Control',
      },
      {
        stepNumber: 2,
        title: 'Inspect Audit Logs & Hashes',
        description: 'Verify tamper-evident SHA-256 Merkle audit trees for all sample modifications and test results.',
        actionTag: 'Audit Trail',
      },
      {
        stepNumber: 3,
        title: 'Authenticate Electronic Signatures',
        description: 'Validate dual-key re-authentication signatures compliant with FDA 21 CFR Part 11 requirements.',
        actionTag: '21 CFR Part 11',
      },
      {
        stepNumber: 4,
        title: 'Manage CAPA & Deviations',
        description: 'Investigate out-of-specification (OOS) test deviations and track preventive action corrective loops.',
        actionTag: 'CAPA Tracking',
      },
      {
        stepNumber: 5,
        title: 'Export Audit Ready Binders',
        description: 'Produce complete audit binders with verifiable cryptographic proofs for FDA and ISO inspections.',
        actionTag: 'Audit Export',
      },
    ],
    systemOutcome: 'Maintains 100% audit-readiness and minimizes inspection preparation from weeks to minutes.',
  },
  {
    id: 'sys-admin',
    role: 'System Administrator',
    personaTitle: 'Biotech IT & Security Architect',
    badge: 'IT & Security',
    summary: 'Governs multi-tenant enterprise security, IAM directory sync, API integrations, and cloud infrastructure compliance.',
    steps: [
      {
        stepNumber: 1,
        title: 'Configure Federated SSO & MFA',
        description: 'Integrate Microsoft Azure AD, Google Workspace, and university InCommon SAML 2.0 / OIDC.',
        actionTag: 'SSO & IAM',
      },
      {
        stepNumber: 2,
        title: 'Define Granular RBAC / ABAC Policies',
        description: 'Assign role-based and attribute-based permissions across lab benches, projects, and datasets.',
        actionTag: 'Access Control',
      },
      {
        stepNumber: 3,
        title: 'Enforce Data Residency & Encryption',
        description: 'Manage AES-256 at-rest and TLS 1.3 in-transit encryption keys with tenant database isolation.',
        actionTag: 'Security Vault',
      },
      {
        stepNumber: 4,
        title: 'Monitor API & Instrument Webhooks',
        description: 'Supervise automated data streams from sequencers, liquid handlers, and hospital EHR systems.',
        actionTag: 'API Pipelines',
      },
      {
        stepNumber: 5,
        title: 'Execute Automated Backup Audits',
        description: 'Verify continuous disaster recovery replication and immutable offsite archive retention.',
        actionTag: 'Disaster Recovery',
      },
    ],
    systemOutcome: 'Achieves SOC 2 Type II, HIPAA, and GDPR security posture with 99.99% operational platform uptime.',
  },
];

export const FUTURE_TECH_ROADMAP: FutureTechCapability[] = [
  {
    id: 'alphafold',
    category: 'AI & Biotechnology',
    title: 'Protein Structure Prediction & Molecular Docking',
    description: 'Direct integration with AlphaFold and ESMFold algorithms to predict 3D protein conformation and simulate small molecule binding affinity in silico before wet lab synthesis.',
    readinessBadge: 'Phase 2 Pilot',
    bulletPoints: [
      'In silico target binding affinity simulations',
      'PDB 3D structure viewer with residue mutation modeling',
      'Accelerated drug hit identification for novel oncology targets',
    ],
  },
  {
    id: 'digital-twin',
    category: 'Advanced Laboratory Features',
    title: 'Digital Twin Laboratory Models & Smart IoT',
    description: 'Full 3D digital twin replica of wet lab facilities. Real-time telemetry maps air exchanges, hood face velocities, freezer temperatures, and robotic arm statuses.',
    readinessBadge: 'Development',
    bulletPoints: [
      'Spatial 3D lab map with real-time instrument occupancy',
      'Predictive component failure alarms for vacuum pumps and chillers',
      'Robotic workcell coordination via open SiLA 2 protocols',
    ],
  },
  {
    id: 'genomic-engine',
    category: 'AI & Biotechnology',
    title: 'Variant Annotation & CRISPR sgRNA Off-Target Scorer',
    description: 'Deep learning engine for instant clinical genomic variant pathogenicity scoring and off-target cleavage probability prediction for CRISPR/Cas9 guide RNAs.',
    readinessBadge: 'Phase 2 Pilot',
    bulletPoints: [
      'ClinVar and COSMIC database automated cross-referencing',
      'Cas-OFFinder computational heuristics in web interface',
      'Single-cell RNA-seq trajectory inference workflows',
    ],
  },
  {
    id: 'research-network',
    category: 'Research Ecosystem',
    title: 'Global Research Marketplace & Scientific Knowledge Graph',
    description: 'Cross-institutional marketplace for sharing rare specimen aliquots, reserving specialized synchrotrons, and trading verified assay validation protocols.',
    readinessBadge: 'Vision Roadmap',
    bulletPoints: [
      'Federated privacy-preserving research consortium queries',
      'Tokenized scientific contribution attribution',
      'Automated grant matching with international funding agencies',
    ],
  },
];

export const ARCHITECTURE_INTEGRATIONS = [
  {
    category: 'Liquid Handlers & Automation',
    items: ['Tecan Fluent & EVO', 'Hamilton Microlab STAR & Vantage', 'Beckman Coulter Biomek', 'Eppendorf epMotion'],
    tag: 'Direct Runfile Export',
  },
  {
    category: 'Next-Gen Sequencers & Analyzers',
    items: ['Illumina NovaSeq & NextSeq', 'Oxford Nanopore PromethION', 'Thermo Fisher Orbitrap MS', 'BD FACSCanto Flow Cytometer'],
    tag: 'Automated Ingestion',
  },
  {
    category: 'Enterprise Identity & Cloud',
    items: ['Microsoft Azure AD / Entra', 'InCommon / eduGAIN SSO', 'AWS Life Sciences / S3', 'Google Cloud Healthcare API'],
    tag: 'Native Connectors',
  },
  {
    category: 'Standards & Protocols',
    items: ['FDA 21 CFR Part 11', 'ISO 17025 & ISO 9001', 'SiLA 2 Lab Automation', 'HL7 FHIR & MedDRA'],
    tag: 'Built-in Compliance',
  },
];
