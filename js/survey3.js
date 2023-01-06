// 查看数据
const dataSurvey = (key) => {
  location.href = "/pages/data.html"
  window.sessionStorage.setItem('itemKey', key)
}

//编辑问卷
const editSurvey = (key) => {
  //切换页面
  location.href = "/pages/design.html"
  //使用本地存储sessionStorage
  window.sessionStorage.setItem('state', 1)  //0是第一次设计问卷，1是编辑问卷
  window.sessionStorage.setItem('itemKey', key)
}

//填写问卷
const writeSurvey = (key) => {
  //切换页面
  location.href = "/pages/fillout.html"
  //使用本地存储sessionStorage
  window.sessionStorage.setItem('itemKey', key) //记录当前的key
}

//新建问卷
const createSurvey = () => {
  // //切换页面
  location.href = "/pages/design.html"
  //使用本地存储sessionStorage
  window.sessionStorage.setItem('state', 0)  //0是第一次设计问卷，1是编辑问卷
}