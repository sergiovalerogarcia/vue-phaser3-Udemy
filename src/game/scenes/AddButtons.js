import { Scene } from 'phaser'

export default class AddButtons extends Scene {
    constructor() {
        super({ key: 'AddButtons' });
    }
    addButton(sceneOrigin) {
        let moves = {
            up: false,
            right: false,
            left: false
        };

        this.buttonUp = sceneOrigin.add.sprite(650, 630, 'pad').setInteractive().setScale(0.5);

        this.buttonRight = sceneOrigin.add.sprite(220, 630, 'pad').setInteractive().setScale(0.5).setAngle(90);

        this.buttonLeft = sceneOrigin.add.sprite(80, 630, 'pad').setInteractive().setScale(0.5).setAngle(270);

        this.buttonUp.on('pointerover', function (event) {
            this.setTint(0x000000);
            moves.up = true;
        });

        this.buttonUp.on('pointerout', function (event) {
            this.clearTint();
            moves.up = false;
        });

        this.buttonRight.on('pointerover', function (event) {
            this.setTint(0x000000);
            moves.right = true;
        });

        this.buttonRight.on('pointerout', function (event) {
            this.clearTint();
            moves.right = false;
        });

        this.buttonLeft.on('pointerover', function (event) {
            this.setTint(0x000000);
            moves.left = true;
        });

        this.buttonLeft.on('pointerout', function (event) {
            this.clearTint();
            moves.left = false;
        });

        sceneOrigin.buttons = {
            buttonUp: this.buttonUp,
            buttonLeft: this.buttonLeft,
            buttonRight: this.buttonRight,
        };
        sceneOrigin.moves = moves;

    }

}
