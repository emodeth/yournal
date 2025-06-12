const URL = "https://yournal-backend.onrender.com";

export async function getUserDashboard(userId) {
  const res = await fetch(`${URL}/users/${userId}/dashboard`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  console.log(data);
  return data;
}
