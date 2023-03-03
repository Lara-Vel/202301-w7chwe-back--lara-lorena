import bunyan, { LogLevel } from 'bunyan';

const log = bunyan.createLogger({ name: 'DemoApp' });
log.level((process.env.BUNYAN_LEVEL as LogLevel) ?? 'info');

export default log;
