import type { BioSample, WellInfo, AuditLogEntry, EquipmentItem, PricingPlan } from '../types';

export const MOCK_SAMPLES: BioSample[] = [
  {
    id: 'SMP-2026-9041',
    barcode: 'GB-9041-DNA',
    name: 'HEK293-Cas9-KO (Exon 3)',
    type: 'DNA',
    volumeUl: 45.5,
    initialVolumeUl: 50.0,
    concentrationNgPerUl: 124.8,
    freezeThawCycles: 1,
    maxRecommendedCycles: 4,
    storageLocation: {
      facility: 'Boston BioHub Bldg 4',
      freezer: 'Cryo-Freezer Ultra -80°C #02',
      shelf: 2,
      rack: 'Rack B',
      boxId: 'BX-CRISPR-04',
      well: 'C3',
    },
    custody: {
      holder: 'Dr. Elena Vance',
      department: 'Functional Genomics',
      updatedAt: '2026-11-09T08:30:00Z',
    },
    status: 'Available',
    qcPassed: true,
  },
  {
    id: 'SMP-2026-8812',
    barcode: 'GB-8812-RNA',
    name: 'MCF7-Doxorubicin-Treated RNA',
    type: 'RNA',
    volumeUl: 18.2,
    initialVolumeUl: 25.0,
    concentrationNgPerUl: 89.4,
    freezeThawCycles: 2,
    maxRecommendedCycles: 3,
    storageLocation: {
      facility: 'Boston BioHub Bldg 4',
      freezer: 'Cryo-Freezer Ultra -80°C #01',
      shelf: 1,
      rack: 'Rack A',
      boxId: 'BX-ONCO-12',
      well: 'E7',
    },
    custody: {
      holder: 'Marcus Chen',
      department: 'Cellular Pharmacology',
      updatedAt: '2026-11-09T10:15:00Z',
    },
    status: 'In Use',
    qcPassed: true,
  },
  {
    id: 'SMP-2026-7734',
    barcode: 'GB-7734-PRO',
    name: 'Anti-PD-L1 Monoclonal mAb (Purified)',
    type: 'Protein',
    volumeUl: 120.0,
    initialVolumeUl: 150.0,
    concentrationNgPerUl: 210.5,
    freezeThawCycles: 0,
    maxRecommendedCycles: 2,
    storageLocation: {
      facility: 'Cambridge Science Park',
      freezer: 'Cold Storage Room 4°C Unit #3',
      shelf: 3,
      rack: 'Rack C',
      boxId: 'BX-ANTIBODY-01',
      well: 'A2',
    },
    custody: {
      holder: 'Dr. Sarah Jenkins',
      department: 'Translational Immunology',
      updatedAt: '2026-11-08T16:45:00Z',
    },
    status: 'Available',
    qcPassed: true,
  },
  {
    id: 'SMP-2026-6520',
    barcode: 'GB-6520-PLAS',
    name: 'pLenti-CRISPR-v2-EGFP',
    type: 'Plasmid',
    volumeUl: 85.0,
    initialVolumeUl: 100.0,
    concentrationNgPerUl: 340.0,
    freezeThawCycles: 1,
    maxRecommendedCycles: 5,
    storageLocation: {
      facility: 'Cambridge Science Park',
      freezer: 'Freezer -20°C Unit #05',
      shelf: 4,
      rack: 'Rack D',
      boxId: 'BX-VECTOR-09',
      well: 'B5',
    },
    custody: {
      holder: 'Dr. Elena Vance',
      department: 'Functional Genomics',
      updatedAt: '2026-11-07T14:20:00Z',
    },
    status: 'Available',
    qcPassed: true,
  },
];

export const MOCK_WELLS_96: WellInfo[] = (() => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const wells: WellInfo[] = [];

  for (let r = 0; r < rows.length; r++) {
    for (let c = 1; c <= 12; c++) {
      const row = rows[r];
      const coord = `${row}${c}`;
      let isControl: 'Positive' | 'Negative' | 'Blank' | undefined;
      let sampleName: string | undefined;
      let concentration: number | undefined;
      let type: BioSample['type'] | undefined;

      // Layout Controls on Columns 1 & 12
      if (c === 1 && (row === 'A' || row === 'B')) {
        isControl = 'Positive';
        sampleName = 'Pos Ctrl (Std 100 ng/µL)';
        concentration = 100;
      } else if (c === 1 && (row === 'G' || row === 'H')) {
        isControl = 'Blank';
        sampleName = 'Nuclease-Free Water Blank';
        concentration = 0;
      } else if (c === 12 && (row === 'A' || row === 'B')) {
        isControl = 'Negative';
        sampleName = 'Neg Ctrl (Uncut Plasmid)';
        concentration = 10;
      } else if (c >= 3 && c <= 10 && r >= 1 && r <= 6) {
        // Active sample series with gradient
        const conc = Math.round((140 - (c * 10 + r * 4)) * 10) / 10;
        concentration = Math.max(conc, 5.0);
        sampleName = `Assay-SMP-0${r * 12 + c}`;
        type = r % 2 === 0 ? 'DNA' : 'RNA';
      }

      wells.push({
        coordinate: coord,
        row,
        col: c,
        sampleName,
        concentration,
        isControl,
        type,
        volume: concentration ? 20.0 : undefined,
      });
    }
  }
  return wells;
})();

export const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'AUD-88291',
    timestamp: '2026-11-09T08:31:04Z',
    operator: 'Dr. Elena Vance',
    role: 'Principal Investigator',
    action: 'SIGN',
    entity: 'Assay Protocol #CRISPR-RUN-104',
    entityId: 'PRT-104-V2',
    description: 'Executed 21 CFR Part 11 Electronic Signature for protocol release',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    signatureMeaning: 'AUTHORSHIP_AND_RELEASE',
  },
  {
    id: 'AUD-88290',
    timestamp: '2026-11-09T07:44:19Z',
    operator: 'Marcus Chen',
    role: 'Lead Lab Technician',
    action: 'UPDATE',
    entity: 'Sample Aliquot',
    entityId: 'SMP-2026-9041',
    description: 'Aliquoted 4.5 µL for 96-well Qubit fluorometric concentration assay',
    hash: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e',
  },
  {
    id: 'AUD-88289',
    timestamp: '2026-11-08T18:12:00Z',
    operator: 'David Ross',
    role: 'QA / Compliance Auditor',
    action: 'EXECUTE',
    entity: 'Equipment Calibration',
    entityId: 'EQP-ILLUMINA-NOVA6000',
    description: 'Passed periodic optical flow cell alignment verification (ISO 17025)',
    hash: '3a7bd3e2360a3d29eea436fcfb7e44c735d117c42d1c1835420b6b9942dd4f1b',
    signatureMeaning: 'VERIFICATION_AND_APPROVAL',
  },
];

export const MOCK_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'EQP-01',
    name: 'Illumina NovaSeq 6000',
    model: 'High-Throughput Next-Gen Sequencer',
    location: 'Genomics Core Lab Rm 204',
    status: 'In Use',
    nextCalibration: '2026-12-15',
    temperature: 20.2,
  },
  {
    id: 'EQP-02',
    name: 'Thermo Scientific TSX -80°C Ultra-Low Freezer',
    model: 'Cryo Storage TSX70086A',
    location: 'Cold Storage Vault B',
    status: 'Operational',
    nextCalibration: '2027-02-10',
    temperature: -81.4,
  },
  {
    id: 'EQP-03',
    name: 'Tecan Fluent 780 Liquid Handler',
    model: 'Automated 96/384 Pipetting Workstation',
    location: 'Automation Suite 1',
    status: 'Operational',
    nextCalibration: '2026-11-28',
  },
  {
    id: 'EQP-04',
    name: 'Agilent 1290 Infinity II LC/MS',
    model: 'Ultra-High Performance Liquid Chromatograph',
    location: 'Analytical Chemistry Rm 108',
    status: 'Calibration Due',
    nextCalibration: '2026-11-12',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'academic',
    name: 'Academic & Research',
    tagline: 'Ideal for university research groups, grant labs, and academic medical centers.',
    monthlyPrice: 59,
    annualPrice: 49,
    features: [
      'Up to 15 Researchers & Technicians',
      'Full Electronic Lab Notebook (ELN)',
      'Basic Sample Accessioning (up to 10k samples)',
      '1D / 2D Barcode Generator & Print Engine',
      'Community & Scientific Knowledge Base',
      'Export to standard CSV / FASTA / PDF',
    ],
    ctaText: 'Start Academic Trial',
    badge: 'Educational Grant Eligible',
  },
  {
    id: 'growth',
    name: 'Growth Biotech',
    tagline: 'Built for venture-backed therapeutics, synthetic biology, and clinical diagnostic startups.',
    monthlyPrice: 249,
    annualPrice: 199,
    popular: true,
    features: [
      'Unlimited Researchers & Collaborators',
      'Interactive 96/384-Well Plate Designer',
      'Freezer & Cryogenic Storage Hierarchy Navigator',
      'FDA 21 CFR Part 11 Audit Trail & E-Signatures',
      'AI Research Intelligence Engine (PubMed / bioRxiv RAG)',
      'Equipment IoT Telemetry & Booking Calendar',
      'Role-based permissions (PI, Tech, QA Officer)',
      'Priority 24/7 Scientific Support Desk',
    ],
    ctaText: 'Start 14-Day Free Trial',
    badge: 'Most Popular',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Biopharma',
    tagline: 'Custom infrastructure for global pharmaceutical organizations, multi-site CROs, and clinical trial networks.',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      'Dedicated VPC or On-Premises Air-Gapped Deployment',
      'Bring Your Own Key (BYOK) AES-256 Cloud Encryption',
      'Automated Robotics Integration (Tecan, Hamilton, Beckman)',
      'Custom Biocomputing & Bioinformatic Pipelines (Nextflow)',
      'Formal GAMP 5 & 21 CFR Part 11 Validation Package',
      '99.99% Uptime Service Level Agreement (SLA)',
      'Dedicated Scientific Account Manager & Solutions Architect',
    ],
    ctaText: 'Contact Enterprise Sales',
    badge: 'Enterprise Grade',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'GatsBio reduced our sample accessioning time from hours to minutes. In our oncology CRISPR screens, having real-time 96-well plate heatmaps linked directly to the 21 CFR Part 11 audit trail is invaluable.',
    author: 'Dr. Aris Thorne',
    role: 'Director of Functional Genomics',
    org: 'Vanguard Biotherapeutics',
  },
  {
    quote:
      'The ability to search through our entire biological repository with instant barcode scanning and verify temperature logs from our -80°C freezers gives our QA team 100% confidence ahead of FDA inspections.',
    author: 'Claire Montrose, MS',
    role: 'VP of Quality Assurance & Regulatory Affairs',
    org: 'Apex Cell Therapies',
  },
  {
    quote:
      'The AI Research Engine integrated with PubMed and bioRxiv synthesizes literature faster than anything we previously used. It identified critical gene pathway overlaps for our Phase 1 trial design in 48 hours.',
    author: 'Prof. Julian Vance',
    role: 'Principal Investigator',
    org: 'Institute of Molecular Medicine',
  },
];
