import { useState, useEffect } from "react";
import HabitCard from "./components/HabitCard";

const getToday = () => new Date().toISOString().split("T")[0];

function App() {
  // Load habits from localStorage on first render
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  const [newHabitName, setNewHabitName] = useState("");

  const deleteHabit = (id) => {
    const filtered = habits.filter((habit) => habit.id !== id);
    setHabits(filtered);
  }

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (!newHabitName.trim()) return;

    const newHabit = {
      id: Date.now().toString(),
      name: newHabitName.trim(),
      createdAt: getToday(),
      history: {},
    };

    setHabits([...habits, newHabit]);
    setNewHabitName("");
  };

  const toggleHabit = (id) => {
    const today = getToday();

    const updated = habits.map((habit) => {
      if (habit.id === id) {
        const updatedHistory = { ...habit.history };
        updatedHistory[today] = !updatedHistory[today];
        return { ...habit, history: updatedHistory };
      }
      return habit;
    });

    setHabits(updated);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">🌱 Habit Tracker</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter new habit"
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          className="px-4 py-2 rounded-lg text-black w-64"
        />
        <button
          onClick={addHabit}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>

      {habits.length === 0 ? (
        <p className="text-gray-400">No habits yet. Start by adding one!</p>
      ) : (
        habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} onToggle={toggleHabit} onDelete={deleteHabit} />
        ))
      )}
    </div>
  );
}

export default App;
