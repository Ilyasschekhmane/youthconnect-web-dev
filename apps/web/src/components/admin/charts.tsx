export function generateSparkPath(series: number[], width = 100, height = 24, pad = 4) {
  if (!series || series.length === 0) return '';
  const max = Math.max(...series);
  const min = Math.min(...series);
  const len = series.length;
  const step = (width - pad * 2) / Math.max(1, len - 1);

  const normalize = (v: number) => {
    if (max === min) return height / 2;
    return height - ((v - min) / (max - min)) * (height - pad * 2) - pad;
  };

  const points = series.map((v, i) => {
    const x = pad + i * step;
    const y = normalize(v);
    return `${x},${y}`;
  });

  // build a smooth path using simple quadratic curves
  if (points.length === 1) return `M${points[0]}`;

  let d = `M${points[0]}`;
  for (let i = 1; i < points.length; i++) {
    const [x1, y1] = points[i - 1].split(',').map(Number);
    const [x2, y2] = points[i].split(',').map(Number);
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;
    d += ` Q ${x1} ${y1} ${cx} ${cy}`;
  }
  // final line to last point
  const [lx, ly] = points[points.length - 1].split(',').map(Number);
  d += ` T ${lx} ${ly}`;

  // area path for fill (close path)
  const area = `${d} L ${width - pad} ${height} L ${pad} ${height} Z`;
  return { line: d, area };
}

export function MiniAreaChart({ series, label }: { series: number[]; label?: string }) {
  const w = 120;
  const h = 48;
  const pathObj = generateSparkPath(series, w, h, 6) as any;
  const line = pathObj?.line || '';
  const area = pathObj?.area || '';

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <svg className="mt-2 h-12 w-full" viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        {area && <path d={area} fill="#06b6d4" opacity="0.08" />}
        {line && <path d={line} stroke="#06b6d4" strokeWidth={1.5} fill="none" />}
      </svg>
    </div>
  );
}
