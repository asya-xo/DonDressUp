export class Lore extends Phaser.Scene {

  constructor() {
    super('Lore'); // scene key!
  }

  preload () {
    this.load.image('menuBg', 'assets/clear_background.png');
    this.load.image('techS', 'assets/tech_stack.png');
    this.load.image('ty', 'assets/thanks.png');
    this.load.image('backB', 'assets/back_button.png');
    this.load.audio('buttonSD', 'assets/button_sound.mp3');
  }

  create () {
    const { width, height } = this.scale;

    this.add.image(width / 2, height / 2, 'menuBg').setDisplaySize(width, height);

    const techS = this.add.image(0, 0, 'techS');
    const ty = this.add.image(0, 0, 'ty');

    techS.setOrigin(0.5, 0);
    ty.setOrigin(0.5, 0);

    techS.setPosition(width / 2, 120);
    ty.setPosition(width / 2, techS.y + techS.displayHeight);

    this.tweens.add({
    targets: [techS, ty],
    y: '-=10',
    duration: 1200,
    ease: 'Sine.easeInOut',
    yoyo: true,
    repeat: -1
    });


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

    const backBtn = this.add.image(0, 0, 'backB');
    backBtn.setInteractive({ useHandCursor: true });
    backBtn.setOrigin(1, 0);

    const gap = 10;
    backBtn.setPosition(ty.x - ty.displayWidth / 2 - gap, ty.y);

    backBtn.on('pointerdown', () => {
      clickSfx.play();
      press(backBtn);

      this.time.delayedCall(120, () => {
        this.scene.start('Settings');
      });
    });
  }
}
