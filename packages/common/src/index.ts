import * as net from "net";
import * as got from "got";

interface Quote {
    id: string;
    content: string;
    author: string;
}

export class Server {
    private server: net.Server;

    constructor(
        private readonly host: string = "127.0.0.1",
        private readonly port: number = 1337
    ) {
        this.server = net.createServer((socket: net.Socket) => {
            got("https://api.quotable.io/random", {json: true})
                .then((response) => {
                    socket.write(`${response.body["content"]} - <${response.body["author"]}>`);
                    socket.pipe(socket);
                })
                .catch(console.error);
        });
    }

    run() {
        this.server.listen(this.port, this.host);
        console.log(`Server running on ${this.host}:${this.port}`);
    }
}

export class Client {
    private client: net.Socket;

    constructor(
        private readonly host: string = "127.0.0.1",
        private readonly port: number = 1337
    ) {
        this.client = new net.Socket();

        this.client.on("data", (data) => {
            console.log(`[From server]: ${data}`);
            this.client.destroy();
        });

        this.client.on("close", () => console.log("Disconnected"));
    }

    run() {
        this.client.connect(this.port, this.host, () => {
            console.log(`Connected to ${this.host}:${this.port}`);
        });
    }
}