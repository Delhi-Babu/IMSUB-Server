const Invoices = require('../models/IMSUB-models');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');


/**
 * @desc         get all invoices
 * @route        GET /api/v1/operations/invoices
 * @access       Protected
 */

exports.getInvoices = asyncHandler(async (req, res, next) => {
  const invoices = await Invoices.find();
  res.status(200).json({
    success: true,
    count: invoices.length,
    data: invoices,
  });
});

/**
 * @desc         get single invoice
 * @route        GET /api/v1/operations/invoice/:id
 * @access       Protected
 */

exports.getSingleInvoice = asyncHandler(async (req, res, next) => {
  const invoice = await Invoices.findById(req.params.id);

  if (!invoice) {
    return next(
      new ErrorResponse(`Invoice not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: invoice });
});

/**
 * @desc   	    Create new Invoice
 * @route 		POST /api/v1/operations/
 * @access 		Protected
 */

exports.createInvoice = asyncHandler(async (req, res, next) => {
  const invoices = await Invoices.create(req.body);
  res.status(200).json({
    success: true,
    data: invoices,
  });
});

/**
 * @desc         Update Invoice
 * @route        PUT /api/v1/operations/invoice/:id
 * @access       Protected
 */

exports.updateInvoices = asyncHandler(async (req, res, next) => {
  const invoice = await Invoices.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, message: 'updated successfylly' });
  if (!invoice) {
    return next(
      new ErrorResponse(`Invoice not found with id of ${req.params.id}`, 404)
    );
  }
});

/**
 * @desc         Delete Invoice
 * @route        DELETE /api/v1/operations/invoice/:id
 * @access       Protected
 */

exports.deleteInvoice = asyncHandler(async (req, res, next) => {
  const invoice = await Invoices.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, message: 'Deleted successfylly' });
  if (!invoice) {
    return next(
      new ErrorResponse(`Invoice not found with id of ${req.params.id}`, 404)
    );
  }
});
