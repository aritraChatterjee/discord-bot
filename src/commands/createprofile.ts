import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Client, Attachment } from 'discord.js';
import { Profile } from '../models/Profile';
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
    option.setName('bio').setDescription('Profile bio')
  )
  .addAttachmentOption((option) =>
    option.setName('avatar').setDescription('Profile picture')
  );

export async function execute(interaction: CommandInteraction, client: Client) {
  const newProfile: Profile = createProfile(interaction);

  profiles.set(interaction.user.username, newProfile);

  return interaction.reply({
    content: `Profile created for ${
      interaction.user.username
    } with nickname ${interaction.options.get('nickname')}`,
    ephemeral: true,
  });
}

function createProfile(interaction: CommandInteraction): Profile {
  let newProfile: Profile = {
    name: interaction.options.get('name')?.value as string,
    nickname: interaction.options.get('nickname')?.value as string,
  };

  const attachment: Attachment | null | undefined =
    interaction.options.get('avatar')?.attachment;

  if (attachment) {
    newProfile = { ...newProfile, avatar: attachment.url };
  }

  const about: string | undefined = interaction.options.get('bio')
    ? (interaction.options.get('bio')?.value as string)
    : undefined;

  if (about) {
    newProfile = { ...newProfile, about };
  }

  return newProfile;
}
