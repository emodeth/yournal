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

export async function createCollection(userId, name, description) {
  const res = await fetch(`${URL}/collections/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      name: name,
      description: description,
    }),
  });

  const data = await res.json();
  return data;
}

export async function updateCollection(id, name, description) {
  const res = await fetch(`${URL}/collections/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      description: description,
    }),
  });

  const data = await res.json();
  return data;
}

export async function deleteCollection(id) {
  const res = await fetch(`${URL}/collections/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
}
