/* eslint-disable react/no-multi-comp */
import React, { useState } from 'react'
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
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
} from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook'
import ShareIcon from '@material-ui/icons/Share'
import YouTubeIcon from '@material-ui/icons/YouTube'

import Masonry from 'react-masonry-css'
import { basename } from '../constants/endpoints'
import useEvents from '../hooks/useEvents'
import style from './Events.module.css'

const useStyles = makeStyles(theme => ({
  root: props => ({
    ...(props.width && { width: props.width }),
    ...(props.margin && { margin: props.margin }),
  }),
  media: props => ({
    height: 0,
    paddingTop: props.paddingTop || '70%',
  }),
}))

const shareUrl = {
  Facebook: 'https://facebook.com/sharer.php?display=popup&u=',
  Twitter: 'https://twitter.com/intent/tweet?text=',
  Linkedin: 'https://www.linkedin.com/shareArticle?mini=true&url=',
}

const options = 'toolbar=0,status=0,resizable=1,width=626,height=436'

function Event({ info, style }) {
  const classes = useStyles(style)
  const [anchorEl, setAnchorEl] = useState(null)

  const date = new Date(info.reference_date)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const share = e => {
    window.open(
      shareUrl[e.target.innerText] +
        (info.youtube_stream_url || window.location.href),
      'sharer',
      options
    )
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="condividi" onClick={handleClick}>
            <ShareIcon />
          </IconButton>
        }
        avatar={<Avatar>{info.title[0]}</Avatar>}
        title={info.title}
        subheader={`${date.getDate()}-${date.getMonth() +
          1}-${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem id="fb" onClick={share} value="fb">
          Facebook
        </MenuItem>
        <MenuItem onClick={share}>Twitter</MenuItem>
        <MenuItem onClick={share}>Linkedin</MenuItem>
      </Menu>
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

function FeaturedEvents({ events }) {
  const matches = useMediaQuery(theme => theme.breakpoints.up('md'))

  if (events.length) {
    return (
      <>
        <Typography variant="h4" gutterBottom>
          In rilievo
        </Typography>
        {events.map(e => (
          <Event
            info={e}
            style={{
              width: matches ? '60%' : '90%',
              paddingTop: matches ? '30%' : '50%',
              margin: 'auto',
            }}
          />
        ))}
        <Divider variant="middle" style={{ marginTop: 70 }} />
      </>
    )
  }

  return null
}

export default function Events({ filters }) {
  const { fetching, filteredEvents, err, fetchEvents: reload } = useEvents(
    filters
  )

  if (fetching) {
    return (
      <LinearProgress
        color="secondary"
        style={{ margin: '100px auto', maxWidth: 800, width: '95%' }}
      />
    )
  }

  return (
    <>
      <FeaturedEvents events={filteredEvents.filter(e => !!+e.is_featured)} />
      <Masonry
        breakpointCols={{
          default: 3,
          1100: 2,
          700: 1,
        }}
        className={style.grid}
        columnClassName={style.gridElement}
      >
        {filteredEvents.map(e => (
          <Event info={e} key={e.reference_date} />
        ))}
      </Masonry>
      {err && (
        <>
          <Typography variant="h4" style={{ margin: 20 }}>
            Spiacenti si è verificato un errore
          </Typography>
          <Button style={{ margin: 10 }} color="primary" onClick={reload}>
            Ricarica gli eventi
          </Button>
        </>
      )}
    </>
  )
}
