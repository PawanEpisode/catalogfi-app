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
        
        data.push({
            date: date.toISOString(),
            value: parseFloat(value.toFixed(2))
        });
    }
    return data;
};