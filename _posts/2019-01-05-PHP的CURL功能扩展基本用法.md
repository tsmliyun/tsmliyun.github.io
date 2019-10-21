PHP的curl功能提供了很多函数，需要将这些函数按特定的步骤组合到一起，我们先来了解下PHP建立curl请求的基本步骤。

 1. `$ch = curl_init(); // 创建一个新的CURL资源赋给变量$ch `
 2. `curl_setopt($ch, CURLOPT_URL, $url); // 设置URL`
 3. `$response = curl_exec($ch); // 执行，获取URL并输出到浏览器`
 4. `curl_close($ch); // 释放资源`

如果我们希望获取内容但不输出，可以使用 CURLOPT_RETURNTRANSFER 参数，并设置其值为非0或者true值。代码如下：`curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);`

我们可以通设置函数curl_setopt()的不同参数，可以获得不同的结果，这也是CURL扩展的强大之处。curl_setopt()函数的常用参数选项具体可查阅官方文档，此处就不列举。

下面是我常用的curl get和post请求的方法：

get请求：
```php
public function httpGet(string $url = '')
    {
        // 记录请求信息的日志
        // todo
        
        try {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 60);
            //https 请求
            if (strlen($url) > 5 && strtolower(substr($url, 0, 5)) == "https") {
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
            }
            $response = curl_exec($ch);
            $errorCode = curl_errno($ch);
            curl_close($ch);
            if (!empty($errorCode)) {
                // 可记录错误码日志
                return null;
            }
            // 记录返回结果日志
            return $response;
        } catch (\Exception $e) {
            $errorLog = [
                'msg' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data' => [
                    'url' => $url,
                ]
            ];
            // 记录错误日志
            return null;
        }
    }
​```php


POST请求:
```

​        
```php
public function httpPost(string $url = '', array $data = [])
{
        // 记录请求信息的日志
        // todo
    try {
        $jsonData = json_encode($data);
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($curl, CURLOPT_HEADER, 0);
        curl_setopt($curl, CURLOPT_TIMEOUT, 60);
        curl_setopt($curl, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json; charset=utf-8',
            'Content-Length:' . strlen($jsonData)
        ]);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        //https 请求
        if (strlen($url) > 5 && strtolower(substr($url, 0, 5)) == "https") {
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        }
        $result = curl_exec($curl);
        $errorCode = curl_errno($curl);
        curl_close($curl);
        if (!empty($errorCode)) {
            // 可记录错误码日志
            return null;
        }
        // 记录返回结果日志
        return json_decode($result, true);
    } catch (\Exception $e) {
        $errorData = [
            'msg' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
            'data' => [
                'url' => $url,
                'postData' => $data
            ]
        ];
        // 记录错误日志
        return null;
    }
} 
```