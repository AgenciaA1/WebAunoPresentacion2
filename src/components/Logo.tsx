import { asset } from '../lib/asset';

/** Official A1 badge (source: "Logo A1 con borde.avif", 176×176). Swap for an SVG when available. */
export default function Logo({ className = '' }: { className?: string }) {
  return <img src={asset('/logo-a1.webp')} alt="Agencia A1" width={176} height={176} className={className} />;
}
