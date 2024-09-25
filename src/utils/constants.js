export const NAVIGATION_MENUS_VARABLES = [
    {
        menuLabel: 'Summary',
        menuKey: 'Summary'
    },
    {
        menuLabel: 'Chart',
        menuKey: 'Chart'
    },
    {
        menuLabel: 'Statistics',
        menuKey: 'Statistics'
    },
    {
        menuLabel: 'Analysis',
        menuKey: 'Analysis'
    },
    {
        menuLabel: 'Settings',
        menuKey: 'Settings'
    },
]

export const INITIAL_TIME_MENU_FOR_CHARTS = {
    menuLabel: '6m',
    menuKey: '6m',
    menuValue: 180,
}

export const TIME_ACTIONS_ITEMS = [
    {
        menuLabel: '1d',
        menuKey: '1d',
        menuValue: 1,
    },
    {
        menuLabel: '3d',
        menuKey: '3d',
        menuValue: 3,
    },
    {
        menuLabel: '1w',
        menuKey: '1w',
        menuValue: 7,
    },
    {
        menuLabel: '1m',
        menuKey: '1m',
        menuValue: 30,
    },
    {
        menuLabel: '6m',
        menuKey: '6m',
        menuValue: 180,
    },
    {
        menuLabel: '1y',
        menuKey: '1y',
        menuValue: 365,
    },
    {
        menuLabel: '3y',
        menuKey: '3y',
        menuValue: 365*3
    },
    {
        menuLabel: '5y',
        menuKey: '5y',
        menuValue: 365*5
    },
    {
        menuLabel: 'max',
        menuKey: 'max',
        menuValue: 365*8
    },
]

export const INITIAL_TIME_MENU_FOR_STATISTICS = {
    menuLabel: '10y',
    menuKey: '10y',
    menuValue: 10
}

export const TIME_ACTIONS_ITEMS_FOR_STATISTICS = [
    {
        menuLabel: '5y',
        menuKey: '5y',
        menuValue: 5
    },
    {
        menuLabel: '10y',
        menuKey: '10y',
        menuValue: 10
    },
    {
        menuLabel: '15y',
        menuKey: '15y',
        menuValue: 15
    },
    {
        menuLabel: '20y',
        menuKey: '20y',
        menuValue: 20
    },
    {
        menuLabel: '25y',
        menuKey: '25y',
        menuValue: 25
    },
]

export const MARKET_SUMMARY_FOR_APPLE_GOOGLE = {
    "Apple": {
        lastPrice: 273.36,
        week52High: 271.46,
        week52Low: 29.8357,
        marketCap: 2733600000,
        dividendYield: 0.1829089844893181,
        peRatio: 136.68,
    },
    "Google": {
        lastPrice: 120.55,
        week52High: 150.45,
        week52Low: 90.1234,
        marketCap: 1205500000,
        dividendYield: 0.152345,
        peRatio: 28.32,
    },
};

export const YEAR_WISE_COMPANY_FINANCIAL_REPORT = {
    "Apple": [
        { year: 2023, percentage: 15 },
        { year: 2022, percentage: -10 },
        { year: 2021, percentage: 20 },
        { year: 2020, percentage: -10 },
        { year: 2019, percentage: 21 }
    ],
    "Google": [
        { year: 2023, percentage: -15 },
        { year: 2022, percentage: 10 },
        { year: 2021, percentage: -17 },
        { year: 2020, percentage: 10 },
        { year: 2019, percentage: -18 }
    ],
};