import EventEmitter from 'node:events';
import {createReadStream} from 'node:fs';
import { FileReader } from './index.js';

const CHUNK_SIZE = 16384;

export class TSVFileReader extends EventEmitter implements FileReader {
  constructor(private readonly filePath: string) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filePath, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf8'
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completedRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        this.emit('line', completedRow);
      }
    }

    this.emit('end', importedRowCount);
  }
}
