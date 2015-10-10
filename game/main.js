var width = 800,
	height = 600;

var game = new Phaser.Game(width, height, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

var hostname = 'localhost',
	socket = io.connect('//' + hostname + ':8000');

var crosshair,
	bieber,
	shot,
	xper = 0,
	yper = 0,
	score = 0,
	bgGroup,
	scoreText;

function preload() {
    game.load.image('bieber', '/game/bieber.png');
    game.load.image('crosshair', '/game/crosshair.png');
    game.load.image('spatter1', '/game/spatter1.png');
    game.load.image('spatter2', '/game/spatter2.png');
    game.load.audio('shot', ['/game/shot.mp3', '/game/shot.wav']);
}

function create() {
	bgGroup = game.add.group();
    bieber = game.add.sprite(width/2, height/2, 'bieber');
    crosshair = game.add.sprite(0, 0, 'crosshair');
    game.physics.enable(crosshair, Phaser.Physics.ARCADE);
    shot = game.add.audio('shot');
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
    setInterval(function(){
    	bieber.x = Math.random() * (width - 100) + 50 - 100;
		bieber.y = Math.random() * (height - 100) + 50 - 100;
    }, 1500);
}

function update(){
	crosshair.body.x = xper - 64;
    crosshair.body.y = yper - 64;
}

socket.on('crosshairpos', function(data){
	xper = data.xper * width;
	yper = data.yper * height;
});

socket.on('shot', function(){
	console.log('shot');
	shot.play();
	if(crosshair.x + 64 > bieber.x && crosshair.x + 64 < bieber.x + bieber.width){
		if(crosshair.y + 64 > bieber.y && crosshair.y + 64 < bieber.y + bieber.height){
			var spatterx = bieber.x + (bieber.width/2) + (Math.random() * 50) - (Math.random() * 50) - 50;
			var spattery = bieber.y + (bieber.height/2) + (Math.random() * 50) - (Math.random() * 50) - 100;
			spatters = ['spatter1', 'spatter2'];
			console.log(Math.floor(Math.random()*2));
			var spatter = game.add.sprite(spatterx, spattery, spatters[Math.floor(Math.random()*2)]);
			bgGroup.add(spatter);
			score += 110;
			scoreText._text = 'score: ' + score;
		}
	}
});
