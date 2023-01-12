import "./App.css"
import Calendar from "./components/Calendar"
import Events from "./components/Events"

function App() {
  const date = new Date()
  const day = date.getDate()
  const year = date.getFullYear()
  const month = date.getMonth()


  return (
    <div className="container">
      <h1> Rabbit </h1>
      <Calendar 
        day={day}
        month={month}
        year={year}
      />
      <Events
        day={day}
        events={[]}
        month={month}
        year={year}
      />
    </div>
  )
}

export default App
