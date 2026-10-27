/**
 * Socket.IO service stub / no-op handler
 * The Express backend operates purely via REST API (WebSocket server is not enabled).
 * This service safely provides no-op methods to prevent runtime errors in components
 * referencing SocketContext without attempting connections to localhost or unconfigured hosts.
 */
class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  connect() {
    // No-op: Backend operates via REST API; real-time WebSocket server not enabled
    this.isConnected = false;
  }

  disconnect() {
    this.isConnected = false;
  }

  on(event, callback) {
    // No-op
  }

  off(event, callback) {
    // No-op
  }

  emit(event, data) {
    // No-op
  }
}

export const socketService = new SocketService();
export default socketService;
