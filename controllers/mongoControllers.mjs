import dotenv from "dotenv";
import wrapper from "../middleware/wrapper.mjs";
import generateRandomString from "../utils/randomFunc.mjs";
import fs from "fs";
import * as cp from "child_process";
import __dirname from "../utils/dirname.mjs";
import * as YAML from "json-to-pretty-yaml";
dotenv.config();

const getCredentialData = (body) => {
  const credentialData = {
    dbname: generateRandomString(20),
    username: body.username,
    password: body.password,
    firstCollectionName:
      body.firstCollectionName != undefined ? body.firstCollectionName : "newitems",
  };

  return credentialData;
};

const useMongoshToCreateDatabase = (credentialData) => {
  const child = cp.spawn("mongosh");
  child.stdout.on("data", (data) => {
    console.log(data.toString());
  });
  child.stderr.on("data", (data) => {
    console.error(data.toString());
  });
  child.on("error", (error) => {
    console.error(`Error: ${error.message}`);
  });
  child.on("close", (code) => {
    console.log(`mongosh process exited with code ${code}`);
  });

  child.stdin.write(`
  show dbs\n
  use admin\n
  db.auth("myUserAdmin", "dao01010")\n
  use ${credentialData.dbname}\n
  db.createUser({
      user: "${credentialData.username}",
      pwd: "${credentialData.password}",
      roles: [
        { role: "readWrite", db: "${credentialData.dbname}" }
      ]
    })\n
  db.createCollection("${credentialData.firstCollectionName}")\n
  show dbs
  `);
  child.stdin.end();
};

const storeCredentialData = (credentialData) => {
  //store data of user to userDB folder
  const dataPath = `${__dirname}/usersDB/mongodb/${credentialData.username}`;
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath, { recursive: true });
  }
  fs.writeFileSync(
    `${__dirname}/usersDB/mongodb/${credentialData.username}/${credentialData.dbname}.txt`,
    YAML.stringify(credentialData)
  );
};

const createMongoDBDatabase = wrapper(async (req, res, next) => {
  const credentialData = getCredentialData(req.body);
  useMongoshToCreateDatabase(credentialData);
  storeCredentialData(credentialData);

  res.send("request succeeded!");
});

export { createMongoDBDatabase };
