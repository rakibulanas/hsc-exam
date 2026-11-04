// Shows the short writing style used in the question file:
//   (1010)_2  -> 1010 with a small 2 below
//   2^8       -> 2 with a small 8 above

const NOTATION = /\)_(\w+)|\^(\([^)]*\)|−?\w+)/g;

export default function MathText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let position = 0;

  for (const match of text.matchAll(NOTATION)) {
    const [whole, base, power] = match;
    parts.push(text.slice(position, match.index));

    if (base) {
      parts.push(")", <sub key={match.index}>{base}</sub>);
    } else {
      parts.push(<sup key={match.index}>{power.replace(/^\(|\)$/g, "")}</sup>);
    }

    position = match.index + whole.length;
  }

  parts.push(text.slice(position));

  return <>{parts}</>;
}
