import React from 'react'
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    width: '95%',
    height: 160,
    marginTop: -80,
    margin: 'auto',
  },
})

export default function FilterBar() {
  const classes = useStyles()

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Cerca un live stream
        </Typography>
        <Typography variant="h5" component="h2">
          Filtra
        </Typography>
      </CardContent>
    </Card>
  )
}
