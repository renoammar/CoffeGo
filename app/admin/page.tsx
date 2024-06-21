"use client";

export default function AdminPage() {
  const handleUpload = async () => {
    const response = await fetch("/api/uploadData", {
      method: "POST",
    });

    const data = await response.json();

    if (response.ok) {
      alert("Database created successfully");
    } else {
      alert(`Error: ${data.error}`);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleUpload();
      }}
      method="post"
    >
      <button type="submit">Upload</button>
    </form>
  );
}
