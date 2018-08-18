// declarando funcion global
window.model = {};

// declarando variables
let restaurant = null;
let localRest = null;
let search = null;

//llamando json
fetch('src/js/restaurantes.json')
.then(response => response.json())
.then(restaurantesJSON => {
	restaurant = restaurantesJSON;
	localRest = window.model.restName(restaurant);
	// console.log(localRest);
})
.catch(error => {
	console.error("No pudimos obtener respuesta");
	console.error("ERROR > " + error.stack);
});

//  recorriendo json
window.model.restName = (restaurant) => {
	for (let i in restaurant){
		let nameRest = restaurant[i].name;
	}
	return restaurant;
}

// filtro de locales por nombre
window.model.filterRest = (localRest, search) => {
	if(search){
		if(localRest){
			search = search.toLowerCase();
			return  localRest.filter(rest => rest &&
				rest.name &&
				rest.name.toLowerCase().indexOf(search)>= 0);
		}
	}
	return localRest;
};

// filtrando locales por categoria
window.model.filterCategory = (localRest, search) => {
	if(search){
		if(localRest){
			search = search.toLowerCase();
			return  localRest.filter(rest => rest &&
				rest.category &&
				rest.category.toLowerCase().indexOf(search)>= 0);
		}
	}
	return localRest;
};



