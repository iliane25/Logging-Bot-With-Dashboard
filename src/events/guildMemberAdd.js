const { MessageFlags } = require('discord.js');
const { getGuildSettings } = require('../utils/database');
const { formatUser, createLoggingContainer } = require('../utils/formatters');

module.exports = {
  name: 'guildMemberAdd',
  execute(member) {
    console.log(`[JOIN] ${member.user.tag} joined ${member.guild.name}`);
    const settings = getGuildSettings(member.guild.id);
    
    if (!settings || !settings.join_channel_id) {
      console.log(`  └─ No join channel configured`);
      return;
    }

    const channel = member.guild.channels.cache.get(settings.join_channel_id);
    if (!channel) {
      console.log(`  └─ Channel not found: ${settings.join_channel_id}`);
      return;
    }

    const content = `**User:** ${formatUser(member.user)}, **ID:** \`${member.user.id}\`
**Created:** <t:${Math.floor(member.user.createdTimestamp / 1000)}:F>
**Joined:** <t:${Math.floor(Date.now() / 1000)}:F>`;

    const avatarUrl = member.user.displayAvatarURL({ extension: 'png', size: 256 });
    const container = createLoggingContainer('### Member Joined', content, {
      thumbnailUrl: avatarUrl,
      thumbnailDescription: `${member.user.username}'s Avatar`
    });

    channel.send({
      components: [container],
      flags: MessageFlags.IsComponentsV2
    })
      .then(() => console.log(`  └─ ✓ Logged to ${channel.name}`))
      .catch(err => console.error(`  └─ ✗ Error:`, err.message));
  }
};

/*
: ! Aegis !
    + Discord: itsfizys
    + Portfolio: https://itsfiizys.com
    + Community: https://discord.gg/8wfT8SfB5Z  (AeroX Development )
    + for any queries reach out Community or DM me.
*/
