/**
 * Validation for the maintainer application form (pages/join.vue).
 * Pure functions — no Vue imports. Mirror of suggestTeamHelpers.ts conventions.
 */

export interface MaintainerApplication {
  name: string
  /** Best way to reach the applicant (Discord, reddit, email, etc). */
  discord: string
  allyCode: string
  why: string
  userEmail: string
  /** Honeypot — hidden from humans, filled by bots. */
  website: string
}

const MAX = {
  name: 60,
  discord: 60,
  allyCode: 12,
  why: 2000,
  userEmail: 100,
} as const

export function validateApplication(form: MaintainerApplication): string[] {
  const errors: string[] = []
  const name = form.name?.trim() ?? ''
  const discord = form.discord?.trim() ?? ''
  const allyCode = form.allyCode?.trim() ?? ''
  const why = form.why?.trim() ?? ''
  const email = form.userEmail?.trim() ?? ''

  if (name.length < 2) errors.push('Please enter your name')
  if (discord.length < 2) errors.push('Please tell us the best way to reach you')
  if (why.length < 20) {
    errors.push('Please tell us a bit more about why you are interested (at least 20 characters)')
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Please enter a valid email address')
  }
  if (allyCode && !/^\d{3,12}$/.test(allyCode)) {
    errors.push('Ally code should be digits only (e.g. 123456789)')
  }

  const fields: Array<[string, string]> = [
    ['name', name],
    ['discord', discord],
    ['allyCode', allyCode],
    ['why', why],
    ['userEmail', email],
  ]
  for (const [field, value] of fields) {
    const max = MAX[field as keyof typeof MAX]
    if (value.length > max) errors.push(`${field} is too long (max ${max} characters)`)
  }

  return errors
}
