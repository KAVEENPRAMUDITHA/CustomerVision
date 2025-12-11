const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const auth = require('../middleware/auth');

// POST: Create a new complaint (Users)
router.post('/', auth, async (req, res) => {
    try {
        const { shopName, category, description, location } = req.body;
        const newComplaint = new Complaint({
            shopName,
            category,
            description,
            location,
            user: req.user.id
        });
        const savedComplaint = await newComplaint.save();
        res.status(201).json(savedComplaint);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Fetch User's Own Complaints
router.get('/my-complaints', auth, async (req, res) => {
    try {
        const complaints = await Complaint.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Fetch all complaints (Auth required, UI logic will filter access if needed, strict backend check below)
router.get('/', auth, async (req, res) => {
    try {
        // Ideally only admins see all, specific users see theirs. For now, following prompt "use role base access"
        // Assuming admins see all.
        if (req.user.role !== 'admin') {
            // If user, maybe return empty or their own? Prompt says "admins can only see the complains" implying users might only report.
            // However, often users want to see reported items.
            // Prompt: "admins can only see the complains" -> unclear phrasing. Likely means only ADMINS can access the list.
            return res.status(403).json({ msg: 'Access denied. Admin only.' });
        }
        const complaints = await Complaint.find();
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT: Update Status/Action (Admin Only)
router.put('/:id', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Admin only.' });
        }
        const { status, actionTaken } = req.body;
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            { status, actionTaken },
            { new: true }
        );
        res.json(updatedComplaint);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
