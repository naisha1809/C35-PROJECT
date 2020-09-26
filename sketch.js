//Create variables here
var dog1, happyDog, database, foodS, foodStock,dog,lastFed;
var foodObj;

function preload()
{
  //load images here
  dog = loadImage("dogImg.png");

  happyDog = loadImage("dogImg1.png");

}

function setup() {
	createCanvas(500,500);
  
  database = firebase.database();
    
  dog1  = createSprite(250,350,10,10);
  dog1.addImage(dog);
  dog1.scale = 0.3;

  foodObj = new Food();

  feed = createButton("Feed The Dog");
  feed.position(670,95);
  feed.mousePressed(feedDog);

  addfood = createButton("Add Food");
  addfood.position(770,95);
  addfood.mousePressed(addFoods);
  

 foodStock = database.ref('Food');
 foodStock.on("value",readStock);

 
 fedTime = database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed = data.val();
 });
}


function draw() {  
  background("green");

  foodObj.display();
  
  fill(255,255,254);
   stroke("black"); 
   text("Food remaining : "+foodS,170,100); 
   textSize(13); 

   if(lastFed>=12){
     text("Last Fed :" + lastFed% + "PM" , 350,30);
   }else if(lastFed==0){
     text("Last Fed : 12 AM",350,30);
   }else{
     text("Last Fed" + lastFed + "AM",350,30);
   }

   drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  if(x<=0){ x=0; }
  else{ x=x-1; }
  database.ref('/').update({
     Food : x
  })
 
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
 })
}

function feedDog(){
  dog1.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime:hour()
 })
}

