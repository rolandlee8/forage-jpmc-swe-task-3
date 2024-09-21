import { ServerRespond } from './DataStreamer';

export interface Row {
  price_1: number,
  price_2: number,
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const price1 = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2
    const price2 = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2
    const ratio = price1 / price2
    const upperBound = 1 + .05
    const lowerBound = 1 - .05
    return {
        price_1: price1,
        price_2: price2,
        ratio: ratio,
        upper_bound: upperBound,
        lower_bound: lowerBound,
        trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp
    };
  }
}
