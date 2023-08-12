import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction, TextChannel } from 'discord.js';

export const commandMeta = new SlashCommandBuilder()
  .setName('showprofile')
  .setDescription('Show profile info of an user')
  .addUserOption((option) =>
    option
      .setName('user')
      .setDescription('The user whose profile you want to see')
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction, client: Client) {
  if (!interaction?.channelId) {
    return;
  }

  const channel = await client.channels.fetch(interaction.channelId);
  if (!channel || channel.type !== 'GUILD_TEXT') {
    return;
  }

  return interaction.reply({
    content: `${interaction.user.username} requests info about ${
      interaction.options.getUser('user')?.username
    }`,
    ephemeral: true,
  });
}
