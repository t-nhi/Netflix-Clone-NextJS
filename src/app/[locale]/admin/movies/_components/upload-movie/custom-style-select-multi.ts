import { GroupBase, StylesConfig } from 'react-select'

export const customSelectMultiStyles: StylesConfig<unknown, true, GroupBase<unknown>> | undefined = {
    control: (base) => ({
        ...base,
        minHeight: 44,
        border: 'none',
        boxShadow: 'none',
        background: 'var(--background)'
    }),
    menu: (base) => ({ ...base, background: 'var(--background)' }),
    option: (base, state) => ({
        ...base,
        background: state.isSelected
            ? 'rgba(255,255,255,0.1)'
            : state.isFocused
              ? 'rgba(255,255,255,0.05)'
              : 'var(--background)',
        color: 'inherit'
    }),
    multiValue: (base) => ({ ...base, background: 'var(--background)' }),
    multiValueLabel: (base) => ({ ...base, color: 'inherit' }),
    multiValueRemove: (base) => ({ ...base, color: 'inherit' }),
    placeholder: (base) => ({ ...base, color: 'inherit' }),
    singleValue: (base) => ({ ...base, color: 'var(--background)' })
}
