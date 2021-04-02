var Car1,EnemyCar; 
var Car1Img,Car2Img,Car3img,Car4Img;
var BAckground,BAckgroundImg;
var Gamestate = "Play"
var score;
var Restart,RestartImg;
var GameOver,GamerOverImg;
var Mypower,MypowerImg;
var Good,GoodImg;
function preload(){
Car1Img = loadImage("Car.png");
Car2Img = loadImage("CAr2.png");
Car3Img = loadImage("Car3.png");
Car4Img = loadImage("Car4.png")
BAckgroundImg = loadImage("track.jpg")
RestartImg = loadImage("555-5555165_restart-button-being-more-experienced-team-leaders-so.png")
GamerOverImg = loadImage("gameover.png")
MypowerImg = loadImage("pngtree-red-heart-icon-isolated-png-image_1726594.png")
GoodImg = loadImage("360_F_262034968_eAjbU4Wbeg0sriqJZnlr17rDkmHDou9J.png")
}


function setup() {
  createCanvas(400,700);
  BAckground = createSprite(200,300,20,20)
  BAckground.addImage("back",BAckgroundImg)
  BAckground.scale = 0.8
  BAckground.velocityY = 12
  
  Car1 = createSprite(200,610,20,20)
  Car1.addImage("car",Car1Img)
  Car1.scale = 0.2;
  Car1.setCollider("rectangle",15,5,350,830)
 
  Mypower = createSprite(50,50,20,20)
  Mypower.addImage("Power",MypowerImg)
  Mypower.scale = 0.1;
  
  gameOver = createSprite(200,300);
  restart = createSprite(200,400);
 
  gameOver.addImage(GamerOverImg);
  gameOver.scale = 0.3;
 
  restart.addImage(RestartImg);
  restart.scale = 0.18;
 
  gameOver.visible = false;
  restart.visible = false;
  
  
  score = 0;
  health = 3
  EnemyGroup   = new Group();
}

function draw() {
  background("black"); 
  
 if(Gamestate === "Play"){

  score = score + Math.round(getFrameRate()/60);
  BAckground.velocityY = 9;
  if(BAckground.y > 200 ){
    BAckground.y=0;   
    }
 if(keyDown("LEFT_ARROW")){
   if(Car1.x>40){
 Car1.x = Car1.x-10;
   }
 }  
 
 if(keyDown("RIGHT_ARROW")){
  if(Car1.x<360){
  Car1.x = Car1.x+10;
  }
  }

  if(keyDown("UP_ARROW")){
    if(Car1.y>85){
    Car1.y = Car1.y-10;
    }
    }


  if(keyDown("DOWN_ARROW")){
    if(Car1.y<610){
    Car1.y = Car1.y+10;
    }
    }  


    if(Car1.isTouching(EnemyGroup)){
      health = health-1;
      EnemyGroup.destroyEach()

    }
    if(health === 0 && Gamestate === "Play"){
      Gamestate = "End"
     }

 }




 spwanFeedback()
  spwanEnemycar() 
  drawSprites();
  if(Gamestate === "End"){
    gameOver.visible = true;
    restart.visible = true;
    Car1.depth = restart.depth;
    restart.depth =  restart.depth+1
    Car1.depth = gameOver.depth;
    gameOver.depth =  gameOver.depth+1
    BAckground.velocityY = 0;
    Car1.velocityY = 0;
    Car1.velocityX = 0;
    EnemyGroup.setVelocityYEach(0);
    EnemyGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
      reset();
    }
   }
   fill("black");
    textSize(20);
   text("Score: "+ score, 200,50);
   text(health, 80,57);
}


function spwanEnemycar(){
  if(frameCount % 100 === 0){
    var EnemyCar = createSprite(Math.round(random(50,350)),-100,10,40);
    EnemyCar.velocityY = (8 + 3*score/150);
    EnemyCar.scale = 0.2;
    EnemyCar.setCollider("rectangle",15,5,350,830)
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1: EnemyCar.addImage(Car2Img);
              break;
      case 2: EnemyCar.addImage(Car3Img);
              break;
      case 3: EnemyCar.addImage(Car4Img);  
              break;
      default: break;
    }
    EnemyCar.lifetime = 130;
    
    EnemyGroup.add(EnemyCar)
    EnemyCar.depth = Car1.depth;
    Car1.depth =  Car1.depth + 1;
    EnemyCar.depth = Mypower.depth;
    Mypower.depth =  Mypower.depth + 1;


  }


}


function reset(){
  Gamestate = "Play"
  gameOver.visible=false;
  restart.visible=false;
  EnemyGroup.destroyEach();

  score=0;
  health = 3;
  Car1.x = 200;
  Car1.y = 610;
}

function spwanFeedback(){
if(score % 100 === 0){
 Good = createSprite(420,200,10,10)
 Good.addImage("image",GoodImg)
 Good.velocityX = -4
 Good.scale = 0.2 
 Good.lifetime = 130;
 }

}