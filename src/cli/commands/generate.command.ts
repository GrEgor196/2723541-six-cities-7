import { appendFile } from 'node:fs/promises';
import got from 'got';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/tsv-offer-generator.js';
import { MockServerData } from '../../shared/types/mock-server-data.type.js';
import { Command } from './command.interface.js';


export class GenerateCommand implements Command {
  private initialData: MockServerData;

  public getName(): string {
    return '--generate';
  }

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch (error) {
      throw new Error(`Не удалось загрузить данные с URL: ${url}`);
    }
  }

  private async write(filePath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);

    for (let i = 0; i < offerCount; i++) {
      await appendFile(filePath,
        `${tsvOfferGenerator.generate()}\n`,
        { encoding: 'utf8' });
    }
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filePath, url] = parameters;

    if (!count || !filePath || !url) {
      console.error('Ошибка: недостаточно аргументов для команды --generate');
      console.info(
        'Использование: cli.js --generate <count> <filePath> <url>'
      );
      return;
    }

    const offerCount = Number.parseInt(count, 10);

    if (!Number.isInteger(offerCount) || offerCount <= 0) {
      console.error('Количество предложений должно быть положительным целым числом');
      return;
    }

    try {
      await this.load(url);
      await this.write(filePath, offerCount);
      console.info(`Файл ${filePath} успешно создан с ${offerCount} предложениями`);
    } catch (error: unknown) {
      console.error(
        'Не удалось загрузить данные с URL'
      );

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}


