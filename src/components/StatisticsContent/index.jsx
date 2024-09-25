import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

import './StatisticsContent.css';

const StatisticsContent = ({ data, selectedCompanies, fullscreen }) => {
  const svgRef = useRef();

  useEffect(() => {
    // Remove previous SVG elements if any to prevent overlaps
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up dimensions and margins
    const margin = { top: 20, right: 100, bottom: 30, left: 40 };
    const width = 900 - margin.left - margin.right;
    const height = fullscreen ? window.innerHeight * 0.8 : 500 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X Scale: Years (or Time)
    const years = data.map(d => d.year);
    const x = d3
      .scaleBand()
      .domain(years)
      .range([0, width])
      .padding(0.2);

    // Y Scale: Value percentage comparison between companies
    const y = d3
      .scaleLinear()
      // .domain([0, d3.max(data, d => Math.max(...Object.values(d).filter(v => typeof v === "number")))])
      .domain([0, 200])
      .nice()
      .range([height, 0]);

    // Create X Axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Create Y Axis
    svg.append("g").call(d3.axisLeft(y));

    // Add bars for each company, with dynamic comparison
    const barWidth = x.bandwidth() / Object.keys(selectedCompanies).length;

    Object.entries(selectedCompanies).forEach(([company, isSelected], index) => {
      if (isSelected) {
        svg
          .selectAll(`.bar-${company}`)
          .data(data)
          .enter()
          .append("rect")
          .attr("class", `bar-${company}`)
          .attr("x", d => x(d.year) + index * barWidth)
          .attr("y", d => y(d[company]))
          .attr("width", barWidth)
          .attr("height", d => height - y(d[company]))
          .attr("fill", d3.schemeCategory10[index % 10]) // Use a different color for each company
          .on("mousemove", (event, d) => {
            const tooltip = d3.select(`#tooltip-${company}`);
            tooltip
              .html(
                `${company}: ${d[company]}% <br>Year: ${d.year}`
              )
              .style("left", `${event.pageX + 10}px`)
              .style("top", `${event.pageY - 10}px`)
              .style("opacity", 1);
          })
          .on("mouseout", () => {
            d3.select(`#tooltip-${company}`).style("opacity", 0);
          });
      }
    });

    // Add tooltips for each company
    Object.keys(selectedCompanies).forEach(company => {
      d3.select("body")
        .append("div")
        .attr("id", `tooltip-${company}`)
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background-color", "black")
        .style("color", "white")
        .style("padding", "8px")
        .style("border-radius", "4px")
        .style("opacity", 0)
        .style("pointer-events", "none");
    });

    return () => {
      // Clean up tooltips on component unmount
      Object.keys(selectedCompanies).forEach(company => {
        d3.select(`#tooltip-${company}`).remove();
      });
    };
  }, [data, selectedCompanies, fullscreen]);

  return <svg ref={svgRef} width="100%" height={fullscreen ? "600px" : "400px"}></svg>;
}

export default StatisticsContent;