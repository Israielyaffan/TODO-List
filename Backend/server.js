const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const CommentModel = require("./models/Comment");
const ListModel = require("./models/Todo");
const UserModel = require("./models/Users");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
app.use(cors());
app.use(express.json());
//connect to mongoose

mongoose.connect(
  "mongodb+srv://affan:123@cluster0.lprma.mongodb.net/postDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

//connect the routes
app.get("/", (req, res) => {
  res.send("express working");
});

app.post("/comment", async (req, res) => {
  const comment = new CommentModel({
    postId: req.body.id,
    commentId: req.body.commentId,
    text: req.body.text,
    user: req.body.user,
    pCommentId: req.body.pCommentId,
  });
  try {
    await comment.save();
    console.log("hello");
    res.send(req.body);
  } catch (err) {
    console.log(err);
  }
});

app.post("/list", async (req, res) => {
  const list = new ListModel({
    text: req.body.text,
    user: req.body.user,
    isCompleted: req.body.isCompleted,
  });
  try {
    await list.save();
    console.log("hello");
    res.send(req.body);
  } catch (err) {
    console.log(err);
  }
});
app.post("/allList", (req, res) => {
  ListModel.find({ user: req.body.user }, (err, result) => {
    console.log(result);
    if (err) res.send(err);
    if (result) {
      res.send(result);
      console.log(result);
    }
  });
});

app.post("/mailer", async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const user = new UserModel({
    name: req.body.username,
    password: hashPassword,
    email: req.body.email,
    isVerified: false,
    emailToken: crypto.randomBytes(64).toString("hex"),
  });

  console.log(req.body);
  try {
    await user.save();
    console.log("hello", req.headers);
    res.send("saved");
  } catch (err) {
    console.log(err);
    res.end();
  }

  //send verification mail to user

  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "israiely.affan98@gmail.com",
      pass: "zqtnyxuenhfdbonx",
    },
  });
  var mailOptions = {
    from: ` "Verify your email" <israiely.affan98@gmail.com> `,
    to: `${req.body.email}`,
    subject: "Testing NodeMailer - verify your mail",
    html: `<h2> Hello ${user.name}! Thanks for registering on our site </h2>
      <h4> Please verify your email Click on the link below to Verify</h4>
      <a href="http://${req.headers.host}/verify-email?token=${user.emailToken}">Verify your email</a>`,
  };

  //sending email

  mailTransporter.sendMail(mailOptions, function (error, info) {
    if (error) console.log(error);
    else {
      console.log("verification mail sent to your gmail account");
    }
  });

  mailTransporter.close();
});

app.get("/verify-email", async (req, res) => {
  console.log(req.query.token, "verify");
  try {
    const token = req.query.token;
    const user = await UserModel.findOne({ emailToken: token });
    console.log(user);
    if (user) {
      user.emailToken = null;
      user.isVerified = true;
      await user.save();
      res.send("Your Email has been verified Succcessfully");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    console.log(user);
    if (user) res.send(user);
    else res.send(false);
  } catch (err) {
    console.log(err);
  }
});
app.post("/completed",async(req,res)=>{
  console.log(req.body);
  try {
    const task = await ListModel.findOne({ _id:req.body.id.toString() });
    console.log(task);
    if (task) {
      
      
      task.isCompleted=true;
      await task.save()
      res.send(task);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete",async(req,res)=>{
  console.log(req.body);
  try {
    const task = await ListModel.deleteOne({ _id:req.body.id.toString() });
    res.send(task)
    console.log(task);
  } catch (err) {
    console.log(err);
  }
})

// app.post("/allComments", async (req, res) => {
//   //   console.log(req.body.id);
//   const commentObj = {};
//   CommentModel.find({ postId: req.body.id }, (err, result) => {
//     // console.log(result, err);
//     if (err) res.send(err);
//     if (result) {
//       let newList = result;
//       //   console.log(result);
//       for (let i = 0; i < newList.length; i++) {
//         const arr = [];
//         // newList[i].reply ='okay boss'

//         for (let j = i + 1; j < newList.length; j++) {
//           if (newList[i]._id.toString() === newList[j].pCommentId) {
//             arr.push(newList[j]);
//           }
//         }
//         if (arr.length) console.log("hee", newList[i], arr);
//         // console.log("aaa",arr);

//         // if(arr.length){
//         // console.log('gettin in', newList);
//         // console.log(newList[i],arr[i],"hee");
//         // newList[i]['reply'] = arr
//         // newList[i]reply = arr;
//         // }
//       }
//       // console.log("hhhh",newList);
//       res.send(result);
//     }
//   });
// });
const PORT=process.env.PORT||3001
app.listen(3001, () => {
  console.log(`Server is running on port ${PORT}`);
});
