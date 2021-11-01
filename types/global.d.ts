declare type VueNode = VNodeChild | JSX.Element;
declare type Recordable<T = any> = Record<string, T>;

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type TimeoutHandle = ReturnType<typeof setTimeout>;
declare type IntervalHandle = ReturnType<typeof setInterval>;
