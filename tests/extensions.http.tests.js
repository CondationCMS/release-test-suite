import { check } from 'k6';
import http from 'k6/http';

export const options = {
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<250'], // 95% of requests should be below 200ms
    },
};

export default function () {


    var res = http.get("http://localhost:1010/extension/test2");
    check(res, {
        'is status 200': (r) => r.status === 200,
        'verify content': (r) =>
            r.body.includes('http extension via hook!'),
    });
    res = http.get("http://localhost:1010/hello-route");
    check(res, {
        'is status 200': (r) => r.status === 200,
        'verify content': (r) =>
            r.body.includes('route via hook!'),
    });

    res = http.get("http://localhost:1010/api/hello");
    check(res, {
        'is status 200': (r) => r.status === 200,
        'contains expected response': (r) => {
            try {
                let json = JSON.parse(r.body);
                return json.name === 'CondationCMS';
            } catch (e) {
                return false;
            }
        }
    });

}