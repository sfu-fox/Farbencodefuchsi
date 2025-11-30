import React, { useState } from "react";

export default function App() {
  const initial = { gruen: 6, gelb: "", blau: "", rot: "", braun: "" };
  const [values, setValues] = useState(initial);
  const [message, setMessage] = useState("");

  const colors = [
    { key: "gruen", name: "Grün", color: "bg-green-500" },
    { key: "gelb", name: "Gelb", color: "bg-yellow-400" },
    { key: "blau", name: "Blau", color: "bg-blue-500" },
    { key: "rot", name: "Rot", color: "bg-red-500" },
    { key: "braun", name: "Braun", color: "bg-amber-800 text-white" },
  ];

  function onChange(key, v) {
    if (key === "gruen") return;
    const nv = v === "" ? "" : Math.max(1, Math.min(9, parseInt(v || 0)));
    setValues((s) => ({ ...s, [key]: nv }));
    setMessage("");
  }

  function validateInputs() {
    for (let k of Object.keys(initial)) {
      if (!values[k] && values[k] !== 0) return "Bitte alle Felder ausfüllen.";
    }

    const nums = Object.values(values).map(Number);
    for (let n of nums) if (!(n >= 1 && n <= 9)) return "Alle Zahlen 1–9.";

    const set = new Set(nums);
    if (set.size !== 5) return "Keine Zahl doppelt.";

    if (Number(values.gruen) !== 6) return "Grün muss 6 sein.";

    if (Number(values.gruen) + Number(values.gelb) !== Number(values.blau))
      return "Grün + Gelb = Blau.";

    if (Number(values.gelb) + 4 !== Number(values.braun))
      return "Gelb + 4 = Braun.";

    const even = nums.filter((n) => n % 2 === 0).length;
    const odd = nums.filter((n) => n % 2 !== 0).length;
    if (!(even === 2 && odd === 3)) return "2 gerade, 3 ungerade.";

    const max = Math.max(...nums);
    const min = Math.min(...nums);
    if ([values.gruen, values.braun].includes(max) || [values.gruen, values.braun].includes(min))
      return "Höchste/tiefste Zahl nicht außen.";

    const rot = Number(values.rot);
    let divisionOk = false;
    for (let a of nums) for (let b of nums) if (a !== b && a / b === rot) divisionOk = true;
    if (!divisionOk) return "Division muss rote Zahl ergeben.";

    return null;
  }

  function onCheck() {
    const err = validateInputs();
    setMessage(err ? err : "Alle Bedingungen erfüllt!");
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Die Challenge: Findest du den Farbencode?</h1>

      <div className="flex gap-3 items-end mb-4">
        {colors.map((c) => (
          <label key={c.key} className="flex flex-col items-center w-28">
            <div className={`w-full p-3 rounded-md ${c.color} text-center`}>{c.name}</div>
            <input
              className="mt-2 w-full text-center border rounded p-1"
              type="number"
              min={1}
              max={9}
              value={values[c.key]}
              onChange={(e) => onChange(c.key, e.target.value)}
              readOnly={c.key === "gruen"}
            />
          </label>
        ))}
      </div>

      <button
        className="px-4 py-2 rounded bg-blue-600 text-white"
        onClick={onCheck}
      >
        Lösung prüfen
      </button>

      {message && (
        <div className="mt-4 p-3 rounded bg-white shadow border">{message}</div>
      )}
    </div>
  );
}
