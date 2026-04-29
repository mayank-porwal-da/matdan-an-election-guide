# मतदान (Matdan) — Detailed Project Overview

Matdan is a high-fidelity civic-tech educational platform designed to empower Indian citizens with knowledge about the world's largest democratic process and the legislative framework of Parliament.

## 🏛️ Project Architecture & Evaluation

### 1. Vertical: Civic Technology & Education
The app addresses the "information gap" in the Indian electoral process. By gamifying the journey into 7 stages (Election) and 4 stages (Parliament), it transforms complex constitutional procedures into an engaging, interactive experience.

### 2. Approach and Logic
- **Stage-Based Engine:** A modular data-driven architecture allows for easy expansion (e.g., the "Parliament 101" vertical was added without changing core components).
- **Local Persistence:** Uses `localStorage` to save progress and quiz scores, allowing users to "Resume Journey" across sessions.
- **AI-Native Context:** Each stage feeds a custom `systemPrompt` to the Gemini API, ensuring the "Mitra" assistant acts as a restricted, subject-matter expert for that specific topic.

### 3. Google Services Integration
- **Gemini 1.5 Flash:** Powers the real-time "Mitra" AI guide with specialized context for every stage of the election and parliament.
- **Firebase Firestore:** Provides a real-time, global "Voter Pledge" counter. This demonstrates serverless architecture and real-time community engagement.
- **Google Fonts:** Utilizes `Inter` and `Playfair Display` for a sophisticated, editorial design language.

---

## 💎 Evaluation Focus Areas

### 🛠️ Code Quality
- **Centralized Types:** All domain entities are defined in `src/types.ts` to ensure consistency.
- **Custom Hooks:** Logic for Progress, Quiz, and Chat is encapsulated in reusable hooks, separating UI from state management.
- **Component-Driven UI:** Components like `StageCard` and `ProgressBar` are highly modular and pure.

### 🔒 Security
- **Hardened Firestore Rules:** Implemented "Fortress" rules that enforce:
    - **Monotonicity:** Counter increments must be exactly +1.
    - **Integrity:** `updatedAt` must be a server-side timestamp.
    - **Identity:** No-list/no-delete policies to prevent scraping or data destruction.
- **Credential Safety:** The app includes a dedicated flow for users to provide their own Gemini API keys, which are stored locally and never exposed on the server.

### ⚡ Efficiency
- **Bundle Optimization:** Uses Vite for fast builds and HMR.
- **Resource Management:** Real-time listeners (`onSnapshot`) are cleaned up using `useEffect` returns to prevent memory leaks.
- **Animations:** Uses `motion/react` (Framer Motion) for hardware-accelerated transitions that don't tax the CPU.

### 🧪 Testing
- **Suite of Tests:** Includes full test coverage for hooks (`useChat`, `useProgress`), domain logic (`ElectionDates`, `PledgeCounter`), and major UI screens.

### ♿ Accessibility
- **Semantic HTML:** Proper use of header, main, and section tags.
- **ARIA Standards:** Icon-only buttons (like settings and navigation) are equipped with `aria-label` for screen readers.
- **Visual Contrast:** High-contrast dark theme (India Midnight) meets WCAG standards for readability.

---

## 🛠️ Tech Stack
- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Animation:** Framer Motion
- **Backend/DB:** Firebase Firestore
- **AI:** Google Gemini API
- **Icons:** Lucide React
