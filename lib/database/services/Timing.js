import Timing from "@/lib/database/models/Timing";

async function getTimings() {
  return Timing.find({})
}

async function updateTiming(id, timing) {
  return Timing.updateOne({id}, timing)
}

export {
  getTimings,
  updateTiming
}
