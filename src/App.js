import React, { useState } from 'react'
import {
  Typography,
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
  Box,
} from '@material-ui/core'

import style from './App.module.css'
import mic from './assets/microphone.png'
import FilterBar from './components/FilterBar'
import Events from './components/Events'
import Links from './components/Links'

let theme = createMuiTheme()
theme = responsiveFontSizes(theme)

function App() {
  const [filters, setFilters] = useState({ title: '', pastFuture: null })

  return (
    <ThemeProvider theme={theme}>
      <header className={style.header}>
        <div className={style.hero}>
          <div>
            <img
              src={mic}
              alt="microfono"
              style={{
                height: 100,
                alignSelf: 'center',
              }}
            />
            <div>
              <Typography variant="h2">italianCoders</Typography>
              <Typography variant="h3">DevTalks</Typography>
            </div>
          </div>
        </div>
      </header>
      <main className={style.container}>
        <FilterBar filters={filters} setFilters={setFilters} />
        <Links />
        <Events filters={filters} />
      </main>
      <footer className={style.footer}>
        <Box color="white">@italiancoders</Box>
      </footer>
    </ThemeProvider>
  )
}

export default App
