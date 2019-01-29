let inputField;
let enterButton;
let readButton;
let hideButton;
let title;
let lastScentence;
let story =[];
let storyP;



let socket = io();
let data = 'Data from the client to the server';
socket.emit('sayingHello', data);


function setup() {
  // create canvas
  createCanvas(windowWidth, windowHeight);

  colorMode(HSB);
  
  lastScentence = select("#lastScentence");
  story.push(lastScentence.html());
  //colorWords(lastScentence);

  title = select("#title");

  inputField = select("#inputField");

  enterButton = select("#enterButton");
  enterButton.mousePressed(enterScentence);

  readButton = select("#readButton");
  readButton.mousePressed(showStory);

  readButton = select("#hideButton");
  readButton.mousePressed(hideStory);

  storyP = select("#story");

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
		lastScentence.html(inputField.value());
		story.push(lastScentence.html());
		inputField.value("");
		fill(0);
		title.html("Continue the story!");
	}
	else
	{
		fill(255,0,0);
		title.html("Write something before you submit, please!");
		console.log("write somthing!");
	}
}


function showStory()
{
	if (story.length != 0)
	{
		if(storyP.html() != "")
		{
			hideStory();
		}
		for(s in story)
		{
			storyP.html(storyP.html()+story[s]+" <br /> ");
		}
	}
	else
	{
		console.log("empty story");
	}
}

function hideStory()
{
	storyP.html("");
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