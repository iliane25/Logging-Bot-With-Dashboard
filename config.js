module.exports = {
  // Discord Bot Token
  TOKEN: process.env.TOKEN,

  // Discord Application Client ID
  CLIENT_ID: process.env.CLIENT_ID,

  // Discord Application Client Secret
  CLIENT_SECRET: process.env.CLIENT_SECRET,

  // OAuth Redirect URI (doit matcher EXACTEMENT Discord Dev Portal)
  REDIRECT_URI: process.env.REDIRECT_URI,

  // Dashboard port (Render fournit PORT automatiquement)
  DASHBOARD_PORT: process.env.PORT || 3000,

  // Database folder path
  DATABASE_PATH: "./database"
};
