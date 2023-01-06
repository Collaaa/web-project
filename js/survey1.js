const listContent = (item) => {
  const { surveyTitle, surveyTime, publicStatus, id } = item
  let content = ""
  switch (publicStatus) {
    case 0:   //未发布
      content = `
        <dl class="ques-list-items">
          <dt class="item-top">
            <div class="pull-left">
              <span class="item-title">${surveyTitle}</span>
              <i class="iconfont item-link">&#xec7f;</i>
            </div>
            <div class="pull-right">
              <div class="pull-left item-running item-nopublic">
                <i class="nopublic"></i>
                未发布
              </div>
              <div class="pull-left item-date">${surveyTime}</div>
            </div>
          </dt>
          <dd class="item-bot">
            <div class="operation-box pull-right">
              <div class="pull-left item-edit" onclick="editSurvey(${id})">
                <i class="iconfont item-icon">&#xe8ac;</i>
                <span>编辑问卷</span> 
              </div>
              <div class="pull-left item-delete" onclick="deleteSurvey(${id})">
                <i class="iconfont item-icon">&#xe74b;</i>
                <span>删除问卷</span>
              </div>
            </div>
          </dd>
        </dl>
      `
      break
    case 1:   //已发布
      content = `
    <dl class="ques-list-items">
      <dt class="item-top">
        <div class="pull-left">
          <span class="item-title">${surveyTitle}</span>
          <i class="iconfont item-link">&#xec7f;</i>
        </div>
        <div class="pull-right">
          <div class="pull-left item-running">
            <i class="haspublic"></i>
            已发布
          </div>
          <div class="pull-left item-date">${surveyTime}</div>
        </div>
      </dt>
      <dd class="item-bot">
        <div class="operation-box pull-right">
          <div class="pull-left item-write" onclick="writeSurvey(${id})">
            <i class="iconfont item-icon">&#xe601;</i>
            <span>填写问卷</span>
          </div>
          <div class="pull-left item-data" onclick="dataSurvey(${id})">
            <i class="iconfont item-icon">&#xe62d;</i>
            <span>查看数据</span>
          </div>
          <div class="pull-left item-delete" onclick="deleteSurvey(${id})">
            <i class="iconfont item-icon">&#xe74b;</i>
            <span>删除问卷</span>
          </div>
        </div>
      </dd>
    </dl>
  `
      break
    case 2:   //已结束
      content = `
        <dl class="ques-list-items">
          <dt class="item-top">
            <div class="pull-left">
              <span class="item-title">${surveyTitle}</span>
              <i class="iconfont item-link">&#xec7f;</i>
            </div>
            <div class="pull-right">
              <div class="pull-left item-running item-end">
                <i class="hasend"></i>
                已结束
              </div>
              <div class="pull-left item-date">${surveyTime}</div>
            </div>
          </dt>
          <dd class="item-bot">
            <div class="operation-box pull-right">
              <div class="pull-left item-data" onclick="dataSurvey(${id})">
              <i class="iconfont item-icon">&#xe62d;</i>
                <span>查看数据</span>
              </div>
              <div class="pull-left item-delete" onclick="deleteSurvey(${id})">
                <i class="iconfont item-icon">&#xe74b;</i>
                <span>删除问卷</span>
              </div>
            </div>
          </dd>
        </dl>
      `
      break
  }
  return content
}

const deleteListContent = (item) => {
  const { surveyTitle, surveyTime, id } = item
  let content = `
    <dl class="ques-list-items">
      <dt class="item-top">
        <div class="pull-left">
          <span class="item-title delete-title">${surveyTitle}</span>
          <i class="iconfont item-link">&#xec7f;</i>
        </div>
        <div class="pull-right">
          <div class="pull-left item-running item-end">
            <i class="hasend"></i>
            已删除
          </div>
          <div class="pull-left item-date">${surveyTime}</div>
        </div>
      </dt>
      <dd class="item-bot">
        <div class="operation-box pull-right">
          <div class="pull-left item-resolve" onclick="resolveSurvey(${id})"> 
            <i class="iconfont item-icon">&#xe676;</i>
            <span>恢复问卷</span> 
          </div>
        </div>
      </dd>
    </dl>
  `
  return content
}