import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import * as path from 'path';

export const StaticServeOptions: ServeStaticModuleOptions = {
  rootPath: path.join(__dirname, '../../../storage/uploads'),
  serveRoot: '/storage/uploads',
};
