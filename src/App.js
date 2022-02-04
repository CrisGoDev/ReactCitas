import React, { useState, useEffect } from "react";
import Cita from "./Components/Cita";
import Formulario from "./Components/Formulario";


function App() {
  // Citas en local storage

  let citasIniciales = JSON.parse(localStorage.getItem("citas"))|| undefined;
  if(!citasIniciales){
    citasIniciales=[]
  }

 
  // Arreglo de citas
  const [citas, setCitas] = useState(citasIniciales);

  // USeEffect para obtener las citas de localstorage

  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem("citas"))|| undefined;
    if (citasIniciales) {
      
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas]);

  // Funcion de vitas actuales y nuevas

  const crearCita = (cita) => {
    setCitas([...citas, cita]);
  };

  // Funcion de eliminar citas

  const deleteCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    setCitas(nuevasCitas);
  };

  // Mensaje Condicional
  const titulo = citas.length === 0 ? "No hay Citas" : "Administra tus Citas";

  return (
    <>
      <h1>Administrador de Citas</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>

          <div className=" one-half column">
            <h1>{titulo}</h1>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} deleteCita={deleteCita} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
