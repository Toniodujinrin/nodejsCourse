/*
create and export config variables
*/

const { isModuleNamespaceObject } = require("util/types");

const environment = {};
//staging(default environment )
environment.staging = {
  httpPort: 3004,
  httpsPort: 3005,
  envName: "staging",
  hashingSecret: "thisIsASecret",
};
//production environment
environment.production = {
  port: 3004,
  envName: "production",
  hashingSecret: "thisIsASecret",
};
// Determine which environment should be exported out
const currentEnvironment =
  typeof process.env.NODE_ENV == "string" ? process.env.NODE_ENV : "none";
//check that the current environment is one of the environments defined, if not, default to staging
const environmentToExport =
  typeof environment[currentEnvironment] == "object"
    ? environment[currentEnvironment]
    : environment.staging;

module.exports = environmentToExport;
