const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

data = []

updateData = () =>{
    data = JSON.parse(fs.readFileSync(path.join(__dirname, 'Storage','organization.json'),'utf8', err =>{
        if (err) throw err;
    }));
}
saveData = () =>{
    fs.writeFile(path.join(__dirname, 'Storage','organization.json'),JSON.stringify(data), err =>{
        if (err) throw err;
    });
}

  addLocation=(locationName,locationAddress)=>{
    this.setState({locations:[...this.state.locations,{name:locationName,address:locationAddress, id:nanoid()}]})
  }
  addRequirement=(newRequirement)=>{
    this.setState({possibleQualifications:[...this.state.possibleQualifications,{name:newRequirement, id:nanoid()}]},console.log(this.state.possibleQualifications))
  }
  addShift=(shift)=>{
    this.setState({shifts:[...this.state.shifts,shift]});
  }

router.get('/', (req, res) => {//get request
    updateData();
    res.json(data);
})

router.get('/:orgID', (req,res) =>{
    updateData();
    res.json(data.find(org=>{return org.id===req.params.orgID}));
})
router.put('/:orgID/addShiftType', (req,res) =>{
    updateData();
    data.find(org=> org.id===req.params.orgID).typesOfShifts.push(req.body);
    saveData();
    res.status(200).json(data.find(org=>{return org.id===req.params.orgID}));
})
router.delete('/:orgID/deleteShiftType/:shiftID', (req,res) =>{
    updateData();
    orgIndex =data.findIndex(org=> org.id===req.params.orgID);
    newShiftTypes=data[orgIndex].typesOfShifts.filter(type=>{return type.id!==req.params.shiftID});
    data[orgIndex].typesOfShifts=newShiftTypes;
    saveData();
    res.status(200).json(data.find(org=>{return org.id===req.params.orgID}));
})

router.put('/:orgID/addLocation', (req,res) =>{
    updateData();
    data.find(org=> org.id===req.params.orgID).locations.push(req.body);
    saveData();
    res.status(200).json(data.find(org=>{return org.id===req.params.orgID}));
})
router.delete('/:orgID/deleteLocation/:locID', (req,res) =>{
    updateData();
    orgIndex =data.findIndex(org=> org.id===req.params.orgID);
    newLocations = data[orgIndex].locations.filter(loc=>{return loc.id!==req.params.locID});
    data[orgIndex].locations=newLocations;
    saveData();
    res.status(200).json(data.find(org=>{return org.id===req.params.orgID}));
})
router.put('/:orgID/addRequirement', (req,res) =>{
    updateData();
    data.find(org=> org.id===req.params.orgID).possibleQualifications.push(req.body);
    saveData();
    res.status(200).json(data.find(org=>{return org.id===req.params.orgID}));
})
router.delete('/:orgID/deleteRequirement/:reqID', (req,res) =>{
    updateData();
    orgIndex =data.findIndex(org=> org.id===req.params.orgID);
    newRequirements = data[orgIndex].possibleQualifications.filter(qual=>{return qual.id!==req.params.reqID});
    data[orgIndex].possibleQualifications=newRequirements;
    saveData();
    res.status(200).json(data.find(org=>{return org.id===req.params.orgID}));
})

// router.get('/', (req, res) => {//get request
//     updateData();
//     res.json(exerciseList);
// })
// router.get('/images/:id', (req,res) =>{
//     res.sendFile(__dirname+'/Images'+'/'+req.params.id+'.png');
// })

module.exports=router;