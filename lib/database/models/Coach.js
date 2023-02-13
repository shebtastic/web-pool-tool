import { model, models, Schema } from "mongoose";

const coachSchema = new Schema({
  id: String,
  name: String,
  selfAssessments: {
    sessions: Array,
    internal: Array,
  }
})

const Coach = models.Coach || model("Coach", coachSchema)

export default Coach
