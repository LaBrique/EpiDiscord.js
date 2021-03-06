const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
module.exports = {
    category: 'Inscription',
    name: 'register',
    description: 'Inscrit à un projet',
    usage: 'register <projet>',
    args: ['str'],
    login: true,
    execute(profile, message, args) {
        var date = new Date();
        var today = date.getFullYear() + "-" + months[date.getMonth()] + "-" + date.getDate();
        profile.intra.projects.get({ startDate: today, endDate: today })
            .then(res => {
                let disp = args.join(" ");
                for (var proj in res) {
                    console.log(res[proj].acti_title);
                    if (res[proj].acti_title == disp) {
                        console.log(`/module/${res[proj].scolaryear}/${res[proj].codemodule}/${res[proj].codeinstance}/${res[proj].codeacti}/project/register`);
                        profile.intra.projects.register(res[proj], "test");
                    }
                }
        });
    }
}
