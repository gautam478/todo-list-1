const form = document.getElementById('form')
const input = document.getElementById('input')
const output = document.getElementById('output')

let isEditingDone = true;
let array = ['eat', 'study', 'sleep', 'repeat'];
render();

function render(){
    output.innerHTML = '';
    for (let i = 0; i < array.length; i++) output.innerHTML += addTask(i, array[i]);
    input.value = '';
}

function addTask(index, title) {
    return `
        <div class="box" id="box-${index}">
             <div class="title" id="title-${index}" onclick="edit(this)">${title}</div>
             <button class="remove" id="remove-${index}" onclick="remove(this)">X</button>
        </div>
    `;
}

form.onsubmit = () => {
    if (input.value !== '' && isEditingDone) {
        array.push(input.value);
        render();
    }
}

function remove(element) {
    if (isEditingDone) {
        let index = parseInt(element.getAttribute('id').split('-')[1]);
        array = array.filter((x, i) => i !== index);
        render();
    }
}

function edit (element) {
    if (isEditingDone) {
        isEditingDone = false;
        input.disabled = true;
        let index = parseInt(element.getAttribute('id').split('-')[1]);
        document.getElementById(`box-${index}`).innerHTML = `
            <form class="form" id="form-${index}" onsubmit="update(this)">
              <input type="text" class="titleHere" id="titleHere-${index}" autocomplete="off" spellcheck="false">
            </form>
            <button class="remove" id="removeHere-${index}" onclick="removeEdit(this)">X</button>
        `;
        document.getElementById(`titleHere-${index}`).value = array[index];
        document.getElementById(`titleHere-${index}`).focus();
    }
}

function update(element) {
    isEditingDone = true;
    input.disabled = false;
    let index = parseInt(element.getAttribute('id').split('-')[1]);
    array[index] = document.getElementById(`titleHere-${index}`).value;
    render();
}

function removeEdit(element) {
    isEditingDone = true;
    input.disabled = false;
    let index = parseInt(element.getAttribute('id').split('-')[1]);
    array = array.filter((x, i) => i !== index);
    render();
}