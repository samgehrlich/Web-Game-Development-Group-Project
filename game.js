const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 640,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
       preload, create, update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false,
        }
    }
};

let game = new Phaser.Game(config);
let firstPlayer;
let secondPlayer;
let ballBounce;


function preload() {
    this.load.image('theBalls', 'ball.png');
    this.load.image('thePaddles', 'paddle.png');
}

function create() {
    ballBounce = this.physics.add.sprite(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'theBalls'
    ); 

    firstPlayer = this.physics.add.sprite(
        this.physics.world.bounds.width - (ballBounce.body.width / 2 + 1),
        this.physics.world.bounds.height / 2,
        'thePaddles'
    );
    
    secondPlayer = this.physics.add.sprite(
        ballBounce.body.width / 2 + 1,
        this.physics.world.bounds.height / 2,
        'thePaddles'
    );
}

function update() {
    let startXVelocity = 100;
    let startYVelocity = 100;
    ballBounce.setVelocityX(startXVelocity);
    ballBounce.setVelocityY(startYVelocity);
}

