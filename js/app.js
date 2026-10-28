// Classic Paints And Hardware - Interactive Web Application Logic
// Theme: Bright, Vibrant, Premium Paint-Shop Theme
// Proprietor: MUHAMMED ANEES SALIM | Vakkom, Anjuthengu, Trivandrum

const STORE_CONFIG = {
  name: "Classic Paints And Hardware",
  proprietor: "MUHAMMED ANEES SALIM",
  phonePrimary: "+919526361145",
  phoneDisplayPrimary: "+91 95263 61145",
  phoneSecondary: "+919567111223",
  phoneDisplaySecondary: "+91 95671 11223",
  whatsappNumber: "919526361145",
  address: "Vakkom, Main Road, Anjuthengu, Thiruvananthapuram – 695309, Kerala, India",
  googleMapsUrl: "https://maps.google.com/?q=Classic+Paints+And+Hardware+Vakkom+Anjuthengu+Thiruvananthapuram"
};

// Catalog Products Data with category tags matching the paint showroom palette
const PRODUCTS_DATA = [
  {
    id: "paint-stock",
    image: "assets/paint-stock.jpg",
    badge: "Exterior Paints",
    title: "Asian Paints & Dulux WeatherShield",
    details: "Weather-defense exterior emulsions, anti-fungal coatings, and UV crack resistance.",
    sizes: ["1L", "4L", "10L", "20L"],
    badgeColor: "bg-blue-600 text-white",
    category: "exterior"
  },
  {
    id: "counter-view-2",
    image: "assets/counter-view-2.jpg",
    badge: "Authorized Dealer",
    title: "Dulux Interior Luxury Emulsions",
    details: "Velvet touch washable interior finishes, low odor, and stain-resistant wall coatings.",
    sizes: ["1L", "4L", "10L", "20L"],
    badgeColor: "bg-amber-500 text-white",
    category: "interior"
  },
  {
    id: "interior-view-3",
    image: "assets/interior-view-3.jpg",
    badge: "Custom Tinting",
    title: "Computerized Color Mixing Station",
    details: "On-demand digital shade matching for 2,000+ shades, primers, wall putties, and sealers.",
    sizes: ["Custom Quantities & Codes"],
    badgeColor: "bg-indigo-600 text-white",
    category: "all"
  },
  {
    id: "counter-view-1",
    image: "assets/counter-view-1.jpg",
    badge: "Hardware & Locks",
    title: "Kratos & Yale Door Locks + Rollers",
    details: "Security entrance locks, latches, hanging microfiber paint rollers, and contractor accessories.",
    sizes: ["Retail & Wholesale Packs"],
    badgeColor: "bg-rose-600 text-white",
    category: "hardware"
  },
  {
    id: "hardware-sanitaryware",
    image: "assets/hardware-sanitaryware.jpg",
    badge: "Sanitaryware & Bath",
    title: "Designer Ceramic European Closets & Commodes",
    details: "Premium vitrified ceramic European water closets, wash basins, dual-flush cisterns, and luxury bathroom sanitary hardware.",
    sizes: ["Floor Mount", "Wall Hung", "Full Suite Bundles"],
    badgeColor: "bg-blue-600 text-white",
    category: "hardware"
  },
  {
    id: "hardware-pvc-pipes",
    image: "assets/hardware-pvc-pipes.jpg",
    badge: "Plumbing & Drainage",
    title: "Heavy-Gauge PVC & UPVC Pressure Pipes & Fittings",
    details: "Commercial-grade drainage conduits, agricultural & residential pressure pipes, couplers, elbows, and solvent adhesives.",
    sizes: ["20mm to 110mm", "Class 1-4 Ratings", "6m Standard Lengths"],
    badgeColor: "bg-blue-700 text-white",
    category: "hardware"
  },
  {
    id: "hardware-water-tanks",
    image: "assets/hardware-water-tanks.jpg",
    badge: "Water Storage",
    title: "Overhead Multi-Layer Polymer Water Storage Tanks",
    details: "UV-stabilized food-grade polymer overhead water tanks, anti-bacterial inner layer, heavy ribbing, and threaded covers.",
    sizes: ["500 Litres", "1,000 Litres", "1,500 Litres", "2,000 Litres"],
    badgeColor: "bg-emerald-600 text-white",
    category: "hardware"
  },
  {
    id: "stock-room-1",
    image: "assets/stock-room-1.jpg",
    badge: "Bulk Warehouse",
    title: "Construction Fasteners & Waterproofing",
    details: "Warehouse storage racks stocked with plumbing fittings, fasteners, Dr. Fixit, and crack sealers.",
    sizes: ["Bulk Contractor Packs"],
    badgeColor: "bg-emerald-600 text-white",
    category: "waterproofing"
  }
];

// State
let currentTab = "home";
let activeProductCategory = "all";
let productSearchQuery = "";
let selectedProductSizes = {};

// Initialize application on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initStoreStatus();
  initProductsCatalog();
  initContactForm();
  initColorVisualizer();
  initSocialProofBadges();
  
  // Check URL hash on initial load
  handleUrlHash();
  window.addEventListener("hashchange", handleUrlHash);

  // Initialize Lucide icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// 1. Navigation & Tab Switching
function initNavigation() {
  const navButtons = document.querySelectorAll("[data-nav-target]");
  navButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = btn.getAttribute("data-nav-target");
      switchTab(target);
      // close mobile drawer if open
      closeMobileMenu();
    });
  });

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenuClose = document.getElementById("mobile-menu-close");
  const mobileMenuDrawer = document.getElementById("mobile-menu-drawer");

  if (mobileMenuToggle && mobileMenuDrawer) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenuDrawer.classList.toggle("hidden");
    });
  }
  if (mobileMenuClose && mobileMenuDrawer) {
    mobileMenuClose.addEventListener("click", () => {
      mobileMenuDrawer.classList.add("hidden");
    });
  }
}

function closeMobileMenu() {
  const mobileMenuDrawer = document.getElementById("mobile-menu-drawer");
  if (mobileMenuDrawer) {
    mobileMenuDrawer.classList.add("hidden");
  }
}

function switchTab(tabId) {
  if (!tabId) tabId = "home";

  const validTabs = ["home", "products", "services", "about", "contact"];
  if (!validTabs.includes(tabId)) {
    tabId = "home";
  }

  currentTab = tabId;

  // Update hash without jump
  if (window.location.hash !== `#${tabId}`) {
    history.pushState(null, null, `#${tabId}`);
  }

  // Update Panes
  document.querySelectorAll(".tab-pane").forEach(pane => {
    pane.classList.remove("active");
  });
  const targetPane = document.getElementById(`tab-${tabId}`);
  if (targetPane) {
    targetPane.classList.add("active");
  }

  // Update Header Nav links active states (Crisp dark text + sunshine amber active underline)
  document.querySelectorAll(".header-nav-link").forEach(link => {
    const linkTarget = link.getAttribute("data-nav-target");
    if (linkTarget === tabId) {
      link.classList.add("active", "text-gray-950", "font-bold", "border-amber-500");
      link.classList.remove("border-transparent", "font-semibold", "text-gray-700");
    } else {
      link.classList.remove("active", "font-bold", "border-amber-500", "text-gray-950");
      link.classList.add("text-gray-700", "font-semibold", "border-transparent");
    }
  });

  // Update Mobile Drawer navigation links
  document.querySelectorAll(".mobile-nav-link").forEach(link => {
    const linkTarget = link.getAttribute("data-nav-target");
    if (linkTarget === tabId) {
      link.classList.add("text-amber-600", "bg-amber-50", "font-bold");
      link.classList.remove("text-gray-700", "font-medium");
    } else {
      link.classList.remove("text-amber-600", "bg-amber-50", "font-bold");
      link.classList.add("text-gray-700", "font-medium");
    }
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Re-run Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function handleUrlHash() {
  const hash = window.location.hash.replace("#", "").trim().toLowerCase();
  if (hash) {
    switchTab(hash);
  } else {
    switchTab("home");
  }
}

// 2. Real-time Store Hours Calculation (IST)
function initStoreStatus() {
  const statusBadges = document.querySelectorAll(".live-store-status");
  if (!statusBadges.length) return;

  function updateStatus() {
    // Current Indian Standard Time (UTC + 5:30)
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istTime = new Date(utcTime + (3600000 * 5.5));

    const day = istTime.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
    const hours = istTime.getHours();
    const minutes = istTime.getMinutes();
    const currentTotalMin = hours * 60 + minutes;

    let isOpen = false;
    let statusText = "";
    let timingDetail = "";

    if (day === 0) {
      // Sunday: 9:00 AM (540 min) to 2:00 PM (840 min)
      if (currentTotalMin >= 540 && currentTotalMin < 840) {
        isOpen = true;
        statusText = "Open Now (Sunday)";
        timingDetail = "Closes today at 2:00 PM";
      } else {
        isOpen = false;
        statusText = "Closed for Sunday Afternoon";
        timingDetail = "Opens Monday at 8:00 AM";
      }
    } else {
      // Mon - Sat: 8:00 AM (480 min) to 7:30 PM (1170 min)
      if (currentTotalMin >= 480 && currentTotalMin < 1170) {
        isOpen = true;
        statusText = "Store Open Now";
        timingDetail = "Open today until 7:30 PM";
      } else if (currentTotalMin < 480) {
        isOpen = false;
        statusText = "Opens Today at 8:00 AM";
        timingDetail = "Morning opening at 8:00 AM";
      } else {
        isOpen = false;
        statusText = "Closed for the Evening";
        timingDetail = "Opens tomorrow at 8:00 AM";
      }
    }

    document.querySelectorAll(".live-status-text").forEach(el => {
      el.textContent = `${statusText} • ${timingDetail}`;
    });
    document.querySelectorAll(".live-status-pulse").forEach(el => {
      if (isOpen) {
        el.className = "w-2 h-2 rounded-full bg-emerald-500 animate-pulse";
      } else {
        el.className = "w-2 h-2 rounded-full bg-amber-500 animate-pulse";
      }
    });

    statusBadges.forEach(badge => {
      badge.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${isOpen ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-700 border border-gray-200'}">
          <span class="w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}"></span>
          <span>${statusText}</span>
          <span class="text-gray-400">•</span>
          <span class="font-normal">${timingDetail}</span>
        </span>
      `;
    });
  }

  updateStatus();
  setInterval(updateStatus, 60000); // Check every minute
}

// 3. Products Catalog & Filtering
function initProductsCatalog() {
  const container = document.getElementById("products-grid-container");
  const filterBtns = document.querySelectorAll("[data-filter-category]");
  const searchInput = document.getElementById("product-search-input");
  const countDisplay = document.getElementById("product-count-display");

  function renderProducts() {
    if (!container) return;

    let filtered = PRODUCTS_DATA.filter(p => {
      const matchesCategory = (activeProductCategory === "all") || (p.category === activeProductCategory) || (p.category === "all");
      const matchesQuery = !productSearchQuery || 
        p.title.toLowerCase().includes(productSearchQuery) ||
        p.badge.toLowerCase().includes(productSearchQuery) ||
        p.details.toLowerCase().includes(productSearchQuery);
      return matchesCategory && matchesQuery;
    });

    if (countDisplay) {
      countDisplay.textContent = `SHOWING ${filtered.length} OF ${PRODUCTS_DATA.length} PRODUCTS`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300 p-8">
          <div class="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-200">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <h4 class="text-xl font-bold text-gray-900 mb-2">No matching products found</h4>
          <p class="text-gray-500 mb-4 max-w-md mx-auto text-xs">Try selecting 'All Products' or clearing your search query.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(p => {
      const sizePills = p.sizes.map(size => `
        <span class="px-2.5 py-1 text-xs font-semibold rounded-lg bg-gray-100 text-gray-700 border border-gray-200 shadow-xs">
          ${size}
        </span>
      `).join("");

      const inquiryText = encodeURIComponent(`Hello MUHAMMED ANEES SALIM, I am inquiring about *${p.title}*. Do you have stock in Vakkom?`);

      return `
        <div class="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
          <!-- Image Container: Uniform 4/3 Aspect Ratio -->
          <div>
            <div class="relative overflow-hidden aspect-[4/3] bg-gray-100">
              <img src="${p.image}" 
                   alt="${p.title}" 
                   onerror="this.onerror=null; this.src='${p.image.replace('assets/', '')}'"
                   class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <!-- Category Badge Pill Tag Over Image with Colorful Showroom Accents -->
              <div class="absolute top-3.5 left-3.5">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm ${p.badgeColor || 'bg-blue-600 text-white'}">
                  ${p.badge}
                </span>
              </div>
            </div>

            <!-- Content Details -->
            <div class="p-5">
              <h3 class="text-lg font-bold text-gray-900 font-heading leading-snug">
                ${p.title}
              </h3>
              <p class="text-xs text-gray-500 leading-relaxed mt-2 font-normal">
                ${p.details}
              </p>
            </div>
          </div>

          <!-- Bottom Meta & Action Area: Sizes + Add to Cart Button -->
          <div class="border-t border-gray-100 bg-gray-50/80 px-5 py-3.5 flex items-end justify-between gap-3">
            <div class="flex-1 min-w-0">
              <span class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Available Sizes:</span>
              <div class="flex flex-wrap gap-1.5">
                ${sizePills}
              </div>
            </div>
            <a href="https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${inquiryText}" 
               target="_blank" 
               class="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all hover:scale-[1.03] active:scale-95 flex-shrink-0 self-end">
              <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
              <span>Add to Cart</span>
            </a>
          </div>
        </div>
      `;
    }).join("");

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => {
        b.classList.remove("bg-amber-500", "text-white", "font-bold", "shadow-sm");
        b.classList.add("bg-gray-100", "text-gray-700", "border-gray-200");
      });
      btn.classList.add("bg-amber-500", "text-white", "font-bold", "shadow-sm");
      btn.classList.remove("bg-gray-100", "text-gray-700", "border-gray-200");

      activeProductCategory = btn.getAttribute("data-filter-category") || "all";
      renderProducts();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      productSearchQuery = e.target.value.trim().toLowerCase();
      renderProducts();
    });
  }

  // Initial render
  renderProducts();
}

// 5. Contact Form WhatsApp Generator
function initContactForm() {
  const form = document.getElementById("quick-inquiry-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("form-name")?.value.trim() || "";
    const phone = document.getElementById("form-phone")?.value.trim() || "";
    const requirement = document.getElementById("form-req-type")?.value || "General Paints & Hardware Inquiry";
    const message = document.getElementById("form-message")?.value.trim() || "";

    if (!name || !phone) {
      alert("Please enter your name and contact phone number.");
      return;
    }

    const whatsappText = encodeURIComponent(
      `*New Inquiry via Website - Classic Paints & Hardware*\n` +
      `-----------------------------------------\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `🎨 *Requirement:* ${requirement}\n` +
      (message ? `📝 *Message:* ${message}\n` : "") +
      `-----------------------------------------\n` +
      `Please let me know your stock availability & quote.`
    );

    const targetUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${whatsappText}`;
    window.open(targetUrl, "_blank");
  });
}

// 6. Interactive Wall Color Swatch Visualizer
function initColorVisualizer() {
  const wallPreview = document.getElementById("interactive-wall-preview");
  const swatchName = document.getElementById("swatch-name-display");
  const swatchCode = document.getElementById("swatch-code-display");
  const swatches = document.querySelectorAll("[data-color-hex]");

  if (!wallPreview || !swatches.length) return;

  swatches.forEach(swatch => {
    swatch.addEventListener("click", () => {
      swatches.forEach(s => s.classList.remove("active"));
      swatch.classList.add("active");

      const hex = swatch.getAttribute("data-color-hex");
      const name = swatch.getAttribute("data-color-name");
      const code = swatch.getAttribute("data-color-code");

      wallPreview.style.backgroundColor = hex;
      if (swatchName) swatchName.textContent = name;
      if (swatchCode) swatchCode.textContent = code;
    });
  });
}

// 7. Clipboard Copy Tool for Phone Numbers
window.copyToClipboard = function(text, el) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied ${text} to clipboard!`);
    });
  } else {
    // fallback
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showToast(`Copied ${text} to clipboard!`);
  }
};

function showToast(message) {
  let toast = document.getElementById("app-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-toast";
    toast.className = "fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl transition-all opacity-0 pointer-events-none flex items-center gap-2 border border-gray-800";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="text-amber-400 font-bold">✓</span> <span>${message}</span>`;
  toast.classList.remove("opacity-0");
  toast.classList.add("opacity-100");
  setTimeout(() => {
    toast.classList.remove("opacity-100");
    toast.classList.add("opacity-0");
  }, 2500);
}

function initSocialProofBadges() {
  // Can be expanded for live rating counters
}
