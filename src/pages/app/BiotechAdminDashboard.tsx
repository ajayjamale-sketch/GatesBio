import React, { useState } from 'react';
import { Box } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import BiotechIcon from '@mui/icons-material/Biotech';
import InsightsIcon from '@mui/icons-material/Insights';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import {
  BUDGET_ALLOCATIONS,
  CAPA_DEVIATIONS,
  INITIAL_ORG_USERS,
  INITIAL_PROJECTS,
  INITIAL_PURCHASE_REQUISITIONS,
  PUBLICATION_RECORDS,
} from '../../data/roleDashboardData';
import { MOCK_EQUIPMENT } from '../../data/mockData';
import type { EquipmentItem } from '../../types';
import type {
  BudgetAllocation,
  CapaDeviationItem,
  DashboardSession,
  OrgUserRecord,
  PublicationRecord,
  PurchaseRequisition,
  ResearchProjectItem,
} from '../../types/dashboard';
import { KpiStatCard } from '../../components/app/shared/KpiStatCard';
import { BiotechExecutivePanel } from '../../components/app/biotech-admin/BiotechExecutivePanel';
import { BiotechPortfolioPanel } from '../../components/app/biotech-admin/BiotechPortfolioPanel';
import { BiotechFundingPanel } from '../../components/app/biotech-admin/BiotechFundingPanel';
import { BiotechLabUtilizationPanel } from '../../components/app/biotech-admin/BiotechLabUtilizationPanel';
import { BiotechTeamsIpPanel } from '../../components/app/biotech-admin/BiotechTeamsIpPanel';

interface BiotechAdminDashboardProps {
  session: DashboardSession;
  activeNavId: string;
  searchQuery: string;
  onSelectNav: (navId: string) => void;
  onNotify: (msg: string) => void;
}

export const BiotechAdminDashboard: React.FC<BiotechAdminDashboardProps> = ({
  session,
  activeNavId,
  searchQuery,
  onSelectNav,
  onNotify,
}) => {
  const [projects, setProjects] = useState<ResearchProjectItem[]>(INITIAL_PROJECTS);
  const [budgets, setBudgets] = useState<BudgetAllocation[]>(BUDGET_ALLOCATIONS);
  const [requisitions, setRequisitions] = useState<PurchaseRequisition[]>(INITIAL_PURCHASE_REQUISITIONS);
  const [equipment, setEquipment] = useState<EquipmentItem[]>(MOCK_EQUIPMENT);
  const [teamMembers, setTeamMembers] = useState<OrgUserRecord[]>(INITIAL_ORG_USERS);
  const [publications, setPublications] = useState<PublicationRecord[]>(PUBLICATION_RECORDS);
  const [capas, setCapas] = useState<CapaDeviationItem[]>(CAPA_DEVIATIONS);

  const q = searchQuery.trim().toLowerCase();
  const matchesQuery = (fields: (string | undefined)[]) =>
    !q || fields.some((f) => f?.toLowerCase().includes(q));

  const filteredProjects = projects.filter((p) =>
    matchesQuery([p.id, p.title, p.leadPi, p.grantCode, p.status])
  );
  const filteredBudgets = budgets.filter((b) =>
    matchesQuery([b.department, b.grantCode])
  );
  const filteredRequisitions = requisitions.filter((po) =>
    matchesQuery([po.id, po.vendor, po.itemDescription, po.department, po.grantCode])
  );
  const filteredEquipment = equipment.filter((eq) =>
    matchesQuery([eq.id, eq.name, eq.model, eq.location, eq.status])
  );
  const filteredMembers = teamMembers.filter((m) =>
    matchesQuery([m.name, m.email, m.roleId, m.status])
  );
  const filteredPublications = publications.filter((pub) =>
    matchesQuery([pub.id, pub.title, pub.journalOrPatent, pub.owners, pub.status])
  );

  const totalAllocated = budgets.reduce((acc, b) => acc + b.allocatedUsd, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.spentUsd, 0);
  const burnPct = totalAllocated > 0 ? Math.round((totalSpent / totalAllocated) * 100) : 0;
  const openCapaCount = capas.filter((c) => c.status !== 'Closed').length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* KPI Row */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(4, minmax(0, 1fr))',
          },
          gap: 2,
          '& > *': { minWidth: 0 },
        }}
      >
        <KpiStatCard
          title="Research Team"
          value={teamMembers.length}
          delta={`${publications.length} IP Records`}
          subtitle={session.organization}
          icon={<GroupsIcon sx={{ fontSize: 20 }} />}
          onClick={() => onSelectNav('teams-ip')}
        />
        <KpiStatCard
          title="Active Projects"
          value={projects.length}
          delta={`${Math.round(projects.reduce((a, p) => a + p.milestoneProgress, 0) / Math.max(projects.length, 1))}% Avg`}
          subtitle="Milestones tracked"
          icon={<BiotechIcon sx={{ fontSize: 20 }} />}
          onClick={() => onSelectNav('portfolio')}
        />
        <KpiStatCard
          title="R&D Funding Utilized"
          value={`$${(totalSpent / 1000).toFixed(0)}k`}
          delta={`${burnPct}% of $${(totalAllocated / 1000000).toFixed(2)}M`}
          subtitle={`${budgets.length} Grant Accounts`}
          icon={<InsightsIcon sx={{ fontSize: 20 }} />}
          onClick={() => onSelectNav('funding')}
        />
        <KpiStatCard
          title="Lab Equipment & QA"
          value={`${equipment.filter((e) => e.status === 'Operational' || e.status === 'In Use').length}/${equipment.length}`}
          delta={`${openCapaCount} Open CAPA`}
          deltaPositive={openCapaCount === 0}
          subtitle="21 CFR Part 11 & ISO"
          icon={<VerifiedUserIcon sx={{ fontSize: 20 }} />}
          onClick={() => onSelectNav('lab-utilization')}
        />
      </Box>

      {/* PAGE 1: EXECUTIVE OVERVIEW */}
      {activeNavId === 'executive-bi' && (
        <BiotechExecutivePanel
          budgets={filteredBudgets}
          projects={filteredProjects}
          equipment={equipment}
          capas={capas}
          onCycleCapaStatus={(capaId) => {
            setCapas((prev) =>
              prev.map((c) => {
                if (c.id !== capaId) return c;
                const nextStatus = c.status === 'Open' ? 'Under Review' : 'Closed';
                return { ...c, status: nextStatus };
              })
            );
            onNotify(`Advanced CAPA ${capaId} review status.`);
          }}
          onNavigateTab={onSelectNav}
          onNotify={onNotify}
        />
      )}

      {/* PAGE 2: RESEARCH PORTFOLIO */}
      {activeNavId === 'portfolio' && (
        <BiotechPortfolioPanel
          projects={filteredProjects}
          onSaveProject={(item, isEdit) => {
            setProjects((prev) =>
              isEdit ? prev.map((p) => (p.id === item.id ? item : p)) : [item, ...prev]
            );
            onNotify(isEdit ? `Updated project ${item.id}.` : `Created research project ${item.id}.`);
          }}
          onDeleteProject={(proj) => {
            setProjects((prev) => prev.filter((p) => p.id !== proj.id));
            onNotify(`Deleted project ${proj.id}.`);
          }}
        />
      )}

      {/* PAGE 3: GRANTS, BUDGETS & PURCHASE REQUISITIONS */}
      {activeNavId === 'funding' && (
        <BiotechFundingPanel
          session={session}
          budgets={filteredBudgets}
          requisitions={filteredRequisitions}
          onSaveBudget={(item, editIdx) => {
            setBudgets((prev) =>
              editIdx !== null ? prev.map((b, i) => (i === editIdx ? item : b)) : [...prev, item]
            );
            onNotify(editIdx !== null ? `Updated budget for ${item.department}.` : `Added grant budget for ${item.department}.`);
          }}
          onDeleteBudget={(idx, dept) => {
            setBudgets((prev) => prev.filter((_, i) => i !== idx));
            onNotify(`Removed budget line for ${dept}.`);
          }}
          onAddRequisition={(po) => {
            setRequisitions((prev) => [po, ...prev]);
            onNotify(`Submitted purchase requisition ${po.id} ($${po.amountUsd.toLocaleString()}).`);
          }}
          onReviewRequisition={(poId, decision) => {
            const target = requisitions.find((r) => r.id === poId);
            setRequisitions((prev) =>
              prev.map((r) => (r.id === poId ? { ...r, status: decision } : r))
            );
            if (decision === 'Approved' && target) {
              setBudgets((prev) =>
                prev.map((b) =>
                  b.department === target.department
                    ? { ...b, spentUsd: b.spentUsd + target.amountUsd }
                    : b
                )
              );
            }
            onNotify(`${decision} purchase requisition ${poId}.`);
          }}
        />
      )}

      {/* PAGE 4: LAB EQUIPMENT UTILIZATION & INVENTORY */}
      {activeNavId === 'lab-utilization' && (
        <BiotechLabUtilizationPanel
          equipment={filteredEquipment}
          onSaveEquipment={(item, isEdit) => {
            setEquipment((prev) =>
              isEdit ? prev.map((eq) => (eq.id === item.id ? item : eq)) : [item, ...prev]
            );
            onNotify(isEdit ? `Updated instrument ${item.name}.` : `Registered instrument ${item.name}.`);
          }}
          onMarkCalibrated={(eq) => {
            setEquipment((prev) =>
              prev.map((item) =>
                item.id === eq.id ? { ...item, status: 'Operational', nextCalibration: '2027-05-11' } : item
              )
            );
            onNotify(`Marked ${eq.name} as calibrated.`);
          }}
          onDeleteEquipment={(eq) => {
            setEquipment((prev) => prev.filter((item) => item.id !== eq.id));
            onNotify(`Removed instrument ${eq.name}.`);
          }}
        />
      )}

      {/* PAGE 5: TEAMS, SEAT METERING & IP PORTFOLIO */}
      {activeNavId === 'teams-ip' && (
        <BiotechTeamsIpPanel
          session={session}
          teamMembers={filteredMembers}
          publications={filteredPublications}
          onSaveMember={(item, isEdit) => {
            setTeamMembers((prev) =>
              isEdit ? prev.map((m) => (m.id === item.id ? item : m)) : [item, ...prev]
            );
            onNotify(isEdit ? `Updated team member ${item.name}.` : `Added ${item.name} to ${session.organization}.`);
          }}
          onToggleMemberMfa={(id) => {
            setTeamMembers((prev) =>
              prev.map((m) => (m.id === id ? { ...m, mfaEnabled: !m.mfaEnabled } : m))
            );
            onNotify(`Updated 2FA policy for member ${id}.`);
          }}
          onToggleMemberStatus={(id) => {
            setTeamMembers((prev) =>
              prev.map((m) =>
                m.id === id ? { ...m, status: m.status === 'Active' ? 'Suspended' : 'Active' } : m
              )
            );
            onNotify(`Updated account status for member ${id}.`);
          }}
          onDeleteMember={(m) => {
            setTeamMembers((prev) => prev.filter((item) => item.id !== m.id));
            onNotify(`Removed ${m.name} from team roster.`);
          }}
          onSavePublication={(item, isEdit) => {
            setPublications((prev) =>
              isEdit ? prev.map((p) => (p.id === item.id ? item : p)) : [item, ...prev]
            );
            onNotify(isEdit ? `Updated IP record ${item.id}.` : `Created IP/publication record ${item.id}.`);
          }}
          onDeletePublication={(pub) => {
            setPublications((prev) => prev.filter((p) => p.id !== pub.id));
            onNotify(`Deleted IP record ${pub.id}.`);
          }}
        />
      )}
    </Box>
  );
};
