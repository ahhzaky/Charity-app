// here folder npm install midtrans-client | untuk backend midtrans
exports.handler = function (event, context, callback) {
  // set
  const Midtrans = require("midtrans-client");

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  };

  const snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
  });

  //   get data from body
  const { id, name, email, amount } = JSON.parse(event.body);

  //   di karenak midtrans membutuhkan first dan last name jadi dilakukan split kjika ada 2 string
  const names = name.split(" ");
  let first_name, last_name;

  //   cek apakah first name dan lastname ada, jika tidak ada maka names 1 aja dan last di abaikan
  if (names && names.length > 1) {
    first_name = names[0];
    last_name = names[1];
  } else if (names.length === 1) {
    first_name = names[0];
    last_name = "";
  }

  const parameters = {
    transaction_details: {
      // order id untuk random saja seperti invoice
      order_id: `CHARITY-${id}-${+new Date()}`,
      gross_amount: parseInt(amount),
    },
    customer_details: {
      first_name,
      last_name,
      email,
    },
    credit_card: {
      secure: true,
    },
  };

  //   snap melakukan transaction
  snap
    .createTransaction(parameters)
    .then(function (transaction) {
      const { token, redirect_url } = transaction;
      console.log(`Token: ${token}`);
      console.log(`Redirect URL: ${redirect_url}`);
      console.log(`Params: ${JSON.stringify(parameters)}`);
      console.log(`Transaction: ${JSON.stringify(transaction)}`);
      callback(null, {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          url: redirect_url,
          params: parameters,
        }),
      });
    })
    .catch(function (err) {
      console.error(`Error: ${err.message}`);
      callback(null, {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: err.message }),
      });
    });
};
