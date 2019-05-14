const { prefix } = require('../config.json');
const Discord = require('discord.js');

function addCategories(object, name, commands) {
	if (!this[object.category]) {
		this[object.category] = "\`" + name + "\`";
	} else {
		this[object.category] += ('\n' + "\`" + name + "\`");
	}
}

module.exports = {
	category: 'Bot',
	name: 'help',
	description: 'Donne la liste des commandes ou des infos sur une commande en particulier.',
	usage:`help [<commande>]`,
	execute(profile, message, args) {

		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			var fields = new Discord.Collection();
			const embed = new Discord.RichEmbed()
				.setTitle(`Voici la liste des commandes disponibles:`)
				.setColor(14138369)
				.setThumbnail("https://cdn.discordapp.com/attachments/482441204475101185/483573051833843725/bulb.png")
				.setFooter(`Tape ${prefix}help <commande> pour plus d'infos sur une commande.`);
			commands.forEach(addCategories, fields);
			for (key in fields) {
				embed.addField(key + ":", fields[key]);
			}
			message.channel.send({ embed });
			return;
		}

		const name = args[0];
		const command = commands.get(name);

		if (!command) {
			return message.send('Je connais pas cette commande.');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** \`${prefix}${command.usage}\``);
        if (command.login) data.push(`:warning: **Cette commande nécessite d'avoir son compte lié!**`);
        if (command.dm) data.push(`:warning: **Cette commande est disponible uniquement en DM!**`);

		message.channel.send(data, { split: true });

	},
};
