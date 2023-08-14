import { Client, GatewayIntentBits } from 'discord.js';
import config from './config';
import * as commandModules from './commands';
import { Profile } from './models/Profile';

const commands = Object(commandModules);

//global map of profiles to usernames
export const profiles = new Map<string, Profile>();

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ],
});

client.once('ready', () => {
  console.log('Profilize bot ready');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  commands[commandName].execute(interaction, client);
});

client.login(config.DISCORD_TOKEN);
