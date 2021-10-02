var keycloak = new Keycloak();

function initKeycloak() {
	keycloak.init({onload: 'login-required'}).then(function() {
		contructTableRows(keycloak.idTokenParsed);
		pasteToken(keycloak.token);
	}).catch(function() {
		alert("failed to initialize");
	});
}

function contructTableRows(keycloakToken) {
	document.getElementById('username').innerHTML = keycloakToken.preferred_username;
}

function pasteToken(token) {
	document.getElementById('ta-token').value = token;
	document.getElementById('ta-refreshtoken').value = keycloak.refreshToken;
}

var refreshToken = function() {
	keycloak.updateToken(-1).then(function() {
		document.getElementById('ta-token').value = keycloak.token;
		document.getElementById('ta-refreshtoken').value = keycloak.refreshToken;
	});
}

function callAuthEndPoint() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if(this.readyState == 4 && this.status == 200) {
			alert (this.responseText);
		}
	};
	xhttp.open("GET", "http://localhost:7000/keycloak-servlet-example/servletEndPoint", true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.setRequestHeader("Authorization", keycloak.token);
	xhttp.send();
}

function validateInvalidToken() {
	var token = document.getElementById('ta-refreshtoken').value;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if(this.readyState == 4 && this.status == 200) {
			alert (this.responseText);
		} else if( this.status != 200) {
			alert(this.status);
		}
	};
	xhttp.open("GET", "http://localhost:7000/keycloak-servlet-example/servletEndPoint", true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.setRequestHeader("Authorization", keycloak.token);
	xhttp.send();
}