const fs = require('node:fs');
const path = require('node:path');

//Returns an array of command file requires
export function getCommandRequires(): NodeRequire[] {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter((file: any) => file.endsWith('.js'));

    const nodeRequires = [];
    for (const file of commandFiles) {
        nodeRequires.push(require(path.join(commandsPath, file)));
    }
    return nodeRequires;
}