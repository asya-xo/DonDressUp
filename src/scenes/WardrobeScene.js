export class WardrobeScene extends Phaser.Scene {
  
  //Constructor that runs when the scene is created. Super gives the scene its internal name. 
  constructor() {
    super('WardrobeScene');
  }

  preload() {
    this.load.image('menuBg', 'assets/clear_background.png');
    this.load.audio('song','assets/song.mp3');
    this.load.image('backB', 'assets/back_button.png');
    this.load.audio('buttonSD', 'assets/button_sound.mp3');
    this.load.image('baseB', 'assets/base_Body.png');
    this.load.image('Q1', 'assets/Q1.png');
    this.load.image('A1', 'assets/A1.png');
    this.load.image('A2', 'assets/A2.png');
    this.load.image('baseBlink', 'assets/Base_Body_Blink.png');
    this.load.audio('blink', 'assets/blink.mp3');
    this.load.image('baseSmile', 'assets/Base_Body_Smiling.png');
    this.load.image('Q2_A', 'assets/Q2_A.png');
    this.load.image('Q2_B', 'assets/Q2_B.png');
    this.load.image('LetsGo', 'assets/LetsGo.png');
  }

  create() {

    const { width, height } = this.scale;

    //add pink background
    this.add.image(width / 2, height / 2, 'menuBg')
      .setDisplaySize(width, height);

    //Adding the Back Button 
     const backBtn = this.add.image(width / 2, 0, 'backB');

    //Adding function for effect + press sound when clicking buttons
    const clickSfx = this.sound.add('buttonSD', { volume: 0.6 });
    const press = (btn) => {
      this.tweens.add({
        targets: btn,
        scaleX: btn.scaleX * 0.96,
        scaleY: btn.scaleY * 0.96,
        duration: 60,
        yoyo: true
      });
    };

    //Now adding sound + effect when clickin
    backBtn.on('pointerdown', () => {
      clickSfx.play();
      press(backBtn);

      this.time.delayedCall(120, () => {
        this.scene.start('Welcome');
      });
    });

    //Making the backbtn clickable
      backBtn.setInteractive({ useHandCursor: true });

    //Positioning back button
    backBtn.setOrigin(0, 1);  
    backBtn.setPosition(30, height - 30);

    //Adding the girl! + smiling
    this.girl = this.add.image(width / 2 - 120, height / 2.1, 'baseSmile');
    this.blinkSound = this.sound.add('blink', {
      volume: 0.2
    });


     // After 2 seconds, switch to normal and start blinking
    this.time.delayedCall(2000, () => {
      this.girl.setTexture('baseB');

      this.time.addEvent({
        delay: 3000,
        loop: true,
        callback: () => {
          this.girl.setTexture('baseBlink');
          this.blinkSound.play();

          this.time.delayedCall(120, () => {
            this.girl.setTexture('baseB');
          });
        }
      });
    });

    //Adding the question and answer images
    this.q1 = this.add.image(width * 0.70, height * 0.2, 'Q1');
    this.a1 = this.add.image(width * 0.70, height * 0.45, 'A1');
    this.a2 = this.add.image(width * 0.70 - 10, height * 0.60, 'A2');
    
    //Making the answer options clickable
    this.a1.setInteractive({ useHandCursor: true });
    this.a2.setInteractive({ useHandCursor: true });

    //Adding click sound and effect to answer options
    this.a1.on('pointerdown', () => {
      clickSfx.play();
      press(this.a1);

      this.q1.setTexture('Q2_A');
      this.a1.setVisible(false);
      this.a2.setVisible(false);
       //Adding the "Let's Go!" image after answering the question

      this.time.delayedCall(2000, () => {
      this.letsGo = this.add.image(
      this.scale.width * 0.70,
      this.scale.height * 0.8,
      'LetsGo'
   );

   //Lets go to the next wardrobe scene
    this.letsGo.setInteractive({ useHandCursor: true });
    this.letsGo.on('pointerdown', () => {
      this.scene.start('WardrobeScene2');
    });
    });

  });
    this.a2.on('pointerdown', () => {
      clickSfx.play();
      press(this.a2);

      this.q1.setTexture('Q2_B');

      this.a1.setVisible(false);
      this.a2.setVisible(false);
      //Adding the "Let's Go!" image after answering the question

      this.time.delayedCall(2000, () => {
      this.letsGo = this.add.image(
      this.scale.width * 0.70,
      this.scale.height * 0.8,
      'LetsGo'
      );
      //Lets go to the next wardrobe scene 
      this.letsGo.setInteractive({ useHandCursor: true });
      this.letsGo.on('pointerdown', () => {
        this.scene.start('WardrobeScene2');
    });
    });
   });
  }
}
