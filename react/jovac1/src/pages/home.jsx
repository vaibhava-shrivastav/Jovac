import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

function Home() {
  const { name } = useContext(UserContext);
  function hello() {
    alert(`Hello, ${name}`);
  }
  const [subbed, setSubbed] = useState(false);

  function sub() {
    setSubbed(!subbed);
  }

  const [task, setTask] = useState([
    { id: 1, text: "task1", completed: false },
    { id: 2, text: "task2", completed: false },
  ]);

  function taskcheck(id) {
    setTask(
      task.map((item) =>
        item.id === id ? { ...item, completed: !task.completed } : item,
      ),
    );
  }
  return (
    <>
      <button onClick={hello}>click</button>

      <button
        onClick={sub}
        style={{
          backgroundColor: subbed ? "gray" : "red",
        }}
      >
        subscribe
      </button>

      <ul>
        {task.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => taskcheck(item.id)}
            />
            <span
              style={{
                textDecoration: item.completed ? "line-through" : "none",
                marginLeft: "8px",
              }}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Home;
