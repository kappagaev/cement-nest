import { Inject, Injectable } from '@nestjs/common'
import path, { extname, join } from 'path'
import { promises as fs } from 'fs'

@Injectable()
export class FileService {
  constructor(@Inject('UPLOAD_PATH') private readonly uploadPath: string) {
    console.log(uploadPath)
  }
  async upload(file: Express.Multer.File) {
    const fileName = this.generateFileName(file)
    await fs.writeFile(join(this.uploadPath, fileName), file.buffer, 'binary')
    return fileName
  }

  private generateFileName(file: Express.Multer.File) {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('')

    return `${randomName}${extname(file.originalname)}`
  }
}
