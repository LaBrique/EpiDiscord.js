module.exports = {
	category: 'Information',
	name: 'project',
	description: 'Récupère des infos sur un projet',
	usage:'project <str>[projet]',
	args:["str"],
	execute(intra, message, args) {
        intra.projects.get({/* startDate: "2019-02-11", endDate: "2019-02-11" */})
        .then(res => {
            for (var proj in res)
                console.log(res[proj]);
                // message.channel.send(res[event].acti_title);
        });
    }
}
