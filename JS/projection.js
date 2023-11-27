document.addEventListener("DOMContentLoaded", function () {
    // Sample data
    const data = [
        { x: 4, y: 25 },
        { x: 3, y: 10 },
        { x: 2, y: 20 },
        { x: 1, y: 15 },
    ];

    // Set up SVG dimensions
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Create SVG element within the "projection" div
    const svg = d3.select("#projection")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Define a line function
    //THIS WILL CHANGE TO BE WHATEVERY WE'RE TRYING TO PLOT
    const line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));

    // Set up scales
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.x)) // Set the x-axis domain, zero to max x value
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.y)]) // Set the y-axis domain, zero to max y value
        .range([height, 0]);

    // Append a path element representing the line chart
    //THIS IS WHAT CHANGES MOST FOR NEW CHARTS
    svg.append("path")
        .datum(data) //data
        .attr("class", "line") //type of chart
        .attr("d", line) //type of chart related? Not sure here
        .attr("fill", "none") //Prevents area under the curve from being filled
        .attr("stroke", "steelblue"); //Line color - needed for line to be visible 

    // Append x-axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    // Append y-axis
    svg.append("g")
        .call(d3.axisLeft(yScale));
});