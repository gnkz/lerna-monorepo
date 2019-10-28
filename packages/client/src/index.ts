import * as config from "config";
import { Client } from "@daisy/common";

function runClient() {
    const {host, port} = config.get("quoteServer");
    const client = new Client(host, Number(port));
    client.run();
}

runClient();
setInterval(() => {
    runClient();
}, 20000);