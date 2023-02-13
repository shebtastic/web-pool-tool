import {useRouter} from "next/router";

function CreateCoursePage({createCourse}) {
  const router = useRouter()
  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const {name, startDate} = Object.fromEntries(formData)

    await createCourse(name, startDate)
    await router.push("/")
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name"/>
      <input type="date" name="startDate"/>
      <button type="submit">create</button>
    </form>
  )
}

export default CreateCoursePage
