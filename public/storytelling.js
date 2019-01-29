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
		socket.emit('setNewScentence', lastScentence.html());
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

function sentScentences()
{
    console.log('Sending all scentences data');
    for (s in story) 
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