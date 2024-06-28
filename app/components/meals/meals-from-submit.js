"use client";

import { useFormStatus } from "react-dom";

export default function MealsFromSubmit() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? "Submiting..." : "Share Meal"}
    </button>
  );
}
