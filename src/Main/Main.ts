import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal"

let pairingCodeRequested = false;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless:false,
    }
});

client.initialize();
client.on('loading_screen', (percent:any, message:String) => {
    console.log('LOADING SCREEN', percent, message);
});
client.on('qr', async (qr:any) => {
    console.log('QR RECEIVED', qr);
    const pairingCodeEnabled = false;
    if (pairingCodeEnabled && !pairingCodeRequested) {
        const pairingCode = await client.requestPairingCode('96170100100'); // enter the target phone number
        console.log('Pairing code enabled, code: '+ pairingCode);
        pairingCodeRequested = true;
    }
});
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

