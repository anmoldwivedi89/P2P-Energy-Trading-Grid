const config = require('./config/env');
const app = require('./app');
const { connectDB, disconnectDB } = require('./config/db');
const { provisionAdmin } = require('./services/admin.provision');

const startServer = async () => {
  try {
    // Attempt MongoDB connection and admin provisioning
    try {
      await connectDB();
      await provisionAdmin();
    } catch (dbError) {
      console.warn(`[Server Warning] MongoDB connection could not be established immediately. The server will start in degraded mode. Reconnecting in background or update MONGODB_URI.`);
    }

    const server = app.listen(config.port, () => {
      console.log(`====================================================`);
      console.log(`⚡ GRID P2P Backend Service Running`);
      console.log(`🚀 Port:         ${config.port}`);
      console.log(`🌐 Environment:  ${config.nodeEnv}`);
      console.log(`🧠 AI Service:   ${config.aiServiceUrl}`);
      console.log(`🩺 Health check: http://localhost:${config.port}/api/health`);
      console.log(`====================================================`);
    });

    // Graceful Shutdown
    const handleShutdown = async (signal) => {
      console.log(`\n[Server] Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        await disconnectDB();
        console.log('[Server] Process exited cleanly.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
    process.on('SIGINT', () => handleShutdown('SIGINT'));
  } catch (error) {
    console.error('[Server Fatal] Could not start application:', error);
    process.exit(1);
  }
};

startServer();
