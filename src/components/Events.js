/* eslint-disable react/no-multi-comp */
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  Typography,
  CardActions,
  makeStyles,
  Button,
  Tooltip,
  LinearProgress,
} from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook'
import ShareIcon from '@material-ui/icons/Share'
import YouTubeIcon from '@material-ui/icons/YouTube'

import { basename } from '../constants/endpoints'
import style from './Events.module.css'

const useStyles = makeStyles(theme => ({
  root: {
    flex: '0 0 30%',
    margin: 10,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
}))

function Event({ info }) {
  const classes = useStyles()
  const date = new Date(info.reference_date)

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        }
        avatar={<Avatar aria-label="recipe">{info.title[0]}</Avatar>}
        title={info.title}
        subheader={`${date.getDate()}-${date.getMonth() +
          1}-${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`}
      />
      <CardMedia
        className={classes.media}
        image={`${basename}/${info.cover_image}`}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          dangerouslySetInnerHTML={{ __html: info.body }}
        />
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip
          title={
            !info.youtube_stream_url ? 'Ancora non disponibile' : 'Vai al video'
          }
        >
          <span>
            <IconButton
              target="_blank"
              rel="noopener noreferrer nofollow"
              href={info.youtube_stream_url}
              aria-label="youtube video"
              disabled={!info.youtube_stream_url}
            >
              <YouTubeIcon
                style={{
                  ...(info.youtube_stream_url && { color: '#ff0000' }),
                }}
              />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip
          title={
            !info.facebook_stream_url
              ? 'Ancora non disponibile'
              : 'Vai al video'
          }
        >
          <span>
            <IconButton
              target="_blank"
              rel="noopener noreferrer nofollow"
              href={info.facebook_stream_url}
              aria-label="facebook video"
              disabled={!info.facebook_stream_url}
            >
              <FacebookIcon
                style={{
                  ...(info.facebook_stream_url && { color: '#3b5998' }),
                }}
              />
            </IconButton>
          </span>
        </Tooltip>
      </CardActions>
    </Card>
  )
}

export default function Events({ filters }) {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [err, setError] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [reload, setReload] = useState(false)

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

  useEffect(() => {
    async function fetchEvents() {
      try {
        setFetching(true)
        const data = await (
          await fetch(
            `https://cors-anywhere.herokuapp.com/${basename}/api/v1/talks`
          )
        ).json()
        setEvents(data)
      } catch (e) {
        setError(true)
      } finally {
        setFetching(false)
      }
    }

    fetchEvents()
  }, [reload])

  return (
    <>
      {fetching && (
        <LinearProgress
          color="secondary"
          style={{ margin: '100px auto', maxWidth: 800, width: '95%' }}
        />
      )}
      <div className={style.grid}>
        {filteredEvents.map(e => (
          <Event info={e} key={e.reference_date} />
        ))}
      </div>
      {err && (
        <>
          <Typography variant="h4" style={{ margin: 20 }}>
            Spiacenti si è verificato un errore
          </Typography>
          <Button
            style={{ margin: 10 }}
            color="primary"
            onClick={() => setReload(r => !r)}
          >
            Ricarica gli eventi
          </Button>
        </>
      )}
    </>
  )
}
