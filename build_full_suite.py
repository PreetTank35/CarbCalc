import os, re

def get_head(title):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>{title} — CarbCalc</title>
  <link rel="manifest" href="./manifest.webmanifest"/>
  <link rel="icon" href="./icon.svg" type="image/svg+xml"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com" rel="preconnect"/>
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {{
      darkMode: "class",
      theme: {{
        extend: {{
          colors: {{
            "primary": "#003321",
            "primary-container": "#164b35",
            "on-primary": "#ffffff",
            "on-primary-container": "#85ba9e",
            "primary-fixed": "#b8efd0",
            "primary-fixed-dim": "#9dd2b5",
            "secondary": "#006d3e",
            "secondary-container": "#97f3b6",
            "on-secondary": "#ffffff",
            "on-secondary-container": "#027241",
            "secondary-fixed": "#9af6b9",
            "secondary-fixed-dim": "#7ed99e",
            "tertiary": "#1f3026",
            "tertiary-container": "#35463b",
            "tertiary-fixed": "#d4e7d9",
            "surface": "#edfdf1",
            "surface-dim": "#ceded2",
            "surface-bright": "#edfdf1",
            "surface-variant": "#d6e7da",
            "surface-container-lowest": "#ffffff",
            "surface-container-low": "#e7f8eb",
            "surface-container": "#e2f2e5",
            "surface-container-high": "#dcece0",
            "surface-container-highest": "#d6e7da",
            "on-surface": "#111e17",
            "on-surface-variant": "#404943",
            "outline": "#717973",
            "outline-variant": "#c0c9c1",
            "surface-tint": "#356850",
            "error": "#ba1a1a",
            "error-container": "#ffdad6"
          }},
          fontFamily: {{
            sans: ['Plus Jakarta Sans', 'sans-serif'],
            body: ['Plus Jakarta Sans', 'sans-serif']
          }},
          spacing: {{
            "gutter": "1.5rem",
            "gutter-mobile": "1rem",
            "margin": "2rem",
            "margin-mobile": "1rem",
            "space-xs": "0.25rem",
            "space-sm": "0.5rem",
            "space-md": "1rem",
            "space-lg": "1.5rem",
            "space-xl": "2rem"
          }}
        }}
      }}
    }};
  </script>
  <style>
    @layer base {{
      html, body {{ margin: 0; padding: 0; }}
      body {{ overscroll-behavior: none; }}
      main > :first-child {{ margin-top: 0 !important; }}
      main > :last-child {{ margin-bottom: 0 !important; }}
    }}
    ::-webkit-scrollbar {{ display: none; }}
    .material-symbols-outlined {{ font-variation-settings: 'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 24; }}
  </style>
</head>
<body class="bg-surface font-sans text-on-surface antialiased selection:bg-secondary-container selection:text-on-secondary-container min-h-screen flex flex-col">'''

def get_header(active_page):
    nav_items = [
        ("Home", "index.html", "home"),
        ("Calculator", "calculator.html", "calculator"),
        ("Results", "results.html", "results"),
        ("Action Plan", "heal.html", "action-plan"),
        ("Campus Circle", "circle.html", "circle"),
        ("Solar & Vault", "studio.html", "studio"),
    ]
    
    desktop_links = []
    for title, href, key in nav_items:
        if key == active_page:
            desktop_links.append(f'<a aria-current="page" class="transition-colors text-primary font-bold border-b-2 border-primary pb-1" href="{href}">{title}</a>')
        else:
            desktop_links.append(f'<a class="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors font-medium" href="{href}">{title}</a>')
    
    desktop_nav_html = '\n      '.join(desktop_links)
    
    return f'''<header class="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/60 shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
  <div class="h-20 max-w-[1280px] mx-auto px-margin-mobile lg:px-margin flex items-center justify-between gap-space-md">
    <a href="index.html" class="flex items-center gap-space-sm">
      <div class="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-sm">
        <span class="material-symbols-outlined text-[24px]">eco</span>
      </div>
      <div class="flex flex-col">
        <span class="font-headline-sm text-headline-sm text-primary leading-tight tracking-tight font-bold">CarbCalc</span>
        <span class="text-[11px] text-secondary uppercase tracking-widest font-bold">Campus Eco Companion</span>
      </div>
    </a>
    
    <nav class="hidden xl:flex items-center gap-space-lg">
      {desktop_nav_html}
    </nav>
    
    <div class="flex items-center gap-space-xs sm:gap-space-sm">
      <a href="./CarbCalc-Android.apk" download="CarbCalc-Android.apk" class="hidden sm:inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md transition-all border border-outline-variant/40" title="Download Android APK">
        <span class="material-symbols-outlined text-[18px]">android</span>
        <span>Get APK</span>
      </a>
      <button id="pwaHeaderBtn" type="button" class="hidden sm:inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-md text-label-md transition-all" title="Install 1-Tap App">
        <span class="material-symbols-outlined text-[18px]">install_mobile</span>
        <span>Install App</span>
      </button>
      <a href="calculator.html" class="inline-flex items-center justify-center px-4 py-2 bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-xl shadow-sm transition-all active:scale-[0.98] font-bold">
        Calculate
      </a>
      <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-space-xs text-on-primary">
        <span class="material-symbols-outlined text-[18px]">person</span>
      </div>
    </div>
  </div>
</header>'''

def get_footer():
    return '''<footer class="w-full bg-surface-container-low border-t border-outline-variant/50 pt-space-xl pb-space-lg">
  <div class="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-space-xl pb-space-xl border-b border-outline-variant/40">
      <div class="md:col-span-6 flex flex-col gap-space-sm">
        <div class="flex items-center gap-space-sm">
          <div class="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
            <span class="material-symbols-outlined text-[20px]">eco</span>
          </div>
          <span class="font-headline-sm text-headline-sm text-primary font-bold">CarbCalc</span>
        </div>
        <p class="font-body-md text-body-md text-on-surface-variant max-w-md">
          Effortless daily climate care for students and campuses. Backed by verified Indian grid, transport, and solar datasets (CEA 2026, WRI India, MNRE).
        </p>
        <div class="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container-highest w-fit">
          <span class="w-2 h-2 rounded-full bg-secondary"></span>
          <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">MITAOE Alandi Cohort Sync • CEA 2026 Grid 0.675 kg/kWh</span>
        </div>
      </div>
      <div class="md:col-span-3 flex flex-col gap-space-sm">
        <span class="font-label-md text-label-md uppercase tracking-wider text-on-surface font-bold">Platform</span>
        <ul class="flex flex-col gap-space-xs">
          <li class="list-none"><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="index.html">Home</a></li>
          <li class="list-none"><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="calculator.html">Carbon Calculator</a></li>
          <li class="list-none"><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="results.html">Results & Benchmark</a></li>
          <li class="list-none"><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="heal.html">Action Plan & Tree Plant</a></li>
          <li class="list-none"><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="circle.html">Campus Challenges</a></li>
        </ul>
      </div>
      <div class="md:col-span-3 flex flex-col gap-space-sm">
        <span class="font-label-md text-label-md uppercase tracking-wider text-on-surface font-bold">Research & Downloads</span>
        <ul class="flex flex-col gap-space-xs">
          <li class="list-none"><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="studio.html">PM Surya Ghar Solar Calculator</a></li>
          <li class="list-none"><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="studio.html#vault">CEA & WRI India Research Vault</a></li>
          <li class="list-none"><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="./CarbCalc-Android.apk" download="CarbCalc-Android.apk">Download Android APK</a></li>
          <li class="list-none"><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="https://github.com/PreetTank35/CarbCalc.git" target="_blank">GitHub Repository</a></li>
        </ul>
      </div>
    </div>
    <div class="pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm">
      <p class="font-body-sm text-body-sm text-on-surface-variant">© 2026 CarbCalc Academic Initiative • MIT Academy of Engineering, Alandi.</p>
      <div class="flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container text-secondary font-label-sm text-label-sm font-semibold">
        <span class="material-symbols-outlined text-[16px]">verified</span>
        <span>GHG Protocol Scope 1-3 Youth Framework</span>
      </div>
    </div>
  </div>
</footer>'''

def get_mobile_nav(active_page):
    items = [
        ("Home", "index.html", "home", "home"),
        ("Calculate", "calculator.html", "calculator", "add_chart"),
        ("Results", "results.html", "results", "bar_chart"),
        ("Action", "heal.html", "action-plan", "task_alt"),
        ("Circle", "circle.html", "circle", "group"),
    ]
    links = []
    for title, href, key, icon in items:
        if key == active_page:
            links.append(f'<a aria-current="page" class="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 text-secondary font-bold" href="{href}"><span class="material-symbols-outlined text-[22px]">{icon}</span><span class="text-[11px] font-bold">{title}</span></a>')
        else:
            links.append(f'<a class="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 text-on-surface-variant transition-colors hover:text-on-surface" href="{href}"><span class="material-symbols-outlined text-[22px]">{icon}</span><span class="text-[11px]">{title}</span></a>')
    links_html = '\n    '.join(links)
    return f'''<nav class="xl:hidden fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl border-t border-outline-variant/60 shadow-[0_-2px_12px_rgba(0,0,0,0.04)]">
  <div class="h-16 px-space-xs flex items-center justify-around">
    {links_html}
  </div>
</nav>'''

def get_pwa_script():
    return '''<!-- Install Modal -->
<div id="installModal" class="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm hidden flex items-center justify-center p-4">
  <div class="bg-surface rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-outline-variant/60 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
    <div class="flex items-center justify-between pb-3 border-b border-outline-variant/40">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center">
          <span class="material-symbols-outlined text-[24px]">install_mobile</span>
        </div>
        <div>
          <h3 class="text-xl font-bold text-primary">Install CarbCalc App</h3>
          <p class="text-xs text-on-surface-variant">Choose your preferred installation method</p>
        </div>
      </div>
      <button onclick="document.getElementById('installModal').classList.add('hidden')" class="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant">
        <span class="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>

    <!-- Method 1: Instant 1-Tap PWA (Recommended) -->
    <div class="p-5 rounded-2xl bg-secondary-container/30 border border-secondary/30 flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <span class="px-2.5 py-0.5 rounded-full bg-secondary text-on-secondary text-[11px] font-bold uppercase tracking-wider">Fastest & Reliable</span>
        <span class="text-xs text-secondary font-bold">0 MB Storage</span>
      </div>
      <div>
        <h4 class="font-bold text-primary text-base">Method 1: Instant 1-Tap Web App</h4>
        <p class="text-xs text-on-surface-variant mt-1 leading-relaxed">Installs immediately directly to your Android/iOS home screen. Zero package parsing errors, launches in full-screen, and works 100% offline.</p>
      </div>
      <button onclick="triggerPwaInstall()" class="w-full py-3 rounded-xl bg-secondary text-on-secondary font-bold text-sm shadow hover:bg-secondary/90 transition-all flex items-center justify-center gap-2">
        <span class="material-symbols-outlined text-[18px]">add_to_home_screen</span>
        <span>Install to Home Screen Now</span>
      </button>
    </div>

    <!-- Method 2: Native Android APK -->
    <div class="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/60 flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <span class="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary text-[11px] font-bold uppercase tracking-wider">Capacitor Native APK</span>
        <span class="text-xs text-on-surface-variant font-medium">Android 7.0+</span>
      </div>
      <div>
        <h4 class="font-bold text-primary text-base">Method 2: Standalone Android APK</h4>
        <p class="text-xs text-on-surface-variant mt-1 leading-relaxed">Built with native Android Dalvik runtime & Capacitor. Compiled and cryptographically signed on GitHub CI.</p>
      </div>
      <div class="flex flex-col gap-2 pt-1">
        <a href="https://github.com/PreetTank35/CarbCalc/releases/latest" target="_blank" class="w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-sm shadow hover:bg-tertiary transition-all flex items-center justify-center gap-2">
          <span class="material-symbols-outlined text-[18px]">download</span>
          <span>Download Verified APK from Releases</span>
        </a>
        <a href="https://github.com/PreetTank35/CarbCalc/actions" target="_blank" class="w-full py-2.5 rounded-xl bg-surface-container-highest text-primary font-semibold text-xs border border-outline-variant/40 hover:bg-surface-container transition-all flex items-center justify-center gap-2">
          <span class="material-symbols-outlined text-[16px]">build_circle</span>
          <span>View GitHub Actions Build Artifacts</span>
        </a>
      </div>
      <div class="bg-surface-container p-3 rounded-xl text-[11px] text-on-surface-variant space-y-1">
        <p class="font-bold text-primary">💡 If Android shows "Problem parsing package":</p>
        <p>1. Ensure your browser is allowed to install apps in Android Settings.</p>
        <p>2. Download the verified APK from GitHub Releases above.</p>
        <p>3. Tap the file in Downloads to install.</p>
      </div>
    </div>
  </div>
</div>

<script>
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}

let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.querySelectorAll('#pwaInstallBtn, #pwaHeaderBtn, #pwaHeroBtn').forEach(el => el.classList.add('ring-2', 'ring-secondary'));
});

function triggerPwaInstall() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => { deferredPrompt = null; });
  } else {
    alert('To install CarbCalc on your phone:\\n\\n1. In Chrome / Edge / Brave, tap the (⋮) menu button.\\n2. Tap "Install app" or "Add to Home screen".\\n3. Launches in full-screen with offline capabilities!');
  }
}

function openInstallModal() {
  const modal = document.getElementById('installModal');
  if (modal) modal.classList.remove('hidden');
}

document.querySelectorAll('#pwaInstallBtn, #pwaHeaderBtn, #pwaHeroBtn, [data-install-trigger]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openInstallModal();
  });
});
</script>'''

# 1. BUILD INDEX.HTML (Landing page with 3D Three.js Earth)
with open(r'carbonwise_suite\carbonwise_student_carbon_footprint_platform\code.html', encoding='utf-8') as f:
    orig_index = f.read()

main_index = re.search(r'<main[^>]*>(.*?)</main>', orig_index, re.DOTALL).group(1)

# Ensure local Three.js with CDN fallback
three_patch = '''<script src="./three.min.js"></script>
<script>
if (typeof THREE === 'undefined') {
  document.write('<script src="https://ajax.googleapis.com/ajax/libs/threejs/r125/three.min.js"><\\/script>');
}
</script>'''
main_index = main_index.replace('<script src="https://ajax.googleapis.com/ajax/libs/threejs/r125/three.min.js"></script>', three_patch)

# Fix links in main_index
main_index = main_index.replace('data-path="calculator" href="#"', 'href="calculator.html"')
main_index = main_index.replace('data-path="how-it-works" href="#"', 'href="#how-it-works"')
main_index = main_index.replace('data-path="challenges" href="#"', 'href="circle.html"')

# Add install CTA tray in Hero
hero_install_tray = '''
        <!-- Android APK + PWA Install Hub -->
        <div class="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <a class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg shadow-sm hover:bg-tertiary transition-all active:scale-[0.98] font-bold" href="calculator.html">
            <span>Calculate my footprint</span>
            <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>
          <a class="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-surface-container-lowest text-primary font-label-lg text-label-lg border border-outline-variant hover:border-surface-tint hover:bg-surface-container-low transition-all font-semibold" href="./CarbCalc-Android.apk" download="CarbCalc-Android.apk">
            <span class="material-symbols-outlined text-[20px] text-secondary">android</span>
            <span>Download APK</span>
          </a>
          <button id="pwaHeroBtn" type="button" class="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg transition-all font-semibold">
            <span class="material-symbols-outlined text-[20px]">install_mobile</span>
            <span>Install 1-Tap App</span>
          </button>
        </div>
'''
main_index = re.sub(r'<div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3\.5 pt-2">.*?</div>\s*<!-- Social Proof', hero_install_tray + '\n        <!-- Social Proof', main_index, flags=re.DOTALL)

index_html = get_head("Carbon Calculator & Daily Climate Care") + "\n" + get_header("home") + "\n<main class=\"w-full pt-20 bg-surface min-h-[calc(100vh-280px)]\">\n" + main_index + "\n</main>\n" + get_footer() + "\n" + get_mobile_nav("home") + "\n" + get_pwa_script() + "\n</body>\n</html>"

with open("index.html", "w", encoding="utf-8") as f:
    f.write(index_html)
print("Built index.html")

# 2. BUILD CALCULATOR.HTML (Step-by-step Interactive Calculator)
with open(r'carbonwise_suite\carbonwise_student_carbon_calculator\code.html', encoding='utf-8') as f:
    orig_calc = f.read()

main_calc = re.search(r'<main[^>]*>(.*?)</main>', orig_calc, re.DOTALL).group(1)

# Wire bottom navigation in calculator
main_calc = main_calc.replace('<span>Back to Profile</span>', '<span>Back to Home</span>')
main_calc = re.sub(r'<button class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 h-\[50px\] rounded-xl text-primary font-label-lg text-label-lg hover:bg-surface-container transition-colors"[^>]*>', '<a href="index.html" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 h-[50px] rounded-xl text-primary font-label-lg text-label-lg hover:bg-surface-container transition-colors">', main_calc)
main_calc = main_calc.replace('</button>\n<!-- Right Flex Container -->', '</a>\n<!-- Right Flex Container -->')
main_calc = re.sub(r'<button class="inline-flex items-center justify-center gap-2 px-7 h-\[50px\] rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:bg-primary-container active:scale-\[0.99\] transition-all"[^>]*>', '<a href="results.html" class="inline-flex items-center justify-center gap-2 px-7 h-[50px] rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:bg-primary-container active:scale-[0.99] transition-all">', main_calc)
main_calc = main_calc.replace('<span>Continue to Electricity &amp; Energy</span>\n<span class="material-symbols-outlined text-[20px]">arrow_forward</span>\n</button>', '<span>View Results & Benchmark</span>\n<span class="material-symbols-outlined text-[20px]">arrow_forward</span>\n</a>')

calc_html = get_head("Student Carbon Calculator") + "\n" + get_header("calculator") + "\n<main class=\"w-full pt-20 bg-surface min-h-[calc(100vh-280px)]\">\n" + main_calc + "\n</main>\n" + get_footer() + "\n" + get_mobile_nav("calculator") + "\n" + get_pwa_script() + "\n</body>\n</html>"

with open("calculator.html", "w", encoding="utf-8") as f:
    f.write(calc_html)
with open("dashboard.html", "w", encoding="utf-8") as f:
    f.write(calc_html)
print("Built calculator.html & dashboard.html")

# 3. BUILD RESULTS.HTML (Benchmark, Donut Breakdown & Projected Reductions)
with open(r'carbonwise_suite\carbonwise_results_dashboard\code.html', encoding='utf-8') as f:
    orig_results = f.read()

main_results = re.search(r'<main[^>]*>(.*?)</main>', orig_results, re.DOTALL).group(1)
# Wire CTA to action plan / heal.html
main_results = re.sub(r'<button[^>]*id="viewActionPlanBtn"[^>]*>', '<a href="heal.html" class="w-full h-11 rounded-lg bg-secondary hover:bg-primary-container text-on-secondary font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 transition-transform active:scale-[0.98]">', main_results)
main_results = main_results.replace('<span>View My Action Plan</span>\n<span class="material-symbols-outlined text-[18px]">arrow_forward</span>\n</button>', '<span>View My Action Plan</span>\n<span class="material-symbols-outlined text-[18px]">arrow_forward</span>\n</a>')

results_html = get_head("Carbon Footprint Results & Benchmark") + "\n" + get_header("results") + "\n<main class=\"w-full pt-20 pb-20 bg-surface min-h-[calc(100vh-280px)]\">\n<div class=\"max-w-[1280px] mx-auto px-margin-mobile lg:px-margin py-8\">\n" + main_results + "\n</div>\n</main>\n" + get_footer() + "\n" + get_mobile_nav("results") + "\n" + get_pwa_script() + "\n</body>\n</html>"

with open("results.html", "w", encoding="utf-8") as f:
    f.write(results_html)
print("Built results.html")

# 4. BUILD HEAL.HTML (Action Plan & Verifiable Tree Plantation)
with open(r'carbonwise_suite\carbonwise_personalized_action_plan\code.html', encoding='utf-8') as f:
    orig_plan = f.read()

main_plan = re.search(r'<main[^>]*>(.*?)</main>', orig_plan, re.DOTALL).group(1)

heal_html = get_head("Personalized Climate Action Plan") + "\n" + get_header("action-plan") + "\n<main class=\"w-full pt-20 bg-surface min-h-[calc(100vh-280px)]\">\n" + main_plan + "\n</main>\n" + get_footer() + "\n" + get_mobile_nav("action-plan") + "\n" + get_pwa_script() + "\n</body>\n</html>"

with open("heal.html", "w", encoding="utf-8") as f:
    f.write(heal_html)
print("Built heal.html")

# 5. BUILD CIRCLE.HTML (Campus Cohort Leaderboard & Challenges)
circle_main = '''<div class="max-w-[1280px] w-full mx-auto px-margin-mobile lg:px-margin py-space-xl flex flex-col gap-space-xl">
  <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
    <div class="flex flex-col gap-space-xs max-w-2xl">
      <div class="flex items-center gap-space-xs">
        <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container">
          <span class="material-symbols-outlined text-[16px]">group</span>
        </span>
        <span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Campus Cohort • MITAOE Alandi & Oakridge Chapter</span>
      </div>
      <h1 class="font-headline-xl text-headline-xl text-primary tracking-tight font-extrabold">Campus Climate Circle</h1>
      <p class="font-body-lg text-body-lg text-on-surface-variant">Track your homeroom's collective decarbonization, compete in campus micro-challenges, and celebrate verified student climate victories.</p>
    </div>
    <div class="flex items-center gap-space-xs bg-surface-container-low px-space-md py-space-sm rounded-xl w-fit">
      <span class="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
      <span class="font-label-md text-label-md text-on-surface-variant font-semibold">14,200+ Students Active Across 85 Schools</span>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
    <div class="lg:col-span-8 flex flex-col gap-space-lg">
      <!-- Challenge 1 -->
      <div class="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-outline-variant/60 flex flex-col gap-space-md">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <span class="w-3 h-3 rounded-full bg-secondary"></span>
            <span class="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">Active Sprint</span>
          </div>
          <span class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full font-semibold">Ends in 4 days</span>
        </div>
        <div>
          <h3 class="font-headline-md text-headline-md text-primary font-bold">Zero Food Waste Week</h3>
          <p class="font-body-md text-body-md text-on-surface-variant mt-1">Homerooms compete to eliminate dining hall organics from landfills by prioritizing balanced cafeteria portions and composting.</p>
        </div>
        <div class="flex flex-col gap-2 pt-1">
          <div class="flex justify-between items-baseline font-label-md text-label-md">
            <span class="text-primary font-semibold">Cohort Participation Goal</span>
            <span class="text-secondary font-bold">78% reached (3,900 / 5,000 students)</span>
          </div>
          <div class="w-full h-3 rounded-full bg-surface-container overflow-hidden">
            <div class="h-full bg-secondary rounded-full transition-all duration-700" style="width: 78%;"></div>
          </div>
        </div>
      </div>

      <!-- Challenge 2 -->
      <div class="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-outline-variant/60 flex flex-col gap-space-md">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <span class="w-3 h-3 rounded-full bg-primary-container"></span>
            <span class="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">Wednesday Sprint</span>
          </div>
          <span class="font-label-sm text-label-sm text-secondary bg-secondary-container px-2.5 py-1 rounded-full font-bold">+120 EcoPts</span>
        </div>
        <div>
          <h3 class="font-headline-md text-headline-md text-primary font-bold">Bike to School Wednesday</h3>
          <p class="font-body-md text-body-md text-on-surface-variant mt-1">Log clean miles on two wheels, electric bus, or foot to earn the Golden Spoke badge for your classroom.</p>
        </div>
        <div class="flex items-center justify-between pt-2">
          <span class="font-body-sm text-body-sm text-on-surface-variant">Class of 2027 currently holds Rank #2</span>
          <a href="heal.html" class="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-on-primary rounded-xl font-label-md text-label-md font-bold hover:bg-primary-container transition-all">
            Join Challenge
          </a>
        </div>
      </div>
    </div>

    <!-- Right Sidebar Leaderboard -->
    <div class="lg:col-span-4 flex flex-col gap-space-lg">
      <div class="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-outline-variant/60 flex flex-col gap-space-md">
        <div class="flex items-center justify-between">
          <h3 class="font-headline-sm text-headline-sm text-primary font-bold">Campus Leaderboard</h3>
          <span class="material-symbols-outlined text-secondary">leaderboard</span>
        </div>
        <div class="flex flex-col gap-3 pt-1">
          <div class="flex items-center justify-between p-3 rounded-xl bg-secondary-container/40">
            <div class="flex items-center gap-3">
              <span class="font-bold text-secondary text-sm">#1</span>
              <div>
                <b class="text-sm text-primary block">Oakridge High Grade 10</b>
                <small class="text-xs text-on-surface-variant">94% participation</small>
              </div>
            </div>
            <span class="text-sm font-bold text-secondary">820 pts</span>
          </div>
          <div class="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
            <div class="flex items-center gap-3">
              <span class="font-bold text-primary text-sm">#2</span>
              <div>
                <b class="text-sm text-primary block">MITAOE Alandi SY-C</b>
                <small class="text-xs text-on-surface-variant">88% participation</small>
              </div>
            </div>
            <span class="text-sm font-bold text-primary">750 pts</span>
          </div>
          <div class="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
            <div class="flex items-center gap-3">
              <span class="font-bold text-on-surface-variant text-sm">#3</span>
              <div>
                <b class="text-sm text-primary block">Pune Eco-Campus Collective</b>
                <small class="text-xs text-on-surface-variant">81% participation</small>
              </div>
            </div>
            <span class="text-sm font-bold text-primary">695 pts</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>'''

circle_html = get_head("Campus Climate Circle & Challenges") + "\n" + get_header("circle") + "\n<main class=\"w-full pt-20 bg-surface min-h-[calc(100vh-280px)]\">\n" + circle_main + "\n</main>\n" + get_footer() + "\n" + get_mobile_nav("circle") + "\n" + get_pwa_script() + "\n</body>\n</html>"

with open("circle.html", "w", encoding="utf-8") as f:
    f.write(circle_html)
print("Built circle.html")

# 6. BUILD STUDIO.HTML (Rooftop Solar & Research Vault)
studio_main = '''<div class="max-w-[1280px] w-full mx-auto px-margin-mobile lg:px-margin py-space-xl flex flex-col gap-space-xl">
  <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
    <div class="flex flex-col gap-space-xs max-w-2xl">
      <div class="flex items-center gap-space-xs">
        <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container">
          <span class="material-symbols-outlined text-[16px]">solar_power</span>
        </span>
        <span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Clean Energy & Verified Standards</span>
      </div>
      <h1 class="font-headline-xl text-headline-xl text-primary tracking-tight font-extrabold">Solar Savings & Research Vault</h1>
      <p class="font-body-lg text-body-lg text-on-surface-variant">Calculate PM Surya Ghar rooftop solar bill savings and explore official Indian emission research whitepapers (CEA 2026, WRI India, MNRE).</p>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
    <!-- Left: Solar Rooftop Calculator -->
    <div class="lg:col-span-6 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-outline-variant/60 flex flex-col gap-space-md">
      <div class="flex items-center justify-between">
        <h3 class="font-headline-sm text-headline-sm text-primary font-bold">PM Surya Ghar Rooftop Solar</h3>
        <span class="material-symbols-outlined text-secondary">wb_sunny</span>
      </div>
      <p class="font-body-sm text-body-sm text-on-surface-variant">Estimate rooftop solar generation, monthly electricity bill reduction, and clean CO2 offset based on standard Indian solar radiation (4.2–5.5 kWh/m²/day).</p>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <label class="flex flex-col gap-1">
          <span class="text-xs font-bold text-primary">Monthly Electricity Bill (₹)</span>
          <input id="solarBillInput" type="number" value="2800" min="500" step="100" class="h-11 px-3 rounded-xl border border-outline-variant/60 focus:border-secondary focus:outline-none"/>
        </label>
        <label class="flex flex-col gap-1">
          <span class="text-xs font-bold text-primary">Proposed Rooftop Capacity</span>
          <select id="solarKwSelect" class="h-11 px-3 rounded-xl border border-outline-variant/60 focus:border-secondary focus:outline-none">
            <option value="1">1 kW (₹30,000 subsidy)</option>
            <option value="2">2 kW (₹60,000 subsidy)</option>
            <option value="3" selected>3 kW (₹78,000 subsidy)</option>
            <option value="5">5 kW (₹78,000 subsidy)</option>
          </select>
        </label>
      </div>

      <div class="bg-primary-container text-on-primary rounded-xl p-4 mt-2 flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <span class="text-xs opacity-80 uppercase tracking-wider">Estimated Monthly Savings</span>
          <strong class="text-xl font-bold text-secondary-fixed" id="solarSavings">₹ 2,150 / mo</strong>
        </div>
        <div class="flex justify-between items-center text-xs opacity-90 border-t border-outline-variant/30 pt-2">
          <span>Clean Energy Generated: <b id="solarKwh">360 kWh/mo</b></span>
          <span>Annual CO₂ Avoided: <b id="solarCo2">2.91 tonnes/yr</b></span>
        </div>
      </div>
    </div>

    <!-- Right: Research Vault -->
    <div id="vault" class="lg:col-span-6 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-outline-variant/60 flex flex-col gap-space-md">
      <div class="flex items-center justify-between">
        <h3 class="font-headline-sm text-headline-sm text-primary font-bold">Verified Research Vault</h3>
        <span class="material-symbols-outlined text-secondary">menu_book</span>
      </div>
      <p class="font-body-sm text-body-sm text-on-surface-variant">All emission factors and calculation formulas used in CarbCalc originate directly from official government & peer-reviewed research papers.</p>
      
      <div class="flex flex-col gap-2 pt-1">
        <a href="researched by anti gravity/01_CEA_CO2_Baseline_Database_v22_2025_26.md" target="_blank" class="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between transition-colors">
          <div>
            <b class="text-xs text-primary block font-bold">01. Central Electricity Authority (CEA) v22</b>
            <span class="text-[11px] text-on-surface-variant">0.675 kg CO₂/kWh India national grid average (2025–26)</span>
          </div>
          <span class="material-symbols-outlined text-[18px] text-secondary">arrow_outward</span>
        </a>
        <a href="researched by anti gravity/02_India_Transport_Emission_Factors_WRI_ITF_MoHUA.md" target="_blank" class="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between transition-colors">
          <div>
            <b class="text-xs text-primary block font-bold">02. WRI & ITF India Passenger Transport Factors</b>
            <span class="text-[11px] text-on-surface-variant">Scooter (36.8g), Shared Auto (31.8g), City Bus (15.5g), EV (18.2g)</span>
          </div>
          <span class="material-symbols-outlined text-[18px] text-secondary">arrow_outward</span>
        </a>
        <a href="researched by anti gravity/03_MNRE_Rooftop_Solar_PM_Surya_Ghar_and_BEE_Appliances.md" target="_blank" class="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between transition-colors">
          <div>
            <b class="text-xs text-primary block font-bold">03. MNRE PM Surya Ghar & BEE 5-Star Appliances</b>
            <span class="text-[11px] text-on-surface-variant">Subsidies up to ₹78,000, 4.2–5.5 kWh/kWp/day solar radiation</span>
          </div>
          <span class="material-symbols-outlined text-[18px] text-secondary">arrow_outward</span>
        </a>
        <a href="researched by anti gravity/05_FSI_MoEFCC_Native_Tree_Sequestration_and_Verification.md" target="_blank" class="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between transition-colors">
          <div>
            <b class="text-xs text-primary block font-bold">04. Forest Survey of India Native Tree Sequestration</b>
            <span class="text-[11px] text-on-surface-variant">Neem (22.3 kg/yr), Peepal (28.4 kg/yr), Bamboo (40.5 kg/yr)</span>
          </div>
          <span class="material-symbols-outlined text-[18px] text-secondary">arrow_outward</span>
        </a>
      </div>
    </div>
  </div>
</div>'''

studio_html = get_head("Solar Savings & Research Vault") + "\n" + get_header("studio") + "\n<main class=\"w-full pt-20 bg-surface min-h-[calc(100vh-280px)]\">\n" + studio_main + "\n</main>\n" + get_footer() + "\n" + get_mobile_nav("studio") + "\n" + get_pwa_script() + "\n</body>\n</html>"

with open("studio.html", "w", encoding="utf-8") as f:
    f.write(studio_html)
print("Built studio.html")

# Sync everything to www
import shutil
www_dir = "www"
os.makedirs(www_dir, exist_ok=True)
files_to_sync = [
    "index.html",
    "calculator.html",
    "dashboard.html",
    "results.html",
    "heal.html",
    "circle.html",
    "studio.html",
    "three.min.js",
    "styles.css",
    "app.js",
    "sw.js",
    "manifest.webmanifest",
    "icon.svg"
]
for f in files_to_sync:
    if os.path.exists(f):
        shutil.copy2(f, os.path.join(www_dir, f))
        print(f"Synced {f} to {www_dir}/")

src_research = "researched by anti gravity"
dst_research = os.path.join(www_dir, "researched by anti gravity")
if os.path.exists(src_research):
    os.makedirs(dst_research, exist_ok=True)
    for item in os.listdir(src_research):
        s = os.path.join(src_research, item)
        d = os.path.join(dst_research, item)
        if os.path.isfile(s):
            shutil.copy2(s, d)
    print(f"Synced {src_research} to {dst_research}/")

print("ALL PAGES BUILT AND SYNCED SUCCESSFULLY!")
