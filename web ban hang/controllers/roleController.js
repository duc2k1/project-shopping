const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const Role = require("../database/models/Role");
const SuccessResponse = require("../models/SuccessResponse");
exports.createNewRole = asyncMiddleware(async (req, res, next) => {
  const { role_name, role_desc } = req.body;
  const newRole = new Role({
    role_name,
    role_desc,
  });
  const role = await newRole.save();
  res.status(201).json(new SuccessResponse(201, role));
});
exports.getAllRoles = asyncMiddleware(async (req, res, next) => {
  const roles = await Role.find();
  res.status(200).json(new SuccessResponse(200, roles));
});
