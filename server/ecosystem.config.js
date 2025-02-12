module.exports = {
  apps: [
    {
      name: "inventory-management",
      script: "yarn",
      args: "dev",
      env: {
        NODE_ENV: "development",
        ENV_VAR1: "environment-variable",
      }
    }
  ]
};
