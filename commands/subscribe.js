module.exports = {
    category: 'Administration',
    name: 'subscribe',
    description: 'Souscrit à un flux de notifications',
    usage: 'subscribe <topic: ["projects" | "planning"]>',
    args: ['str'],
    login: true,
    execute(profile, message, args) {
        switch (args[0]) {
            case "projects":
                profile.subscriptions.projects = true;
                message.channel.send("Vous avez souscrit aux notifications de projets.");
                break;
            case "planning":
                profile.subscriptions.planning = true;
                message.channel.send("Vous avez souscrit aux notifications du planning.");
                break;
            default:
                message.channel.send("Type de souscription inconnu.")
        }
    }
}
