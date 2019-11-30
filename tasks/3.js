// Holds on to the population for each city
var mapCode = function() {
   emit({"city" : this.city, "state" : this.state}, this.pop);
}

var reduceCode = function(key, values) {
	return Array.sum(values);
}
 
 db.zips.mapReduce(mapCode, reduceCode, { 
   out: "city_populations"
})
 