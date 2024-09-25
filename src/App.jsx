import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { ThemeContext } from './contexts/ThemeContext'

import CustomActionsButton from './components/CustomActionsButton'
import CustomChartDisplay from './components/CustomChartDisplay'
import CustomNavigationMenu from './components/CustomNavigationMenu'
import CustomPrice from './components/CustomPrice'
import { generateDummyData, generateYearlyDummyData } from './utils/helperFunctions'
import { INITIAL_TIME_MENU_FOR_CHARTS, INITIAL_TIME_MENU_FOR_STATISTICS } from './utils/constants';

import './App.css'

function App() {
  const { theme } = useContext(ThemeContext);

  const [currentMenu, setCurrentMenu] = useState('Chart');
  const [currentTimeMenu, setCurrentTimeMenu] = useState(INITIAL_TIME_MENU_FOR_CHARTS);
  const [appleChartData, setAppleChartData] = useState(() => generateDummyData(180,150, 2));
  const [googleChartData, setGoogleChartData] = useState(() => generateDummyData(180, 120, 1.5));

  const [appleStatisticsData, setAppleStatisticsData] = useState(() => generateYearlyDummyData(10,100, 15));
  const [googleStatisticsData, setGoogleStatisticsData] = useState(() => generateYearlyDummyData(10, 120, 20));

  const [isClickedOnFullScreen, setIsClickedOnFullScreen] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState({ Apple: true, Google: false });
  const chartRef = useRef(null);

  useEffect(() => {
    if(currentMenu === 'Chart') {
      setCurrentTimeMenu(INITIAL_TIME_MENU_FOR_CHARTS)
    } else if(currentMenu === 'Statistics') {
      setCurrentTimeMenu(INITIAL_TIME_MENU_FOR_STATISTICS)
    }
  },[currentMenu])

  const combinedChartData = appleChartData.map((item, index) => ({
    ...item,
    Apple: item.value,
    Google: googleChartData[index].value
  }));

  const combinedStatisticsData = appleStatisticsData.map((item, index) => ({
    ...item,
    Apple: item.value,
    Google: googleStatisticsData[index].value
  }));

  const handlFullscreen =useCallback(() => {
    setIsClickedOnFullScreen(!isClickedOnFullScreen);
  },[isClickedOnFullScreen]);

  const handleCurrentMenu =useCallback((newMenu) => {
    setCurrentMenu(newMenu);
  },[currentMenu]); 

  const handleCurrentTimeMenu =useCallback((newMenu) => {
    setCurrentTimeMenu(newMenu);
    if(currentMenu === 'Chart') {
      setAppleChartData(generateDummyData(newMenu?.menuValue, 150, 2));
      setGoogleChartData(generateDummyData(newMenu?.menuValue, 120, 1.5));
    } else if (currentMenu === 'Statistics') {
      setAppleStatisticsData(generateYearlyDummyData(newMenu?.menuValue, 150, 2));
      setGoogleStatisticsData(generateYearlyDummyData(newMenu?.menuValue, 120, 1.5));
    }
  },[currentTimeMenu]); 

  return (
    <div className='app-container'>
      <div ref={chartRef} className={`relative dark:bg-gray-800 ${isClickedOnFullScreen ? 'dashboard-container w-full h-[90vh] shadow-2xl' : 'dashboard-container shadow-2xl'}`}>
        {!isClickedOnFullScreen ? <CustomPrice combinedData={combinedChartData} selectedCompanies={selectedCompanies}/>: null}
        {!isClickedOnFullScreen ? <CustomNavigationMenu currentMenu={currentMenu} handleCurrentMenu={handleCurrentMenu}/>: null}
        {['Chart', 'Statistics'].includes(currentMenu) ? <CustomActionsButton 
          currentMenu={currentMenu}
          currentTimeMenu={currentTimeMenu} 
          handleCurrentTimeMenu={handleCurrentTimeMenu}
          handlFullscreen={handlFullscreen}
          selectedCompanies={selectedCompanies}
          setSelectedCompanies={setSelectedCompanies}
        />: null}
        <CustomChartDisplay 
          currentMenu={currentMenu} 
          chartData={combinedChartData}
          selectedCompanies={selectedCompanies}
          statisticsData={combinedStatisticsData}
          fullScreen={isClickedOnFullScreen}/>
      </div>
    </div>
  )
}

export default App
