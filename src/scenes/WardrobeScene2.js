export class WardrobeScene2 extends Phaser.Scene {

  constructor() {
    super({ key: 'WardrobeScene2' });
    this.equippedItems = {};
  }

  preload() {
    this.load.image('body', 'assets/DressUpSceneBody.png');
    this.load.image('sunglasses_pink', 'assets/sunglasses_pink.png');
    this.load.image('backB', 'assets/back_button.png');
    this.load.audio('buttonSD', 'assets/button_sound.mp3');
    this.load.image('closet', 'assets/closet.png');
    this.load.image('top1', 'assets/top_1.png');
    this.load.image('top2', 'assets/top_2.png');
    this.load.image('pants1', 'assets/pants_1.png');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.add.rectangle(0, 0, width, height, 0xff9ec8).setOrigin(0);
    
    //Adding the closet
    this.add.image(width * 0.65, height * 0.5, 'closet');
    
    this.girl = this.add.image(width * 0.28, height * 0.5, 'body');

    this.girlSunglasses = this.add.image(width * 0.28, height * 0.5, 'sunglasses_pink');
    this.girlSunglasses.setVisible(false);

    //Adding the top overlay on girl hidden by default, 
    this.girlTop = this.add.image(width * 0.28, height * 0.5, 'top1');
    this.girlTop.setVisible(false);

    // Top 2 overlay on girl hidden by default
    this.girlTop2 = this.add.image(width * 0.28, height * 0.5, 'top2');
    this.girlTop2.setVisible(false);

    // Pants overlay on girl hidden by default
    this.girlPants = this.add.image(width * 0.28, height * 0.5, 'pants1');
    this.girlPants.setVisible(false);

    const sunglassesColors = [
     0xff9ec8, // pink
     0xff0000, // red
     0xc8a2c8, // purple
     0x000000, // black
     0xffdd00, // yellow
    ];

// Glasses in closet
const glassesItem = this.add.image(width * 0.58, height * 0.3, 'sunglasses_pink')
  .setScale(0.3)
  .setInteractive({ useHandCursor: true, pixelPerfect: true });

// Glasses color palette (hidden by default)
const glassesPalette = this.add.container(width * 0.35, height * 0.6);
glassesPalette.setVisible(false);

sunglassesColors.forEach((color, i) => {
  const swatch = this.add.circle(i * 30 - 75, 0, 12, color)
    .setInteractive({ useHandCursor: true });
  swatch.on('pointerdown', () => {
    this.girlSunglasses.setTint(color);
    this.girlSunglasses.setVisible(true);
    glassesItem.setTint(color);
  });
  glassesPalette.add(swatch);
});

// Click glasses to show/hide
glassesItem.on('pointerdown', () => {
  if (this.equippedItems.sunglasses) {
    this.girlSunglasses.setVisible(false);
    this.equippedItems.sunglasses = null;
    glassesPalette.setVisible(false);
    glassesItem.clearTint();
  } else {
    this.girlSunglasses.setTint(0xff9ec8);
    this.girlSunglasses.setVisible(true);
    this.equippedItems.sunglasses = 'sunglasses_pink';
    glassesPalette.setVisible(true);
  }
});

    // Color swatches for tops!!
const topColors = [
  0xffffff, // white
  0xff9ec8, // pink
  0xff0000, // red
  0xc8a2c8, // purple
  0x000000, // black
  0xffdd00, // yellow
];

// Top in closet, just one user can choose the style but can change color
const topItem = this.add.image(width * 0.58, height * 0.5, 'top1')
  .setScale(0.6)
  .setInteractive({ useHandCursor: true, pixelPerfect: true });

  // Top 2 in closet
const topItem2 = this.add.image(width * 0.65, height * 0.5, 'top2')
  .setScale(0.6)
  .setInteractive({ useHandCursor: true, pixelPerfect: true });

  // Pants in closet
const pantsItem = this.add.image(width * 0.58, height * 0.55, 'pants1')
  .setScale(0.4)
  .setInteractive({ useHandCursor: true, pixelPerfect: true });

// Pants color palette (hidden by default)
const pantsPalette = this.add.container(width * 0.35, height * 0.75);
pantsPalette.setVisible(false);

topColors.forEach((color, i) => {
  const swatch = this.add.circle(i * 30 - 75, 0, 12, color)
    .setInteractive({ useHandCursor: true });
  swatch.on('pointerdown', () => {
    this.girlPants.setTint(color);
    this.girlPants.setVisible(true);
    pantsItem.setTint(color);
  });
  pantsPalette.add(swatch);
});

// Click pants to show/hide
pantsItem.on('pointerdown', () => {
  if (this.equippedItems.pants) {
    this.girlPants.setVisible(false);
    this.equippedItems.pants = null;
    pantsPalette.setVisible(false);
    pantsItem.clearTint();
  } else {
    this.girlPants.setTint(0xffffff);
    this.girlPants.setVisible(true);
    this.equippedItems.pants = 'pants1';
    pantsPalette.setVisible(true);
  }
});

// Color palette 2 (hidden by default)
const palette2 = this.add.container(width * 0.35, height * 0.75);
palette2.setVisible(false);

topColors.forEach((color, i) => {
  const swatch = this.add.circle(i * 30 - 75, 0, 12, color)
    .setInteractive({ useHandCursor: true });
  swatch.on('pointerdown', () => {
    this.girlTop2.setTint(color);
    this.girlTop2.setVisible(true);
    topItem2.setTint(color);
  });
  palette2.add(swatch);
});

// Click top2 to show/hide
topItem2.on('pointerdown', () => {
  if (this.equippedItems.top2) {
    this.girlTop2.setVisible(false);
    this.equippedItems.top2 = null;
    palette2.setVisible(false);
    topItem2.clearTint();
  } else {
    this.girlTop2.setTint(0xff9ec8);
    this.girlTop2.setVisible(true);
    this.equippedItems.top2 = 'top2';
    palette2.setVisible(true);
  }
});
// Color palette (hidden by default)
const palette = this.add.container(width * 0.35, height * 0.75);
palette.setVisible(false);

topColors.forEach((color, i) => {
  const swatch = this.add.circle(i * 30 - 75, 0, 12, color)
    .setInteractive({ useHandCursor: true });
  swatch.on('pointerdown', () => {
    this.girlTop.setTint(color);
    this.girlTop.setVisible(true);
    topItem.setTint(color);
  });
  palette.add(swatch);
});

// Click top to show/hide
topItem.on('pointerdown', () => {
  if (this.equippedItems.top) {
    this.girlTop.setVisible(false);
    this.equippedItems.top = null;
    palette.setVisible(false);
    topItem.clearTint();
  } else {
    this.girlTop.setTint(0xff9ec8);
    this.girlTop.setVisible(true);
    this.equippedItems.top = 'top1';
    palette.setVisible(true);
  }
});
 



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