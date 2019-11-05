import { Scene } from 'phaser'

import bar from '@/game/assets/images-virtual-pet/bar.png'
import logo from '@/game/assets/images-virtual-pet/logo.png'

export default class Boot extends Scene {
    constructor() {
        super({ key: 'Boot' });
        this.customObj = {};
    }

    init() {
        this.game.customParams = {
            centerX: this.cameras.main.centerX,
            centerY: this.cameras.main.centerY
        };
    }

    preload() {
        this.load.image('logo', logo);
        this.load.image('bar', bar);    
    }

    create () {
        this.scene.start('Preload');
    }
}