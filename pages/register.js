import styles from '@/styles/Home.module.css'
import Container from '@mui/material/Container'
import { TextField, Button, Card } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'


export default function Register() {
  
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [cpValidation, setCpValidation] = useState(false);
  const [phoneValidation, setPhoneValidation] = useState(false);
  const [cellphoneValidation, setCellphoneValidation] = useState(false);
  const [newRegister, setNewRegister] = useState({
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
    
    if(e.target.name === 'email'){
      if(ExpRegEmail.test(e.target.value)){
        setEmailValidation(false)
      } else {
        setEmailValidation(true)
      }
    } else if(e.target.name === 'password'){
      if(ExpRegPassword.test(e.target.value)){
        setPasswordValidation(false)
      } else {
        setPasswordValidation(true)
      }
    } 

    if(e.target.name === 'telefono'){
      if(e.target.value.length === 10){
        setPhoneValidation(false)
      } else {
        setPhoneValidation(true)
      }
    } else if(e.target.name === 'celular'){
      if(e.target.value.length === 10){
        setCellphoneValidation(false)
      } else {
        setCellphoneValidation(true)
      }
    }  else if(e.target.name === 'cp'){
      if(e.target.value.length === 5){
        setCpValidation(false)
      } else {
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
        setNewRegister({
          ...newRegister,
          [e.target.name]: parseInt(e.target.value)
        })
    } else if(
      e.target.name === 'fecha_origen'
    ){
      setNewRegister({
        ...newRegister,
        [e.target.name]: e.target.value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1')
      })
    } else if(
      e.target.name === 'anio_1'
    ){
      setNewRegister({
        ...newRegister,
        nivel_de_ventas: {
          anio_1: e.target.value, 
          anio_2: newRegister.nivel_de_ventas.anio_2, 
          anio_3: newRegister.nivel_de_ventas.anio_3,}
      })
    } else if(
      e.target.name === 'anio_2'
    ){
      setNewRegister({
        ...newRegister,
        nivel_de_ventas: {
          anio_1: newRegister.nivel_de_ventas.anio_1, 
          anio_2: e.target.value, 
          anio_3: newRegister.nivel_de_ventas.anio_3,}
      })
    } else if(
      e.target.name === 'anio_3'
    ){
      setNewRegister({
        ...newRegister,
        nivel_de_ventas: {
          anio_1: newRegister.nivel_de_ventas.anio_1, 
          anio_2: newRegister.nivel_de_ventas.anio_2, 
          anio_3: e.target.value,}
      })
    } else {
      setNewRegister({
        ...newRegister,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let err = false
    let response = null
    try {
      response = await axios.post('https://tusitioweb.dev/awards/wp-json/wp/v2/registro/participante', newRegister)

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
          <div className="row">
            <div className="col-4">
              <TextField name='email' className = {styles.littletop} label="Email" type='email' onChange={handleChange}/>
              {emailValidation ? <p className = {styles.textRed}>Formato de correo inválido</p> : <br/>}
              <TextField name='nombres' className = {styles.littletop} id="outlined-basic1" type='text' label="Nombres" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='forma_enterado' className = {styles.littletop} id="outlined-basic2" type='text' label="Forma de enterado" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='geografia_intervencion' className = {styles.littletop} id="outlined-basic3" type='text' label="Geografia intervención" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='hombres' className = {styles.littletop} id="outlined-basic4" type='number' label="Empleados hombres" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='cp' className = {styles.littletop} id="outlined-basic5" type='number' label="cp" variant="outlined" onChange={handleChange}/>
              {cpValidation ? <p className = {styles.textRed}>El código postal debe tener 5 dígitos</p> : <br/>}
              <TextField name='delegacion_municipio' className = {styles.littletop} id="outlined-basic6" type='text' label="Delegación municipio" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='vision' className = {styles.littletop} id="outlined-basic7" type='text' label="Visión" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='usuarios' className = {styles.littletop} id="outlined-basic8" type='text' label="Usuarios" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='competencia' className = {styles.littletop} id="outlined-basic9" type='text' label="Competencia" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='anio_1' className = {styles.littletop} id="outlined-basic10" type='text' label="Ventas primer año" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='participado_en_programas_de_aceleracion' className = {styles.littletop} id="outlined-basic11" type='text' label="Participo en programas de aceleración" variant="outlined" onChange={handleChange}/>
              <br/>
            </div>
            <div className="col-4">
              <TextField name='password' className = {styles.littletop} id="outlined-basic12" type='password' label="Contraseña" variant="outlined" onChange={handleChange}/>
              {passwordValidation ? <p className = {styles.textRed}>La contraseña debe de ser de al menos 8 dígitos, además de tener al menos una mayúscula, una minúscula y un dígito, además de no tener espacios</p> : <br/>}
              <TextField name='apellidos' className = {styles.littletop} id="outlined-basic13" type='text' label="Apellidos" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='otro_forma_enterado' className = {styles.littletop} id="outlined-basic14" type='text' label="Otro forma de enterarse" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='fecha_origen' className = {styles.littletop} id="outlined-basic15" type='date' label="Fecha origen" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='mujeres' className = {styles.littletop} id="outlined-basic16" type='number' label="Empleados mujeres" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='razon_social' className = {styles.littletop} id="outlined-basic17" type='text' label="Razón social" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='calle_numero' className = {styles.littletop} id="outlined-basic18" type='text' label="Número de calle" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='ciudad' className = {styles.littletop} id="outlined-basic19" type='text' label="Ciudad" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='mision' className = {styles.littletop} id="outlined-basic20" type='text' label="Misión" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='aliados' className = {styles.littletop} id="outlined-basic21" type='text' label="Aliados" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='anio_2' className = {styles.littletop} id="outlined-basic22" type='text' label="Ventas segundo año" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='cual_programa' className = {styles.littletop} id="outlined-basic23" type='text' label="Cuál programa?" variant="outlined" onChange={handleChange}/>
              <br/>
            </div>
            <div className="col-4">
              <TextField name='telefono' className = {styles.littletop} label="Teléfono" type='number' onChange={handleChange}/>
              {phoneValidation ? <p className = {styles.textRed}>El teléfono debe tener 10 dígitos</p> : <br/>}
              <TextField name='celular' className = {styles.littletop} label="Celular" type='number' onChange={handleChange}/>
              {cellphoneValidation ? <p className = {styles.textRed}>El celular debe tener 10 dígitos</p> : <br/>}
              <TextField name='cargo' className = {styles.littletop} id="outlined-basic24" type='text' label="Cargo" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='nombre_empresa' className = {styles.littletop} id="outlined-basic25" type='text' label="Nombre de empresa" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='no_binario' className = {styles.littletop} id="outlined-basic26" type='number' label="Empleados no binarios" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='url_empresa' className = {styles.littletop} id="outlined-basic27" type='text' label="Url de su empresa" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='colonia' className = {styles.littletop} id="outlined-basic28" type='text' label="Colonia" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='pais' className = {styles.littletop} id="outlined-basic29" type='text' label="País" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='clientes' className = {styles.littletop} id="outlined-basic30" type='text' label="Clientes" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='grupos_de_interes' className = {styles.littletop} id="outlined-basic31" type='text' label="Grupos de interes" variant="outlined" onChange={handleChange}/>
              <br/>
              <TextField name='anio_3' className = {styles.littletop} id="outlined-basic32" type='text' label="Ventas tercer año" variant="outlined" onChange={handleChange}/>
              <br/>
            </div>
          </div>
          <Button onClick={handleSubmit} 
          disabled={
            newRegister.email === '' || 
            newRegister.password === '' || 
            newRegister.nombres === '' || 
            newRegister.apellidos === '' || 
            newRegister.telefono === '' || 
            newRegister.celular === '' || 
            newRegister.forma_enterado === '' || 
            newRegister.otro_forma_enterado === '' || 
            newRegister.cargo === '' || 
            newRegister.nombre_empresa === '' || 
            newRegister.fecha_origen === '' || 
            newRegister.numero_de_empleados === '' || 
            newRegister.hombres === '' || 
            newRegister.mujeres === '' || 
            newRegister.no_binario === '' || 
            newRegister.geografia_intervencion === '' || 
            newRegister.razon_social === '' || 
            newRegister.url_empresa === '' || 
            newRegister.cp === '' || 
            newRegister.calle_numero === '' || 
            newRegister.colonia === '' || 
            newRegister.delegacion_municipio === '' || 
            newRegister.ciudad === '' || 
            newRegister.pais === '' || 
            newRegister.vision === '' || 
            newRegister.mision === '' || 
            newRegister.clientes === '' || 
            newRegister.usuarios === '' || 
            newRegister.aliados === '' || 
            newRegister.grupos_de_interes === '' || 
            newRegister.competencia === '' || 
            newRegister.participado_en_programas_de_aceleracion === '' || 
            newRegister.cual_programa === '' || 
            newRegister.nivel_de_ventas.anio_1 === '' || 
            newRegister.nivel_de_ventas.anio_2 === '' || 
            newRegister.nivel_de_ventas.anio_3 === '' || 
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