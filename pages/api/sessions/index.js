import sessions from "@/lib/database/services/sessionList.json"
async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      res.status(200).json(sessions)
      break
    }
    default: {
      res.status(405).send()
      break
    }
  }
}

export default handler
