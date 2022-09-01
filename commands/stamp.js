const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { User } = require("../utils/schemas");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stamp")
    .setDescription("Purchase a stamp for 400 coins"),
  run: async (interaction) => {
    const { commandName, options, guild, member } = interaction;
    const stamp = ["995896291886370896"];
    const user = interaction.options.getUser("user") || interaction.member.user;
    const userData =
      (await User.findOne({ id: user.id })) || new User({ id: user.id });

    if (
      userData.wallet >= 400 &&
      !interaction.member.roles.cache.some((role) => stamp.includes(role.id))
    ) {
      userData.wallet += -400;
      userData.save();
      const role = guild.roles.cache.find(
        (r) => r.id === "1002287995908542464"
      );
      interaction.member.roles.add(role);
    } else {
      return interaction.reply({
        content: `<@${interaction.member.user.id}> You already have a Phase 2 Stamp role or you don't have enough coins. Please fill out the Premint if you haven't already otherwise please wait next week to redeem another stamp !`,
        ephemeral: true,
      });
    }

    const balanceEmbed = new MessageEmbed()
      .setTitle(`${user.username}'s balance`)
      .setDescription(
        "Thank you for purchasing a Stamp ! here is your new balance and please fill out our Premint link here to claim a stamp !"
      )
      .setColor("BLUE")
      .setThumbnail(user.displayAvatarURL())
      .addField("Meepo Coins", `${userData.wallet}`, true);

    return interaction.reply(
      { embeds: [balanceEmbed] }
      //   `<@${interaction.member.user.id}> Received Stamp role ! Please fill out our Premint link here to claim a Stamp !`
    );
  },
};
