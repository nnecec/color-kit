export function PaletteFooter() {
  return (
    <footer className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center gap-2"> Powered by</div>
      <div className="flex items-center gap-2">
        <a
          className="flex items-center gap-2"
          href="https://github.com/tailwindlabs/tailwindcss"
          rel="noreferrer"
          target="_blank"
        >
          <img alt="Tailwind CSS" className="h-4" src="https://tailwindcss.com/logos/tailwindcss-icon.svg" />
          <div className="text-sm">Tailwind CSS</div>
        </a>
      </div>
    </footer>
  )
}
