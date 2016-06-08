
var Discord = require('discord.js');

var bot = new Discord.Client();

bot.on("message", function(msg) {
  var command = msg.content;
  if(command.substring(0, 6) === '!timer') {

    console.log('Timer requested from ' + msg.author.username);

    if(command === '!timer') {

      bot.reply(msg, 'Usage: !timer <length>');
      bot.reply(msg, 'Format: <minute>m <second>s, <minute>:<second>');

    } else {

      var params = command.substring(7, command.length);
      console.log(params);

        // M:S
      if(params.indexOf(':') !== -1) {

        var min = parseInt(params.substring(0, params.indexOf(':')));
        var sec = parseInt(params.substring(params.indexOf(':') + 1, params.length));

        timer(msg, toMilli(min, sec));

      }

        // Mm Ss
      if(params.indexOf('m') !== -1 && params.indexOf(' ') !== -1 && params.indexOf('s') !== -1) {

        var min = parseInt(params.substring(0, params.indexOf('m')));
        var sec = parseInt(params.substring(params.indexOf(' ') + 1, params.length));

        timer(msg, toMilli(min, sec));

        // Mm
      } else if(params.indexOf('m') !== -1) {

        var min = parseInt(params);
        var sec = 0;

        timer(msg, toMilli(min, sec));

        // Ss
      } else if(params.indexOf('s') !== -1) {

        var min = 0;
        var sec = parseInt(params);

        timer(msg, toMilli(min, sec));

      }

    }


  }
});

// Converts minutes and seconds into milliseconds
function toMilli(min, sec) {

  var milli = 0;

  milli += min * 60000;
  milli += sec * 1000;

  return milli;

}

// Converts milliseconds into minutes and seconds
function fromMilli(milli) {

  var min = 0;
  var sec = 0;

  sec = milli / 1000;
  min = Math.floor(sec / 60);
  sec -= min * 60;

  if(sec < 10) {
    sec = '0' + sec.toString();
  }
  if(min < 10) {
    min = '0' + min.toString();
  }

  return min + ':' + sec;

}

// Sets the timer
function timer(msg, duration) {

  bot.reply(msg, 'Timer has been set for ' + fromMilli(duration));

  setTimeout(function() {

    bot.reply(msg, 'Timer has finished!');

  }, duration);
}

bot.login("discordtimerbot@gmail.com", "lc286739");
