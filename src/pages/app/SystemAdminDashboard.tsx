import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Select,
  MenuItem,
  Switch,
  Chip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SecurityIcon from '@mui/icons-material/Security';
import StorageIcon from '@mui/icons-material/Storage';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import BusinessIcon from '@mui/icons-material/Business';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from 'recharts';
import { ROLE_LIST } from '../../config/roleAccess';
import {
  INITIAL_ORG_USERS,
  INITIAL_ORGANIZATIONS,
  INITIAL_SSO_PROVIDERS,
  INITIAL_IOT_GATEWAYS,
  INITIAL_SYSTEM_LOGS,
  SYSTEM_SERVICES_HEALTH,
  INFRA_TRAFFIC_SERIES,
} from '../../data/roleDashboardData';
import type {
  DashboardSession,
  IotGatewayRecord,
  OrganizationRecord,
  OrgUserRecord,
  SsoProviderRecord,
  SystemEventLog,
  UserRoleId,
} from '../../types/dashboard';
import { KpiStatCard } from '../../components/app/shared/KpiStatCard';
import { DashboardSectionHeader } from '../../components/app/shared/DashboardSectionHeader';
import { StatusChip } from '../../components/app/shared/StatusChip';
import { WorkstationSplitView } from '../../components/app/shared/WorkstationSplitView';

interface SystemAdminDashboardProps {
  session: DashboardSession;
  activeNavId: string;
  searchQuery: string;
  onSelectNav: (navId: string) => void;
  onNotify: (msg: string) => void;
}

export const SystemAdminDashboard: React.FC<SystemAdminDashboardProps> = ({
  session,
  activeNavId,
  searchQuery,
  onSelectNav,
  onNotify,
}) => {
  // Core CRUD states
  const [users, setUsers] = useState<OrgUserRecord[]>(INITIAL_ORG_USERS);
  const [organizations, setOrganizations] = useState<OrganizationRecord[]>(INITIAL_ORGANIZATIONS);
  const [ssoProviders, setSsoProviders] = useState<SsoProviderRecord[]>(INITIAL_SSO_PROVIDERS);
  const [iotGateways, setIotGateways] = useState<IotGatewayRecord[]>(INITIAL_IOT_GATEWAYS);
  const [systemLogs, setSystemLogs] = useState<SystemEventLog[]>(INITIAL_SYSTEM_LOGS);

  const [policies, setPolicies] = useState({
    ssoEnforced: true,
    fido2Required: true,
    sessionTimeout15m: true,
    byokRotation: true,
  });

  // Billing state
  const [billingPlan, setBillingPlan] = useState<'Academic & Research' | 'Growth Biotech' | 'Enterprise Biopharma'>('Enterprise Biopharma');
  const [seatQuota, setSeatQuota] = useState<number>(50);
  const [annualBilling, setAnnualBilling] = useState<boolean>(true);

  // Filters
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | UserRoleId>('all');
  const [logCategoryFilter, setLogCategoryFilter] = useState<'ALL' | SystemEventLog['category']>('ALL');

  // User Modal (Create / Edit)
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<OrgUserRecord | null>(null);
  const [userForm, setUserForm] = useState<{
    name: string;
    email: string;
    roleId: UserRoleId;
    organization: string;
    mfaEnabled: boolean;
  }>({
    name: '',
    email: '',
    roleId: 'research-scientist',
    organization: INITIAL_ORGANIZATIONS[0].name,
    mfaEnabled: true,
  });

  // Organization Modal (Create / Edit)
  const [orgModalOpen, setOrgModalOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState<OrganizationRecord | null>(null);
  const [orgForm, setOrgForm] = useState<{
    name: string;
    tier: OrganizationRecord['tier'];
    region: string;
    seatsLimit: string;
  }>({
    name: '',
    tier: 'Growth Biotech',
    region: 'us-east-1 (Boston)',
    seatsLimit: '25',
  });

  // SSO Provider Modal (Create / Edit)
  const [ssoModalOpen, setSsoModalOpen] = useState(false);
  const [editingSso, setEditingSso] = useState<SsoProviderRecord | null>(null);
  const [ssoForm, setSsoForm] = useState<{
    name: string;
    protocol: SsoProviderRecord['protocol'];
    domain: string;
  }>({
    name: '',
    protocol: 'SAML 2.0',
    domain: '',
  });

  // IoT Gateway Modal (Create / Edit)
  const [iotModalOpen, setIotModalOpen] = useState(false);
  const [editingIot, setEditingIot] = useState<IotGatewayRecord | null>(null);
  const [iotForm, setIotForm] = useState<{
    name: string;
    protocol: IotGatewayRecord['protocol'];
    location: string;
    metric: string;
  }>({
    name: '',
    protocol: 'MQTT',
    location: '',
    metric: 'Nominal · 0 alerts',
  });

  const appendLog = (category: SystemEventLog['category'], message: string) => {
    const entry: SystemEventLog = {
      id: `SYS-${1004 + systemLogs.length}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
      actor: session.userName,
      category,
      message,
    };
    setSystemLogs((prev) => [entry, ...prev]);
  };

  // --- USER CRUD ---
  const openCreateUser = () => {
    setEditingUser(null);
    setUserForm({
      name: '',
      email: '',
      roleId: 'research-scientist',
      organization: organizations[0]?.name || session.organization,
      mfaEnabled: true,
    });
    setUserModalOpen(true);
  };

  const openEditUser = (u: OrgUserRecord) => {
    setEditingUser(u);
    setUserForm({
      name: u.name,
      email: u.email,
      roleId: u.roleId,
      organization: u.organization,
      mfaEnabled: u.mfaEnabled,
    });
    setUserModalOpen(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.name.trim() || !userForm.email.trim()) return;
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                name: userForm.name.trim(),
                email: userForm.email.trim(),
                roleId: userForm.roleId,
                organization: userForm.organization,
                mfaEnabled: userForm.mfaEnabled,
              }
            : u
        )
      );
      appendLog('USER', `Updated user ${userForm.name.trim()} (${userForm.roleId}).`);
      onNotify(`Updated user ${userForm.name.trim()}.`);
    } else {
      const created: OrgUserRecord = {
        id: `USR-${10 + users.length}`,
        name: userForm.name.trim(),
        email: userForm.email.trim(),
        roleId: userForm.roleId,
        organization: userForm.organization,
        mfaEnabled: userForm.mfaEnabled,
        status: 'Active',
      };
      setUsers((prev) => [created, ...prev]);
      appendLog('USER', `Created user ${created.name} (${created.roleId}).`);
      onNotify(`Created user ${created.name}.`);
    }
    setUserModalOpen(false);
  };

  const handleDeleteUser = (u: OrgUserRecord) => {
    setUsers((prev) => prev.filter((item) => item.id !== u.id));
    appendLog('USER', `Deleted user account ${u.name} (${u.email}).`);
    onNotify(`Removed user ${u.name}.`);
  };

  const handleRoleChange = (userId: string, roleId: UserRoleId) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, roleId } : u)));
    appendLog('USER', `Changed RBAC role for ${userId} to ${roleId}.`);
    onNotify(`Updated RBAC role for ${userId}.`);
  };

  const handleToggleUserStatus = (u: OrgUserRecord) => {
    const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
    setUsers((prev) =>
      prev.map((item) => (item.id === u.id ? { ...item, status: nextStatus } : item))
    );
    appendLog('USER', `${nextStatus === 'Suspended' ? 'Suspended' : 'Restored'} ${u.name}.`);
    onNotify(`${u.name} is now ${nextStatus}.`);
  };

  // --- ORGANIZATION CRUD ---
  const openCreateOrg = () => {
    setEditingOrg(null);
    setOrgForm({ name: '', tier: 'Growth Biotech', region: 'us-east-1 (Boston)', seatsLimit: '25' });
    setOrgModalOpen(true);
  };

  const openEditOrg = (org: OrganizationRecord) => {
    setEditingOrg(org);
    setOrgForm({
      name: org.name,
      tier: org.tier,
      region: org.region,
      seatsLimit: String(org.seatsLimit),
    });
    setOrgModalOpen(true);
  };

  const handleSaveOrg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgForm.name.trim()) return;
    const limitNum = Math.max(5, Number(orgForm.seatsLimit) || 25);
    if (editingOrg) {
      setOrganizations((prev) =>
        prev.map((o) =>
          o.id === editingOrg.id
            ? { ...o, name: orgForm.name.trim(), tier: orgForm.tier, region: orgForm.region, seatsLimit: limitNum }
            : o
        )
      );
      appendLog('ORG', `Updated organization ${orgForm.name.trim()} (${orgForm.tier}).`);
      onNotify(`Updated organization ${orgForm.name.trim()}.`);
    } else {
      const created: OrganizationRecord = {
        id: `ORG-0${organizations.length + 1}`,
        name: orgForm.name.trim(),
        tier: orgForm.tier,
        region: orgForm.region,
        seatsUsed: 1,
        seatsLimit: limitNum,
        status: 'Active',
      };
      setOrganizations((prev) => [created, ...prev]);
      appendLog('ORG', `Created tenant organization ${created.name} (${created.region}).`);
      onNotify(`Created organization ${created.name}.`);
    }
    setOrgModalOpen(false);
  };

  const handleToggleOrgStatus = (org: OrganizationRecord) => {
    const nextStatus = org.status === 'Active' ? 'Suspended' : 'Active';
    setOrganizations((prev) =>
      prev.map((o) => (o.id === org.id ? { ...o, status: nextStatus } : o))
    );
    appendLog('ORG', `Set ${org.name} status to ${nextStatus}.`);
    onNotify(`${org.name} marked ${nextStatus}.`);
  };

  const handleDeleteOrg = (org: OrganizationRecord) => {
    setOrganizations((prev) => prev.filter((o) => o.id !== org.id));
    appendLog('ORG', `Deleted organization ${org.name}.`);
    onNotify(`Deleted organization ${org.name}.`);
  };

  // --- SSO PROVIDER CRUD ---
  const openCreateSso = () => {
    setEditingSso(null);
    setSsoForm({ name: '', protocol: 'SAML 2.0', domain: '' });
    setSsoModalOpen(true);
  };

  const openEditSso = (prov: SsoProviderRecord) => {
    setEditingSso(prov);
    setSsoForm({ name: prov.name, protocol: prov.protocol, domain: prov.domain });
    setSsoModalOpen(true);
  };

  const handleSaveSso = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ssoForm.name.trim() || !ssoForm.domain.trim()) return;
    if (editingSso) {
      setSsoProviders((prev) =>
        prev.map((p) =>
          p.id === editingSso.id
            ? { ...p, name: ssoForm.name.trim(), protocol: ssoForm.protocol, domain: ssoForm.domain.trim() }
            : p
        )
      );
      appendLog('SECURITY', `Updated SSO provider ${ssoForm.name.trim()}.`);
      onNotify(`Updated SSO provider ${ssoForm.name.trim()}.`);
    } else {
      const created: SsoProviderRecord = {
        id: `SSO-0${ssoProviders.length + 1}`,
        name: ssoForm.name.trim(),
        protocol: ssoForm.protocol,
        domain: ssoForm.domain.trim(),
        enabled: true,
      };
      setSsoProviders((prev) => [created, ...prev]);
      appendLog('SECURITY', `Added SSO provider ${created.name} (${created.protocol}).`);
      onNotify(`Added SSO provider ${created.name}.`);
    }
    setSsoModalOpen(false);
  };

  const handleToggleSso = (prov: SsoProviderRecord) => {
    setSsoProviders((prev) =>
      prev.map((p) => (p.id === prov.id ? { ...p, enabled: !p.enabled } : p))
    );
    appendLog('SECURITY', `${!prov.enabled ? 'Enabled' : 'Disabled'} ${prov.name}.`);
    onNotify(`${prov.name} ${!prov.enabled ? 'enabled' : 'disabled'}.`);
  };

  const handleDeleteSso = (prov: SsoProviderRecord) => {
    setSsoProviders((prev) => prev.filter((p) => p.id !== prov.id));
    appendLog('SECURITY', `Removed SSO provider ${prov.name}.`);
    onNotify(`Removed SSO provider ${prov.name}.`);
  };

  const handleTogglePolicy = (key: keyof typeof policies, label: string) => {
    setPolicies((prev) => {
      const nextVal = !prev[key];
      appendLog('SECURITY', `${label}: ${nextVal ? 'Enabled' : 'Disabled'}.`);
      onNotify(`${label}: ${nextVal ? 'Enabled' : 'Disabled'}.`);
      return { ...prev, [key]: nextVal };
    });
  };

  // --- IOT GATEWAY CRUD ---
  const openCreateIot = () => {
    setEditingIot(null);
    setIotForm({ name: '', protocol: 'MQTT', location: '', metric: 'Nominal · 0 alerts' });
    setIotModalOpen(true);
  };

  const openEditIot = (gw: IotGatewayRecord) => {
    setEditingIot(gw);
    setIotForm({ name: gw.name, protocol: gw.protocol, location: gw.location, metric: gw.metric });
    setIotModalOpen(true);
  };

  const handleSaveIot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!iotForm.name.trim() || !iotForm.location.trim()) return;
    if (editingIot) {
      setIotGateways((prev) =>
        prev.map((g) =>
          g.id === editingIot.id
            ? {
                ...g,
                name: iotForm.name.trim(),
                protocol: iotForm.protocol,
                location: iotForm.location.trim(),
                metric: iotForm.metric.trim(),
              }
            : g
        )
      );
      appendLog('IOT', `Updated IoT gateway ${iotForm.name.trim()}.`);
      onNotify(`Updated IoT gateway ${iotForm.name.trim()}.`);
    } else {
      const created: IotGatewayRecord = {
        id: `IOT-GW-0${iotGateways.length + 1}`,
        name: iotForm.name.trim(),
        protocol: iotForm.protocol,
        location: iotForm.location.trim(),
        metric: iotForm.metric.trim() || 'Online · 0 alerts',
        status: 'Operational',
      };
      setIotGateways((prev) => [created, ...prev]);
      appendLog('IOT', `Registered IoT gateway ${created.name} (${created.protocol}).`);
      onNotify(`Registered IoT gateway ${created.name}.`);
    }
    setIotModalOpen(false);
  };

  const handleToggleIotStatus = (gw: IotGatewayRecord) => {
    const nextStatus = gw.status === 'Operational' ? 'Maintenance' : 'Operational';
    setIotGateways((prev) =>
      prev.map((g) => (g.id === gw.id ? { ...g, status: nextStatus } : g))
    );
    appendLog('IOT', `Set ${gw.name} to ${nextStatus}.`);
    onNotify(`${gw.name} is now ${nextStatus}.`);
  };

  const handleDeleteIot = (gw: IotGatewayRecord) => {
    setIotGateways((prev) => prev.filter((g) => g.id !== gw.id));
    appendLog('IOT', `Decommissioned IoT gateway ${gw.name}.`);
    onNotify(`Removed IoT gateway ${gw.name}.`);
  };

  // --- SEARCH & FILTERS ---
  const q = searchQuery.trim().toLowerCase();
  const filteredUsers = users.filter((u) => {
    const matchesRole = userRoleFilter === 'all' || u.roleId === userRoleFilter;
    if (!matchesRole) return false;
    if (!q) return true;
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.organization.toLowerCase().includes(q)
    );
  });

  const filteredOrgs = organizations.filter(
    (o) => !q || o.name.toLowerCase().includes(q) || o.region.toLowerCase().includes(q) || o.tier.toLowerCase().includes(q)
  );

  const filteredIot = iotGateways.filter(
    (g) => !q || g.name.toLowerCase().includes(q) || g.location.toLowerCase().includes(q) || g.protocol.toLowerCase().includes(q)
  );

  const filteredLogs = systemLogs.filter((l) => {
    const matchesCat = logCategoryFilter === 'ALL' || l.category === logCategoryFilter;
    if (!matchesCat) return false;
    if (!q) return true;
    return l.message.toLowerCase().includes(q) || l.actor.toLowerCase().includes(q);
  });

  const activeUsersCount = users.filter((u) => u.status === 'Active').length;
  const activeOrgsCount = organizations.filter((o) => o.status === 'Active').length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* KPI Row (Always Visible + Clickable Navigation) */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
          gap: 2,
        }}
      >
        <KpiStatCard
          title="Users & Roles"
          value={`${activeUsersCount} / ${users.length}`}
          delta="RBAC Enforced"
          subtitle="Active accounts"
          accentColor="#1E40AF"
          icon={<AdminPanelSettingsIcon sx={{ color: '#1E40AF', fontSize: 20 }} />}
          onClick={() => onSelectNav('users')}
        />
        <KpiStatCard
          title="Organizations"
          value={activeOrgsCount}
          delta={`${organizations.length} Total Tenants`}
          subtitle="Multi-org workspaces"
          accentColor="#0F766E"
          icon={<BusinessIcon sx={{ color: '#0F766E', fontSize: 20 }} />}
          onClick={() => onSelectNav('organizations')}
        />
        <KpiStatCard
          title="Security & SSO"
          value={`${ssoProviders.filter((p) => p.enabled).length} Active`}
          delta={policies.fido2Required ? '2FA Mandatory' : '2FA Optional'}
          subtitle="SAML / OIDC / ORCID"
          accentColor="#10B981"
          icon={<SecurityIcon sx={{ color: '#10B981', fontSize: 20 }} />}
          onClick={() => onSelectNav('security')}
        />
        <KpiStatCard
          title="IoT & Infrastructure"
          value={`${iotGateways.filter((g) => g.status === 'Operational').length}/${iotGateways.length}`}
          delta="99.99% Uptime"
          subtitle="Gateways operational"
          accentColor="#0284C7"
          icon={<DeviceHubIcon sx={{ color: '#0284C7', fontSize: 20 }} />}
          onClick={() => onSelectNav('iot-devices')}
        />
      </Box>

      {/* PAGE 1: SYSTEM OVERVIEW */}
      {activeNavId === 'overview' && (
        <WorkstationSplitView
          primary={
            <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
              <DashboardSectionHeader
                title="Platform Telemetry & Ingestion Volume"
                subtitle="24-hour REST API requests and MQTT laboratory IoT events"
                rightSlot={
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button size="small" variant="outlined" onClick={() => onSelectNav('users')} sx={{ fontWeight: 700 }}>
                      Manage Users
                    </Button>
                    <Button size="small" variant="contained" onClick={openCreateUser} startIcon={<AddIcon />} sx={{ bgcolor: '#1E40AF', fontWeight: 700 }}>
                      Add User
                    </Button>
                  </Box>
                }
              />
              <Box sx={{ width: '100%', height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={INFRA_TRAFFIC_SERIES}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#64748B' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                    <RechartsTooltip />
                    <Area type="monotone" dataKey="iotEvents" name="IoT Events" stroke="#0F766E" fill="#CCFBF1" strokeWidth={2} />
                    <Area type="monotone" dataKey="apiCalls" name="API Requests" stroke="#1E40AF" fill="#DBEAFE" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          }
          inspector={
            <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
              <DashboardSectionHeader title="Core Services Health" subtitle="Live infrastructure status" />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                {SYSTEM_SERVICES_HEALTH.map((srv) => (
                  <Box
                    key={srv.id}
                    sx={{
                      p: 1.25,
                      borderRadius: 2,
                      bgcolor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: '#0F172A', display: 'block' }}>
                        {srv.service}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748B' }}>
                        Uptime {srv.uptime} · {srv.latencyMs}ms
                      </Typography>
                    </Box>
                    <StatusChip label={srv.status} />
                  </Box>
                ))}
              </Box>
            </Paper>
          }
        />
      )}

      {/* PAGE 2: USERS & ROLES (FULL CRUD) */}
      {(activeNavId === 'users' || activeNavId === 'overview') && (
        <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
          <DashboardSectionHeader
            title="Users & Role Access Control"
            subtitle="Create, edit, assign RBAC roles, suspend, or remove user accounts"
            actionLabel="Add User"
            actionIcon={<AddIcon fontSize="small" />}
            onAction={openCreateUser}
            rightSlot={
              <Select
                size="small"
                value={userRoleFilter}
                onChange={(e) => setUserRoleFilter(e.target.value as 'all' | UserRoleId)}
                sx={{ fontSize: '12.5px', fontWeight: 700, height: 34, bgcolor: '#F8FAFC' }}
              >
                <MenuItem value="all">All Roles</MenuItem>
                {ROLE_LIST.map((r) => (
                  <MenuItem key={r.roleId} value={r.roleId}>
                    {r.shortLabel}
                  </MenuItem>
                ))}
              </Select>
            }
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            {filteredUsers.map((user) => (
              <Box
                key={user.id}
                sx={{
                  p: 1.75,
                  borderRadius: 2.5,
                  border: '1px solid #E2E8F0',
                  bgcolor: '#F8FAFC',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Box sx={{ minWidth: 0, flex: { xs: '1 1 100%', sm: '1 1 200px' } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                      {user.name}
                    </Typography>
                    <StatusChip label={user.status} />
                    <Chip
                      label={user.mfaEnabled ? '2FA Active' : 'No 2FA'}
                      size="small"
                      sx={{ height: 20, fontSize: '10.5px', fontWeight: 700, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0' }}
                    />
                  </Box>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 0.25 }}>
                    {user.email} · {user.organization}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <Select
                    size="small"
                    value={user.roleId}
                    onChange={(e) => handleRoleChange(user.id, e.target.value as UserRoleId)}
                    sx={{ fontSize: '12px', fontWeight: 700, bgcolor: '#FFFFFF', height: 32 }}
                  >
                    {ROLE_LIST.map((r) => (
                      <MenuItem key={r.roleId} value={r.roleId} sx={{ fontSize: '12.5px' }}>
                        {r.shortLabel}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleToggleUserStatus(user)}
                    sx={{ borderColor: '#CBD5E1', color: '#334155', fontWeight: 700 }}
                  >
                    {user.status === 'Active' ? 'Suspend' : 'Restore'}
                  </Button>
                  <IconButton size="small" onClick={() => openEditUser(user)} aria-label={`Edit ${user.name}`}>
                    <EditIcon fontSize="small" sx={{ color: '#1E40AF' }} />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteUser(user)} aria-label={`Delete ${user.name}`}>
                    <DeleteOutlineIcon fontSize="small" sx={{ color: '#DC2626' }} />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      )}

      {/* PAGE 3: ORGANIZATIONS (FULL CRUD) */}
      {activeNavId === 'organizations' && (
        <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
          <DashboardSectionHeader
            title="Tenant Organizations & Multi-Org Workspaces"
            subtitle="Provision biotech companies, clinical networks, and academic consortiums"
            actionLabel="New Organization"
            actionIcon={<AddIcon fontSize="small" />}
            onAction={openCreateOrg}
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
            {filteredOrgs.map((org) => {
              const seatPct = Math.min(100, Math.round((org.seatsUsed / Math.max(org.seatsLimit, 1)) * 100));
              return (
                <Box
                  key={org.id}
                  sx={{
                    p: 2.25,
                    borderRadius: 2.5,
                    border: '1px solid #E2E8F0',
                    bgcolor: '#F8FAFC',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 1.5,
                  }}
                >
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: '#0F766E', fontFamily: 'var(--font-mono)' }}>
                        {org.id}
                      </Typography>
                      <StatusChip label={org.status} />
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A' }}>
                      {org.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                      {org.tier} · {org.region}
                    </Typography>

                    <Box sx={{ mt: 1.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>
                          Seat Allocation
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 800 }}>
                          {org.seatsUsed} / {org.seatsLimit}
                        </Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={seatPct} sx={{ height: 6, borderRadius: 3 }} />
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1, borderTop: '1px solid #E2E8F0' }}>
                    <Button size="small" onClick={() => handleToggleOrgStatus(org)} sx={{ fontWeight: 700 }}>
                      {org.status === 'Active' ? 'Suspend' : 'Activate'}
                    </Button>
                    <Box>
                      <IconButton size="small" onClick={() => openEditOrg(org)} aria-label={`Edit ${org.name}`}>
                        <EditIcon fontSize="small" sx={{ color: '#1E40AF' }} />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteOrg(org)} aria-label={`Delete ${org.name}`}>
                        <DeleteOutlineIcon fontSize="small" sx={{ color: '#DC2626' }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Paper>
      )}

      {/* PAGE 4: SECURITY & SSO (FULL CRUD + POLICY TOGGLES) */}
      {activeNavId === 'security' && (
        <WorkstationSplitView
          primary={
            <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
              <DashboardSectionHeader
                title="Federated SSO Identity Providers"
                subtitle="Configure SAML 2.0, OIDC, and academic ORCID/eduGAIN connectors"
                actionLabel="Add SSO Provider"
                actionIcon={<AddIcon fontSize="small" />}
                onAction={openCreateSso}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                {ssoProviders.map((prov) => (
                  <Box
                    key={prov.id}
                    sx={{
                      p: 1.75,
                      borderRadius: 2.5,
                      border: '1px solid #E2E8F0',
                      bgcolor: '#F8FAFC',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 1.5,
                    }}
                  >
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                          {prov.name}
                        </Typography>
                        <Chip label={prov.protocol} size="small" sx={{ height: 20, fontSize: '10.5px', fontWeight: 700 }} />
                      </Box>
                      <Typography variant="caption" sx={{ color: '#64748B' }}>
                        Domain: {prov.domain}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <Switch checked={prov.enabled} onChange={() => handleToggleSso(prov)} color="primary" />
                      <IconButton size="small" onClick={() => openEditSso(prov)} aria-label={`Edit ${prov.name}`}>
                        <EditIcon fontSize="small" sx={{ color: '#1E40AF' }} />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteSso(prov)} aria-label={`Delete ${prov.name}`}>
                        <DeleteOutlineIcon fontSize="small" sx={{ color: '#DC2626' }} />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          }
          inspector={
            <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
              <DashboardSectionHeader title="Authentication & Encryption Policies" subtitle="Tenant-wide security controls" />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                {[
                  { key: 'ssoEnforced' as const, label: 'Enforce Institutional SSO', desc: 'Require SAML / OIDC login' },
                  { key: 'fido2Required' as const, label: 'Mandatory 2FA / FIDO2', desc: 'Required for all users & e-signatures' },
                  { key: 'sessionTimeout15m' as const, label: '15-Min Idle Session Lockout', desc: '21 CFR Part 11 auto-lock' },
                  { key: 'byokRotation' as const, label: 'BYOK KMS 90-Day Rotation', desc: 'AES-256 object encryption' },
                ].map((pol) => (
                  <Box
                    key={pol.key}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      border: '1px solid #E2E8F0',
                      bgcolor: '#F8FAFC',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                        {pol.label}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748B' }}>
                        {pol.desc}
                      </Typography>
                    </Box>
                    <Switch checked={policies[pol.key]} onChange={() => handleTogglePolicy(pol.key, pol.label)} color="primary" />
                  </Box>
                ))}
              </Box>
            </Paper>
          }
        />
      )}

      {/* PAGE 5: IOT & INFRASTRUCTURE (FULL CRUD + TELEMETRY) */}
      {activeNavId === 'iot-devices' && (
        <WorkstationSplitView
          primary={
            <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
              <DashboardSectionHeader
                title="IoT Device Gateways & Storage Nodes"
                subtitle="Register, configure, toggle maintenance mode, or remove lab gateways"
                actionLabel="Register Gateway"
                actionIcon={<AddIcon fontSize="small" />}
                onAction={openCreateIot}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                {filteredIot.map((gw) => (
                  <Box
                    key={gw.id}
                    sx={{
                      p: 1.75,
                      borderRadius: 2.5,
                      border: '1px solid #E2E8F0',
                      bgcolor: '#F8FAFC',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 1.5,
                    }}
                  >
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#0F766E', fontFamily: 'var(--font-mono)' }}>
                          {gw.id} · {gw.protocol}
                        </Typography>
                        <StatusChip label={gw.status} />
                      </Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', mt: 0.25 }}>
                        {gw.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748B' }}>
                        {gw.location} · {gw.metric}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleToggleIotStatus(gw)}
                        sx={{ borderColor: '#CBD5E1', color: '#334155', fontWeight: 700 }}
                      >
                        {gw.status === 'Operational' ? 'Maintenance' : 'Restore'}
                      </Button>
                      <IconButton size="small" onClick={() => openEditIot(gw)} aria-label={`Edit ${gw.name}`}>
                        <EditIcon fontSize="small" sx={{ color: '#1E40AF' }} />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteIot(gw)} aria-label={`Delete ${gw.name}`}>
                        <DeleteOutlineIcon fontSize="small" sx={{ color: '#DC2626' }} />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          }
          inspector={
            <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
              <DashboardSectionHeader title="Bio Data Lake & Storage Nodes" subtitle="FASTQ, BAM, VCF replication" />
              <Box sx={{ p: 2, borderRadius: 2.5, bgcolor: '#F0FDFA', border: '1px solid #99F6E4', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <StorageIcon sx={{ color: '#0F766E', fontSize: 18 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                    18.4 TB / 50 TB Allocated
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={37} sx={{ height: 7, borderRadius: 4, my: 1 }} />
                <Typography variant="caption" sx={{ color: '#0F766E', fontWeight: 700 }}>
                  AES-256 + Multi-AZ Object Lock Active
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {SYSTEM_SERVICES_HEALTH.map((srv) => (
                  <Box key={srv.id} sx={{ p: 1.25, borderRadius: 2, bgcolor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A' }}>
                      {srv.service}
                    </Typography>
                    <StatusChip label={srv.status} />
                  </Box>
                ))}
              </Box>
            </Paper>
          }
        />
      )}

      {/* PAGE 6: BILLING & SYSTEM LOGS (SUBSCRIPTION UPDATE + SYSTEM LOGS) */}
      {activeNavId === 'billing' && (
        <WorkstationSplitView
          primary={
            <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
              <DashboardSectionHeader
                title="System Audit Logs"
                subtitle="Every administrative create, update, and delete operation is recorded below"
                rightSlot={
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Select
                      size="small"
                      value={logCategoryFilter}
                      onChange={(e) => setLogCategoryFilter(e.target.value as 'ALL' | SystemEventLog['category'])}
                      sx={{ fontSize: '12px', fontWeight: 700, height: 32 }}
                    >
                      <MenuItem value="ALL">All Categories</MenuItem>
                      <MenuItem value="USER">USER</MenuItem>
                      <MenuItem value="ORG">ORG</MenuItem>
                      <MenuItem value="SECURITY">SECURITY</MenuItem>
                      <MenuItem value="IOT">IOT</MenuItem>
                      <MenuItem value="BILLING">BILLING</MenuItem>
                    </Select>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<DownloadIcon fontSize="small" />}
                      onClick={() => onNotify('Exported System Admin Audit Logs (CSV).')}
                      sx={{ fontWeight: 700 }}
                    >
                      Export CSV
                    </Button>
                  </Box>
                }
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {filteredLogs.map((log) => (
                  <Box
                    key={log.id}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 1.5,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip label={log.category} size="small" sx={{ height: 19, fontSize: '10px', fontWeight: 800, bgcolor: '#EFF6FF', color: '#1E40AF' }} />
                        <Typography variant="caption" sx={{ color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                          {log.timestamp}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', mt: 0.35 }}>
                        {log.message}
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>
                      Actor: {log.actor}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          }
          inspector={
            <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
              <DashboardSectionHeader title="Subscription & Seat Quota" subtitle="Manage active license plan" />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  select
                  label="Subscription Tier"
                  size="small"
                  fullWidth
                  value={billingPlan}
                  onChange={(e) => {
                    const nextTier = e.target.value as typeof billingPlan;
                    setBillingPlan(nextTier);
                    appendLog('BILLING', `Updated subscription tier to ${nextTier}.`);
                    onNotify(`Switched subscription plan to ${nextTier}.`);
                  }}
                >
                  <MenuItem value="Academic & Research">Academic & Research ($49/seat/mo)</MenuItem>
                  <MenuItem value="Growth Biotech">Growth Biotech ($199/seat/mo)</MenuItem>
                  <MenuItem value="Enterprise Biopharma">Enterprise Biopharma (Custom VPC)</MenuItem>
                </TextField>

                <TextField
                  label="Licensed Seat Quota"
                  type="number"
                  size="small"
                  fullWidth
                  value={seatQuota}
                  onChange={(e) => setSeatQuota(Math.max(users.length, Number(e.target.value) || users.length))}
                  onBlur={() => {
                    appendLog('BILLING', `Updated licensed seat quota to ${seatQuota}.`);
                    onNotify(`Seat quota updated to ${seatQuota} seats.`);
                  }}
                />

                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                      Annual Billing (Save 20%)
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      {users.length} of {seatQuota} seats currently assigned
                    </Typography>
                  </Box>
                  <Switch
                    checked={annualBilling}
                    onChange={() => {
                      const next = !annualBilling;
                      setAnnualBilling(next);
                      appendLog('BILLING', `Switched billing cycle to ${next ? 'Annual' : 'Monthly'}.`);
                      onNotify(`Billing cycle set to ${next ? 'Annual' : 'Monthly'}.`);
                    }}
                  />
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={Math.min(100, Math.round((users.length / Math.max(seatQuota, 1)) * 100))}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </Paper>
          }
        />
      )}

      {/* MODALS: USER CRUD */}
      <Dialog open={userModalOpen} onClose={() => setUserModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>{editingUser ? 'Edit User Account' : 'Create New User'}</DialogTitle>
        <form onSubmit={handleSaveUser}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Full Name"
              size="small"
              fullWidth
              required
              value={userForm.name}
              onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
            />
            <TextField
              label="Institutional Email"
              type="email"
              size="small"
              fullWidth
              required
              value={userForm.email}
              onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
            />
            <TextField
              select
              label="Assigned RBAC Role"
              size="small"
              fullWidth
              value={userForm.roleId}
              onChange={(e) => setUserForm({ ...userForm, roleId: e.target.value as UserRoleId })}
            >
              {ROLE_LIST.map((r) => (
                <MenuItem key={r.roleId} value={r.roleId}>
                  {r.roleTitle}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Organization"
              size="small"
              fullWidth
              value={userForm.organization}
              onChange={(e) => setUserForm({ ...userForm, organization: e.target.value })}
            >
              {organizations.map((o) => (
                <MenuItem key={o.id} value={o.name}>
                  {o.name}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setUserModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', fontWeight: 700 }}>
              {editingUser ? 'Save Changes' : 'Create User'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* MODALS: ORGANIZATION CRUD */}
      <Dialog open={orgModalOpen} onClose={() => setOrgModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>{editingOrg ? 'Edit Organization' : 'Create Organization'}</DialogTitle>
        <form onSubmit={handleSaveOrg}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Organization Name"
              size="small"
              fullWidth
              required
              value={orgForm.name}
              onChange={(e) => setOrgForm({ ...orgForm, name: e.target.value })}
            />
            <TextField
              select
              label="Subscription Tier"
              size="small"
              fullWidth
              value={orgForm.tier}
              onChange={(e) => setOrgForm({ ...orgForm, tier: e.target.value as OrganizationRecord['tier'] })}
            >
              <MenuItem value="Academic & Research">Academic & Research</MenuItem>
              <MenuItem value="Growth Biotech">Growth Biotech</MenuItem>
              <MenuItem value="Enterprise Biopharma">Enterprise Biopharma</MenuItem>
            </TextField>
            <TextField
              label="Cloud Region"
              size="small"
              fullWidth
              value={orgForm.region}
              onChange={(e) => setOrgForm({ ...orgForm, region: e.target.value })}
            />
            <TextField
              label="Seat Limit"
              type="number"
              size="small"
              fullWidth
              value={orgForm.seatsLimit}
              onChange={(e) => setOrgForm({ ...orgForm, seatsLimit: e.target.value })}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setOrgModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#0F766E', fontWeight: 700 }}>
              {editingOrg ? 'Save Organization' : 'Create Organization'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* MODALS: SSO PROVIDER CRUD */}
      <Dialog open={ssoModalOpen} onClose={() => setSsoModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>{editingSso ? 'Edit SSO Provider' : 'Add SSO Provider'}</DialogTitle>
        <form onSubmit={handleSaveSso}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Provider Name"
              size="small"
              fullWidth
              required
              placeholder="e.g. Google Workspace"
              value={ssoForm.name}
              onChange={(e) => setSsoForm({ ...ssoForm, name: e.target.value })}
            />
            <TextField
              select
              label="Protocol"
              size="small"
              fullWidth
              value={ssoForm.protocol}
              onChange={(e) => setSsoForm({ ...ssoForm, protocol: e.target.value as SsoProviderRecord['protocol'] })}
            >
              <MenuItem value="SAML 2.0">SAML 2.0</MenuItem>
              <MenuItem value="OIDC">OIDC</MenuItem>
              <MenuItem value="ORCID / eduGAIN">ORCID / eduGAIN</MenuItem>
            </TextField>
            <TextField
              label="Allowed Domain"
              size="small"
              fullWidth
              required
              placeholder="e.g. biotechlab.org"
              value={ssoForm.domain}
              onChange={(e) => setSsoForm({ ...ssoForm, domain: e.target.value })}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setSsoModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#1E40AF', fontWeight: 700 }}>
              {editingSso ? 'Save Provider' : 'Add Provider'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* MODALS: IOT GATEWAY CRUD */}
      <Dialog open={iotModalOpen} onClose={() => setIotModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>{editingIot ? 'Edit IoT Gateway' : 'Register IoT Gateway'}</DialogTitle>
        <form onSubmit={handleSaveIot}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Gateway Name"
              size="small"
              fullWidth
              required
              placeholder="e.g. Incubator CO2 Sensor Bank"
              value={iotForm.name}
              onChange={(e) => setIotForm({ ...iotForm, name: e.target.value })}
            />
            <TextField
              select
              label="Protocol"
              size="small"
              fullWidth
              value={iotForm.protocol}
              onChange={(e) => setIotForm({ ...iotForm, protocol: e.target.value as IotGatewayRecord['protocol'] })}
            >
              <MenuItem value="MQTT">MQTT</MenuItem>
              <MenuItem value="HTTPS">HTTPS</MenuItem>
              <MenuItem value="HL7">HL7</MenuItem>
            </TextField>
            <TextField
              label="Facility / Room Location"
              size="small"
              fullWidth
              required
              value={iotForm.location}
              onChange={(e) => setIotForm({ ...iotForm, location: e.target.value })}
            />
            <TextField
              label="Telemetry Stream Summary"
              size="small"
              fullWidth
              value={iotForm.metric}
              onChange={(e) => setIotForm({ ...iotForm, metric: e.target.value })}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setIotModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#0F766E', fontWeight: 700 }}>
              {editingIot ? 'Save Gateway' : 'Register Gateway'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
