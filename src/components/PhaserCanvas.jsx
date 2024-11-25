import React, { useEffect } from 'react';
import { useState } from 'react';
import Phaser from 'phaser';
import BulletWorker from '../hilos/bulletWorker.js?worker';
import anguloWorker from '../hilos/anguloWorker.js?worker';
import colorear from '../hilos/colorearWorker.js?worker';

let colores = ['55334C', '003F58', '007A89', '00BAC9', '9ACAD6'];
const styleImg ={
  height: '89px',
  width: '89px',
} 
const imageUrls = [
  '/oso.svg',
  '/oso2.svg',
  '/oso3.svg',
  '/oso4.svg',
  '/oso5.svg',
  '/oso6.svg',
];

function PhaserCanvas() {
  // const [listaOsos, setListaOsos] = useState([]);

  const stylesContent = {};
  const [reiniciar, setReiniciar] = useState(false);
  const [balasRestantes, setBalasRestantes] = useState();
  const [arrayDeOsosAImprimir, setArrayDeOsosAImprimir] = useState([]);
 
  // const [angulo, setAngulo] = useState(90);
  let pistola;
  let oso, oso2, oso3, oso4, oso5, oso6;
  let worker;
  let ww;
  let colorearW;
  let pistolaVacia = false;

  
  useEffect(() => {
    setReiniciar(false);
    setArrayDeOsosAImprimir([]);
    worker = new BulletWorker();
    ww= new anguloWorker();
    colorearW = new colorear();

    // Recibir el número de balas desde el Web Worker
    worker.onmessage = function (event) {
      try {
        if(event.data <=  0){
          alert("se te acabaron las balas!")
          setBalasRestantes(0);
          pistolaVacia = true;
        }
        else{
          setBalasRestantes(event.data);
          pistolaVacia = false;
        }
      } catch (error) {
        console.log("error hilo 1")
      }
      
      
    };
    ww.onmessage = function(event){
      pistola.setAngle(event.data); 
    }
   
    
    colorearW.onmessage = function(event){
      setArrayDeOsosAImprimir(event.data)

    }

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
      worker.postMessage({ action: 'wait' });
      // Cargar las imágenes que vas a utilizar
      this.load.image('oso', imageUrls[0]); //blanco
      this.load.image('oso2', imageUrls[1]); //    
      this.load.image('oso3', imageUrls[2]); // 
      this.load.image('oso4', imageUrls[3]); // 
      this.load.image('oso5', imageUrls[4]); // 
      this.load.image('oso6', imageUrls[5]); // amarillo
      this.load.image('pistola', '/pistola.svg'); //
      this.load.image('pistolaN', '/pistolaN.svg'); //
    }   

    function create() {
      
      // Crear los osos con interactividad para clic
      oso = this.physics.add.image(0, 110, 'oso').setInteractive();
      oso.setScale(0.2);
      oso.body.allowGravity = false;
      oso.setVelocityX(1200);
      oso.setCollideWorldBounds(true);
      oso.setBounce(1, 0);


      oso2 = this.physics.add.image(600, 85, 'oso2').setInteractive();
      oso2.setScale(0.2);
      oso2.body.allowGravity = false;
      oso2.setVelocityX(1600);
      oso2.setCollideWorldBounds(true);
      oso2.setBounce(1, 0);

      oso3 = this.physics.add.image(1200, 85, 'oso3').setInteractive();
      oso3.setScale(0.2);
      oso3.body.allowGravity = false;
      oso3.setVelocityX(1600);
      oso3.setCollideWorldBounds(true);
      oso3.setBounce(1, 0);

      oso4 = this.physics.add.image(300, 240, 'oso4').setInteractive();
      oso4.setScale(0.2);
      oso4.body.allowGravity = false;
      oso4.setVelocityX(1200);
      oso4.setCollideWorldBounds(true);
      oso4.setBounce(1, 0);

      oso5 = this.physics.add.image(900, 240, 'oso5').setInteractive();
      oso5.setScale(0.2);
      oso5.body.allowGravity = false;
      oso5.setVelocityX(160);
      oso5.setCollideWorldBounds(true);
      oso5.setBounce(1, 0);

      oso6 = this.physics.add.image(900, 240, 'oso6').setInteractive();
      oso6.setScale(0.2);
      oso6.body.allowGravity = false;
      oso6.setVelocityX(1900);
      oso6.setCollideWorldBounds(true);
      oso6.setBounce(1, 0);



      //hilo colorear
      
      // Evento de clic en cada oso
      oso.on('pointerdown', () => {
        if(!pistolaVacia){

          pistola = this.physics.add.image(600, 900, 'pistolaN').setInteractive();
          pistola.setScale(0.6);
          pistola.body.allowGravity = false;
          pistola.setCollideWorldBounds(true);
          pistola.angle += 90;
          handleOsoClick(oso);
          colorearW.postMessage({estado : 'tumbado', oid: 0})
        }

        
      });
      oso2.on('pointerdown', () => {
        if(!pistolaVacia){
        graphics4=this.add.graphics();
        graphics4.fillStyle(`0x${colores[2]}`, 1);
        graphics4.fillRect(0, 320, 1200, 190);
        this.add.text(510, 400, 'Tiro Sport', { fontFamily: 'CustomFont', fontSize: '50px', fill: 'rgba(0,0,0,0.6)' });
        handleOsoClick(oso2);
        colorearW.postMessage({estado : 'tumbado', oid: 1})
        }
        
      });
      oso3.on('pointerdown', () => {
        if(!pistolaVacia){
          this.add.text(510, 400, 'Tiro Sport', { fontFamily: 'CustomFont', fontSize: '50px', fill: `#${colores[3]}` }); //prendiente
          handleOsoClick(oso3);
          colorearW.postMessage({estado : 'tumbado', oid: 2})
        }
        

        
      });
      oso4.on('pointerdown', () => {
        if(!pistolaVacia){
          graphics2 = this.add.graphics();
        graphics2.fillStyle(`0x${colores[0]}`, 1);
        graphics2.fillRect(0, 150, 1200, 20);
        graphics3 = this.add.graphics();
        graphics3.fillStyle(`0x${colores[0]}`, 1);
        graphics3.fillRect(0, 300, 1200, 20);
        graphics.fillStyle(`0x${colores[0]}`, 1);
        graphics.fillRect(0, 510, 1200, 4);
        handleOsoClick(oso4);
        colorearW.postMessage({estado : 'tumbado', oid: 3})
        }

        
      });
      oso5.on('pointerdown', () => {
        if(!pistolaVacia){
          this.cameras.main.setBackgroundColor(`#${colores[1]}`);
          handleOsoClick(oso5);
          colorearW.postMessage({estado : 'tumbado', oid: 4})
        }

        
      });
      oso6.on('pointerdown', () => {
        if(!pistolaVacia){
          graphics5 = this.add.graphics(); // piso
        graphics5.fillStyle(`0x${colores[4]}`, 1);
        graphics5.fillRect(0, 504, 1200, 500);
        pistola = this.physics.add.image(600, 900, 'pistola').setInteractive();
        pistola.setScale(0.6);
        pistola.body.allowGravity = false;
        pistola.setCollideWorldBounds(true);
        pistola.angle += 90;
        handleOsoClick(oso6);
        colorearW.postMessage({estado : 'tumbado', oid: 5})
        }

        
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
      this.input.on('pointermove', (pointer) => {
        ww.postMessage({action: 'calculate', x: pointer.x})

      });
////////////////////////////////////
      // Añadir evento de clic en el canvas
      this.input.on('pointerdown', () => {
        
        if (balasRestantes <= 0) {
     
          return;
        } else {
          // Comunicar al Web Worker que se ha disparado una bala
          worker.postMessage({ action: 'shoot' });
          animatePistola(this);
        }
      },[]);
    
      

      // Dibujar líneas gráficas
      let graphics = this.add.graphics(); // bordeFinal
      graphics.fillStyle(0x000000, 0.2);
      graphics.fillRect(0, 510, 1200, 4);

      let graphics2 = this.add.graphics();
      graphics2.fillStyle(0x000000, 0.4);
      graphics2.fillRect(0, 150, 1200, 20);

      let graphics3 = this.add.graphics();
      graphics3.fillStyle(0x000000, 0.4);
      graphics3.fillRect(0, 300, 1200, 20);

      let graphics4 = this.add.graphics(); // fondoCampoDeTiro
      graphics4.fillStyle(0x000000, 0.1);
      graphics4.fillRect(0, 320, 1200, 190);

      

      this.add.text(510, 400, 'Tiro Sport', { fontFamily: 'CustomFont', fontSize: '50px', fill: 'rgba(0,0,0,0.6)' });
    }


    function handleOsoClick(gameObject) {

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
        ww.terminate();
      }
    };
  }, [reiniciar]);
  return <>
     <button id='reiniciar' onClick={() => {
        setReiniciar(true);
        setBalasRestantes()
        worker.postMessage({ action: 'reset' });
        ww.postMessage({action: 'reset'});
      }}>
        Reiniciar
      </button>
      <div className="contador">Balas restantes: <div className='balas'>
        {balasRestantes}</div></div>
      <div id="phaser-container" style={stylesContent} />
      <div id='images-canvas'> {imageUrls.map((url, index) => 
          arrayDeOsosAImprimir.includes(index) && (
            <img key={index} src={url} alt={`Image ${index + 1}`} style={styleImg} />
          )
        )}</div>
  </>;
}

export default PhaserCanvas;
