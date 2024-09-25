import React from "react";
import { MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { Menu } from "@headlessui/react";
import { Fragment } from 'react';
import compare from '../../assets/compare.png';

export const CompareSelector = ({
    selectedCompanies,
    setSelectedCompanies,
    }) => {
    return (
        <div className='generalflexcss'>
                <img src={compare} alt='compare-icon'/>
                <div className="flex items-center space-x-4 relative">
                    <Menu>
                        <MenuButton className="action-button-textual">
                            Compare
                        </MenuButton>
                        <MenuItems className="absolute left-0 top-6 mt-2 w-40 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {Object.keys(selectedCompanies).map((company) => (
                            <MenuItem key={company} as={Fragment}>
                            {({ active }) => (
                                <div
                                className={`${
                                    active ? "bg-blue-500 text-white" : "text-gray-900"
                                } flex items-center px-4 py-2 cursor-pointer`}
                                onClick={() =>
                                    setSelectedCompanies((prev) => ({
                                    ...prev,
                                    [company]: !prev[company],
                                    }))
                                }
                                >
                                {/* Custom checkbox */}
                                <input
                                    type="checkbox"
                                    checked={selectedCompanies[company]}
                                    onChange={() => null} // Prevents default behavior, state is updated via onClick
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-2"
                                />
                                <span>{company}</span>
                                </div>
                            )}
                            </MenuItem>
                        ))}
                        </MenuItems>
                    </Menu>
                </div>
            </div>
    );
};
