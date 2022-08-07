import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { BadRequestFilter } from './filter/bad-request.filter'
import { MongooseExceptionFilter } from './filter/mongoose-exception.filter'


async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    )
    app.useGlobalFilters(new BadRequestFilter(), new MongooseExceptionFilter())
    await app.listen(3000)
}
bootstrap()
