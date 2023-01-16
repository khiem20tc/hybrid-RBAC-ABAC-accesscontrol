module.exports = {
  apps: [
    {
      name: "access-control-stag",
      script: "index.js",
      instances: "1",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "Staging",
      },
      error_file: "logs/ebs-marketplace.error.log",
      out_file: "logs/ebs-marketplace.log",
    },
    {
      name: "access-control-production",
      script: "dist/app.js",
      instances: "2",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "Production",
      },
      error_file: "logs/ebs-marketplace.error.log",
      out_file: "logs/ebs-marketplace.log",
    },
  ],
};
