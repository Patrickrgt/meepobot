const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { User } = require("../utils/schemas");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Check your balance or another user's")
    .addUserOption((option) =>
      option.setName("user").setDescription("Check balance of another user")
    ),
  run: async (interaction) => {
    const user = interaction.options.getUser("user") || interaction.member.user;
    const userData =
      (await User.findOne({ id: user.id })) || new User({ id: user.id });

    const balanceEmbed = new MessageEmbed()
      .setTitle(`${user.username}'s balance`)
      .setColor("BLUE")
      .setThumbnail(user.displayAvatarURL())
      .addField("Meepo Coins", `${userData.wallet}`, true);

    return interaction.reply({
      embeds: [balanceEmbed],
      ephemeral: true,
    });
  },
};
