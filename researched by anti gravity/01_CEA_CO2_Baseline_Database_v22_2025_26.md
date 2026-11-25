# CO₂ Baseline Database for the Indian Power Sector (Version 22.0, August 2026)

- **Issuing Authority**: Clean Energy & Energy Transition (CE&ET) Division, Central Electricity Authority (CEA), Ministry of Power, Government of India
- **Publication**: User Guide Version 22.0, August 2026 (Covering FY 2025-26)
- **Primary Reference**: [CEA CO₂ Baseline Database PDF](https://cea.nic.in/api/cdm-report-version/view-pdf/en/82) / `All researched Docs/CO2 Baseline Database.pdf`

---

## 1. National Grid Emission Factors (FY 2025-26, Adjusted for Cross-Border Transfers, incl. RES & Captive)

| Metric | Value (`tCO₂/MWh` = `kg CO₂/kWh`) | Definition & Scope |
| :--- | :--- | :--- |
| **Weighted Average Emission Factor (Incl. RES)** | **0.675** | Total grid CO₂ emissions (1,189.29 MT) divided by total net electricity generation (1,761.28 BU, including conventional, renewable energy, captive injection & cross-border imports). |
| **Simple Operating Margin (OM)** | **0.963** | Weighted average emissions rate of thermal stations (excluding low-cost/must-run hydro, nuclear, and renewables). |
| **Build Margin (BM)** | **0.446** | Average emission intensity of the 20% most recent capacity additions (including renewable energy capacity). |
| **Combined Margin (CM, 50:50)** | **0.705** | Equal-weighted average of OM and BM (`0.5 × 0.963 + 0.5 × 0.446`). |

*Note: Excluding cross-border power transfers, the Weighted Average is `0.678 kg CO₂/kWh`, OM is `0.969`, BM is `0.446`, and CM is `0.708`.*

---

## 2. Historical Decarbonization Trend of the Indian Grid (Annexure-I)

| Fiscal Year | Total CO₂ Emissions (MT) | Conventional Net Gen (BU) | RE Generation (BU) | Total Net Gen (BU) | Weighted Average EF (`kg CO₂/kWh`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **2013-14** | 727.40 | 886.77 | 53.06 | 939.83 | **0.774** |
| **2019-20** | 928.14 | 1,162.97 | 138.34 | 1,301.31 | **0.713** |
| **2020-21** | 910.02 | 1,147.52 | 147.25 | 1,294.77 | **0.703** |
| **2021-22** | 1,002.01 | 1,230.09 | 170.91 | 1,401.01 | **0.715** |
| **2022-23\*** | 1,108.11 | 1,320.18 | 203.55 | 1,547.80 | **0.716** |
| **2023-24** | 1,203.36 | 1,408.45 | 225.83 | 1,654.54 | **0.727** |
| **2024-25** | 1,235.96 | 1,461.85 | 255.01 | 1,740.54 | **0.710** |
| **2025-26** | 1,189.29 | 1,424.19 | 310.58 | 1,761.28 | **0.675** |

*\*FY 2022-23 onwards include grid-connected captive power injection and cross-border electricity transfer adjustments.*

---

## 3. Installed Capacity Mix & Fossil Fuel Station Specific Emissions (as on 31.03.2026)

- **Total All-India Installed Capacity**: **532,739.72 MW**
  - **Thermal**: `249,271.63 MW` (Coal: `221,940.01 MW`, Gas: `20,122.41 MW`, Lignite: `6,620.00 MW`, Diesel: `589.20 MW`)
  - **Renewable Energy Sources (RES)**: `223,273.43 MW` (Solar: `150,261 MW`, Wind: `56,095 MW`, Biomass/Cogen: `10,869 MW`, Small Hydro: `5,171 MW`, Waste-to-Energy: `877 MW`)
  - **Large Hydro (incl. PSPs)**: `51,414.66 MW`
  - **Nuclear**: `8,780.00 MW`

### Fossil Fuel Specific Emissions (FY 2025-26, `tCO₂/MWh` net generation)
- **Coal**: `0.971`
- **Gas**: `0.470`
- **Lignite**: `1.348`

---

## 4. National Biomass Co-Firing Mission (SAMARTH) Performance
- **Thermal Power Plants Co-firing**: `75` TPPs (`100,071 MW` combined capacity)
- **Biomass Co-fired in FY 2025-26**: `3,071,938 MT` (~`3.07 million tonnes`, nearly 90% YoY growth from `1.618 million tonnes` in FY 2024-25)
- **CO₂ Saved via Biomass Co-firing (FY 2025-26)**: **3,686,326 tonnes CO₂** (~`3.68 million tonnes`)

---

## 5. Application in CarbCalc
1. **Default Household / Hostel Electricity Factor**: Replaced the legacy presentation factor (`0.82`) with India's latest official **`0.675 kg CO₂/kWh`** (`CEA v22.0, FY 2025-26`).
2. **Formula**: `Daily Electricity CO₂ (kg) = (Monthly kWh ÷ 30 ÷ Occupants) × 0.675`.
3. **Earth Pulse Highlight**: Demonstrates how India's rapid solar expansion (`150.26 GW` solar installed) pulled grid intensity down from `0.774` to `0.675` over the last decade.
