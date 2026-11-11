export type UserRoleId =
  | 'research-scientist'
  | 'lab-technician'
  | 'clinical-coordinator'
  | 'biotech-admin'
  | 'compliance-officer'
  | 'system-admin';

export type AppRoute =
  | 'app-scientist'
  | 'app-technician'
  | 'app-clinical'
  | 'app-biotech-admin'
  | 'app-compliance'
  | 'app-system-admin';

export interface DashboardSession {
  userName: string;
  email: string;
  roleId: UserRoleId;
  roleTitle: string;
  organization: string;
  department: string;
  mfaVerified: boolean;
  orcidId?: string;
  scopusId?: string;
  pubmedAffiliation?: string;
  degrees?: string;
  expertiseTags?: string[];
  bio?: string;
  hIndex?: number;
  citationCount?: number;
  linkedSsoProviders?: string[];
}

export interface RoleNavItem {
  id: string;
  label: string;
  moduleRef: string;
}

export interface RoleConfig {
  roleId: UserRoleId;
  roleTitle: string;
  shortLabel: string;
  defaultPersonName: string;
  defaultEmail: string;
  department: string;
  organization: string;
  routeKey: AppRoute;
  routePath: string;
  accentColor: string;
  bgTint: string;
  flowSummary: string;
  permittedModules: string[];
  navItems: RoleNavItem[];
}

export interface ProjectMilestone {
  id: string;
  title: string;
  dueDate: string;
  startWeek: number;
  durationWeeks: number;
  completed: boolean;
  dependsOn?: string;
  dependencyType?: 'FS' | 'SS';
}

export interface ResearchProjectItem {
  id: string;
  title: string;
  leadPi: string;
  grantCode: string;
  milestoneProgress: number;
  status: 'Active' | 'In Review' | 'Completed' | 'At Risk';
  targetDate: string;
  hypothesis?: string;
  charter?: string;
  teamMembers?: string[];
  milestones?: ProjectMilestone[];
  budgetAllocatedUsd?: number;
  budgetSpentUsd?: number;
  reagentBurnMonthlyUsd?: number;
  instrumentHoursUsed?: number;
}

export interface ElnStepItem {
  id: string;
  label: string;
  targetNote: string;
  completed: boolean;
  stampedBy?: string;
}

export interface ElnAttachment {
  id: string;
  name: string;
  fileType: 'Gel Image' | 'Microscopy TIFF' | 'Plate CSV' | 'Spectra PDF';
  size: string;
  uploadedAt: string;
}

export interface ElnAuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: 'CREATE' | 'UPDATE' | 'SIGN' | 'SAMPLE_REQUEST';
  summary: string;
  hash: string;
}

export interface ExperimentRun {
  id: string;
  projectId: string;
  protocolName: string;
  stage: 'Draft' | 'In Review' | 'In Progress' | 'Blocked' | 'Completed' | 'Archived';
  sampleCount: number;
  updatedAt: string;
  sopVersion?: string;
  plateId?: string;
  linkedSampleIds?: string[];
  steps?: ElnStepItem[];
  observationNotes?: string;
  latexFormula?: string;
  smilesNotation?: string;
  pdbTargetId?: string;
  attachments?: ElnAttachment[];
  auditTrail?: ElnAuditEntry[];
}

export interface AiInsightItem {
  id: string;
  category: 'Literature' | 'Hypothesis' | 'Drug Target' | 'Gap Alert';
  title: string;
  summary: string;
  sourceRef: string;
  doi?: string;
  sourcePlatform?: 'PubMed Central' | 'bioRxiv' | 'medRxiv' | 'IEEE Life Sciences' | 'Internal ELN';
  relevanceScore?: number;
  targetLigandNote?: string;
  patentAlert?: string;
}

export interface PublicationRecord {
  id: string;
  title: string;
  journalOrPatent: string;
  status: 'Drafting' | 'Internal IP Sign-Off' | 'Peer Review' | 'Submitted' | 'Patent Filed';
  owners: string;
  type?: 'Manuscript' | 'Patent';
  doi?: string;
  inventorSplits?: string;
  filingDeadline?: string;
  patentOffice?: 'USPTO' | 'EPO' | 'WIPO';
  citations?: number;
  altmetricScore?: number;
  priorArtNotes?: string;
}

export interface DatasetVersionEntry {
  version: string;
  date: string;
  author: string;
  diffSummary: string;
}

export interface BioDatasetRecord {
  id: string;
  name: string;
  format: 'FASTQ' | 'BAM' | 'VCF' | 'DICOM' | 'TIFF' | 'FCS' | 'PDB' | 'CSV' | 'HDF5' | 'AnnData';
  version: string;
  size: string;
  qc: 'Pass' | 'In Review' | 'Flagged';
  ontologyTags: string[];
  sequencePreview?: string;
  restrictionSites?: string[];
  versions: DatasetVersionEntry[];
}

export interface SampleTestRequest {
  id: string;
  experimentId: string;
  sampleId: string;
  sampleName: string;
  assayType: string;
  aliquotUl: number;
  priority: 'Standard' | 'STAT';
  status: 'Queued' | 'In Lab' | 'Completed';
  requestedAt: string;
}

export interface CollaborationReply {
  id: string;
  author: string;
  time: string;
  text: string;
}

export interface CollaborationMessage {
  id: string;
  channel: '#kras-crispr-screen' | '#scrna-tumor-atlas' | '#cross-lab-handoffs';
  author: string;
  role: string;
  time: string;
  text: string;
  attachmentBadge?: string;
  reactions: { emoji: string; count: number }[];
  replies: CollaborationReply[];
}

export interface LabAssayStep {
  id: string;
  label: string;
  tolerance: string;
  measuredValue: string;
  completed: boolean;
}

export interface LabTestTask {
  id: string;
  sampleId: string;
  assayType: string;
  instrument: string;
  priority: 'Standard' | 'STAT';
  status: 'Queued' | 'Running' | 'Completed';
  assayCategory?: 'PCR' | 'NGS' | 'Western Blot' | 'Flow Cytometry' | 'ELISA' | 'Mass Spectrometry';
  steps?: LabAssayStep[];
  deviationFlagged?: boolean;
  deviationNotes?: string;
  uploadedResultFile?: string;
  rawMetrics?: {
    q30Pct?: number;
    rinScore?: number;
    ctValue?: number;
    od450?: number;
  };
  signedBy?: string;
}

export interface SampleCustodyEvent {
  id: string;
  sampleId: string;
  timestamp: string;
  actor: string;
  action: 'ACCESSION' | 'CHECK_OUT' | 'RETURN' | 'ALIQUOT' | 'QUARANTINE' | 'DISPOSE';
  purpose: string;
  volumeConsumedUl: number;
  freezeThawAfter: number;
  location: string;
}

export interface EquipmentBooking {
  id: string;
  equipmentId: string;
  operator: string;
  date: string;
  startHour: number;
  endHour: number;
  priority: 'Trial / STAT' | 'Standard';
  purpose: string;
}

export interface MaintenanceLogEntry {
  id: string;
  equipmentId: string;
  type: 'Calibration' | 'Preventive Maintenance' | 'Cleaning';
  performedBy: string;
  date: string;
  driftNote: string;
  passed: boolean;
}

export interface ClinicalCohortArm {
  name: string;
  ratio: string;
  enrolled: number;
}

export interface ClinicalTrialItem {
  id: string;
  title: string;
  phase: 'Phase I' | 'Phase II' | 'Phase III' | 'Phase IV' | 'Observational' | 'Retrospective';
  enrolled: number;
  target: number;
  status: 'Recruiting' | 'Active' | 'IRB Review';
  blindingMode?: 'Double-Blind' | 'Single-Blind' | 'Open-Label';
  cohortArms?: ClinicalCohortArm[];
  inclusionCriteria?: string[];
  exclusionCriteria?: string[];
  unblindingAudit?: string;
}

export interface ParticipantVisit {
  id: string;
  label: string;
  scheduledDate: string;
  status: 'Completed' | 'Scheduled' | 'Missed';
}

export interface DosageLogEntry {
  id: string;
  dose: string;
  administeredAt: string;
  administeredBy: string;
}

export interface ClinicalParticipant {
  subjectCode: string;
  trialId: string;
  arm: string;
  visitWindow: string;
  consentStatus: 'Approved' | 'Pending';
  consentTimestamp?: string;
  consentSignedBy?: string;
  vialId: string;
  reminderEnabled: boolean;
  visits: ParticipantVisit[];
  dosageLogs: DosageLogEntry[];
}

export interface ClinicalBiospecimen {
  vialId: string;
  subjectCode: string;
  trialId: string;
  specimenType: 'Whole Blood' | 'Plasma / Serum' | 'FFPE Tissue' | 'cfDNA' | 'PBMC';
  volumeMl: number;
  storageLocation: string;
  custodyStatus: 'Available' | 'In Use' | 'In Transit';
  clinicalAttachment?: string;
  lastUpdatedBy: string;
}

export interface AdverseEventItem {
  id: string;
  trialId: string;
  subjectCode: string;
  term: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  reportedAt: string;
  meddraCode?: string;
  isSae?: boolean;
  blindedNotes?: string;
  regulatoryDraftStatus?: 'Not Required' | '24h Draft Ready' | 'Submitted to IRB';
  statutoryDeadline?: string;
}

export interface ClinicalTeamNote {
  id: string;
  author: string;
  role: string;
  time: string;
  trialRef: string;
  text: string;
}

export interface BudgetAllocation {
  department: string;
  allocatedUsd: number;
  spentUsd: number;
  grantCode: string;
  reagentBurnUsd?: number;
  instrumentHoursBilled?: number;
}

export interface PurchaseRequisition {
  id: string;
  vendor: string;
  itemDescription: string;
  department: string;
  grantCode: string;
  amountUsd: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  requestedBy: string;
}

export interface EquipmentUtilizationMetric {
  equipmentId: string;
  name: string;
  utilizationPct: number;
  activeHours: number;
  idleHours: number;
  tatHours: number;
}

export interface CapaDeviationItem {
  id: string;
  source: string;
  category: 'OOS Assay' | 'Calibration Drift' | 'SOP Deviation' | 'Trial Query';
  severity: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'Under Review' | 'Closed';
  rootCause?: string;
  preventiveAction?: string;
  owner?: string;
  dueDate?: string;
  isOosInvestigation?: boolean;
  closedSignatureHash?: string;
}

export interface SopDocumentItem {
  id: string;
  code: string;
  title: string;
  version: string;
  framework: 'FDA 21 CFR Part 11' | 'GMP' | 'ISO 17025';
  reviewDue: string;
  attestedCount?: number;
  totalStaff?: number;
  effectiveDate?: string;
  revisionNotes?: string;
}

export interface PendingSignOffItem {
  id: string;
  recordTitle: string;
  submittedBy: string;
  framework: string;
  submittedAt: string;
  status?: 'Pending' | 'Rejected';
  rejectionReason?: string;
}

export interface OrgUserRecord {
  id: string;
  name: string;
  email: string;
  roleId: UserRoleId;
  organization: string;
  mfaEnabled: boolean;
  status: 'Active' | 'Suspended';
}

export interface SystemServiceHealth {
  id: string;
  service: string;
  status: 'Operational' | 'Degraded';
  uptime: string;
  latencyMs: number;
}

export interface OrganizationRecord {
  id: string;
  name: string;
  tier: 'Academic & Research' | 'Growth Biotech' | 'Enterprise Biopharma';
  region: string;
  seatsUsed: number;
  seatsLimit: number;
  status: 'Active' | 'Suspended';
}

export interface SsoProviderRecord {
  id: string;
  name: string;
  protocol: 'SAML 2.0' | 'OIDC' | 'ORCID / eduGAIN';
  domain: string;
  enabled: boolean;
}

export interface IotGatewayRecord {
  id: string;
  name: string;
  protocol: 'MQTT' | 'HTTPS' | 'HL7';
  location: string;
  metric: string;
  status: 'Operational' | 'Maintenance';
}

export interface SystemEventLog {
  id: string;
  timestamp: string;
  actor: string;
  category: 'USER' | 'ORG' | 'SECURITY' | 'IOT' | 'BILLING';
  message: string;
}
