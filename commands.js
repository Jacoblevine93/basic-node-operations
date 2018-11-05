const fs = require('fs');

function done(output) {
	process.stdout.write(output);
	process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
	const userInputArray =userInput.split(" ");
	const command = userInputArray[0];

	switch (command) {
		case "echo":
			commandLibrary.echo(userInputArray.slice(1).join(' '));
			break;
		case "cat":
			commandLibrary.cat(userInputArray.slice(1));
			break;
		case "head":
			commandLibrary.head(userInputArray.slice(1));
			break;
		case "tail":
			commandLibrary.tail(userInputArray.slice(1));
			break;
		default:
			commandLibrary.errorHandler(command);
			break;
	}	
}

const commandLibrary = {
	"echo": (userInput) => {
		done(userInput)
	},
  	"cat": function(fullPath) {
       const fileName = fullPath[0];
       fs.readFile(fileName, (err, data) => {
           if (err) throw err;
           done(data);
       });
   	},
  	"head": function(fullPath) {
   		const fileName = fullPath[0];
   		var lines;
   		fs.readFile(fileName, 'utf8', (err,data) => {
   			if (err) throw err;
   			lines = data.split('\n').slice(0,3).join('\n');
   			done(lines);
   		});
   },
   "tail": function(fullPath) {
    	const fileName = fullPath[0];
   		var lines;
   		fs.readFile(fileName, 'utf8', (err,data) => {
   			if (err) throw err;
   			lines = data.split('\n').slice(-3).join('\n');
   			done(lines)
   		});  	
   },
   "errorHandler": function(userInput) {
   		var error = `${userInput} is not valid`;
   		done(error);
   }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;