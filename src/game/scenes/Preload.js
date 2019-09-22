import { Scene } from 'phaser'

import sky from '@/game/assets/sky.png'
import star from '@/game/assets/cannabis.png'
import bomb from '@/game/assets/pill.png'
import dude from '@/game/assets/dude.png'
import fairy from '@/game/assets/fairy.svg'
import platform from '@/game/assets/platform.png';
import pad from '@/game/assets/dpadButton.svg';
import marco from '@/game/assets/marco.svg';
import AddButtons from './AddButtons'

export default class Preload extends Scene {
    constructor() {
        super({ key: 'Preload' });
    }


    preload() {

        let h = window.innerHeight;
        let w = window.innerWidth;

        this.load.image('sky', sky);
        this.load.image('ground', platform);
        this.load.image('star', star);
        this.load.image('bomb', bomb);
        this.load.image('pad', pad);
        this.load.svg('fairy', fairy, { scale: (h/100)*2});
        this.load.svg('marco', marco, { scale: (h/100)});

        this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
    }

    create () {
        this.scene.start('PlayScene')
      }
}
