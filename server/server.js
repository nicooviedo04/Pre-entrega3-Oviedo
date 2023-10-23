const express = require("express");
const app = express()
const cors = require("cors")
const mercadopago = require("mercadopago")
const path = require("path")


mercadopago.configure({
	access_token: "APP_USR-7147098396967183-101318-817c1d902e1ee64967d83ffbbfc9e014-299871763", 
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));
app.use(cors());

app.get("/", function () {
	res.sendFile(path.resolve(__dirname, "../client", "index.html"))
})

app.post("/create_preference", (req, res) => {
	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			},
		],
		back_urls: {
			success: "http://localhost:8080",
			failure: "http://localhost:8080",
			pending: "",
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id,
			});
		})
		.catch(function (error) {
			console.log(error);
		});
});

app.get('/feedback', function (req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id,
	});
});

app.listen(8080, () => {
	console.log("The server is now running on Port 8080")
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})