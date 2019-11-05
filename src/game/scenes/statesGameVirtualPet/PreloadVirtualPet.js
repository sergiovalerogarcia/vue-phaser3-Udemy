import { Scene } from 'phaser'

import pet from '@/game/assets/images-virtual-pet/pet.png'
import backyard from '@/game/assets/images-virtual-pet/backyard.png'
import apple from '@/game/assets/images-virtual-pet/apple.png'
import candy from '@/game/assets/images-virtual-pet/candy.png'
import rotate from '@/game/assets/images-virtual-pet/rotate.png'
import toy from '@/game/assets/images-virtual-pet/rubber_duck.png'
import arrow from '@/game/assets/images-virtual-pet/arrow.png'

export default class Preload extends Scene {
    constructor() {
        super({ key: 'Preload' });
    }

    preload() {
        this.cameras.main.setBackgroundColor('#FFFFFF');
        this.logo = this.add.sprite(this.game.customParams.centerX, this.game.customParams.centerY, 'logo');
        this.logo = this.add.sprite(this.game.customParams.centerX, this.game.customParams.centerY +128, 'bar');



        this.load.image('backyard', backyard);
        this.load.image('apple',apple);    
        this.load.image('candy',candy);    
        this.load.image('rotate',rotate);    
        this.load.image('toy',toy);    
        this.load.image('arrow',arrow);  
        this.load.spritesheet('pet', pet, { frameWidth: 97, frameHeight: 83, margin: 1, spacing: 1 });
    }

    create() {
       this.scene.start('PlayScene')
    }
}
