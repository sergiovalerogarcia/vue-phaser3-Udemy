import Phaser from 'phaser'
import PlayScene from './scenes/PlaySceneFarm'
import Preload from './scenes/PreloadFarm'


function launch() {
    var configFarm = {
        type: Phaser.AUTO,
        width: 600,
        height: 360,
        parent: "game-container-farm",
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
            

        },
        roundPixels: false,
        scene: [Preload, PlayScene]
    };


    var gameFarm = new Phaser.Game(configFarm);

    

}

export default launch
export { launch }