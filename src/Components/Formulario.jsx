import { useState } from "react";
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'

const Formulario = ({ crearCita }) => {

    // Crear el state de citas
    const [cita, setCita] = useState({
        mascota: '',
        propietario: '',
        date: '',
        hora: '',
        sintoma: ''
    })

    const [error, setError] = useState(false);


    // Funcion que se ejecuta cada que el usuario escribe en un input
    const updateState = e => {
        setCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }
    // Extraer los valores de le formulario
    const { mascota, propietario, date, hora, sintoma } = cita

    // Cuando el usuario hace click en enviar
    const submitcita = e => {

        e.preventDefault();

        // Validar Los datos
        if (mascota.trim() === ''
            || propietario.trim() === ''
            || date.trim() === ''
            || hora.trim() === ''
            || sintoma.trim() === ''
        ) {
            setError(true);
            return;
        }

        // Eliminar  mensaje previo
        setError(false);
        // Asignar un Id
        cita.id = uuidv4();

        // Crear una cita
        crearCita(cita);
        // Reinicar el form
        setCita({
            mascota: '',
            propietario: '',
            date: '',
            hora: '',
            sintoma: ''

        })
    }

    return (
        <>
            <h2>Crear Citas</h2>
            {error ? <p className="alerta-error">Error, todos los campos son obligatorios</p>
                : null}
            <form
                onSubmit={submitcita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre de tu Mascota'
                    onChange={updateState}
                    value={mascota}
                />

                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre del dueño'
                    onChange={updateState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name='date'
                    className='u-full-width'
                    onChange={updateState}
                    value={date}
                />


                <label>Hora</label>
                <input
                    type="time"
                    name='hora'
                    className='u-full-width'
                    onChange={updateState}
                    value={hora}
                />

                <label>Sintomas</label>
                <textarea
                    className='u-full-width'
                    name='sintoma'
                    onChange={updateState}
                    value={sintoma}
                >
                </textarea>


                <button
                    type='submit'
                    className='u-full-width button-primary'
                >
                    Agregar Cita
                </button>
            </form>
        </>
    )
};

Formulario.propTypes={
    crearCita:PropTypes.func.isRequired
}

export default Formulario;
