import './calendar.css'

interface CalendarProps {
  month: number
  year: number
  day: number
  events?: number[]
}

function createCalendar(month: number, year: number) {
  const days = Array.from({ length: new Date(year, month, 0).getDate() }, (_, i) => ({
    dayNumber: i + 1,
    dayWeek: new Date(year, month, i + 1).getDay(),
    events: [],
  }))

  const [{ dayWeek: firstDayWeek}] = days
  const daysBefore = Array.from({ length: 7 }, (_, i) => ({
    dayNumber: i * -1,
    dayWeek: i,
    events: [],
  })).slice(0, firstDayWeek)

  return [...daysBefore, ...days]
}

function Calendar({ month, year, day, events }: CalendarProps) {
  const calendar = createCalendar(month, year)
  const daysLetters = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  return (
    <div className="calendar">
      {daysLetters.map((dayLetter, i) => <div key={`${dayLetter}_${i}`}>{dayLetter}</div>)}
      {calendar.map(({dayNumber}) => (
        <div 
          key={dayNumber} 
          className={`day ${dayNumber === day ? 'today' : ''}`}
        >
          <span>{dayNumber > 0 ? dayNumber : '' }</span>
        </div>
      ))}
    </div>
  )
}

export default Calendar