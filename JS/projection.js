document.addEventListener("DOMContentLoaded", function () {

    window.updateGraph = function () {
        const targetAmount = parseFloat(document.getElementById("targetAmount").value) || 0;
        const monthsToAchieveGoal = parseInt(document.getElementById("monthsToAchieve").value) || 0;
        const monthlySavings = parseFloat(document.getElementById("monthlySavings").value) || 0;

        const savingsData = [];
        for (let i = 0; i <= monthsToAchieveGoal; i++) {
            savingsData.push({ x: i, y: i * monthlySavings });
        }
        // Select the existing SVG element
        const svg = d3.select("#projection svg");
        // Transition duration
        const duration = 1000;

        // Set up scales
        xScale.domain([0, monthsToAchieveGoal  + (monthsToAchieveGoal/5)]);
        yScale.domain([0, targetAmount + (targetAmount/5)]);

        // Update the x-axis scale with transition
        svg.select(".x-axis")
            .transition()
            .duration(duration)
            .call(d3.axisBottom(xScale));

        // Update the y-axis scale with transition
        svg.select(".y-axis")
            .transition()
            .duration(duration)
            .call(d3.axisLeft(yScale));

        // Transition for the savings progression line
        svg.select(".line")
            .datum(savingsData)
            .transition()
            .duration(duration)
            .attr("d", savingsLine);

        // Transition for the horizontal target line
        svg.select(".target-line")
            .transition()
            .duration(duration)
            .attr("y1", yScale(targetAmount))
            .attr("y2", yScale(targetAmount));

        // Transition for the vertical timeframe line
        svg.select(".timeframe-line")
            .transition()
            .duration(duration)
            .attr("x1", xScale(monthsToAchieveGoal))
            .attr("x2", xScale(monthsToAchieveGoal));

        svg.select(".goal-values")
            .text(`Target: ${monthlySavings*monthsToAchieveGoal} OR  Months: ${targetAmount/monthlySavings}  OR  Savings: ${targetAmount/monthsToAchieveGoal}`);
    };

    //Create first graph
    const targetAmount = 1200;
    const monthsToAchieveGoal = 12;
    const monthlySavings = 100;

    //Create set of data points with value for each month
    const savingsData = [];
    for (let i = 0; i <= monthsToAchieveGoal; i++) {
        savingsData.push({ x: i, y: i * monthlySavings });
    }

    const margin = { top: 20, right: 50, bottom: 80, left: 60 }; 
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG element within the "projection" div
    const svg = d3.select("#projection")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const xScale = d3.scaleLinear()
        .domain([0, monthsToAchieveGoal + (monthsToAchieveGoal/5)])
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, targetAmount  + (targetAmount/5)])
        .range([height, 0]);

    const savingsLine = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));


    // Define line function(s)
    //THIS WILL CHANGE TO BE WHATEVERY WE'RE TRYING TO PLOT

    //Savings over time
    svg.append("path")
        .datum(savingsData)
        .attr("class", "line")
        .attr("d", savingsLine)
        .attr("fill", "none")
        .attr("stroke", "green");

    //target amount to save
    svg.append("line")
        .attr("class", "target-line")
        .attr("x1", 0)
        .attr("y1", yScale(targetAmount))
        .attr("x2", width)
        .attr("y2", yScale(targetAmount))
        .attr("stroke", "red")
        .attr("stroke-dasharray", "5,5");

    //target month to achieve by
    svg.append("line")
        .attr("class", "timeframe-line")
        .attr("x1", xScale(monthsToAchieveGoal))
        .attr("y1", 0)
        .attr("x2", xScale(monthsToAchieveGoal))
        .attr("y2", height)
        .attr("stroke", "blue")
        .attr("stroke-dasharray", "5,5");

    //Axes
    //Mess with margins and x/y attributes for the axis labels to get them in the right spot
    // Append x-axis with label
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .attr("class", "x-axis")
        
    svg.append("text")
        .attr("class", "x label")
        .attr("x", width / 2)
        .attr("y", height + 35)
        .style("text-anchor", "middle")
        .text("Months");

    // Append y-axis with label
    svg.append("g")
        .call(d3.axisLeft(yScale))
        .attr("class", "y-axis");
        
    svg.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -height / 2)
        .style("text-anchor", "middle")
        .text("Savings");

    //append info regarding needed values to make goal
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.top + 35)
        .style("text-anchor", "middle")
        .text("In order to meet this goal, try...");
    
    svg.append("text")
        .attr("class", "goal-values")
        .attr("x", width / 2)
        .attr("y", height + margin.top + 55)
        .style("text-anchor", "middle")
        .text(`Target: ${monthlySavings*monthsToAchieveGoal} OR  Months: ${targetAmount/monthlySavings}  OR  Savings: ${targetAmount/monthsToAchieveGoal}`);

    updateGraph();
});

//Old basic line chart for reference
/*document.addEventListener("DOMContentLoaded", function () {
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
});*/