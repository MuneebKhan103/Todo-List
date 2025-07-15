var taskToBeAdd = JSON.parse(localStorage.getItem("todos")) || [];
let editingIndex = null;    
const display = () => {
  let text = "";
  taskToBeAdd.forEach((item, index) => {
  const doneClass = item.done ? "done" : "";
  if (editingIndex === index) [
    text += `
    <div class="first ${doneClass}"> 
    <input type="input" id="editInput${editingIndex}" class="editField"  value="${item.task}" />
      <div class="saveAndCancel">
        <button id = "saveBtn" onclick="saveEdit()">Save</button>
        <button id= "cancel" onclick="cancelEdit()">Cancel</button>
    </div>
    </div>`
  ]
  else{
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
  `;}
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
  editingIndex = index;
  display();
};

const saveEdit = () => {
  const input = document.getElementById(`editInput${editingIndex}`);
  if (!input) return;
    const updatedValue = input.value.trim();
    if (updatedValue === ""){
      alert("You must write something!");
    return;
  }
taskToBeAdd[editingIndex].task = updatedValue;
editingIndex = null;
saveToLocal();
display();
};

const cancelEdit = () => {
  editingIndex = null;
  display();
}

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
