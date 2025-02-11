const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const { validateContact } = require('../middleware/validator');

router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContactById);
router.post('/', validateContact, contactController.createContact);
router.put('/:id', validateContact, contactController.updateContact);
router.delete('/:id', contactController.deleteContact);

module.exports = router;