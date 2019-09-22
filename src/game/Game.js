import Phaser from 'phaser'
import PlayScene from './scenes/PlayScene'
import Preload from './scenes/Preload'


function launch() {
    var config = {
        type: Phaser.AUTO,
        width: 640,
        height: 360,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH

        },
        roundPixels: false,
        scene: [Preload, PlayScene]
    };


    var game = new Phaser.Game(config);

    

}

export default launch
export { launch }