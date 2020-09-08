var play= 1;
var end = 0;
var gameState = play;

var trex, trexImage, restart, restartImg;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, jungle, jungleImage, obstacle, invisibleGround, gameOver, gameOverImage;

var score=0;

function preload() {
  trexImage = loadImage("trex.png");
  jungleImage = loadImage("8b5d61918412ad15e6c89bc6aa5661f5.jpg");
  obstacle1 = loadImage("cactus1.png");
  obstacle2 = loadImage("cactus2.png");
  obstacle3 = loadImage("cactus3.png");
  obstacle4 = loadImage("cactus4.png");
  obstacle5 = loadImage("cactus5.png");
  restartImg = loadImage("reset.png");
  gameOverImage = loadImage("gameOver.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  jungle = createSprite(200,50,1000,1000);
  jungle.addImage("run", jungleImage);
  jungle.scale = 4;
  
  trex = createSprite(50,height-50,width,125);
  trex.addImage("still", trexImage);
  trex.scale = 0.12;
  
  restart = createSprite(width/2,height-250);
  restart.addImage(restartImg);
  restart.scale = 0.09;
  restart.visible = false;
  
  gameOver = createSprite(width/2,height-300);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.9;
  gameOver.visible = false;
  
  invisibleGround = createSprite(width/2, height-10,width,0.1);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
}

function draw() {
  background(100);
  

  if (gameState=== play){
    score = score + Math.round(getFrameRate()/60);
  jungle.velocityX = -10
  if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
  
    if(( touches.length>0 || keyDown("space")) && trex.y >= 300){ 
      trex.velocityY = -10;
      touches = [];
    }
  
    trex.velocityY = trex.velocityY + 0.8
    
    trex.collide(invisibleGround);
  spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = end;
    }
}
  
  else if (gameState === end) {
    restart.visible = true;
    gameOver.visible = true;
    
    //set velcity of each game object to 0
    jungle.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  drawSprites();
  stroke(0);
  textSize(15)
  fill(0);
  text("Score: "+ score, width/2,height-500);
}

function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(1000,height-50,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -10;
    
    //generate random obstacles
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = play;
  restart.visible = false;
  gameOver.visible = false;
  obstaclesGroup.destroyEach();
  score = 0;
  }