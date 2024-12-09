interface TooltipProps {
  content: string;
  visible: boolean;
  x: number;
  y: number;
}

export default function Tooltip({ content, visible, x, y }: TooltipProps) {
  if (!visible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-3 py-1.5 text-sm rounded-md shadow-lg border border-neutral-200 dark:border-neutral-700"
      style={{
        left: x + 5,
        top: y + 5,
        transform: "translate(0, -50%)",
      }}
    >
      {content}
    </div>
  );
}
