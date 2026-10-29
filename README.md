# Packers and Movers – Move Tracker UI

A modern, responsive **Packers and Movers Move Tracker** web application built with **React JS**, meticulously matching the UI and interactions shown in the CCBP reference designs.

---

## 🌟 Features

### 1. Main Move Tracker View (Matches Screenshot 1)
- **Left Sidebar Navigation**:
  - `MY MOVES` (active indicator with orange-red accent border)
  - `MY PROFILE`, `GET QUOTE`, `LOGOUT`
  - Fully responsive with mobile hamburger toggle and backdrop drawer.
- **Move Route Details**:
  - Origin (`From`) and Destination (`To`) addresses clearly laid out.
  - Interactive circular arrow indicator between locations with elevation shadow.
  - Distinct `Request#` display styled in bold orange-red accent (`#ef4f30`).
- **Quick Move Stats**:
  - 🏠 Property Size (e.g. `1 BHK`, `3 BHK`)
  - 📦 Total Inventory Items (e.g. `34`, `49`)
  - 🛣️ Distance (e.g. `1.7 km`, `5.9 km`)
  - 📅 Formatted Moving Date & Time (e.g. `Nov 06, 2021 at 10:00 pm`)
  - ✏️ Edit date interactive button
  - ☑️ "Is flexible" checkbox state
  - 🔘 Action buttons: **"View move details"** & **"Quotes Awaiting"**
- **Disclaimer Notification**:
  - Triangle alert icon with shifting notice text.

---

### 2. Expanded Move Details View (Matches Screenshot 2)
When the user clicks **"View move details"**:
- **Button State Toggle**: Toggles to **"Hide move details"** and back seamlessly.
- **Additional Information**:
  - Displays house shifting notes and special instructions.
  - **"Edit Additional Info"** action button.
- **House Details**:
  - Subsections for **Existing House Details** and **New House Details**.
  - 3-column breakdown:
    - `Floor No.`
    - `Elevator Available.`
    - `Distance from Elevator / Staircase to truck`
  - **"Edit House Details"** action button.
- **Inventory Details**:
  - Category header with **"Edit Inventory"** action button.
  - Inventory category accordion groups (Furniture, Electronics, Vehicle, Boxes/Trolley, Custom Items).
  - Category count badges reflecting item quantities.
  - Chevron toggle icon (`FaChevronDown` / `FaChevronUp`).

---

### 3. Detailed Inventory Breakdown (Matches Screenshot 3)
When an inventory category accordion is clicked:
- Dynamically renders subcategories (e.g., **Sofa**, **Table**, **Chair**, **Cot**, etc.) in a responsive multi-column grid.
- Displays each item's name (e.g., `1 Seater Sofa`, `Sectional Sofa`, `Centre / Coffee`).
- Highlights selected item variations & materials (e.g., `Wooden`, `Fabric`, `2 Piece`, `Glass, Dismantlable`) in bold subtitle text.
- Displays item quantity aligned to the right in bold font.
- Handles custom items (dimensions, descriptions, and quantities) when present.

---

### 4. Robust API & State Management
- Consumes the live REST API:
  `https://apis2.ccbp.in/packers-and-movers/packers-and-movers-details`
- Complete lifecycle handling:
  - **Loading State**: Clean spinner animation.
  - **Failure / Error State**: Error message with a 1-click **Retry** button.
  - **Offline / Local Fallback**: Seamless fallback support for disconnected environments.
  - **Empty Response Handling**: User-friendly empty state screen.

---

## 📁 Component Architecture

```
src/
├── assets/                  # Static assets & icons
├── components/
│   ├── Sidebar.jsx          # Left vertical navigation
│   ├── MoveCard.jsx         # Card container with route, quick stats & disclaimer
│   ├── MoveRoute.jsx        # Origin, destination & request ID display
│   ├── MoveDetails.jsx      # Expanded move information (Additional Info, House Specs, Inventory)
│   ├── ItemsList.jsx        # Interactive accordion for inventory categories & subcategories
│   ├── LoadingView.jsx      # Spinner loading view
│   ├── FailureView.jsx      # Error banner with retry mechanism
│   └── EditModal.jsx        # Interactive edit modal for house specs, notes & dates
├── utils/
│   └── formatters.js        # Date parsing, inventory counting & variation extractors
├── App.jsx                  # Main application state & API integration
├── App.css                  # High-fidelity pixel-perfect styles
├── index.css                # Base reset & typography
└── main.jsx                 # React root entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+ recommended, tested on v24)
- npm (v8+ recommended)

### Installation
Clone or navigate to the project directory:
```bash
cd production-ready
```

Install the dependencies:
```bash
npm install
```

### Running Locally (Development Mode)
Start the Vite development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### Production Build
Create an optimized production bundle:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```
