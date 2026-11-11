export interface ComplianceHighlight {
  id: string;
  title: string;
  subtitle: string;
  targetSection: string;
  accentColor: string;
}

export interface RegulatoryFramework {
  id: string;
  code: string;
  title: string;
  badge: string;
  accentColor: string;
  bgTint: string;
  summary: string;
  controls: string[];
}

export interface SecurityControl {
  id: string;
  title: string;
  badge: string;
  desc: string;
  accentColor: string;
}

export interface AuditGuardrail {
  title: string;
  desc: string;
}

export const COMPLIANCE_HIGHLIGHTS: ComplianceHighlight[] = [
  {
    id: 'part11',
    title: 'FDA 21 CFR Part 11',
    subtitle: 'Dual-key e-signatures & SHA-256 logs',
    targetSection: 'audit-workflow',
    accentColor: '#1E40AF',
  },
  {
    id: 'gamp5',
    title: 'GAMP 5 & GLP / GMP',
    subtitle: 'Automated IQ / OQ / PQ validation',
    targetSection: 'regulatory-frameworks',
    accentColor: '#0F766E',
  },
  {
    id: 'iso',
    title: 'ISO 17025 & ISO 9001',
    subtitle: 'Calibration drift & CAPA tracking',
    targetSection: 'regulatory-frameworks',
    accentColor: '#10B981',
  },
  {
    id: 'hipaa',
    title: 'HIPAA BAA & SOC 2 II',
    subtitle: 'AES-256 encryption & BYOK KMS',
    targetSection: 'security-architecture',
    accentColor: '#0284C7',
  },
];

export const AUDIT_GUARDRAILS: AuditGuardrail[] = [
  {
    title: 'Dual-Credential Sign-Off',
    desc: 'Every batch release and protocol sign-off requires password re-entry plus TOTP or FIDO2 hardware key verification.',
  },
  {
    title: 'Mandatory Reason-for-Change',
    desc: 'Modifications to aliquot volumes, assay parameters, or specimen custody cannot save without an attributed justification.',
  },
  {
    title: 'SHA-256 Merkle Chaining',
    desc: 'Each audit event hashes the prior record digest, making retrospective tampering or silent deletion mathematically detectable.',
  },
];

export const REGULATORY_FRAMEWORKS: RegulatoryFramework[] = [
  {
    id: 'fda-part11',
    code: '21 CFR Part 11',
    title: 'FDA Electronic Records & Signatures',
    badge: 'FDA Validated',
    accentColor: '#1E40AF',
    bgTint: '#EFF6FF',
    summary:
      'Guarantees electronic laboratory notebooks, sample custody records, and digital sign-offs remain trustworthy and equivalent to wet-ink signatures.',
    controls: [
      'Cryptographic dual-credential e-signature challenges (Password + TOTP/WebAuthn)',
      'Uneditable UTC timestamps with user role, action meaning, and reason-for-change',
      'System-enforced session timeouts, password aging, and automated account lockout',
    ],
  },
  {
    id: 'gamp5-gxp',
    code: 'GAMP 5 · GLP / GMP',
    title: 'Computerized System Validation',
    badge: 'GxP Ready',
    accentColor: '#0F766E',
    bgTint: '#F0FDFA',
    summary:
      'Risk-based computerized system validation lifecycle supporting preclinical GLP studies and GMP manufacturing QC release testing.',
    controls: [
      'Complete IQ / OQ / PQ validation documentation packs updated on every release',
      'Version-controlled SOP publishing with mandatory training acknowledgement logs',
      'Deviation and CAPA workflows linked directly to out-of-spec (OOS) assay runs',
    ],
  },
  {
    id: 'iso-17025',
    code: 'ISO 17025 · ISO 9001',
    title: 'Testing & Calibration Competency',
    badge: 'ISO Aligned',
    accentColor: '#10B981',
    bgTint: '#ECFDF5',
    summary:
      'Maintains continuous equipment traceability, calibration drift tolerances, and analytical method competency across shared lab instruments.',
    controls: [
      'Automated instrument lockout when NIST calibration certificates expire',
      'Real-time MQTT temperature, humidity, and CO2 excursion logs for cryo storage',
      'Standardized Certificate of Analysis (CoA) export with traceable raw file checksums',
    ],
  },
  {
    id: 'hipaa-soc2',
    code: 'HIPAA · SOC 2 · GDPR',
    title: 'Clinical Specimen & PHI Protection',
    badge: 'Zero-Trust',
    accentColor: '#0284C7',
    bgTint: '#F0F9FF',
    summary:
      'Safeguards patient biospecimens, genomic files, and clinical trial data with strict multi-tenant isolation and signed BAAs.',
    controls: [
      'AES-256 encryption at rest with customer-managed Bring-Your-Own-Key (BYOK) KMS',
      'TLS 1.3 transport encryption and automated PHI de-identification for research views',
      'Double-blind clinical cohort randomization with strict RBAC/ABAC access boundaries',
    ],
  },
];

export const SECURITY_CONTROLS: SecurityControl[] = [
  {
    id: 'encryption',
    title: 'End-to-End AES-256 & BYOK KMS',
    badge: 'Data Protection',
    desc: 'All FASTQ/BAM sequencing objects, ELN entries, and database rows are encrypted at rest with optional customer-managed KMS keys and TLS 1.3 in transit.',
    accentColor: '#1E40AF',
  },
  {
    id: 'rbac-abac',
    title: 'Granular RBAC & Sponsor Isolation',
    badge: 'Access Control',
    desc: 'Enforce role- and attribute-based permissions across PIs, Lab Techs, QA Officers, and external CRO sponsors with zero cross-tenant data leakage.',
    accentColor: '#0F766E',
  },
  {
    id: 'sso-mfa',
    title: 'Federated SSO & FIDO2 Hardware Keys',
    badge: 'Identity',
    desc: 'Supports SAML 2.0 / OIDC (Okta, Microsoft Entra ID, Google Workspace, ORCID, InCommon) with enforced MFA and WebAuthn security keys.',
    accentColor: '#7E22CE',
  },
  {
    id: 'continuity',
    title: '99.98% Uptime & Immutable Backups',
    badge: 'Resilience',
    desc: 'Multi-AZ active replication, point-in-time recovery, and immutable object-lock archival for long-term FDA/EMA retention mandates.',
    accentColor: '#10B981',
  },
];
