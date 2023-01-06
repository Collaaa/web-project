// 新建问卷
const quesList = [] //题目数组
let quesNum = 0     //题目总数（包括删掉的）和key关联着
let vaildNum = 0    //题目数 不能大于10
/* 
quesList的类型定义：
  titleNo: number
  key: number                          //唯一标识
  optionNum: number    !important      //选项数
  title: string                        //这道题的标题
  type: string                          //题型
  options: object   !important         //选项
  isMandatory:boolean  !important      //是否强制填写
*/
let index = 0

/////////////////////////////

// 问卷列表
// let surveyList = [
// {
//   id: 1,
//     publicStatus: 0,  //未发布
//       deleteStatus: false,
//         queslist: [
//           {
//             titleNo: 1,
//             key: 1,
//             optionNum: 2,       //选项数
//             title: '单选题1',      //这道题的标题
//             type: 'single',        //题型
//             options: {
//               1: "选项A",     //第一个选项
//               2: "选项B"      //第二个选项
//             }
//           },
//           {
//             titleNo: 2,
//             key: 2,
//             optionNum: 4,       //选项数
//             title: '多选题',      //这道题的标题
//             type: 'mutiply',        //题型
//             options: {
//               1: "选项A",     //第一个选项
//               2: "选项B",     //第二个选项
//               3: "选项C",     //第二个选项
//               4: "选项d"      //第二个选项
//             }
//           },
//           {
//             titleNo: 3,
//             key: 3,
//             title: '文本题',      //这道题的标题
//             type: 'text',        //题型
//             isMandatory: true
//           }
//         ],
//           surveyTitle: "关于大学生的心理问题",
//             surveyTime: '2022年12月23日 20:23:56'
// },
// {
//   id: 2,
//     publicStatus: 1,  //已发布
//       deleteStatus: false,
//         queslist: [
//           {
//             titleNo: 1,
//             key: 1,
//             optionNum: 2,       //选项数
//             title: '多选题',      //这道题的标题
//             type: 'mutiply',        //题型
//             options: {
//               1: "选项A",     //第一个选项
//               2: "选项B"      //第二个选项
//             }
//           }
//         ],
//           surveyTitle: "关于大学生日常娱乐活动的调查问卷",
//             surveyTime: '2022年12月26日 20:23:56'
// },
// {
//   id: 3,
//     publicStatus: 2,  //已结束
//       deleteStatus: false,
//         queslist: [
//           {
//             titleNo: 1,
//             key: 1,     //唯一标识
//             title: '文本题',      //这道题的标题
//             type: 'text',        //题型
//             isMandatory: false    //是否强制填写
//           }
//         ],
//           surveyTitle: "大学生社会兼职状况的调查",
//             surveyTime: '2022年12月25日 20:23:56'
// },
// {
//   id: 4,
//     publicStatus: 2,  //已结束
//       deleteStatus: false,
//         queslist: [
//           {
//             titleNo: 1,
//             key: 1,     //唯一标识
//             title: '文本题',      //这道题的标题
//             type: 'text',        //题型
//             isMandatory: false    //是否强制填写
//           }
//         ],
//           surveyTitle: "大学生社会兼职状况的调查",
//             surveyTime: '2022年12月25日 20:23:56'
// },
// {
//   id: 5,
//     publicStatus: 2,  //已结束
//       deleteStatus: false,
//         queslist: [
//           {
//             titleNo: 1,
//             key: 1,     //唯一标识
//             title: '文本题',      //这道题的标题
//             type: 'text',        //题型
//             isMandatory: false    //是否强制填写
//           }
//         ],
//           surveyTitle: "大学生社会兼职状况的调查",
//             surveyTime: '2022年12月25日 20:23:56'
// },
// {
//   id: 6,
//     publicStatus: 2,  //已结束
//       deleteStatus: false,
//         queslist: [
//           {
//             titleNo: 1,
//             key: 1,     //唯一标识
//             title: '文本题',      //这道题的标题
//             type: 'text',        //题型
//             isMandatory: false    //是否强制填写
//           }
//         ],
//           surveyTitle: "大学生社会兼职状况的调查",
//             surveyTime: '2022年12月25日 20:23:56'
// },
// {
//   id: 7,
//     publicStatus: 1,  //已结束
//       deleteStatus: true,
//         queslist: [
//           {
//             titleNo: 1,
//             key: 1,     //唯一标识
//             title: '文本题',      //这道题的标题
//             type: 'text',        //题型
//             isMandatory: false    //是否强制填写
//           }
//         ],
//           surveyTitle: "大学生社会兼职状况的调查",
//             surveyTime: '2022年12月25日 20:23:56'
// },
// ]
let surveyList = []
let surveyNum = 0

/*
surveyList的类型定义:
  publicStatus:number                   //发布状态:已发布1,未发布0,已结束2
  deleteStatus:boolean                  //是否删除
  queslist:Array<quesList>              //问卷中的问题列表
  id:number                             //问卷唯一标识
  surveyTitle:string                    //问卷标题
  surveyTime:string                     //问卷发布时间
*/

// window.sessionStorage.setItem('surveyList', JSON.stringify(surveyList))
