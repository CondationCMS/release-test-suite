import { check } from 'k6';
import { parseHTML } from 'k6/html';
import http from 'k6/http';

export const options = {
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<250'], // 95% of requests should be below 200ms
    },
};

export default function () {

    
    var res = http.get("http://localhost:1010/template/filter");
    check(res, {
        'is status 200': (r) => r.status === 200,
        'contains formatted date': (r) => {
            const doc = r.html 
            const formattedDate = doc.find('[id=complete]').text()
            return formattedDate === '29.11.2023'
        }
    });
    check(res, {
        'is status 200': (r) => r.status === 200,
        'contains formatted month/year': (r) => {
            const doc = r.html 
            const formattedDate = doc.find('[id=month_year]').text()
            return formattedDate === '11/2023'
        }
    });
    /*
    res = http.get("http://localhost2:1010");
    check(res, {
        'is status 200': (r) => r.status === 200,
        'template function via extension hook': (r) =>
            r.body.includes('Hello CondationCMS'),
    });

    res = http.get("http://localhost2:1010");
    check(res, {
        'is status 200': (r) => r.status === 200,
        'template calling a shortcode': (r) =>
            r.body.includes("Hello CondationCMS, I'm a TAG!"),
    });
    */
    
}