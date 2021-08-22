/*var rawFile = new XMLHttpRequest();
var allText = '';
rawFile.open("GET", "militaryBase.txt", false);
rawFile.onreadystatechange = function () {
  if (rawFile.readyState === 4) {
    if (rawFile.status === 200 || rawFile.status == 0) {
      allText = rawFile.responseText;
      alert(allText);
    }
  }
}

for (let i = 0; i < 1; i++) {
  let x = 0;

  lat = '';
  while (allText.charAt(x) != '/'){
    lat += allText.charAt(x);
    x++;
  }

  long = '';
  while (allText.charAt(x) != '/'){
    long += allText.charAt(x);
    x++;
  }

  loc = '';
  while (allText.charAt(x) != '/'){
    lat += allText.charAt(x);
    x++;
  }

  tm = '';
  while (allText.charAt(x) != '/'){
    lat += allText.charAt(x);
    x++;
  }

  console.log(lat + long + loc + tm);
  setFireToTheSun(lat, long, loc, parseInt(tm));
  //setFireToTheSun('33.3152', '44.3661', 'Camp Victory, Baghdad, Iraq', 7);
  //setFireToTheSun('38.9072', '77.0369', 'The Pentagon, Washington, DC', 0);
}*/
setFireToTheSun('33.3152', '44.3661', 'Camp Victory, Baghdad, Iraq', 7);
setFireToTheSun('38.9072', '-77.0369', 'The Pentagon, Washington, DC', 0);
setFireToTheSun('-23.37', '-132.34', 'Alice Springs, Northern Territory', 13.5);
setFireToTheSun('16.9742', '-7.9865', 'Niger Air Base 201', 5);
setFireToTheSun('48.7758', '-9.1829', 'Patch Barracks, Stuttgart, Germany', 6);
setFireToTheSun('30.9685', '35.0971', 'Dimona Radar Facility, Israel', 7);
setFireToTheSun('38.9072', '77.0369', 'The Pentagon, Washington, DC', 0);
setFireToTheSun('38.9072', '77.0369', 'The Pentagon, Washington, DC', 0);
setFireToTheSun('38.9072', '77.0369', 'The Pentagon, Washington, DC', 0);
setFireToTheSun('38.9072', '77.0369', 'The Pentagon, Washington, DC', 0);
setFireToTheSun('38.9072', '77.0369', 'The Pentagon, Washington, DC', 0);
setFireToTheSun('38.9072', '77.0369', 'The Pentagon, Washington, DC', 0);



function setFireToTheSun(lat, long, loc, tm) {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.sunrise-sunset.org/json?lat='+lat+'&lng='+ long, true);

  request.onload = function () {
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
      console.log(data.results.sunrise);
      console.log(data.results.sunset);

      //Sunrise Time
      let strH = "";
      let i = 0;
      while (data.results.sunrise.charAt(i) != ":") {
        strH += data.results.sunrise.charAt(i);
        i++;
      }
      let hourSr = parseInt(strH);

      let strM = "";
      i++;
      while (data.results.sunrise.charAt(i) != ":") {
        strM += data.results.sunrise.charAt(i);
        i++;
      }
      let minSr = parseInt(strM);

      let srTime = (hourSr * 60 * 60) + (minSr * 60);

      //Sunset Time
      let strH1 = "";
      i = 0;
      while (data.results.sunset.charAt(i) != ":") {
        strH1 += data.results.sunset.charAt(i);
        i++;
      }
      let hourSs = parseInt(strH1);

      let strM1 = "";
      i++;
      while (data.results.sunset.charAt(i) != ":") {
        strM1 += data.results.sunset.charAt(i);
        i++;
      }
      let minSs = parseInt(strM1);

      let ssTime = (hourSs * 60 * 60) + (minSs * 60) + (12 * 60 * 60);

      //Current Time
      var now = new Date();
      let currTime = (now.getHours() * 60 * 60) + (now.getMinutes() * 60) + (tm * 60 * 60);
      if (currTime >= 24 * 60 * 60){
        currTime -= 24 * 60 * 60;
      }

      console.log(currTime);
      console.log(srTime);
      console.log(ssTime);

      if (currTime >= srTime && currTime <= ssTime) {
        console.log("The Sun Never Sets on the American Military Base");
        var mb = document.getElementById("militaryBases");
        var text = document.createTextNode(loc + "%0A");
        mb.appendChild(text);
      }
    } else {
      console.log('error');
    }
  }

  request.send();
}
