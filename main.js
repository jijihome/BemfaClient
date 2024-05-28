// main.js

// 引入 bemfa-client.js
const BemfaClient = require("./scripts/bemfa-client.js")

// 配置
const uid = "你的用户私钥"
const type = 1 // MQTT 协议

const client = new BemfaClient(uid, type)

// 从捷径传入的数据
const query = $context.query
const action = query.动作
const topic = query.主题
let result

;(async () => {
    try {
        switch (action) {
            case "发送消息":
                result = await client.sendMessage(topic, query.消息内容)
                break
            case "检索消息":
                result = await client.getMessage(topic)
                break
            case "获取所有主题":
                result = await client.getAllTopics()
                break
            case "检查设备在线状态":
                result = await client.getDeviceOnlineStatus(topic)
                break
            case "创建主题":
                result = await client.createTopic(topic, query.名称)
                break
            case "删除主题":
                result = await client.deleteTopic(topic)
                break
            case "设置主题名称":
                result = await client.setTopicName(topic, query.名称)
                break
            case "获取主题名称":
                result = await client.getTopicName(topic)
                break
            default:
                result = { error: "无效的动作" }
        }
    } catch (error) {
        result = { error: error.message }
    }

    // 返回结果给捷径
    $intents.finish(result)
})()
