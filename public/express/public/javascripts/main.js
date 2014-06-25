var y = d3.scale.linear()
    .domain([ 0, d3.max(allValues)])
    .range([ 0, 250]);

d3.select(".removed")
  .selectAll("div")
    .data(additions)
  .enter().append("div")
    .style("width", function(d) {  return y(d) + "px"; });
    // .text(function(d) { return d; });

d3.select(".added")
  .selectAll("div")
    .data(removals)
  .enter().append("div")
    .style("width", function(d) { return y(d) + "px"; });
    // .text(function(d) { return d; });

// console.log('comments' + comments);
// console.log('authors' + authors);
console.log('added ' + additions);
console.log('removed ' + removals);
console.log('all' + allValues);