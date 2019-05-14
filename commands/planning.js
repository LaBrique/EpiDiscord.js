const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
module.exports = {
	category: 'Information',
	name: 'planning',
	description: 'Récupère des infos sur le planning',
	usage: 'planning',
    login: true,
	execute(profile, message, args) {
        var disp = "";
        var date = new Date();
        var today = date.getFullYear() + "-" + months[date.getMonth()] + "-" + date.getDate();
        profile.intra.planning.get({ startDate: today, endDate: today })
        .then(res => {
            for (let event of res) {
                if ((event.semester / 2 == 1 || event.semester / 2 == 0)
                && event.module_registered != false) {
                    var register;
                    var time = "\t-" + event.start + "\n" + "\t-" + event.end;
                    if (event.event_registered != "registered")
                        register = "\t-Not registered";
                    else
                        register = "\t-Registered";
                    var data = register + "\n" + time
                    disp = "**" + event.acti_title + "**" + "\n" + data;
                    console.log("--------------------------")
                    console.log(event);
                    message.channel.send(disp);
                }
            }
        });
    }
}
