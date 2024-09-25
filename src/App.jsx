import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import CustomActionsButton from './components/CustomActionsButton'
import CustomChartDisplay from './components/CustomChartDisplay'
import CustomNavigationMenu from './components/CustomNavigationMenu'
import CustomPrice from './components/CustomPrice'
import { generateDummyData } from './utils/helperFunctions'

function App() {

  const [currentMenu, setCurrentMenu] = useState('Chart');
  const [currentTimeMenu, setCurrentTimeMenu] = useState({
    menuLabel: '6m',
    menuKey: '6m',
    menuValue: 180,
  });
  const [appleData, setAppleData] = useState(() => generateDummyData(180,150, 2));
  const [googleData, setGoogleData] = useState(() => generateDummyData(180, 120, 1.5));
  const [isClickedOnFullScreen, setIsClickedOnFullScreen] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState({ Apple: true, Google: false });
  const chartRef = useRef(null);

  const combinedData = appleData.map((item, index) => ({
    ...item,
    Apple: item.value,
    Google: googleData[index].value
  }));

  const handlFullscreen =useCallback(() => {
    if (!document.fullscreenElement) {
      chartRef.current.requestFullscreen();
      setIsClickedOnFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsClickedOnFullScreen(false);
    }
  },[isClickedOnFullScreen]);

  const handleCurrentMenu =useCallback((newMenu) => {
    setCurrentMenu(newMenu);
  },[currentMenu]); 

  const handleCurrentTimeMenu =useCallback((newMenu) => {
    setCurrentTimeMenu(newMenu);
    setAppleData(generateDummyData(newMenu?.menuValue, 150, 2));
    setGoogleData(generateDummyData(newMenu?.menuValue, 120, 1.5));
  },[currentTimeMenu]); 

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsClickedOnFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  return (
    <div className='app-container'>
      <div ref={chartRef} className={`${isClickedOnFullScreen ? 'fixed inset-0 z-50' : 'dashboard-container shadow-2xl'}`}>
        <CustomPrice combinedData={combinedData} selectedCompanies={selectedCompanies}/>
        <CustomNavigationMenu currentMenu={currentMenu} handleCurrentMenu={handleCurrentMenu}/>
        <CustomActionsButton 
          currentTimeMenu={currentTimeMenu} 
          handleCurrentTimeMenu={handleCurrentTimeMenu}
          handlFullscreen={handlFullscreen}
          selectedCompanies={selectedCompanies}
          setSelectedCompanies={setSelectedCompanies}
          />
        <CustomChartDisplay 
          currentMenu={currentMenu} 
          chartData={combinedData}
          selectedCompanies={selectedCompanies}
          fullScreen={isClickedOnFullScreen}/>
      </div>
    </div>
  )
}

export default App
