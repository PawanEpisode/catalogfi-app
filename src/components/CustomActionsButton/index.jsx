import React, { useEffect, useState } from 'react';

import { TIME_ACTIONS_ITEMS, TIME_ACTIONS_ITEMS_FOR_STATISTICS } from '../../utils/constants';
import fullscreen from '../../assets/fullscreen.png';
import { CompareSelector } from '../CompareSelector';

import './CustomActionsButton.css'

const CustomActionsButton = ({
    currentMenu,
    currentTimeMenu, 
    handleCurrentTimeMenu,
    handlFullscreen,
    selectedCompanies,
    setSelectedCompanies
}) => {
    const [timeRangeOptions, setTimeRangeOptions] = useState([]);

    useEffect(() => {
        const getTimeRangeOptions = () => {
            switch (currentMenu) {
                case 'Chart':
                    setTimeRangeOptions(TIME_ACTIONS_ITEMS);
                    break;
                case 'Statistics':
                    setTimeRangeOptions(TIME_ACTIONS_ITEMS_FOR_STATISTICS);
                    break;
                default:
                    setTimeRangeOptions([]);
                    break;
            }
        }
        getTimeRangeOptions();
    }, [currentMenu])
    return (
        <div className='actionsbutton-container dark:bg-gray-800'>
            <div onClick={handlFullscreen} className='generalflexcss dark:hover:text-white action-button-textual'>
                <img src={fullscreen} alt='full-screen-icon'/>
                Fullscreen
            </div>
            <CompareSelector selectedCompanies={selectedCompanies} setSelectedCompanies={setSelectedCompanies}/>
            <div className='time-action-button-container'>
                {timeRangeOptions?.map(time => 
                        <SingleTimeMenu 
                        key={time?.menuKey} 
                        timeMenu={time} 
                        isCurrent={currentTimeMenu?.menuLabel === time?.menuLabel}
                        onTimeMenuClick={() => handleCurrentTimeMenu(time)}
                        />
                    )
                }
            </div>
        </div>
    )
}
const SingleTimeMenu = ({
    timeMenu,
    isCurrent,
    onTimeMenuClick,
}) => {
    return (
        <div 
            onClick={onTimeMenuClick} 
            className={`singletimemenu-item dark:hover:text-white ${isCurrent ? 'activetimeItem':''}`}
        >
            {timeMenu?.menuLabel}
        </div>
    )
}

export default CustomActionsButton