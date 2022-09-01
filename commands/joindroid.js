const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  MessageEmbed,
  Message,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const { User } = require("../utils/schemas");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("join-droid")
    .setDescription("Join Droid Guild"),
  run: async (interaction) => {
    const { commandName, options, guild, member } = interaction;
    const guilds = [
      "995890285815009330",
      "995890282010779780",
      "995890273827692665",
    ];

    const holder = ["990445449745948734"];

    if (
      interaction.member.roles.cache.some((role) => holder.includes(role.id))
    ) {
      if (
        interaction.member.roles.cache.some((role) => guilds.includes(role.id))
      ) {
        interaction.reply({
          content: `<@${interaction.member.user.id}> You already joined a guild.`,
          ephemeral: true,
        });
      } else {
        const role = guild.roles.cache.find(
          (r) => r.id === "995890282010779780"
        );
        interaction.member.roles.add(role);

        const user =
          interaction.options.getUser("user") || interaction.member.user;

        const droidEmbed = new MessageEmbed()
          .setTitle(
            `🧪 Beep-boop...${user.username} looks like we have some chemsitry !
            🤖 Guess you were a droid all along ! `
          )
          .setDescription(
            "Please, while you're waiting for your next mission come join us in <#983813566928928828>"
          )

          .setColor("WHITE")
          .setImage(
            "https://cdn-longterm.mee6.xyz/plugins/embeds/images/885371782662606908/f8befc671ef0955679aa1ff1fe93061d80c388555d73c2a134b548da82f1ea2b.jpeg"
          );

        await interaction.reply({
          embeds: [droidEmbed],
          ephemeral: true,
        });
      }
    } else
      interaction.reply({
        content:
          "You must be an Aiko Virtual holder to use the command. Please verify your holdings in <#990413183284019250>",
        ephemeral: true,
      });
    // }
  },
};
