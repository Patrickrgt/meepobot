const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { User } = require("../utils/schemas");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Take a peek at the Meepo Merchants goods !"),
  run: async (interaction) => {
    const user = interaction.options.getUser("user") || interaction.member.user;
    const userData =
      (await User.findOne({ id: user.id })) || new User({ id: user.id });

    const balanceEmbed = new MessageEmbed()
      .setTitle(`Welcome ${user.username} to the Meepo Merchant Shop !`)
      .setColor("BLUE")
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        {
          name: "Stamp 💌",
          value: "400 Meepo Coins",
          inline: true,
        },
        {
          name: "Description",
          value: "Aiko's Phase 1 Explorer Stamp !",
          inline: true,
        },
        { name: "Buy", value: "/stamp", inline: true },
        {
          name: "Phase 2 Stamp 💌",
          value: "400 Meepo Coins",
          inline: true,
        },
        {
          name: "Description",
          value:
            "Aiko's Phase 2 Explorer Stamp ! (Purchase only if you have the Phase 1 Stamp Role !)",
          inline: true,
        },
        { name: "Buy", value: "/stamp-2", inline: true },
        {
          name: "Phase 3 Stamp 💌",
          value: "400 Meepo Coins",
          inline: true,
        },
        {
          name: "Description",
          value:
            "Aiko's Phase 3 Explorer Stamp ! (Purchase if you have both Phase 1 and Phase 2 Explorer Stamps !",
          inline: true,
        },
        { name: "Buy", value: "/stamp-3", inline: true },
        {
          name: "Your Meepo Coins 💰",
          value: `${userData.wallet}`,
        }
      );

    return interaction.reply({
      embeds: [balanceEmbed],
      ephemeral: true,
    });
  },
};
