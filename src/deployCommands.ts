import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import config from './config';
import * as commandModules from './commands';

type Command = {
  // type of commandMeta varies depending on the command,
  // and we are not concerned about that. We only care that this field exists.
  commandMeta: unknown;
};

const commands = [];

for (const module of Object.values<Command>(commandModules)) {
  commands.push(module.commandMeta);
}

const rest = new REST({ version: '9' }).setToken(config.DISCORD_TOKEN);
rest
  .put(Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID), {
    body: commands,
  })
  .then(() => {
    console.log('Successfully registered bot commands');
  })
  .catch(console.error);
