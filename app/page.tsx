'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.css'

const Home = () => {
  const [formData, setFormData] = useState({
    dni: '',
    name: '',
    apellidos: '',
    email: '',
    concentimiento: false,
  });
  const [disableButton, setDisableButton] = useState(true);

  const handleInputChange = (event: any) => {
    const { id, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = (event: any) => {
    
    event.preventDefault();

    
    localStorage.setItem('form',JSON.stringify(formData));
  };

  useEffect(() => {
    if (
      formData.dni.trim() === '' ||
      formData.name.trim() === '' ||
      formData.apellidos.trim() === '' ||
      !validateEmail(formData.email)
    ) {
      setDisableButton(true);
      return;
    }
    setDisableButton(false);
  }, [formData]);

  return <>
    <div className={styles.container}>
      <h1>Formulario de inscripcion</h1>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <label htmlFor="dni">Documento de identidad</label>
          <input type="text" required id='dni'
            value={formData.dni}
            onChange={handleInputChange} 
            className={styles.input}/>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="name">Nombres</label>
          <input type="text" required id='name'
            value={formData.name}
            onChange={handleInputChange} 
            className={styles.input}/>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="apellidos">Apellidos</label>
          <input type="text" required id='apellidos'
            value={formData.apellidos}
            onChange={handleInputChange} 
            className={styles.input}/>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="email">email</label>
          <input type="email" required id='email'
            value={formData.email}
            onChange={handleInputChange} 
            className={styles.input}/>
        </div>

        <div className={styles.checkerContainer}>
          <label htmlFor="concentimiento">Concentimiento de recoleccion de datos</label>
          <input type="checkbox" required id='concentimiento'
            checked={formData.concentimiento}
            onChange={handleInputChange} />
        </div>

        <div >
          <button type="submit" className={styles.button} disabled={disableButton}>Guardar</button>
        </div>
      </form>
    </div>

  </>
}

export default Home;