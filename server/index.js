import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from 'dotenv'
import path from "path";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


mongoose.connect(process.env.MONGODB_URL).catch((err) => {
  console.log(err);
});
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
});
const UserSchema = mongoose.model("UserSchema", userSchema);

app.post("/create", (req, res) => {
  console.log(req.body);
  UserSchema.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/getallusers", (req, res) => {
  UserSchema.find()
    .then((users) => res.json(users))
    .catch((err) => {
      console.log(err);
    });
});
app.put("/updateuser/:id", (req, res) => {
  // console.log("$$$$$$$$$$$$$$$")
  // console.log(req.body);
  UserSchema.findByIdAndUpdate(
    {_id: req.params.id},
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }
    )
  .then((user) => console.log(user))
  .catch((err) => { console.log(err) });

})
app.delete("/deleteuser/:id", (req, res) => {
  UserSchema.findByIdAndDelete({ _id: req.params.id })
    .then((user) => console.log("Record deleted successfully"))
    .catch((err) => {
      console.log(err);
    });
});

if(process.env.NODE_ENV === 'production') {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"client","build", "index.html"));
  })

}

app.listen(process.env.PORT || 5000, (req, res) => {
  console.log(`Server is listening on port:5000`);
});
