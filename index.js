if (process.env.NODE_ENV === "Staging") {
  require("dotenv").config({ path: ".env.staging" });
  global.appRoot = __dirname;
  console.log("loading env staging");
} else if (process.env.NODE_ENV === "Production") {
  require("dotenv").config({ path: ".env.production" });
  global.appRoot = __dirname.slice(0, __dirname.lastIndexOf("/"));
  console.log("loading env production");
} else {
  require("dotenv").config({ path: ".env" });
  global.appRoot = __dirname;
  console.log("loading env for develop");
}

console.log(`=== ${process.env.NODE_ENV ? process.env.NODE_ENV : "DEV"} ===`);

require("@babel/polyfill");
require("@babel/register");
require("./server");
