var config = {
    width: 1334,
    height: 750,
    backgroundColor: 0x000000,
    scene: [LoadScene, PlayScene],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
}

var game = new Phaser.Game(config);