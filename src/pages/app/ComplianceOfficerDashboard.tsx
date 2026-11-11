import React, { useState } from 'react';
import { Box } from '@mui/material';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import SecurityIcon from '@mui/icons-material/Security';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { MOCK_AUDIT_LOGS } from '../../data/mockData';
import {
  CAPA_DEVIATIONS,
  INITIAL_PENDING_SIGNS,
  SOP_DOCUMENTS,
} from '../../data/roleDashboardData';
import type { AuditLogEntry } from '../../types';
import type {
  CapaDeviationItem,
  DashboardSession,
  PendingSignOffItem,
  SopDocumentItem,
} from '../../types/dashboard';
import { KpiStatCard } from '../../components/app/shared/KpiStatCard';
import { type ESignatureResult } from '../../components/app/shared/ESignatureModal';
import { ComplianceESignQueuePanel } from '../../components/app/compliance/ComplianceESignQueuePanel';
import { ComplianceAuditTrailPanel } from '../../components/app/compliance/ComplianceAuditTrailPanel';
import { ComplianceSopControlPanel } from '../../components/app/compliance/ComplianceSopControlPanel';
import { ComplianceCapaPanel } from '../../components/app/compliance/ComplianceCapaPanel';
import { ComplianceRegReportsPanel } from '../../components/app/compliance/ComplianceRegReportsPanel';

interface ComplianceOfficerDashboardProps {
  session: DashboardSession;
  activeNavId: string;
  searchQuery: string;
  onSelectNav: (navId: string) => void;
  onNotify: (msg: string) => void;
}

export const ComplianceOfficerDashboard: React.FC<ComplianceOfficerDashboardProps> = ({
  session,
  activeNavId,
  searchQuery,
  onSelectNav,
  onNotify,
}) => {
  const [pendingSigns, setPendingSigns] = useState<PendingSignOffItem[]>(INITIAL_PENDING_SIGNS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(MOCK_AUDIT_LOGS);
  const [sops, setSops] = useState<SopDocumentItem[]>(SOP_DOCUMENTS);
  const [capaItems, setCapaItems] = useState<CapaDeviationItem[]>(CAPA_DEVIATIONS);

  const q = searchQuery.trim().toLowerCase();
  const matchesQuery = (fields: (string | undefined)[]) =>
    !q || fields.some((f) => f?.toLowerCase().includes(q));

  const filteredPendingSigns = pendingSigns.filter((item) =>
    matchesQuery([item.id, item.recordTitle, item.submittedBy, item.framework])
  );
  const filteredAuditLogs = auditLogs.filter((log) =>
    matchesQuery([log.id, log.operator, log.entity, log.entityId, log.description, log.hash])
  );
  const filteredSops = sops.filter((s) =>
    matchesQuery([s.id, s.code, s.title, s.version, s.framework])
  );
  const filteredCapas = capaItems.filter((c) =>
    matchesQuery([c.id, c.source, c.category, c.severity, c.status, c.rootCause])
  );

  const nextAuditId = () => `AUD-${88292 + auditLogs.length}`;

  const handleSignPendingRecord = (target: PendingSignOffItem, result: ESignatureResult) => {
    const newEntry: AuditLogEntry = {
      id: nextAuditId(),
      timestamp: result.timestamp,
      operator: result.signerName,
      role: result.signerRole,
      action: 'SIGN',
      entity: target.recordTitle,
      entityId: target.id,
      description: `${result.reason} (${result.meaning})`,
      hash: result.sha256Hash,
      signatureMeaning: result.meaning,
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
    setPendingSigns((prev) => prev.filter((item) => item.id !== target.id));
    onNotify(`Sealed ${target.id} with 21 CFR Part 11 SHA-256 signature.`);
  };

  const handleRejectPendingRecord = (target: PendingSignOffItem, reason: string) => {
    const newEntry: AuditLogEntry = {
      id: nextAuditId(),
      timestamp: new Date().toISOString(),
      operator: session.userName,
      role: session.roleTitle,
      action: 'UPDATE',
      entity: target.recordTitle,
      entityId: target.id,
      description: `Returned for revision: ${reason}`,
      hash: `rev-${target.id.toLowerCase()}-21cfr`,
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
    setPendingSigns((prev) =>
      prev.map((item) =>
        item.id === target.id ? { ...item, status: 'Rejected', rejectionReason: reason } : item
      )
    );
    onNotify(`Returned ${target.id} for revision and logged audit event.`);
  };

  const openCapaCount = capaItems.filter((c) => c.status !== 'Closed').length;
  const activePendingCount = pendingSigns.filter((p) => p.status !== 'Rejected').length;

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
          title="Audit Readiness Score"
          value="99.98%"
          delta="FDA / ISO Ready"
          subtitle="SHA-256 Merkle chain valid"
          icon={<FactCheckIcon sx={{ fontSize: 20 }} />}
          onClick={() => onSelectNav('reg-reports')}
        />
        <KpiStatCard
          title="Pending E-Signatures"
          value={activePendingCount}
          delta={activePendingCount === 0 ? 'Queue Clear' : 'Action Needed'}
          deltaPositive={activePendingCount === 0}
          subtitle="21 CFR Part 11 sign-offs"
          icon={<FingerprintIcon sx={{ fontSize: 20 }} />}
          onClick={() => onSelectNav('esign-queue')}
        />
        <KpiStatCard
          title="Immutable Audit Events"
          value={auditLogs.length}
          delta="Tamper-Evident"
          subtitle="LIMS + ELN + GCP"
          icon={<SecurityIcon sx={{ fontSize: 20 }} />}
          onClick={() => onSelectNav('audit-trail')}
        />
        <KpiStatCard
          title="Open CAPA / Deviations"
          value={openCapaCount}
          delta={openCapaCount === 0 ? 'All Closed' : 'ISO 17025 Tracked'}
          deltaPositive={openCapaCount === 0}
          subtitle="OOS & RCA workflows"
          icon={<WarningAmberIcon sx={{ fontSize: 20 }} />}
          onClick={() => onSelectNav('capa-deviations')}
        />
      </Box>

      {/* Strict Per-Tab Routing */}
      {activeNavId === 'esign-queue' && (
        <ComplianceESignQueuePanel
          session={session}
          pendingSigns={filteredPendingSigns}
          auditLogs={auditLogs}
          onSignRecord={handleSignPendingRecord}
          onRejectRecord={handleRejectPendingRecord}
          onNotify={onNotify}
        />
      )}

      {activeNavId === 'audit-trail' && (
        <ComplianceAuditTrailPanel auditLogs={filteredAuditLogs} onNotify={onNotify} />
      )}

      {activeNavId === 'sop-control' && (
        <ComplianceSopControlPanel
          session={session}
          sops={filteredSops}
          onReleaseSop={(created) => {
            setSops((prev) => [created, ...prev]);
            setAuditLogs((prev) => [
              {
                id: nextAuditId(),
                timestamp: new Date().toISOString(),
                operator: session.userName,
                role: session.roleTitle,
                action: 'CREATE',
                entity: `${created.code} (${created.version})`,
                entityId: created.id,
                description: `Released controlled SOP revision: ${created.title}`,
                hash: `sop-${created.code.toLowerCase()}-${created.version}`,
              },
              ...prev,
            ]);
            onNotify(`Released controlled SOP ${created.code} (${created.version}).`);
          }}
          onAttestSop={(sopId) => {
            setSops((prev) =>
              prev.map((s) =>
                s.id === sopId
                  ? { ...s, attestedCount: Math.min(s.totalStaff ?? 20, (s.attestedCount ?? 18) + 1) }
                  : s
              )
            );
            onNotify(`Recorded 21 CFR Part 11 SOP attestation for ${sopId}.`);
          }}
          onNotify={onNotify}
        />
      )}

      {activeNavId === 'capa-deviations' && (
        <ComplianceCapaPanel
          session={session}
          capas={filteredCapas}
          onAddCapa={(created) => {
            setCapaItems((prev) => [created, ...prev]);
            setAuditLogs((prev) => [
              {
                id: nextAuditId(),
                timestamp: new Date().toISOString(),
                operator: session.userName,
                role: session.roleTitle,
                action: 'CREATE',
                entity: created.source,
                entityId: created.id,
                description: `Opened ${created.category} CAPA (${created.severity})`,
                hash: `capa-${created.id.toLowerCase()}`,
              },
              ...prev,
            ]);
            onNotify(`Logged CAPA ${created.id} for ${created.source}.`);
          }}
          onUpdateCapa={(updated) =>
            setCapaItems((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
          }
          onCloseCapaWithSignature={(target, sig) => {
            setCapaItems((prev) =>
              prev.map((c) =>
                c.id === target.id
                  ? { ...c, status: 'Closed', closedSignatureHash: sig.sha256Hash }
                  : c
              )
            );
            setAuditLogs((prev) => [
              {
                id: nextAuditId(),
                timestamp: sig.timestamp,
                operator: sig.signerName,
                role: sig.signerRole,
                action: 'SIGN',
                entity: `CAPA Closure · ${target.source}`,
                entityId: target.id,
                description: `${sig.reason} (${sig.meaning})`,
                hash: sig.sha256Hash,
                signatureMeaning: sig.meaning,
              },
              ...prev,
            ]);
            onNotify(`Closed CAPA ${target.id} with 21 CFR Part 11 e-signature.`);
          }}
          onNotify={onNotify}
        />
      )}

      {activeNavId === 'reg-reports' && (
        <ComplianceRegReportsPanel
          pendingSigns={pendingSigns}
          auditLogs={auditLogs}
          sops={sops}
          capas={capaItems}
          onNotify={onNotify}
        />
      )}
    </Box>
  );
};
