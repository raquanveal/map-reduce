// Holds on to the population for each city

// Group by state and city
var mapCode = function() {
   emit({"city" : this.city, "state" : this.state}, this.pop);
}

// If there are multiple cities in a state with the same name, sum their pops.
var reduceCode = function(key, values) { return Array.sum(values); }
 
db.zips.mapReduce(mapCode, reduceCode, {out: "city_populations"})
 