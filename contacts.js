const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

// Розкоментуйте і запиши значення
const contactsPath = path.join("./db/contacts.json");

// TODO: задокументувати кожну функцію
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
    console.table(searchedContact);
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
    await fs.writeFile(
      contactsPath,
      JSON.stringify(filteredContacts, null, 2),
      "utf8"
    );
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
        }

        data.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(data, null, 5), 'utf-8');
        console.log(newContact);
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

//////////////////////////////////////

// const fs = require("fs/promises");
// const path = require("path");
// const shortid = require("shortid");
// const clc = require("cli-color");

// const contactsPath = path.join("db/contacts.json");

// async function listContacts() {
//   try {
//     const data = await fs.readFile(contactsPath);
//     const result = JSON.parse(data);
//     console.table(result);
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function getContactById(contactId) {
//   try {
//     const data = await fs.readFile(contactsPath);
//     const result = JSON.parse(data);
//     const contact = result.filter((el) => el.id === +contactId);
//     console.log(contact);
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function removeContact(contactId) {
//   try {
//     const data = await fs.readFile(contactsPath);
//     const result = JSON.parse(data);
//     const contact = result.filter((el) => el.id !== +contactId);
//     console.table(contact);
//     console.log(` delte contact by id ${clc.red(contactId)}`);
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function addContact(name, email, phone) {
//   try {
//     const data = await fs.readFile(contactsPath, (err) => {
//       if (err) console.error(err);
//     });
//     const content = JSON.parse(data);
//     const newContact = { id: shortid.generate(), name, email, phone };
//     const contactsList = JSON.stringify([newContact, ...content], null, "\t");
//     console.log(`added new user ${clc.green(newContact.name)}`);
//     await fs.writeFile(contactsPath, contactsList, (err) => {
//       if (err) console.error(err);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// module.exports = { listContacts, getContactById, removeContact, addContact };