const methods = require("./methods");
const pdb = require("../databases/pricesdb");

async function customJsonOperation(op, opbody) {
let ok_ops_count = 0;
    try {
    let accounts = await methods.getAccount('bts.quotes.bank.viz.plus');
let acc = accounts[0];
    if (acc) {
if (opbody.id === 'vizplus_bitshares_info') {
let data = JSON.parse(opbody.json)[1];
let new_data = {base: data.base, additional_assets: data.additional_assets, average_ask_price: data.average_ask_price, quote: data.quote, base_depth: data.base_depth, average_bid_price: data.average_bid_price, usdt_assets: data.usdt_assets, datetime: data.datetime}
await pdb.updatePrices(new_data);
}
}
ok_ops_count += 1;
} catch(e) {
    console.log('Error: ' + JSON.stringify(e));
}
return ok_ops_count;
}

module.exports.customJsonOperation = customJsonOperation;