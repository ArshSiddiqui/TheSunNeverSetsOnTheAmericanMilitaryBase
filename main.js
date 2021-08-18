var request = new XMLHttpRequest();
request.open('GET', 'https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400', true);
//request.respondType = 'json';
//request.send();

request.onload = function() {
  //const riseSet = request.response;
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400){
    console.log(latitude);
  } else {
    console.log('error');
  }
}

request.send();


