export default (app) => {
  app.use("/api/v1/key", require("./key.route.js").default);
};