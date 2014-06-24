var added = additions;
var removed = removals;

var files = filenames;
var x = d3.scale.linear()
    .domain([ d3.min(removed), d3.max(added)])
    .range([ 0, 500]);

d3.select(".removed")
  .selectAll("div")
    .data(added)
  .enter().append("div")
    .style("width", function(d) {  return x(d) + "px"; });
    //.text(function(d) { return d; });

d3.select(".added")
  .selectAll("div")
    .data(removed)
  .enter().append("div")
    .style("width", function(d) { return x(d) + "px"; });
    //.text(function(d) { return d; });


console.log('added ' + added);
console.log('removed ' + removed);