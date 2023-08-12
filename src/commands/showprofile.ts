import { SlashCommandBuilder, EmbedBuilder } from '@discordjs/builders';
import { Client, CommandInteraction, MessageEmbed } from 'discord.js';
import { profiles } from '../bot';
import { Profile } from '../models/Profile';

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

  const profileUsername: string =
    interaction.options.getUser('user')?.username!;

  const profile = profiles.get(profileUsername);

  if (!profile) {
    return interaction.reply({ content: 'Profile not found', ephemeral: true });
  } else {
    const profileEmbed = createProfileEmbed(profile);
    return interaction.reply({ embeds: [profileEmbed], ephemeral: true });
  }
}

function createProfileEmbed(profile: Profile) {
  return new MessageEmbed()
    .setColor(0x0099ff)
    .setTitle('Profile Information')
    .setURL('https://discord.js.org/')
    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .addFields(
      { name: 'Name', value: `${profile.name}` },
      { name: 'AKA', value: `${profile.nickname}` },
      {
        name: 'Bio',
        value: `${profile.about ?? '_'}`,
      }
    )
    .setTimestamp();
}
