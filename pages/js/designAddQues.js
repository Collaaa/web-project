// 要解决onload覆盖问题
let saved = null
if (typeof window.onload == "function") {    //判断之前是否有windows.onload
  //创建一个保存器
  saved = window.onload
}
window.onload = () => {
  saved()
  let modal = document.getElementsByClassName('modal-wrapper')[0]
  let single = document.getElementById('type-single')
  let mutiply = document.getElementById('type-mutiply')
  let text = document.getElementById('type-text')
  // 最多十道题（要继续添加时要判断），最少一道题（保存时做判断）
  // 添加单选题
  let addList = document.getElementById('question-list-add')
  let addMore = document.getElementById('add-more-checkbox')
  single.onclick = () => {
    vaildNum += 1
    quesNum += 1
    if (vaildNum > 10) {
      console.warn('题目已超过10题')
      vaildNum -= 1
      quesNum -= 1
    } else {
      quesList.push(
        {
          titleNo: vaildNum,
          key: quesNum,     //唯一标识
          optionNum: 2,       //选项数
          title: '单选题',      //这道题的标题
          type: 'single',        //题型
          options: {
            1: "选项A",     //第一个选项
            2: "选项B"      //第二个选项
          }
        }
      )
      const { key, options, title, titleNo } = quesList[vaildNum - 1]
      addList.innerHTML += `
        <div class="question-wrapper">
          Q<span class="question-key">${titleNo}</span> <span id="single-title${key}">${title}</span> 
          <ul class="ques-ul">
            <li class="ques-li">
              <input type="radio" id="singleA${key}" name="single${key}">
              <label for="singleA${key}" class="single-option${key}" >${options[1]}</label>
            </li>
            <li class="ques-li">
              <input type="radio" id="singleB${key}" name="single${key}">
              <label for="singleB${key}" class="single-option${key}" >${options[2]}</label>
            </li>
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
    }
    if (addMore.checked === false) {
      modal.style.display = "none"
    }
  }
  mutiply.onclick = () => {
    vaildNum += 1
    quesNum += 1
    if (vaildNum > 10) {
      console.warn('题目已超过10题')
      vaildNum -= 1
      quesNum -= 1
    } else {
      quesList.push(
        {
          titleNo: vaildNum,
          key: quesNum,     //唯一标识
          optionNum: 2,       //选项数
          title: '多选题',      //这道题的标题
          type: 'mutiply',        //题型
          options: {
            1: "选项A",     //第一个选项
            2: "选项B"      //第二个选项
          }
        }
      )
      if (addMore.checked === false) {
        modal.style.display = "none"
      }
      const { key, options, title, titleNo } = quesList[vaildNum - 1]
      addList.innerHTML += `
        <div class="question-wrapper">
          Q<span class="question-key">${titleNo}</span> 
          <span id="mutiply-title${key}">${title}</span> 
          <ul class="ques-ul">
            <li class="ques-li">
              <input type="checkbox" id="mutiplyA${key}" name="mutiply${key}">
              <label for="mutiplyA${key}" class="mutiply-option${key}" >${options[1]}</label>
            </li>
            <li class="ques-li">
              <input type="checkbox" id="mutiplyB${key}" name="mutiply${key}">
              <label for="mutiplyB${key}" class="mutiply-option${key}" >${options[2]}</label>
            </li>
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
    }
    if (addMore.checked === false) {
      modal.style.display = "none"
    }
  }
  text.onclick = () => {
    vaildNum += 1
    quesNum += 1
    if (vaildNum > 10) {
      console.warn('题目已超过10题')
      vaildNum -= 1
      quesNum -= 1
    } else {
      quesList.push(
        {
          titleNo: vaildNum,
          key: quesNum,     //唯一标识
          title: '文本题',      //这道题的标题
          type: 'text',        //题型
          isMandatory: false    //是否强制填写
        }
      )
      if (addMore.checked === false) {
        modal.style.display = "none"
      }
      const { key, title, titleNo } = quesList[vaildNum - 1]

      addList.innerHTML += `
        <div class="question-wrapper">
          Q<span class="question-key">${titleNo}</span>
          <span id="text-title${key}">${title}</span>
          <div class="mandatory-checkbox" onclick="handleMandatory(${key})">
            <input type="checkbox" id="isMandatory${key}">
            <label for="isMandatory${key}" >此题是否必填</label>
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
      let manda = document.getElementById(`isMandatory${key}`)
      // 解决事件冒泡
      manda.addEventListener('click', (event) => {
        if (event && event.stopPropagation) {//非IE
          event.stopPropagation()
        }
        else {//IE
          window.event.cancelBubble = true
        }
      })
    }
    if (addMore.checked === false) {
      modal.style.display = "none"
    }
  }
}
