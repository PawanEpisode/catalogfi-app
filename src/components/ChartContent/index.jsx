import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Transition } from '@headlessui/react';
import './ChartContent.css';

const ChartContent = ({ data, selectedCompanies, fullscreen }) => {
  const svgRef = useRef();
  
  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous chart

    const margin = { top: 20, right: 30, bottom: 30, left: 0 };
    const width = svg.node().getBoundingClientRect().width - margin.left - margin.right;
    const height = fullscreen ? window.innerHeight * 0.8 : 400 - margin.top - margin.bottom;

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.date)))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => Math.max(d.Apple, d.Google))])
      .nice()
      .range([height, 0]);
    
    const volumeScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.volume)])
    .range([0, height / 4]);

    const line = d3.line()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.value));

    const g = svg.append("g")
      .attr("transform", `translate(0,${margin.top})`);

    // Add volume bars
    g.selectAll(".volume-bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "volume-bar")
    .attr("x", d => x(new Date(d.date)) - 1)
    .attr("y", d => height - volumeScale(d.volume))
    .attr("width", 2)
    .attr("height", d => volumeScale(d.volume))
    .attr("fill", "rgb(230, 232, 235)")
    .attr("opacity", 0.5);

    const colors = { Apple: "#4B40EE", Google: "#e240ee" };

    Object.entries(selectedCompanies).forEach(([company, isSelected]) => {
      // Remove any previously appended tooltip divs to avoid duplicates
      d3.selectAll(`.fixed-tooltip-${company}`).remove();

      if (isSelected) {
        const companyData = data.map(d => ({ date: d.date, value: d[company] }));
        // Assuming `company` is the current company and `data` contains the stock values
        const lastStockValue = data[data.length - 1][company];

        // Get the y-coordinate for the last stock value using the D3 y-scale
        const lastYCoord = y(lastStockValue);
        const leftDimension = fullscreen ? (width+ 50): (width + 250);
        const topDimension = fullscreen ? lastYCoord + 100: height + lastYCoord;

        // Add the line
        g.append("path")
          .datum(companyData)
          .attr("fill", "none")
          .attr("stroke", colors[company])
          .attr("stroke-width", 3)
          .attr("d", line);

        d3.select("body")
        .append("div")
        .attr("class", `fixed-tooltip-${company}`)
        .style("position", "absolute")
        .style("left", leftDimension + "px") // Position it outside the chart
        .style("top", topDimension + "px") // Align it with the company's line
        .style("background-color", colors[company])
        .style("color", "#fff")
        .style("width", "80px")
        .style("padding", "8px 16px")
        .style("border-radius", "5px")
        .style("font-size", "16px")
        .style("font-weight", "500")
        .style("z-index", "9")
        .text(`$${data[data.length - 1][company].toFixed(2)}`);

        // Add the area
        const area = d3.area()
          .x(d => x(new Date(d.date)))
          .y0(height)
          .y1(d => y(d.value));

        g.append("path")
          .datum(companyData)
          .attr("fill", colors[company])
          .attr("fill-opacity", 0.06)
          .attr("d", area);
      }
    });

    // Add vertical lines
    g.append("g")
    .attr("transform", `translate(0,${height})`)
    .attr("class", "x-axis")
    .call(d3.axisBottom(x).tickSize(-height))
    .call(g => g.select(".domain").remove())
    .call(g => g.selectAll(".tick line")
      .attr("class", "gridStroke")
      .attr("stroke", "currentColor")
      .attr("stroke-opacity", 0.1));

    // Style tick labels
    svg.selectAll(".tick text")
      .attr("fill", "currentColor")
      .attr("font-size", "10")
      .attr("font-family", "sans-serif");

    // Adjust Y-axis label position
    svg.select(".y-axis .tick:last-of-type text")
      .attr("text-anchor", "start");

    const bisect = d3.bisector(d => new Date(d.date)).left;

    // Add hover lines
    const verticalLine = g.append("line")
      .attr("class", "hover-line")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 0)
      .attr("y2", height)
      .attr("stroke", "#ccc")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "8 8")
      .attr("opacity", 0);

    const horizontalLines = {};
    Object.keys(selectedCompanies).forEach((company) => {
      horizontalLines[company] = g.append("line")
        .attr("class", `hover-line-${company}`)
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("stroke", "#ccc")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "8 8")
        .attr("opacity", 0);
    });

    svg.append("rect")
      .attr("width", width)
      .attr("height", fullscreen ? "600px" : height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", () => {
        verticalLine.attr("opacity", 1);
        Object.values(horizontalLines).forEach(line => line.attr("opacity", 1));
      })
      .on("mousemove", (event) => {
        const x0 = x.invert(d3.pointer(event)[0] - margin.left);
        const i = bisect(data, x0, 1);
        const selectedData = data[i];

        verticalLine
          .attr("x1", x(new Date(selectedData.date)))
          .attr("x2", x(new Date(selectedData.date)))
          .attr("opacity", 1);

        // Only update horizontal lines for selected companies
        Object.entries(selectedCompanies).forEach(([company, isSelected]) => {
          if (isSelected) {
            horizontalLines[company]
              .attr("y1", y(selectedData[company])) // Set y-coordinate based on company data
              .attr("y2", y(selectedData[company])) // Set y-coordinate for the other end of the line
              .attr("opacity", 1); // Show the line

              // Select or create a separate tooltip for each company
              let companyTooltip = d3.select(`.tooltip-${company}`);

              const leftDimension = fullscreen ? (width+ 50): (width + 250);
              const topDimension = fullscreen ? y(selectedData[company]) + 100: height + y(selectedData[company]);
              
              if (companyTooltip.empty()) {
                companyTooltip = d3.select("body")
                  .append("div")
                  .attr("class", `tooltip-${company}`) // Unique class for each company
                  .style("position", "absolute")
                  .style("background-color", "black")
                  .style("color", "#fff")
                  .style("padding", "8px 16px")
                  .style("border-radius", "5px")
                  .style("font-size", "14px")
                  .style("font-weight", "600")
                  .style("opacity", 0);
              }

              // Create or update hover tooltip with current price
              companyTooltip
              .html(`${company}: $${selectedData[company].toFixed(2)}`)
              .style("left",leftDimension + "px") // Fixed on the right side of the graph
              .style("top", topDimension + "px")
              .style("z-index", "99")
              .style("opacity", 1);  // Show hover tooltip
          } else {
            horizontalLines[company].attr("opacity", 0); // Hide line for unselected companies
            d3.select(`.tooltip-${company}`)
            .style("opacity", 0) // Hide the tooltip
            .remove(); // Optionally, you can remove the tooltip from the DOM
          }
        });
      })
      .on("mouseout", () => {
        verticalLine.attr("opacity", 0);
        Object.values(horizontalLines).forEach(line => line.attr("opacity", 0));
        d3.select(`.tooltip-Apple`)
            .style("opacity", 0) // Hide the tooltip
            .remove();
        d3.select(`.tooltip-Google`)
            .style("opacity", 0) // Hide the tooltip
            .remove();
      });

    return () => {
      d3.select(`.fixed-tooltip-Apple`)
            .style("opacity", 0) // Hide the tooltip
            .remove();
      d3.select(`.fixed-tooltip-Google`)
            .style("opacity", 0) // Hide the tooltip
            .remove();
    }

  }, [data, selectedCompanies, fullscreen]);
  return (
    <Transition
      show={true}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className='chartdisplay-container dark:bg-gray-800'>
        <svg ref={svgRef} width="100%" height={fullscreen ? "600px" : "400px"}></svg>
      </div>
    </Transition>
  )
}

export default ChartContent