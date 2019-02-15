const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const Discord = require('discord.js');

module.exports = {
	category: 'Information',
	name: 'projects',
	description: 'Récupère des infos sur les projets',
	usage:'projects',
	execute(intra, message, args) {
        var date = new Date();
        var today = date.getFullYear() + "-" + months[date.getMonth()] + "-" + date.getDate();
        const embed = new Discord.RichEmbed()
            .setTitle(`**PROJECTS**`)
            .setColor(4886754)
            .setThumbnail("https://www.epitech.al/contest/assets/images/marqueur-epitech.png");
        intra.projects.get({ startDate: today, endDate: today })
        .then(res => {
            for (var proj in res) {
                embed.addField(`**${res[proj].acti_title}**`, `\t-${res[proj].begin_acti}\n\t-${res[proj].end_acti}\n\t-${res[proj].registered ? "Registered :white_check_mark:" : "Unregistered :x:"}`);
            }
            message.channel.send({ embed });
        });
    }
}
