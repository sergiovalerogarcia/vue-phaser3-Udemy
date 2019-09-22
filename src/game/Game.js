import Phaser from 'phaser'
import PlayScene from './scenes/PlayScene'
import Preload from './scenes/Preload'

var w = window.innerWidth;
var h = window.innerHeight;

function launch() {
    var config = {
        type: Phaser.AUTO,
        width: w,
        height: h,
        scale: {
            mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: h },
                debug: false,
                setBounds: {
                    x: 0,
                    y: 0,
                    width: w,
                    height: h
                }
            }
        },
        scene: [Preload, PlayScene]
    };


    var game = new Phaser.Game(config);

    

}

export default launch
export { launch }


0