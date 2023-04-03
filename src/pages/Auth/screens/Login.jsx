import { FormControl, Input, InputLabel } from '@mui/material'
import React from 'react'

function LoginPage() {
    return <div>
        <form>
            <FormControl>
                <InputLabel htmlFor='username'>Username</InputLabel>
                <Input id='username'></Input>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor='password'>Password</InputLabel>
                <Input id='password'></Input>
            </FormControl>
      </form>
  </div>
}

export default LoginPage