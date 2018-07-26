//splash 2seg duracion
window.onload = () => {
	setTimeout(function(){
		const containerPreloader = document.getElementById('containerPreloader');
		containerPreloader.style.visibility = 'hidden';
		containerPreloader.style.opacity = '0';
	},2000)
}


//declarando variables
let restaurant = null;
let localRest = null;

//conexion al json restaurantes
fetch('js/restaurantes.json')
.then(response => response.json())
.then(restaurantesJSON => {
	restaurant = restaurantesJSON;
	//console.log(restaurant);
  //funcion q verifica que este lista la respuesta del json
  okRestaurantesJson();
})
.catch(error => {
	console.error("No pudimos obtener respuesta");
	console.error("ERROR > " + error.stack);
});

//recorriendo json
const restName = (restaurant) =>{
  for (let i in restaurant){
    let nameRest = restaurant[i].name;
    console.log(nameRest);
  }
  return restaurant;
}
//funcion q verifica que este lista la respuesta del json
const okRestaurantesJson = () => {
	localRest = restName(restaurant);
}

//filtro de locales por nombre

filterUsers = (localRest, search) => {
  if(search){
    if(localRest){
      search =search.toLowerCase();
      return  localRest.filter(user => user &&
       user.name &&
       user.name.toLowerCase().indexOf(search)>= 0);
    }
  }
  return localRest;
};

//muestra listado de restaurantes segun la busqueda
function onSearchBoxChange(){
  const search = document.getElementById("searchBox").value;
  const restContainer = document.getElementById("contentRest");
  const filteredUsers = filterUsers(localRest, search);
  console.log(localRest);
  restContainer.innerHTML = "";
  filteredUsers.forEach(rest => {
  	console.log("entra foreach");
    restContainer.innerHTML += `<p><a href="#" onclick="mostrarModal('${rest.name}','${rest.category}','${rest.address}','${rest.city}','${rest.region}','${rest.phone}','${rest.urlPhoto}','${rest.letitudo}','${rest.longitud}')" data-toggle="modal" data-target="#exampleModal" >${rest.name}</a></p>`;
  });
}

//comparala busqueda con lo q esta en el json
filterCategory = (localRest, search) => {
  if(search){
    if(localRest){
      search =search.toLowerCase();
      return  localRest.filter(user => user &&
       user.category &&
       user.category.toLowerCase().indexOf(search)>= 0);
    }
  }
  return localRest;
};
//muestra listado de restaurantes segun la busqueda
function onSearchCategory(){
  const search = document.getElementById("searchBoxCategory").value;
  const restContainer = document.getElementById("contentRest2");
  const filteredUsers = filterCategory(localRest, search);
  console.log(localRest);
  restContainer.innerHTML = "";
  filteredUsers.forEach(rest => {
  	console.log("entra foreach");
    restContainer.innerHTML += `<p><a href="#" onclick="mostrarModal('${rest.name}','${rest.category}','${rest.address}','${rest.city}','${rest.region}','${rest.phone}','${rest.urlPhoto}')" data-toggle="modal" data-target="#exampleModal" >${rest.name}</a></p>`;
  });
}

//modal donde muestra los datos del restaurant seleccionado
function mostrarModal(nombre, categoria, direccion, ciudad, region, fono, urlFoto, latitud, longitud){
	document.getElementById('searchBox').value="";
	let contentRest = document.getElementById('contentRest');
	contentRest.innerHTML = "<div class='modal fade' id='exampleModal' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'><h5 class='text-center' id='exampleModalLabel'>"+nombre+"</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body text-center'><img src='"+urlFoto+"' width='150'><br/>Categoría:"+categoria+"<br/>Ciudad:"+ciudad+"<br/>Region:"+region+"</div><div id='mapRest'></div></div></div></div>";
	let mapRest;
  mapRest = new google.maps.Map(document.getElementById('mapRest'), {
    center: {lat: -30.400, lng: -70.644},
    zoom: 10
  });
  
}

