import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import "./index.css";

function ParkingCalculator() {
  const [hourlyRate, setHourlyRate] = useState("");
  const [entryTime, setEntryTime] = useState("");
  const [exitTime, setExitTime] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  const handleEntryTimeClick = () => {
    setEntryTime(getCurrentTime());
  };

  const handleExitTimeClick = () => {
    setExitTime(getCurrentTime());
  };

  const calculateCost = () => {
    const entryParts = entryTime.split(":");
    const exitParts = exitTime.split(":");

    if (entryParts.length !== 2 || exitParts.length !== 2) {
      alert("Por favor, insira a hora no formato HH:mm");
      return;
    }

    const entryHour = parseInt(entryParts[0]);
    const entryMinute = parseInt(entryParts[1]);
    const exitHour = parseInt(exitParts[0]);
    const exitMinute = parseInt(exitParts[1]);

    if (
      isNaN(entryHour) ||
      isNaN(entryMinute) ||
      isNaN(exitHour) ||
      isNaN(exitMinute)
    ) {
      alert("Por favor, insira a hora no formato HH:mm");
      return;
    }

    const entry = new Date(2023, 8, 6, entryHour, entryMinute);
    const exit = new Date(2023, 8, 6, exitHour, exitMinute);
    const diffMilliseconds = exit - entry;
    const diffMinutes = Math.ceil(diffMilliseconds / (1000 * 60));
    const cost = (diffMinutes / 60) * hourlyRate;
    setTotalTime(diffMinutes);
    setTotalCost(cost.toFixed(2));
  };

  function formatTime(minutes) {
    if (minutes <= 59) {
      return `${minutes} minutos`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      if (remainingMinutes === 0) {
        return `${hours} hora${hours === 1 ? "" : "s"}`;
      } else {
        return `${hours} hora${
          hours === 1 ? "" : "s"
        } e ${remainingMinutes} minutos`;
      }
    }
  }

  const clearFields = () => {
    // setHourlyRate("");
    setEntryTime("");
    setExitTime("");
    setTotalTime("");
    setTotalCost("");
    setVehiclePlate("");
  };

  return (
    <div className="p-fluid">
      <Panel
        className="custom-panel min-width-250 max-width-520"
        header={
          <div className="text-blue-700 font-bold text-2xl">
            Parking Calculator
          </div>
        }
      >
        <div className="p-field p-grid text-blue-500 font-bold">
          <label htmlFor="hourlyRate" className="flex m-2">
            Valor/Hora:
            <span className="flex justify-content-center">
              {Number(hourlyRate).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </label>
          <div className="m-2">
            <InputText
              id="hourlyRate"
              placeholder="0.00"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
            />
          </div>
        </div>

        <div className="p-field p-grid text-blue-500 font-bold">
          <label htmlFor="vehiclePlate" className="flex m-2">
            Placa do Veículo:
          </label>
          <div className="m-2">
            <InputText
              id="vehiclePlate"
              placeholder="ABC-1234"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />
          </div>
        </div>

        <div className="p-field p-grid text-blue-500 font-bold">
          <label htmlFor="entryTime" className="flex m-2">
            Hora/Entrada:
          </label>
          <div className="m-2">
            <InputText
              id="entryTime"
              placeholder="Hora atual"
              value={entryTime}
              onChange={(e) => setEntryTime(e.target.value)}
              onClick={handleEntryTimeClick}
            />
          </div>
        </div>

        <div className="p-field p-grid text-blue-500 font-bold">
          <label htmlFor="exitTime" className="flex m-2">
            Hora/Saída:
          </label>
          <div className="m-2">
            <InputText
              id="exitTime"
              placeholder="Hora atual"
              value={exitTime}
              onChange={(e) => setExitTime(e.target.value)}
              onClick={handleExitTimeClick}
            />
          </div>
        </div>

        <div className="p-field p-grid">
          <div className="m-2">
            <Button
              label="Limpar"
              icon="pi pi-trash"
              raised
              onClick={clearFields}
              style={{ color: "#ffffff", fontWeight: "bold" }}
            />
          </div>
          <div className="m-2">
            <Button
              label="Calcular"
              icon="pi pi-calculator"
              raised
              onClick={calculateCost}
              style={{ color: "#ffffff", fontWeight: "bold" }}
            />
          </div>
        </div>

        <div className="p-field p-grid text-blue-700 font-bold">
          <label className="flex justify-content-center">Tempo:</label>
          <span className="flex justify-content-center">
            {formatTime(totalTime)}
          </span>
          <label className="flex justify-content-center">Valor a pagar:</label>
          <span className="flex justify-content-center">
            {Number(totalCost).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </Panel>
    </div>
  );
}

export default ParkingCalculator;
