var monkey, monkeyimg,monkeypic;
var back, backimg, backpic;
var fruit, fruitimg, stone,stoneimg;
var fruitgroup, obstaclegrp;
var ground;
var score, collection;
var play, over, state;
var rock, rockimg;
var rockgrp;

function preload(){
  
  backimg=loadImage("jungle.jpg");
  backpic=loadImage("jungle.jpg");
  
  monkeypic=loadImage("Monkey_02.png");

  monkeyimg=loadAnimation('Monkey_01.png','Monkey_02.png','Monkey_03.png','Monkey_04.png','Monkey_05.png','Monkey_06.png','Monkey_07.png','Monkey_08.png', 'Monkey_09.png','Monkey_10.png');

  stoneimg=loadImage("stone.png");
  fruitimg=loadImage("banana.png");
  
  rockimg=loadImage("rock.png");
  
}

function setup() {
  createCanvas(400,400);
   
  back= createSprite(200,200);
  back.addImage(backimg);
  back.velocityX=-3;
  
  monkey= createSprite(90,270);
  monkey.addAnimation("running", monkeyimg);
  monkey.scale=0.2;
  monkey.setCollider("circle",20,0,150);  
  fruitGroup=new Group();
  obstaclegrp=new Group();
  
  rockgrp=new Group();
  rockgrp.setVisibleEach(false);
  
  ground=createSprite(200,380,400,10);
  ground.visible=false;
  
  score=0;
  collection=0;

  
}

function draw() {
  background(220);
  
    
  if(back.x < 20){
    back.x = back.width/2;
  }
    
  //spawn stones and bananas
  spawnstone();
  spawnfruit();
    
  
  //adusting score
  score=frameCount;
    
  //jumping on space
  if(keyDown("space")&&monkey.y>284){
    monkey.velocityY= -12;
  }
  
   //gravity
   monkey.velocityY=monkey.velocityY+0.8;
  
  //banana count 
  if(monkey.isTouching(fruitGroup)){
    collection=collection+1;
    fruitGroup.destroyEach();
     monkey.scale=monkey.scale+0.1;
   
  }
  
  if(monkey.isTouching(obstaclegrp)){
      monkey.scale=monkey.scale-0.1;
    obstaclegrp.destroyEach();  
    
  }
  
monkey.collide(ground);  

  
  drawSprites();
  
  textFont("impact");
  fill("white");
  textSize(27);
  text("SCORE:"+score,10,30);
  
  textFont("impact");
  fill("white");
  textSize(27);
  text("FRUITS COLLECTED:"+collection,10,70);

}

function spawnstone(){
  
if(frameCount%100===0){
stone=createSprite(600,370);
stone.addImage(stoneimg);
stone.velocityX=random(-9,-11);
stone.scale=0.17;
obstaclegrp.add(stone);
}
}

function spawnfruit(){
  
if(frameCount%60===0){
fruit=createSprite(690,random(200,170));
fruit.addImage(fruitimg);
fruit.velocityX=random(-5,-8);
fruit.scale=0.09;
fruitGroup.add(fruit);

}  
}

function spawnrock(){
if(frameCount%100===0){
rock=createSprite(600,350);
rock.addImage(rockimg);
rock.velocityX=random(-9,-11);
rock.scale=0.17;
rockgrp.add(rock);
}
}
