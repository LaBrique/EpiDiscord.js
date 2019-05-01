const Discord = require('discord.js');
const Intranet = new require('intra-api');
var Intras = require('../bot.js');

module.exports = {
	category: 'Administration',
	name: 'addUser',
	description: 'Lie un compte Discord à un compte intra-EPITECH',
	usage:'addUser <login> <auto-login token>',
    args:['str', 'str'],
    dm: true,
	execute(intra, message, args) {
        const user = message.author;
        const login = args[0];
        const token = args[1];

        Intras.set(user, new Intranet(token, login));
        Intras.get(user).fetch('/planning')
        .then(res => {
            message.channel.send(`Le login ${login} est désormais associé à ce compte.`);
        })
        .catch(err => {
            message.channel.send("Échec du la connection à l'intranet. Vérifiez vos informations.");
        });
    }
}
