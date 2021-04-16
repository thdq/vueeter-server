const { Client } = require("pg");
const NodeEnvironment = require("jest-environment-node");
const { nanoid } = require("nanoid");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
require('dotenv').config()

const prismaBinary = "npx prisma";

class JestEnvironment extends NodeEnvironment {
	constructor(config) {
		
    	super(config);
    	this.schema = `test_${nanoid()}`;
    	this.connectionString = `${process.env.POSTGRES_URL}?schema=${this.schema}`;
    
  	}

  	async setup() {
    
    	process.env.POSTGRES_URL = this.connectionString;
    	this.global.process.env.POSTGRES_URL = this.connectionString;
    	await exec(`${prismaBinary} migrate dev --preview-feature`);
    	return super.setup();
  	}

  	async teardown() {
    
		const client = new Client({
			connectionString: this.connectionString,
		});
		
		await client.connect();
		await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
		await client.end();
  }
}

module.exports = JestEnvironment

