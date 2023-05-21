import { Stack, Typography } from '@mui/material'
import React from 'react'

function Footer() {
  return (
    <Stack marginTop={8} paddingY={1} sx={{
      backgroundColor: "black"
    }}>
      <Typography textAlign="center" variant='p' color="white">FOOTER</Typography>
    </Stack>
  )
}

export default Footer