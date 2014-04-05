var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

var hostname = '192.168.1.200',
	socket = io.connect('//' + hostname + ':8000');

var crosshair,
	shot,
	xper = 0,
	yper = 0;

function preload() {
    game.load.image('crosshair', '/game/crosshair.png');
    game.load.audio('shot', ['/game/shot.mp3', '/game/shot.wav']);
}

function create() {
    crosshair = game.add.sprite(0, 0, 'crosshair');
    game.physics.enable(crosshair, Phaser.Physics.ARCADE);
    shot = game.add.audio('shot');
}

function update(){
	crosshair.body.x = xper;
    crosshair.body.y = yper;
}

socket.on('crosshairpos', function(data){
	xper = data.xper * 800;
	yper = data.yper * 600;
});

socket.on('shot', function(){
	console.log('shot');
	shot.play();
});