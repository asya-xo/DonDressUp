
export class Settings extends Phaser.Scene {
  constructor() {
    super('Settings'); // scene key!
  }

  preload() {
    this.load.image('menuBg', 'assets/clear_background.png');
    this.load.image('muteB', 'assets/mute_button.png');
    this.load.image('loreB', 'assets/lore_button.png');
    this.load.image('backB', 'assets/back_button.png');
    this.load.audio('buttonSD', 'assets/button_sound.mp3');
    this.load.image('unmuteB', 'assets/unmute_button.png');
  }

  create() {
    const { width, height } = this.scale;

    const savedMuted = this.registry.get('muted') ?? false;
    if (this.game.bgMusic) this.game.bgMusic.setMute(savedMuted);



    this.add.image(width / 2, height / 2, 'menuBg').setDisplaySize(width, height);

    const muteBtn = this.add.image(width / 2, height / 2, 'muteB');
    muteBtn.setTexture(savedMuted ? 'unmuteB' : 'muteB');



    const gap = 10;
    const loreBtn = this.add.image(width / 2, 0, 'loreB');
    loreBtn.y = muteBtn.y + (muteBtn.displayHeight / 2) + gap + (loreBtn.displayHeight / 2);

    const backBtn = this.add.image(width / 2, 0, 'backB');
    backBtn.y = loreBtn.y + (loreBtn.displayHeight / 2) + gap + (backBtn.displayHeight / 2);

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

    muteBtn.setInteractive({ useHandCursor: true });
    loreBtn.setInteractive({ useHandCursor: true });
    backBtn.setInteractive({ useHandCursor: true });

    muteBtn.on('pointerdown', () => {
      clickSfx.play();
      press(muteBtn);

     const newMuted = !(this.game.bgMusic?.mute ?? false);
     if (this.game.bgMusic) this.game.bgMusic.setMute(newMuted);

     this.registry.set('muted', newMuted);
     muteBtn.setTexture(newMuted ? 'unmuteB' : 'muteB');


    });

    loreBtn.on('pointerdown', () => {
      clickSfx.play();
      press(loreBtn);
    
        this.time.delayedCall(120, () => {
        this.scene.start('Lore');
      });
    });

    backBtn.on('pointerdown', () => {
      clickSfx.play();
      press(backBtn);

      this.time.delayedCall(120, () => {
        this.scene.start('Start');
      });
    });
  

  }
}
