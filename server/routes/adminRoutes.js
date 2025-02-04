const express = require("express");
const router = express.Router();
const { fetchUsers, deleteUser } = require("../db");
const { checkAdmin } = require("../middleware/auth");

// Fetch all users (Admin only)
router.get("/users", checkAdmin, async (req, res) => {
    try {
        const users = await fetchUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Delete a user (Admin only)
router.delete("/users/:id", checkAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await deleteUser(id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
});

module.exports = router;