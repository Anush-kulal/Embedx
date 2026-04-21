---
name: Serene Health
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434653'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737784'
  outline-variant: '#c3c6d5'
  surface-tint: '#1d59c1'
  primary: '#003c90'
  on-primary: '#ffffff'
  primary-container: '#0f52ba'
  on-primary-container: '#bcceff'
  inverse-primary: '#b0c6ff'
  secondary: '#4f6169'
  on-secondary: '#ffffff'
  secondary-container: '#d2e6ef'
  on-secondary-container: '#55676f'
  tertiary: '#880005'
  on-tertiary: '#ffffff'
  tertiary-container: '#b40009'
  on-tertiary-container: '#ffbfb6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#b0c6ff'
  on-primary-fixed: '#001945'
  on-primary-fixed-variant: '#00419c'
  secondary-fixed: '#d2e6ef'
  secondary-fixed-dim: '#b6cad2'
  on-secondary-fixed: '#0b1e24'
  on-secondary-fixed-variant: '#374951'
  tertiary-fixed: '#ffdad5'
  tertiary-fixed-dim: '#ffb4aa'
  on-tertiary-fixed: '#410001'
  on-tertiary-fixed-variant: '#930005'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-lg:
    fontFamily: Manrope
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  margin-mobile: 20px
  gutter: 12px
---

## Brand & Style

The brand personality of this design system is rooted in **empathy, reliability, and clarity**. It is designed for users who may be in high-stress situations, requiring a UI that feels like a calm, guiding hand rather than a complex tool. The aesthetic prioritizes cognitive ease and accessibility to ensure information is digestible at a glance.

The chosen style is **Corporate Modern with a Soft Edge**. It leverages the structural integrity of HIG-inspired layouts but softens them with generous white space and subtle tonal shifts. This approach fosters a sense of professional medical authority while remaining approachable and non-intimidating. 

The emotional response should be one of "controlled calm"—users should feel that their data is secure and help is always within immediate reach.

## Colors

This design system utilizes a high-trust palette dominated by blue hues.
- **Primary Blue (#0F52BA):** A deep "Sapphire" blue used for core actions, branding, and active states. It represents stability and medical professionalism.
- **Secondary Blue (#E1F5FE):** A "Sky" tint used for large background surfaces and container fills to reduce visual fatigue.
- **SOS Red (#FF3B30):** A high-vibrancy, high-visibility red reserved exclusively for emergency features and critical alerts. 
- **Neutrals:** A range of cool grays and pure whites are used to maintain a clinical, clean environment.

Backgrounds default to white or very light off-white to maximize readability and create a "breathable" interface.

## Typography

Typography is centered on **accessibility and legibility**. 
- **Manrope** is used for headlines to provide a modern, geometric, and friendly touch. Its open apertures ensure readability even at smaller sizes.
- **Public Sans** is the workhorse for body and label text. As a font designed for government and institutional clarity, it provides the "official" and "trustworthy" tone necessary for medical records and instructions.

Hierarchy is established through weight and scale. Headlines use a tighter letter-spacing for a modern look, while labels use increased letter-spacing to ensure distinctiveness in navigation and forms.

## Layout & Spacing

This design system uses a **Fluid Grid** model optimized for mobile devices. The rhythm is based on a **4px baseline grid** to ensure mathematical harmony across all elements.

- **Margins:** Standard mobile screens utilize a 20px side margin to keep content away from the bezel and prevent accidental touches.
- **Gutters:** A 12px gutter is used between cards or columns to maintain a compact but legible density.
- **Vertical Rhythm:** Generous vertical spacing (24px to 32px) is used between sections to help the user focus on one piece of information at a time.

## Elevation & Depth

To maintain a clean and medical feel, this design system avoids heavy, dark shadows. Instead, it utilizes **Tonal Layers** and **Ambient Shadows**:

1.  **Surface Tiers:** The primary background is the lowest level. Cards and containers sit one level above, distinguished by a subtle 1px border in a soft blue-gray or a very soft, diffused shadow.
2.  **Ambient Shadows:** For elevated elements like floating action buttons (FAB) or SOS buttons, use shadows with a large blur radius (16px+), low opacity (8-10%), and a slight blue tint (#0F52BA at 10% alpha) to maintain the color story.
3.  **Active States:** Interactive elements like pressed buttons use a slight inner shadow or a color shift to indicate tactile feedback without breaking the flat aesthetic.

## Shapes

The shape language is **Softly Rounded**. This avoids the "aggressive" feel of sharp corners and the "juvenile" feel of fully pill-shaped components. 

- **Cards & Primary Containers:** Use a 1rem (16px) radius to feel substantial and safe.
- **Buttons & Input Fields:** Use a 0.5rem (8px) radius for a precise, functional look.
- **Icons:** Use rounded caps and joins to match the friendly UI character.

## Components

- **SOS Button:** A prominent, circular button with a heavy "High-Visibility Red" fill. It should feature a pulsing animation or subtle glow to indicate its life-saving priority.
- **Primary Buttons:** Solid "Primary Blue" fills with white text. Height should be a minimum of 56px to ensure a large touch target for accessibility.
- **Secondary Buttons/Chips:** Ghost buttons with "Primary Blue" outlines or light "Secondary Blue" fills. Used for non-critical filtering or navigation.
- **Input Fields:** Outlined with a soft gray border that turns "Primary Blue" on focus. Labels sit permanently above the field for constant context.
- **Cards:** White backgrounds with a very thin #E1F5FE border. Information inside cards should be grouped using clear headline-sm and body-md styles.
- **Icons:** Line-based icons with a 2px stroke width. All stroke ends should be rounded. Use "Primary Blue" for active icons and a medium gray for inactive states.
- **Health Indicators:** Use a simplified "Traffic Light" system for health status (Green: Normal, Yellow: Caution, Red: SOS/Action Required), ensuring icons accompany the colors for colorblind accessibility.