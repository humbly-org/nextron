import { action, makeAutoObservable } from 'mobx';
import net from 'net';
import { parseMessage } from '../utils';

type SocketType = net.Socket | null;
export class SocketStore {
  socket = null as SocketType;
  constructor() {
    makeAutoObservable(this);
  }

  connect = async () => {
    if (this.socket) {
      return;
    }
    this.socket = await net.createConnection({
      port: 3322,
      host: 'localhost',
    });
    this.hospitalLogin();
  };

  hospitalLogin = () => {
    this.sendMessage({
      message: 'hospitalLogin',
    });
  };

  changeQueue = (cpf: string) => {
    this.sendMessage({
      message: 'changeQueue',
      body: {
        patientCpf: cpf,
      },
    });
  };

  callPatient = (cpf: string) => {
    this.sendMessage({
      message: 'callPatient',
      body: {
        patientCpf: cpf,
      },
    });
  };

  destroy = async () => {
    this.sendMessage({
      message: 'destroy',
    });
    this.socket.destroy();
  };

  sendMessage = (message: string | object) => {
    if (this.socket?.write) {
      this.socket.write(JSON.stringify(message), 'utf8', (e) => {
        if (e) {
          console.error(e);
        }
      });
    }
  };
}
