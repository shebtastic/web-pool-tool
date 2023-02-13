import GlobalStyles from "@/styles";
import Layout from "@/components/Layout";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function App({Component, pageProps}) {
  const {data: courses} = useSWR("/api/courses", fetcher)
  const {data: timings} = useSWR("/api/timings", fetcher)
  const {data: sessions} = useSWR("/api/sessions", fetcher)

  const coaches = [
    {
      id: "166c4d79-4c13-480c-aeb9-97eb759f64a4",
      name: "coach a",
      selfAssessments: {
        sessions: [
          {
            sessionId: "08e2ac1f-4719-4ed4-a4f6-6750b2869492",
            score: 9,
          },
          {
            sessionId: "f42b54d3-2e4a-4871-a0eb-0fd0f1a22e7d",
            score: 2,
          },
        ],
      },
      internal: []
    },
    {
      id: "3557a121-f05f-4863-a5f7-580f3c24362d",
      name: "coach b",
      selfAssessments: {
        sessions: [
          {
            sessionId: "61b8313f-d3ec-4fa5-a61f-bb9f252b60fc",
            score: 3,
          },
          {
            sessionId: "f42b54d3-2e4a-4871-a0eb-0fd0f1a22e7d",
            score: 9,
          },
        ],
        internal: []
      }
    },
  ];

  // const sessions = [
  //   {
  //     id: "08e2ac1f-4719-4ed4-a4f6-6750b2869492",
  //     name: "HTML Basics",
  //   },
  //   {
  //     id: "f42b54d3-2e4a-4871-a0eb-0fd0f1a22e7d",
  //     name: "JS Forms",
  //   },
  //   {
  //     id: "61b8313f-d3ec-4fa5-a61f-bb9f252b60fc",
  //     name: "Accessibility",
  //   },
  // ];

  // const courses = [
  //   {
  //     id: "9d61f8e2-fd5e-4b5b-85f9-a313cfc5c0c8",
  //     name: "Capybaras",
  //   },
  //   {
  //     id: "c11b53ea-8038-4a19-bf0d-1a2a119c79fb",
  //     name: "Dodos",
  //   },
  // ];

  // const timings = [
  //   {
  //     id: "42fd304a-f799-4fde-b6ec-529f66fdee23",
  //     job: {
  //       id: "08e2ac1f-4719-4ed4-a4f6-6750b2869492",
  //       type: "session",
  //       courseId: "9d61f8e2-fd5e-4b5b-85f9-a313cfc5c0c8",
  //     },
  //     date: "2023-02-13T10:00:00.000Z",
  //     slot: "morning",
  //     assignedCoachId: "166c4d79-4c13-480c-aeb9-97eb759f64a4",
  //   },
  //   {
  //     id: "fa64b4dc-f7ea-4941-ab94-579be39a0db6",
  //     job: {
  //       id: "f42b54d3-2e4a-4871-a0eb-0fd0f1a22e7d",
  //       type: "session",
  //       courseId: "9d61f8e2-fd5e-4b5b-85f9-a313cfc5c0c8",
  //     },
  //     date: "2023-02-13T15:00:00.000Z",
  //     slot: "afternoon",
  //     assignedCoachId: "166c4d79-4c13-480c-aeb9-97eb759f64a4",
  //   },
  //   {
  //     id: "a86be9af-66e1-47d2-95e2-1616b2d61076",
  //     job: {
  //       id: "61b8313f-d3ec-4fa5-a61f-bb9f252b60fc",
  //       type: "session",
  //       courseId: "c11b53ea-8038-4a19-bf0d-1a2a119c79fb",
  //     },
  //     date: "2023-02-13T10:00:00.000Z",
  //     slot: "morning",
  //     assignedCoachId: "3557a121-f05f-4863-a5f7-580f3c24362d",
  //   },
  //   {
  //     id: "835f6cb7-9a76-45e0-94bd-f76e859f8397",
  //     job: {
  //       id: "4a8f9f55-1796-4ca9-b4da-843d0fa873d9",
  //       type: "internal",
  //     },
  //     date: "2023-02-13T15:00:00.000Z",
  //     slot: "afternoon",
  //     assignedCoachId: "3557a121-f05f-4863-a5f7-580f3c24362d",
  //   },
  //   {
  //     id: "6721d371-74bd-453a-85da-4863b9d820fa",
  //     job: {
  //       id: "61b8313f-d3ec-4fa5-a61f-bb9f252b60fc",
  //       type: "session",
  //       courseId: "9d61f8e2-fd5e-4b5b-85f9-a313cfc5c0c8",
  //     },
  //     date: "2023-02-14T10:00:00.000Z",
  //     slot: "morning",
  //     assignedCoachId: "3557a121-f05f-4863-a5f7-580f3c24362d",
  //   },
  // ];

  const internal = [
    {
      id: "4a8f9f55-1796-4ca9-b4da-843d0fa873d9",
      name: "Classbook",
    },
  ];

  function populateTimetable(timings, startDayOffset = -2, endDayOffset = 14) {
    const now = new Date();

    let timetable = [];
    for (let offset = startDayOffset; offset < endDayOffset; offset++) {
      const date = new Date(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + offset
      );

      const timingsOnDay = timings.filter(
        (timing) => new Date(timing.date).toDateString() === date.toDateString()
      );

      const courseIds = [...new Set(timingsOnDay
        .filter((timing) => timing.job.type === "session")
        .map((timing) => timing.job.courseId))];

      timetable.push({
        date,
        timingsOnDay,
        courses: (courses && courseIds)?.map(courseId => {
          const course = getCourse(courseId)
          const morningTiming = timingsOnDay.filter(timing => timing.job.type === "session").filter(timing => timing.slot === "morning" && timing.job.courseId === course?.id) ?? [{}]
          const afternoonTiming = timingsOnDay.filter(timing => timing.job.type === "session").filter(timing => timing.slot === "afternoon" && timing.job.courseId === course?.id) ?? [{}]
          return {
            ...course,
            slots: {
              morning: {
                ...morningTiming[0],
                conflicts: morningTiming.length > 1 ? morningTiming.slice(1) : null
              },
              afternoon: {
                ...afternoonTiming[0],
                conflicts: afternoonTiming.length > 1 ? afternoonTiming.slice(1) : null
              },
            }
          }
        }) ?? [],
        coaches: coaches.map((coach) => {
          const morningTiming = timingsOnDay.filter(timing => timing.assignedCoachId === coach.id).filter(timing => timing.slot === "morning")
          const afternoonTiming = timingsOnDay.filter(timing => timing.assignedCoachId === coach.id).filter(timing => timing.slot === "afternoon")
          return {
            ...coach,
            slots: {
              morning: {
                ...morningTiming[0],
                conflicts: morningTiming.length > 1 ? morningTiming.slice(1) : null
              },
              afternoon: {
                ...afternoonTiming[0],
                conflicts: afternoonTiming.length > 1 ? afternoonTiming.slice(1) : null
              },
            }
          }
        })
      });
    }

    return timetable;
  }

  function getCourse(id) {
    return courses?.find(course => course.id === id) ?? null
  }

  async function createCourse(name, startDate) {
    await fetch("/api/courses", {
      method: "POST",
      body: JSON.stringify({
        name,
        startDate,
      })
    })
  }

  function getSession(id) {
    return sessions?.find(session => session.id === id) ?? null
  }

  function getCoach(id) {
    return coaches?.find(coach => coach.id === id) ?? null
  }

  function getTimings() {
    return timings ?? []
  }

  async function updateTiming(id, timing) {
    await fetch(`/api/timings/${id}`, {
      method: "PUT",
      body: JSON.stringify(timing)
    })
  }

  return (
    <>
      <GlobalStyles/>
      <Layout>
        <Component
          {...pageProps}
          populateTimetable={() => populateTimetable(getTimings())}
          getCoaches={() => coaches}
          getCoach={getCoach}
          getCourses={() => courses ?? []}
          getCourse={getCourse}
          createCourse={createCourse}
          getSessions={() => sessions ?? []}
          getSession={getSession}
          getTimings={() => timings ?? []}
          updateTiming={updateTiming}
        />
      </Layout>
    </>
  );
}
