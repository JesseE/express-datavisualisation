var x = d3.scale.linear()
    .domain([ 0, d3.max(allValues)])
    .range([ 0, 250]);

d3.select(".removed")
  .selectAll("div")
    .data(additions)
  .enter().append("div")
    .style("width", function(d) {  return x(d) + "px"; })
     .on("mouseover", function(d){
        d3.select(this)
          .append("span")
          .style("position","absolute")
          .style("color","white")
          .text(function(d){ return "lines added: "+ d;});
    })
    .on("mouseout", function(d){
        d3.selectAll("span")
          .remove();
    });
    // .text(function(d) { return d; });

d3.select(".added")
  .selectAll("div")
    .data(removals)
  .enter().append("div")
    .style("width", function(d) { return x(d) + "px"; })
    .on("mouseover", function(d){
      d3.select(this)
        .append("span")
        .style("position","absolute")
        .style("color","white")
        .text(function(d) { return "lines removed: "+ d;});
    })
    .on("mouseout", function(d){
      d3.selectAll("span")
        .remove();
    });

// console.log('comments' + comments);
console.log('added ' + additions);
console.log('removed ' + removals);
console.log('all' + allValues);
