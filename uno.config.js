import { presetAttributify, presetUno, presetIcons } from 'unocss'

export default {
  theme: {
    colors: {
      primary: '#8155F4',
      secondary: '#66bb6a',
      warning: '#ff9100',
      negative: '#ff6472',
      dark: {
        primary: '#9a6bfd',
      },
      t: {
        1: '#213547',
        2: 'rgba(60, 60, 60, .7)',
        3: 'rgba(60, 60, 60, .33)',
        4: 'rgba(60, 60, 60, .18)',
        5: 'rgba(255, 255, 255, .87)',
        6: 'rgba(235, 235, 235, .6)',
      },
    },
  },
  presets: [
    presetAttributify({
      ignoreAttributes: ['opacity'],
    }),
    presetUno({
      dark: 'class',
    }),
    presetIcons(),
  ],
  rules: [
    [/^text-([A-Fa-f0-9]{6})$/, ([_, d]) => ({ color: `#${d}` })],
    [/^bg-([A-Fa-f0-9]{6})$/, ([_, d]) => ({ 'background-color': `#${d}` })],
    [/^border-([A-Fa-f0-9]{6})$/, ([_, d]) => ({ 'border-color': `#${d}` })],
    [/fs-(\d+)/, ([_, d]) => ({ 'font-size': `${Number(d) / 16}rem` })],
  ],
}
