function put(id, string){
	var elem = document.getElementById(id);
	elem.innerHTML = string;
}

var hostname = 'localhost',
	socket = io.connect('//' + hostname + ':8000');

var x1 = 0,
	x2 = 0,
	y1 = 0,
	y2 = 0,
	x = 0,
	y = 0,
	xoffset = 0,
	yoffset = 0,
	xper = 0,
	yper = 0;

if(window.DeviceOrientationEvent){
	put("debug", "you support orientation!");
	start();
}else{
	put("debug", "you don't support orientation :( sad face :(")
}

function start(){

	var game = function(){};

	window.addEventListener('deviceorientation', function(event) {
	  var alpha = event.alpha;
	  var beta = event.beta;
	  var gamma = event.gamma;
	  x = alpha;
	  y = beta;
	  put("debug", "alpha: " + alpha + ", beta: " + beta + ", gamma: " + gamma);
	  game();
	}, false);

	calibrate();

	function calibrate(){
		var stage = 0;

		document.addEventListener('click', function(event){
			switch(stage){
				case 0:
					if(x > 270){
						xoffset = -90;
					}else if(x < 90){
						xoffset = 90;
					}
					yoffset = 100;
					put("instruction", "Calibrate top-left");
					break;
				case 1:
					x1 = x;
					y1 = y;
					put("instruction", "Calibrate top-right");
					break;
				case 2:
					x2 = x;
					y1 = y;
					put("instruction", "Calibrate bottom-right");
					break;
				case 3:
					x2 = x;
					y2 = y;
					put("instruction", "Calibrate bottom-left");
					break;
				case 4:
					x1 = x;
					y2 = y;
					play();
					put("instruction", "");
					break;
			}
			stage++;
			put("x1", "x1: " + (x1 + xoffset));
			put("x2", "x2: " + (x2 + xoffset));
			put("y1", "y1: " + (y1 + yoffset));
			put("y2", "y2: " + (y2 + yoffset));
		});
	}

	function play(){
		game = function(){
			var xrange = (x1 + xoffset) - (x2 + xoffset);
			var xpositioninrange = (x1 + xoffset) - (x + xoffset);
			xper = (xpositioninrange / xrange);

			var yrange = (y1 + yoffset) - (y2 + yoffset);
			var ypositioninrange = (y1 + yoffset) - (y + yoffset);
			yper = (ypositioninrange / yrange);

			socket.emit('crosshair', { xper: xper, yper: yper });

			put("xper", "xper: " + (xper));
			put("yper", "yper: " + (yper));
		};

		document.addEventListener('click', function(event){
			socket.emit('shot');
		});
	}
}
