import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Container from '@mui/material/Container'
import { TextField, Button, Card } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

const inter = Inter({ subsets: ['latin'] })

export default function Login() {
  
  const [error, setError] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    e.preventDefault();
    const ExpRegEmail=/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    console.log(e.target.value, e.target.name)
    if(e.target.name === 'username'){
      if(ExpRegEmail.test(e.target.value)){
        setEmailValidation(false)
      } else {
        console.log('bademail')
        setEmailValidation(true)
      }
    } 

    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
    console.log(credentials)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials)
    let err = false
    let response = null
    try {
      response = await axios.post('https://tusitioweb.dev/awards/wp-json/jwt-auth/v1/token', credentials)

    }catch (error) {
      console.log('error')
      err = true
      setError(true)
    }

    if (err) {
      return <span>Caught an error.</span>;
    } else{
      console.log(response)
      console.log(response.data.data, "cookie")
      const cookies = new Cookies();
      cookies.set('token', response.data.data.token, {path: '/'});
      window.location.replace('/')
    }
  }

  return (
      <div className={styles.main}>
        <Card>
          <Container>
          <h1 className = {styles.tittle}>Inicio de Sesión</h1>
          <form >
          <TextField name='username' className = {styles.littletop} label="Email de usuario" type='email' onChange={handleChange}/>
          {emailValidation && <p className = {styles.textRed}>Formato de correo inválido</p>}
          <br/>
          <TextField name='password' className = {styles.littletop} id="outlined-basic" type='password' label="Contraseña" variant="outlined" onChange={handleChange}/>
          <br/>
          <Button onClick={handleSubmit} disabled={credentials.username === '' || credentials.password === '' || emailValidation} className = {styles.marginbutton} variant="contained">Entrar</Button>
          <br/>
          {error && <p className = {styles.textRed}>Credenciales incorrectas</p>}

          </form>

          </Container>

        </Card>

      </div>
  )
}
