const Discord = require('discord.js');

module.exports = {
    category: 'Administration',
    name: 'profile',
    description: 'Vous informe sur votre profil',
    usage: 'profile',
    login: true,
    dm: true,
    execute(profile, message, args) {
        const embed = new Discord.RichEmbed()
            .setTitle(`**PROFIL**`)
            .setColor(4886754)
            .setThumbnail("https://www.epitech.al/contest/assets/images/marqueur-epitech.png")
            .addField("Discord User:", message.author)
            .addField("Epitech login:", profile.intra.login)
            .addField("Souscriptions", `projects: ${profile.subscriptions.projects ? ":white_check_mark:" : ":x:"}\nplanning: ${profile.subscriptions.planning ? ":white_check_mark:" : ":x:"}`);
        message.channel.send(embed);
    }
}
