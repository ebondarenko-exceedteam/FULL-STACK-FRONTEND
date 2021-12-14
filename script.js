const recordingsArray = [];
let inputWhereValue = '';
let inputHowManyValue = '';
let resultSum = 0;
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = `${dd}.${mm}.${yyyy}`;
const inputWhere = document.getElementById('input_where');
const inputHowMany = document.getElementById('input_how_many');
const button = document.querySelector('button');

const changeInputWhere = (event) => {
  inputWhereValue = event.target.value;
}

const changeinputHowMany = (event) => {
  inputHowManyValue = event.target.value;
}

const addNewRecording = () => {
  recordingsArray.push({
    where: inputWhereValue,
    howMany: inputHowManyValue
  });
  resultSum += +inputHowManyValue;
  inputWhere.value = '';
  inputHowMany.value = '';
  render();
}

const changeRecording = (index) => {
  resultSum -= Number(recordingsArray[index].howMany);
  recordingsArray[index].where = inputWhereValue;
  recordingsArray[index].howMany = inputHowManyValue;
  resultSum += +inputHowManyValue;
  inputWhere.value = '';
  inputHowMany.value = '';
  render();
};

const closeRecording = () => {
  inputWhereValue = '';
  inputHowManyValue = '';
  render();
}

const editRecording = (index) => {
  const { where, howMany } = recordingsArray[index];
  const activeRecording = document.getElementById(`record_${index}`)
  while (activeRecording.firstChild) {
    activeRecording.removeChild(activeRecording.firstChild);
  }

  const editInputWhere = document.createElement('input');
  editInputWhere.id = 'input_edit_where';
  editInputWhere.type = 'text';
  editInputWhere.value = where;
  editInputWhere.addEventListener('change', changeInputWhere);
  const editInputHowMany = document.createElement('input');
  editInputHowMany.id = 'input_edit_how_many';
  editInputHowMany.type = 'number';
  editInputHowMany.value = howMany;
  editInputHowMany.addEventListener('change', changeinputHowMany);
  const editBtnDiv = document.createElement('div');
  editBtnDiv.className = 'edit_btn_div';
  const editBtnEdit = document.createElement('img');
  editBtnEdit.src = 'img/done.svg';
  editBtnEdit.addEventListener('click', () => {
    changeRecording(index);
  })
  const editBtnClose = document.createElement('img');
  editBtnClose.src = 'img/close.svg';
  editBtnClose.addEventListener('click', () => {
    closeRecording();
  })
  editBtnDiv.appendChild(editBtnEdit);
  editBtnDiv.appendChild(editBtnClose);
  activeRecording.appendChild(editInputWhere);
  activeRecording.appendChild(editInputHowMany);
  activeRecording.appendChild(editBtnDiv);

}

const deleteRecording = (index) => {
  resultSum -= Number(recordingsArray[index].howMany);
  recordingsArray.splice(index, 1);
  render();
}

inputWhere.addEventListener('change', changeInputWhere);
inputHowMany.addEventListener('change', changeinputHowMany);
button.addEventListener('click', addNewRecording);

const render = () => {
  
  const resultBlock = document.querySelector('.result_block');
  while (resultBlock.firstChild) {
    resultBlock.removeChild(resultBlock.firstChild);
  }
  const recordingBlock = document.querySelector('.recording_block');
  while (recordingBlock.firstChild) {
    recordingBlock.removeChild(recordingBlock.firstChild);
  }
  const resultTitle = document.createElement('p');
  resultTitle.className = 'result_title';
  resultTitle.innerText = `Итого: ${resultSum} р.`;
  resultBlock.appendChild(resultTitle);
  recordingsArray.forEach((item, index) => {
    const { where, howMany } = item;
    const recordingDiv = document.createElement('div');
    recordingDiv.className = 'recording_div';
    recordingDiv.id = `record_${index}`;
    const recordTitleWhere = document.createElement('p');
    recordTitleWhere.innerText = `${index + 1}) ${where}`;
    const recordTitleHowMany = document.createElement('p');
    recordTitleHowMany.innerText = `${today} ${howMany} p.`;
    const recordBtnDiv = document.createElement('div');
    recordBtnDiv.className = 'record_btn_div';
    const recordBtnEdit = document.createElement('img');
    recordBtnEdit.src = 'img/edit.svg';
    recordBtnEdit.addEventListener('click', () => {
      editRecording(index);
    })
    const recordBtnDel = document.createElement('img');
    recordBtnDel.src = 'img/back.svg';
    recordBtnDel.addEventListener('click', () => {
      deleteRecording(index);
    })
    recordBtnDiv.appendChild(recordBtnEdit);
    recordBtnDiv.appendChild(recordBtnDel);
    recordingDiv.appendChild(recordTitleWhere);
    recordingDiv.appendChild(recordTitleHowMany);
    recordingDiv.appendChild(recordBtnDiv);
    recordingBlock.appendChild(recordingDiv);
    
  });
}