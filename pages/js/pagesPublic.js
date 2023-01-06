//fillout
const filloutContent = (item) => {
  const { type, titleNo, key, title } = item
  let content = ''
  if (type === 'single') {
    content = `
      <div class="question-wrapper">
        Q<span class="question-key">${titleNo}</span>
        <span id="single-title${key}">${title}</span>
        <ul class="ques-ul">
        </ul>
      </div>
    `
  } else if (type === 'mutiply') {
    content = `
      <div class="question-wrapper">
        Q<span class="question-key">${titleNo}</span>
        <span id="mutiply-title${key}">${title}</span>
        <ul class="ques-ul">
        </ul>
      </div>
    `
  } else if (type === 'text') {
    content = `
      <div class="question-wrapper">
        Q<span class="question-key">${titleNo}</span>
        <span id="text-title${key}">${title}</span>
        <ul class="ques-ul">
        </ul>
      </div>
    `
  }
  return content
}

const filloutItemContent = (item) => {
  const { type, titleNo, key } = item
  let optionsDom = document.getElementsByClassName('ques-ul')[titleNo - 1]
  if (type === 'single') {
    const { options, optionNum } = item
    for (let i = 0; i < optionNum; i++) {
      let word = String.fromCharCode((i + 1) + 64)    //A是1
      optionsDom.innerHTML += `
        <li class="ques-li">
          <input type="radio" id="single${word}${key}" name="single${key}">
          <label for="single${word}${key}" class="single-option${key}" >${options[i + 1]}</label>
        </li>
      `
    }
  } else if (type === 'mutiply') {
    const { options, optionNum } = item
    for (let i = 0; i < optionNum; i++) {
      let word = String.fromCharCode((i + 1) + 64)    //A是1
      optionsDom.innerHTML += `
        <li class="ques-li">
          <input type="checkbox" id="mutiply${word}${key}" name="mutiply${key}">
          <label for="mutiply${word}${key}" class="mutiply-option${key}" >${options[i + 1]}</label>
        </li>
      `
    }
  } else if (type === 'text') {
    let optionsDom = document.getElementsByClassName('ques-ul')[titleNo - 1]
    optionsDom.innerHTML += `
      <li class="ques-li">
        <textarea placeholder="" class="text-content"></textarea>
      </li>
    `
  }
}

//surveydata
const dataContent = (item) => {
  const { type, titleNo, key, title } = item
  let content = ''
  if (type === 'single') {
    content = `
      <div class="question-wrapper">
        Q<span class="question-key">${titleNo}</span>
        <span id="single-title${key}">${title}</span>
        <div class="data-title">数据占比</div>
        <ul class="ques-ul">
        </ul>
      </div>
    `
  } else if (type === 'mutiply') {
    content = `
      <div class="question-wrapper">
        Q<span class="question-key">${titleNo}</span>
        <span id="mutiply-title${key}">${title}</span>
        <div class="data-title">数据占比</div>
        <ul class="ques-ul">
        </ul>
      </div>
    `
  } else if (type === 'text') {
    content = `
      <div class="question-wrapper">
        Q<span class="question-key">${titleNo}</span>
        <span id="text-title${key}">${title}</span>
        <div class="data-title">有效回答占比</div>
        <ul class="ques-ul">
        </ul>
      </div>
    `
  }
  return content
}

const dataItemContent = (item, arr1, arr2, proportion) => {
  const { type, titleNo, key } = item
  let optionsDom = document.getElementsByClassName('ques-ul')[titleNo - 1]
  if (type === 'single') {
    const { options, optionNum } = item
    for (let i = 0; i < optionNum; i++) {
      let word = String.fromCharCode((i + 1) + 64)    //A是1
      optionsDom.innerHTML += `
        <li class="ques-li">
          <label for="single${word}${key}" class="single-option${key} data-item" >${options[i + 1]}</label>
          <div class="pull-right">
            <div class="view-item">
              <div class="proporion-square"></div>
            </div>
            <span class="proporion-num">${arr1[i]}%</span>
          </div>
        </li>
      `
    }
  } else if (type === 'mutiply') {
    const { options, optionNum } = item
    for (let i = 0; i < optionNum; i++) {
      let word = String.fromCharCode((i + 1) + 64)    //A是1
      optionsDom.innerHTML += `
        <li class="ques-li">
          <label for="mutiply${word}${key}" class="mutiply-option${key} data-item" >${options[i + 1]}</label>
          <div class="pull-right">
            <div class="view-item">
              <div class="proporion-square"></div>
            </div>
            <span class="proporion-num">${arr2[i]}%</span>
          </div>
        </li>        
      `
    }
  } else if (type === 'text') {
    let optionsDom = document.getElementsByClassName('ques-ul')[titleNo - 1]
    optionsDom.innerHTML += `
      <div class="pull-right text-propor">
        <div class="view-item">
          <div class="proporion-square"></div>
        </div>
        <span class="proporion-num">${proportion}%</span>
      </div>
    `
  }
}

const dataDetail = (item, arr1, arr2, sum, proportion) => {
  const { type, optionNum } = item
  if (type === 'single') {
    for (let i = 0; i < optionNum; i++) {
      let singleProportion = document.getElementsByClassName('proporion-square')[sum++]
      let width = arr1[i] * 0.01 * 270
      singleProportion.style.width = width + 'px'
    }
  } else if (type === 'mutiply') {
    for (let i = 0; i < optionNum; i++) {
      let singleProportion = document.getElementsByClassName('proporion-square')[sum++]
      let width = arr2[i] * 0.01 * 270
      singleProportion.style.width = width + 'px'
    }
  } else if (type === 'text') {
    let singleProportion = document.getElementsByClassName('proporion-square')[sum++]
    let width = proportion * 0.01 * 270
    singleProportion.style.width = width + 'px'
  }
  return sum
}