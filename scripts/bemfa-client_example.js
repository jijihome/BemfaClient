const BemfaClient = require("./bemfa-client")

// 初始化BemfaClient实例
const uid = "请替换为你的实际私钥" // 请替换为你的实际私钥
const type = 3 // 使用TCP协议
const client = new BemfaClient(uid, type)

// 定义错误处理函数
function handleError(error) {
    console.error("错误信息:", error.message)
}

// 发送消息示例
async function exampleSendMessage() {
    try {
        const response = await client.sendMessage("led002", "on")
        parseResponse(response)
    } catch (error) {
        handleError(error)
    }
}

// 获取消息示例
async function exampleGetMessage() {
    try {
        const response = await client.getMessage("led002", 1)
        parseResponse(response)
        if (response.data && response.data.length > 0) {
            console.log("消息内容:", response.data[0].msg)
            console.log("时间:", response.data[0].time)
            console.log("Unix时间戳:", response.data[0].unix)
        }
    } catch (error) {
        handleError(error)
    }
}

// 获取所有主题示例
async function exampleGetAllTopics() {
    try {
        const response = await client.getAllTopics()
        parseResponse(response)
        if (response.data && response.data.length > 0) {
            response.data.forEach((topic) => {
                console.log("主题:", topic.topic)
                console.log("消息:", topic.msg)
                console.log("名称:", topic.name)
                console.log("在线状态:", topic.online)
                console.log("时间:", topic.time)
                console.log("Unix时间戳:", topic.unix)
            })
        }
    } catch (error) {
        handleError(error)
    }
}

// 获取设备在线状态示例
async function exampleGetDeviceOnlineStatus() {
    try {
        const response = await client.getDeviceOnlineStatus("led002")
        parseResponse(response)
        console.log("设备在线状态:", response.data)
    } catch (error) {
        handleError(error)
    }
}

// 创建主题示例
async function exampleCreateTopic() {
    try {
        const response = await client.createTopic("newtopic001", "New Topic Name")
        parseResponse(response)
    } catch (error) {
        handleError(error)
    }
}

// 删除主题示例
async function exampleDeleteTopic() {
    try {
        const response = await client.deleteTopic("newtopic001")
        parseResponse(response)
    } catch (error) {
        handleError(error)
    }
}

// 设置主题名称示例
async function exampleSetTopicName() {
    try {
        const response = await client.setTopicName("led002", "New Name")
        parseResponse(response)
    } catch (error) {
        handleError(error)
    }
}

// 获取主题名称示例
async function exampleGetTopicName() {
    try {
        const response = await client.getTopicName("led002")
        parseResponse(response)
        console.log("主题名称:", response.data)
    } catch (error) {
        handleError(error)
    }
}

// 辅助函数：解析API响应
function parseResponse(response) {
    switch (response.code) {
        case 0:
            console.log("成功:", response.message)
            break
        case 10002:
            console.error("请求参数有误:", response.message)
            break
        case 40000:
            console.error("未知错误:", response.message)
            break
        case 40004:
            console.error("私钥或主题错误:", response.message)
            break
        case 40005:
            console.error("接入人邮箱错误或不存在:", response.message)
            break
        default:
            console.error("未处理的响应代码:", response.code, response.message)
    }
}

// 执行示例
;(async () => {
    await exampleSendMessage()
    await exampleGetMessage()
    await exampleGetAllTopics()
    await exampleGetDeviceOnlineStatus()
    await exampleCreateTopic()
    await exampleDeleteTopic()
    await exampleSetTopicName()
    await exampleGetTopicName()
})()
