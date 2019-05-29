const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
module.exports = {
    projects: function projects(Intras) {
        for (var [user, profile] of Intras) {
            if (!profile.subscriptions.projects) continue;
            var date = new Date();
            var today = date.getFullYear() + "-" + months[date.getMonth()] + "-" + date.getDate();
            var nextMonth = date.getFullYear() + "-" + months[date.getMonth() + 1] + "-" + date.getDate();
            profile.intra.projects.get({ startDate: today, endDate: today })
            .then(res => {
                for (let proj of res) {
                    profile.intra.fetch(`/module/${proj.scolaryear}/${proj.codemodule}/${proj.codeinstance}/${proj.codeacti}/project`)
                    .then(acti => {
                        console.log(proj);
                        console.log(acti);
                        let actiDay = Number(acti.end_register.slice(8, 10));
                        let actiMonth = Number(acti.end_register.slice(5, 7));
                        let ok = false;
                        if (date.getMonth() == actiMonth)
                            if (date.getDay() == actiDay - 2)
                                ok = true;
                        else if (date.getMonth() == actiMonth - 1)
                            if (actiDay == 1 || actiDay == 2)
                                ok = true;
                        if (ok && !proj.registered) {
                            const embed = new Discord.RichEmbed()
                                .setTitle(`**ATTENTION**`)
                                .setColor(4886754)
                                .setThumbnail("https://images.emojiterra.com/mozilla/512px/26a0.png")
                                .addField(`Vous n'êtes pas inscrit au projet ${acti.project_title}!`, `Les inscriptions à ce projet ferment le ${acti.end_register}.`)
                                .setFooter(`Réagissez avec ❌ pour ignorer, ou ✅ pour vous inscrire à ce projet.`);
                            user.dmChannel.send(embed)
                            .then(message => {
                                message.react("✅");
                                message.react("❌");
                                const filter = (reaction, user) => user.id != client.user.id;
                                message.createReactionCollector(filter, { time: 172800000 })
                    			.on('collect', reaction => {
                    				if (reaction.emoji.name == "✅") {
                                        message.delete();
                                        if (acti.nb_min > 1)
                                            user.dmChannel.send(`Projet en groupe, inscription individuelle impossible. Rendez-vous sur la page du projet pour vous y inscrire:\nhttps://profile.intra.epitech.eu/module/${proj.scolaryear}/${proj.codemodule}/${proj.codeinstance}/${proj.codeacti}/project`);
                                        else {
                                            profile.intra.projects.register(proj, `${acti.project_title} ${profile.intra.login}`)
                                            .then(() => {
                                                user.dmChannel.send("Inscription réussie!");
                                            }, (err) => {
                                                user.dmChannel.send("Inscription échouée!");
                                            })
                                        }
                                    }
                                    if (reaction.emoji.name == "❌") {
                                        message.delete();
                                    }
                    			});
                            })
                        }
                    })
                }
            });
        }
    },
    planning: function planning (Intras) {
        for (let [user, profile] of Intras) {
            if (!profile.subscriptions.planning) continue;
            let date = new Date();
            let today = date.getFullYear() + "-" + months[date.getMonth()] + "-" + date.getDate();
            console.log(date);
            profile.intra.planning.get({ startDate: today, endDate: today })
            .then(res => {
                for (let acti in res) {
                    console.log(res[acti]);
                    let actiHour = Number(res[acti].start.slice(11, 13));
                    let actiMin = Number(res[acti].start.slice(14, 16));
                    let ok = true;
                    // if (date.getHours() + 2 == actiHour - 2)
                    //     ok = true;
                    if (ok && res[acti].event_registered) {
                        user.dmChannel.send(`L'activité ${res[acti].acti_title} démarre dans ${actiMin != 0 ? (actiHour - date.getHours() - 1) : actiHour - date.getHours()}h00`);
                    }
                }
            })
        }
    }
}
