//svg dimensions
var svgWidth = 960;
var svgHeight = 500;
//margin settings
var margin = {
 top: 20,
 right: 40,
 bottom: 60,
 left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper and append an SVG group that holds the chart
var svg = d3.select("#scatter")
 .append("svg")
 .attr("width", svgWidth)
 .attr("height", svgHeight);

var chartGroup = svg.append("g")
 .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv")
 .then(function(healthData) {

// Parse Data as numbers

   healthData.forEach(function(data) {
     data.smokes = +data.smokes;
     data.income = +data.income;
   });

// Create scale functions

   var xLinearScale = d3.scaleLinear()
     .domain([4, d3.max(healthData, d => d.smokes)+2])
     .range([0, width]);

   var yLinearScale = d3.scaleLinear()
     .domain([20, d3.max(healthData, d => d.income)+2])
     .range([height, 0]);

// Create axis functions

   var bottomAxis = d3.axisBottom(xLinearScale);
   var leftAxis = d3.axisLeft(yLinearScale);

// Append Axes to the chart

   chartGroup.append("g")
     .attr("transform", `translate(0, ${height})`)
     .call(bottomAxis);

   chartGroup.append("g")
     .call(leftAxis);

// Create Circles

   var circlesGroup = chartGroup.selectAll("circle")
   .data(healthData)
   .enter()
   .append("circle")
   .attr("cx", d => xLinearScale(d.smokes))
   .attr("cy", d => yLinearScale(d.income))
   .attr("r", "15")
   .attr("fill", "red")
   .attr("opacity", ".2")
   
   //can't get text to show on site :-( 


  //  chartGroup.selectAll("classCircle")
  //  .data(healthData)
  //  .enter()
  //  .append("text")
  //  .text("Mytext");

// Initialize tool tip

   var toolTip = d3.tip()
     .attr("class", "tooltip")
     .offset([40, -60])
     .html(function(d) {
       return (`${d.state}<br>income: ${d.income}<br>smokes: ${d.smokes}`);
     });

// Create tooltip in the chart

   chartGroup.call(toolTip);

// Create event listeners to display and hide the tooltip

   circlesGroup.on("mouseover", function(data) {
     toolTip.show(data, this);
   })

     .on("mouseout", function(data, index) {
       toolTip.hide(data);
     });

// Create axes labels
   chartGroup.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0 - margin.left + 40)
     .attr("x", 0 - (height / 2))
     .attr("dy", "1em")
     .attr("class", "axisText")
     .text("Income");

   chartGroup.append("text")
     .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
     .attr("class", "axisText")
     .text(" % of Smokers");
     
 });