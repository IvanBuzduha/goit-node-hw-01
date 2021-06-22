const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    console.table(JSON.parse(data));
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    const parsingData = JSON.parse(data);

    const requiredData =
      parsingData.find((contact) => String(contact.id) === contactId) ||
      `Contact ID${contactId} not found`;

    console.table(requiredData);
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    const parsingData = JSON.parse(data);

    const filteredContacts = parsingData.filter(
      (contact) => String(contact.id) !== contactId
    );

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    console.log(`The contact with ID${contactId} deleted!`);
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    const parsingData = JSON.parse(data);

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    const updatedContacts = [...parsingData, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    console.log(`The contact ${name} added!`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
