import { Scene } from 'phaser'
import sky from '@/game/assets/sky.png'
import star from '@/game/assets/cannabis.png'
import bomb from '@/game/assets/pill.png'
import dude from '@/game/assets/dude.png'
import platform from '@/game/assets/platform.png';
import pad from '@/game/assets/dpadButton.svg';

import { ENGINE_METHOD_STORE } from 'constants';


var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var buttonUp;
var buttonRight;
var buttonLeft;
var moveRight = false;
var moveLeft = false;
var moveUp = false;
var ground;
// I use the parent element (box) to get the space available
var box= document.getElementById('game-container');

// game.height * scaleFactor = height available


export default class PlayScene extends Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }
    

    preload() {
        this.load.image('sky', sky);
        this.load.image('star', star);
        this.load.image('bomb', bomb);
        this.load.image('ground', platform);
        this.load.image('pad', pad);
        this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
    }

    create() {
      
            var height = window.innerHeight;
            var width = window.innerWidth;
         var game = this;
            game.scale.setGameSize (width, height);
        
         /*   
            if (game.renderType === 1) {
              game.renderer.resize(width, height);
              Phaser.Canvas.setSmoothingEnabled(game.context, false);
            }
     */
        this.cameras.resize(width/2, height);

          
        this.input.addPointer();
        this.input.addPointer();

        //  A simple background for our game
        this.add.image(400, 300, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground = platforms.create(this.scale.width/2, this.scale.height, 'ground');
        ground.refreshBody();
        /* platform.width = this.scale.width */;
        //  Now let's create some ledges
       /*  platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground'); */

        // The player and its settings
        player = this.physics.add.sprite(0, this.scale.height, 'dude');
        
        //  Player physics properties. Give the little guy a slight bounce.
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        //  Our player animations, turning, walking left and walking right.
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

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        stars.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)).setScale(0.08);

        });

        bombs = this.physics.add.group();

        //  The score
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(player, stars, this.collectStar, null, this);

        this.physics.add.collider(player, bombs, this.hitBomb, null, this);

        buttonUp = this.add.sprite(650, 630, 'pad').setInteractive().setScale(0.5);

        buttonRight = this.add.sprite(220, 630, 'pad').setInteractive().setScale(0.5).setAngle(90);

        buttonLeft = this.add.sprite(80, 630, 'pad').setInteractive().setScale(0.5).setAngle(270);

        buttonRight.on('pointerover', function (event) {
            this.setTint(0x000000);
            moveRight = true;
        });

        buttonRight.on('pointerout', function (event) {
            this.clearTint();
            moveRight = false;

        });

        buttonLeft.on('pointerover', function (event) {
            this.setTint(0x000000);
            moveLeft = true;
        });

        buttonLeft.on('pointerout', function (event) {
            this.clearTint();
            moveLeft = false;
        });

        buttonUp.on('pointerover', function (event) {
            this.setTint(0x000000);
            moveUp = true;
        });

        buttonUp.on('pointerout', function (event) {
            this.clearTint();
            moveUp = false;
        });
    }


    update() {

        if (cursors.left.isDown || moveLeft) {
            player.setVelocityX(-160);
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown || moveRight) {
            
            player.setVelocityX(160);
            player.anims.play('right', true);
        }
        else {
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        if ((cursors.up.isDown || moveUp) ) {// && player.body.touching.down
            player.setVelocityY(-330);
        }
    }

    collectStar(player, star) {
        star.disableBody(true, true);

        //  Add and update the score
        score += 10;
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0) {
            //  A new batch of stars to collect
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setScale(0.1);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

        }
    }

    hitBomb(player, bomb) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        gameOver = true;
    }
}
