import React from 'react';

import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { YEAR_WISE_COMPANY_FINANCIAL_REPORT } from '../../utils/constants';
import './AnalysisContent.css';


const AnalysisContent = ({selectedCompanies}) => {
  const getIcon = (percentage) => {
    return percentage >= 0 ? <FaArrowUp className="icon profit" /> : <FaArrowDown className="icon loss" />;
  };

  const formatPercentage = (value) => {
    return value >= 0 ? `+${value}%` : `${value}%`;
  };

  return (
    <div className="analysis-container">
      {Object.entries(selectedCompanies).map(([company, isSelected]) => {
        if(isSelected) {
          return (
            <div key={company} className="company-card">
              <h2 className="company-name dark:text-indigo-600">{company}</h2>
              <div className="year-data">
                {YEAR_WISE_COMPANY_FINANCIAL_REPORT[company].map((yearData) => (
                  <div key={yearData.year} className="year-item">
                    <span className="year-label dark:text-indigo-500">{yearData.year}</span>
                    <span className={`percentage ${yearData.percentage >=0 ? "text-green-500":"text-red-500"}`}>{formatPercentage(yearData.percentage)}</span>
                    {getIcon(yearData.percentage)}
                  </div>
                ))}
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default AnalysisContent