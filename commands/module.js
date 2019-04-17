const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const Discord = require('discord.js');

module.exports = {
	category: 'Information',
	name: 'module',
	description: 'Récupère des infos sur les modules',
	usage:'module <scolarYear> <moduleCode> <instanceCode>',
    args:['str', 'str', 'str'],
	execute(intra, message, args) {
        var date = new Date();
        var today = date.getFullYear() + "-" + months[date.getMonth()] + "-" + date.getDate();
        intra.units.get(args[0], args[1], args[2])
        .then(res => {
            for (var mod in res) {
                const embed = new Discord.RichEmbed()
                    .setTitle(`**${res[mod].title}**`)
                    .setColor(4886754)
                    .setThumbnail("https://www.epitech.al/contest/assets/images/marqueur-epitech.png")
                    .addField("Registration:", res[mod].student_registered == "0" ? ":x:" : ":white_check_mark:")
                    .addField("Start:", `**${res[mod].begin}**`)
                    .addField("End:", `**${res[mod].end}**`);
                message.channel.send({ embed });
                break;
            }
        });
    }
}
