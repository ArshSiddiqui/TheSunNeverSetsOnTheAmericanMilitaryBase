setFireToTheSun('33.3152', '44.3661', 'Camp Victory, Baghdad, Iraq', "");
setFireToTheSun('38.9072', '77.0369', 'The Pentagon, Washington, DC');

function setFireToTheSun(lat, long, loc) {
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
      var requestTZ = new XMLHttpRequest();
      requestTZ.open('GET', 'https://maps.googleapis.com/maps/api/timezone/json?location='+lat+','+long, true);
      let timeZone = '';
      requestTZ.onload = function () {
        var dataTZ = JSON.parse(this.response);
        console.log(dataTZ);
        //timeZone = data.
      }
      let currTime = (12 * 60 * 60) + (30 * 60);


      if (currTime >= srTime && currTime <= ssTime) {
        console.log("The Sun Never Sets on the American Military Base");
        var mb = document.getElementById("militaryBases");
        var text = document.createTextNode(loc + "</br>");
        mb.appendChild(text);
      }
    } else {
      console.log('error');
    }
  }

  request.send();
}