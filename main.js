var request = new XMLHttpRequest();
request.open('GET', 'https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400', true);
//request.respondType = 'json';
//request.send();

request.onload = function() {
  //const riseSet = request.response;
  var data = JSON.parse(this.response)
  //console.log(data);
  //console.log(data.results.sunrise);
  if (request.status >= 200 && request.status < 400){
    console.log(data.results.sunrise);
    console.log(data.results.sunset);

    let strH = "";
    let i = 0;
    while (data.results.sunrise.charAt(i) != ":"){
      strH += data.results.sunrise.charAt(i);
      i++;
    }
    let hourSr = parseInt(strH);

    let strM = "";
    i++;
    while (data.results.sunrise.charAt(i) != ":"){
      strM += data.results.sunrise.charAt(i);
      i++;
    }
    let minSr = parseInt(strM);

    let srTime = (hourSr * 60 * 60) + (minSr * 60);

    //Sunset Time
    let strH1 = "";
    i = 0;
    while (data.results.sunset.charAt(i) != ":"){
      strH1 += data.results.sunset.charAt(i);
      i++;
    }
    let hourSs = parseInt(strH1);

    let strM1 = "";
    i++;
    while (data.results.sunset.charAt(i) != ":"){
      strM1 += data.results.sunset.charAt(i);
      i++;
    }
    let minSs = parseInt(strM1);

    let ssTime = (hourSs * 60 * 60) + (minSs * 60) + (12 * 60 * 60);

    //Current Time
    let currTime = (12 * 60 * 60) + (30 * 60);


    if(currTime >= srTime && currTime <= ssTime){
      console.log("The Sun Never Sets on the American Military Base");
    }
  } else {
    console.log('error');
  }
}

request.send();