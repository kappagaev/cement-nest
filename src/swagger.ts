import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export default (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Cement API')
    .setDescription('The Cement API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        in: 'header',
        name: 'jwt',
        description: 'JWT Access Bearer Token',
      },
      'jwt',
    )
    .addBearerAuth(
      {
        type: 'http',
        in: 'header',
        name: 'jwt-refresh',
        description: 'JWT Refresh Bearer Token',
      },
      'jwt-refresh',
    )
    .addTag('news')
    .addTag('auth')
    .addTag('slider')
    .addTag('user')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
}
