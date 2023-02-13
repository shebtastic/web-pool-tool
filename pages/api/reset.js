import Timing from "@/lib/database/models/Timing";
import Course from "@/lib/database/models/Course";

async function handler(req, res) {
  //reset
  await Timing.deleteMany({})
  await Course.deleteMany({})
  res.status(200).send()
}

export default handler
