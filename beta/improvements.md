# Beta App Design Improvements

Three design agents reviewed the app (March 10, 2026). Each brought a different lens:
- **Information Architecture**: hierarchy, scannability, cognitive load
- **Mobile Interaction**: touch targets, feedback, thumb-zone friendliness
- **Visual Rhythm**: spacing consistency, color system, depth hierarchy

## Zero Risk (CSS only)

- [x] **1. Alt card darker background** — `#ededf0` light / `#1e1e34` dark, demote `.alt-name` to `var(--text-secondary)`. Creates clear "recessed tray" for options vs chosen event.
- [x] **4. More breathing room in alts section** — increase margin-top to 20px, padding-top to 16px, header margin-bottom to 12px.
- [x] **5. Tighten schedule summary hierarchy** — `.sc-venue` to 13px/400/tertiary, `.sc-time` to 13px/700 with letter-spacing.
- [x] **9. Dark-mode Now-view category labels** — add overrides matching schedule badge lighter tints (#60a5fa, #fb923c, etc.).
- [x] **10. Header-to-content gradient shadow** — subtle 8px gradient below header in light mode only.
- [x] **11. Last schedule card bottom margin** — 24px instead of 8px for breathing room above tab bar.

## Minimal Risk (small JS or CSS with caveats) — ON HOLD

- [ ] **3. Swap buttons to 44px min-height** — currently 36px, below Apple HIG minimum. CSS only but affects layout.
- [ ] **6. Swap confirmation animation** — 150ms setTimeout wrapper around renderDay(). Trivially reversible but slightly fiddly.
- [ ] **7. Double-tap day tab scrolls to current event** — adds an if-branch in click handler. Clean.
- [ ] **8. Scroll-snap on reference pills and day tabs** — pure CSS but can feel janky on older iOS.

## Needs Design Decision — ON HOLD

- [ ] **2. Differentiate swapped-card ring from current-event ring** — both use identical 2px box-shadow. Options: different ring weights (safe) or different visual patterns (changes semantic conventions).
