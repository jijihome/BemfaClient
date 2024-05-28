# 巴法云服务客户端 JSBox 应用说明文档

## 介绍

该项目为 iOS 平台上 JSBox 应用的一个脚本实现，通过与巴法云服务的交互，实现对物联网设备的简便管理。用户可以利用此客户端发送消息、检索消息、管理主题、检查设备在线状态等，极大地方便了物联网设备的管理工作。

巴法云服务（Bemfa Cloud）是一个为物联网设备提供消息推送、设备管理等服务的平台。通过该客户端，用户可以更方便地与巴法云服务进行交互。

## 功能特点

-   **发送消息**：向指定主题的设备或服务发送消息。
-   **检索消息**：从指定主题检索历史消息。
-   **获取所有主题**：列出与用户密钥关联的所有主题。
-   **检查设备在线状态**：检查与给定主题关联的设备的在线状态。
-   **创建主题**：为新的设备或服务创建一个主题。
-   **删除主题**：删除不再需要的主题。
-   **设置主题名称**：为主题设置一个友好名称。
-   **获取主题名称**：获取主题的友好名称。

## 使用前提

-   拥有 iOS 设备并已安装 JSBox 应用。
-   已注册巴法云服务账号并获取到用户私钥（uid）。
-   熟悉 iOS 捷径应用，以便结合使用。

## 安装

1. 将 `bemfa-client.js` 文件放置到 JSBox 应用的 `scripts` 目录下。
2. 在 JSBox 应用中创建一个新脚本或使用现有脚本，引入 `bemfa-client.js` 文件。
3. 确保你的巴法云服务账号私钥（uid）和协议类型（type）配置正确。

## 快速开始

1. **初始化客户端**：

    ```javascript
    const BemfaClient = require("./scripts/bemfa-client.js")
    const uid = "你的用户私钥" // 从巴法云控制台获取
    const type = 2 // 协议类型，例如，2 表示 HTTP
    const client = new BemfaClient(uid, type)
    ```

2. **发送消息**：

    ```javascript
    const topic = "你的主题"
    const message = "你要发送的消息"
    client.sendMessage(topic, message).then((response) => {
        console.log(response)
    })
    ```

3. **检索消息**：

    ```javascript
    client.getMessage(topic).then((response) => {
        console.log(response)
    })
    ```

## 示例

以下为一个使用该客户端与 iOS 捷径结合的简单示例：

```javascript
// main.js

// 引入 bemfa-client.js
const BemfaClient = require("./scripts/bemfa-client.js")

// 配置
const uid = "你的巴法云用户私钥"
const type = 你的协议类型 // 例如，2 表示 HTTP

const client = new BemfaClient(uid, type)

// 从捷径传入的数据
const query = $context.query
const action = query.动作
const topic = query.主题
let result

;(async () => {
    try {
        switch (
            action
            // 根据不同的动作执行不同的方法...
        ) {
        }
    } catch (error) {
        result = { error: error.message }
    }

    // 返回结果给捷径
    $intents.finish(result)
})()
```

## 支持与合作

-   巴法云服务文档：[https://cloud.bemfa.com/docs/src/api_device.html](https://cloud.bemfa.com/docs/src/api_device.html)
-   JSBox 应用官方网站：[https://jsboxbbs.com/](https://jsboxbbs.com/)
-   如有任何问题或需求，请通过官方渠道联系巴法云服务和 JSBox 应用的支持团队。

## 许可证

在使用本项目时，请遵循相关开源许可证规定。

王剑辉祝您使用愉快！
