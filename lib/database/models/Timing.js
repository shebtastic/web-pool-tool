import { model, models, Schema } from "mongoose";

const timingSchema = new Schema({
  id: String,
  job: Schema.Types.Mixed,
  date: String,
  slot: String,
  assignedCoachId: String,
})

const jobSchema = new Schema({
  id: String,
    type: String,
  courseId: String,

})

const Timing = models.Timing || model("Timing", timingSchema)

export default Timing
