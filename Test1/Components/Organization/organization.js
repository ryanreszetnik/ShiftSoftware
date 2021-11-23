const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/:orgId/members', (req, res) => {
    //returns list of members in  organization
})
router.get('/:orgId/members/:id', (req, res) => {
    //returns specific member in organization
})
router.post('/:orgId/members', (req, res) => {
    //adds a new member to organization
})
router.put('/:orgId/members/:id', (req, res) => {
    //updates member in organization
})
