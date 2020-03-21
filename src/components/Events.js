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
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import { basename } from '../constants/endpoints'
import style from './Events.module.css'

const useStyles = makeStyles(theme => ({
  root: {
    flex: '0 0 30%',
    margin: 10,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {},
}))

function Event({ info }) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image={`${basename}/${info.cover_image}`}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default function Events() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await (
          await fetch(
            'https://cors-anywhere.herokuapp.com/http://dev-talks.italiancoders.it/api/v1/talks'
          )
        ).json()
        setEvents(data)
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    }

    fetchEvents()
  }, [])

  return (
    <div className={style.grid}>
      {events.map(e => (
        <Event info={e} key={e.reference_date} />
      ))}
    </div>
  )
}
