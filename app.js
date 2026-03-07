// SXSW 2026 Trip Guide — app.js
// Vanilla JS single-page app: Now / Schedule / Reference

// ─── Schedule Data ──────────────────────────────────────────────────────────

const DAYS = [
  {
    title: "Thursday, March 12",
    subtitle: "Jon Solo | SXSW EDU Day",
    date: "2026-03-12",
    weather: "71F / 51F - Pleasant",
    events: [
      { time: "7:00 AM", iso: "2026-03-12T07:00:00-05:00", end: "2026-03-12T08:00:00-05:00",
        name: "Run: Town Lake Boardwalk",
        detail: "4-5 mile boardwalk loop. 51F -- perfect. Out the back of the Fairmont, cross Cesar Chavez, on the trail in 2 min. Sunrise ~7:35 AM. Route options: full loop ~10 mi, boardwalk (south side) ~4-5 mi, east out-and-back ~3 mi.",
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
        name: "Lunch", detail: "Walk back to Fairmont (5 min from Hilton) or grab food nearby. Convention Center food options also close.",
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
        detail: "Head back to hotel. Grab food nearby or at the Fairmont. Recharge before the opening party.",
        venue: "Fairmont", walk: "",
        cat: "free", url: "", alts: [] },
      { time: "7:00 PM", iso: "2026-03-12T19:00:00-05:00", end: "2026-03-12T22:00:00-05:00",
        name: "Innovation Opening Party",
        detail: "Free with badge. Great for solo networking. After: Red River District bars (Mohawk, Cheer Up Charlies) are 5 min east, or head back to Fairmont.",
        venue: "Brazos Hall (204 E 4th St)", walk: "5 min from Fairmont",
        address: "204 E 4th St, Austin, TX 78701",
        cat: "logistics", url: "", alts: [] },
    ],
  },
  {
    title: "Friday, March 13",
    subtitle: "Jon Solo AM - Together from Midday",
    date: "2026-03-13",
    weather: "83F / 57F - Warm",
    events: [
      { time: "6:30 AM", iso: "2026-03-13T06:30:00-05:00", end: "2026-03-13T07:30:00-05:00",
        name: "Run: Town Lake",
        detail: "Full loop (10 mi) or boardwalk (5 mi). 57F, warming fast -- go early. Same trail access: out the back of Fairmont, cross Cesar Chavez, on trail in 2 min. Sunrise ~7:35 AM.",
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
        detail: "Christina arrives midday. Meet at Fairmont (5 min from JW Marriott) or grab food nearby. 2nd St District has good quick options.",
        venue: "", walk: "", cat: "free", url: "", alts: [] },
      { time: "2:30 PM", iso: "2026-03-13T14:30:00-05:00", end: "2026-03-13T15:30:00-05:00",
        name: "The Companies Building Space's Superhighway",
        detail: "In-space robotics, debris cleanup. Pure moonshot. Christina option: Flatstock at Austin Marriott (7 min from Fairmont) -- free poster art, browse while Jon is in session, meet up at 3:30.",
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
        detail: "South By San Jose at Hotel San Jose -- free music from noon, vintage vendors, great vibe. 20 min walk south across Congress bridge (or 5 min Uber). Walk South Congress: shops, food trucks, Allen's Boots. Last chance before dinner -- head back by 5:30. La Condesa is at 400 W 2nd St.",
        venue: "Hotel San Jose (1316 S Congress)", walk: "20 min walk south / 5 min Uber",
        address: "1316 S Congress Ave, Austin, TX 78704",
        cat: "free", url: "", alts: [] },
      { time: "6:00 PM", iso: "2026-03-13T18:00:00-05:00", end: "2026-03-13T20:00:00-05:00",
        name: "Dinner: La Condesa",
        detail: "Modern Mexican. 10 min walk from Fairmont, 10 min walk north from Hotel San Jose. (512) 499-0300",
        venue: "400 W 2nd St", walk: "10 min walk from SoCo / Fairmont",
        address: "400 W 2nd St, Austin, TX 78701",
        phone: "(512) 499-0300",
        website: "https://lacondesa.com/",
        cat: "dining", url: "", alts: [] },
      { time: "8:00 PM", iso: "2026-03-13T20:00:00-05:00", end: "2026-03-13T23:00:00-05:00",
        name: "Evening Options",
        detail: "Free live music, no badge needed:",
        venue: "", walk: "",
        cat: "free", url: "",
        options: [
          { text: "Red River District", note: "Mohawk, Cheer Up Charlies, Swan Dive. 5 min east from La Condesa.", address: "Red River St, Austin, TX 78701" },
          { text: "Congress Ave Block Party", note: "Free drinks/swag. Walk north on Congress from dinner.", address: "Congress Ave, Austin, TX 78701" },
          { text: "Lone Star Roadhouse", note: "East End Ballroom. Live bands + beer market. Free.", address: "" },
          { text: "Fairmont rooftop", note: "Rules & Regs, 7th floor. Cocktails + skyline. If energy is low.", address: "101 Red River St, Austin, TX 78701" },
        ],
        alts: [] },
    ],
  },
  {
    title: "Saturday, March 14",
    subtitle: "Together All Day",
    date: "2026-03-14",
    weather: "85F / 55F - Hot",
    events: [
      { time: "6:30 AM", iso: "2026-03-14T06:30:00-05:00", end: "2026-03-14T07:30:00-05:00",
        name: "Run: Town Lake Boardwalk",
        detail: "4-5 mile boardwalk loop. 55F. Back by 7:30. Same trail: out back of Fairmont, cross Cesar Chavez, on trail in 2 min. Hits 85F later -- don't skip this.",
        venue: "", walk: "", cat: "run", url: "", alts: [] },
      { time: "8:30 AM", iso: "2026-03-14T08:30:00-05:00", end: "2026-03-14T09:30:00-05:00",
        name: "Morning Coffee",
        detail: "Good Things (Fairmont lobby) or Jo's Coffee on SoCo (20 min walk / 5 min Uber). No rush.",
        venue: "", walk: "", cat: "free", url: "", alts: [] },
      { time: "10:00 AM", iso: "2026-03-14T10:00:00-05:00", end: "2026-03-14T11:00:00-05:00",
        name: "The New Lab Partner: AI & Scientific Discovery",
        detail: "AI drug discovery, philosophical questions. Accessible and interesting for both of us. Or sleep in and skip to 11:30.",
        venue: "JW Marriott (Salon D)", walk: "5 min from Fairmont",
        address: "110 E 2nd St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1162244", cat: "session",
        alts: [
          "How to Design a Successful Work Culture (Tier 3, Hilton Salon B, 5 min -- fine but generic)",
          "Sleep in / explore -- skip to 11:30, coffee + stroll, no rush"
        ] },
      { time: "11:30 AM", iso: "2026-03-14T11:30:00-05:00", end: "2026-03-14T12:30:00-05:00",
        name: "10 Breakthrough Technologies of 2026",
        detail: "MIT Tech Review annual list with Niall Firth. RESERVED. DON'T MISS. Accessible greatest-hits format -- good for both of us. Only other option is SAAS Professionals Meet Up (skip).",
        venue: "Hilton (Salon HJK)", walk: "5 min from JW Marriott",
        address: "500 E 4th St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1148587", cat: "session", alts: [] },
      { time: "12:30 PM", iso: "2026-03-14T12:30:00-05:00", end: "2026-03-14T15:00:00-05:00",
        name: "Explore Austin Together",
        detail: "Pick based on energy and heat (85F!):",
        venue: "", walk: "", cat: "free", url: "",
        options: [
          { text: "Flatstock", note: "Austin Marriott, 7 min. Free poster art. Last day Sun.", address: "304 E Cesar Chavez St, Austin, TX 78701" },
          { text: "South By San Jose", note: "Hotel San Jose, 20 min walk / 5 min Uber. Last day of music!", address: "1316 S Congress Ave, Austin, TX 78704" },
          { text: "Barton Springs Pool", note: "Uber 10 min. 68F year-round. Bring towels.", address: "2201 Barton Springs Rd, Austin, TX 78746" },
          { text: "South Congress walk", note: "Shops, vintage stores, Allen's Boots, food trucks.", address: "South Congress Ave, Austin, TX 78704" },
          { text: "Lady Bird Lake trail", note: "2 min from Fairmont. Shady stretches.", address: "" },
          { text: "Rainey Street preview", note: "10 min. Scout for Sunday dinner at Emmer & Rye.", address: "Rainey St, Austin, TX 78701" },
        ],
        alts: [] },
      { time: "4:00 PM", iso: "2026-03-14T16:00:00-05:00", end: "2026-03-14T17:00:00-05:00",
        name: "OpenAI & Spurs: Human-Centered AI",
        detail: "OpenAI + San Antonio Spurs. Fun, accessible. Optional -- skip for more Austin time if preferred. Head back to hotel to freshen up before comedy + dinner.",
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
        detail: "Walk to Esther's Follies area. Grab a drink at a 6th St bar before the comedy show.",
        venue: "6th Street area", walk: "5 min from Fairmont",
        address: "6th Street, Austin, TX 78701",
        cat: "free", url: "", alts: [] },
      { time: "6:00 PM", iso: "2026-03-14T18:00:00-05:00", end: "2026-03-14T19:15:00-05:00",
        name: "The Stand Comedy Club: 10 for 10 Podcast Live",
        detail: "Live comedy podcast showcase. Included with badge. Fits before Kemuri dinner -- show ends ~7:15, Uber to East Austin ~10 min, arrive Kemuri ~7:25. They'll hold the table. Shows we're missing due to dinner: Don't Tell Comedy All Stars (7pm, Creek & Cave) and Funny Or Die Approved (8pm, Esther's). Kemuri is worth it.",
        venue: "Esther's Follies (525 E 6th St)", walk: "5 min from Fairmont",
        address: "525 E 6th St, Austin, TX 78701",
        cat: "comedy", url: "", alts: [] },
      { time: "7:15 PM", iso: "2026-03-14T19:15:00-05:00", end: "2026-03-14T21:00:00-05:00",
        name: "Dinner: Kemuri Tatsu-ya",
        detail: "Texas BBQ x Japanese izakaya. Michelin-recognized. Uber from Esther's ~10 min. After dinner: explore East Austin (East 6th has great bars nearby) or Uber back to Fairmont rooftop (Rules & Regs) for a nightcap. (512) 803-2224",
        venue: "2713 E 2nd St (East Austin)", walk: "Uber from Esther's ~10 min",
        address: "2713 E 2nd St, Austin, TX 78702",
        phone: "(512) 803-2224",
        website: "https://www.kemuri-tatsuya.com/",
        cat: "dining", url: "", alts: [] },
    ],
  },
  {
    title: "Sunday, March 15",
    subtitle: "Together - Last Full Day",
    date: "2026-03-15",
    weather: "80F / 59F - Warm - Sunset 7:40 PM",
    events: [
      { time: "9:00 AM", iso: "2026-03-15T09:00:00-05:00", end: "2026-03-15T10:00:00-05:00",
        name: "Breakfast",
        detail: "Bouldin Creek Cafe (SoCo, great brunch, Uber or 20 min walk) or Good Things (Fairmont lobby). Optional easy 3 mi run on the trail before breakfast.",
        venue: "", walk: "", cat: "free", url: "", alts: [] },
      { time: "10:00 AM", iso: "2026-03-15T10:00:00-05:00", end: "2026-03-15T11:00:00-05:00",
        name: "Beyond AI: The New American Dream",
        detail: "Skilled trades as new upward mobility in the AI age. Interesting contrarian take. Easy walk.",
        venue: "The LINE (111 E Cesar Chavez)", walk: "5 min from Fairmont",
        address: "111 E Cesar Chavez St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1162896", cat: "session",
        alts: [
          "Sleep in / Flatstock (Austin Marriott, last day 10am-5pm, 7 min from Fairmont)",
          "Just relax -- skip to 11:30 Pivot Live"
        ] },
      { time: "11:30 AM", iso: "2026-03-15T11:30:00-05:00", end: "2026-03-15T12:30:00-05:00",
        name: "Pivot Live -- Kara Swisher + Scott Galloway",
        detail: "RESERVED. Arrive early -- this will be packed. Sharp, funny, entertaining for both of us. Only alt is Brains & Bots: Evolving Intelligence Together (JW Marriott -- neuroscience + AI, more technical, less entertaining).",
        venue: "Hilton (Salon C)", walk: "5 min from The LINE",
        address: "500 E 4th St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1162997", cat: "session", alts: [] },
      { time: "12:30 PM", iso: "2026-03-15T12:30:00-05:00", end: "2026-03-15T14:00:00-05:00",
        name: "Lunch",
        detail: "",
        venue: "", walk: "", cat: "free", url: "",
        options: [
          { text: "La Barbecue", note: "Michelin-starred brisket. Can have a line. 15 min walk east / 5 min Uber.", address: "2401 E Cesar Chavez St, Austin, TX 78702" },
          { text: "Cuantos Tacos", note: "Michelin-recognized food truck. Quick and delicious.", address: "" },
          { text: "Flatstock", note: "Last day! Austin Marriott, 7 min from Hilton. Browse + grab food nearby.", address: "304 E Cesar Chavez St, Austin, TX 78701" },
          { text: "Fairmont / 2nd St District", note: "Easy recharge near hotel.", address: "" },
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
        detail: "RESERVED. Timnit Gebru + John Palfrey (MacArthur) + Karen Hao. Heavyweight panel. Unmissable.",
        venue: "JW Marriott (Salon 6-8)", walk: "0 min -- same building",
        address: "110 E 2nd St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1148490", cat: "session",
        alts: [
          "Revolutionizing Astronomy with Big Data (Tier 2, JW Marriott Salon D -- AI + astronomy, same building. Cool but Gebru is unmissable.)"
        ] },
      { time: "5:00 PM", iso: "2026-03-15T17:00:00-05:00", end: "2026-03-15T18:15:00-05:00",
        name: "Congress Ave Bridge at Sunset",
        detail: "Walk south on Congress from JW Marriott (10 min). Bats return mid-March. Sunset ~7:40 PM. Worth a look even if no bats. Great photo spot.",
        venue: "Congress Avenue Bridge", walk: "10 min south from JW Marriott",
        address: "Congress Avenue Bridge, Austin, TX 78701",
        cat: "free", url: "", alts: [] },
      { time: "6:15 PM", iso: "2026-03-15T18:15:00-05:00", end: "2026-03-15T19:15:00-05:00",
        name: "Drinks: Rules & Regs",
        detail: "Fairmont 7th floor rooftop. Pool deck, skyline views. Walk back north from bridge (10 min). Perfect pre-dinner spot.",
        venue: "Fairmont Austin", walk: "10 min north from bridge",
        address: "101 Red River St, Austin, TX 78701",
        cat: "free", url: "", alts: [] },
      { time: "7:15 PM", iso: "2026-03-15T19:15:00-05:00", end: "2026-03-15T21:15:00-05:00",
        name: "Dinner: Emmer & Rye",
        detail: "Seasonal small plates on Rainey Street. 10 min walk south from Fairmont. After dinner: explore Rainey St bars -- houses-turned-bars right on the block. Last night in Austin!",
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
    weather: "~80F / ~58F",
    events: [
      { time: "8:00 AM", iso: "2026-03-16T08:00:00-05:00", end: "2026-03-16T09:00:00-05:00",
        name: "Pack & check bags with Fairmont",
        detail: "Check out is 11am. Leave bags at front desk -- they'll store them. Grab coffee at Good Things (lobby).",
        venue: "Fairmont", walk: "", cat: "logistics", url: "", alts: [] },
      { time: "10:00 AM", iso: "2026-03-16T10:00:00-05:00", end: "2026-03-16T11:00:00-05:00",
        name: "Launch, Land, Orbit: Future of Space with Firefly",
        detail: "RESERVED. Firefly CEO Jason Kim + VP Eng Brigette Oakes. First commercial lunar landing. Moonshot sendoff. Christina can join or enjoy a last coffee at the hotel.",
        venue: "JW Marriott (Salon 1-4)", walk: "5 min from Fairmont",
        address: "110 E 2nd St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1149496", cat: "session",
        alts: [
          "Who Predicts Better? Humans vs AI (Tier 2, JW Marriott Salon E -- forecasting + AI, same building)"
        ] },
      { time: "11:30 AM", iso: "2026-03-16T11:30:00-05:00", end: "2026-03-16T12:30:00-05:00",
        name: "How to Design a Company That AI Can't Outpace",
        detail: "RESERVED. Ian Beacraft on AI-native org design. Only if we delay departure to ~12:45. Otherwise, grab bags and hit the road after Firefly.",
        venue: "Hilton (Salon HJK)", walk: "5 min from JW Marriott",
        address: "500 E 4th St, Austin, TX 78701",
        url: "https://schedule.sxsw.com/2026/events/PP1148488", cat: "session", alts: [] },
      { time: "1:00 PM", iso: "2026-03-16T13:00:00-05:00", end: "2026-03-16T15:30:00-05:00",
        name: "Depart for Houston",
        detail: "I-10 East, ~165 mi, ~2.5 hrs. Arrive ~3:30 PM. Gas up before leaving Austin. Earlier departure option: skip Ian Beacraft 11:30 session, grab bags, on the road by noon.",
        venue: "", walk: "", cat: "logistics", url: "", alts: [] },
    ],
  },
];

const REFERENCE = {
  hotel: {
    name: "Fairmont Austin",
    address: "101 Red River St, Austin, TX 78701",
    checkIn: "March 11, 3:00 PM",
    checkOut: "March 16, 11:00 AM",
    rooftop: "Rules & Regs -- 7th floor, pool deck + skyline views",
    lobby: "Good Things -- coffee + pastries",
  },
  venues: [
    { name: "JW Marriott", address: "110 E 2nd St", walk: "5 min" },
    { name: "Hilton Austin Downtown", address: "500 E 4th St", walk: "5 min" },
    { name: "Austin Marriott Downtown", address: "304 E Cesar Chavez", walk: "7 min" },
    { name: "The LINE", address: "111 E Cesar Chavez", walk: "5 min" },
    { name: "Esther's Follies", address: "525 E 6th St", walk: "5 min" },
    { name: "Creek and the Cave", address: "611 E 7th St", walk: "7 min" },
    { name: "La Condesa", address: "400 W 2nd St", walk: "10 min" },
    { name: "Hotel San Jose", address: "1316 S Congress", walk: "20 min / 5 min Uber" },
    { name: "Kemuri Tatsu-ya", address: "2713 E 2nd St", walk: "10 min Uber" },
    { name: "Emmer & Rye", address: "51 Rainey St", walk: "10 min" },
  ],
  restaurants: [
    { name: "La Condesa", date: "Fri 3/13", time: "6:00 PM", phone: "(512) 499-0300", address: "400 W 2nd St, Austin, TX 78701", cuisine: "Modern Mexican", website: "https://lacondesa.com/" },
    { name: "Kemuri Tatsu-ya", date: "Sat 3/14", time: "7:00 PM", phone: "(512) 803-2224", address: "2713 E 2nd St, Austin, TX 78702", cuisine: "Texas BBQ x Japanese izakaya. Michelin-recognized.", website: "https://www.kemuri-tatsuya.com/" },
    { name: "Emmer & Rye", date: "Sun 3/15", time: "7:15 PM", phone: "", address: "51 Rainey St, Austin, TX 78701", cuisine: "Seasonal small plates on Rainey Street", website: "https://emmerandrye.com/" },
  ],
  foodDrink: {
    coffee: [
      { name: "Good Things", note: "Fairmont lobby. Quick and easy.", address: "" },
      { name: "Jo's Coffee", note: "On SoCo. 20 min walk / 5 min Uber. 'I love you so much' mural.", address: "1300 S Congress Ave, Austin, TX 78704" },
    ],
    breakfast: [
      { name: "Bouldin Creek Cafe", note: "SoCo. Great brunch. 20 min walk / 5 min Uber.", address: "1900 S 1st St, Austin, TX 78704" },
    ],
    lunch: [
      { name: "La Barbecue", note: "Michelin-starred brisket. Can have a line. 15 min walk east / 5 min Uber from Hilton.", address: "2401 E Cesar Chavez St, Austin, TX 78702" },
      { name: "Cuantos Tacos", note: "Michelin-recognized food truck. Quick and delicious.", address: "" },
      { name: "Convention Center food", note: "Quick options between sessions.", address: "" },
      { name: "2nd St District", note: "Near Fairmont. Multiple quick-service options.", address: "" },
    ],
  },
  sanJose: {
    title: "South By San Jose",
    detail: "Hotel San Jose, 1316 S Congress Ave | Mar 12-14 | Noon daily | Free",
    description: "We love this hotel. Music in the parking lot, vintage vendors, great vibe.",
    lineup: "Charlie Sexton Quartet, DeVotchKa, Tune-Yards, Sugaree & Cold Sweat, Sana Sana, Bricknasty, Karma Sheen, The Animeros, The Band Loula, The Sophs, Diles Que No Me Maten, Jo Alice, Next of Kin, Whitelands, Okan, Grocery Bag, Men An Tol, Calder, Angela Autumn, Horsepower, Still Blank, Ella Ion, The Bures Band, Valley Flower",
    highlights: [
      { name: "DeVotchKa", note: "Cinematic indie rock (Little Miss Sunshine soundtrack). Incredible live." },
      { name: "Tune-Yards", note: "Artsy, percussive, high-energy. Merrill Garbus is a force." },
      { name: "Charlie Sexton Quartet", note: "Austin legend. Played guitar with Bob Dylan for 20+ years. Hometown homecoming." },
      { name: "Sana Sana", note: "Latin-influenced Austin band. Great energy." },
      { name: "Next of Kin", note: "Austin locals worth catching." },
    ],
    note: "Day-by-day set times not yet published. Check @hotelsanjose on Instagram day-of. Also features vintage clothing vendors (Sugar Shack Vintage, Richter Goods), jewelry, ceramics, and limited-edition merch.",
    bestTimes: [
      "Thu afternoon -- Jon solo after the Fairmont session. 20 min walk across Congress bridge.",
      "Fri 3:30-5:30 together -- before La Condesa at 6. Walk up Congress to dinner.",
      "Sat early afternoon -- Last day. Part of the 12:30-3:00 exploring block."
    ],
    address: "1316 S Congress Ave, Austin, TX 78704",
  },
  flatstock: {
    title: "Flatstock",
    detail: "Austin Marriott Downtown (304 E Cesar Chavez) | Mar 13-15 | 10am-5pm | Free",
    description: "Handmade, limited-edition concert posters from the world's top gig poster artists. Meet the artists, buy prints.",
    floorMap: "https://sxsw2026-flatstock.expofp.com",
    bestTimes: [
      "Fri 2:30 -- Christina solo while Jon is at Space Superhighway. 7 min from Fairmont. Meet up at 3:30.",
      "Sat 12:30-3:00 -- Together, part of afternoon exploring.",
      "Sun 10:00 -- Last day. Before Pivot Live at 11:30 (Austin Marriott to Hilton is 7 min walk)."
    ],
    address: "304 E Cesar Chavez St, Austin, TX 78701",
  },
  comedy: {
    title: "Comedy Shows (Saturday 3/14)",
    note: "Innovation Badge covers all comedy. Our pick is the 6pm show -- fits before Kemuri dinner.",
    shows: [
      { time: "6:00-7:15 PM", name: "The Stand Comedy Club: 10 for 10 Podcast Live", venue: "Esther's Follies (525 E 6th St)", walk: "5 min", status: "Our pick", note: "Fits before Kemuri dinner" },
      { time: "7:00-8:15 PM", name: "Don't Tell Comedy All Stars", venue: "Creek and the Cave (611 E 7th St)", walk: "7 min", status: "Skip", note: "Conflicts with Kemuri" },
      { time: "8:00-9:15 PM", name: "Funny Or Die Approved", venue: "Esther's Follies", walk: "5 min", status: "Skip", note: "Conflicts with Kemuri" },
    ],
    alsoInTown: "Bill Burr is hosting a showcase (FOX's 'Plantman & Blondie' premiere). Eric Andre and Chelsea Peretti performing at various SXSW comedy events. Check the Comedy schedule for shows on other nights.",
  },
  freeEvents: [
    "Congress Ave Block Party -- daily Mar 12-18, free drinks/swag/food",
    "Lone Star Roadhouse -- East End Ballroom, Mar 13-15, live bands + beer market, free",
    "KUTX @ Rivian Showroom -- 2-5pm, Mar 13-15, local/indie artists",
    "Red River District -- Mohawk, Cheer Up Charlies, Swan Dive, nightly, no badge needed",
    "SXSW Community Concerts -- Auditorium Shores, bring blankets",
    "Unofficial events: RSVPATX.com -- parties, showcases, free food & drinks",
  ],
  austinSpots: [
    { name: "South Congress Ave", note: "Walk the bridge, shops, Allen's Boots, food trucks. Best: Fri/Sat afternoon." },
    { name: "Congress Ave Bridge at Sunset", note: "Bats return mid-March. Sunday evening is ideal (~7:40 sunset)." },
    { name: "Barton Springs Pool", note: "68F year-round. Saturday at 85F could be perfect. Uber 10 min. Bring towels.", address: "2201 Barton Springs Rd, Austin, TX 78746" },
    { name: "Rainey Street", note: "Houses-turned-bars. Sunday dinner at Emmer & Rye is right there. Explore after.", address: "Rainey St, Austin, TX 78701" },
    { name: "Red River Cultural District", note: "Mohawk, Cheer Up Charlies. Free live music nightly." },
    { name: "East Austin", note: "Way more developed now. Kemuri is in the heart of it -- explore after Saturday dinner." },
    { name: "Hotel San Jose", note: "South By San Jose is the perfect excuse to revisit. Vintage courtyard hotel.", address: "1316 S Congress Ave, Austin, TX 78704" },
  ],
  badge: {
    name: "Innovation Badge",
    covers: "All Innovation Conference sessions + all comedy shows",
    doesNot: "Music showcases (need separate wristband)",
    wristbandVerdict: "Don't buy it. Free music options are plentiful: South By San Jose (24 acts), Congress Ave Block Party, Lone Star Roadhouse, Red River District, KUTX @ Rivian. Only compelling wristband case: Alanis Morissette + DJ set from St. Vincent on Saturday -- but Saturday evening is booked (comedy + Kemuri).",
  },
  logistics: {
    uber: "Uber/Lyft surge pricing is rough during SXSW. Walk when possible. Venues requiring Uber: Kemuri (East Austin, ~10 min), Hotel San Jose (S Congress, 5 min Uber or 20 min walk).",
    dst: "Clocks sprang forward Sunday, March 8 -- already on CDT when we arrive. Sunrise ~7:35 AM, Sunset ~7:40 PM. Long evenings.",
    houston: "I-10 East, ~165 miles, ~2.5 hours. Leave by 1pm to arrive ~3:30 PM. Gas up before leaving Austin. Earlier option: skip Ian Beacraft 11:30 session, on the road by noon.",
  },
  keyLinks: [
    { name: "SXSW Schedule", url: "https://schedule.sxsw.com/" },
    { name: "Innovation Badge Guide", url: "https://sxsw.com/badges/2026-sxsw-innovation-conference-attendee-guide/" },
    { name: "Comedy Festival", url: "https://sxsw.com/festivals/comedy/" },
    { name: "Flatstock Floor Map", url: "https://sxsw2026-flatstock.expofp.com" },
    { name: "South By San Jose", url: "https://www.bunkhousehotels.com/hotel-san-jose/south-by-san-jose" },
    { name: "Unofficial Events (RSVPATX)", url: "https://rsvpatx.com" },
    { name: "SXSW GO App", url: "https://sxsw.com/mobile/" },
  ],
  tips: [
    "SXSW GO app for real-time schedule updates",
    "Arrive 15 min early for reserved sessions -- they release unclaimed seats",
    "Badge on at all times",
    "Comfortable shoes -- 15,000+ steps/day",
    "Portable charger",
    "Sunscreen -- 83-85F and lots of outdoor walking between venues",
    "Almost everything is walkable from the Fairmont (5-7 min to most venues)",
  ],
};

// ─── Utility ────────────────────────────────────────────────────────────────

function mapUrl(address) {
  if (!address) return "";
  return "http://maps.apple.com/?daddr=" + encodeURIComponent(address) + "&dirflg=w";
}

const CAT_LABELS = {
  session: "Session", dining: "Dining", comedy: "Comedy",
  run: "Run", free: "Explore", logistics: "Logistics",
};

// ─── Router ─────────────────────────────────────────────────────────────────

function route() {
  const hash = location.hash || "#now";
  const views = { "#now": "now-view", "#schedule": "schedule-view", "#ref": "ref-view" };
  const viewId = views[hash] || "now-view";

  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.querySelectorAll("#tab-bar a").forEach(t => t.classList.remove("active"));

  const view = document.getElementById(viewId);
  if (view) view.classList.add("active");

  const tab = document.querySelector(`#tab-bar a[href="${hash}"]`);
  if (tab) tab.classList.add("active");

  if (hash === "#now") updateNowView();
  if (hash === "#schedule" && !document.querySelector(".day-content")) renderDay(getToday());
}

// ─── Now View ───────────────────────────────────────────────────────────────

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

  let current = null;
  let next = null;

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
      // previous event might still be "current" if we're in the gap
      if (i > 0) {
        const prevEnd = new Date(events[i - 1].end);
        if (now >= prevEnd) current = null; // in a gap
        else current = events[i - 1];
      }
      break;
    }
  }

  // After all events on the entire trip
  if (!current && !next && events.length > 0) {
    const lastEnd = new Date(events[events.length - 1].end);
    if (now >= lastEnd) {
      return { current: null, next: null, status: "done" };
    }
    // Between days or after today's last event — find next day's first event
    for (let i = 0; i < events.length; i++) {
      if (new Date(events[i].iso) > now) {
        return { current: null, next: events[i], status: "active" };
      }
    }
  }

  // Before all events
  if (!current && !next) {
    return { current: null, next: events[0] || null, status: "before" };
  }

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

function eventCard(ev, label) {
  const addr = ev.address || "";
  const mUrl = mapUrl(addr);
  const catClass = "cat-" + (ev.cat || "free");
  const isReserved = ev.detail && ev.detail.includes("RESERVED");

  let html = '<div class="event-card ' + catClass + '">';
  if (label) html += '<div class="card-label">' + label + '</div>';
  html += '<div class="card-time">' + ev.time + '</div>';
  html += '<div class="card-name">' + ev.name + '</div>';
  if (isReserved) html += '<div class="card-reserved">Reserved</div>';
  if (ev.venue) html += '<div class="card-venue">' + ev.venue + '</div>';
  if (ev.walk) html += '<div class="card-walk">' + ev.walk + '</div>';

  // Buttons above detail for one-handed reachability
  const btns = [];
  if (mUrl) btns.push('<a href="' + mUrl + '" class="card-btn">Directions</a>');
  if (ev.url) btns.push('<a href="' + ev.url + '" class="card-btn card-btn-alt">Session Info</a>');
  if (ev.phone) btns.push('<a href="tel:' + ev.phone.replace(/[^+\d]/g, "") + '" class="card-btn card-btn-alt">Call</a>');
  if (ev.website) btns.push('<a href="' + ev.website + '" class="card-btn card-btn-alt">Website</a>');
  if (btns.length) html += '<div class="card-btns">' + btns.join("") + '</div>';

  if (ev.detail) html += '<div class="card-detail">' + ev.detail + '</div>';

  // Structured options (for explore/lunch events with multiple choices)
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

  let html = '';

  // Day summary + weather
  const dayIndex = current ? current.dayIndex : (next ? next.dayIndex : getToday());
  if (dayIndex >= 0 && dayIndex < DAYS.length) {
    const day = DAYS[dayIndex];
    const sessions = day.events.filter(e => e.cat === "session").length;
    const dinners = day.events.filter(e => e.cat === "dining");
    const dinnerText = dinners.length ? dinners.map(d => d.name.replace("Dinner: ", "")).join(", ") : "";
    html += '<div class="day-summary">';
    html += '<span class="summary-badge">Day ' + (dayIndex + 1) + ' of 5</span>';
    html += '<span class="summary-text">' + sessions + ' sessions' + (dinnerText ? " / " + dinnerText : "") + '</span>';
    html += '</div>';
  }

  html += '<div id="weather-bar"></div>';

  if (status === "done") {
    html += '<div class="now-message">Trip complete! Safe travels to Houston.</div>';
  } else if (status === "before" && next) {
    const ms = new Date(next.iso) - now;
    if (ms > 86400000 * 2) {
      const days = Math.ceil(ms / 86400000);
      html += '<div class="now-message">SXSW starts in ' + days + ' days</div>';
    } else {
      html += '<div class="now-countdown">Starts in ' + formatCountdown(ms) + '</div>';
    }
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

    if (next) {
      const ms = new Date(next.iso) - now;
      html += '<div class="now-countdown">Next up in ' + formatCountdown(ms) + '</div>';
      html += eventCard(next, "Next");
    } else if (current) {
      // Find tomorrow's first event
      const ci = current.dayIndex;
      if (ci < DAYS.length - 1) {
        const tmrw = DAYS[ci + 1];
        if (tmrw.events.length) {
          html += '<div class="now-countdown">Tomorrow</div>';
          html += eventCard({ ...tmrw.events[0], dayTitle: tmrw.title }, tmrw.title);
        }
      } else {
        html += '<div class="now-countdown">Last event of the trip!</div>';
      }
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

// ─── Schedule View ──────────────────────────────────────────────────────────

let activeDay = -1;

function getToday() {
  // Use local date, not UTC, to avoid timezone mismatch
  const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in local tz
  for (let i = 0; i < DAYS.length; i++) {
    if (DAYS[i].date === today) return i;
  }
  const now = new Date();
  if (now < new Date(DAYS[0].date)) return 0;
  return DAYS.length - 1;
}

function renderDay(idx) {
  activeDay = idx;
  const day = DAYS[idx];
  const timeline = document.getElementById("day-timeline");
  const now = new Date();
  const todayStr = now.toLocaleDateString("en-CA");

  // Update day tabs with today indicator
  document.querySelectorAll(".day-tab").forEach((t, i) => {
    t.classList.toggle("active", i === idx);
    t.classList.toggle("today", DAYS[i].date === todayStr);
  });

  let html = '<div class="day-content">';
  html += '<div class="day-header">';
  html += '<div class="day-title">' + day.title + '</div>';
  html += '<div class="day-subtitle">' + day.subtitle + '</div>';
  html += '<div class="day-weather">' + day.weather + '</div>';
  html += '</div>';

  day.events.forEach(ev => {
    const addr = ev.address || "";
    const mUrl = mapUrl(addr);
    const catClass = "cat-" + (ev.cat || "free");
    const isPast = new Date(ev.end) < now;
    const isCurrent = now >= new Date(ev.iso) && now < new Date(ev.end);
    const timeClass = isPast ? " past-event" : (isCurrent ? " current-event" : "");
    const isReserved = ev.detail && ev.detail.includes("RESERVED");

    html += '<details class="sched-card ' + catClass + timeClass + '">';
    html += '<summary>';
    html += '<span class="sc-time">' + ev.time + (isReserved ? ' <span class="sc-reserved">Reserved</span>' : '') + '</span>';
    html += '<span class="sc-name">' + ev.name + '</span>';
    if (ev.venue) html += '<span class="sc-venue">' + ev.venue + '</span>';
    if (ev.walk) html += '<span class="sc-walk">' + ev.walk + '</span>';
    html += '</summary>';
    html += '<div class="sc-expand">';
    if (ev.detail) html += '<p class="sc-detail">' + ev.detail + '</p>';

    const btns = [];
    if (mUrl) btns.push('<a href="' + mUrl + '" class="card-btn">Directions</a>');
    if (ev.url) btns.push('<a href="' + ev.url + '" class="card-btn card-btn-alt">Session Info</a>');
    if (ev.phone) btns.push('<a href="tel:' + ev.phone.replace(/[^+\d]/g, "") + '" class="card-btn card-btn-alt">Call</a>');
    if (ev.website) btns.push('<a href="' + ev.website + '" class="card-btn card-btn-alt">Website</a>');
    if (btns.length) html += '<div class="card-btns">' + btns.join("") + '</div>';

    // Structured options (for explore/lunch events)
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

    if (ev.alts && ev.alts.length) {
      if (ev.alts.length > 3) {
        // Collapsible for long lists
        html += '<details class="sc-alts"><summary><strong>Also at this time (' + ev.alts.length + ' options)</strong></summary><ul>';
      } else {
        html += '<div class="sc-alts"><strong>Also at this time:</strong><ul>';
      }
      ev.alts.forEach(a => { html += '<li>' + a + '</li>'; });
      html += '</ul>' + (ev.alts.length > 3 ? '</details>' : '</div>');
    }
    html += '</div></details>';
  });

  html += '</div>';
  timeline.innerHTML = html;

  // Scroll to current/next event if viewing today
  if (day.date === todayStr) {
    const cur = timeline.querySelector(".current-event");
    if (cur) cur.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// ─── Reference View ─────────────────────────────────────────────────────────

function renderReference() {
  const container = document.getElementById("ref-content");
  let html = '';

  // ── Quick Reference ──
  html += '<div class="ref-group-label">Quick Reference</div>';

  // Restaurants first — most referenced during trip
  html += '<details class="ref-section" open>';
  html += '<summary class="ref-title">Dinner Reservations</summary>';
  html += '<div class="ref-body">';
  REFERENCE.restaurants.forEach(r => {
    html += '<div class="ref-restaurant">';
    html += '<strong>' + r.name + '</strong> -- ' + r.date + ' at ' + r.time;
    if (r.cuisine) html += '<div class="ref-cuisine">' + r.cuisine + '</div>';
    html += '<div>' + r.address + '</div>';
    const btns = [];
    btns.push('<a href="' + mapUrl(r.address) + '" class="card-btn">Directions</a>');
    if (r.phone) btns.push('<a href="tel:' + r.phone.replace(/[^+\d]/g, "") + '" class="card-btn card-btn-alt">' + r.phone + '</a>');
    if (r.website) btns.push('<a href="' + r.website + '" class="card-btn card-btn-alt">Website</a>');
    html += '<div class="card-btns">' + btns.join("") + '</div>';
    html += '</div>';
  });
  html += '</div></details>';

  // Hotel
  html += '<details class="ref-section">';
  html += '<summary class="ref-title">Hotel</summary>';
  html += '<div class="ref-body">';
  html += '<div class="ref-item"><strong>' + REFERENCE.hotel.name + '</strong></div>';
  html += '<div class="ref-item">' + REFERENCE.hotel.address + '</div>';
  html += '<div class="ref-item">Check-in: ' + REFERENCE.hotel.checkIn + '</div>';
  html += '<div class="ref-item">Check-out: ' + REFERENCE.hotel.checkOut + '</div>';
  html += '<div class="ref-item">Rooftop: ' + REFERENCE.hotel.rooftop + '</div>';
  html += '<div class="ref-item">Lobby: ' + REFERENCE.hotel.lobby + '</div>';
  html += '<a href="' + mapUrl(REFERENCE.hotel.address) + '" class="card-btn" style="margin-top:8px;display:inline-block">Directions to Fairmont</a>';
  html += '</div></details>';

  // Venues
  html += '<details class="ref-section">';
  html += '<summary class="ref-title">Venue Distances (from Fairmont)</summary>';
  html += '<div class="ref-body"><table class="venue-table"><thead><tr><th>Venue</th><th>Walk</th></tr></thead><tbody>';
  REFERENCE.venues.forEach(v => {
    html += '<tr><td><a href="' + mapUrl(v.address + ", Austin, TX") + '">' + v.name + '</a></td><td>' + v.walk + '</td></tr>';
  });
  html += '</tbody></table></div></details>';

  // Food & Drink
  html += '<details class="ref-section">';
  html += '<summary class="ref-title">Coffee, Breakfast & Lunch</summary>';
  html += '<div class="ref-body">';
  html += '<div class="ref-subhead">Coffee</div>';
  REFERENCE.foodDrink.coffee.forEach(f => {
    html += '<div class="ref-item"><strong>' + f.name + '</strong> -- ' + f.note;
    if (f.address) html += ' <a href="' + mapUrl(f.address) + '" class="ref-link">Directions</a>';
    html += '</div>';
  });
  html += '<div class="ref-subhead">Breakfast</div>';
  REFERENCE.foodDrink.breakfast.forEach(f => {
    html += '<div class="ref-item"><strong>' + f.name + '</strong> -- ' + f.note;
    if (f.address) html += ' <a href="' + mapUrl(f.address) + '" class="ref-link">Directions</a>';
    html += '</div>';
  });
  html += '<div class="ref-subhead">Lunch</div>';
  REFERENCE.foodDrink.lunch.forEach(f => {
    html += '<div class="ref-item"><strong>' + f.name + '</strong> -- ' + f.note;
    if (f.address) html += ' <a href="' + mapUrl(f.address) + '" class="ref-link">Directions</a>';
    html += '</div>';
  });
  html += '</div></details>';

  // Badge & Music Wristband
  html += '<details class="ref-section">';
  html += '<summary class="ref-title">Badge & Music Wristband</summary>';
  html += '<div class="ref-body">';
  html += '<div class="ref-item"><strong>' + REFERENCE.badge.name + '</strong></div>';
  html += '<div class="ref-item">Covers: ' + REFERENCE.badge.covers + '</div>';
  html += '<div class="ref-item">Does NOT cover: ' + REFERENCE.badge.doesNot + '</div>';
  html += '<div class="ref-item"><strong>Music wristband verdict:</strong> ' + REFERENCE.badge.wristbandVerdict + '</div>';
  html += '</div></details>';

  // Tips
  html += '<details class="ref-section">';
  html += '<summary class="ref-title">Tips</summary>';
  html += '<div class="ref-body"><ul>';
  REFERENCE.tips.forEach(t => { html += '<li>' + t + '</li>'; });
  html += '</ul></div></details>';

  // Key Links
  html += '<details class="ref-section">';
  html += '<summary class="ref-title">Key Links</summary>';
  html += '<div class="ref-body">';
  REFERENCE.keyLinks.forEach(l => {
    html += '<div class="ref-item"><a href="' + l.url + '" class="ref-link">' + l.name + '</a></div>';
  });
  html += '</div></details>';

  // Logistics
  html += '<details class="ref-section">';
  html += '<summary class="ref-title">Logistics</summary>';
  html += '<div class="ref-body">';
  html += '<div class="ref-subhead">Getting Around</div>';
  html += '<div class="ref-item">' + REFERENCE.logistics.uber + '</div>';
  html += '<div class="ref-subhead">Daylight Saving Time</div>';
  html += '<div class="ref-item">' + REFERENCE.logistics.dst + '</div>';
  html += '<div class="ref-subhead">Houston Drive (Monday)</div>';
  html += '<div class="ref-item">' + REFERENCE.logistics.houston + '</div>';
  html += '</div></details>';

  // ── Things to Do ──
  html += '<div class="ref-group-label">Things to Do</div>';

  // South By San Jose
  html += '<details class="ref-section">';
  html += '<summary class="ref-title">' + REFERENCE.sanJose.title + '</summary>';
  html += '<div class="ref-body">';
  html += '<div class="ref-item">' + REFERENCE.sanJose.detail + '</div>';
  if (REFERENCE.sanJose.description) html += '<div class="ref-item">' + REFERENCE.sanJose.description + '</div>';
  html += '<div class="ref-subhead">Acts to Watch</div>';
  REFERENCE.sanJose.highlights.forEach(h => {
    html += '<div class="ref-item"><strong>' + h.name + '</strong> -- ' + h.note + '</div>';
  });
  html += '<details class="ref-nested"><summary class="ref-nested-summary">Full Lineup (24 acts)</summary>';
  html += '<div class="ref-item ref-small">' + REFERENCE.sanJose.lineup + '</div>';
  html += '</details>';
  html += '<div class="ref-subhead">Best Times to Go</div><ul>';
  REFERENCE.sanJose.bestTimes.forEach(t => { html += '<li>' + t + '</li>'; });
  html += '</ul>';
  html += '<div class="ref-item">' + REFERENCE.sanJose.note + '</div>';
  if (REFERENCE.sanJose.address) {
    html += '<a href="' + mapUrl(REFERENCE.sanJose.address) + '" class="card-btn" style="margin-top:8px;display:inline-block">Directions</a>';
  }
  html += '</div></details>';

  // Flatstock
  html += '<details class="ref-section">';
  html += '<summary class="ref-title">' + REFERENCE.flatstock.title + '</summary>';
  html += '<div class="ref-body">';
  html += '<div class="ref-item">' + REFERENCE.flatstock.detail + '</div>';
  if (REFERENCE.flatstock.description) html += '<div class="ref-item">' + REFERENCE.flatstock.description + '</div>';
  if (REFERENCE.flatstock.floorMap) html += '<div class="ref-item"><a href="' + REFERENCE.flatstock.floorMap + '" class="ref-link">Interactive Floor Map</a></div>';
  html += '<div class="ref-subhead">Best Times to Go</div><ul>';
  REFERENCE.flatstock.bestTimes.forEach(t => { html += '<li>' + t + '</li>'; });
  html += '</ul>';
  if (REFERENCE.flatstock.address) {
    html += '<a href="' + mapUrl(REFERENCE.flatstock.address) + '" class="card-btn" style="margin-top:8px;display:inline-block">Directions</a>';
  }
  html += '</div></details>';

  // Comedy Shows
  html += '<details class="ref-section">';
  html += '<summary class="ref-title">' + REFERENCE.comedy.title + '</summary>';
  html += '<div class="ref-body">';
  html += '<div class="ref-item">' + REFERENCE.comedy.note + '</div>';
  REFERENCE.comedy.shows.forEach(s => {
    const statusClass = s.status === "Our pick" ? "ref-pick" : "ref-skip";
    html += '<div class="ref-item"><strong>' + s.time + '</strong> -- ' + s.name;
    html += ' <span class="' + statusClass + '">' + s.status + '</span>';
    html += '<br>' + s.venue + ' (' + s.walk + '). ' + s.note + '</div>';
  });
  html += '<div class="ref-item ref-small">' + REFERENCE.comedy.alsoInTown + '</div>';
  html += '</div></details>';

  // Austin Spots
  html += '<details class="ref-section">';
  html += '<summary class="ref-title">Austin Spots to Hit</summary>';
  html += '<div class="ref-body">';
  REFERENCE.austinSpots.forEach(s => {
    html += '<div class="ref-item"><strong>' + s.name + '</strong> -- ' + s.note;
    if (s.address) html += ' <a href="' + mapUrl(s.address) + '" class="ref-link">Directions</a>';
    html += '</div>';
  });
  html += '</div></details>';

  // Free Events
  html += '<details class="ref-section">';
  html += '<summary class="ref-title">Free Events</summary>';
  html += '<div class="ref-body"><ul>';
  REFERENCE.freeEvents.forEach(e => { html += '<li>' + e + '</li>'; });
  html += '</ul></div></details>';

  container.innerHTML = html;
}

// ─── Weather ────────────────────────────────────────────────────────────────

let weatherCache = null;

async function fetchWeather() {
  const bar = document.getElementById("weather-bar");
  if (!bar) return;

  // Check cache (1 hour)
  if (weatherCache && Date.now() - weatherCache.ts < 3600000) {
    bar.innerHTML = weatherCache.html;
    return;
  }

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

    let html = '<div class="weather-now">' +
      '<span class="weather-temp">' + Math.round(cur.temperature_2m) + 'F</span>' +
      '<span class="weather-desc">' + wDesc + '</span>' +
      '<span class="weather-loc">Austin, TX</span>' +
      '</div>';
    if (hi && lo) {
      html += '<div class="weather-range">High ' + hi + 'F / Low ' + lo + 'F</div>';
    }

    weatherCache = { html, ts: Date.now() };
    bar.innerHTML = html;
  } catch {
    // Fall back to static day weather data
    const dayIdx = getToday();
    if (dayIdx >= 0 && dayIdx < DAYS.length) {
      bar.innerHTML = '<div class="weather-now"><span class="weather-temp">' +
        DAYS[dayIdx].weather + '</span></div>';
    }
  }
}

function weatherDesc(code) {
  const map = {
    0: "Clear", 1: "Mostly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Foggy", 48: "Foggy", 51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle",
    61: "Light rain", 63: "Rain", 65: "Heavy rain", 71: "Light snow",
    80: "Rain showers", 81: "Rain showers", 82: "Heavy showers",
    95: "Thunderstorm", 96: "Thunderstorm", 99: "Severe thunderstorm",
  };
  return map[code] || "Clear";
}

// ─── Dark Mode ──────────────────────────────────────────────────────────────

function initDarkMode() {
  const saved = localStorage.getItem("sxsw-dark");
  // Auto-detect system preference on first visit
  if (saved === null && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark");
  } else if (saved === "true") {
    document.documentElement.classList.add("dark");
  }

  document.getElementById("darkToggle").addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("sxsw-dark",
      document.documentElement.classList.contains("dark").toString());
  });
}

// ─── Init ───────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  initDarkMode();
  renderReference();
  startNowUpdates();

  // Day tabs
  document.querySelectorAll(".day-tab").forEach((tab, i) => {
    tab.addEventListener("click", () => renderDay(i));
  });

  window.addEventListener("hashchange", route);
  route();
});
