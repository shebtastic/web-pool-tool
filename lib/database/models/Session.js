import { model, models, Schema } from "mongoose";

const sessionSchema = new Schema({
  id: String,
  name: String,
});

const Session = models.Session || model("Session", sessionSchema)

export default Session
