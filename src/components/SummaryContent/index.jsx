import React from 'react';
import { MARKET_SUMMARY_FOR_APPLE_GOOGLE } from '../../utils/constants';
import { formatNumber } from '../../utils/helperFunctions';

import './SummaryContent.css';

const SummaryContent = ({selectedCompanies}) => {
  return (
    <div className="w-full summary-panel">
      {Object.entries(selectedCompanies).map(([companyName, isSelected]) => (
        isSelected && <SummaryCard key={companyName} companyName={companyName} summary={MARKET_SUMMARY_FOR_APPLE_GOOGLE[companyName]} />
      ))}
    </div>
  );
}

const SummaryCard = ({ companyName, summary }) => {
  return (
    <div className="summary-card">
      <h3 className='dark:text-indigo-600'>{companyName}</h3>
      <div className="summary-param">
        <span className="label">Last Price</span>
        <span className="value">${summary.lastPrice.toFixed(2)}</span>
      </div>
      <div className="summary-param">
        <span className="label">52-Week High</span>
        <span className="value">${summary.week52High.toFixed(2)}</span>
      </div>
      <div className="summary-param">
        <span className="label">52-Week Low</span>
        <span className="value">${summary.week52Low.toFixed(2)}</span>
      </div>
      <div className="summary-param">
        <span className="label">Market Cap</span>
        <span className="value">${formatNumber(summary.marketCap)}B</span>
      </div>
      <div className="summary-param">
        <span className="label">Dividend Yield</span>
        <span className="value">{(summary.dividendYield * 100).toFixed(2)}%</span>
      </div>
      <div className="summary-param">
        <span className="label">P/E Ratio</span>
        <span className="value">{summary.peRatio.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default SummaryContent