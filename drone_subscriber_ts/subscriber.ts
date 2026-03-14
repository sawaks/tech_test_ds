import { createServer } from 'http'
import { WebSocketServer } from 'ws'
import Redis from 'ioredis'

const redisClient = new Redis({
  host: 'localhost', // Replace with your Redis server address
  port: 6379,
})

const server = createServer()

const wss = new WebSocketServer({ server })

wss.on('connection', async (ws: WebSocket) => { // 👈 runs every time a client connects
  console.log('Client connected')

  try {
    const pubSub = await redisClient.subscribe('drone_coordinates')// 👈 NEW subscription created each time

    console.log('Subscribed to channel: drone_coordinates')

    redisClient.on('message', (channel: string, message: string) => { // 👈 NEW listener added each time
      console.log(`Received message from ${channel}: ${message}`)
      ws.send(message)
    })
  } catch (err) {
    console.error('Failed to subscribe:', err);
  }
});

server.on('request', (req, res) => {
  res.writeHead(404)
  res.end()
})

server.listen(8080, () => {
  console.log('Server started on port 8080')
})