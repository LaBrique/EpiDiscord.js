const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.content == '!delet') {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send('U NO **DELETIN**')
            return;
        }
        message.channel.fetchMessages({ limit: 2 })
        .then(messages => {
            message.channel.bulkDelete(messages);
            message.channel.send('**DELET**')
            .then(message => {
                message.delete(5000).catch(err => console.log(err));
            });
        });
    }
});




















client.login(token);
