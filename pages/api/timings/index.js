import {getTimings} from "@/lib/database/services/Timing";

async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      const timings = await getTimings()
      res.status(200).json(timings)
      break
    }
    default: {
      res.status(405).send()
      break
    }
  }
}

export default handler
