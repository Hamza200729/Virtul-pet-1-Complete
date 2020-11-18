//Create variables here
var dog , happyDog , foodS , database , foodStock ;
var dodImage;

var food = 20;

function preload()
{
  //load images here
  dogImage = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");

}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();
  
  dog = createSprite(300,300,30,30);
  dog.addImage(dogImage);
  dog.scale = 0.4;
  
}


function draw() {  

  background(46 , 139 , 87);
  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
    food = food-1;
  }



  drawSprites();

  textSize(20);
  fill("white");
  text("Note: Press Up Arrow To Feed the Dog",100,20);
  
  text("Food Remaining: " + food,100,100);
  //add styles here
}

function writeStock(x){
  if (x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    food: x
  })
}

function readStock(data){
  foodS = data.val();
}