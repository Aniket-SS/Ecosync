## EcoSync — Context-Aware Carbon Tracking Platform

### Overview
EcoSync is a high-performance, responsive carbon footprint tracking web application built for the Google Prompt Wars Virtual Challenge 3. 

Moving away from the traditional open-ended conversational AI chatbot archetype, EcoSync introduces a architecture grounded in **deterministic intelligence**. The platform computes exact personal impact footprints using audited public emission benchmarks and utilizes Google's Gemini AI purely as an additive, on-demand data observer and contextualizer.


---

### 🧮 How the Math Works (Deterministic & Auditable)
Every metric processed in EcoSync is auditable, non-generative, and perfectly reproducible. The calculation pipeline relies strictly on the mathematical formula:

$$\text{emissions } (\text{kg } \text{CO}_2\text{e}) = \text{quantity} \times \text{factor}[\text{activity}]$$

#### Tracking Vectors & Benchmarks:
* **Transport:** Maps metrics across Petrol/EV cars, public transit (bus/train), and short-haul aviation using **UK DEFRA 2024** data.
* **Home Energy:** Tracks grid-average electricity and natural gas utility metrics against **US EPA** constants.
* **Diet:** Calculates meal impacts (Beef/Lamb, Vegetarian, Poultry, Vegan) using the landmark **Poore & Nemecek Science LCA dataset**.
* **Shopping:** Accounts for new clothing purchases and general electronics monetary spend via EEIO indices.

---

### 🚀 Quick Start & How to Run
Follow these steps to set up and run EcoSync on your local machine:

**1. Clone the Repository**
```bash
git clone [https://github.com/Aniket-SS/Ecosync.git]
cd Ecosync
```

**2. Install Dependencies**
```bash
npm install
```

**3. Configure Environment Variables**

Create a .env file in the root directory (the same folder as package.json) and add your Gemini API key:
```
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

**4. Run the Development Server**
```bash
npm run dev
```
