import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Dashboard() {
  const { name, setName } = useContext(UserContext);

  return (
    <>
      <h2>{name}</h2>
      <button onClick={() => setName("varun")}>
        Change Name
      </button>
    </>
  );
}

export default Dashboard;