import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core'

import style from './FilterBar.module.css'

export default function FilterBar({ filters, setFilters }) {
  return (
    <Card className={style.bar} variant="outlined">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Cerca un live stream
        </Typography>
        <div className={style.wrapper}>
          <TextField
            label="Filtra per titolo"
            value={filters.title}
            onChange={e => setFilters(f => ({ ...f, title: e.target.value }))}
          />
          <RadioGroup
            onChange={e =>
              setFilters(f => ({ ...f, pastFuture: e.target.value }))
            }
            defaultValue="all"
            row
            aria-label="position"
            name="position"
          >
            <FormControlLabel
              value="past"
              control={<Radio />}
              label="Passate"
              labelPlacement="top"
            />
            <FormControlLabel
              value="future"
              control={<Radio />}
              label="Future"
              labelPlacement="top"
            />
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="Tutte"
              labelPlacement="top"
            />
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}
