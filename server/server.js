const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const admin = require("firebase-admin");
const credentials = "./key.json";

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});
const db = admin.firestore();
let user1, user2, pcode;
app.post("/receiveData", (req, res) => {
  try {
    const data = req.body;
    const fields = {};
    user1 = data.myemail;
    user2 = data.friendEmail;
    fields[data.friendEmail] = "";
    fields[data.myemail] = "";
    const id = data.code;
    console.log("Received data:", data.code);

    const add = db.collection("pairs").doc(id).set(fields);
    res.json({ message: "Data received successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/checkCode", (req, res) => {
  try {
    const code = req.body.code;
    pcode = code;
    const user = req.body.user;
    user1 = user;

    console.log("Received code is this:");

    const add = db
      .collection("pairs")
      .doc(code)
      .get("dsdsds")
      .then((doc) => {
        if (doc.exists) {
          if (doc.data().hasOwnProperty(user)) {
            console.log("The field exists in the document:", doc.id);

            res.status(200).send("yes");
          } else {
            console.log("The field does not exist in the document:", doc.id);
            res.status(200).send("no");
          }
        } else {
          res.status(200).send("no");
        }
      })
      .catch((error) => {
        console.error("Error checking document:", error);
        res.status(500).send("error");
      });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/savingState", (req, res) => {
  try {
    const list = req.body;
    let str = JSON.stringify(list);
    console.log(str);
    const docRef = db.collection("pairs").doc(pcode);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const existingData = doc.data();

          const newData = { ...existingData, [user1]: str };

          docRef
            .set(newData)
            .then(() => {
              console.log("Array field updated successfully!");
            })
            .catch((error) => {
              console.error("Error updating array field: ", error);
            });
        } else {
          console.log("Document does not exist");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
    console.log("Received code is this:" + req.body);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/reportCard", (req, res) => {
  const docRef = db.collection("pairs").doc(pcode);
  let datal;
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        datal = doc.data();
        console.log("mila data" + datal);
        res.send(datal);
      } else {
        console.log("can't retrive data");
      }
    })
    .then((error) => {
      console.log("error");
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Listening on port 4000");
});
