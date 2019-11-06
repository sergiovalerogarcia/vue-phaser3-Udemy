import Phaser from 'phaser'
import PlayScene from './scenes/PlaySceneFarm'
import Preload from './scenes/PreloadFarm'


function launch(oldGame) {

    if (oldGame){
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
        scene: [Preload, PlayScene]
    };

    const game = new Phaser.Game(config);
    
}

export default launch
export { launch }