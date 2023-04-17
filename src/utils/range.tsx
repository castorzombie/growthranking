export const calculateYOY = (old: number, current: number) => {
    let a = current - old;
    let b = old;
    let c = a / b;
    return c * 100;
};