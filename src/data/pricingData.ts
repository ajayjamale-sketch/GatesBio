export interface PricingHighlight {
  id: string;
  value: string;
  label: string;
  targetSection: string;
  accentColor: string;
}

export interface ComparisonRow {
  capability: string;
  academic: string;
  growth: string;
  enterprise: string;
}

export interface PricingFaq {
  q: string;
  a: string;
}

export const PRICING_HIGHLIGHTS: PricingHighlight[] = [
  {
    id: 'academic',
    value: 'From $49 / mo',
    label: 'Grant-eligible academic rate',
    targetSection: 'pricing-plans',
    accentColor: '#1E40AF',
  },
  {
    id: 'discount',
    value: 'Save 20% Annually',
    label: 'Transparent per-seat billing',
    targetSection: 'pricing-plans',
    accentColor: '#10B981',
  },
  {
    id: 'roi',
    value: '~6.5 Hrs / Week',
    label: 'Reclaimed per researcher',
    targetSection: 'pricing-roi',
    accentColor: '#0F766E',
  },
  {
    id: 'enterprise',
    value: '99.99% SLA + VPC',
    label: 'Dedicated single-tenant & BYOK',
    targetSection: 'pricing-comparison',
    accentColor: '#7E22CE',
  },
];

export const PLAN_COMPARISON_ROWS: ComparisonRow[] = [
  {
    capability: 'Active Researchers & Lab Techs',
    academic: 'Up to 15 seats',
    growth: 'Unlimited seats',
    enterprise: 'Unlimited + Multi-Site',
  },
  {
    capability: 'Sample Registry Capacity',
    academic: 'Up to 10,000 vials',
    growth: 'Up to 250,000 vials',
    enterprise: 'Unlimited + Multi-Cryo',
  },
  {
    capability: '96 / 384-Well Plate Designer',
    academic: '96-well standard',
    growth: '96 & 384-well heatmaps',
    enterprise: 'Custom + Tecan / Hamilton',
  },
  {
    capability: 'FDA 21 CFR Part 11 & E-Signatures',
    academic: 'Timestamped ELN logs',
    growth: 'Included (Dual-Key)',
    enterprise: 'Full + GAMP 5 IQ/OQ Pack',
  },
  {
    capability: 'AI Research Intelligence (PubMed RAG)',
    academic: 'Standard query quota',
    growth: 'Full RAG + Anomaly Assist',
    enterprise: 'Private Corpus + Custom LLM',
  },
  {
    capability: 'Deployment & Encryption',
    academic: 'Multi-tenant Cloud',
    growth: 'Multi-tenant + AES-256',
    enterprise: 'Dedicated VPC / On-Prem + BYOK',
  },
];

export const PRICING_FAQS: PricingFaq[] = [
  {
    q: 'Is GatsBio validated for FDA 21 CFR Part 11 and GxP environments?',
    a: 'Yes. Growth Biotech and Enterprise plans include cryptographic dual-factor electronic signatures, append-only SHA-256 audit trails, mandatory reason-for-change logging, and automated account lockout policies meeting FDA 21 CFR Part 11 and EU Annex 11 requirements.',
  },
  {
    q: 'Can we migrate historical data from Benchling, LabGuru, or Excel?',
    a: 'Absolutely. GatsBio provides automated CSV/JSON bulk accessioning importers with automatic specimen schema mapping. Our solutions engineering team assists with legacy ELN and freezer coordinate migrations at zero onboarding fee on annual plans.',
  },
  {
    q: 'How does GatsBio integrate with automated liquid handlers (Tecan, Hamilton)?',
    a: 'GatsBio exports standard well-coordinate worklists (CSV, XML, JSON) and provides REST/GraphQL and Webhook APIs that interface directly with robotic pipetting stations, sequencers, and LIMS middleware.',
  },
  {
    q: 'Do you offer academic or NIH/NSF grant discounts?',
    a: 'Yes. Verified universities, academic medical centers, and non-profit research institutes qualify for our Academic & Research plan starting at $49/user/month billed annually, with federated ORCID and InCommon/eduGAIN SSO.',
  },
  {
    q: 'Can Enterprise teams deploy in a private cloud (VPC) or on-premises?',
    a: 'Yes. Our Enterprise Biopharma tier supports single-tenant VPC deployments across AWS, Azure, or Google Cloud, as well as air-gapped on-premises installations with Bring-Your-Own-Key (BYOK) KMS encryption.',
  },
];
