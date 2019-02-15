const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
module.exports = {
    category: 'Inscription',
    name: 'register',
    description: 'Inscrit à un projet',
    usage:'register <projet>',
    arg: ['str'],
    execute(intra, message, args) {
        var date = new Date();
        var today = date.getFullYear() + "-" + months[date.getMonth()] + "-" + date.getDate();
        intra.projects.get({ startDate: today, endDate: today })
            .then(res => {
                let disp = args.join(" ");
                for (var proj in res) {
                    if (res[proj].acti_title == disp) {
                        console.log(res[proj].acti_title);
                        console.log(`/module/${res[proj].scolaryear}/${res[proj].codemodule}/${res[proj].codeinstance}/${res[proj].codeacti}/project/register`);
                        intra.projects.register(res[proj], "test");
                    }
                }
        });
    }
}
