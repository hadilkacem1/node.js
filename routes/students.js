const express= require("express");
const Student = require("../models/student.js");


// midelware gere route
const router= express.Router();


router.get("/",(req,res,next)=>{
     res.json({message: "hello"});
});

router.post("/create",async(req,res)=>{
  try {
    data=req.body;
    stud=new Student(data);
    savedStu= await stud.save();
    res.status(200).send(savedStu)

  } catch (error) {
    res.status(400).send(error)
  }
})


router.put("/uptate/:id",async(req,res,next)=>{
  try {
   id = req.params.id;
   newData = req.body;
   updated = await Student.findByIdAndUpdate({_id:id},newData);
   res.status(200).send(updated);
  } catch (error) {
   res.status(400).send(error)
  }
})

router.delete("/delete/:id",async(req,res,next)=>{
  try {
   id = req.params.id
   deletedStudent = await Student.findByIdAndDelete({_id:id});
   res.status(200).send( deletedStudent)
  } catch (error) {
   res.status(400).send(error)
   
  }
})


router.get("/get/:name",(req,res,next)=>{
  myname= req.params.Name;
  Student.findOne ({Name: myname})
  .then(
    (student)=>{
       res.send(student)
    }
  )
  .catch(
    (err)=>{
      res.send(err)
    }
  )
})

router.get("/getbyname/:name", (req, res, next) => {
  const name = req.params.name;
  Student.findOne({ Name: name })
    .then((student) => {
      if (!student) {
        return res.status(404).send({ message: "Student not found" });
      }
      res.send(student);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

router.get("/getStudentsAbove18", async (req, res, next) => {
  try {
    const ageLimit = 18;
    const students = await Student.find({ Age: { $gt: ageLimit } });

    if (!students || students.length === 0) {
      return res.status(404).send({ message: "No students found" });
    }

    res.send(students);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});


router.delete("/deleteStudentsBelow18", async (req, res, next) => {
  try {
    const ageLimit = 18;
    const result = await Student.deleteMany({ Age: { $lt: ageLimit } });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "No students found to delete" });
    }

    res.send({ message: `${result.deletedCount} students were deleted` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.put("/updateStudentsNotesClass", (req, res, next) => {
  const updateQuery = { $inc: { Note: 2 }, class: "4twin5" };
  Student.updateMany(updateQuery)
    .then((result) => {
      if (result.nModified === 0) {
        return res.status(404).send({ message: "No students found to update" });
      }
      res.send({ message: `${result.nModified} students were updated` });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});




    router.get("/all",async(req,res)=>{
        try {
          students= await Student.find();
          res.status(200).send(students);
      
        } catch (error) {
          res.status(400).send(error)
          
        }
      })

      

module.exports=router;
