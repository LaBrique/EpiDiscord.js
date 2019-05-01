const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const fs = require('fs');

const client = new Discord.Client();

var Intras = new Map();
module.exports = Intras;

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);
    let reply = "";

    if (command.dm) {
        if (!(message.channel.type == "dm")) {
            reply += "Cette commande n'est accessible qu'en DM.";
            return (message.channel.send(reply));
        }
    }

    if (command.args) {
		if (!args.length) {
			reply += `Ils sont où tes arguments?`;
		} else if (!command.flexible_args) {
			if (command.args.length > args.length) {
				reply += `Il te manque des arguments là!`;
			} else if (command.args.length < args.length) {
				reply += `Wow calmos t'as trop d'arguments là!`;
			}
		}
		if (!reply) {
			for (var i = 0; command.args[i]; i++) {
				if (command.args[i] == "int" && isNaN(args[i])) {
					reply += `Nombre **${args[i]}** invalide.`;
				} else if (command.args[i] == "mention" && !args[i].startsWith("<@") && !args[i].endsWith(">")) {
					reply += `Mention **${args[i]}** invalide.`;
				} else if (command.args[i] == "role" && !args[i].startsWith("<@&") && !args[i].endsWith(">")) {
					reply += `Rôle **${args[i]}** invalide.`;
				}
			}
		}
	}
	if (!(reply === "")) {
	 	if (command.usage) {
			reply += `\nEssaye plutôt ça : \`${prefix}${command.usage}\``;
		}
		return message.channel.send(reply);
	}

	try {
        let intra = command.login ? Intras.get(message.author) : {};
        if (command.login && intra == undefined)
            return (message.channel.send("Cette commande nécessite d'avoir son compte lié.\n\`try: !help addUser\`"));
		command.execute(intra, message, args);
	}
	catch (error) {
		console.error(error);
		message.channel.send(`there was an error trying to execute the command ${command.name}`);
	}
});

// setInterval(3600, () => {
//
// });

client.login(token);
