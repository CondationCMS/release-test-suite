import { check } from 'k6';
import http from 'k6/http';

export const options = {
    thresholds: {
      http_req_failed: ['rate<0.01'], // http errors should be less than 1%
      http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    },
  };

export default function () {

    const check_urls = [
        'http://localhost:1010/media/images/test.jpg?format=small',
        'http://localhost:1010/media/images/test.jpg?format=big',
        'http://localhost:1010/media/images/test.jpg?format=test2',
    ]

    check_urls.forEach(url => {
        let res = http.get(url);
        check(res, {
            'is status 200': (r) => r.status === 200,
        });
    })
}