const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const contactsData = JSON.parse(await fs.readFile(contactsPath));
  return contactsData;
  // console.table(contactsData);
}

async function getContactById(contactId) {
  const contactsData = await listContacts();
  const contact = contactsData.find((item) => item.id === contactId.toString());
  if (!contact) {
    return null;
  }
  return contact;
  //   console.log(contact);
}

async function removeContact(contactId) {
  const contactsData = await listContacts();
  const idx = contactsData.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = contactsData.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsData));
  return removeContact;
}

async function addContact(name, email, phone) {
  const contactsData = await listContacts();
  const newContact = { id: randomUUID(), name, email, phone };
  contactsData.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsData));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
