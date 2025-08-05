const pageButton = document.querySelector('#pageButton');
const pageButtonBG = document.querySelector('#pageButtonBG');
const swordsmanshipButton = document.querySelector('#swordsmanshipButton');
const gamesButton = document.querySelector('#gamesButton');
const historyButton = document.querySelector('#historyButton');
const materialButton = document.querySelector('#materialButton');
const menuButton = document.querySelector('#menuButton');
const toTheTopButton = document.querySelector('#toTheTop');

const sectionArray = document.querySelector('main').children;
const h1Text = document.querySelector('h1');
const html = document.querySelector('html');

pageButton.addEventListener('click', function()
{
  let pagebuttonchildarr = pageButtonBG.children;

  pageButtonBG.classList.toggle('navButtonClicked');
  for (let i = 0; i < pageButtonBG.childElementCount; i++) {
    pagebuttonchildarr[i].classList.toggle('navButtonClicked');
  }
});

function hideall() {
  for (const child of sectionArray) {
    child.style.display = 'none';
  }
}

function show(sectionName) {
  gameBG.classList.remove('gameStarted');
  let section = document.querySelector('#'+sectionName);
  hideall();
  section.style.display = 'inline-block';
}

swordsmanshipButton.addEventListener('click', function()
{
  html.style.backgroundColor = 'rgb(171, 171, 248)';
  h1Text.style.color = 'rgb(0,0,0)';
  show('swordsmanship');
});

historyButton.addEventListener('click', function()
{
  html.style.backgroundColor = 'rgb(171, 171, 248)';
  h1Text.style.color = 'rgb(0,0,0)';
  show('history');
});

gamesButton.addEventListener('click', function()
{
    html.style.backgroundColor = 'rgb(171, 171, 248)';
  h1Text.style.color = 'rgb(0,0,0)';
  show('games');
});

materialButton.addEventListener('click', function()
{
  html.style.backgroundColor = 'rgb(0,0,0)';
  h1Text.style.color = 'rgb(255,255,255)';
  show('material');
});

menuButton.addEventListener('click', function() 
{
  html.style.backgroundColor = 'rgb(171, 171, 248)';
  h1Text.style.color = 'rgb(0,0,0)';
  show('menu');
});

window.onscroll = function() 
{
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    toTheTopButton.style.display = 'block';
  } else {
    toTheTopButton.style.display = 'none';
  }
};

toTheTopButton.addEventListener('click', function()
{
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});

/* FRUIT NINJA CONSTS */

const startButton = document.querySelector('#startButton');
const fullscreenButton = document.querySelector('#fullscreenButton');
const resetButton = document.querySelector('#resetButton');
const gameBG = document.querySelector('#fruitNinja');
const trailCircle = document.querySelector('#mouseTrail');
const scoreText = document.querySelector('#score');
let containerItself;
let mPosX, mPosY;
let trailEnable = false;
let fruitY;
let score = 0;
let fruit;
let gInterval;
let velocityY = 1;

const fruitArray = ["watermelon", "banana", "apple"];
const sliceSFX = new Audio('audio/sliceSFX.mp3');

/* FOR FRUIT NINJA */

fullscreenButton.addEventListener('click', function()
{
  document.documentElement.requestFullscreen();
});

startButton.addEventListener('click', function()
{
  gameBG.classList.add('gameStarted'); //initiates the ui change

  let gameLoopInterval = setInterval(gameLoop(), 1000)
})

function gameLoop()
{
  fruitSpawn(velocityY);
}

function fruitSpawn(velocityY) //generate fruit
{
  //fruit itself
  let fruit = document.createElement('div');
  let randomNum = Math.floor(Math.random() * 3);
  let randomCoords = Math.floor(Math.random() * 60) + 20;

  fruit.classList.add(`${fruitArray[randomNum]}`);
  gameBG.appendChild(fruit);

  //fruit "physics"
  let fruitY = -15;
  fruit.style.top = `${fruitY}vh`
  fruit.style.position = 'absolute';
  fruit.style.left = `${randomCoords}vw`

  fruit.addEventListener('mousehover', function()
{
  
})

  let moveDownInterval = setInterval(function()
  {
    console.log(fruitY);
    fruit.style.top = `${fruitY}vh`
    fruitY += velocityY;

    if (fruitY > 50)
    {
      console.log("removed.");
      fruit.remove();
      clearInterval(moveDownInterval);
    }
  }, 50) //20 fps
}
