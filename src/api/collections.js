const URL = "http://127.0.0.1:5000";

export async function getCollectionsByUserId(userId) {
  const res = await fetch(`${URL}/users/${userId}/collections`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
}

export async function getCollectionById(id) {
  const res = await fetch(`${URL}/collections/${id}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
}

export async function getCollectionContent(id) {
  const res = await fetch(`${URL}/collections/${id}/contents`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
}
