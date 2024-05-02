import React, { useState, useEffect } from "react";
import axios from "axios";

const GroupTaskLists = ({ from, to, showStatus }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        const filteredTasks = response.data.filter(task => task.id >= from && task.id <= to);
        setTasks(filteredTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    if (showStatus) {
      fetchTasks();
    }
  }, [from, to, showStatus]);

  return loading ? (
    <p>Loading...</p>
  ) : (
    tasks.length > 0 ? (
      <ul className="inline-flex gap-2 flex-wrap">
        {tasks.map((task) => (
          <li key={task.id} className="py-2">{`${task.id}: ${task.completed}`}</li>
        ))}
      </ul>
    ) : (
      <p>Empty List</p>
    )
  );
};

export default GroupTaskLists;
