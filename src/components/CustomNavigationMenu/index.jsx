import React from 'react';

import './CustomNavigationMenu.css';
import { NAVIGATION_MENUS_VARABLES } from '../../utils/constants';

const CustomNavigationMenu = ({
    currentMenu, 
    handleCurrentMenu
}) => {
    return (
        <div className='navigationmenu-container'>
            {NAVIGATION_MENUS_VARABLES.map((menu => 
                    <SingleMenu 
                        key={menu.menuKey} 
                        menu={menu} 
                        onMenuClick={() => handleCurrentMenu(menu.menuLabel)} 
                        isCurrent={currentMenu === menu.menuLabel}
                    />
                ))
            }
        </div>
    )
}

const SingleMenu = ({
    menu,
    onMenuClick,
    isCurrent,
}) => {
    return (
        <div 
            onClick={onMenuClick} 
            className={`singlemenu-item ${isCurrent ? 'activeItem':''}`}
        >
            {menu?.menuLabel}
        </div>
    )
}

export default CustomNavigationMenu