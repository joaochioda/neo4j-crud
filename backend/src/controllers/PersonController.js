const db = require('../database');
const PersonService = require('../services/PersonService');

module.exports = {
  async store(req, res) {
    const { name, age } = req.body;
      const personService = new PersonService(db);
      const person = await personService.store(name, age);
      if (!person) {
        return res.status(400).json({ error: 'Error creating person' });
      } else {
        return res.status(200).json(person);
      }
  },
  async findById(req, res) {
    const { id } = req.params;
    const personService = new PersonService(db);
    const person = await personService.findById(id);
    if (!person) {
      return res.status(400).json({ error: 'Error finding person' });
    }
    return res.status(200).json(person);
  },
  async findAll(req, res) {
    const personService = new PersonService(db);
    const persons = await personService.findAll();
    if (!persons) {
      return res.status(400).json({ error: 'Error finding persons' });
    }
    return res.status(200).json(persons);
  },
  async delete(req, res) {
    const { id } = req.params;
    const personService = new PersonService(db);
    const result = await personService.delete(id);
    if (!result) {
      return res.status(400).json({ error: 'Error deleting person' });
    }
    return res.status(200).json(result);
  },
  async update(req, res) {
    const { id } = req.params;
    const { name, age } = req.body;
    const personService = new PersonService(db);
    const result = await personService.update(id, name, age);
    if (!result) {
      return res.status(400).json({ error: 'Error updating person' });
    }
    return res.status(200).json(result);
  }
}