//const { local } = require("d3");

//accessing data: localStorage.getItem('expenses')
function parseData() {
    return
}

function monthTrend() {  
    //buggy - the first of each month gets classified as the previous month for some reason 
    const margin = { top: 20, right: 50, bottom: 80, left: 60 }; 
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    mockData = JSON.stringify([
        {"date":"2023-09-1","category":"asdf","amount":"132"},{"date":"2023-09-17","category":"sdf","amount":"123"},
        {"date":"2023-11-30","category":"asdf","amount":"132"},{"date":"2023-11-17","category":"sdf","amount":"123"},
        {"date":"2023-10-30","category":"asdf","amount":"45"},{"date":"2023-10-17","category":"sdf","amount":"37"},
        {"date":"2023-12-30","category":"asdf","amount":"76"},{"date":"2023-12-17","category":"sdf","amount":"50"},])

    // expenses = JSON.parse(mockData);
    expenses = JSON.parse(localStorage.getItem('expenses'));
    //format: [{"date":"2023-11-30","category":"asdf","amount":"132"},{"date":"2023-11-17","category":"sdf","amount":"123"}]
    expenses.forEach(function(d) {d.date = new Date(d.date);});

    function GroupByMonth(expenses) {
        // Create a Map to store aggregated expenses by month
        const aggregatedExpenses = new Map();
        // Iterate through expenses
        expenses.forEach(function (d) {
            // Extract year and month from the date
            const yearMonth = d3.timeFormat('%Y-%m')(d.date);
            // If the month is already in the Map, add the amount; otherwise, create a new entry
            if (aggregatedExpenses.has(yearMonth)) {
                aggregatedExpenses.set(yearMonth, aggregatedExpenses.get(yearMonth) + +d.amount);
            } else {
                aggregatedExpenses.set(yearMonth, +d.amount);
            }
        });
        // Convert the Map back to an array of objects
        const result = Array.from(aggregatedExpenses, ([month, amount]) => ({ month, amount }));
        // Sort the result by month
        result.sort((a, b) => d3.ascending(a.month, b.month));
        return result;
    }
    
    // Example usage:
    const monthExpense = GroupByMonth(expenses);
    expenses = monthExpense;
    console.log(monthExpense);
    // Parse month values
    monthExpense.forEach(function(d) {
        date = new Date(d.month)
        dayDelta = (date.getDate()-1)*-1; 
        d.month = new Date(d.month + dayDelta);
    });
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    const svg = d3.select("#trendline")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    const xScale = d3.scaleTime()
        .domain(d3.extent(expenses, d => d.month))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(expenses, d => +d.amount))
        .range([height, 0]);

    const savingsLine = d3.line()
        .x(d => xScale(d.month))
        .y(d => yScale(+d.amount));
   
    // Define line function(s)
    //THIS WILL CHANGE TO BE WHATEVERY WE'RE TRYING TO PLOT
 
    //Savings over time
    svg.append("path")
        .datum(expenses)
        .attr("class", "line")
        .attr("d", savingsLine)
        .attr("fill", "none")
        .attr("stroke", "green")
        .on("mouseover", function () {
            tooltip.transition()
                .duration(200)
                .style("opacity", 1);
        })
        .on("mousemove", function (event) {
            const [x, y] = d3.pointer(event, this); // Get the mouse coordinates relative to the container
            const bisectDate = d3.bisector(d => d.month).left;
            const xDate = xScale.invert(x);
     
            const index = bisectDate(monthExpense, xDate, 1);
            const leftData = monthExpense[index - 1];
            const rightData = monthExpense[index];
            const closestData = xDate - leftData.month > rightData.month - xDate ? rightData : leftData;
            console.log("Mouse X:", x);
            console.log("X Date:", xDate);
            console.log(closestData);
            const formatMonth = d3.timeFormat("%b %Y");
            tooltip.html(formatMonth(closestData.month) + "<br/>" + "Amount: $" + closestData.amount.toFixed(2))
                .style("left", (x + margin.left + margin.right) + "px")
                .style("top", (event.pageY - 20) + "px");
        });
    
    console.log(expenses);
    //Axes
    //Mess with margins and x/y attributes for the axis labels to get them in the right spot
    // Append x-axis with label
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)
            .tickFormat(d3.timeFormat("%b %Y"))
            .tickValues(monthExpense.map(d => d.month)))
        .attr("class", "x-axis")
        
    svg.append("text")
        .attr("class", "x label")
        .attr("x", width / 2)
        .attr("y", height + 35)
        .style("text-anchor", "middle")
        .text("Month");

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
        .text("Expenses");
    /*Fix the update later
    window.updateGraph = function () {
        console.log('being called');
        expenses = JSON.parse(localStorage.getItem('expenses'));
        //format: [{"date":"2023-11-30","category":"asdf","amount":"132"},{"date":"2023-11-17","category":"sdf","amount":"123"}]
        expenses.forEach(function(d) {d.date = new Date(d.date);});
        
        // Example usage:
        const monthExpense = GroupByMonth(expenses);
        expenses = monthExpense;
        console.log(monthExpense);
        // Parse month values
        monthExpense.forEach(function(d) {
            date = new Date(d.month)
            dayDelta = (date.getDate()-1)*-1; 
            d.month = new Date(d.month + dayDelta);
        });

        const svg = d3.select("#trendline svg");
        const duration = 1000;

        xScale.domain(d3.extent(expenses, d => d.month));
        yScale.domain(d3.extent(monthExpense, d => +d.amount));

        // Update the x-axis scale with transition
        svg.select(".x-axis")
            .transition()
            .duration(duration)
            .call(d3.axisBottom(xScale)
                .tickFormat(d3.timeFormat("%b %Y"))
                .tickValues(monthExpense.map(d => d.month)));

        // Update the y-axis scale with transition
        svg.select(".y-axis")
            .transition()
            .duration(duration)
            .call(d3.axisLeft(yScale));

        svg.select(".line")
            .datum(expenses)
            .transition()
            .duration(duration)
            .attr("d", savingsLine);
    };*/
}


function typePie() {
    // Assuming expenses is already loaded from local storage or another source
    const expenses = JSON.parse(localStorage.getItem('expenses'));
    expenses.forEach(function (d) {
        d.date = new Date(d.date);
    });

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Create an SVG element within the "piechart" div
    const svg = d3.select("#piechart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Group expenses by category
    const expensesByCategory = d3.group(expenses, d => d.category);

    // Calculate the total amount for each category
    const categoryTotal = Array.from(expensesByCategory, ([category, values]) => ({
        category,
        total: d3.sum(values, d => +d.amount)
    }));

    // Set up a pie generator
    const pie = d3.pie()
        .value(d => d.total)
        .sort(null);

    // Set up an arc generator
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Create pie chart slices
    const slices = svg.selectAll("slice")
        .data(pie(categoryTotal))
        .enter()
        .append("g")
        .attr("class", "slice");

    // Draw the pie chart slices
    slices.append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => d3.schemeCategory10[i]);

    // Add labels to the pie chart slices
    slices.append("text")
        .attr("transform", d => "translate(" + arc.centroid(d) + ")")
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(d => d.data.category);    
}

function typeBar() {
    const expenses = JSON.parse(localStorage.getItem('expenses'));
    expenses.forEach(function (d) {
        d.date = new Date(d.date);
    });

    const margin = { top: 20, right: 20, bottom: 50, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create an SVG element within the "barchart" div
    const svg = d3.select("#barchart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Group expenses by category
    const expensesByCategory = d3.group(expenses, d => d.category);

    // Calculate the total amount for each category
    const categoryTotal = Array.from(expensesByCategory, ([category, values]) => ({
        category,
        total: d3.sum(values, d => +d.amount)
    }));

    // Set up scales
    const xScale = d3.scaleBand()
        .domain(categoryTotal.map(d => d.category))
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(categoryTotal, d => d.total)])
        .range([height, 0]);

    // Draw bars
    svg.selectAll(".bar")
        .data(categoryTotal)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.category))
        .attr("width", xScale.bandwidth())
        .attr("y", d => yScale(d.total))
        .attr("height", d => height - yScale(d.total));

    // Draw x-axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    // Draw y-axis
    svg.append("g")
        .call(d3.axisLeft(yScale));

    // Add labels
    svg.append("text")
        .attr("class", "x label")
        .attr("x", width / 2)
        .attr("y", height + margin.top + 20)
        .style("text-anchor", "middle")
        .text("Category");

    svg.append("text")
        .attr("class", "y label")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left)
        .attr("x", -height / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Total Amount");
}

monthTrend();
typePie();
typeBar();