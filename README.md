# DSA Mastery Platform — Interactive Technical Book

A premium, interactive technical book platform designed to teach Data Structures and Algorithms through guided reading, clear code constructs, and interactive dry-runs. 

The user interface follows a **warm paper textbook aesthetic** that is minimal, distraction-free, and designed for comfortable, long-form reading.

---

## 🎨 Theme & Design Philosophy

Designed to resemble a high-quality printed programming textbook:
- **Paper Palette**: Warm off-white background (`#FAF8F2`), charcoal headings/body (`#2B2B2B`), and muted details (`#555555`).
- **Typography**: Clean serif fonts (**Merriweather** for headings and **Crimson Pro** for body text) optimized for digital reading. Monospace (**JetBrains Mono**) is used for code snippets.
- **Textbook Annotations**: Uses subtle, pastel highlighter colors (yellow, blue, emerald, purple) for difficulty badges, milestones, and callout warnings rather than heavy neon dashboards.
- **Minimal Layout**: Spacing and thin divider rules (`#DDD7CC`) structure the content naturally. Zero heavy rounded corners, reflections, or gaming animations.

---

## 🛠️ Technology Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data**: Static JSON structure (designed to easily swap to MDX or API backend in the future)

---

## 📂 Project Architecture

The codebase follows Clean Architecture principles:

```
DSA_DEMI_GOD/
├── src/
│   ├── app/                        # Next.js App Router Pages
│   │   ├── globals.css             # Main styling, custom scrollbars, and paper variables
│   │   ├── layout.tsx              # Root HTML wrapper shell
│   │   ├── page.tsx                # Roadmap dashboard entrypoint
│   │   └── learn/                  # Subject course reading layouts
│   │       └── [subjectId]/
│   │           └── [lessonId]/
│   │               └── page.tsx    # Dynamic lesson compiler page
│   │
│   ├── domain/                     # Business Logic & Interfaces
│   │   └── models/
│   │       ├── roadmap.ts          # Learning level roadmap interfaces
│   │       └── subject.ts          # Curriculum chapters & lessons types
│   │       └── lesson.ts           # Markdown block nodes types
│   │
│   ├── infrastructure/             # Datasets & Static Content
│   │   └── data/
│   │       ├── roadmap.json        # Main course levels (Fundamentals to Demi God)
│   │       ├── curriculum.json     # 11-module outline chapters list for C++
│   │       └── lessons/
│   │           └── fundamentals/   # Interactive lesson content blocks JSONs
│   │               ├── intro-to-programming.json
│   │               ├── variables.json
│   │               ├── data-types.json
│   │               └── functions.json
│   │
│   └── presentation/               # UI Components
│       └── components/
│           ├── roadmap/            # Dashboard level cards & progress bars
│           └── learn/              # Reading sidebar panels, copy headers, scroll-spy TOC
```

---

## 🚀 How to Run Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```

3. **Navigate to the Local Host**:
   - Open your browser to [http://localhost:3000](http://localhost:3000) to view the course roadmap.
   - Click **Start Learning** on the **Fundamentals** level to enter the interactive textbook interface.
