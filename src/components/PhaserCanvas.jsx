import React, { useEffect } from 'react';
import { useState } from 'react';
import Phaser from 'phaser';
import BulletWorker from './bulletWorker.js?worker';

function PhaserCanvas() {
  const stylesContent = {};
  const [reiniciar, setReiniciar] = useState(false);
  const [balasRestantes, setBalasRestantes] = useState();
  let pistola;
  let oso, oso2, oso3, oso4, oso5, oso6;
  let maxClicks = 6; // Límite de clics totales (balas)
  let clickCount = 0;
  let worker;


  useEffect(() => {
    worker = new BulletWorker();

    // Recibir el número de balas desde el Web Worker
    worker.onmessage = function (event) {
      setBalasRestantes(event.data);
    };
    // Configuración del juego Phaser
    const config = {
      type: Phaser.AUTO,
      width: 1200,
      height: 1000,
      backgroundColor: 'rgba(255,255,255,1)',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 }, // Gravedad global
          debug: false
        }
      },
      scene: {
        preload: preload,
        create: create,
        update: update
      },
      parent: 'phaser-container', // El contenedor donde se montará el canvas
    };

    // Crear la instancia de Phaser.Game
    const game = new Phaser.Game(config);

    function preload() {
      // Cargar las imágenes que vas a utilizar
      this.load.image('oso', '/oso.svg');
      this.load.image('oso2', '/oso2.svg');
      this.load.image('oso3', '/oso5.svg');
      this.load.image('oso4', '/oso4.svg');
      this.load.image('oso5', '/oso3.svg');
      this.load.image('oso6', '/oso6.svg');
      this.load.image('pistola', '/pistola.svg');
      this.load.image('pistolaN', '/pistolaN.svg');
    }

    function create() {
      // Crear los osos con interactividad para clic
      oso = this.physics.add.image(0, 110, 'oso').setInteractive();
      oso.setScale(0.2);
      oso.body.allowGravity = false;
      oso.setVelocityX(1200);
      oso.setCollideWorldBounds(true);
      oso.setBounce(1, 0);


      oso2 = this.physics.add.image(600, 110, 'oso2').setInteractive();
      oso2.setScale(0.2);
      oso2.body.allowGravity = false;
      oso2.setVelocityX(1600);
      oso2.setCollideWorldBounds(true);
      oso2.setBounce(1, 0);

      oso3 = this.physics.add.image(1200, 110, 'oso3').setInteractive();
      oso3.setScale(0.2);
      oso3.body.allowGravity = false;
      oso3.setVelocityX(1600);
      oso3.setCollideWorldBounds(true);
      oso3.setBounce(1, 0);

      oso4 = this.physics.add.image(300, 270, 'oso4').setInteractive();
      oso4.setScale(0.2);
      oso4.body.allowGravity = false;
      oso4.setVelocityX(1200);
      oso4.setCollideWorldBounds(true);
      oso4.setBounce(1, 0);

      oso5 = this.physics.add.image(900, 270, 'oso5').setInteractive();
      oso5.setScale(0.2);
      oso5.body.allowGravity = false;
      oso5.setVelocityX(160);
      oso5.setCollideWorldBounds(true);
      oso5.setBounce(1, 0);

      oso6 = this.physics.add.image(900, 270, 'oso6').setInteractive();
      oso6.setScale(0.2);
      oso6.body.allowGravity = false;
      oso6.setVelocityX(1900);
      oso6.setCollideWorldBounds(true);
      oso6.setBounce(1, 0);

      // Evento de clic en cada oso
      oso.on('pointerdown', () => {
        if(clickCount<maxClicks){
          pistola = this.physics.add.image(600, 900, 'pistolaN').setInteractive();
          pistola.setScale(0.6);
          pistola.body.allowGravity = false;
          pistola.setCollideWorldBounds(true);
          pistola.angle += 90;
        }

        handleOsoClick(oso);
      });
      oso2.on('pointerdown', () => {
        if(clickCount<maxClicks){
        graphics4=this.add.graphics();
        graphics4.fillStyle(0x2FB874, 1);
        graphics4.fillRect(0, 310, 1200, 190);
        this.add.text(510, 400, 'Tiro Sport', { fontFamily: 'CustomFont', fontSize: '50px', fill: 'rgba(0,0,0,0.6)' });

        }
        handleOsoClick(oso2);
      });
      oso3.on('pointerdown', () => {
        if(clickCount< maxClicks){
          this.add.text(510, 400, 'Tiro Sport', { fontFamily: 'CustomFont', fontSize: '50px', fill: '#193F54' });
        }
        

        handleOsoClick(oso3);
      });
      oso4.on('pointerdown', () => {
        if(clickCount<maxClicks){
          graphics2 = this.add.graphics();
        graphics2.fillStyle(0xDA7771, 1);
        graphics2.fillRect(0, 150, 1200, 10);
        graphics3 = this.add.graphics();
        graphics3.fillStyle(0xDA7771, 1);
        graphics3.fillRect(0, 300, 1200, 10);
        }

        handleOsoClick(oso4);
      });
      oso5.on('pointerdown', () => {
        if(clickCount<maxClicks){
          this.cameras.main.setBackgroundColor('#125EA9');
        }

        handleOsoClick(oso5);
      });
      oso6.on('pointerdown', () => {
        if(clickCount<maxClicks){
          graphics5 = this.add.graphics(); // piso
        graphics5.fillStyle(0xCCC84A, 1);
        graphics5.fillRect(0, 504, 1200, 500);
        pistola = this.physics.add.image(600, 900, 'pistola').setInteractive();
        pistola.setScale(0.6);
        pistola.body.allowGravity = false;
        pistola.setCollideWorldBounds(true);
        pistola.angle += 90;
        }

        handleOsoClick(oso6);
      });


      let graphics5 = this.add.graphics(); // piso
      graphics5.fillStyle(0x000000, 0);
      graphics5.fillRect(0, 500, 1200, 500);

      // Crear pistola
      pistola = this.physics.add.image(600, 900, 'pistola').setInteractive();
      pistola.setScale(0.6);
      pistola.body.allowGravity = false;
      pistola.setCollideWorldBounds(true);
      pistola.angle += 90;
/////////////////////
      let totalPx = 1200;
      let resultado;
      this.input.on('pointermove', (pointer) => {
        const mouseX = pointer.x; 
        //sacar angulo---
        resultado= ((mouseX*100)/totalPx);
        resultado = ((resultado*90)/100);
        resultado=resultado+45;
        pistola.setAngle(resultado);
      });
////////////////////////////////////
      // Añadir evento de clic en el canvas
      this.input.on('pointerdown', () => {
        if (clickCount >= maxClicks) {
          alert("Se acabaron las balas");
          return;
        } else {
          // Comunicar al Web Worker que se ha disparado una bala
          clickCount++;
          worker.postMessage({ action: 'shoot' });
          animatePistola(this);
        }
      });
    
      

      // Dibujar líneas gráficas
      let graphics = this.add.graphics(); // bordeFinal
      graphics.fillStyle(0x000000, 0.2);
      graphics.fillRect(0, 500, 1200, 4);

      let graphics2 = this.add.graphics();
      graphics2.fillStyle(0x000000, 0.4);
      graphics2.fillRect(0, 150, 1200, 10);

      let graphics3 = this.add.graphics();
      graphics3.fillStyle(0x000000, 0.4);
      graphics3.fillRect(0, 300, 1200, 10);

      let graphics4 = this.add.graphics(); // fondoCampoDeTiro
      graphics4.fillStyle(0x000000, 0.1);
      graphics4.fillRect(0, 310, 1200, 190);

      

      this.add.text(510, 400, 'Tiro Sport', { fontFamily: 'CustomFont', fontSize: '50px', fill: 'rgba(0,0,0,0.6)' });
    }


    function handleOsoClick(gameObject) {
      if (clickCount >= maxClicks) {
        console.log('No quedan balas para destruir osos');
        return;
      }
      if (gameObject && typeof gameObject.destroy === 'function') {
        gameObject.destroy();
      }
    }
    

    function animatePistola(scene) {
      scene.tweens.add({
        targets: pistola,
        scale: 0.66, // Cambiar la escala
        duration: 66,
        ease: 'Power1',
        yoyo: true,
        onComplete: () => {
          pistola.setScale(0.6); // Restaurar la escala original
        }
      });
    }
    

    function update() {
    }

    // Desmontar el juego cuando se desmonte el componente
    return () => {
      if (game) {
        game.destroy(true);
        worker.terminate();
      }
    };
  }, [reiniciar]);

  return <>
     <button id='reiniciar' onClick={() => {
        setReiniciar(!reiniciar);
        worker.postMessage({ action: 'reset' });
      }}>
        Reiniciar
      </button>
      <div className="contador">Balas restantes: <div className='balas'>
        {balasRestantes}</div></div>
      <div id="phaser-container" style={stylesContent} />
  </>;
}

export default PhaserCanvas;
