import { Stack, Typography } from '@mui/material'
import React from 'react'

function Footer() {
  return (
    <Stack sx={{
      backgroundColor: "black",
      paddingY: "8px",

    }}>
      <Typography textAlign="center" variant='p' color="white">FOOTER</Typography>
    </Stack>
  )
}

export default Footer