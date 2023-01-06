//总题数不能超过10
// 添加选项
const addOptions = (e) => {   //e是key
  // ①把optionNum和options分解出来
  // 找出对应的key
  for (let i = 0; i < quesList.length; i++) {
    if (quesList[i].key === e) {
      index = i
    }
  }
  let { optionNum, options, type, titleNo } = quesList[index]
  optionNum += 1
  // ②给options添加一对新属性,定义word
  let word = String.fromCharCode((optionNum) + 64)
  options[optionNum] = `选项${word}`
  // ③获取到对应的ul，加上一段新代码
  let newOption = document.getElementsByClassName('ques-ul')[titleNo - 1]
  let newContent = ''
  if (type === 'single') {
    newContent = `
        <li class="ques-li">
          <input type="radio" id="single${word}${e}" name="single${e}">
          <label for="single${word}${e}" class="single-option${e}">${options[optionNum]}</label>
        </li>`
  } else if (type === 'mutiply') {
    newContent = `
    <li class="ques-li">
      <input type="checkbox" id="mutiply${word}${e}" name="mutiply${e}">
      <label for="mutiply${word}${e}" class="mutiply-option${e}">${options[optionNum]}</label>
    </li>`
  }

  newOption.innerHTML += newContent
  // ④更新quesList
  quesList[index] = { ...quesList[index], optionNum, options }
}
// 删除选项
const removeOptions = (e) => {
  for (let i = 0; i < quesList.length; i++) {
    if (quesList[i].key === e) {
      index = i
    }
  }
  //将optionNum和options解构出来
  let { optionNum, options } = quesList[index]
  // 判断optionNum是否大于0，不是就抛出异常，是就继续进行删除
  if (optionNum > 0) {
    // ①删除options的最后一个选项,optionNum减一
    delete options[optionNum--]
    // ②获取ul，删除对应的dom，定义index，ul的childnode比较特殊
    let newOption = document.getElementsByClassName('ques-ul')[index]
    let len = newOption.childNodes.length - 1
    /* 如果len为0，（这种情况只出现在没有添加过选项就进行删除选项）
    说明childNodes中还有最后一个元素 */
    newOption.removeChild(newOption.childNodes[len--])
    newOption.removeChild(newOption.childNodes[len--])
  } else {
    console.error('已经没有结点了')
  }
  // 更新quesList
  quesList[index] = { ...quesList[index], optionNum, options }
}

// 编辑选项
const editOptions = (e) => {
  // 打开模态框
  let modal = document.getElementsByClassName('modal-wrapper')[1]
  modal.style.display = "block"

  // 关闭模态框，删掉所有节点
  let close = document.getElementsByClassName('close-icon')[1]

  const handleClose = () => {
    modal.style.display = "none"
    let len = editInputList.childNodes.length
    // 清除节点
    for (let j = len - 1; j >= 0; j--) {
      editInputList.removeChild(editInputList.childNodes[j])
    }
  }

  close.onclick = handleClose

  //找出对应的
  for (let i = 0; i < quesList.length; i++) {
    if (quesList[i].key === e) {
      index = i
    }
  }
  let { optionNum, options, title, type } = quesList[index]
  let editInputList = document.getElementsByClassName('edit-list')[0]
  // 加入标题
  editInputList.innerHTML += `
    <div class="edit-item">
      <div class="edit-item-title">标题</div>
      <input type="text" class="edit-input" value="${title}">
    </div>
    `
  //加入节点
  for (let i = 1; i <= optionNum; i++) {
    editInputList.innerHTML += `
    <div class="edit-item">
      <div class="edit-item-title">选项${i} </div>
      <input type="text" class="edit-input" value="${options[i]}" id="edit-input${i}">
    </div>
    `
  }

  // 给input的value和quesList进行关联上
  for (let i = 0; i < optionNum + 1; i++) {
    // 获得input中的新value值,赋给option对应的属性
    let editInput = document.getElementsByClassName('edit-input')[i]
    if (i === 0) {     //是标题
      editInput.oninput = () => {
        if (editInput.value !== "") {
          title = editInput.value
          quesList[index] = { ...quesList[index], title }
        }
      }
    } else {
      editInput.oninput = () => {
        if (editInput.value !== "") {
          options[i] = editInput.value
          quesList[index] = { ...quesList[index], options }
        }
      }
    }
  }

  //保存：删除掉edit-list中所有的节点，修改题目中的值
  let save = document.getElementsByClassName('save-btn')[0]
  save.onclick = () => {
    // 修改标题
    if (type === "single") {
      let singleTitle = document.getElementById(`single-title${e}`)
      singleTitle.innerText = title
      // 修改选项的值，获得所有label
      for (let i = 0; i < optionNum; i++) {
        let label = document.getElementsByClassName(`single-option${e}`)[i]
        label.innerText = options[i + 1]
      }
    } else if (type === 'mutiply') {
      let mutiplyTitle = document.getElementById(`mutiply-title${e}`)
      mutiplyTitle.innerText = title
      for (let i = 0; i < optionNum; i++) {
        let label = document.getElementsByClassName(`mutiply-option${e}`)[i]
        label.innerText = options[i + 1]
      }
    }
    // 清除节点
    handleClose()
  }
}
// 文本题
const editTitle = (e) => {
  // 打开模态框
  let modal = document.getElementsByClassName('modal-wrapper')[1]
  modal.style.display = "block"

  // 关闭模态框，删掉所有节点
  let close = document.getElementsByClassName('close-icon')[1]

  const handleClose = () => {
    modal.style.display = "none"
    let len = editInputList.childNodes.length
    // 清除节点
    for (let j = len - 1; j >= 0; j--) {
      editInputList.removeChild(editInputList.childNodes[j])
    }
  }

  close.onclick = handleClose

  //找出对应的
  for (let i = 0; i < quesList.length; i++) {
    if (quesList[i].key === e) {
      index = i
    }
  }
  let { title } = quesList[index]

  let editInputList = document.getElementsByClassName('edit-list')[0]
  // 加入标题
  editInputList.innerHTML += `
    <div class="edit-item">
      <div class="edit-item-title">标题</div>
      <input type="text" class="edit-input" value="${title}">
    </div>
  `

  let editInput = document.getElementsByClassName('edit-input')[0]
  editInput.oninput = () => {
    if (editInput.value !== "") {
      title = editInput.value
      quesList[index] = { ...quesList[index], title }
    }
  }

  let save = document.getElementsByClassName('save-btn')[0]
  save.onclick = () => {
    let textTitle = document.getElementById(`text-title${e}`)
    textTitle.innerText = title
    handleClose()
  }
}