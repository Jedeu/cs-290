document.addEventListener("click", (e) => {
  if (e.target && e.target.id == "submit-button") {
    handleSubmit(e);
  } else if (e.target && e.target.id == "delete-button") {
    handleDelete(e);
  } else if (e.target && e.target.id == "edit-button") {
    handleEdit(e);
  }
});

function handleSubmit(e) {
  e.preventDefault();

  let name = document.getElementById("name").value;

  if (!name) {
    let errorMsg = "Name cannot be empty";
    showError(errorMsg);
    return;
  }

  let reps = document.getElementById("reps").value;
  let weight = document.getElementById("weight").value;
  let date = document.getElementById("date").value;
  let weightSelect = document.getElementById("unit-select");
  let isLbs = weightSelect.options[weightSelect.selectedIndex].value == "lbs" ? true : false;

  let payload = {
    name,
    reps,
    weight,
    date,
    lbs: isLbs,
    action: "add"
  }


  fetch('http://flip3.engr.oregonstate.edu:1992/', {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then((myJson) => {
    if (myJson.error) {
      let errorMsg = `Error inserting into database: ${myJson.error.sqlMessage}`;
      showError(errorMsg);
    } else {
      const {action, ...dataToAppend} = payload;
      dataToAppend.lbs = weightSelect.options[weightSelect.selectedIndex].value
      dataToAppend.id = myJson.insertId;
      addNewRow(dataToAppend);
    }
  });
}

function handleDelete(e) {
  e.preventDefault();
  // This gives us the ID of the row to delete, stored in the <tr>'s id
  let id = e.target.parentNode.parentNode.id;
  let payload = {
    id,
    action: "delete"
  };

  fetch('http://flip3.engr.oregonstate.edu:1992/', {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then((myJson) => {
    if (myJson.error) {
      let errorMsg = `Error deleting from database: ${myJson.error.sqlMessage}`;
      showError(errorMsg);
    } else {
      removeRow(id)
    }
  });
}

function handleEdit(e) {
  e.preventDefault();

  let id = e.target.parentNode.parentNode.id;

  let name = document.getElementById(`${id}-name`).textContent;

  if (!name) {
    let errorMsg = "Name cannot be empty"
    showError(errorMsg);
    return;
  }

  let reps = document.getElementById(`${id}-reps`).textContent;
  let weight = document.getElementById(`${id}-weight`).textContent;
  let date = document.getElementById(`${id}-date`).textContent;
  let weightSelect = document.getElementById(`${id}-lbs`).textContent;
  let isLbs = weightSelect == "lbs" ? true : false;

  let payload = {
    name,
    reps,
    weight,
    date,
    id,
    lbs: isLbs,
    action: "edit",
  };

  fetch('http://flip3.engr.oregonstate.edu:1992/', {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then((myJson) => {
    if (myJson.error) {
      let errorMsg = `Error inserting into database: ${myJson.error.sqlMessage}`
      showError(errorMsg);
    } else {
      console.log(myJson);
    }
  });
}

function addNewRow(payload) {
  let tableBody = document.getElementById("fitness-table-body");
  let tableContentsRow = document.createElement("tr");
  tableContentsRow.id = payload.id;
  // I have no idea why... but I can't iterate over the payload keys and exclude id
  // in the Object.keys line, so I just use spread to take it out here.
  let {id, ...dataToFill} = payload;
  tableBody.appendChild(tableContentsRow);
  Object.keys(dataToFill).forEach((key) => {
    let tableRowData = document.createElement("td");
    tableRowData.textContent = payload[key];
    tableRowData.id = `${id}-${key}`
    tableRowData.setAttribute("contenteditable", "true");
    tableContentsRow.appendChild(tableRowData);
  });

  let deleteTableData = document.createElement("td");
  let deleteButton = document.createElement("button");
  deleteButton.setAttribute("type", "submit");
  deleteButton.id = "delete-button";
  deleteButton.textContent = "Delete this exercise";
  deleteTableData.appendChild(deleteButton);

  tableContentsRow.appendChild(deleteTableData);

  let editTableData = document.createElement("td");
  let editButton = document.createElement("button")
  editButton.setAttribute("type", "submit");
  editButton.id = "edit-button";
  editButton.textContent = "Edit this exercise";
  editTableData.appendChild(editButton);

  tableContentsRow.appendChild(editTableData);
}

function removeRow(id) {
  document.getElementById(id).remove();
}

function showError(message) {
  document.getElementById("result-message").textContent = message;
}

function showSuccess() {
  document.getElementById("result-message").textContent = "Operation successful"
}