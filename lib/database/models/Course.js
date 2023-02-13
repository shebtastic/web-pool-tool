import { model, models, Schema } from "mongoose";

const courseSchema = new Schema({
  id: String,
  name: String,
  startDate: String,
  state: String,
});

const Course = models.Course || model("Course", courseSchema)

export default Course
