quickDrawDataset = ["aircraft carrier","airplane","alarm clock","ambulance","angel","animal migration","ant","anvil","apple","arm","asparagus",
"axe","backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear",
"beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake","blackberry","blueberry","book","boomerang",
"bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly",
"cactus","cake","calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot",
"castle","cat","ceiling fan","cello","cell phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee cup",
"compass","computer","cookie","cooler","couch","cow","crab","crayon","crocodile","crown","cruise ship","cup","diamond","dishwasher",
"diving board","dog","dolphin","donut","door","dragon","dresser","drill","drums","duck","dumbbell","ear", "elbow","elephant",
"envelope","eraser","eye","eyeglasses","face","fan","feather","fence","finger","fire hydrant","fireplace","firetruck","fish",
"flamingo","flashlight","flip flops","floor lamp","flower","flying saucer","foot","fork","frog","frying pan","garden","garden hose",
"giraffe","goatee","golf club","grapes"];

randomNumber = Math.floor((Math.random()*quickDrawDataset.length)+1);
console.log(quickDrawDataset[randomNumber]);
sketch = quickDrawDataset[randomNumber];
document.getElementById("esboco").innerHTML= "O esboço a ser desenhado é: " + sketch;

var timeCouter = 0;
var timerCheck = "";
var drawSketch = ""; 
var answerHolder = "";
var score = 0;

function draw()
{
    checkSketch();
    if(drawSketch==sketch){
        answerHolder = "set"
        score = score+1;
        document.getElementById("po").innerHTML = "pontuação : " + score;
    }
    strokeWeight(5);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY)
    }
}
function checkSketch()
{
    timeCouter = timeCouter+1;
    document.getElementById("tempo").innerHTML = "tempo : " + timeCouter;
    console.log(timeCouter);
    if(timeCouter>1000){
        timeCouter = 0;
        timerCheck = "completed";
    }
    if(timerCheck=="completed"||answerHolder==set){
        timerCheck = "";
        answerHolder = "";
        updateCanvas();
    }
}
function updateCanvas()
{
    background("white");
    randomNumber = Math.floor((Math.random()*quickDrawDataset.length)+1);
console.log(quickDrawDataset[randomNumber]);
sketch = quickDrawDataset[randomNumber];
document.getElementById("esboco").innerHTML= "O esboço a ser desenhado é: " + sketch;
}
function setup()
{
    canvas = createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
}
function preload()
{
    classifier = ml5.imageClassifier('DoodleNet');
}
function classifyCanvas()
{
    classifier.classify(canvas,gotResult)
}
function gotResult(error,results)
{
    if(error){
        console.error(error);
    }
    console.log(results);
    drawSketch = results[0].label;
    var pre = Math.round(results[0].confidence*100);
    document.getElementById("esboc").innerHTML="Seu esboço é :"+ drawSketch;
    document.getElementById("esbo").innerHTML="Precisão :"+ pre + "%";
}