import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { BadRequestFilter } from './filter/bad-request.filter'
import { MongooseExceptionFilter } from './filter/mongoose-exception.filter'
import swagger from './swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  if (process.env.NODE_ENV === 'development') {
    swagger(app)
  }
  app.useGlobalFilters(new MongooseExceptionFilter())
  await app.listen(3000)
}
bootstrap()
