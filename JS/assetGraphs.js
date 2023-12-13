function barBreakdown () {
    mockData = JSON.stringify([
        {"name":"house","category":"thing","amount":"132"},{"name":"savings","category":"income","amount":"123"},
        {"name":"stock1","category":"investment","amount":"132"},{"name":"stock2","category":"investment","amount":"123"},
        {"name":"car","category":"thing","amount":"45"}])
    // Assuming assets is already loaded from local storage or another source
    const assets = JSON.parse(localStorage.getItem('assets'));
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

    // Group assets by category
    const assetsByCategory = d3.group(assets, d => d.category);

    // Calculate the total amount for each category
    const categoryTotal = Array.from(assetsByCategory, ([category, values]) => ({
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
//asset fields: located in "income", has fields name/amount/category
function pieBreakdown() {
    mockData = JSON.stringify([
        {"name":"house","category":"thing","amount":"132"},{"name":"savings","category":"income","amount":"123"},
        {"name":"stock1","category":"investment","amount":"132"},{"name":"stock2","category":"investment","amount":"123"},
        {"name":"car","category":"thing","amount":"45"}])
    
    // Assuming assets is already loaded from local storage or another source
    const assets = JSON.parse(localStorage.getItem('assets'));
    console.log(assets);
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

    // Group assets by category
    const assetsByCategory = d3.group(assets, d => d.category);

    // Calculate the total amount for each category
    const categoryTotal = Array.from(assetsByCategory, ([category, values]) => ({
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
        .attr("fill", (d, i) => d3.schemeCategory10[i])
        .on("mouseover", function (event, d) {
            // Show tooltip on hover
            tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
            tooltip.html(`${d.data.category}<br/>Value: $${d.data.total.toFixed(2)}<br/>Percentage: ${((d.endAngle - d.startAngle) / (2 * Math.PI) * 100).toFixed(2)}%`)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 28) + "px");
        });

    // Add labels to the pie chart slices
    slices.append("text")
        .attr("transform", d => "translate(" + arc.centroid(d) + ")")
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(d => d.data.category);
    
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

}

function EVbyYear() {
    mockData = JSON.stringify([
        {"name":"house","category":"thing","amount":"132","growthRate":0.03},
        {"name":"savings","category":"income","amount":"123","growthRate":0.05},
        {"name":"stock1","category":"investment","amount":"132","growthRate":0.1},
        {"name":"stock2","category":"investment","amount":"123","growthRate":0.08},
        {"name":"car","category":"thing","amount":"45","growthRate":0.02}]);

    const years = 5;
  
    var assets = JSON.parse(localStorage.getItem('assets'));
    assets = assets.map(asset => ({...asset, growthRate: .1}));
    
    const margin = { top: 20, right: 20, bottom: 50, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create an SVG element within the "barchart" div
    const svg = d3.select("#EV")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Group assets by category
    const assetsByCategory = d3.group(assets, d => d.category);

    // Calculate the total amount and projected amount for each category
    const categoryTotal = Array.from(assetsByCategory, ([category, values]) => {
        const total = d3.sum(values, d => +d.amount);
        const projected = total * Math.pow(1 + d3.mean(values, d => d.growthRate), years); 
        return {
            category,
            total,
            projected
        };
    });

    // Set up scales
    const xScale = d3.scaleBand()
        .domain(categoryTotal.map(d => d.category))
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(categoryTotal, d => Math.max(d.total, d.projected))])
        .range([height, 0]);

    // Draw bars for total amount
    svg.selectAll(".bar")
        .data(categoryTotal)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.category))
        .attr("width", xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.total))
        .attr("height", d => height - yScale(d.total))
        .attr("fill", "steelblue");

    // Draw bars for projected amount
    svg.selectAll(".projected-bar")
        .data(categoryTotal)
        .enter().append("rect")
        .attr("class", "projected-bar")
        .attr("x", d => xScale(d.category) + xScale.bandwidth() / 2)
        .attr("width", xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.projected))
        .attr("height", d => height - yScale(d.projected))
        .attr("fill", "orange");
        
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
        .text("Amount");
}

function updateGraph() {
    console.log('updating graphs');
    // Clear existing SVG elements
    d3.select("#barchart svg").remove();
    d3.select("#piechart svg").remove();
    d3.select("#EV svg").remove();

    // Call the functions to generate new graphs
    setTimeout(function() {
        barBreakdown();
        pieBreakdown();
        EVbyYear();},
        0)
}

pieBreakdown();
barBreakdown();
EVbyYear();