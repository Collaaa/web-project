//复用（在原题下方）
const insertAfter = (newElement, targetElement) => {
  var parent = targetElement.parentNode
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement)
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling)
  }
}
const handleCopy = (e) => {
  if (vaildNum > 10) {
    console.error('题目已超过10题')
  } else {
    let item = {}
    for (let i = 0; i < quesList.length; i++) {
      if (quesList[i].key === e) {
        item = { ...quesList[i] }   //注意这里浅拷贝和深拷贝的区别
        item.options = { ...quesList[i].options }
        item.key = ++quesNum        //复制的题目的更改key
        index = i
      }
    }
    // 向quesList中插入item，插入的位置是index+1
    quesList.splice(index + 1, 0, item)
    vaildNum += 1

    // 复制dom
    // 获取到要复制到的地方的前一个dom
    const { key, title, options, type, optionNum } = item
    let beforeDom = document.getElementsByClassName('question-wrapper')[index]
    let newDom = document.createElement('div')
    newDom.className = "question-wrapper"

    if (type === "single") {
      newDom.innerHTML = `
        Q<span class="question-key">${index + 2}</span> <span id="single-title${key}">${title}</span> 
        <ul class="ques-ul">
        </ul >
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
            <i class="iconfont icon-option">&#xe64c;</i>
            编辑选项
          </button>
        </div>       
        <div class="ques-setting">
          <button class="setting-btn" id="setting-btn-copy" onclick="handleCopy(${key})">复用</button>
          <button class="setting-btn" id="setting-btn-moveup" onclick="handleUp(${key})">上移</button>
          <button class="setting-btn" id="setting-btn-movedown" onclick="handleDown(${key})">下移</button>
          <button class="setting-btn" id="setting-btn-delete" onclick="handleRemove(${key})">删除</button>
        </div>
      `
      insertAfter(newDom, beforeDom)
      let textDom = document.createElement('span')
      textDom.innerText = ''
      insertAfter(textDom, beforeDom)

      let OptionsDom = document.getElementsByClassName('ques-ul')[index + 1]
      for (let i = 0; i < optionNum; i++) {
        let word = String.fromCharCode((i + 1) + 64)    //A是1
        OptionsDom.innerHTML += `
          <li class="ques-li">
            <input type="radio" id="single${word}${key}" name="single${key}">
            <label for="single${word}${key}" class="single-option${key}" >${options[i + 1]}</label>
          </li>
        `
      }
    } else if (type === "mutiply") {
      newDom.innerHTML = `
        Q<span class="question-key">${index + 2}</span> <span id="mutiply-title${key}">${title}</span> 
        <ul class="ques-ul">
        </ul >
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
            <i class="iconfont icon-option">&#xe64c;</i>
            编辑选项
          </button>
        </div>       
        <div class="ques-setting">
          <button class="setting-btn" id="setting-btn-copy" onclick="handleCopy(${key})">复用</button>
          <button class="setting-btn" id="setting-btn-moveup" onclick="handleUp(${key})">上移</button>
          <button class="setting-btn" id="setting-btn-movedown" onclick="handleDown(${key})">下移</button>
          <button class="setting-btn" id="setting-btn-delete" onclick="handleRemove(${key})">删除</button>
        </div>
      `
      insertAfter(newDom, beforeDom)
      let OptionsDom = document.getElementsByClassName('ques-ul')[index + 1]
      for (let i = 0; i < optionNum; i++) {
        let word = String.fromCharCode((i + 1) + 64)    //A是1
        OptionsDom.innerHTML += `
          <li class="ques-li">
            <input type="checkbox" id="mutiply${word}${key}" name="mutiply${key}">
            <label for="mutiply${word}${key}" class="mutiply-option${key}" >${options[i + 1]}</label>
          </li>
        `
      }
    } else if (type === "text") {
      newDom.innerHTML = `
        Q<span class="question-key">${index + 2}</span>
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
      `
      insertAfter(newDom, beforeDom)
    }

    // 改变后面的题目序号
    for (let j = 0; j < vaildNum; j++) {
      let questionKey = document.getElementsByClassName('question-key')[j]
      questionKey.innerText = j + 1
      quesList[j].titleNo = j + 1
    }
  }
  console.log('copy', quesList)
}

// 上移题目 (titleNo为1不可以上移)
const handleUp = (e) => {
  for (let i = 0; i < quesList.length; i++) {
    if (quesList[i].key === e) {
      index = i
    }
  }

  if (index === 0) {    //第一个不上移
    console.warn('第一个元素不可上移')
  } else {
    // 修改quesList
    let item1 = { ...quesList[index] }
    quesList[index] = { ...quesList[index - 1] }
    quesList[index - 1] = item1
    // 拿到当前点击位置的innerHtml（修改dom）
    let currentDom = document.getElementsByClassName('question-wrapper')[index]
    // 拿到当前点击位置前一个的innerHtml
    let beforeDom = document.getElementsByClassName('question-wrapper')[index - 1]

    let content = currentDom.innerHTML
    currentDom.innerHTML = beforeDom.innerHTML
    beforeDom.innerHTML = content

    //修改titleNo

    for (let j = 0; j < vaildNum; j++) {
      let questionKey = document.getElementsByClassName('question-key')[j]
      questionKey.innerText = j + 1
      quesList[j].titleNo = j + 1
    }
  }
}

// 下移题目（titleNo为validNum不可以下移）
const handleDown = (e) => {
  for (let i = 0; i < quesList.length; i++) {
    if (quesList[i].key === e) {
      index = i
    }
  }

  if (index === vaildNum - 1) {    //最后一个不下移
    console.warn('最后一题不下移')
  } else {
    // 修改quesList
    let item1 = { ...quesList[index] }
    quesList[index] = { ...quesList[index + 1] }
    quesList[index + 1] = item1
    // 拿到当前点击位置的innerHtml（修改dom）
    let currentDom = document.getElementsByClassName('question-wrapper')[index]
    // 拿到当前点击位置前一个的innerHtml
    let afterDom = document.getElementsByClassName('question-wrapper')[index + 1]

    let content = currentDom.innerHTML
    currentDom.innerHTML = afterDom.innerHTML
    afterDom.innerHTML = content

    //修改titleNo
    for (let j = 0; j < vaildNum; j++) {
      let questionKey = document.getElementsByClassName('question-key')[j]
      questionKey.innerText = j + 1
      quesList[j].titleNo = j + 1
    }
  }
}

//删除题目  不修改key，修改titleNo
const handleRemove = (e) => {
  // 找出对应的下标
  for (let i = 0; i < quesList.length; i++) {
    if (quesList[i].key === e) {
      index = i
    }
  }
  // 打开模态框
  let modal = document.getElementsByClassName('modal-wrapper')[2]
  modal.style.display = "block"

  // 取消删除
  let cancel = document.getElementsByClassName('cancel-btn')[0]
  let close = document.getElementsByClassName('close-icon')[2]

  const handleClose = () => {
    modal.style.display = "none"
  }

  cancel.onclick = handleClose
  close.onclick = handleClose

  // 从dom中删除题目
  let quesDomList = document.getElementById('question-list-add')
  //确认删除
  let confirm = document.getElementsByClassName('confirm-btn')[0]
  confirm.onclick = () => {
    // 题目数减一
    vaildNum -= 1
    // 从quesList中删除这道题
    quesList.splice(index, 1)
    // 从dom中删除这道题
    quesDomList.removeChild(quesDomList.childNodes[index * 2])
    quesDomList.removeChild(quesDomList.childNodes[index * 2])
    // 重新排列标号，以及
    for (let j = 0; j < vaildNum; j++) {
      let questionKey = document.getElementsByClassName('question-key')[j]
      questionKey.innerText = j + 1
      quesList[j].titleNo = j + 1
    }
    // 关闭模态框
    handleClose()
  }
}

// 改变文本题的是否强制填写
const handleMandatory = (e) => {
  for (let item of quesList) {
    if (item.key === e) {
      item.isMandatory = !item.isMandatory
    }
  }
}