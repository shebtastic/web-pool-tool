import {createCourse, getCourses} from "@/lib/database/services/Course";

async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      const courses = await getCourses()
      console.log(courses)
      return res.status(200).json(courses)
    }
    case "POST": {
      const body = JSON.parse(req.body)
      const createdCourse = await createCourse(body.name, body.startDate)
      return res.status(201).json(createdCourse)
    }
    default: {
      return res.status(405).send()
    }
  }
}

export default handler
