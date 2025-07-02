import { useState, useEffect } from "react";
import HabitCard from "./components/HabitCard";
import { AnimatePresence, motion } from "framer-motion";

const getToday = () => new Date().toISOString().split("T")[0];

function App() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  const [newHabitName, setNewHabitName] = useState("");

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

  const deleteHabit = (id) => {
    const filtered = habits.filter((habit) => habit.id !== id);
    setHabits(filtered);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="w-full max-w-xl flex flex-col items-center">
        <motion.h1
          className="text-4xl font-bold mb-8 text-purple-400 text-center drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🌱 Habit Tracker
        </motion.h1>

        {/* Input and Add Button */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 w-full">
          <input
            type="text"
            placeholder="Enter new habit"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg text-black shadow focus:outline-none"
          />
          <button
            onClick={addHabit}
            className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-lg text-white font-semibold shadow"
          >
            ➕ Add Habit
          </button>
        </div>

        {/* Habit List */}
        {habits.length === 0 ? (
          <p className="text-gray-400 text-center">No habits yet. Start by adding one!</p>
        ) : (
          <div className="w-full flex flex-col items-center space-y-4">
            <AnimatePresence>
              {habits.map((habit) => (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <HabitCard
                    habit={habit}
                    onToggle={toggleHabit}
                    onDelete={deleteHabit}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
