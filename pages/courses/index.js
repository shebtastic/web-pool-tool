import Link from "next/link";

function CoursesPage({getCourses, getTimings, getCoaches, getSessions}) {
  const courses = getCourses()
  const timings = getTimings()
  const coaches = getCoaches()
  const sessions = getSessions()

  return (
    <>
      <h1>Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.name}</h3>
            <h4>Sessions</h4>
            <ul>
              {timings
                .filter(
                  (timing) =>
                    timing.job.type === "session" &&
                    timing.job.courseId === course.id
                )
                .sort()
                .map((timing) => {
                  const job = sessions.find(
                    (job) => job.id === timing.job.id
                  );
                  const coach = coaches.find(
                    (coach) => coach.id === timing.assignedCoachId
                  );
                  return (
                    <li key={job.id}>
                      <h5>{job.title}</h5>
                      <time>
                        {new Date(timing.date).toLocaleDateString("de-DE")} -{" "}
                        {timing.slot}
                      </time>
                      <div>held by <span>{coach?.name ?? "none - warning!"}</span>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </li>
        ))}
      </ul>
      <Link href="/courses/create">+ new course</Link>
    </>

  )
}

export default CoursesPage
