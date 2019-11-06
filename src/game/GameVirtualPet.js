import Phaser from 'phaser'
import PlayScene from './scenes/statesGameVirtualPet/PlaySceneVirtualPet'
import Preload from './scenes/statesGameVirtualPet/PreloadVirtualPet'
import Boot from './scenes/statesGameVirtualPet/BootVirtualPet'
import Home from './scenes/statesGameVirtualPet/HomeScreenVirtualPet'

function launch(oldGame) {

    if (oldGame){
        oldGame.canvas.remove();
        oldGame.destroy();
    }

    var config = {
        type: Phaser.AUTO,
        width: 360,
        height: 640,
        parent: "game-container",
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        roundPixels: false,
        scene: [Boot, Home, Preload, PlayScene]
    };


    const game = new Phaser.Game(config);
}

export default launch
export { launch }