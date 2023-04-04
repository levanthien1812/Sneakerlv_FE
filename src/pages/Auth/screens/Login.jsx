import { Button, FormControl, Input, InputLabel } from '@mui/material'
import React from 'react'
import Modal from '../../../components/UI/Modal'
import { actions as authActions } from '../../../store/auth'
import { useDispatch } from 'react-redux'

function LoginModal() {
    const dispatch = useDispatch()
    
    return (
      <Modal onCloseModal={dispatch.bind(this, authActions.closeLogin())}>
        <form>
          <FormControl>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" name="username"></Input>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" name="password"></Input>
          </FormControl>
          <Button variant="contained">Login</Button>
        </form>
      </Modal>
    );
}

export default LoginModal