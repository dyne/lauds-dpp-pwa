import {
  zencode_exec
} from 'zenroom';

const verifySignature = async (data) => {
  const contract = `Scenario 'ecdh': verifies the signature

Given I have a 'public key' from 'https://interfacer-staging.dyne.im/api/json/trace'
Given I have a 'string dictionary' named 'DPP'
Given I have a 'signature' named 'DPP.signature'

When I verify the 'DPP' has a signature in 'DPP.signature' by 'https://interfacer-staging.dyne.im/api/json/trace'

Then print the string 'The LAUDS DPP signature was verified'
Then print the 'DPP'
Then print the 'DPP.signature'`
  const keys = '{"https://interfacer-staging.dyne.im/api/json/trace":{"public_key":"BBCQg21VcjsmfTmNsg+I+8m1Cm0neaYONTqRnXUjsJLPa8075IYH+a9w2wRO7rFM1cKmv19Igd7ntDZcUvLq3xI="}}';
  return await zencode_exec(contract, {
    keys,
    data: JSON.stringify(data)
  });
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const {
      result
    } = await verifySignature(data);
    res.status(200).send(JSON.parse(result));
  }
}
