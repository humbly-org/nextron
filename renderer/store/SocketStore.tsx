import { action, makeAutoObservable } from 'mobx';
import net from 'net';
import { parseMessage } from '../utils';

type SocketType = net.Socket | null;
export class SocketStore {
  connected = false;
  socket = null as SocketType | string;
  constructor() {
    this.connected = false;
    makeAutoObservable(this);
  }

  connect = async () => {
    if (this.socket) {
      return;
    }
    console.log('running');
    this.socket = await net
      .createConnection(
        {
          port: 3322,
          host: 'localhost',
        },
        () => {
          this.connected = true;
          this.hospitalLogin();
        },
      )
      .on('error', (err) => {
        this.connected = false;
      });
  };

  hospitalLogin = () => {
    this.sendMessage({
      message: 'hospitalLogin',
    });
  };

  changeQueue = (cpf: string, nextQueue: string) => {
    this.sendMessage({
      message: 'changeQueue',
      body: {
        patientCpf: cpf,
        nextQueue: nextQueue,
        requestedOrigin: 'HOSPITAL',
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
    (this.socket as SocketType).destroy();
  };

  sendMessage = (message: string | object) => {
    if ((this.socket as SocketType)?.write) {
      this.connected = true;
      (this.socket as SocketType).write(
        JSON.stringify(message),
        'utf8',
        (e) => {
          if (e) {
            console.error(e);
          }
        },
      );
    }
  };
}
