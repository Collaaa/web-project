window.onload = () => {
  let designEnter = document.getElementsByClassName('ques-design-enter')[0]
  let designWrapper = document.getElementsByClassName('ques-design-body-wrapper')[0]
  let quesTitle = document.getElementById('ques-title')
  let qList = document.getElementById('question-list-add')
  // 进来这个页面判断是什么状态   0是第一次设计问卷，1是编辑问卷
  if (window.sessionStorage.getItem('state') === '1') { //getItem的返回值类型是string
    designEnter.style.display = 'none'
    designWrapper.style.display = 'block'
    surveyList = JSON.parse(window.sessionStorage.getItem('surveyList')) || []
    for (let item of surveyList) {
      if (item.id == window.sessionStorage.getItem('itemKey')) {
        quesTitle.innerText = item.surveyTitle
        for (let i of item.queslist) {
          //添加dom
          qList.innerHTML += quesListContent(i)
          quesItemContent(i)
          //修改题数和把item都加入quesList中
          vaildNum += 1
          quesList.push(i)
        }
        quesNum = item.queslist.length
      }
    }
  }
  // 1.获取到输入框中的标题，并给创建问卷的界面
  let title = document.getElementById('title')
  title.oninput = () => {
    if (title.value !== "") {
      empty_one.style.opacity = 0
    }
  }

  // 2.起好名字后到创建问卷的界面
  // 切换到问卷页面
  let create = document.getElementById('ques-create')
  let empty_one = document.getElementById('be-empty-one')

  create.onclick = () => {
    if (title.value === "") {
      empty_one.style.opacity = 1
    } else {
      designWrapper.style.display = "block"
      designEnter.style.display = "none"
      quesTitle.innerHTML = title.value
    }
  }

  //重新命名标题
  let editTitle = document.getElementById('title-edit')
  let editIcon = document.getElementById('rename-icon')
  let newTitle = document.getElementById('title-edit-input')
  let confirm = document.getElementById('confirm')
  let cancel = document.getElementById('cancel')
  let empty_two = document.getElementById('be-empty-two')

  editIcon.onclick = () => {
    quesTitle.style.display = "none"
    editTitle.style.display = "block"
    newTitle.value = ""
  }
  confirm.onclick = () => {
    if (newTitle.value === "") {
      empty_two.style.opacity = 1
    } else {
      empty_two.style.opacity = 0
      quesTitle.innerHTML = newTitle.value
      quesTitle.style.display = "inline-block"
      editTitle.style.display = "none"
    }
  }
  cancel.onclick = () => {
    empty_two.style.opacity = 0
    quesTitle.style.display = "inline-block"
    editTitle.style.display = "none"
  }

  //模态框部分（做选择题型部分）
  let open = document.getElementsByClassName('add-ques-wrapper')[0]
  let close = document.getElementsByClassName('close-icon')[0]
  let modal = document.getElementsByClassName('modal-wrapper')[0]

  // 打开选择题型
  open.onclick = () => {
    modal.style.display = "block"
  }
  // 关闭选择题型
  close.onclick = () => {
    modal.style.display = "none"
  }

  // 保存问卷，发布问卷和截止时间
  dateFunction()
}