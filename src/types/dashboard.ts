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

export interface ResearchProjectItem {
  id: string;
  title: string;
  leadPi: string;
  grantCode: string;
  milestoneProgress: number;
  status: 'Active' | 'In Review' | 'Completed' | 'At Risk';
  targetDate: string;
}

export interface ExperimentRun {
  id: string;
  projectId: string;
  protocolName: string;
  stage: 'Draft' | 'In Progress' | 'Completed';
  sampleCount: number;
  updatedAt: string;
}

export interface AiInsightItem {
  id: string;
  category: 'Literature' | 'Hypothesis' | 'Drug Target' | 'Gap Alert';
  title: string;
  summary: string;
  sourceRef: string;
}

export interface PublicationRecord {
  id: string;
  title: string;
  journalOrPatent: string;
  status: 'Drafting' | 'Peer Review' | 'Submitted' | 'Patent Filed';
  owners: string;
}

export interface LabTestTask {
  id: string;
  sampleId: string;
  assayType: string;
  instrument: string;
  priority: 'Standard' | 'STAT';
  status: 'Queued' | 'Running' | 'Completed';
}

export interface ClinicalTrialItem {
  id: string;
  title: string;
  phase: 'Phase I' | 'Phase II' | 'Phase III' | 'Observational';
  enrolled: number;
  target: number;
  status: 'Recruiting' | 'Active' | 'IRB Review';
}

export interface AdverseEventItem {
  id: string;
  trialId: string;
  subjectCode: string;
  term: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  reportedAt: string;
}

export interface BudgetAllocation {
  department: string;
  allocatedUsd: number;
  spentUsd: number;
  grantCode: string;
}

export interface CapaDeviationItem {
  id: string;
  source: string;
  category: 'OOS Assay' | 'Calibration Drift' | 'SOP Deviation' | 'Trial Query';
  severity: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'Under Review' | 'Closed';
}

export interface SopDocumentItem {
  id: string;
  code: string;
  title: string;
  version: string;
  framework: 'FDA 21 CFR Part 11' | 'GMP' | 'ISO 17025';
  reviewDue: string;
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
