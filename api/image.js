// api/image.js (for /api/image.png route)
export default function handler(req, res) {
    if (req.url.includes('image')) {
        const payload = `<svg onload="alert(1)" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="red"/>
        </svg>`;
        res.setHeader('Content-Type', 'image/svg+xml');
        res.status(200).send(payload);
    } else {
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send('<img src="/api/image.png">');
    }
}
