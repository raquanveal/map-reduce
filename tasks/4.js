/* Finds the city with the smallest population for each state. */

var mapCode = function() {
   emit(this._id.state, { 
		"city": this._id.city,
		"pop": this.value.pop
	});
}

var reduceCode = function(key, values) {
	let min = 999999999999;
	let name = undefined;

	for (var i in values) {
		let city = values[i];

		if (city.pop < min) {
			min = city.pop;
			name = city.city;
		}
	}

	return {"city": name, "pop": min };
}


db.city_populations.mapReduce(mapCode, reduceCode, {
	out: "smallest_state_cities",
})