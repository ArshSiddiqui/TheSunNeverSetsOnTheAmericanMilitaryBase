setFireToTheSun('33.3152', '44.3661', 'Camp Victory, Baghdad, Iraq');
setFireToTheSun('38.9072', '-77.0369', 'The Pentagon, Washington, DC');
setFireToTheSun('-23.6980', '-133.8807', 'Alice Springs, Northern Territory');
setFireToTheSun('16.9742', '-7.9865', 'Niger Air Base 201');
setFireToTheSun('48.7758', '-9.1829', 'Patch Barracks, Stuttgart, Germany');
setFireToTheSun('30.9685', '35.0971', 'Dimona Radar Facility, Israel');


function setFireToTheSun(lat, long, loc) {
	var request = new XMLHttpRequest();
	request.open('GET', 'https://api.sunrise-sunset.org/json?lat='+lat+'&lng='+ long, true);
	setTimeout(() => {  console.log("------------------------Time wait"); }, 5000);
	request.onload = function () {
		var data = JSON.parse(this.response)
		setTimeout(() => {  console.log("------------------------Time wait"); }, 5000);
		if (request.status >= 200 && request.status < 400) {
			console.log(loc);
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
			let currTime = "";
			setTimeout(() => {  console.log("Time wait"); }, 5000);
			var localTimeRequest = new XMLHttpRequest();
			localTimeRequest.open('GET', 
				'http://api.timezonedb.com/v2.1/get-time-zone?key=WE8AZKS4ECTQ&format=json&by=position&lat='+lat+'&lng=' + long, true);
			
			console.log("Latitude = " + lat + " Longitude = " + long);
			
			localTimeRequest.onload = function () {
				var localTimeData = JSON.parse(localTimeRequest.response);
				
				if (localTimeRequest.status >= 200 && localTimeRequest.status < 400){
					console.log(localTimeData.formatted);
					
					
					let x = 11
					while (x < 19) {
						currTime += localTimeData.formatted.charAt(x)
						x += 1;
					}
					
					currTimeHours = 0;
					let y = 0;
					while (currTime.charAt(y) != ":") {
						currTimeHours += currTime.charAt(y);
						y++;
					}
					let currTimeHoursNum = parseInt(currTimeHours);
					
					currTimeMins = 0;
					y++;
					while (currTime.charAt(y) != ":") {
						currTimeMins += currTime.charAt(y);
						y++;
					}
					let currTimeMinsNum = parseInt(currTimeMins);
					
					currTimeSecs = 0;
					y++;
					let z = y;
					while (z <= y + 2) {
						currTimeSecs += currTime.charAt(y);
						z++;
					}
					let currTimeSecsNum = parseInt(currTimeSecs);
					
					let currTimeNum = (currTimeHoursNum * 60 * 60) + (currTimeMinsNum * 60) + currTimeSecsNum;
					
					console.log("Sunrise Time: " + srTime);
					console.log("Local Time: " + currTimeNum);
					console.log("Sunset Time: " + ssTime);
					
					if (currTimeNum >= srTime && currTimeNum <= ssTime) {
						console.log("The Sun Never Sets on the American Military Base");
						var mb = document.getElementById("militaryBases");
						var text = document.createTextNode(loc + "   ");
						mb.appendChild(text);
					}
							
				}
			}
			
			localTimeRequest.send();
		
			

		} else {
			console.log('error');
		}
	}
	request.send();
}
