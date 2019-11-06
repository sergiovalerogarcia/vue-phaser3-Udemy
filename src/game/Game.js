import { Scene } from 'phaser'
import Phaser from 'phaser'

function launch(oldGame) {

    if (oldGame) {
        oldGame.canvas.remove();
    }
    var config = {
        type: Phaser.AUTO,
        width: 600,
        height: 360,
        parent: "game-container",
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        roundPixels: false,
        scene: [BootGame]
    };

    const game = new Phaser.Game(config);

}


class BootGame extends Scene {
    constructor() {
        super({ key: 'BootGame' });
        this.customObj = {};
    }


    create() {
        var style = { font: "bold 22px Arial", fill: "#c9371b", align: "center" };
        var farmText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY * 1.7, "Farm", style);
        farmText.setInteractive().on('pointerdown', () => 
        { 
            var farm = require('./GameFarm');
            farm.launch(this.game);
        }, this)

        var virtualPetText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY * 1, "Virtual Pet", style);
        virtualPetText.setInteractive().on('pointerdown', () => 
        { 
            var virtualPet = require('./GameVirtualPet');
            virtualPet.launch(this.game);
        }, this)

    }
}


export default launch
export { launch }