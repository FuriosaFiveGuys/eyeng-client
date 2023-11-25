/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import EasySeeSo from 'seeso/easy-seeso';

export const seeso = new EasySeeSo();

export const calibrate = (callbackUrl: string) => {
  EasySeeSo.openCalibrationPage('dev_6rrd63vcmgu99crhz8h23l4vuode23n7os1g109q', 'test', `http://localhost:3000${callbackUrl}`, 5);
}