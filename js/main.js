"use strict";

var listening = false,
    speaking = false;

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

var news_read = function(section) {
    if (listening) {
        stories.forEach( function( el, i ) {
            var story = stories[i];

            if (story.section == section) {
                console.log(story);
                return talk(story.intro);
            }

        });
    }
}

var help = function() {
    if (listening) {
        reset();
        $('.main-frame').attr('src', 'docs.html')
        talk("Here's the help.");
    }
}

var open_the_pod_bay_doors = function () {
    if (listening) {
        talk("I'm sorry, Dave. I'm afraid I can't do that.");
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

var stop = function() {
    if (listening) {
        responsiveVoice.cancel();
    }
}

var reset = function () {
    $('.main-frame').removeClass('main-frame--news');
}

if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    var commands = {
        'ok *hal': ok,
        'goodbye *hal': goodbye,
        'show (me) the news': news,
        'show (me) the :section news': news,
        'read (me) the news': news_read,
        'read (me) the :section news': news_read,
        'show (me) the help': help,
        'help': help,
        'help *hal': help,
        'stop (*hal)': stop,
        'open the pod bay doors *hal': open_the_pod_bay_doors,
        'what\'s the problem': whats_the_problem,
        'what are you talking about *hal': what_are_you_talking_about,
        'what are the 3 laws': what_are_the_three_laws,
        'what are the three laws': what_are_the_three_laws,
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
    // We don't want annyang listening while HAL is speaking.
    if (annyang) {
//        annyang.pause();
   }
}

var voiceEndCallback = function () {
    // We want annyang listening after HAL finishes speaking.
    if (annyang) {
//        annyang.resume();
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
var jsonUrl = 'data/stories.json';

var jsonFeed = fetch(jsonUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // populate our sections with initial content
        data.stories.forEach( function( el, i ) {
            var story = data.stories[i];

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

        return stories;
    }).then(function(){
        //console.log(stories);
    });
