/* Configure Game */
const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1000,
    height: 700,
    backgroundColor: '#FF6F61',
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
       preload: preload, 
       create: create, 
       update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false,
        }
    }
};

/* Global Constants */
const BALL_START_SPEED_X = 300;
const BALL_START_SPEED_Y = 250;
const PADDLE_SPEED = 500;
const SCORE_TO_WIN = 11;

/* Global Variables */
let game = new Phaser.Game(config);
let gameIsPaused;
let screenCenterX;
let screenCenterY;
let firstPlayer;
let secondPlayer;
let firstPlayerScore;
let secondPlayerScore;
let scoreboard;
let ballBounce;

/* Preload Images */
function preload() {
    this.load.image('theBalls', 'assets/ball.png');
    this.load.image('saucePaddle', 'assets/sauce.png');
    this.load.image('ridderPaddle', 'assets/desmond-ridder.png');
    this.load.image('background', 'assets/nippert.jpeg');
    this.load.image('return', 'assets/return.png');
}

/* Create Scene */
function create() {

    /* Set Screen Center */
    screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    /* Add Background */
    let backgroundImage = this.add.image(0, 0, 'background');
    backgroundImage.displayHeight = this.sys.game.config.height;
    backgroundImage.scaleX = backgroundImage.scaleY;
    backgroundImage.y = game.config.height / 2;
    backgroundImage.x = game.config.width / 2;
    backgroundImage.x = backgroundImage.displayWidth * 0.4;

    /* Create Ball */
    ballBounce = this.physics.add.sprite(
        screenCenterX,
        screenCenterY,
        'theBalls'
    ); 
    ballBounce.setCollideWorldBounds(true);
    ballBounce.setBounce(1, 1);

    /* Create First Player */
    firstPlayer = this.physics.add.sprite(
        40,
        screenCenterY,
        'ridderPaddle'
    );
    firstPlayer.setImmovable(true);
    firstPlayer.setCollideWorldBounds(true);
    
    /* Create Second Player */
    secondPlayer = this.physics.add.sprite(
        (screenCenterX * 2) - 40,
        screenCenterY,
        'saucePaddle'
    );
    secondPlayer.setImmovable(true);
    secondPlayer.setCollideWorldBounds(true);

    /* Add Colliders */
    this.physics.add.collider(ballBounce, firstPlayer);
    this.physics.add.collider(ballBounce, secondPlayer);

    /* Add Scoreboard */
    scoreboard = this.add.text(screenCenterY, screenCenterX, "Click The Button To Start", {fill: "white"});
    
    // add new game button
    this.add.image(390,500, 'return').setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        startNewGame();
    });
}

/* Update Scene */
function update() {

    /* Ball Passes Player 1 */
    if (ballBounce.body.x < firstPlayer.body.x) {
        if(secondPlayerScore >= (SCORE_TO_WIN - 1)) {
            /* Player 2 Wins Game */
            endGame();
            scoreboard.setText("Player 2 Has Won The Game!");
        } else {
            /* Player 2 Wins Round */
            secondPlayerScore += 1;
            startNewRound();
        }
    }

    /* Ball Passes Player 2 */
    if (ballBounce.body.x > secondPlayer.body.x) {
        if(firstPlayerScore >= (SCORE_TO_WIN - 1)) {
            /* Player 1 Wins Game */
            endGame();
            scoreboard.setText("Player 1 Has Won The Game!");
        } else {
            /* Player 1 Wins Round */
            firstPlayerScore += 1;
            startNewRound();
        }
    }

    /* Move Player 1 */
    if(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) {
        /* Move Up */
        firstPlayer.setVelocityY(-1 * PADDLE_SPEED);
    } else if(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
        /* Move Down */
        firstPlayer.setVelocityY(PADDLE_SPEED);
    } else {
        /* Stop Moving */
        firstPlayer.setVelocityY(0);
    }

    /* Move Player 2 */
    if(this.input.keyboard.createCursorKeys().up.isDown) {
        /* Move Up */
        secondPlayer.setVelocityY(-1 * PADDLE_SPEED);
    } else if (this.input.keyboard.createCursorKeys().down.isDown) {
        /* Move Down */
        secondPlayer.setVelocityY(PADDLE_SPEED);
    } else {
        /* Stop Moving */
        secondPlayer.setVelocityY(0);
    }
}

/* Start A New Game */
function startNewGame() {

    /* Unpause Game */
    gameIsPaused = false;

    /* Set Scores */
    firstPlayerScore = 0;
    secondPlayerScore = 0;
    
    startNewRound();
}

/* Start A New Round */
function startNewRound() {

    /* Update The Scoreboard */
    scoreboard.setText(firstPlayerScore + " | " + secondPlayerScore);

    /* Stop The Ball */
    ballBounce.setVelocityX(0);
    ballBounce.setVelocityY(0);

    /* Put The Ball In The Center */
    ballBounce.setPosition(screenCenterX, screenCenterY)

    /* Send The Ball After 2 Seconds (2000 miliseconds) */
    setTimeout(function() {

        /* Get Random Number To Determine Ball Start Direction */
        let randomNumber = Math.floor(Math.random() * 4) + 1;

        /* Add Speed To The Ball */
        switch(randomNumber) {
            case 1:
                /* Speed Bottom Right */
                ballBounce.setVelocityX(BALL_START_SPEED_X);
                ballBounce.setVelocityY(BALL_START_SPEED_Y);
                break;
            case 2:
                /* Speed Bottom Left */
                ballBounce.setVelocityX(-BALL_START_SPEED_X);
                ballBounce.setVelocityY(BALL_START_SPEED_Y);
                break;
            case 3:
                /* Speed Top Left */
                ballBounce.setVelocityX(-BALL_START_SPEED_X);
                ballBounce.setVelocityY(-BALL_START_SPEED_Y);
                break;
            default:
                /* Speed Top Right */
                ballBounce.setVelocityX(BALL_START_SPEED_X);
                ballBounce.setVelocityY(-BALL_START_SPEED_Y);
                break;
        }
    }, 2000);
}

/* End The Game */
function endGame() {

    /* Stop The Ball */
    ballBounce.setVelocityX(0);
    ballBounce.setVelocityY(0);
}