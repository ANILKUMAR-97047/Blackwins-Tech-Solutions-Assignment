const Contact = require('../models/contact.model');
const { successResponse, errorResponse } = require('../utils/response.util');

exports.getAllContacts = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
        
        if (search) {
            query = { $text: { $search: search } };
        }
        
        const contacts = await Contact.find(query);
        return successResponse(res, 200, 'Contacts retrieved successfully', contacts);
    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
};

exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return errorResponse(res, 404, 'Contact not found');
        }
        return successResponse(res, 200, 'Contact retrieved successfully', contact);
    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
};

exports.createContact = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        return successResponse(res, 201, 'Contact created successfully', contact);
    } catch (error) {
        return errorResponse(res, 400, error.message);
    }
};

exports.updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!contact) {
            return errorResponse(res, 404, 'Contact not found');
        }
        
        return successResponse(res, 200, 'Contact updated successfully', contact);
    } catch (error) {
        return errorResponse(res, 400, error.message);
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        
        if (!contact) {
            return errorResponse(res, 404, 'Contact not found');
        }
        
        return successResponse(res, 200, 'Contact deleted successfully');
    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
};