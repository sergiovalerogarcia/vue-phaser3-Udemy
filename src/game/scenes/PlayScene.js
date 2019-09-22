import { Scene } from 'phaser'


export default class PlayScene extends Scene {
    constructor() {
        super({ key: 'PlayScene' });
        this.customObj = {};
    }



    create() {


        let centerX = this.cameras.main.centerX;
        let centerY = this.cameras.main.centerY;

        this.backgorund = this.add.sprite(centerX, centerY, 'background');
        
        
        var animalData = [
            {key: 'chicken', text: 'CHICKEN'},
            {key: 'horse', text: 'HORSE'},
            {key: 'pig', text: 'PIG'},
            {key: 'sheep', text: 'SHEEP'}
          ];
        
          this.animals = this.add.group();

          var self = this;    
          var animal;
          animalData.forEach(function(element){
            //create each animal and save it's properties
            animal = self.animals.create(centerX,centerY, element.key);
          });

        this.rightArrow = this.add.sprite(centerX + (centerX * 0.8), centerY, 'arrow');
        this.rightArrow.customParams = { direction: 1 };

        this.rightArrow.setInteractive(this.input.makePixelPerfect()).on('pointerdown',
        this.switchAnimal);


        this.leftArrow = this.add.sprite(centerX - (centerX * 0.8), centerY, 'arrow');
        this.leftArrow.customParams = { direction: -1 };
        this.leftArrow.flipX = -1;

        this.leftArrow.setInteractive(this.input.makePixelPerfect()).on('pointerdown',
            this.switchAnimal);
    }


    update() {



    }
    switchAnimal() {
        console.log('move animal')
    }

}
