const { v4: uuidv4} = require('uuid');

class PersonService {
  constructor(db) {
    this.db = db;
  }

  async store(name, age) {
    try {
      const id = uuidv4();
      await this.db.run(`Create (u:Person {_id: "${id}", name: "${name}", age: ${age}}) return u`);
      return await this.findById(id);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findById(id) {
    try {
      const result = await this.db.run(`MATCH (u:Person {_id: '${id}'}) RETURN u`);
      return result.records[0].get('u').properties;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findAll() {
    try {
      const result = await this.db.run(`MATCH (u:Person) RETURN u`);
      return result.records.map(record => record.get(0).properties);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async delete(id) {
    try {
      const result = await this.db.run(`MATCH (u:Person {_id: '${id}'}) DELETE u`);
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async update(id, name, age) {
    try {
      const result = await this.db.run(`MATCH (u:Person {_id: '${id}'}) SET u.name = '${name}', u.age = ${age} RETURN u`);
      return result.records[0].get(0).properties;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = PersonService;