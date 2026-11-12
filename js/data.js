// Mock Event Database & Initial Data
const INITIAL_EVENTS = [
  {
    id: "evt-001",
    title: "Global AI & Quantum Tech Summit 2026",
    tagline: "The frontier of neural systems, quantum leaps, and autonomous agents.",
    category: "technology",
    categoryLabel: "Technology & AI",
    badge: "Trending",
    featured: true,
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    date: "2026-11-28",
    time: "09:00 AM - 06:00 PM PST",
    locationType: "Hybrid",
    venue: "Moscone Center & Virtual Stream",
    city: "San Francisco, CA",
    price: 199,
    originalPrice: 249,
    currency: "$",
    availableSeats: 48,
    totalSeats: 350,
    rating: 4.9,
    reviewsCount: 320,
    organizer: {
      name: "Nexus Tech Frontiers",
      role: "Global Conference Organizer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      verified: true,
      email: "contact@nexustech.org"
    },
    description: "Join over 2,500 visionary researchers, engineering leaders, and pioneers for two intensive days uncovering the next era of frontier artificial intelligence, agentic workflows, quantum algorithms, and autonomous enterprise systems. Featuring 40+ keynotes, live interactive coding labs, and high-impact investor matchmaking.",
    highlights: [
      "Keynote addresses from top AI lab leaders and quantum computing founders",
      "Hands-on AI Agent orchestration workshops with certified badges",
      "VIP Networking Lounge with over 80 active venture capitalists",
      "Full access to post-event video recordings and technical whitepapers"
    ],
    agenda: [
      { time: "09:00 AM", title: "Registration & Breakfast Networking", speaker: "Host Team" },
      { time: "10:00 AM", title: "Keynote: Beyond LLMs — Neuro-Symbolic & Quantum Architectures", speaker: "Dr. Elena Vance (Lead AI Scientist)" },
      { time: "11:45 AM", title: "Panel: Scaling Autonomous Agent Teams in Production", speaker: "Marcus Thorne, Priya Nair & Alex Chen" },
      { time: "01:00 PM", title: "Catered Executive Lunch & Demo Pavilion", speaker: "Open Floor" },
      { time: "02:30 PM", title: "Deep Dive Breakouts: Quantum Machine Learning", speaker: "Dr. Kenji Sato" },
      { time: "05:00 PM", title: "Evening Reception & Pitch Finals", speaker: "All Attendees" }
    ],
    speakers: [
      { name: "Dr. Elena Vance", role: "VP of Frontier AI Research", company: "DeepMatrix Labs", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" },
      { name: "Marcus Thorne", role: "Chief Systems Architect", company: "HyperScale Quantum", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
      { name: "Priya Nair", role: "Head of Agentic Engineering", company: "Synthetix AI", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" }
    ],
    ticketTiers: [
      { id: "gen", name: "General Admission", price: 199, description: "Full in-person access to all stages, expo hall, and catered lunch.", perks: ["All stage access", "Networking apps", "Lunch & refreshments"] },
      { id: "vip", name: "VIP Executive Pass", price: 399, description: "Includes front-row seating, VIP lounge, and speakers dinner.", perks: ["Front row seats", "Exclusive Speakers Gala", "All recordings + workshops"] },
      { id: "virt", name: "Virtual Pass", price: 49, description: "Live HD streaming access and interactive Q&A chat.", perks: ["Live stream access", "Digital badge", "Slack community entry"] }
    ],
    tags: ["ArtificialIntelligence", "Quantum", "FutureOfTech", "Networking"]
  },
  {
    id: "evt-002",
    title: "Neon Horizon Electronic Music Festival",
    tagline: "A mesmerizing audio-visual odyssey under the stars.",
    category: "music",
    categoryLabel: "Music & Concerts",
    badge: "Almost Full",
    featured: true,
    banner: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    date: "2026-12-05",
    time: "04:00 PM - 02:00 AM PST",
    locationType: "In-Person",
    venue: "Echo Park Amphitheater",
    city: "Los Angeles, CA",
    price: 89,
    originalPrice: 110,
    currency: "$",
    availableSeats: 15,
    totalSeats: 1200,
    rating: 4.8,
    reviewsCount: 540,
    organizer: {
      name: "Lumina Sonic Experiences",
      role: "Music & Art Collective",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      verified: true,
      email: "tickets@luminasonic.com"
    },
    description: "Prepare for an extraordinary night of hypnotic beats, world-renowned DJs, immersive 3D holographic projection mapping, and laser light shows across 3 themed stages. Featuring ambient techno, synthwave, progressive house, and live experimental electronic collaborations.",
    highlights: [
      "Over 18 international DJs across 3 immersive stages",
      "360-degree holographic laser installations and projection domes",
      "Gourmet artisan food truck village and craft cocktail gardens",
      "Free festival shuttle buses from downtown metro stations"
    ],
    agenda: [
      { time: "04:00 PM", title: "Gates Open & Sunset Ambient Chillout", speaker: "DJ Kora" },
      { time: "06:30 PM", title: "Stage 2: Synthwave Pioneers Live Set", speaker: "RetroPulse" },
      { time: "08:30 PM", title: "Main Stage: Holographic Sound Experience", speaker: "AURA feat. String Ensemble" },
      { time: "11:00 PM", title: "Headliner Midnight Set: Bass Euphoria", speaker: "Kyron & The Beats" },
      { time: "01:00 AM", title: "After-Hours Starlight Jam", speaker: "Special Surprise Guest" }
    ],
    speakers: [
      { name: "AURA", role: "Electronic Producer & Composer", company: "Berlin Records", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" },
      { name: "Kyron", role: "Multi-Platinum DJ & Sound Sculptor", company: "Horizon Beats", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" }
    ],
    ticketTiers: [
      { id: "gen", name: "Festival Entry", price: 89, description: "Standard festival access to all stages and night village.", perks: ["All stage access", "Festival wristband", "Free hydration stations"] },
      { id: "vip", name: "VIP Backstage & Sky Deck", price: 179, description: "Elevated viewing deck, private air-conditioned lounges, and express bar.", perks: ["Sky deck view", "2 Free drinks included", "Express queue entry"] }
    ],
    tags: ["EDM", "Concert", "Nightlife", "VisualArts"]
  },
  {
    id: "evt-003",
    title: "NextGen Founders & Venture Capital Expo",
    tagline: "Connecting high-growth startups with tier-one global investors.",
    category: "business",
    categoryLabel: "Business & Startups",
    badge: "Popular",
    featured: false,
    banner: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    date: "2026-12-12",
    time: "08:30 AM - 05:30 PM EST",
    locationType: "In-Person",
    venue: "Metropolitan Innovation Hub",
    city: "New York, NY",
    price: 149,
    originalPrice: 180,
    currency: "$",
    availableSeats: 70,
    totalSeats: 400,
    rating: 4.7,
    reviewsCount: 198,
    organizer: {
      name: "VentureSpark Global",
      role: "Startup Accelerator & Network",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
      verified: true,
      email: "hello@venturespark.co"
    },
    description: "The ultimate gathering for early-stage and growth founders looking to raise seed, Series A, and Series B capital. Features curated 1-on-1 investor matchmaking, speed pitching stages, legal/growth workshops, and fireside chats with unicorn founders.",
    highlights: [
      "Direct pitch access to 120+ active venture partners and angel syndicates",
      "Live Demo Day with $250,000 in non-dilutive founder grants awarded",
      "Founder war stories: Lessons from 0 to $100M ARR",
      "Comprehensive Investor Directory provided to all attendees"
    ],
    agenda: [
      { time: "08:30 AM", title: "Breakfast & Fast Pitch Check-in", speaker: "Event Team" },
      { time: "09:30 AM", title: "Fireside Chat: Navigating Modern Venture Valuations", speaker: "Sarah Jenkins (Partner, Apex Seed)" },
      { time: "11:00 AM", title: "Startup Pitch Battle Round 1", speaker: "12 Shortlisted Startups" },
      { time: "01:00 PM", title: "Curated 1-on-1 VC Speed Dating", speaker: "Matched Attendees" },
      { time: "03:30 PM", title: "Growth Marketing Playbooks for B2B & Consumer", speaker: "David Zhao (CMO, ScaleFast)" },
      { time: "05:00 PM", title: "Awards Ceremony & Cocktail Mixer", speaker: "Keynote Judges" }
    ],
    speakers: [
      { name: "Sarah Jenkins", role: "General Partner", company: "Apex Seed Capital", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80" },
      { name: "David Zhao", role: "VP of Growth", company: "ScaleFast Systems", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80" }
    ],
    ticketTiers: [
      { id: "gen", name: "Founder Pass", price: 149, description: "Full day conference pass, pitch sessions, and demo expo entry.", perks: ["All stage access", "Demo hall entrance", "Networking app access"] },
      { id: "vip", name: "Investor & Pitch Pass", price: 299, description: "Guaranteed 3 investor speed-dating slots and founders directory.", perks: ["1-on-1 VC meetings", "Private lounge", "Pitch deck review clinic"] }
    ],
    tags: ["Startups", "VentureCapital", "Entrepreneurship", "Pitching"]
  },
  {
    id: "evt-004",
    title: "International Culinary & Craft Wine Gala",
    tagline: "An unforgettable evening of Michelin-starred tastings and master vintners.",
    category: "food",
    categoryLabel: "Food & Wine",
    badge: "Featured",
    featured: false,
    banner: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
    date: "2026-12-18",
    time: "06:00 PM - 10:30 PM PST",
    locationType: "In-Person",
    venue: "Waterfront Pavilion at Elliott Bay",
    city: "Seattle, WA",
    price: 75,
    originalPrice: 95,
    currency: "$",
    availableSeats: 32,
    totalSeats: 220,
    rating: 4.95,
    reviewsCount: 145,
    organizer: {
      name: "Epicurean Guild Northwest",
      role: "Gastronomic Society",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
      verified: true,
      email: "info@epicureanguild.com"
    },
    description: "Immerse your senses in an exquisite culinary journey celebrating sustainable Pacific gastronomy and artisanal wines. Indulge in 8 live cooking stations hosted by celebrated Michelin-starred guest chefs, sommelier-guided pairings, and live jazz.",
    highlights: [
      "Tasting flight of 24 reserve wines from boutique Pacific vineyards",
      "8 gourmet culinary stations featuring hyper-local seasonal ingredients",
      "Live chef cook-off and sommelier blind tasting challenge",
      "Custom commemorative crystal wine glass gift for all guests"
    ],
    agenda: [
      { time: "06:00 PM", title: "Sparkling Reception & Oyster Bar", speaker: "Chef Antoine Laurent" },
      { time: "07:00 PM", title: "Tasting Stations Open & Live Jazz Trio", speaker: "The Emerald City Trio" },
      { time: "08:30 PM", title: "Sommelier Masterclass: Old World vs New Coast", speaker: "Master Sommelier Celine Dubois" },
      { time: "09:30 PM", title: "Artisan Chocolate & Digestif Lounge", speaker: "Chef Mateo Rossi" }
    ],
    speakers: [
      { name: "Celine Dubois", role: "Master Sommelier", company: "Pinot & Terroir", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" },
      { name: "Antoine Laurent", role: "Executive Chef", company: "L'Ami Gastronomie", avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80" }
    ],
    ticketTiers: [
      { id: "gen", name: "Gourmet Tasting Pass", price: 75, description: "Includes access to all 8 food stations and 6 wine tasting tokens.", perks: ["8 Chef stations", "6 Wine tasting pours", "Crystal tasting glass"] },
      { id: "vip", name: "Grand Sommelier VIP", price: 140, description: "Unlimited premium wine pairings and private reserve tasting lounge.", perks: ["Unlimited tastings", "Private reserve cellar tour", "Chef signed menu"] }
    ],
    tags: ["WineTasting", "FineDining", "CulinaryArts", "Gourmet"]
  },
  {
    id: "evt-005",
    title: "Modern Canvas: Digital Art & Interactive Media Biennial",
    tagline: "Where contemporary fine art intersects with generative intelligence.",
    category: "arts",
    categoryLabel: "Arts & Culture",
    badge: "New",
    featured: false,
    banner: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80",
    date: "2027-01-08",
    time: "10:00 AM - 08:00 PM CST",
    locationType: "In-Person",
    venue: "Grand Palais Exhibition Center",
    city: "Chicago, IL",
    price: 35,
    originalPrice: 45,
    currency: "$",
    availableSeats: 120,
    totalSeats: 600,
    rating: 4.85,
    reviewsCount: 88,
    organizer: {
      name: "Contemporary Digital Museum",
      role: "Curatorial Foundation",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
      verified: true,
      email: "curator@digitalartbiennial.org"
    },
    description: "Explore 50,000 square feet of breathtaking generative art installations, responsive spatial audio rooms, interactive sensory sculptures, and digital canvas exhibitions from 65 pioneering artists worldwide.",
    highlights: [
      "Large-scale interactive projection rooms responsive to audience movement",
      "Fireside discussions on digital authenticity, copyright, and AI co-creation",
      "Hands-on interactive creative coding stations for all age groups",
      "Exclusive evening ambient sound performance in the gallery"
    ],
    agenda: [
      { time: "10:00 AM", title: "Gallery Open & Self-Guided Sensory Walks", speaker: "Curators" },
      { time: "02:00 PM", title: "Artist Talk: Algorithmic Beauty & Organic Math", speaker: "Sora Takahashi" },
      { time: "05:00 PM", title: "Interactive Spatial Audio Chamber Demonstration", speaker: "Sound Collective 404" },
      { time: "07:00 PM", title: "Evening Lights & Ambient Synthesis Performance", speaker: "Guest Composers" }
    ],
    speakers: [
      { name: "Sora Takahashi", role: "Generative Artist & Sculptor", company: "Studio Tachyon", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" }
    ],
    ticketTiers: [
      { id: "gen", name: "Exhibition Day Pass", price: 35, description: "Full day pass to all art wings and interactive installations.", perks: ["All gallery access", "Interactive audio guide", "Student discounts eligible"] },
      { id: "vip", name: "Collector & Artist Reception Pass", price: 80, description: "Includes private evening reception and signed exhibition catalog.", perks: ["Curator-led private tour", "Catalog book included", "Champagne reception"] }
    ],
    tags: ["DigitalArt", "Exhibition", "Interactive", "Creative"]
  },
  {
    id: "evt-006",
    title: "Urban Marathon & Wellness Expo 2027",
    tagline: "Run the city, elevate your health, and celebrate human resilience.",
    category: "sports",
    categoryLabel: "Sports & Fitness",
    badge: "Filling Fast",
    featured: false,
    banner: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1200&q=80",
    date: "2027-01-16",
    time: "06:30 AM - 02:00 PM CST",
    locationType: "In-Person",
    venue: "Central Olympic Park",
    city: "Austin, TX",
    price: 50,
    originalPrice: 65,
    currency: "$",
    availableSeats: 85,
    totalSeats: 1500,
    rating: 4.9,
    reviewsCount: 620,
    organizer: {
      name: "Austin Athletics Foundation",
      role: "Sports Association",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      verified: true,
      email: "support@austinmarathon.org"
    },
    description: "Join over 5,000 runners across 5K, 10K, and Half Marathon courses weaving through Austin's scenic skyline and green belts. Accompanied by a vibrant wellness expo featuring sports nutrition clinics, recovery zones, and live music stages along the finish line.",
    highlights: [
      "Chip-timed official course certified for national qualifying rankings",
      "Finisher medal, high-performance technical runner tee, and gear bag",
      "Hydration and energy gel stations every 1.5 miles with medical support",
      "Finish line festival with craft smoothies, ice recovery baths, and DJs"
    ],
    agenda: [
      { time: "06:30 AM", title: "Warm-up & Half-Marathon Wave 1 Start", speaker: "Race Directors" },
      { time: "07:30 AM", title: "10K & 5K Wave Starts", speaker: "Pace Leaders" },
      { time: "09:00 AM", title: "Finish Line Fest & Recovery Expo Opens", speaker: "Wellness Team" },
      { time: "11:30 AM", title: "Podium Ceremony & Age Category Trophies", speaker: "Civic Leaders" }
    ],
    speakers: [
      { name: "Coach Derrick Vance", role: "Olympic Marathon Coach", company: "Peak Endurance", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" }
    ],
    ticketTiers: [
      { id: "gen", name: "Runner Registration (10K / 5K)", price: 50, description: "Includes timing chip, runner bib, technical t-shirt, and finisher medal.", perks: ["Official runner bib", "Technical shirt", "Finish line medal & snacks"] },
      { id: "half", name: "Half Marathon Full Entry", price: 75, description: "Full 13.1 mile course entry with advanced tracking and photos.", perks: ["All race perks", "Official photo package", "Recovery lounge access"] }
    ],
    tags: ["Marathon", "Fitness", "Wellness", "Running"]
  },
  {
    id: "evt-007",
    title: "Cloud Architecture & Modern DevOps Masterclass",
    tagline: "Build resilient multi-region architectures, microservices, and automated pipelines.",
    category: "workshops",
    categoryLabel: "Workshops & Education",
    badge: "Free",
    featured: false,
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    date: "2027-01-24",
    time: "10:00 AM - 02:00 PM EST",
    locationType: "Virtual",
    venue: "Live Interactive Stream & GitHub Labs",
    city: "Online Global",
    price: 0,
    originalPrice: 120,
    currency: "$",
    availableSeats: 210,
    totalSeats: 1000,
    rating: 4.92,
    reviewsCount: 410,
    organizer: {
      name: "CloudNative Academy",
      role: "Developer Training Collective",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      verified: true,
      email: "workshops@cloudnative.dev"
    },
    description: "A comprehensive 4-hour hands-on masterclass led by principal cloud architects. Learn to design fault-tolerant Kubernetes deployments, implement automated GitOps pipelines, minimize infrastructure costs, and observe microservice health with zero-downtime failover.",
    highlights: [
      "100% Free registration sponsored by open source foundations",
      "Interactive cloud playground environment provided with pre-configured clusters",
      "Real-world architecture teardowns from high-volume streaming platforms",
      "Certificate of Attendance and GitHub repository template access"
    ],
    agenda: [
      { time: "10:00 AM", title: "Modern Cloud Fundamentals & Architecture Patterns", speaker: "Alexandre Moreau" },
      { time: "11:00 AM", title: "Live Lab: Deploying Self-Healing GitOps on Kubernetes", speaker: "Nina Rodriguez" },
      { time: "12:15 PM", title: "Cost Optimization & Observability at Scale", speaker: "Alexandre Moreau" },
      { time: "01:30 PM", title: "Live Q&A, Architecture Reviews & Certificate Distribution", speaker: "Instruction Team" }
    ],
    speakers: [
      { name: "Alexandre Moreau", role: "Principal Cloud Architect", company: "Kubecore Systems", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
      { name: "Nina Rodriguez", role: "Staff DevOps Specialist", company: "GitPulse Global", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" }
    ],
    ticketTiers: [
      { id: "free", name: "Free Community Pass", price: 0, description: "Full live stream access, cloud lab playground, and code templates.", perks: ["Live interactive stream", "Cloud sandbox access", "Community forum support"] },
      { id: "cert", name: "Verified Certificate & Mentor Review", price: 29, description: "Includes one-on-one architecture review and verified credential badge.", perks: ["Verified digital credential", "Instructor code audit", "Extended lab access"] }
    ],
    tags: ["DevOps", "Kubernetes", "CloudComputing", "FreeMasterclass"]
  },
  {
    id: "evt-008",
    title: "Indie Film Showcase & Directors Forum",
    tagline: "Celebrating groundbreaking storytelling and visionary independent cinema.",
    category: "arts",
    categoryLabel: "Arts & Culture",
    badge: "Popular",
    featured: false,
    banner: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    date: "2027-02-02",
    time: "02:00 PM - 09:30 PM EST",
    locationType: "In-Person",
    venue: "Symphony Cinema Hall",
    city: "Boston, MA",
    price: 40,
    originalPrice: 55,
    currency: "$",
    availableSeats: 55,
    totalSeats: 300,
    rating: 4.88,
    reviewsCount: 160,
    organizer: {
      name: "Beacon Independent Cinema Society",
      role: "Film Alliance",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
      verified: true,
      email: "info@beaconcinema.org"
    },
    description: "An evocative cinematic showcase screening 12 selected short films and 2 feature premieres from award-winning emerging directors. Includes Q&A panels with filmmakers, screenwriting roundtables, and networking receptions.",
    highlights: [
      "Exclusive premieres of festival-winning indie features and shorts",
      "In-person director and cinematographer talkbacks after every block",
      "Screenwriting & indie financing roundtable panel",
      "Cocktail mixer with producers and casting directors"
    ],
    agenda: [
      { time: "02:00 PM", title: "Short Film Block 1: Human Connections", speaker: "Curator Remarks" },
      { time: "04:30 PM", title: "Filmmakers Panel: Crafting Cinema on Micro Budgets", speaker: "Featured Directors" },
      { time: "06:30 PM", title: "Gala Feature Premiere: The Silent Shore", speaker: "Director Maya Lin" },
      { time: "08:30 PM", title: "Awards Ceremony & Red Carpet Reception", speaker: "Host Committee" }
    ],
    speakers: [
      { name: "Maya Lin", role: "Independent Film Director", company: "Lanternlight Films", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" }
    ],
    ticketTiers: [
      { id: "gen", name: "All-Day Screenings Pass", price: 40, description: "Access to all short and feature film screenings plus Q&A sessions.", perks: ["All screenings access", "Audience voting ballot", "Free popcorn voucher"] },
      { id: "vip", name: "VIP Filmmaker Networking Pass", price: 85, description: "Includes red carpet entry, reserved premiere seats, and evening reception.", perks: ["Reserved premiere row", "Cocktail mixer entry", "Exclusive gift bag"] }
    ],
    tags: ["Cinema", "IndieFilm", "Storytelling", "Screenwriting"]
  },
  {
    id: "evt-009",
    title: "Cybersecurity Shield Conference 2027",
    tagline: "Defending critical digital infrastructure against next-gen cyber threats.",
    category: "technology",
    categoryLabel: "Technology & AI",
    badge: "Trending",
    featured: false,
    banner: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    date: "2027-02-14",
    time: "09:00 AM - 05:30 PM PST",
    locationType: "In-Person",
    venue: "TechDome Convention Center",
    city: "San Jose, CA",
    price: 220,
    originalPrice: 280,
    currency: "$",
    availableSeats: 40,
    totalSeats: 500,
    rating: 4.86,
    reviewsCount: 290,
    organizer: {
      name: "CyberDefense Alliance",
      role: "Infosec Research Consortium",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
      verified: true,
      email: "security@cyberdefense.org"
    },
    description: "Gather with world-class ethical hackers, CISOs, cryptographers, and federal cybersecurity experts to dissect state-sponsored threat vectors, zero-day mitigation strategies, and defensive AI systems.",
    highlights: [
      "Live Capture The Flag (CTF) cyber war-games with cash prizes",
      "Deep dives into post-quantum cryptography standards and zero-trust mesh",
      "Executive CISO closed-door risk mitigation roundtables",
      "Exploit demonstration stage highlighting novel software supply chain vectors"
    ],
    agenda: [
      { time: "09:00 AM", title: "Opening Remarks: The State of Cyber Warfare 2027", speaker: "Arthur Sterling (Former CISO)" },
      { time: "10:30 AM", title: "Live Red-Team Demonstration: AI-Powered Breach Vectors", speaker: "RedTeam Syndicate" },
      { time: "01:30 PM", title: "Zero Trust Architecture Implementation Case Studies", speaker: "Dr. Rachel Bloom" },
      { time: "04:00 PM", title: "CTF Grand Championship Finals & Awarding", speaker: "Lead Judges" }
    ],
    speakers: [
      { name: "Arthur Sterling", role: "Cyber Defense Strategist", company: "Aegis Cyber Systems", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
      { name: "Dr. Rachel Bloom", role: "Principal Cryptographer", company: "CipherGuard Labs", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80" }
    ],
    ticketTiers: [
      { id: "gen", name: "Conference Pass", price: 220, description: "Full access to keynotes, technical tracks, and vendor exhibition.", perks: ["All stage access", "CTF observation deck", "Buffet lunch & networking"] },
      { id: "vip", name: "Security Leader VIP Pass", price: 450, description: "Includes private CISO roundtable, speaker dinner, and training workshops.", perks: ["Private CISO lounge", "Hands-on threat lab", "VIP dinner & drinks"] }
    ],
    tags: ["Cybersecurity", "InfoSec", "EthicalHacking", "ZeroTrust"]
  },
  {
    id: "evt-010",
    title: "Acoustic Sunset Sessions Live",
    tagline: "Intimate singer-songwriter performances overlooking the ocean sunset.",
    category: "music",
    categoryLabel: "Music & Concerts",
    badge: "Popular",
    featured: false,
    banner: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    date: "2027-02-20",
    time: "05:00 PM - 09:30 PM PST",
    locationType: "In-Person",
    venue: "Horizon Pier 54 Boardwalk",
    city: "San Diego, CA",
    price: 45,
    originalPrice: 60,
    currency: "$",
    availableSeats: 60,
    totalSeats: 350,
    rating: 4.96,
    reviewsCount: 380,
    organizer: {
      name: "Coastline Melody Project",
      role: "Live Music Curator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      verified: true,
      email: "sessions@coastlinemelody.com"
    },
    description: "Experience the magic of golden hour with intimate acoustic sets by Grammy-nominated acoustic guitarists and soulful indie vocalists. Relax in comfortable lounge seating right by the ocean breeze with handcrafted mocktails and tapas.",
    highlights: [
      "Stunning oceanfront panoramic sunset views on private pier",
      "Curated acoustic showcase of 4 acclaimed touring musicians",
      "Artisan warm tapas, organic wine bar, and signature mocktails",
      "Cozy open-air bonfire seating under string lights"
    ],
    agenda: [
      { time: "05:00 PM", title: "Doors Open, Seaside Tapas & Warm-up Set", speaker: "Julian Vance" },
      { time: "06:15 PM", title: "Sunset Acoustic Solo: Strings & Vocals", speaker: "Clara Brooks" },
      { time: "07:45 PM", title: "Duo Ensemble: Contemporary Folk & Soul", speaker: "The Wanderer Duo" },
      { time: "09:00 PM", title: "Acoustic Jam Finale around Bonfire", speaker: "All Artists" }
    ],
    speakers: [
      { name: "Clara Brooks", role: "Acoustic Singer-Songwriter", company: "Pacific Records", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" },
      { name: "Julian Vance", role: "Fingerstyle Guitarist", company: "Acoustic Harmony", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" }
    ],
    ticketTiers: [
      { id: "gen", name: "Boardwalk General Admission", price: 45, description: "Lawn and open deck seating with full audio experience.", perks: ["General seating", "Complimentary welcome cider", "Sunset viewing area"] },
      { id: "vip", name: "Fire-Pit VIP Lounge Pass", price: 90, description: "Reserved comfortable front-row deck sofa, fire-pit access, and tapas plate.", perks: ["Reserved fire-pit sofa", "Gourmet tapas box", "2 complimentary drinks"] }
    ],
    tags: ["Acoustic", "LiveMusic", "Indie", "SunsetVibes"]
  },
  {
    id: "evt-011",
    title: "Green Earth Sustainable Energy Summit",
    tagline: "Accelerating the clean energy transition, carbon removal, and climate tech.",
    category: "business",
    categoryLabel: "Business & Startups",
    badge: "Free",
    featured: false,
    banner: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80",
    date: "2027-03-04",
    time: "09:00 AM - 04:30 PM MST",
    locationType: "Hybrid",
    venue: "EcoCentre Arena & Global Livestream",
    city: "Denver, CO",
    price: 0,
    originalPrice: 85,
    currency: "$",
    availableSeats: 180,
    totalSeats: 800,
    rating: 4.89,
    reviewsCount: 215,
    organizer: {
      name: "CleanTech Action Forum",
      role: "Climate Non-Profit Foundation",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
      verified: true,
      email: "contact@cleantechaction.org"
    },
    description: "A premier climate technology conference uniting renewable energy founders, policy leaders, and investors. Discover breakthrough innovations in grid storage batteries, direct air capture, hydrogen fuel cells, and sustainable supply chains.",
    highlights: [
      "100% Free registration funded by clean energy sponsors",
      "50 Climate tech startups demoing working prototypes",
      "Keynotes from municipal energy leaders and clean-tech venture funds",
      "Carbon-neutral certified event with tree-planting per registered attendee"
    ],
    agenda: [
      { time: "09:00 AM", title: "Opening Address: The 2030 Clean Grid Roadmap", speaker: "Dr. Jonathan Hayes" },
      { time: "10:30 AM", title: "Panel: Next-Generation Solid State Batteries", speaker: "Battery Innovators" },
      { time: "01:00 PM", title: "Climate Tech Pitch Expo", speaker: "10 Selected Clean Startups" },
      { time: "03:30 PM", title: "Action Roundtable: Policy, Permits & Scale", speaker: "Policy Leaders" }
    ],
    speakers: [
      { name: "Dr. Jonathan Hayes", role: "Climate Systems Director", company: "Clean Grid Institute", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80" }
    ],
    ticketTiers: [
      { id: "free", name: "Complimentary Summit Pass", price: 0, description: "Includes full in-person and digital stream access to all conference stages.", perks: ["All stage sessions", "Expo floor access", "Tree planted in your name"] },
      { id: "supporter", name: "Green Champion Supporter Pass", price: 50, description: "Includes exclusive networking lunch and direct donation to clean tech fellowship.", perks: ["Executive luncheon", "Supporter recognition", "Special delegate gift"] }
    ],
    tags: ["ClimateTech", "CleanEnergy", "Sustainability", "Innovation"]
  },
  {
    id: "evt-012",
    title: "Full-Stack AI Agent & LLM Workshop",
    tagline: "Build, deploy, and monitor autonomous production agents from scratch.",
    category: "workshops",
    categoryLabel: "Workshops & Education",
    badge: "Popular",
    featured: false,
    banner: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    date: "2027-03-18",
    time: "10:00 AM - 04:00 PM EST",
    locationType: "Hybrid",
    venue: "Developer Hive & Live Stream",
    city: "Chicago, IL",
    price: 65,
    originalPrice: 99,
    currency: "$",
    availableSeats: 35,
    totalSeats: 150,
    rating: 4.97,
    reviewsCount: 180,
    organizer: {
      name: "Modern Code Guild",
      role: "Software Engineering Mentors",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      verified: true,
      email: "guild@moderncode.dev"
    },
    description: "An intensive single-day build workshop teaching professional software engineers how to architect autonomous agents with tool use, memory systems, structured schema outputs, evaluators, and production telemetry.",
    highlights: [
      "Step-by-step code-along creating a fully functional multi-agent workspace",
      "Production-ready templates in TypeScript and Python",
      "Evaluating agent hallucination and cost optimization strategies",
      "Access to private Discord channel with mentors for ongoing support"
    ],
    agenda: [
      { time: "10:00 AM", title: "Agent Architectures: Planning, Memory & Tools", speaker: "Devin Ross" },
      { time: "11:30 AM", title: "Hands-on Lab: Tool Calling & Error Self-Correction", speaker: "Devin Ross" },
      { time: "01:30 PM", title: "Building Multi-Agent Swarms with Shared Context", speaker: "Sarah Sterling" },
      { time: "03:15 PM", title: "Production Observability, Guardrails & Deploy", speaker: "All Mentors" }
    ],
    speakers: [
      { name: "Devin Ross", role: "Staff AI Engineer", company: "AgentOps Systems", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
      { name: "Sarah Sterling", role: "Lead Systems Architect", company: "Autonomous Core", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" }
    ],
    ticketTiers: [
      { id: "gen", name: "Workshop Participant", price: 65, description: "Full workshop access, code repository templates, and live Q&A.", perks: ["Live workshop access", "Starter code repos", "Certificate of completion"] },
      { id: "vip", name: "1-on-1 Code Review & Mentorship Pass", price: 130, description: "Includes private 45-minute code audit and architecture consultation.", perks: ["Personal code review", "All recordings + bonus modules", "Priority mentor Q&A"] }
    ],
    tags: ["AIAgents", "FullStack", "LLMs", "HandsOn"]
  }
];

const CATEGORIES = [
  { id: "all", label: "All Events", icon: "sparkles", count: 12 },
  { id: "technology", label: "Technology & AI", icon: "cpu", count: 3 },
  { id: "music", label: "Music & Concerts", icon: "music", count: 2 },
  { id: "business", label: "Business & Startups", icon: "briefcase", count: 2 },
  { id: "food", label: "Food & Wine", icon: "utensils", count: 1 },
  { id: "arts", label: "Arts & Culture", icon: "palette", count: 2 },
  { id: "sports", label: "Sports & Fitness", icon: "activity", count: 1 },
  { id: "workshops", label: "Workshops & Education", icon: "book-open", count: 2 }
];

if (typeof window !== "undefined") {
  window.INITIAL_EVENTS = INITIAL_EVENTS;
  window.CATEGORIES = CATEGORIES;
}
