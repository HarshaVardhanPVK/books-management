const sql = require("mssql");
const sqlConfig = {
  user: "r10xtest",
  password: "r10xtest2021",
  server: "r10x-mssql-test.caf3e5wzssvv.us-west-1.rds.amazonaws.com",
  database: "r10x-test",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

exports.runQuery = async function (query) {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query(query);
    return result.recordset;
  } catch (err) {
    console.log(err);
  }
};
