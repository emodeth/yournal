const URL = "http://127.0.0.1:5000";

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
  console.log(data);
  return data;
}

export async function logout() {
  const res = await fetch(`${URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();
  console.log(data);
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
