export function shuffleArray(array: any[]): any[] {
    return array
      .map((item) => ({ value: item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
}
