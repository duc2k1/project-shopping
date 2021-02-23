const express = require("express");
const userController = require("../../controllers/userController");
const { jwtAuth } = require("../../middlewares/jwtAuth");
const { authorize } = require("../../middlewares/authorize");
const router = express.Router();
//---------------

router.get("/all", jwtAuth, authorize("admin"), userController.getAllUsers); //lấy toàn bộ thông tin user
router.post("/activeUserByName", userController.activeUserByName); //body, active user
//router
// .route("/:userId")
// .get(userController.getUserById) //lấy thông tin user by id
// .delete(userController.deleteUserById) //delete user by id
// .patch(userController.updateUserById); //cập nhật user by id
//---------------
//phải là admin mới có quyền active

module.exports = router;
