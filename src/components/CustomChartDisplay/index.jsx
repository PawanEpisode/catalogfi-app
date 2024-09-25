import React from 'react'

import SummaryContent from '../SummaryContent';
import ChartContent from '../ChartContent';
import StatisticsContent from '../StatisticsContent';
import AnalysisContent from '../AnalysisContent';
import SettingsContent from '../SettingsContent';

import './CustomChartDisplay.css';

const CustomChartDisplay = ({currentMenu,statisticsData, chartData,selectedCompanies, fullScreen}) => {
    const getMenuBasedUI = (menu) => { 
        switch(menu) {
            case 'Summary':
                return (
                    <SummaryContent selectedCompanies={selectedCompanies}/>
                );
            case 'Chart':
                return (
                    <ChartContent 
                        data={chartData} 
                        selectedCompanies={selectedCompanies} 
                        fullscreen={fullScreen}
                    />
                );
            case 'Statistics':
                return (
                    <StatisticsContent 
                        data={statisticsData}
                        selectedCompanies={selectedCompanies}
                        fullscreen={fullScreen}
                    />
                );
            case 'Analysis':
                return (
                    <AnalysisContent selectedCompanies={selectedCompanies}/>
                );
            case 'Settings':
                return (
                    <SettingsContent />
                );
            default:
                <div></div>
        }
    }
    return (
        <div className='menu-based-ui-container rounded-2xl dark:bg-gray-800'>
            {getMenuBasedUI(currentMenu)}
        </div>
    )
}

export default CustomChartDisplay