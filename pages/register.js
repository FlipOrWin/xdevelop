import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Container from '@mui/material/Container'
import { TextField, Button, Card } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function Register() {
  
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [cpValidation, setCpValidation] = useState(false);
  const [phoneValidation, setPhoneValidation] = useState(false);
  const [cellphoneValidation, setCellphoneValidation] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    numero_de_empleados: "Microempresa",
    nombres: '',
    apellidos: '',
    forma_enterado: '',
    otro_forma_enterado: '',
    cargo: '',
    nombre_empresa: '',
    fecha_origen: '',
    telefono: 0,
    celular: 0,
    hombres: 0,
    mujeres: 0,
    no_binario: 0,
    geografia_intervencion: '',
    razon_social: '',
    url_empresa: '',
    cp: '',
    calle_numero: '',
    colonia: '',
    delegacion_municipio: '',
    ciudad: '',
    pais: '',
    vision: '',
    mision: '',
    clientes: '',
    usuarios: '',
    aliados: '',
    grupos_de_interes: '',
    competencia: '',
    participado_en_programas_de_aceleracion: '',
    cual_programa: '',
    nivel_de_ventas: {
      anio_1: '',
      anio_2: '',
      anio_3: '',
    }
  })

  const handleChange = (e) => {
    e.preventDefault();
    const ExpRegEmail=/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    const ExpRegPassword=/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,}$/
    console.log(e.target.value, e.target.name)
    if(e.target.name === 'email'){
      if(ExpRegEmail.test(e.target.value)){
        setEmailValidation(false)
      } else {
        console.log('bademail')
        setEmailValidation(true)
      }
    } else if(e.target.name === 'password'){
      if(ExpRegPassword.test(e.target.value)){
        setPasswordValidation(false)
      } else {
        console.log('bademail')
        setPasswordValidation(true)
      }
    } 

    if(e.target.name === 'telefono'){
      if(e.target.value.length === 10){
        setPhoneValidation(false)
      } else {
        console.log(e.target.value.lenght, 'telefono')
        setPhoneValidation(true)
      }
    } else if(e.target.name === 'celular'){
      if(e.target.value.length === 10){
        setCellphoneValidation(false)
      } else {
        console.log(e.target.value.lenght, 'telefono')
        setCellphoneValidation(true)
      }
    }  else if(e.target.name === 'cp'){
      if(e.target.value.length === 5){
        setCpValidation(false)
      } else {
        console.log(e.target.value.lenght, 'telefono')
        setCpValidation(true)
      }
    } 

    if(
      e.target.name === 'telefono' || 
      e.target.name === 'celular' ||
      e.target.name === 'hombres' ||
      e.target.name === 'mujeres' ||
      e.target.name === 'no_binario'
      ){
        setCredentials({
          ...credentials,
          [e.target.name]: parseInt(e.target.value)
        })
    } else if(
      e.target.name === 'fecha_origen'
    ){
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1')
      })
    } else if(
      e.target.name === 'anio_1'
    ){
      setCredentials({
        ...credentials,
        nivel_de_ventas: {
          anio_1: e.target.value, 
          anio_2: credentials.nivel_de_ventas.anio_2, 
          anio_3: credentials.nivel_de_ventas.anio_3,}
      })
    } else if(
      e.target.name === 'anio_2'
    ){
      setCredentials({
        ...credentials,
        nivel_de_ventas: {
          anio_1: credentials.nivel_de_ventas.anio_1, 
          anio_2: e.target.value, 
          anio_3: credentials.nivel_de_ventas.anio_3,}
      })
    } else if(
      e.target.name === 'anio_3'
    ){
      setCredentials({
        ...credentials,
        nivel_de_ventas: {
          anio_1: credentials.nivel_de_ventas.anio_1, 
          anio_2: credentials.nivel_de_ventas.anio_2, 
          anio_3: e.target.value,}
      })
    } else {
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
      })
    }
    console.log(credentials)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials)
    let err = false
    let response = null
    try {
      response = await axios.post('https://tusitioweb.dev/awards/wp-json/wp/v2/registro/participante', credentials)

    }catch (error) {
      console.log('error')
      err = true
      setError(true)
    }

    if (err) {
      return <span>Caught an error.</span>;
    } else{
      console.log(response)
      setSuccess(true)
      setError(false)
    }
  }

  return (
      <div className={styles.main}>
        <Card>
          <Container>
          <h1 className = {styles.tittle}>Registro</h1>
          <form >
          <div class="row">
            <div class="col-4">
              <TextField name='email' className = {styles.littletop} label="Email" type='email' onChange={handleChange}/>
              {emailValidation ? <p className = {styles.textRed}>Formato de correo inválido</p> : <br/>}
              <TextField name='nombres' className = {styles.littletop} id="outlined-basic" type='text' label="Nombres" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='forma_enterado' className = {styles.littletop} id="outlined-basic" type='text' label="Forma de enterado" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='geografia_intervencion' className = {styles.littletop} id="outlined-basic" type='text' label="Geografia intervención" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='hombres' className = {styles.littletop} id="outlined-basic" type='number' label="Empleados hombres" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='cp' className = {styles.littletop} id="outlined-basic" type='number' label="cp" variant="outlined" onChange={handleChange}/>
              {cpValidation ? <p className = {styles.textRed}>El código postal debe tener 5 dígitos</p> : <br/>}
              <TextField name='delegacion_municipio' className = {styles.littletop} id="outlined-basic" type='text' label="Delegación municipio" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='vision' className = {styles.littletop} id="outlined-basic" type='text' label="Visión" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='usuarios' className = {styles.littletop} id="outlined-basic" type='text' label="Usuarios" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='competencia' className = {styles.littletop} id="outlined-basic" type='text' label="Competencia" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='anio_1' className = {styles.littletop} id="outlined-basic" type='text' label="Ventas primer año" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='participado_en_programas_de_aceleracion' className = {styles.littletop} id="outlined-basic" type='text' label="Participo en programas de aceleración" variant="outlined" onChange={handleChange}/>
              <br/>
            </div>
            <div class="col-4">
              <TextField name='password' className = {styles.littletop} id="outlined-basic" type='password' label="Contraseña" variant="outlined" onChange={handleChange}/>
              {passwordValidation ? <p className = {styles.textRed}>La contraseña debe de ser de al menos 8 dígitos, además de tener al menos una mayúscula, una minúscula y un dígito, además de no tener espacios</p> : <br/>}
              <TextField name='apellidos' className = {styles.littletop} id="outlined-basic" type='text' label="Apellidos" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='otro_forma_enterado' className = {styles.littletop} id="outlined-basic" type='text' label="Otro forma de enterarse" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='fecha_origen' className = {styles.littletop} id="outlined-basic" type='date' label="Fecha origen" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='mujeres' className = {styles.littletop} id="outlined-basic" type='number' label="Empleados mujeres" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='razon_social' className = {styles.littletop} id="outlined-basic" type='text' label="Razón social" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='calle_numero' className = {styles.littletop} id="outlined-basic" type='text' label="Número de calle" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='ciudad' className = {styles.littletop} id="outlined-basic" type='text' label="Ciudad" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='mision' className = {styles.littletop} id="outlined-basic" type='text' label="Misión" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='aliados' className = {styles.littletop} id="outlined-basic" type='text' label="Aliados" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='anio_2' className = {styles.littletop} id="outlined-basic" type='text' label="Ventas segundo año" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='cual_programa' className = {styles.littletop} id="outlined-basic" type='text' label="Cuál programa?" variant="outlined" onChange={handleChange}/>
              <br/>
            </div>
            <div class="col-4">
              <TextField name='telefono' className = {styles.littletop} label="Teléfono" type='number' onChange={handleChange}/>
              {phoneValidation ? <p className = {styles.textRed}>El teléfono debe tener 10 dígitos</p> : <br/>}
              <TextField name='celular' className = {styles.littletop} label="Celular" type='number' onChange={handleChange}/>
              {cellphoneValidation ? <p className = {styles.textRed}>El celular debe tener 10 dígitos</p> : <br/>}
              <TextField name='cargo' className = {styles.littletop} id="outlined-basic" type='text' label="Cargo" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='nombre_empresa' className = {styles.littletop} id="outlined-basic" type='text' label="Nombre de empresa" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='no_binario' className = {styles.littletop} id="outlined-basic" type='number' label="Empleados no binarios" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='url_empresa' className = {styles.littletop} id="outlined-basic" type='text' label="Url de su empresa" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='colonia' className = {styles.littletop} id="outlined-basic" type='text' label="Colonia" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='pais' className = {styles.littletop} id="outlined-basic" type='text' label="País" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='clientes' className = {styles.littletop} id="outlined-basic" type='text' label="Clientes" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='grupos_de_interes' className = {styles.littletop} id="outlined-basic" type='text' label="Grupos de interes" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='anio_3' className = {styles.littletop} id="outlined-basic" type='text' label="Ventas tercer año" variant="outlined" onChange={handleChange}/>
              <br/>
            </div>
          </div>
          <Button onClick={handleSubmit} 
          disabled={
            credentials.email === '' || 
            credentials.password === '' || 
            credentials.nombres === '' || 
            credentials.apellidos === '' || 
            credentials.telefono === '' || 
            credentials.celular === '' || 
            credentials.forma_enterado === '' || 
            credentials.otro_forma_enterado === '' || 
            credentials.cargo === '' || 
            credentials.nombre_empresa === '' || 
            credentials.fecha_origen === '' || 
            credentials.numero_de_empleados === '' || 
            credentials.hombres === '' || 
            credentials.mujeres === '' || 
            credentials.no_binario === '' || 
            credentials.geografia_intervencion === '' || 
            credentials.razon_social === '' || 
            credentials.url_empresa === '' || 
            credentials.cp === '' || 
            credentials.calle_numero === '' || 
            credentials.colonia === '' || 
            credentials.delegacion_municipio === '' || 
            credentials.ciudad === '' || 
            credentials.pais === '' || 
            credentials.vision === '' || 
            credentials.mision === '' || 
            credentials.clientes === '' || 
            credentials.usuarios === '' || 
            credentials.aliados === '' || 
            credentials.grupos_de_interes === '' || 
            credentials.competencia === '' || 
            credentials.participado_en_programas_de_aceleracion === '' || 
            credentials.cual_programa === '' || 
            credentials.nivel_de_ventas.anio_1 === '' || 
            credentials.nivel_de_ventas.anio_2 === '' || 
            credentials.nivel_de_ventas.anio_3 === '' || 
            emailValidation ||
            passwordValidation ||
            phoneValidation ||
            cellphoneValidation ||
            cpValidation
          } 
          className = {styles.marginbutton} variant="contained">Registrar</Button>
          <br/>
          {error && <p className = {styles.textRed}>Ha ocurrido un error</p>}
          {success && <p className = {styles.textRed}>Se ha hecho el registro exitosamente</p>}

          </form>

          </Container>

        </Card>

      </div>
  )
}