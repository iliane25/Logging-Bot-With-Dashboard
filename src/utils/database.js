const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const config = require('../../config');

const dbPath = config.DATABASE_PATH;
if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath, { recursive: true });
}

const db = new Database(path.join(dbPath, 'logging.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS guild_settings (
    guild_id TEXT PRIMARY KEY,
    ban_channel_id TEXT,
    kick_channel_id TEXT,
    join_channel_id TEXT,
    leave_channel_id TEXT,
    role_update_channel_id TEXT,
    role_create_channel_id TEXT,
    role_delete_channel_id TEXT,
    channel_delete_channel_id TEXT,
    channel_create_channel_id TEXT,
    channel_update_channel_id TEXT,
    perms_update_channel_id TEXT,
    nickname_change_channel_id TEXT,
    voice_change_channel_id TEXT,
    message_delete_channel_id TEXT,
    message_edit_channel_id TEXT,
    member_update_channel_id TEXT,
    server_update_channel_id TEXT,
    invite_create_channel_id TEXT,
    invite_delete_channel_id TEXT,
    user_update_channel_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const getGuildSettings = (guildId) => {
  const stmt = db.prepare('SELECT * FROM guild_settings WHERE guild_id = ?');
  const result = stmt.get(guildId);
  console.log(`[DB] Query guild ${guildId}:`, result ? 'Found' : 'Not found');
  return result || {};
};

const updateGuildSettings = (guildId, settings) => {
  const columns = Object.keys(settings);
  const placeholders = columns.map(() => '?').join(', ');
  const setClause = columns.map(col => `${col} = ?`).join(', ');
  
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO guild_settings (guild_id, ${columns.join(', ')})
    VALUES (?, ${placeholders})
  `);
  
  return stmt.run(guildId, ...Object.values(settings));
};

module.exports = {
  db,
  getGuildSettings,
  updateGuildSettings
};

/*
: ! Aegis !
    + Discord: itsfizys
    + Portfolio: https://itsfiizys.com
    + Community: https://discord.gg/8wfT8SfB5Z  (AeroX Development )
    + for any queries reach out Community or DM me.
*/
