window.onload = () => {
  surveyList = JSON.parse(window.sessionStorage.getItem('surveyList')) || []
  let title = document.getElementById('ques-title')
  let filloutList = document.getElementsByClassName('fillout-ques-list')[0]

  for (let surveyItem of surveyList) {
    const { id, surveyTitle, queslist } = surveyItem
    // 找出对应key的问卷，获取到queslist和title等信息
    if (id == window.sessionStorage.getItem('itemKey')) {
      title.innerText = surveyTitle
      // 添加题目对应的dom
      for (let quesItem of queslist) {
        filloutList.innerHTML += filloutContent(quesItem)
        filloutItemContent(quesItem)
      }
    }
  }

  let submitBtn = document.getElementsByClassName('submit-survey')[0]
  submitBtn.onclick = () => {
    let modal = document.getElementsByClassName('modal-wrapper')[0]
    let okBtn = document.getElementsByClassName('confirm-btn')[0]
    modal.style.display = 'block'
    okBtn.onclick = () => {
      modal.style.display = 'none'
      location.href = "/index.html"
    }
  }
}
