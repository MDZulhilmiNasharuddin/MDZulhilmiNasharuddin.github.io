let pageButton = document.querySelector("#pageButton");
let pageButtonBG = document.querySelector("#pageButtonBG");
let swordsmanshipButton = document.querySelector("#swordsmanshipButton");
let usesButton = document.querySelector("#usesButton");
let historyButton = document.querySelector("#historyButton");
let materialButton = document.querySelector("#materialButton");
let menuButton = document.querySelector("#menuButton");
let toTheTopButton = document.querySelector("#toTheTop");

let swordsmanshipSection = document.querySelector("#swordsmanship");
let historySection = document.querySelector("#history");
let usesSection = document.querySelector("#uses");
let materialSection = document.querySelector("#material");
let menuSection = document.querySelector("#menu");

let sectionArray = document.querySelector("main").children;

pageButton.addEventListener("click", function()
{
    let pagebuttonchildarr = pageButtonBG.children

    pageButtonBG.classList.toggle("navButtonClicked")
    for (let i = 0; i < pageButtonBG.childElementCount; i++)
    {
        pagebuttonchildarr[i].classList.toggle("navButtonClicked")
    }
});

function hideall()
{
    for (let child of sectionArray)
    {
        child.style.display = "none";
    }
}

function show(sectionName)
{
    let section = document.querySelector("#"+sectionName);
    hideall();
    section.style.display = "inline-block";
}

swordsmanshipButton.addEventListener("click", function(){   
    show("swordsmanship");
})

historyButton.addEventListener("click", function(){
    show("history")
})

usesButton.addEventListener("click", function(){
    show("uses")
})

materialButton.addEventListener("click", function(){
    show("material")
})

menuButton.addEventListener("click", function(){
    show("menu")
})

