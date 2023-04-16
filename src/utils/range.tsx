export const range = 
    (min:number, max:number) => 
        Array.from({ 
            length: max - min }, 
            (_, i) => min + i
        );