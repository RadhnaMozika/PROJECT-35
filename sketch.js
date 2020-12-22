var db, dbref;
var dog, dogImage1, dogImage2;
var foodStock, foodS;

function preload()
{
  //loading Images of the dog
  dogImage1 = loadImage("images/dogImg.png");
  dogImage2 = loadImage("images/dogImg1.png");
}


function setup() {
  createCanvas(500, 500);
  
  //connecting to database and creating an instance
  db = firebase.database();
  dbref = db.ref;

  //reading value of "Food"
  foodStock = db.ref("Food")
  foodStock.on("value", readStock);

  //creating sprite for dog and adding image
  dog = createSprite(width/2, height/2+50, 20, 20);
  dog.addImage(dogImage1)
  dog.scale = 0.25;
  
}


function draw() {  
  background(46, 139, 87);

  //putting Image 2 for dog when up arrow is pressed
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImage2);
  } 

  drawSprites();
  
  //displaying food number and instructions
  fill(255);
  textSize(20);
  textFont("Garamond");
  text("Food Remaining = "+foodS, 160, 180);
  text("Press up arrow key to feed the dog!", 110, 20)

}

//function to read food value in the database
function readStock(data){
  foodS = data.val();
}

function writeStock(a){
  //decreasing value of food
  if(a<=0 ){
    a = 0
  }
  else{
    a = a-1;
  }

  //updating value of food in the database
  db.ref("/").update({Food : a})
}


