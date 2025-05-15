
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import clsx from "clsx";

const horasDisponibles = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00",
  "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

export default function AdminCitas() {
  const [nuevoPaciente, setNuevoPaciente] = useState("");
  const [telefono, setTelefono] = useState("");
  const [telefonoInvalido, setTelefonoInvalido] = useState(false);
  const [nuevoDoctor, setNuevoDoctor] = useState("");
  const [nuevoTratamiento, setNuevoTratamiento] = useState("");
  const [nuevaFecha, setNuevaFecha] = useState(null);
  const [horaInicioSeleccionada, setHoraInicioSeleccionada] = useState("");
  const [horaFinSeleccionada, setHoraFinSeleccionada] = useState("");
  const [errorCampos, setErrorCampos] = useState("");
  const [errorHora, setErrorHora] = useState("");
  const [citas, setCitas] = useState([]);
  const [doctoresDisponibles, setDoctoresDisponibles] = useState(["Dr. José", "Dr. Masiel", "Dra. Andrea"]);

  const horasPermitidas = horasDisponibles;

  const validarTelefono = (numero) => {
    const regex = /^\d{10}$/;
    return regex.test(numero);
  };

  const convertirHoraAEntero = (hora) => {
    const [horas, minutos] = hora.split(":").map(Number);
    return horas * 60 + minutos;
  };

  const agendarCita = () => {
    if (!nuevoPaciente || !telefono || !nuevoDoctor || !nuevoTratamiento || !nuevaFecha || !horaInicioSeleccionada || !horaFinSeleccionada) {
      setErrorCampos("Por favor llena todos los campos");
      return;
    }
    setErrorCampos("");

    if (!validarTelefono(telefono)) {
      setTelefonoInvalido(true);
      return;
    }
    setTelefonoInvalido(false);

    const inicio = convertirHoraAEntero(horaInicioSeleccionada);
    const fin = convertirHoraAEntero(horaFinSeleccionada);
    if (fin <= inicio) {
      setErrorHora("La hora de fin debe ser posterior a la hora de inicio");
      return;
    }
    setErrorHora("");

    const nuevaCita = {
      id: Date.now(),
      paciente: nuevoPaciente,
      telefono,
      doctor: nuevoDoctor,
      tratamiento: nuevoTratamiento,
      fecha: nuevaFecha,
      horaInicio: horaInicioSeleccionada,
      horaFin: horaFinSeleccionada,
    };
    setCitas([...citas, nuevaCita]);

    setNuevoPaciente("");
    setTelefono("");
    setNuevoDoctor("");
    setNuevoTratamiento("");
    setNuevaFecha(null);
    setHoraInicioSeleccionada("");
    setHoraFinSeleccionada("");
  };

  const cancelarCita = (id) => {
    setCitas(citas.filter(cita => cita.id !== id));
  };

  const reprogramarCita = (id) => {
    const cita = citas.find(c => c.id === id);
    if (cita) {
      setNuevoPaciente(cita.paciente);
      setTelefono(cita.telefono);
      setNuevoDoctor(cita.doctor);
      setNuevoTratamiento(cita.tratamiento);
      setNuevaFecha(new Date(cita.fecha));
      setHoraInicioSeleccionada(cita.horaInicio);
      setHoraFinSeleccionada(cita.horaFin);
      cancelarCita(id);
    }
  };

  const renderBotonHora = (hora, seleccionada, setSeleccionada, otraSeleccionada, tipo) => {
    const ocupada = citas.some(cita => {
      if (!cita.fecha || !nuevaFecha) return false;
      if (new Date(cita.fecha).toDateString() !== nuevaFecha.toDateString()) return false;
      if (cita.doctor !== nuevoDoctor) return false;

      const inicioCita = cita.horaInicio;
      const finCita = cita.horaFin;

      return hora >= inicioCita && hora < finCita;
    });

    const seleccionadaClase = seleccionada === hora ? "bg-blue-600 text-white" : "";
    const ocupadaClase = ocupada ? "bg-red-500 text-white" : "bg-emerald-500 text-white";

    return (
      <Button
        key={hora}
        className={clsx("rounded-xl px-3 py-1 text-sm font-semibold shadow-sm transition-all", seleccionadaClase || ocupadaClase)}
        disabled={ocupada}
        onClick={() => setSeleccionada(hora)}
      >
        {hora}
      </Button>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Sistema de Citas Dentales</h1>
    </div>
  );
}
