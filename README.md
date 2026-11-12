# Moon Light — Event Discovery & Registration Platform

An event discovery and registration web application with a responsive, modern interface. Built with pure vanilla web technologies (HTML5, CSS3, ES6+ JavaScript, and Node.js), requiring **zero external dependencies** or complex build steps.

---

## ✨ Features & Requirements Implemented

### 1. 🌟 Upcoming Events Discovery
- **Rich Event Cards**: Curated cards with high-resolution imagery, event title, category badges, dynamic status pills (*"Trending"*, *"Almost Full"*, *"Free"*, *"Popular"*), event dates, venue locations, and price tags.
- **Seat Availability Tracking**: Visual progress bars showing remaining seats (e.g. *15 seats remaining*, *Filling Fast*, *Sold Out*).
- **Spotlight Hero Event**: Featured spotlight event on the homepage hero with quick register and details actions.
- **Bookmark / Save Events**: Interactive heart button to bookmark events with animated micro-interactions and persistence.

### 2. 🔍 Category Filters & Live Search
- **Category Chips**: Instant 1-click filtering by category with icons:
  - ✨ *All Events*
  - 💻 *Technology & AI*
  - 🎵 *Music & Concerts*
  - 💼 *Business & Startups*
  - 🍷 *Food & Wine*
  - 🎨 *Arts & Culture*
  - 🏃 *Sports & Fitness*
  - 📚 *Workshops & Education*
- **Live Debounced Search**: Instant searching across event titles, descriptions, venue names, cities, tags, and organizer names.
- **Secondary Filters & Sorting**:
  - Filter by Price: *Free Only, Paid Only, Under $50, $50–$150, $150+*
  - Filter by Format: *In-Person, Virtual / Online, Hybrid*
  - Sort by: *Date: Soonest First, Date: Latest First, Price: Low to High, Price: High to Low, Most Popular, Highest Rated*
- **Results Counter & Clear Filters**: Dynamic counter showing active results and a *"Clear All Filters"* button when filters are active.

### 3. 📋 Comprehensive Event Details View
- Full widescreen high-resolution hero banner with format pills (*In-Person*, *Virtual*, *Hybrid*).
- Date & time, venue address, and price overview cards.
- **Verified Organizer Profile**: Host avatar, name, verified checkmark badge, and contact email.
- **Detailed Description & Highlights**: Event summary with checkmark bullet points.
- **Program & Agenda Timeline**: Chronological schedule of sessions and speakers.
- **Featured Speakers & Performers**: Grid of speaker avatars, names, titles, and companies.
- **Ticket Packages Overview**: Breakdown of tiers (e.g. *General Admission*, *VIP Pass*, *Virtual Stream*) with included perks.
- **Action Buttons**: Direct *"Book Registration"*, *"Share Event"* (copies link with toast), and *"Add to Calendar"* (generates standard `.ics` file).

### 4. 📝 Interactive Event Registration Form
- **Ticket Tier Selection**: Radio card selection with instant pricing updates.
- **Attendee Quantity Stepper**: Easily select pass quantities (1 to 8 passes) with real-time math recalculation.
- **Attendee Form Validation**: Full name, email address (with regex validation), phone number, company/organization, and dietary/accessibility notes.
- **Promo Code Discounts**: Working coupon engine! Apply `SAVE20` or `EARLYBIRD` for a 20% discount, or `VIPFREE` for 50% discount with instant visual feedback and updated order summary.
- **Transparent Order Summary**: Line-item breakdown of pass type, quantity, subtotal, discount, waived service fees, and grand total.
- **Registration Confirmation Screen**:
  - Animated green badge with *"You're Going!"*
  - Unique booking reference code (e.g. `EP-2026-6218`).
  - Generated digital pass snippet with deterministic SVG QR code.
  - Quick action buttons to view the digital ticket pass or navigate to *"My Events"*.

### 5. 🎟️ "My Events" Dashboard & Digital Pass
- **Overview Statistics Cards**: Real-time stats for *Active Passes*, *Total Bookings*, *Total Invested ($)*, and *Saved Events*.
- **Filter Tabs**: Toggle between *All Bookings*, *Confirmed Active*, and *Cancelled*.
- **Pass Management**:
  - **View E-Ticket Pass**: Opens a digital ticket modal featuring event title, date/time, attendee name, booking code, venue, ticket tier, total amount, SVG barcode, and high-density SVG QR Code.
  - **Print / PDF Download**: Clean print stylesheet formatted for printing or saving directly to PDF.
  - **Add to Calendar**: Generates and downloads standard `.ics` calendar invites compatible with Google Calendar, Apple Calendar, and Outlook.
  - **Cancel Registration**: Confirmation modal that releases booked seats back to the event capacity pool in real time and marks registration as cancelled.

### 6. ➕ Host a New Event
- Modal form allowing users to publish custom events to the platform.
- Inputs for Title, Category, Format, Date, Time, Venue, City, Price, Capacity, Banner URL, and Description.
- Automatically persists to local storage and updates the live catalog immediately.

### 7. 🎨 Responsive UI, Theme Toggle & Polish
- **Dark & Light Mode**: Seamless theme switcher with persistence in `localStorage`.
- **Responsive Navigation**: Glassmorphism sticky navbar with real-time registered badge counter, desktop links, and mobile slide-in drawer.
- **Toast Notifications**: Floating feedback toasts for bookmarks, registration confirmation, coupon application, link sharing, and cancellations.
- **Zero External Runtime Dependencies**: Standard HTML5, CSS3, and ES6 JavaScript.

---

## 📂 Project Structure

```
├── index.html           # Main Single Page Application entry point
├── css/
│   └── styles.css       # Complete modern design system (responsive, dark/light theme)
├── js/
│   ├── data.js          # Curated event catalog & categories
│   ├── storage.js       # LocalStorage state management (events, tickets, bookmarks, theme)
│   ├── ticket.js        # Deterministic SVG QR Code & Barcode renderer, ticket printing
│   └── app.js           # Core application logic, filters, search, modals & checkout flow
├── server.js            # Built-in lightweight Node.js static web server (zero npm dependencies)
├── package.json         # Project metadata and npm start script
└── README.md            # Comprehensive documentation
```

---

## 🚀 How to Run the Website

### Option 1: Direct File Launch (No server required)
Simply double-click `index.html` or open it in any web browser:
```
file:///c:/src/projects/Event%20Management%20Website%20Development%20gokila/index.html
```

### Option 2: Using the Included Node.js Server
From the project folder, run:
```bash
npm start
```
or
```bash
node server.js
```
Then open your browser at:
```
http://localhost:3000
```

---

## 🧪 Testing Scenarios Completed

1. **Category Filtering**: Tested clicking each category chip (*Technology*, *Music*, *Business*, *Food*, *Arts*, *Sports*, *Workshops*). Results update instantly.
2. **Search Verification**: Tested real-time search queries (*"AI"*, *"Music"*, *"Marathon"*).
3. **Event Details**: Checked modal opening, agenda timelines, speaker cards, and ticket tier descriptions.
4. **Registration Flow**: Completed checkout with attendee details, applied coupon `SAVE20`, and confirmed order with generated QR code.
5. **My Events Dashboard**: Verified active pass listing, stats calculations, digital ticket viewing, `.ics` calendar download, and registration cancellation.
6. **Theme Switcher**: Verified dark and light mode color transitions.

