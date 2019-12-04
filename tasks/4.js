/* Finds the city with the largest population for each state. */

var mapCode = function() {
   emit(this._id.state, { 
		"city": this._id.city,
		"pop": this.value
	});
}

var reduceCode = function(key, values) {
	let max = 0;
	let name = undefined;

	for (var i in values) {
		let city = values[i];

		if (city.pop > max) {
			max = city.pop;
			name = city.city;
		}
	}

	return {"city": name, "pop": max };
}


db.city_populations.mapReduce(mapCode, reduceCode, {
	out: "smallest_state_cities",
})