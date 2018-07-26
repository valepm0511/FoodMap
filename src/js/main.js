//splash 2seg duracion
window.onload = () => {
	setTimeout(function(){
		const containerPreloader = document.getElementById('containerPreloader');
		containerPreloader.style.visibility = 'hidden';
		containerPreloader.style.opacity = '0';
	},1000)
}

const restName = (restaurant) =>{

	for (let i in restaurant){
		let nameRest = restaurant[i].name;
		console.log(nameRest);
	}

	return restaurant;
}

let restaurant = null;
let userRest = null;

//conexion al json restaurantes
fetch('js/restaurantes.json')
.then(response => response.json())
.then(restaurantesJSON => {
	restaurant = restaurantesJSON;
	//console.log(restaurant);
	okRestaurantesJson();
})
.catch(error => {
	console.error("No pudimos obtener respuesta");
	console.error("ERROR > " + error.stack);
});

const okRestaurantesJson = () => {
	userRest = restName(restaurant);
}


filterUsers = (userRest, search) => {
  if(search){
    if(userRest){
      search =search.toLowerCase();
      return  userRest.filter(user => user &&
       user.name &&
       user.name.toLowerCase().indexOf(search)>= 0);
    }
  }
  return userRest;
};

function onSearchBoxChange(){
  const search = document.getElementById("searchBox").value;
  const studentContainer = document.getElementById("contentRest");
  const filteredUsers = filterUsers(userRest, search);
  console.log(userRest);
  studentContainer.innerHTML = "";
  filteredUsers.forEach(student => {
  	console.log("entra foreach");
    studentContainer.innerHTML += `<p><a href="#" onclick="mostrarModal('${student.name}','${student.category}','${student.address}','${student.city}','${student.region}','${student.phone}','${student.urlPhoto}')" data-toggle="modal" data-target="#exampleModal" >${student.name}</a></p>`;
  });
}

filterCategory = (userRest, search) => {
  if(search){
    if(userRest){
      search =search.toLowerCase();
      return  userRest.filter(user => user &&
       user.category &&
       user.category.toLowerCase().indexOf(search)>= 0);
    }
  }
  return userRest;
};

function onSearchCategory(){
  const search = document.getElementById("searchBoxCategory").value;
  const studentContainer = document.getElementById("contentRest2");
  const filteredUsers = filterCategory(userRest, search);
  console.log(userRest);
  studentContainer.innerHTML = "";
  filteredUsers.forEach(student => {
  	console.log("entra foreach");
    studentContainer.innerHTML += `<p><a href="#" onclick="mostrarModal('${student.name}','${student.category}','${student.address}','${student.city}','${student.region}','${student.phone}','${student.urlPhoto}')" data-toggle="modal" data-target="#exampleModal" >${student.name}</a></p>`;
  });
}


function mostrarModal(nombre, categoria, direccion, ciudad, region, fono, urlFoto){
	document.getElementById('searchBox').value="";
	let contentRest = document.getElementById('contentRest');
	contentRest.innerHTML = "<div class='modal fade' id='exampleModal' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'><h5 class='text-center' id='exampleModalLabel'>"+nombre+"</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body text-center'><img src='"+urlFoto+"' width='150'><br/>Categoría:"+categoria+"<br/>Ciudad:"+ciudad+"<br/>Region:"+region+"</div><div id='mapRest'></div></div></div></div>";
	var mapRest;
        mapRest = new google.maps.Map(document.getElementById('mapRest'), {
          center: {lat: -30.400, lng: -70.644},
          zoom: 8
        });
      
}

