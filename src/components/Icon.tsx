// A small, consistent line-icon set (24x24, 1.75px stroke). Kept in-house to avoid extra dependencies.
const PATHS: Record<string, string> = {
  scan: 'M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16',
  stethoscope: 'M6 3v6a4 4 0 0 0 8 0V3M6 3H5M14 3h1M10 13v2a5 5 0 0 0 10 0v-2M20 11a2 2 0 1 0 0 4a2 2 0 0 0 0-4',
  flask: 'M9 3h6M10 3v6L5 18a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3M7.5 14h9',
  dna: 'M6 3c0 6 12 6 12 12v6M18 3c0 6-12 6-12 12v6M8 7h8M8 17h8',
  pulse: 'M3 12h4l2.5-6 4 12 2.5-6H21',
  scale: 'M12 4v16M7 20h10M5 8h14M5 8l-3 7a3.5 3.5 0 0 0 6 0zM19 8l-3 7a3.5 3.5 0 0 0 6 0z',
  brain: 'M9 4a3 3 0 0 0-3 3a3 3 0 0 0-2 5a3 3 0 0 0 2 5a3 3 0 0 0 6 1V4a3 3 0 0 0-3 0M15 4a3 3 0 0 1 3 3a3 3 0 0 1 2 5a3 3 0 0 1-2 5a3 3 0 0 1-6 1',
  menu: 'M4 7h16M4 12h16M4 17h16',
  x: 'M6 6l12 12M18 6L6 18',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  alert: 'M12 4l9 16H3zM12 10v4M12 17.5v.01',
  arrow: 'M5 12h14M13 6l6 6l-6 6',
  play: 'M7 4.5v15l12-7.5z',
  rotate: 'M4 12a8 8 0 1 0 3-6.2M4 4v4.5h4.5',
  info: 'M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18M12 11v6M12 7.5v.01',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9c-4.5-1-8-4-8-9V6zM9 12l2.2 2.2L15.5 10',
  message: 'M4 5h16v11H9l-5 4zM8 9.5h8M8 12.5h5',
  book: 'M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h11',
  external: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
  database: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3s-3.6 3-8 3s-8-1.3-8-3M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6',
  eye: 'M2 12s3.5-7 10-7s10 7 10 7s-3.5 7-10 7s-10-7-10-7M12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6',
  users: 'M9 11a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7M2.5 20a6.5 6.5 0 0 1 13 0M16 4.3a3.5 3.5 0 0 1 0 6.4M18 14.2a6.5 6.5 0 0 1 3.5 5.8',
  building: 'M5 21V4h10v17M15 9h4v12M3 21h18M8.5 8h3M8.5 12h3M8.5 16h3',
  layers: 'M12 3l9 5l-9 5l-9-5zM3 13l9 5l9-5M3 17.5l9 5l9-5',
  send: 'M4 12l16-8l-6 16l-3-7z',
  trophy: 'M8 4h8v6a4 4 0 0 1-8 0zM8 6H4v2a3 3 0 0 0 4 3M16 6h4v2a3 3 0 0 1-4 3M12 14v4M8 21h8M9.5 18h5',
  lock: 'M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
}

export type IconName = keyof typeof PATHS

export default function Icon({ name, size = 20, className = '' }: { name: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`icon ${className}`}
    >
      <path d={PATHS[name] ?? PATHS.info} />
    </svg>
  )
}
