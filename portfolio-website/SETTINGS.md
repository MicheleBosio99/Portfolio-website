# Portfolio Customization Guide

This guide will help you customize your portfolio to make it truly yours. All changes are simple and clearly marked in the code.

---

## 🎨 Changing Colors

**Location:** `src/index.css` (lines 1-9)

```css
:root {
  --bg-primary: #1a1a1a;      /* Main background color */
  --bg-secondary: #242424;     /* Cards and containers */
  --bg-tertiary: #2d2d2d;      /* Hover states and highlights */
  --text-primary: #f0f0f1;     /* Main text color */
  --text-secondary: #b0b0b0;   /* Secondary text (descriptions) */
  --accent: #4a9eff;           /* Accent color (buttons, links) */
  --border: #3a3a3a;           /* Border color */
}
```

**How to change:**
- Replace any hex color code with your preferred color
- Use a color picker tool (like Google's) to find hex codes
- Keep contrast high for readability (light text on dark backgrounds)

**Recommended color schemes:**
- **Purple theme:** `--accent: #a855f7`
- **Green theme:** `--accent: #10b981`
- **Orange theme:** `--accent: #f59e0b`
- **Pink theme:** `--accent: #ec4899`

---

## 🖼️ Changing Background Effects

**Location:** `src/App.tsx` (lines 19-21)

```typescript
// Options: 'donut' | 'code' | 'hex' | 'neural' | 'retro' | 'none'
const ACTIVE_BACKGROUND: 'donut' | 'code' | 'hex' | 'neural' | 'retro' | 'none' = 'donut';
```

**Available backgrounds:**
- `'donut'` - ASCII donuts spinning around (nerdy, unique)
- `'code'` - Floating code snippets (professional, portfolio-relevant)
- `'hex'` - Hexagonal grid with mouse interaction (modern, tech-feel)
- `'neural'` - Neural network nodes and connections (AI-themed)
- `'retro'` - CRT terminal effect with scanlines (retro, nostalgic)
- `'none'` - No background (clean, minimal)

**How to change:**
Simply replace `'donut'` with your preferred option from the list above.

---

## 📏 Adjusting Sizes

### Main Window Width
**Location:** `src/App.css` (lines 18-20)

```css
.main-window {
  width: 60%;              /* Current: 60% of screen */
  min-width: 700px;        /* Minimum width */
  max-width: 900px;        /* Maximum width */
}
```

**Recommendations:**
- Smaller (50-55%): More spacious, more background visible
- Larger (65-70%): More content space, less background

### Sidebar Width
**Location:** `src/components/Sidebar.css` (line 2)

```css
.sidebar {
  width: 280px;  /* Change this number */
}
```

### Font Sizes
**Location:** Various component CSS files

Main headings are typically `2.5rem` - adjust in each component's CSS:
- `Home.css` - line 15
- `Projects.css` - line 6
- `Skills.css` - line 6
- `Timeline.css` - line 6
- `Contact.css` - line 6

---

## ✨ Enabling/Disabling Effects

### Skills Page Effects

**Wave Effect** - Tags nearby bounce when you hover one
**Location:** `src/components/Skills.tsx` (lines 25-40)

To disable: Comment out or delete these lines:
```typescript
// Wave effect - find nearby tags
const allTags = container.querySelectorAll('.skill-tag');
// ... (delete up to line 40)
```

**Particle Effect** - Dots emit when hovering tags
**Location:** `src/components/Skills.tsx` (line 43 and function at lines 47-68)

To disable: Comment out this line:
```typescript
// createParticles(e.clientX, e.clientY);
```

To adjust particle count:
```typescript
const particleCount = 8;  /* Change this number (1-20) */
```

### Skill Tag Animations

**Fade-in on load**
**Location:** `src/components/Skills.css` (lines 147-158)

To disable: Remove the `animation` property from `.skill-category` and `.skill-tag`

**Pulsing category icons**
**Location:** `src/components/Skills.css` (line 48)

To disable: Remove `animation: pulse 2s ease-in-out infinite;`

---

## 🎯 Personal Information

### Sidebar Profile
**Location:** `src/components/Sidebar.tsx`

- Line 13: Profile image URL
- Line 17: Your name
- Line 18: Your occupation/title
- Lines 24-27: About me text
- Lines 35-50: Social media links (GitHub, LinkedIn)

### Contact Information
**Location:** `src/components/Contact.tsx`

- Line 78: Email address (2 places)
- Line 84: Phone number (2 places)
- Line 90: Location

### Home Page Stats
**Location:** `src/components/Home.tsx` (lines 22-35)

Change the numbers and labels:
```typescript
<h3>5+</h3>
<p>Years Experience</p>
```

---

## 📂 Project Data

**Location:** `src/data/projects.ts`

Add, remove, or edit projects in the array. Each project has:
```typescript
{
  id: 1,                    // Unique number
  title: 'Project Name',    // Display name
  image: 'URL',             // Image URL (use placeholder or your own)
  link: '#',                // Where clicking goes
  category: 'Web'           // Category for filtering
}
```

**Categories available:** `'Web'`, `'Mobile'`, `'Design'`, `'Other'`

To add a new category:
1. Edit line 1: Add to the type definition
2. Edit `Projects.tsx` line 9: Add to the categories array

---

## 📅 Timeline Content

**Location:** `src/components/Timeline.tsx` (lines 12-33)

Add your own timeline items:
```typescript
{
  year: '2024',                          // Year or date
  title: 'Your Achievement',             // Title
  description: 'What you did...',        // Description
  category: 'work'                       // 'education', 'work', or 'achievement'
}
```

---

## 🎨 Background Customization

### ASCII Donuts
**Location:** `src/backgrounds/AsciiDonut.tsx`
- Line 15: Change `20` to adjust number of donuts (10-30 recommended)
- Line 20: Adjust opacity (0.1-0.4 range)

### Code Snippets
**Location:** `src/backgrounds/CodeSnippets.tsx`
- Lines 7-26: Edit the code snippets (add your favorite lines)
- Line 32: Change `25` to adjust number of snippets

### Hex Grid
**Location:** `src/backgrounds/HexGrid.tsx`
- Line 17: `hexSize = 30` - Change size of hexagons (20-50)
- Line 49: Mouse interaction radius (currently 200)

### Neural Network
**Location:** `src/backgrounds/NeuralNetwork.tsx`
- Line 24: `nodeCount = 50` - Number of nodes (30-100)
- Line 71: Connection distance (currently 150)

### Retro Terminal
**Location:** `src/backgrounds/RetroTerminal.css`
- Line 31: Scanline density (change `2px` to `3px` or `4px` for thicker lines)
- Line 42: Flicker speed (`0.15s` - lower = faster)

---

## 🚀 Quick Start Checklist

1. **Colors:** Change `--accent` in `src/index.css`
2. **Background:** Pick one in `src/App.tsx` line 21
3. **Profile:** Update name, image, occupation in `src/components/Sidebar.tsx`
4. **Projects:** Edit `src/data/projects.ts`
5. **Contact:** Update email, phone in `src/components/Contact.tsx`
6. **Timeline:** Add your milestones in `src/components/Timeline.tsx`

---

## 💡 Tips

- **Test changes:** Run `npm run dev` to see changes in real-time
- **Browser refresh:** Some changes need a manual refresh (Ctrl+R)
- **Color contrast:** Use tools like WebAIM to check text readability
- **Image sizes:** Profile image should be square (recommended: 300x300px)
- **Performance:** If backgrounds lag, try `'none'` or `'retro'` (lightest)

---

## ❓ Common Questions

**Q: How do I change the navbar position?**
A: The navbar is now inside the main window (top of it). To move it, you'd need to restructure `App.tsx`.

**Q: Can I add more pages?**
A: Yes! Add a new component, import it in `App.tsx`, add it to the `renderPage()` function, and add a nav link.

**Q: Why isn't my background showing?**
A: Make sure you set `ACTIVE_BACKGROUND` in `App.tsx` and it's not set to `'none'`.

**Q: How do I disable ALL animations?**
A: Remove or comment out all `animation:` properties in CSS files. Search for `@keyframes` and remove those sections.

---

## 🎓 Need More Help?

- Check component files in `src/components/` for specific sections
- CSS files control all styling (colors, sizes, spacing)
- TSX files control content and behavior
- Data files (`src/data/`) store your content

Remember: Always save files and refresh your browser to see changes!
