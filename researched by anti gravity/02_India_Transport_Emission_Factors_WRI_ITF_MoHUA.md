# India-Specific Passenger Transport Emission Factors & Life-Cycle Assessment (LCA)

- **Primary Sources**:
  1. **WRI India / India GHG Program (2015)** — *India Specific Road Transport Emission Factors*, *Rail Transport Emission Factors*, and *Air Transport Emission Factors* (`All researched Docs/Road Transport Technical Paper.pdf`, `Rail Transport Emission.pdf`, `AIR Transport Emission.pdf`).
  2. **International Transport Forum (ITF) & The World Bank (August 2023)** — *Life-Cycle Assessment of Passenger Transport: An Indian Case Study* (`All researched Docs/life-cycle-assessment-passenger-transport-india.pdf`).
  3. **Ministry of Housing and Urban Affairs (MoHUA, 2026)** — *Appraisal Guidelines for Metro Rail Project Proposals* (referenced in `All researched Docs/perplexity.json`).

---

## 1. Two-Wheelers (Scooters & Motorcycles)

### A. Tailpipe / Operational Factors (WRI India GHG Program, with 10% real-world uplift)
- **Scooter (<110 cc, e.g., Activa, Jupiter, Dio)**: `0.0368 kg CO₂/vkm` (without uplift: `0.0334`)
- **Scooter (<150 cc)**: `0.0387 kg CO₂/vkm`
- **Motorcycle (<100 cc, e.g., Splendor)**: `0.0358 kg CO₂/vkm`
- **Motorcycle (<125 cc, e.g., Shine, Platina)**: `0.0319 kg CO₂/vkm`
- **Motorcycle (<200 cc, e.g., Pulsar, Apache)**: `0.0458 kg CO₂/vkm`
- **MoHUA 2026 Generic Two-Wheeler**: `0.02858 kg CO₂/vkm` (`0.02382 kg CO₂/pkm` at `1.2` default occupancy)

### B. Full Life-Cycle Assessment (ITF & World Bank 2023, Intended Policy Scenario — `kg CO₂e/pkm`)
- **Petrol Scooter (Private)**: **`0.074 kg CO₂e/pkm`** (`4.8 tCO₂e` lifetime)
- **Electric Scooter (BEV, Private)**: **`0.046 kg CO₂e/pkm`** (`3.0 tCO₂e` lifetime; `35%` of total lifecycle emissions come from battery & vehicle manufacturing, `25%` from road infrastructure, `39%` from grid electricity usage)
- **Petrol Motorcycle (Private)**: **`0.065 kg CO₂e/pkm`** (`4.2 tCO₂e` lifetime)
- **Electric Motorcycle (BEV, Private)**: **`0.047 kg CO₂e/pkm`** (`3.1 tCO₂e` lifetime)

---

## 2. Three-Wheelers (Auto-Rickshaws)

- **WRI India (Tailpipe per vehicle-km)**:
  - CNG Auto: `0.10768 kg CO₂/vkm`
  - Petrol Auto: `0.1135 kg CO₂/vkm`
  - Diesel Auto: `0.1322 kg CO₂/vkm`
- **MoHUA (2026)**: `0.07789 kg CO₂/vkm` → **`0.02596 kg CO₂/pkm`** when shared by 3 passengers.
- **ITF & World Bank (2023, Full LCA)**:
  - Diesel 3W: `0.104 kg CO₂e/pkm` (`0.177 kg/vkm`)
  - CNG 3W: **`0.075 kg CO₂e/pkm`** (`0.128 kg/vkm`)
  - Electric 3W (e-Rickshaw / BEV-IPS): **`0.044 kg CO₂e/pkm`** (`0.075 kg/vkm`, `-41%` vs CNG, `-57%` vs Diesel)

---

## 3. Four-Wheelers (Private Cars, Hatchbacks, Sedans, SUVs & Ride-Hailing)

### A. WRI India Tailpipe Factors (with 8% CRRI real-world uplift)
- **Small Car (<800 cc Petrol / CNG)**: `0.111 kg CO₂/vkm` (Petrol) · `0.068 kg CO₂/vkm` (CNG)
- **Hatchback (<1000 cc – <1400 cc Petrol)**: `0.127 – 0.140 kg CO₂/vkm`
- **Sedan (<1600 cc Petrol / Diesel)**: `0.153 kg CO₂/vkm` (Petrol) · `0.141 kg CO₂/vkm` (Diesel)
- **SUV (<2500 cc – <3000 cc Diesel)**: `0.210 – 0.220 kg CO₂/vkm`
- **Hybrid (<2000 cc Petrol)**: `0.103 kg CO₂/vkm`
- **MoHUA 2026 Car Avg**: `0.13952 kg CO₂/vkm`

### B. ITF & World Bank (2023, Full LCA)
- **Private Car (Petrol ICE, 1.5 avg occupancy)**: `0.243 kg CO₂e/vkm` · **`0.162 kg CO₂e/pkm`** (`44.0 tCO₂e` lifetime)
- **Private Car (BEV, Intended Policy Scenario)**: `0.177 kg CO₂e/vkm` · **`0.118 kg CO₂e/pkm`** (`32.0 tCO₂e` lifetime; **`37%`** of lifecycle emissions come from battery & vehicle manufacturing, `17%` infrastructure, `46%` electricity use)
- **Shared Ride-Hailing / Cab (Diesel, 0.95 effective occupancy incl. deadheading)**: **`0.318 kg CO₂e/pkm`** (`0.257 kg/vkm`) vs **Shared BEV**: **`0.160 kg CO₂e/pkm`** (`0.129 kg/vkm`)

---

## 4. Public Transit: Buses, Suburban Rail, Metro & Aviation

| Mode | Operational India EF (`kg CO₂/pkm`) | Full LCA (ITF 2023, `kg CO₂e/pkm`) | Source |
| :--- | :--- | :--- | :--- |
| **Intracity Bus (Avg)** | **0.015161** | `0.028 – 0.046` (Diesel), `0.031 – 0.044` (CNG) | WRI India 2015 / ITF 2023 |
| **Electric Bus (IPS / 100% RE)** | — | **0.026 – 0.034** (Grid) · **0.006** (100% RE) | ITF & World Bank 2023 |
| **Indian Railways (Suburban)** | **0.007976** | — | WRI India 2015 (2014-15 data) |
| **Indian Railways (Non-Suburban)** | **0.007837** | — | WRI India 2015 (2014-15 data) |
| **Metro Rail (6-Car Train)** | — | **0.024** (IPS, at 6,000 phpdt) | ITF & World Bank 2023 |
| **Domestic Flight (India)** | **0.121** | `0.22928` (UK DEFRA w/ radiative forcing) | WRI India 2015 / DEFRA 2025 |

---

## 5. Key Behavioural & Technical Takeaways Used in App
1. **Occupancy Multiplier**: Sharing a petrol car with 3 friends slashes per-person operational carbon from `0.140` to `0.035 kg CO₂/pkm`.
2. **EV Nuance**: Selecting an EV Scooter or EV Car sets tailpipe emissions near zero (charging at `0.03–0.14 kWh/km × 0.675 kg CO₂/kWh`), while gently reminding the user of the `35–37%` manufacturing battery footprint reported by ITF & World Bank (2023).
3. **Walking & Cycling**: `0.000 kg CO₂/pkm` operational emissions.
