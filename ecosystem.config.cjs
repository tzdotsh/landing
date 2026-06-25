module.exports = {
  apps: [
    {
      name: "TV-WEBSITE-2",
      cwd: __dirname,
      port: "2026",
      exec_mode: "cluster",
      instances: "1",
      namespace: "web",
      script: "./.output/server/index.mjs",
      env_file: ".env",
      max_memory_restart: "1000M",
    },
    // {
    //   name: "TV-TMDB-UPDATER",
    //   script: "scripts/update-tmdb-images.ts",
    //   interpreter: "bun",
    //   cron_restart: "0 0 * * 0", // Runs every Sunday at midnight
    //   autorestart: false,
    //   watch: false,
    //   namespace: "cron",
    // },
  ],
};
