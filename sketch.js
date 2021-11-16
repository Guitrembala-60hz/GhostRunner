var imagemDaTorre, torre;
var imagemDaPorta, porta, grupoDePortas;
var imagemDeEscalador, escalador, grupoDeEscaladores;
var fantasma, imagemDoFantasma;
var grupoDeBlocoInvisivel, blocoInvisivel;
var estadoJogo = "JOGAR"

function preload(){
  imagemDaTorre = loadImage("tower.png");
  imagemDaPorta = loadImage("door.png");
  imagemDeEscalador = loadImage("climber.png"); 
  imagemDoFantasma = loadImage("ghost-standing.png");
  somAssustador = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  torre = createSprite(300,300);
  torre.addImage("tower",imagemDaTorre);
  torre.velocityY = 1;
  
  fantasma = createSprite(200,200);
  fantasma.addImage(imagemDoFantasma);
  fantasma.scale = 0.3
  
  grupoDePortas = new Group();
  grupoDeEscaladores = new Group();
  grupoDeBlocoInvisivel = new Group();
}


function draw(){
  background(0);
  
  if(estadoJogo === "JOGAR") {
  
  somAssustador.loop();
    
  if(torre.y > 400){
      torre.y = 300
    }
  
  fantasma.velocityY = fantasma.velocityY + 0.4;
  
  if(keyDown("space")) {
    fantasma.velocityY = -9;
  }
  if(keyDown("right_arrow")) {
    fantasma.x = fantasma.x + 5;
  }
  
  if(keyDown("left_arrow")) {
    fantasma.x = fantasma.x - 5;
  }
  gerarPortas();
    
    if(grupoDeBlocoInvisivel.isTouching(fantasma) || fantasma.y > 600) {
      fantasma.destroy();
      estadoJogo = "ENCERRAR";
    }
    if(grupoDeEscaladores.isTouching(fantasma)) {
      fantasma.velocityY = 0;
    }
  drawSprites();
  }
  
  else if(estadoJogo === "ENCERRAR") {
    fill("yellow");
    textSize(40);
    text("Game Over",230,250);
  }
  
}

function gerarPortas() {
  if(frameCount%250 === 0) {
  porta = createSprite(200,-50);
  porta.addImage(imagemDaPorta);
  porta.velocityY = 2;
  porta.x = random(100,400);
  porta.lifetime = 700;
  
  escalador = createSprite(200,10);
  escalador.addImage(imagemDeEscalador);
  escalador.velocityY = 2;
  escalador.x = porta.x;
  escalador.lifetime = 700;
  
  blocoInvisivel = createSprite(200,15);
  blocoInvisivel.velocityY = 2;
  blocoInvisivel.x = porta.x;
  blocoInvisivel.width = escalador.width;
  blocoInvisivel.height = 2;
  blocoInvisivel.visible = false;
  blocoInvisivel.debug = true;
  blocoInvisivel.lifetime = 700;
    
  fantasma.depth = porta.depth;
  fantasma.depth = fantasma.depth + 1;
    
  grupoDePortas.add(porta);
  grupoDeEscaladores.add(escaladores);
  grupoDeBlocoInvisivel.add(blocoInvisivel);
  }
  
}