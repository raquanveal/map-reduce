/* Finds the city with the smallest population for each state. */

// Groups the data by state. Each collection knows its city and population.
var mapCode = function() {
   emit(this._id.state,
     { "data":
		[
			{
				"city": this._id.city,
				"pop":  this.value,
			}
		]
	});
}

// Now that collections are grouped by state, find city with min pop
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

var finalize = function (key, reduced) {

	var min_pop = 999999999999;
	let city;

	for (var i in reduced.data) {
		let c = reduced.data[i].city;
		pop = reduced.data[i].pop;
		
		if (pop < min_pop) {
			min_pop = pop;
			city = c;
		}
	}

	return {"city": city, "pop": min_pop};
}

db.city_populations.mapReduce(mapCode, reduceCode, {
	out: "smallest_state_cities",
	finalize: finalize
})
 