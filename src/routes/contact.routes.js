const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const { validateContact } = require('../middleware/validator');

router.get('https://your-app.onrender.com/contacts', contactController.getAllContacts);
router.get('https://your-app.onrender.com/contacts/:id', contactController.getContactById);
router.post('https://your-app.onrender.com/contacts', validateContact, contactController.createContact);
router.put('https://your-app.onrender.com/contacts/:id', validateContact, contactController.updateContact);
router.delete('https://your-app.onrender.com/contacts/:id', contactController.deleteContact);

module.exports = router;