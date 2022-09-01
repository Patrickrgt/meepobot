const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { User } = require("../utils/schemas");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("givecoins")
    .setDescription("Give coin to a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setRequired(true)
        .setDescription("Give coin to this user")
    )
    .addIntegerOption((option) =>
      option
        .setName("int")
        .setRequired(true)
        .setDescription("Enter a number to give to user")
    ),
  run: async (interaction) => {
    const staff = [
      "885372721981165579",
      "943982446700032040",
      "964382170066063383",
    ];
    if (
      interaction.member.roles.cache.some((role) => staff.includes(role.id))
    ) {
      const user =
        interaction.options.getUser("user") || interaction.member.user;
      const userData =
        (await User.findOne({ id: user.id })) || new User({ id: user.id });
      const coinNum = interaction.options.getInteger("int");

      userData.wallet += coinNum;
      userData.save();

      const balanceEmbed = new MessageEmbed()
        .setTitle(`${user.username}'s balance`)
        .setDescription(
          `Added ${coinNum} Meepo Coins to ${user.username}'s balance`
        )
        .setColor("BLUE")
        .setThumbnail(user.displayAvatarURL())
        .addField("Meepo Coins", `${userData.wallet}`, true);

      return interaction.reply({
        embeds: [balanceEmbed],
      });
    }
  },
};
