import Phaser from 'phaser'
import Scene from './scenes/SceneTest'


function launch() {
   new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene: [Scene]
  })
}

export default launch
export { launch }
