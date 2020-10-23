const reverse = require('long-url');

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
        reverse(url, function reverseUrl(err, url) {
            if (err) {
                reject({
                    statusCode: 400,
                    body: JSON.stringify({
                        error: 'Could not follow the URL',
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

exports.handler = longUrl;