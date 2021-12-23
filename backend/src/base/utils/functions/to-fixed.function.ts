export function toFixed(value: number, numberOfDigits: number): number {
    return Number( Number( value )
                       .toFixed( numberOfDigits ) );
}
