const express = require('express');
const app = express();

// RENDER FIX: This line tells the code to use Render's port (10000) 
// or fallback to 3000 for local testing.
const PORT = process.env.PORT || 10000;

const products = [
    { id: 1, name: "SME Digital Marketing Toolkit", price: 120, short: "Grow your shop on Facebook.", desc: "20 Canva templates and a 30-day WhatsApp guide." },
    { id: 2, name: "Kwacha Savings Tracker", price: 40, short: "Master your mobile money.", desc: "Excel tool for Airtel/MTN and NATSAVE/FNB tracking." },
    { id: 3, name: "Remote Work Starter Pack", price: 95, short: "Earn USD from your room.", desc: "How to set up Upwork and withdraw to ZMW." }
];

const layout = (content) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: sans-serif; margin: 0; background: #f4f7f6; }
            nav { background: #1a2a6c; padding: 15px; text-align: center; }
            nav a { color: white; text-decoration: none; margin: 0 15px; font-weight: bold; }
            .container { max-width: 500px; margin: 20px auto; padding: 20px; background: white; border-radius: 10px; }
            .btn { display: block; background: #2ecc71; color: white; text-decoration: none; padding: 12px; text-align: center; border-radius: 8px; margin-top: 20px; }
        </style>
    </head>
    <body>
        <nav><a href="/">HOME</a><a href="/products">STORE</a><a href="/login">LOGIN</a></nav>
        \${content}
    </body>
    </html>
`;

app.get('/', (req, res) => res.send(layout('<div class="container" style="text-align:center;"><h1>🇿🇲 Zambian Store</h1><p>Premium digital guides.</p><a href="/products" class="btn">VIEW PRODUCTS</a></div>')));

app.get('/login', (req, res) => res.send(layout('<div class="container"><h2>🔐 Login</h2><input type="email" placeholder="Email" style="width:90%;padding:10px;margin-bottom:10px;"><br><button class="btn" style="width:100%;border:none;">JOIN</button></div>')));

app.get('/products', (req, res) => {
    let list = products.map(p => `<div><h3>\${p.name}</h3><p>K\${p.price}</p><a href="/products/\${p.id}">View Details</a><hr></div>`).join('');
    res.send(layout(\`<div class="container"><h2>Store</h2>\${list}</div>\`));
});

app.get('/products/:id', (req, res) => {
    const p = products.find(x => x.id == req.params.id);
    res.send(layout(\`<div class="container"><h2>\${p.name}</h2><p>\${p.desc}</p><h3>Price: K\${p.price}</h3><p>Pay to: 0973053584 (Airtel) or 0768084091 (MTN)</p><a href="https://wa.me/260973053584" class="btn">BUY VIA WHATSAPP</a></div>\`));
});

// RENDER FIX: Listening on 0.0.0.0 and the correct PORT
app.listen(PORT, '0.0.0.0', () => {
    console.log(\`🚀 Server successfully bound to port \${PORT}\`);
});
