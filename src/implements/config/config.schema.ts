export const ConfigSchema = {
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080,
    env: "PORT",
    arg: "port"
  },
  db: {
    host: {
      doc: "Database host name/IP",
      format: "*",
      default: "127.0.0.1"
    },
    name: {
      doc: "Database name",
      format: String,
      default: "root"
    },
    password: {
      doc: "Database password",
      format: String,
      default: "root"
    },
    dbname: {
      doc: "Database name",
      format: String,
      default: "qnote"
    }
  }
};
