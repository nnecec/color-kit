import { Color, color } from '@color-kit/color'
import { useHSL } from '@color-kit/crystal'
import { HSLPlugin } from '@color-kit/plugin-hsl'

Color.extends([HSLPlugin()])

export const RGBFields = ({ showLabel = false }: any) => {
  const hsl = useHSL()
  const { b, g, r } = color(hsl).toRGB()

  return (
    <div className="flex gap-2 p-2">
      <label className="form-control w-full max-w-xs">
        {showLabel ?
          <div className="label">
            <span className="label-text">R`</span>
            <span className="label-text-alt">{r}</span>
          </div>
        : null}
        <input className="input input-bordered w-full" max={255} min={0} step={1} value={r} />
      </label>
      <label className="form-control w-full max-w-xs">
        {showLabel ?
          <div className="label">
            <span className="label-text">G</span>
            <span className="label-text-alt">{g}</span>
          </div>
        : null}
        <input className="input input-bordered w-full" max={255} min={0} step={1} value={g} />
      </label>
      <label className="form-control w-full max-w-xs">
        {showLabel ?
          <div className="label">
            <span className="label-text">B</span>
            <span className="label-text-alt">{b}</span>
          </div>
        : null}
        <input className="input input-bordered w-full" max={255} min={0} step={1} value={b} />
      </label>
    </div>
  )
}

export const HSLFields = ({ showLabel = false }: any) => {
  const hsl = useHSL()

  const { h, l, s } = color(hsl).toHSL()
  return (
    <div className="flex gap-2">
      <label className="form-control w-full max-w-xs">
        {showLabel ?
          <div className="label">
            <span className="label-text">H</span>
            <span className="label-text-alt">{h}</span>
          </div>
        : null}
        <input className="input input-bordered w-full" max={360} min={0} step={1} value={h} />
      </label>
      <label className="form-control w-full max-w-xs">
        {showLabel ?
          <div className="label">
            <span className="label-text">S</span>
            <span className="label-text-alt">{s}</span>
          </div>
        : null}
        <input className="input input-bordered w-full" max={100} min={0} step={1} value={s} />
      </label>
      <label className="form-control w-full max-w-xs">
        {showLabel ?
          <div className="label">
            <span className="label-text">L</span>
            <span className="label-text-alt">{l}</span>
          </div>
        : null}
        <input className="input input-bordered w-full" max={100} min={0} step={1} value={l} />
      </label>
    </div>
  )
}
