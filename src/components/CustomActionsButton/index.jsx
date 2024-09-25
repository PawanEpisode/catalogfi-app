import React from 'react';

import './CustomActionsButton.css'
import { TIME_ACTIONS_ITEMS } from '../../utils/constants';
import fullscreen from '../../assets/fullscreen.png';
import compare from '../../assets/compare.png';
import { CompareSelector } from '../CompareSelector';

const CustomActionsButton = ({
    currentTimeMenu, 
    handleCurrentTimeMenu,
    handlFullscreen,
    selectedCompanies,
    setSelectedCompanies
}) => {
    return (
        <div className='actionsbutton-container'>
            <div onClick={handlFullscreen} className='generalflexcss action-button-textual'>
                <img src={fullscreen} alt='full-screen-icon'/>
                Fullscreen
            </div>
            <CompareSelector selectedCompanies={selectedCompanies} setSelectedCompanies={setSelectedCompanies}/>
            <div className='time-action-button-container'>
                {TIME_ACTIONS_ITEMS.map(time => 
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
            className={`singletimemenu-item ${isCurrent ? 'activetimeItem':''}`}
        >
            {timeMenu?.menuLabel}
        </div>
    )
}

export default CustomActionsButton