const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { User } = require("../utils/schemas");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("giveroles")
    .setDescription("Get Meepo Coins")
    .addRoleOption((option) =>
      option
        .setName("guildrole")
        .setDescription("Select Guild")
        .setRequired(true)
    )

    .addRoleOption((option) =>
      option.setName("meeporole").setDescription("Meepo role").setRequired(true)
    ),

  run: async (interaction) => {
    const { commandName, options, guild, member } = interaction;

    const findDuplicates = (arr) =>
      arr.filter((item, index) => arr.indexOf(item) != index);

    const staff = [
      "885372721981165579",
      "943982446700032040",
      "964382170066063383",
    ];

    const guilds = ["Ronin", "Droid", "Human"];

    // Voice Role Command (Run with intended Class Name and they will receive Meepo Roles)
    // if (guilds.includes(options.getRole("guildrole").name)) {
    if (
      interaction.member.roles.cache.some((role) => staff.includes(role.id))
    ) {
      if (
        options.getRole("meeporole").name.includes("Meepo") &&
        options.getRole("guildrole").name.includes("S1")
      ) {
        try {
          await member.guild.members.fetch();

          // let role = "";
          const role = options.getRole("guildrole").id;
          // if (options.getRole("guildrole").name.includes("Ronin")) {
          //   role = "995890285815009330";
          // } else if (options.getRole("guildrole").name.includes("Droid")) {
          //   role = "995890282010779780";
          // } else role = "995890273827692665";

          let voice = member.guild.channels.cache.get(member.voice.channelId);
          let voiceMembers = voice.members.map((m) => m.user.id);

          let roleArray = voice.guild.roles.cache
            .get(role)
            .members.map((m) => m.user.id);
          let mergedArray = roleArray.concat(voiceMembers);
          let specificRole = findDuplicates(mergedArray);

          for (let i = 0; i < specificRole.length; i++) {
            console.log(specificRole[i]);
            let member = guild.members.cache.get(specificRole[i]);
            member.roles.add(options.getRole("meeporole"));
          }
          interaction.reply({
            content: "successfully changed roles",
            ephemeral: true,
          });
        } catch (error) {
          console.log(error);
          interaction.reply(
            `<@${interaction.member.user.id}> Please join a voice channel first`
          );
        }
      } else
        interaction.reply(
          `<@${interaction.member.user.id}> do not put any other role besides meepo or S1 guild roles (S1 Human, etc.)`
        );
    } else interaction.reply("You do not have required roles");
    // }
  },
};
