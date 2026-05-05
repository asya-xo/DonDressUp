import { Start } from './scenes/Start.js';
import { Settings } from './scenes/Settings.js';
import { Lore } from './scenes/Lore.js';
import { Welcome } from './scenes/Welcome.js';
import { WardrobeScene } from './scenes/WardrobeScene.js'
import { WardrobeScene2 } from './scenes/WardrobeScene2.js'


const config = {
    type: Phaser.AUTO,
    title: 'Overlord Rising',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [
        Start, Settings, Lore, Welcome, WardrobeScene, WardrobeScene2
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    dom: { createContainer: true }
}

new Phaser.Game(config);
            