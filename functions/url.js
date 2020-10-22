const reverse = require('long-url');

/*
{
    "path": "Path parameter",
    "httpMethod": "Incoming request's method name"
    "headers": {Incoming request headers}
    "queryStringParameters": {query string parameters }
    "body": "A JSON string of the request payload."
    "isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encode"
}
*/

async function longUrl({ body }) {
    const { url } = JSON.parse(body);

    if (!url) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: 'No URL provided'
            })
        };
    }

    return new Promise((resolve, reject) => {
        reverse(url, function(err, url) {
            if (err) {
                reject({
                    statusCode: 400,
                    body: JSON.stringify({
                        error: 'Bad URL',
                        url
                    })
                });
            }

            resolve({
                statusCode: 200,
                body: JSON.stringify({
                    url
                })
            });
        });
    });
}
/*
async function main() {
    const res = await longUrl({ body: JSON.stringify({ url: 'http://ow.ly/W7oOu' }) });
    console.log(res)
}
main()
*/
exports.handler = longUrl;