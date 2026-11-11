import React, { useState } from 'react';
import { Box } from '@mui/material';
import MedicationIcon from '@mui/icons-material/Medication';
import GroupsIcon from '@mui/icons-material/Groups';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import {
  ADVERSE_EVENTS_LIST,
  INITIAL_CLINICAL_BIOSPECIMENS,
  INITIAL_CLINICAL_NOTES,
  INITIAL_CLINICAL_PARTICIPANTS,
  INITIAL_TRIALS,
} from '../../data/roleDashboardData';
import type {
  AdverseEventItem,
  ClinicalBiospecimen,
  ClinicalParticipant,
  ClinicalTeamNote,
  ClinicalTrialItem,
  DashboardSession,
} from '../../types/dashboard';
import { KpiStatCard } from '../../components/app/shared/KpiStatCard';
import { BarcodeLabelModal } from '../../components/app/shared/BarcodeLabelModal';
import { ClinicalTrialsPanel } from '../../components/app/clinical/ClinicalTrialsPanel';
import { ClinicalParticipantsPanel } from '../../components/app/clinical/ClinicalParticipantsPanel';
import { ClinicalBiospecimensPanel } from '../../components/app/clinical/ClinicalBiospecimensPanel';
import { ClinicalAdverseEventsPanel } from '../../components/app/clinical/ClinicalAdverseEventsPanel';
import { ClinicalRegulatoryExportsPanel } from '../../components/app/clinical/ClinicalRegulatoryExportsPanel';

interface ClinicalCoordinatorDashboardProps {
  session: DashboardSession;
  activeNavId: string;
  searchQuery: string;
  onSelectNav: (navId: string) => void;
  onNotify: (msg: string) => void;
}

export const ClinicalCoordinatorDashboard: React.FC<ClinicalCoordinatorDashboardProps> = ({
  session,
  activeNavId,
  searchQuery,
  onSelectNav,
  onNotify,
}) => {
  const [trials, setTrials] = useState<ClinicalTrialItem[]>(INITIAL_TRIALS);
  const [participants, setParticipants] = useState<ClinicalParticipant[]>(INITIAL_CLINICAL_PARTICIPANTS);
  const [biospecimens, setBiospecimens] = useState<ClinicalBiospecimen[]>(INITIAL_CLINICAL_BIOSPECIMENS);
  const [adverseEvents, setAdverseEvents] = useState<AdverseEventItem[]>(ADVERSE_EVENTS_LIST);
  const [notes, setNotes] = useState<ClinicalTeamNote[]>(INITIAL_CLINICAL_NOTES);
  const [barcodeSubject, setBarcodeSubject] = useState<ClinicalParticipant | null>(null);

  const q = searchQuery.trim().toLowerCase();
  const matchesQuery = (fields: (string | undefined)[]) =>
    !q || fields.some((f) => f?.toLowerCase().includes(q));

  const filteredTrials = trials.filter((t) =>
    matchesQuery([t.id, t.title, t.phase, t.blindingMode, t.status])
  );
  const filteredParticipants = participants.filter((p) =>
    matchesQuery([p.subjectCode, p.trialId, p.arm, p.visitWindow, p.vialId])
  );
  const filteredBiospecimens = biospecimens.filter((b) =>
    matchesQuery([b.vialId, b.subjectCode, b.trialId, b.specimenType, b.storageLocation])
  );
  const filteredAdverseEvents = adverseEvents.filter((ae) =>
    matchesQuery([ae.id, ae.trialId, ae.subjectCode, ae.term, ae.meddraCode, ae.severity])
  );

  const totalEnrolled = trials.reduce((acc, t) => acc + t.enrolled, 0);
  const totalTarget = trials.reduce((acc, t) => acc + t.target, 0);
  const verifiedConsents = participants.filter((p) => p.consentStatus === 'Approved').length;
  const pendingConsents = participants.length - verifiedConsents;
  const saeCount = adverseEvents.filter((a) => a.isSae || a.severity === 'Severe').length;

  const handleEnrollParticipant = (created: ClinicalParticipant) => {
    setParticipants((prev) => [created, ...prev]);
    setTrials((prev) =>
      prev.map((t) =>
        t.id === created.trialId ? { ...t, enrolled: t.enrolled + 1 } : t
      )
    );
    setBiospecimens((prev) => [
      {
        vialId: created.vialId,
        subjectCode: created.subjectCode,
        trialId: created.trialId,
        specimenType: 'Whole Blood',
        volumeMl: 5.0,
        storageLocation: 'Site 04 Collection Station · 4°C Rack 1',
        custodyStatus: 'Available',
        lastUpdatedBy: session.userName,
      },
      ...prev,
    ]);
    onNotify(`Enrolled ${created.subjectCode} into ${created.trialId} (${created.arm}).`);
  };

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
          title="Active Clinical Trials"
          value={trials.length}
          delta="GCP Validated"
          subtitle="Phase I–IV & Observational"
          icon={<MedicationIcon sx={{ fontSize: 20 }} />}
          onClick={() => onSelectNav('trials')}
        />
        <KpiStatCard
          title="Enrolled Participants"
          value={`${totalEnrolled} / ${totalTarget}`}
          delta={`${Math.round((totalEnrolled / Math.max(totalTarget, 1)) * 100)}% Target`}
          subtitle="Blinded cohorts & visits"
          icon={<GroupsIcon sx={{ fontSize: 20 }} />}
          onClick={() => onSelectNav('participants')}
        />
        <KpiStatCard
          title="e-Consent Vault"
          value={`${verifiedConsents}/${participants.length}`}
          delta={pendingConsents === 0 ? '100% Signed' : `${pendingConsents} Pending`}
          deltaPositive={pendingConsents === 0}
          subtitle="21 CFR Part 11 timestamps"
          icon={<FactCheckIcon sx={{ fontSize: 20 }} />}
          onClick={() => onSelectNav('participants')}
        />
        <KpiStatCard
          title="Adverse Events (AE)"
          value={adverseEvents.length}
          delta={saeCount > 0 ? `${saeCount} SAE (24–48h)` : 'MedDRA Coded'}
          deltaPositive={saeCount === 0}
          subtitle="IRB telemetry active"
          icon={<QrCodeScannerIcon sx={{ fontSize: 20 }} />}
          onClick={() => onSelectNav('adverse-events')}
        />
      </Box>

      {/* Isolated Tab Routing */}
      {activeNavId === 'trials' && (
        <ClinicalTrialsPanel
          session={session}
          trials={filteredTrials}
          onAddTrial={(created) => setTrials((prev) => [created, ...prev])}
          onUpdateTrial={(updated) =>
            setTrials((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
          }
          onNotify={onNotify}
        />
      )}

      {activeNavId === 'participants' && (
        <ClinicalParticipantsPanel
          session={session}
          trials={trials}
          participants={filteredParticipants}
          onEnrollParticipant={handleEnrollParticipant}
          onUpdateParticipant={(updated) =>
            setParticipants((prev) =>
              prev.map((p) => (p.subjectCode === updated.subjectCode ? updated : p))
            )
          }
          onOpenVialBarcode={(participant) => setBarcodeSubject(participant)}
          onNotify={onNotify}
        />
      )}

      {activeNavId === 'biospecimens' && (
        <ClinicalBiospecimensPanel
          session={session}
          participants={participants}
          biospecimens={filteredBiospecimens}
          onAddSpecimen={(spec) => setBiospecimens((prev) => [spec, ...prev])}
          onUpdateSpecimen={(updated) =>
            setBiospecimens((prev) =>
              prev.map((b) => (b.vialId === updated.vialId ? updated : b))
            )
          }
          onNotify={onNotify}
        />
      )}

      {activeNavId === 'adverse-events' && (
        <ClinicalAdverseEventsPanel
          trials={trials}
          participants={participants}
          adverseEvents={filteredAdverseEvents}
          onAddAdverseEvent={(ae) => setAdverseEvents((prev) => [ae, ...prev])}
          onUpdateAdverseEvent={(updated) =>
            setAdverseEvents((prev) => prev.map((a) => (a.id === updated.id ? updated : a)))
          }
          onNotify={onNotify}
        />
      )}

      {activeNavId === 'regulatory-exports' && (
        <ClinicalRegulatoryExportsPanel
          session={session}
          trials={trials}
          participants={participants}
          adverseEvents={adverseEvents}
          notes={notes}
          onAddNote={(note) => setNotes((prev) => [note, ...prev])}
          onNotify={onNotify}
        />
      )}

      {barcodeSubject && (
        <BarcodeLabelModal
          open={Boolean(barcodeSubject)}
          onClose={() => setBarcodeSubject(null)}
          sampleId={barcodeSubject.vialId}
          sampleName={`${barcodeSubject.subjectCode} (${barcodeSubject.arm})`}
          sampleType="Clinical Biospecimen"
          storagePath={`${barcodeSubject.trialId} · ${barcodeSubject.visitWindow}`}
          onPrintConfirm={() => onNotify(`Printed blinded label for ${barcodeSubject.vialId}.`)}
        />
      )}
    </Box>
  );
};
