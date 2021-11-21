var ground,groundimg;
var mario,marioimg;
var clouds, cloudsimg;
var invisibleground;
var enemies,enemyimg;
var pipesGroup,cloudsGroup;
var PLAY =1;
var END = 0;
var gameState = PLAY;
var score = 5;
var count = 0;
var coincount = 0;
var instruct;


function preload(){
  bg = loadImage("images/bg.png");
  groundimg = loadImage("images/ground.png");
  marioimg = loadAnimation("images/mario1.png","images/mario2.png");
  pipesimg =loadImage("images/pipes.png");
  cloudsimg =loadImage("images/cloud.png");
  mario_deadimg = loadAnimation("images/mario_dead.png");
  gameoverimg = loadImage("images/gameOver.png");
  restartImg = loadImage("images/restart.png");
  bulletimg = loadImage("images/bullet.png");
  enemyimg =loadAnimation("images/enemy1.png","images/enemy2.png");
  enemy_dieimg =loadAnimation("images/enemy1.png");
  marioheadimg = loadImage("images/mario-head.png");
  coinimg = loadImage("images/coin.png");
  textimg = loadImage("images/text.png");
}

function setup() { 
  createCanvas(1200, 400);
  ground = createSprite(600,390,1200,10);
  ground.addImage("ground",groundimg);
  ground.x = ground.width/2;

  mario = createSprite(50,335,10,10);
  mario.addAnimation("mario",marioimg);
  mario.addAnimation("mario_dead",mario_deadimg);
  mario.scale =0.3;

  pipesGroup = new Group();
  cloudsGroup = new Group();
  bulletGroup = new Group();
  enemyGroup = new Group();
  

  mariohead = createSprite(50,50,10,10);
  mariohead.addImage("mariohead",marioheadimg);
  mariohead.scale= 1.5;
  

  invisibleground = createSprite(600,375,1200,10);
  invisibleground.visible = false;

}

function draw() {
  background("purple");
  drawSprites();
  
  console.log(frameCount);
  fill("black");
  textSize(35);
  textFont("monospace");
  text(" x ",70,60)
  text(score,120,60);
  
  textSize(35);
  text("SCORE:"+Math.round(count),320,60);
  text(coincount,250,60);
  text(" x ",200,60);

  ground.velocityX = -7;

  if(ground.x<0){
    ground.x = ground.width/2;
  }
  
    if(keyDown("UP_ARROW") && mario.y>329){ 
      mario.velocityY = -20;
    }

    if(keyWentDown("space")){
      bullet = createSprite(mario.x,mario.y);
      bullet.addImage("bullet",bulletimg);
      bullet.velocityX= 4;
      bulletGroup.add(bullet);

    }

    mario.velocityY = mario.velocityY + 1;

    mario.collide(invisibleground);
    console.log(mario.y); 

    
    spawnPipes();
    spawnClouds();
    spawnEnemies();
  }

  function spawnPipes(){
    if(frameCount %90  === 0){
      pipes = createSprite(1200,320,10,10);
      pipes.addImage("pipes",pipesimg);
      pipes.velocityX = -5;
      pipes.scale = 0.5;
      pipes.lifetime = 240;
      pipesGroup.add(pipes);
    
    }
  }

  function spawnClouds(){
    if(frameCount %100  === 0){
      clouds = createSprite(1200,random(50,150),10,10);
      clouds.addImage("clouds",cloudsimg);
      clouds.velocityX = -3;
      clouds.scale = 2;
      clouds.lifetime = 420;
      cloudsGroup.add(clouds);
    }
  }

  function spawnEnemies(){
    if(frameCount % 300 === 0){
      enemies = createSprite(1200,330,10,20);
      enemies.addAnimation("enemy",enemyimg);
      enemies.scale=0.15;
      enemies.velocityX =-6;
      enemies.lifetime = 200;
      enemyGroup.add(enemies);
    }
  }