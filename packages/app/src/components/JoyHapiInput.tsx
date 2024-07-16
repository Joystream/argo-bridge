import { FC, useEffect, useId, useRef, useState } from 'react'
import { hapiToJoy, joyToHapi } from '@/lib/utils'
import { JoyInput } from '@/components/JoyInput'

type JoyHapiInputProps = {
  type: 'joy' | 'hapi'
  hapiValue: bigint
  setHapiValue: (value: bigint) => void
  label?: string
}

export const JoyHapiInput: FC<JoyHapiInputProps> = ({
  type,
  hapiValue,
  setHapiValue,
  label,
}) => {
  const [internalValue, setInternalValue] = useState('')
  const expectValueUpdateRef = useRef(false)

  const handleChange = (rawStringValue: string) => {
    if (type === 'joy') {
      rawStringValue = rawStringValue.replace(/[^\d.]/g, '')
    } else {
      rawStringValue = rawStringValue.replace(/\D/g, '')
    }

    expectValueUpdateRef.current = true
    setInternalValue(rawStringValue)

    try {
      if (type === 'hapi') {
        setHapiValue(BigInt(rawStringValue))
      } else {
        setHapiValue(joyToHapi(Number(rawStringValue)))
      }
    } catch (e) {
      console.error(e)
    }
  }

  // react to external value changes
  useEffect(() => {
    if (expectValueUpdateRef.current) {
      expectValueUpdateRef.current = false
      return
    }

    if (!hapiValue || hapiValue === 0n) {
      setInternalValue('')
      return
    }

    if (type === 'hapi') {
      setInternalValue(hapiValue.toString())
    } else {
      setInternalValue(hapiToJoy(hapiValue).toString())
    }
  }, [hapiValue])

  return (
    <div className="grid w-full items-center gap-2">
      <JoyInput
        label={label ? label : type === 'joy' ? 'JOY' : 'HAPI'}
        placeholder="0"
        value={internalValue}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  )
}
