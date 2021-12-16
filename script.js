let recordingsArray = [];
let inputWhereValue = '';
let inputHowManyValue = '';
let inputDateValue = '';
let resultSum = 0;
let inputWhere = null;
let inputHowMany = null;
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
today = `${dd}.${mm}.${yyyy}`;

window.onload = async () => {
  inputWhere = document.getElementById('input_where');
  inputHowMany = document.getElementById('input_how_many');
  const button = document.querySelector('button');
  inputWhere.addEventListener('change', changeInputWhere);
  inputHowMany.addEventListener('change', changeinputHowMany);
  button.addEventListener('click', addNewRecording);
  const resp = await fetch('http://localhost:8800/getAllCharges', { method: 'GET'});
  const fetchResult = await resp.json();
  recordingsArray = fetchResult.data;
  render();
}

const changeInputWhere = (event) => {
  inputWhereValue = event.target.value;
}

const changeinputHowMany = (event) => {
  inputHowManyValue = event.target.value;
}

const addNewRecording = async () => {
  const resp = await fetch('http://localhost:8800/addedCharges', {
    method: 'POST',
    headers: {
			"Content-Type": 'application/json; charset=utf-8',
			'Access-Control-Allow-Origin': '*'
		},
    body: JSON.stringify({
      date: today,
      where: inputWhereValue,
      howMany: +inputHowManyValue
    })
  });
  const fetchResult = await resp.json();
  recordingsArray = fetchResult.data;
  resultSum += +inputHowManyValue;
  inputWhere.value = '';
  inputHowMany.value = '';
  render();
}

const changeRecording = async (index) => {
  const { _id, howMany } = recordingsArray[index];
  const resp = await fetch ('http://localhost:8800/updateCharges', {
    method: 'PATCH',
    headers: {
			"Content-Type": 'application/json; charset=utf-8',
			'Access-Control-Allow-Origin': '*'
		},
    body: JSON.stringify({
      _id,
      where: inputWhereValue,
      howMany: inputHowManyValue
    })
  });
  const fetchResult = await resp.json();
  recordingsArray = fetchResult.data;
  resultSum -= Number(howMany);
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

const deleteRecording = async (index) => {
  const resp = await fetch(`http://localhost:8800/deleteCharges?_id=${recordingsArray[index]._id}`, { method: 'DELETE'});
  const fetchResult = await resp.json();
  recordingsArray = fetchResult.data;
  render();
}

const newChangeInputWhere = async (event, index) => {
  inputWhereValue = event.target.value;
  const resp = await fetch ('http://localhost:8800/updateCharges', {
    method: 'PATCH',
    headers: {
			"Content-Type": 'application/json; charset=utf-8',
			'Access-Control-Allow-Origin': '*'
		},
    body: JSON.stringify({
      _id: recordingsArray[index]._id,
      where: inputWhereValue
    })
  });
  const fetchResult = await resp.json();
  recordingsArray = fetchResult.data;
  render();
};

const newChangeInputDate = async (event, index) => {
  inputDateValue = event.target.value;
  const resp = await fetch ('http://localhost:8800/updateCharges', {
    method: 'PATCH',
    headers: {
			"Content-Type": 'application/json; charset=utf-8',
			'Access-Control-Allow-Origin': '*'
		},
    body: JSON.stringify({
      _id: recordingsArray[index]._id,
      date: inputDateValue
    })
  });
  const fetchResult = await resp.json();
  recordingsArray = fetchResult.data;
  render();
};

const editTitleWhere = (index) => {
  const recordingDiv = document.getElementById(`record_${index}`);
  let recordTitleWhere = recordingDiv.firstChild;
  const newInputEditWhere = document.createElement('input');
  newInputEditWhere.id = 'new_input_edit_where';
  newInputEditWhere.type = 'text';
  newInputEditWhere.value = recordingsArray[index].where;
  recordTitleWhere = recordingDiv.replaceChild(newInputEditWhere, recordTitleWhere);
  newInputEditWhere.addEventListener('blur', () => {
    newChangeInputWhere(event, index);
  })
}

const editTitleDate = (index) => {
  const recordTitleBox = document.getElementById(`title_box_${index}`);
  let recordTitleDate = recordTitleBox.firstChild;
  const newInputEditDate = document.createElement('input');
  newInputEditDate.id = 'new_input_edit_date';
  newInputEditDate.id = 'new_input_edit_date';
  newInputEditDate.value = recordingsArray[index].date;
  recordTitleDate = recordTitleBox.replaceChild(newInputEditDate, recordTitleDate);
  newInputEditDate.addEventListener('blur', () => {
    newChangeInputDate(event, index);
  })
}

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
  resultSum = 0;
  recordingsArray.forEach(item => {
    resultSum += item.howMany
  })
  resultTitle.innerText = `Итого: ${resultSum} р.`;
  resultBlock.appendChild(resultTitle);
  recordingsArray.forEach((item, index) => {
    const { date, where, howMany } = item;
    const recordingDiv = document.createElement('div');
    recordingDiv.className = 'recording_div';
    recordingDiv.id = `record_${index}`;
    const recordTitleWhere = document.createElement('p');
    recordTitleWhere.className = 'record_title_where';
    recordTitleWhere.innerText = `${index + 1}) ${where}`;
    recordTitleWhere.addEventListener('dblclick', () => {
      editTitleWhere(index);
    });
    const recordTitleBox = document.createElement('div');
    recordTitleBox.className = 'record_title_box';
    recordTitleBox.id = `title_box_${index}`;
    const recordTitleDate = document.createElement('p');
    recordTitleDate.innerText = date;
    recordTitleDate.className = 'record_title_date';
    recordTitleDate.addEventListener('dblclick', () => {
      editTitleDate(index);
    });
    const recordTitleHowMany = document.createElement('p');
    recordTitleHowMany.className = 'record_title_how_many';
    recordTitleHowMany.innerText = `${howMany} p.`;
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
    recordTitleBox.appendChild(recordTitleDate);
    recordTitleBox.appendChild(recordTitleHowMany);
    recordTitleBox.appendChild(recordBtnDiv);
    recordingDiv.appendChild(recordTitleBox);
    recordingBlock.appendChild(recordingDiv);
  });
}