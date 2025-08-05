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
  html.style.overflow = 'visible';
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
let mPosX, mPosY;
let trailEnable = false;
let score = 0;
let velocityY = 1;
let fruitSpawnTimer = 1000;
let intervals = [];
let fruitsArray = [];

const fruitArray = ["watermelon", "banana", "apple"];
const sliceSFX = new Audio('audio/sliceSFX.mp3');

/* FOR FRUIT NINJA */

fullscreenButton.addEventListener('click', function()
{
  document.documentElement.requestFullscreen();
});

let startListener = startButton.addEventListener('click', function()
{
  html.style.overflow = 'hidden';
  gameLoop();
  startButton.style.display = 'none';
  fruitSpawnTimer = 1000;
});

function gameLoop()
{
  gameBG.classList.add('gameStarted'); //initiates the ui change

  requestAnimationFrame(trailSpawn);
  let gameLoopInterval = setInterval(function(){
    fruitSpawn(velocityY);
  }, fruitSpawnTimer);
  intervals.push(gameLoopInterval);

  let intensityInterval = setInterval(function(){
    velocityY += 0.65;
    fruitSpawnTimer -= 150;
    if (fruitSpawnTimer < 300)
    {
      fruitSpawnTimer = 300;
    }
    if (velocityY > 3.5)
    {
      velocityY = 3.5;
    }

    for (let i = 0; i < intervals.length; i++)
    {
      if (intervals[i] == gameLoopInterval)
      {
        intervals.splice(i, 1);
      }
    }
    clearInterval(gameLoopInterval);

    gameLoopInterval = setInterval(function(){
      fruitSpawn(velocityY);
    }, fruitSpawnTimer);
    intervals.push(gameLoopInterval);
  }, 10000);

  intervals.push(intensityInterval);

  gameBG.addEventListener('mousedown', function()
  {
    trailEnable = true;
  });

  gameBG.addEventListener('mouseup', function()
  {
    trailEnable = false;
  });

  gameBG.addEventListener('touchstart', function() 
  {
    trailEnable = true;
  });

  gameBG.addEventListener('touchend', function() 
  {
    trailEnable = false;
  });


  gameBG.addEventListener('mousemove', function(mPos)
  {
    mPosX = mPos.clientX;
    mPosY = mPos.clientY;
  });

  gameBG.addEventListener('touchmove', function(mPos) {
    mPosX = mPos.touches[0].clientX;
    mPosY = mPos.touches[0].clientY;
  });

}

function trailSpawn()
{
  if (trailEnable)
  {
    let trailClone = trailCircle.cloneNode(true);
    trailClone.style.display = 'block';
    trailClone.style.position = 'absolute';

    trailClone.style.top = (mPosY -285)+ "px";
    trailClone.style.left = (mPosX - 30) + "px";
    gameBG.appendChild(trailClone);

    setTimeout(function(){
      trailClone.remove();
    }, 500);
  }
  requestAnimationFrame(trailSpawn);
}

function fruitSpawn(velocityY) //generate fruit
{
  //fruit itself
  console.log("SPAWNED");
  let fruit = document.createElement('div');
  let randomNum = Math.floor(Math.random() * 3);
  let randomCoords = Math.floor(Math.random() * 60) + 20;

  fruit.classList.add(`${fruitArray[randomNum]}`);
  gameBG.appendChild(fruit);

  //fruit "physics"
  let fruitY = -15;
  fruit.style.top = `${fruitY}vh`;
  fruit.style.position = 'absolute';
  fruit.style.left = `${randomCoords}vw`;

  fruitsArray.push(fruit);

  fruit.addEventListener('mouseover', function()
  {
    if (trailEnable)
    {
      sliceSFX.currentTime = 0;
      score += 1;
      scoreText.innerHTML = 'Score: '+score;
      sliceSFX.play();

      for (let i = 0; i < fruitsArray.length; i++)
      {
        if (fruitsArray[i] == fruit)
        {
          fruitsArray.splice(i, 1);
        }
      }

      fruit.remove();
      clearInterval(moveDownInterval);
    }
  });

  gameBG.addEventListener('touchmove', function(e) 
  {
  const touch = e.touches[0];
  const x = touch.clientX;
  const y = touch.clientY;

  const rect = fruit.getBoundingClientRect();
  if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) 
  {
    sliceSFX.currentTime = 0;
    score += 1;
    scoreText.innerHTML = 'Score: '+score;
    sliceSFX.play();

    fruit.remove();
    for (let i = 0; i < fruitsArray.length; i++)
    {
      if (fruitsArray[i] == fruit)
      {
        fruitsArray.splice(i, 1);
      }
    }
    
    clearInterval(moveDownInterval);
  }
  });


  let moveDownInterval = setInterval(function()
  {
    console.log(fruitY);
    fruit.style.top = `${fruitY}vh`;
    fruitY += velocityY;

    if (fruitY > 50)
    {
      console.log("removed.");
      for (let i = 0; i < fruitsArray.length; i++)
      {
        if (fruitsArray[i] == fruit)
        {
          fruitsArray.splice(i, 1);
        }
      }
      fruit.remove();
      for (let i = 0; i < intervals.length; i++)
      {
        if (intervals[i] == moveDownInterval)
        {
          intervals.splice(i, 1);
        }
      }
      clearInterval(moveDownInterval);
    }
  }, 50); //20 fps
  intervals.push(moveDownInterval);
}

resetButton.addEventListener('click', function()
{
  gameBG.classList.remove("gameStarted");
  startButton.style.display = 'block';
  startButton.style.margin = 'auto';
  score = 0;
  scoreText.innerHTML = 'Score: '+score;
  removeEventListener('click', startListener);

  for (let i = 0; i < intervals.length; i++)
  {
    clearInterval(intervals[i]);
  }

  for (let i = 0; i < fruitsArray.length; i++)
  {
    fruitsArray[i].remove();
  }
});