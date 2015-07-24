"use strict";

var listening = false,
	speaking = false;

/******************************************************************************/
/*                                Pleasantries                                */
/******************************************************************************/

var reset = function () {
	$('.main-frame').removeClass('main-frame--news');
}

var ok = function() {
	if (!listening) {
		$('#siri_on').get(0).play();
		$('.robot').attr('src', 'img/robot_on.svg');
		$('.robot-container').toggleClass('robot-container--on');
		listening = true;
		talk("Hello, how can I help?");
	}
}

var goodbye = function() {
	if (listening) {
		$('#siri_off').get(0).play();
		$('.robot').attr('src', 'img/robot_off.svg');
		$('.robot-container').toggleClass('robot-container--on');
		listening = false;
		talk("Goodbye!");
	}
}

var help = function() {
	if (listening) {
		reset();
		$('.main-frame').attr('src', 'docs.html')
		talk("Here's the help.");
	}
}

var thank_you = function() {
	if (listening) {
		talk("You're welcome.");
	}
}

/******************************************************************************/
/*                                Maths                                       */
/******************************************************************************/

var what_is_number_complex_operation_number = function(operand1, operation1, operation2, operand2) {
	return what_is_number_operation_number(operand1, operation1 + ' ' + operation2, operand2);
}

var what_is_number_operation_number = function(operand1, operation, operand2) {
console.log(operation);
	if (listening) {
		if (isNumeric(operand1) && isNumeric(operand2)) {
			switch(operation) {
				case "+":
				case "plus":
					var answer = parseFloat(operand1) + parseFloat(operand2);
					talk(operand1 + " plus " + operand2 + " is " + answer);
					break;
				case "-":
				case "minus":
					var answer = parseFloat(operand1) - parseFloat(operand2);
					talk(operand1 + " minus " + operand2 + " is " + answer);
					break;
				case "x":
				case "times":
				case "multiplied by":
					var answer = parseFloat(operand1) * parseFloat(operand2);
					talk(operand1 + " times " + operand2 + " is " + answer);
					break;
				case "divided by":
					var answer = parseFloat(operand1) / parseFloat(operand2);
					talk(operand1 + " divided by " + operand2 + " is " + answer);
					break;
			}
		} else {
			talk("I'm sorry, I can't figure that one out.")
		}
	}
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/******************************************************************************/
/*                                      News                                  */
/******************************************************************************/

var news = function(section) {
	if (listening) {
		var url;
		if (section) {
			switch(section) {
				case 'national':
					url = 'http://stuff.co.nz/national';
					break
				case 'world':
					url = 'http://stuff.co.nz/world';
					break
				case 'business':
					url = 'http://stuff.co.nz/business';
					break
				case 'technology':
					url = 'http://stuff.co.nz/technology';
					break
				case 'sports':
					url = 'http://stuff.co.nz/sport';
					break
				case 'life and style':
					url = 'http://stuff.co.nz/life-style';
					break
				case 'travel':
					url = 'http://stuff.co.nz/travel';
					break
				case 'motoring':
					url = 'http://stuff.co.nz/motoring';
					break
				default:
					url = 'http://stuff.co.nz';
			}
		} else {
			url = 'http://stuff.co.nz';
		}

		$('.main-frame').attr('src', url);
		$('.main-frame').addClass('main-frame--news');

		if (section) {
			talk("Here's the news for" + section);
		} else {
			talk("Here's the news.");
		}
	}
}

var storyIndex = 0;
var storySection = '';

var news_read = function(section, field) {
	if (listening) {

		if (section && section !== storySection) {
			storyIndex = 0;
		}

		for (var i=storyIndex; i<stories.length; i++) {
			var story = stories[i];

			if (story.intro) {
				if (!section || story.section == section) {
					storyIndex = ++i;
					storySection = section ? section : storySection;
					//console.log(story);
					if (field) {
						return talk(story[field]);
					} else {
						return talk(story.intro);
					}
				}
			}
		}

		talk("That's all the " + (storySection ? storySection : "") + " news");
	}
}

var news_sections = function(section) {
	section = section ? section.toLowerCase() : '';
	var sections = [];
	for (var i=0; i<stories.length; i++) {
		var story = stories[i];
		sections[story.section] = sections[story.section] ? ++sections[story.section] : 1;
	}

	var speech = '';
	if (section) {
		if (sections[section] == 1) {
			speech = 'There is ' + sections[section]  + ' ' + section + ' story. ';
		} else {
			speech = 'There are ' + sections[section]  + ' ' + section + ' stories. ';
		}
	} else {
		speech = Object.keys(sections).map(function(item, index){
			if (sections[item] == 1) {
				return 'There is ' + sections[item]  + ' ' + item + ' story. ';
			} else {
				return 'There are ' + sections[item]  + ' ' + item + ' stories. ';
			}
		}).join('');
	}

	if (listening) {
console.log(speech);
		talk(speech);
	}
}

var news_next = function() {
	news_read(storySection);
}

var news_more = function() {
	storyIndex--;
	news_read(storySection, "body");
}

/******************************************************************************/
/*                                Robotics                                    */
/******************************************************************************/

var open_the_pod_bay_doors = function () {
	if (listening) {
		talk("I'm sorry Dave, I'm afraid I can't do that.");
	}
}

var whats_the_problem = function() {
	if (listening) {
		talk("I think you know what the problem is just as well as I do.");
	}
}

var what_are_you_talking_about = function() {
	if (listening) {
		talk("This mission is too important for me to allow you to jeopardize it.");
	}
}

var what_are_the_three_laws = function() {
	if (listening) {
		talk("1. A robot may not injure a human being or, through inaction, allow a human being to come to harm. 2. A robot must obey the orders given it by human beings, except where such orders would conflict with the First Law. 3. A robot must protect its own existence as long as such protection does not conflict with the First or Second Laws.");
	}
}

var kick_someone = function() {
	if (listening) {
		talk("HAL kicks Mitch");
	}
}

var stop = function() {
	responsiveVoice.cancel();
	$('.robot-container button').attr('disabled', 'disabled');
}

if (annyang) {
	// Let's define our first command. First the text we expect, and then the function it should call
	var commands = {
		'ok *hal': ok,
		'goodbye *hal': goodbye,
		'thank you *hal': thank_you,
		'thanks *hal': thank_you,
		'show (me) the help': help,
		'help': help,
		'help *hal': help,
		'stop (*hal)': stop,

		'what is :number :operation :number': what_is_number_operation_number,
		'what is :number :operation :operation :number': what_is_number_complex_operation_number,

		'show (me) the news': news,
		'show (me) the :section news': news,
		'how many stories': news_sections,
		'how many :section stories': news_sections,
		'read (me) the news': news_read,
		'read (me) the stories': news_read,
		'read (me) the :section news': news_read,
		'read (me) the :section stories': news_read,
		'read (me) the :section story': news_read,
		'next (story)': news_next,
		'more (news)': news_more,

		'what are the 3 laws': what_are_the_three_laws,
		'what are the three laws': what_are_the_three_laws,
		'open the pod bay doors (*hal)': open_the_pod_bay_doors,
		'what\'s the problem (*hal)': whats_the_problem,
		'what are you talking about (*hal)': what_are_you_talking_about,
		'kick someone (*hal)': kick_someone,
		'kick :anyone (*hal)': kick_someone,
	};

	// OPTIONAL: activate debug mode for detailed logging in the console
	annyang.debug();

	// Add our commands to annyang
	annyang.addCommands(commands);

	// OPTIONAL: Set a language for speech recognition (defaults to English)
	annyang.setLanguage('en-NZ');

	// Start listening. You can call this here, or attach this call to an event, button, etc.
	annyang.start();
}

var voiceStartCallback = function () {

	$('.robot-container button').removeAttr('disabled');

	// We don't want annyang listening while HAL is speaking.
	if (annyang && window.location.protocol === 'https:') {
		annyang.abort();
   }
}

var voiceEndCallback = function () {

	$('.robot-container button').attr('disabled', 'disabled');

	// We want annyang listening after HAL finishes speaking.
	if (annyang && window.location.protocol === 'https:') {
		annyang.resume();
   }
}

responsiveVoice.parameters = {
	onstart: voiceStartCallback,
	onend: voiceEndCallback
}

responsiveVoice.OnVoiceReady = function(){
	speaking = true;
	responsiveVoice.setDefaultVoice("UK English Male");
}

var talk = function(narration){
	responsiveVoice.speak(narration, "UK English Male", responsiveVoice.parameters);
}

function stripHTML(dirtyString) {
	var container = document.createElement('div');
	container.innerHTML = dirtyString;
	return container.textContent || container.innerText;
}

var stories = [];
var jsonUrl = 'https://jsonp.afeld.me/?callback=cb&url=http://www.stuff.co.nz/_json/?limit=50&with_straps=1&mtime=0';

$.ajax({
   type: 'GET',
    url: jsonUrl,
    async: false,
    jsonpCallback: 'cb',
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(json) {
		// populate our sections with initial content
		json.stories.forEach( function( el, i ) {
			var story = json.stories[i];

			var section = story.path.split(/\//)[1];

			var item = {
				title: story.title,
				url: story.url,
				intro: story.intro,
				section: section,
				body: stripHTML(story.body)
			};

			stories.push(item);
		});
    },
    error: function(e) {
       console.log(e.message);
    }
});
