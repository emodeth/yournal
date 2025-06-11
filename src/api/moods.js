const URL = "http://127.0.0.1:5000";

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
