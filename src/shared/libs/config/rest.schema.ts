import convict from 'convict';

export type RestSchema = {
  PORT: number;
};

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'The port number for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000,
  }
});
