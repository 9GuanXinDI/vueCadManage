export const volunteerType = [
    { value: 1, label: '站长' },
    { value: 2, label: '专职志愿者' },
    { value: 3, label: '兼职志愿者' },
    { value: 4, label: '临时志愿者' },
]

export const applyType = [
    { value: 1, label: '入职' },
    { value: 2, label: '离职' },
    { value: 3, label: '转岗' },
]

export const volunteerOpera = {
    add: 'add',         // 添加
    update: 'update',   // 更新
    apply: 'apply',      // 申请职位
    view: 'view',       // 查看
    depart: 'depart'    // 离职
}

export const dictKey = {
    APPLY_TYPE: 'APPLY_TYPE',               // 申请类型
    APPLY_PLACE: 'APPLY_PLACE',             // 职位
    EXAMINE_STATUS: 'EXAMINE_STATUS',       // 	审核状态
    EDUCATION: 'EDUCATION',                 //  文化程度
    POLOTICAL_OUTLOOK: 'POLOTICAL_OUTLOOK'  // 政治面貌
}

// 接处警来源
export const ALARM_SOURCE_ENUM = {
    FIRE_AIOT:{ value:'1', desc:'预警平台'  },
    FIRE_119:{ value:'2', desc:'119平台' }
}

export const ALARM_HANDLE_STATE_ENUM ={
    UN_HANDLE:{ value:'0', desc:'未处理' },
    HANDLE:{ value:'1', desc:'已处理' }
}

export const ORG_TYPE_ENUM = {
    ORG_RESEAU:{ value:'1', desc:'网格' },
    ORG_STATION:{  value:'2', desc:'微站'}
}

export const ALARM_CONFIRM_ENUM = {
    FIRE:{ value:'1', desc:'真实火警' },
    UN_FIRE:{ value:'2', desc:'误报' }
}

export const TASK_TYPE_ENUM = {
    INSPECTION_TASK:{ value:'inspection_task', desc:'日常巡检任务' },
    INVENTORY_TASK:{ value:'inventory_task', desc:'资产盘点任务' },
    READILY_TASK:{ value:'readily_task', desc:'随手拍任务' },
    // COMMAND:{ value:'command',  desc:'指令' }
}

export const RECEIVE_DEADINE_ENUM = {
    TEN_MINUTE:{ value:'10', desc:'10分钟' },
    THIRTY_MINUTE:{ value:'30', desc:'30分钟' },
    ONE_HOUR:{ value:'60', desc:'1小时' },
    TWO_HOUR:{ value:'120', desc:'2小时' }
}

export const RULE_KEY_ENUM ={
    // COMMAND_SCORE:{ value:'command_score', desc:'指令响应积分' },
    TASK_SCORE:{ value:'task_score', desc:'任务响应积分' },
    TRAIN_SCORE:{ value:'train_score', desc:'培训积分' }
}

export const TASK_STATUS_ENUM = {
    PUBLISH:{ value:'PUBLISH', desc:'已发布' },
    RECEIVE:{ value:'RECEIVE', desc:'已领取' },
    COMPLETE:{ value:'COMPLETE', desc:'已完成' },
    TIME_OUT:{ value:'TIME_OUT', desc:'超时' },
    GIVE_UP:{ value:'GIVE_UP', desc:'放弃' },
    CLOSE:{ value:'CLOSE', desc:'关闭' }
}

export const TASK_STATUS_ENUM_user = {
    PUBLISH:{ value:'PUBLISH', desc:'已响应' },
    RECEIVE:{ value:'RECEIVE', desc:'已领取' },
    COMPLETE:{ value:'COMPLETE', desc:'已完成' },
    TIME_OUT:{ value:'TIME_OUT', desc:'超时' },
    GIVE_UP:{ value:'GIVE_UP', desc:'放弃' },
}


export const eventKey = {
    handlerAlarm: 'handlerAlarm'
}

export const TASK_EXAMINE_STATUS_ENUM = {
    WAIT:{ value:'WAIT', desc:'待审核' },
    PASS:{ value:'PASS', desc:'审核通过' },
    REJECT:{ value:'REJECT', desc:'审核拒绝' }
}
