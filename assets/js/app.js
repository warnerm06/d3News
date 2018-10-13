// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.csv("assets/data/data.csv", function(error, csvData) {
  if (error) return console.warn(error);
  // console.log(csvData);
  console.log(typeof(csvData));

  // csvData.forEach(data => {
  //   data.abbr = data.abbr;
  //   data.state = data.state;
  //   data.poverty = +data.poverty;
  //   data.healthcare = +data.healthcare;
  //   data.age = +data.age;
  //   data.smokes = +data.smokes;
  //   data.income = +data.income;
  //   data.obesity = +data.obesity;
  //   alert(data.poverty);
  // });
  // create scale functions
  var yLinearScale = d3.scaleLinear()
    .range([chartHeight, 0]);

  var xLinearScale = d3.scaleLinear()
    .range([0, chartWidth]);

  // Create axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // calculate min and max of x axis
  var povertyMin = d3.min(csvData, data => data.Poverty) - 1
  var povertyMax = d3.max(csvData, data => data.Poverty) + 1

  // // calculate min and max of y axis
  // var depressedMin = d3.min(corrData, data => data.depressed) - 1
  // var depressedMax = d3.max(corrData, data => data.depressed) + 1

  // Scale the domain
  xLinearScale.domain([povertyMin, povertyMax]);
  yLinearScale.domain([povertyMin, povertyMax]);
});
