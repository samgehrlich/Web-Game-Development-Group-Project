class LoadScene extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }
    create() {
        this.add.text(40, 40, "Loading pong game...");
        this.scene.start("playGame");
    }
}