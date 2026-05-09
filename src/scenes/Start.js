export class Start extends Phaser.Scene {

  constructor() {
    super('Start');
  }

  preload () {
    this.load.image('menuBg', 'assets/clear_background.png');
    this.load.image('startB', 'assets/start_button.png');
    this.load.image('titleS', 'assets/title_homepage.png');
    this.load.audio('song','assets/song.mp3');
    this.load.image('settingsB', 'assets/settings_button.png');
    this.load.image('backB', 'assets/back_button.png');
    this.load.audio('buttonSD','assets/button_sound.mp3');
    this.load.audio('twinkles', 'assets/twinkle.mp3');
  }

  create () {
    const { width, height } = this.scale;

    //playiing the background sound on a loop 
    if (!this.game.bgMusic) {
      this.game.bgMusic = this.sound.add('song', { loop: true, volume: 0.4 });
      this.game.bgMusic.play();
    }

    //adding background image (pink color)
    this.add.image(width / 2, height / 2, 'menuBg')
      .setDisplaySize(width, height);

    //adding START button
    const startBtn = this.add.image(width / 2, height / 2, 'startB');

    const gap = 10; 
    //adding SETTINGS button, gap between that and start is 10px
    const settingsBtn = this.add.image(width / 2, 0, 'settingsB');

    settingsBtn.y =
      startBtn.y + (startBtn.displayHeight / 2) + gap + (settingsBtn.displayHeight / 2);

    //adding sound when clicking buttons
    const clickSfx = this.sound.add('buttonSD', { volume: 0.6 });

    //adding twinkle sound only to start btn
    const twinkleSfx = this.sound.add('twinkles', { volume: 1.3 });

    //effect when clicking settings + play
    const press = (btn) => {
      this.tweens.add({
        targets: btn,
        scaleX: btn.scaleX * 0.96,
        scaleY: btn.scaleY * 0.96,
        duration: 60,
        yoyo: true
      });
    };

    //for clicking
    startBtn.setInteractive({ useHandCursor: true });
    settingsBtn.setInteractive({ useHandCursor: true });

    startBtn.on('pointerdown', () => {
      twinkleSfx.play();
      press(startBtn);

      this.time.delayedCall(120, () => {
        this.scene.start('NameScene');
      });
    });

    settingsBtn.on('pointerdown', () => {
      clickSfx.play();
      press(settingsBtn);

      this.time.delayedCall(120, () => {
        this.scene.start('Settings');
      });
    });

    const title = this.add.image(width / 2, height / 2, 'titleS');

    //making the title float
    this.tweens.add({
      targets: title,
      y: title.y - 10,
      duration: 1200,
      ease: 'Sine-inOut',
      yoyo: true,
      repeat: -1
    });
  }

}
