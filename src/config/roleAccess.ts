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
      { id: 'overview', label: 'Overview', moduleRef: '2.11' },
      { id: 'projects', label: 'Research Projects', moduleRef: '2.2' },
      { id: 'eln', label: 'Lab Notebook (ELN)', moduleRef: '2.2' },
      { id: 'datasets', label: 'Biological Data', moduleRef: '2.4' },
      { id: 'ai-engine', label: 'AI Assistant', moduleRef: '2.5' },
      { id: 'collaboration', label: 'Team Workspace', moduleRef: '2.8' },
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
      { id: 'sample-queue', label: 'Sample Registry', moduleRef: '2.3' },
      { id: 'plate-runs', label: '96-Well Assays', moduleRef: '2.3' },
      { id: 'cryo-storage', label: 'Cryo Storage', moduleRef: '2.3' },
      { id: 'results-upload', label: 'Test Results', moduleRef: '2.4' },
      { id: 'equipment', label: 'Lab Equipment', moduleRef: '2.6' },
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
      { id: 'trials', label: 'Clinical Trials', moduleRef: '2.7' },
      { id: 'participants', label: 'Participants', moduleRef: '2.7' },
      { id: 'biospecimens', label: 'Biospecimens', moduleRef: '2.3' },
      { id: 'adverse-events', label: 'Adverse Events', moduleRef: '2.7' },
      { id: 'regulatory-exports', label: 'Regulatory Reports', moduleRef: '2.10' },
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
      { id: 'executive-bi', label: 'Executive Overview', moduleRef: '2.11' },
      { id: 'portfolio', label: 'Research Projects', moduleRef: '2.2' },
      { id: 'funding', label: 'Grants & Budgets', moduleRef: '2.2' },
      { id: 'lab-utilization', label: 'Lab Equipment', moduleRef: '2.6' },
      { id: 'teams-ip', label: 'Teams & IP Records', moduleRef: '2.9' },
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
      { id: 'esign-queue', label: 'E-Signatures', moduleRef: '2.10' },
      { id: 'audit-trail', label: 'Audit Trail', moduleRef: '2.3' },
      { id: 'sop-control', label: 'SOP Documents', moduleRef: '2.10' },
      { id: 'capa-deviations', label: 'CAPA & Deviations', moduleRef: '2.6' },
      { id: 'reg-reports', label: 'Regulatory Reports', moduleRef: '2.10' },
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
      { id: 'overview', label: 'System Overview', moduleRef: '2.12' },
      { id: 'users', label: 'Users & Roles', moduleRef: '2.12' },
      { id: 'organizations', label: 'Organizations', moduleRef: '2.1' },
      { id: 'security', label: 'Security & SSO', moduleRef: '2.1' },
      { id: 'iot-devices', label: 'IoT & Infrastructure', moduleRef: '2.6' },
      { id: 'billing', label: 'Billing & System Logs', moduleRef: '2.12' },
    ],
  },
};

export const ROLE_LIST: RoleConfig[] = Object.values(ROLE_CONFIGS);

export const getRoleConfig = (roleId: UserRoleId): RoleConfig =>
  ROLE_CONFIGS[roleId];

export const getRoleByAppRoute = (route: AppRoute): RoleConfig | undefined =>
  ROLE_LIST.find((cfg) => cfg.routeKey === route);

export const getUserInitials = (name: string): string => {
  const cleaned = name
    .split(',')[0]
    .replace(/\b(Dr|Prof|Mr|Mrs|Ms)\.?\s+/gi, '')
    .trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'GB';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

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
