# monitor接口文档
## sdk接口
请求地址: POST 47.103.139.192:3000/sdk_post 

请求头设置: Content-Type: text/plain

请求参数: 
|字段| 说明|类型|是否必填|
|--|--|--|--|
|timestamp|时间戳|timestamp（非string）|否|
|其他|无|都是string|只有kind和error是必填字段|

```js
//示例
{
    "kind":"stability",
    "type": "error"
    ...
}

```
返回参数:
|字段| 说明|类型|备注|
|--|--|--|--|
|data|只有错误会返回数据，否则为空| | |
|code|接口状态码|Number|成功:200 <br> 失败:6xx| |
|message|接口信息|string|操作提示(更新，上传，查询等)|

```js
// 示例 成功
{
    "data": "",
    "code": 200,
    "message": "创建成功！"
}
// 失败
{
    "data": {
        "name": "SequelizeValidationError",
        "errors": [
            {
                "message": "mg_behavior.type cannot be null",
                "type": "notNull Violation",
                "path": "type",
                "value": null,
                "origin": "CORE",
                "instance": {
                    "id": "f0d7fbae-76f5-4b5e-b1d7-ee7550799453",
                    "kind": "behavior",
                    "timestamp": "0122-12-31T15:54:17.000Z",
                    "ip": "54.86.50.139"
                },
                "validatorKey": "is_null",
                "validatorName": null,
                "validatorArgs": []
            }
        ]
    },
    "code": 605,
    "message": "创建失败!"
}
```
## 后台系统接口
请求地址: POST 47.103.139.192:3000/home_data

请求头设置: Content-Type: text/plain

请求参数: 
|字段| 说明|类型|是否必填|
|--|--|--|--|
|logType|时间戳|string|是|
|kind|错误类型|string|是|
|indicatorList|需要返回的数据(PS: 错误类型需要与logType字符串一致)<br>默认带key时间点，[jserror、api、perf、blank、resloadfail、pv, uv, pv_percent, uv_percent]的一种或多种|string|是|
|timeInterval|返回数据时间间隔|Number|否|
|from|查询起止时间|string|是|
|end|查询截至时间|string|是|
|raw|获取查询条件的原生数据|boolean|否|
|other|查询其他条件（待扩展查询，根据后台需要再开发）|string|否|

示例
```js
{
  "logType": "jserror",
  "kind": "stability",
  "from": "2022-08-04 00:00:00",
  "to": "2022-08-20 00:00:00",
  "indicatorList": "['jserror','uv']",
  "timeInterval": 60,
}

// 添加raw
{
    "logType":"jserror",
    "kind":"stability",
    "from":"2022-08-03 00:00:00",
    "to":"2022-08-20 00:00:00",
    "indicatorList":"['jserror']",
    "timeInterval":60,
    "raw":true
}
```

返回参数:
|字段| 说明|类型|备注|
|--|--|--|--|
|data|查询的数据|Array| |
|code|接口状态码|Number|成功:200 <br> 失败:6xx| 
|message|接口信息|string|查询操作提示|

示例:
```js
// 成功
{
    "data":[{"jserror":1,"uv":1}],
    "code":200,
    "message":"操作成功！"
}

// 携带raw参数返回数据
{
    "data": [
        {
            "id": "1",
            "errorType": "jsError",
            "filename": "http://localhost:8080/",
            "kind": "stability",
            "message": "Uncaught TypeError: Cannot set properties of undefined (setting 'error')",
            "position": "22:28",
            "selector": "html body div#container div.content input",
            "stack": "errorClick (http://localhost:8080/:22:28)^HTMLInputElement.onclick (http://localhost:8080/:13:66)",
            "timestamp": "2022-08-16T02:29:09.000Z",
            "title": "Front-end monitor SDK",
            "type": "error",
            "url": "http://localhost:8080/",
            "userAgent": "chrome"
        }
    ],
    "code": 200,
    "message": "操作成功！"
}

// 失败
{
    "data":"",
    "code":605,
    "message":"模型不存在"
}
```
