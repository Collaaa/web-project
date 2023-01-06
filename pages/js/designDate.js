//获取当前的日期和时间
const repair = (i) => {
  if (i >= 0 && i <= 9) {
    return "0" + i
  } else {
    return i
  }
}

const currentTime = () => {
  let date = new Date()
  let year = date.getFullYear() //年
  let month = repair(date.getMonth() + 1)//月
  let day = repair(date.getDate())//日
  let hour = repair(date.getHours())//时
  let minute = repair(date.getMinutes())//分
  let second = repair(date.getSeconds())//秒

  //当前时间
  return curTime = year + "年" + month + "月" + day + "日 "
    + hour + ":" + minute + ":" + second
}

const currentDay = () => {
  let date = new Date()
  let year = date.getFullYear() //年
  let month = repair(date.getMonth() + 1)//月
  let day = repair(date.getDate())//日

  return curDay = year + '-' + month + '-' + day
}

const dateFunction = () => {
  //日期
  let quesTitle = document.getElementById('ques-title')
  let inputDate = document.getElementById('input-date')
  let save = document.getElementById('save-paper')    //保存问卷
  let publish = document.getElementById('publish-paper')  //发布问卷
  let modal2 = document.getElementsByClassName('modal-wrapper')[3]
  let close2 = document.getElementsByClassName('close-icon')[3]
  let okbtn = document.getElementsByClassName('ok-btn')[0]
  let savePage = document.getElementById('after-save')
  let designPage = document.getElementsByClassName('ques-design-body-wrapper')[0]
  inputDate.value = currentDay()

  // 生成唯一id
  let date = new Date()
  let uuid = date.getFullYear() + repair(date.getMonth() + 1)
    + repair(date.getDate()) + repair(date.getHours())
    + repair(date.getMinutes()) + repair(date.getSeconds())
  //保存问卷
  save.onclick = () => {
    let date = currentDay()
    let content = document.getElementById('modal-content')
    if (inputDate.value < date) {
      modal2.style.display = 'block'
      content.innerHTML = `
        截止日期早于当前日期,
        <br>
        请修改截止日期。
      `
    } else if (vaildNum < 1) {
      modal2.style.display = 'block'
      content.innerHTML = `
        此问卷中没有题目！
      `
    } else {
      //保存后的画面
      savePage.style.display = "block"
      savePage.innerHTML = `  
        保存成功!
        <a href="/index.html" id="back-home">返回主页</a>       
      `
      designPage.style.display = "none"
      if (window.sessionStorage.getItem('state') === '1') {
        // 1是编辑状态
        for (let surveyItem of surveyList) {
          if (surveyItem.id == window.sessionStorage.getItem('itemKey')) {
            surveyItem.queslist = [...quesList]
            surveyItem.surveyTime = currentTime()
            surveyItem.surveyTitle = quesTitle.innerText
            console.log(surveyItem)
          }
        }
      } else {
        surveyList = JSON.parse(window.sessionStorage.getItem('surveyList')) || []
        //0是第一次创建问卷  
        surveyList.push({
          id: uuid,
          publicStatus: 0,
          deleteStatus: false,
          queslist: [...quesList],
          surveyTitle: quesTitle.innerText,
          surveyTime: currentTime()
        })
      }
      // 更新
      window.sessionStorage.setItem('surveyList', JSON.stringify(surveyList))
    }
  }
  //发布问卷
  publish.onclick = () => {
    let date = currentDay()
    let content = document.getElementById('modal-content')
    if (inputDate.value < date) {
      modal2.style.display = 'block'
      content.innerHTML = `
        截止日期早于当前日期,
        <br>
        请修改截止日期。
      `
    } else if (vaildNum < 1) {
      modal2.style.display = 'block'
      content.innerHTML = `
        此问卷中没有题目！
      `
    } else {
      savePage.style.display = "block"
      savePage.innerHTML = `  
        发布成功!
        <a href="/index.html" id="back-home">返回主页</a> 
      `
      designPage.style.display = "none"
      //改变发布状态
      if (window.sessionStorage.getItem('state') === '1') {
        // 1是编辑状态
        for (let surveyItem of surveyList) {
          if (surveyItem.id == window.sessionStorage.getItem('itemKey')) {
            surveyItem.queslist = [...quesList]
            surveyItem.surveyTime = currentTime()
            surveyItem.surveyTitle = quesTitle.innerText
            surveyItem.publicStatus = 1
          }
        }
      } else {
        //0是第一次创建问卷 
        surveyList = JSON.parse(window.sessionStorage.getItem('surveyList')) || []
        surveyList.push({
          id: uuid,
          publicStatus: 1,
          deleteStatus: false,
          queslist: [...quesList],
          surveyTitle: quesTitle.innerText,
          surveyTime: currentTime()
        })
      }
      // 更新
      window.sessionStorage.setItem('surveyList', JSON.stringify(surveyList))
      // console.log(surveyList)
    }
  }
  close2.onclick = () => {
    modal2.style.display = 'none'
  }
  okbtn.onclick = () => {
    modal2.style.display = 'none'
  }
}
