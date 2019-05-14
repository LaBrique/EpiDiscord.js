module.exports = {
    category: 'Administration',
    name: 'unsubscribe',
    description: 'Annule une souscription à un flux de notifications',
    usage: 'unsubscribe <topic: ["projects" | "planning"]>',
    args: ['str'],
    login: true,
    execute(profile, message, args) {
        switch (args[0]) {
            case "projects":
                profile.subscriptions.projects = false;
                message.channel.send("Vous avez annulé votre souscription aux notifications de projets.");
                break;
            case "planning":
                profile.subscriptions.planning = false;
                message.channel.send("Vous avez annulé votre souscription aux notifications du planning.");
                break;
            default:
                message.channel.send("Type de souscription inconnu.")
        }
    }
}
