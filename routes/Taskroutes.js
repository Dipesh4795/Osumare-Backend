const express = require("express");
const router = express.Router();
const {
  createtask,
  updatetask,
  getalltasks,
  deletetask,
  gettask,
} = require("../controllers/Task");
const { auth, isTeacher, isStudent } = require("../middlewares/auth");

router.get("/", getalltasks);
router.get("/:id", auth, gettask);
router.post("/", auth, isTeacher, createtask);
router.put("/:id", auth, isStudent, updatetask);
router.delete("/:id", auth, isTeacher, deletetask);
module.exports = router;
