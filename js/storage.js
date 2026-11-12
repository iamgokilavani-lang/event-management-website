// LocalStorage & State Persistence Manager

const STORAGE_KEYS = {
  EVENTS: "moonlight_events",
  REGISTRATIONS: "moonlight_registrations",
  BOOKMARKS: "moonlight_bookmarks",
  THEME: "moonlight_theme"
};

class StorageManager {
  constructor() {
    this.init();
  }

  init() {
    // Migrate legacy keys if present
    if (!localStorage.getItem(STORAGE_KEYS.EVENTS) && localStorage.getItem("eventpulse_events")) {
      localStorage.setItem(STORAGE_KEYS.EVENTS, localStorage.getItem("eventpulse_events"));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REGISTRATIONS) && localStorage.getItem("eventpulse_registrations")) {
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, localStorage.getItem("eventpulse_registrations"));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BOOKMARKS) && localStorage.getItem("eventpulse_bookmarks")) {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, localStorage.getItem("eventpulse_bookmarks"));
    }
    if (!localStorage.getItem(STORAGE_KEYS.THEME) && localStorage.getItem("eventpulse_theme")) {
      localStorage.setItem(STORAGE_KEYS.THEME, localStorage.getItem("eventpulse_theme"));
    }

    // Seed events if not already present
    if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
    }

    // Seed realistic sample registration if none exists so "My Events" has content immediately
    if (!localStorage.getItem(STORAGE_KEYS.REGISTRATIONS)) {
      const sampleRegistration = [
        {
          bookingId: "ML-2026-8941",
          eventId: "evt-001",
          eventTitle: "Global AI & Quantum Tech Summit 2026",
          eventDate: "2026-11-28",
          eventTime: "09:00 AM - 06:00 PM PST",
          eventVenue: "Moscone Center & Virtual Stream",
          eventBanner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
          category: "technology",
          categoryLabel: "Technology & AI",
          ticketTier: "General Admission",
          ticketPrice: 199,
          quantity: 1,
          discountAmount: 0,
          totalPrice: 199,
          attendee: {
            fullName: "Alex Morgan",
            email: "alex.morgan@example.com",
            phone: "+1 (555) 234-5678",
            organization: "Forward Innovations",
            dietary: "Vegetarian"
          },
          status: "Confirmed",
          registeredAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          qrCodeData: "ML-2026-8941|evt-001|Alex Morgan|1x General Admission"
        }
      ];
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(sampleRegistration));
    }

    if (!localStorage.getItem(STORAGE_KEYS.BOOKMARKS)) {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(["evt-002", "evt-007"]));
    }
  }

  // --- EVENTS ---
  getEvents() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
      return data ? JSON.parse(data) : INITIAL_EVENTS;
    } catch (e) {
      console.error("Error reading events from storage", e);
      return INITIAL_EVENTS;
    }
  }

  getEventById(id) {
    const events = this.getEvents();
    return events.find(e => e.id === id) || null;
  }

  saveEvent(newEvent) {
    const events = this.getEvents();
    events.unshift(newEvent);
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    return events;
  }

  updateEventSeats(eventId, seatsClaimed) {
    const events = this.getEvents();
    const event = events.find(e => e.id === eventId);
    if (event) {
      event.availableSeats = Math.max(0, event.availableSeats - seatsClaimed);
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    }
  }

  restoreEventSeats(eventId, seatsRestored) {
    const events = this.getEvents();
    const event = events.find(e => e.id === eventId);
    if (event) {
      event.availableSeats = Math.min(event.totalSeats, event.availableSeats + seatsRestored);
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    }
  }

  // --- REGISTRATIONS ("My Events") ---
  getRegistrations() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error reading registrations", e);
      return [];
    }
  }

  addRegistration(registration) {
    const list = this.getRegistrations();
    list.unshift(registration);
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(list));
    this.updateEventSeats(registration.eventId, registration.quantity);
    return registration;
  }

  cancelRegistration(bookingId) {
    const list = this.getRegistrations();
    const item = list.find(r => r.bookingId === bookingId);
    if (item) {
      item.status = "Cancelled";
      item.cancelledAt = new Date().toISOString();
      this.restoreEventSeats(item.eventId, item.quantity);
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(list));
      return true;
    }
    return false;
  }

  // --- BOOKMARKS ---
  getBookmarks() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  toggleBookmark(eventId) {
    let bookmarks = this.getBookmarks();
    const isBookmarked = bookmarks.includes(eventId);
    if (isBookmarked) {
      bookmarks = bookmarks.filter(id => id !== eventId);
    } else {
      bookmarks.push(eventId);
    }
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    return !isBookmarked;
  }

  isBookmarked(eventId) {
    return this.getBookmarks().includes(eventId);
  }

  // --- THEME ---
  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || "dark";
  }

  setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }
}

window.storageManager = new StorageManager();

