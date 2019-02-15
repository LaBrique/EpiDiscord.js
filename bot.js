const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const fs = require('fs');

const client = new Discord.Client();
module.exports = new Discord.Collection();
client.commands = new Discord.Collection();

const Intranet = new require('intra-api');
const intra = new Intranet("auth-3cc16e13a95fc1433a0818e2c8500db5bdafcfec", "simon.perraud@epitech.eu");
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);
    let reply = "";

    if (command.args) {
		if (!args.length) {
			reply += `:thinking: Ils sont où tes arguments?`;
		} else if (!command.flexible_args) {
			if (command.args.length > args.length){
				reply += `:thinking: Il te manque des arguments là!`;
			} else if (command.args.length < args.length){
				reply += `:thinking: Wow calmos t'as trop d'arguments là!`;
			}
		}
		if (!reply) {
			for (var i = 0; command.args[i]; i++) {
				if (command.args[i] == "int" && isNaN(args[i])) {
					reply += `:thinking: Nombre **${args[i]}** invalide.`;
				} else if (command.args[i] == "mention" && !args[i].startsWith("<@") && !args[i].endsWith(">")) {
					reply += `:thinking: Mention **${args[i]}** invalide.`;
				} else if (command.args[i] == "role" && !args[i].startsWith("<@&") && !args[i].endsWith(">")) {
					reply += `:thinking: Rôle **${args[i]}** invalide.`;
				}
			}
		}
	}
	if (!(reply === "")) {
	 	if (command.usage) {
			reply += `\n:thumbsup: Essaye plutôt ça : \`${prefix}${command.usage}\``;
		}
		return message.channel.send(reply);
	}

	try {
		command.execute(intra, message, args);
	}
	catch (error) {
		console.error(error);
		message.channel.send(`there was an error trying to execute the command ${command.name}`);
	}
});

client.login(token);
