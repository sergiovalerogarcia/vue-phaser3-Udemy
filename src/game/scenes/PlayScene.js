import { Scene } from 'phaser'
import AddButtons from './AddButtons'



export default class PlayScene extends Scene {
    constructor() {
        super({ key: 'PlayScene' });
        this.player;
        this.stars;
        this.bombs;
        this.platforms;
        this.cursors;
        this.score = 0;
        this.gameOver = false;
        this.scoreText;
        this.buttons;
        this.moves = {
            moveRight: false,
            moveLeft: false,
            moveUp: false
        };
        this.ground;
        this.fairy
        this.collectStar;
        this.plat = true;
        this.platMove;
        this.camera;
        this.upGround;
        this.marco;
    }

    create() {

        
        this.cameras.main.setBackgroundColor( '#FFFFFF');
        
        let h = window.innerHeight;
        let w = window.innerWidth;
        this.physics.world.setBounds(0,30,30,h);


        this.fairy = this.physics.add.sprite(this.sys.canvas.height/2, this.sys.canvas.height/2, 'fairy');
        this.marco = this.physics.add.sprite(this.sys.canvas.height/2, (this.sys.canvas.height/2)-200, 'marco');
        //this.camera.

    
        // 800 - 60

        //platforms = this.physics.add.staticGroup();
        //platforms.create(400, 568, 'ground');

        this.platMove = this.physics.add.image(this.sys.canvas.width/2,  this.sys.canvas.height, 'ground').setImmovable(true);
        this.platMove.scale =  (h/600);

        this.platMove.body.setAllowGravity(false);


        /*   platforms.create(600, 400, 'ground');
          platforms.create(50, 250, 'ground');
          platforms.create(750, 220, 'ground'); */

      // this.fairy = this.camera.create(0, 0, 0, 'fairy');
    //    this.fairy = Phaser.GameObjects.GameObjects.Sprite3D(this, h/2, w/2, 0, 'fairy');
        

       // this.upGround = this.camera.create.sprite(this.sys.canvas.height/2, this.sys.canvas.height/2, 'dude');
 

       // this.physics.add.existing(this.fairy);
        this.player = this.physics.add.sprite(this.sys.canvas.height/2, this.sys.canvas.height/2, 'dude');
       // this.fairy = this.physics.add.sprite(this.sys.canvas.height/2, this.sys.canvas.height/2, 'fairy').setImmovable(true);

        

        this.player.scale =  (h/600);

        //800 - 48
        //x   -  12

        //600 - 1
        //x -
        
      //  this.player.setMaxVelocity(w, 50);
    //    this.physics.world.timeScale = (600/h);
    //    this.physics.world.gravity.y = ((800*48)/this.player.height) / (h/600);

       //this.physics.world.computeAngularVelocity();
       //thid.game.debug.text('angularAcceleration: ' + sprite.body.angularAcceleration, 32, 232);

        this.player.setBounce(0.2);
        //player.setCollideWorldBounds(true);
        //ground.setCollideWorldBounds(true);
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();


        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFF' });


        this.physics.add.collider(this.player, this.ground);
        //this.physics.add.collider(player, platforms);

        this.physics.collide(this.marco,this.fairy);

        this.physics.add.collider(this.player, this.platMove);
        this.physics.add.collider(this.player, this.marco);
        this.physics.add.collider(this.marco, this.platMove);
        this.physics.add.collider(this.fairy, this.platMove);
        this.physics.add.collider(this.fairy, this.marco);
        this.cameras.main.setBounds(0, 0, 3200, 600);


        let addButtons = new AddButtons;
        addButtons.addButton(this);

        
    }


    update() {

        let h = window.innerHeight;
        let w = window.innerWidth;
        if (h != this.sys.game.canvas.height /* || w != this.sys.game.canvas.width */) {
            location.reload();
        }
        
  
        this.cameras.main.scrollX = this.player.x - 350;
  

        this.scoreText.setText('Gravity: ' + this.physics.world.gravity.y + ' zoom: ' +this.cameras.main.zoom);
        this.scoreText.x = this.player.x - 350;

        this.platMove.x = this.player.x;
       /*  if (this.player.x > 800 && this.plat) {
            //platforms.create(800, 568, 'ground').refreshBody();
            this.plat = false;
        } */
        if (this.cursors.left.isDown ){//|| this.moves.left) {
            this.player.setVelocityX(-(h/4));
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) { //|| this.moves.right) {

            this.player.setVelocityX((h/4));
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if ((this.cursors.up.isDown || this.moves.up ) && this.player.body.touching.down) {
            this.player.setVelocityY(-(h/2));

        }

        if (this.moves.right && this.cameras.main.zoom > 0.8) {
            this.cameras.main.zoom -= 0.001;
            
        } else

        if (this.moves.left && this.cameras.main.zoom < 1) {
            this.cameras.main.zoom += 0.001;
            
        }
    }
        
}
