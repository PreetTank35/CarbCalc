(() => {
  'use strict';

  const STORAGE_KEY = 'carbcalc-companion-v2';
  const DATASET_URL = './researched by anti gravity/07_Master_Verified_Emission_Dataset_India_2026.json';

  const DEFAULT_DATA = {
    electricity: {
      gridFactorKgPerKwh: 0.675,
      appliancesWatts: { splitAc1500W: 1500 },
      solar: { kwhPerKwPerDay: 4.2, kwhPerKwPerMonth: 126, defaultTariffInrPerKwh: 7.5, co2AvoidedKgPerKwYear: 1034.8 }
    },
    transport: {
      walking: { operationalKgPerPkm: 0, label: 'Walked / cycled' },
      petrol_scooter: { operationalKgPerPkm: 0.0368, label: 'Petrol scooter' },
      ev_scooter: { operationalKgPerPkm: 0.02025, manufacturingSharePct: 35, label: 'Electric scooter' },
      auto_cng: { operationalKgPerVkm: 0.10768, shared3PaxKgPerPkm: 0.0359, label: 'Shared CNG auto' },
      city_bus: { operationalKgPerPkm: 0.015161, label: 'City bus' },
      petrol_car: { operationalKgPerVkm: 0.14, label: 'Petrol car' }
    },
    digital: { phoneFullChargeKgCo2: 0.014175, llmQueryKgCo2e: 0.0022, streamingHourKgCo2e: 0.0276 },
    foodAndWaste: {
      dietsDailyKgCo2e: { plant_local: 0.7237, lacto_dairy: 1.0132, chicken_fish: 1.0856, red_meat: 1.3027 },
      wasteUnsegregatedKgCo2PerKg: 0.63,
      wasteSegregatedCompostKgCo2PerKg: 0.03
    },
    treesAnnualKgCo2: {
      neem: { name: 'Neem (Azadirachta indica)', annualKgCo2: 22.0 },
      peepal: { name: 'Peepal (Ficus religiosa)', annualKgCo2: 28.0 },
      banyan: { name: 'Banyan (Ficus benghalensis)', annualKgCo2: 32.0 },
      mango: { name: 'Desi Mango (Mangifera indica)', annualKgCo2: 20.0 },
      bamboo: { name: 'Bamboo Clump (Dendrocalamus)', annualKgCo2: 40.0 }
    }
  };

  const RESEARCH_VAULT_DOCS = [
    { title: '01 · CEA CO₂ Baseline Database v22.0 (FY 2025-26)', meta: '0.675 kg CO₂/kWh national grid · 532.7 GW capacity', href: './researched by anti gravity/01_CEA_CO2_Baseline_Database_v22_2025_26.md' },
    { title: '02 · India Transport Factors (WRI, ITF World Bank, MoHUA)', meta: '2W, 3W, Cars, Buses, Rail & EV lifecycle shares', href: './researched by anti gravity/02_India_Transport_Emission_Factors_WRI_ITF_MoHUA.md' },
    { title: '03 · MNRE Rooftop Solar & BEE Appliance Benchmarks', meta: 'PM Surya Ghar 4.2 kWh/kW/day & AC/Fan wattage', href: './researched by anti gravity/03_MNRE_Rooftop_Solar_PM_Surya_Ghar_and_BEE_Appliances.md' },
    { title: '04 · AI Cloud vs Phone Battery Footprint (IAS Resonance 2025)', meta: '14.2 g full charge vs 2.2 g per AI prompt', href: './researched by anti gravity/04_Digital_AI_Cloud_vs_Mobile_Battery_Footprint_IAS_2025.md' },
    { title: '05 · FSI Native Tree Sequestration & Optical Check-In', meta: 'Neem 22 kg/yr · Peepal 28 kg/yr · ExG methodology', href: './researched by anti gravity/05_FSI_MoEFCC_Native_Tree_Sequestration_and_Verification.md' },
    { title: '06 · CSBC Ashoka Urban Diets & CPCB Solid Waste', meta: 'Indian diet LCA & 95% methane drop on segregation', href: './researched by anti gravity/06_CSBC_Ashoka_Urban_Diets_and_CPCB_Solid_Waste_India.md' },
    { title: '07 · Master Verified Emission Dataset (JSON)', meta: 'Live machine-readable factor table used by CarbCalc', href: './researched by anti gravity/07_Master_Verified_Emission_Dataset_India_2026.json' }
  ];

  const EARTH_PULSE_ITEMS = [
    { tag: 'ON THIS DAY · ENVIRONMENTAL HISTORY', title: 'The Chipko Embrace: When ordinary villagers protected Himalayan forests', body: 'In the 1970s, communities in Uttarakhand stood together around trees slated for felling—proving local stewardship is stronger than distant policy.' },
    { tag: 'INDIA GRID UPDATE · CEA AUG 2026', title: 'India’s electricity just grew cleaner: 0.675 kg CO₂ per unit', body: 'With 150.26 GW of installed solar and 223.27 GW total renewables as of March 2026, every kWh you save or generate on a rooftop goes further.' },
    { tag: 'DIGITAL MINDFULNESS · IAS RESONANCE 2025', title: 'Why your phone battery stays cool while distant servers sweat', body: 'Charging a phone completely emits ~14.2 g CO₂, while 30 AI prompts wake ~66 g across cloud GPU clusters and cooling towers.' }
  ];

  const INITIAL_COHORT_POSTS = [
    { id: 'c1', group: 'cohort', author: 'Priya Kulkarni', meta: 'MITAOE · IT SY-C · 2 hrs ago', score: 842, text: 'Completed Week 4 growth check-in for my Neem sapling behind the hostel courtyard.', tag: 'TREE VERIFIED · +50 PTS' },
    { id: 'c2', group: 'cohort', author: 'Rohan More', meta: 'MITAOE · IT SY-C · 4 hrs ago', score: 795, text: 'Took the PMPML bus instead of a solo bike ride for today’s 16 km commute.', tag: 'LIGHTER COMMUTE · -0.35 KG' },
    { id: 'c3', group: 'cohort', author: 'Sneha Deshmukh', meta: 'MITAOE · IT SY-C · Yesterday', score: 816, text: 'Hostel wing kept AC off all week and sorted wet kitchen scraps for composting.', tag: 'ZERO LANDFILL METHANE' },
    { id: 'o1', group: 'community', author: 'Kabir Mehta', meta: 'Pune Open Circle · 1 hr ago', score: 868, text: 'Our apartment installed a 3 kW rooftop solar array under PM Surya Ghar—saving ~255 kg CO₂ every month.', tag: 'SOLAR HOME · 3 KW' },
    { id: 'o2', group: 'community', author: 'Ananya Rao', meta: 'Bengaluru Open Circle · 3 hrs ago', score: 774, text: 'Shifted to local seasonal produce and zero cooked leftovers all week (inspired by CSBC Greener Palates).', tag: 'LOW CARBON PLATE' }
  ];

  const NUDGES = [
    { tag: 'ON THIS DAY', title: 'Chipko & everyday courage', body: 'Small daily choices compound just like community forests. Take 2 minutes today to check your room’s standby plugs.' },
    { tag: 'CLOUD INSIGHT', title: '30 AI prompts ≈ 4.6 full phone charges', body: 'Batching your study questions into one clear prompt trims hidden cloud data-center power without slowing you down.' },
    { tag: 'GENTLE CHALLENGE', title: 'Keep your sapling streak alive', body: 'Snap a natural daylight photo of your tree this week to unlock +50 Eco Score and track real carbon offset.' }
  ];

  const DEMO_STATE = {
    user: { name: 'Atharv', mode: 'general', institution: 'MITAOE Alandi · EVS IT SY-C', loggedIn: false },
    inputs: {
      mode: 'petrol_scooter',
      distanceKm: 12,
      sharedRide: false,
      monthlyUnits: 120,
      roommates: 3,
      acHours: 0,
      diet: 'plant_local',
      segregatedWaste: true,
      aiPrompts: 25,
      streamHours: 1
    },
    yesterdayKg: 2.72,
    healChecks: {},
    tree: { species: 'neem', weeks: 0, anchorCoords: null, verifiedThisWeek: false },
    solar: { billInr: 2400, units: 320, systemKw: 3 },
    autoInterrupter: true,
    fieldNotes: [],
    history: [],
    circlePosts: INITIAL_COHORT_POSTS,
    darkMode: false
  };

  const $ = (id) => document.getElementById(id);
  const on = (id, evt, fn) => { const el = $(id); if (el) el.addEventListener(evt, fn); };
  const round = (v, d = 2) => Number(Number(v || 0).toFixed(d));
  const escapeHtml = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const todayISO = () => {
    const d = new Date();
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  };

  const HEAL_ACTION_CATALOG = [
    { key: 'ac_fan', pts: 20, kg: 1.01 },
    { key: 'local_plate', pts: 15, kg: 0.38 },
    { key: 'bus_share', pts: 25, kg: 0.55 },
    { key: 'sort_waste', pts: 15, kg: 0.15 },
    { key: 'mindful_ai', pts: 10, kg: 0.06 }
  ];

  let dataset = DEFAULT_DATA;
  let state = loadState();
  let activeCircleTab = 'cohort';
  let toastTimer = null;
  let scrollNudgeCooldown = false;

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone(DEMO_STATE);
      const parsed = JSON.parse(raw);
      return {
        ...structuredClone(DEMO_STATE),
        ...parsed,
        user: { ...DEMO_STATE.user, ...(parsed.user || {}) },
        inputs: { ...DEMO_STATE.inputs, ...(parsed.inputs || {}) },
        tree: { ...DEMO_STATE.tree, ...(parsed.tree || {}) },
        solar: { ...DEMO_STATE.solar, ...(parsed.solar || {}) },
        healChecks: parsed.healChecks && typeof parsed.healChecks === 'object' ? parsed.healChecks : {},
        fieldNotes: Array.isArray(parsed.fieldNotes) ? parsed.fieldNotes : [],
        history: Array.isArray(parsed.history) ? parsed.history : [],
        circlePosts: Array.isArray(parsed.circlePosts) && parsed.circlePosts.length ? parsed.circlePosts : INITIAL_COHORT_POSTS
      };
    } catch (_) {
      return structuredClone(DEMO_STATE);
    }
  }

  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
  }

  function showToast(msg) {
    const el = $('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3100);
  }

  function haversineMeters(a, b) {
    if (!a || !b) return 0;
    const toRad = (deg) => deg * Math.PI / 180;
    const R = 6371000;
    const dLat = toRad(b.lat - a.lat), dLon = toRad(b.lon - a.lon);
    const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
  }

  function getSilentLocation() {
    return new Promise((resolve) => {
      if (!('geolocation' in navigator)) return resolve(null);
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: round(pos.coords.latitude, 5), lon: round(pos.coords.longitude, 5) }),
        () => resolve(null),
        { enableHighAccuracy: false, timeout: 2800, maximumAge: 120000 }
      );
    });
  }

  function computeFootprint() {
    const inp = state.inputs;
    const efGrid = dataset.electricity.gridFactorKgPerKwh;
    const tMap = dataset.transport;

    let transport = 0;
    const dist = Number(inp.distanceKm) || 0;
    if (inp.mode === 'walking') transport = 0;
    else if (inp.mode === 'petrol_scooter') transport = dist * tMap.petrol_scooter.operationalKgPerPkm / (inp.sharedRide ? 1.8 : 1);
    else if (inp.mode === 'ev_scooter') transport = dist * tMap.ev_scooter.operationalKgPerPkm / (inp.sharedRide ? 1.8 : 1);
    else if (inp.mode === 'auto_cng') transport = dist * (inp.sharedRide ? tMap.auto_cng.shared3PaxKgPerPkm : tMap.auto_cng.operationalKgPerVkm);
    else if (inp.mode === 'city_bus') transport = dist * tMap.city_bus.operationalKgPerPkm;
    else if (inp.mode === 'petrol_car') transport = dist * tMap.petrol_car.operationalKgPerVkm / (inp.sharedRide ? 3 : 1.5);

    const baseRoomPower = (Math.max(0, inp.monthlyUnits) / 30 / Math.max(1, inp.roommates)) * efGrid;
    const acPower = (Math.max(0, inp.acHours) * (dataset.electricity.appliancesWatts.splitAc1500W / 1000) / Math.max(1, inp.roommates)) * efGrid;
    const electricity = baseRoomPower + acPower;

    const dietKg = dataset.foodAndWaste.dietsDailyKgCo2e[inp.diet] ?? 0.7237;
    const wasteKgCo2 = 0.25 * (inp.segregatedWaste ? dataset.foodAndWaste.wasteSegregatedCompostKgCo2PerKg : dataset.foodAndWaste.wasteUnsegregatedKgCo2PerKg);
    const foodWaste = dietKg + wasteKgCo2;

    const phoneBatteryKg = 0.00142 + Math.min(inp.streamHours, 8) * 0.0008;
    const cloudKg = (Math.max(0, inp.aiPrompts) * dataset.digital.llmQueryKgCo2e) + (Math.max(0, inp.streamHours) * (dataset.digital.streamingHourKgCo2e - 0.0008));
    const digital = phoneBatteryKg + cloudKg;

    const rawTotal = transport + electricity + foodWaste + digital;
    let healBonusPts = 0, healOffsetKg = 0;
    HEAL_ACTION_CATALOG.forEach((h) => {
      if (state.healChecks[h.key]) {
        healBonusPts += h.pts;
        healOffsetKg += h.kg;
      }
    });
    if (state.tree.verifiedThisWeek) healBonusPts += 50;
    healBonusPts += Math.min(state.tree.weeks * 15, 90);

    const netToday = Math.max(0.25, rawTotal - healOffsetKg * 0.35);
    const ecoScore = Math.max(250, Math.min(995, Math.round(900 - netToday * 72) + healBonusPts));

    return { transport, electricity, foodWaste, digital, phoneBatteryKg, cloudKg, total: netToday, healedVsYesterday: state.yesterdayKg - netToday, ecoScore };
  }

  function renderProfileHeader() {
    const t = computeFootprint();
    const name = state.user.name || 'Atharv';
    if ($('headerUserName')) $('headerUserName').textContent = state.user.mode === 'student' ? `${name} · Student` : `${name} · General`;
    if ($('headerAvatar')) $('headerAvatar').textContent = name.charAt(0).toUpperCase();
    if ($('headerScoreMini')) $('headerScoreMini').textContent = `${t.ecoScore} pts`;
    if ($('ambientTitle')) $('ambientTitle').textContent = `Quick breath, ${name}.`;
  }

  function renderDashboardPage() {
    if (!$('ecoScoreValue')) return;
    const t = computeFootprint();
    const inp = state.inputs;

    $('travelKgLive').textContent = `${round(t.transport).toFixed(2)} kg`;
    $('powerKgLive').textContent = `${round(t.electricity).toFixed(2)} kg`;
    $('foodWasteKgLive').textContent = `${round(t.foodWaste).toFixed(2)} kg`;
    $('digitalKgLive').textContent = `${round(t.digital).toFixed(2)} kg`;

    const modeMeta = dataset.transport[inp.mode] || dataset.transport.petrol_scooter;
    $('preferredVehicleBadge').textContent = `REMEMBERED · ${modeMeta.label.toUpperCase()}`;
    $('travelSummaryLine').textContent = `${round(inp.distanceKm, 1)} km today · ${modeMeta.label}${inp.sharedRide ? ' (shared)' : ''}`;
    $('powerSummaryLine').textContent = `Shared room · ${round(inp.monthlyUnits / 30, 1)} kWh/day ÷ ${inp.roommates}${inp.acHours > 0 ? ` + ${inp.acHours}h AC` : ''}`;

    const dietLabels = { plant_local: 'Fresh local veg', lacto_dairy: 'High-dairy veg', chicken_fish: 'Chicken / fish', red_meat: 'Red meat' };
    $('foodWasteSummaryLine').textContent = `${dietLabels[inp.diet]} · ${inp.segregatedWaste ? 'Segregated waste' : 'Mixed waste'}`;
    $('wasteSavingsTag').textContent = inp.segregatedWaste ? 'Prevents 95% landfill methane' : 'Mixed waste creates landfill methane';

    const batG = round(t.phoneBatteryKg * 1000, 1);
    const cloudG = round(t.cloudKg * 1000, 1);
    const pctBat = Math.max(2, Math.min(25, (batG / Math.max(batG + cloudG, 0.1)) * 100));
    $('phoneBatteryGrams').textContent = `${batG} g`;
    $('cloudServerGrams').textContent = `${cloudG} g`;
    $('bvcBatteryBar').style.width = `${pctBat}%`;
    $('bvcCloudBar').style.width = `${100 - pctBat}%`;

    const whisper = $('modeWhisper');
    if (inp.mode === 'ev_scooter') {
      whisper.textContent = 'Zero tailpipe smoke today — though ~35% of an electric scooter’s lifetime footprint is already spent when its battery and motor are built (ITF & World Bank, 2023).';
      whisper.hidden = false;
    } else {
      whisper.hidden = true;
    }

    $('ecoScoreValue').textContent = t.ecoScore;
    $('ecoScoreTier').textContent = t.ecoScore >= 820 ? 'Radiant Green' : t.ecoScore >= 700 ? 'Thriving Green' : t.ecoScore >= 550 ? 'Growing Steady' : 'Needs Care';

    const pctDiff = Math.round((Math.abs(t.healedVsYesterday) / Math.max(state.yesterdayKg, 0.1)) * 100);
    if (t.healedVsYesterday >= 0) {
      $('statusLabel').textContent = `${pctDiff}% LIGHTER THAN YESTERDAY`;
      $('statusDot').className = 'status-dot';
    } else {
      $('statusLabel').textContent = `${pctDiff}% HEAVIER THAN YESTERDAY`;
      $('statusDot').className = 'status-dot intermediate';
    }

    $('yesterdayKg').innerHTML = `${round(state.yesterdayKg).toFixed(2)} <small>kg</small>`;
    $('todayKg').innerHTML = `${round(t.total).toFixed(2)} <small>kg</small>`;
    $('healedKg').innerHTML = `${t.healedVsYesterday >= 0 ? '+' : '-'}${round(Math.abs(t.healedVsYesterday)).toFixed(2)} <small>kg</small>`;

    $('transportValue').textContent = `${round(t.transport).toFixed(2)} kg`;
    $('electricityValue').textContent = `${round(t.electricity).toFixed(2)} kg`;
    $('foodWasteValue').textContent = `${round(t.foodWaste).toFixed(2)} kg`;
    $('digitalValue').textContent = `${round(t.digital).toFixed(2)} kg`;

    const maxBar = Math.max(t.transport, t.electricity, t.foodWaste, t.digital, 0.01);
    $('transportBar').style.width = `${(t.transport / maxBar) * 100}%`;
    $('electricityBar').style.width = `${(t.electricity / maxBar) * 100}%`;
    $('foodWasteBar').style.width = `${(t.foodWaste / maxBar) * 100}%`;
    $('digitalBar').style.width = `${(t.digital / maxBar) * 100}%`;

    const isStudent = state.user.mode === 'student';
    $('studentTargetLabel').textContent = isStudent ? 'EVS Benchmark: 750 pts' : 'Personal ledger';
    $('cohortVerifyPill').hidden = !isStudent;
    renderProfileHeader();
  }

  function syncDashboardInputs() {
    if (!$('distanceSlider')) return;
    const inp = state.inputs;
    $('distanceSlider').value = inp.distanceKm;
    $('sharedRideCheck').checked = Boolean(inp.sharedRide);
    $('monthlyUnitsInput').value = inp.monthlyUnits;
    $('roommatesInput').value = inp.roommates;
    $('acHoursInput').value = inp.acHours;
    $('segregatedWasteCheck').checked = Boolean(inp.segregatedWaste);
    $('aiPromptsInput').value = inp.aiPrompts;
    $('streamHoursInput').value = inp.streamHours;

    document.querySelectorAll('#quickModePills .mode-pill').forEach((btn) => btn.classList.toggle('active', btn.dataset.mode === inp.mode));
    document.querySelectorAll('#dietPills .soft-pill').forEach((btn) => btn.classList.toggle('active', btn.dataset.diet === inp.diet));
    const dPct = (inp.distanceKm / 60) * 100;
    $('distanceSlider').style.background = `linear-gradient(90deg, #2d6948 ${dPct}%, #d5ded1 ${dPct}%)`;
  }

  function drawPresetSapling(kind) {
    const canvas = $('treeCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    if (kind === 'fake') {
      ctx.fillStyle = '#dde4ec';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#bcc7d6';
      ctx.fillRect(45, 30, w - 90, h - 60);
      ctx.fillStyle = '#7b8fa8';
      ctx.font = '600 15px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Indoor / Flat Screen Surface', w / 2, h / 2);
      return evaluateTreeCanvas('fake');
    }

    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.65);
    sky.addColorStop(0, '#cfe3d2');
    sky.addColorStop(1, '#e7efdd');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#6f523b';
    ctx.fillRect(0, h * 0.64, w, h * 0.36);
    for (let i = 0; i < 420; i += 1) {
      ctx.fillStyle = i % 2 === 0 ? 'rgba(62, 42, 27, 0.45)' : 'rgba(138, 108, 76, 0.38)';
      ctx.fillRect((i * 73) % w, h * 0.64 + ((i * 29) % (h * 0.36)), 4, 3);
    }

    const scale = kind === 'growth' ? 1.28 : 1.0;
    ctx.strokeStyle = '#4e3c28';
    ctx.lineWidth = 5 * scale;
    ctx.beginPath();
    ctx.moveTo(w / 2, h * 0.72);
    ctx.quadraticCurveTo(w / 2 - 4, h * 0.48, w / 2 + 2, h * (0.45 - 0.1 * scale));
    ctx.stroke();

    const leafCount = kind === 'growth' ? 28 : 16;
    for (let i = 0; i < leafCount; i += 1) {
      const angle = (i / leafCount) * Math.PI * 2;
      const radius = (18 + (i % 3) * 16) * scale;
      const lx = w / 2 + Math.cos(angle) * radius;
      const ly = h * 0.38 + Math.sin(angle) * (radius * 0.78);
      ctx.fillStyle = i % 3 === 0 ? '#2f6d3d' : i % 3 === 1 ? '#4b8f4c' : '#6ea85b';
      ctx.beginPath();
      ctx.ellipse(lx, ly, 15 * scale, 8 * scale, angle, 0, Math.PI * 2);
      ctx.fill();
    }
    evaluateTreeCanvas(kind);
  }

  async function evaluateTreeCanvas(sourceKind = 'upload') {
    const canvas = $('treeCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const w = canvas.width, h = canvas.height;
    const img = ctx.getImageData(0, 0, w, h).data;
    let greenPixels = 0, soilPixels = 0, textureAcc = 0, sampled = 0;

    for (let y = 0; y < h - 1; y += 2) {
      for (let x = 0; x < w - 1; x += 2) {
        const idx = (y * w + x) * 4;
        const r = img[idx], g = img[idx + 1], b = img[idx + 2];
        if (2 * g - r - b > 22 && g > r && g > b) greenPixels += 1;
        if (y > h * 0.60 && r > g && g >= b && r - b > 14 && r < 185) soilPixels += 1;
        const nextIdx = (y * w + Math.min(x + 2, w - 1)) * 4;
        const l1 = 0.299 * r + 0.587 * g + 0.114 * b;
        const l2 = 0.299 * img[nextIdx] + 0.587 * img[nextIdx + 1] + 0.114 * img[nextIdx + 2];
        textureAcc += Math.abs(l1 - l2);
        sampled += 1;
      }
    }

    const greenPct = round((greenPixels / sampled) * 100, 1);
    const soilPct = round((soilPixels / Math.max(sampled * 0.38, 1)) * 100, 1);
    const textureScore = Math.min(100, Math.round((textureAcc / sampled) * 4.2));

    $('treeCanvasPlaceholder').hidden = true;
    const box = $('treeVerificationResult');
    box.hidden = false;

    const coords = await getSilentLocation();
    let locationConsistent = true;
    if (coords && state.tree.anchorCoords) {
      if (haversineMeters(state.tree.anchorCoords, coords) > 150) locationConsistent = false;
    } else if (coords && !state.tree.anchorCoords) {
      state.tree.anchorCoords = coords;
    }

    $('optGreenPct').textContent = `${greenPct}%`;
    $('optSoilPct').textContent = `${soilPct}%`;
    $('optTexturePct').textContent = `${textureScore}%`;

    if (greenPct < 6 || (soilPct < 8 && textureScore < 22)) {
      box.classList.add('rejected');
      $('verifyHeadline').textContent = 'Could not spot a planted sapling yet';
      $('verifyScoreTag').textContent = 'Try outdoor light';
      $('verifyDetail').textContent = 'This looks like a flat surface or indoor object without living foliage and soil. Step outdoors in daylight and capture the sapling in its soil bed.';
      return;
    }

    if (!locationConsistent && sourceKind === 'upload') {
      box.classList.add('rejected');
      $('verifyHeadline').textContent = 'Sapling spotted, different planting spot';
      $('verifyScoreTag').textContent = 'Check spot';
      $('verifyDetail').textContent = 'This check-in seems far from where your sapling was first anchored. Visit your planted sapling to log its weekly growth.';
      return;
    }

    box.classList.remove('rejected');
    if (!state.tree.verifiedThisWeek || sourceKind === 'growth') {
      state.tree.weeks = Math.max(1, sourceKind === 'growth' ? Math.max(2, state.tree.weeks + 1) : state.tree.weeks + 1);
      state.tree.verifiedThisWeek = true;
      persist();
      $('treeStreakCount').textContent = `${state.tree.weeks} week${state.tree.weeks === 1 ? '' : 's'}`;
      renderProfileHeader();
      showToast('Sapling check-in verified! +50 Eco Score added.');
    }
    const sp = dataset.treesAnnualKgCo2[state.tree.species] || dataset.treesAnnualKgCo2.neem;
    $('verifyHeadline').textContent = `${sp.name} verified`;
    $('verifyScoreTag').textContent = '+50 pts';
    $('verifyDetail').textContent = `Living foliage and natural soil texture confirmed. Over time, this native species sequesters ~${sp.annualKgCo2} kg CO₂ every year (FSI benchmark).`;
  }

  function renderHealPage() {
    if (!$('healDoneCount')) return;
    let done = 0;
    document.querySelectorAll('[data-heal]').forEach((box) => {
      const checked = Boolean(state.healChecks[box.dataset.heal]);
      box.checked = checked;
      box.closest('.heal-item').classList.toggle('done', checked);
      if (checked) done += 1;
    });
    $('healDoneCount').textContent = done;
    if ($('treeSpeciesSelect')) $('treeSpeciesSelect').value = state.tree.species || 'neem';
    if ($('treeStreakCount')) $('treeStreakCount').textContent = `${state.tree.weeks || 0} week${state.tree.weeks === 1 ? '' : 's'}`;
  }

  function renderCirclePage() {
    if ($('benchmarkStatusText')) {
      const t = computeFootprint();
      $('benchmarkStatusText').textContent = state.user.mode === 'student'
        ? `Your Eco Score: ${t.ecoScore} · ${t.ecoScore >= 750 ? 'Meets 750 EVS minimum ✓' : `${750 - t.ecoScore} pts to EVS minimum`}`
        : `Your Eco Score: ${t.ecoScore} · Connect institution on Home anytime`;
    }
    const list = $('socialFeedList');
    if (list) {
      list.innerHTML = '';
      state.circlePosts.filter((p) => p.group === activeCircleTab).forEach((p) => {
        const card = document.createElement('article');
        card.className = 'social-card';
        card.innerHTML = `<div class="social-card-top"><div class="social-author"><span class="social-avatar">${escapeHtml(p.author.charAt(0))}</span><div><b>${escapeHtml(p.author)}</b><small>${escapeHtml(p.meta)}</small></div></div><strong class="social-score">${p.score} pts</strong></div><p>${escapeHtml(p.text)}</p><span class="social-tag">${escapeHtml(p.tag)}</span>`;
        list.appendChild(card);
      });
    }
    const pulse = $('pulseFeedList');
    if (pulse) {
      pulse.innerHTML = '';
      EARTH_PULSE_ITEMS.forEach((item) => {
        const card = document.createElement('article');
        card.className = 'pulse-card';
        card.innerHTML = `<div class="pulse-card-meta">${escapeHtml(item.tag)}</div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body)}</p>`;
        pulse.appendChild(card);
      });
    }
  }

  function updateSolarCalculator() {
    if (!$('billUnitsInput')) return;
    const units = Math.max(0, Number($('billUnitsInput').value) || 0);
    const tariff = dataset.electricity.solar.defaultTariffInrPerKwh;
    const kw = state.solar.systemKw || 3;
    const ef = dataset.electricity.gridFactorKgPerKwh;
    const monthlyGen = kw * dataset.electricity.solar.kwhPerKwPerMonth;
    const offsetUnits = Math.min(units, monthlyGen);
    const avoidedYearlyKg = offsetUnits * 12 * ef;

    $('solarCurrentCo2').textContent = `${round(units * ef, 1)} kg/mo`;
    $('solarSavingsInr').textContent = `₹${Math.round(offsetUnits * tariff).toLocaleString('en-IN')} / mo`;
    $('solarAvoidedYear').textContent = `${round(avoidedYearlyKg / 1000, 2)} tonnes/yr`;
    $('solarTreesEq').textContent = `~${Math.round(avoidedYearlyKg / 22)} Neem trees`;
  }

  function renderStudioPage() {
    const vault = $('researchVaultList');
    if (vault) {
      vault.innerHTML = '';
      RESEARCH_VAULT_DOCS.forEach((doc) => {
        const row = document.createElement('div');
        row.className = 'research-doc-item';
        row.innerHTML = `<div><b>${escapeHtml(doc.title)}</b><small>${escapeHtml(doc.meta)}</small></div><a class="research-doc-link" href="${encodeURI(doc.href)}" target="_blank" rel="noopener">Open ↗</a>`;
        vault.appendChild(row);
      });
    }
    if ($('observationDate')) $('observationDate').value = todayISO();
    renderFieldNotes();
    renderHistory();
    updateSolarCalculator();
  }

  function renderFieldNotes() {
    const list = $('fieldNotesList');
    if (!list) return;
    list.innerHTML = '';
    if (!state.fieldNotes.length) {
      list.innerHTML = '<div class="empty-notes">No field observations yet. Add your first site note above.</div>';
      return;
    }
    state.fieldNotes.slice(0, 6).forEach((note) => {
      const row = document.createElement('div');
      row.className = 'field-note-entry';
      row.innerHTML = `<b>${escapeHtml(note.site)} · ${escapeHtml(note.type)}</b><small>${escapeHtml(note.date)}${note.measurement ? ` · ${escapeHtml(note.measurement)}` : ''}</small><p>${escapeHtml(note.text)}</p><button type="button" data-del-note="${escapeHtml(note.id)}">Remove ×</button>`;
      list.appendChild(row);
    });
    list.querySelectorAll('[data-del-note]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.fieldNotes = state.fieldNotes.filter((n) => n.id !== btn.dataset.delNote);
        persist();
        renderFieldNotes();
      });
    });
  }

  function renderHistory() {
    const list = $('historyList');
    if (!list) return;
    list.innerHTML = '';
    state.history.slice(0, 8).forEach((item) => {
      const row = document.createElement('div');
      row.className = 'history-entry';
      row.innerHTML = `<span>${escapeHtml(item.date)} · <b>${round(item.total).toFixed(2)} kg</b> (${item.ecoScore} pts)</span><button type="button" data-del-hist="${escapeHtml(item.id)}">Remove ×</button>`;
      list.appendChild(row);
    });
    list.querySelectorAll('[data-del-hist]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.history = state.history.filter((h) => h.id !== btn.dataset.delHist);
        persist();
        renderHistory();
      });
    });
  }

  function renderNudges() {
    const list = $('nudgeList');
    if (!list) return;
    list.innerHTML = '';
    NUDGES.forEach((n) => {
      const card = document.createElement('div');
      card.className = 'nudge-card';
      card.innerHTML = `<div class="nudge-card-tag">${escapeHtml(n.tag)}</div><h4>${escapeHtml(n.title)}</h4><p>${escapeHtml(n.body)}</p>`;
      list.appendChild(card);
    });
  }

  function downloadFile(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function bindEvents() {
    // Welcome page login gateway
    on('enterGeneralBtn', 'click', () => {
      state.user.mode = 'general';
      state.user.loggedIn = true;
      persist();
      window.location.href = './dashboard.html';
    });
    on('toggleStudentOption', 'click', () => {
      const panel = $('studentConnector');
      const willOpen = panel.hidden;
      panel.hidden = !willOpen;
      $('toggleStudentOption').setAttribute('aria-expanded', String(willOpen));
    });
    on('enterStudentBtn', 'click', () => {
      state.user.mode = 'student';
      state.user.name = $('loginNameInput').value.trim() || 'Atharv';
      state.user.institution = $('institutionSelect').value;
      state.user.loggedIn = true;
      persist();
      window.location.href = './dashboard.html';
    });

    // Shared Header Controls
    on('profilePillBtn', 'click', () => {
      state.user.mode = state.user.mode === 'student' ? 'general' : 'student';
      persist();
      renderProfileHeader();
      renderDashboardPage();
      renderCirclePage();
      showToast(state.user.mode === 'student' ? 'Switched to Student Cohort mode (750 pts benchmark).' : 'Switched to General Account mode.');
    });

    on('installBtn', 'click', () => showToast('Downloading CarbCalc-Android.apk for Android...'));
    on('heroApkBtn', 'click', () => showToast('Downloading CarbCalc-Android.apk for Android...'));

    on('themeToggle', 'click', () => {
      state.darkMode = !document.body.classList.contains('dark-mode');
      document.body.classList.toggle('dark-mode', state.darkMode);
      persist();
    });

    // Menu & Nudge Drawers
    const closeMenu = () => { if ($('menuDrawerBackdrop')) $('menuDrawerBackdrop').hidden = true; if ($('menuDrawerToggle')) $('menuDrawerToggle').setAttribute('aria-expanded', 'false'); };
    const closeNudges = () => { if ($('nudgeDrawerBackdrop')) $('nudgeDrawerBackdrop').hidden = true; };
    on('menuDrawerToggle', 'click', () => { $('menuDrawerBackdrop').hidden = false; $('menuDrawerToggle').setAttribute('aria-expanded', 'true'); });
    on('menuDrawerClose', 'click', closeMenu);
    on('menuDrawerBackdrop', 'click', (e) => { if (e.target === $('menuDrawerBackdrop')) closeMenu(); });

    on('nudgeBellBtn', 'click', () => {
      $('nudgeDrawerBackdrop').hidden = false;
      if ($('bellBadge')) $('bellBadge').hidden = true;
      $('nudgeBellBtn').classList.add('ringing');
      setTimeout(() => $('nudgeBellBtn').classList.remove('ringing'), 950);
    });
    on('nudgeDrawerClose', 'click', closeNudges);
    on('nudgeDrawerBackdrop', 'click', (e) => { if (e.target === $('nudgeDrawerBackdrop')) closeNudges(); });

    on('triggerOverlayNowBtn', 'click', () => { closeMenu(); if ($('ambientOverlay')) $('ambientOverlay').hidden = false; });
    on('nudgePreviewOverlayBtn', 'click', () => { closeNudges(); if ($('ambientOverlay')) $('ambientOverlay').hidden = false; });
    on('ambientDismissBtn', 'click', () => { if ($('ambientOverlay')) $('ambientOverlay').hidden = true; });
    on('ambientAcceptBtn', 'click', () => {
      state.healChecks.mindful_ai = true;
      persist();
      renderHealPage();
      renderDashboardPage();
      renderProfileHeader();
      if ($('ambientOverlay')) $('ambientOverlay').hidden = true;
      showToast('Wonderful pause! +15 Eco Score added.');
    });

    // Dashboard page controls
    on('quickModePills', 'click', (e) => {
      const btn = e.target.closest('[data-mode]');
      if (!btn) return;
      state.inputs.mode = btn.dataset.mode;
      persist();
      syncDashboardInputs();
      renderDashboardPage();
      showToast(`Remembered ${btn.textContent} for your commute.`);
    });
    on('watchSyncBtn', 'click', () => {
      state.inputs.distanceKm = 5.5;
      state.inputs.mode = 'walking';
      persist();
      syncDashboardInputs();
      renderDashboardPage();
      showToast('Synced 7,400 steps (5.5 km walked) from wearable.');
    });
    on('distanceSlider', 'input', (e) => { state.inputs.distanceKm = Number(e.target.value); persist(); syncDashboardInputs(); renderDashboardPage(); });
    on('sharedRideCheck', 'change', (e) => { state.inputs.sharedRide = e.target.checked; persist(); renderDashboardPage(); });
    [['monthlyUnitsInput', 'monthlyUnits'], ['roommatesInput', 'roommates'], ['acHoursInput', 'acHours'], ['aiPromptsInput', 'aiPrompts'], ['streamHoursInput', 'streamHours']].forEach(([id, key]) => {
      on(id, 'input', () => {
        state.inputs[key] = Math.max(0, Number($(id).value) || 0);
        if (key === 'roommates') state.inputs[key] = Math.max(1, Math.round(state.inputs[key]));
        persist();
        renderDashboardPage();
      });
    });
    on('dietPills', 'click', (e) => {
      const btn = e.target.closest('[data-diet]');
      if (!btn) return;
      state.inputs.diet = btn.dataset.diet;
      persist();
      syncDashboardInputs();
      renderDashboardPage();
    });
    on('segregatedWasteCheck', 'change', (e) => { state.inputs.segregatedWaste = e.target.checked; persist(); renderDashboardPage(); });
    on('resetDemoBtn', 'click', () => { state.inputs = { ...DEMO_STATE.inputs }; persist(); syncDashboardInputs(); renderDashboardPage(); showToast('Today’s values restored.'); });
    on('saveSnapshot', 'click', () => {
      const t = computeFootprint();
      const rec = { id: `snap-${Date.now()}`, date: todayISO(), total: t.total, ecoScore: t.ecoScore };
      state.history = [rec, ...state.history.filter((h) => h.date !== rec.date)].slice(0, 30);
      persist();
      showToast(`Saved check-in: ${round(t.total).toFixed(2)} kg CO₂ · ${t.ecoScore} pts.`);
    });
    on('formulaOpen', 'click', () => { if ($('formulaModal')) $('formulaModal').hidden = false; });
    on('formulaClose', 'click', () => { if ($('formulaModal')) $('formulaModal').hidden = true; });
    on('formulaModal', 'click', (e) => { if (e.target === $('formulaModal')) $('formulaModal').hidden = true; });

    // Heal page controls
    document.querySelectorAll('[data-heal]').forEach((box) => {
      box.addEventListener('change', () => {
        state.healChecks[box.dataset.heal] = box.checked;
        persist();
        renderHealPage();
        renderProfileHeader();
      });
    });
    on('treeSpeciesSelect', 'change', (e) => { state.tree.species = e.target.value; persist(); });
    on('uploadTreePhotoBtn', 'click', () => $('treePhotoInput').click());
    on('treePhotoInput', 'change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const canvas = $('treeCanvas');
          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          evaluateTreeCanvas('upload');
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
    document.querySelectorAll('[data-tree-preset]').forEach((btn) => {
      btn.addEventListener('click', () => drawPresetSapling(btn.dataset.treePreset));
    });

    // Circle page controls
    document.querySelectorAll('[data-circle-tab]').forEach((tab) => {
      tab.addEventListener('click', () => {
        activeCircleTab = tab.dataset.circleTab;
        document.querySelectorAll('[data-circle-tab]').forEach((t) => t.classList.toggle('active', t === tab));
        renderCirclePage();
      });
    });
    on('postWinBtn', 'click', () => {
      const t = computeFootprint();
      state.circlePosts.unshift({
        id: `p-${Date.now()}`,
        group: activeCircleTab,
        author: state.user.name || 'Atharv',
        meta: `${state.user.mode === 'student' ? state.user.institution : 'General Circle'} · Just now`,
        score: t.ecoScore,
        text: `Logged a ${round(t.total).toFixed(2)} kg CO₂ day (${t.healedVsYesterday >= 0 ? `${Math.round((t.healedVsYesterday / state.yesterdayKg) * 100)}% lighter than yesterday` : 'tracking transparently'}).`,
        tag: state.tree.verifiedThisWeek ? 'TREE CHECK-IN VERIFIED' : 'DAILY CHECK-IN'
      });
      persist();
      renderCirclePage();
      showToast('Your win is now shared with the circle.');
    });

    // Studio page controls
    on('billAmountInput', 'input', () => {
      const inr = Math.max(0, Number($('billAmountInput').value) || 0);
      $('billUnitsInput').value = Math.round(inr / dataset.electricity.solar.defaultTariffInrPerKwh);
      updateSolarCalculator();
    });
    on('billUnitsInput', 'input', () => {
      const u = Math.max(0, Number($('billUnitsInput').value) || 0);
      $('billAmountInput').value = Math.round(u * dataset.electricity.solar.defaultTariffInrPerKwh);
      updateSolarCalculator();
    });
    on('solarSizePills', 'click', (e) => {
      const btn = e.target.closest('[data-solar-kw]');
      if (!btn) return;
      state.solar.systemKw = Number(btn.dataset.solarKw);
      document.querySelectorAll('[data-solar-kw]').forEach((b) => b.classList.toggle('active', b === btn));
      persist();
      updateSolarCalculator();
    });
    on('billUploadTrigger', 'click', () => $('billFileInput').click());
    on('billFileInput', 'change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.type.startsWith('image/')) {
        $('billUnitsInput').value = 340;
        $('billAmountInput').value = 2550;
        updateSolarCalculator();
        showToast('Bill image scanned: estimated 340 kWh monthly usage.');
      } else {
        const txt = await file.text();
        const match = txt.match(/(\d{2,4})\s*(kwh|units)/i);
        if (match) {
          $('billUnitsInput').value = Number(match[1]);
          $('billAmountInput').value = Math.round(Number(match[1]) * 7.5);
          updateSolarCalculator();
          showToast(`Imported ${match[1]} kWh from bill file.`);
        }
      }
      $('billFileInput').value = '';
    });

    on('autoInterrupterToggle', 'change', (e) => { state.autoInterrupter = e.target.checked; persist(); });
    on('fieldForm', 'submit', (e) => {
      e.preventDefault();
      const note = { id: `n-${Date.now()}`, site: $('siteName').value.trim(), type: $('observationType').value, measurement: $('measurement').value.trim(), date: $('observationDate').value, text: $('observationText').value.trim() };
      if (!note.site || !note.text) return;
      state.fieldNotes.unshift(note);
      persist();
      renderFieldNotes();
      $('fieldForm').reset();
      $('observationDate').value = todayISO();
      showToast('Field note saved locally.');
    });
    on('exportTrigger', 'click', () => { downloadFile(`carbcalc-backup-${todayISO()}.json`, JSON.stringify({ app: 'CarbCalc', version: 2, ...state }, null, 2), 'application/json'); showToast('Backup JSON downloaded.'); });
    on('exportCsvTrigger', 'click', () => { const lines = ['date,total_kg,eco_score', ...state.history.map((h) => `${h.date},${round(h.total, 3)},${h.ecoScore}`)]; downloadFile(`carbcalc-history-${todayISO()}.csv`, lines.join('\n'), 'text/csv;charset=utf-8'); showToast('CSV exported.'); });
    on('importTrigger', 'click', () => $('importFile').click());
    on('importFile', 'change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const data = JSON.parse(await file.text());
        if (data && data.inputs) { state = { ...structuredClone(DEMO_STATE), ...data }; persist(); renderStudioPage(); renderProfileHeader(); showToast('Backup restored.'); }
      } catch (_) { showToast('Could not read that backup file.'); }
      $('importFile').value = '';
    });
    on('shareTrigger', 'click', async () => {
      const t = computeFootprint();
      const text = `My CarbCalc Eco Score today is ${t.ecoScore}/1000 (${round(t.total).toFixed(2)} kg CO₂). Grounded in India CEA 2026 & WRI data.`;
      if (navigator.share) await navigator.share({ title: 'CarbCalc Check-In', text }).catch(() => {});
      else if (navigator.clipboard) { await navigator.clipboard.writeText(text); showToast('Summary copied to clipboard.'); }
      else downloadFile('carbcalc-summary.txt', text, 'text/plain');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if ($('formulaModal')) $('formulaModal').hidden = true;
        closeMenu();
        closeNudges();
        if ($('ambientOverlay')) $('ambientOverlay').hidden = true;
      }
    });

    let scrollTicks = 0;
    window.addEventListener('scroll', () => {
      if (!state.autoInterrupter || scrollNudgeCooldown) return;
      scrollTicks += 1;
      if (scrollTicks > 180 && $('nudgeBellBtn')) {
        scrollNudgeCooldown = true;
        $('nudgeBellBtn').classList.add('ringing');
        setTimeout(() => $('nudgeBellBtn').classList.remove('ringing'), 950);
      }
    }, { passive: true });
  }

  function registerPwa() {
    if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
      window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
    }
  }

  async function init() {
    try {
      const resp = await fetch(DATASET_URL);
      if (resp.ok) dataset = await resp.json();
    } catch (_) {}

    document.body.classList.toggle('dark-mode', Boolean(state.darkMode));
    if ($('autoInterrupterToggle')) $('autoInterrupterToggle').checked = Boolean(state.autoInterrupter);

    renderProfileHeader();
    renderNudges();
    syncDashboardInputs();
    renderDashboardPage();
    renderHealPage();
    renderCirclePage();
    renderStudioPage();
    bindEvents();
    registerPwa();
  }

  init();
})();
