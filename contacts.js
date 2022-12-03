const fs = require('fs').promises
const path = require('path')
const contactsPath = path.resolve('db', 'contacts.json')
const { v4: uuidv4 } = require('uuid');

async function getAll() {
    const res = await fs.readFile(contactsPath, 'utf8')
    return JSON.parse(res)
}

async function listContacts() {
    try {
        const data = await getAll()
        console.table(data)
    } catch (error) {
        console.error(error)
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await getAll()
        const findContact = contacts.find(contact => contact.id === String(contactId))
        console.table(findContact)
    } catch (error) {
        console.error(error)
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await getAll()
        const newData = JSON.stringify(contacts.filter(contact => contact.id !== String(contactId)))
        await fs.writeFile(contactsPath, newData)
        console.log(newData)
    } catch (error) {
        console.log(error)
    }
}

async function addContact(name, email, phone) {
    const newContact = {
        id: uuidv4(),
        name,
        email,
        phone,
    }
    try {
        const contacts = await getAll()
        contacts.push(newContact)
        const newData = JSON.stringify(contacts)
        await fs.writeFile(contactsPath, newData)
        console.log(newData)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}