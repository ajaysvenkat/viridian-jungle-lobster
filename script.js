const clueHoldTime = 1000; //how long to hold each clue's light/sound
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

var pattern=[];
var progress = 0; 
var gamePlaying = false;
var tonePlaying = false;
var volume = 1;
var guessCounter = 0;
var slider = document.getElementById("rounds");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

function slide() {
  var x = document.getElementById("rounds").value;
  document.getElementById("demo").innerHTML = "Rounds: " + x;
}
function startGame(){
    progress = 0;
    gamePlaying = true;
    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("stopBtn").classList.remove("hidden");
    makePattern();
    playClueSequence();
}
function stopGame(){
    //initialize game variables
    gamePlaying = true;
    document.getElementById("startBtn").classList.remove("hidden");
    document.getElementById("stopBtn").classList.add("hidden");
}

function makePattern(){
    var num = document.getElementById("rounds").value;
    var temp = 0;
    console.log("slider is: " + num);
    for(let i=0;i<num;i++){
      temp=Math.floor(Math.random() * 4)+1;
      pattern[i]=temp;
    }
}

const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 523
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  context.resume()
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    context.resume()
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    context.resume()
    tonePlaying = true
  }
}
function stopTone(){
  g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
  tonePlaying = false
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext 
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)

function lightButton(btn){
  document.getElementById("btn"+btn).classList.add("lit")
}
function clearButton(btn){
  document.getElementById("btn"+btn).classList.remove("lit")
}

function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}

function playClueSequence(){
  context.resume()
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
  }
}

function loseGame(){
  stopGame();
  alert("Game Over. Try Again.");
}
function winGame(){
  stopGame();
  alert("Congrats! You Win!");
}

function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }
  if(pattern[guessCounter] != btn)
    loseGame();
  else if(guessCounter != progress )
    guessCounter++;
  else if(progress==pattern.length-1)
    winGame();
  else{
    progress++;
    playClueSequence();
  }
}