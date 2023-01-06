//删除问卷
const deleteSurvey = (key) => {
  surveyList = JSON.parse(window.sessionStorage.getItem('surveyList')) || []
  let deleteModal = document.getElementsByClassName('modal-wrapper')[0]
  let cancelBtn = document.getElementsByClassName('cancel-btn')[0]
  let confirmBtn = document.getElementsByClassName('confirm-btn')[0]
  let closeIcon = document.getElementsByClassName('close-icon')[0]
  let list = document.getElementsByClassName('ques-list-wrapper')[0]
  let surveyCount = document.getElementById('survey-count')
  let deleteAll = document.getElementsByClassName('delete-all')[0]

  deleteModal.style.display = 'block'
  cancelBtn.onclick = () => {
    deleteModal.style.display = 'none'
  }
  closeIcon.onclick = () => {
    deleteModal.style.display = 'none'
  }
  confirmBtn.onclick = () => {
    deleteModal.style.display = 'none'
    list.innerHTML = ''
    surveyNum = 0
    for (let item of surveyList) {
      if (item.id == key) {
        item.deleteStatus = true
      }
      if (item.deleteStatus === false) {
        list.innerHTML += listContent(item)
        surveyNum += 1
      }
    }
    if (surveyNum === 0) {
      deleteAll.style.display = 'none'
    }
    surveyCount.innerText = surveyNum
    window.sessionStorage.setItem('surveyList', JSON.stringify(surveyList))
  }
}

//删除所有问卷
const deleteAllSurvey = () => {
  surveyList = JSON.parse(window.sessionStorage.getItem('surveyList')) || []
  let deleteModalAll = document.getElementsByClassName('modal-wrapper')[1]
  let cancelBtn = document.getElementsByClassName('cancel-btn')[1]
  let confirmBtn = document.getElementsByClassName('confirm-btn')[1]
  let closeIcon = document.getElementsByClassName('close-icon')[1]
  let list = document.getElementsByClassName('ques-list-wrapper')[0]
  let deleteAll = document.getElementsByClassName('delete-all')[0]
  let surveyCount = document.getElementById('survey-count')

  deleteModalAll.style.display = 'block'
  cancelBtn.onclick = () => {
    deleteModalAll.style.display = 'none'
  }
  closeIcon.onclick = () => {
    deleteModalAll.style.display = 'none'
  }
  confirmBtn.onclick = () => {
    deleteModalAll.style.display = 'none'
    //从surveyList删掉所有的元素（把deleteStatus属性置为true）
    for (let item of surveyList) {
      item.deleteStatus = true
    }
    // 将列表置空
    list.innerHTML = ''
    // 将问卷总数置为0
    surveyCount.innerText = 0
    // 将全部删除按钮去掉
    deleteAll.style.display = 'none'
    console.log(surveyList)
    window.sessionStorage.setItem('surveyList', JSON.stringify(surveyList))
  }
}

//恢复问卷
const resolveSurvey = (key) => {
  surveyList = JSON.parse(window.sessionStorage.getItem('surveyList')) || []
  let resolveModal = document.getElementsByClassName('modal-wrapper')[2]
  let cancelBtn = document.getElementsByClassName('cancel-btn')[2]
  let confirmBtn = document.getElementsByClassName('confirm-btn')[2]
  let closeIcon = document.getElementsByClassName('close-icon')[2]
  let list = document.getElementsByClassName('ques-list-wrapper')[0]
  let surveyCount = document.getElementById('survey-count')

  resolveModal.style.display = 'block'
  cancelBtn.onclick = () => {
    resolveModal.style.display = 'none'
  }

  closeIcon.onclick = () => {
    resolveModal.style.display = 'none'
  }

  confirmBtn.onclick = () => {
    resolveModal.style.display = 'none'
    list.innerHTML = ''
    surveyNum = 0
    for (let item of surveyList) {
      if (item.id == key) {
        item.deleteStatus = false
      }
      //改list
      if (item.deleteStatus === true) {
        list.innerHTML += deleteListContent(item)
        surveyNum += 1
      }
    }
    surveyCount.innerText = surveyNum
    window.sessionStorage.setItem('surveyList', JSON.stringify(surveyList))
  }
}