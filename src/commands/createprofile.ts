import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Client } from 'discord.js';
import { profiles } from '../bot';

export const commandMeta = new SlashCommandBuilder()
  .setName('createprofile')
  .setDescription('Create profile of an user')
  .addStringOption((option) =>
    option
      .setName('nickname')
      .setDescription(
        '(mandatory) Nickname for your profile. Must be one word.'
      )
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName('name')
      .setDescription('(mandatory) Name of user')
      .setRequired(true)
  )
  .addStringOption((option) =>
    option.setName('avatar').setDescription('Profile picture')
  )
  .addStringOption((option) =>
    option.setName('bio').setDescription('Profile bio')
  );

export async function execute(interaction: CommandInteraction, client: Client) {
  profiles.set(interaction.user.username, {
    nickname: interaction.options.getString('nickname')!,
    name: interaction.options.getString('name')!,
  });

  return interaction.reply({
    content: `Profile created for ${
      interaction.user.username
    } with nickname ${interaction.options.getString('nickname')}`,
    ephemeral: true,
  });
}
