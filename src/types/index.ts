// GatsBio Life Sciences Domain Interfaces

export type SampleType =
  | 'DNA'
  | 'RNA'
  | 'Cell Line'
  | 'Tissue'
  | 'Protein'
  | 'Serum'
  | 'Plasmid'
  | 'Reagent';

export type SampleStatus =
  | 'Available'
  | 'In Use'
  | 'Depleted'
  | 'Quarantined'
  | 'Disposed';

export interface BioSample {
  id: string; // e.g. "SMP-2026-9041"
  barcode: string; // Barcode value
  name: string;
  type: SampleType;
  volumeUl: number;
  initialVolumeUl: number;
  concentrationNgPerUl?: number;
  freezeThawCycles: number;
  maxRecommendedCycles: number;
  storageLocation: {
    facility: string;
    freezer: string;
    shelf: number;
    rack: string;
    boxId: string;
    well?: string;
  };
  custody: {
    holder: string;
    department: string;
    updatedAt: string;
  };
  status: SampleStatus;
  qcPassed: boolean;
}

export interface WellInfo {
  coordinate: string; // e.g. "A1", "H12"
  row: string; // "A" - "H"
  col: number; // 1 - 12
  sampleId?: string;
  sampleName?: string;
  type?: SampleType;
  concentration?: number;
  volume?: number;
  isControl?: 'Positive' | 'Negative' | 'Blank';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  operator: string;
  role: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'EXECUTE' | 'SIGN';
  entity: string;
  entityId: string;
  description: string;
  hash: string;
  signatureMeaning?: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  model: string;
  location: string;
  status: 'Operational' | 'In Use' | 'Calibration Due' | 'Maintenance';
  nextCalibration: string;
  temperature?: number;
  co2Level?: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  features: string[];
  ctaText: string;
  badge?: string;
}

import type { AppRoute } from './dashboard';
export type { AppRoute, UserRoleId, DashboardSession } from './dashboard';

export type PublicRoute =
  | 'home'
  | 'platform'
  | 'tailored-solutions'
  | 'resources'
  | 'compliance'
  | 'pricing'
  | 'tools'
  | 'demo';

export type AnyRoute = PublicRoute | AppRoute;
