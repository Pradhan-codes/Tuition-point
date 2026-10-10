# Design System: TuitionPoint Student and Teacher Dashboards

## 1. Visual Theme & Atmosphere

Use the existing TuitionPoint interface as the visual foundation: calm, clear, and practical for families and tutors checking their next step. Keep the page density balanced, the hierarchy direct, and the motion restrained. Dashboard content should feel like a natural extension of the current search and request pages rather than a separate product.

## 2. Color Palette & Roles

- **Page Canvas** (#f8fafc) — dashboard background.
- **Surface White** (#ffffff) — request, profile, and statistic surfaces.
- **Deep Slate** (#0f172a) — titles and primary values.
- **Muted Slate** (#64748b) — descriptions, labels, and timestamps.
- **Structural Border** (#e2e8f0) — card and control boundaries.
- **TuitionPoint Blue** (#1d4ed8) — primary actions, active states, and links; use the established brand token.
- **Status colors** — preserve the existing amber pending, emerald accepted, and rose rejected badges.

## 3. Typography Rules

- Use the app’s established sans-serif typography tokens and weight-based hierarchy.
- Keep headings compact and body copy readable with relaxed line spacing.
- Use tabular alignment only where it improves comparison of backend-derived counts.
- Avoid adding font downloads or changing global typography for dashboard pages.

## 4. Component Stylings

- **Buttons:** use existing TuitionPoint primary blue and outline treatments; preserve clear disabled and focus states.
- **Cards:** white surfaces, slate borders, and the existing rounded corners. Use elevation only for grouped information.
- **Inputs:** label above controls, inline error text, and existing blue focus treatment.
- **Loading:** skeleton blocks sized to the content they replace.
- **Empty and error states:** concise inline messaging; never fill them with sample content.
- **Request statuses:** reuse the existing pending, accepted, and rejected badge treatment.

## 5. Layout Principles

- Keep dashboard content inside the existing centered max-width container.
- Use a responsive grid for summary values and collapse to one column on narrow screens.
- Keep recent request rows readable without forcing horizontal scrolling.
- Reuse the current header, footer, and mobile bottom navigation.

## 6. Motion & Interaction

- Keep interactions immediate and restrained, consistent with the existing app.
- Do not add continuous animation or new motion dependencies.
- Preserve visible loading, disabled, hover, and focus feedback.

## 7. Anti-Patterns

- Never hardcode request counts, student/teacher identities, profile values, or activity.
- Never present unavailable backend fields as though they exist.
- Never add fake charts, ratings, earnings, or availability.
- Never introduce a new global font, animation library, or state-management library for these pages.
- Never allow dashboard grids, cards, or navigation to overflow the viewport.
