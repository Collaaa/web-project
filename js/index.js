window.onload = () => {
  // 页面之间的js不是互通的
  surveyList = JSON.parse(window.sessionStorage.getItem('surveyList')) || []
  // 显示有问卷的时候的情况
  let border = document.getElementsByClassName('ques-list-title')[0]
  let empty = document.getElementsByClassName('ques-list-empty-wrapper')[0]
  let proper = document.getElementsByClassName('ques-list-proper')[0]
  let surveyCount = document.getElementById('survey-count')
  let list = document.getElementsByClassName('ques-list-wrapper')[0]
  let deleteAll = document.getElementsByClassName('delete-all')[0]

  // 一开始就渲染
  if (surveyList.length === 0) {
    empty.style.display = "block"
    border.style.borderBottom = "1px solid rgb(220, 222, 224)"
    proper.style.display = "none"
  } else {
    border.style.borderBottom = "none"
    empty.style.display = "none"
    proper.style.display = "block"
    surveyNum = 0
    for (let item of surveyList) {
      const { deleteStatus } = item
      if (deleteStatus === false) {
        list.innerHTML += listContent(item)
        surveyNum += 1
      }
    }
    surveyCount.innerText = surveyNum
  }

  //回收站和我的问卷切换 
  let allSurvey = document.getElementsByClassName('sidebar-li')[0]  //全部问卷
  let recycleBin = document.getElementsByClassName('sidebar-li')[1]   //回收站
  let quesListTitle = document.getElementsByClassName('ques-list-title')[0]
  let loading = document.getElementsByClassName('loading-wrapper')[0]
  let allSurveyWord = document.getElementById('sidebar-all')
  let recycleBinWord = document.getElementById('sidebar-rm')
  let timer1 = undefined
  let timer2 = undefined

  allSurvey.onclick = () => {
    quesListTitle.innerText = "我的问卷"
    proper.style.display = 'none'
    //改背景
    allSurvey.style.backgroundColor = 'rgb(226, 231, 234)'
    allSurveyWord.style.fontWeight = 700
    recycleBin.style.backgroundColor = 'rgba(0,0,0,0)'
    recycleBinWord.style.fontWeight = 400
    if (surveyList.length !== 0) {
      // 展示loading效果,隐藏列表和属性
      list.innerHTML = ''
      list.style.display = 'none'
      loading.style.display = 'block'
      clearTimeout(timer2)
      timer1 = setTimeout(() => {
        // 展示问卷
        loading.style.display = 'none'
        list.style.display = 'block'
        deleteAll.style.display = 'block'
        // 改变list的innerHTML
        proper.style.display = 'block'
        surveyNum = 0
        for (let item of surveyList) {
          const { deleteStatus } = item
          if (deleteStatus === false) {
            list.innerHTML += listContent(item)
            surveyNum += 1
          }
        }
        surveyCount.innerText = surveyNum
      }, 1000)
    } else {
      console.log(1)
    }
  }

  recycleBin.onclick = () => {
    quesListTitle.innerText = "回收站"
    proper.style.display = 'none'
    //改背景
    allSurvey.style.backgroundColor = 'rgba(0,0,0,0)'
    allSurveyWord.style.fontWeight = 400
    recycleBin.style.backgroundColor = 'rgb(226, 231, 234)'
    recycleBinWord.style.fontWeight = 700
    if (surveyList.length !== 0) {
      loading.style.display = 'block'
      list.innerHTML = ''
      list.style.display = 'none'
      clearTimeout(timer1)  //清除定时器
      timer2 = setTimeout(() => {
        loading.style.display = 'none'
        // 改变list的innerHTML
        proper.style.display = 'block'
        deleteAll.style.display = 'none'
        surveyNum = 0
        for (let item of surveyList) {
          const { deleteStatus } = item
          if (deleteStatus === true) {
            list.innerHTML += deleteListContent(item)
            surveyNum += 1
          }
        }
        surveyCount.innerText = surveyNum
        // 展示已经删除的问卷
        list.style.display = 'block'
      }, 1000)
    }
  }
}