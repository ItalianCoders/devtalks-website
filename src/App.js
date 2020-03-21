import React from 'react'
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

let theme = createMuiTheme()
theme = responsiveFontSizes(theme)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <header className={style.header}>
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
      </header>
      <main className={style.container}>
        <FilterBar />
        <Events />
      </main>
      <footer className={style.footer}>
        <Box color="white">@italiancoders</Box>
      </footer>
    </ThemeProvider>
  )
}

export default App
