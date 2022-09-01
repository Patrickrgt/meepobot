const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { User } = require("../utils/schemas");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("redeem")
    .setDescription("Get Meepo Coins")
    .addRoleOption((option) =>
      option.setName("meeporole").setDescription("Meepo role").setRequired(true)
    ),
  run: async (interaction) => {
    const { options } = interaction;
    const user = interaction.member.user;
    const userData =
      (await User.findOne({ id: user.id })) || new User({ id: user.id });

    const meepoRoleIds = [
      "997275204495609887",
      "997274965571293214",
      "997274962480078898",
      "997274956884885535",
      "997274947581902900",
      "997275346527322142",
      "997275370032205934",
      "997275392744370277",
    ];

    if (meepoRoleIds.includes(options.getRole("meeporole").id)) {
      if (
        interaction.member.roles.cache.some(
          (r) => r.id === options.getRole("meeporole").id
        )
      ) {
        const role = options.getRole("meeporole");

        const amount = parseInt(role.name.split(" ")[1]);
        console.log(amount);

        userData.wallet += amount;
        userData.save();

        const meepoEmbed = new MessageEmbed()
          .setDescription(
            `<@${interaction.member.user.id}> Thanks for playing in our event you earned ${amount} Meepo Coins !`
          )
          .setColor("BLUE");

        await interaction.member.roles.remove(role);

        return interaction.reply({ embeds: [meepoEmbed] });
      } else
        interaction.reply(
          `<@${interaction.member.user.id}> Unfortunately you do not have the required roles to run this command.`
        );
    } else
      interaction.reply(
        `<@${interaction.member.user.id}> Please put in the right meepo role. Refer to <#997198849577857234> for the meepo roles.`
      );
  },
};
