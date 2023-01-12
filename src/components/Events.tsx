import { ChangeEvent, useReducer, useState } from 'react'
import './events.css'

interface Event {
  id: number
  title?: string
  description?: string
  day?: number
  month?: number
  year?: number
  done?: boolean
}

interface EventsProps {
  events: Event[]
  day: number
  month: number
  year: number
}

interface EventPayload {
  id: number
  title?: string
  description?: string
  day?: number
  month?: number
  year?: number
  done?: boolean
}

function eventListReducer(state: Event[], action: { type: string, payload: EventPayload }) : Event[] {
  switch (action.type) {
    case 'ADD_EVENT':
      if (action.payload)
        return [...state, action.payload]
      return state
    case 'ADD_TITLE':
      return state.map((event) => {
        if (action.payload?.title && event.id === action.payload.id) event.title = action.payload.title
        return event
      })
    case 'REMOVE_EVENT':
      return state.filter((event) => event.id !== action.payload.id)
    case 'DONE_EVENT':
      return state.map((event) => {
        if (event.id === action.payload.id) event.done = !event.done
        return event
      })
    default:
      return state
  }
}

function Events({ day, events, month, year }: EventsProps) {
  const [eventList, dispatch] = useReducer(eventListReducer, events)

  const handleAddEvent = () => {
    const event = {
      id: Math.random(),
      title: '',
      description: '',
      day,
      month,
      year,
      done: false,
    }

    dispatch({ type: 'ADD_EVENT', payload: event })
  }

  const handleChangeEventTitle = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const title = e.target.value
    dispatch({
      type: 'ADD_TITLE',
      payload: { id, title, day, month, year, done: false },
    })
  }

  const handleToggleDoneEvent = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    dispatch({
      type: 'DONE_EVENT',
      payload: { id },
    })
  }

  const handleRemoveEvent = (id: number) => {
    dispatch({ type: 'REMOVE_EVENT', payload: { id } })
  }

  return (
    <div>
      <h2> Events </h2>
      <button onClick={handleAddEvent}> Add Event </button>
      <ul>
        {eventList.map(({ id, title, description, done }) => (
          <li key={id}>
            <input
              checked={done}
              onChange={(e) => handleToggleDoneEvent(e, id)}
              type="checkbox"
            />
            <input
              onChange={(e) => handleChangeEventTitle(e, id)}
              value={title}
            />
            <button onClick={() => handleRemoveEvent(id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Events