export class WardrobeScene2 extends Phaser.Scene {

  constructor() {
    super({ key: 'WardrobeScene2' });
    this.equippedItems = {};
  }

  preload() {
    this.load.image('baseB', 'assets/Base_Body.png');
    this.load.image('sunglasses_pink', 'assets/sunglasses_pink.png');
    this.load.image('backB', 'assets/back_button.png');
    this.load.audio('buttonSD', 'assets/button_sound.mp3');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.add.rectangle(0, 0, width, height, 0xff9ec8).setOrigin(0);

    this.girl = this.add.image(width * 0.28, height * 0.5, 'baseB');

    this.girlSunglasses = this.add.image(width * 0.28, height * 0.5, 'sunglasses_pink');
    this.girlSunglasses.setVisible(false);

    const glasses = [
      { key: 'sunglasses_pink', x: width * 0.58, y: height * 0.3 }
    ];

    glasses.forEach(g => {
      const item = this.add.image(g.x, g.y, g.key)
        .setScale(0.4)
        .setInteractive({ useHandCursor: true });

      item.on('pointerdown', () => {
        if (this.equippedItems.sunglasses === g.key) {
          this.girlSunglasses.setVisible(false);
          this.equippedItems.sunglasses = null;
        } else {
          this.girlSunglasses.setTexture(g.key);
          this.girlSunglasses.setVisible(true);
          this.equippedItems.sunglasses = g.key;
        }
      });
    }); // ← forEach ends here

    // Back button
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
    backBtn.setOrigin(0, 1);
    backBtn.setPosition(30, height - 30);
    backBtn.setInteractive({ useHandCursor: true });
    backBtn.on('pointerdown', () => {
      clickSfx.play();
      press(backBtn);
      this.time.delayedCall(120, () => {
        this.scene.start('WardrobeScene');
      });
    });
  }
}