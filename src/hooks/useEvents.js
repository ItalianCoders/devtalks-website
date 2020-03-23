import { useEffect, useState, useCallback } from 'react'

export default function useEvents(filters) {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [err, setError] = useState(false)
  const [fetching, setFetching] = useState(false)

  const fetchEvents = useCallback(async () => {
    try {
      setFetching(true)
      const data = await (
        await fetch(`${process.env.REACT_APP_BASENAME}/api/v1/talks`)
      ).json()
      setEvents(data)
    } catch (e) {
      setError(true)
    } finally {
      setFetching(false)
    }
  }, [])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  useEffect(() => {
    const now = Date.now()
    let evts = events

    if (filters.title) {
      evts = evts.filter(e =>
        e.title.toLowerCase().includes(filters.title.toLowerCase())
      )
    }
    if (filters.pastFuture === 'future') {
      evts = evts.filter(e => {
        return new Date(e.reference_date).getTime() >= now
      })
    } else if (filters.pastFuture === 'past') {
      evts = evts.filter(e => {
        return new Date(e.reference_date).getTime() <= now
      })
    }

    setFilteredEvents(evts)
  }, [filters, events])

  return { fetching, filteredEvents, err, fetchEvents }
}
