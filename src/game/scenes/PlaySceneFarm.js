import { Scene } from 'phaser'
import { delay } from 'q';


export default class PlayScene extends Scene {
    constructor() {
        super({ key: 'PlayScene' });
        this.customObj = {};
    }


    create() {

        this.customParams = {
            centerX: this.cameras.main.centerX,
            centerY: this.cameras.main.centerY,
            transition: false
        };

        this.backgorund = this.add.sprite(this.customParams.centerX, this.customParams.centerY, 'background');


        var animalData = [
            {key: 'chicken', text: 'CHICKEN', audio: 'chickenSound'},
            {key: 'horse', text: 'HORSE', audio: 'horseSound'},
            {key: 'pig', text: 'PIG', audio: 'pigSound'},
            {key: 'sheep', text: 'SHEEP', audio: 'sheepSound'}
        ];      

        this.animals = this.add.group();
        this.animals.customParams = { actual: 0 };
        var self = this;

        animalData.forEach(function (element) {
            //create each animal and save it's properties
            var animal = self.animals.create(self.customParams.centerX, self.customParams.centerY, element.key, 0, false);
            animal.customParams = { text: element.text, key: element.key, sound: self.sound.add(element.audio) };
            animal.setInteractive(self.input.makePixelPerfect())
                .on('pointerdown', self.animateAnimal);
            animal.animation = self.anims.create({
                 key: element.key,
                 frames: self.anims.generateFrameNumbers(element.key,{ 
                    start: 0, 
                    end: 3,
                    first: 0,
                    frames: [0, 1, 2, 1, 0, 1, 0], 
                }),
                duration: 1000,
                repeat: 0
            });
        });
        this.currentAnimal = this.animals.getFirst(true).setVisible(true);

        this.showText(this);

        this.rightArrow = this.add.sprite(this.customParams.centerX + (this.customParams.centerX * 0.8), this.customParams.centerY, 'arrow');
        this.rightArrow.customParams = { direction: 1 };

        this.rightArrow.setInteractive(this.input.makePixelPerfect()).on('pointerdown',
            this.switchAnimal);


        this.leftArrow = this.add.sprite(this.customParams.centerX - (this.customParams.centerX * 0.8), this.customParams.centerY, 'arrow');
        this.leftArrow.customParams = { direction: -1, active: false };
        this.leftArrow.flipX = -1;

        this.leftArrow.setInteractive(this.input.makePixelPerfect()).on('pointerdown',
            this.switchAnimal);
    }


    update() {
        this.add.text
        if (this.leftArrow.customParams.active && !this.customParams.transition) {
            this.customParams.transition = true;
            this.getPrevious(this)
        }

        if (this.rightArrow.customParams.active && !this.customParams.transition) {
            this.customParams.transition = true;
            this.getNext(this)
        }

    }
    switchAnimal() {
        this.customParams.active = true;
    }

    getNext(context) {
        context.rightArrow.customParams.active = false;
        context.currentAnimal.animalText.visible = false;
        context.tweens.add({
            targets: context.currentAnimal,
            x: context.customParams.centerX + 2 * (context.customParams.centerX),
            duration: 300,
            onStart: function () {
                if (context.animals.customParams.actual < context.animals.getChildren().length - 1) {
                    context.animals.customParams.actual += 1;
                } else {
                    context.animals.customParams.actual = 0;
                }
                context.currentAnimal = context.animals.getChildren()[context.animals.customParams.actual];
                context.currentAnimal.setX(context.customParams.centerX - 2 * (context.customParams.centerX));
                context.currentAnimal.setVisible(true);
                context.showText(context);
                context.tweens.add({
                    targets: context.currentAnimal,
                    x: context.customParams.centerX,
                    duration: 300,
                    onComplete: function () { context.customParams.transition = false }
                });
            }
        });
    }

    getPrevious(context) {
        context.leftArrow.customParams.active = false;
        context.currentAnimal.animalText.visible = false;
        context.tweens.add({
            targets: context.currentAnimal,
            x: context.customParams.centerX - 2 * (context.customParams.centerX),
            duration: 300,
            onStart: function () {
                if (context.animals.customParams.actual > 0) {
                    context.animals.customParams.actual -= 1;
                } else {
                    context.animals.customParams.actual = context.animals.getChildren().length - 1;
                }
                context.currentAnimal = context.animals.getChildren()[context.animals.customParams.actual];
                context.currentAnimal.setX(context.customParams.centerX + 2 * (context.customParams.centerX));
                context.currentAnimal.setVisible(true);
                context.showText(context);
                context.tweens.add({
                    targets: context.currentAnimal,
                    x: context.customParams.centerX,
                    duration: 300,
                    onComplete: function () { context.customParams.transition = false }
                });
            }
        });
    }

    showText(context) {
        if (!context.currentAnimal.customanimalText) {
            var style = { font: "bold 22px Arial", fill: "#c9371b", align: "center" };
            context.currentAnimal.animalText = context.add.text(context.customParams.centerX, context.customParams.centerY*1.7, "phaser 2.4 text bounds", style);
            context.currentAnimal.animalText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 1);
            context.currentAnimal.animalText.setOrigin(0.5);
        }

        context.currentAnimal.animalText.setText(context.currentAnimal.customParams.text);
        context.currentAnimal.animalText.visible = true;
    }

    animateAnimal() {
        this.anims.play(this.customParams.key);
        this.customParams.sound.play();
    }

}