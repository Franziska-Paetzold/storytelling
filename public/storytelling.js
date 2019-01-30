"use strict";

let inputField;
let enterButton;
let readButton;
let hideButton;
let title;
let lastScentence;
let story =[];
let storyDiv;
let font1, font2, font3, font4, font5, font6;
let fonts=[];


let socket = io();
let data = 'Data from the client to the server';
socket.emit('sayingHello', data);

function preload() {
	// Ensure the .ttf or .otf font stored in the assets directory
	// is loaded before setup() and draw() are called
	font1 = loadFont('assets/Aileron-Light.otf');
	fonts.push("Aileron-Light");
	//somehow cut out in the browser, does not look good
	//font2 = loadFont('assets/Amarillo.otf');
	//fonts.push("Amarillo");
	font3 = loadFont('assets/Volstead.otf');
	fonts.push("Volstead");
	font4 = loadFont("assets/CherryandKisses.ttf")
	fonts.push("CherryandKisses");
	font5 = loadFont("assets/wonderbar.otf")
	fonts.push("wonderbar");
	font6 = loadFont("assets/Candy.ttf");
	fonts.push("Candy");
  }

function setup() {
  colorMode(HSB);
  
  //set one of the special fonts to the start scentence
  let currFont = random(fonts);
  setFont("lastScentence",currFont);
  lastScentence = select("#lastScentence");
  story.push([lastScentence.html(), currFont]);
  //colorWords(lastScentence);

  socket.on('broadcastScentence', receivedScentence);
  socket.on('getScentences', sentScentences);
//TODO   socket.on('initSketch', receivingInitSketch);

  title = select("#title");

  inputField = select("#inputField");

  enterButton = select("#enterButton");
  enterButton.mousePressed(enterScentence);

  readButton = select("#readButton");
  readButton.mousePressed(showStory);

  readButton = select("#hideButton");
  readButton.mousePressed(hideStory);

  storyDiv = select("#story");

}

function colorWords(words)
{
	const hue = random(255);
	for (word in words)
	{
		const brightness = random(255);
		fill(hue, 255, brightness);
	}
}

function enterScentence()
{
	if (inputField.value().trim() != "")
	{
		let currFont = random(fonts);
		setFont("lastScentence",currFont);
		lastScentence.html(inputField.value());
		story.push([lastScentence.html(), currFont]);
		inputField.value("");
		title.html("Continue the story!");
		socket.emit('setNewScentence', lastScentence.html());
	}
	else
	{
		title.html("Write something before you submit, please!");
		console.log("write somthing!");
	}
}


function setFont(id, font)
{
	console.log(font);
	document.getElementById(id).style.fontFamily = font;
}

function showStory()
{
	if (story.length != 0)
	{
		if(storyDiv.innerHTML !== "")
		{
			hideStory();
		}
		for(let s in story)
		{
			let scentenceParagraph = createElement("p", story[s][0]).parent("#story").addClass("scentences").id("scentence"+s);
			setFont(("scentence"+s),story[s][1]);
			//scentenceParagraph.html();
			//storyDiv.html(storyP.html()+story[s[0]]+" <br /> ");
		}
	}
	else
	{
		console.log("empty story");
	}
}

function hideStory()
{
	storyDiv.html("");
}



window.onload=function(){
	document.getElementById("inputField").addEventListener("keyup", function(event) 
	{
		event.preventDefault();
		if (event.keyCode === 13) 
		{
			//document.getElementById("enterButton").click();
			//-->  not an onclick event but mousepressed so, hardcode:
			enterScentence();
		}
	});
}

function sentScentences()
{
    console.log('Sending all scentences data');
    for (let s in story) 
    {
        let data = 
        { 
            index: story[s]
        }
        socket.emit('setNewScentence', data);
    }
}

function receivedScentence(scentence)
{
	lastScentence.html(scentence);
	story.push(lastScentence.html());
}

//TODO
// function receivingInitSketch(data)
// {

	// lastScentence.html(data);
	// story.push(lastScentence.html());
	//'''##############################
//     for (let i = 0; i < data.length; i++) 
//     {
//         // We can't be sure that data array from the
//         // database has the same order as the magnets
//         // array. We need to identify each element
//         // by its index.
//         var index = gPoetry.magnets.findIndex(obj => 
//         {
//             return obj.index === data[i].index
//         });

//         gPoetry.magnets[index].index = data[i].index;
//         gPoetry.magnets[index].x = data[i].x;
//         gPoetry.magnets[index].y = data[i].y;
//     }
// }