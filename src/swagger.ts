import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export default (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Cement API')
    .setDescription('The Cement API description')
    .setVersion('1.0')
    .addTag('news')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
}
