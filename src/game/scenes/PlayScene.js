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
          this.animals.customParams = {actual: 0};
          var self = this;   

          animalData.forEach(function(element){
            //create each animal and save it's properties
            var animal = self.animals.create(centerX,centerY, element.key, false, false);
            animal.setInteractive(self.input.makePixelPerfect())
                .on('pointerdown',self.animateAnimal);
          });

        //this.animalIterator = this.animals.next();
        this.currentAnimal = this.animals.getFirst(true).setVisible(true);

        this.rightArrow = this.add.sprite(centerX + (centerX * 0.8), centerY, 'arrow');
        this.rightArrow.customParams = { direction: 1 };

        this.rightArrow.setInteractive(this.input.makePixelPerfect()).on('pointerdown',
        this.switchAnimal);


        this.leftArrow = this.add.sprite(centerX - (centerX * 0.8), centerY, 'arrow');
        this.leftArrow.customParams = { direction: -1, active: false };
        this.leftArrow.flipX = -1;

        this.leftArrow.setInteractive(this.input.makePixelPerfect()).on('pointerdown',
            this.switchAnimal);
    }


    update() {

        if (this.leftArrow.customParams.active) {
            this.getPrevious(this)
        }

        if (this.rightArrow.customParams.active) {
            this.getNext(this)
        }

    }
    switchAnimal() {
        this.customParams.active = true;
    }

    getNext(context){
        context.currentAnimal.setVisible(false);
        if(context.animals.customParams.actual < context.animals.getChildren().length -1){
            context.animals.customParams.actual += 1; 
        } else {
            context.animals.customParams.actual = 0; 
        }
        context.currentAnimal = this.animals.getChildren()[context.animals.customParams.actual];
        context.currentAnimal.setVisible(true);
        context.rightArrow.customParams.active = false;
    }

    getPrevious(context){
        context.currentAnimal.setVisible(false);
        if(context.animals.customParams.actual > 0){
            context.animals.customParams.actual -= 1; 
        } else {
            context.animals.customParams.actual = this.animals.getChildren().length - 1; 
        }
        context.currentAnimal = this.animals.getChildren()[context.animals.customParams.actual];
        context.currentAnimal.setVisible(true);
        context.leftArrow.customParams.active = false;

    }

    animateAnimal () {
        console.log('animate animal');
      }

}
