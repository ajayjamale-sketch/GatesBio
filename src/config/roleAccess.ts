import type { AppRoute, DashboardSession, RoleConfig, UserRoleId } from '../types/dashboard';

export const ROLE_CONFIGS: Record<UserRoleId, RoleConfig> = {
  'research-scientist': {
    roleId: 'research-scientist',
    roleTitle: 'Research Scientist (PI)',
    shortLabel: 'Research Scientist',
    defaultPersonName: 'Dr. Elena Vance, Ph.D.',
    defaultEmail: 'e.vance@gatsbio.org',
    department: 'Functional Genomics',
    organization: 'Vanguard Biotherapeutics',
    routeKey: 'app-scientist',
    routePath: '/app/scientist',
    accentColor: '#1E40AF',
    bgTint: '#EFF6FF',
    flowSummary: 'Create Research Project → Conduct Experiments → Analyze Results → Collaborate → Publish Findings',
    permittedModules: ['2.1', '2.2', '2.3', '2.4', '2.5', '2.8', '2.9', '2.11'],
    navItems: [
      { id: 'overview', label: 'Research Overview', moduleRef: '2.11' },
      { id: 'projects', label: 'Projects & Milestones', moduleRef: '2.2' },
      { id: 'eln', label: 'ELN & Experiments', moduleRef: '2.2' },
      { id: 'datasets', label: 'Biological Data Lake', moduleRef: '2.4' },
      { id: 'ai-engine', label: 'AI Literature Engine', moduleRef: '2.5' },
      { id: 'collaboration', label: 'Team Workspaces', moduleRef: '2.8' },
      { id: 'publications', label: 'Publications & IP', moduleRef: '2.9' },
    ],
  },
  'lab-technician': {
    roleId: 'lab-technician',
    roleTitle: 'Laboratory Technician',
    shortLabel: 'Lab Technician',
    defaultPersonName: 'Marcus Chen',
    defaultEmail: 'm.chen@gatsbio.org',
    department: 'Cellular Pharmacology & LIMS',
    organization: 'Vanguard Biotherapeutics',
    routeKey: 'app-technician',
    routePath: '/app/technician',
    accentColor: '#0F766E',
    bgTint: '#F0FDFA',
    flowSummary: 'Register Samples → Conduct Tests → Upload Results → Maintain Equipment Records',
    permittedModules: ['2.1', '2.2', '2.3', '2.4', '2.6'],
    navItems: [
      { id: 'sample-queue', label: 'Sample Accessioning', moduleRef: '2.3' },
      { id: 'plate-runs', label: '96-Well Test Queue', moduleRef: '2.3' },
      { id: 'cryo-storage', label: 'Cryo & Chain of Custody', moduleRef: '2.3' },
      { id: 'results-upload', label: 'Raw Result Upload', moduleRef: '2.4' },
      { id: 'equipment', label: 'Equipment & Calibration', moduleRef: '2.6' },
    ],
  },
  'clinical-coordinator': {
    roleId: 'clinical-coordinator',
    roleTitle: 'Clinical Research Coordinator',
    shortLabel: 'Clinical Coordinator',
    defaultPersonName: 'Dr. Priya Nair',
    defaultEmail: 'p.nair@gatsbio.org',
    department: 'Clinical Operations (GCP)',
    organization: 'Vanguard Clinical Network',
    routeKey: 'app-clinical',
    routePath: '/app/clinical',
    accentColor: '#7E22CE',
    bgTint: '#FAF5FF',
    flowSummary: 'Create Trial → Recruit Participants → Monitor Trial Progress → Generate Compliance Reports',
    permittedModules: ['2.1', '2.3', '2.4', '2.7', '2.8', '2.10'],
    navItems: [
      { id: 'trials', label: 'Active Clinical Trials', moduleRef: '2.7' },
      { id: 'participants', label: 'Recruitment & Consents', moduleRef: '2.7' },
      { id: 'biospecimens', label: 'Blinded Biospecimens', moduleRef: '2.3' },
      { id: 'adverse-events', label: 'Adverse Event Log', moduleRef: '2.7' },
      { id: 'regulatory-exports', label: 'Regulatory Packages', moduleRef: '2.10' },
    ],
  },
  'biotech-admin': {
    roleId: 'biotech-admin',
    roleTitle: 'Biotech Company Administrator',
    shortLabel: 'Biotech Admin',
    defaultPersonName: 'Sarah Jenkins, MBA',
    defaultEmail: 's.jenkins@gatsbio.org',
    department: 'R&D Operations & Finance',
    organization: 'Vanguard Biotherapeutics',
    routeKey: 'app-biotech-admin',
    routePath: '/app/biotech-admin',
    accentColor: '#0284C7',
    bgTint: '#F0F9FF',
    flowSummary: 'Manage Research Teams → Monitor Projects → Track Funding → Review Analytics → Ensure Compliance',
    permittedModules: ['2.1', '2.2', '2.6', '2.9', '2.10', '2.11', '2.12'],
    navItems: [
      { id: 'executive-bi', label: 'Executive Analytics', moduleRef: '2.11' },
      { id: 'portfolio', label: 'Portfolio & Milestones', moduleRef: '2.2' },
      { id: 'funding', label: 'Grant & Budget Burn', moduleRef: '2.2' },
      { id: 'lab-utilization', label: 'Lab Utilization', moduleRef: '2.6' },
      { id: 'teams-ip', label: 'Teams, IP & Compliance', moduleRef: '2.9' },
    ],
  },
  'compliance-officer': {
    roleId: 'compliance-officer',
    roleTitle: 'Regulatory & Compliance Officer',
    shortLabel: 'Compliance Officer',
    defaultPersonName: 'David Ross, RAC',
    defaultEmail: 'd.ross@gatsbio.org',
    department: 'Quality Assurance & Regulatory',
    organization: 'Vanguard Biotherapeutics',
    routeKey: 'app-compliance',
    routePath: '/app/compliance',
    accentColor: '#10B981',
    bgTint: '#ECFDF5',
    flowSummary: 'Review Documentation → Audit Processes → Monitor Compliance → Generate Regulatory Reports',
    permittedModules: ['2.1', '2.3', '2.4', '2.7', '2.9', '2.10', '2.11'],
    navItems: [
      { id: 'esign-queue', label: '21 CFR Sign-Off Queue', moduleRef: '2.10' },
      { id: 'audit-trail', label: 'Immutable Audit Trail', moduleRef: '2.3' },
      { id: 'sop-control', label: 'SOP & Doc Control', moduleRef: '2.10' },
      { id: 'capa-deviations', label: 'CAPA & Calibrations', moduleRef: '2.6' },
      { id: 'reg-reports', label: 'FDA / ISO Reports', moduleRef: '2.10' },
    ],
  },
  'system-admin': {
    roleId: 'system-admin',
    roleTitle: 'System Administrator',
    shortLabel: 'System Admin',
    defaultPersonName: 'Alex Rivera',
    defaultEmail: 'a.rivera@gatsbio.org',
    department: 'Platform Security & Cloud Ops',
    organization: 'GatsBio Enterprise Tenant',
    routeKey: 'app-system-admin',
    routePath: '/app/system-admin',
    accentColor: '#334155',
    bgTint: '#F1F5F9',
    flowSummary: 'Manage Users → Configure Security → Monitor Infrastructure → Maintain Platform Operations',
    permittedModules: ['2.1', '2.4', '2.6', '2.10', '2.12'],
    navItems: [
      { id: 'users-rbac', label: 'Users & RBAC Policies', moduleRef: '2.12' },
      { id: 'security-sso', label: 'SSO, 2FA & Security', moduleRef: '2.1' },
      { id: 'infrastructure', label: 'Data Lake & Infrastructure', moduleRef: '2.4' },
      { id: 'iot-gateways', label: 'IoT Device Gateways', moduleRef: '2.6' },
      { id: 'subscriptions', label: 'Subscriptions & Logs', moduleRef: '2.12' },
    ],
  },
};

export const ROLE_LIST: RoleConfig[] = Object.values(ROLE_CONFIGS);

export const getRoleConfig = (roleId: UserRoleId): RoleConfig =>
  ROLE_CONFIGS[roleId];

export const getRoleByAppRoute = (route: AppRoute): RoleConfig | undefined =>
  ROLE_LIST.find((cfg) => cfg.routeKey === route);

export const createDefaultSessionForRole = (
  roleId: UserRoleId,
  overrides?: Partial<Pick<DashboardSession, 'userName' | 'email' | 'organization'>>
): DashboardSession => {
  const cfg = ROLE_CONFIGS[roleId];
  return {
    userName: overrides?.userName || cfg.defaultPersonName,
    email: overrides?.email || cfg.defaultEmail,
    roleId: cfg.roleId,
    roleTitle: cfg.roleTitle,
    organization: overrides?.organization || cfg.organization,
    department: cfg.department,
    mfaVerified: true,
  };
};
