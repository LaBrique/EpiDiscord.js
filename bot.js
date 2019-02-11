const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
const Intranet = new require('intra-api');
const intra = new Intranet("loginToken", "login");

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
    if (message.content == '!planning') {
        intra.planning.get({ startDate: "2019-02-11", endDate: "2019-02-11"})
        .then(res => {
            for (var event in res)
                console.log(res[event].acti_title);
//            message.channel.send(res);
        });
    }
});




















client.login(token);
