// Discord API
var Discord = require('discord.js');
var bot = new Discord.Client();

// Discord Login Credentials
var auth = require('./auth.json');

// Array holds all timers
var timers = [];

// Starts loop that substracts from timers
setInterval(loop, 1000);

bot.on('message', function(msg) {
	if(msg.content === '!timer') {
		// No Parameters
		console.log('No Parameters');
	} else if (msg.content.charAt(6) === ' ') {
		// New Timer
		console.log('New Timer');
		var params = paramHandler(msg.content.substring(7, msg.content.length));
		newTimer(params.name, params.duration);
	} else if(msg.content.substr(0, 6) === '!timer') {
		// Timer Command
		console.log('Timer Command');
		if(msg.content.substr(0, 10) === '!timerlist') {
			console.log(timers);
		}
		if(msg.content.substr(0, 12) === '!timerpause ') {
			// Gets timerName param
			var timerName = msg.content.substring(12, msg.content.length);
			
			// Decides if to send error message timer not found
			var exists = false;
			
			for(i in timers) {
				if(timers[i].name.toLowerCase() === timerName.toLowerCase()) {
					timers[i].paused = !timers[i].paused;
					exists = true;
				}
			}
			if(!exists) {
				console.log('Timer ' + timerName + ' does not exist');
			}
		}
		if(msg.content.substr(0, 10) === '!timerleft') {
			// Gets timerName param
			var timerName = msg.content.substring(11, msg.content.length);
			
			// Decides if to send error message timer not found
			var exists = false;
			
			for(i in timers) {
				if(timers[i].name.toLowerCase() === timerName.toLowerCase()) {
					// Create function to convert from seconds to hours, minutes, seconds
					console.log('Timer ' + timerName + ' has ' + timers[i].timeRemaining + ' seconds remaining');
					exists = true;
				}
			}
			if(!exists) {
				console.log('Timer ' + timerName + ' does not exist');
			}
		}
	}
});

bot.login(auth.email, auth.password);

// Runs once every second
function loop() {
	
	// Subtracts one second from times
	for(var i = 0; i < timers.length; i++) {
		if(!timers[i].paused) {
			timers[i].timeRemaining--;
			
			// Checks if timer is done
			// If done removes timer from array and sends message
			if(timers[i].timeRemaining <= 0) {
				console.log('Timer ' + timers[i].name + ' has finished');
				timers.splice(i, 1);
			}
		}
	}
	
}

// Refines parameters to name and time
function paramHandler(params) {
	var hour, min, sec;
	
	var params = params.split(' ');
	var name = params[0];
	params.splice(0, 1);
	
	for(i in params) {
		
		// Hours	
		if(params[i].match(/\d+hours/)) {
			hour = params[i].replace('hours', '');
		} else if(params[i].match(/\d+hour/)) {
			hour = params[i].replace('hour', '');
		} else if(params[i].match(/\d+hrs/)) {
			hour = params[i].replace('hrs', '');
		} else if(params[i].match(/\d+hr/)) {
			hour = params[i].replace('hr', '');
		} else if(params[i].match(/\d+h/)) {
			hour = params[i].replace('h', '');
		}
		
		// Minutes
		if(params[i].match(/\d+minutes/)) {
			min = params[i].replace('minutes', '');
		} else if(params[i].match(/\d+minute/)) {
			min = params[i].replace('minute', '');
		} else if(params[i].match(/\d+mins/)) {
			min = params[i].replace('mins', '');
		} else if(params[i].match(/\d+min/)) {
			min = params[i].replace('min', '');
		} else if(params[i].match(/\d+m/)) {
			min = params[i].replace('m', '');
		}
		
		// Seconds
		if(params[i].match(/\d+seconds/)) {
			sec = params[i].replace('seconds', '');
		} else if(params[i].match(/\d+second/)) {
			sec = params[i].replace('second', '');
		} else if(params[i].match(/\d+secs/)) {
			sec = params[i].replace('secs', '');
		} else if(params[i].match(/\d+sec/)) {
			sec = params[i].replace('sec', '');
		} else if(params[i].match(/\d+s/)) {
			sec = params[i].replace('s', '');
		}
	}
	
	console.log('====================\nHours: ' + hour + '\nMinutes: ' + min + '\nSeconds: ' + sec);
	
	if(hour) {hour *= 3600} else {hour = 0}
	if(min) {min *= 60} else {min = 0}
	if(sec) {sec *= 1} else {sec = 0}
	
	var duration = hour + min + sec;
	return {'name': name, 'duration': duration};
}

// Handles new timer
function newTimer(name, duration) {
	var timer = {
		'name': name,
		'timeRemaining': duration,
		'paused': false
	};
	timers.push(timer);
	console.log(timers);
}