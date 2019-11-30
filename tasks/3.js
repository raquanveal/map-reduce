// Holds on to the population for each city
var mapCode = function() {
   emit(this.state,
     { "data":
		[
			{
				"name": this.city,
				"pop":  this.pop,
			}
		]
	});
}

var reduceCode = function(key, values) {

	var reduced = {"data":[]};
	for (var i in values) {
		var inter = values[i];
		for (var j in inter.data) {
			reduced.data.push(inter.data[j]);
		}
	}

	return reduced;
}
 
 db.zips.mapReduce(mapCode, reduceCode, { 
   out: "city_populations"
})
   
db.closest.find().forEach(printjson)