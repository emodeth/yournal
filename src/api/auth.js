const URL = "https://yournal-backend.onrender.com";

export async function fetchUser(setUser) {
  try {
    const res = await fetch(`${URL}/auth/me`, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data);
    } else if (res.status === 401) {
      setUser(false);
    } else {
      setUser(false);
    }
  } catch (err) {
    throw new Error(err);
  }
}

export async function login(email, password) {
  const res = await fetch(`${URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    credentials: "include",
  });

  const data = await res.json();
  return data;
}

export async function logout() {
  const res = await fetch(`${URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();
  return data;
}

export async function register(email, password, name) {
  const res = await fetch(`${URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      name: name,
      password: password,
    }),
    credentials: "include",
  });

  const data = await res.json();
  console.log(data);
  return data;
}
