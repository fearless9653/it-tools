export const codesByCategories: {
  category: { en: string; zh: string };
  codes: {
    code: number;
    name: { en: string; zh: string };
    description: { en: string; zh: string };
    type: 'HTTP' | 'WebDav';
  }[];
}[] = [
  {
    category: { en: '1xx informational response', zh: '1xx 信息响应' },
    codes: [
      {
        code: 100,
        name: { en: 'Continue', zh: '继续' },
        description: { en: 'Waiting for the client to emit the body of the request.', zh: '等待客户端发送请求体。' },
        type: 'HTTP',
      },
      {
        code: 101,
        name: { en: 'Switching Protocols', zh: '切换协议' },
        description: { en: 'The server has agreed to change protocol.', zh: '服务器已同意更改协议。' },
        type: 'HTTP',
      },
      {
        code: 102,
        name: { en: 'Processing', zh: '处理中' },
        description: {
          en: 'The server is processing the request, but no response is available yet.',
          zh: '服务器正在处理请求，但尚无响应。',
        },
        type: 'WebDav',
      },
      {
        code: 103,
        name: { en: 'Early Hints', zh: '早期提示' },
        description: {
          en: 'The server returns some response headers before final HTTP message.',
          zh: '服务器在最终HTTP消息之前返回一些响应头。',
        },
        type: 'HTTP',
      },
    ],
  },
  {
    category: { en: '2xx success', zh: '2xx 成功' },
    codes: [
      {
        code: 200,
        name: { en: 'OK', zh: '成功' },
        description: { en: 'Standard response for successful HTTP requests.', zh: 'HTTP请求成功的标准响应。' },
        type: 'HTTP',
      },
      {
        code: 201,
        name: { en: 'Created', zh: '已创建' },
        description: {
          en: 'The request has been fulfilled, resulting in the creation of a new resource.',
          zh: '请求已成功处理，并创建了新的资源。',
        },
        type: 'HTTP',
      },
      {
        code: 202,
        name: { en: 'Accepted', zh: '已接受' },
        description: {
          en: 'The request has been accepted for processing, but the processing has not been completed.',
          zh: '请求已被接受处理，但处理尚未完成。',
        },
        type: 'HTTP',
      },
      {
        code: 203,
        name: { en: 'Non-Authoritative Information', zh: '非权威信息' },
        description: {
          en: 'The request is successful but the content of the original request has been modified by a transforming proxy.',
          zh: '请求成功，但原始请求的内容已被转换代理修改。',
        },
        type: 'HTTP',
      },
      {
        code: 204,
        name: { en: 'No Content', zh: '无内容' },
        description: {
          en: 'The server successfully processed the request and is not returning any content.',
          zh: '服务器成功处理了请求，但不返回任何内容。',
        },
        type: 'HTTP',
      },
      {
        code: 205,
        name: { en: 'Reset Content', zh: '重置内容' },
        description: {
          en: 'The server indicates to reinitialize the document view which sent this request.',
          zh: '服务器指示重新初始化发送此请求的文档视图。',
        },
        type: 'HTTP',
      },
      {
        code: 206,
        name: { en: 'Partial Content', zh: '部分内容' },
        description: {
          en: 'The server is delivering only part of the resource due to a range header sent by the client.',
          zh: '由于客户端发送的范围头，服务器仅交付部分资源。',
        },
        type: 'HTTP',
      },
      {
        code: 207,
        name: { en: 'Multi-Status', zh: '多状态' },
        description: {
          en: 'The message body that follows is an XML message and can contain a number of separate response codes.',
          zh: '后续的消息体是XML消息，可能包含多个独立的响应代码。',
        },
        type: 'WebDav',
      },
      {
        code: 208,
        name: { en: 'Already Reported', zh: '已报告' },
        description: {
          en: 'The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response.',
          zh: 'DAV绑定的成员已在(multistatus)响应的前一部分中被枚举。',
        },
        type: 'WebDav',
      },
      {
        code: 226,
        name: { en: 'IM Used', zh: 'IM已使用' },
        description: {
          en: 'The server has fulfilled a request for the resource, and the response is a representation of the result.',
          zh: '服务器已满足对资源的请求，响应是结果的表示。',
        },
        type: 'HTTP',
      },
    ],
  },
  {
    category: { en: '3xx redirection', zh: '3xx 重定向' },
    codes: [
      {
        code: 300,
        name: { en: 'Multiple Choices', zh: '多种选择' },
        description: {
          en: 'Indicates multiple options for the resource that the client may follow.',
          zh: '表示客户端可以选择多个选项来访问资源。',
        },
        type: 'HTTP',
      },
      {
        code: 301,
        name: { en: 'Moved Permanently', zh: '永久移动' },
        description: {
          en: 'This and all future requests should be directed to the given URI.',
          zh: '此请求和所有未来的请求都应指向给定的URI。',
        },
        type: 'HTTP',
      },
      {
        code: 302,
        name: { en: 'Found', zh: '临时移动' },
        description: {
          en: 'Redirect to another URL. This is an example of industry practice contradicting the standard.',
          zh: '重定向到另一个URL。这是行业实践与标准相矛盾的一个例子。',
        },
        type: 'HTTP',
      },
      {
        code: 303,
        name: { en: 'See Other', zh: '查看其他' },
        description: {
          en: 'The response to the request can be found under another URI using a GET method.',
          zh: '请求的响应可以在另一个URI下找到，使用GET方法。',
        },
        type: 'HTTP',
      },
      {
        code: 304,
        name: { en: 'Not Modified', zh: '未修改' },
        description: {
          en: 'Indicates that the resource has not been modified since the version specified by the request headers.',
          zh: '表示资源自请求头中指定的版本以来未被修改。',
        },
        type: 'HTTP',
      },
      {
        code: 305,
        name: { en: 'Use Proxy', zh: '使用代理' },
        description: {
          en: 'The requested resource is available only through a proxy, the address for which is provided in the response.',
          zh: '请求的资源只能通过代理获得，代理地址在响应中提供。',
        },
        type: 'HTTP',
      },
      {
        code: 306,
        name: { en: 'Switch Proxy', zh: '切换代理' },
        description: {
          en: 'No longer used. Originally meant "Subsequent requests should use the specified proxy."',
          zh: '不再使用。最初表示"后续请求应使用指定的代理"。',
        },
        type: 'HTTP',
      },
      {
        code: 307,
        name: { en: 'Temporary Redirect', zh: '临时重定向' },
        description: {
          en: 'In this case, the request should be repeated with another URI; however, future requests should still use the original URI.',
          zh: '在这种情况下，请求应使用另一个URI重复；但是，未来请求仍应使用原始URI。',
        },
        type: 'HTTP',
      },
      {
        code: 308,
        name: { en: 'Permanent Redirect', zh: '永久重定向' },
        description: {
          en: 'The request and all future requests should be repeated using another URI.',
          zh: '请求和所有未来请求都应使用另一个URI重复。',
        },
        type: 'HTTP',
      },
    ],
  },
  {
    category: { en: '4xx client error', zh: '4xx 客户端错误' },
    codes: [
      {
        code: 400,
        name: { en: 'Bad Request', zh: '错误请求' },
        description: {
          en: 'The server cannot or will not process the request due to an apparent client error.',
          zh: '由于明显的客户端错误，服务器无法或拒绝处理请求。',
        },
        type: 'HTTP',
      },
      {
        code: 401,
        name: { en: 'Unauthorized', zh: '未授权' },
        description: {
          en: 'Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.',
          zh: '类似于403禁止访问，但特别用于需要身份验证且验证失败或尚未提供的情况。',
        },
        type: 'HTTP',
      },
      {
        code: 402,
        name: { en: 'Payment Required', zh: '需要付款' },
        description: {
          en: 'Reserved for future use. The original intention was that this code might be used as part of some form of digital cash or micropayment scheme.',
          zh: '保留以备将来使用。最初意图是该代码可能作为某种形式的数字现金或小额支付方案的一部分使用。',
        },
        type: 'HTTP',
      },
      {
        code: 403,
        name: { en: 'Forbidden', zh: '禁止访问' },
        description: {
          en: 'The request was valid, but the server is refusing action. The user might not have the necessary permissions for a resource.',
          zh: '请求有效，但服务器拒绝执行操作。用户可能没有资源的必要权限。',
        },
        type: 'HTTP',
      },
      {
        code: 404,
        name: { en: 'Not Found', zh: '未找到' },
        description: {
          en: 'The requested resource could not be found but may be available in the future.',
          zh: '找不到请求的资源，但将来可能可用。',
        },
        type: 'HTTP',
      },
      {
        code: 405,
        name: { en: 'Method Not Allowed', zh: '方法不允许' },
        description: {
          en: 'A request method is not supported for the requested resource.',
          zh: '请求的方法不被请求的资源支持。',
        },
        type: 'HTTP',
      },
      {
        code: 406,
        name: { en: 'Not Acceptable', zh: '不可接受' },
        description: {
          en: 'The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.',
          zh: '请求的资源只能生成根据请求中发送的Accept头不可接受的内容。',
        },
        type: 'HTTP',
      },
      {
        code: 407,
        name: { en: 'Proxy Authentication Required', zh: '需要代理身份验证' },
        description: {
          en: 'The client must first authenticate itself with the proxy.',
          zh: '客户端必须首先向代理进行身份验证。',
        },
        type: 'HTTP',
      },
      {
        code: 408,
        name: { en: 'Request Timeout', zh: '请求超时' },
        description: { en: 'The server timed out waiting for the request.', zh: '服务器等待请求超时时。' },
        type: 'HTTP',
      },
      {
        code: 409,
        name: { en: 'Conflict', zh: '冲突' },
        description: {
          en: 'Indicates that the request could not be processed because of conflict in the request, such as an edit conflict.',
          zh: '表示由于请求中的冲突（例如编辑冲突）而无法处理请求。',
        },
        type: 'HTTP',
      },
      {
        code: 410,
        name: { en: 'Gone', zh: '已删除' },
        description: {
          en: 'Indicates that the resource requested is no longer available and will not be available again.',
          zh: '表示请求的资源不再可用，且将不再可用。',
        },
        type: 'HTTP',
      },
      {
        code: 411,
        name: { en: 'Length Required', zh: '需要长度' },
        description: {
          en: 'The request did not specify the length of its content, which is required by the requested resource.',
          zh: '请求未指定其内容的长度，这是请求的资源所必需的。',
        },
        type: 'HTTP',
      },
      {
        code: 412,
        name: { en: 'Precondition Failed', zh: '前置条件失败' },
        description: {
          en: 'The server does not meet one of the preconditions that the requester put on the request.',
          zh: '服务器不满足请求者在请求中设置的前置条件之一。',
        },
        type: 'HTTP',
      },
      {
        code: 413,
        name: { en: 'Payload Too Large', zh: '负载过大' },
        description: {
          en: 'The request is larger than the server is willing or able to process.',
          zh: '请求大于服务器愿意或能够处理的大小。',
        },
        type: 'HTTP',
      },
      {
        code: 414,
        name: { en: 'URI Too Long', zh: 'URI过长' },
        description: {
          en: 'The URI provided was too long for the server to process.',
          zh: '提供的URI太长，服务器无法处理。',
        },
        type: 'HTTP',
      },
      {
        code: 415,
        name: { en: 'Unsupported Media Type', zh: '不支持的媒体类型' },
        description: {
          en: 'The request entity has a media type which the server or resource does not support.',
          zh: '请求实体具有服务器或资源不支持的媒体类型。',
        },
        type: 'HTTP',
      },
      {
        code: 416,
        name: { en: 'Range Not Satisfiable', zh: '范围无法满足' },
        description: {
          en: 'The client has asked for a portion of the file, but the server cannot supply that portion.',
          zh: '客户端请求文件的一部分，但服务器无法提供该部分。',
        },
        type: 'HTTP',
      },
      {
        code: 417,
        name: { en: 'Expectation Failed', zh: '期望失败' },
        description: {
          en: 'The server cannot meet the requirements of the Expect request-header field.',
          zh: '服务器无法满足Expect请求头字段的要求。',
        },
        type: 'HTTP',
      },
      {
        code: 418,
        name: { en: "I'm a teapot", zh: '我是一个茶壶' },
        description: {
          en: 'The server refuses the attempt to brew coffee with a teapot.',
          zh: '服务器拒绝尝试用茶壶泡咖啡。',
        },
        type: 'HTTP',
      },
      {
        code: 421,
        name: { en: 'Misdirected Request', zh: '错误导向请求' },
        description: {
          en: 'The request was directed at a server that is not able to produce a response.',
          zh: '请求被发送到无法产生响应的服务器。',
        },
        type: 'HTTP',
      },
      {
        code: 422,
        name: { en: 'Unprocessable Entity', zh: '无法处理的实体' },
        description: {
          en: 'The request was well-formed but was unable to be followed due to semantic errors.',
          zh: '请求格式正确，但由于语义错误而无法执行。',
        },
        type: 'HTTP',
      },
      {
        code: 423,
        name: { en: 'Locked', zh: '已锁定' },
        description: { en: 'The resource that is being accessed is locked.', zh: '正在访问的资源已被锁定。' },
        type: 'HTTP',
      },
      {
        code: 424,
        name: { en: 'Failed Dependency', zh: '依赖失败' },
        description: {
          en: 'The request failed due to failure of a previous request.',
          zh: '由于先前请求失败，此请求失败。',
        },
        type: 'HTTP',
      },
      {
        code: 425,
        name: { en: 'Too Early', zh: '过早' },
        description: {
          en: 'Indicates that the server is unwilling to risk processing a request that might be replayed.',
          zh: '表示服务器不愿意冒险处理可能被重放的请求。',
        },
        type: 'HTTP',
      },
      {
        code: 426,
        name: { en: 'Upgrade Required', zh: '需要升级' },
        description: {
          en: 'The client should switch to a different protocol such as TLS/1.0.',
          zh: '客户端应切换到不同的协议，如TLS/1.0。',
        },
        type: 'HTTP',
      },
      {
        code: 428,
        name: { en: 'Precondition Required', zh: '需要前置条件' },
        description: {
          en: 'The origin server requires the request to be conditional.',
          zh: '源服务器要求请求是有条件的。',
        },
        type: 'HTTP',
      },
      {
        code: 429,
        name: { en: 'Too Many Requests', zh: '请求过多' },
        description: {
          en: 'The user has sent too many requests in a given amount of time.',
          zh: '用户在给定时间内发送了过多请求。',
        },
        type: 'HTTP',
      },
      {
        code: 431,
        name: { en: 'Request Header Fields Too Large', zh: '请求头字段过大' },
        description: {
          en: 'The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.',
          zh: '服务器不愿意处理请求，因为单个头字段或所有头字段的总和过大。',
        },
        type: 'HTTP',
      },
      {
        code: 451,
        name: { en: 'Unavailable For Legal Reasons', zh: '因法律原因不可用' },
        description: {
          en: 'A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource.',
          zh: '服务器运营商已收到法律要求，拒绝访问包含请求资源的资源或资源集。',
        },
        type: 'HTTP',
      },
    ],
  },
  {
    category: { en: '5xx server error', zh: '5xx 服务器错误' },
    codes: [
      {
        code: 500,
        name: { en: 'Internal Server Error', zh: '内部服务器错误' },
        description: {
          en: 'A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.',
          zh: '通用错误消息，在遇到意外情况且没有更具体的错误消息适用时返回。',
        },
        type: 'HTTP',
      },
      {
        code: 501,
        name: { en: 'Not Implemented', zh: '未实现' },
        description: {
          en: 'The server either does not recognize the request method, or it lacks the ability to fulfill the request.',
          zh: '服务器不识别请求方法，或缺乏满足请求的能力。',
        },
        type: 'HTTP',
      },
      {
        code: 502,
        name: { en: 'Bad Gateway', zh: '错误网关' },
        description: {
          en: 'The server was acting as a gateway or proxy and received an invalid response from the upstream server.',
          zh: '服务器作为网关或代理，并从上游服务器收到无效响应。',
        },
        type: 'HTTP',
      },
      {
        code: 503,
        name: { en: 'Service Unavailable', zh: '服务不可用' },
        description: {
          en: 'The server is currently unavailable (because it is overloaded or down for maintenance).',
          zh: '服务器当前不可用（因为它过载或正在维护）。',
        },
        type: 'HTTP',
      },
      {
        code: 504,
        name: { en: 'Gateway Timeout', zh: '网关超时' },
        description: {
          en: 'The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.',
          zh: '服务器作为网关或代理，未从上游服务器收到及时响应。',
        },
        type: 'HTTP',
      },
      {
        code: 505,
        name: { en: 'HTTP Version Not Supported', zh: 'HTTP版本不支持' },
        description: {
          en: 'The server does not support the HTTP protocol version used in the request.',
          zh: '服务器不支持请求中使用的HTTP协议版本。',
        },
        type: 'HTTP',
      },
      {
        code: 506,
        name: { en: 'Variant Also Negotiates', zh: '变体也协商' },
        description: {
          en: 'Transparent content negotiation for the request results in a circular reference.',
          zh: '请求的透明内容协商导致循环引用。',
        },
        type: 'HTTP',
      },
      {
        code: 507,
        name: { en: 'Insufficient Storage', zh: '存储空间不足' },
        description: {
          en: 'The server is unable to store the representation needed to complete the request.',
          zh: '服务器无法存储完成请求所需的表示。',
        },
        type: 'HTTP',
      },
      {
        code: 508,
        name: { en: 'Loop Detected', zh: '检测到循环' },
        description: {
          en: 'The server detected an infinite loop while processing the request.',
          zh: '服务器在处理请求时检测到无限循环。',
        },
        type: 'HTTP',
      },
      {
        code: 510,
        name: { en: 'Not Extended', zh: '未扩展' },
        description: {
          en: 'Further extensions to the request are required for the server to fulfill it.',
          zh: '服务器需要对请求进行进一步扩展才能满足它。',
        },
        type: 'HTTP',
      },
      {
        code: 511,
        name: { en: 'Network Authentication Required', zh: '需要网络身份验证' },
        description: {
          en: 'The client needs to authenticate to gain network access.',
          zh: '客户端需要进行身份验证以获得网络访问权限。',
        },
        type: 'HTTP',
      },
    ],
  },
];
