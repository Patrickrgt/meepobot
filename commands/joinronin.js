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
    .setName("join-ronin")
    .setDescription("Join Ronin Guild"),
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
          (r) => r.id === "995890285815009330"
        );
        interaction.member.roles.add(role);

        const user =
          interaction.options.getUser("user") || interaction.member.user;

        const roninEmbed = new MessageEmbed()
          .setTitle(
            `⛩ Welcome ${user.username} to Benkei.
            🥷 You are hereby announced a Ronin. `
          )
          .setDescription(
            "Please find your quarters under our <#983813513787105350>"
          )

          .setColor("RED")
          .setImage(
            "https://cdn-longterm.mee6.xyz/plugins/embeds/images/885371782662606908/bd62f3ed573586586601c694b85824d64f95b715d76b626608dc30ce036c885c.jpeg"
          );

        await interaction.reply({
          embeds: [roninEmbed],
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
