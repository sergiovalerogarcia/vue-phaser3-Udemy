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
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBar.setX(this.game.customParams.centerX*-1.225);
        progressBox.setX(this.game.customParams.centerX*-1.225);
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });

        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        this.load.image('backyard', backyard);
        this.load.image('apple', apple);
        this.load.image('candy', candy);
        this.load.image('rotate', rotate);
        this.load.image('toy', toy);
        this.load.image('arrow', arrow);
        this.load.spritesheet('pet', pet, { frameWidth: 97, frameHeight: 83, margin: 1, spacing: 1 });
    }

    create() {
        this.scene.start('Home')
    }
}
