window.onload = () => {
  surveyList = JSON.parse(window.sessionStorage.getItem('surveyList')) || []
  let title = document.getElementById('ques-title')
  let filloutList = document.getElementsByClassName('fillout-ques-list')[0]

  for (let surveyItem of surveyList) {
    const { id, surveyTitle, queslist } = surveyItem
    let quesNumSum = 0
    // 找出对应key的问卷，获取到queslist和title等信息
    if (id == window.sessionStorage.getItem('itemKey')) {
      title.innerText = surveyTitle
      // 添加题目对应的dom
      for (let quesItem of queslist) {
        const { optionNum, type } = quesItem
        const arrSingle = new Array(optionNum).fill(0)
        const arrMutiply = new Array(optionNum).fill(0)
        let proportion = 0
        // 此处需要进行数据模拟,随机数
        if (type === 'single') {
          for (let i = 0; i < 100; i++) {
            let num = parseInt(Math.random() * optionNum)
            arrSingle[num]++
          }
        } else if (type === 'mutiply') {
          for (let i = 0; i < optionNum; i++) {
            arrMutiply[i] = Math.floor(Math.random() * 89 + 10)
          }
        } else if (type === 'text') {
          proportion = Math.floor(Math.random() * 89 + 10)
        }
        filloutList.innerHTML += dataContent(quesItem)
        dataItemContent(quesItem, arrSingle, arrMutiply, proportion)
        quesNumSum = dataDetail(quesItem, arrSingle, arrMutiply, quesNumSum, proportion)
      }
    }
  }

  let backBtn = document.getElementsByClassName('back-btn')[0]
  backBtn.onclick = () => {
    location.href = "/index.html"
  }
}