// declarando funcion global
window.view = {};

window.view.index = () => {
    let containerIndex = document.getElementById('containerIndex');
    containerIndex.innerHTML =
        `
	<div class="row">
		<div class="col-12 mt-4">
			<h1 class="display-4 text-warning text-center">FoodMap <i class="fas fa-utensils"></i></h1>
		</div>
	</div>
	<hr class="bg-white">
	<div class="row">
		<div class="col-12">
			<p class="lead text-center text-warning textSize">Comidas cerca de ti</p>
			<!-- <div id="map" class="mb-3">-->
			<!--mapa-->
			<!-- </div>  -->
				<div class="bannerFood pb-5">
					<img src="src/img/food.jpg" class="img-fluid d-block m-auto">
				</div>
				<p class="text-warning lead">Buscar por Nombre de Restaurant</p>
				<div class="input-group mb-3">
					<input type="text" id="searchBox" class="form-control" onkeyup="window.controller.answersRest()" placeholder="Filtrar Restaurantes">
					<div class="input-group-append">
						<button id="btnSearch" class="btn btn-warning" type="button"><i class="fas fa-search"></i></button>
					</div>
				</div>
				<div id="contentRest">
				<!--resultado busqueda por nombre-->
				</div>
				<p class="text-warning lead">Buscar por Categorias</p>
				<div class="input-group mb-3">
					<input type="text" id="searchBoxCategory" class="form-control" onkeyup="window.controller.answersCategory()" placeholder="Filtrar por Categorias">
					<div class="input-group-append">
						<button id="btnSearch" class="btn btn-warning" type="button"><i class="fas fa-search"></i></button>
					</div>
				</div>
			<div id="contentRest2">
			<!--resultado busqueda por categoria-->
			</div>
		</div>
	</div>
	`;
};

// input de busqueda restaurant por nombre
window.view.onSearchBoxChange = () => {
    const search = document.getElementById('searchBox').value;
    const restContainer = document.getElementById('contentRest');
    const filteredRest = window.controller.controllerFilterRest(localRest, search);
    restContainer.innerHTML = '';
    if (search != '') {
        filteredRest.forEach(rest => {
            restContainer.innerHTML += `<p><a href="#" onclick="window.view.mostrarModal('${rest.name}','${rest.category}','${rest.address}','${rest.city}','${rest.region}','${rest.phone}','${rest.urlPhoto}','${rest.latitud}','${rest.longitud}')" data-toggle="modal" data-target="#exampleModal" >${rest.name}</a></p>`;
        });
    }
};

// input de busqueda restaurant por categoria
window.view.onSearchCategory = () => {
    const search = document.getElementById('searchBoxCategory').value;
    const restContainer = document.getElementById('contentRest2');
    const filteredCategory = window.controller.controllerFilterCategory(localRest, search);
    restContainer.innerHTML = '';
    if (search != '') {
        filteredCategory.forEach(rest => {
            restContainer.innerHTML += `<p><a href="#" onclick="window.view.mostrarModal('${rest.name}','${rest.category}','${rest.address}','${rest.city}','${rest.region}','${rest.phone}','${rest.urlPhoto}','${rest.latitud}','${rest.longitud}')" data-toggle="modal" data-target="#exampleModal" >${rest.name}</a></p>`;
        });
    }
};

// modal que muestra el restaurante buscado
window.view.mostrarModal = (nombre, categoria, direccion, ciudad, region, fono, urlFoto, latitud, longitud) => {
    document.getElementById('searchBox').value = '';
    latitud = parseFloat(latitud);
    longitud = parseFloat(longitud);
    let contentRest = document.getElementById('contentRest');
    contentRest.innerHTML = '<div class=\'modal fade\' id=\'exampleModal\' tabindex=\'-1\' role=\'dialog\' aria-labelledby=\'exampleModalLabel\' aria-hidden=\'true\'><div class=\'modal-dialog justify-content-center\' role=\'document\'><div class=\'modal-content justify-content-center\'><div class=\'modal-header\'><h5 id=\'exampleModalLabel\'>' + nombre + '</h5><button type=\'button\' class=\'close\' data-dismiss=\'modal\' aria-label=\'Close\'><span aria-hidden=\'true\'>&times;</span></button></div><div class=\'modal-body text-center\'><img src=\'' + urlFoto + '\' width=\'250\'><p class=\'infoModalRest mt-4\'><b>Dirección: </b>' + direccion + '</p><p class=\'infoModalRest\'><b>Categoría: </b>' + categoria + '</p><p class=\'infoModalRest\'> <b>Ciudad: </b>' + ciudad + '</p><p class=\'infoModalRest\'><b>Region: </b>' + region + '</p><p class=\'infoModalRest\'><b>Telefono: </b>' + fono + '</p></div><div id=\'mapRest\'></div></div></div></div>';
    let mapRest;
    mapRest = new google.maps.Map(document.getElementById('mapRest'), {
        center: {
            lat: latitud,
            lng: longitud
        },
        zoom: 14
    });
    var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    var beachMarker = new google.maps.Marker({
        position: {
            lat: latitud,
            lng: longitud
        },
        map: mapRest,
        icon: image
    });
};