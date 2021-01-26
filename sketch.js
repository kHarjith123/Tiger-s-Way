var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground;
var Tiger , tigerani , tigerjump ;
var coinsimg , coin , plant , plantimg;
var CoinGroup , plantGroup , gameOverImg , gameOver ;  
var GameState = "PLAY";
var score = 0;

function preload(){
  
  tigerani = loadAnimation("tig8.jpg","tig7.jpg","tig6.jpg","tig5.jpg","tig4.jpg","tig3.jpg","tig2.jpg","tig1.jpg");
  
  coinsimg = loadImage("coin.jpg");
  plantimg = loadImage("plant.jpg");
  
  gameOverImg = loadImage("gameover.jpg");
  
}

function setup() {
  
  Tiger = createSprite(80,350,20,20);
  Tiger.addAnimation("moving",tigerani);
  Tiger.scale = 0.1;
  
  ground = createSprite(600,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  
  gameOver = createSprite(width/2,height/2- 30);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.2;
  
  CoinGroup = new Group(); 
  plantGroup = new Group();
}

function draw() {
  
  background(255);
  
  if (gameState === PLAY){
    
    
     gameOver.visible = false;
  
  if(keyDown("space")&& Tiger.y >= 100) {
      Tiger.velocityY = -12;
      
     }
  
  if (Tiger.isTouching(CoinGroup)){
    score = score+1;
    CoinGroup.destroyEach();
    
    }
  
  Tiger.velocityY = Tiger.velocityY + 0.8;
     
  
  if (ground.x < 0){
     ground.x = ground.width/2;
   }
  
  
  Tiger.collide(ground); 
  
  
  if(plantGroup.isTouching(Tiger)){
        
        gameState = END;
  }
  }
  
  
   else if (gameState === END) {
     
     Tiger.velocity = 0;
     CoinGroup.velocity = 0;
     plantGroup.velocity = 0;
     
     gameOver.visible = true
     Tiger.visible = false;
     CoinGroup.visible = false;
     plantGroup.visible = false;
     
   }
     
     
  spawncoin();
  spawnplant();
  
  drawSprites();
  
  textSize("100");
  fill("Green");
  text("Collect the coins to earn points !...",100,60)
  
 textSize("100");
  fill("blue");
  text("Score = " + score , 300 , 50); 

}
  



function spawncoin(){
  if (frameCount%90===0) {
    coin = createSprite(400,165,20,20);
   coin.addImage(coinsimg);
   coin.scale = 0.1;
   
    coin.y = Math.round(random(100,250));
   
    coin.velocityX = -3;
  
    coin.lifetime = 144;
    
     
    //adding cloud to the group
   CoinGroup.add(coin);
  
  }
}

function spawnplant(){
  if (frameCount%65===0) {
    plant = createSprite(600,height-92,20,30);
  
   plant.scale = 0.2;
   
   var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: plant.addImage(plantimg);
              break;
      
      default: break;
    }
    plant.velocityX = -3;
  
    plant.lifetime = 144;
    
     
    //adding cloud to the group
   plantGroup.add(plant);
  
  }
}