export const getFunctionNameBasedOnTimeMenu = (menu) => {
    switch(menu) {
        case '1d':
            return 'TIME_SERIES_DAILY';
        case '3d':
            return 'TIME_SERIES_DAILY';
        case '1w':
            return 'TIME_SERIES_WEEKLY';
        case '1m':
            return 'TIME_SERIES_MONTHLY';
        case '6m':
            return 'TIME_SERIES_MONTHLY';
        case '1y':
            return 'TIME_SERIES_MONTHLY';
        case '3y':
            return 'TIME_SERIES_MONTHLY';
        case '5y':
            return 'TIME_SERIES_MONTHLY';
    }
}

export const generateYearlyDummyData = (years = 10, initialValue = 100, volatility = 10) => {
    const data = [];
    let value = initialValue;

    for (let i = 0; i < years; i++) {
        const year = new Date().getFullYear() - (years - i);
    
        // Generate a percentage change based on volatility
        const percentageChange = (Math.random() - 0.5) * volatility;
        value = value + (value * (percentageChange / 100));

        // Ensure value stays positive
        value = Math.max(value, 0);
        // Store the year and percentage change for this data point
        data.push({
            year: year,
            percentageChange: parseFloat(percentageChange.toFixed(2)),
            value: parseFloat(value.toFixed(2))
        });
    }

    return data;
};

export const generateDummyData = (days, initialValue, volatility = 1) => {
    const data = [];
    let value = initialValue;
    const hoursPerDay = 24;
    const totalHours = days * hoursPerDay;
    
    for (let i = 0; i < totalHours; i++) {
        const hourOfDay = i % hoursPerDay;
        let hourlyVolatility = volatility * (hourOfDay >= 9 && hourOfDay < 16 ? 1.5 : 0.5);
        
        value += (Math.random() - 0.5) * hourlyVolatility;
        value = Math.max(value, 0);
        
        const date = new Date();
        date.setHours(date.getHours() - totalHours + i);

        // Generate volume data
        let volume;
        if (hourOfDay >= 9 && hourOfDay < 16) {
            // Higher volume during "market hours"
            volume = Math.floor(Math.random() * 10000) + 5000;
        } else {
            // Lower volume outside "market hours"
            volume = Math.floor(Math.random() * 2000) + 1000;
        }
        
        // Add some randomness to volume
        volume *= (0.5 + Math.random());
        
        data.push({
            date: date.toISOString(),
            value: parseFloat(value.toFixed(2)),
            volume: Math.floor(volume)
        });
    }
    return data;
};

// Helper function to format large numbers (e.g., market cap)
export const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};