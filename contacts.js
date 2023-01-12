const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const result = JSON.parse(data);
    console.table(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const searchedContact = data.find((elem) => elem.id === contactId);
    console.log(searchedContact);
    return searchedContact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const deletedContact = data.find((item) => item.id === contactId);
    const filteredContacts = data.filter((item) => item.id !== contactId);
    if (!deletedContact) {
      return;
    } else {
    }
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts), "utf8");
    console.log(deletedContact);
    return deletedContact;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await listContacts();
    const newContact = {
      id: shortid(),
      name,
      email,
      phone,
    };

    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data), "utf-8");
    console.table(newContact);
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
