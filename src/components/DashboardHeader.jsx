import { useAuth } from "../contexts/AuthContext";

function DashboardHeader() {
  const { user } = useAuth();

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Welcome back{user?.name ? "," : "!"}{" "}
        {user?.name ? user.name + "!" : null}
      </h1>
      <p className="text-gray-600">
        Here's your mood tracking overview for today.
      </p>
    </div>
  );
}

export default DashboardHeader;
