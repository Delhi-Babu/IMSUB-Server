const Invoices = require('../models/IMSUB-models');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc         login
 * @route        POST	/api/v1/operations/login/:id
 * @access       Public
 */

exports.loginIMSUB = (req, res, next) => {
  res.status(200).json({ username: 'user' });
};

/**
 * @desc         register
 * @route        POST /api/v1/operations/register/:id
 * @access       Public
 */

exports.registerIMSUB = (req, res, next) => {
  res.status(200).json({ success: `Successfully registered ${req.params.id}` });
};

/**
 * @desc         get invoices
 * @route        GET /api/v1/operations/invoices
 * @access       Protected
 */

exports.getInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoices.find();
    res.status(200).json({ success: true, data: invoices });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc         get single invoice
 * @route        GET /api/v1/operations/invoice/:id
 * @access       Protected
 */

exports.getSingleInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoices.findById(req.params.id);

    if (!invoice) {
      return next(
        new ErrorResponse(`Invoice not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: invoice });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc   	    Create new Invoice
 * @route 		POST /api/v1/operations/invoice
 * @access 		Protected
 */

exports.createInvoice = async (req, res, next) => {
  try {
    const invoices = await Invoices.create(req.body);
    res.status(200).json({
      success: true,
      data: invoices,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc         Update Invoice
 * @route        PUT /api/v1/operations/invoice/:id
 * @access       Protected
 */

exports.updateInvoices = async (req, res, next) => {
  try {
    const invoice = await Invoices.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ msg: 'updated successfylly' });
    if (!invoice) {
      return next(
        new ErrorResponse(`Invoice not found with id of ${req.params.id}`, 404)
      );
    }
  } catch (err) {
    next(err);
  }
};

/**
 * @desc         Delete Invoice
 * @route        DELETE /api/v1/operations/invoice/:id
 * @access       Protected
 */

exports.deleteInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoices.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Deleted successfylly' });
    if (!invoice) {
      return next(
        new ErrorResponse(`Invoice not found with id of ${req.params.id}`, 404)
      );
    }
  } catch (err) {
    next(err);
  }
};
