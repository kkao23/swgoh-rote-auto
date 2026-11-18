import { describe, it, expect } from 'vitest'
import { validateApplication, MaintainerApplication } from '~/util/maintainerApply'

const validForm: MaintainerApplication = {
  name: 'Test User',
  discord: 'tester#1234',
  allyCode: '',
  guild: 'Some Guild',
  availability: 'about 10 minutes a day',
  why: 'I love this site and want to keep it going for the guild.',
  userEmail: '',
  website: '',
}

describe('validateApplication', () => {
  it('accepts a fully valid application', () => {
    expect(validateApplication(validForm)).toEqual([])
  })

  it('accepts an application with only the required fields', () => {
    const minimal = { ...validForm, guild: '', userEmail: '', allyCode: '' } as any
    expect(validateApplication(minimal)).toEqual([])
  })

  it('flags missing required fields', () => {
    const errors = validateApplication({
      ...validForm,
      name: '',
      discord: '',
      availability: '',
      why: '',
    } as any)
    expect(errors.join(' ')).toContain('name')
    expect(errors.join(' ')).toContain('Discord')
    expect(errors.join(' ')).toContain('availability')
    expect(errors.join(' ')).toContain('interested')
  })

  it('rejects a "why" that is too short', () => {
    const errors = validateApplication({ ...validForm, why: 'because' } as any)
    expect(errors.some((e) => e.includes('20 characters'))).toBe(true)
  })

  it('rejects a non-numeric ally code', () => {
    const errors = validateApplication({ ...validForm, allyCode: 'abc-123' } as any)
    expect(errors.some((e) => e.includes('Ally code'))).toBe(true)
  })

  it('accepts a numeric ally code', () => {
    expect(validateApplication({ ...validForm, allyCode: '123456789' } as any)).toEqual([])
  })

  it('rejects an invalid contact email', () => {
    const errors = validateApplication({ ...validForm, userEmail: 'not-an-email' } as any)
    expect(errors.some((e) => e.includes('email'))).toBe(true)
  })

  it('rejects oversized fields', () => {
    const errors = validateApplication({ ...validForm, why: 'a'.repeat(2001) } as any)
    expect(errors.some((e) => e.includes('too long'))).toBe(true)
  })

  it('trims whitespace before validating', () => {
    const sloppy = { ...validForm, name: '  ', discord: ' xyz ', why: '  ' + validForm.why + '  ' } as any
    const errors = validateApplication(sloppy)
    expect(errors.some((e) => e.includes('name'))).toBe(true)
    expect(errors.some((e) => e.includes('Discord'))).toBe(false)
  })
})
