import chalk from 'chalk';
import { getErrorMessage } from '../../shared/helpers/common.js';
import { createOffer } from '../../shared/helpers/offer.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  private onImportedLine(line: string) {
    const offer = createOffer(line);
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} строк импортировано`);
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [fileName] = parameters;

    if (!fileName) {
      console.error(chalk.red('Не указан путь к TSV-файлу'));
      return;
    }

    const fileReader = new TSVFileReader(fileName.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Ошибка при чтении файла: ${fileName}`);
      console.error(getErrorMessage(error));
    }
  }
}
