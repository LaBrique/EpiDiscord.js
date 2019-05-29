const Discord = require('discord.js');
const Intranet = new require('intra-api');
var Intras = require('../bot.js');

module.exports = {
	category: 'Administration',
	name: 'rmUser',
	description: 'Supprime votre profil.',
	usage:'rmUser',
    dm: true,
    login: true,
	execute(profile, message, args) {
        Intras.delete(message.author);
        message.channel.send("Profil supprimé.");
    }
}
