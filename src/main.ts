import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const serverPort = configService.get<number>('SERVER_PORT')

  app.useLogger(app.get(Logger))
  await app.listen(serverPort, () => {
    console.log(`Server running at http://127.0.0.1:${serverPort}`)
  })
}

bootstrap()
