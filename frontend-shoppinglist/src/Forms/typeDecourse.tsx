import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import type { ElementType } from 'react'

 
export function TypeDeCourseFields({
    label,
    placeholder,
    type = 'text',
    icon: Icon,
    registration,
    error,
}: {
        label: string
        placeholder: string
        type?: string
        icon: ElementType
        registration: UseFormRegisterReturn
        error?: FieldError
    }) {
    const isTextarea = type.toLowerCase() === 'textarea'

    return (
 <label className="grid gap-2">
      <span className="text-sm font-bold text-textPrimary">{label}</span>
      <span className={`flex items-center gap-3 rounded-xl border bg-white px-3 py-3 text-sm text-textSecondary shadow-sm transition focus-within:ring-4 ${
        error
          ? 'border-danger focus-within:ring-red-100'
          : 'border-slate-200 focus-within:border-primary focus-within:ring-blue-100'
      }`}>
        <Icon className="h-5 w-5 shrink-0 text-textSecondary" />
        {isTextarea ? (
          <textarea
            placeholder={placeholder}
            {...registration}
            className="w-full resize-none bg-transparent text-textPrimary outline-none placeholder:text-slate-400"
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            {...registration}
            className="w-full bg-transparent text-textPrimary outline-none placeholder:text-slate-400"
          />
        )}
      </span>
      {error?.message && <span className="text-xs font-semibold text-danger">{error.message}</span>}
    </label>
    )
}