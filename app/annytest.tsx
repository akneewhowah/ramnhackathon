"use client";

import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<any>(null);

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const form = e.currentTarget;

  const fileInput = form.elements.namedItem("image") as HTMLInputElement;
  const produceSelect = form.elements.namedItem("produce_type") as HTMLSelectElement;

  if (!fileInput.files || fileInput.files.length === 0) {
    alert("No file selected");
    return;
  }

  const selectedFile = fileInput.files[0];

  const formData = new FormData();
  formData.append("image", selectedFile);
  formData.append("produce_type", produceSelect.value);

  const res = await fetch("/api/scan", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  setResult(data);
}

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <select name="produce_type">
          <option value="carrot">Carrot</option>
          <option value="pepper">Pepper</option>
          <option value="cauliflower">Cauliflower</option>
        </select>

        <input type="file" name="image" required />
        <button type="submit">Scan</button>
      </form>

      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}