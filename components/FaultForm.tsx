"use client";

import { FormEvent, useState } from "react";
import { FaultReportInput } from "@/types/fault";

const MIN_DESCRIPTION_LENGTH = 10;

interface FaultFormProps {
  onSubmit: (input: FaultReportInput) => void;
  disabled?: boolean;
}

export function FaultForm({ onSubmit, disabled }: FaultFormProps) {
  const [equipment, setEquipment] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (equipment.trim().length === 0) {
      setError("Equipment is required.");
      return;
    }

    if (description.trim().length < MIN_DESCRIPTION_LENGTH) {
      setError(
        `Description must contain at least ${MIN_DESCRIPTION_LENGTH} characters.`,
      );
      return;
    }

    setError(null);
    onSubmit({ equipment: equipment.trim(), description: description.trim() });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="equipment" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Equipment
        </label>
        <input
          id="equipment"
          type="text"
          value={equipment}
          onChange={(event) => setEquipment(event.target.value)}
          placeholder="Conveyor 2"
          disabled={disabled}
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Fault description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Conveyor stops after 15 minutes. Motor is getting hot and the overload has tripped twice. Started this morning."
          rows={6}
          disabled={disabled}
          className="resize-none rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={disabled}
        className="self-start rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {disabled ? "Analysing..." : "Analyse Fault"}
      </button>
    </form>
  );
}
