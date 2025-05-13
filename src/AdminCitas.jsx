import { useState, useEffect } from "react";

function AdminCitas() {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [doctor, setDoctor] = useState("Dr. Jose");
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState("");
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const esHorarioValido = (fechaStr, horaStr) => {
    const fecha = new Date(`${fechaStr}T${horaStr}`);
    const dia = fecha.getDay();
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    const tiempoEnMinutos = hora * 60 + minutos;

    if (dia === 6) {
      return tiempoEnMinutos >= 540 && tiempoEnMinutos <= 840;
    } else if (dia >= 1 && dia <= 5) {
      return tiempoEnMinutos >= 540 && tiempoEnMinutos <= 1080;
    }

    return false;
  };

  const generarHorarios = (fechaStr) => {
    const fecha = new Date(`${fechaStr}T00:00`);
    const dia = fecha.getDay();
    let horarios = [];
    let inicio = 540;
    let fin = dia === 6 ? 840 : dia >= 1 && dia <= 5 ? 1080 : 0;

    for (let i = inicio; i <= fin; i += 30) {
      const h = Math.floor(i / 60).toString().padStart(2, '0');
      const m = (i % 60).toString().padStart(2, '0');
      horarios.push(`${h}:${m}`);
    }

    return horarios;
  };

  useEffect(() => {
    if (fecha) {
      const disponibles = generarHorarios(fecha);
      setHorariosDisponibles(disponibles);
    } else {
      setHorariosDisponibles([]);
    }
  }, [fecha]);

  const handleAgendar = () => {
    if (!nombre || !fecha || !hora || !doctor) {
      setError("Por favor completa todos los campos.");
      return;
    }

    if (!esHorarioValido(fecha, hora)) {
      setError("El horario seleccionado está fuera del horario permitido.");
      return;
    }

    const citaExistente = citas.find(
      (cita, index) =>
        cita.fecha === fecha &&
        cita.hora === hora &&
        cita.doctor === doctor &&
        index !== editIndex
    );

    if (citaExistente) {
      setError("Este horario ya está ocupado para el doctor seleccionado.");
      return;
    }

    const nuevaCita = { nombre, fecha, hora, doctor };

    if (editIndex !== null) {
      const nuevasCitas = [...citas];
      nuevasCitas[editIndex] = nuevaCita;
      setCitas(nuevasCitas);
      setEditIndex(null);
    } else {
      setCitas([...citas, nuevaCita]);
    }

    setNombre("");
    setFecha("");
    setHora("");
    setDoctor("Dr. Jose");
    setError("");
  };

  const handleEditar = (index) => {
    const cita = citas[index];
    setNombre(cita.nombre);
    setFecha(cita.fecha);
    setHora(cita.hora);
    setDoctor(cita.doctor);
    setEditIndex(index);
  };

  const handleEliminar = (index) => {
    const nuevasCitas = citas.filter((_, i) => i !== index);
    setCitas(nuevasCitas);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Administrador de Citas Dentales</h1>

        <div className="space-y-4">
          <div>
            <label className="block font-medium">Nombre del paciente:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Fecha:</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Hora:</label>
            <select
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Selecciona una hora</option>
              {horariosDisponibles.map((horaOpt, index) => (
                <option key={index} value={horaOpt}>{horaOpt}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium">Doctor:</label>
            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="Dr. Jose">Dr. Jose</option>
              <option value="Dra. Andrea">Dra. Andrea</option>
              <option value="Dr. Masiel">Dr. Masiel</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleAgendar}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {editIndex !== null ? "Actualizar Cita" : "Agendar Cita"}
          </button>
        </div>
      </div>

      <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Citas Programadas</h2>
        {citas.length === 0 ? (
          <p className="text-gray-500">No hay citas programadas.</p>
        ) : (
          <ul className="space-y-2">
            {citas.map((cita, index) => (
              <li key={index} className="border border-gray-200 p-3 rounded shadow-sm">
                <div>
                  <span className="font-medium">Paciente:</span> {cita.nombre} <br />
                  <span className="font-medium">Fecha:</span> {cita.fecha} <br />
                  <span className="font-medium">Hora:</span> {cita.hora} <br />
                  <span className="font-medium">Doctor:</span> {cita.doctor}
                </div>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleEditar(index)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminCitas;