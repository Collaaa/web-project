// 填写问卷部分的dom
const quesListContent = (item) => {
  const { titleNo, key, title, type } = item
  let content = ''
  if (type === 'single') {
    content = `
      <div class="question-wrapper">
        Q<span class="question-key">${titleNo}</span> <span id="single-title${key}">${title}</span> 
        <ul class="ques-ul">
        </ul>
        <div class="option-btn">
          <button class="operate-btn" id="add-option-btn${key}" onclick="addOptions(${key})">
            <i class="iconfont icon-option">&#xe64d;</i>
            添加选项
          </button>
          <button class="operate-btn" id="delete-option-btn${key}" onclick="removeOptions(${key})">
            <i class="iconfont icon-option">&#xe64c;</i>
            删除选项
          </button>
          <button class="operate-btn" id="edit-option-btn${key}" onclick="editOptions(${key})">
            <i class="iconfont icon-option">&#xe8ac;</i>
            编辑选项
          </button>
        </div>       
        <div class="ques-setting">
          <button class="setting-btn" id="setting-btn-copy" onclick="handleCopy(${key})">复用</button>
          <button class="setting-btn" id="setting-btn-moveup" onclick="handleUp(${key})">上移</button>
          <button class="setting-btn" id="setting-btn-movedown" onclick="handleDown(${key})">下移</button>
          <button class="setting-btn" id="setting-btn-delete" onclick="handleRemove(${key})">删除</button>
        </div>
      </div>
    `
  } else if (type === 'mutiply') {
    content = `
      <div class="question-wrapper">
        Q<span class="question-key">${titleNo}</span> 
        <span id="mutiply-title${key}">${title}</span> 
        <ul class="ques-ul">
        </ul>
        <div class="option-btn">
          <button class="operate-btn" id="add-option-btn${key}" onclick="addOptions(${key})">
            <i class="iconfont icon-option">&#xe64d;</i>
            添加选项
          </button>
          <button class="operate-btn" id="delete-option-btn${key}" onclick="removeOptions(${key})">
            <i class="iconfont icon-option">&#xe64c;</i>
            删除选项
          </button>
          <button class="operate-btn" id="edit-option-btn${key}" onclick="editOptions(${key})">
            <i class="iconfont icon-option">&#xe8ac;</i>
            编辑选项
          </button>
        </div>       
        <div class="ques-setting">
          <button class="setting-btn" id="setting-btn-copy" onclick="handleCopy(${key})">复用</button>
          <button class="setting-btn" id="setting-btn-moveup" onclick="handleUp(${key})">上移</button>
          <button class="setting-btn" id="setting-btn-movedown" onclick="handleDown(${key})">下移</button>
          <button class="setting-btn" id="setting-btn-delete" onclick="handleRemove(${key})">删除</button>
        </div>
      </div>
    `
  } else if (type === 'text') {
    content = `
      <div class="question-wrapper">
        Q<span class="question-key">${titleNo}</span>
        <span id="text-title${key}">${title}</span>
        <div class="mandatory-checkbox" onclick="handleMandatory(${key})">
          <input type="checkbox" id="isMandatory">
          <label for="isMandatory">此题是否必填</label>
        </div>
        <ul class="ques-ul">
          <li class="ques-li">
            <textarea placeholder="" class="text-content"></textarea>
          </li>
        </ul>
        <button class="operate-btn" id="edit-option-btn${key}" onclick="editTitle(${key})">
          <i class="iconfont icon-option">&#xe8ac;</i>
          修改标题
        </button>
        <div class="ques-setting">
          <button class="setting-btn" id="setting-btn-copy" onclick="handleCopy(${key})">复用</button>
          <button class="setting-btn" id="setting-btn-moveup" onclick="handleUp(${key})">上移</button>
          <button class="setting-btn" id="setting-btn-movedown" onclick="handleDown(${key})">下移</button>
          <button class="setting-btn" id="setting-btn-delete" onclick="handleRemove(${key})">删除</button>
        </div>
      </div>
    `
  }
  return content
}

const quesItemContent = (item) => {
  const { titleNo, key, type } = item
  if (type === 'single') {
    const { options, optionNum } = item
    let optionsDom = document.getElementsByClassName('ques-ul')[titleNo - 1]
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
    let optionsDom = document.getElementsByClassName('ques-ul')[titleNo - 1]
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
    const { isMandatory } = item
    let mandatory = document.getElementById('isMandatory')
    if (isMandatory === true) {
      mandatory.checked = true
    }
  }
}