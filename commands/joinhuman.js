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
    .setName("join-human")
    .setDescription("Join Human Guild"),
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
          (r) => r.id === "995890273827692665"
        );
        interaction.member.roles.add(role);

        const user =
          interaction.options.getUser("user") || interaction.member.user;

        const humanEmbed = new MessageEmbed()
          .setTitle(
            `🏙 Howdy ${user.username} thanks for joining our side !
            👤 We're pretty regular humans but that doesn't stop us from being cyber cute ! ~. `
          )
          .setDescription("Join us on the streets in <#983813621886906418>")

          .setColor("BLUE")
          .setImage(
            "https://cdn-longterm.mee6.xyz/plugins/embeds/images/885371782662606908/65f347619c12c7643878312f58878f2c69e113364432979154c4edb98d66b226.jpeg"
          );

        await interaction.reply({
          embeds: [humanEmbed],
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
