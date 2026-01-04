// WebSocket utility for real-time updates
// Ready for future integration

type WebSocketEvent = 'comment_added' | 'comment_deleted' | 'comment_updated';

type WebSocketMessage = {
  type: WebSocketEvent;
  data: any;
};

class WebSocketClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private listeners: Map<WebSocketEvent, Set<(data: any) => void>> = new Map();

  connect(url: string) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          const handlers = this.listeners.get(message.type);
          if (handlers) {
            handlers.forEach((handler) => handler(message.data));
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.reconnect(url);
      };
    } catch (error) {
      console.error('Error connecting WebSocket:', error);
      this.reconnect(url);
    }
  }

  private reconnect(url: string) {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    setTimeout(() => {
      console.log(`Reconnecting... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      this.connect(url);
    }, this.reconnectDelay * this.reconnectAttempts);
  }

  on(event: WebSocketEvent, handler: (data: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);
  }

  off(event: WebSocketEvent, handler: (data: any) => void) {
    const handlers = this.listeners.get(event);
    if (handlers) {
      handlers.delete(handler);
    }
  }

  send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.listeners.clear();
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

// Singleton instance
export const wsClient = new WebSocketClient();

// Helper hook for React components (to be used when needed)
export const useWebSocket = (url: string | null, events: WebSocketEvent[]) => {
  // This can be implemented as a React hook when needed
  // For now, it's ready for integration
  return {
    connect: () => {
      if (url) {
        wsClient.connect(url);
      }
    },
    disconnect: () => {
      wsClient.disconnect();
    },
    isConnected: wsClient.isConnected.bind(wsClient),
    on: wsClient.on.bind(wsClient),
    off: wsClient.off.bind(wsClient),
    send: wsClient.send.bind(wsClient),
  };
};

