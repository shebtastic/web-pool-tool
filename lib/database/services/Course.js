import * as crypto from "crypto";
import dbConnect from "@/lib/database/connect";
import Course from "@/lib/database/models/Course";
import Timing from "@/lib/database/models/Timing";
import Session from "@/lib/database/models/Session";
import sessionOrder from "./sessionList.json"

async function createCourse(name, startDate, state) {
  await dbConnect()

  const courseId = crypto.randomUUID()

  await Course.create({
    id: courseId,
    name,
    startDate,
    state
  })

  let date = new Date(startDate)

  await Promise.all(sessionOrder.map((session, index) =>
    Timing.create({
      id: crypto.randomUUID(),
      job: {
        id: session.id,
        type: "session",
        courseId
      },
      date: new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + Math.floor(index / 2) + index % 2).toISOString(),
      slot: index % 2 === 0 ? "morning" : "afternoon",
      assignedCoachId: null
    })
  ))
}

async function getCourses() {
  await dbConnect()

  const courses = await Course.find({})
  console.log(courses)
  return courses
}

export {
  createCourse,
  getCourses,
}
