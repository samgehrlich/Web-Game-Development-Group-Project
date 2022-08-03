/* Configure Game */
const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1097,
    height: 600,
    backgroundColor: '#FF6F61',
    scale: {
        //mode: Phaser.Scale.RESIZE,
        //autoCenter: Phaser.Scale.CENTER_BOTH
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

/* Global Constants */
const HALF_WORLD_WIDTH = 450;
const HALF_WORLD_HEIGHT = 370;
const BALL_START_SPEED_X = 400;
const BALL_START_SPEED_Y = 300;
const PADDLE_SPEED = 400;
const SCORE_TO_WIN = 11;

/* Global Variables */
let game = new Phaser.Game(config);
let gameIsPaused;
let firstPlayer;
let secondPlayer;
let firstPlayerScore;
let secondPlayerScore;
let scoreboard;
let ballBounce;

/* Preload Images */
function preload() {
    this.load.image('theBalls', 'assets/ball.png');
    this.load.image('thePaddles', 'assets/paddle.png');
    this.load.image('nippert', 'assets/nippert.png');
    this.load.image('button', 'assets/button.png');
}

/* Create Scene */
function create() {

    // Create background
    this.nippert = this.add.tileSprite(0, 0, config.width, config.height, "nippert");
    this.nippert.setOrigin(0, 0);

    /* Create Ball */
    ballBounce = this.physics.add.sprite(
        HALF_WORLD_WIDTH,
        HALF_WORLD_HEIGHT,
        'theBalls'
    ); 
    ballBounce.setCollideWorldBounds(true);
    ballBounce.setBounce(1, 1);

    /* Create First Player */
    firstPlayer = this.physics.add.sprite(
        ballBounce.body.width / 2 + 1,
        HALF_WORLD_HEIGHT,
        'thePaddles'
    );
    firstPlayer.setImmovable(true);
    firstPlayer.setCollideWorldBounds(true);
    
    /* Create Second Player */
    secondPlayer = this.physics.add.sprite(
        this.physics.world.bounds.width - (ballBounce.body.width / 2 + 1),
        HALF_WORLD_HEIGHT,
        'thePaddles'
    );
    secondPlayer.setImmovable(true);
    secondPlayer.setCollideWorldBounds(true);

    /* Add Colliders */
    this.physics.add.collider(ballBounce, firstPlayer);
    this.physics.add.collider(ballBounce, secondPlayer);

    /* Add Scoreboard */
    scoreboard = this.add.text(HALF_WORLD_HEIGHT, HALF_WORLD_WIDTH, "Game Starting...", {fill: "white"});
    
    // add new game button
    this.add.image(400,300, 'button').setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        startNewGame();
    });

    //Not sure if we need the next two lines below..
    /* LETS GOOOO :) */ //do we need this line?
    startNewGame(); //do we need this line?
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
    ballBounce.setPosition(HALF_WORLD_WIDTH, HALF_WORLD_HEIGHT)

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