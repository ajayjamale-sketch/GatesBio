import React, { useState } from 'react';
import { Box } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import GridOnIcon from '@mui/icons-material/GridOn';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import { MOCK_EQUIPMENT, MOCK_SAMPLES, MOCK_WELLS_96 } from '../../data/mockData';
import {
  CRYO_TELEMETRY_SERIES,
  INITIAL_CUSTODY_EVENTS,
  INITIAL_EQUIPMENT_BOOKINGS,
  INITIAL_LAB_TASKS,
  INITIAL_MAINTENANCE_LOGS,
} from '../../data/roleDashboardData';
import type { BioSample, WellInfo } from '../../types';
import type {
  DashboardSession,
  EquipmentBooking,
  LabTestTask,
  MaintenanceLogEntry,
  SampleCustodyEvent,
} from '../../types/dashboard';
import { KpiStatCard } from '../../components/app/shared/KpiStatCard';
import { BarcodeLabelModal } from '../../components/app/shared/BarcodeLabelModal';
import { TechSampleRegistryPanel } from '../../components/app/technician/TechSampleRegistryPanel';
import { TechMicroplateAssayPanel } from '../../components/app/technician/TechMicroplateAssayPanel';
import { TechCryoStoragePanel } from '../../components/app/technician/TechCryoStoragePanel';
import { TechResultsUploadPanel } from '../../components/app/technician/TechResultsUploadPanel';
import { TechEquipmentTelemetryPanel } from '../../components/app/technician/TechEquipmentTelemetryPanel';

interface LabTechnicianDashboardProps {
  session: DashboardSession;
  activeNavId: string;
  searchQuery: string;
  onSelectNav: (navId: string) => void;
  onNotify: (msg: string) => void;
}

export const LabTechnicianDashboard: React.FC<LabTechnicianDashboardProps> = ({
  session,
  activeNavId,
  searchQuery,
  onSelectNav,
  onNotify,
}) => {
  const [samples, setSamples] = useState<BioSample[]>(MOCK_SAMPLES);
  const [custodyEvents, setCustodyEvents] = useState<SampleCustodyEvent[]>(INITIAL_CUSTODY_EVENTS);
  const [wells, setWells] = useState<WellInfo[]>(MOCK_WELLS_96);
  const [tasks, setTasks] = useState<LabTestTask[]>(INITIAL_LAB_TASKS);
  const [equipment, setEquipment] = useState(MOCK_EQUIPMENT);
  const [bookings, setBookings] = useState<EquipmentBooking[]>(INITIAL_EQUIPMENT_BOOKINGS);
  const [maintenanceLogs, setMaintenanceLogs] = useState<MaintenanceLogEntry[]>(INITIAL_MAINTENANCE_LOGS);
  const [barcodeTarget, setBarcodeTarget] = useState<BioSample | null>(null);

  const q = searchQuery.trim().toLowerCase();
  const matchesQuery = (fields: (string | undefined)[]) =>
    !q || fields.some((f) => f?.toLowerCase().includes(q));

  const filteredSamples = samples.filter((s) =>
    matchesQuery([s.id, s.barcode, s.name, s.type, s.storageLocation.boxId])
  );
  const filteredTasks = tasks.filter((t) =>
    matchesQuery([t.id, t.sampleId, t.assayType, t.instrument, t.assayCategory])
  );
  const filteredEquipment = equipment.filter((eq) =>
    matchesQuery([eq.id, eq.name, eq.model, eq.location, eq.status])
  );

  // Dynamic KPIs
  const latestTelemetry = CRYO_TELEMETRY_SERIES[CRYO_TELEMETRY_SERIES.length - 1];
  const activeStorageSamples = samples.filter((s) => s.status !== 'Disposed').length;
  const rackCapacityPct = Math.min(99, Math.round((activeStorageSamples / 72) * 100) + 75);
  const openTasks = tasks.filter((t) => t.status !== 'Completed');
  const statCount = openTasks.filter((t) => t.priority === 'STAT').length;
  const calDueCount = equipment.filter((e) => e.status === 'Calibration Due').length;

  const showSection = (id: string) => activeNavId === id;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* KPI Row */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' },
          gap: 2,
          '& > *': { minWidth: 0 },
        }}
      >
        <KpiStatCard
          title="Samples Accessioned"
          value={samples.length}
          delta={`${samples.filter((s) => s.qcPassed).length}/${samples.length} QC Pass`}
          subtitle="1D/2D DataMatrix verified"
          icon={<QrCodeScannerIcon sx={{ fontSize: 20 }} />}
          onClick={() => onSelectNav('sample-queue')}
        />
        <KpiStatCard
          title="Active Assay Queue"
          value={openTasks.length}
          delta={`${statCount} STAT`}
          deltaPositive={statCount === 0}
          subtitle="QuantStudio, NovaSeq & FACS"
          icon={<GridOnIcon sx={{ fontSize: 20 }} />}
          onClick={() => onSelectNav('plate-runs')}
        />
        <KpiStatCard
          title="Cryo Vault Temp"
          value={`${latestTelemetry.ult01.toFixed(1)} °C`}
          delta={`CO2 ${latestTelemetry.co2}%`}
          subtitle={`${rackCapacityPct}% rack capacity used`}
          icon={<AcUnitIcon sx={{ fontSize: 20 }} />}
          onClick={() => onSelectNav('cryo-storage')}
        />
        <KpiStatCard
          title="Equipment Status"
          value={`${equipment.filter((e) => e.status === 'Operational' || e.status === 'In Use').length}/${equipment.length}`}
          delta={`${calDueCount} Cal Due`}
          deltaPositive={calDueCount === 0}
          subtitle="IoT & booking active"
          icon={<DeviceHubIcon sx={{ fontSize: 20 }} />}
          onClick={() => onSelectNav('equipment')}
        />
      </Box>

      {/* Sample Accessioning, Barcode Scan & Custody (2.3) */}
      {showSection('sample-queue') && (
        <TechSampleRegistryPanel
          session={session}
          samples={filteredSamples}
          custodyEvents={custodyEvents}
          onAccessionSample={(created, event) => {
            setSamples((prev) => [created, ...prev]);
            setCustodyEvents((prev) => [event, ...prev]);
            onNotify(`Accessioned sample ${created.id} and generated 1D/2D barcode.`);
          }}
          onBulkAccession={(newList, events) => {
            setSamples((prev) => [...newList, ...prev]);
            setCustodyEvents((prev) => [...events, ...prev]);
            onNotify(`Bulk accessioned ${newList.length} biological specimens.`);
          }}
          onCustodyAction={(updated, event) => {
            setSamples((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
            setCustodyEvents((prev) => [event, ...prev]);
            onNotify(`Logged custody action (${event.action}) for ${updated.id}.`);
          }}
          onOpenBarcode={(sample) => setBarcodeTarget(sample)}
          onNotify={onNotify}
        />
      )}

      {/* 96/384-Well Microplate & Step-by-Step Assay Runner (2.3) */}
      {showSection('plate-runs') && (
        <TechMicroplateAssayPanel
          session={session}
          wells={wells}
          samples={samples}
          tasks={filteredTasks}
          onAssignWell={(coordinate, sample) => {
            setWells((prev) =>
              prev.map((w) =>
                w.coordinate === coordinate
                  ? {
                      ...w,
                      sampleId: sample.id,
                      sampleName: sample.name,
                      type: sample.type,
                      concentration: sample.concentrationNgPerUl ?? 50,
                      volume: 20,
                      isControl: undefined,
                    }
                  : w
              )
            );
          }}
          onUpdateTask={(updated) =>
            setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
          }
          onNotify={onNotify}
        />
      )}

      {/* Cryogenic Storage Hierarchy Explorer (2.3) */}
      {showSection('cryo-storage') && (
        <TechCryoStoragePanel
          samples={filteredSamples}
          onOpenBarcode={(sample) => setBarcodeTarget(sample)}
        />
      )}

      {/* Raw Results Upload & QC Validation (2.4) */}
      {showSection('results-upload') && (
        <TechResultsUploadPanel
          tasks={filteredTasks}
          onUploadResult={(taskId, fileName, metrics, isOos) => {
            setTasks((prev) =>
              prev.map((t) =>
                t.id === taskId
                  ? {
                      ...t,
                      status: 'Completed',
                      uploadedResultFile: fileName,
                      rawMetrics: metrics,
                      deviationFlagged: isOos,
                      deviationNotes: isOos ? 'Auto-flagged OOS on results upload' : undefined,
                    }
                  : t
              )
            );
          }}
          onNotify={onNotify}
        />
      )}

      {/* Equipment Booking, Maintenance & Cryo/CO2 IoT Telemetry (2.6) */}
      {showSection('equipment') && (
        <TechEquipmentTelemetryPanel
          session={session}
          equipment={filteredEquipment}
          bookings={bookings}
          maintenanceLogs={maintenanceLogs}
          onLogMaintenance={(eqpId, entry) => {
            setMaintenanceLogs((prev) => [entry, ...prev]);
            if (entry.type === 'Calibration') {
              setEquipment((prev) =>
                prev.map((eq) =>
                  eq.id === eqpId ? { ...eq, status: 'Operational', nextCalibration: '2027-05-11' } : eq
                )
              );
            }
            onNotify(`Logged ${entry.type} record for ${eqpId}.`);
          }}
          onAddBooking={(bkg) => setBookings((prev) => [bkg, ...prev])}
          onNotify={onNotify}
        />
      )}

      {barcodeTarget && (
        <BarcodeLabelModal
          open={Boolean(barcodeTarget)}
          onClose={() => setBarcodeTarget(null)}
          sampleId={barcodeTarget.id}
          sampleName={barcodeTarget.name}
          sampleType={barcodeTarget.type}
          storagePath={`${barcodeTarget.storageLocation.freezer} · ${barcodeTarget.storageLocation.boxId} (${barcodeTarget.storageLocation.well || 'A1'})`}
          onPrintConfirm={() => onNotify(`Sent thermal label for ${barcodeTarget.id} to printer.`)}
        />
      )}
    </Box>
  );
};
