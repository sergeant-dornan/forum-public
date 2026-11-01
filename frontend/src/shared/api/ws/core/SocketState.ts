export class SocketState {
  private _socket: WebSocket | null = null;

  get(): WebSocket | null {
    return this._socket;
  }

  set(value: WebSocket | null) {
    this._socket = value;
  }

  get isOpen(): boolean {
    return this._socket?.readyState === WebSocket.OPEN;
  }

  get isConnecting(): boolean {
    return this._socket?.readyState === WebSocket.CONNECTING;
  }

  get isAlive(): boolean {
    return this.isOpen || this.isConnecting;
  }
}