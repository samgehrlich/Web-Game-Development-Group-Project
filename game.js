const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 900,
    height: 740,
    backgroundColor: '#FF6F61',
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

/*------Values for use------*/

let game = new Phaser.Game(config);
let beginPong = false;
let firstPlayer;
let secondPlayer;
let ballBounce;

const PADDLE_SPEED = 300;

/*----Pre Load-----*/

function preload() {
    this.load.image('theBalls', 'ball.png');
    this.load.image('thePaddles', 'paddle.png');
}

/*----- Create Ball and Paddles-----*/

function create() {
    ballBounce = this.physics.add.sprite(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'theBalls'
    ); 

    ballBounce.setCollideWorldBounds(true);


    ballBounce.setBounce(1, 1);
    firstPlayer = this.physics.add.sprite(
        this.physics.world.bounds.width - (ballBounce.body.width / 2 + 1),
        this.physics.world.bounds.height / 2,
        'thePaddles'
    );
    firstPlayer.setImmovable(true);
    
    secondPlayer = this.physics.add.sprite(
        ballBounce.body.width / 2 + 1,
        this.physics.world.bounds.height / 2,
        'thePaddles'
    );
    secondPlayer.setImmovable(true);
    this.physics.add.collider(ballBounce, firstPlayer);
    this.physics.add.collider(ballBounce, secondPlayer);


    
}

/*------Update The ball and paddle for movement-------*/

function update() {

    if(!beginPong) {
        let x = 200;
        let y = 200;
        ballBounce.setVelocityX(x);
        ballBounce.setVelocityY(y);
        beginPong = true;
    }

    /* Move Player 1 */
    if(this.input.keyboard.createCursorKeys().up.isDown) {
        /* Move Up */
        firstPlayer.setVelocityY(-1 * PADDLE_SPEED);
    } else if (this.input.keyboard.createCursorKeys().down.isDown) {
        /* Move Down */
        firstPlayer.setVelocityY(PADDLE_SPEED);
    } else {
        /* Stop Moving */
        firstPlayer.setVelocityY(0);
    }

    /* Move Player 2 */
    if(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) {
        /* Move Up */
        secondPlayer.setVelocityY(-1 * PADDLE_SPEED);
    } else if(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
        /* Move Down */
        secondPlayer.setVelocityY(PADDLE_SPEED);
    } else {
        /* Stop Moving */
        secondPlayer.setVelocityY(0);
    }

    if(ballBounce.body.velocity.y > PADDLE_SPEED) {
        ballBounce.body.setVelocityY(PADDLE_SPEED)
    }

    if(ballBounce.body.velocity.y < -PADDLE_SPEED) {
        ballBounce.body.setVelocityY(-PADDLE_SPEED);
    }

}

