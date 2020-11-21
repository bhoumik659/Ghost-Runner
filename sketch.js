var tower, towerImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var ghost, ghostImage;
var climberInvisible, climberInvisibleGroup;
var gameState="play";
var spookySound;
function preload(){
  towerImage = loadImage("tower.png")
  doorImage = loadImage("door.png")
  climberImage = loadImage("climber.png")
  ghostImage = loadImage("ghost-standing.png")
  spookySound = loadSound("spooky.wav")
  
}
function setup(){
  createCanvas(600,600)
  tower = createSprite(300,300)
  tower.addImage(towerImage)
  tower.velocityY=1
  ghost = createSprite(300,500)
  ghost.addImage(ghostImage)
  ghost.scale=0.4
  doorGroup = new Group()
  climberGroup = new Group()
  climberInvisibleGroup = new Group()
}
function draw(){
  background(0)   
  spookySound.loop()
  if (gameState === "play"){
  if(keyDown("up_arrow")){
    ghost.velocityY=-5
  } 
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+5
  }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-5
  }
  ghost.velocityY=ghost.velocityY+0.5
  if(tower.y>=600){
    tower.y=300
  }
  
  if(ghost.isTouching(climberGroup)){
    ghost.velocityY=0
  }
  
    if(ghost.isTouching(climberInvisibleGroup)||ghost.y>600){
      ghost.destroy()
      gameState = "end"
     }
    drawSprites()
    spawnDoors()
  }
  if (gameState === "end"){
    textSize(72)
    fill("red")
    text("Game Over",100,300)
  }
}
function spawnDoors(){
  if(frameCount % 200 == 0){
    door = createSprite(Math.round(random(100,500)),-20)
    door.addImage(doorImage)
    door.velocityY=1
    door.lifetime=700
    doorGroup.add(door)
    climber = createSprite(door.x,35)
    climber.velocityY=1
    climber.addImage(climberImage)
    climber.lifetime=700
    climberGroup.add(climber)
    climberInvisible = createSprite(climber.x,45,climber.width,2)
    climberInvisible.visible=false
    climberInvisible.velocityY=1
    climberInvisible.lifetime=700
    climberInvisibleGroup.add(climberInvisible)
    ghost.depth=door.depth
    ghost.depth+=1
  }
}
