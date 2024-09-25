import React from "react";

import "./CustomPrice.css";

const CustomPrice = ({ combinedData, selectedCompanies }) => {
    return (
        <div className="grid grid-cols-2 gap-4 mb-4">
        {Object.entries(selectedCompanies).map(([company, isSelected]) => {
            if (isSelected) {
            const currentPrice = combinedData[combinedData.length - 1][company];
            const initialPrice = combinedData[0][company];
            const change = currentPrice - initialPrice;
            const percentChange = (
                (currentPrice / initialPrice - 1) *
                100
            ).toFixed(2);
            return (
                <div key={company} className="customprice-container">
                    <div className="currentvalue-textual">
                        {currentPrice.toFixed(2)}
                    </div>
                    <div className="currencyvalue-textual">USD</div>
                    <div
                        className={`incrementvalue-textual ${
                        change >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {change >= 0 ? "+" : ""}
                        {change.toFixed(2)} ({percentChange}%)
                    </div>
                </div>
            );
            }
            return null;
        })}
        </div>
    );
};

export default CustomPrice;
