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
        this.physics.world.bounds.width,
        this.physics.world.bounds.height / 2,
        'thePaddles'
    )
    
}

function update() {

}

