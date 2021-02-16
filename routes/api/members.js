const express = require('express');
const uuid = require('uuid');
const { forEach } = require('../../Members');
const router = express.Router();
const members = require('../../Members');

//GET ALL MEMBERS
router.get('/', (req, res) => res.json(members));

//GET SINGLE MEMBER
router.get('/:id', (req, res) => {
  const found = members.some((member) => member.id === Number(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === Number(req.params.id)));
  } else {
    res.status(400).json({ msg: `Member ${req.params.id} not found` });
    res.send('Error 400');
  }
});

//CREATE MEMBER
router.post('/', (req, res) => {
  //res.send(req.body);
  const newMember = {
    id: uuid.v4(),
    fullName: req.body.fullName,
    email: req.body.email,
    status: 'active',
  };

  if (!newMember.fullName || !newMember.email) {
    //IN CASE THERE IS NO RETURN OR ELSE, WE WILL GET AN ERROR THAT HEADERS ARE ALREADY SENT
    return res.status(400).json({ msg: 'Please include a name and email' });
  }

  members.push(newMember);
  //res.json(members);
  res.redirect('/');
});

//UPDATE MEMBER
router.put('/:id', (req, res) => {
  const found = members.some((member) => member.id === Number(req.params.id));

  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === Number(req.params.id)) {
        member.fullName = updMember.fullName
          ? updMember.fullName
          : member.fullName;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: 'Member updated', member: member });
      }
    });
  } else {
    res.status(400).json({ msg: `Member ${req.params.id} not found` });
    res.send('Error 400');
  }
});

//DELETE MEMBER
router.delete('/:id', (req, res) => {
  const found = members.some((member) => member.id === Number(req.params.id));

  if (found) {
    res.json({
      msg: 'Member deleted',
      members: members.filter((member) => member.id !== Number(req.params.id)),
    });
  } else {
    res.status(400).json({ msg: `Member ${req.params.id} not found` });
    res.send('Error 400');
  }
});

module.exports = router;
