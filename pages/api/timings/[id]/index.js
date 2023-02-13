import {updateTiming} from "@/lib/database/services/Timing";

async function handler(req, res) {
  const {id} = req.query
  switch (req.method) {
    case "PUT": {
      const body = JSON.parse(req.body)
      const timing = await updateTiming(id, body)
      res.status(200).json(timing)
      break
    }
    default: {
      res.status(405).send()
      break
    }
  }
}

export default handler
