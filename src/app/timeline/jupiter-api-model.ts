export interface JupiterApiModel {
  data: {
    category: {
      frontPage: singleStrip[];
    };
  };
}

export interface singleStrip {
  header: string;
  highTimeline: boolean;
  data: any[];
}