import { Scene } from 'phaser'


export default class Home extends Scene {
    constructor() {
        super({ key: 'Home' });
        this.customObj = {};
    }

    init(message) {
        this.message = message.text;
    }

    create () {
        this.backyard = this.add.sprite(this.game.customParams.centerX, this.game.customParams.centerY, 'backyard')
            .setInteractive()
            .on('pointerdown', function () { this.scene.start('PlayScene')}, this);

        var style = {font: "20px Arial", fill: '#fff', align: "center" };
        this.add.text(this.game.customParams.centerX, this.game.customParams.centerY*1.7, 'TOUCH TO START', style).setOrigin(0.5, 0.5);

        if(this.message) {
            this.add.text(this.game.customParams.centerX, this.game.customParams.centerY*1.5, this.message, style).setOrigin(0.5, 0.5);
        }
    }
}