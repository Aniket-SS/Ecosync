# EcoSync — Context-Aware Carbon Tracking Platform

## Challenge 3: Carbon Footprint Awareness Platform Submission

### Overview
EcoSync is a high-performance, responsive, and offline-first carbon footprint tracking web application built for the Google Prompt Wars Virtual Challenge 3. 

Moving away from the traditional open-ended conversational AI chatbot archetype, EcoSync introduces a architecture grounded in **deterministic intelligence**. The platform computes exact personal impact footprints using audited public emission benchmarks and utilizes Google's Gemini AI purely as an additive, on-demand data observer and contextualizer.

---

### 🎨 Design & Aesthetic
EcoSync utilizes a premium **Slate & Indigo** design framework featuring:
* **Dynamic Theming:** Seamless support for Light and Dark mode toggles (dark mode built on slate-950 midnight deep hues).
* **Data Scannability:** Highly polished custom progress rings mapping daily output against predefined target allowances.
* **Custom Micro-Visualizations:** An interactive daily emission bar chart built strictly using responsive inline vector elements to minimize app bundle overhead.

---

### 🧮 How the Math Works (Deterministic & Auditable)
Every metric processed in EcoSync is auditable, non-generative, and perfectly reproducible. The calculation pipeline relies strictly on the mathematical formula:

$$\text{emissions } (\text{kg } \text{CO}_2\text{e}) = \text{quantity} \times \text{factor}[\text{activity}]$$

#### Tracking Vectors & Benchmarks:
* **Transport:** Maps metrics across Petrol/EV cars, public transit (bus/train), and short-haul aviation using **UK DEFRA 2024** data.
* **Home Energy:** Tracks grid-average electricity and natural gas utility metrics against **US EPA** constants.
* **Diet:** Calculates meal impacts (Beef/Lamb, Vegetarian, Poultry, Vegan) using the landmark **Poore & Nemecek (2018) Science LCA dataset**.
* **Shopping:** Accounts for new clothing purchases and general electronics monetary spend via EEIO indices.

---

### 🤖 Additive AI Guidance (The Contextualization Engine)
To protect your production key from automated scraping or payload exploitation, the Gemini engine is restricted to an on-demand environment:
1.  **State Extraction:** The app queries user metrics natively from `localStorage`.
2.  **Context Building:** A highly structured string detailing recent logs, category allocations, and progress limits is compiled.
3.  **Prompt Grounding:** This string is passed to the LLM behind the scenes with strict instructions: *Analyze only what is here; do not invent numbers; keep responses targeted and educational.*
4.  **Graceful Fallbacks:** If the API key is unconfigured or the network goes offline, the core tracking capabilities and math functions remain 100% accessible to the user.

---

### ⚙️ Evaluation Focus Highlights
* **Code Quality & Structure:** Modular React components split cleanly by domain (`src/components/` and `src/pages/`) ensuring extreme maintainability.
* **Security:** Avoids hardcoding critical assets; completely driven by frontend environment variables (`VITE_GEMINI_API_KEY`) to bypass accidental version-control leaks.
* **Accessibility & Edge Constraints:** Inputs include defensive attributes to block invalid futures or negative user values (`max` / `min`). Elements enforce high-contrast standard classes across both rendering states.