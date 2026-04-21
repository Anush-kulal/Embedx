# Design System Document: The Ethereal Dashboard

## 1. Overview & Creative North Star
**Creative North Star: The Breathable Curator**

This design system is a departure from the rigid, grid-locked structures of traditional enterprise software. It is rooted in "Soft Minimalism"—an approach that prioritizes cognitive ease through high-key color palettes, vast white space, and organic, hyper-rounded geometry. 

Instead of using lines to separate ideas, we use **Tonal Depth** and **Intentional Asymmetry**. The goal is to make the interface feel less like a tool and more like a high-end editorial piece. We embrace the "floating" aesthetic, where elements exist in a state of suspended hierarchy, layered like sheets of frosted glass in a brightly lit room.

---

## 2. Color Strategy
Our palette is anchored in a sophisticated "Cool-Pastel" foundation. It utilizes high-brightness surfaces to create an atmosphere of calm and focus.

### The "No-Line" Rule
**Designers are strictly prohibited from using 1px solid borders for sectioning.** 
Boundaries must be defined through:
1.  **Background Shifts:** Transitioning from `surface` (#f8fafb) to `surface-container-low` (#f0f4f6).
2.  **Tonal Transitions:** Using `surface-container` tiers to denote containment.
3.  **Shadow Depth:** Utilizing ambient light to imply an edge rather than drawing one.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine paper. 
*   **Base:** `background` (#f8fafb).
*   **Primary Containers:** `surface-container-lowest` (#ffffff) for high-contrast visibility on cards.
*   **Nested Elements:** If a card contains a sub-section (like the "Current Challenge" in the reference), use `surface-container-high` (#e3e9eb) or a subtle Glassmorphic effect.

### The Glass & Gradient Rule
To prevent the UI from feeling "flat," main CTAs and progress indicators should utilize a signature gradient: 
*   **Primary Gradient:** From `primary` (#006a6e) to `primary-container` (#94f2f7).
*   **Glassmorphism:** For floating overlays (e.g., tooltips, popovers), use `surface-container-lowest` at 80% opacity with a `20px` backdrop-blur.

---

## 3. Typography
We employ a dual-font strategy to balance authoritative headers with highly legible, friendly body text.

*   **Display & Headlines (Plus Jakarta Sans):** These are our "Editorial" anchors. Use `display-lg` and `headline-lg` with tight letter spacing (-0.02em) to create a premium, custom-branded feel.
*   **Body & Titles (Manrope):** Chosen for its geometric balance. Manrope ensures that even at `body-sm` (0.75rem), the dashboard remains accessible and friendly.
*   **Hierarchy Note:** Use `on-surface-variant` (#596063) for secondary labels to create a soft contrast against the primary headings in `on-surface` (#2c3436).

---

## 4. Elevation & Depth
Depth is the primary driver of hierarchy in this system. We avoid "hard" shadows in favor of ambient light simulation.

*   **The Layering Principle:** Avoid shadows on standard cards. Instead, place a `surface-container-lowest` (#ffffff) card on a `surface` (#f8fafb) background. This "Tonal Lift" is cleaner and more modern.
*   **Ambient Shadows:** For floating elements (like the 'You're here!' indicator), use a shadow with a blur of `40px` and an opacity of `6%`, tinted with `on-surface`.
    *   *Formula:* `0px 12px 40px rgba(44, 52, 54, 0.06)`
*   **The Ghost Border:** If a boundary is required for accessibility, use `outline-variant` (#acb3b6) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Status Cards & Progress
*   **Cards:** Use `lg` (2rem) or `xl` (3rem) corner radius. Cards should never have a visible border.
*   **Radar Charts:** Use `primary` (#006a6e) for the data area with a 10% fill opacity. The "web" should be rendered in `outline-variant` at 20% opacity.
*   **Progress Tracking:** Steppers should use the "Pill" shape (`full` radius). Completed states use `primary`, while inactive states use `surface-container-highest`.

### Buttons
*   **Primary:** High-pill (`full` radius), using the `primary` to `primary-container` gradient. Typography should be `label-md` in `on-primary`.
*   **Secondary:** Ghost-style. No background, `primary` text, and a `Ghost Border` on hover only.

### Input Fields
*   **Styling:** Large `md` (1.5rem) corner radius. 
*   **States:** Default background should be `surface-container-low`. On focus, transition to `surface-container-lowest` with a subtle 2px glow in `primary_fixed_dim`.

### Lists
*   **The No-Divider Rule:** Forbid the use of horizontal lines. Separate list items using `8px` of vertical whitespace or by alternating background tones slightly.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical layouts. A card on the left doesn't always need a twin on the right.
*   **Do** leverage "Negative Space" as a functional element to group related components.
*   **Do** use emojis or custom icons to soften the "industrial" feel of data-heavy dashboards.

### Don't:
*   **Don't** use 100% black (#000000) for text. Always use `on-surface` (#2c3436).
*   **Don't** use sharp corners. The minimum radius for any container is `sm` (0.5rem).
*   **Don't** overcrowd containers. If an element feels "tight," increase the padding using the next step in the spacing scale.
*   **Don't** use high-contrast dividers. If you feel the need to "split" a section, use a wider gap of white space instead of a line.

---
*Document end.*