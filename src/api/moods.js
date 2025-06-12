const URL = "https://yournal-backend.onrender.com";

export async function getAllMoods() {
  const res = await fetch(`${URL}/moods/`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
}

export async function getMoodById(id) {
  const res = await fetch(`${URL}/moods/${id}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
}
