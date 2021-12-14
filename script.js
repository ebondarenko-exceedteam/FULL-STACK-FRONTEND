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
  // inputWhereValue = '';
  // inputHowManyValue = '';
  inputWhere.value = '';
  inputHowMany.value = '';
  console.log(recordingsArray);
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
    
    console.log(recordingBlock);
    const recordingDiv = document.createElement('div');
    recordingDiv.className = 'recording_div';
    const recordTitleWhere = document.createElement('p');
    recordTitleWhere.innerText = `${index + 1}) ${where}`;
    const recordTitleHowMany = document.createElement('p');
    recordTitleHowMany.innerText = `${today} ${howMany} p.`;
    const recordBtnDiv = document.createElement('div');
    recordBtnDiv.className = 'record_btn_div';
    const recordBtnEdit = document.createElement('img');
    recordBtnEdit.src = 'img/edit.svg';
    const recordBtnDel = document.createElement('img');
    recordBtnDel.src = 'img/back.svg';
    recordBtnDiv.appendChild(recordBtnEdit);
    recordBtnDiv.appendChild(recordBtnDel);
    recordingDiv.appendChild(recordTitleWhere);
    recordingDiv.appendChild(recordTitleHowMany);
    recordingDiv.appendChild(recordBtnDiv);
    recordingBlock.appendChild(recordingDiv);
    
  });
}