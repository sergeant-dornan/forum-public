export class ReconnectionManager {
  private readonly maxReconnectAttempts: number = 20;
  private reconnectAttempts: number = 0;
  private reconnectDelay: number = 3000;
  private reconnectTimer: NodeJS.Timeout | null = null;

  constructor(
    private readonly onReconnect: () => void
  ) { }

  public scheduleReconnect(): void {
    // Отключаем старый таймер
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    // Попытки переподключения кончились
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      return;
    }

    // Увеличиваем время на переподключение 
    const delay = this.reconnectDelay * Math.pow(1.1, this.reconnectAttempts);

    this.reconnectTimer = setTimeout(() => {
      this.reconnectAttempts++
      this.onReconnect();
    }, delay);
  }

  public resetReconnection(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.reconnectAttempts = 0;
  }
}