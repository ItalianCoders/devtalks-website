import React from 'react'
import { Button } from '@material-ui/core'

export default function Links() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px 0',
      }}
    >
      <Button
        target="_blank"
        rel="noopener noreferrer nofollow"
        href="https://italiancoders.it/autori/"
      >
        Chi siamo
      </Button>
      <div
        className="g-ytsubscribe"
        data-channelid="UCMAh8IjSY_iVR0gWA3I--ng"
        data-count="default"
      />
      {/* <Button>Proponi una live</Button> */}
    </div>
  )
}
