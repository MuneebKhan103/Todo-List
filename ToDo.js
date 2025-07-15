var taskToBeAdd = JSON.parse(localStorage.getItem("todos")) || [];
    
const display = () => {
  let text = "";
  taskToBeAdd.forEach((item, index) => {
  const doneClass = item.done ? "done" : "";
  text += `
    <div class="first ${doneClass}">
      <div class="editArea">${item.task}</div>
        <div class="buttons">
          <button onclick="deleteItem(${index})">
          <img src="DeleteIcon-removebg-preview.png" alt="delete" height="41" width="43">
        </button>
        <button onclick="editItem(${index})">
          <img src="Edit_Icon-removebg-preview.png" alt="Edit" height="41" width="43">
        </button>
        <button onclick="doneTick(${index})">
          <img src="tick-done-removebg-preview.png" alt="done" height="41" width="43">
        </button>
        </div>
    </div>
  `;
});
document.getElementById("myLists").innerHTML = text;
};
const addTask = () => {
const taskAdd = document.getElementById("myInputValue").value.trim();
if (taskAdd === "") {
  alert("You Must Write Something!");
return;
}
const fTasks = {
  task: taskAdd,
  done: false
};
taskToBeAdd.push(fTasks);
  document.getElementById("myInputValue").value = "";
saveToLocal();
display();
};
const deleteItem = (index) => {
taskToBeAdd.splice(index, 1);
saveToLocal();
display();
};
const doneTick = (index) => {
  taskToBeAdd[index].done = !taskToBeAdd[index].done;
  saveToLocal();
  display();
};
const editItem = (index) => {
  const taskDiv = document.getElementsByClassName("first")[index];
  const currentValue = taskToBeAdd[index];
taskDiv.innerHTML = `
  <input type="text" class="editField" id="editInput${index}" value="${currentValue.task}" />
    <div class="saveAndCancel">
      <button id = "saveBtn" onclick="saveEdit()">Save</button>
      <button id= "cancel" onclick="display()">Cancel</button>
    </div>
  `;
};
const saveEdit = () => {
  const editInput = Array.from(document.querySelectorAll(".editField"));
  editInput.forEach((input, i) => {
    const updatedValue = input.value.trim();
    if(updatedValue !== ""){
      taskToBeAdd[i].task = updatedValue;
    }
  })
saveToLocal();
display();
};
const saveToLocal = () => {
localStorage.setItem("todos", JSON.stringify(taskToBeAdd));
};
display()

const inputField = document.getElementById("myInputValue");
const adBtn = document.getElementById("addBtn");
inputField.addEventListener("keypress", function(event){
  if (event.key === "Enter"){
    event.preventDefault();
    adBtn.click();
  }
})
