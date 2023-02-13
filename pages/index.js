import {Fragment} from "react";
import {hasId} from "@/lib/helpers";

export default function Home({populateTimetable, getCourses, getCoaches, getSession, getCoach, updateTiming}) {
  const courses = getCourses() ?? []
  const timetable = populateTimetable()

  console.log(timetable)

  return (
    <>
      <h1>Overview</h1>
      {/*
      <section>
        <h2>Chores</h2>
        <ul>
          {chores.map((chore) => (
            <li key={chore.id}>
              <h3>{chore.name}</h3>
              <ul>
                {timings
                  .filter((timing) => timing.task.type === "chore")
                  .sort()
                  .map((timing) => {
                    const task = chores.find(
                      (task) => task.id === timing.task.id
                    );
                    const coach = coaches.find(
                      (coach) => coach.id === timing.assignedCoachId
                    );
                    return (
                      <li key={task.id}>
                        <h5>{task.title}</h5>
                        <time>
                          {new Date(timing.date).toLocaleDateString("de-DE")} -{" "}
                          {timing.slot}
                        </time>
                        <div>worked on by {coach.name}</div>
                      </li>
                    );
                  })}
              </ul>
            </li>
          ))}
        </ul>{" "}
      </section>
*/}
      <section>
        <table>
          <thead>
          <tr>
            <th scope="col">Course</th>
            <th scope="col">Slot</th>
            {timetable.map(day => {
              const date = new Date(day.date)
              return <th key={date.getTime()} scope="col">{date.toLocaleDateString("de-DE")}</th>
            })}
          </tr>
          </thead>
          <tbody>
          {
            courses.map(course => {
              return (
                <Fragment key={course.id}>
                  <tr>
                    <th rowSpan={2} scope="rowgroup">{course.name}</th>
                    <th scope="row">morning</th>
                    {
                      timetable.map(day => {
                        const timetableCourse = day.courses.find(hasId(course.id))
                        const timing = timetableCourse?.slots.morning
                        const session = getSession(timing.job?.id)
                        const coach = getCoach(timing.assignedCoachId)
                        return (
                          <td key={`${course.id}${new Date(day.date).getTime()}morning`}>
                            <div>{session?.name}</div>
                            <div><select defaultValue={coach.id} onChange={(event) => updateTiming(timing.id, {...timing, assignedCoachId: event.target.value})}>{
                              getCoaches().map(coach => (
                                <option key={coach.id} value={coach.id}>{coach.name}</option>
                              ))
                            }</select></div>
                          </td>
                        )
                      })
                    }
                  </tr>
                  <tr>
                    <th scope="row">afternoon</th>
                    {
                      timetable.map(day => {
                        const timetableCourse = day.courses.find(hasId(course.id))
                        const session = getSession(timetableCourse?.slots.afternoon.job?.id)
                        const coach = getCoach(timetableCourse?.slots.afternoon.assignedCoachId)
                        return (
                          <td key={`${course.id}${new Date(day.date).getTime()}afternoon`}>
                            <div>{session?.name}</div>
                            <div>{coach?.name ?? (session && "none - warning!")}</div>
                          </td>
                        )
                      })
                    }
                  </tr>
                </Fragment>
              )
            })
          }
          </tbody>
        </table>
      </section>
    </>
  )
}
