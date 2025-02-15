export function Draw(deck: string[])
{
    const index = Math.floor(Math.random()*deck.length);
    const text = deck[index];
    return text;
}