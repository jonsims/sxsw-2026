// Sims@SX26 Beta — app.js
// Schedule-change evaluation: structured alts, feasibility checks, swap previews

// ─── Schedule Data (same as main app) ──────────────────────────────────────

const DAYS = [
  {
    title: "Thursday, March 12",
    subtitle: "Jon Solo | SXSW EDU Day",
    date: "2026-03-12",
    weather: "71°F / 51°F - Pleasant",
    events: [
      { time: "7:00 AM", iso: "2026-03-12T07:00:00-05:00", end: "2026-03-12T08:00:00-05:00",
        name: "Run: Town Lake Boardwalk",
        detail: "4-5 mile boardwalk loop. 51°F -- perfect. Out the back of the Fairmont, cross Cesar Chavez, on the trail in 2 min. Sunrise ~7:35 AM.",
        venue: "", walk: "", cat: "run", url: "", alts: [] },
      { time: "10:00 AM", iso: "2026-03-12T10:00:00-05:00", end: "2026-03-12T11:00:00-05:00",
        name: "Moonshots that Move the Needle",
        detail: "Arati Prabhakar (fmr DARPA/OSTP). #1 interest fit. RESERVED.",
        venue: "Hilton (Salon HJK)", walk: "5 min from Fairmont",
        address: "500 E 4th St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1148505", cat: "session",
        alts: [
          "Technology Convergence: Exponential Upswing (Tier 2, Hilton -- same venue, easy swap)",
          "Building a New Future-Proof University (Tier 2, Austin Marriott, 7 min -- debt-free apprenticeship model, 45 min only)",
          "Health Moonshot: Healthy Students, Educators (Tier 3, Westin, 8 min)",
          "Innovation Without Borders: EdTech Startups (Tier 3, Austin Marriott, 7 min -- 90 min long)",
          "What We're Unlearning on Education Systems (Tier 3, Courtyard Marriott, 10 min -- farthest)",
          "Designing the Partnership Ecosystem (Tier 3, Austin Marriott, 7 min -- skip)"
        ] },
      { time: "11:30 AM", iso: "2026-03-12T11:30:00-05:00", end: "2026-03-12T12:30:00-05:00",
        name: "Strategy in Times of Chaos: Imagining Futures of Education",
        detail: "Foresight + education futures. RESERVED. Same room as Moonshots -- don't leave.",
        venue: "Hilton (Salon HJK)", walk: "0 min -- same room",
        address: "500 E 4th St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1149832", cat: "session",
        alts: [
          "Learning Geeks: How to Think When Machines Think Faster (Tier 2, Austin Marriott, 7 min -- metacognition + AI, 45 min only)",
          "Rethinking Higher Ed for AI-First Workforce (Tier 2, Austin Marriott, 7 min -- same building as Learning Geeks)",
          "Cracking Higher Ed: Why Startups Miss the Mark (Tier 3, Austin Marriott, 7 min -- only 20 min)",
          "PanelPicker & More: SXSW EDU 2027 (Tier 3, Westin, 8 min -- only if planning to submit)"
        ] },
      { time: "12:30 PM", iso: "2026-03-12T12:30:00-05:00", end: "2026-03-12T14:00:00-05:00",
        name: "Lunch", detail: "Walk back to Fairmont (5 min from Hilton) or grab food nearby.",
        venue: "", walk: "", cat: "free", url: "", alts: [] },
      { time: "2:30 PM", iso: "2026-03-12T14:30:00-05:00", end: "2026-03-12T15:30:00-05:00",
        name: "Exploring the Future of Space & Japan's Deep-Tech",
        detail: "Woven Capital, CesiumAstro. At our hotel -- no walking!",
        venue: "Fairmont (Manchester Ballroom)", walk: "0 min -- at the hotel",
        address: "101 Red River St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1162895", cat: "session",
        alts: [
          "From Burnout to Bandwidth: AI to Reclaim Your Day (Tier 3, Austin Marriott, 7 min -- starts at 2:00)",
          "Unleashing Students' Tech Genius for Mental Wellness (Tier 3, Austin Marriott, 7 min -- 45 min)"
        ] },
      { time: "4:00 PM", iso: "2026-03-12T16:00:00-05:00", end: "2026-03-12T17:00:00-05:00",
        name: "Skills You'll Need to Succeed in the Post-AI Age",
        detail: "AI + workforce. Solid day-capper.",
        venue: "Hilton", walk: "5 min from Fairmont",
        address: "500 E 4th St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1162912", cat: "session",
        alts: [
          "Mentor Session: Parker Wishik, Aerospace Corp (Tier 2, Hilton -- 1:1 format, space industry, runs to 5:15)",
          "Human Futures: Learning in Tech-Shaped World (Tier 2, Austin Marriott, 7 min)",
          "South By San Jose (Hotel San Jose, 20 min walk -- skip sessions, free music from noon. Check if DeVotchKa or Charlie Sexton are on.)",
          "Social Health Trends & Predictions (Tier 3, Hilton -- culture angle)",
          "Shaping Education in Culture x Tech World (Tier 3, Courtyard Marriott, 10 min -- farthest)",
          "Future Tense: Vibecoding for Educators (Tier 3, Austin Marriott, 7 min -- 90 min)"
        ] },
      { time: "5:00 PM", iso: "2026-03-12T17:00:00-05:00", end: "2026-03-12T19:00:00-05:00",
        name: "Dinner / Recharge",
        detail: "Head back to hotel. Grab food nearby or at the Fairmont.",
        venue: "Fairmont", walk: "", cat: "free", url: "", alts: [] },
      { time: "7:00 PM", iso: "2026-03-12T19:00:00-05:00", end: "2026-03-12T22:00:00-05:00",
        name: "Innovation Opening Party",
        detail: "Free with badge. Great for solo networking.",
        venue: "Brazos Hall (204 E 4th St)", walk: "5 min from Fairmont",
        address: "204 E 4th St, Austin, TX 78701",
        cat: "logistics", url: "", alts: [] },
    ],
  },
  {
    title: "Friday, March 13",
    subtitle: "Jon Solo AM - Together from Midday",
    date: "2026-03-13",
    weather: "83°F / 57°F - Warm",
    events: [
      { time: "6:30 AM", iso: "2026-03-13T06:30:00-05:00", end: "2026-03-13T07:30:00-05:00",
        name: "Run: Town Lake",
        detail: "Full loop (10 mi) or boardwalk (5 mi). 57°F, warming fast -- go early.",
        venue: "", walk: "", cat: "run", url: "", alts: [] },
      { time: "10:00 AM", iso: "2026-03-13T10:00:00-05:00", end: "2026-03-13T11:00:00-05:00",
        name: "Waveform: The MKBHD Podcast Live",
        detail: "Huge draw. Entertaining live tech podcast. RESERVED. Arrive 15 min early -- will be packed.",
        venue: "Hilton (Salon C)", walk: "5 min from Fairmont",
        address: "500 E 4th St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1162999", cat: "session",
        alts: [
          "Are you faster than a robot? (Tier 2, Rivian Roadhouse on S Congress, 15 min walk -- fun/interactive but far. 20 min walk back to JW Marriott for 11:30.)"
        ] },
      { time: "11:30 AM", iso: "2026-03-13T11:30:00-05:00", end: "2026-03-13T12:30:00-05:00",
        name: "Designing the Future of Human Performance",
        detail: "Hunter Woodhall (Paralympian) + Tara Davis-Woodhall (Olympic gold). No real alternative at this time.",
        venue: "JW Marriott (Salon D)", walk: "5 min from Hilton",
        address: "110 E 2nd St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1149270", cat: "session", alts: [] },
      { time: "12:30 PM", iso: "2026-03-13T12:30:00-05:00", end: "2026-03-13T14:00:00-05:00",
        name: "Lunch together",
        detail: "Christina arrives midday. Meet at Fairmont or grab food nearby.",
        venue: "", walk: "", cat: "free", url: "", alts: [] },
      { time: "2:30 PM", iso: "2026-03-13T14:30:00-05:00", end: "2026-03-13T15:30:00-05:00",
        name: "The Companies Building Space's Superhighway",
        detail: "In-space robotics, debris cleanup. Pure moonshot.",
        venue: "JW Marriott (Salon D)", walk: "5 min from Fairmont",
        address: "110 E 2nd St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1162261", cat: "session",
        alts: [
          "VC Trends in Texas (Tier 2, JW Marriott Salon C -- same building, could walk between)",
          "Forget Recruiting: Design Your Workforce (Tier 3, Hilton Salon B, 5 min -- less exciting)",
          "Space Workforce Meet Up (Tier 3, JW Marriott -- networking, narrow)",
          "Flatstock (Austin Marriott, 7 min -- Christina alt while Jon does Space session)"
        ] },
      { time: "3:30 PM", iso: "2026-03-13T15:30:00-05:00", end: "2026-03-13T17:30:00-05:00",
        name: "Explore: South By San Jose + South Congress",
        detail: "South By San Jose at Hotel San Jose -- free music, vintage vendors, great vibe.",
        venue: "Hotel San Jose (1316 S Congress)", walk: "20 min walk south / 5 min Uber",
        address: "1316 S Congress Ave, Austin, TX 78704",
        cat: "free", url: "", alts: [] },
      { time: "6:00 PM", iso: "2026-03-13T18:00:00-05:00", end: "2026-03-13T20:00:00-05:00",
        name: "Dinner: La Condesa",
        detail: "Modern Mexican. (512) 499-0300",
        venue: "400 W 2nd St", walk: "10 min from Fairmont / 20 min from San Jose",
        address: "400 W 2nd St, Austin, TX 78701",
        phone: "(512) 499-0300", website: "https://lacondesa.com/",
        cat: "dining", url: "", alts: [] },
      { time: "8:00 PM", iso: "2026-03-13T20:00:00-05:00", end: "2026-03-13T23:00:00-05:00",
        name: "Evening Options",
        detail: "Free live music, no badge needed.",
        venue: "", walk: "", cat: "free", url: "",
        options: [
          { text: "Red River District", note: "Mohawk, Swan Dive, Hotel Vegas. 5 min east.", address: "Red River St, Austin, TX 78701" },
          { text: "Congress Ave Block Party", note: "Free drinks/swag.", address: "Congress Ave, Austin, TX 78701" },
          { text: "Lone Star Roadhouse", note: "Live bands + beer market. Free.", address: "" },
          { text: "Fairmont rooftop", note: "Rules & Regs, 7th floor.", address: "101 Red River St, Austin, TX 78701" },
        ],
        alts: [] },
    ],
  },
  {
    title: "Saturday, March 14",
    subtitle: "Together All Day",
    date: "2026-03-14",
    weather: "85°F / 55°F - Hot",
    events: [
      { time: "6:30 AM", iso: "2026-03-14T06:30:00-05:00", end: "2026-03-14T07:30:00-05:00",
        name: "Run: Town Lake Boardwalk",
        detail: "4-5 mile boardwalk loop. 55°F. Hits 85°F later -- don't skip this.",
        venue: "", walk: "", cat: "run", url: "", alts: [] },
      { time: "8:30 AM", iso: "2026-03-14T08:30:00-05:00", end: "2026-03-14T09:30:00-05:00",
        name: "Morning Coffee",
        detail: "Good Things (Fairmont lobby) or Jo's Coffee on SoCo.",
        venue: "", walk: "", cat: "free", url: "", alts: [] },
      { time: "10:00 AM", iso: "2026-03-14T10:00:00-05:00", end: "2026-03-14T11:00:00-05:00",
        name: "The New Lab Partner: AI & Scientific Discovery",
        detail: "AI drug discovery, philosophical questions. Accessible for both of us.",
        venue: "JW Marriott (Salon D)", walk: "5 min from Fairmont",
        address: "110 E 2nd St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1162244", cat: "session",
        alts: [
          "How to Design a Successful Work Culture (Tier 3, Hilton Salon B, 5 min -- fine but generic)",
          "Sleep in / explore -- skip to 11:30, coffee + stroll, no rush"
        ] },
      { time: "11:30 AM", iso: "2026-03-14T11:30:00-05:00", end: "2026-03-14T12:30:00-05:00",
        name: "10 Breakthrough Technologies of 2026",
        detail: "MIT Tech Review annual list with Niall Firth. RESERVED. DON'T MISS.",
        venue: "Hilton (Salon HJK)", walk: "5 min from JW Marriott",
        address: "500 E 4th St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1148587", cat: "session", alts: [] },
      { time: "12:30 PM", iso: "2026-03-14T12:30:00-05:00", end: "2026-03-14T15:00:00-05:00",
        name: "Explore Austin Together",
        detail: "Pick based on energy and heat (85°F!):",
        venue: "", walk: "", cat: "free", url: "",
        options: [
          { text: "Flatstock", note: "Austin Marriott, 7 min. Free poster art. Last day Sun.", address: "304 E Cesar Chavez St, Austin, TX 78701" },
          { text: "South By San Jose", note: "Hotel San Jose, 20 min walk / 5 min Uber. Last day of music!", address: "1316 S Congress Ave, Austin, TX 78704" },
          { text: "Barton Springs Pool", note: "Uber 10 min. 68°F year-round. Bring towels.", address: "2201 Barton Springs Rd, Austin, TX 78746" },
          { text: "South Congress walk", note: "Shops, vintage stores, Allen's Boots.", address: "South Congress Ave, Austin, TX 78704" },
        ],
        alts: [] },
      { time: "4:00 PM", iso: "2026-03-14T16:00:00-05:00", end: "2026-03-14T17:00:00-05:00",
        name: "OpenAI & Spurs: Human-Centered AI",
        detail: "OpenAI + San Antonio Spurs. Optional -- skip for more Austin time.",
        venue: "JW Marriott (Salon D)", walk: "5 min from Fairmont",
        address: "110 E 2nd St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1149842", cat: "session",
        alts: [
          "Reinvention Not Repetition: Shifting the Innovation Mindset (Tier 2, JW Marriott Salon C -- same building)",
          "Space Technology & Innovation Conversation (Tier 3, Hilton -- only if nearby)",
          "Skip -- free afternoon before comedy + dinner. Freshen up at hotel."
        ] },
      { time: "5:00 PM", iso: "2026-03-14T17:00:00-05:00", end: "2026-03-14T18:00:00-05:00",
        name: "Pre-show Drink on 6th St",
        detail: "Walk to Esther's Follies area. Grab a drink.",
        venue: "6th Street area", walk: "5 min from Fairmont",
        address: "6th Street, Austin, TX 78701",
        cat: "free", url: "", alts: [] },
      { time: "6:00 PM", iso: "2026-03-14T18:00:00-05:00", end: "2026-03-14T19:15:00-05:00",
        name: "The Stand Comedy Club: 10 for 10 Podcast Live",
        detail: "Live comedy podcast showcase. Included with badge.",
        venue: "Esther's Follies (525 E 6th St)", walk: "5 min from Fairmont",
        address: "525 E 6th St, Austin, TX 78701",
        cat: "comedy", url: "", alts: [] },
      { time: "7:15 PM", iso: "2026-03-14T19:15:00-05:00", end: "2026-03-14T21:00:00-05:00",
        name: "Dinner: Kemuri Tatsu-ya",
        detail: "Texas BBQ x Japanese izakaya. Michelin-recognized. (512) 803-2224",
        venue: "2713 E 2nd St (East Austin)", walk: "Uber from Esther's ~10 min",
        address: "2713 E 2nd St, Austin, TX 78702",
        phone: "(512) 803-2224", website: "https://www.kemuri-tatsuya.com/",
        cat: "dining", url: "", alts: [] },
    ],
  },
  {
    title: "Sunday, March 15",
    subtitle: "Together - Last Full Day",
    date: "2026-03-15",
    weather: "80°F / 59°F - Warm - Sunset 7:40 PM",
    events: [
      { time: "9:00 AM", iso: "2026-03-15T09:00:00-05:00", end: "2026-03-15T10:00:00-05:00",
        name: "Breakfast",
        detail: "Bouldin Creek Cafe or Good Things (Fairmont lobby).",
        venue: "", walk: "", cat: "free", url: "", alts: [] },
      { time: "10:00 AM", iso: "2026-03-15T10:00:00-05:00", end: "2026-03-15T11:00:00-05:00",
        name: "Beyond AI: The New American Dream",
        detail: "Skilled trades as new upward mobility in the AI age.",
        venue: "The LINE (111 E Cesar Chavez)", walk: "5 min from Fairmont",
        address: "111 E Cesar Chavez St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1162896", cat: "session",
        alts: [
          "Sleep in / Flatstock (Austin Marriott, last day 10am-5pm, 7 min from Fairmont)",
          "Just relax -- skip to 11:30 Pivot Live"
        ] },
      { time: "11:30 AM", iso: "2026-03-15T11:30:00-05:00", end: "2026-03-15T12:30:00-05:00",
        name: "Pivot Live -- Kara Swisher + Scott Galloway",
        detail: "RESERVED. Arrive early -- this will be packed.",
        venue: "Hilton (Salon C)", walk: "5 min from The LINE",
        address: "500 E 4th St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1162997", cat: "session", alts: [] },
      { time: "12:30 PM", iso: "2026-03-15T12:30:00-05:00", end: "2026-03-15T14:00:00-05:00",
        name: "Lunch",
        detail: "",
        venue: "", walk: "", cat: "free", url: "",
        options: [
          { text: "La Barbecue", note: "Michelin-starred brisket. Can have a line.", address: "2401 E Cesar Chavez St, Austin, TX 78702" },
          { text: "Cuantos Tacos", note: "Michelin-recognized food truck.", address: "" },
          { text: "Flatstock", note: "Last day! Austin Marriott, 7 min.", address: "304 E Cesar Chavez St, Austin, TX 78701" },
        ],
        alts: [] },
      { time: "2:30 PM", iso: "2026-03-15T14:30:00-05:00", end: "2026-03-15T15:30:00-05:00",
        name: "Star-Powered Startups: Hits, Misses & Messes",
        detail: "Celebrity ventures (Skims, Goop). Entertaining for both of us.",
        venue: "JW Marriott (Salon E)", walk: "5 min from Hilton",
        address: "110 E 2nd St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1162371", cat: "session",
        alts: [
          "Meet Winners of 2026 SXSW Pitch (Tier 2, JW Marriott Salon C -- winning startup founders, same building, peek at both)"
        ] },
      { time: "4:00 PM", iso: "2026-03-15T16:00:00-05:00", end: "2026-03-15T17:00:00-05:00",
        name: "Reclaiming our Humanity in the Age of AI",
        detail: "RESERVED. Timnit Gebru + John Palfrey + Karen Hao. Unmissable.",
        venue: "JW Marriott (Salon 6-8)", walk: "0 min -- same building",
        address: "110 E 2nd St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1148490", cat: "session",
        alts: [
          "Revolutionizing Astronomy with Big Data (Tier 2, JW Marriott Salon D -- AI + astronomy, same building. Cool but Gebru is unmissable.)"
        ] },
      { time: "5:00 PM", iso: "2026-03-15T17:00:00-05:00", end: "2026-03-15T18:15:00-05:00",
        name: "Congress Ave Bridge at Sunset",
        detail: "Bats return mid-March. Sunset ~7:40 PM. Great photo spot.",
        venue: "Congress Avenue Bridge", walk: "10 min south from JW Marriott",
        address: "Congress Avenue Bridge, Austin, TX 78701",
        cat: "free", url: "", alts: [] },
      { time: "6:15 PM", iso: "2026-03-15T18:15:00-05:00", end: "2026-03-15T19:15:00-05:00",
        name: "Drinks: Rules & Regs",
        detail: "Fairmont 7th floor rooftop. Pool deck, skyline views.",
        venue: "Fairmont Austin", walk: "10 min north from bridge",
        address: "101 Red River St, Austin, TX 78701",
        cat: "free", url: "", alts: [] },
      { time: "7:15 PM", iso: "2026-03-15T19:15:00-05:00", end: "2026-03-15T21:15:00-05:00",
        name: "Dinner: Emmer & Rye",
        detail: "Seasonal small plates on Rainey Street.",
        venue: "51 Rainey St #110", walk: "10 min south from Fairmont",
        address: "51 Rainey St, Austin, TX 78701",
        website: "https://emmerandrye.com/",
        cat: "dining", url: "", alts: [] },
    ],
  },
  {
    title: "Monday, March 16",
    subtitle: "Check Out & Drive to Houston",
    date: "2026-03-16",
    weather: "~80°F / ~58°F",
    events: [
      { time: "8:00 AM", iso: "2026-03-16T08:00:00-05:00", end: "2026-03-16T09:00:00-05:00",
        name: "Pack & check bags with Fairmont",
        detail: "Check out is 11am. Leave bags at front desk.",
        venue: "Fairmont", walk: "", cat: "logistics", url: "", alts: [] },
      { time: "10:00 AM", iso: "2026-03-16T10:00:00-05:00", end: "2026-03-16T11:00:00-05:00",
        name: "Launch, Land, Orbit: Future of Space with Firefly",
        detail: "RESERVED. Firefly CEO Jason Kim + VP Eng Brigette Oakes.",
        venue: "JW Marriott (Salon 1-4)", walk: "5 min from Fairmont",
        address: "110 E 2nd St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1149496", cat: "session",
        alts: [
          "Who Predicts Better? Humans vs AI (Tier 2, JW Marriott Salon E -- forecasting + AI, same building)"
        ] },
      { time: "11:30 AM", iso: "2026-03-16T11:30:00-05:00", end: "2026-03-16T12:30:00-05:00",
        name: "How to Design a Company That AI Can't Outpace",
        detail: "RESERVED. Ian Beacraft on AI-native org design. Only if we delay departure.",
        venue: "Hilton (Salon HJK)", walk: "5 min from JW Marriott",
        address: "500 E 4th St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1148488", cat: "session", alts: [] },
      { time: "1:00 PM", iso: "2026-03-16T13:00:00-05:00", end: "2026-03-16T15:30:00-05:00",
        name: "Depart for Houston",
        detail: "I-10 East, ~165 mi, ~2.5 hrs. Arrive ~3:30 PM.",
        venue: "", walk: "", cat: "logistics", url: "", alts: [] },
    ],
  },
];

// ─── Venue Walk Time Matrix (minutes, from Fairmont) ───────────────────────

const VENUE_KEY = {
  fairmont: "Fairmont",
  hilton: "Hilton",
  jw: "JW Marriott",
  marriott: "Austin Marriott",
  line: "The LINE",
  westin: "Westin",
  courtyard: "Courtyard Marriott",
  sanjose: "Hotel San Jose",
  esthers: "Esther's Follies",
  kemuri: "Kemuri Tatsu-ya",
  emmer: "Emmer & Rye",
  brazos: "Brazos Hall",
  rivian: "Rivian Roadhouse",
};

// Walk time in minutes between pairs. Symmetric.
const WALK_TIMES = {
  fairmont:  { fairmont: 0, hilton: 5, jw: 5, marriott: 7, line: 5, westin: 8, courtyard: 10, sanjose: 20, esthers: 5, kemuri: 25, emmer: 10, brazos: 5, rivian: 15 },
  hilton:    { fairmont: 5, hilton: 0, jw: 5, marriott: 7, line: 5, westin: 6, courtyard: 8, sanjose: 22, esthers: 3, kemuri: 27, emmer: 12, brazos: 3, rivian: 17 },
  jw:        { fairmont: 5, hilton: 5, jw: 0, marriott: 5, line: 3, westin: 8, courtyard: 10, sanjose: 22, esthers: 7, kemuri: 25, emmer: 8, brazos: 5, rivian: 15 },
  marriott:  { fairmont: 7, hilton: 7, jw: 5, marriott: 0, line: 3, westin: 10, courtyard: 12, sanjose: 18, esthers: 10, kemuri: 22, emmer: 7, brazos: 8, rivian: 12 },
  line:      { fairmont: 5, hilton: 5, jw: 3, marriott: 3, line: 0, westin: 8, courtyard: 10, sanjose: 20, esthers: 8, kemuri: 25, emmer: 8, brazos: 6, rivian: 14 },
  westin:    { fairmont: 8, hilton: 6, jw: 8, marriott: 10, line: 8, westin: 0, courtyard: 5, sanjose: 25, esthers: 5, kemuri: 30, emmer: 15, brazos: 5, rivian: 20 },
  courtyard: { fairmont: 10, hilton: 8, jw: 10, marriott: 12, line: 10, westin: 5, courtyard: 0, sanjose: 28, esthers: 7, kemuri: 32, emmer: 18, brazos: 7, rivian: 22 },
  sanjose:   { fairmont: 20, hilton: 22, jw: 22, marriott: 18, line: 20, westin: 25, courtyard: 28, sanjose: 0, esthers: 25, kemuri: 30, emmer: 25, brazos: 22, rivian: 10 },
  esthers:   { fairmont: 5, hilton: 3, jw: 7, marriott: 10, line: 8, westin: 5, courtyard: 7, sanjose: 25, esthers: 0, kemuri: 28, emmer: 13, brazos: 2, rivian: 18 },
  kemuri:    { fairmont: 25, hilton: 27, jw: 25, marriott: 22, line: 25, westin: 30, courtyard: 32, sanjose: 30, esthers: 28, kemuri: 0, emmer: 20, brazos: 27, rivian: 20 },
  emmer:     { fairmont: 10, hilton: 12, jw: 8, marriott: 7, line: 8, westin: 15, courtyard: 18, sanjose: 25, esthers: 13, emmer: 0, brazos: 12, rivian: 8 },
  brazos:    { fairmont: 5, hilton: 3, jw: 5, marriott: 8, line: 6, westin: 5, courtyard: 7, sanjose: 22, esthers: 2, kemuri: 27, emmer: 12, brazos: 0, rivian: 17 },
  rivian:    { fairmont: 15, hilton: 17, jw: 15, marriott: 12, line: 14, westin: 20, courtyard: 22, sanjose: 10, esthers: 18, kemuri: 20, emmer: 8, brazos: 17, rivian: 0 },
};

// ─── Venue Coordinates (for map view) ───────────────────────────────────────

const VENUE_COORDS = {
  fairmont:  { lat: 30.2627, lng: -97.7394, address: "101 Red River St" },
  hilton:    { lat: 30.2647, lng: -97.7401, address: "500 E 4th St" },
  jw:        { lat: 30.2660, lng: -97.7430, address: "110 E 2nd St" },
  marriott:  { lat: 30.2680, lng: -97.7440, address: "304 E Cesar Chavez St" },
  line:      { lat: 30.2655, lng: -97.7452, address: "111 E Cesar Chavez St" },
  westin:    { lat: 30.2690, lng: -97.7400, address: "310 E 5th St" },
  courtyard: { lat: 30.2710, lng: -97.7390, address: "300 E 4th St" },
  sanjose:   { lat: 30.2530, lng: -97.7500, address: "1316 S Congress Ave" },
  esthers:   { lat: 30.2670, lng: -97.7390, address: "525 E 6th St" },
  kemuri:    { lat: 30.2580, lng: -97.7240, address: "2713 E 2nd St" },
  emmer:     { lat: 30.2610, lng: -97.7380, address: "51 Rainey St" },
  brazos:    { lat: 30.2670, lng: -97.7385, address: "204 E 4th St" },
  rivian:    { lat: 30.2560, lng: -97.7350, address: "1509 S Congress Ave" },
};

// ─── Alt Parser ────────────────────────────────────────────────────────────

function parseAlt(altStr) {
  // Extract name (everything before first parenthetical)
  const parenIdx = altStr.indexOf("(");
  let name, meta;
  if (parenIdx > -1) {
    name = altStr.substring(0, parenIdx).trim();
    meta = altStr.substring(parenIdx + 1).replace(/\)$/, "");
  } else {
    name = altStr.trim();
    meta = "";
  }

  // Extract tier
  let tier = 0;
  const tierMatch = meta.match(/Tier\s*(\d)/i);
  if (tierMatch) tier = parseInt(tierMatch[1]);

  // Extract venue key
  let venueKey = null;
  let venueName = "";
  const metaLower = meta.toLowerCase();
  if (metaLower.includes("same venue") || metaLower.includes("same building") || metaLower.includes("same room")) {
    venueKey = "same";
  } else if (metaLower.includes("rivian")) { venueKey = "rivian"; venueName = "Rivian Roadhouse"; }
  else if (metaLower.includes("courtyard")) { venueKey = "courtyard"; venueName = "Courtyard Marriott"; }
  else if (metaLower.includes("austin marriott")) { venueKey = "marriott"; venueName = "Austin Marriott"; }
  else if (metaLower.includes("jw marriott")) { venueKey = "jw"; venueName = "JW Marriott"; }
  else if (metaLower.includes("westin")) { venueKey = "westin"; venueName = "Westin"; }
  else if (metaLower.includes("hilton")) { venueKey = "hilton"; venueName = "Hilton"; }
  else if (metaLower.includes("fairmont")) { venueKey = "fairmont"; venueName = "Fairmont"; }
  else if (metaLower.includes("the line")) { venueKey = "line"; venueName = "The LINE"; }
  else if (metaLower.includes("san jose") || metaLower.includes("hotel san jose")) { venueKey = "sanjose"; venueName = "Hotel San Jose"; }
  else if (metaLower.includes("esther")) { venueKey = "esthers"; venueName = "Esther's Follies"; }

  // Extract walk time from text
  let walkMin = 0;
  const walkMatch = meta.match(/(\d+)\s*min/i);
  if (walkMatch) walkMin = parseInt(walkMatch[1]);

  // Extract duration hints
  let durationMin = 60; // default
  const durMatch = meta.match(/(\d+)\s*min\s*(?:only|long)/i);
  if (durMatch) durationMin = parseInt(durMatch[1]);
  if (meta.includes("90 min")) durationMin = 90;
  if (meta.includes("45 min")) durationMin = 45;
  if (meta.includes("20 min")) durationMin = 20;

  // Extract notes (everything after the last --)
  let notes = "";
  const dashParts = meta.split("--");
  if (dashParts.length > 1) {
    notes = dashParts.slice(1).join("--").trim();
  }

  // Check for skip/non-session
  const isSkip = metaLower.includes("skip") || name.toLowerCase().startsWith("skip");
  const isFreeAlt = metaLower.includes("sleep in") || metaLower.includes("just relax") || metaLower.includes("free afternoon") || name.toLowerCase().includes("flatstock") || name.toLowerCase().includes("south by san jose");

  return { name, tier, venueKey, venueName, walkMin, durationMin, notes, isSkip, isFreeAlt, raw: altStr };
}

// ─── Venue Key from Event ──────────────────────────────────────────────────

function venueKeyFromEvent(ev) {
  if (!ev.venue) return "fairmont"; // default if no venue
  const v = ev.venue.toLowerCase();
  if (v.includes("fairmont")) return "fairmont";
  if (v.includes("jw marriott")) return "jw";
  if (v.includes("austin marriott")) return "marriott";
  if (v.includes("hilton")) return "hilton";
  if (v.includes("line")) return "line";
  if (v.includes("westin")) return "westin";
  if (v.includes("courtyard")) return "courtyard";
  if (v.includes("san jose")) return "sanjose";
  if (v.includes("esther")) return "esthers";
  if (v.includes("kemuri")) return "kemuri";
  if (v.includes("emmer") || v.includes("rainey")) return "emmer";
  if (v.includes("brazos")) return "brazos";
  if (v.includes("rivian")) return "rivian";
  return "fairmont";
}

// ─── Feasibility Engine ────────────────────────────────────────────────────

function getWalkTime(fromKey, toKey) {
  if (fromKey === "same" || toKey === "same") return 0;
  if (!fromKey || !toKey) return 5; // reasonable default
  const from = WALK_TIMES[fromKey];
  if (!from) return 10;
  return from[toKey] !== undefined ? from[toKey] : 10;
}

function checkSwapFeasibility(dayEvents, eventIdx, alt) {
  const ev = dayEvents[eventIdx];
  const prevEv = eventIdx > 0 ? dayEvents[eventIdx - 1] : null;
  const nextEv = eventIdx < dayEvents.length - 1 ? dayEvents[eventIdx + 1] : null;

  const currentVenueKey = venueKeyFromEvent(ev);
  const altVenueKey = alt.venueKey === "same" ? currentVenueKey : (alt.venueKey || currentVenueKey);

  // Time available to arrive at alt venue from previous event
  let arrivalOk = true;
  let arrivalNote = "";
  let arrivalMinBuffer = 999;

  if (prevEv) {
    const prevEnd = new Date(prevEv.end);
    const thisStart = new Date(ev.iso);
    const gapMin = (thisStart - prevEnd) / 60000;
    const prevVenueKey = venueKeyFromEvent(prevEv);
    const walkToAlt = getWalkTime(prevVenueKey, altVenueKey);

    arrivalMinBuffer = gapMin - walkToAlt;
    if (arrivalMinBuffer < 0) {
      arrivalOk = false;
      arrivalNote = "Need " + walkToAlt + " min walk from " + (VENUE_KEY[prevVenueKey] || prevVenueKey) + " but only " + gapMin + " min gap";
    } else if (arrivalMinBuffer < 10) {
      arrivalNote = "Tight: " + walkToAlt + " min walk, " + Math.round(gapMin) + " min gap (buffer: " + Math.round(arrivalMinBuffer) + " min)";
    } else {
      arrivalNote = walkToAlt + " min walk, " + Math.round(gapMin) + " min gap";
    }
  }

  // Time available to get from alt venue to next event
  let departureOk = true;
  let departureNote = "";
  let departureMinBuffer = 999;

  if (nextEv) {
    const thisEnd = new Date(ev.end);
    const nextStart = new Date(nextEv.iso);
    const gapMin = (nextStart - thisEnd) / 60000;
    const nextVenueKey = venueKeyFromEvent(nextEv);
    const walkFromAlt = getWalkTime(altVenueKey, nextVenueKey);

    departureMinBuffer = gapMin - walkFromAlt;
    if (departureMinBuffer < 0) {
      departureOk = false;
      departureNote = "Need " + walkFromAlt + " min walk to " + (VENUE_KEY[nextVenueKey] || nextVenueKey) + " but only " + gapMin + " min gap";
    } else if (departureMinBuffer < 10) {
      departureNote = "Tight: " + walkFromAlt + " min walk to " + nextEv.name.substring(0, 30) + ", " + Math.round(gapMin) + " min gap";
    } else {
      departureNote = walkFromAlt + " min walk to next, " + Math.round(gapMin) + " min gap";
    }
  }

  // Overall feasibility: green / amber / red
  let level = "green";
  if (!arrivalOk || !departureOk) level = "red";
  else if (arrivalMinBuffer < 10 || departureMinBuffer < 10) level = "amber";

  return {
    level,
    arrivalOk, arrivalNote,
    departureOk, departureNote,
    altVenueKey,
    walkFromPrev: prevEv ? getWalkTime(venueKeyFromEvent(prevEv), altVenueKey) : 0,
    walkToNext: nextEv ? getWalkTime(altVenueKey, venueKeyFromEvent(nextEv)) : 0,
  };
}

// ─── Swap Storage ──────────────────────────────────────────────────────────

const SWAP_KEY = "sxsw-beta-swaps";

function loadSwaps() {
  try {
    return JSON.parse(localStorage.getItem(SWAP_KEY)) || {};
  } catch { return {}; }
}

function saveSwap(dayIdx, eventIdx, altIdx) {
  const swaps = loadSwaps();
  const key = dayIdx + "-" + eventIdx;
  swaps[key] = { altIdx, ts: Date.now() };
  localStorage.setItem(SWAP_KEY, JSON.stringify(swaps));
}

function clearSwap(dayIdx, eventIdx) {
  const swaps = loadSwaps();
  delete swaps[dayIdx + "-" + eventIdx];
  localStorage.setItem(SWAP_KEY, JSON.stringify(swaps));
}

function getSwap(dayIdx, eventIdx) {
  const swaps = loadSwaps();
  return swaps[dayIdx + "-" + eventIdx] || null;
}

// ─── Utility ───────────────────────────────────────────────────────────────

function mapUrl(address) {
  if (!address) return "";
  return "https://maps.apple.com/?daddr=" + encodeURIComponent(address) + "&dirflg=w";
}

const CAT_LABELS = {
  session: "Session", dining: "Dining", comedy: "Comedy",
  run: "Run", free: "Explore", logistics: "Logistics",
};

// ─── Router ────────────────────────────────────────────────────────────────

function route() {
  const hash = location.hash || "#now";
  const views = { "#now": "now-view", "#schedule": "schedule-view", "#map": "map-view", "#ref": "ref-view" };
  const viewId = views[hash] || "now-view";

  document.querySelectorAll(".view").forEach(v => {
    v.classList.remove("active");
    v.setAttribute("aria-hidden", "true");
  });
  document.querySelectorAll("#tab-bar a").forEach(t => {
    t.classList.remove("active");
    t.setAttribute("aria-selected", "false");
  });

  const view = document.getElementById(viewId);
  if (view) { view.classList.add("active"); view.removeAttribute("aria-hidden"); }

  const tab = document.querySelector('#tab-bar a[href="' + hash + '"]');
  if (tab) { tab.setAttribute("aria-selected", "true"); tab.classList.add("active"); }

  if (hash === "#now") updateNowView();
  if (hash === "#schedule" && !document.querySelector(".day-content")) renderDay(getToday());
  if (hash === "#map") initMap(getToday());
}

// ─── Now View ──────────────────────────────────────────────────────────────

function getAllEvents() {
  const all = [];
  DAYS.forEach((day, di) => {
    day.events.forEach((ev, ei) => {
      all.push({ ...ev, dayIndex: di, eventIndex: ei, dayTitle: day.title });
    });
  });
  return all.sort((a, b) => new Date(a.iso) - new Date(b.iso));
}

function findCurrentAndNext() {
  const now = new Date();
  const events = getAllEvents();
  let current = null, next = null;

  for (let i = 0; i < events.length; i++) {
    const start = new Date(events[i].iso);
    const end = new Date(events[i].end);
    if (now >= start && now < end) {
      current = events[i];
      next = events[i + 1] || null;
      break;
    }
    if (now < start) {
      next = events[i];
      if (i > 0) {
        const prevEnd = new Date(events[i - 1].end);
        current = now >= prevEnd ? null : events[i - 1];
      }
      break;
    }
  }

  if (!current && !next && events.length > 0) {
    const lastEnd = new Date(events[events.length - 1].end);
    if (now >= lastEnd) return { current: null, next: null, status: "done" };
    for (let i = 0; i < events.length; i++) {
      if (new Date(events[i].iso) > now) return { current: null, next: events[i], status: "active" };
    }
  }
  if (!current && !next) return { current: null, next: events[0] || null, status: "before" };
  return { current, next, status: "active" };
}

function formatCountdown(ms) {
  if (ms <= 0) return "now";
  const totalMin = Math.floor(ms / 60000);
  if (totalMin < 60) return totalMin + " min";
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return h + "h " + (m > 0 ? m + "m" : "");
}

function buildWalkCard(current, next, now) {
  const fromKey = venueKeyFromEvent(current);
  const toKey = venueKeyFromEvent(next);
  const walkMin = getWalkTime(fromKey, toKey);
  const fromName = current.venue ? current.venue.split("(")[0].trim() : (VENUE_KEY[fromKey] || "Current venue");
  const toName = next.venue ? next.venue.split("(")[0].trim() : (VENUE_KEY[toKey] || "Next venue");

  const currentEnd = new Date(current.end);
  const nextStart = new Date(next.iso);
  const gapMin = Math.round((nextStart - currentEnd) / 60000);
  const bufferMin = gapMin - walkMin;
  const endMs = currentEnd - now;
  const leaveMs = endMs; // leave when current event ends
  const leaveIn = Math.max(0, Math.round(leaveMs / 60000));

  // When should they actually leave?
  const latestLeaveMs = nextStart - now - walkMin * 60000;
  const latestLeaveMin = Math.max(0, Math.round(latestLeaveMs / 60000));

  let urgency = "walk-ok";
  let urgencyText = bufferMin + " min buffer";
  if (bufferMin < 0) {
    urgency = "walk-tight";
    urgencyText = "Cutting it close!";
  } else if (bufferMin < 5) {
    urgency = "walk-tight";
    urgencyText = "Tight — " + bufferMin + " min buffer";
  }

  // Directions URL
  const nextAddr = next.address || "";
  const dirUrl = nextAddr ? mapUrl(nextAddr) : "";

  let html = '<div class="walk-card ' + urgency + '">';
  html += '<div class="walk-header">';
  html += '<svg class="walk-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1.5"/><path d="M9 22l1-7 2 1V9l3.5-1L17 11h2"/><path d="M9 22l-1-5 3-3"/></svg>';
  html += '<div class="walk-info">';
  html += '<div class="walk-title">' + walkMin + ' min walk to ' + toName + '</div>';
  html += '<div class="walk-from">' + fromName + ' → ' + toName + '</div>';
  html += '</div>';
  html += '<div class="walk-timing ' + urgency + '">' + urgencyText + '</div>';
  html += '</div>';

  // Leave-by reminder
  if (leaveIn > 0 && latestLeaveMin > 0) {
    html += '<div class="walk-leave">Leave in ~' + latestLeaveMin + ' min to arrive on time</div>';
  } else if (latestLeaveMin <= 0) {
    html += '<div class="walk-leave walk-leave-now">Time to start walking!</div>';
  }

  if (dirUrl) {
    html += '<a href="' + dirUrl + '" class="walk-directions-btn">Walking Directions</a>';
  }
  html += '</div>';
  return html;
}

function eventCard(ev, label) {
  const addr = ev.address || "";
  const mUrl = mapUrl(addr);
  const catClass = "cat-" + (ev.cat || "free");
  const isReserved = ev.detail && ev.detail.includes("RESERVED");

  let endTimeStr = "";
  if (ev.end) {
    const endD = new Date(ev.end);
    endTimeStr = " - " + endD.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  }

  let html = '<div class="event-card ' + catClass + '">';
  if (label) html += '<div class="card-label">' + label + '</div>';
  html += '<div class="card-time">' + ev.time + endTimeStr + '</div>';
  html += '<div class="card-name">' + ev.name + '</div>';
  if (isReserved) html += '<div class="card-reserved">Reserved</div>';
  if (ev.venue) html += '<div class="card-venue">' + ev.venue + '</div>';
  if (ev.walk) html += '<div class="card-walk">' + ev.walk + '</div>';

  const btns = [];
  if (mUrl) btns.push('<a href="' + mUrl + '" class="card-btn">Directions</a>');
  if (ev.url) btns.push('<a href="' + ev.url + '" target="_blank" class="card-btn card-btn-alt">SXSW Schedule</a>');
  if (ev.phone) btns.push('<a href="tel:' + ev.phone.replace(/[^+\d]/g, "") + '" class="card-btn card-btn-alt">Call</a>');
  if (ev.website) btns.push('<a href="' + ev.website + '" target="_blank" class="card-btn card-btn-alt">Website</a>');
  if (btns.length) html += '<div class="card-btns">' + btns.join("") + '</div>';

  const cleanDetail = ev.detail ? ev.detail.replace(/\bRESERVED\.?\s*/g, "").trim() : "";
  if (cleanDetail) html += '<div class="card-detail">' + cleanDetail + '</div>';

  if (ev.options && ev.options.length) {
    html += '<div class="card-options">';
    ev.options.forEach(o => {
      html += '<div class="option-item">';
      html += '<strong>' + o.text + '</strong> -- ' + o.note;
      if (o.address) html += ' <a href="' + mapUrl(o.address) + '" class="ref-link">Directions</a>';
      html += '</div>';
    });
    html += '</div>';
  }
  html += '</div>';
  return html;
}

function updateNowView() {
  const container = document.getElementById("now-content");
  const { current, next, status } = findCurrentAndNext();
  const now = new Date();
  let html = '<div id="weather-bar"></div>';

  const dayIndex = current ? current.dayIndex : (next ? next.dayIndex : getToday());
  if (dayIndex >= 0 && dayIndex < DAYS.length) {
    const day = DAYS[dayIndex];
    const sessions = day.events.filter(e => e.cat === "session").length;
    html += '<div class="day-summary"><span class="summary-badge">' + day.title + '</span><span class="summary-text">' + sessions + ' sessions</span></div>';
  }

  if (status === "done") {
    html += '<div class="now-message">Trip complete! Safe travels to Houston.</div>';
  } else if (status === "before" && next) {
    const ms = new Date(next.iso) - now;
    html += ms > 86400000 * 2
      ? '<div class="now-message">SXSW starts in ' + Math.ceil(ms / 86400000) + ' days</div>'
      : '<div class="now-countdown">Starts in ' + formatCountdown(ms) + '</div>';
    html += eventCard(next, "Up First");
  } else {
    if (current) {
      const endMs = new Date(current.end) - now;
      const totalMs = new Date(current.end) - new Date(current.iso);
      const pct = Math.max(0, Math.min(100, ((totalMs - endMs) / totalMs) * 100));
      const urgentClass = endMs < 15 * 60000 ? " progress-urgent" : "";
      html += eventCard(current, "Now");
      html += '<div class="progress-bar"><div class="progress-fill' + urgentClass + '" style="width:' + pct.toFixed(0) + '%"></div></div>';
      html += '<div class="progress-label">' + formatCountdown(endMs) + ' remaining</div>';
    }
    // Walking directions between current and next
    if (current && next) {
      html += buildWalkCard(current, next, now);
    }
    if (next) {
      html += '<div class="now-countdown">Next up in ' + formatCountdown(new Date(next.iso) - now) + '</div>';
      html += eventCard(next, "Next");
    }
  }
  container.innerHTML = html;
  fetchWeather();
}

let nowInterval;
function startNowUpdates() {
  if (nowInterval) clearInterval(nowInterval);
  nowInterval = setInterval(() => {
    if (location.hash === "#now" || !location.hash) updateNowView();
  }, 30000);
}

// ─── Schedule View (Enhanced with Feasibility) ─────────────────────────────

let activeDay = -1;

function getToday() {
  const today = new Date().toLocaleDateString("en-CA");
  for (let i = 0; i < DAYS.length; i++) {
    if (DAYS[i].date === today) return i;
  }
  if (today < DAYS[0].date) return 0;
  if (today > DAYS[DAYS.length - 1].date) return DAYS.length - 1;
  return DAYS.length - 1;
}

function feasibilityDot(level) {
  const colors = { green: "#16A34A", amber: "#d97706", red: "#dc2626" };
  const labels = { green: "Easy swap", amber: "Tight timing", red: "Risky" };
  return '<span class="feas-dot" style="background:' + colors[level] + '" title="' + labels[level] + '"></span>';
}

function renderAltCard(alt, feas, dayIdx, evIdx, altIdx) {
  const swap = getSwap(dayIdx, evIdx);
  const isActive = swap && swap.altIdx === altIdx;

  let html = '<div class="alt-card' + (isActive ? ' alt-active' : '') + '" data-day="' + dayIdx + '" data-ev="' + evIdx + '" data-alt="' + altIdx + '">';
  html += '<div class="alt-header">';
  html += feasibilityDot(feas.level);
  html += '<span class="alt-name">' + alt.name + '</span>';
  if (alt.tier) html += '<span class="alt-tier">Tier ' + alt.tier + '</span>';
  html += '</div>';

  if (alt.venueName) {
    html += '<div class="alt-venue">' + alt.venueName;
    if (alt.walkMin) html += ' (' + alt.walkMin + ' min walk)';
    html += '</div>';
  }

  if (alt.notes && !alt.isSkip) {
    html += '<div class="alt-notes">' + alt.notes + '</div>';
  }

  // Feasibility detail
  html += '<div class="alt-feas">';
  if (feas.arrivalNote) {
    html += '<div class="feas-line' + (!feas.arrivalOk ? ' feas-bad' : '') + '">';
    html += '<span class="feas-arrow">&#8592;</span> ' + feas.arrivalNote + '</div>';
  }
  if (feas.departureNote) {
    html += '<div class="feas-line' + (!feas.departureOk ? ' feas-bad' : '') + '">';
    html += '<span class="feas-arrow">&#8594;</span> ' + feas.departureNote + '</div>';
  }
  html += '</div>';

  // Swap button
  if (isActive) {
    html += '<button class="swap-btn swap-undo" data-action="undo">Undo swap</button>';
  } else {
    html += '<button class="swap-btn" data-action="swap">Use this instead</button>';
  }

  html += '</div>';
  return html;
}

function renderDay(idx) {
  activeDay = idx;
  const day = DAYS[idx];
  const timeline = document.getElementById("day-timeline");
  const now = new Date();
  const todayStr = now.toLocaleDateString("en-CA");

  document.querySelectorAll(".day-tab").forEach((t, i) => {
    t.classList.toggle("active", i === idx);
    t.classList.toggle("today", DAYS[i].date === todayStr);
    t.setAttribute("aria-selected", i === idx ? "true" : "false");
  });

  let html = '<div class="day-content">';
  html += '<div class="day-header">';
  html += '<div class="day-title">' + day.title + '</div>';
  html += '<div class="day-subtitle">' + day.subtitle + '</div>';
  html += '<div class="day-weather">' + day.weather + '</div>';
  html += '</div>';

  day.events.forEach((ev, evIdx) => {
    const addr = ev.address || "";
    const mUrl = mapUrl(addr);
    const catClass = "cat-" + (ev.cat || "free");
    const isPast = new Date(ev.end) < now;
    const isCurrent = now >= new Date(ev.iso) && now < new Date(ev.end);
    const timeClass = isPast ? " past-event" : (isCurrent ? " current-event" : "");
    const isReserved = ev.detail && ev.detail.includes("RESERVED");

    // Check for active swap
    const swap = getSwap(idx, evIdx);
    const hasSwap = swap !== null;

    html += '<details class="sched-card ' + catClass + timeClass + (hasSwap ? ' swapped-card' : '') + '">';
    html += '<summary>';
    html += '<span class="sc-time">' + ev.time;
    if (isReserved) html += ' <span class="sc-reserved">Reserved</span>';
    html += ' <span class="sc-cat-badge ' + catClass + '">' + (CAT_LABELS[ev.cat] || "Event") + '</span>';
    html += '</span>';

    if (hasSwap && ev.alts[swap.altIdx]) {
      const swappedAlt = parseAlt(ev.alts[swap.altIdx]);
      html += '<span class="sc-name"><s class="sc-original">' + ev.name + '</s></span>';
      html += '<span class="sc-name sc-swapped">' + swappedAlt.name + '</span>';
      if (swappedAlt.venueName) html += '<span class="sc-venue">' + swappedAlt.venueName + '</span>';
    } else {
      html += '<span class="sc-name">' + ev.name + '</span>';
      if (ev.venue) html += '<span class="sc-venue">' + ev.venue + '</span>';
      if (ev.walk) html += '<span class="sc-walk">' + ev.walk + '</span>';
    }
    html += '</summary>';

    html += '<div class="sc-expand">';
    const scDetail = ev.detail ? ev.detail.replace(/\bRESERVED\.?\s*/g, "").trim() : "";
    if (scDetail) html += '<p class="sc-detail">' + scDetail + '</p>';

    const btns = [];
    if (mUrl) btns.push('<a href="' + mUrl + '" class="card-btn">Directions</a>');
    if (ev.url) btns.push('<a href="' + ev.url + '" target="_blank" class="card-btn card-btn-alt">SXSW Schedule</a>');
    if (ev.phone) btns.push('<a href="tel:' + ev.phone.replace(/[^+\d]/g, "") + '" class="card-btn card-btn-alt">Call</a>');
    if (ev.website) btns.push('<a href="' + ev.website + '" target="_blank" class="card-btn card-btn-alt">Website</a>');
    if (btns.length) html += '<div class="card-btns">' + btns.join("") + '</div>';

    // Structured options
    if (ev.options && ev.options.length) {
      html += '<div class="card-options">';
      ev.options.forEach(o => {
        html += '<div class="option-item">';
        html += '<strong>' + o.text + '</strong> -- ' + o.note;
        if (o.address) html += ' <a href="' + mapUrl(o.address) + '" class="ref-link">Directions</a>';
        html += '</div>';
      });
      html += '</div>';
    }

    // Enhanced alts with feasibility
    if (ev.alts && ev.alts.length) {
      html += '<div class="alts-section">';
      html += '<div class="alts-header">Alternatives (' + ev.alts.length + ')</div>';

      // Show original as a selectable option when a swap is active
      if (hasSwap) {
        const origVenueKey = venueKeyFromEvent(ev);
        const origFeas = { level: "green", arrivalOk: true, arrivalNote: "", departureOk: true, departureNote: "" };
        html += '<div class="alt-card alt-original" data-day="' + idx + '" data-ev="' + evIdx + '" data-alt="-1">';
        html += '<div class="alt-header">';
        html += feasibilityDot("green");
        html += '<span class="alt-name">' + ev.name + '</span>';
        html += '<span class="alt-tier alt-tier-orig">Original</span>';
        html += '</div>';
        if (ev.venue) html += '<div class="alt-venue">' + ev.venue + '</div>';
        html += '<button class="swap-btn swap-restore" data-action="undo">Restore original</button>';
        html += '</div>';
      }

      ev.alts.forEach((altStr, altIdx) => {
        const alt = parseAlt(altStr);
        const feas = checkSwapFeasibility(day.events, evIdx, alt);
        html += renderAltCard(alt, feas, idx, evIdx, altIdx);
      });
      html += '</div>';
    }

    html += '</div></details>';
  });

  html += '</div>';
  timeline.innerHTML = html;

  // Scroll to current event if viewing today
  if (day.date === todayStr) {
    const cur = timeline.querySelector(".current-event");
    if (cur) cur.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// ─── Weather ───────────────────────────────────────────────────────────────

let weatherCache = null;

async function fetchWeather() {
  const bar = document.getElementById("weather-bar");
  if (!bar) return;
  if (weatherCache && Date.now() - weatherCache.ts < 3600000) { bar.innerHTML = weatherCache.html; return; }

  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=30.2672&longitude=-97.7431" +
      "&daily=temperature_2m_max,temperature_2m_min,weather_code" +
      "&current=temperature_2m,weather_code" +
      "&temperature_unit=fahrenheit&timezone=America/Chicago&forecast_days=5"
    );
    const data = await res.json();
    const cur = data.current;
    const wDesc = weatherDesc(cur.weather_code);
    const hi = data.daily ? Math.round(data.daily.temperature_2m_max[0]) : "";
    const lo = data.daily ? Math.round(data.daily.temperature_2m_min[0]) : "";

    let html = '<div class="weather-now"><span class="weather-temp">' + Math.round(cur.temperature_2m) + '\u00B0F</span><span class="weather-desc">' + wDesc + '</span><span class="weather-loc">Austin, TX</span></div>';
    if (hi && lo) html += '<div class="weather-range">High ' + hi + '\u00B0F / Low ' + lo + '\u00B0F</div>';
    weatherCache = { html, ts: Date.now() };
    bar.innerHTML = html;
  } catch {
    const dayIdx = getToday();
    if (dayIdx >= 0 && dayIdx < DAYS.length) {
      bar.innerHTML = '<div class="weather-now"><span class="weather-temp">' + DAYS[dayIdx].weather + '</span></div>';
    }
  }
}

function weatherDesc(code) {
  const map = { 0: "Clear", 1: "Mostly clear", 2: "Partly cloudy", 3: "Overcast", 45: "Foggy", 51: "Light drizzle", 61: "Light rain", 63: "Rain", 65: "Heavy rain", 80: "Rain showers", 95: "Thunderstorm" };
  return map[code] || "Clear";
}

// ─── Dark Mode ─────────────────────────────────────────────────────────────

function initDarkMode() {
  const saved = localStorage.getItem("sxsw-dark");
  if (saved === null && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark");
  } else if (saved === "true") {
    document.documentElement.classList.add("dark");
  }

  document.getElementById("darkToggle").addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("sxsw-dark", isDark.toString());
    updateDarkIcon(isDark);
    setMapTiles(isDark);
  });
  updateDarkIcon(document.documentElement.classList.contains("dark"));
}

function updateDarkIcon(isDark) {
  const btn = document.getElementById("darkToggle");
  btn.innerHTML = isDark
    ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
    : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
}

// ─── Map View ───────────────────────────────────────────────────────────────

let mapInstance = null;
let mapMarkers = [];
let mapLines = [];
let activeMapDay = -1;

const CAT_COLORS = {
  session: "#2563EB",
  dining: "#EA580C",
  comedy: "#9333EA",
  run: "#16A34A",
  free: "#0EA5E9",
  logistics: "#64748B",
};

function initMap(dayIdx) {
  if (dayIdx < 0) dayIdx = 0;

  // Update map day tabs
  document.querySelectorAll(".map-day-tab").forEach((t, i) => {
    t.classList.toggle("active", i === dayIdx);
  });

  if (!mapInstance) {
    mapInstance = L.map("map-container", {
      zoomControl: false,
      attributionControl: false,
    }).setView([30.2640, -97.7410], 15);

    L.control.zoom({ position: "topright" }).addTo(mapInstance);

    // Use a clean tile style
    const isDark = document.documentElement.classList.contains("dark");
    setMapTiles(isDark);
  }

  // Need to invalidate size after view becomes visible
  setTimeout(() => mapInstance.invalidateSize(), 100);

  if (activeMapDay !== dayIdx) {
    activeMapDay = dayIdx;
    renderMapDay(dayIdx);
  }
}

function setMapTiles(isDark) {
  if (!mapInstance) return;
  // Remove existing tile layers
  mapInstance.eachLayer(l => { if (l instanceof L.TileLayer) mapInstance.removeLayer(l); });

  if (isDark) {
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(mapInstance);
  } else {
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(mapInstance);
  }
}

function renderMapDay(dayIdx) {
  const day = DAYS[dayIdx];

  // Clear existing markers and lines
  mapMarkers.forEach(m => mapInstance.removeLayer(m));
  mapLines.forEach(l => mapInstance.removeLayer(l));
  mapMarkers = [];
  mapLines = [];

  const bounds = [];
  const routePoints = [];
  let eventNum = 0;

  day.events.forEach((ev, evIdx) => {
    const venueKey = venueKeyFromEvent(ev);
    const coords = VENUE_COORDS[venueKey];
    if (!coords) return;

    eventNum++;
    const cat = ev.cat || "logistics";
    const color = CAT_COLORS[cat] || CAT_COLORS.logistics;
    const swap = getSwap(dayIdx, evIdx);
    const isSwapped = swap !== null;

    // Check if swapped to a different venue
    let displayName = ev.name;
    let displayVenue = ev.venue || VENUE_KEY[venueKey] || "";
    let markerCoords = [coords.lat, coords.lng];

    if (isSwapped && ev.alts[swap.altIdx]) {
      const alt = parseAlt(ev.alts[swap.altIdx]);
      if (alt.venueKey && VENUE_COORDS[alt.venueKey]) {
        const altCoords = VENUE_COORDS[alt.venueKey];
        markerCoords = [altCoords.lat, altCoords.lng];
        displayName = alt.name;
        displayVenue = alt.venueName || VENUE_KEY[alt.venueKey] || "";
      }
    }

    // Numbered circle marker
    const markerIcon = L.divIcon({
      className: "map-marker-icon",
      html: '<div class="map-marker" style="background:' + color + (isSwapped ? ";border:2px solid #d97706" : "") + '">' + eventNum + '</div>',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const marker = L.marker(markerCoords, { icon: markerIcon }).addTo(mapInstance);
    marker.bindPopup(
      '<div class="map-popup">' +
      '<strong>' + ev.time + '</strong><br>' +
      '<span style="color:' + color + '">' + displayName + '</span><br>' +
      '<small>' + displayVenue + '</small>' +
      (isSwapped ? '<br><em style="color:#d97706">Swapped</em>' : '') +
      '</div>'
    );

    mapMarkers.push(marker);
    bounds.push(markerCoords);
    routePoints.push(markerCoords);
  });

  // Draw route lines between consecutive events
  for (let i = 0; i < routePoints.length - 1; i++) {
    const line = L.polyline([routePoints[i], routePoints[i + 1]], {
      color: "#6366f1",
      weight: 2,
      opacity: 0.5,
      dashArray: "6, 8",
    }).addTo(mapInstance);
    mapLines.push(line);
  }

  // Fit bounds with padding
  if (bounds.length > 1) {
    mapInstance.fitBounds(bounds, { padding: [40, 40] });
  } else if (bounds.length === 1) {
    mapInstance.setView(bounds[0], 15);
  }

  // Build legend
  buildMapLegend(day, dayIdx);
}

function buildMapLegend(day, dayIdx) {
  const legend = document.getElementById("map-legend");
  let html = '<div class="map-legend-title">' + day.title + '</div>';
  html += '<div class="map-legend-items">';

  let num = 0;
  day.events.forEach((ev, evIdx) => {
    const venueKey = venueKeyFromEvent(ev);
    if (!VENUE_COORDS[venueKey]) return;
    num++;

    const cat = ev.cat || "logistics";
    const color = CAT_COLORS[cat] || CAT_COLORS.logistics;
    const swap = getSwap(dayIdx, evIdx);
    const isSwapped = swap !== null;
    let name = ev.name;

    if (isSwapped && ev.alts[swap.altIdx]) {
      const alt = parseAlt(ev.alts[swap.altIdx]);
      name = alt.name;
    }

    html += '<div class="map-legend-item">';
    html += '<span class="map-legend-num" style="background:' + color + '">' + num + '</span>';
    html += '<span class="map-legend-time">' + ev.time + '</span>';
    html += '<span class="map-legend-name">' + name.substring(0, 35) + (name.length > 35 ? '...' : '') + '</span>';
    html += '</div>';
  });
  html += '</div>';
  legend.innerHTML = html;
}

// ─── Init ──────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  initDarkMode();
  startNowUpdates();

  // Day tabs (schedule view)
  document.querySelectorAll(".day-tab:not(.map-day-tab)").forEach((tab, i) => {
    tab.addEventListener("click", () => renderDay(i));
  });

  // Map day tabs
  document.querySelectorAll(".map-day-tab").forEach((tab, i) => {
    tab.addEventListener("click", () => {
      activeMapDay = -1; // force re-render
      initMap(i);
    });
  });

  // Swap button delegation
  document.getElementById("day-timeline").addEventListener("click", e => {
    const btn = e.target.closest(".swap-btn");
    if (!btn) return;
    e.stopPropagation();

    const card = btn.closest(".alt-card");
    const dayIdx = parseInt(card.dataset.day);
    const evIdx = parseInt(card.dataset.ev);
    const altIdx = parseInt(card.dataset.alt);

    if (btn.dataset.action === "undo") {
      clearSwap(dayIdx, evIdx);
    } else {
      saveSwap(dayIdx, evIdx, altIdx);
    }
    renderDay(dayIdx);
  });

  window.addEventListener("hashchange", route);
  route();
});
