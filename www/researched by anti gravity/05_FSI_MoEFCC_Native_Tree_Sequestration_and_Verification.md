# Native Indian Tree Carbon Sequestration & Optical/Geotag Verification Methodology

- **Primary Sources**:
  1. **Forest Survey of India (FSI), Ministry of Environment, Forest and Climate Change (MoEFCC)** — *India State of Forest Report (ISFR)* Carbon Stock & Allometric Biomass Framework.
  2. **Indian Urban Forestry & Dryland Carbon Sink Literature** — Species-level biomass evaluations for *Azadirachta indica* (Neem), *Ficus religiosa* (Peepal), *Ficus benghalensis* (Banyan), *Mangifera indica* (Mango), and *Dendrocalamus strictus* (Bamboo).

---

## 1. FSI / IPCC Biomass-to-CO₂ Conversion Standard

In official FSI forest carbon inventories:
1. Measure tree **Diameter at Breast Height (DBH)** and height to estimate Above-Ground Biomass (AGB) and Below-Ground Biomass (BGB, typically `~0.26 × AGB`).
2. **Carbon Fraction**: Approximately **`47%–50%`** of dry tree biomass is elemental carbon.
3. **Carbon to CO₂ Factor**: Multiply elemental carbon by **`44 / 12 = 3.667`** (molecular weight ratio of $\text{CO}_2$ to $\text{C}$).

$$\text{CO}_2\text{ Sequestered (kg)} = \text{Dry Biomass (kg)} \times 0.50 \times 3.667$$

---

## 2. Annual Sequestration Benchmarks for Native Indian Species

| Species (Common & Botanical Name) | Avg. Annual CO₂ Absorbed (Post-Establishment) | Daily Equivalent | Ecological Notes |
| :--- | :--- | :--- | :--- |
| **Peepal (*Ficus religiosa*)** | **28.0 kg CO₂/year** *(mature: 40–50+ kg/yr)* | `0.077 kg/day` | Massive canopy, long lifespan, exhibits nocturnal/CAM-like stomatal resilience. |
| **Banyan (*Ficus benghalensis*)** | **32.0 kg CO₂/year** | `0.088 kg/day` | Dense woody biomass and aerial prop-root expansion. |
| **Neem (*Azadirachta indica*)** | **22.0 kg CO₂/year** *(15–35 kg/yr range)* | `0.060 kg/day` | Hardy native dryland & campus tree; high survival rate across Maharashtra/India. |
| **Desi Mango (*Mangifera indica*)** | **20.0 kg CO₂/year** | `0.055 kg/day` | Dual food-security + carbon-sink value. |
| **Bamboo Clump (*Dendrocalamus strictus*)** | **40.0 kg CO₂/year** *(per mature clump)* | `0.110 kg/day` | Fastest biomass accumulation among native perennial grasses. |

*Note: Newly planted saplings sequester smaller amounts (`~2–6 kg CO₂/year`) during years 1–2 while establishing root systems; CarbCalc tracks weekly survival and rewards steady care toward the long-term tree offset.*

---

## 3. Lightweight Optical Segregation & Silent Geotag Verification (Mobile/Web)

To prevent fake submissions without requiring heavy deep-learning models:
1. **Excess Green Index (ExG) & Foliage Hue Analysis**:
   - Computes $\text{ExG} = 2G - R - B$ and green-hue dominance across sampled canvas pixels. A genuine plant/sapling has concentrated organic green pixels (`8%–75%` frame coverage) rather than flat white/grey walls or artificial neon screen colors.
2. **Earth / Soil Base Presence**:
   - Checks the lower third of the image for natural warm-brown/soil chrominance (`R > G > B` with moderate saturation), distinguishing a sapling planted in soil/planter from a photo of a monitor or potted indoor desk item.
3. **Micro-Texture & Depth Edge Variance**:
   - Measures local pixel-to-pixel luminance gradients (Sobel-like edge energy) to reject smooth blank surfaces or washed-out low-contrast images.
4. **Silent Background Geotag Consistency**:
   - Captures `latitude`/`longitude` silently via browser/Capacitor Geolocation when a planting spot is anchored.
   - Weekly follow-up check-ins compare the new coordinates against the anchor coordinates using the **Haversine distance formula** ($\Delta d \le 75\text{ m}$).
   - **UX Rule**: Never display explicit warnings like *"Location must be enabled"* or *"You cannot spoof location."* Instead, handle location silently in the background and only provide a gentle, natural message if a check-in appears to come from a completely different location.
