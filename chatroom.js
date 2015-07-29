
//initialization
var fs = require('fs');
var net = require('net');
var cowsay = require('cowsay');
var chalk = require('chalk');
var port = 3300;
var clientNum = 0;
var clients = []
var messages =[];
//make server
var server = net.createServer(function(client){
		clients.push(client);//push client into the array
		client.write("This is a chatroom program\n");
		client.write("There are currently " + clientNum + " clients in the room.\n");
		client.write(chalk.blue("Client Connected\n"));
		clientNum++;
		messages.forEach(function(elem){
			client.write(elem);
		})
		
		//Chat
		client.on('data',function(input){
			var idOfClient = clients.indexOf(client);//ID of client
			var chat = input.toString().trim();
			var detectCommand = input.toString().trim().split(" ");
			switch(detectCommand[0]){
				case '/yell':
					if(detectCommand.length === 1){
						chat = "AHHHH!!!!!!" //if no proceeding messages
					}else{
						detectCommand.splice(0,1);
						chat = detectCommand.join(" ").toUpperCase();
					}
					break;
				case '/tableflip':
					chat = "(╯°□°）╯︵ ┻━┻";
					break;
				case '/cowsay':
					detectCommand.splice(0,1);
					chat = detectCommand.join(" ");
					chat = cowsay.say({
					    text : chat,
					    e : "oO",
					    T : "U "
						});
					break;

			}
			clients.forEach(function(elem){
				elem.write("Client " + idOfClient +  " Says: " + chat + '\n');
			})
			messages.push("Client " + idOfClient +  " Says: " + chat + '\n');
		})
		//Disconnection
		client.on('close', function() {			
			var idOfClient = clients.indexOf(client);//ID of client
			clients.splice(idOfClient, 1);
			clientNum--;
			clients.forEach(function(elem){
				elem.write(chalk.red("Client " + idOfClient +  " Disconnected. \n"));
			})
    		console.log('Connection closed');
		});

			
		








}) 





server.listen(port, function(){
	console.log("client connected!");
})


