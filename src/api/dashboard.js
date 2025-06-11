const URL = "http://127.0.0.1:5000";

export async function getUserDashboard(userId) {
  const res = await fetch(`${URL}/users/${userId}/dashboard`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  console.log(data);
  return data;
}
