# Meet HAL

HAL is a robotic assistant that can respond to certain voice commands.

This project is an exploration of the [Web Speech API](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html), which allows [voice recognition](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#speechreco-section) (speech to text), as well as [speech synthesis](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#tts-section) (text to speech). More information can be found on the [Google Developers site](https://developers.google.com/web/updates/2014/01/Web-apps-that-talk---Introduction-to-the-Speech-Synthesis-API?hl=en)

## Installation

    npm install

## Usage

Pretty self-explantory, as per the notes on the main page:

* "OK HAL" will get HAL to listen to you.
* "Goodbye HAL" will stop HAL listening to you.
* "Show me the help" will make HAL show you the commands

Unfortuantely, HAL's not always a good listener, and will easily get confused by background noise.

Open the dev tools console and you'll see debug output showing what he hears.

## Credits

[Robot icon by Ricardo Moreira](https://thenounproject.com/term/robot/11018/)

### Speech to text

[Annyang](https://www.talater.com/annyang/) provides a convenient wrapper around the [voice recognition](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#speechreco-section) part of the [Web Speech API](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html).

### Text to speech

[Responsive Voice](http://responsivevoice.org/) provides a convenient wrapper around the [speech synthesis](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#tts-section) part of the [Web Speech API](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html), and is used under the [non-commercial license](http://creativecommons.org/licenses/by-nc-nd/4.0/)

### Fonts

Of course, the font used in this project is Roboto (Slab)

