import { Scene } from 'phaser'


export default class PlayScene extends Scene {
    constructor() {
        super({ key: 'PlayScene' });
        this.customObj = {};
    }


    create() {
        var self = this;

        this.backyard = this.add.sprite(this.game.customParams.centerX, this.game.customParams.centerY, 'backyard')
            .setInteractive()
            .on('pointerdown', function (event) { this.placeItem(event) }, self);

        this.pet = this.add.sprite(this.game.customParams.centerX, this.game.customParams.centerY, 'pet').setInteractive(self.input.makePixelPerfect());
        
        this.anims.create({
            key: 'eat',
            frames: self.anims.generateFrameNumbers('pet',{ 
               frames: [1, 2, 3, 1, 2, 0] 
           }),
           duration: 600,
           repeat: 0
       });

        this.input.setDraggable(this.pet);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

        });

        this.pet.customParams = { health: 100, fun: 100 };

        var style = {font: "20px Arial", fill: '#fff'};
        this.add.text(10, 20, 'Health:', style);
        this.add.text(140, 20, 'Fun:', style);
        this.heathText = this.add.text(80, 20, '', style);
        this.funText = this.add.text(185, 20, '', style);

        this.refreshState();

        this.input.setDraggable(self.pet);

        this.apple = this.add.sprite(72, 570, 'apple').setInteractive(self.input.makePixelPerfect())
            .on('pointerdown', function () { this.pickItem(self.apple) }, self);
        this.apple.customParams = { health: 20 };

        this.candy = this.add.sprite(144, 570, 'candy').setInteractive(self.input.makePixelPerfect())
            .on('pointerdown', function () { this.pickItem(self.candy) }, self);
        this.candy.customParams = { health: -50, fun: 10 };

        this.toy = this.add.sprite(216, 570, 'toy').setInteractive(self.input.makePixelPerfect())
            .on('pointerdown', function () { this.pickItem(self.toy) }, self);
        this.toy.customParams = { fun: 20 };

        this.rotate = this.add.sprite(288, 570, 'rotate').setInteractive()
            .on('pointerdown', function () { this.rotatePet(self.rotate) }, self);

        this.buttons = [this.apple, this.candy, this.toy, this.rotate];

        this.selectedItem = null;
        this.uiBlocked = null;

        this.statsDecreaser = this.time.addEvent({delay: 5000, loop: true, callback: this.reduceProperties, callbackScope: self });
    }

    update() {
        if (this.pet.customParams.health <= 0 || this.pet.customParams.fun <= 0) {
            this.pet.setFrame(4);
            this.uiBlocked = true;

            this.time.addEvent({delay: 2000, callback: this.gameOver, callbackScope: self });

        }
    }

    pickItem(sprite) {
        if (!this.uiBlocked) {
            this.clearSelection();
            sprite.alpha = 0.4;
            this.selectedItem = sprite;
        }
    }

    rotatePet(sprite) {
        if (!this.uiBlocked) {
            this.uiBlocked = true;
            var context = this;
            this.tweens.add({
                targets: [sprite, this.pet],
                angle: 720,
                duration: 500,
                onComplete: function () {
                    context.clearSelection();
                    context.uiBlocked = null;
                    context.pet.customParams.fun += 10;
                    context.refreshState();
                }
            }
            );
        }
    }

    clearSelection() {
        this.buttons.forEach(function (element, index) { element.alpha = 1 })
        this.selectedItem = null;
    }

    placeItem(event) {
        if (!this.uiBlocked && this.selectedItem) {
            var x = event.position.x;
            var y = event.position.y;
            var newItem = this.add.sprite(x, y, this.selectedItem.texture.key);
            newItem.customParams = this.selectedItem.customParams;

            this.uiBlocked = true;
           
            self = this;
            this.tweens.add({
                targets: [this.pet],
                x: x,
                y: y,
                duration: 300,
                onComplete: function () {
                    self.uiBlocked = false;
                    self.pet.anims.play('eat');
                    self.updateState(newItem, self);
                    newItem.destroy();
                    self.clearSelection();
                },
            }
            );        
        }
    }

    updateState (item, self) {
        var stat;
        for (stat in item.customParams) {
            if (item.customParams.hasOwnProperty(stat)) {
                self.pet.customParams[stat] += item.customParams[stat];           
                self.refreshState();      
            }
        }
    }

    refreshState() {
        this.heathText.text = this.pet.customParams.health; 
        this.funText.text = this.pet.customParams.fun;
    }

    reduceProperties() {
        this.pet.customParams.health -= 10; 
        this.pet.customParams.fun -= 15;
        this.refreshState();
    }

    gameOver() {
        this.scene.restart();
    }
}