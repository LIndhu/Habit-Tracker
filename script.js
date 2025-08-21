const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitList = document.getElementById("habitList");
const progressBar = document.getElementById("progress");
const progressPercent = document.getElementById("progressPercent");

let habits = [];

// Add Habit
addHabitBtn.addEventListener("click", () => {
  let habit = habitInput.value.trim();
  if (habit === "") return;

  habits.push({ name: habit, completed: false });
  habitInput.value = "";
  renderHabits();
});

// Render Habits
function renderHabits() {
  habitList.innerHTML = "";
  habits.forEach((h, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <span style="text-decoration: ${h.completed ? "line-through" : "none"};">
        ${h.name}
      </span>
      <div class="habit-actions">
        <button class="complete-btn" onclick="toggleComplete(${index})">✔</button>
        <button class="delete-btn" onclick="deleteHabit(${index})">✖</button>
      </div>
    `;
    habitList.appendChild(li);
  });
  updateProgress();
}

// Toggle Complete
function toggleComplete(index) {
  habits[index].completed = !habits[index].completed;
  renderHabits();
}

// Delete Habit
function deleteHabit(index) {
  habits.splice(index, 1);
  renderHabits();
}

// Update Progress Bar
function updateProgress() {
  if (habits.length === 0) {
    progressBar.style.width = "0%";
    progressPercent.textContent = "0";
    return;
  }
  let completed = habits.filter(h => h.completed).length;
  let percent = Math.round((completed / habits.length) * 100);
  progressBar.style.width = percent + "%";
  progressPercent.textContent = percent;
}

// Initial Render
renderHabits();
