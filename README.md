# Market Summary App ( React + Vite )

Welcome to the Market Summary Application, a financial data dashboard where users can:

- View real-time financial metrics, like currency or stock prices.
- Visualize data over different time periods (1 day, 1 week, 1 month, etc.).
- See detailed statistics like price changes, percentages, or trends over time.
- Interact with the chart, switching between time frames or comparing multiple datasets.

## Table of Contents
- [Market Summary App ( React + Vite )](#market-summary-app--react--vite-)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Application Structure](#application-structure)
    - [Deployment](#deployment)

## Getting Started

### Installation
1. Clone the repository: `git clone https://github.com/PawanEpisode/catalogfi-app.git`
2. Change into the project directory: `cd catalogfi-app`
3. Install dependencies: `npm install`

### Usage
1. Start the development server: `npm run dev`
2. Open your browser and navigate to `http://localhost:5173/` to view the app.

### Application Structure
- `main.jsx` is the starting point for starting the application.
- `App.jsx` is the Global Parent Component wrapping up the application UI and logic.
- `package.json` is the JSON representation of all the packages that we need to build this application.
- `tailwind.config.js` file is the configuration file for the tailwind environment of the application.
1. All the assets, component files, css files as well as constants and helper functions residing in `src` folder
2. `assets` folder contains all the assets like images and icons.
3. `components` folder contains all the components like :
   - `AnalysisContent Component`
   - `ChartContent Component`
   - `CompareSelector Component`
   - `CustomActionButton Component`
   - `CustomChartDisplay Component`
   - `CustomNavigationMenu Component`
   - `CustomPrice Component`
   - `SettingsContent Component`
   - `StatisticsContent Component`
   - `SummaryContent Component`
4. `contexts` folder contains themeContext 
5. `utils` folder contains `constants.js` file and `helperFunctions.js` file

### Deployment
1. Open your browser and navigate to `https://catalogfi-app.vercel.app/` to view the app.