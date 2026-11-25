# Digital, AI & Cloud Backend vs. Mobile Battery Footprint

- **Primary Sources**:
  1. **Indian Academy of Sciences — *Resonance* (Vol. 30, No. 12, Dec 2025, pp. 1575–1589)**: *"Think Before You Click"* ([IAS Fulltext](https://www.ias.ac.in/article/fulltext/reso/030/12/1575-1589)).
  2. **Central Electricity Authority (CEA, August 2026)**: India grid factor `0.675 kg CO₂/kWh`.
  3. **Luccioni, Jernite & Strubell (2024)**: *"Power Hungry Processing: Watts Driving the Cost of AI Deployment?"* (*ACM FAccT*).

---

## 1. Why Your Phone Battery Is Only the Tip of the Iceberg

When you use an app, stream HD video, or prompt a Large Language Model (ChatGPT, Gemini, Claude) on your phone:
1. **Local Mobile Device Power (Small Portion)**:
   - A standard smartphone battery (`4,500 mAh` at `3.85 V`) stores **`17.33 Wh`** (`0.01733 kWh`).
   - Accounting for ~20% wall-charger & battery-charging conversion losses, a full `0% → 100%` charge draws **`0.021 kWh`** from the wall.
   - On the Indian power grid (`0.675 kg CO₂/kWh`), **one full smartphone charge emits just `14.2 grams` (`0.0142 kg CO₂`)**.
   - Using `10%` of your phone battery for an AI chat or browsing session accounts for only **`1.42 grams` (`0.00142 kg CO₂`)** locally.

2. **Cloud Server & Data Center Backend (The Hidden Multiplier)**:
   - According to *Resonance* (Indian Academy of Sciences, Dec 2025), **a single generative AI / LLM query emits ~`2.2 grams CO₂e`** (`0.0022 kg CO₂e`) across remote GPU clusters, cooling systems, and network transmission (higher for reasoning/image generation models).
   - **Real-world comparison**:
     - Sending **30 AI prompts** during an evening assignment drains ~10% battery (`1.42 g CO₂` locally) while generating **`66.0 grams CO₂e`** (`0.066 kg CO₂e`) in cloud data centers — **~46× larger than the phone battery consumption itself**.
   - **HD Video Streaming (YouTube / Reels / OTT)**:
     - *Resonance* (2025) reports **`0.46 grams CO₂e/minute`** = **`27.6 grams CO₂e/hour`** (`0.0276 kg CO₂e/hour`) including data-center storage, CDN transmission, and cellular/Wi-Fi network overhead (`~0.08 kWh/hr` end-to-end).

---

## 2. Summary Emission Factors Used in CarbCalc

| Digital Activity | Local Phone Battery Share | Cloud / Network Share | Combined Factor | Citation |
| :--- | :--- | :--- | :--- | :--- |
| **Full Smartphone Charge (0–100%)** | `0.0142 kg CO₂` | — | `0.0142 kg CO₂ / charge` | CEA v22.0 (`0.021 kWh × 0.675`) |
| **AI / LLM Prompt (ChatGPT / Gemini)** | `~0.00005 kg CO₂` | `0.0022 kg CO₂e` | **`0.0022 kg CO₂e / query`** | IAS *Resonance* (Dec 2025) |
| **HD Video Streaming** | `~0.0025 kg CO₂/hr` | `0.0251 kg CO₂e/hr` | **`0.0276 kg CO₂e / hour`** | IAS *Resonance* (Dec 2025) |

---

## 3. Design & UX Note
Per the project design, digital/AI cloud footprint is **not** isolated into a cluttered technical dashboard; instead, it appears seamlessly inside the user's unified daily rhythm with plain, relatable wording showing how tiny phone-battery power is compared to the cloud servers woken up behind the scenes.
