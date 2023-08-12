import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export const commandMeta = new SlashCommandBuilder()
  .setName('about')
  .setDescription('About the Profilize bot');

export async function execute(interaction: CommandInteraction) {
  return interaction.reply('Profilize Bot v1.0.0');
}
