const projectRouter = require("express").Router();

const { request } = require("express");
const { verifyToken } = require("../validation");

//Models
const projectModel = require("../models/project");

//CRUD

// Create - POST
projectRouter.post("/", (req, res, next) => {
  data = req.body;
  projectModel
    .insertMany(data)
    .then((data) => {
      res.status(201).send(data);
    })
    //.then((data) => {
    //res.send(data);
    //})
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// /api/project/
//Read all project - get

projectRouter.get("/", (req, res, next) => {
  projectModel
    .find()
    .then((data) => {
      res.send(mapArray(data));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read specific project - get
projectRouter.get("/:id", (req, res, next) => {
  projectModel
    .findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Update specific project - put
projectRouter.put("/:id", (req, res, next) => {
  const id = req.params.id;
  projectModel
    .findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot update project with id=" +
            id +
            ". Maybe project was not found!",
        });
      } else {
        res.send({ message: "project was succesfully updated." });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating project with id=" + id });
    });
});

// Delete specific project - DELETE

projectRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  projectModel
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot delete Project with id=" +
            id +
            ". Maybe Project was not found!",
        });
      } else {
        res.send({ message: "Project was succesfully deleted." });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting Project with id=" + id });
    });
});

function mapArray(inputArray) {
  // do something with inputArray

  let outputArray = inputArray.map((element) => ({
    id: element._id,
    title: element.title,
    description: element.description,
    start_date: element.start_date,
    stakeholders: element.stakeholders,

    // add uri for this specific resource
    uri: "/api/project/" + element._id,
  }));

  return outputArray;
}

module.exports = projectRouter;
