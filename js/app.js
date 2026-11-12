// Main Application Logic for Event Discovery and Registration Platform

document.addEventListener("DOMContentLoaded", () => {
  // Global State
  const state = {
    events: [],
    registrations: [],
    bookmarks: [],
    currentCategory: "all",
    searchQuery: "",
    priceFilter: "all",
    locationTypeFilter: "all",
    sortBy: "date-asc",
    activeView: "explore", // 'explore' or 'my-events'
    selectedEvent: null,
    registrationData: {
      eventId: null,
      ticketTier: null,
      quantity: 1,
      promoDiscount: 0,
      promoCode: ""
    }
  };

  // DOM Elements Cache
  const elements = {
    // Navigation
    navExploreBtn: document.getElementById("navExploreBtn"),
    navMyEventsBtn: document.getElementById("navMyEventsBtn"),
    navCreateBtn: document.getElementById("navCreateBtn"),
    mobileMenuBtn: document.getElementById("mobileMenuBtn"),
    mobileNavDrawer: document.getElementById("mobileNavDrawer"),
    closeMobileNavBtn: document.getElementById("closeMobileNavBtn"),
    registeredBadge: document.getElementById("registeredBadge"),
    registeredBadgeMobile: document.getElementById("registeredBadgeMobile"),
    themeToggleBtn: document.getElementById("themeToggleBtn"),

    // Views
    exploreView: document.getElementById("exploreView"),
    myEventsView: document.getElementById("myEventsView"),

    // Hero & Search
    heroSearchInput: document.getElementById("heroSearchInput"),
    heroCategorySelect: document.getElementById("heroCategorySelect"),
    heroSearchBtn: document.getElementById("heroSearchBtn"),

    // Discovery Controls
    searchInput: document.getElementById("searchInput"),
    categoryChipsContainer: document.getElementById("categoryChipsContainer"),
    priceFilterSelect: document.getElementById("priceFilterSelect"),
    locationFilterSelect: document.getElementById("locationFilterSelect"),
    sortBySelect: document.getElementById("sortBySelect"),
    clearFiltersBtn: document.getElementById("clearFiltersBtn"),
    resultsCount: document.getElementById("resultsCount"),
    eventsGrid: document.getElementById("eventsGrid"),

    // Featured Hero Carousel
    heroFeaturedCard: document.getElementById("heroFeaturedCard"),

    // Modals
    eventDetailsModal: document.getElementById("eventDetailsModal"),
    detailsModalContent: document.getElementById("detailsModalContent"),
    closeDetailsBtn: document.getElementById("closeDetailsBtn"),

    registrationModal: document.getElementById("registrationModal"),
    registrationForm: document.getElementById("registrationForm"),
    closeRegistrationBtn: document.getElementById("closeRegistrationBtn"),

    ticketModal: document.getElementById("ticketModal"),
    ticketModalContent: document.getElementById("ticketModalContent"),
    closeTicketBtn: document.getElementById("closeTicketBtn"),

    createEventModal: document.getElementById("createEventModal"),
    createEventForm: document.getElementById("createEventForm"),
    closeCreateEventBtn: document.getElementById("closeCreateEventBtn"),

    // My Events Container
    myEventsGrid: document.getElementById("myEventsGrid"),
    myEventsStats: document.getElementById("myEventsStats"),
    myEventsFilterTabs: document.getElementById("myEventsFilterTabs"),

    // Toasts
    toastContainer: document.getElementById("toastContainer")
  };

  // --- INITIALIZATION ---
  function init() {
    loadData();
    setupTheme();
    renderCategoryChips();
    renderEvents();
    renderFeaturedEvent();
    updateNavigationBadges();
    setupEventListeners();
  }

  function loadData() {
    state.events = window.storageManager.getEvents();
    state.registrations = window.storageManager.getRegistrations();
    state.bookmarks = window.storageManager.getBookmarks();
  }

  function setupTheme() {
    const savedTheme = window.storageManager.getTheme();
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    window.storageManager.setTheme(next);
    updateThemeIcon(next);
    showToast(`Switched to ${next} theme`, "info");
  }

  function updateThemeIcon(theme) {
    if (!elements.themeToggleBtn) return;
    elements.themeToggleBtn.innerHTML = theme === "dark" 
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  }

  function updateNavigationBadges() {
    const activeCount = state.registrations.filter(r => r.status === "Confirmed").length;
    if (elements.registeredBadge) {
      elements.registeredBadge.textContent = activeCount;
      elements.registeredBadge.style.display = activeCount > 0 ? "inline-flex" : "none";
    }
    if (elements.registeredBadgeMobile) {
      elements.registeredBadgeMobile.textContent = activeCount;
      elements.registeredBadgeMobile.style.display = activeCount > 0 ? "inline-flex" : "none";
    }
  }

  // --- VIEW SWITCHING ---
  function switchView(viewName) {
    state.activeView = viewName;
    if (viewName === "explore") {
      elements.exploreView.classList.remove("hidden");
      elements.myEventsView.classList.add("hidden");
      elements.navExploreBtn.classList.add("active");
      elements.navMyEventsBtn.classList.remove("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (viewName === "my-events") {
      elements.exploreView.classList.add("hidden");
      elements.myEventsView.classList.remove("hidden");
      elements.navExploreBtn.classList.remove("active");
      elements.navMyEventsBtn.classList.add("active");
      renderMyEventsDashboard();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    closeMobileNav();
  }

  function closeMobileNav() {
    if (elements.mobileNavDrawer) {
      elements.mobileNavDrawer.classList.remove("open");
    }
  }

  // --- CATEGORY CHIPS RENDERING ---
  function renderCategoryChips() {
    if (!elements.categoryChipsContainer) return;

    elements.categoryChipsContainer.innerHTML = CATEGORIES.map(cat => {
      const isActive = state.currentCategory === cat.id;
      return `
        <button class="category-chip ${isActive ? "active" : ""}" data-category="${cat.id}">
          <span class="chip-icon">${getCategoryIcon(cat.id)}</span>
          <span class="chip-label">${cat.label}</span>
        </button>
      `;
    }).join("");

    // Populate Hero Category Select dropdown
    if (elements.heroCategorySelect) {
      elements.heroCategorySelect.innerHTML = `
        <option value="all">All Categories</option>
        ${CATEGORIES.filter(c => c.id !== "all").map(c => `
          <option value="${c.id}">${c.label}</option>
        `).join("")}
      `;
    }
  }

  // --- FEATURED EVENT HERO BANNER ---
  function renderFeaturedEvent() {
    if (!elements.heroFeaturedCard) return;
    const featured = state.events.find(e => e.featured) || state.events[0];
    if (!featured) return;

    const formattedDate = formatDisplayDate(featured.date);

    elements.heroFeaturedCard.innerHTML = `
      <div class="featured-banner-wrapper">
        <img src="${featured.banner}" alt="${featured.title}" class="featured-img" onerror="this.src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'" />
        <div class="featured-overlay"></div>
        <div class="featured-tag">★ SPOTLIGHT EVENT</div>
      </div>
      <div class="featured-content">
        <div class="featured-meta">
          <span class="category-pill">${featured.categoryLabel}</span>
          <span class="meta-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> ${formattedDate}</span>
          <span class="meta-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${featured.city}</span>
        </div>
        <h3 class="featured-title">${featured.title}</h3>
        <p class="featured-desc">${featured.tagline || featured.description.substring(0, 140) + "..."}</p>
        <div class="featured-footer">
          <div class="featured-price">
            <span class="price-val">${featured.price === 0 ? "FREE" : `${featured.currency}${featured.price}`}</span>
            ${featured.originalPrice ? `<span class="price-orig">${featured.currency}${featured.originalPrice}</span>` : ""}
          </div>
          <div class="featured-actions">
            <button class="btn btn-secondary btn-sm" onclick="window.app.openDetailsModal('${featured.id}')">View Details</button>
            <button class="btn btn-primary btn-sm" onclick="window.app.openRegistrationModal('${featured.id}')">Register Now</button>
          </div>
        </div>
      </div>
    `;
  }

  // --- FILTER & SORT LOGIC ---
  function getFilteredEvents() {
    let list = [...state.events];

    // Category filter
    if (state.currentCategory && state.currentCategory !== "all") {
      list = list.filter(e => e.category === state.currentCategory);
    }

    // Search query filter
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase().trim();
      list = list.filter(e => {
        return (
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q) ||
          (e.tags && e.tags.some(tag => tag.toLowerCase().includes(q))) ||
          (e.organizer && e.organizer.name.toLowerCase().includes(q))
        );
      });
    }

    // Price filter
    if (state.priceFilter === "free") {
      list = list.filter(e => e.price === 0);
    } else if (state.priceFilter === "paid") {
      list = list.filter(e => e.price > 0);
    } else if (state.priceFilter === "under50") {
      list = list.filter(e => e.price > 0 && e.price <= 50);
    } else if (state.priceFilter === "50to150") {
      list = list.filter(e => e.price > 50 && e.price <= 150);
    } else if (state.priceFilter === "over150") {
      list = list.filter(e => e.price > 150);
    }

    // Location type filter
    if (state.locationTypeFilter !== "all") {
      list = list.filter(e => e.locationType.toLowerCase() === state.locationTypeFilter.toLowerCase());
    }

    // Sorting
    if (state.sortBy === "date-asc") {
      list.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (state.sortBy === "date-desc") {
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (state.sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === "popularity") {
      list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    } else if (state.sortBy === "rating") {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }

  // --- EVENTS GRID RENDERING ---
  function renderEvents() {
    if (!elements.eventsGrid) return;

    const filtered = getFilteredEvents();

    // Update results count
    if (elements.resultsCount) {
      elements.resultsCount.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? "upcoming event" : "upcoming events"}`;
    }

    // Show / Hide Clear Filters Button
    const hasActiveFilters = state.currentCategory !== "all" || state.searchQuery || state.priceFilter !== "all" || state.locationTypeFilter !== "all";
    if (elements.clearFiltersBtn) {
      elements.clearFiltersBtn.style.display = hasActiveFilters ? "inline-flex" : "none";
    }

    if (filtered.length === 0) {
      elements.eventsGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No events found</h3>
          <p>We couldn't find any events matching your selected search or filter criteria.</p>
          <button class="btn btn-secondary" onclick="window.app.resetFilters()">Clear All Filters</button>
        </div>
      `;
      return;
    }

    elements.eventsGrid.innerHTML = filtered.map(event => {
      const isBookmarked = state.bookmarks.includes(event.id);
      const isSoldOut = event.availableSeats <= 0;
      const formattedDate = formatDisplayDate(event.date);
      const seatsPercent = Math.max(5, Math.min(100, Math.round((event.availableSeats / event.totalSeats) * 100)));
      const isFillingFast = event.availableSeats < 40 && event.availableSeats > 0;

      return `
        <article class="event-card" data-id="${event.id}">
          <div class="card-banner-wrap">
            <img src="${event.banner}" alt="${event.title}" class="card-banner" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80'" />
            <div class="card-badges">
              <span class="category-pill">${event.categoryLabel}</span>
              ${event.badge ? `<span class="status-pill status-${event.badge.toLowerCase().replace(/\s+/g, '-')}">${event.badge}</span>` : ""}
            </div>
            <button class="bookmark-btn ${isBookmarked ? "active" : ""}" title="Save to Bookmarks" onclick="window.app.toggleBookmark('${event.id}', event)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isBookmarked ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <div class="card-price-tag">
              ${event.price === 0 ? "FREE" : `${event.currency}${event.price}`}
            </div>
          </div>

          <div class="card-body">
            <div class="card-meta">
              <div class="meta-date">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <span>${formattedDate}</span>
              </div>
              <div class="meta-location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>${event.city}</span>
              </div>
            </div>

            <h3 class="card-title" onclick="window.app.openDetailsModal('${event.id}')">${event.title}</h3>
            <p class="card-description">${event.tagline || event.description.substring(0, 105) + "..."}</p>

            <div class="card-tags">
              ${(event.tags || []).slice(0, 3).map(t => `<span class="event-tag">#${t}</span>`).join("")}
            </div>

            <div class="card-capacity">
              <div class="capacity-header">
                <span class="capacity-text">
                  ${isSoldOut ? "Sold Out" : `${event.availableSeats} seats remaining`}
                </span>
                ${isFillingFast ? `<span class="capacity-warning">Filling Fast</span>` : ""}
              </div>
              <div class="capacity-bar">
                <div class="capacity-fill ${isFillingFast ? "warning" : ""}" style="width: ${seatsPercent}%;"></div>
              </div>
            </div>

            <div class="card-footer">
              <button class="btn btn-secondary btn-sm" onclick="window.app.openDetailsModal('${event.id}')">
                Details
              </button>
              <button class="btn btn-primary btn-sm ${isSoldOut ? "disabled" : ""}" ${isSoldOut ? "disabled" : ""} onclick="window.app.openRegistrationModal('${event.id}')">
                ${isSoldOut ? "Sold Out" : "Register"}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  // --- EVENT DETAILS MODAL ---
  function openDetailsModal(eventId) {
    const event = state.events.find(e => e.id === eventId);
    if (!event) return;
    state.selectedEvent = event;

    const formattedDate = formatDisplayDate(event.date);
    const isSoldOut = event.availableSeats <= 0;

    elements.detailsModalContent.innerHTML = `
      <div class="modal-banner-wrap">
        <img src="${event.banner}" alt="${event.title}" class="modal-banner" onerror="this.src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'" />
        <div class="modal-banner-overlay"></div>
        <div class="modal-banner-badges">
          <span class="category-pill">${event.categoryLabel}</span>
          <span class="format-pill format-${event.locationType.toLowerCase()}">${event.locationType}</span>
        </div>
      </div>

      <div class="details-body">
        <div class="details-header-section">
          <div>
            <h2 class="details-title">${event.title}</h2>
            <div class="details-quick-meta">
              <div class="quick-meta-box">
                <div class="meta-icon-box">📅</div>
                <div>
                  <div class="quick-label">Date & Time</div>
                  <div class="quick-value">${formattedDate}</div>
                  <div class="quick-sub">${event.time}</div>
                </div>
              </div>
              <div class="quick-meta-box">
                <div class="meta-icon-box">📍</div>
                <div>
                  <div class="quick-label">Venue Location</div>
                  <div class="quick-value">${event.venue}</div>
                  <div class="quick-sub">${event.city}</div>
                </div>
              </div>
              <div class="quick-meta-box">
                <div class="meta-icon-box">🎟️</div>
                <div>
                  <div class="quick-label">Registration</div>
                  <div class="quick-value">${event.price === 0 ? "FREE" : `${event.currency}${event.price}`}</div>
                  <div class="quick-sub">${event.availableSeats} passes left</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Organizer Profile -->
        <div class="organizer-card">
          <img src="${event.organizer.avatar}" alt="${event.organizer.name}" class="organizer-avatar" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'" />
          <div class="organizer-info">
            <div class="organizer-name">
              ${event.organizer.name}
              ${event.organizer.verified ? `<span class="verified-badge" title="Verified Organizer">✓ Verified</span>` : ""}
            </div>
            <div class="organizer-role">${event.organizer.role} • ${event.organizer.email}</div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="window.app.shareEvent('${event.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg> Share
          </button>
        </div>

        <!-- Description & Highlights -->
        <div class="details-section">
          <h3 class="section-title">About This Event</h3>
          <p class="details-paragraph">${event.description}</p>
          
          <h4 class="sub-title">Event Highlights</h4>
          <ul class="highlights-list">
            ${event.highlights.map(h => `<li><span class="check-bullet">✓</span> ${h}</li>`).join("")}
          </ul>
        </div>

        <!-- Schedule / Agenda -->
        ${event.agenda && event.agenda.length > 0 ? `
          <div class="details-section">
            <h3 class="section-title">Agenda & Program</h3>
            <div class="agenda-timeline">
              ${event.agenda.map(item => `
                <div class="agenda-item">
                  <div class="agenda-time">${item.time}</div>
                  <div class="agenda-info">
                    <div class="agenda-title">${item.title}</div>
                    <div class="agenda-speaker">${item.speaker}</div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Featured Speakers -->
        ${event.speakers && event.speakers.length > 0 ? `
          <div class="details-section">
            <h3 class="section-title">Featured Speakers & Hosts</h3>
            <div class="speakers-grid">
              ${event.speakers.map(sp => `
                <div class="speaker-card">
                  <img src="${sp.avatar}" alt="${sp.name}" class="speaker-avatar" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'" />
                  <div class="speaker-name">${sp.name}</div>
                  <div class="speaker-role">${sp.role}</div>
                  <div class="speaker-company">${sp.company}</div>
                </div>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Ticket Tiers Overview -->
        <div class="details-section">
          <h3 class="section-title">Ticket Packages</h3>
          <div class="tiers-grid">
            ${event.ticketTiers.map(tier => `
              <div class="tier-card">
                <div class="tier-header">
                  <h4 class="tier-name">${tier.name}</h4>
                  <div class="tier-price">${tier.price === 0 ? "FREE" : `${event.currency}${tier.price}`}</div>
                </div>
                <p class="tier-desc">${tier.description}</p>
                <ul class="tier-perks">
                  ${tier.perks.map(p => `<li>• ${p}</li>`).join("")}
                </ul>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Sticky Bottom CTA in Modal -->
        <div class="details-modal-footer">
          <div class="footer-price-info">
            <span class="label">Starting from</span>
            <span class="value">${event.price === 0 ? "FREE" : `${event.currency}${event.price}`}</span>
          </div>
          <div class="footer-action-buttons">
            <button class="btn btn-secondary" onclick="window.app.downloadCalendarEvent('${event.id}')">
              📅 Add to Calendar
            </button>
            <button class="btn btn-primary ${isSoldOut ? "disabled" : ""}" ${isSoldOut ? "disabled" : ""} onclick="window.app.proceedToRegistrationFromDetails('${event.id}')">
              ${isSoldOut ? "Sold Out" : "Book Registration"}
            </button>
          </div>
        </div>
      </div>
    `;

    elements.eventDetailsModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeDetailsModal() {
    elements.eventDetailsModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  // --- REGISTRATION MODAL FLOW ---
  function openRegistrationModal(eventId) {
    const event = state.events.find(e => e.id === eventId);
    if (!event) return;
    if (event.availableSeats <= 0) {
      showToast("Sorry, this event is already sold out!", "error");
      return;
    }

    state.selectedEvent = event;
    state.registrationData = {
      eventId: event.id,
      ticketTier: event.ticketTiers[0].name,
      ticketPrice: event.ticketTiers[0].price,
      quantity: 1,
      promoDiscount: 0,
      promoCode: ""
    };

    renderRegistrationFormContent(event);
    elements.registrationModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function proceedToRegistrationFromDetails(eventId) {
    closeDetailsModal();
    setTimeout(() => {
      openRegistrationModal(eventId);
    }, 200);
  }

  function renderRegistrationFormContent(event) {
    const container = document.getElementById("registrationModalBody");
    if (!container) return;

    container.innerHTML = `
      <div class="reg-event-header">
        <img src="${event.banner}" alt="${event.title}" class="reg-thumb" onerror="this.src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80'" />
        <div class="reg-header-info">
          <span class="category-pill">${event.categoryLabel}</span>
          <h3 class="reg-title">${event.title}</h3>
          <div class="reg-meta">${formatDisplayDate(event.date)} • ${event.venue}</div>
        </div>
      </div>

      <form id="registrationForm" onsubmit="window.app.handleRegistrationSubmit(event)">
        <!-- Step 1: Ticket Selection -->
        <div class="form-section-title">1. Select Ticket Pass</div>
        <div class="ticket-select-grid">
          ${event.ticketTiers.map((tier, idx) => `
            <label class="ticket-select-card ${idx === 0 ? "selected" : ""}" data-tier="${tier.name}" data-price="${tier.price}">
              <input type="radio" name="selectedTier" value="${tier.name}" ${idx === 0 ? "checked" : ""} onchange="window.app.handleTierChange('${tier.name}', ${tier.price})" />
              <div class="ticket-card-content">
                <div class="ticket-tier-top">
                  <span class="tier-label">${tier.name}</span>
                  <span class="tier-price-tag">${tier.price === 0 ? "FREE" : `${event.currency}${tier.price}`}</span>
                </div>
                <div class="tier-desc">${tier.description}</div>
              </div>
            </label>
          `).join("")}
        </div>

        <!-- Quantity Stepper -->
        <div class="form-row form-row-center">
          <label class="form-label" style="margin-bottom:0;">Number of Attendees / Passes</label>
          <div class="stepper-box">
            <button type="button" class="stepper-btn" onclick="window.app.changeQuantity(-1)">−</button>
            <span id="ticketQuantityDisplay" class="stepper-val">1</span>
            <button type="button" class="stepper-btn" onclick="window.app.changeQuantity(1)">+</button>
          </div>
        </div>

        <!-- Step 2: Attendee Info -->
        <div class="form-section-title" style="margin-top:24px;">2. Primary Attendee Information</div>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label" for="regFullName">Full Name *</label>
            <input type="text" id="regFullName" class="form-input" placeholder="e.g. Sarah Jenkins" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="regEmail">Email Address *</label>
            <input type="email" id="regEmail" class="form-input" placeholder="e.g. sarah@example.com" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="regPhone">Phone Number</label>
            <input type="tel" id="regPhone" class="form-input" placeholder="e.g. +1 (555) 019-2834" />
          </div>
          <div class="form-group">
            <label class="form-label" for="regCompany">Company / Organization</label>
            <input type="text" id="regCompany" class="form-input" placeholder="e.g. Google / Student / Independent" />
          </div>
        </div>

        <div class="form-group" style="margin-top:12px;">
          <label class="form-label" for="regDietary">Special Requirements or Dietary Notes (Optional)</label>
          <input type="text" id="regDietary" class="form-input" placeholder="e.g. Vegan, Accessibility seating, None" />
        </div>

        <!-- Step 3: Promo Code -->
        <div class="promo-box">
          <div class="promo-input-group">
            <input type="text" id="regPromoCode" class="form-input" placeholder="Promo code (try 'EARLYBIRD' or 'SAVE20')" />
            <button type="button" class="btn btn-secondary" onclick="window.app.applyPromoCode()">Apply</button>
          </div>
          <div id="promoFeedback" class="promo-feedback"></div>
        </div>

        <!-- Order Summary Breakdown -->
        <div class="order-summary-box">
          <div class="summary-line">
            <span>Pass Type & Qty:</span>
            <span id="summaryTier">${state.registrationData.ticketTier} (x1)</span>
          </div>
          <div class="summary-line">
            <span>Subtotal:</span>
            <span id="summarySubtotal">${event.currency}${state.registrationData.ticketPrice}</span>
          </div>
          <div class="summary-line discount" id="summaryDiscountRow" style="display:none;">
            <span>Discount Promo:</span>
            <span id="summaryDiscount">-$0.00</span>
          </div>
          <div class="summary-line">
            <span>Service & Processing Fees:</span>
            <span class="text-green">WAIVED ($0.00)</span>
          </div>
          <div class="summary-divider"></div>
          <div class="summary-total-line">
            <span>Total Payable:</span>
            <span id="summaryTotal" class="total-amount">${event.currency}${state.registrationData.ticketPrice}</span>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="reg-submit-wrap">
          <button type="submit" id="btnSubmitRegistration" class="btn btn-primary btn-block btn-lg">
            Confirm & Complete Registration
          </button>
          <p class="reg-terms-hint">By registering, you agree to our Community Guidelines and Event Admission Policy.</p>
        </div>
      </form>
    `;
  }

  function handleTierChange(tierName, price) {
    state.registrationData.ticketTier = tierName;
    state.registrationData.ticketPrice = price;

    // Update active visual state of cards
    document.querySelectorAll(".ticket-select-card").forEach(card => {
      if (card.dataset.tier === tierName) {
        card.classList.add("selected");
      } else {
        card.classList.remove("selected");
      }
    });

    updateOrderSummary();
  }

  function changeQuantity(delta) {
    const nextVal = state.registrationData.quantity + delta;
    if (nextVal >= 1 && nextVal <= 8) {
      state.registrationData.quantity = nextVal;
      const display = document.getElementById("ticketQuantityDisplay");
      if (display) display.textContent = nextVal;
      updateOrderSummary();
    }
  }

  function applyPromoCode() {
    const input = document.getElementById("regPromoCode");
    const feedback = document.getElementById("promoFeedback");
    if (!input || !feedback) return;

    const code = input.value.trim().toUpperCase();
    if (!code) {
      feedback.textContent = "Please enter a promo code.";
      feedback.className = "promo-feedback error";
      return;
    }

    if (code === "EARLYBIRD" || code === "SAVE20") {
      state.registrationData.promoDiscount = 0.20; // 20% off
      state.registrationData.promoCode = code;
      feedback.textContent = `Promo code "${code}" applied! 20% discount applied.`;
      feedback.className = "promo-feedback success";
      showToast("20% discount coupon applied!", "success");
    } else if (code === "VIPFREE" && state.registrationData.ticketPrice > 0) {
      state.registrationData.promoDiscount = 0.50; // 50% off
      state.registrationData.promoCode = code;
      feedback.textContent = `VIP 50% discount applied!`;
      feedback.className = "promo-feedback success";
      showToast("VIP 50% coupon applied!", "success");
    } else {
      feedback.textContent = "Invalid or expired promo code.";
      feedback.className = "promo-feedback error";
    }

    updateOrderSummary();
  }

  function updateOrderSummary() {
    const event = state.selectedEvent;
    if (!event) return;

    const qty = state.registrationData.quantity;
    const basePrice = state.registrationData.ticketPrice;
    const rawTotal = basePrice * qty;
    const discount = rawTotal * (state.registrationData.promoDiscount || 0);
    const finalTotal = Math.max(0, rawTotal - discount);

    const summaryTier = document.getElementById("summaryTier");
    const summarySubtotal = document.getElementById("summarySubtotal");
    const summaryDiscountRow = document.getElementById("summaryDiscountRow");
    const summaryDiscount = document.getElementById("summaryDiscount");
    const summaryTotal = document.getElementById("summaryTotal");

    if (summaryTier) summaryTier.textContent = `${state.registrationData.ticketTier} (x${qty})`;
    if (summarySubtotal) summarySubtotal.textContent = `${event.currency}${rawTotal.toFixed(2)}`;

    if (summaryDiscountRow && summaryDiscount) {
      if (discount > 0) {
        summaryDiscountRow.style.display = "flex";
        summaryDiscount.textContent = `-${event.currency}${discount.toFixed(2)}`;
      } else {
        summaryDiscountRow.style.display = "none";
      }
    }

    if (summaryTotal) {
      summaryTotal.textContent = finalTotal === 0 ? "FREE" : `${event.currency}${finalTotal.toFixed(2)}`;
    }
  }

  function handleRegistrationSubmit(e) {
    e.preventDefault();
    const event = state.selectedEvent;
    if (!event) return;

    const fullName = document.getElementById("regFullName")?.value.trim();
    const email = document.getElementById("regEmail")?.value.trim();
    const phone = document.getElementById("regPhone")?.value.trim() || "";
    const company = document.getElementById("regCompany")?.value.trim() || "Independent";
    const dietary = document.getElementById("regDietary")?.value.trim() || "None";

    if (!fullName || !email) {
      showToast("Please fill in your name and email.", "error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    const qty = state.registrationData.quantity;
    const basePrice = state.registrationData.ticketPrice;
    const rawTotal = basePrice * qty;
    const discount = rawTotal * (state.registrationData.promoDiscount || 0);
    const finalTotal = Math.max(0, rawTotal - discount);

    // Generate unique booking code
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `ML-2026-${randomDigits}`;

    const newRegistration = {
      bookingId: bookingId,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      eventVenue: event.venue,
      eventBanner: event.banner,
      category: event.category,
      categoryLabel: event.categoryLabel,
      ticketTier: state.registrationData.ticketTier,
      ticketPrice: basePrice,
      quantity: qty,
      discountAmount: discount,
      totalPrice: finalTotal,
      attendee: {
        fullName,
        email,
        phone,
        organization: company,
        dietary
      },
      status: "Confirmed",
      registeredAt: new Date().toISOString(),
      qrCodeData: `${bookingId}|${event.id}|${fullName}|${qty}x ${state.registrationData.ticketTier}`
    };

    // Save registration
    window.storageManager.addRegistration(newRegistration);
    loadData();
    renderEvents();
    renderFeaturedEvent();
    updateNavigationBadges();

    // Render Success Confirmation in Modal
    renderRegistrationSuccess(newRegistration);
    showToast("🎉 Registration confirmed! Your digital pass is ready.", "success");
  }

  function renderRegistrationSuccess(reg) {
    const container = document.getElementById("registrationModalBody");
    if (!container) return;

    const qrSvg = window.TicketRenderer.generateQRCodeSVG(reg.qrCodeData, 140);

    container.innerHTML = `
      <div class="success-screen">
        <div class="success-check-badge">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2 class="success-title">You're Going!</h2>
        <p class="success-subtitle">A confirmation receipt and digital ticket pass have been generated.</p>

        <!-- Digital Ticket Snippet -->
        <div class="ticket-preview-snippet">
          <div class="snippet-header">
            <span class="category-pill">${reg.categoryLabel}</span>
            <div class="snippet-code">${reg.bookingId}</div>
          </div>
          <h4 class="snippet-title">${reg.eventTitle}</h4>
          <div class="snippet-meta">
            <div><strong>Date:</strong> ${formatDisplayDate(reg.eventDate)}</div>
            <div><strong>Venue:</strong> ${reg.eventVenue}</div>
            <div><strong>Attendee:</strong> ${reg.attendee.fullName} (${reg.quantity} Pass)</div>
          </div>
          <div class="snippet-qr-wrap">
            ${qrSvg}
          </div>
        </div>

        <div class="success-actions">
          <button class="btn btn-primary" onclick="window.app.openTicketModal('${reg.bookingId}')">
            🎟️ View & Print Digital Pass
          </button>
          <button class="btn btn-secondary" onclick="window.app.downloadCalendarEvent('${reg.eventId}')">
            📅 Add to Calendar
          </button>
          <button class="btn btn-outline" onclick="window.app.goToMyEventsAndClose()">
            Go to My Events Dashboard
          </button>
        </div>
      </div>
    `;
  }

  function goToMyEventsAndClose() {
    closeRegistrationModal();
    switchView("my-events");
  }

  function closeRegistrationModal() {
    elements.registrationModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  // --- DIGITAL TICKET PASS MODAL ---
  function openTicketModal(bookingId) {
    const reg = state.registrations.find(r => r.bookingId === bookingId);
    if (!reg) return;

    const qrSvg = window.TicketRenderer.generateQRCodeSVG(reg.qrCodeData || reg.bookingId, 160);
    const barcodeSvg = window.TicketRenderer.generateBarcodeSVG(reg.bookingId, 260, 50);

    elements.ticketModalContent.innerHTML = `
      <div class="ticket-view-card">
        <div class="ticket-view-header">
          <div class="ticket-brand">
            <span>🌙 MOON LIGHT PASS</span>
            <span class="ticket-status-pill ${reg.status === 'Confirmed' ? 'active' : 'cancelled'}">${reg.status.toUpperCase()}</span>
          </div>
          <h2 class="ticket-event-title">${reg.eventTitle}</h2>
          <p class="ticket-event-datetime">${formatDisplayDate(reg.eventDate)} • ${reg.eventTime}</p>
        </div>

        <div class="ticket-view-body">
          <div class="ticket-info-grid">
            <div class="ticket-field">
              <span class="field-label">ATTENDEE</span>
              <span class="field-val">${reg.attendee.fullName}</span>
            </div>
            <div class="ticket-field">
              <span class="field-label">BOOKING CODE</span>
              <span class="field-val code-font">${reg.bookingId}</span>
            </div>
            <div class="ticket-field">
              <span class="field-label">VENUE</span>
              <span class="field-val">${reg.eventVenue}</span>
            </div>
            <div class="ticket-field">
              <span class="field-label">TIER & SEATS</span>
              <span class="field-val">${reg.ticketTier} (${reg.quantity} Pass)</span>
            </div>
            <div class="ticket-field">
              <span class="field-label">TOTAL PAID</span>
              <span class="field-val">${reg.totalPrice === 0 ? "FREE" : `$${reg.totalPrice}`}</span>
            </div>
            <div class="ticket-field">
              <span class="field-label">ORGANIZATION</span>
              <span class="field-val">${reg.attendee.organization || "General Admission"}</span>
            </div>
          </div>

          <div class="ticket-qr-center">
            ${qrSvg}
            <span class="qr-helper-text">Present this QR code at venue entrance for fast check-in</span>
          </div>
        </div>

        <div class="ticket-view-footer">
          ${barcodeSvg}
        </div>
      </div>

      <div class="ticket-actions-bar">
        <button class="btn btn-primary" onclick="window.TicketRenderer.printTicket(${JSON.stringify(reg).replace(/"/g, '&quot;')})">
          🖨️ Print / Save Ticket (PDF)
        </button>
        <button class="btn btn-secondary" onclick="window.app.downloadCalendarEvent('${reg.eventId}')">
          📅 Add to Calendar (.ics)
        </button>
      </div>
    `;

    elements.ticketModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeTicketModal() {
    elements.ticketModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  // --- MY EVENTS SECTION ---
  let myEventsTabFilter = "all"; // 'all', 'confirmed', 'cancelled'

  function renderMyEventsDashboard() {
    if (!elements.myEventsGrid) return;
    loadData();

    // Stats calculation
    const totalRegs = state.registrations.length;
    const confirmedRegs = state.registrations.filter(r => r.status === "Confirmed");
    const cancelledRegs = state.registrations.filter(r => r.status === "Cancelled");
    const totalSpent = confirmedRegs.reduce((sum, r) => sum + (r.totalPrice || 0), 0);

    if (elements.myEventsStats) {
      elements.myEventsStats.innerHTML = `
        <div class="stat-card">
          <div class="stat-num">${confirmedRegs.length}</div>
          <div class="stat-label">Active Passes</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">${totalRegs}</div>
          <div class="stat-label">Total Bookings</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">$${totalSpent.toFixed(0)}</div>
          <div class="stat-label">Total Invested</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">${state.bookmarks.length}</div>
          <div class="stat-label">Saved Events</div>
        </div>
      `;
    }

    // Filter registrations by active tab
    let displayList = state.registrations;
    if (myEventsTabFilter === "confirmed") {
      displayList = confirmedRegs;
    } else if (myEventsTabFilter === "cancelled") {
      displayList = cancelledRegs;
    }

    if (displayList.length === 0) {
      elements.myEventsGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🎟️</div>
          <h3>No registered events found</h3>
          <p>${myEventsTabFilter === "all" ? "You haven't registered for any events yet. Explore upcoming experiences and book your first pass!" : `No ${myEventsTabFilter} registrations.`}</p>
          <button class="btn btn-primary" onclick="window.app.switchView('explore')">Explore Upcoming Events</button>
        </div>
      `;
      return;
    }

    elements.myEventsGrid.innerHTML = displayList.map(reg => {
      const isConfirmed = reg.status === "Confirmed";
      const formattedDate = formatDisplayDate(reg.eventDate);

      return `
        <div class="my-event-card ${isConfirmed ? "" : "cancelled"}">
          <div class="my-event-banner-wrap">
            <img src="${reg.eventBanner}" alt="${reg.eventTitle}" class="my-event-img" onerror="this.src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80'" />
            <span class="status-badge ${isConfirmed ? "confirmed" : "cancelled"}">
              ${isConfirmed ? "● Confirmed" : "✕ Cancelled"}
            </span>
          </div>

          <div class="my-event-content">
            <div class="my-event-top">
              <span class="category-pill">${reg.categoryLabel || "Event"}</span>
              <span class="booking-ref">Ref: ${reg.bookingId}</span>
            </div>

            <h3 class="my-event-title">${reg.eventTitle}</h3>

            <div class="my-event-meta-grid">
              <div class="meta-cell">
                <span class="cell-label">Date & Time</span>
                <span class="cell-val">${formattedDate} • ${reg.eventTime}</span>
              </div>
              <div class="meta-cell">
                <span class="cell-label">Venue</span>
                <span class="cell-val">${reg.eventVenue}</span>
              </div>
              <div class="meta-cell">
                <span class="cell-label">Ticket Tier</span>
                <span class="cell-val">${reg.ticketTier} (Qty: ${reg.quantity})</span>
              </div>
              <div class="meta-cell">
                <span class="cell-label">Total Amount</span>
                <span class="cell-val">${reg.totalPrice === 0 ? "FREE" : `$${reg.totalPrice}`}</span>
              </div>
            </div>

            <div class="my-event-actions">
              ${isConfirmed ? `
                <button class="btn btn-primary btn-sm" onclick="window.app.openTicketModal('${reg.bookingId}')">
                  🎟️ View E-Ticket Pass
                </button>
                <button class="btn btn-secondary btn-sm" onclick="window.app.downloadCalendarEvent('${reg.eventId}')">
                  📅 Add to Cal
                </button>
                <button class="btn btn-danger-outline btn-sm" onclick="window.app.confirmCancelRegistration('${reg.bookingId}')">
                  Cancel Booking
                </button>
              ` : `
                <span class="cancelled-note">This registration was cancelled. Seats have been released.</span>
                <button class="btn btn-secondary btn-sm" onclick="window.app.openRegistrationModal('${reg.eventId}')">
                  Re-Register
                </button>
              `}
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  function filterMyEvents(tab) {
    myEventsTabFilter = tab;
    document.querySelectorAll(".tab-pill").forEach(pill => {
      if (pill.dataset.tab === tab) {
        pill.classList.add("active");
      } else {
        pill.classList.remove("active");
      }
    });
    renderMyEventsDashboard();
  }

  function confirmCancelRegistration(bookingId) {
    const reg = state.registrations.find(r => r.bookingId === bookingId);
    if (!reg) return;

    if (confirm(`Are you sure you want to cancel your registration for "${reg.eventTitle}"? Your seat reservation will be released.`)) {
      const success = window.storageManager.cancelRegistration(bookingId);
      if (success) {
        showToast("Registration successfully cancelled. Seats returned to event pool.", "info");
        loadData();
        renderMyEventsDashboard();
        renderEvents();
        updateNavigationBadges();
      }
    }
  }

  // --- HOST / CREATE EVENT MODAL ---
  function openCreateEventModal() {
    elements.createEventModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeCreateEventModal() {
    elements.createEventModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  function handleCreateEventSubmit(e) {
    e.preventDefault();

    const title = document.getElementById("newEventTitle")?.value.trim();
    const category = document.getElementById("newEventCategory")?.value;
    const date = document.getElementById("newEventDate")?.value;
    const time = document.getElementById("newEventTime")?.value.trim();
    const venue = document.getElementById("newEventVenue")?.value.trim();
    const city = document.getElementById("newEventCity")?.value.trim();
    const price = parseFloat(document.getElementById("newEventPrice")?.value || 0);
    const seats = parseInt(document.getElementById("newEventSeats")?.value || 100, 10);
    const banner = document.getElementById("newEventBanner")?.value.trim() || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80";
    const description = document.getElementById("newEventDescription")?.value.trim();
    const locationType = document.getElementById("newEventLocationType")?.value || "In-Person";

    if (!title || !date || !venue || !description) {
      showToast("Please fill in all required event details.", "error");
      return;
    }

    const catObj = CATEGORIES.find(c => c.id === category) || { label: "General" };

    const newEvent = {
      id: `evt-custom-${Date.now()}`,
      title,
      tagline: description.substring(0, 80) + "...",
      category,
      categoryLabel: catObj.label,
      badge: "New",
      featured: false,
      banner,
      date,
      time: time || "10:00 AM - 05:00 PM",
      locationType,
      venue,
      city: city || "Metropolitan Area",
      price,
      currency: "$",
      availableSeats: seats,
      totalSeats: seats,
      rating: 5.0,
      reviewsCount: 1,
      organizer: {
        name: "Community Host",
        role: "Event Organizer",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        verified: true,
        email: "organizer@moonlight.io"
      },
      description,
      highlights: [
        "Interactive live sessions and presentations",
        "Direct networking with domain specialists",
        "Comprehensive attendee materials and digital takeaways"
      ],
      agenda: [
        { time: "10:00 AM", title: "Opening Keynote & Introductions", speaker: "Host" },
        { time: "01:00 PM", title: "Main Event Showcase & Networking", speaker: "Guest Speakers" }
      ],
      speakers: [
        { name: "Host Organizer", role: "Keynote Lead", company: "Event Management", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" }
      ],
      ticketTiers: [
        { id: "gen", name: "General Admission", price: price, description: "Full event access pass.", perks: ["All stage access", "Networking", "Event materials"] }
      ],
      tags: ["NewEvent", catObj.id, "Live"]
    };

    window.storageManager.saveEvent(newEvent);
    loadData();
    renderEvents();
    closeCreateEventModal();
    showToast("🎉 Event successfully created and published!", "success");
    elements.createEventForm.reset();
  }

  // --- BOOKMARKS & SHARE & CALENDAR HELPERS ---
  function toggleBookmark(eventId, event) {
    if (event) event.stopPropagation();
    const isNowBookmarked = window.storageManager.toggleBookmark(eventId);
    loadData();
    renderEvents();
    showToast(isNowBookmarked ? "Event added to your bookmarks ❤️" : "Event removed from bookmarks", "info");
  }

  function shareEvent(eventId) {
    const event = state.events.find(e => e.id === eventId);
    const url = window.location.href.split("#")[0] + `?event=${eventId}`;
    navigator.clipboard.writeText(url).then(() => {
      showToast(`Link copied to clipboard: ${event ? event.title : 'Event'}`, "success");
    }).catch(() => {
      showToast("Link ready to share!", "info");
    });
  }

  function downloadCalendarEvent(eventId) {
    const event = state.events.find(e => e.id === eventId);
    if (!event) return;

    // Generate .ics calendar standard file
    const cleanDate = event.date.replace(/-/g, "");
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//MoonLight//Event Management Platform//EN",
      "BEGIN:VEVENT",
      `UID:${event.id}@moonlight.io`,
      `DTSTAMP:${cleanDate}T090000Z`,
      `DTSTART:${cleanDate}T090000Z`,
      `DTEND:${cleanDate}T170000Z`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description.replace(/\n/g, ' ')}`,
      `LOCATION:${event.venue}, ${event.city}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${event.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Calendar (.ics) invite downloaded!", "success");
  }

  // --- TOAST NOTIFICATIONS ---
  function showToast(message, type = "info") {
    if (!elements.toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;
    const icon = type === "success" ? "✓" : type === "error" ? "⚠" : "ℹ";
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${message}</span>
    `;

    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("visible");
    }, 10);

    setTimeout(() => {
      toast.classList.remove("visible");
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3500);
  }

  // --- FORMATTING UTILS ---
  function formatDisplayDate(dateStr) {
    if (!dateStr) return "";
    const options = { weekday: "short", month: "short", day: "numeric", year: "numeric" };
    const dateObj = new Date(dateStr + "T00:00:00");
    return dateObj.toLocaleDateString("en-US", options);
  }

  function getCategoryIcon(catId) {
    const icons = {
      all: "✨",
      technology: "💻",
      music: "🎵",
      business: "💼",
      food: "🍷",
      arts: "🎨",
      sports: "🏃",
      workshops: "📚"
    };
    return icons[catId] || "🏷️";
  }

  function resetFilters() {
    state.currentCategory = "all";
    state.searchQuery = "";
    state.priceFilter = "all";
    state.locationTypeFilter = "all";
    state.sortBy = "date-asc";

    if (elements.searchInput) elements.searchInput.value = "";
    if (elements.heroSearchInput) elements.heroSearchInput.value = "";
    if (elements.priceFilterSelect) elements.priceFilterSelect.value = "all";
    if (elements.locationFilterSelect) elements.locationFilterSelect.value = "all";
    if (elements.sortBySelect) elements.sortBySelect.value = "date-asc";

    renderCategoryChips();
    renderEvents();
    showToast("Filters reset to default", "info");
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    // Navigation
    if (elements.navExploreBtn) {
      elements.navExploreBtn.addEventListener("click", () => switchView("explore"));
    }
    if (elements.navMyEventsBtn) {
      elements.navMyEventsBtn.addEventListener("click", () => switchView("my-events"));
    }
    if (elements.navCreateBtn) {
      elements.navCreateBtn.addEventListener("click", openCreateEventModal);
    }
    if (elements.themeToggleBtn) {
      elements.themeToggleBtn.addEventListener("click", toggleTheme);
    }

    // Mobile nav drawer
    if (elements.mobileMenuBtn) {
      elements.mobileMenuBtn.addEventListener("click", () => {
        elements.mobileNavDrawer.classList.add("open");
      });
    }
    if (elements.closeMobileNavBtn) {
      elements.closeMobileNavBtn.addEventListener("click", closeMobileNav);
    }

    // Category chips click delegation
    if (elements.categoryChipsContainer) {
      elements.categoryChipsContainer.addEventListener("click", (e) => {
        const chip = e.target.closest(".category-chip");
        if (chip) {
          state.currentCategory = chip.dataset.category;
          renderCategoryChips();
          renderEvents();
        }
      });
    }

    // Live search input
    if (elements.searchInput) {
      elements.searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        renderEvents();
      });
    }

    // Hero search
    if (elements.heroSearchBtn) {
      elements.heroSearchBtn.addEventListener("click", () => {
        const query = elements.heroSearchInput ? elements.heroSearchInput.value : "";
        const cat = elements.heroCategorySelect ? elements.heroCategorySelect.value : "all";

        state.searchQuery = query;
        state.currentCategory = cat;

        if (elements.searchInput) elements.searchInput.value = query;

        renderCategoryChips();
        renderEvents();

        // Scroll down to events section smoothly
        const catalog = document.getElementById("eventsSection");
        if (catalog) {
          catalog.scrollIntoView({ behavior: "smooth" });
        }
      });
    }

    // Secondary filters
    if (elements.priceFilterSelect) {
      elements.priceFilterSelect.addEventListener("change", (e) => {
        state.priceFilter = e.target.value;
        renderEvents();
      });
    }
    if (elements.locationFilterSelect) {
      elements.locationFilterSelect.addEventListener("change", (e) => {
        state.locationTypeFilter = e.target.value;
        renderEvents();
      });
    }
    if (elements.sortBySelect) {
      elements.sortBySelect.addEventListener("change", (e) => {
        state.sortBy = e.target.value;
        renderEvents();
      });
    }
    if (elements.clearFiltersBtn) {
      elements.clearFiltersBtn.addEventListener("click", resetFilters);
    }

    // Modal Close Buttons
    if (elements.closeDetailsBtn) {
      elements.closeDetailsBtn.addEventListener("click", closeDetailsModal);
    }
    if (elements.closeRegistrationBtn) {
      elements.closeRegistrationBtn.addEventListener("click", closeRegistrationModal);
    }
    if (elements.closeTicketBtn) {
      elements.closeTicketBtn.addEventListener("click", closeTicketModal);
    }
    if (elements.closeCreateEventBtn) {
      elements.closeCreateEventBtn.addEventListener("click", closeCreateEventModal);
    }

    // Close modals on clicking backdrop
    window.addEventListener("click", (e) => {
      if (e.target === elements.eventDetailsModal) closeDetailsModal();
      if (e.target === elements.registrationModal) closeRegistrationModal();
      if (e.target === elements.ticketModal) closeTicketModal();
      if (e.target === elements.createEventModal) closeCreateEventModal();
    });

    // Close modals on Escape key
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeDetailsModal();
        closeRegistrationModal();
        closeTicketModal();
        closeCreateEventModal();
        closeMobileNav();
      }
    });

    // Create Event Form submission
    if (elements.createEventForm) {
      elements.createEventForm.addEventListener("submit", handleCreateEventSubmit);
    }
  }

  // Expose public methods to window.app for inline HTML event handlers
  window.app = {
    switchView,
    openDetailsModal,
    openRegistrationModal,
    proceedToRegistrationFromDetails,
    openTicketModal,
    openCreateEventModal,
    toggleBookmark,
    shareEvent,
    downloadCalendarEvent,
    handleTierChange,
    changeQuantity,
    applyPromoCode,
    handleRegistrationSubmit,
    goToMyEventsAndClose,
    filterMyEvents,
    confirmCancelRegistration,
    resetFilters
  };

  // Run initialization
  init();
});

