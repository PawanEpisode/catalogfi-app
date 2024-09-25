import React from 'react'

import SummaryContent from '../SummaryContent';
import ChartContent from '../ChartContent';
import StatisticsContent from '../StatisticsContent';
import AnalysisContent from '../AnalysisContent';
import SettingsContent from '../SettingsContent';

import './CustomChartDisplay.css';

const CustomChartDisplay = ({currentMenu, chartData,selectedCompanies, fullscreen}) => {
    const getMenuBasedUI = (menu) => { 
        switch(menu) {
            case 'Summary':
                return (
                    <SummaryContent />
                );
            case 'Chart':
                return (
                    <ChartContent 
                        data={chartData} 
                        selectedCompanies={selectedCompanies} 
                        fullscreen={fullscreen}
                    />
                );
            case 'Statistics':
                return (
                    <StatisticsContent />
                );
            case 'Analysis':
                return (
                    <AnalysisContent />
                );
            case 'Settings':
                return (
                    <SettingsContent />
                );
            default:
                <div>Pawan</div>
        }
    }
    return (
        <div className='menu-based-ui-container'>
            {getMenuBasedUI(currentMenu)}
        </div>
    )
}

export default CustomChartDisplay