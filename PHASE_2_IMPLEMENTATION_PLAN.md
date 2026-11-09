# GatsBio — Phase 2 Detailed Implementation Plan
## Public SaaS Experience & Customer Acquisition Suite

---

| **Document Version** | 1.0.0 |
| :--- | :--- |
| **Phase Focus** | Phase 2: Public-Facing Marketing & Scientific Conversion Suite |
| **Parent Roadmap** | [`IMPLEMENTATION_PLAN.md`](file:///d:/MVP/GatesBio/IMPLEMENTATION_PLAN.md) |
| **Design Specifications** | [`design.md`](file:///d:/MVP/GatesBio/design.md) |
| **Tech Stack** | React 19, TypeScript, Vite, `@mui/icons-material`, `@mui/material`, `framer-motion` |
| **Target Audience** | Biotech Executives, Principal Investigators (PIs), Lab Managers, Compliance Officers |

---

## 1. Phase 2 Scope & Objectives

The goal of Phase 2 is to deploy a public-facing website for **GatsBio** that delivers:
1. **Scientific Rigor & Authority**: High-density UI designed specifically for life sciences, biopharma, and clinical research.
2. **Interactive Proof of Value**: Live interactive widgets directly on the public pages (interactive 96-well plate teaser, real-time serial dilution calculator, DNA $T_m$ calculator).
3. **Regulatory Trust**: A dedicated Trust & Compliance Center showcasing FDA 21 CFR Part 11, GAMP 5, and HIPAA readiness.
4. **Frictionless Lead Capture**: Interactive "Book a Demo" modal and transparent pricing with instant seat cost estimation.

---

## 2. Component & Page Architecture

```
src/
├── components/
│   └── public/
│       ├── PublicNavbar.tsx            # Sticky header with multi-level dropdowns & mobile drawer
│       ├── PublicFooter.tsx            # Multi-column enterprise footer & compliance badges
│       ├── HeroSection.tsx             # Dynamic hero with live counters & interactive sample badge
│       ├── FeatureSwitcher.tsx         # Interactive tabs: LIMS vs ELN vs AI vs 21 CFR Part 11
│       ├── InteractivePlateTeaser.tsx  # Live mini 96-well preview on homepage
│       ├── TrustCertifications.tsx     # FDA, ISO, HIPAA, SOC 2 compliance display
│       ├── PricingMatrix.tsx           # Monthly/Annual toggle, tiers & FAQ accordion
│       ├── DemoBookingModal.tsx        # Multi-step consultation & lab qualification modal
│       └── calculators/
│           ├── SerialDilutionCalc.tsx  # Interactive well-by-well concentration generator
│           └── DnaTmCalculator.tsx     # Instant GC% and primer annealing calculator
├── pages/
│   └── public/
│       ├── HomePage.tsx                # Main conversion-optimized landing page
│       ├── PlatformPage.tsx            # Deep-dive across all 6 platform pillars
│       ├── SolutionsPage.tsx           # Industry-segmented pages (Biopharma, Academia, CROs)
│       ├── CompliancePage.tsx          # Trust, 21 CFR Part 11, & audit trail explainer
│       ├── PricingPage.tsx             # Interactive pricing, seat calculator & FAQ
│       └── ToolsPage.tsx               # Free laboratory calculators hub
```

---

## 3. Step-by-Step Task Breakdown

### Step 2.1: Master Public Navigation (`<PublicNavbar />`)
- **Visual Design**:
  - Glassmorphic backdrop blur (`backdrop-blur-md bg-white/90 border-b border-slate-200`).
  - GatsBio Helix Logo with Deep Blue (`#1E40AF`) and Teal (`#0F766E`) gradient typography.
- **Desktop Navigation Items**:
  1. **Platform Dropdown**:
     - *LIMS & Sample Logistics* (`QrCodeScanner` icon)
     - *Electronic Lab Notebook - ELN* (`MenuBook` icon)
     - *Biological Data Lake* (`Storage` icon)
     - *AI Research Engine* (`AutoAwesome` icon)
     - *Equipment IoT & Calibration* (`DeviceHub` icon)
     - *Clinical Trials (GCP)* (`Medication` icon)
  2. **Solutions Dropdown**:
     - *Biopharma & Therapeutics* (`Biotech` icon)
     - *Academic & University Institutes* (`School` icon)
     - *Contract Research (CROs)* (`Hub` icon)
     - *Diagnostics & Clinical Labs* (`Science` icon)
  3. **Trust & Compliance** (`FactCheck` icon $\rightarrow$ direct link to `/compliance`)
  4. **Pricing** (`AttachMoney` icon $\rightarrow$ direct link to `/pricing`)
  5. **Free Lab Tools** (`Calculate` icon $\rightarrow$ direct link to `/tools`)
- **Actions**:
  - `Sign In`: Opens quick login/persona selector.
  - `Book a Demo`: High-contrast Deep Blue button opening the `<DemoBookingModal />`.
- **Mobile Experience**:
  - Hamburger menu toggling a slide-out drawer with accordion navigation.

---

### Step 2.2: Scientific SaaS Landing Page (`<HomePage />`)
- **Hero Section**:
  - Headline: *"The Unified Operating System for Life Sciences & Biotechnology"*
  - Subhead: *"Unify sample logistics, electronic lab notebooks, genomic data, and FDA 21 CFR Part 11 compliance into a single digital laboratory ecosystem."*
  - Live animated metric chips:
    - `1.4M+` Samples accessioned
    - `99.98%` Audit readiness score
    - `65%` Faster experimental turnarounds
  - Interactive Action Row: `Book a Live Demo` (Primary) + `Explore Lab Workstation` (Outline).
- **Interactive Product Feature Switcher**:
  - Four distinct tabs:
    1. **LIMS & Sample Tracking**: Barcoded accessioning, 96-well mapping, cryogenic freezer locations.
    2. **Electronic Lab Notebook (ELN)**: Protocol templates, collaborative checklist runs, observation notes.
    3. **AI Research Intelligence**: PubMed/bioRxiv RAG, hypothesis generation, drug interaction analysis.
    4. **21 CFR Part 11 Compliance**: Tamper-evident audit trails, dual-credential electronic signatures.
  - Clicking each tab renders an interactive simulated interface with real data and action buttons.
- **Interactive Mini 96-Well Plate Teaser**:
  - Visitors can click wells ($A1-H12$) directly on the landing page to inspect concentration ($\text{ng}/\mu\text{L}$) and sample tags, demonstrating the platform’s high-density capabilities.
- **Pain Point vs. Solution Matrix**:
  - *Paper notebooks & Excel sheets* $\rightarrow$ *Audit-ready cloud ELN*
  - *Lost freezer vials* $\rightarrow$ *Hierarchical barcode tracking*
  - *Regulatory audit panic* $\rightarrow$ *Immutable SHA-256 digital signature chains*
- **Social Proof & Testimonials**:
  - High-impact testimonials from Principal Investigators and Laboratory Operations Directors.

---

### Step 2.3: Platform Overview Page (`<PlatformPage />`)
- Detailed breakdown of all 6 platform modules with full architecture diagrams and key capabilities:
  - Specimen lifecycle management.
  - Robotic liquid handler integrations (Tecan, Hamilton).
  - High-throughput genomic and multi-omic data streaming.
  - IoT freezer temperature telemetry.
- Direct "Try in Sandbox" buttons routing visitors to simulated lab views.

---

### Step 2.4: Trust & Compliance Center (`<CompliancePage />`)
- **FDA 21 CFR Part 11 Interactive Explorer**:
  - Explanation of dual-key digital signatures, reason-for-signature capture, and system-enforced timeouts.
  - **Live Audit Trail Simulator**: A clickable demo table showing real-time cryptographic hash generation (`SHA-256`) as simulated records change.
- **Standards & Certifications**:
  - Good Laboratory Practice (GLP) & Good Manufacturing Practice (GMP).
  - ISO 17025 (Testing and Calibration Laboratories) & ISO 9001.
  - HIPAA Security Rule & Business Associate Agreement (BAA) readiness.
  - SOC 2 Type II and GDPR data protection frameworks.

---

### Step 2.5: Interactive Pricing & ROI Page (`<PricingPage />`)
- **Billing Frequency Switcher**:
  - Toggle between **Monthly** and **Annual** (displaying a green `Save 20%` badge).
- **Three Pricing Tiers**:
  1. **Academic & Research Labs**:
     - `$49 / user / month` (billed annually)
     - Unlimited protocols, up to 10,000 samples, basic ELN, community support.
  2. **Growth Biotech** (*Most Popular*):
     - `$199 / user / month` (billed annually)
     - Full LIMS, 96/384-well plate visualizer, freezer hierarchy, 21 CFR Part 11 audit trails, AI research engine.
  3. **Enterprise Biopharma**:
     - Custom pricing (Contact Sales)
     - Dedicated VPC or on-prem deployment, BYOK encryption, unlimited storage, custom robotics API integration, 99.95% uptime SLA.
- **Interactive Seat Calculator**:
  - Sliders for number of researchers and lab technicians dynamically calculating total monthly/annual investment and estimated ROI (hours saved per week).
- **Frequently Asked Questions (FAQ)**:
  - Collapsible accordions answering compliance, migration from Benchling/spreadsheets, data security, and onboarding.

---

### Step 2.6: Free Scientific Lab Calculators (`<ToolsPage />`)
Provides immediate utility for visiting researchers, driving organic inbound traffic:
1. **Serial Dilution Calculator**:
   - Inputs: Stock Concentration, Desired Dilution Factor (e.g., 1:2, 1:10), Final Volume per well ($\mu\text{L}$), Number of wells.
   - Outputs: Stock transfer volume, diluent volume, and visual gradient across an 8-well strip with concentration labels.
2. **DNA / RNA Melting Temperature ($T_m$) & Annealing Calculator**:
   - Inputs: Nucleotide sequence string (e.g., `ATGCGATC...`), primer concentration ($\text{nM}$), salt concentration ($[\text{Na}^+]$).
   - Outputs: Sequence length (bp), GC content (%), Melting Temperature ($T_m$ in °C), and recommended PCR Annealing Temperature ($T_a$).

---

### Step 2.7: Consultation & Demo Booking Modal (`<DemoBookingModal />`)
- Multi-step modal triggered by "Book a Demo" buttons:
  - **Step 1: Lab Profile**: Organization Name, Primary Focus (Biopharma, Academic, CRO, Diagnostics), Lab Team Size.
  - **Step 2: Key Challenges**: Multi-select pills (*LIMS & Sample Loss*, *ELN Migration*, *21 CFR Part 11 Compliance*, *AI Research*).
  - **Step 3: Schedule Slot**: Date & time selection with timezone detection.
  - **Step 4: Confirmation**: Animated confirmation with calendar invite download.

---

### Step 2.8: Enterprise Public Footer (`<PublicFooter />`)
- **Structured 5-Column Sitemap**:
  - *Platform*: LIMS, ELN, Genomics, AI Engine, Equipment, Clinical Trials.
  - *Solutions*: Biopharma, Academia, CROs, Diagnostics.
  - *Resources*: Lab Calculators, Compliance Whitepapers, API Docs, Release Notes.
  - *Company*: About Us, Leadership, Careers, Press, Contact Sales.
  - *Legal & Security*: 21 CFR Part 11 Statement, HIPAA Compliance, Privacy Policy, Terms of Service.
- **Trust Badges**:
  - ISO 27001, SOC 2 Type II, 21 CFR Part 11 Compliant, HIPAA Ready.

---

## 4. Phase 2 Deliverables & Acceptance Checklist

| Deliverable | Acceptance Criteria |
| :--- | :--- |
| **`<PublicNavbar />`** | Sticky behavior, glassmorphic blur, full dropdowns with MUI icons, responsive mobile drawer. |
| **`<HomePage />`** | High-impact hero, animated counters, 4-tab interactive feature switcher, mini 96-well plate teaser. |
| **`<PlatformPage />`** | Clear 6-pillar breakdown with visual feature cards and sandbox entry points. |
| **`<CompliancePage />`** | Interactive 21 CFR Part 11 audit simulator with live SHA-256 hash generation. |
| **`<PricingPage />`** | Annual/monthly toggle with 20% discount calculation, 3 tier cards, dynamic seat calculator, FAQ. |
| **`<ToolsPage />`** | Working serial dilution math and DNA $T_m$ / GC% calculator with instant graphical feedback. |
| **`<DemoBookingModal />`** | 4-step interactive qualification wizard with validation and confirmation state. |
| **`<PublicFooter />`** | 5-column navigation, compliance badges, and responsive wrapping. |
| **Build & Typecheck** | Zero TypeScript errors (`npm run build` succeeds cleanly). |
