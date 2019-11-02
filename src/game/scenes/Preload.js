import { Scene } from 'phaser'

import background from '@/game/assets/images/background.png'
import arrow from '@/game/assets/images/arrow.png'
import chicken from '@/game/assets/images/chicken_spritesheet.png'
import horse from '@/game/assets/images/horse_spritesheet.png'
import pig from '@/game/assets/images/pig_spritesheet.png'
import sheep from '@/game/assets/images/sheep_spritesheet.png'
import chickenSoundOgg from '@/game/assets/audio/chicken.ogg'
import horseSoundOgg from '@/game/assets/audio/horse.ogg'
import pigSoundOgg from '@/game/assets/audio/pig.ogg'
import sheepSoundOgg from '@/game/assets/audio/sheep.ogg'
import chickenSound from '@/game/assets/audio/chicken.mp3'
import horseSound from '@/game/assets/audio/horse.mp3'
import pigSound from '@/game/assets/audio/pig.mp3'
import sheepSound from '@/game/assets/audio/sheep.mp3'


export default class Preload extends Scene {
    constructor() {
        super({ key: 'Preload' });
    }

    preload() {
        this.load.image('background', background)
        this.load.spritesheet('chicken', chicken, { frameWidth: 131, frameHeight: 200 }, 3);
        this.load.spritesheet('horse', horse, { frameWidth: 212, frameHeight: 200 }, 3);
        this.load.spritesheet('pig', pig, { frameWidth: 297, frameHeight: 200 }, 3);
        this.load.spritesheet('sheep', sheep, { frameWidth: 244, frameHeight: 200 }, 3);
        this.load.image('arrow', arrow);
        this.load.audio('chickenSound', [chickenSoundOgg, chickenSound]) 
        this.load.audio('horseSound', [horseSoundOgg, horseSound])
        this.load.audio('pigSound', [pigSoundOgg, pigSound])
        this.load.audio('sheepSound', [sheepSoundOgg, sheepSound]) 
    }

    create() {
        this.scene.start('PlayScene')
    }
}
