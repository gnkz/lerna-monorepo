import {Server} from "@daisy/common";

const HOST = process.env.HOST
const PORT = Number(process.env.PORT)

const server = new Server(HOST, PORT);
server.run();