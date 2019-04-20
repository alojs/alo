const shell = require("shelljs");
const { paths } = require("common");
const pino = require("pino")({ prettyPrint: { forceColor: true } });
const yargs = require("yargs");

const start = function({ nameSpaceId }) {
  const argv = yargs.options({
    w: { alias: "watch", type: "boolean" },
    i: {
      alias: "inspect",
      describe: "Enable a inspect session",
      default: false
    },
    "inspect-port": {
      describe: "Which port to use for the inspect session",
      default: 9222
    }
  }).argv;
  const endOfOptions = argv._.join(" ");

  const options = "";

  if (argv.inspect) {
    options += ` --inspect-brk=${argv["inspect-port"]}`;
  }

  const scriptPath = paths.dist(`${nameSpaceId}/main.js`);
  const command = argv.watch
    ? `npx nodemon --watch ${scriptPath} ${scriptPath} ${options} ${endOfOptions}`
    : `node ${scriptPath} ${options} ${endOfOptions}`;

  pino.info(command);
  shell.exec(command);
};

module.exports = start;
