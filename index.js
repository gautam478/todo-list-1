const form = document.getElementById('form');
const input = document.getElementById('input');
const output = document.getElementById('output');
const search = document.getElementById('search');

let isEditingDone = true, index = -1;
let array = ['eat', 'study', 'sleep', 'repeat'];
render(array);

function render(arr){
    output.innerHTML = '';
    for (let i = 0; i < arr.length; i++) output.innerHTML += addTask(i, arr[i]);
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
        render(array);
    }
}

function remove(element) {
    if (isEditingDone) {
        index = parseInt(element.getAttribute('id').split('-')[1]);
        array = array.filter((x, i) => i !== index);
        render(array);
    }
}

function edit (element) {
    if (isEditingDone) {
        isEditingDone = false;
        input.disabled = true;
        index = parseInt(element.getAttribute('id').split('-')[1]);
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
    index = parseInt(element.getAttribute('id').split('-')[1]);
    array[index] = document.getElementById(`titleHere-${index}`).value;
    render(array);
}

function removeEdit(element) {
    isEditingDone = true;
    input.disabled = false;
    index = parseInt(element.getAttribute('id').split('-')[1]);
    array = array.filter((x, i) => i !== index);
    render(array);
}

search.onkeyup = () => {
    let sentence = search.value;
    let newArray = array.filter((x) => {
        console.log(x.includes(sentence));
        return x.includes(sentence);
    })
    render(newArray);
}