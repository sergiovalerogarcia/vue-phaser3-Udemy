import Phaser from 'phaser'
import PlayScene from './scenes/statesGameVirtualPet/PlaySceneVirtualPet'
import Preload from './scenes/statesGameVirtualPet/PreloadVirtualPet'
import Boot from './scenes/statesGameVirtualPet/BootVirtualPet'


function launch() {
    var configVirtualPet = {
        type: Phaser.AUTO,
        width: 360,
        height: 640,
        parent: "game-container-virtualPet",
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        roundPixels: false,
        scene: [Boot, Preload, PlayScene]
    };


    var gameVirtualPet = new Phaser.Game(configVirtualPet);

    

}

export default launch
export { launch }