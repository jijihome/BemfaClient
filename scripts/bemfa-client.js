/**
 * scripts/bemfa-client.js
 * BemfaClient 类提供与巴法云服务互动的方法。
 * 它允许发送消息、检索消息、管理主题等。
 * https://cloud.bemfa.com/docs/src/api_device.html
 */
class BemfaClient {
    /**
     * 使用给定的用户标识符和协议类型构造一个新的 BemfaClient 实例。
     * @param {string} uid - 从巴法云控制台获取的用户私钥。
     * @param {number} type - 协议类型（例如，1 表示 MQTT，3 表示 TCP）。
     */
    constructor(uid, type) {
        this.uid = uid
        this.type = type
        this.apiBaseUrl = "https://apis.bemfa.com/va"
        this.proApiBaseUrl = "https://pro.bemfa.com/v1"
    }

    /**
     * 向指定主题发送消息。
     * @param {string} topic - 消息将被发送到的主题名称。
     * @param {string} msg - 要发送的消息体。
     * @param {string} [wemsg] - （可选）如果提供，这个消息也会被发送到微信。
     * @returns {Promise<Object>} 解析为 API 相应的 Promise。
     */
    async sendMessage(topic, msg, wemsg = "") {
        const apiUrl = `${this.apiBaseUrl}/postJsonMsg`
        const body = {
            uid: this.uid,
            topic: topic,
            type: this.type,
            msg: msg,
            wemsg: wemsg,
        }
        return this.post(apiUrl, body)
    }

    /**
     * 从指定主题检索消息。
     * @param {string} topic - 将从中检索消息的主题名称。
     * @param {number} [num=1] - 要检索的消息数量，默认为 1。
     * @returns {Promise<Object>} 解析为 API 相应的 Promise。
     */
    async getMessage(topic, num = 1) {
        const apiUrl = `${this.apiBaseUrl}/getmsg?uid=${this.uid}&topic=${topic}&type=${this.type}&num=${num}`
        return this.get(apiUrl)
    }

    /**
     * 获取与用户密钥相关的所有主题。
     * @returns {Promise<Object>} 解析为 API 相应的Promise。
     */
    async getAllTopics() {
        const apiUrl = `${this.apiBaseUrl}/alltopic?uid=${this.uid}&type=${this.type}`
        return this.get(apiUrl)
    }

    /**
     * 检查与给定主题关联的设备的在线状态。
     * @param {string} topic - 与设备关联的主题名称。
     * @returns {Promise<Object>} 解析为 API 相应的 Promise。
     */
    async getDeviceOnlineStatus(topic) {
        const apiUrl = `${this.apiBaseUrl}/online?uid=${this.uid}&topic=${topic}&type=${this.type}`
        return this.get(apiUrl)
    }

    /**
     * 创建一个新的主题。
     * @param {string} topic - 要创建的主题的名称。
     * @param {string} [name] - 为主题设置的可选友好名称。
     * @returns {Promise<Object>} 解析为 API 相应的 Promise。
     */
    async createTopic(topic, name = "") {
        const apiUrl = `${this.proApiBaseUrl}/addtopic`
        const body = {
            uid: this.uid,
            topic: topic,
            type: this.type,
            name: name,
        }
        return this.postForm(apiUrl, body)
    }

    /**
     * 删除一个主题。
     * @param {string} topic - 要删除的主题的名称。
     * @returns {Promise<Object>} 解析为 API 相应的 Promise。
     */
    async deleteTopic(topic) {
        const apiUrl = `${this.proApiBaseUrl}/deltopic`
        const body = {
            uid: this.uid,
            topic: topic,
            type: this.type,
        }
        return this.postForm(apiUrl, body)
    }

    /**
     * 设置主题的友好名称。
     * @param {string} topic - 要设置名称的主题。
     * @param {string} name - 主题的新名称。
     * @returns {Promise<Object>} 解析为 API 相应的 Promise。
     */
    async setTopicName(topic, name) {
        const apiUrl = `${this.apiBaseUrl}/setName`
        const body = {
            uid: this.uid,
            topic: topic,
            type: this.type,
            name: name,
        }
        return this.post(apiUrl, body)
    }

    /**
     * 获取主题的友好名称。
     * @param {string} topic - 要获取名称的主题。
     * @returns {Promise<Object>} 解析为 API 相应的 Promise。
     */
    async getTopicName(topic) {
        const apiUrl = `${this.apiBaseUrl}/getName?uid=${this.uid}&topic=${topic}&type=${this.type}`
        return this.get(apiUrl)
    }

    // 辅助函数，用于处理网络请求
    async post(url, body) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
        return response.json()
    }

    async postForm(url, body) {
        const formBody = Object.keys(body)
            .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(body[key]))
            .join("&")
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formBody,
        })
        return response.json()
    }

    async get(url) {
        const response = await fetch(url)
        return response.json()
    }
}

module.exports = BemfaClient
