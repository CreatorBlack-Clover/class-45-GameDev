var gameState = "play";
var bubbleImg, bubble,SceneSpeed, Edges;
var foodImg, food, rockImg, rock, fishImg, fish, SceneImg, Scene;
var SI, startImg, start, hookImg, hook, hookGroup;

function preload()
{
  BackgroundImg();
  fishImg = loadAnimation("Game_Sprites/fish_Img/fish1.png","Game_Sprites/fish_Img/fish2.png",
  "Game_Sprites/fish_Img/fish3.png","Game_Sprites/fish_Img/fish4.png");

  startImg = loadImage("Game_Sprites/Start.png");
  hookImg = loadImage("Game_Sprites/Hook.png");

}

function setup() {
  createCanvas(800,650);
  SceneSpeed = 5;

  // scene of the game
  Scene = createSprite(width/2,-150,5,5);
  Scene.addImage("background",SceneImg);
  Scene.scale = 0.7;
  Scene.velocityY = SceneSpeed;

  // fish
  fish = createSprite(width/2, 570, 5,5);
  fish.addAnimation("fish",fishImg);
  fish.scale = 0.6;

  // start image
  start = createSprite(width/2, height/2, 5, 5); 
  start.addImage("start", startImg);

  Edges = createEdgeSprites();
  hookGroup = createGroup();

}

function draw() {
  background("black");
  // reseting the background
  if(Scene.y >= 900)
  {
    Scene.y = -150;
    Scene.x = random(390,410);
  }

  // When Game State is "Start"
  if(gameState === "start")
  {
    // Home Page
    Scene.scale = 2;
    Scene.y = height/2;
    Scene.velocityY = 0;

    // fish
    fish.visible = false;

    // changing game state
    if(mousePressedOver(start))
    {
      gameState = "play";
    }


  }

  // When Game State is "Play"
  if(gameState === "play")
  {
    fish.collide(Edges[3]);
    start.visible = false;
    fish.visible = true;

    // fish movement controls

    if(keyDown("left") && fish.x > 0)
    {
      fish.x -= 5;
    }

    if(keyDown(RIGHT_ARROW) && fish.x < 800)
    {
      fish.x += 5;
    }    
    
    if(keyDown(UP_ARROW) && fish.y > 200)
    {
      fish.y -= 5;
    }    
    
    if(keyDown(DOWN_ARROW) )
    {
      fish.y += 5
    }

    // spawning obctacles
    spawnHook();

    // failing
    if(hookGroup.isTouching(fish))
    {
      fish.destroy();
    }


  }

  // When Game State is "End"
  if(gameState === "end")
  {

  }

  drawSprites();

}


function BackgroundImg()
{
  if(gameState === "start")
  {
    SI = "Game_Sprites/HomeBG.jpg";
  }

  if(gameState === "play")
  {
    SI = "Game_Sprites/WaterBG.png";
  }
  SceneImg = loadImage(SI);

}

function spawnHook()
{
  
  if(frameCount % 100 === 0 )
  {
    hook = createSprite(random(0,800), 0, 5, 5);
    hook.addImage("obstacle", hookImg);
    hook.scale = 0.3;
    hook.velocityY = 8;
    hook.lifetime = 80;
    hookGroup.add(hook);
    hook.debug = true;

  }

}

