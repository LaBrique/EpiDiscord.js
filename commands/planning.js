const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
module.exports = {
	category: 'Information',
	name: 'planning',
	description: 'Récupère des infos sur le planning',
	usage: 'planning',
    login: true,
	execute(intra, message, args) {
        var disp = "";
        var date = new Date();
        var today = date.getFullYear() + "-" + months[date.getMonth()] + "-" + date.getDate();
        intra.planning.get({ startDate: today, endDate: today })
        .then(res => {
            for (var event in res)
                if ((res[event].semester / 2 == 1 || res[event].semester / 2 == 0)
                && res[event].module_registered != false) {
                    var register;
                    var time = "\t-" + res[event].start + "\n" + "\t-" + res[event].end;
                    if (res[event].event_registered != "registered")
                        register = "\t-Not registered";
                    else
                        register = "\t-Registered";
                    var data = register + "\n" + time
                    disp = "**" + res[event].acti_title + "**" + "\n" + data;
                    // console.log("--------------------------")
                    // console.log(res[event]);
                    message.channel.send(disp);
                }
        });
    }
}
