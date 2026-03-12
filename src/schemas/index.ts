import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// DECIMAL
//------------------------------------------------------

export const DecimalJsLikeSchema: z.ZodType<Prisma.DecimalJsLike> = z.object({
  d: z.array(z.number()),
  e: z.number(),
  s: z.number(),
  toFixed: z.any(),
})

export const DECIMAL_STRING_REGEX = /^(?:-?Infinity|NaN|-?(?:0[bB][01]+(?:\.[01]+)?(?:[pP][-+]?\d+)?|0[oO][0-7]+(?:\.[0-7]+)?(?:[pP][-+]?\d+)?|0[xX][\da-fA-F]+(?:\.[\da-fA-F]+)?(?:[pP][-+]?\d+)?|(?:\d+|\d*\.\d+)(?:[eE][-+]?\d+)?))$/;

export const isValidDecimalInput =
  (v?: null | string | number | Prisma.DecimalJsLike): v is string | number | Prisma.DecimalJsLike => {
    if (v === undefined || v === null) return false;
    return (
      (typeof v === 'object' && 'd' in v && 'e' in v && 's' in v && 'toFixed' in v) ||
      (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) ||
      typeof v === 'number'
    )
  };

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','password_hash','role','created_at','updated_at','sponsor_code','avatar_url','is_verified','two_factor_enabled','is_deleted','deleted_at']);

export const PasswordResetTokenScalarFieldEnumSchema = z.enum(['id','token','user_id','expires_at','created_at']);

export const TrustedDeviceScalarFieldEnumSchema = z.enum(['id','user_id','device_identifier','device_name','last_used_at','expires_at','created_at']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['id','token','user_id','expires_at','created_at']);

export const CravingLevelScalarFieldEnumSchema = z.enum(['id','level','label','description','recommendation']);

export const EmotionalStateScalarFieldEnumSchema = z.enum(['id','level','label','description','category']);

export const UserAddictionScalarFieldEnumSchema = z.enum(['id','user_id','custom_name','classification','is_active','registered_at','created_at']);

export const SponsorshipScalarFieldEnumSchema = z.enum(['id','sponsor_id','addict_id','started_at','ended_at','status','termination_reason','created_at']);

export const DailyLogScalarFieldEnumSchema = z.enum(['id','user_id','log_date','consumed','craving_level_id','emotional_state_id','triggers','notes','created_at']);

export const StreakEventScalarFieldEnumSchema = z.enum(['id','streak_id','emergency_alert_id','event_type','event_date','days_achieved','avg_craving_period','avg_emotion_period','created_at']);

export const LogAbsenceScalarFieldEnumSchema = z.enum(['id','user_id','streak_id','last_log_date','detected_at','absence_hours','event_generated','streak_event_id']);

export const SupportContactScalarFieldEnumSchema = z.enum(['id','user_id','contact_name','phone','email','relationship','custom_relationship','is_active','priority_order','created_at','updated_at']);

export const EmergencyAlertScalarFieldEnumSchema = z.enum(['id','user_id','user_addiction_id','activated_at','resulted_in_relapse','resolution_notes','created_at']);

export const StreakScalarFieldEnumSchema = z.enum(['id','user_id','user_addiction_id','status','started_at','day_counter','last_log_date','updated_at']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const UserRoleSchema = z.enum(['ADICTO','PADRINO','ADMIN']);

export type UserRoleType = `${z.infer<typeof UserRoleSchema>}`

export const SponsorshipStatusSchema = z.enum(['PENDING','ACTIVE','INACTIVE']);

export type SponsorshipStatusType = `${z.infer<typeof SponsorshipStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: UserRoleSchema,
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  sponsor_code: z.string().nullable(),
  avatar_url: z.string(),
  is_verified: z.boolean(),
  two_factor_enabled: z.boolean(),
  is_deleted: z.boolean(),
  deleted_at: z.coerce.date().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// PASSWORD RESET TOKEN SCHEMA
/////////////////////////////////////////

export const PasswordResetTokenSchema = z.object({
  id: z.string(),
  token: z.string(),
  user_id: z.string(),
  expires_at: z.coerce.date(),
  created_at: z.coerce.date(),
})

export type PasswordResetToken = z.infer<typeof PasswordResetTokenSchema>

/////////////////////////////////////////
// TRUSTED DEVICE SCHEMA
/////////////////////////////////////////

export const TrustedDeviceSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  device_identifier: z.string(),
  device_name: z.string().nullable(),
  last_used_at: z.coerce.date(),
  expires_at: z.coerce.date(),
  created_at: z.coerce.date(),
})

export type TrustedDevice = z.infer<typeof TrustedDeviceSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  id: z.string(),
  token: z.string(),
  user_id: z.string(),
  expires_at: z.coerce.date(),
  created_at: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// CRAVING LEVEL SCHEMA
/////////////////////////////////////////

export const CravingLevelSchema = z.object({
  id: z.string(),
  level: z.number().int(),
  label: z.string(),
  description: z.string(),
  recommendation: z.string(),
})

export type CravingLevel = z.infer<typeof CravingLevelSchema>

/////////////////////////////////////////
// EMOTIONAL STATE SCHEMA
/////////////////////////////////////////

export const EmotionalStateSchema = z.object({
  id: z.string(),
  level: z.number().int(),
  label: z.string(),
  description: z.string(),
  category: z.string(),
})

export type EmotionalState = z.infer<typeof EmotionalStateSchema>

/////////////////////////////////////////
// USER ADDICTION SCHEMA
/////////////////////////////////////////

export const UserAddictionSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  custom_name: z.string(),
  classification: z.string(),
  is_active: z.boolean(),
  registered_at: z.coerce.date(),
  created_at: z.coerce.date(),
})

export type UserAddiction = z.infer<typeof UserAddictionSchema>

/////////////////////////////////////////
// SPONSORSHIP SCHEMA
/////////////////////////////////////////

export const SponsorshipSchema = z.object({
  status: SponsorshipStatusSchema,
  id: z.string(),
  sponsor_id: z.string(),
  addict_id: z.string(),
  started_at: z.coerce.date(),
  ended_at: z.coerce.date(),
  termination_reason: z.string(),
  created_at: z.coerce.date(),
})

export type Sponsorship = z.infer<typeof SponsorshipSchema>

/////////////////////////////////////////
// DAILY LOG SCHEMA
/////////////////////////////////////////

export const DailyLogSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  log_date: z.coerce.date(),
  consumed: z.boolean(),
  craving_level_id: z.string(),
  emotional_state_id: z.string(),
  triggers: z.string(),
  notes: z.string(),
  created_at: z.coerce.date(),
})

export type DailyLog = z.infer<typeof DailyLogSchema>

/////////////////////////////////////////
// STREAK EVENT SCHEMA
/////////////////////////////////////////

export const StreakEventSchema = z.object({
  id: z.string(),
  streak_id: z.string(),
  emergency_alert_id: z.string(),
  event_type: z.string(),
  event_date: z.coerce.date(),
  days_achieved: z.number().int(),
  avg_craving_period: z.instanceof(Prisma.Decimal, { message: "Field 'avg_craving_period' must be a Decimal. Location: ['Models', 'StreakEvent']"}),
  avg_emotion_period: z.instanceof(Prisma.Decimal, { message: "Field 'avg_emotion_period' must be a Decimal. Location: ['Models', 'StreakEvent']"}),
  created_at: z.coerce.date(),
})

export type StreakEvent = z.infer<typeof StreakEventSchema>

/////////////////////////////////////////
// LOG ABSENCE SCHEMA
/////////////////////////////////////////

export const LogAbsenceSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  streak_id: z.string(),
  last_log_date: z.coerce.date(),
  detected_at: z.coerce.date(),
  absence_hours: z.number().int(),
  event_generated: z.boolean(),
  streak_event_id: z.string(),
})

export type LogAbsence = z.infer<typeof LogAbsenceSchema>

/////////////////////////////////////////
// SUPPORT CONTACT SCHEMA
/////////////////////////////////////////

export const SupportContactSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  contact_name: z.string(),
  phone: z.string(),
  email: z.string(),
  relationship: z.string(),
  custom_relationship: z.string(),
  is_active: z.boolean(),
  priority_order: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type SupportContact = z.infer<typeof SupportContactSchema>

/////////////////////////////////////////
// EMERGENCY ALERT SCHEMA
/////////////////////////////////////////

export const EmergencyAlertSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  user_addiction_id: z.string(),
  activated_at: z.coerce.date(),
  resulted_in_relapse: z.boolean(),
  resolution_notes: z.string(),
  created_at: z.coerce.date(),
})

export type EmergencyAlert = z.infer<typeof EmergencyAlertSchema>

/////////////////////////////////////////
// STREAK SCHEMA
/////////////////////////////////////////

export const StreakSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  user_addiction_id: z.string(),
  status: z.string(),
  started_at: z.coerce.date(),
  day_counter: z.number().int(),
  last_log_date: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type Streak = z.infer<typeof StreakSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  addictions: z.union([z.boolean(),z.lazy(() => UserAddictionFindManyArgsSchema)]).optional(),
  daily_logs: z.union([z.boolean(),z.lazy(() => DailyLogFindManyArgsSchema)]).optional(),
  sponsorships_as_sponsor: z.union([z.boolean(),z.lazy(() => SponsorshipFindManyArgsSchema)]).optional(),
  sponsorships_as_addict: z.union([z.boolean(),z.lazy(() => SponsorshipFindManyArgsSchema)]).optional(),
  contacts: z.union([z.boolean(),z.lazy(() => SupportContactFindManyArgsSchema)]).optional(),
  alerts: z.union([z.boolean(),z.lazy(() => EmergencyAlertFindManyArgsSchema)]).optional(),
  streak: z.union([z.boolean(),z.lazy(() => StreakFindManyArgsSchema)]).optional(),
  absences: z.union([z.boolean(),z.lazy(() => LogAbsenceFindManyArgsSchema)]).optional(),
  password_reset_tokens: z.union([z.boolean(),z.lazy(() => PasswordResetTokenFindManyArgsSchema)]).optional(),
  trusted_devices: z.union([z.boolean(),z.lazy(() => TrustedDeviceFindManyArgsSchema)]).optional(),
  verification_tokens: z.union([z.boolean(),z.lazy(() => VerificationTokenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  addictions: z.boolean().optional(),
  daily_logs: z.boolean().optional(),
  sponsorships_as_sponsor: z.boolean().optional(),
  sponsorships_as_addict: z.boolean().optional(),
  contacts: z.boolean().optional(),
  alerts: z.boolean().optional(),
  streak: z.boolean().optional(),
  absences: z.boolean().optional(),
  password_reset_tokens: z.boolean().optional(),
  trusted_devices: z.boolean().optional(),
  verification_tokens: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  password_hash: z.boolean().optional(),
  role: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  sponsor_code: z.boolean().optional(),
  avatar_url: z.boolean().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  addictions: z.union([z.boolean(),z.lazy(() => UserAddictionFindManyArgsSchema)]).optional(),
  daily_logs: z.union([z.boolean(),z.lazy(() => DailyLogFindManyArgsSchema)]).optional(),
  sponsorships_as_sponsor: z.union([z.boolean(),z.lazy(() => SponsorshipFindManyArgsSchema)]).optional(),
  sponsorships_as_addict: z.union([z.boolean(),z.lazy(() => SponsorshipFindManyArgsSchema)]).optional(),
  contacts: z.union([z.boolean(),z.lazy(() => SupportContactFindManyArgsSchema)]).optional(),
  alerts: z.union([z.boolean(),z.lazy(() => EmergencyAlertFindManyArgsSchema)]).optional(),
  streak: z.union([z.boolean(),z.lazy(() => StreakFindManyArgsSchema)]).optional(),
  absences: z.union([z.boolean(),z.lazy(() => LogAbsenceFindManyArgsSchema)]).optional(),
  password_reset_tokens: z.union([z.boolean(),z.lazy(() => PasswordResetTokenFindManyArgsSchema)]).optional(),
  trusted_devices: z.union([z.boolean(),z.lazy(() => TrustedDeviceFindManyArgsSchema)]).optional(),
  verification_tokens: z.union([z.boolean(),z.lazy(() => VerificationTokenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PASSWORD RESET TOKEN
//------------------------------------------------------

export const PasswordResetTokenIncludeSchema: z.ZodType<Prisma.PasswordResetTokenInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const PasswordResetTokenArgsSchema: z.ZodType<Prisma.PasswordResetTokenDefaultArgs> = z.object({
  select: z.lazy(() => PasswordResetTokenSelectSchema).optional(),
  include: z.lazy(() => PasswordResetTokenIncludeSchema).optional(),
}).strict();

export const PasswordResetTokenSelectSchema: z.ZodType<Prisma.PasswordResetTokenSelect> = z.object({
  id: z.boolean().optional(),
  token: z.boolean().optional(),
  user_id: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  created_at: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// TRUSTED DEVICE
//------------------------------------------------------

export const TrustedDeviceIncludeSchema: z.ZodType<Prisma.TrustedDeviceInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const TrustedDeviceArgsSchema: z.ZodType<Prisma.TrustedDeviceDefaultArgs> = z.object({
  select: z.lazy(() => TrustedDeviceSelectSchema).optional(),
  include: z.lazy(() => TrustedDeviceIncludeSchema).optional(),
}).strict();

export const TrustedDeviceSelectSchema: z.ZodType<Prisma.TrustedDeviceSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  device_identifier: z.boolean().optional(),
  device_name: z.boolean().optional(),
  last_used_at: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  created_at: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenIncludeSchema: z.ZodType<Prisma.VerificationTokenInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const VerificationTokenArgsSchema: z.ZodType<Prisma.VerificationTokenDefaultArgs> = z.object({
  select: z.lazy(() => VerificationTokenSelectSchema).optional(),
  include: z.lazy(() => VerificationTokenIncludeSchema).optional(),
}).strict();

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  id: z.boolean().optional(),
  token: z.boolean().optional(),
  user_id: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  created_at: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// CRAVING LEVEL
//------------------------------------------------------

export const CravingLevelIncludeSchema: z.ZodType<Prisma.CravingLevelInclude> = z.object({
  daily_logs: z.union([z.boolean(),z.lazy(() => DailyLogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CravingLevelCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const CravingLevelArgsSchema: z.ZodType<Prisma.CravingLevelDefaultArgs> = z.object({
  select: z.lazy(() => CravingLevelSelectSchema).optional(),
  include: z.lazy(() => CravingLevelIncludeSchema).optional(),
}).strict();

export const CravingLevelCountOutputTypeArgsSchema: z.ZodType<Prisma.CravingLevelCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CravingLevelCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CravingLevelCountOutputTypeSelectSchema: z.ZodType<Prisma.CravingLevelCountOutputTypeSelect> = z.object({
  daily_logs: z.boolean().optional(),
}).strict();

export const CravingLevelSelectSchema: z.ZodType<Prisma.CravingLevelSelect> = z.object({
  id: z.boolean().optional(),
  level: z.boolean().optional(),
  label: z.boolean().optional(),
  description: z.boolean().optional(),
  recommendation: z.boolean().optional(),
  daily_logs: z.union([z.boolean(),z.lazy(() => DailyLogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CravingLevelCountOutputTypeArgsSchema)]).optional(),
}).strict()

// EMOTIONAL STATE
//------------------------------------------------------

export const EmotionalStateIncludeSchema: z.ZodType<Prisma.EmotionalStateInclude> = z.object({
  daily_logs: z.union([z.boolean(),z.lazy(() => DailyLogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EmotionalStateCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const EmotionalStateArgsSchema: z.ZodType<Prisma.EmotionalStateDefaultArgs> = z.object({
  select: z.lazy(() => EmotionalStateSelectSchema).optional(),
  include: z.lazy(() => EmotionalStateIncludeSchema).optional(),
}).strict();

export const EmotionalStateCountOutputTypeArgsSchema: z.ZodType<Prisma.EmotionalStateCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => EmotionalStateCountOutputTypeSelectSchema).nullish(),
}).strict();

export const EmotionalStateCountOutputTypeSelectSchema: z.ZodType<Prisma.EmotionalStateCountOutputTypeSelect> = z.object({
  daily_logs: z.boolean().optional(),
}).strict();

export const EmotionalStateSelectSchema: z.ZodType<Prisma.EmotionalStateSelect> = z.object({
  id: z.boolean().optional(),
  level: z.boolean().optional(),
  label: z.boolean().optional(),
  description: z.boolean().optional(),
  category: z.boolean().optional(),
  daily_logs: z.union([z.boolean(),z.lazy(() => DailyLogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EmotionalStateCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER ADDICTION
//------------------------------------------------------

export const UserAddictionIncludeSchema: z.ZodType<Prisma.UserAddictionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  streak: z.union([z.boolean(),z.lazy(() => StreakFindManyArgsSchema)]).optional(),
  alerts: z.union([z.boolean(),z.lazy(() => EmergencyAlertFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserAddictionCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const UserAddictionArgsSchema: z.ZodType<Prisma.UserAddictionDefaultArgs> = z.object({
  select: z.lazy(() => UserAddictionSelectSchema).optional(),
  include: z.lazy(() => UserAddictionIncludeSchema).optional(),
}).strict();

export const UserAddictionCountOutputTypeArgsSchema: z.ZodType<Prisma.UserAddictionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserAddictionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserAddictionCountOutputTypeSelectSchema: z.ZodType<Prisma.UserAddictionCountOutputTypeSelect> = z.object({
  streak: z.boolean().optional(),
  alerts: z.boolean().optional(),
}).strict();

export const UserAddictionSelectSchema: z.ZodType<Prisma.UserAddictionSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  custom_name: z.boolean().optional(),
  classification: z.boolean().optional(),
  is_active: z.boolean().optional(),
  registered_at: z.boolean().optional(),
  created_at: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  streak: z.union([z.boolean(),z.lazy(() => StreakFindManyArgsSchema)]).optional(),
  alerts: z.union([z.boolean(),z.lazy(() => EmergencyAlertFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserAddictionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SPONSORSHIP
//------------------------------------------------------

export const SponsorshipIncludeSchema: z.ZodType<Prisma.SponsorshipInclude> = z.object({
  sponsor: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  addict: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const SponsorshipArgsSchema: z.ZodType<Prisma.SponsorshipDefaultArgs> = z.object({
  select: z.lazy(() => SponsorshipSelectSchema).optional(),
  include: z.lazy(() => SponsorshipIncludeSchema).optional(),
}).strict();

export const SponsorshipSelectSchema: z.ZodType<Prisma.SponsorshipSelect> = z.object({
  id: z.boolean().optional(),
  sponsor_id: z.boolean().optional(),
  addict_id: z.boolean().optional(),
  started_at: z.boolean().optional(),
  ended_at: z.boolean().optional(),
  status: z.boolean().optional(),
  termination_reason: z.boolean().optional(),
  created_at: z.boolean().optional(),
  sponsor: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  addict: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// DAILY LOG
//------------------------------------------------------

export const DailyLogIncludeSchema: z.ZodType<Prisma.DailyLogInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  craving_level: z.union([z.boolean(),z.lazy(() => CravingLevelArgsSchema)]).optional(),
  emotional_state: z.union([z.boolean(),z.lazy(() => EmotionalStateArgsSchema)]).optional(),
}).strict();

export const DailyLogArgsSchema: z.ZodType<Prisma.DailyLogDefaultArgs> = z.object({
  select: z.lazy(() => DailyLogSelectSchema).optional(),
  include: z.lazy(() => DailyLogIncludeSchema).optional(),
}).strict();

export const DailyLogSelectSchema: z.ZodType<Prisma.DailyLogSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  log_date: z.boolean().optional(),
  consumed: z.boolean().optional(),
  craving_level_id: z.boolean().optional(),
  emotional_state_id: z.boolean().optional(),
  triggers: z.boolean().optional(),
  notes: z.boolean().optional(),
  created_at: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  craving_level: z.union([z.boolean(),z.lazy(() => CravingLevelArgsSchema)]).optional(),
  emotional_state: z.union([z.boolean(),z.lazy(() => EmotionalStateArgsSchema)]).optional(),
}).strict()

// STREAK EVENT
//------------------------------------------------------

export const StreakEventIncludeSchema: z.ZodType<Prisma.StreakEventInclude> = z.object({
  streak: z.union([z.boolean(),z.lazy(() => StreakArgsSchema)]).optional(),
  absences: z.union([z.boolean(),z.lazy(() => LogAbsenceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StreakEventCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const StreakEventArgsSchema: z.ZodType<Prisma.StreakEventDefaultArgs> = z.object({
  select: z.lazy(() => StreakEventSelectSchema).optional(),
  include: z.lazy(() => StreakEventIncludeSchema).optional(),
}).strict();

export const StreakEventCountOutputTypeArgsSchema: z.ZodType<Prisma.StreakEventCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => StreakEventCountOutputTypeSelectSchema).nullish(),
}).strict();

export const StreakEventCountOutputTypeSelectSchema: z.ZodType<Prisma.StreakEventCountOutputTypeSelect> = z.object({
  absences: z.boolean().optional(),
}).strict();

export const StreakEventSelectSchema: z.ZodType<Prisma.StreakEventSelect> = z.object({
  id: z.boolean().optional(),
  streak_id: z.boolean().optional(),
  emergency_alert_id: z.boolean().optional(),
  event_type: z.boolean().optional(),
  event_date: z.boolean().optional(),
  days_achieved: z.boolean().optional(),
  avg_craving_period: z.boolean().optional(),
  avg_emotion_period: z.boolean().optional(),
  created_at: z.boolean().optional(),
  streak: z.union([z.boolean(),z.lazy(() => StreakArgsSchema)]).optional(),
  absences: z.union([z.boolean(),z.lazy(() => LogAbsenceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StreakEventCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LOG ABSENCE
//------------------------------------------------------

export const LogAbsenceIncludeSchema: z.ZodType<Prisma.LogAbsenceInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  streak_event: z.union([z.boolean(),z.lazy(() => StreakEventArgsSchema)]).optional(),
}).strict();

export const LogAbsenceArgsSchema: z.ZodType<Prisma.LogAbsenceDefaultArgs> = z.object({
  select: z.lazy(() => LogAbsenceSelectSchema).optional(),
  include: z.lazy(() => LogAbsenceIncludeSchema).optional(),
}).strict();

export const LogAbsenceSelectSchema: z.ZodType<Prisma.LogAbsenceSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  streak_id: z.boolean().optional(),
  last_log_date: z.boolean().optional(),
  detected_at: z.boolean().optional(),
  absence_hours: z.boolean().optional(),
  event_generated: z.boolean().optional(),
  streak_event_id: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  streak_event: z.union([z.boolean(),z.lazy(() => StreakEventArgsSchema)]).optional(),
}).strict()

// SUPPORT CONTACT
//------------------------------------------------------

export const SupportContactIncludeSchema: z.ZodType<Prisma.SupportContactInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const SupportContactArgsSchema: z.ZodType<Prisma.SupportContactDefaultArgs> = z.object({
  select: z.lazy(() => SupportContactSelectSchema).optional(),
  include: z.lazy(() => SupportContactIncludeSchema).optional(),
}).strict();

export const SupportContactSelectSchema: z.ZodType<Prisma.SupportContactSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  contact_name: z.boolean().optional(),
  phone: z.boolean().optional(),
  email: z.boolean().optional(),
  relationship: z.boolean().optional(),
  custom_relationship: z.boolean().optional(),
  is_active: z.boolean().optional(),
  priority_order: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// EMERGENCY ALERT
//------------------------------------------------------

export const EmergencyAlertIncludeSchema: z.ZodType<Prisma.EmergencyAlertInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  addiction: z.union([z.boolean(),z.lazy(() => UserAddictionArgsSchema)]).optional(),
}).strict();

export const EmergencyAlertArgsSchema: z.ZodType<Prisma.EmergencyAlertDefaultArgs> = z.object({
  select: z.lazy(() => EmergencyAlertSelectSchema).optional(),
  include: z.lazy(() => EmergencyAlertIncludeSchema).optional(),
}).strict();

export const EmergencyAlertSelectSchema: z.ZodType<Prisma.EmergencyAlertSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  user_addiction_id: z.boolean().optional(),
  activated_at: z.boolean().optional(),
  resulted_in_relapse: z.boolean().optional(),
  resolution_notes: z.boolean().optional(),
  created_at: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  addiction: z.union([z.boolean(),z.lazy(() => UserAddictionArgsSchema)]).optional(),
}).strict()

// STREAK
//------------------------------------------------------

export const StreakIncludeSchema: z.ZodType<Prisma.StreakInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  addiction: z.union([z.boolean(),z.lazy(() => UserAddictionArgsSchema)]).optional(),
  events: z.union([z.boolean(),z.lazy(() => StreakEventFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StreakCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const StreakArgsSchema: z.ZodType<Prisma.StreakDefaultArgs> = z.object({
  select: z.lazy(() => StreakSelectSchema).optional(),
  include: z.lazy(() => StreakIncludeSchema).optional(),
}).strict();

export const StreakCountOutputTypeArgsSchema: z.ZodType<Prisma.StreakCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => StreakCountOutputTypeSelectSchema).nullish(),
}).strict();

export const StreakCountOutputTypeSelectSchema: z.ZodType<Prisma.StreakCountOutputTypeSelect> = z.object({
  events: z.boolean().optional(),
}).strict();

export const StreakSelectSchema: z.ZodType<Prisma.StreakSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  user_addiction_id: z.boolean().optional(),
  status: z.boolean().optional(),
  started_at: z.boolean().optional(),
  day_counter: z.boolean().optional(),
  last_log_date: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  addiction: z.union([z.boolean(),z.lazy(() => UserAddictionArgsSchema)]).optional(),
  events: z.union([z.boolean(),z.lazy(() => StreakEventFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StreakCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  password_hash: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumUserRoleFilterSchema), z.lazy(() => UserRoleSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  sponsor_code: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  avatar_url: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  is_verified: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  two_factor_enabled: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  is_deleted: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionListRelationFilterSchema).optional(),
  daily_logs: z.lazy(() => DailyLogListRelationFilterSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipListRelationFilterSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipListRelationFilterSchema).optional(),
  contacts: z.lazy(() => SupportContactListRelationFilterSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertListRelationFilterSchema).optional(),
  streak: z.lazy(() => StreakListRelationFilterSchema).optional(),
  absences: z.lazy(() => LogAbsenceListRelationFilterSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenListRelationFilterSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceListRelationFilterSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenListRelationFilterSchema).optional(),
});

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password_hash: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  sponsor_code: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  avatar_url: z.lazy(() => SortOrderSchema).optional(),
  is_verified: z.lazy(() => SortOrderSchema).optional(),
  two_factor_enabled: z.lazy(() => SortOrderSchema).optional(),
  is_deleted: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  addictions: z.lazy(() => UserAddictionOrderByRelationAggregateInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogOrderByRelationAggregateInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipOrderByRelationAggregateInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipOrderByRelationAggregateInputSchema).optional(),
  contacts: z.lazy(() => SupportContactOrderByRelationAggregateInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertOrderByRelationAggregateInputSchema).optional(),
  streak: z.lazy(() => StreakOrderByRelationAggregateInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceOrderByRelationAggregateInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenOrderByRelationAggregateInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceOrderByRelationAggregateInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenOrderByRelationAggregateInputSchema).optional(),
});

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string(),
    sponsor_code: z.string(),
  }),
  z.object({
    id: z.string(),
    email: z.string(),
  }),
  z.object({
    id: z.string(),
    sponsor_code: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
    sponsor_code: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    sponsor_code: z.string(),
  }),
])
.and(z.strictObject({
  id: z.string().optional(),
  email: z.string().optional(),
  sponsor_code: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  password_hash: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumUserRoleFilterSchema), z.lazy(() => UserRoleSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  avatar_url: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  is_verified: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  two_factor_enabled: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  is_deleted: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionListRelationFilterSchema).optional(),
  daily_logs: z.lazy(() => DailyLogListRelationFilterSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipListRelationFilterSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipListRelationFilterSchema).optional(),
  contacts: z.lazy(() => SupportContactListRelationFilterSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertListRelationFilterSchema).optional(),
  streak: z.lazy(() => StreakListRelationFilterSchema).optional(),
  absences: z.lazy(() => LogAbsenceListRelationFilterSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenListRelationFilterSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceListRelationFilterSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenListRelationFilterSchema).optional(),
}));

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password_hash: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  sponsor_code: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  avatar_url: z.lazy(() => SortOrderSchema).optional(),
  is_verified: z.lazy(() => SortOrderSchema).optional(),
  two_factor_enabled: z.lazy(() => SortOrderSchema).optional(),
  is_deleted: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
});

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  password_hash: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumUserRoleWithAggregatesFilterSchema), z.lazy(() => UserRoleSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  sponsor_code: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  avatar_url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  is_verified: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  two_factor_enabled: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  is_deleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
});

export const PasswordResetTokenWhereInputSchema: z.ZodType<Prisma.PasswordResetTokenWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => PasswordResetTokenWhereInputSchema), z.lazy(() => PasswordResetTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasswordResetTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasswordResetTokenWhereInputSchema), z.lazy(() => PasswordResetTokenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const PasswordResetTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.PasswordResetTokenOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const PasswordResetTokenWhereUniqueInputSchema: z.ZodType<Prisma.PasswordResetTokenWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    token: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    token: z.string(),
  }),
])
.and(z.strictObject({
  id: z.string().optional(),
  token: z.string().optional(),
  AND: z.union([ z.lazy(() => PasswordResetTokenWhereInputSchema), z.lazy(() => PasswordResetTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasswordResetTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasswordResetTokenWhereInputSchema), z.lazy(() => PasswordResetTokenWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const PasswordResetTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.PasswordResetTokenOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PasswordResetTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PasswordResetTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PasswordResetTokenMinOrderByAggregateInputSchema).optional(),
});

export const PasswordResetTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PasswordResetTokenScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema), z.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema), z.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const TrustedDeviceWhereInputSchema: z.ZodType<Prisma.TrustedDeviceWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => TrustedDeviceWhereInputSchema), z.lazy(() => TrustedDeviceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TrustedDeviceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TrustedDeviceWhereInputSchema), z.lazy(() => TrustedDeviceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  device_identifier: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  device_name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  last_used_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const TrustedDeviceOrderByWithRelationInputSchema: z.ZodType<Prisma.TrustedDeviceOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  device_identifier: z.lazy(() => SortOrderSchema).optional(),
  device_name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_used_at: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const TrustedDeviceWhereUniqueInputSchema: z.ZodType<Prisma.TrustedDeviceWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    device_identifier: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    device_identifier: z.string(),
  }),
])
.and(z.strictObject({
  id: z.string().optional(),
  device_identifier: z.string().optional(),
  AND: z.union([ z.lazy(() => TrustedDeviceWhereInputSchema), z.lazy(() => TrustedDeviceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TrustedDeviceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TrustedDeviceWhereInputSchema), z.lazy(() => TrustedDeviceWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  device_name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  last_used_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const TrustedDeviceOrderByWithAggregationInputSchema: z.ZodType<Prisma.TrustedDeviceOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  device_identifier: z.lazy(() => SortOrderSchema).optional(),
  device_name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_used_at: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TrustedDeviceCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TrustedDeviceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TrustedDeviceMinOrderByAggregateInputSchema).optional(),
});

export const TrustedDeviceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TrustedDeviceScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => TrustedDeviceScalarWhereWithAggregatesInputSchema), z.lazy(() => TrustedDeviceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TrustedDeviceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TrustedDeviceScalarWhereWithAggregatesInputSchema), z.lazy(() => TrustedDeviceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  device_identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  device_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  last_used_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema), z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema), z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    token: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    token: z.string(),
  }),
])
.and(z.strictObject({
  id: z.string().optional(),
  token: z.string().optional(),
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema), z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema), z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional(),
});

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema), z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema), z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const CravingLevelWhereInputSchema: z.ZodType<Prisma.CravingLevelWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CravingLevelWhereInputSchema), z.lazy(() => CravingLevelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CravingLevelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CravingLevelWhereInputSchema), z.lazy(() => CravingLevelWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  level: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  recommendation: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  daily_logs: z.lazy(() => DailyLogListRelationFilterSchema).optional(),
});

export const CravingLevelOrderByWithRelationInputSchema: z.ZodType<Prisma.CravingLevelOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  recommendation: z.lazy(() => SortOrderSchema).optional(),
  daily_logs: z.lazy(() => DailyLogOrderByRelationAggregateInputSchema).optional(),
});

export const CravingLevelWhereUniqueInputSchema: z.ZodType<Prisma.CravingLevelWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    level: z.number().int(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    level: z.number().int(),
  }),
])
.and(z.strictObject({
  id: z.string().optional(),
  level: z.number().int().optional(),
  AND: z.union([ z.lazy(() => CravingLevelWhereInputSchema), z.lazy(() => CravingLevelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CravingLevelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CravingLevelWhereInputSchema), z.lazy(() => CravingLevelWhereInputSchema).array() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  recommendation: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  daily_logs: z.lazy(() => DailyLogListRelationFilterSchema).optional(),
}));

export const CravingLevelOrderByWithAggregationInputSchema: z.ZodType<Prisma.CravingLevelOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  recommendation: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CravingLevelCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CravingLevelAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CravingLevelMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CravingLevelMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CravingLevelSumOrderByAggregateInputSchema).optional(),
});

export const CravingLevelScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CravingLevelScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CravingLevelScalarWhereWithAggregatesInputSchema), z.lazy(() => CravingLevelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CravingLevelScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CravingLevelScalarWhereWithAggregatesInputSchema), z.lazy(() => CravingLevelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  level: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  label: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  recommendation: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const EmotionalStateWhereInputSchema: z.ZodType<Prisma.EmotionalStateWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => EmotionalStateWhereInputSchema), z.lazy(() => EmotionalStateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmotionalStateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmotionalStateWhereInputSchema), z.lazy(() => EmotionalStateWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  level: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  category: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  daily_logs: z.lazy(() => DailyLogListRelationFilterSchema).optional(),
});

export const EmotionalStateOrderByWithRelationInputSchema: z.ZodType<Prisma.EmotionalStateOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  daily_logs: z.lazy(() => DailyLogOrderByRelationAggregateInputSchema).optional(),
});

export const EmotionalStateWhereUniqueInputSchema: z.ZodType<Prisma.EmotionalStateWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    level: z.number().int(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    level: z.number().int(),
  }),
])
.and(z.strictObject({
  id: z.string().optional(),
  level: z.number().int().optional(),
  AND: z.union([ z.lazy(() => EmotionalStateWhereInputSchema), z.lazy(() => EmotionalStateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmotionalStateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmotionalStateWhereInputSchema), z.lazy(() => EmotionalStateWhereInputSchema).array() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  category: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  daily_logs: z.lazy(() => DailyLogListRelationFilterSchema).optional(),
}));

export const EmotionalStateOrderByWithAggregationInputSchema: z.ZodType<Prisma.EmotionalStateOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EmotionalStateCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => EmotionalStateAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EmotionalStateMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EmotionalStateMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => EmotionalStateSumOrderByAggregateInputSchema).optional(),
});

export const EmotionalStateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EmotionalStateScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => EmotionalStateScalarWhereWithAggregatesInputSchema), z.lazy(() => EmotionalStateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmotionalStateScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmotionalStateScalarWhereWithAggregatesInputSchema), z.lazy(() => EmotionalStateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  level: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  label: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  category: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const UserAddictionWhereInputSchema: z.ZodType<Prisma.UserAddictionWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserAddictionWhereInputSchema), z.lazy(() => UserAddictionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserAddictionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserAddictionWhereInputSchema), z.lazy(() => UserAddictionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  custom_name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  classification: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  registered_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  streak: z.lazy(() => StreakListRelationFilterSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertListRelationFilterSchema).optional(),
});

export const UserAddictionOrderByWithRelationInputSchema: z.ZodType<Prisma.UserAddictionOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  custom_name: z.lazy(() => SortOrderSchema).optional(),
  classification: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  registered_at: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  streak: z.lazy(() => StreakOrderByRelationAggregateInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertOrderByRelationAggregateInputSchema).optional(),
});

export const UserAddictionWhereUniqueInputSchema: z.ZodType<Prisma.UserAddictionWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    user_id: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    user_id: z.string(),
  }),
])
.and(z.strictObject({
  id: z.string().optional(),
  user_id: z.string().optional(),
  AND: z.union([ z.lazy(() => UserAddictionWhereInputSchema), z.lazy(() => UserAddictionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserAddictionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserAddictionWhereInputSchema), z.lazy(() => UserAddictionWhereInputSchema).array() ]).optional(),
  custom_name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  classification: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  registered_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  streak: z.lazy(() => StreakListRelationFilterSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertListRelationFilterSchema).optional(),
}));

export const UserAddictionOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserAddictionOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  custom_name: z.lazy(() => SortOrderSchema).optional(),
  classification: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  registered_at: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserAddictionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserAddictionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserAddictionMinOrderByAggregateInputSchema).optional(),
});

export const UserAddictionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserAddictionScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserAddictionScalarWhereWithAggregatesInputSchema), z.lazy(() => UserAddictionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserAddictionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserAddictionScalarWhereWithAggregatesInputSchema), z.lazy(() => UserAddictionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  custom_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  classification: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  registered_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const SponsorshipWhereInputSchema: z.ZodType<Prisma.SponsorshipWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => SponsorshipWhereInputSchema), z.lazy(() => SponsorshipWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SponsorshipWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SponsorshipWhereInputSchema), z.lazy(() => SponsorshipWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  sponsor_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  addict_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  started_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  ended_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumSponsorshipStatusFilterSchema), z.lazy(() => SponsorshipStatusSchema) ]).optional(),
  termination_reason: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  sponsor: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  addict: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const SponsorshipOrderByWithRelationInputSchema: z.ZodType<Prisma.SponsorshipOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  sponsor_id: z.lazy(() => SortOrderSchema).optional(),
  addict_id: z.lazy(() => SortOrderSchema).optional(),
  started_at: z.lazy(() => SortOrderSchema).optional(),
  ended_at: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  termination_reason: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  sponsor: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  addict: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const SponsorshipWhereUniqueInputSchema: z.ZodType<Prisma.SponsorshipWhereUniqueInput> = z.object({
  id: z.string(),
})
.and(z.strictObject({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => SponsorshipWhereInputSchema), z.lazy(() => SponsorshipWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SponsorshipWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SponsorshipWhereInputSchema), z.lazy(() => SponsorshipWhereInputSchema).array() ]).optional(),
  sponsor_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  addict_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  started_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  ended_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumSponsorshipStatusFilterSchema), z.lazy(() => SponsorshipStatusSchema) ]).optional(),
  termination_reason: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  sponsor: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  addict: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const SponsorshipOrderByWithAggregationInputSchema: z.ZodType<Prisma.SponsorshipOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  sponsor_id: z.lazy(() => SortOrderSchema).optional(),
  addict_id: z.lazy(() => SortOrderSchema).optional(),
  started_at: z.lazy(() => SortOrderSchema).optional(),
  ended_at: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  termination_reason: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SponsorshipCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SponsorshipMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SponsorshipMinOrderByAggregateInputSchema).optional(),
});

export const SponsorshipScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SponsorshipScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => SponsorshipScalarWhereWithAggregatesInputSchema), z.lazy(() => SponsorshipScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SponsorshipScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SponsorshipScalarWhereWithAggregatesInputSchema), z.lazy(() => SponsorshipScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  sponsor_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  addict_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  started_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  ended_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumSponsorshipStatusWithAggregatesFilterSchema), z.lazy(() => SponsorshipStatusSchema) ]).optional(),
  termination_reason: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const DailyLogWhereInputSchema: z.ZodType<Prisma.DailyLogWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => DailyLogWhereInputSchema), z.lazy(() => DailyLogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DailyLogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DailyLogWhereInputSchema), z.lazy(() => DailyLogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  log_date: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  consumed: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  craving_level_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  emotional_state_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  triggers: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  notes: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  craving_level: z.union([ z.lazy(() => CravingLevelScalarRelationFilterSchema), z.lazy(() => CravingLevelWhereInputSchema) ]).optional(),
  emotional_state: z.union([ z.lazy(() => EmotionalStateScalarRelationFilterSchema), z.lazy(() => EmotionalStateWhereInputSchema) ]).optional(),
});

export const DailyLogOrderByWithRelationInputSchema: z.ZodType<Prisma.DailyLogOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  log_date: z.lazy(() => SortOrderSchema).optional(),
  consumed: z.lazy(() => SortOrderSchema).optional(),
  craving_level_id: z.lazy(() => SortOrderSchema).optional(),
  emotional_state_id: z.lazy(() => SortOrderSchema).optional(),
  triggers: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  craving_level: z.lazy(() => CravingLevelOrderByWithRelationInputSchema).optional(),
  emotional_state: z.lazy(() => EmotionalStateOrderByWithRelationInputSchema).optional(),
});

export const DailyLogWhereUniqueInputSchema: z.ZodType<Prisma.DailyLogWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    user_id_log_date: z.lazy(() => DailyLogUser_idLog_dateCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    user_id_log_date: z.lazy(() => DailyLogUser_idLog_dateCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.string().optional(),
  user_id_log_date: z.lazy(() => DailyLogUser_idLog_dateCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => DailyLogWhereInputSchema), z.lazy(() => DailyLogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DailyLogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DailyLogWhereInputSchema), z.lazy(() => DailyLogWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  log_date: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  consumed: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  craving_level_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  emotional_state_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  triggers: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  notes: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  craving_level: z.union([ z.lazy(() => CravingLevelScalarRelationFilterSchema), z.lazy(() => CravingLevelWhereInputSchema) ]).optional(),
  emotional_state: z.union([ z.lazy(() => EmotionalStateScalarRelationFilterSchema), z.lazy(() => EmotionalStateWhereInputSchema) ]).optional(),
}));

export const DailyLogOrderByWithAggregationInputSchema: z.ZodType<Prisma.DailyLogOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  log_date: z.lazy(() => SortOrderSchema).optional(),
  consumed: z.lazy(() => SortOrderSchema).optional(),
  craving_level_id: z.lazy(() => SortOrderSchema).optional(),
  emotional_state_id: z.lazy(() => SortOrderSchema).optional(),
  triggers: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DailyLogCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DailyLogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DailyLogMinOrderByAggregateInputSchema).optional(),
});

export const DailyLogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DailyLogScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => DailyLogScalarWhereWithAggregatesInputSchema), z.lazy(() => DailyLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DailyLogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DailyLogScalarWhereWithAggregatesInputSchema), z.lazy(() => DailyLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  log_date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  consumed: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  craving_level_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  emotional_state_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  triggers: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  notes: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const StreakEventWhereInputSchema: z.ZodType<Prisma.StreakEventWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => StreakEventWhereInputSchema), z.lazy(() => StreakEventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StreakEventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StreakEventWhereInputSchema), z.lazy(() => StreakEventWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  streak_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  emergency_alert_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  event_type: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  event_date: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  days_achieved: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  avg_craving_period: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  avg_emotion_period: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  streak: z.union([ z.lazy(() => StreakScalarRelationFilterSchema), z.lazy(() => StreakWhereInputSchema) ]).optional(),
  absences: z.lazy(() => LogAbsenceListRelationFilterSchema).optional(),
});

export const StreakEventOrderByWithRelationInputSchema: z.ZodType<Prisma.StreakEventOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  streak_id: z.lazy(() => SortOrderSchema).optional(),
  emergency_alert_id: z.lazy(() => SortOrderSchema).optional(),
  event_type: z.lazy(() => SortOrderSchema).optional(),
  event_date: z.lazy(() => SortOrderSchema).optional(),
  days_achieved: z.lazy(() => SortOrderSchema).optional(),
  avg_craving_period: z.lazy(() => SortOrderSchema).optional(),
  avg_emotion_period: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  streak: z.lazy(() => StreakOrderByWithRelationInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceOrderByRelationAggregateInputSchema).optional(),
});

export const StreakEventWhereUniqueInputSchema: z.ZodType<Prisma.StreakEventWhereUniqueInput> = z.object({
  id: z.string(),
})
.and(z.strictObject({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => StreakEventWhereInputSchema), z.lazy(() => StreakEventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StreakEventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StreakEventWhereInputSchema), z.lazy(() => StreakEventWhereInputSchema).array() ]).optional(),
  streak_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  emergency_alert_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  event_type: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  event_date: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  days_achieved: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  avg_craving_period: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  avg_emotion_period: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  streak: z.union([ z.lazy(() => StreakScalarRelationFilterSchema), z.lazy(() => StreakWhereInputSchema) ]).optional(),
  absences: z.lazy(() => LogAbsenceListRelationFilterSchema).optional(),
}));

export const StreakEventOrderByWithAggregationInputSchema: z.ZodType<Prisma.StreakEventOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  streak_id: z.lazy(() => SortOrderSchema).optional(),
  emergency_alert_id: z.lazy(() => SortOrderSchema).optional(),
  event_type: z.lazy(() => SortOrderSchema).optional(),
  event_date: z.lazy(() => SortOrderSchema).optional(),
  days_achieved: z.lazy(() => SortOrderSchema).optional(),
  avg_craving_period: z.lazy(() => SortOrderSchema).optional(),
  avg_emotion_period: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StreakEventCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => StreakEventAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StreakEventMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StreakEventMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => StreakEventSumOrderByAggregateInputSchema).optional(),
});

export const StreakEventScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StreakEventScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => StreakEventScalarWhereWithAggregatesInputSchema), z.lazy(() => StreakEventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StreakEventScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StreakEventScalarWhereWithAggregatesInputSchema), z.lazy(() => StreakEventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  streak_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  emergency_alert_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  event_type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  event_date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  days_achieved: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  avg_craving_period: z.union([ z.lazy(() => DecimalWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  avg_emotion_period: z.union([ z.lazy(() => DecimalWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const LogAbsenceWhereInputSchema: z.ZodType<Prisma.LogAbsenceWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => LogAbsenceWhereInputSchema), z.lazy(() => LogAbsenceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LogAbsenceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LogAbsenceWhereInputSchema), z.lazy(() => LogAbsenceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  streak_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  last_log_date: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  detected_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  absence_hours: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  event_generated: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  streak_event_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  streak_event: z.union([ z.lazy(() => StreakEventScalarRelationFilterSchema), z.lazy(() => StreakEventWhereInputSchema) ]).optional(),
});

export const LogAbsenceOrderByWithRelationInputSchema: z.ZodType<Prisma.LogAbsenceOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  streak_id: z.lazy(() => SortOrderSchema).optional(),
  last_log_date: z.lazy(() => SortOrderSchema).optional(),
  detected_at: z.lazy(() => SortOrderSchema).optional(),
  absence_hours: z.lazy(() => SortOrderSchema).optional(),
  event_generated: z.lazy(() => SortOrderSchema).optional(),
  streak_event_id: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  streak_event: z.lazy(() => StreakEventOrderByWithRelationInputSchema).optional(),
});

export const LogAbsenceWhereUniqueInputSchema: z.ZodType<Prisma.LogAbsenceWhereUniqueInput> = z.object({
  id: z.string(),
})
.and(z.strictObject({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => LogAbsenceWhereInputSchema), z.lazy(() => LogAbsenceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LogAbsenceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LogAbsenceWhereInputSchema), z.lazy(() => LogAbsenceWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  streak_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  last_log_date: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  detected_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  absence_hours: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  event_generated: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  streak_event_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  streak_event: z.union([ z.lazy(() => StreakEventScalarRelationFilterSchema), z.lazy(() => StreakEventWhereInputSchema) ]).optional(),
}));

export const LogAbsenceOrderByWithAggregationInputSchema: z.ZodType<Prisma.LogAbsenceOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  streak_id: z.lazy(() => SortOrderSchema).optional(),
  last_log_date: z.lazy(() => SortOrderSchema).optional(),
  detected_at: z.lazy(() => SortOrderSchema).optional(),
  absence_hours: z.lazy(() => SortOrderSchema).optional(),
  event_generated: z.lazy(() => SortOrderSchema).optional(),
  streak_event_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LogAbsenceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LogAbsenceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LogAbsenceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LogAbsenceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LogAbsenceSumOrderByAggregateInputSchema).optional(),
});

export const LogAbsenceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LogAbsenceScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => LogAbsenceScalarWhereWithAggregatesInputSchema), z.lazy(() => LogAbsenceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LogAbsenceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LogAbsenceScalarWhereWithAggregatesInputSchema), z.lazy(() => LogAbsenceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  streak_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  last_log_date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  detected_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  absence_hours: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  event_generated: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  streak_event_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const SupportContactWhereInputSchema: z.ZodType<Prisma.SupportContactWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => SupportContactWhereInputSchema), z.lazy(() => SupportContactWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SupportContactWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SupportContactWhereInputSchema), z.lazy(() => SupportContactWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  contact_name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  relationship: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  custom_relationship: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  priority_order: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const SupportContactOrderByWithRelationInputSchema: z.ZodType<Prisma.SupportContactOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  contact_name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  relationship: z.lazy(() => SortOrderSchema).optional(),
  custom_relationship: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  priority_order: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const SupportContactWhereUniqueInputSchema: z.ZodType<Prisma.SupportContactWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    user_id_email: z.lazy(() => SupportContactUser_idEmailCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    user_id_email: z.lazy(() => SupportContactUser_idEmailCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.string().optional(),
  user_id_email: z.lazy(() => SupportContactUser_idEmailCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => SupportContactWhereInputSchema), z.lazy(() => SupportContactWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SupportContactWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SupportContactWhereInputSchema), z.lazy(() => SupportContactWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  contact_name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  relationship: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  custom_relationship: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  priority_order: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const SupportContactOrderByWithAggregationInputSchema: z.ZodType<Prisma.SupportContactOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  contact_name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  relationship: z.lazy(() => SortOrderSchema).optional(),
  custom_relationship: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  priority_order: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SupportContactCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SupportContactAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SupportContactMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SupportContactMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SupportContactSumOrderByAggregateInputSchema).optional(),
});

export const SupportContactScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SupportContactScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => SupportContactScalarWhereWithAggregatesInputSchema), z.lazy(() => SupportContactScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SupportContactScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SupportContactScalarWhereWithAggregatesInputSchema), z.lazy(() => SupportContactScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  contact_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  relationship: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  custom_relationship: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  priority_order: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const EmergencyAlertWhereInputSchema: z.ZodType<Prisma.EmergencyAlertWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => EmergencyAlertWhereInputSchema), z.lazy(() => EmergencyAlertWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmergencyAlertWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmergencyAlertWhereInputSchema), z.lazy(() => EmergencyAlertWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  user_addiction_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  activated_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  resulted_in_relapse: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  resolution_notes: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  addiction: z.union([ z.lazy(() => UserAddictionScalarRelationFilterSchema), z.lazy(() => UserAddictionWhereInputSchema) ]).optional(),
});

export const EmergencyAlertOrderByWithRelationInputSchema: z.ZodType<Prisma.EmergencyAlertOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  user_addiction_id: z.lazy(() => SortOrderSchema).optional(),
  activated_at: z.lazy(() => SortOrderSchema).optional(),
  resulted_in_relapse: z.lazy(() => SortOrderSchema).optional(),
  resolution_notes: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  addiction: z.lazy(() => UserAddictionOrderByWithRelationInputSchema).optional(),
});

export const EmergencyAlertWhereUniqueInputSchema: z.ZodType<Prisma.EmergencyAlertWhereUniqueInput> = z.object({
  id: z.string(),
})
.and(z.strictObject({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => EmergencyAlertWhereInputSchema), z.lazy(() => EmergencyAlertWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmergencyAlertWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmergencyAlertWhereInputSchema), z.lazy(() => EmergencyAlertWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  user_addiction_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  activated_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  resulted_in_relapse: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  resolution_notes: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  addiction: z.union([ z.lazy(() => UserAddictionScalarRelationFilterSchema), z.lazy(() => UserAddictionWhereInputSchema) ]).optional(),
}));

export const EmergencyAlertOrderByWithAggregationInputSchema: z.ZodType<Prisma.EmergencyAlertOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  user_addiction_id: z.lazy(() => SortOrderSchema).optional(),
  activated_at: z.lazy(() => SortOrderSchema).optional(),
  resulted_in_relapse: z.lazy(() => SortOrderSchema).optional(),
  resolution_notes: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EmergencyAlertCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EmergencyAlertMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EmergencyAlertMinOrderByAggregateInputSchema).optional(),
});

export const EmergencyAlertScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EmergencyAlertScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => EmergencyAlertScalarWhereWithAggregatesInputSchema), z.lazy(() => EmergencyAlertScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmergencyAlertScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmergencyAlertScalarWhereWithAggregatesInputSchema), z.lazy(() => EmergencyAlertScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  user_addiction_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  activated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  resulted_in_relapse: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  resolution_notes: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const StreakWhereInputSchema: z.ZodType<Prisma.StreakWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => StreakWhereInputSchema), z.lazy(() => StreakWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StreakWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StreakWhereInputSchema), z.lazy(() => StreakWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  user_addiction_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  status: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  started_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  day_counter: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  last_log_date: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  addiction: z.union([ z.lazy(() => UserAddictionScalarRelationFilterSchema), z.lazy(() => UserAddictionWhereInputSchema) ]).optional(),
  events: z.lazy(() => StreakEventListRelationFilterSchema).optional(),
});

export const StreakOrderByWithRelationInputSchema: z.ZodType<Prisma.StreakOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  user_addiction_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  started_at: z.lazy(() => SortOrderSchema).optional(),
  day_counter: z.lazy(() => SortOrderSchema).optional(),
  last_log_date: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  addiction: z.lazy(() => UserAddictionOrderByWithRelationInputSchema).optional(),
  events: z.lazy(() => StreakEventOrderByRelationAggregateInputSchema).optional(),
});

export const StreakWhereUniqueInputSchema: z.ZodType<Prisma.StreakWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    user_id: z.string(),
    user_addiction_id: z.string(),
  }),
  z.object({
    id: z.string(),
    user_id: z.string(),
  }),
  z.object({
    id: z.string(),
    user_addiction_id: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    user_id: z.string(),
    user_addiction_id: z.string(),
  }),
  z.object({
    user_id: z.string(),
  }),
  z.object({
    user_addiction_id: z.string(),
  }),
])
.and(z.strictObject({
  id: z.string().optional(),
  user_id: z.string().optional(),
  user_addiction_id: z.string().optional(),
  AND: z.union([ z.lazy(() => StreakWhereInputSchema), z.lazy(() => StreakWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StreakWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StreakWhereInputSchema), z.lazy(() => StreakWhereInputSchema).array() ]).optional(),
  status: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  started_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  day_counter: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  last_log_date: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  addiction: z.union([ z.lazy(() => UserAddictionScalarRelationFilterSchema), z.lazy(() => UserAddictionWhereInputSchema) ]).optional(),
  events: z.lazy(() => StreakEventListRelationFilterSchema).optional(),
}));

export const StreakOrderByWithAggregationInputSchema: z.ZodType<Prisma.StreakOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  user_addiction_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  started_at: z.lazy(() => SortOrderSchema).optional(),
  day_counter: z.lazy(() => SortOrderSchema).optional(),
  last_log_date: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StreakCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => StreakAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StreakMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StreakMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => StreakSumOrderByAggregateInputSchema).optional(),
});

export const StreakScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StreakScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => StreakScalarWhereWithAggregatesInputSchema), z.lazy(() => StreakScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StreakScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StreakScalarWhereWithAggregatesInputSchema), z.lazy(() => StreakScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  user_addiction_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema), z.string() ]).optional(),
  status: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  started_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  day_counter: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  last_log_date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  addictions: z.lazy(() => UserAddictionCreateNestedManyWithoutUserInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipCreateNestedManyWithoutSponsorInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipCreateNestedManyWithoutAddictInputSchema).optional(),
  contacts: z.lazy(() => SupportContactCreateNestedManyWithoutUserInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertCreateNestedManyWithoutUserInputSchema).optional(),
  streak: z.lazy(() => StreakCreateNestedManyWithoutUserInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  addictions: z.lazy(() => UserAddictionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUncheckedCreateNestedManyWithoutSponsorInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUncheckedCreateNestedManyWithoutAddictInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  streak: z.lazy(() => StreakUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionUpdateManyWithoutUserNestedInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUpdateManyWithoutSponsorNestedInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUpdateManyWithoutAddictNestedInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUpdateManyWithoutUserNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUpdateManyWithoutUserNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUpdateManyWithoutUserNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUncheckedUpdateManyWithoutSponsorNestedInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUncheckedUpdateManyWithoutAddictNestedInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
});

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const PasswordResetTokenCreateInputSchema: z.ZodType<Prisma.PasswordResetTokenCreateInput> = z.strictObject({
  id: z.string().optional(),
  token: z.string(),
  expires_at: z.coerce.date(),
  created_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPassword_reset_tokensInputSchema),
});

export const PasswordResetTokenUncheckedCreateInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  token: z.string(),
  user_id: z.string(),
  expires_at: z.coerce.date(),
  created_at: z.coerce.date().optional(),
});

export const PasswordResetTokenUpdateInputSchema: z.ZodType<Prisma.PasswordResetTokenUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPassword_reset_tokensNestedInputSchema).optional(),
});

export const PasswordResetTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PasswordResetTokenCreateManyInputSchema: z.ZodType<Prisma.PasswordResetTokenCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  token: z.string(),
  user_id: z.string(),
  expires_at: z.coerce.date(),
  created_at: z.coerce.date().optional(),
});

export const PasswordResetTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.PasswordResetTokenUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PasswordResetTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TrustedDeviceCreateInputSchema: z.ZodType<Prisma.TrustedDeviceCreateInput> = z.strictObject({
  id: z.string().optional(),
  device_identifier: z.string(),
  device_name: z.string().optional().nullable(),
  last_used_at: z.coerce.date().optional(),
  expires_at: z.coerce.date(),
  created_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutTrusted_devicesInputSchema),
});

export const TrustedDeviceUncheckedCreateInputSchema: z.ZodType<Prisma.TrustedDeviceUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  device_identifier: z.string(),
  device_name: z.string().optional().nullable(),
  last_used_at: z.coerce.date().optional(),
  expires_at: z.coerce.date(),
  created_at: z.coerce.date().optional(),
});

export const TrustedDeviceUpdateInputSchema: z.ZodType<Prisma.TrustedDeviceUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  device_identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  device_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_used_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutTrusted_devicesNestedInputSchema).optional(),
});

export const TrustedDeviceUncheckedUpdateInputSchema: z.ZodType<Prisma.TrustedDeviceUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  device_identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  device_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_used_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TrustedDeviceCreateManyInputSchema: z.ZodType<Prisma.TrustedDeviceCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  device_identifier: z.string(),
  device_name: z.string().optional().nullable(),
  last_used_at: z.coerce.date().optional(),
  expires_at: z.coerce.date(),
  created_at: z.coerce.date().optional(),
});

export const TrustedDeviceUpdateManyMutationInputSchema: z.ZodType<Prisma.TrustedDeviceUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  device_identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  device_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_used_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TrustedDeviceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TrustedDeviceUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  device_identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  device_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_used_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.strictObject({
  id: z.string().optional(),
  token: z.string(),
  expires_at: z.coerce.date(),
  created_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutVerification_tokensInputSchema),
});

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  token: z.string(),
  user_id: z.string(),
  expires_at: z.coerce.date(),
  created_at: z.coerce.date().optional(),
});

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutVerification_tokensNestedInputSchema).optional(),
});

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  token: z.string(),
  user_id: z.string(),
  expires_at: z.coerce.date(),
  created_at: z.coerce.date().optional(),
});

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CravingLevelCreateInputSchema: z.ZodType<Prisma.CravingLevelCreateInput> = z.strictObject({
  id: z.string().optional(),
  level: z.number().int(),
  label: z.string().optional(),
  description: z.string().optional(),
  recommendation: z.string().optional(),
  daily_logs: z.lazy(() => DailyLogCreateNestedManyWithoutCraving_levelInputSchema).optional(),
});

export const CravingLevelUncheckedCreateInputSchema: z.ZodType<Prisma.CravingLevelUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  level: z.number().int(),
  label: z.string().optional(),
  description: z.string().optional(),
  recommendation: z.string().optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedCreateNestedManyWithoutCraving_levelInputSchema).optional(),
});

export const CravingLevelUpdateInputSchema: z.ZodType<Prisma.CravingLevelUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  daily_logs: z.lazy(() => DailyLogUpdateManyWithoutCraving_levelNestedInputSchema).optional(),
});

export const CravingLevelUncheckedUpdateInputSchema: z.ZodType<Prisma.CravingLevelUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedUpdateManyWithoutCraving_levelNestedInputSchema).optional(),
});

export const CravingLevelCreateManyInputSchema: z.ZodType<Prisma.CravingLevelCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  level: z.number().int(),
  label: z.string().optional(),
  description: z.string().optional(),
  recommendation: z.string().optional(),
});

export const CravingLevelUpdateManyMutationInputSchema: z.ZodType<Prisma.CravingLevelUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CravingLevelUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CravingLevelUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const EmotionalStateCreateInputSchema: z.ZodType<Prisma.EmotionalStateCreateInput> = z.strictObject({
  id: z.string().optional(),
  level: z.number().int(),
  label: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  daily_logs: z.lazy(() => DailyLogCreateNestedManyWithoutEmotional_stateInputSchema).optional(),
});

export const EmotionalStateUncheckedCreateInputSchema: z.ZodType<Prisma.EmotionalStateUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  level: z.number().int(),
  label: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedCreateNestedManyWithoutEmotional_stateInputSchema).optional(),
});

export const EmotionalStateUpdateInputSchema: z.ZodType<Prisma.EmotionalStateUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  daily_logs: z.lazy(() => DailyLogUpdateManyWithoutEmotional_stateNestedInputSchema).optional(),
});

export const EmotionalStateUncheckedUpdateInputSchema: z.ZodType<Prisma.EmotionalStateUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedUpdateManyWithoutEmotional_stateNestedInputSchema).optional(),
});

export const EmotionalStateCreateManyInputSchema: z.ZodType<Prisma.EmotionalStateCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  level: z.number().int(),
  label: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
});

export const EmotionalStateUpdateManyMutationInputSchema: z.ZodType<Prisma.EmotionalStateUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const EmotionalStateUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EmotionalStateUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserAddictionCreateInputSchema: z.ZodType<Prisma.UserAddictionCreateInput> = z.strictObject({
  id: z.string().optional(),
  custom_name: z.string(),
  classification: z.string().optional(),
  is_active: z.boolean().optional(),
  registered_at: z.coerce.date().optional(),
  created_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAddictionsInputSchema),
  streak: z.lazy(() => StreakCreateNestedManyWithoutAddictionInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertCreateNestedManyWithoutAddictionInputSchema).optional(),
});

export const UserAddictionUncheckedCreateInputSchema: z.ZodType<Prisma.UserAddictionUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  custom_name: z.string(),
  classification: z.string().optional(),
  is_active: z.boolean().optional(),
  registered_at: z.coerce.date().optional(),
  created_at: z.coerce.date().optional(),
  streak: z.lazy(() => StreakUncheckedCreateNestedManyWithoutAddictionInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedCreateNestedManyWithoutAddictionInputSchema).optional(),
});

export const UserAddictionUpdateInputSchema: z.ZodType<Prisma.UserAddictionUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  custom_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  classification: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  registered_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAddictionsNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUpdateManyWithoutAddictionNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUpdateManyWithoutAddictionNestedInputSchema).optional(),
});

export const UserAddictionUncheckedUpdateInputSchema: z.ZodType<Prisma.UserAddictionUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  custom_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  classification: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  registered_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  streak: z.lazy(() => StreakUncheckedUpdateManyWithoutAddictionNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedUpdateManyWithoutAddictionNestedInputSchema).optional(),
});

export const UserAddictionCreateManyInputSchema: z.ZodType<Prisma.UserAddictionCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  custom_name: z.string(),
  classification: z.string().optional(),
  is_active: z.boolean().optional(),
  registered_at: z.coerce.date().optional(),
  created_at: z.coerce.date().optional(),
});

export const UserAddictionUpdateManyMutationInputSchema: z.ZodType<Prisma.UserAddictionUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  custom_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  classification: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  registered_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserAddictionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserAddictionUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  custom_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  classification: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  registered_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SponsorshipCreateInputSchema: z.ZodType<Prisma.SponsorshipCreateInput> = z.strictObject({
  id: z.string().optional(),
  started_at: z.coerce.date().optional(),
  ended_at: z.coerce.date().optional(),
  status: z.lazy(() => SponsorshipStatusSchema).optional(),
  termination_reason: z.string().optional(),
  created_at: z.coerce.date().optional(),
  sponsor: z.lazy(() => UserCreateNestedOneWithoutSponsorships_as_sponsorInputSchema).optional(),
  addict: z.lazy(() => UserCreateNestedOneWithoutSponsorships_as_addictInputSchema).optional(),
});

export const SponsorshipUncheckedCreateInputSchema: z.ZodType<Prisma.SponsorshipUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  sponsor_id: z.string().optional(),
  addict_id: z.string().optional(),
  started_at: z.coerce.date().optional(),
  ended_at: z.coerce.date().optional(),
  status: z.lazy(() => SponsorshipStatusSchema).optional(),
  termination_reason: z.string().optional(),
  created_at: z.coerce.date().optional(),
});

export const SponsorshipUpdateInputSchema: z.ZodType<Prisma.SponsorshipUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ended_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SponsorshipStatusSchema), z.lazy(() => EnumSponsorshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  termination_reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor: z.lazy(() => UserUpdateOneRequiredWithoutSponsorships_as_sponsorNestedInputSchema).optional(),
  addict: z.lazy(() => UserUpdateOneRequiredWithoutSponsorships_as_addictNestedInputSchema).optional(),
});

export const SponsorshipUncheckedUpdateInputSchema: z.ZodType<Prisma.SponsorshipUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  addict_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ended_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SponsorshipStatusSchema), z.lazy(() => EnumSponsorshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  termination_reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SponsorshipCreateManyInputSchema: z.ZodType<Prisma.SponsorshipCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  sponsor_id: z.string().optional(),
  addict_id: z.string().optional(),
  started_at: z.coerce.date().optional(),
  ended_at: z.coerce.date().optional(),
  status: z.lazy(() => SponsorshipStatusSchema).optional(),
  termination_reason: z.string().optional(),
  created_at: z.coerce.date().optional(),
});

export const SponsorshipUpdateManyMutationInputSchema: z.ZodType<Prisma.SponsorshipUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ended_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SponsorshipStatusSchema), z.lazy(() => EnumSponsorshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  termination_reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SponsorshipUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SponsorshipUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  addict_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ended_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SponsorshipStatusSchema), z.lazy(() => EnumSponsorshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  termination_reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DailyLogCreateInputSchema: z.ZodType<Prisma.DailyLogCreateInput> = z.strictObject({
  id: z.string().optional(),
  log_date: z.coerce.date(),
  consumed: z.boolean().optional(),
  triggers: z.string().optional(),
  notes: z.string().optional(),
  created_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutDaily_logsInputSchema),
  craving_level: z.lazy(() => CravingLevelCreateNestedOneWithoutDaily_logsInputSchema),
  emotional_state: z.lazy(() => EmotionalStateCreateNestedOneWithoutDaily_logsInputSchema),
});

export const DailyLogUncheckedCreateInputSchema: z.ZodType<Prisma.DailyLogUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  log_date: z.coerce.date(),
  consumed: z.boolean().optional(),
  craving_level_id: z.string(),
  emotional_state_id: z.string(),
  triggers: z.string().optional(),
  notes: z.string().optional(),
  created_at: z.coerce.date().optional(),
});

export const DailyLogUpdateInputSchema: z.ZodType<Prisma.DailyLogUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  consumed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  triggers: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutDaily_logsNestedInputSchema).optional(),
  craving_level: z.lazy(() => CravingLevelUpdateOneRequiredWithoutDaily_logsNestedInputSchema).optional(),
  emotional_state: z.lazy(() => EmotionalStateUpdateOneRequiredWithoutDaily_logsNestedInputSchema).optional(),
});

export const DailyLogUncheckedUpdateInputSchema: z.ZodType<Prisma.DailyLogUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  consumed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  craving_level_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emotional_state_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  triggers: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DailyLogCreateManyInputSchema: z.ZodType<Prisma.DailyLogCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  log_date: z.coerce.date(),
  consumed: z.boolean().optional(),
  craving_level_id: z.string(),
  emotional_state_id: z.string(),
  triggers: z.string().optional(),
  notes: z.string().optional(),
  created_at: z.coerce.date().optional(),
});

export const DailyLogUpdateManyMutationInputSchema: z.ZodType<Prisma.DailyLogUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  consumed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  triggers: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DailyLogUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DailyLogUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  consumed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  craving_level_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emotional_state_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  triggers: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StreakEventCreateInputSchema: z.ZodType<Prisma.StreakEventCreateInput> = z.strictObject({
  id: z.string().optional(),
  emergency_alert_id: z.string().optional(),
  event_type: z.string().optional(),
  event_date: z.coerce.date(),
  days_achieved: z.number().int().optional(),
  avg_craving_period: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  avg_emotion_period: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  created_at: z.coerce.date().optional(),
  streak: z.lazy(() => StreakCreateNestedOneWithoutEventsInputSchema),
  absences: z.lazy(() => LogAbsenceCreateNestedManyWithoutStreak_eventInputSchema).optional(),
});

export const StreakEventUncheckedCreateInputSchema: z.ZodType<Prisma.StreakEventUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  streak_id: z.string(),
  emergency_alert_id: z.string().optional(),
  event_type: z.string().optional(),
  event_date: z.coerce.date(),
  days_achieved: z.number().int().optional(),
  avg_craving_period: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  avg_emotion_period: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  created_at: z.coerce.date().optional(),
  absences: z.lazy(() => LogAbsenceUncheckedCreateNestedManyWithoutStreak_eventInputSchema).optional(),
});

export const StreakEventUpdateInputSchema: z.ZodType<Prisma.StreakEventUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergency_alert_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event_type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  days_achieved: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  avg_craving_period: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  avg_emotion_period: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  streak: z.lazy(() => StreakUpdateOneRequiredWithoutEventsNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUpdateManyWithoutStreak_eventNestedInputSchema).optional(),
});

export const StreakEventUncheckedUpdateInputSchema: z.ZodType<Prisma.StreakEventUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  streak_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergency_alert_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event_type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  days_achieved: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  avg_craving_period: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  avg_emotion_period: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedUpdateManyWithoutStreak_eventNestedInputSchema).optional(),
});

export const StreakEventCreateManyInputSchema: z.ZodType<Prisma.StreakEventCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  streak_id: z.string(),
  emergency_alert_id: z.string().optional(),
  event_type: z.string().optional(),
  event_date: z.coerce.date(),
  days_achieved: z.number().int().optional(),
  avg_craving_period: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  avg_emotion_period: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  created_at: z.coerce.date().optional(),
});

export const StreakEventUpdateManyMutationInputSchema: z.ZodType<Prisma.StreakEventUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergency_alert_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event_type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  days_achieved: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  avg_craving_period: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  avg_emotion_period: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StreakEventUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StreakEventUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  streak_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergency_alert_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event_type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  days_achieved: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  avg_craving_period: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  avg_emotion_period: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const LogAbsenceCreateInputSchema: z.ZodType<Prisma.LogAbsenceCreateInput> = z.strictObject({
  id: z.string().optional(),
  streak_id: z.string(),
  last_log_date: z.coerce.date().optional(),
  detected_at: z.coerce.date().optional(),
  absence_hours: z.number().int().optional(),
  event_generated: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAbsencesInputSchema),
  streak_event: z.lazy(() => StreakEventCreateNestedOneWithoutAbsencesInputSchema).optional(),
});

export const LogAbsenceUncheckedCreateInputSchema: z.ZodType<Prisma.LogAbsenceUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  streak_id: z.string(),
  last_log_date: z.coerce.date().optional(),
  detected_at: z.coerce.date().optional(),
  absence_hours: z.number().int().optional(),
  event_generated: z.boolean().optional(),
  streak_event_id: z.string().optional(),
});

export const LogAbsenceUpdateInputSchema: z.ZodType<Prisma.LogAbsenceUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  streak_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  detected_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  absence_hours: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  event_generated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAbsencesNestedInputSchema).optional(),
  streak_event: z.lazy(() => StreakEventUpdateOneRequiredWithoutAbsencesNestedInputSchema).optional(),
});

export const LogAbsenceUncheckedUpdateInputSchema: z.ZodType<Prisma.LogAbsenceUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  streak_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  detected_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  absence_hours: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  event_generated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  streak_event_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const LogAbsenceCreateManyInputSchema: z.ZodType<Prisma.LogAbsenceCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  streak_id: z.string(),
  last_log_date: z.coerce.date().optional(),
  detected_at: z.coerce.date().optional(),
  absence_hours: z.number().int().optional(),
  event_generated: z.boolean().optional(),
  streak_event_id: z.string().optional(),
});

export const LogAbsenceUpdateManyMutationInputSchema: z.ZodType<Prisma.LogAbsenceUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  streak_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  detected_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  absence_hours: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  event_generated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const LogAbsenceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LogAbsenceUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  streak_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  detected_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  absence_hours: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  event_generated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  streak_event_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SupportContactCreateInputSchema: z.ZodType<Prisma.SupportContactCreateInput> = z.strictObject({
  id: z.string().optional(),
  contact_name: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
  relationship: z.string().optional(),
  custom_relationship: z.string().optional(),
  is_active: z.boolean().optional(),
  priority_order: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutContactsInputSchema),
});

export const SupportContactUncheckedCreateInputSchema: z.ZodType<Prisma.SupportContactUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  contact_name: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
  relationship: z.string().optional(),
  custom_relationship: z.string().optional(),
  is_active: z.boolean().optional(),
  priority_order: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export const SupportContactUpdateInputSchema: z.ZodType<Prisma.SupportContactUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  custom_relationship: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  priority_order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutContactsNestedInputSchema).optional(),
});

export const SupportContactUncheckedUpdateInputSchema: z.ZodType<Prisma.SupportContactUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  custom_relationship: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  priority_order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SupportContactCreateManyInputSchema: z.ZodType<Prisma.SupportContactCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  contact_name: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
  relationship: z.string().optional(),
  custom_relationship: z.string().optional(),
  is_active: z.boolean().optional(),
  priority_order: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export const SupportContactUpdateManyMutationInputSchema: z.ZodType<Prisma.SupportContactUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  custom_relationship: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  priority_order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SupportContactUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SupportContactUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  custom_relationship: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  priority_order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const EmergencyAlertCreateInputSchema: z.ZodType<Prisma.EmergencyAlertCreateInput> = z.strictObject({
  id: z.string().optional(),
  activated_at: z.coerce.date().optional(),
  resulted_in_relapse: z.boolean().optional(),
  resolution_notes: z.string().optional(),
  created_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAlertsInputSchema),
  addiction: z.lazy(() => UserAddictionCreateNestedOneWithoutAlertsInputSchema),
});

export const EmergencyAlertUncheckedCreateInputSchema: z.ZodType<Prisma.EmergencyAlertUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  user_addiction_id: z.string(),
  activated_at: z.coerce.date().optional(),
  resulted_in_relapse: z.boolean().optional(),
  resolution_notes: z.string().optional(),
  created_at: z.coerce.date().optional(),
});

export const EmergencyAlertUpdateInputSchema: z.ZodType<Prisma.EmergencyAlertUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  resulted_in_relapse: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  resolution_notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAlertsNestedInputSchema).optional(),
  addiction: z.lazy(() => UserAddictionUpdateOneRequiredWithoutAlertsNestedInputSchema).optional(),
});

export const EmergencyAlertUncheckedUpdateInputSchema: z.ZodType<Prisma.EmergencyAlertUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_addiction_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  resulted_in_relapse: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  resolution_notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const EmergencyAlertCreateManyInputSchema: z.ZodType<Prisma.EmergencyAlertCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  user_addiction_id: z.string(),
  activated_at: z.coerce.date().optional(),
  resulted_in_relapse: z.boolean().optional(),
  resolution_notes: z.string().optional(),
  created_at: z.coerce.date().optional(),
});

export const EmergencyAlertUpdateManyMutationInputSchema: z.ZodType<Prisma.EmergencyAlertUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  resulted_in_relapse: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  resolution_notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const EmergencyAlertUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EmergencyAlertUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_addiction_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  resulted_in_relapse: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  resolution_notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StreakCreateInputSchema: z.ZodType<Prisma.StreakCreateInput> = z.strictObject({
  id: z.string().optional(),
  status: z.string().optional(),
  started_at: z.coerce.date(),
  day_counter: z.number().int().optional(),
  last_log_date: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutStreakInputSchema),
  addiction: z.lazy(() => UserAddictionCreateNestedOneWithoutStreakInputSchema),
  events: z.lazy(() => StreakEventCreateNestedManyWithoutStreakInputSchema).optional(),
});

export const StreakUncheckedCreateInputSchema: z.ZodType<Prisma.StreakUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  user_addiction_id: z.string(),
  status: z.string().optional(),
  started_at: z.coerce.date(),
  day_counter: z.number().int().optional(),
  last_log_date: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  events: z.lazy(() => StreakEventUncheckedCreateNestedManyWithoutStreakInputSchema).optional(),
});

export const StreakUpdateInputSchema: z.ZodType<Prisma.StreakUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  day_counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  last_log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutStreakNestedInputSchema).optional(),
  addiction: z.lazy(() => UserAddictionUpdateOneRequiredWithoutStreakNestedInputSchema).optional(),
  events: z.lazy(() => StreakEventUpdateManyWithoutStreakNestedInputSchema).optional(),
});

export const StreakUncheckedUpdateInputSchema: z.ZodType<Prisma.StreakUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_addiction_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  day_counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  last_log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  events: z.lazy(() => StreakEventUncheckedUpdateManyWithoutStreakNestedInputSchema).optional(),
});

export const StreakCreateManyInputSchema: z.ZodType<Prisma.StreakCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  user_addiction_id: z.string(),
  status: z.string().optional(),
  started_at: z.coerce.date(),
  day_counter: z.number().int().optional(),
  last_log_date: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export const StreakUpdateManyMutationInputSchema: z.ZodType<Prisma.StreakUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  day_counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  last_log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StreakUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StreakUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_addiction_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  day_counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  last_log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
});

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const EnumUserRoleFilterSchema: z.ZodType<Prisma.EnumUserRoleFilter> = z.strictObject({
  equals: z.lazy(() => UserRoleSchema).optional(),
  in: z.lazy(() => UserRoleSchema).array().optional(),
  notIn: z.lazy(() => UserRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => NestedEnumUserRoleFilterSchema) ]).optional(),
});

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
});

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
});

export const UserAddictionListRelationFilterSchema: z.ZodType<Prisma.UserAddictionListRelationFilter> = z.strictObject({
  every: z.lazy(() => UserAddictionWhereInputSchema).optional(),
  some: z.lazy(() => UserAddictionWhereInputSchema).optional(),
  none: z.lazy(() => UserAddictionWhereInputSchema).optional(),
});

export const DailyLogListRelationFilterSchema: z.ZodType<Prisma.DailyLogListRelationFilter> = z.strictObject({
  every: z.lazy(() => DailyLogWhereInputSchema).optional(),
  some: z.lazy(() => DailyLogWhereInputSchema).optional(),
  none: z.lazy(() => DailyLogWhereInputSchema).optional(),
});

export const SponsorshipListRelationFilterSchema: z.ZodType<Prisma.SponsorshipListRelationFilter> = z.strictObject({
  every: z.lazy(() => SponsorshipWhereInputSchema).optional(),
  some: z.lazy(() => SponsorshipWhereInputSchema).optional(),
  none: z.lazy(() => SponsorshipWhereInputSchema).optional(),
});

export const SupportContactListRelationFilterSchema: z.ZodType<Prisma.SupportContactListRelationFilter> = z.strictObject({
  every: z.lazy(() => SupportContactWhereInputSchema).optional(),
  some: z.lazy(() => SupportContactWhereInputSchema).optional(),
  none: z.lazy(() => SupportContactWhereInputSchema).optional(),
});

export const EmergencyAlertListRelationFilterSchema: z.ZodType<Prisma.EmergencyAlertListRelationFilter> = z.strictObject({
  every: z.lazy(() => EmergencyAlertWhereInputSchema).optional(),
  some: z.lazy(() => EmergencyAlertWhereInputSchema).optional(),
  none: z.lazy(() => EmergencyAlertWhereInputSchema).optional(),
});

export const StreakListRelationFilterSchema: z.ZodType<Prisma.StreakListRelationFilter> = z.strictObject({
  every: z.lazy(() => StreakWhereInputSchema).optional(),
  some: z.lazy(() => StreakWhereInputSchema).optional(),
  none: z.lazy(() => StreakWhereInputSchema).optional(),
});

export const LogAbsenceListRelationFilterSchema: z.ZodType<Prisma.LogAbsenceListRelationFilter> = z.strictObject({
  every: z.lazy(() => LogAbsenceWhereInputSchema).optional(),
  some: z.lazy(() => LogAbsenceWhereInputSchema).optional(),
  none: z.lazy(() => LogAbsenceWhereInputSchema).optional(),
});

export const PasswordResetTokenListRelationFilterSchema: z.ZodType<Prisma.PasswordResetTokenListRelationFilter> = z.strictObject({
  every: z.lazy(() => PasswordResetTokenWhereInputSchema).optional(),
  some: z.lazy(() => PasswordResetTokenWhereInputSchema).optional(),
  none: z.lazy(() => PasswordResetTokenWhereInputSchema).optional(),
});

export const TrustedDeviceListRelationFilterSchema: z.ZodType<Prisma.TrustedDeviceListRelationFilter> = z.strictObject({
  every: z.lazy(() => TrustedDeviceWhereInputSchema).optional(),
  some: z.lazy(() => TrustedDeviceWhereInputSchema).optional(),
  none: z.lazy(() => TrustedDeviceWhereInputSchema).optional(),
});

export const VerificationTokenListRelationFilterSchema: z.ZodType<Prisma.VerificationTokenListRelationFilter> = z.strictObject({
  every: z.lazy(() => VerificationTokenWhereInputSchema).optional(),
  some: z.lazy(() => VerificationTokenWhereInputSchema).optional(),
  none: z.lazy(() => VerificationTokenWhereInputSchema).optional(),
});

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.strictObject({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional(),
});

export const UserAddictionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserAddictionOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const DailyLogOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DailyLogOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const SponsorshipOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SponsorshipOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const SupportContactOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SupportContactOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const EmergencyAlertOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EmergencyAlertOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const StreakOrderByRelationAggregateInputSchema: z.ZodType<Prisma.StreakOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const LogAbsenceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LogAbsenceOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const PasswordResetTokenOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PasswordResetTokenOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const TrustedDeviceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TrustedDeviceOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const VerificationTokenOrderByRelationAggregateInputSchema: z.ZodType<Prisma.VerificationTokenOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password_hash: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  sponsor_code: z.lazy(() => SortOrderSchema).optional(),
  avatar_url: z.lazy(() => SortOrderSchema).optional(),
  is_verified: z.lazy(() => SortOrderSchema).optional(),
  two_factor_enabled: z.lazy(() => SortOrderSchema).optional(),
  is_deleted: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password_hash: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  sponsor_code: z.lazy(() => SortOrderSchema).optional(),
  avatar_url: z.lazy(() => SortOrderSchema).optional(),
  is_verified: z.lazy(() => SortOrderSchema).optional(),
  two_factor_enabled: z.lazy(() => SortOrderSchema).optional(),
  is_deleted: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password_hash: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  sponsor_code: z.lazy(() => SortOrderSchema).optional(),
  avatar_url: z.lazy(() => SortOrderSchema).optional(),
  is_verified: z.lazy(() => SortOrderSchema).optional(),
  two_factor_enabled: z.lazy(() => SortOrderSchema).optional(),
  is_deleted: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
});

export const UuidWithAggregatesFilterSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const EnumUserRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumUserRoleWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => UserRoleSchema).optional(),
  in: z.lazy(() => UserRoleSchema).array().optional(),
  notIn: z.lazy(() => UserRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => NestedEnumUserRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
});

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
});

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
});

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
});

export const PasswordResetTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordResetTokenCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const PasswordResetTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordResetTokenMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const PasswordResetTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordResetTokenMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const TrustedDeviceCountOrderByAggregateInputSchema: z.ZodType<Prisma.TrustedDeviceCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  device_identifier: z.lazy(() => SortOrderSchema).optional(),
  device_name: z.lazy(() => SortOrderSchema).optional(),
  last_used_at: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const TrustedDeviceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TrustedDeviceMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  device_identifier: z.lazy(() => SortOrderSchema).optional(),
  device_name: z.lazy(() => SortOrderSchema).optional(),
  last_used_at: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const TrustedDeviceMinOrderByAggregateInputSchema: z.ZodType<Prisma.TrustedDeviceMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  device_identifier: z.lazy(() => SortOrderSchema).optional(),
  device_name: z.lazy(() => SortOrderSchema).optional(),
  last_used_at: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const CravingLevelCountOrderByAggregateInputSchema: z.ZodType<Prisma.CravingLevelCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  recommendation: z.lazy(() => SortOrderSchema).optional(),
});

export const CravingLevelAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CravingLevelAvgOrderByAggregateInput> = z.strictObject({
  level: z.lazy(() => SortOrderSchema).optional(),
});

export const CravingLevelMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CravingLevelMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  recommendation: z.lazy(() => SortOrderSchema).optional(),
});

export const CravingLevelMinOrderByAggregateInputSchema: z.ZodType<Prisma.CravingLevelMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  recommendation: z.lazy(() => SortOrderSchema).optional(),
});

export const CravingLevelSumOrderByAggregateInputSchema: z.ZodType<Prisma.CravingLevelSumOrderByAggregateInput> = z.strictObject({
  level: z.lazy(() => SortOrderSchema).optional(),
});

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const EmotionalStateCountOrderByAggregateInputSchema: z.ZodType<Prisma.EmotionalStateCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
});

export const EmotionalStateAvgOrderByAggregateInputSchema: z.ZodType<Prisma.EmotionalStateAvgOrderByAggregateInput> = z.strictObject({
  level: z.lazy(() => SortOrderSchema).optional(),
});

export const EmotionalStateMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EmotionalStateMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
});

export const EmotionalStateMinOrderByAggregateInputSchema: z.ZodType<Prisma.EmotionalStateMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
});

export const EmotionalStateSumOrderByAggregateInputSchema: z.ZodType<Prisma.EmotionalStateSumOrderByAggregateInput> = z.strictObject({
  level: z.lazy(() => SortOrderSchema).optional(),
});

export const UserAddictionCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserAddictionCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  custom_name: z.lazy(() => SortOrderSchema).optional(),
  classification: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  registered_at: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const UserAddictionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserAddictionMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  custom_name: z.lazy(() => SortOrderSchema).optional(),
  classification: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  registered_at: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const UserAddictionMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserAddictionMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  custom_name: z.lazy(() => SortOrderSchema).optional(),
  classification: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  registered_at: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumSponsorshipStatusFilterSchema: z.ZodType<Prisma.EnumSponsorshipStatusFilter> = z.strictObject({
  equals: z.lazy(() => SponsorshipStatusSchema).optional(),
  in: z.lazy(() => SponsorshipStatusSchema).array().optional(),
  notIn: z.lazy(() => SponsorshipStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => SponsorshipStatusSchema), z.lazy(() => NestedEnumSponsorshipStatusFilterSchema) ]).optional(),
});

export const SponsorshipCountOrderByAggregateInputSchema: z.ZodType<Prisma.SponsorshipCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  sponsor_id: z.lazy(() => SortOrderSchema).optional(),
  addict_id: z.lazy(() => SortOrderSchema).optional(),
  started_at: z.lazy(() => SortOrderSchema).optional(),
  ended_at: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  termination_reason: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const SponsorshipMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SponsorshipMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  sponsor_id: z.lazy(() => SortOrderSchema).optional(),
  addict_id: z.lazy(() => SortOrderSchema).optional(),
  started_at: z.lazy(() => SortOrderSchema).optional(),
  ended_at: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  termination_reason: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const SponsorshipMinOrderByAggregateInputSchema: z.ZodType<Prisma.SponsorshipMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  sponsor_id: z.lazy(() => SortOrderSchema).optional(),
  addict_id: z.lazy(() => SortOrderSchema).optional(),
  started_at: z.lazy(() => SortOrderSchema).optional(),
  ended_at: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  termination_reason: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumSponsorshipStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSponsorshipStatusWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => SponsorshipStatusSchema).optional(),
  in: z.lazy(() => SponsorshipStatusSchema).array().optional(),
  notIn: z.lazy(() => SponsorshipStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => SponsorshipStatusSchema), z.lazy(() => NestedEnumSponsorshipStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSponsorshipStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSponsorshipStatusFilterSchema).optional(),
});

export const CravingLevelScalarRelationFilterSchema: z.ZodType<Prisma.CravingLevelScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => CravingLevelWhereInputSchema).optional(),
  isNot: z.lazy(() => CravingLevelWhereInputSchema).optional(),
});

export const EmotionalStateScalarRelationFilterSchema: z.ZodType<Prisma.EmotionalStateScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => EmotionalStateWhereInputSchema).optional(),
  isNot: z.lazy(() => EmotionalStateWhereInputSchema).optional(),
});

export const DailyLogUser_idLog_dateCompoundUniqueInputSchema: z.ZodType<Prisma.DailyLogUser_idLog_dateCompoundUniqueInput> = z.strictObject({
  user_id: z.string(),
  log_date: z.coerce.date(),
});

export const DailyLogCountOrderByAggregateInputSchema: z.ZodType<Prisma.DailyLogCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  log_date: z.lazy(() => SortOrderSchema).optional(),
  consumed: z.lazy(() => SortOrderSchema).optional(),
  craving_level_id: z.lazy(() => SortOrderSchema).optional(),
  emotional_state_id: z.lazy(() => SortOrderSchema).optional(),
  triggers: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const DailyLogMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DailyLogMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  log_date: z.lazy(() => SortOrderSchema).optional(),
  consumed: z.lazy(() => SortOrderSchema).optional(),
  craving_level_id: z.lazy(() => SortOrderSchema).optional(),
  emotional_state_id: z.lazy(() => SortOrderSchema).optional(),
  triggers: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const DailyLogMinOrderByAggregateInputSchema: z.ZodType<Prisma.DailyLogMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  log_date: z.lazy(() => SortOrderSchema).optional(),
  consumed: z.lazy(() => SortOrderSchema).optional(),
  craving_level_id: z.lazy(() => SortOrderSchema).optional(),
  emotional_state_id: z.lazy(() => SortOrderSchema).optional(),
  triggers: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const DecimalFilterSchema: z.ZodType<Prisma.DecimalFilter> = z.strictObject({
  equals: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalFilterSchema) ]).optional(),
});

export const StreakScalarRelationFilterSchema: z.ZodType<Prisma.StreakScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => StreakWhereInputSchema).optional(),
  isNot: z.lazy(() => StreakWhereInputSchema).optional(),
});

export const StreakEventCountOrderByAggregateInputSchema: z.ZodType<Prisma.StreakEventCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  streak_id: z.lazy(() => SortOrderSchema).optional(),
  emergency_alert_id: z.lazy(() => SortOrderSchema).optional(),
  event_type: z.lazy(() => SortOrderSchema).optional(),
  event_date: z.lazy(() => SortOrderSchema).optional(),
  days_achieved: z.lazy(() => SortOrderSchema).optional(),
  avg_craving_period: z.lazy(() => SortOrderSchema).optional(),
  avg_emotion_period: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const StreakEventAvgOrderByAggregateInputSchema: z.ZodType<Prisma.StreakEventAvgOrderByAggregateInput> = z.strictObject({
  days_achieved: z.lazy(() => SortOrderSchema).optional(),
  avg_craving_period: z.lazy(() => SortOrderSchema).optional(),
  avg_emotion_period: z.lazy(() => SortOrderSchema).optional(),
});

export const StreakEventMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StreakEventMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  streak_id: z.lazy(() => SortOrderSchema).optional(),
  emergency_alert_id: z.lazy(() => SortOrderSchema).optional(),
  event_type: z.lazy(() => SortOrderSchema).optional(),
  event_date: z.lazy(() => SortOrderSchema).optional(),
  days_achieved: z.lazy(() => SortOrderSchema).optional(),
  avg_craving_period: z.lazy(() => SortOrderSchema).optional(),
  avg_emotion_period: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const StreakEventMinOrderByAggregateInputSchema: z.ZodType<Prisma.StreakEventMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  streak_id: z.lazy(() => SortOrderSchema).optional(),
  emergency_alert_id: z.lazy(() => SortOrderSchema).optional(),
  event_type: z.lazy(() => SortOrderSchema).optional(),
  event_date: z.lazy(() => SortOrderSchema).optional(),
  days_achieved: z.lazy(() => SortOrderSchema).optional(),
  avg_craving_period: z.lazy(() => SortOrderSchema).optional(),
  avg_emotion_period: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const StreakEventSumOrderByAggregateInputSchema: z.ZodType<Prisma.StreakEventSumOrderByAggregateInput> = z.strictObject({
  days_achieved: z.lazy(() => SortOrderSchema).optional(),
  avg_craving_period: z.lazy(() => SortOrderSchema).optional(),
  avg_emotion_period: z.lazy(() => SortOrderSchema).optional(),
});

export const DecimalWithAggregatesFilterSchema: z.ZodType<Prisma.DecimalWithAggregatesFilter> = z.strictObject({
  equals: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterSchema).optional(),
});

export const StreakEventScalarRelationFilterSchema: z.ZodType<Prisma.StreakEventScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => StreakEventWhereInputSchema).optional(),
  isNot: z.lazy(() => StreakEventWhereInputSchema).optional(),
});

export const LogAbsenceCountOrderByAggregateInputSchema: z.ZodType<Prisma.LogAbsenceCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  streak_id: z.lazy(() => SortOrderSchema).optional(),
  last_log_date: z.lazy(() => SortOrderSchema).optional(),
  detected_at: z.lazy(() => SortOrderSchema).optional(),
  absence_hours: z.lazy(() => SortOrderSchema).optional(),
  event_generated: z.lazy(() => SortOrderSchema).optional(),
  streak_event_id: z.lazy(() => SortOrderSchema).optional(),
});

export const LogAbsenceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LogAbsenceAvgOrderByAggregateInput> = z.strictObject({
  absence_hours: z.lazy(() => SortOrderSchema).optional(),
});

export const LogAbsenceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LogAbsenceMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  streak_id: z.lazy(() => SortOrderSchema).optional(),
  last_log_date: z.lazy(() => SortOrderSchema).optional(),
  detected_at: z.lazy(() => SortOrderSchema).optional(),
  absence_hours: z.lazy(() => SortOrderSchema).optional(),
  event_generated: z.lazy(() => SortOrderSchema).optional(),
  streak_event_id: z.lazy(() => SortOrderSchema).optional(),
});

export const LogAbsenceMinOrderByAggregateInputSchema: z.ZodType<Prisma.LogAbsenceMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  streak_id: z.lazy(() => SortOrderSchema).optional(),
  last_log_date: z.lazy(() => SortOrderSchema).optional(),
  detected_at: z.lazy(() => SortOrderSchema).optional(),
  absence_hours: z.lazy(() => SortOrderSchema).optional(),
  event_generated: z.lazy(() => SortOrderSchema).optional(),
  streak_event_id: z.lazy(() => SortOrderSchema).optional(),
});

export const LogAbsenceSumOrderByAggregateInputSchema: z.ZodType<Prisma.LogAbsenceSumOrderByAggregateInput> = z.strictObject({
  absence_hours: z.lazy(() => SortOrderSchema).optional(),
});

export const SupportContactUser_idEmailCompoundUniqueInputSchema: z.ZodType<Prisma.SupportContactUser_idEmailCompoundUniqueInput> = z.strictObject({
  user_id: z.string(),
  email: z.string(),
});

export const SupportContactCountOrderByAggregateInputSchema: z.ZodType<Prisma.SupportContactCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  contact_name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  relationship: z.lazy(() => SortOrderSchema).optional(),
  custom_relationship: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  priority_order: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
});

export const SupportContactAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SupportContactAvgOrderByAggregateInput> = z.strictObject({
  priority_order: z.lazy(() => SortOrderSchema).optional(),
});

export const SupportContactMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SupportContactMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  contact_name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  relationship: z.lazy(() => SortOrderSchema).optional(),
  custom_relationship: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  priority_order: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
});

export const SupportContactMinOrderByAggregateInputSchema: z.ZodType<Prisma.SupportContactMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  contact_name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  relationship: z.lazy(() => SortOrderSchema).optional(),
  custom_relationship: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  priority_order: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
});

export const SupportContactSumOrderByAggregateInputSchema: z.ZodType<Prisma.SupportContactSumOrderByAggregateInput> = z.strictObject({
  priority_order: z.lazy(() => SortOrderSchema).optional(),
});

export const UserAddictionScalarRelationFilterSchema: z.ZodType<Prisma.UserAddictionScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => UserAddictionWhereInputSchema).optional(),
  isNot: z.lazy(() => UserAddictionWhereInputSchema).optional(),
});

export const EmergencyAlertCountOrderByAggregateInputSchema: z.ZodType<Prisma.EmergencyAlertCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  user_addiction_id: z.lazy(() => SortOrderSchema).optional(),
  activated_at: z.lazy(() => SortOrderSchema).optional(),
  resulted_in_relapse: z.lazy(() => SortOrderSchema).optional(),
  resolution_notes: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const EmergencyAlertMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EmergencyAlertMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  user_addiction_id: z.lazy(() => SortOrderSchema).optional(),
  activated_at: z.lazy(() => SortOrderSchema).optional(),
  resulted_in_relapse: z.lazy(() => SortOrderSchema).optional(),
  resolution_notes: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const EmergencyAlertMinOrderByAggregateInputSchema: z.ZodType<Prisma.EmergencyAlertMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  user_addiction_id: z.lazy(() => SortOrderSchema).optional(),
  activated_at: z.lazy(() => SortOrderSchema).optional(),
  resulted_in_relapse: z.lazy(() => SortOrderSchema).optional(),
  resolution_notes: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
});

export const StreakEventListRelationFilterSchema: z.ZodType<Prisma.StreakEventListRelationFilter> = z.strictObject({
  every: z.lazy(() => StreakEventWhereInputSchema).optional(),
  some: z.lazy(() => StreakEventWhereInputSchema).optional(),
  none: z.lazy(() => StreakEventWhereInputSchema).optional(),
});

export const StreakEventOrderByRelationAggregateInputSchema: z.ZodType<Prisma.StreakEventOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const StreakCountOrderByAggregateInputSchema: z.ZodType<Prisma.StreakCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  user_addiction_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  started_at: z.lazy(() => SortOrderSchema).optional(),
  day_counter: z.lazy(() => SortOrderSchema).optional(),
  last_log_date: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
});

export const StreakAvgOrderByAggregateInputSchema: z.ZodType<Prisma.StreakAvgOrderByAggregateInput> = z.strictObject({
  day_counter: z.lazy(() => SortOrderSchema).optional(),
});

export const StreakMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StreakMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  user_addiction_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  started_at: z.lazy(() => SortOrderSchema).optional(),
  day_counter: z.lazy(() => SortOrderSchema).optional(),
  last_log_date: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
});

export const StreakMinOrderByAggregateInputSchema: z.ZodType<Prisma.StreakMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  user_addiction_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  started_at: z.lazy(() => SortOrderSchema).optional(),
  day_counter: z.lazy(() => SortOrderSchema).optional(),
  last_log_date: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
});

export const StreakSumOrderByAggregateInputSchema: z.ZodType<Prisma.StreakSumOrderByAggregateInput> = z.strictObject({
  day_counter: z.lazy(() => SortOrderSchema).optional(),
});

export const UserAddictionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserAddictionCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserAddictionCreateWithoutUserInputSchema), z.lazy(() => UserAddictionCreateWithoutUserInputSchema).array(), z.lazy(() => UserAddictionUncheckedCreateWithoutUserInputSchema), z.lazy(() => UserAddictionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserAddictionCreateOrConnectWithoutUserInputSchema), z.lazy(() => UserAddictionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserAddictionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserAddictionWhereUniqueInputSchema), z.lazy(() => UserAddictionWhereUniqueInputSchema).array() ]).optional(),
});

export const DailyLogCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.DailyLogCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => DailyLogCreateWithoutUserInputSchema), z.lazy(() => DailyLogCreateWithoutUserInputSchema).array(), z.lazy(() => DailyLogUncheckedCreateWithoutUserInputSchema), z.lazy(() => DailyLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DailyLogCreateOrConnectWithoutUserInputSchema), z.lazy(() => DailyLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DailyLogCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
});

export const SponsorshipCreateNestedManyWithoutSponsorInputSchema: z.ZodType<Prisma.SponsorshipCreateNestedManyWithoutSponsorInput> = z.strictObject({
  create: z.union([ z.lazy(() => SponsorshipCreateWithoutSponsorInputSchema), z.lazy(() => SponsorshipCreateWithoutSponsorInputSchema).array(), z.lazy(() => SponsorshipUncheckedCreateWithoutSponsorInputSchema), z.lazy(() => SponsorshipUncheckedCreateWithoutSponsorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SponsorshipCreateOrConnectWithoutSponsorInputSchema), z.lazy(() => SponsorshipCreateOrConnectWithoutSponsorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SponsorshipCreateManySponsorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SponsorshipWhereUniqueInputSchema), z.lazy(() => SponsorshipWhereUniqueInputSchema).array() ]).optional(),
});

export const SponsorshipCreateNestedManyWithoutAddictInputSchema: z.ZodType<Prisma.SponsorshipCreateNestedManyWithoutAddictInput> = z.strictObject({
  create: z.union([ z.lazy(() => SponsorshipCreateWithoutAddictInputSchema), z.lazy(() => SponsorshipCreateWithoutAddictInputSchema).array(), z.lazy(() => SponsorshipUncheckedCreateWithoutAddictInputSchema), z.lazy(() => SponsorshipUncheckedCreateWithoutAddictInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SponsorshipCreateOrConnectWithoutAddictInputSchema), z.lazy(() => SponsorshipCreateOrConnectWithoutAddictInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SponsorshipCreateManyAddictInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SponsorshipWhereUniqueInputSchema), z.lazy(() => SponsorshipWhereUniqueInputSchema).array() ]).optional(),
});

export const SupportContactCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SupportContactCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => SupportContactCreateWithoutUserInputSchema), z.lazy(() => SupportContactCreateWithoutUserInputSchema).array(), z.lazy(() => SupportContactUncheckedCreateWithoutUserInputSchema), z.lazy(() => SupportContactUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SupportContactCreateOrConnectWithoutUserInputSchema), z.lazy(() => SupportContactCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SupportContactCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SupportContactWhereUniqueInputSchema), z.lazy(() => SupportContactWhereUniqueInputSchema).array() ]).optional(),
});

export const EmergencyAlertCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.EmergencyAlertCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => EmergencyAlertCreateWithoutUserInputSchema), z.lazy(() => EmergencyAlertCreateWithoutUserInputSchema).array(), z.lazy(() => EmergencyAlertUncheckedCreateWithoutUserInputSchema), z.lazy(() => EmergencyAlertUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmergencyAlertCreateOrConnectWithoutUserInputSchema), z.lazy(() => EmergencyAlertCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmergencyAlertCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EmergencyAlertWhereUniqueInputSchema), z.lazy(() => EmergencyAlertWhereUniqueInputSchema).array() ]).optional(),
});

export const StreakCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.StreakCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => StreakCreateWithoutUserInputSchema), z.lazy(() => StreakCreateWithoutUserInputSchema).array(), z.lazy(() => StreakUncheckedCreateWithoutUserInputSchema), z.lazy(() => StreakUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StreakCreateOrConnectWithoutUserInputSchema), z.lazy(() => StreakCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StreakCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StreakWhereUniqueInputSchema), z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
});

export const LogAbsenceCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.LogAbsenceCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => LogAbsenceCreateWithoutUserInputSchema), z.lazy(() => LogAbsenceCreateWithoutUserInputSchema).array(), z.lazy(() => LogAbsenceUncheckedCreateWithoutUserInputSchema), z.lazy(() => LogAbsenceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LogAbsenceCreateOrConnectWithoutUserInputSchema), z.lazy(() => LogAbsenceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LogAbsenceCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LogAbsenceWhereUniqueInputSchema), z.lazy(() => LogAbsenceWhereUniqueInputSchema).array() ]).optional(),
});

export const PasswordResetTokenCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema).array(), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema), z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PasswordResetTokenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PasswordResetTokenWhereUniqueInputSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array() ]).optional(),
});

export const TrustedDeviceCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TrustedDeviceCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => TrustedDeviceCreateWithoutUserInputSchema), z.lazy(() => TrustedDeviceCreateWithoutUserInputSchema).array(), z.lazy(() => TrustedDeviceUncheckedCreateWithoutUserInputSchema), z.lazy(() => TrustedDeviceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TrustedDeviceCreateOrConnectWithoutUserInputSchema), z.lazy(() => TrustedDeviceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TrustedDeviceCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TrustedDeviceWhereUniqueInputSchema), z.lazy(() => TrustedDeviceWhereUniqueInputSchema).array() ]).optional(),
});

export const VerificationTokenCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => VerificationTokenCreateWithoutUserInputSchema), z.lazy(() => VerificationTokenCreateWithoutUserInputSchema).array(), z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema), z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VerificationTokenCreateOrConnectWithoutUserInputSchema), z.lazy(() => VerificationTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VerificationTokenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VerificationTokenWhereUniqueInputSchema), z.lazy(() => VerificationTokenWhereUniqueInputSchema).array() ]).optional(),
});

export const UserAddictionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserAddictionUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserAddictionCreateWithoutUserInputSchema), z.lazy(() => UserAddictionCreateWithoutUserInputSchema).array(), z.lazy(() => UserAddictionUncheckedCreateWithoutUserInputSchema), z.lazy(() => UserAddictionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserAddictionCreateOrConnectWithoutUserInputSchema), z.lazy(() => UserAddictionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserAddictionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserAddictionWhereUniqueInputSchema), z.lazy(() => UserAddictionWhereUniqueInputSchema).array() ]).optional(),
});

export const DailyLogUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.DailyLogUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => DailyLogCreateWithoutUserInputSchema), z.lazy(() => DailyLogCreateWithoutUserInputSchema).array(), z.lazy(() => DailyLogUncheckedCreateWithoutUserInputSchema), z.lazy(() => DailyLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DailyLogCreateOrConnectWithoutUserInputSchema), z.lazy(() => DailyLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DailyLogCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
});

export const SponsorshipUncheckedCreateNestedManyWithoutSponsorInputSchema: z.ZodType<Prisma.SponsorshipUncheckedCreateNestedManyWithoutSponsorInput> = z.strictObject({
  create: z.union([ z.lazy(() => SponsorshipCreateWithoutSponsorInputSchema), z.lazy(() => SponsorshipCreateWithoutSponsorInputSchema).array(), z.lazy(() => SponsorshipUncheckedCreateWithoutSponsorInputSchema), z.lazy(() => SponsorshipUncheckedCreateWithoutSponsorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SponsorshipCreateOrConnectWithoutSponsorInputSchema), z.lazy(() => SponsorshipCreateOrConnectWithoutSponsorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SponsorshipCreateManySponsorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SponsorshipWhereUniqueInputSchema), z.lazy(() => SponsorshipWhereUniqueInputSchema).array() ]).optional(),
});

export const SponsorshipUncheckedCreateNestedManyWithoutAddictInputSchema: z.ZodType<Prisma.SponsorshipUncheckedCreateNestedManyWithoutAddictInput> = z.strictObject({
  create: z.union([ z.lazy(() => SponsorshipCreateWithoutAddictInputSchema), z.lazy(() => SponsorshipCreateWithoutAddictInputSchema).array(), z.lazy(() => SponsorshipUncheckedCreateWithoutAddictInputSchema), z.lazy(() => SponsorshipUncheckedCreateWithoutAddictInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SponsorshipCreateOrConnectWithoutAddictInputSchema), z.lazy(() => SponsorshipCreateOrConnectWithoutAddictInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SponsorshipCreateManyAddictInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SponsorshipWhereUniqueInputSchema), z.lazy(() => SponsorshipWhereUniqueInputSchema).array() ]).optional(),
});

export const SupportContactUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SupportContactUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => SupportContactCreateWithoutUserInputSchema), z.lazy(() => SupportContactCreateWithoutUserInputSchema).array(), z.lazy(() => SupportContactUncheckedCreateWithoutUserInputSchema), z.lazy(() => SupportContactUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SupportContactCreateOrConnectWithoutUserInputSchema), z.lazy(() => SupportContactCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SupportContactCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SupportContactWhereUniqueInputSchema), z.lazy(() => SupportContactWhereUniqueInputSchema).array() ]).optional(),
});

export const EmergencyAlertUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.EmergencyAlertUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => EmergencyAlertCreateWithoutUserInputSchema), z.lazy(() => EmergencyAlertCreateWithoutUserInputSchema).array(), z.lazy(() => EmergencyAlertUncheckedCreateWithoutUserInputSchema), z.lazy(() => EmergencyAlertUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmergencyAlertCreateOrConnectWithoutUserInputSchema), z.lazy(() => EmergencyAlertCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmergencyAlertCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EmergencyAlertWhereUniqueInputSchema), z.lazy(() => EmergencyAlertWhereUniqueInputSchema).array() ]).optional(),
});

export const StreakUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.StreakUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => StreakCreateWithoutUserInputSchema), z.lazy(() => StreakCreateWithoutUserInputSchema).array(), z.lazy(() => StreakUncheckedCreateWithoutUserInputSchema), z.lazy(() => StreakUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StreakCreateOrConnectWithoutUserInputSchema), z.lazy(() => StreakCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StreakCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StreakWhereUniqueInputSchema), z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
});

export const LogAbsenceUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.LogAbsenceUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => LogAbsenceCreateWithoutUserInputSchema), z.lazy(() => LogAbsenceCreateWithoutUserInputSchema).array(), z.lazy(() => LogAbsenceUncheckedCreateWithoutUserInputSchema), z.lazy(() => LogAbsenceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LogAbsenceCreateOrConnectWithoutUserInputSchema), z.lazy(() => LogAbsenceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LogAbsenceCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LogAbsenceWhereUniqueInputSchema), z.lazy(() => LogAbsenceWhereUniqueInputSchema).array() ]).optional(),
});

export const PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema).array(), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema), z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PasswordResetTokenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PasswordResetTokenWhereUniqueInputSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array() ]).optional(),
});

export const TrustedDeviceUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TrustedDeviceUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => TrustedDeviceCreateWithoutUserInputSchema), z.lazy(() => TrustedDeviceCreateWithoutUserInputSchema).array(), z.lazy(() => TrustedDeviceUncheckedCreateWithoutUserInputSchema), z.lazy(() => TrustedDeviceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TrustedDeviceCreateOrConnectWithoutUserInputSchema), z.lazy(() => TrustedDeviceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TrustedDeviceCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TrustedDeviceWhereUniqueInputSchema), z.lazy(() => TrustedDeviceWhereUniqueInputSchema).array() ]).optional(),
});

export const VerificationTokenUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => VerificationTokenCreateWithoutUserInputSchema), z.lazy(() => VerificationTokenCreateWithoutUserInputSchema).array(), z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema), z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VerificationTokenCreateOrConnectWithoutUserInputSchema), z.lazy(() => VerificationTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VerificationTokenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VerificationTokenWhereUniqueInputSchema), z.lazy(() => VerificationTokenWhereUniqueInputSchema).array() ]).optional(),
});

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional(),
});

export const EnumUserRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumUserRoleFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => UserRoleSchema).optional(),
});

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional(),
});

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional().nullable(),
});

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.strictObject({
  set: z.boolean().optional(),
});

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional().nullable(),
});

export const UserAddictionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserAddictionUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserAddictionCreateWithoutUserInputSchema), z.lazy(() => UserAddictionCreateWithoutUserInputSchema).array(), z.lazy(() => UserAddictionUncheckedCreateWithoutUserInputSchema), z.lazy(() => UserAddictionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserAddictionCreateOrConnectWithoutUserInputSchema), z.lazy(() => UserAddictionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserAddictionUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => UserAddictionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserAddictionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserAddictionWhereUniqueInputSchema), z.lazy(() => UserAddictionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserAddictionWhereUniqueInputSchema), z.lazy(() => UserAddictionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserAddictionWhereUniqueInputSchema), z.lazy(() => UserAddictionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserAddictionWhereUniqueInputSchema), z.lazy(() => UserAddictionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserAddictionUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => UserAddictionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserAddictionUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => UserAddictionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserAddictionScalarWhereInputSchema), z.lazy(() => UserAddictionScalarWhereInputSchema).array() ]).optional(),
});

export const DailyLogUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.DailyLogUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DailyLogCreateWithoutUserInputSchema), z.lazy(() => DailyLogCreateWithoutUserInputSchema).array(), z.lazy(() => DailyLogUncheckedCreateWithoutUserInputSchema), z.lazy(() => DailyLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DailyLogCreateOrConnectWithoutUserInputSchema), z.lazy(() => DailyLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DailyLogUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => DailyLogUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DailyLogCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DailyLogUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => DailyLogUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DailyLogUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => DailyLogUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DailyLogScalarWhereInputSchema), z.lazy(() => DailyLogScalarWhereInputSchema).array() ]).optional(),
});

export const SponsorshipUpdateManyWithoutSponsorNestedInputSchema: z.ZodType<Prisma.SponsorshipUpdateManyWithoutSponsorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => SponsorshipCreateWithoutSponsorInputSchema), z.lazy(() => SponsorshipCreateWithoutSponsorInputSchema).array(), z.lazy(() => SponsorshipUncheckedCreateWithoutSponsorInputSchema), z.lazy(() => SponsorshipUncheckedCreateWithoutSponsorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SponsorshipCreateOrConnectWithoutSponsorInputSchema), z.lazy(() => SponsorshipCreateOrConnectWithoutSponsorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SponsorshipUpsertWithWhereUniqueWithoutSponsorInputSchema), z.lazy(() => SponsorshipUpsertWithWhereUniqueWithoutSponsorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SponsorshipCreateManySponsorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SponsorshipWhereUniqueInputSchema), z.lazy(() => SponsorshipWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SponsorshipWhereUniqueInputSchema), z.lazy(() => SponsorshipWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SponsorshipWhereUniqueInputSchema), z.lazy(() => SponsorshipWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SponsorshipWhereUniqueInputSchema), z.lazy(() => SponsorshipWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SponsorshipUpdateWithWhereUniqueWithoutSponsorInputSchema), z.lazy(() => SponsorshipUpdateWithWhereUniqueWithoutSponsorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SponsorshipUpdateManyWithWhereWithoutSponsorInputSchema), z.lazy(() => SponsorshipUpdateManyWithWhereWithoutSponsorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SponsorshipScalarWhereInputSchema), z.lazy(() => SponsorshipScalarWhereInputSchema).array() ]).optional(),
});

export const SponsorshipUpdateManyWithoutAddictNestedInputSchema: z.ZodType<Prisma.SponsorshipUpdateManyWithoutAddictNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => SponsorshipCreateWithoutAddictInputSchema), z.lazy(() => SponsorshipCreateWithoutAddictInputSchema).array(), z.lazy(() => SponsorshipUncheckedCreateWithoutAddictInputSchema), z.lazy(() => SponsorshipUncheckedCreateWithoutAddictInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SponsorshipCreateOrConnectWithoutAddictInputSchema), z.lazy(() => SponsorshipCreateOrConnectWithoutAddictInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SponsorshipUpsertWithWhereUniqueWithoutAddictInputSchema), z.lazy(() => SponsorshipUpsertWithWhereUniqueWithoutAddictInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SponsorshipCreateManyAddictInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SponsorshipWhereUniqueInputSchema), z.lazy(() => SponsorshipWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SponsorshipWhereUniqueInputSchema), z.lazy(() => SponsorshipWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SponsorshipWhereUniqueInputSchema), z.lazy(() => SponsorshipWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SponsorshipWhereUniqueInputSchema), z.lazy(() => SponsorshipWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SponsorshipUpdateWithWhereUniqueWithoutAddictInputSchema), z.lazy(() => SponsorshipUpdateWithWhereUniqueWithoutAddictInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SponsorshipUpdateManyWithWhereWithoutAddictInputSchema), z.lazy(() => SponsorshipUpdateManyWithWhereWithoutAddictInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SponsorshipScalarWhereInputSchema), z.lazy(() => SponsorshipScalarWhereInputSchema).array() ]).optional(),
});

export const SupportContactUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SupportContactUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => SupportContactCreateWithoutUserInputSchema), z.lazy(() => SupportContactCreateWithoutUserInputSchema).array(), z.lazy(() => SupportContactUncheckedCreateWithoutUserInputSchema), z.lazy(() => SupportContactUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SupportContactCreateOrConnectWithoutUserInputSchema), z.lazy(() => SupportContactCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SupportContactUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SupportContactUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SupportContactCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SupportContactWhereUniqueInputSchema), z.lazy(() => SupportContactWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SupportContactWhereUniqueInputSchema), z.lazy(() => SupportContactWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SupportContactWhereUniqueInputSchema), z.lazy(() => SupportContactWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SupportContactWhereUniqueInputSchema), z.lazy(() => SupportContactWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SupportContactUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SupportContactUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SupportContactUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => SupportContactUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SupportContactScalarWhereInputSchema), z.lazy(() => SupportContactScalarWhereInputSchema).array() ]).optional(),
});

export const EmergencyAlertUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.EmergencyAlertUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => EmergencyAlertCreateWithoutUserInputSchema), z.lazy(() => EmergencyAlertCreateWithoutUserInputSchema).array(), z.lazy(() => EmergencyAlertUncheckedCreateWithoutUserInputSchema), z.lazy(() => EmergencyAlertUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmergencyAlertCreateOrConnectWithoutUserInputSchema), z.lazy(() => EmergencyAlertCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EmergencyAlertUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => EmergencyAlertUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmergencyAlertCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EmergencyAlertWhereUniqueInputSchema), z.lazy(() => EmergencyAlertWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EmergencyAlertWhereUniqueInputSchema), z.lazy(() => EmergencyAlertWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EmergencyAlertWhereUniqueInputSchema), z.lazy(() => EmergencyAlertWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EmergencyAlertWhereUniqueInputSchema), z.lazy(() => EmergencyAlertWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EmergencyAlertUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => EmergencyAlertUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EmergencyAlertUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => EmergencyAlertUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EmergencyAlertScalarWhereInputSchema), z.lazy(() => EmergencyAlertScalarWhereInputSchema).array() ]).optional(),
});

export const StreakUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.StreakUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => StreakCreateWithoutUserInputSchema), z.lazy(() => StreakCreateWithoutUserInputSchema).array(), z.lazy(() => StreakUncheckedCreateWithoutUserInputSchema), z.lazy(() => StreakUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StreakCreateOrConnectWithoutUserInputSchema), z.lazy(() => StreakCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StreakUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => StreakUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StreakCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StreakWhereUniqueInputSchema), z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StreakWhereUniqueInputSchema), z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StreakWhereUniqueInputSchema), z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StreakWhereUniqueInputSchema), z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StreakUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => StreakUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StreakUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => StreakUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StreakScalarWhereInputSchema), z.lazy(() => StreakScalarWhereInputSchema).array() ]).optional(),
});

export const LogAbsenceUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.LogAbsenceUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => LogAbsenceCreateWithoutUserInputSchema), z.lazy(() => LogAbsenceCreateWithoutUserInputSchema).array(), z.lazy(() => LogAbsenceUncheckedCreateWithoutUserInputSchema), z.lazy(() => LogAbsenceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LogAbsenceCreateOrConnectWithoutUserInputSchema), z.lazy(() => LogAbsenceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LogAbsenceUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => LogAbsenceUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LogAbsenceCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LogAbsenceWhereUniqueInputSchema), z.lazy(() => LogAbsenceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LogAbsenceWhereUniqueInputSchema), z.lazy(() => LogAbsenceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LogAbsenceWhereUniqueInputSchema), z.lazy(() => LogAbsenceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LogAbsenceWhereUniqueInputSchema), z.lazy(() => LogAbsenceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LogAbsenceUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => LogAbsenceUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LogAbsenceUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => LogAbsenceUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LogAbsenceScalarWhereInputSchema), z.lazy(() => LogAbsenceScalarWhereInputSchema).array() ]).optional(),
});

export const PasswordResetTokenUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema).array(), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema), z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PasswordResetTokenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PasswordResetTokenWhereUniqueInputSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PasswordResetTokenWhereUniqueInputSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PasswordResetTokenWhereUniqueInputSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PasswordResetTokenWhereUniqueInputSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PasswordResetTokenUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PasswordResetTokenScalarWhereInputSchema), z.lazy(() => PasswordResetTokenScalarWhereInputSchema).array() ]).optional(),
});

export const TrustedDeviceUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TrustedDeviceUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => TrustedDeviceCreateWithoutUserInputSchema), z.lazy(() => TrustedDeviceCreateWithoutUserInputSchema).array(), z.lazy(() => TrustedDeviceUncheckedCreateWithoutUserInputSchema), z.lazy(() => TrustedDeviceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TrustedDeviceCreateOrConnectWithoutUserInputSchema), z.lazy(() => TrustedDeviceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TrustedDeviceUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => TrustedDeviceUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TrustedDeviceCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TrustedDeviceWhereUniqueInputSchema), z.lazy(() => TrustedDeviceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TrustedDeviceWhereUniqueInputSchema), z.lazy(() => TrustedDeviceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TrustedDeviceWhereUniqueInputSchema), z.lazy(() => TrustedDeviceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TrustedDeviceWhereUniqueInputSchema), z.lazy(() => TrustedDeviceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TrustedDeviceUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => TrustedDeviceUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TrustedDeviceUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => TrustedDeviceUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TrustedDeviceScalarWhereInputSchema), z.lazy(() => TrustedDeviceScalarWhereInputSchema).array() ]).optional(),
});

export const VerificationTokenUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => VerificationTokenCreateWithoutUserInputSchema), z.lazy(() => VerificationTokenCreateWithoutUserInputSchema).array(), z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema), z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VerificationTokenCreateOrConnectWithoutUserInputSchema), z.lazy(() => VerificationTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VerificationTokenUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => VerificationTokenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VerificationTokenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VerificationTokenWhereUniqueInputSchema), z.lazy(() => VerificationTokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VerificationTokenWhereUniqueInputSchema), z.lazy(() => VerificationTokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VerificationTokenWhereUniqueInputSchema), z.lazy(() => VerificationTokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VerificationTokenWhereUniqueInputSchema), z.lazy(() => VerificationTokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VerificationTokenUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => VerificationTokenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VerificationTokenUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => VerificationTokenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VerificationTokenScalarWhereInputSchema), z.lazy(() => VerificationTokenScalarWhereInputSchema).array() ]).optional(),
});

export const UserAddictionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserAddictionUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserAddictionCreateWithoutUserInputSchema), z.lazy(() => UserAddictionCreateWithoutUserInputSchema).array(), z.lazy(() => UserAddictionUncheckedCreateWithoutUserInputSchema), z.lazy(() => UserAddictionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserAddictionCreateOrConnectWithoutUserInputSchema), z.lazy(() => UserAddictionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserAddictionUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => UserAddictionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserAddictionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserAddictionWhereUniqueInputSchema), z.lazy(() => UserAddictionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserAddictionWhereUniqueInputSchema), z.lazy(() => UserAddictionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserAddictionWhereUniqueInputSchema), z.lazy(() => UserAddictionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserAddictionWhereUniqueInputSchema), z.lazy(() => UserAddictionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserAddictionUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => UserAddictionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserAddictionUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => UserAddictionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserAddictionScalarWhereInputSchema), z.lazy(() => UserAddictionScalarWhereInputSchema).array() ]).optional(),
});

export const DailyLogUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.DailyLogUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DailyLogCreateWithoutUserInputSchema), z.lazy(() => DailyLogCreateWithoutUserInputSchema).array(), z.lazy(() => DailyLogUncheckedCreateWithoutUserInputSchema), z.lazy(() => DailyLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DailyLogCreateOrConnectWithoutUserInputSchema), z.lazy(() => DailyLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DailyLogUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => DailyLogUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DailyLogCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DailyLogUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => DailyLogUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DailyLogUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => DailyLogUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DailyLogScalarWhereInputSchema), z.lazy(() => DailyLogScalarWhereInputSchema).array() ]).optional(),
});

export const SponsorshipUncheckedUpdateManyWithoutSponsorNestedInputSchema: z.ZodType<Prisma.SponsorshipUncheckedUpdateManyWithoutSponsorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => SponsorshipCreateWithoutSponsorInputSchema), z.lazy(() => SponsorshipCreateWithoutSponsorInputSchema).array(), z.lazy(() => SponsorshipUncheckedCreateWithoutSponsorInputSchema), z.lazy(() => SponsorshipUncheckedCreateWithoutSponsorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SponsorshipCreateOrConnectWithoutSponsorInputSchema), z.lazy(() => SponsorshipCreateOrConnectWithoutSponsorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SponsorshipUpsertWithWhereUniqueWithoutSponsorInputSchema), z.lazy(() => SponsorshipUpsertWithWhereUniqueWithoutSponsorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SponsorshipCreateManySponsorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SponsorshipWhereUniqueInputSchema), z.lazy(() => SponsorshipWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SponsorshipWhereUniqueInputSchema), z.lazy(() => SponsorshipWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SponsorshipWhereUniqueInputSchema), z.lazy(() => SponsorshipWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SponsorshipWhereUniqueInputSchema), z.lazy(() => SponsorshipWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SponsorshipUpdateWithWhereUniqueWithoutSponsorInputSchema), z.lazy(() => SponsorshipUpdateWithWhereUniqueWithoutSponsorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SponsorshipUpdateManyWithWhereWithoutSponsorInputSchema), z.lazy(() => SponsorshipUpdateManyWithWhereWithoutSponsorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SponsorshipScalarWhereInputSchema), z.lazy(() => SponsorshipScalarWhereInputSchema).array() ]).optional(),
});

export const SponsorshipUncheckedUpdateManyWithoutAddictNestedInputSchema: z.ZodType<Prisma.SponsorshipUncheckedUpdateManyWithoutAddictNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => SponsorshipCreateWithoutAddictInputSchema), z.lazy(() => SponsorshipCreateWithoutAddictInputSchema).array(), z.lazy(() => SponsorshipUncheckedCreateWithoutAddictInputSchema), z.lazy(() => SponsorshipUncheckedCreateWithoutAddictInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SponsorshipCreateOrConnectWithoutAddictInputSchema), z.lazy(() => SponsorshipCreateOrConnectWithoutAddictInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SponsorshipUpsertWithWhereUniqueWithoutAddictInputSchema), z.lazy(() => SponsorshipUpsertWithWhereUniqueWithoutAddictInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SponsorshipCreateManyAddictInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SponsorshipWhereUniqueInputSchema), z.lazy(() => SponsorshipWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SponsorshipWhereUniqueInputSchema), z.lazy(() => SponsorshipWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SponsorshipWhereUniqueInputSchema), z.lazy(() => SponsorshipWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SponsorshipWhereUniqueInputSchema), z.lazy(() => SponsorshipWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SponsorshipUpdateWithWhereUniqueWithoutAddictInputSchema), z.lazy(() => SponsorshipUpdateWithWhereUniqueWithoutAddictInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SponsorshipUpdateManyWithWhereWithoutAddictInputSchema), z.lazy(() => SponsorshipUpdateManyWithWhereWithoutAddictInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SponsorshipScalarWhereInputSchema), z.lazy(() => SponsorshipScalarWhereInputSchema).array() ]).optional(),
});

export const SupportContactUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SupportContactUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => SupportContactCreateWithoutUserInputSchema), z.lazy(() => SupportContactCreateWithoutUserInputSchema).array(), z.lazy(() => SupportContactUncheckedCreateWithoutUserInputSchema), z.lazy(() => SupportContactUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SupportContactCreateOrConnectWithoutUserInputSchema), z.lazy(() => SupportContactCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SupportContactUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SupportContactUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SupportContactCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SupportContactWhereUniqueInputSchema), z.lazy(() => SupportContactWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SupportContactWhereUniqueInputSchema), z.lazy(() => SupportContactWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SupportContactWhereUniqueInputSchema), z.lazy(() => SupportContactWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SupportContactWhereUniqueInputSchema), z.lazy(() => SupportContactWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SupportContactUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SupportContactUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SupportContactUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => SupportContactUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SupportContactScalarWhereInputSchema), z.lazy(() => SupportContactScalarWhereInputSchema).array() ]).optional(),
});

export const EmergencyAlertUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.EmergencyAlertUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => EmergencyAlertCreateWithoutUserInputSchema), z.lazy(() => EmergencyAlertCreateWithoutUserInputSchema).array(), z.lazy(() => EmergencyAlertUncheckedCreateWithoutUserInputSchema), z.lazy(() => EmergencyAlertUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmergencyAlertCreateOrConnectWithoutUserInputSchema), z.lazy(() => EmergencyAlertCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EmergencyAlertUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => EmergencyAlertUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmergencyAlertCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EmergencyAlertWhereUniqueInputSchema), z.lazy(() => EmergencyAlertWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EmergencyAlertWhereUniqueInputSchema), z.lazy(() => EmergencyAlertWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EmergencyAlertWhereUniqueInputSchema), z.lazy(() => EmergencyAlertWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EmergencyAlertWhereUniqueInputSchema), z.lazy(() => EmergencyAlertWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EmergencyAlertUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => EmergencyAlertUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EmergencyAlertUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => EmergencyAlertUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EmergencyAlertScalarWhereInputSchema), z.lazy(() => EmergencyAlertScalarWhereInputSchema).array() ]).optional(),
});

export const StreakUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.StreakUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => StreakCreateWithoutUserInputSchema), z.lazy(() => StreakCreateWithoutUserInputSchema).array(), z.lazy(() => StreakUncheckedCreateWithoutUserInputSchema), z.lazy(() => StreakUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StreakCreateOrConnectWithoutUserInputSchema), z.lazy(() => StreakCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StreakUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => StreakUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StreakCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StreakWhereUniqueInputSchema), z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StreakWhereUniqueInputSchema), z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StreakWhereUniqueInputSchema), z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StreakWhereUniqueInputSchema), z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StreakUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => StreakUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StreakUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => StreakUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StreakScalarWhereInputSchema), z.lazy(() => StreakScalarWhereInputSchema).array() ]).optional(),
});

export const LogAbsenceUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.LogAbsenceUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => LogAbsenceCreateWithoutUserInputSchema), z.lazy(() => LogAbsenceCreateWithoutUserInputSchema).array(), z.lazy(() => LogAbsenceUncheckedCreateWithoutUserInputSchema), z.lazy(() => LogAbsenceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LogAbsenceCreateOrConnectWithoutUserInputSchema), z.lazy(() => LogAbsenceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LogAbsenceUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => LogAbsenceUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LogAbsenceCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LogAbsenceWhereUniqueInputSchema), z.lazy(() => LogAbsenceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LogAbsenceWhereUniqueInputSchema), z.lazy(() => LogAbsenceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LogAbsenceWhereUniqueInputSchema), z.lazy(() => LogAbsenceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LogAbsenceWhereUniqueInputSchema), z.lazy(() => LogAbsenceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LogAbsenceUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => LogAbsenceUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LogAbsenceUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => LogAbsenceUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LogAbsenceScalarWhereInputSchema), z.lazy(() => LogAbsenceScalarWhereInputSchema).array() ]).optional(),
});

export const PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema).array(), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema), z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PasswordResetTokenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PasswordResetTokenWhereUniqueInputSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PasswordResetTokenWhereUniqueInputSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PasswordResetTokenWhereUniqueInputSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PasswordResetTokenWhereUniqueInputSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PasswordResetTokenUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PasswordResetTokenScalarWhereInputSchema), z.lazy(() => PasswordResetTokenScalarWhereInputSchema).array() ]).optional(),
});

export const TrustedDeviceUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TrustedDeviceUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => TrustedDeviceCreateWithoutUserInputSchema), z.lazy(() => TrustedDeviceCreateWithoutUserInputSchema).array(), z.lazy(() => TrustedDeviceUncheckedCreateWithoutUserInputSchema), z.lazy(() => TrustedDeviceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TrustedDeviceCreateOrConnectWithoutUserInputSchema), z.lazy(() => TrustedDeviceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TrustedDeviceUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => TrustedDeviceUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TrustedDeviceCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TrustedDeviceWhereUniqueInputSchema), z.lazy(() => TrustedDeviceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TrustedDeviceWhereUniqueInputSchema), z.lazy(() => TrustedDeviceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TrustedDeviceWhereUniqueInputSchema), z.lazy(() => TrustedDeviceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TrustedDeviceWhereUniqueInputSchema), z.lazy(() => TrustedDeviceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TrustedDeviceUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => TrustedDeviceUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TrustedDeviceUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => TrustedDeviceUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TrustedDeviceScalarWhereInputSchema), z.lazy(() => TrustedDeviceScalarWhereInputSchema).array() ]).optional(),
});

export const VerificationTokenUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => VerificationTokenCreateWithoutUserInputSchema), z.lazy(() => VerificationTokenCreateWithoutUserInputSchema).array(), z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema), z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VerificationTokenCreateOrConnectWithoutUserInputSchema), z.lazy(() => VerificationTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VerificationTokenUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => VerificationTokenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VerificationTokenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VerificationTokenWhereUniqueInputSchema), z.lazy(() => VerificationTokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VerificationTokenWhereUniqueInputSchema), z.lazy(() => VerificationTokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VerificationTokenWhereUniqueInputSchema), z.lazy(() => VerificationTokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VerificationTokenWhereUniqueInputSchema), z.lazy(() => VerificationTokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VerificationTokenUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => VerificationTokenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VerificationTokenUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => VerificationTokenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VerificationTokenScalarWhereInputSchema), z.lazy(() => VerificationTokenScalarWhereInputSchema).array() ]).optional(),
});

export const UserCreateNestedOneWithoutPassword_reset_tokensInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPassword_reset_tokensInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutPassword_reset_tokensInputSchema), z.lazy(() => UserUncheckedCreateWithoutPassword_reset_tokensInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPassword_reset_tokensInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const UserUpdateOneRequiredWithoutPassword_reset_tokensNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPassword_reset_tokensNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutPassword_reset_tokensInputSchema), z.lazy(() => UserUncheckedCreateWithoutPassword_reset_tokensInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPassword_reset_tokensInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPassword_reset_tokensInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPassword_reset_tokensInputSchema), z.lazy(() => UserUpdateWithoutPassword_reset_tokensInputSchema), z.lazy(() => UserUncheckedUpdateWithoutPassword_reset_tokensInputSchema) ]).optional(),
});

export const UserCreateNestedOneWithoutTrusted_devicesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTrusted_devicesInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutTrusted_devicesInputSchema), z.lazy(() => UserUncheckedCreateWithoutTrusted_devicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTrusted_devicesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const UserUpdateOneRequiredWithoutTrusted_devicesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTrusted_devicesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutTrusted_devicesInputSchema), z.lazy(() => UserUncheckedCreateWithoutTrusted_devicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTrusted_devicesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTrusted_devicesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutTrusted_devicesInputSchema), z.lazy(() => UserUpdateWithoutTrusted_devicesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutTrusted_devicesInputSchema) ]).optional(),
});

export const UserCreateNestedOneWithoutVerification_tokensInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutVerification_tokensInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutVerification_tokensInputSchema), z.lazy(() => UserUncheckedCreateWithoutVerification_tokensInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutVerification_tokensInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const UserUpdateOneRequiredWithoutVerification_tokensNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutVerification_tokensNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutVerification_tokensInputSchema), z.lazy(() => UserUncheckedCreateWithoutVerification_tokensInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutVerification_tokensInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutVerification_tokensInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutVerification_tokensInputSchema), z.lazy(() => UserUpdateWithoutVerification_tokensInputSchema), z.lazy(() => UserUncheckedUpdateWithoutVerification_tokensInputSchema) ]).optional(),
});

export const DailyLogCreateNestedManyWithoutCraving_levelInputSchema: z.ZodType<Prisma.DailyLogCreateNestedManyWithoutCraving_levelInput> = z.strictObject({
  create: z.union([ z.lazy(() => DailyLogCreateWithoutCraving_levelInputSchema), z.lazy(() => DailyLogCreateWithoutCraving_levelInputSchema).array(), z.lazy(() => DailyLogUncheckedCreateWithoutCraving_levelInputSchema), z.lazy(() => DailyLogUncheckedCreateWithoutCraving_levelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DailyLogCreateOrConnectWithoutCraving_levelInputSchema), z.lazy(() => DailyLogCreateOrConnectWithoutCraving_levelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DailyLogCreateManyCraving_levelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
});

export const DailyLogUncheckedCreateNestedManyWithoutCraving_levelInputSchema: z.ZodType<Prisma.DailyLogUncheckedCreateNestedManyWithoutCraving_levelInput> = z.strictObject({
  create: z.union([ z.lazy(() => DailyLogCreateWithoutCraving_levelInputSchema), z.lazy(() => DailyLogCreateWithoutCraving_levelInputSchema).array(), z.lazy(() => DailyLogUncheckedCreateWithoutCraving_levelInputSchema), z.lazy(() => DailyLogUncheckedCreateWithoutCraving_levelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DailyLogCreateOrConnectWithoutCraving_levelInputSchema), z.lazy(() => DailyLogCreateOrConnectWithoutCraving_levelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DailyLogCreateManyCraving_levelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
});

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const DailyLogUpdateManyWithoutCraving_levelNestedInputSchema: z.ZodType<Prisma.DailyLogUpdateManyWithoutCraving_levelNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DailyLogCreateWithoutCraving_levelInputSchema), z.lazy(() => DailyLogCreateWithoutCraving_levelInputSchema).array(), z.lazy(() => DailyLogUncheckedCreateWithoutCraving_levelInputSchema), z.lazy(() => DailyLogUncheckedCreateWithoutCraving_levelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DailyLogCreateOrConnectWithoutCraving_levelInputSchema), z.lazy(() => DailyLogCreateOrConnectWithoutCraving_levelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DailyLogUpsertWithWhereUniqueWithoutCraving_levelInputSchema), z.lazy(() => DailyLogUpsertWithWhereUniqueWithoutCraving_levelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DailyLogCreateManyCraving_levelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DailyLogUpdateWithWhereUniqueWithoutCraving_levelInputSchema), z.lazy(() => DailyLogUpdateWithWhereUniqueWithoutCraving_levelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DailyLogUpdateManyWithWhereWithoutCraving_levelInputSchema), z.lazy(() => DailyLogUpdateManyWithWhereWithoutCraving_levelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DailyLogScalarWhereInputSchema), z.lazy(() => DailyLogScalarWhereInputSchema).array() ]).optional(),
});

export const DailyLogUncheckedUpdateManyWithoutCraving_levelNestedInputSchema: z.ZodType<Prisma.DailyLogUncheckedUpdateManyWithoutCraving_levelNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DailyLogCreateWithoutCraving_levelInputSchema), z.lazy(() => DailyLogCreateWithoutCraving_levelInputSchema).array(), z.lazy(() => DailyLogUncheckedCreateWithoutCraving_levelInputSchema), z.lazy(() => DailyLogUncheckedCreateWithoutCraving_levelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DailyLogCreateOrConnectWithoutCraving_levelInputSchema), z.lazy(() => DailyLogCreateOrConnectWithoutCraving_levelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DailyLogUpsertWithWhereUniqueWithoutCraving_levelInputSchema), z.lazy(() => DailyLogUpsertWithWhereUniqueWithoutCraving_levelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DailyLogCreateManyCraving_levelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DailyLogUpdateWithWhereUniqueWithoutCraving_levelInputSchema), z.lazy(() => DailyLogUpdateWithWhereUniqueWithoutCraving_levelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DailyLogUpdateManyWithWhereWithoutCraving_levelInputSchema), z.lazy(() => DailyLogUpdateManyWithWhereWithoutCraving_levelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DailyLogScalarWhereInputSchema), z.lazy(() => DailyLogScalarWhereInputSchema).array() ]).optional(),
});

export const DailyLogCreateNestedManyWithoutEmotional_stateInputSchema: z.ZodType<Prisma.DailyLogCreateNestedManyWithoutEmotional_stateInput> = z.strictObject({
  create: z.union([ z.lazy(() => DailyLogCreateWithoutEmotional_stateInputSchema), z.lazy(() => DailyLogCreateWithoutEmotional_stateInputSchema).array(), z.lazy(() => DailyLogUncheckedCreateWithoutEmotional_stateInputSchema), z.lazy(() => DailyLogUncheckedCreateWithoutEmotional_stateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DailyLogCreateOrConnectWithoutEmotional_stateInputSchema), z.lazy(() => DailyLogCreateOrConnectWithoutEmotional_stateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DailyLogCreateManyEmotional_stateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
});

export const DailyLogUncheckedCreateNestedManyWithoutEmotional_stateInputSchema: z.ZodType<Prisma.DailyLogUncheckedCreateNestedManyWithoutEmotional_stateInput> = z.strictObject({
  create: z.union([ z.lazy(() => DailyLogCreateWithoutEmotional_stateInputSchema), z.lazy(() => DailyLogCreateWithoutEmotional_stateInputSchema).array(), z.lazy(() => DailyLogUncheckedCreateWithoutEmotional_stateInputSchema), z.lazy(() => DailyLogUncheckedCreateWithoutEmotional_stateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DailyLogCreateOrConnectWithoutEmotional_stateInputSchema), z.lazy(() => DailyLogCreateOrConnectWithoutEmotional_stateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DailyLogCreateManyEmotional_stateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
});

export const DailyLogUpdateManyWithoutEmotional_stateNestedInputSchema: z.ZodType<Prisma.DailyLogUpdateManyWithoutEmotional_stateNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DailyLogCreateWithoutEmotional_stateInputSchema), z.lazy(() => DailyLogCreateWithoutEmotional_stateInputSchema).array(), z.lazy(() => DailyLogUncheckedCreateWithoutEmotional_stateInputSchema), z.lazy(() => DailyLogUncheckedCreateWithoutEmotional_stateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DailyLogCreateOrConnectWithoutEmotional_stateInputSchema), z.lazy(() => DailyLogCreateOrConnectWithoutEmotional_stateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DailyLogUpsertWithWhereUniqueWithoutEmotional_stateInputSchema), z.lazy(() => DailyLogUpsertWithWhereUniqueWithoutEmotional_stateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DailyLogCreateManyEmotional_stateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DailyLogUpdateWithWhereUniqueWithoutEmotional_stateInputSchema), z.lazy(() => DailyLogUpdateWithWhereUniqueWithoutEmotional_stateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DailyLogUpdateManyWithWhereWithoutEmotional_stateInputSchema), z.lazy(() => DailyLogUpdateManyWithWhereWithoutEmotional_stateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DailyLogScalarWhereInputSchema), z.lazy(() => DailyLogScalarWhereInputSchema).array() ]).optional(),
});

export const DailyLogUncheckedUpdateManyWithoutEmotional_stateNestedInputSchema: z.ZodType<Prisma.DailyLogUncheckedUpdateManyWithoutEmotional_stateNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DailyLogCreateWithoutEmotional_stateInputSchema), z.lazy(() => DailyLogCreateWithoutEmotional_stateInputSchema).array(), z.lazy(() => DailyLogUncheckedCreateWithoutEmotional_stateInputSchema), z.lazy(() => DailyLogUncheckedCreateWithoutEmotional_stateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DailyLogCreateOrConnectWithoutEmotional_stateInputSchema), z.lazy(() => DailyLogCreateOrConnectWithoutEmotional_stateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DailyLogUpsertWithWhereUniqueWithoutEmotional_stateInputSchema), z.lazy(() => DailyLogUpsertWithWhereUniqueWithoutEmotional_stateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DailyLogCreateManyEmotional_stateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema), z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DailyLogUpdateWithWhereUniqueWithoutEmotional_stateInputSchema), z.lazy(() => DailyLogUpdateWithWhereUniqueWithoutEmotional_stateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DailyLogUpdateManyWithWhereWithoutEmotional_stateInputSchema), z.lazy(() => DailyLogUpdateManyWithWhereWithoutEmotional_stateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DailyLogScalarWhereInputSchema), z.lazy(() => DailyLogScalarWhereInputSchema).array() ]).optional(),
});

export const UserCreateNestedOneWithoutAddictionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAddictionsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAddictionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAddictionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAddictionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const StreakCreateNestedManyWithoutAddictionInputSchema: z.ZodType<Prisma.StreakCreateNestedManyWithoutAddictionInput> = z.strictObject({
  create: z.union([ z.lazy(() => StreakCreateWithoutAddictionInputSchema), z.lazy(() => StreakCreateWithoutAddictionInputSchema).array(), z.lazy(() => StreakUncheckedCreateWithoutAddictionInputSchema), z.lazy(() => StreakUncheckedCreateWithoutAddictionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StreakCreateOrConnectWithoutAddictionInputSchema), z.lazy(() => StreakCreateOrConnectWithoutAddictionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StreakCreateManyAddictionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StreakWhereUniqueInputSchema), z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
});

export const EmergencyAlertCreateNestedManyWithoutAddictionInputSchema: z.ZodType<Prisma.EmergencyAlertCreateNestedManyWithoutAddictionInput> = z.strictObject({
  create: z.union([ z.lazy(() => EmergencyAlertCreateWithoutAddictionInputSchema), z.lazy(() => EmergencyAlertCreateWithoutAddictionInputSchema).array(), z.lazy(() => EmergencyAlertUncheckedCreateWithoutAddictionInputSchema), z.lazy(() => EmergencyAlertUncheckedCreateWithoutAddictionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmergencyAlertCreateOrConnectWithoutAddictionInputSchema), z.lazy(() => EmergencyAlertCreateOrConnectWithoutAddictionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmergencyAlertCreateManyAddictionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EmergencyAlertWhereUniqueInputSchema), z.lazy(() => EmergencyAlertWhereUniqueInputSchema).array() ]).optional(),
});

export const StreakUncheckedCreateNestedManyWithoutAddictionInputSchema: z.ZodType<Prisma.StreakUncheckedCreateNestedManyWithoutAddictionInput> = z.strictObject({
  create: z.union([ z.lazy(() => StreakCreateWithoutAddictionInputSchema), z.lazy(() => StreakCreateWithoutAddictionInputSchema).array(), z.lazy(() => StreakUncheckedCreateWithoutAddictionInputSchema), z.lazy(() => StreakUncheckedCreateWithoutAddictionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StreakCreateOrConnectWithoutAddictionInputSchema), z.lazy(() => StreakCreateOrConnectWithoutAddictionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StreakCreateManyAddictionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StreakWhereUniqueInputSchema), z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
});

export const EmergencyAlertUncheckedCreateNestedManyWithoutAddictionInputSchema: z.ZodType<Prisma.EmergencyAlertUncheckedCreateNestedManyWithoutAddictionInput> = z.strictObject({
  create: z.union([ z.lazy(() => EmergencyAlertCreateWithoutAddictionInputSchema), z.lazy(() => EmergencyAlertCreateWithoutAddictionInputSchema).array(), z.lazy(() => EmergencyAlertUncheckedCreateWithoutAddictionInputSchema), z.lazy(() => EmergencyAlertUncheckedCreateWithoutAddictionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmergencyAlertCreateOrConnectWithoutAddictionInputSchema), z.lazy(() => EmergencyAlertCreateOrConnectWithoutAddictionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmergencyAlertCreateManyAddictionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EmergencyAlertWhereUniqueInputSchema), z.lazy(() => EmergencyAlertWhereUniqueInputSchema).array() ]).optional(),
});

export const UserUpdateOneRequiredWithoutAddictionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAddictionsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAddictionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAddictionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAddictionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAddictionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAddictionsInputSchema), z.lazy(() => UserUpdateWithoutAddictionsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAddictionsInputSchema) ]).optional(),
});

export const StreakUpdateManyWithoutAddictionNestedInputSchema: z.ZodType<Prisma.StreakUpdateManyWithoutAddictionNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => StreakCreateWithoutAddictionInputSchema), z.lazy(() => StreakCreateWithoutAddictionInputSchema).array(), z.lazy(() => StreakUncheckedCreateWithoutAddictionInputSchema), z.lazy(() => StreakUncheckedCreateWithoutAddictionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StreakCreateOrConnectWithoutAddictionInputSchema), z.lazy(() => StreakCreateOrConnectWithoutAddictionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StreakUpsertWithWhereUniqueWithoutAddictionInputSchema), z.lazy(() => StreakUpsertWithWhereUniqueWithoutAddictionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StreakCreateManyAddictionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StreakWhereUniqueInputSchema), z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StreakWhereUniqueInputSchema), z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StreakWhereUniqueInputSchema), z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StreakWhereUniqueInputSchema), z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StreakUpdateWithWhereUniqueWithoutAddictionInputSchema), z.lazy(() => StreakUpdateWithWhereUniqueWithoutAddictionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StreakUpdateManyWithWhereWithoutAddictionInputSchema), z.lazy(() => StreakUpdateManyWithWhereWithoutAddictionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StreakScalarWhereInputSchema), z.lazy(() => StreakScalarWhereInputSchema).array() ]).optional(),
});

export const EmergencyAlertUpdateManyWithoutAddictionNestedInputSchema: z.ZodType<Prisma.EmergencyAlertUpdateManyWithoutAddictionNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => EmergencyAlertCreateWithoutAddictionInputSchema), z.lazy(() => EmergencyAlertCreateWithoutAddictionInputSchema).array(), z.lazy(() => EmergencyAlertUncheckedCreateWithoutAddictionInputSchema), z.lazy(() => EmergencyAlertUncheckedCreateWithoutAddictionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmergencyAlertCreateOrConnectWithoutAddictionInputSchema), z.lazy(() => EmergencyAlertCreateOrConnectWithoutAddictionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EmergencyAlertUpsertWithWhereUniqueWithoutAddictionInputSchema), z.lazy(() => EmergencyAlertUpsertWithWhereUniqueWithoutAddictionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmergencyAlertCreateManyAddictionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EmergencyAlertWhereUniqueInputSchema), z.lazy(() => EmergencyAlertWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EmergencyAlertWhereUniqueInputSchema), z.lazy(() => EmergencyAlertWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EmergencyAlertWhereUniqueInputSchema), z.lazy(() => EmergencyAlertWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EmergencyAlertWhereUniqueInputSchema), z.lazy(() => EmergencyAlertWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EmergencyAlertUpdateWithWhereUniqueWithoutAddictionInputSchema), z.lazy(() => EmergencyAlertUpdateWithWhereUniqueWithoutAddictionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EmergencyAlertUpdateManyWithWhereWithoutAddictionInputSchema), z.lazy(() => EmergencyAlertUpdateManyWithWhereWithoutAddictionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EmergencyAlertScalarWhereInputSchema), z.lazy(() => EmergencyAlertScalarWhereInputSchema).array() ]).optional(),
});

export const StreakUncheckedUpdateManyWithoutAddictionNestedInputSchema: z.ZodType<Prisma.StreakUncheckedUpdateManyWithoutAddictionNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => StreakCreateWithoutAddictionInputSchema), z.lazy(() => StreakCreateWithoutAddictionInputSchema).array(), z.lazy(() => StreakUncheckedCreateWithoutAddictionInputSchema), z.lazy(() => StreakUncheckedCreateWithoutAddictionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StreakCreateOrConnectWithoutAddictionInputSchema), z.lazy(() => StreakCreateOrConnectWithoutAddictionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StreakUpsertWithWhereUniqueWithoutAddictionInputSchema), z.lazy(() => StreakUpsertWithWhereUniqueWithoutAddictionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StreakCreateManyAddictionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StreakWhereUniqueInputSchema), z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StreakWhereUniqueInputSchema), z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StreakWhereUniqueInputSchema), z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StreakWhereUniqueInputSchema), z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StreakUpdateWithWhereUniqueWithoutAddictionInputSchema), z.lazy(() => StreakUpdateWithWhereUniqueWithoutAddictionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StreakUpdateManyWithWhereWithoutAddictionInputSchema), z.lazy(() => StreakUpdateManyWithWhereWithoutAddictionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StreakScalarWhereInputSchema), z.lazy(() => StreakScalarWhereInputSchema).array() ]).optional(),
});

export const EmergencyAlertUncheckedUpdateManyWithoutAddictionNestedInputSchema: z.ZodType<Prisma.EmergencyAlertUncheckedUpdateManyWithoutAddictionNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => EmergencyAlertCreateWithoutAddictionInputSchema), z.lazy(() => EmergencyAlertCreateWithoutAddictionInputSchema).array(), z.lazy(() => EmergencyAlertUncheckedCreateWithoutAddictionInputSchema), z.lazy(() => EmergencyAlertUncheckedCreateWithoutAddictionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmergencyAlertCreateOrConnectWithoutAddictionInputSchema), z.lazy(() => EmergencyAlertCreateOrConnectWithoutAddictionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EmergencyAlertUpsertWithWhereUniqueWithoutAddictionInputSchema), z.lazy(() => EmergencyAlertUpsertWithWhereUniqueWithoutAddictionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmergencyAlertCreateManyAddictionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EmergencyAlertWhereUniqueInputSchema), z.lazy(() => EmergencyAlertWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EmergencyAlertWhereUniqueInputSchema), z.lazy(() => EmergencyAlertWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EmergencyAlertWhereUniqueInputSchema), z.lazy(() => EmergencyAlertWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EmergencyAlertWhereUniqueInputSchema), z.lazy(() => EmergencyAlertWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EmergencyAlertUpdateWithWhereUniqueWithoutAddictionInputSchema), z.lazy(() => EmergencyAlertUpdateWithWhereUniqueWithoutAddictionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EmergencyAlertUpdateManyWithWhereWithoutAddictionInputSchema), z.lazy(() => EmergencyAlertUpdateManyWithWhereWithoutAddictionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EmergencyAlertScalarWhereInputSchema), z.lazy(() => EmergencyAlertScalarWhereInputSchema).array() ]).optional(),
});

export const UserCreateNestedOneWithoutSponsorships_as_sponsorInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSponsorships_as_sponsorInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutSponsorships_as_sponsorInputSchema), z.lazy(() => UserUncheckedCreateWithoutSponsorships_as_sponsorInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSponsorships_as_sponsorInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const UserCreateNestedOneWithoutSponsorships_as_addictInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSponsorships_as_addictInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutSponsorships_as_addictInputSchema), z.lazy(() => UserUncheckedCreateWithoutSponsorships_as_addictInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSponsorships_as_addictInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const EnumSponsorshipStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSponsorshipStatusFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => SponsorshipStatusSchema).optional(),
});

export const UserUpdateOneRequiredWithoutSponsorships_as_sponsorNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSponsorships_as_sponsorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutSponsorships_as_sponsorInputSchema), z.lazy(() => UserUncheckedCreateWithoutSponsorships_as_sponsorInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSponsorships_as_sponsorInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSponsorships_as_sponsorInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSponsorships_as_sponsorInputSchema), z.lazy(() => UserUpdateWithoutSponsorships_as_sponsorInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSponsorships_as_sponsorInputSchema) ]).optional(),
});

export const UserUpdateOneRequiredWithoutSponsorships_as_addictNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSponsorships_as_addictNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutSponsorships_as_addictInputSchema), z.lazy(() => UserUncheckedCreateWithoutSponsorships_as_addictInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSponsorships_as_addictInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSponsorships_as_addictInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSponsorships_as_addictInputSchema), z.lazy(() => UserUpdateWithoutSponsorships_as_addictInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSponsorships_as_addictInputSchema) ]).optional(),
});

export const UserCreateNestedOneWithoutDaily_logsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutDaily_logsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutDaily_logsInputSchema), z.lazy(() => UserUncheckedCreateWithoutDaily_logsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDaily_logsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const CravingLevelCreateNestedOneWithoutDaily_logsInputSchema: z.ZodType<Prisma.CravingLevelCreateNestedOneWithoutDaily_logsInput> = z.strictObject({
  create: z.union([ z.lazy(() => CravingLevelCreateWithoutDaily_logsInputSchema), z.lazy(() => CravingLevelUncheckedCreateWithoutDaily_logsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CravingLevelCreateOrConnectWithoutDaily_logsInputSchema).optional(),
  connect: z.lazy(() => CravingLevelWhereUniqueInputSchema).optional(),
});

export const EmotionalStateCreateNestedOneWithoutDaily_logsInputSchema: z.ZodType<Prisma.EmotionalStateCreateNestedOneWithoutDaily_logsInput> = z.strictObject({
  create: z.union([ z.lazy(() => EmotionalStateCreateWithoutDaily_logsInputSchema), z.lazy(() => EmotionalStateUncheckedCreateWithoutDaily_logsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmotionalStateCreateOrConnectWithoutDaily_logsInputSchema).optional(),
  connect: z.lazy(() => EmotionalStateWhereUniqueInputSchema).optional(),
});

export const UserUpdateOneRequiredWithoutDaily_logsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutDaily_logsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutDaily_logsInputSchema), z.lazy(() => UserUncheckedCreateWithoutDaily_logsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDaily_logsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutDaily_logsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutDaily_logsInputSchema), z.lazy(() => UserUpdateWithoutDaily_logsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDaily_logsInputSchema) ]).optional(),
});

export const CravingLevelUpdateOneRequiredWithoutDaily_logsNestedInputSchema: z.ZodType<Prisma.CravingLevelUpdateOneRequiredWithoutDaily_logsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CravingLevelCreateWithoutDaily_logsInputSchema), z.lazy(() => CravingLevelUncheckedCreateWithoutDaily_logsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CravingLevelCreateOrConnectWithoutDaily_logsInputSchema).optional(),
  upsert: z.lazy(() => CravingLevelUpsertWithoutDaily_logsInputSchema).optional(),
  connect: z.lazy(() => CravingLevelWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CravingLevelUpdateToOneWithWhereWithoutDaily_logsInputSchema), z.lazy(() => CravingLevelUpdateWithoutDaily_logsInputSchema), z.lazy(() => CravingLevelUncheckedUpdateWithoutDaily_logsInputSchema) ]).optional(),
});

export const EmotionalStateUpdateOneRequiredWithoutDaily_logsNestedInputSchema: z.ZodType<Prisma.EmotionalStateUpdateOneRequiredWithoutDaily_logsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => EmotionalStateCreateWithoutDaily_logsInputSchema), z.lazy(() => EmotionalStateUncheckedCreateWithoutDaily_logsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmotionalStateCreateOrConnectWithoutDaily_logsInputSchema).optional(),
  upsert: z.lazy(() => EmotionalStateUpsertWithoutDaily_logsInputSchema).optional(),
  connect: z.lazy(() => EmotionalStateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EmotionalStateUpdateToOneWithWhereWithoutDaily_logsInputSchema), z.lazy(() => EmotionalStateUpdateWithoutDaily_logsInputSchema), z.lazy(() => EmotionalStateUncheckedUpdateWithoutDaily_logsInputSchema) ]).optional(),
});

export const StreakCreateNestedOneWithoutEventsInputSchema: z.ZodType<Prisma.StreakCreateNestedOneWithoutEventsInput> = z.strictObject({
  create: z.union([ z.lazy(() => StreakCreateWithoutEventsInputSchema), z.lazy(() => StreakUncheckedCreateWithoutEventsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StreakCreateOrConnectWithoutEventsInputSchema).optional(),
  connect: z.lazy(() => StreakWhereUniqueInputSchema).optional(),
});

export const LogAbsenceCreateNestedManyWithoutStreak_eventInputSchema: z.ZodType<Prisma.LogAbsenceCreateNestedManyWithoutStreak_eventInput> = z.strictObject({
  create: z.union([ z.lazy(() => LogAbsenceCreateWithoutStreak_eventInputSchema), z.lazy(() => LogAbsenceCreateWithoutStreak_eventInputSchema).array(), z.lazy(() => LogAbsenceUncheckedCreateWithoutStreak_eventInputSchema), z.lazy(() => LogAbsenceUncheckedCreateWithoutStreak_eventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LogAbsenceCreateOrConnectWithoutStreak_eventInputSchema), z.lazy(() => LogAbsenceCreateOrConnectWithoutStreak_eventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LogAbsenceCreateManyStreak_eventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LogAbsenceWhereUniqueInputSchema), z.lazy(() => LogAbsenceWhereUniqueInputSchema).array() ]).optional(),
});

export const LogAbsenceUncheckedCreateNestedManyWithoutStreak_eventInputSchema: z.ZodType<Prisma.LogAbsenceUncheckedCreateNestedManyWithoutStreak_eventInput> = z.strictObject({
  create: z.union([ z.lazy(() => LogAbsenceCreateWithoutStreak_eventInputSchema), z.lazy(() => LogAbsenceCreateWithoutStreak_eventInputSchema).array(), z.lazy(() => LogAbsenceUncheckedCreateWithoutStreak_eventInputSchema), z.lazy(() => LogAbsenceUncheckedCreateWithoutStreak_eventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LogAbsenceCreateOrConnectWithoutStreak_eventInputSchema), z.lazy(() => LogAbsenceCreateOrConnectWithoutStreak_eventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LogAbsenceCreateManyStreak_eventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LogAbsenceWhereUniqueInputSchema), z.lazy(() => LogAbsenceWhereUniqueInputSchema).array() ]).optional(),
});

export const DecimalFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DecimalFieldUpdateOperationsInput> = z.strictObject({
  set: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  increment: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  decrement: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  multiply: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  divide: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
});

export const StreakUpdateOneRequiredWithoutEventsNestedInputSchema: z.ZodType<Prisma.StreakUpdateOneRequiredWithoutEventsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => StreakCreateWithoutEventsInputSchema), z.lazy(() => StreakUncheckedCreateWithoutEventsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StreakCreateOrConnectWithoutEventsInputSchema).optional(),
  upsert: z.lazy(() => StreakUpsertWithoutEventsInputSchema).optional(),
  connect: z.lazy(() => StreakWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StreakUpdateToOneWithWhereWithoutEventsInputSchema), z.lazy(() => StreakUpdateWithoutEventsInputSchema), z.lazy(() => StreakUncheckedUpdateWithoutEventsInputSchema) ]).optional(),
});

export const LogAbsenceUpdateManyWithoutStreak_eventNestedInputSchema: z.ZodType<Prisma.LogAbsenceUpdateManyWithoutStreak_eventNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => LogAbsenceCreateWithoutStreak_eventInputSchema), z.lazy(() => LogAbsenceCreateWithoutStreak_eventInputSchema).array(), z.lazy(() => LogAbsenceUncheckedCreateWithoutStreak_eventInputSchema), z.lazy(() => LogAbsenceUncheckedCreateWithoutStreak_eventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LogAbsenceCreateOrConnectWithoutStreak_eventInputSchema), z.lazy(() => LogAbsenceCreateOrConnectWithoutStreak_eventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LogAbsenceUpsertWithWhereUniqueWithoutStreak_eventInputSchema), z.lazy(() => LogAbsenceUpsertWithWhereUniqueWithoutStreak_eventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LogAbsenceCreateManyStreak_eventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LogAbsenceWhereUniqueInputSchema), z.lazy(() => LogAbsenceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LogAbsenceWhereUniqueInputSchema), z.lazy(() => LogAbsenceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LogAbsenceWhereUniqueInputSchema), z.lazy(() => LogAbsenceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LogAbsenceWhereUniqueInputSchema), z.lazy(() => LogAbsenceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LogAbsenceUpdateWithWhereUniqueWithoutStreak_eventInputSchema), z.lazy(() => LogAbsenceUpdateWithWhereUniqueWithoutStreak_eventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LogAbsenceUpdateManyWithWhereWithoutStreak_eventInputSchema), z.lazy(() => LogAbsenceUpdateManyWithWhereWithoutStreak_eventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LogAbsenceScalarWhereInputSchema), z.lazy(() => LogAbsenceScalarWhereInputSchema).array() ]).optional(),
});

export const LogAbsenceUncheckedUpdateManyWithoutStreak_eventNestedInputSchema: z.ZodType<Prisma.LogAbsenceUncheckedUpdateManyWithoutStreak_eventNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => LogAbsenceCreateWithoutStreak_eventInputSchema), z.lazy(() => LogAbsenceCreateWithoutStreak_eventInputSchema).array(), z.lazy(() => LogAbsenceUncheckedCreateWithoutStreak_eventInputSchema), z.lazy(() => LogAbsenceUncheckedCreateWithoutStreak_eventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LogAbsenceCreateOrConnectWithoutStreak_eventInputSchema), z.lazy(() => LogAbsenceCreateOrConnectWithoutStreak_eventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LogAbsenceUpsertWithWhereUniqueWithoutStreak_eventInputSchema), z.lazy(() => LogAbsenceUpsertWithWhereUniqueWithoutStreak_eventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LogAbsenceCreateManyStreak_eventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LogAbsenceWhereUniqueInputSchema), z.lazy(() => LogAbsenceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LogAbsenceWhereUniqueInputSchema), z.lazy(() => LogAbsenceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LogAbsenceWhereUniqueInputSchema), z.lazy(() => LogAbsenceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LogAbsenceWhereUniqueInputSchema), z.lazy(() => LogAbsenceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LogAbsenceUpdateWithWhereUniqueWithoutStreak_eventInputSchema), z.lazy(() => LogAbsenceUpdateWithWhereUniqueWithoutStreak_eventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LogAbsenceUpdateManyWithWhereWithoutStreak_eventInputSchema), z.lazy(() => LogAbsenceUpdateManyWithWhereWithoutStreak_eventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LogAbsenceScalarWhereInputSchema), z.lazy(() => LogAbsenceScalarWhereInputSchema).array() ]).optional(),
});

export const UserCreateNestedOneWithoutAbsencesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAbsencesInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAbsencesInputSchema), z.lazy(() => UserUncheckedCreateWithoutAbsencesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAbsencesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const StreakEventCreateNestedOneWithoutAbsencesInputSchema: z.ZodType<Prisma.StreakEventCreateNestedOneWithoutAbsencesInput> = z.strictObject({
  create: z.union([ z.lazy(() => StreakEventCreateWithoutAbsencesInputSchema), z.lazy(() => StreakEventUncheckedCreateWithoutAbsencesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StreakEventCreateOrConnectWithoutAbsencesInputSchema).optional(),
  connect: z.lazy(() => StreakEventWhereUniqueInputSchema).optional(),
});

export const UserUpdateOneRequiredWithoutAbsencesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAbsencesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAbsencesInputSchema), z.lazy(() => UserUncheckedCreateWithoutAbsencesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAbsencesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAbsencesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAbsencesInputSchema), z.lazy(() => UserUpdateWithoutAbsencesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAbsencesInputSchema) ]).optional(),
});

export const StreakEventUpdateOneRequiredWithoutAbsencesNestedInputSchema: z.ZodType<Prisma.StreakEventUpdateOneRequiredWithoutAbsencesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => StreakEventCreateWithoutAbsencesInputSchema), z.lazy(() => StreakEventUncheckedCreateWithoutAbsencesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StreakEventCreateOrConnectWithoutAbsencesInputSchema).optional(),
  upsert: z.lazy(() => StreakEventUpsertWithoutAbsencesInputSchema).optional(),
  connect: z.lazy(() => StreakEventWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StreakEventUpdateToOneWithWhereWithoutAbsencesInputSchema), z.lazy(() => StreakEventUpdateWithoutAbsencesInputSchema), z.lazy(() => StreakEventUncheckedUpdateWithoutAbsencesInputSchema) ]).optional(),
});

export const UserCreateNestedOneWithoutContactsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutContactsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutContactsInputSchema), z.lazy(() => UserUncheckedCreateWithoutContactsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutContactsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const UserUpdateOneRequiredWithoutContactsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutContactsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutContactsInputSchema), z.lazy(() => UserUncheckedCreateWithoutContactsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutContactsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutContactsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutContactsInputSchema), z.lazy(() => UserUpdateWithoutContactsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutContactsInputSchema) ]).optional(),
});

export const UserCreateNestedOneWithoutAlertsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAlertsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAlertsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAlertsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAlertsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const UserAddictionCreateNestedOneWithoutAlertsInputSchema: z.ZodType<Prisma.UserAddictionCreateNestedOneWithoutAlertsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserAddictionCreateWithoutAlertsInputSchema), z.lazy(() => UserAddictionUncheckedCreateWithoutAlertsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserAddictionCreateOrConnectWithoutAlertsInputSchema).optional(),
  connect: z.lazy(() => UserAddictionWhereUniqueInputSchema).optional(),
});

export const UserUpdateOneRequiredWithoutAlertsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAlertsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAlertsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAlertsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAlertsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAlertsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAlertsInputSchema), z.lazy(() => UserUpdateWithoutAlertsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAlertsInputSchema) ]).optional(),
});

export const UserAddictionUpdateOneRequiredWithoutAlertsNestedInputSchema: z.ZodType<Prisma.UserAddictionUpdateOneRequiredWithoutAlertsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserAddictionCreateWithoutAlertsInputSchema), z.lazy(() => UserAddictionUncheckedCreateWithoutAlertsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserAddictionCreateOrConnectWithoutAlertsInputSchema).optional(),
  upsert: z.lazy(() => UserAddictionUpsertWithoutAlertsInputSchema).optional(),
  connect: z.lazy(() => UserAddictionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserAddictionUpdateToOneWithWhereWithoutAlertsInputSchema), z.lazy(() => UserAddictionUpdateWithoutAlertsInputSchema), z.lazy(() => UserAddictionUncheckedUpdateWithoutAlertsInputSchema) ]).optional(),
});

export const UserCreateNestedOneWithoutStreakInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutStreakInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutStreakInputSchema), z.lazy(() => UserUncheckedCreateWithoutStreakInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStreakInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const UserAddictionCreateNestedOneWithoutStreakInputSchema: z.ZodType<Prisma.UserAddictionCreateNestedOneWithoutStreakInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserAddictionCreateWithoutStreakInputSchema), z.lazy(() => UserAddictionUncheckedCreateWithoutStreakInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserAddictionCreateOrConnectWithoutStreakInputSchema).optional(),
  connect: z.lazy(() => UserAddictionWhereUniqueInputSchema).optional(),
});

export const StreakEventCreateNestedManyWithoutStreakInputSchema: z.ZodType<Prisma.StreakEventCreateNestedManyWithoutStreakInput> = z.strictObject({
  create: z.union([ z.lazy(() => StreakEventCreateWithoutStreakInputSchema), z.lazy(() => StreakEventCreateWithoutStreakInputSchema).array(), z.lazy(() => StreakEventUncheckedCreateWithoutStreakInputSchema), z.lazy(() => StreakEventUncheckedCreateWithoutStreakInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StreakEventCreateOrConnectWithoutStreakInputSchema), z.lazy(() => StreakEventCreateOrConnectWithoutStreakInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StreakEventCreateManyStreakInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StreakEventWhereUniqueInputSchema), z.lazy(() => StreakEventWhereUniqueInputSchema).array() ]).optional(),
});

export const StreakEventUncheckedCreateNestedManyWithoutStreakInputSchema: z.ZodType<Prisma.StreakEventUncheckedCreateNestedManyWithoutStreakInput> = z.strictObject({
  create: z.union([ z.lazy(() => StreakEventCreateWithoutStreakInputSchema), z.lazy(() => StreakEventCreateWithoutStreakInputSchema).array(), z.lazy(() => StreakEventUncheckedCreateWithoutStreakInputSchema), z.lazy(() => StreakEventUncheckedCreateWithoutStreakInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StreakEventCreateOrConnectWithoutStreakInputSchema), z.lazy(() => StreakEventCreateOrConnectWithoutStreakInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StreakEventCreateManyStreakInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StreakEventWhereUniqueInputSchema), z.lazy(() => StreakEventWhereUniqueInputSchema).array() ]).optional(),
});

export const UserUpdateOneRequiredWithoutStreakNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutStreakNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutStreakInputSchema), z.lazy(() => UserUncheckedCreateWithoutStreakInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStreakInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutStreakInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutStreakInputSchema), z.lazy(() => UserUpdateWithoutStreakInputSchema), z.lazy(() => UserUncheckedUpdateWithoutStreakInputSchema) ]).optional(),
});

export const UserAddictionUpdateOneRequiredWithoutStreakNestedInputSchema: z.ZodType<Prisma.UserAddictionUpdateOneRequiredWithoutStreakNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserAddictionCreateWithoutStreakInputSchema), z.lazy(() => UserAddictionUncheckedCreateWithoutStreakInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserAddictionCreateOrConnectWithoutStreakInputSchema).optional(),
  upsert: z.lazy(() => UserAddictionUpsertWithoutStreakInputSchema).optional(),
  connect: z.lazy(() => UserAddictionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserAddictionUpdateToOneWithWhereWithoutStreakInputSchema), z.lazy(() => UserAddictionUpdateWithoutStreakInputSchema), z.lazy(() => UserAddictionUncheckedUpdateWithoutStreakInputSchema) ]).optional(),
});

export const StreakEventUpdateManyWithoutStreakNestedInputSchema: z.ZodType<Prisma.StreakEventUpdateManyWithoutStreakNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => StreakEventCreateWithoutStreakInputSchema), z.lazy(() => StreakEventCreateWithoutStreakInputSchema).array(), z.lazy(() => StreakEventUncheckedCreateWithoutStreakInputSchema), z.lazy(() => StreakEventUncheckedCreateWithoutStreakInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StreakEventCreateOrConnectWithoutStreakInputSchema), z.lazy(() => StreakEventCreateOrConnectWithoutStreakInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StreakEventUpsertWithWhereUniqueWithoutStreakInputSchema), z.lazy(() => StreakEventUpsertWithWhereUniqueWithoutStreakInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StreakEventCreateManyStreakInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StreakEventWhereUniqueInputSchema), z.lazy(() => StreakEventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StreakEventWhereUniqueInputSchema), z.lazy(() => StreakEventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StreakEventWhereUniqueInputSchema), z.lazy(() => StreakEventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StreakEventWhereUniqueInputSchema), z.lazy(() => StreakEventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StreakEventUpdateWithWhereUniqueWithoutStreakInputSchema), z.lazy(() => StreakEventUpdateWithWhereUniqueWithoutStreakInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StreakEventUpdateManyWithWhereWithoutStreakInputSchema), z.lazy(() => StreakEventUpdateManyWithWhereWithoutStreakInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StreakEventScalarWhereInputSchema), z.lazy(() => StreakEventScalarWhereInputSchema).array() ]).optional(),
});

export const StreakEventUncheckedUpdateManyWithoutStreakNestedInputSchema: z.ZodType<Prisma.StreakEventUncheckedUpdateManyWithoutStreakNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => StreakEventCreateWithoutStreakInputSchema), z.lazy(() => StreakEventCreateWithoutStreakInputSchema).array(), z.lazy(() => StreakEventUncheckedCreateWithoutStreakInputSchema), z.lazy(() => StreakEventUncheckedCreateWithoutStreakInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StreakEventCreateOrConnectWithoutStreakInputSchema), z.lazy(() => StreakEventCreateOrConnectWithoutStreakInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StreakEventUpsertWithWhereUniqueWithoutStreakInputSchema), z.lazy(() => StreakEventUpsertWithWhereUniqueWithoutStreakInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StreakEventCreateManyStreakInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StreakEventWhereUniqueInputSchema), z.lazy(() => StreakEventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StreakEventWhereUniqueInputSchema), z.lazy(() => StreakEventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StreakEventWhereUniqueInputSchema), z.lazy(() => StreakEventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StreakEventWhereUniqueInputSchema), z.lazy(() => StreakEventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StreakEventUpdateWithWhereUniqueWithoutStreakInputSchema), z.lazy(() => StreakEventUpdateWithWhereUniqueWithoutStreakInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StreakEventUpdateManyWithWhereWithoutStreakInputSchema), z.lazy(() => StreakEventUpdateManyWithWhereWithoutStreakInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StreakEventScalarWhereInputSchema), z.lazy(() => StreakEventScalarWhereInputSchema).array() ]).optional(),
});

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
});

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const NestedEnumUserRoleFilterSchema: z.ZodType<Prisma.NestedEnumUserRoleFilter> = z.strictObject({
  equals: z.lazy(() => UserRoleSchema).optional(),
  in: z.lazy(() => UserRoleSchema).array().optional(),
  notIn: z.lazy(() => UserRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => NestedEnumUserRoleFilterSchema) ]).optional(),
});

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
});

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
});

export const NestedUuidWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const NestedEnumUserRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumUserRoleWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => UserRoleSchema).optional(),
  in: z.lazy(() => UserRoleSchema).array().optional(),
  notIn: z.lazy(() => UserRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => NestedEnumUserRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
});

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
});

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
});

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
});

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
});

export const NestedEnumSponsorshipStatusFilterSchema: z.ZodType<Prisma.NestedEnumSponsorshipStatusFilter> = z.strictObject({
  equals: z.lazy(() => SponsorshipStatusSchema).optional(),
  in: z.lazy(() => SponsorshipStatusSchema).array().optional(),
  notIn: z.lazy(() => SponsorshipStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => SponsorshipStatusSchema), z.lazy(() => NestedEnumSponsorshipStatusFilterSchema) ]).optional(),
});

export const NestedEnumSponsorshipStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSponsorshipStatusWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => SponsorshipStatusSchema).optional(),
  in: z.lazy(() => SponsorshipStatusSchema).array().optional(),
  notIn: z.lazy(() => SponsorshipStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => SponsorshipStatusSchema), z.lazy(() => NestedEnumSponsorshipStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSponsorshipStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSponsorshipStatusFilterSchema).optional(),
});

export const NestedDecimalFilterSchema: z.ZodType<Prisma.NestedDecimalFilter> = z.strictObject({
  equals: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalFilterSchema) ]).optional(),
});

export const NestedDecimalWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDecimalWithAggregatesFilter> = z.strictObject({
  equals: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterSchema).optional(),
});

export const UserAddictionCreateWithoutUserInputSchema: z.ZodType<Prisma.UserAddictionCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  custom_name: z.string(),
  classification: z.string().optional(),
  is_active: z.boolean().optional(),
  registered_at: z.coerce.date().optional(),
  created_at: z.coerce.date().optional(),
  streak: z.lazy(() => StreakCreateNestedManyWithoutAddictionInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertCreateNestedManyWithoutAddictionInputSchema).optional(),
});

export const UserAddictionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserAddictionUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  custom_name: z.string(),
  classification: z.string().optional(),
  is_active: z.boolean().optional(),
  registered_at: z.coerce.date().optional(),
  created_at: z.coerce.date().optional(),
  streak: z.lazy(() => StreakUncheckedCreateNestedManyWithoutAddictionInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedCreateNestedManyWithoutAddictionInputSchema).optional(),
});

export const UserAddictionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserAddictionCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => UserAddictionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserAddictionCreateWithoutUserInputSchema), z.lazy(() => UserAddictionUncheckedCreateWithoutUserInputSchema) ]),
});

export const UserAddictionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserAddictionCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => UserAddictionCreateManyUserInputSchema), z.lazy(() => UserAddictionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const DailyLogCreateWithoutUserInputSchema: z.ZodType<Prisma.DailyLogCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  log_date: z.coerce.date(),
  consumed: z.boolean().optional(),
  triggers: z.string().optional(),
  notes: z.string().optional(),
  created_at: z.coerce.date().optional(),
  craving_level: z.lazy(() => CravingLevelCreateNestedOneWithoutDaily_logsInputSchema),
  emotional_state: z.lazy(() => EmotionalStateCreateNestedOneWithoutDaily_logsInputSchema),
});

export const DailyLogUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.DailyLogUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  log_date: z.coerce.date(),
  consumed: z.boolean().optional(),
  craving_level_id: z.string(),
  emotional_state_id: z.string(),
  triggers: z.string().optional(),
  notes: z.string().optional(),
  created_at: z.coerce.date().optional(),
});

export const DailyLogCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.DailyLogCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => DailyLogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DailyLogCreateWithoutUserInputSchema), z.lazy(() => DailyLogUncheckedCreateWithoutUserInputSchema) ]),
});

export const DailyLogCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.DailyLogCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => DailyLogCreateManyUserInputSchema), z.lazy(() => DailyLogCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const SponsorshipCreateWithoutSponsorInputSchema: z.ZodType<Prisma.SponsorshipCreateWithoutSponsorInput> = z.strictObject({
  id: z.string().optional(),
  started_at: z.coerce.date().optional(),
  ended_at: z.coerce.date().optional(),
  status: z.lazy(() => SponsorshipStatusSchema).optional(),
  termination_reason: z.string().optional(),
  created_at: z.coerce.date().optional(),
  addict: z.lazy(() => UserCreateNestedOneWithoutSponsorships_as_addictInputSchema).optional(),
});

export const SponsorshipUncheckedCreateWithoutSponsorInputSchema: z.ZodType<Prisma.SponsorshipUncheckedCreateWithoutSponsorInput> = z.strictObject({
  id: z.string().optional(),
  addict_id: z.string().optional(),
  started_at: z.coerce.date().optional(),
  ended_at: z.coerce.date().optional(),
  status: z.lazy(() => SponsorshipStatusSchema).optional(),
  termination_reason: z.string().optional(),
  created_at: z.coerce.date().optional(),
});

export const SponsorshipCreateOrConnectWithoutSponsorInputSchema: z.ZodType<Prisma.SponsorshipCreateOrConnectWithoutSponsorInput> = z.strictObject({
  where: z.lazy(() => SponsorshipWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SponsorshipCreateWithoutSponsorInputSchema), z.lazy(() => SponsorshipUncheckedCreateWithoutSponsorInputSchema) ]),
});

export const SponsorshipCreateManySponsorInputEnvelopeSchema: z.ZodType<Prisma.SponsorshipCreateManySponsorInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => SponsorshipCreateManySponsorInputSchema), z.lazy(() => SponsorshipCreateManySponsorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const SponsorshipCreateWithoutAddictInputSchema: z.ZodType<Prisma.SponsorshipCreateWithoutAddictInput> = z.strictObject({
  id: z.string().optional(),
  started_at: z.coerce.date().optional(),
  ended_at: z.coerce.date().optional(),
  status: z.lazy(() => SponsorshipStatusSchema).optional(),
  termination_reason: z.string().optional(),
  created_at: z.coerce.date().optional(),
  sponsor: z.lazy(() => UserCreateNestedOneWithoutSponsorships_as_sponsorInputSchema).optional(),
});

export const SponsorshipUncheckedCreateWithoutAddictInputSchema: z.ZodType<Prisma.SponsorshipUncheckedCreateWithoutAddictInput> = z.strictObject({
  id: z.string().optional(),
  sponsor_id: z.string().optional(),
  started_at: z.coerce.date().optional(),
  ended_at: z.coerce.date().optional(),
  status: z.lazy(() => SponsorshipStatusSchema).optional(),
  termination_reason: z.string().optional(),
  created_at: z.coerce.date().optional(),
});

export const SponsorshipCreateOrConnectWithoutAddictInputSchema: z.ZodType<Prisma.SponsorshipCreateOrConnectWithoutAddictInput> = z.strictObject({
  where: z.lazy(() => SponsorshipWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SponsorshipCreateWithoutAddictInputSchema), z.lazy(() => SponsorshipUncheckedCreateWithoutAddictInputSchema) ]),
});

export const SponsorshipCreateManyAddictInputEnvelopeSchema: z.ZodType<Prisma.SponsorshipCreateManyAddictInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => SponsorshipCreateManyAddictInputSchema), z.lazy(() => SponsorshipCreateManyAddictInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const SupportContactCreateWithoutUserInputSchema: z.ZodType<Prisma.SupportContactCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  contact_name: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
  relationship: z.string().optional(),
  custom_relationship: z.string().optional(),
  is_active: z.boolean().optional(),
  priority_order: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export const SupportContactUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SupportContactUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  contact_name: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
  relationship: z.string().optional(),
  custom_relationship: z.string().optional(),
  is_active: z.boolean().optional(),
  priority_order: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export const SupportContactCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SupportContactCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => SupportContactWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SupportContactCreateWithoutUserInputSchema), z.lazy(() => SupportContactUncheckedCreateWithoutUserInputSchema) ]),
});

export const SupportContactCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SupportContactCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => SupportContactCreateManyUserInputSchema), z.lazy(() => SupportContactCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const EmergencyAlertCreateWithoutUserInputSchema: z.ZodType<Prisma.EmergencyAlertCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  activated_at: z.coerce.date().optional(),
  resulted_in_relapse: z.boolean().optional(),
  resolution_notes: z.string().optional(),
  created_at: z.coerce.date().optional(),
  addiction: z.lazy(() => UserAddictionCreateNestedOneWithoutAlertsInputSchema),
});

export const EmergencyAlertUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.EmergencyAlertUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  user_addiction_id: z.string(),
  activated_at: z.coerce.date().optional(),
  resulted_in_relapse: z.boolean().optional(),
  resolution_notes: z.string().optional(),
  created_at: z.coerce.date().optional(),
});

export const EmergencyAlertCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.EmergencyAlertCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => EmergencyAlertWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmergencyAlertCreateWithoutUserInputSchema), z.lazy(() => EmergencyAlertUncheckedCreateWithoutUserInputSchema) ]),
});

export const EmergencyAlertCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.EmergencyAlertCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => EmergencyAlertCreateManyUserInputSchema), z.lazy(() => EmergencyAlertCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const StreakCreateWithoutUserInputSchema: z.ZodType<Prisma.StreakCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  status: z.string().optional(),
  started_at: z.coerce.date(),
  day_counter: z.number().int().optional(),
  last_log_date: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  addiction: z.lazy(() => UserAddictionCreateNestedOneWithoutStreakInputSchema),
  events: z.lazy(() => StreakEventCreateNestedManyWithoutStreakInputSchema).optional(),
});

export const StreakUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.StreakUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  user_addiction_id: z.string(),
  status: z.string().optional(),
  started_at: z.coerce.date(),
  day_counter: z.number().int().optional(),
  last_log_date: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  events: z.lazy(() => StreakEventUncheckedCreateNestedManyWithoutStreakInputSchema).optional(),
});

export const StreakCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.StreakCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => StreakWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StreakCreateWithoutUserInputSchema), z.lazy(() => StreakUncheckedCreateWithoutUserInputSchema) ]),
});

export const StreakCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.StreakCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => StreakCreateManyUserInputSchema), z.lazy(() => StreakCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const LogAbsenceCreateWithoutUserInputSchema: z.ZodType<Prisma.LogAbsenceCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  streak_id: z.string(),
  last_log_date: z.coerce.date().optional(),
  detected_at: z.coerce.date().optional(),
  absence_hours: z.number().int().optional(),
  event_generated: z.boolean().optional(),
  streak_event: z.lazy(() => StreakEventCreateNestedOneWithoutAbsencesInputSchema).optional(),
});

export const LogAbsenceUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.LogAbsenceUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  streak_id: z.string(),
  last_log_date: z.coerce.date().optional(),
  detected_at: z.coerce.date().optional(),
  absence_hours: z.number().int().optional(),
  event_generated: z.boolean().optional(),
  streak_event_id: z.string().optional(),
});

export const LogAbsenceCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.LogAbsenceCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => LogAbsenceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LogAbsenceCreateWithoutUserInputSchema), z.lazy(() => LogAbsenceUncheckedCreateWithoutUserInputSchema) ]),
});

export const LogAbsenceCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.LogAbsenceCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => LogAbsenceCreateManyUserInputSchema), z.lazy(() => LogAbsenceCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const PasswordResetTokenCreateWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  token: z.string(),
  expires_at: z.coerce.date(),
  created_at: z.coerce.date().optional(),
});

export const PasswordResetTokenUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  token: z.string(),
  expires_at: z.coerce.date(),
  created_at: z.coerce.date().optional(),
});

export const PasswordResetTokenCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => PasswordResetTokenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema) ]),
});

export const PasswordResetTokenCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.PasswordResetTokenCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => PasswordResetTokenCreateManyUserInputSchema), z.lazy(() => PasswordResetTokenCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const TrustedDeviceCreateWithoutUserInputSchema: z.ZodType<Prisma.TrustedDeviceCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  device_identifier: z.string(),
  device_name: z.string().optional().nullable(),
  last_used_at: z.coerce.date().optional(),
  expires_at: z.coerce.date(),
  created_at: z.coerce.date().optional(),
});

export const TrustedDeviceUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.TrustedDeviceUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  device_identifier: z.string(),
  device_name: z.string().optional().nullable(),
  last_used_at: z.coerce.date().optional(),
  expires_at: z.coerce.date(),
  created_at: z.coerce.date().optional(),
});

export const TrustedDeviceCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.TrustedDeviceCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => TrustedDeviceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TrustedDeviceCreateWithoutUserInputSchema), z.lazy(() => TrustedDeviceUncheckedCreateWithoutUserInputSchema) ]),
});

export const TrustedDeviceCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.TrustedDeviceCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => TrustedDeviceCreateManyUserInputSchema), z.lazy(() => TrustedDeviceCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const VerificationTokenCreateWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  token: z.string(),
  expires_at: z.coerce.date(),
  created_at: z.coerce.date().optional(),
});

export const VerificationTokenUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  token: z.string(),
  expires_at: z.coerce.date(),
  created_at: z.coerce.date().optional(),
});

export const VerificationTokenCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => VerificationTokenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VerificationTokenCreateWithoutUserInputSchema), z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema) ]),
});

export const VerificationTokenCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.VerificationTokenCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => VerificationTokenCreateManyUserInputSchema), z.lazy(() => VerificationTokenCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const UserAddictionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserAddictionUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => UserAddictionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserAddictionUpdateWithoutUserInputSchema), z.lazy(() => UserAddictionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserAddictionCreateWithoutUserInputSchema), z.lazy(() => UserAddictionUncheckedCreateWithoutUserInputSchema) ]),
});

export const UserAddictionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserAddictionUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => UserAddictionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserAddictionUpdateWithoutUserInputSchema), z.lazy(() => UserAddictionUncheckedUpdateWithoutUserInputSchema) ]),
});

export const UserAddictionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserAddictionUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => UserAddictionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserAddictionUpdateManyMutationInputSchema), z.lazy(() => UserAddictionUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const UserAddictionScalarWhereInputSchema: z.ZodType<Prisma.UserAddictionScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserAddictionScalarWhereInputSchema), z.lazy(() => UserAddictionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserAddictionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserAddictionScalarWhereInputSchema), z.lazy(() => UserAddictionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  custom_name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  classification: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  registered_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const DailyLogUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.DailyLogUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => DailyLogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DailyLogUpdateWithoutUserInputSchema), z.lazy(() => DailyLogUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => DailyLogCreateWithoutUserInputSchema), z.lazy(() => DailyLogUncheckedCreateWithoutUserInputSchema) ]),
});

export const DailyLogUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.DailyLogUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => DailyLogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DailyLogUpdateWithoutUserInputSchema), z.lazy(() => DailyLogUncheckedUpdateWithoutUserInputSchema) ]),
});

export const DailyLogUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.DailyLogUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => DailyLogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DailyLogUpdateManyMutationInputSchema), z.lazy(() => DailyLogUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const DailyLogScalarWhereInputSchema: z.ZodType<Prisma.DailyLogScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => DailyLogScalarWhereInputSchema), z.lazy(() => DailyLogScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DailyLogScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DailyLogScalarWhereInputSchema), z.lazy(() => DailyLogScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  log_date: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  consumed: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  craving_level_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  emotional_state_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  triggers: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  notes: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const SponsorshipUpsertWithWhereUniqueWithoutSponsorInputSchema: z.ZodType<Prisma.SponsorshipUpsertWithWhereUniqueWithoutSponsorInput> = z.strictObject({
  where: z.lazy(() => SponsorshipWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SponsorshipUpdateWithoutSponsorInputSchema), z.lazy(() => SponsorshipUncheckedUpdateWithoutSponsorInputSchema) ]),
  create: z.union([ z.lazy(() => SponsorshipCreateWithoutSponsorInputSchema), z.lazy(() => SponsorshipUncheckedCreateWithoutSponsorInputSchema) ]),
});

export const SponsorshipUpdateWithWhereUniqueWithoutSponsorInputSchema: z.ZodType<Prisma.SponsorshipUpdateWithWhereUniqueWithoutSponsorInput> = z.strictObject({
  where: z.lazy(() => SponsorshipWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SponsorshipUpdateWithoutSponsorInputSchema), z.lazy(() => SponsorshipUncheckedUpdateWithoutSponsorInputSchema) ]),
});

export const SponsorshipUpdateManyWithWhereWithoutSponsorInputSchema: z.ZodType<Prisma.SponsorshipUpdateManyWithWhereWithoutSponsorInput> = z.strictObject({
  where: z.lazy(() => SponsorshipScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SponsorshipUpdateManyMutationInputSchema), z.lazy(() => SponsorshipUncheckedUpdateManyWithoutSponsorInputSchema) ]),
});

export const SponsorshipScalarWhereInputSchema: z.ZodType<Prisma.SponsorshipScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => SponsorshipScalarWhereInputSchema), z.lazy(() => SponsorshipScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SponsorshipScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SponsorshipScalarWhereInputSchema), z.lazy(() => SponsorshipScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  sponsor_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  addict_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  started_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  ended_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumSponsorshipStatusFilterSchema), z.lazy(() => SponsorshipStatusSchema) ]).optional(),
  termination_reason: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const SponsorshipUpsertWithWhereUniqueWithoutAddictInputSchema: z.ZodType<Prisma.SponsorshipUpsertWithWhereUniqueWithoutAddictInput> = z.strictObject({
  where: z.lazy(() => SponsorshipWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SponsorshipUpdateWithoutAddictInputSchema), z.lazy(() => SponsorshipUncheckedUpdateWithoutAddictInputSchema) ]),
  create: z.union([ z.lazy(() => SponsorshipCreateWithoutAddictInputSchema), z.lazy(() => SponsorshipUncheckedCreateWithoutAddictInputSchema) ]),
});

export const SponsorshipUpdateWithWhereUniqueWithoutAddictInputSchema: z.ZodType<Prisma.SponsorshipUpdateWithWhereUniqueWithoutAddictInput> = z.strictObject({
  where: z.lazy(() => SponsorshipWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SponsorshipUpdateWithoutAddictInputSchema), z.lazy(() => SponsorshipUncheckedUpdateWithoutAddictInputSchema) ]),
});

export const SponsorshipUpdateManyWithWhereWithoutAddictInputSchema: z.ZodType<Prisma.SponsorshipUpdateManyWithWhereWithoutAddictInput> = z.strictObject({
  where: z.lazy(() => SponsorshipScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SponsorshipUpdateManyMutationInputSchema), z.lazy(() => SponsorshipUncheckedUpdateManyWithoutAddictInputSchema) ]),
});

export const SupportContactUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SupportContactUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => SupportContactWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SupportContactUpdateWithoutUserInputSchema), z.lazy(() => SupportContactUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SupportContactCreateWithoutUserInputSchema), z.lazy(() => SupportContactUncheckedCreateWithoutUserInputSchema) ]),
});

export const SupportContactUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SupportContactUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => SupportContactWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SupportContactUpdateWithoutUserInputSchema), z.lazy(() => SupportContactUncheckedUpdateWithoutUserInputSchema) ]),
});

export const SupportContactUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SupportContactUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => SupportContactScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SupportContactUpdateManyMutationInputSchema), z.lazy(() => SupportContactUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const SupportContactScalarWhereInputSchema: z.ZodType<Prisma.SupportContactScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => SupportContactScalarWhereInputSchema), z.lazy(() => SupportContactScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SupportContactScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SupportContactScalarWhereInputSchema), z.lazy(() => SupportContactScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  contact_name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  relationship: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  custom_relationship: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  priority_order: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const EmergencyAlertUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.EmergencyAlertUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => EmergencyAlertWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EmergencyAlertUpdateWithoutUserInputSchema), z.lazy(() => EmergencyAlertUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => EmergencyAlertCreateWithoutUserInputSchema), z.lazy(() => EmergencyAlertUncheckedCreateWithoutUserInputSchema) ]),
});

export const EmergencyAlertUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.EmergencyAlertUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => EmergencyAlertWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EmergencyAlertUpdateWithoutUserInputSchema), z.lazy(() => EmergencyAlertUncheckedUpdateWithoutUserInputSchema) ]),
});

export const EmergencyAlertUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.EmergencyAlertUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => EmergencyAlertScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EmergencyAlertUpdateManyMutationInputSchema), z.lazy(() => EmergencyAlertUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const EmergencyAlertScalarWhereInputSchema: z.ZodType<Prisma.EmergencyAlertScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => EmergencyAlertScalarWhereInputSchema), z.lazy(() => EmergencyAlertScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmergencyAlertScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmergencyAlertScalarWhereInputSchema), z.lazy(() => EmergencyAlertScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  user_addiction_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  activated_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  resulted_in_relapse: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  resolution_notes: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const StreakUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.StreakUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => StreakWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StreakUpdateWithoutUserInputSchema), z.lazy(() => StreakUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => StreakCreateWithoutUserInputSchema), z.lazy(() => StreakUncheckedCreateWithoutUserInputSchema) ]),
});

export const StreakUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.StreakUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => StreakWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StreakUpdateWithoutUserInputSchema), z.lazy(() => StreakUncheckedUpdateWithoutUserInputSchema) ]),
});

export const StreakUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.StreakUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => StreakScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StreakUpdateManyMutationInputSchema), z.lazy(() => StreakUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const StreakScalarWhereInputSchema: z.ZodType<Prisma.StreakScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => StreakScalarWhereInputSchema), z.lazy(() => StreakScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StreakScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StreakScalarWhereInputSchema), z.lazy(() => StreakScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  user_addiction_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  status: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  started_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  day_counter: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  last_log_date: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const LogAbsenceUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.LogAbsenceUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => LogAbsenceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LogAbsenceUpdateWithoutUserInputSchema), z.lazy(() => LogAbsenceUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => LogAbsenceCreateWithoutUserInputSchema), z.lazy(() => LogAbsenceUncheckedCreateWithoutUserInputSchema) ]),
});

export const LogAbsenceUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.LogAbsenceUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => LogAbsenceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LogAbsenceUpdateWithoutUserInputSchema), z.lazy(() => LogAbsenceUncheckedUpdateWithoutUserInputSchema) ]),
});

export const LogAbsenceUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.LogAbsenceUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => LogAbsenceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LogAbsenceUpdateManyMutationInputSchema), z.lazy(() => LogAbsenceUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const LogAbsenceScalarWhereInputSchema: z.ZodType<Prisma.LogAbsenceScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => LogAbsenceScalarWhereInputSchema), z.lazy(() => LogAbsenceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LogAbsenceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LogAbsenceScalarWhereInputSchema), z.lazy(() => LogAbsenceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  streak_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  last_log_date: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  detected_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  absence_hours: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  event_generated: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  streak_event_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
});

export const PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => PasswordResetTokenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PasswordResetTokenUpdateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema) ]),
});

export const PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => PasswordResetTokenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PasswordResetTokenUpdateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUncheckedUpdateWithoutUserInputSchema) ]),
});

export const PasswordResetTokenUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => PasswordResetTokenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PasswordResetTokenUpdateManyMutationInputSchema), z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const PasswordResetTokenScalarWhereInputSchema: z.ZodType<Prisma.PasswordResetTokenScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => PasswordResetTokenScalarWhereInputSchema), z.lazy(() => PasswordResetTokenScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasswordResetTokenScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasswordResetTokenScalarWhereInputSchema), z.lazy(() => PasswordResetTokenScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const TrustedDeviceUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TrustedDeviceUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => TrustedDeviceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TrustedDeviceUpdateWithoutUserInputSchema), z.lazy(() => TrustedDeviceUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => TrustedDeviceCreateWithoutUserInputSchema), z.lazy(() => TrustedDeviceUncheckedCreateWithoutUserInputSchema) ]),
});

export const TrustedDeviceUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TrustedDeviceUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => TrustedDeviceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TrustedDeviceUpdateWithoutUserInputSchema), z.lazy(() => TrustedDeviceUncheckedUpdateWithoutUserInputSchema) ]),
});

export const TrustedDeviceUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.TrustedDeviceUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => TrustedDeviceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TrustedDeviceUpdateManyMutationInputSchema), z.lazy(() => TrustedDeviceUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const TrustedDeviceScalarWhereInputSchema: z.ZodType<Prisma.TrustedDeviceScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => TrustedDeviceScalarWhereInputSchema), z.lazy(() => TrustedDeviceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TrustedDeviceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TrustedDeviceScalarWhereInputSchema), z.lazy(() => TrustedDeviceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  device_identifier: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  device_name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  last_used_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const VerificationTokenUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => VerificationTokenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => VerificationTokenUpdateWithoutUserInputSchema), z.lazy(() => VerificationTokenUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => VerificationTokenCreateWithoutUserInputSchema), z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema) ]),
});

export const VerificationTokenUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => VerificationTokenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => VerificationTokenUpdateWithoutUserInputSchema), z.lazy(() => VerificationTokenUncheckedUpdateWithoutUserInputSchema) ]),
});

export const VerificationTokenUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => VerificationTokenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => VerificationTokenUpdateManyMutationInputSchema), z.lazy(() => VerificationTokenUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const VerificationTokenScalarWhereInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereInputSchema), z.lazy(() => VerificationTokenScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereInputSchema), z.lazy(() => VerificationTokenScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const UserCreateWithoutPassword_reset_tokensInputSchema: z.ZodType<Prisma.UserCreateWithoutPassword_reset_tokensInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  addictions: z.lazy(() => UserAddictionCreateNestedManyWithoutUserInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipCreateNestedManyWithoutSponsorInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipCreateNestedManyWithoutAddictInputSchema).optional(),
  contacts: z.lazy(() => SupportContactCreateNestedManyWithoutUserInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertCreateNestedManyWithoutUserInputSchema).optional(),
  streak: z.lazy(() => StreakCreateNestedManyWithoutUserInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceCreateNestedManyWithoutUserInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutPassword_reset_tokensInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPassword_reset_tokensInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  addictions: z.lazy(() => UserAddictionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUncheckedCreateNestedManyWithoutSponsorInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUncheckedCreateNestedManyWithoutAddictInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  streak: z.lazy(() => StreakUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutPassword_reset_tokensInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPassword_reset_tokensInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPassword_reset_tokensInputSchema), z.lazy(() => UserUncheckedCreateWithoutPassword_reset_tokensInputSchema) ]),
});

export const UserUpsertWithoutPassword_reset_tokensInputSchema: z.ZodType<Prisma.UserUpsertWithoutPassword_reset_tokensInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutPassword_reset_tokensInputSchema), z.lazy(() => UserUncheckedUpdateWithoutPassword_reset_tokensInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPassword_reset_tokensInputSchema), z.lazy(() => UserUncheckedCreateWithoutPassword_reset_tokensInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutPassword_reset_tokensInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPassword_reset_tokensInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPassword_reset_tokensInputSchema), z.lazy(() => UserUncheckedUpdateWithoutPassword_reset_tokensInputSchema) ]),
});

export const UserUpdateWithoutPassword_reset_tokensInputSchema: z.ZodType<Prisma.UserUpdateWithoutPassword_reset_tokensInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionUpdateManyWithoutUserNestedInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUpdateManyWithoutSponsorNestedInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUpdateManyWithoutAddictNestedInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUpdateManyWithoutUserNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUpdateManyWithoutUserNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUpdateManyWithoutUserNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUpdateManyWithoutUserNestedInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutPassword_reset_tokensInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPassword_reset_tokensInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUncheckedUpdateManyWithoutSponsorNestedInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUncheckedUpdateManyWithoutAddictNestedInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserCreateWithoutTrusted_devicesInputSchema: z.ZodType<Prisma.UserCreateWithoutTrusted_devicesInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  addictions: z.lazy(() => UserAddictionCreateNestedManyWithoutUserInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipCreateNestedManyWithoutSponsorInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipCreateNestedManyWithoutAddictInputSchema).optional(),
  contacts: z.lazy(() => SupportContactCreateNestedManyWithoutUserInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertCreateNestedManyWithoutUserInputSchema).optional(),
  streak: z.lazy(() => StreakCreateNestedManyWithoutUserInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutTrusted_devicesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTrusted_devicesInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  addictions: z.lazy(() => UserAddictionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUncheckedCreateNestedManyWithoutSponsorInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUncheckedCreateNestedManyWithoutAddictInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  streak: z.lazy(() => StreakUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutTrusted_devicesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTrusted_devicesInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTrusted_devicesInputSchema), z.lazy(() => UserUncheckedCreateWithoutTrusted_devicesInputSchema) ]),
});

export const UserUpsertWithoutTrusted_devicesInputSchema: z.ZodType<Prisma.UserUpsertWithoutTrusted_devicesInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutTrusted_devicesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutTrusted_devicesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTrusted_devicesInputSchema), z.lazy(() => UserUncheckedCreateWithoutTrusted_devicesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutTrusted_devicesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTrusted_devicesInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutTrusted_devicesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutTrusted_devicesInputSchema) ]),
});

export const UserUpdateWithoutTrusted_devicesInputSchema: z.ZodType<Prisma.UserUpdateWithoutTrusted_devicesInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionUpdateManyWithoutUserNestedInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUpdateManyWithoutSponsorNestedInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUpdateManyWithoutAddictNestedInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUpdateManyWithoutUserNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUpdateManyWithoutUserNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUpdateManyWithoutUserNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutTrusted_devicesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTrusted_devicesInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUncheckedUpdateManyWithoutSponsorNestedInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUncheckedUpdateManyWithoutAddictNestedInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserCreateWithoutVerification_tokensInputSchema: z.ZodType<Prisma.UserCreateWithoutVerification_tokensInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  addictions: z.lazy(() => UserAddictionCreateNestedManyWithoutUserInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipCreateNestedManyWithoutSponsorInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipCreateNestedManyWithoutAddictInputSchema).optional(),
  contacts: z.lazy(() => SupportContactCreateNestedManyWithoutUserInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertCreateNestedManyWithoutUserInputSchema).optional(),
  streak: z.lazy(() => StreakCreateNestedManyWithoutUserInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutVerification_tokensInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutVerification_tokensInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  addictions: z.lazy(() => UserAddictionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUncheckedCreateNestedManyWithoutSponsorInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUncheckedCreateNestedManyWithoutAddictInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  streak: z.lazy(() => StreakUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutVerification_tokensInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutVerification_tokensInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutVerification_tokensInputSchema), z.lazy(() => UserUncheckedCreateWithoutVerification_tokensInputSchema) ]),
});

export const UserUpsertWithoutVerification_tokensInputSchema: z.ZodType<Prisma.UserUpsertWithoutVerification_tokensInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutVerification_tokensInputSchema), z.lazy(() => UserUncheckedUpdateWithoutVerification_tokensInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutVerification_tokensInputSchema), z.lazy(() => UserUncheckedCreateWithoutVerification_tokensInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutVerification_tokensInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutVerification_tokensInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutVerification_tokensInputSchema), z.lazy(() => UserUncheckedUpdateWithoutVerification_tokensInputSchema) ]),
});

export const UserUpdateWithoutVerification_tokensInputSchema: z.ZodType<Prisma.UserUpdateWithoutVerification_tokensInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionUpdateManyWithoutUserNestedInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUpdateManyWithoutSponsorNestedInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUpdateManyWithoutAddictNestedInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUpdateManyWithoutUserNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUpdateManyWithoutUserNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUpdateManyWithoutUserNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutVerification_tokensInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutVerification_tokensInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUncheckedUpdateManyWithoutSponsorNestedInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUncheckedUpdateManyWithoutAddictNestedInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const DailyLogCreateWithoutCraving_levelInputSchema: z.ZodType<Prisma.DailyLogCreateWithoutCraving_levelInput> = z.strictObject({
  id: z.string().optional(),
  log_date: z.coerce.date(),
  consumed: z.boolean().optional(),
  triggers: z.string().optional(),
  notes: z.string().optional(),
  created_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutDaily_logsInputSchema),
  emotional_state: z.lazy(() => EmotionalStateCreateNestedOneWithoutDaily_logsInputSchema),
});

export const DailyLogUncheckedCreateWithoutCraving_levelInputSchema: z.ZodType<Prisma.DailyLogUncheckedCreateWithoutCraving_levelInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  log_date: z.coerce.date(),
  consumed: z.boolean().optional(),
  emotional_state_id: z.string(),
  triggers: z.string().optional(),
  notes: z.string().optional(),
  created_at: z.coerce.date().optional(),
});

export const DailyLogCreateOrConnectWithoutCraving_levelInputSchema: z.ZodType<Prisma.DailyLogCreateOrConnectWithoutCraving_levelInput> = z.strictObject({
  where: z.lazy(() => DailyLogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DailyLogCreateWithoutCraving_levelInputSchema), z.lazy(() => DailyLogUncheckedCreateWithoutCraving_levelInputSchema) ]),
});

export const DailyLogCreateManyCraving_levelInputEnvelopeSchema: z.ZodType<Prisma.DailyLogCreateManyCraving_levelInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => DailyLogCreateManyCraving_levelInputSchema), z.lazy(() => DailyLogCreateManyCraving_levelInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const DailyLogUpsertWithWhereUniqueWithoutCraving_levelInputSchema: z.ZodType<Prisma.DailyLogUpsertWithWhereUniqueWithoutCraving_levelInput> = z.strictObject({
  where: z.lazy(() => DailyLogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DailyLogUpdateWithoutCraving_levelInputSchema), z.lazy(() => DailyLogUncheckedUpdateWithoutCraving_levelInputSchema) ]),
  create: z.union([ z.lazy(() => DailyLogCreateWithoutCraving_levelInputSchema), z.lazy(() => DailyLogUncheckedCreateWithoutCraving_levelInputSchema) ]),
});

export const DailyLogUpdateWithWhereUniqueWithoutCraving_levelInputSchema: z.ZodType<Prisma.DailyLogUpdateWithWhereUniqueWithoutCraving_levelInput> = z.strictObject({
  where: z.lazy(() => DailyLogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DailyLogUpdateWithoutCraving_levelInputSchema), z.lazy(() => DailyLogUncheckedUpdateWithoutCraving_levelInputSchema) ]),
});

export const DailyLogUpdateManyWithWhereWithoutCraving_levelInputSchema: z.ZodType<Prisma.DailyLogUpdateManyWithWhereWithoutCraving_levelInput> = z.strictObject({
  where: z.lazy(() => DailyLogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DailyLogUpdateManyMutationInputSchema), z.lazy(() => DailyLogUncheckedUpdateManyWithoutCraving_levelInputSchema) ]),
});

export const DailyLogCreateWithoutEmotional_stateInputSchema: z.ZodType<Prisma.DailyLogCreateWithoutEmotional_stateInput> = z.strictObject({
  id: z.string().optional(),
  log_date: z.coerce.date(),
  consumed: z.boolean().optional(),
  triggers: z.string().optional(),
  notes: z.string().optional(),
  created_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutDaily_logsInputSchema),
  craving_level: z.lazy(() => CravingLevelCreateNestedOneWithoutDaily_logsInputSchema),
});

export const DailyLogUncheckedCreateWithoutEmotional_stateInputSchema: z.ZodType<Prisma.DailyLogUncheckedCreateWithoutEmotional_stateInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  log_date: z.coerce.date(),
  consumed: z.boolean().optional(),
  craving_level_id: z.string(),
  triggers: z.string().optional(),
  notes: z.string().optional(),
  created_at: z.coerce.date().optional(),
});

export const DailyLogCreateOrConnectWithoutEmotional_stateInputSchema: z.ZodType<Prisma.DailyLogCreateOrConnectWithoutEmotional_stateInput> = z.strictObject({
  where: z.lazy(() => DailyLogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DailyLogCreateWithoutEmotional_stateInputSchema), z.lazy(() => DailyLogUncheckedCreateWithoutEmotional_stateInputSchema) ]),
});

export const DailyLogCreateManyEmotional_stateInputEnvelopeSchema: z.ZodType<Prisma.DailyLogCreateManyEmotional_stateInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => DailyLogCreateManyEmotional_stateInputSchema), z.lazy(() => DailyLogCreateManyEmotional_stateInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const DailyLogUpsertWithWhereUniqueWithoutEmotional_stateInputSchema: z.ZodType<Prisma.DailyLogUpsertWithWhereUniqueWithoutEmotional_stateInput> = z.strictObject({
  where: z.lazy(() => DailyLogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DailyLogUpdateWithoutEmotional_stateInputSchema), z.lazy(() => DailyLogUncheckedUpdateWithoutEmotional_stateInputSchema) ]),
  create: z.union([ z.lazy(() => DailyLogCreateWithoutEmotional_stateInputSchema), z.lazy(() => DailyLogUncheckedCreateWithoutEmotional_stateInputSchema) ]),
});

export const DailyLogUpdateWithWhereUniqueWithoutEmotional_stateInputSchema: z.ZodType<Prisma.DailyLogUpdateWithWhereUniqueWithoutEmotional_stateInput> = z.strictObject({
  where: z.lazy(() => DailyLogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DailyLogUpdateWithoutEmotional_stateInputSchema), z.lazy(() => DailyLogUncheckedUpdateWithoutEmotional_stateInputSchema) ]),
});

export const DailyLogUpdateManyWithWhereWithoutEmotional_stateInputSchema: z.ZodType<Prisma.DailyLogUpdateManyWithWhereWithoutEmotional_stateInput> = z.strictObject({
  where: z.lazy(() => DailyLogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DailyLogUpdateManyMutationInputSchema), z.lazy(() => DailyLogUncheckedUpdateManyWithoutEmotional_stateInputSchema) ]),
});

export const UserCreateWithoutAddictionsInputSchema: z.ZodType<Prisma.UserCreateWithoutAddictionsInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  daily_logs: z.lazy(() => DailyLogCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipCreateNestedManyWithoutSponsorInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipCreateNestedManyWithoutAddictInputSchema).optional(),
  contacts: z.lazy(() => SupportContactCreateNestedManyWithoutUserInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertCreateNestedManyWithoutUserInputSchema).optional(),
  streak: z.lazy(() => StreakCreateNestedManyWithoutUserInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutAddictionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAddictionsInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  daily_logs: z.lazy(() => DailyLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUncheckedCreateNestedManyWithoutSponsorInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUncheckedCreateNestedManyWithoutAddictInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  streak: z.lazy(() => StreakUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutAddictionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAddictionsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAddictionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAddictionsInputSchema) ]),
});

export const StreakCreateWithoutAddictionInputSchema: z.ZodType<Prisma.StreakCreateWithoutAddictionInput> = z.strictObject({
  id: z.string().optional(),
  status: z.string().optional(),
  started_at: z.coerce.date(),
  day_counter: z.number().int().optional(),
  last_log_date: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutStreakInputSchema),
  events: z.lazy(() => StreakEventCreateNestedManyWithoutStreakInputSchema).optional(),
});

export const StreakUncheckedCreateWithoutAddictionInputSchema: z.ZodType<Prisma.StreakUncheckedCreateWithoutAddictionInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  status: z.string().optional(),
  started_at: z.coerce.date(),
  day_counter: z.number().int().optional(),
  last_log_date: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  events: z.lazy(() => StreakEventUncheckedCreateNestedManyWithoutStreakInputSchema).optional(),
});

export const StreakCreateOrConnectWithoutAddictionInputSchema: z.ZodType<Prisma.StreakCreateOrConnectWithoutAddictionInput> = z.strictObject({
  where: z.lazy(() => StreakWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StreakCreateWithoutAddictionInputSchema), z.lazy(() => StreakUncheckedCreateWithoutAddictionInputSchema) ]),
});

export const StreakCreateManyAddictionInputEnvelopeSchema: z.ZodType<Prisma.StreakCreateManyAddictionInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => StreakCreateManyAddictionInputSchema), z.lazy(() => StreakCreateManyAddictionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const EmergencyAlertCreateWithoutAddictionInputSchema: z.ZodType<Prisma.EmergencyAlertCreateWithoutAddictionInput> = z.strictObject({
  id: z.string().optional(),
  activated_at: z.coerce.date().optional(),
  resulted_in_relapse: z.boolean().optional(),
  resolution_notes: z.string().optional(),
  created_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAlertsInputSchema),
});

export const EmergencyAlertUncheckedCreateWithoutAddictionInputSchema: z.ZodType<Prisma.EmergencyAlertUncheckedCreateWithoutAddictionInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  activated_at: z.coerce.date().optional(),
  resulted_in_relapse: z.boolean().optional(),
  resolution_notes: z.string().optional(),
  created_at: z.coerce.date().optional(),
});

export const EmergencyAlertCreateOrConnectWithoutAddictionInputSchema: z.ZodType<Prisma.EmergencyAlertCreateOrConnectWithoutAddictionInput> = z.strictObject({
  where: z.lazy(() => EmergencyAlertWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmergencyAlertCreateWithoutAddictionInputSchema), z.lazy(() => EmergencyAlertUncheckedCreateWithoutAddictionInputSchema) ]),
});

export const EmergencyAlertCreateManyAddictionInputEnvelopeSchema: z.ZodType<Prisma.EmergencyAlertCreateManyAddictionInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => EmergencyAlertCreateManyAddictionInputSchema), z.lazy(() => EmergencyAlertCreateManyAddictionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const UserUpsertWithoutAddictionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAddictionsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutAddictionsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAddictionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAddictionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAddictionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutAddictionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAddictionsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAddictionsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAddictionsInputSchema) ]),
});

export const UserUpdateWithoutAddictionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAddictionsInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  daily_logs: z.lazy(() => DailyLogUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUpdateManyWithoutSponsorNestedInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUpdateManyWithoutAddictNestedInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUpdateManyWithoutUserNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUpdateManyWithoutUserNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUpdateManyWithoutUserNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutAddictionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAddictionsInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  daily_logs: z.lazy(() => DailyLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUncheckedUpdateManyWithoutSponsorNestedInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUncheckedUpdateManyWithoutAddictNestedInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const StreakUpsertWithWhereUniqueWithoutAddictionInputSchema: z.ZodType<Prisma.StreakUpsertWithWhereUniqueWithoutAddictionInput> = z.strictObject({
  where: z.lazy(() => StreakWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StreakUpdateWithoutAddictionInputSchema), z.lazy(() => StreakUncheckedUpdateWithoutAddictionInputSchema) ]),
  create: z.union([ z.lazy(() => StreakCreateWithoutAddictionInputSchema), z.lazy(() => StreakUncheckedCreateWithoutAddictionInputSchema) ]),
});

export const StreakUpdateWithWhereUniqueWithoutAddictionInputSchema: z.ZodType<Prisma.StreakUpdateWithWhereUniqueWithoutAddictionInput> = z.strictObject({
  where: z.lazy(() => StreakWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StreakUpdateWithoutAddictionInputSchema), z.lazy(() => StreakUncheckedUpdateWithoutAddictionInputSchema) ]),
});

export const StreakUpdateManyWithWhereWithoutAddictionInputSchema: z.ZodType<Prisma.StreakUpdateManyWithWhereWithoutAddictionInput> = z.strictObject({
  where: z.lazy(() => StreakScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StreakUpdateManyMutationInputSchema), z.lazy(() => StreakUncheckedUpdateManyWithoutAddictionInputSchema) ]),
});

export const EmergencyAlertUpsertWithWhereUniqueWithoutAddictionInputSchema: z.ZodType<Prisma.EmergencyAlertUpsertWithWhereUniqueWithoutAddictionInput> = z.strictObject({
  where: z.lazy(() => EmergencyAlertWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EmergencyAlertUpdateWithoutAddictionInputSchema), z.lazy(() => EmergencyAlertUncheckedUpdateWithoutAddictionInputSchema) ]),
  create: z.union([ z.lazy(() => EmergencyAlertCreateWithoutAddictionInputSchema), z.lazy(() => EmergencyAlertUncheckedCreateWithoutAddictionInputSchema) ]),
});

export const EmergencyAlertUpdateWithWhereUniqueWithoutAddictionInputSchema: z.ZodType<Prisma.EmergencyAlertUpdateWithWhereUniqueWithoutAddictionInput> = z.strictObject({
  where: z.lazy(() => EmergencyAlertWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EmergencyAlertUpdateWithoutAddictionInputSchema), z.lazy(() => EmergencyAlertUncheckedUpdateWithoutAddictionInputSchema) ]),
});

export const EmergencyAlertUpdateManyWithWhereWithoutAddictionInputSchema: z.ZodType<Prisma.EmergencyAlertUpdateManyWithWhereWithoutAddictionInput> = z.strictObject({
  where: z.lazy(() => EmergencyAlertScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EmergencyAlertUpdateManyMutationInputSchema), z.lazy(() => EmergencyAlertUncheckedUpdateManyWithoutAddictionInputSchema) ]),
});

export const UserCreateWithoutSponsorships_as_sponsorInputSchema: z.ZodType<Prisma.UserCreateWithoutSponsorships_as_sponsorInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  addictions: z.lazy(() => UserAddictionCreateNestedManyWithoutUserInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipCreateNestedManyWithoutAddictInputSchema).optional(),
  contacts: z.lazy(() => SupportContactCreateNestedManyWithoutUserInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertCreateNestedManyWithoutUserInputSchema).optional(),
  streak: z.lazy(() => StreakCreateNestedManyWithoutUserInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutSponsorships_as_sponsorInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSponsorships_as_sponsorInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  addictions: z.lazy(() => UserAddictionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUncheckedCreateNestedManyWithoutAddictInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  streak: z.lazy(() => StreakUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutSponsorships_as_sponsorInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSponsorships_as_sponsorInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSponsorships_as_sponsorInputSchema), z.lazy(() => UserUncheckedCreateWithoutSponsorships_as_sponsorInputSchema) ]),
});

export const UserCreateWithoutSponsorships_as_addictInputSchema: z.ZodType<Prisma.UserCreateWithoutSponsorships_as_addictInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  addictions: z.lazy(() => UserAddictionCreateNestedManyWithoutUserInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipCreateNestedManyWithoutSponsorInputSchema).optional(),
  contacts: z.lazy(() => SupportContactCreateNestedManyWithoutUserInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertCreateNestedManyWithoutUserInputSchema).optional(),
  streak: z.lazy(() => StreakCreateNestedManyWithoutUserInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutSponsorships_as_addictInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSponsorships_as_addictInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  addictions: z.lazy(() => UserAddictionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUncheckedCreateNestedManyWithoutSponsorInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  streak: z.lazy(() => StreakUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutSponsorships_as_addictInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSponsorships_as_addictInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSponsorships_as_addictInputSchema), z.lazy(() => UserUncheckedCreateWithoutSponsorships_as_addictInputSchema) ]),
});

export const UserUpsertWithoutSponsorships_as_sponsorInputSchema: z.ZodType<Prisma.UserUpsertWithoutSponsorships_as_sponsorInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutSponsorships_as_sponsorInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSponsorships_as_sponsorInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSponsorships_as_sponsorInputSchema), z.lazy(() => UserUncheckedCreateWithoutSponsorships_as_sponsorInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutSponsorships_as_sponsorInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSponsorships_as_sponsorInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSponsorships_as_sponsorInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSponsorships_as_sponsorInputSchema) ]),
});

export const UserUpdateWithoutSponsorships_as_sponsorInputSchema: z.ZodType<Prisma.UserUpdateWithoutSponsorships_as_sponsorInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionUpdateManyWithoutUserNestedInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUpdateManyWithoutAddictNestedInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUpdateManyWithoutUserNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUpdateManyWithoutUserNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUpdateManyWithoutUserNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutSponsorships_as_sponsorInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSponsorships_as_sponsorInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUncheckedUpdateManyWithoutAddictNestedInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUpsertWithoutSponsorships_as_addictInputSchema: z.ZodType<Prisma.UserUpsertWithoutSponsorships_as_addictInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutSponsorships_as_addictInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSponsorships_as_addictInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSponsorships_as_addictInputSchema), z.lazy(() => UserUncheckedCreateWithoutSponsorships_as_addictInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutSponsorships_as_addictInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSponsorships_as_addictInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSponsorships_as_addictInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSponsorships_as_addictInputSchema) ]),
});

export const UserUpdateWithoutSponsorships_as_addictInputSchema: z.ZodType<Prisma.UserUpdateWithoutSponsorships_as_addictInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionUpdateManyWithoutUserNestedInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUpdateManyWithoutSponsorNestedInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUpdateManyWithoutUserNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUpdateManyWithoutUserNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUpdateManyWithoutUserNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutSponsorships_as_addictInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSponsorships_as_addictInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUncheckedUpdateManyWithoutSponsorNestedInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserCreateWithoutDaily_logsInputSchema: z.ZodType<Prisma.UserCreateWithoutDaily_logsInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  addictions: z.lazy(() => UserAddictionCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipCreateNestedManyWithoutSponsorInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipCreateNestedManyWithoutAddictInputSchema).optional(),
  contacts: z.lazy(() => SupportContactCreateNestedManyWithoutUserInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertCreateNestedManyWithoutUserInputSchema).optional(),
  streak: z.lazy(() => StreakCreateNestedManyWithoutUserInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutDaily_logsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutDaily_logsInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  addictions: z.lazy(() => UserAddictionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUncheckedCreateNestedManyWithoutSponsorInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUncheckedCreateNestedManyWithoutAddictInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  streak: z.lazy(() => StreakUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutDaily_logsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutDaily_logsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutDaily_logsInputSchema), z.lazy(() => UserUncheckedCreateWithoutDaily_logsInputSchema) ]),
});

export const CravingLevelCreateWithoutDaily_logsInputSchema: z.ZodType<Prisma.CravingLevelCreateWithoutDaily_logsInput> = z.strictObject({
  id: z.string().optional(),
  level: z.number().int(),
  label: z.string().optional(),
  description: z.string().optional(),
  recommendation: z.string().optional(),
});

export const CravingLevelUncheckedCreateWithoutDaily_logsInputSchema: z.ZodType<Prisma.CravingLevelUncheckedCreateWithoutDaily_logsInput> = z.strictObject({
  id: z.string().optional(),
  level: z.number().int(),
  label: z.string().optional(),
  description: z.string().optional(),
  recommendation: z.string().optional(),
});

export const CravingLevelCreateOrConnectWithoutDaily_logsInputSchema: z.ZodType<Prisma.CravingLevelCreateOrConnectWithoutDaily_logsInput> = z.strictObject({
  where: z.lazy(() => CravingLevelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CravingLevelCreateWithoutDaily_logsInputSchema), z.lazy(() => CravingLevelUncheckedCreateWithoutDaily_logsInputSchema) ]),
});

export const EmotionalStateCreateWithoutDaily_logsInputSchema: z.ZodType<Prisma.EmotionalStateCreateWithoutDaily_logsInput> = z.strictObject({
  id: z.string().optional(),
  level: z.number().int(),
  label: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
});

export const EmotionalStateUncheckedCreateWithoutDaily_logsInputSchema: z.ZodType<Prisma.EmotionalStateUncheckedCreateWithoutDaily_logsInput> = z.strictObject({
  id: z.string().optional(),
  level: z.number().int(),
  label: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
});

export const EmotionalStateCreateOrConnectWithoutDaily_logsInputSchema: z.ZodType<Prisma.EmotionalStateCreateOrConnectWithoutDaily_logsInput> = z.strictObject({
  where: z.lazy(() => EmotionalStateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmotionalStateCreateWithoutDaily_logsInputSchema), z.lazy(() => EmotionalStateUncheckedCreateWithoutDaily_logsInputSchema) ]),
});

export const UserUpsertWithoutDaily_logsInputSchema: z.ZodType<Prisma.UserUpsertWithoutDaily_logsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutDaily_logsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDaily_logsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutDaily_logsInputSchema), z.lazy(() => UserUncheckedCreateWithoutDaily_logsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutDaily_logsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutDaily_logsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutDaily_logsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDaily_logsInputSchema) ]),
});

export const UserUpdateWithoutDaily_logsInputSchema: z.ZodType<Prisma.UserUpdateWithoutDaily_logsInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUpdateManyWithoutSponsorNestedInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUpdateManyWithoutAddictNestedInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUpdateManyWithoutUserNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUpdateManyWithoutUserNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUpdateManyWithoutUserNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutDaily_logsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutDaily_logsInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUncheckedUpdateManyWithoutSponsorNestedInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUncheckedUpdateManyWithoutAddictNestedInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const CravingLevelUpsertWithoutDaily_logsInputSchema: z.ZodType<Prisma.CravingLevelUpsertWithoutDaily_logsInput> = z.strictObject({
  update: z.union([ z.lazy(() => CravingLevelUpdateWithoutDaily_logsInputSchema), z.lazy(() => CravingLevelUncheckedUpdateWithoutDaily_logsInputSchema) ]),
  create: z.union([ z.lazy(() => CravingLevelCreateWithoutDaily_logsInputSchema), z.lazy(() => CravingLevelUncheckedCreateWithoutDaily_logsInputSchema) ]),
  where: z.lazy(() => CravingLevelWhereInputSchema).optional(),
});

export const CravingLevelUpdateToOneWithWhereWithoutDaily_logsInputSchema: z.ZodType<Prisma.CravingLevelUpdateToOneWithWhereWithoutDaily_logsInput> = z.strictObject({
  where: z.lazy(() => CravingLevelWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CravingLevelUpdateWithoutDaily_logsInputSchema), z.lazy(() => CravingLevelUncheckedUpdateWithoutDaily_logsInputSchema) ]),
});

export const CravingLevelUpdateWithoutDaily_logsInputSchema: z.ZodType<Prisma.CravingLevelUpdateWithoutDaily_logsInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CravingLevelUncheckedUpdateWithoutDaily_logsInputSchema: z.ZodType<Prisma.CravingLevelUncheckedUpdateWithoutDaily_logsInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recommendation: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const EmotionalStateUpsertWithoutDaily_logsInputSchema: z.ZodType<Prisma.EmotionalStateUpsertWithoutDaily_logsInput> = z.strictObject({
  update: z.union([ z.lazy(() => EmotionalStateUpdateWithoutDaily_logsInputSchema), z.lazy(() => EmotionalStateUncheckedUpdateWithoutDaily_logsInputSchema) ]),
  create: z.union([ z.lazy(() => EmotionalStateCreateWithoutDaily_logsInputSchema), z.lazy(() => EmotionalStateUncheckedCreateWithoutDaily_logsInputSchema) ]),
  where: z.lazy(() => EmotionalStateWhereInputSchema).optional(),
});

export const EmotionalStateUpdateToOneWithWhereWithoutDaily_logsInputSchema: z.ZodType<Prisma.EmotionalStateUpdateToOneWithWhereWithoutDaily_logsInput> = z.strictObject({
  where: z.lazy(() => EmotionalStateWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EmotionalStateUpdateWithoutDaily_logsInputSchema), z.lazy(() => EmotionalStateUncheckedUpdateWithoutDaily_logsInputSchema) ]),
});

export const EmotionalStateUpdateWithoutDaily_logsInputSchema: z.ZodType<Prisma.EmotionalStateUpdateWithoutDaily_logsInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const EmotionalStateUncheckedUpdateWithoutDaily_logsInputSchema: z.ZodType<Prisma.EmotionalStateUncheckedUpdateWithoutDaily_logsInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StreakCreateWithoutEventsInputSchema: z.ZodType<Prisma.StreakCreateWithoutEventsInput> = z.strictObject({
  id: z.string().optional(),
  status: z.string().optional(),
  started_at: z.coerce.date(),
  day_counter: z.number().int().optional(),
  last_log_date: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutStreakInputSchema),
  addiction: z.lazy(() => UserAddictionCreateNestedOneWithoutStreakInputSchema),
});

export const StreakUncheckedCreateWithoutEventsInputSchema: z.ZodType<Prisma.StreakUncheckedCreateWithoutEventsInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  user_addiction_id: z.string(),
  status: z.string().optional(),
  started_at: z.coerce.date(),
  day_counter: z.number().int().optional(),
  last_log_date: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export const StreakCreateOrConnectWithoutEventsInputSchema: z.ZodType<Prisma.StreakCreateOrConnectWithoutEventsInput> = z.strictObject({
  where: z.lazy(() => StreakWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StreakCreateWithoutEventsInputSchema), z.lazy(() => StreakUncheckedCreateWithoutEventsInputSchema) ]),
});

export const LogAbsenceCreateWithoutStreak_eventInputSchema: z.ZodType<Prisma.LogAbsenceCreateWithoutStreak_eventInput> = z.strictObject({
  id: z.string().optional(),
  streak_id: z.string(),
  last_log_date: z.coerce.date().optional(),
  detected_at: z.coerce.date().optional(),
  absence_hours: z.number().int().optional(),
  event_generated: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAbsencesInputSchema),
});

export const LogAbsenceUncheckedCreateWithoutStreak_eventInputSchema: z.ZodType<Prisma.LogAbsenceUncheckedCreateWithoutStreak_eventInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  streak_id: z.string(),
  last_log_date: z.coerce.date().optional(),
  detected_at: z.coerce.date().optional(),
  absence_hours: z.number().int().optional(),
  event_generated: z.boolean().optional(),
});

export const LogAbsenceCreateOrConnectWithoutStreak_eventInputSchema: z.ZodType<Prisma.LogAbsenceCreateOrConnectWithoutStreak_eventInput> = z.strictObject({
  where: z.lazy(() => LogAbsenceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LogAbsenceCreateWithoutStreak_eventInputSchema), z.lazy(() => LogAbsenceUncheckedCreateWithoutStreak_eventInputSchema) ]),
});

export const LogAbsenceCreateManyStreak_eventInputEnvelopeSchema: z.ZodType<Prisma.LogAbsenceCreateManyStreak_eventInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => LogAbsenceCreateManyStreak_eventInputSchema), z.lazy(() => LogAbsenceCreateManyStreak_eventInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const StreakUpsertWithoutEventsInputSchema: z.ZodType<Prisma.StreakUpsertWithoutEventsInput> = z.strictObject({
  update: z.union([ z.lazy(() => StreakUpdateWithoutEventsInputSchema), z.lazy(() => StreakUncheckedUpdateWithoutEventsInputSchema) ]),
  create: z.union([ z.lazy(() => StreakCreateWithoutEventsInputSchema), z.lazy(() => StreakUncheckedCreateWithoutEventsInputSchema) ]),
  where: z.lazy(() => StreakWhereInputSchema).optional(),
});

export const StreakUpdateToOneWithWhereWithoutEventsInputSchema: z.ZodType<Prisma.StreakUpdateToOneWithWhereWithoutEventsInput> = z.strictObject({
  where: z.lazy(() => StreakWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StreakUpdateWithoutEventsInputSchema), z.lazy(() => StreakUncheckedUpdateWithoutEventsInputSchema) ]),
});

export const StreakUpdateWithoutEventsInputSchema: z.ZodType<Prisma.StreakUpdateWithoutEventsInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  day_counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  last_log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutStreakNestedInputSchema).optional(),
  addiction: z.lazy(() => UserAddictionUpdateOneRequiredWithoutStreakNestedInputSchema).optional(),
});

export const StreakUncheckedUpdateWithoutEventsInputSchema: z.ZodType<Prisma.StreakUncheckedUpdateWithoutEventsInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_addiction_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  day_counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  last_log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const LogAbsenceUpsertWithWhereUniqueWithoutStreak_eventInputSchema: z.ZodType<Prisma.LogAbsenceUpsertWithWhereUniqueWithoutStreak_eventInput> = z.strictObject({
  where: z.lazy(() => LogAbsenceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LogAbsenceUpdateWithoutStreak_eventInputSchema), z.lazy(() => LogAbsenceUncheckedUpdateWithoutStreak_eventInputSchema) ]),
  create: z.union([ z.lazy(() => LogAbsenceCreateWithoutStreak_eventInputSchema), z.lazy(() => LogAbsenceUncheckedCreateWithoutStreak_eventInputSchema) ]),
});

export const LogAbsenceUpdateWithWhereUniqueWithoutStreak_eventInputSchema: z.ZodType<Prisma.LogAbsenceUpdateWithWhereUniqueWithoutStreak_eventInput> = z.strictObject({
  where: z.lazy(() => LogAbsenceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LogAbsenceUpdateWithoutStreak_eventInputSchema), z.lazy(() => LogAbsenceUncheckedUpdateWithoutStreak_eventInputSchema) ]),
});

export const LogAbsenceUpdateManyWithWhereWithoutStreak_eventInputSchema: z.ZodType<Prisma.LogAbsenceUpdateManyWithWhereWithoutStreak_eventInput> = z.strictObject({
  where: z.lazy(() => LogAbsenceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LogAbsenceUpdateManyMutationInputSchema), z.lazy(() => LogAbsenceUncheckedUpdateManyWithoutStreak_eventInputSchema) ]),
});

export const UserCreateWithoutAbsencesInputSchema: z.ZodType<Prisma.UserCreateWithoutAbsencesInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  addictions: z.lazy(() => UserAddictionCreateNestedManyWithoutUserInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipCreateNestedManyWithoutSponsorInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipCreateNestedManyWithoutAddictInputSchema).optional(),
  contacts: z.lazy(() => SupportContactCreateNestedManyWithoutUserInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertCreateNestedManyWithoutUserInputSchema).optional(),
  streak: z.lazy(() => StreakCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutAbsencesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAbsencesInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  addictions: z.lazy(() => UserAddictionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUncheckedCreateNestedManyWithoutSponsorInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUncheckedCreateNestedManyWithoutAddictInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  streak: z.lazy(() => StreakUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutAbsencesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAbsencesInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAbsencesInputSchema), z.lazy(() => UserUncheckedCreateWithoutAbsencesInputSchema) ]),
});

export const StreakEventCreateWithoutAbsencesInputSchema: z.ZodType<Prisma.StreakEventCreateWithoutAbsencesInput> = z.strictObject({
  id: z.string().optional(),
  emergency_alert_id: z.string().optional(),
  event_type: z.string().optional(),
  event_date: z.coerce.date(),
  days_achieved: z.number().int().optional(),
  avg_craving_period: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  avg_emotion_period: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  created_at: z.coerce.date().optional(),
  streak: z.lazy(() => StreakCreateNestedOneWithoutEventsInputSchema),
});

export const StreakEventUncheckedCreateWithoutAbsencesInputSchema: z.ZodType<Prisma.StreakEventUncheckedCreateWithoutAbsencesInput> = z.strictObject({
  id: z.string().optional(),
  streak_id: z.string(),
  emergency_alert_id: z.string().optional(),
  event_type: z.string().optional(),
  event_date: z.coerce.date(),
  days_achieved: z.number().int().optional(),
  avg_craving_period: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  avg_emotion_period: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  created_at: z.coerce.date().optional(),
});

export const StreakEventCreateOrConnectWithoutAbsencesInputSchema: z.ZodType<Prisma.StreakEventCreateOrConnectWithoutAbsencesInput> = z.strictObject({
  where: z.lazy(() => StreakEventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StreakEventCreateWithoutAbsencesInputSchema), z.lazy(() => StreakEventUncheckedCreateWithoutAbsencesInputSchema) ]),
});

export const UserUpsertWithoutAbsencesInputSchema: z.ZodType<Prisma.UserUpsertWithoutAbsencesInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutAbsencesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAbsencesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAbsencesInputSchema), z.lazy(() => UserUncheckedCreateWithoutAbsencesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutAbsencesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAbsencesInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAbsencesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAbsencesInputSchema) ]),
});

export const UserUpdateWithoutAbsencesInputSchema: z.ZodType<Prisma.UserUpdateWithoutAbsencesInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionUpdateManyWithoutUserNestedInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUpdateManyWithoutSponsorNestedInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUpdateManyWithoutAddictNestedInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUpdateManyWithoutUserNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUpdateManyWithoutUserNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutAbsencesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAbsencesInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUncheckedUpdateManyWithoutSponsorNestedInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUncheckedUpdateManyWithoutAddictNestedInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const StreakEventUpsertWithoutAbsencesInputSchema: z.ZodType<Prisma.StreakEventUpsertWithoutAbsencesInput> = z.strictObject({
  update: z.union([ z.lazy(() => StreakEventUpdateWithoutAbsencesInputSchema), z.lazy(() => StreakEventUncheckedUpdateWithoutAbsencesInputSchema) ]),
  create: z.union([ z.lazy(() => StreakEventCreateWithoutAbsencesInputSchema), z.lazy(() => StreakEventUncheckedCreateWithoutAbsencesInputSchema) ]),
  where: z.lazy(() => StreakEventWhereInputSchema).optional(),
});

export const StreakEventUpdateToOneWithWhereWithoutAbsencesInputSchema: z.ZodType<Prisma.StreakEventUpdateToOneWithWhereWithoutAbsencesInput> = z.strictObject({
  where: z.lazy(() => StreakEventWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StreakEventUpdateWithoutAbsencesInputSchema), z.lazy(() => StreakEventUncheckedUpdateWithoutAbsencesInputSchema) ]),
});

export const StreakEventUpdateWithoutAbsencesInputSchema: z.ZodType<Prisma.StreakEventUpdateWithoutAbsencesInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergency_alert_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event_type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  days_achieved: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  avg_craving_period: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  avg_emotion_period: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  streak: z.lazy(() => StreakUpdateOneRequiredWithoutEventsNestedInputSchema).optional(),
});

export const StreakEventUncheckedUpdateWithoutAbsencesInputSchema: z.ZodType<Prisma.StreakEventUncheckedUpdateWithoutAbsencesInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  streak_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergency_alert_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event_type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  days_achieved: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  avg_craving_period: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  avg_emotion_period: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserCreateWithoutContactsInputSchema: z.ZodType<Prisma.UserCreateWithoutContactsInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  addictions: z.lazy(() => UserAddictionCreateNestedManyWithoutUserInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipCreateNestedManyWithoutSponsorInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipCreateNestedManyWithoutAddictInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertCreateNestedManyWithoutUserInputSchema).optional(),
  streak: z.lazy(() => StreakCreateNestedManyWithoutUserInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutContactsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutContactsInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  addictions: z.lazy(() => UserAddictionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUncheckedCreateNestedManyWithoutSponsorInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUncheckedCreateNestedManyWithoutAddictInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  streak: z.lazy(() => StreakUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutContactsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutContactsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutContactsInputSchema), z.lazy(() => UserUncheckedCreateWithoutContactsInputSchema) ]),
});

export const UserUpsertWithoutContactsInputSchema: z.ZodType<Prisma.UserUpsertWithoutContactsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutContactsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutContactsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutContactsInputSchema), z.lazy(() => UserUncheckedCreateWithoutContactsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutContactsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutContactsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutContactsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutContactsInputSchema) ]),
});

export const UserUpdateWithoutContactsInputSchema: z.ZodType<Prisma.UserUpdateWithoutContactsInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionUpdateManyWithoutUserNestedInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUpdateManyWithoutSponsorNestedInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUpdateManyWithoutAddictNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUpdateManyWithoutUserNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUpdateManyWithoutUserNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutContactsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutContactsInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUncheckedUpdateManyWithoutSponsorNestedInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUncheckedUpdateManyWithoutAddictNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserCreateWithoutAlertsInputSchema: z.ZodType<Prisma.UserCreateWithoutAlertsInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  addictions: z.lazy(() => UserAddictionCreateNestedManyWithoutUserInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipCreateNestedManyWithoutSponsorInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipCreateNestedManyWithoutAddictInputSchema).optional(),
  contacts: z.lazy(() => SupportContactCreateNestedManyWithoutUserInputSchema).optional(),
  streak: z.lazy(() => StreakCreateNestedManyWithoutUserInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutAlertsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAlertsInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  addictions: z.lazy(() => UserAddictionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUncheckedCreateNestedManyWithoutSponsorInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUncheckedCreateNestedManyWithoutAddictInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  streak: z.lazy(() => StreakUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutAlertsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAlertsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAlertsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAlertsInputSchema) ]),
});

export const UserAddictionCreateWithoutAlertsInputSchema: z.ZodType<Prisma.UserAddictionCreateWithoutAlertsInput> = z.strictObject({
  id: z.string().optional(),
  custom_name: z.string(),
  classification: z.string().optional(),
  is_active: z.boolean().optional(),
  registered_at: z.coerce.date().optional(),
  created_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAddictionsInputSchema),
  streak: z.lazy(() => StreakCreateNestedManyWithoutAddictionInputSchema).optional(),
});

export const UserAddictionUncheckedCreateWithoutAlertsInputSchema: z.ZodType<Prisma.UserAddictionUncheckedCreateWithoutAlertsInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  custom_name: z.string(),
  classification: z.string().optional(),
  is_active: z.boolean().optional(),
  registered_at: z.coerce.date().optional(),
  created_at: z.coerce.date().optional(),
  streak: z.lazy(() => StreakUncheckedCreateNestedManyWithoutAddictionInputSchema).optional(),
});

export const UserAddictionCreateOrConnectWithoutAlertsInputSchema: z.ZodType<Prisma.UserAddictionCreateOrConnectWithoutAlertsInput> = z.strictObject({
  where: z.lazy(() => UserAddictionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserAddictionCreateWithoutAlertsInputSchema), z.lazy(() => UserAddictionUncheckedCreateWithoutAlertsInputSchema) ]),
});

export const UserUpsertWithoutAlertsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAlertsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutAlertsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAlertsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAlertsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAlertsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutAlertsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAlertsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAlertsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAlertsInputSchema) ]),
});

export const UserUpdateWithoutAlertsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAlertsInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionUpdateManyWithoutUserNestedInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUpdateManyWithoutSponsorNestedInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUpdateManyWithoutAddictNestedInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUpdateManyWithoutUserNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUpdateManyWithoutUserNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutAlertsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAlertsInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUncheckedUpdateManyWithoutSponsorNestedInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUncheckedUpdateManyWithoutAddictNestedInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserAddictionUpsertWithoutAlertsInputSchema: z.ZodType<Prisma.UserAddictionUpsertWithoutAlertsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserAddictionUpdateWithoutAlertsInputSchema), z.lazy(() => UserAddictionUncheckedUpdateWithoutAlertsInputSchema) ]),
  create: z.union([ z.lazy(() => UserAddictionCreateWithoutAlertsInputSchema), z.lazy(() => UserAddictionUncheckedCreateWithoutAlertsInputSchema) ]),
  where: z.lazy(() => UserAddictionWhereInputSchema).optional(),
});

export const UserAddictionUpdateToOneWithWhereWithoutAlertsInputSchema: z.ZodType<Prisma.UserAddictionUpdateToOneWithWhereWithoutAlertsInput> = z.strictObject({
  where: z.lazy(() => UserAddictionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserAddictionUpdateWithoutAlertsInputSchema), z.lazy(() => UserAddictionUncheckedUpdateWithoutAlertsInputSchema) ]),
});

export const UserAddictionUpdateWithoutAlertsInputSchema: z.ZodType<Prisma.UserAddictionUpdateWithoutAlertsInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  custom_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  classification: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  registered_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAddictionsNestedInputSchema).optional(),
  streak: z.lazy(() => StreakUpdateManyWithoutAddictionNestedInputSchema).optional(),
});

export const UserAddictionUncheckedUpdateWithoutAlertsInputSchema: z.ZodType<Prisma.UserAddictionUncheckedUpdateWithoutAlertsInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  custom_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  classification: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  registered_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  streak: z.lazy(() => StreakUncheckedUpdateManyWithoutAddictionNestedInputSchema).optional(),
});

export const UserCreateWithoutStreakInputSchema: z.ZodType<Prisma.UserCreateWithoutStreakInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  addictions: z.lazy(() => UserAddictionCreateNestedManyWithoutUserInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipCreateNestedManyWithoutSponsorInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipCreateNestedManyWithoutAddictInputSchema).optional(),
  contacts: z.lazy(() => SupportContactCreateNestedManyWithoutUserInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertCreateNestedManyWithoutUserInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutStreakInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutStreakInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.lazy(() => UserRoleSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sponsor_code: z.string().optional().nullable(),
  avatar_url: z.string().optional(),
  is_verified: z.boolean().optional(),
  two_factor_enabled: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  addictions: z.lazy(() => UserAddictionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUncheckedCreateNestedManyWithoutSponsorInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUncheckedCreateNestedManyWithoutAddictInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutStreakInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutStreakInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutStreakInputSchema), z.lazy(() => UserUncheckedCreateWithoutStreakInputSchema) ]),
});

export const UserAddictionCreateWithoutStreakInputSchema: z.ZodType<Prisma.UserAddictionCreateWithoutStreakInput> = z.strictObject({
  id: z.string().optional(),
  custom_name: z.string(),
  classification: z.string().optional(),
  is_active: z.boolean().optional(),
  registered_at: z.coerce.date().optional(),
  created_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAddictionsInputSchema),
  alerts: z.lazy(() => EmergencyAlertCreateNestedManyWithoutAddictionInputSchema).optional(),
});

export const UserAddictionUncheckedCreateWithoutStreakInputSchema: z.ZodType<Prisma.UserAddictionUncheckedCreateWithoutStreakInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  custom_name: z.string(),
  classification: z.string().optional(),
  is_active: z.boolean().optional(),
  registered_at: z.coerce.date().optional(),
  created_at: z.coerce.date().optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedCreateNestedManyWithoutAddictionInputSchema).optional(),
});

export const UserAddictionCreateOrConnectWithoutStreakInputSchema: z.ZodType<Prisma.UserAddictionCreateOrConnectWithoutStreakInput> = z.strictObject({
  where: z.lazy(() => UserAddictionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserAddictionCreateWithoutStreakInputSchema), z.lazy(() => UserAddictionUncheckedCreateWithoutStreakInputSchema) ]),
});

export const StreakEventCreateWithoutStreakInputSchema: z.ZodType<Prisma.StreakEventCreateWithoutStreakInput> = z.strictObject({
  id: z.string().optional(),
  emergency_alert_id: z.string().optional(),
  event_type: z.string().optional(),
  event_date: z.coerce.date(),
  days_achieved: z.number().int().optional(),
  avg_craving_period: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  avg_emotion_period: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  created_at: z.coerce.date().optional(),
  absences: z.lazy(() => LogAbsenceCreateNestedManyWithoutStreak_eventInputSchema).optional(),
});

export const StreakEventUncheckedCreateWithoutStreakInputSchema: z.ZodType<Prisma.StreakEventUncheckedCreateWithoutStreakInput> = z.strictObject({
  id: z.string().optional(),
  emergency_alert_id: z.string().optional(),
  event_type: z.string().optional(),
  event_date: z.coerce.date(),
  days_achieved: z.number().int().optional(),
  avg_craving_period: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  avg_emotion_period: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  created_at: z.coerce.date().optional(),
  absences: z.lazy(() => LogAbsenceUncheckedCreateNestedManyWithoutStreak_eventInputSchema).optional(),
});

export const StreakEventCreateOrConnectWithoutStreakInputSchema: z.ZodType<Prisma.StreakEventCreateOrConnectWithoutStreakInput> = z.strictObject({
  where: z.lazy(() => StreakEventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StreakEventCreateWithoutStreakInputSchema), z.lazy(() => StreakEventUncheckedCreateWithoutStreakInputSchema) ]),
});

export const StreakEventCreateManyStreakInputEnvelopeSchema: z.ZodType<Prisma.StreakEventCreateManyStreakInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => StreakEventCreateManyStreakInputSchema), z.lazy(() => StreakEventCreateManyStreakInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const UserUpsertWithoutStreakInputSchema: z.ZodType<Prisma.UserUpsertWithoutStreakInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutStreakInputSchema), z.lazy(() => UserUncheckedUpdateWithoutStreakInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutStreakInputSchema), z.lazy(() => UserUncheckedCreateWithoutStreakInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutStreakInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutStreakInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutStreakInputSchema), z.lazy(() => UserUncheckedUpdateWithoutStreakInputSchema) ]),
});

export const UserUpdateWithoutStreakInputSchema: z.ZodType<Prisma.UserUpdateWithoutStreakInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionUpdateManyWithoutUserNestedInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUpdateManyWithoutSponsorNestedInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUpdateManyWithoutAddictNestedInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUpdateManyWithoutUserNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUpdateManyWithoutUserNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutStreakInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutStreakInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password_hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addictions: z.lazy(() => UserAddictionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  daily_logs: z.lazy(() => DailyLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sponsorships_as_sponsor: z.lazy(() => SponsorshipUncheckedUpdateManyWithoutSponsorNestedInputSchema).optional(),
  sponsorships_as_addict: z.lazy(() => SponsorshipUncheckedUpdateManyWithoutAddictNestedInputSchema).optional(),
  contacts: z.lazy(() => SupportContactUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset_tokens: z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  trusted_devices: z.lazy(() => TrustedDeviceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verification_tokens: z.lazy(() => VerificationTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserAddictionUpsertWithoutStreakInputSchema: z.ZodType<Prisma.UserAddictionUpsertWithoutStreakInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserAddictionUpdateWithoutStreakInputSchema), z.lazy(() => UserAddictionUncheckedUpdateWithoutStreakInputSchema) ]),
  create: z.union([ z.lazy(() => UserAddictionCreateWithoutStreakInputSchema), z.lazy(() => UserAddictionUncheckedCreateWithoutStreakInputSchema) ]),
  where: z.lazy(() => UserAddictionWhereInputSchema).optional(),
});

export const UserAddictionUpdateToOneWithWhereWithoutStreakInputSchema: z.ZodType<Prisma.UserAddictionUpdateToOneWithWhereWithoutStreakInput> = z.strictObject({
  where: z.lazy(() => UserAddictionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserAddictionUpdateWithoutStreakInputSchema), z.lazy(() => UserAddictionUncheckedUpdateWithoutStreakInputSchema) ]),
});

export const UserAddictionUpdateWithoutStreakInputSchema: z.ZodType<Prisma.UserAddictionUpdateWithoutStreakInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  custom_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  classification: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  registered_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAddictionsNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUpdateManyWithoutAddictionNestedInputSchema).optional(),
});

export const UserAddictionUncheckedUpdateWithoutStreakInputSchema: z.ZodType<Prisma.UserAddictionUncheckedUpdateWithoutStreakInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  custom_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  classification: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  registered_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedUpdateManyWithoutAddictionNestedInputSchema).optional(),
});

export const StreakEventUpsertWithWhereUniqueWithoutStreakInputSchema: z.ZodType<Prisma.StreakEventUpsertWithWhereUniqueWithoutStreakInput> = z.strictObject({
  where: z.lazy(() => StreakEventWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StreakEventUpdateWithoutStreakInputSchema), z.lazy(() => StreakEventUncheckedUpdateWithoutStreakInputSchema) ]),
  create: z.union([ z.lazy(() => StreakEventCreateWithoutStreakInputSchema), z.lazy(() => StreakEventUncheckedCreateWithoutStreakInputSchema) ]),
});

export const StreakEventUpdateWithWhereUniqueWithoutStreakInputSchema: z.ZodType<Prisma.StreakEventUpdateWithWhereUniqueWithoutStreakInput> = z.strictObject({
  where: z.lazy(() => StreakEventWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StreakEventUpdateWithoutStreakInputSchema), z.lazy(() => StreakEventUncheckedUpdateWithoutStreakInputSchema) ]),
});

export const StreakEventUpdateManyWithWhereWithoutStreakInputSchema: z.ZodType<Prisma.StreakEventUpdateManyWithWhereWithoutStreakInput> = z.strictObject({
  where: z.lazy(() => StreakEventScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StreakEventUpdateManyMutationInputSchema), z.lazy(() => StreakEventUncheckedUpdateManyWithoutStreakInputSchema) ]),
});

export const StreakEventScalarWhereInputSchema: z.ZodType<Prisma.StreakEventScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => StreakEventScalarWhereInputSchema), z.lazy(() => StreakEventScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StreakEventScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StreakEventScalarWhereInputSchema), z.lazy(() => StreakEventScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  streak_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  emergency_alert_id: z.union([ z.lazy(() => UuidFilterSchema), z.string() ]).optional(),
  event_type: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  event_date: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  days_achieved: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  avg_craving_period: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  avg_emotion_period: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const UserAddictionCreateManyUserInputSchema: z.ZodType<Prisma.UserAddictionCreateManyUserInput> = z.strictObject({
  id: z.string().optional(),
  custom_name: z.string(),
  classification: z.string().optional(),
  is_active: z.boolean().optional(),
  registered_at: z.coerce.date().optional(),
  created_at: z.coerce.date().optional(),
});

export const DailyLogCreateManyUserInputSchema: z.ZodType<Prisma.DailyLogCreateManyUserInput> = z.strictObject({
  id: z.string().optional(),
  log_date: z.coerce.date(),
  consumed: z.boolean().optional(),
  craving_level_id: z.string(),
  emotional_state_id: z.string(),
  triggers: z.string().optional(),
  notes: z.string().optional(),
  created_at: z.coerce.date().optional(),
});

export const SponsorshipCreateManySponsorInputSchema: z.ZodType<Prisma.SponsorshipCreateManySponsorInput> = z.strictObject({
  id: z.string().optional(),
  addict_id: z.string().optional(),
  started_at: z.coerce.date().optional(),
  ended_at: z.coerce.date().optional(),
  status: z.lazy(() => SponsorshipStatusSchema).optional(),
  termination_reason: z.string().optional(),
  created_at: z.coerce.date().optional(),
});

export const SponsorshipCreateManyAddictInputSchema: z.ZodType<Prisma.SponsorshipCreateManyAddictInput> = z.strictObject({
  id: z.string().optional(),
  sponsor_id: z.string().optional(),
  started_at: z.coerce.date().optional(),
  ended_at: z.coerce.date().optional(),
  status: z.lazy(() => SponsorshipStatusSchema).optional(),
  termination_reason: z.string().optional(),
  created_at: z.coerce.date().optional(),
});

export const SupportContactCreateManyUserInputSchema: z.ZodType<Prisma.SupportContactCreateManyUserInput> = z.strictObject({
  id: z.string().optional(),
  contact_name: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
  relationship: z.string().optional(),
  custom_relationship: z.string().optional(),
  is_active: z.boolean().optional(),
  priority_order: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export const EmergencyAlertCreateManyUserInputSchema: z.ZodType<Prisma.EmergencyAlertCreateManyUserInput> = z.strictObject({
  id: z.string().optional(),
  user_addiction_id: z.string(),
  activated_at: z.coerce.date().optional(),
  resulted_in_relapse: z.boolean().optional(),
  resolution_notes: z.string().optional(),
  created_at: z.coerce.date().optional(),
});

export const StreakCreateManyUserInputSchema: z.ZodType<Prisma.StreakCreateManyUserInput> = z.strictObject({
  id: z.string().optional(),
  user_addiction_id: z.string(),
  status: z.string().optional(),
  started_at: z.coerce.date(),
  day_counter: z.number().int().optional(),
  last_log_date: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export const LogAbsenceCreateManyUserInputSchema: z.ZodType<Prisma.LogAbsenceCreateManyUserInput> = z.strictObject({
  id: z.string().optional(),
  streak_id: z.string(),
  last_log_date: z.coerce.date().optional(),
  detected_at: z.coerce.date().optional(),
  absence_hours: z.number().int().optional(),
  event_generated: z.boolean().optional(),
  streak_event_id: z.string().optional(),
});

export const PasswordResetTokenCreateManyUserInputSchema: z.ZodType<Prisma.PasswordResetTokenCreateManyUserInput> = z.strictObject({
  id: z.string().optional(),
  token: z.string(),
  expires_at: z.coerce.date(),
  created_at: z.coerce.date().optional(),
});

export const TrustedDeviceCreateManyUserInputSchema: z.ZodType<Prisma.TrustedDeviceCreateManyUserInput> = z.strictObject({
  id: z.string().optional(),
  device_identifier: z.string(),
  device_name: z.string().optional().nullable(),
  last_used_at: z.coerce.date().optional(),
  expires_at: z.coerce.date(),
  created_at: z.coerce.date().optional(),
});

export const VerificationTokenCreateManyUserInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyUserInput> = z.strictObject({
  id: z.string().optional(),
  token: z.string(),
  expires_at: z.coerce.date(),
  created_at: z.coerce.date().optional(),
});

export const UserAddictionUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserAddictionUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  custom_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  classification: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  registered_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  streak: z.lazy(() => StreakUpdateManyWithoutAddictionNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUpdateManyWithoutAddictionNestedInputSchema).optional(),
});

export const UserAddictionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserAddictionUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  custom_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  classification: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  registered_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  streak: z.lazy(() => StreakUncheckedUpdateManyWithoutAddictionNestedInputSchema).optional(),
  alerts: z.lazy(() => EmergencyAlertUncheckedUpdateManyWithoutAddictionNestedInputSchema).optional(),
});

export const UserAddictionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserAddictionUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  custom_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  classification: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  registered_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DailyLogUpdateWithoutUserInputSchema: z.ZodType<Prisma.DailyLogUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  consumed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  triggers: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  craving_level: z.lazy(() => CravingLevelUpdateOneRequiredWithoutDaily_logsNestedInputSchema).optional(),
  emotional_state: z.lazy(() => EmotionalStateUpdateOneRequiredWithoutDaily_logsNestedInputSchema).optional(),
});

export const DailyLogUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.DailyLogUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  consumed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  craving_level_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emotional_state_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  triggers: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DailyLogUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.DailyLogUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  consumed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  craving_level_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emotional_state_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  triggers: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SponsorshipUpdateWithoutSponsorInputSchema: z.ZodType<Prisma.SponsorshipUpdateWithoutSponsorInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ended_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SponsorshipStatusSchema), z.lazy(() => EnumSponsorshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  termination_reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  addict: z.lazy(() => UserUpdateOneRequiredWithoutSponsorships_as_addictNestedInputSchema).optional(),
});

export const SponsorshipUncheckedUpdateWithoutSponsorInputSchema: z.ZodType<Prisma.SponsorshipUncheckedUpdateWithoutSponsorInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  addict_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ended_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SponsorshipStatusSchema), z.lazy(() => EnumSponsorshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  termination_reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SponsorshipUncheckedUpdateManyWithoutSponsorInputSchema: z.ZodType<Prisma.SponsorshipUncheckedUpdateManyWithoutSponsorInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  addict_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ended_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SponsorshipStatusSchema), z.lazy(() => EnumSponsorshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  termination_reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SponsorshipUpdateWithoutAddictInputSchema: z.ZodType<Prisma.SponsorshipUpdateWithoutAddictInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ended_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SponsorshipStatusSchema), z.lazy(() => EnumSponsorshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  termination_reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor: z.lazy(() => UserUpdateOneRequiredWithoutSponsorships_as_sponsorNestedInputSchema).optional(),
});

export const SponsorshipUncheckedUpdateWithoutAddictInputSchema: z.ZodType<Prisma.SponsorshipUncheckedUpdateWithoutAddictInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ended_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SponsorshipStatusSchema), z.lazy(() => EnumSponsorshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  termination_reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SponsorshipUncheckedUpdateManyWithoutAddictInputSchema: z.ZodType<Prisma.SponsorshipUncheckedUpdateManyWithoutAddictInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sponsor_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ended_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SponsorshipStatusSchema), z.lazy(() => EnumSponsorshipStatusFieldUpdateOperationsInputSchema) ]).optional(),
  termination_reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SupportContactUpdateWithoutUserInputSchema: z.ZodType<Prisma.SupportContactUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  custom_relationship: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  priority_order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SupportContactUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SupportContactUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  custom_relationship: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  priority_order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SupportContactUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SupportContactUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  relationship: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  custom_relationship: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  priority_order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const EmergencyAlertUpdateWithoutUserInputSchema: z.ZodType<Prisma.EmergencyAlertUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  resulted_in_relapse: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  resolution_notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  addiction: z.lazy(() => UserAddictionUpdateOneRequiredWithoutAlertsNestedInputSchema).optional(),
});

export const EmergencyAlertUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.EmergencyAlertUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_addiction_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  resulted_in_relapse: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  resolution_notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const EmergencyAlertUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.EmergencyAlertUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_addiction_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  resulted_in_relapse: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  resolution_notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StreakUpdateWithoutUserInputSchema: z.ZodType<Prisma.StreakUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  day_counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  last_log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  addiction: z.lazy(() => UserAddictionUpdateOneRequiredWithoutStreakNestedInputSchema).optional(),
  events: z.lazy(() => StreakEventUpdateManyWithoutStreakNestedInputSchema).optional(),
});

export const StreakUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.StreakUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_addiction_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  day_counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  last_log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  events: z.lazy(() => StreakEventUncheckedUpdateManyWithoutStreakNestedInputSchema).optional(),
});

export const StreakUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.StreakUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_addiction_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  day_counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  last_log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const LogAbsenceUpdateWithoutUserInputSchema: z.ZodType<Prisma.LogAbsenceUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  streak_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  detected_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  absence_hours: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  event_generated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  streak_event: z.lazy(() => StreakEventUpdateOneRequiredWithoutAbsencesNestedInputSchema).optional(),
});

export const LogAbsenceUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.LogAbsenceUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  streak_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  detected_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  absence_hours: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  event_generated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  streak_event_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const LogAbsenceUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.LogAbsenceUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  streak_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  detected_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  absence_hours: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  event_generated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  streak_event_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PasswordResetTokenUpdateWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PasswordResetTokenUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PasswordResetTokenUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TrustedDeviceUpdateWithoutUserInputSchema: z.ZodType<Prisma.TrustedDeviceUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  device_identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  device_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_used_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TrustedDeviceUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.TrustedDeviceUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  device_identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  device_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_used_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TrustedDeviceUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.TrustedDeviceUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  device_identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  device_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_used_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VerificationTokenUpdateWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VerificationTokenUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VerificationTokenUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DailyLogCreateManyCraving_levelInputSchema: z.ZodType<Prisma.DailyLogCreateManyCraving_levelInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  log_date: z.coerce.date(),
  consumed: z.boolean().optional(),
  emotional_state_id: z.string(),
  triggers: z.string().optional(),
  notes: z.string().optional(),
  created_at: z.coerce.date().optional(),
});

export const DailyLogUpdateWithoutCraving_levelInputSchema: z.ZodType<Prisma.DailyLogUpdateWithoutCraving_levelInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  consumed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  triggers: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutDaily_logsNestedInputSchema).optional(),
  emotional_state: z.lazy(() => EmotionalStateUpdateOneRequiredWithoutDaily_logsNestedInputSchema).optional(),
});

export const DailyLogUncheckedUpdateWithoutCraving_levelInputSchema: z.ZodType<Prisma.DailyLogUncheckedUpdateWithoutCraving_levelInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  consumed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  emotional_state_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  triggers: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DailyLogUncheckedUpdateManyWithoutCraving_levelInputSchema: z.ZodType<Prisma.DailyLogUncheckedUpdateManyWithoutCraving_levelInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  consumed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  emotional_state_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  triggers: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DailyLogCreateManyEmotional_stateInputSchema: z.ZodType<Prisma.DailyLogCreateManyEmotional_stateInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  log_date: z.coerce.date(),
  consumed: z.boolean().optional(),
  craving_level_id: z.string(),
  triggers: z.string().optional(),
  notes: z.string().optional(),
  created_at: z.coerce.date().optional(),
});

export const DailyLogUpdateWithoutEmotional_stateInputSchema: z.ZodType<Prisma.DailyLogUpdateWithoutEmotional_stateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  consumed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  triggers: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutDaily_logsNestedInputSchema).optional(),
  craving_level: z.lazy(() => CravingLevelUpdateOneRequiredWithoutDaily_logsNestedInputSchema).optional(),
});

export const DailyLogUncheckedUpdateWithoutEmotional_stateInputSchema: z.ZodType<Prisma.DailyLogUncheckedUpdateWithoutEmotional_stateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  consumed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  craving_level_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  triggers: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DailyLogUncheckedUpdateManyWithoutEmotional_stateInputSchema: z.ZodType<Prisma.DailyLogUncheckedUpdateManyWithoutEmotional_stateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  consumed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  craving_level_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  triggers: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StreakCreateManyAddictionInputSchema: z.ZodType<Prisma.StreakCreateManyAddictionInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  status: z.string().optional(),
  started_at: z.coerce.date(),
  day_counter: z.number().int().optional(),
  last_log_date: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export const EmergencyAlertCreateManyAddictionInputSchema: z.ZodType<Prisma.EmergencyAlertCreateManyAddictionInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  activated_at: z.coerce.date().optional(),
  resulted_in_relapse: z.boolean().optional(),
  resolution_notes: z.string().optional(),
  created_at: z.coerce.date().optional(),
});

export const StreakUpdateWithoutAddictionInputSchema: z.ZodType<Prisma.StreakUpdateWithoutAddictionInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  day_counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  last_log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutStreakNestedInputSchema).optional(),
  events: z.lazy(() => StreakEventUpdateManyWithoutStreakNestedInputSchema).optional(),
});

export const StreakUncheckedUpdateWithoutAddictionInputSchema: z.ZodType<Prisma.StreakUncheckedUpdateWithoutAddictionInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  day_counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  last_log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  events: z.lazy(() => StreakEventUncheckedUpdateManyWithoutStreakNestedInputSchema).optional(),
});

export const StreakUncheckedUpdateManyWithoutAddictionInputSchema: z.ZodType<Prisma.StreakUncheckedUpdateManyWithoutAddictionInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  day_counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  last_log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const EmergencyAlertUpdateWithoutAddictionInputSchema: z.ZodType<Prisma.EmergencyAlertUpdateWithoutAddictionInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  resulted_in_relapse: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  resolution_notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAlertsNestedInputSchema).optional(),
});

export const EmergencyAlertUncheckedUpdateWithoutAddictionInputSchema: z.ZodType<Prisma.EmergencyAlertUncheckedUpdateWithoutAddictionInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  resulted_in_relapse: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  resolution_notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const EmergencyAlertUncheckedUpdateManyWithoutAddictionInputSchema: z.ZodType<Prisma.EmergencyAlertUncheckedUpdateManyWithoutAddictionInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  resulted_in_relapse: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  resolution_notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const LogAbsenceCreateManyStreak_eventInputSchema: z.ZodType<Prisma.LogAbsenceCreateManyStreak_eventInput> = z.strictObject({
  id: z.string().optional(),
  user_id: z.string(),
  streak_id: z.string(),
  last_log_date: z.coerce.date().optional(),
  detected_at: z.coerce.date().optional(),
  absence_hours: z.number().int().optional(),
  event_generated: z.boolean().optional(),
});

export const LogAbsenceUpdateWithoutStreak_eventInputSchema: z.ZodType<Prisma.LogAbsenceUpdateWithoutStreak_eventInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  streak_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  detected_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  absence_hours: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  event_generated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAbsencesNestedInputSchema).optional(),
});

export const LogAbsenceUncheckedUpdateWithoutStreak_eventInputSchema: z.ZodType<Prisma.LogAbsenceUncheckedUpdateWithoutStreak_eventInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  streak_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  detected_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  absence_hours: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  event_generated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const LogAbsenceUncheckedUpdateManyWithoutStreak_eventInputSchema: z.ZodType<Prisma.LogAbsenceUncheckedUpdateManyWithoutStreak_eventInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  streak_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_log_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  detected_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  absence_hours: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  event_generated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StreakEventCreateManyStreakInputSchema: z.ZodType<Prisma.StreakEventCreateManyStreakInput> = z.strictObject({
  id: z.string().optional(),
  emergency_alert_id: z.string().optional(),
  event_type: z.string().optional(),
  event_date: z.coerce.date(),
  days_achieved: z.number().int().optional(),
  avg_craving_period: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  avg_emotion_period: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  created_at: z.coerce.date().optional(),
});

export const StreakEventUpdateWithoutStreakInputSchema: z.ZodType<Prisma.StreakEventUpdateWithoutStreakInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergency_alert_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event_type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  days_achieved: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  avg_craving_period: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  avg_emotion_period: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  absences: z.lazy(() => LogAbsenceUpdateManyWithoutStreak_eventNestedInputSchema).optional(),
});

export const StreakEventUncheckedUpdateWithoutStreakInputSchema: z.ZodType<Prisma.StreakEventUncheckedUpdateWithoutStreakInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergency_alert_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event_type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  days_achieved: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  avg_craving_period: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  avg_emotion_period: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  absences: z.lazy(() => LogAbsenceUncheckedUpdateManyWithoutStreak_eventNestedInputSchema).optional(),
});

export const StreakEventUncheckedUpdateManyWithoutStreakInputSchema: z.ZodType<Prisma.StreakEventUncheckedUpdateManyWithoutStreakInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emergency_alert_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event_type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  days_achieved: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  avg_craving_period: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  avg_emotion_period: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(), 
  having: UserScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const PasswordResetTokenFindFirstArgsSchema: z.ZodType<Prisma.PasswordResetTokenFindFirstArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  include: PasswordResetTokenIncludeSchema.optional(),
  where: PasswordResetTokenWhereInputSchema.optional(), 
  orderBy: z.union([ PasswordResetTokenOrderByWithRelationInputSchema.array(), PasswordResetTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordResetTokenWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PasswordResetTokenScalarFieldEnumSchema, PasswordResetTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const PasswordResetTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PasswordResetTokenFindFirstOrThrowArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  include: PasswordResetTokenIncludeSchema.optional(),
  where: PasswordResetTokenWhereInputSchema.optional(), 
  orderBy: z.union([ PasswordResetTokenOrderByWithRelationInputSchema.array(), PasswordResetTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordResetTokenWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PasswordResetTokenScalarFieldEnumSchema, PasswordResetTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const PasswordResetTokenFindManyArgsSchema: z.ZodType<Prisma.PasswordResetTokenFindManyArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  include: PasswordResetTokenIncludeSchema.optional(),
  where: PasswordResetTokenWhereInputSchema.optional(), 
  orderBy: z.union([ PasswordResetTokenOrderByWithRelationInputSchema.array(), PasswordResetTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordResetTokenWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PasswordResetTokenScalarFieldEnumSchema, PasswordResetTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const PasswordResetTokenAggregateArgsSchema: z.ZodType<Prisma.PasswordResetTokenAggregateArgs> = z.object({
  where: PasswordResetTokenWhereInputSchema.optional(), 
  orderBy: z.union([ PasswordResetTokenOrderByWithRelationInputSchema.array(), PasswordResetTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordResetTokenWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const PasswordResetTokenGroupByArgsSchema: z.ZodType<Prisma.PasswordResetTokenGroupByArgs> = z.object({
  where: PasswordResetTokenWhereInputSchema.optional(), 
  orderBy: z.union([ PasswordResetTokenOrderByWithAggregationInputSchema.array(), PasswordResetTokenOrderByWithAggregationInputSchema ]).optional(),
  by: PasswordResetTokenScalarFieldEnumSchema.array(), 
  having: PasswordResetTokenScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const PasswordResetTokenFindUniqueArgsSchema: z.ZodType<Prisma.PasswordResetTokenFindUniqueArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  include: PasswordResetTokenIncludeSchema.optional(),
  where: PasswordResetTokenWhereUniqueInputSchema, 
}).strict();

export const PasswordResetTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PasswordResetTokenFindUniqueOrThrowArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  include: PasswordResetTokenIncludeSchema.optional(),
  where: PasswordResetTokenWhereUniqueInputSchema, 
}).strict();

export const TrustedDeviceFindFirstArgsSchema: z.ZodType<Prisma.TrustedDeviceFindFirstArgs> = z.object({
  select: TrustedDeviceSelectSchema.optional(),
  include: TrustedDeviceIncludeSchema.optional(),
  where: TrustedDeviceWhereInputSchema.optional(), 
  orderBy: z.union([ TrustedDeviceOrderByWithRelationInputSchema.array(), TrustedDeviceOrderByWithRelationInputSchema ]).optional(),
  cursor: TrustedDeviceWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TrustedDeviceScalarFieldEnumSchema, TrustedDeviceScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const TrustedDeviceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TrustedDeviceFindFirstOrThrowArgs> = z.object({
  select: TrustedDeviceSelectSchema.optional(),
  include: TrustedDeviceIncludeSchema.optional(),
  where: TrustedDeviceWhereInputSchema.optional(), 
  orderBy: z.union([ TrustedDeviceOrderByWithRelationInputSchema.array(), TrustedDeviceOrderByWithRelationInputSchema ]).optional(),
  cursor: TrustedDeviceWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TrustedDeviceScalarFieldEnumSchema, TrustedDeviceScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const TrustedDeviceFindManyArgsSchema: z.ZodType<Prisma.TrustedDeviceFindManyArgs> = z.object({
  select: TrustedDeviceSelectSchema.optional(),
  include: TrustedDeviceIncludeSchema.optional(),
  where: TrustedDeviceWhereInputSchema.optional(), 
  orderBy: z.union([ TrustedDeviceOrderByWithRelationInputSchema.array(), TrustedDeviceOrderByWithRelationInputSchema ]).optional(),
  cursor: TrustedDeviceWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TrustedDeviceScalarFieldEnumSchema, TrustedDeviceScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const TrustedDeviceAggregateArgsSchema: z.ZodType<Prisma.TrustedDeviceAggregateArgs> = z.object({
  where: TrustedDeviceWhereInputSchema.optional(), 
  orderBy: z.union([ TrustedDeviceOrderByWithRelationInputSchema.array(), TrustedDeviceOrderByWithRelationInputSchema ]).optional(),
  cursor: TrustedDeviceWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const TrustedDeviceGroupByArgsSchema: z.ZodType<Prisma.TrustedDeviceGroupByArgs> = z.object({
  where: TrustedDeviceWhereInputSchema.optional(), 
  orderBy: z.union([ TrustedDeviceOrderByWithAggregationInputSchema.array(), TrustedDeviceOrderByWithAggregationInputSchema ]).optional(),
  by: TrustedDeviceScalarFieldEnumSchema.array(), 
  having: TrustedDeviceScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const TrustedDeviceFindUniqueArgsSchema: z.ZodType<Prisma.TrustedDeviceFindUniqueArgs> = z.object({
  select: TrustedDeviceSelectSchema.optional(),
  include: TrustedDeviceIncludeSchema.optional(),
  where: TrustedDeviceWhereUniqueInputSchema, 
}).strict();

export const TrustedDeviceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TrustedDeviceFindUniqueOrThrowArgs> = z.object({
  select: TrustedDeviceSelectSchema.optional(),
  include: TrustedDeviceIncludeSchema.optional(),
  where: TrustedDeviceWhereUniqueInputSchema, 
}).strict();

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  include: VerificationTokenIncludeSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(), 
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema, VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  include: VerificationTokenIncludeSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(), 
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema, VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  include: VerificationTokenIncludeSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(), 
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema, VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(), 
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(), 
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(), VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(), 
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  include: VerificationTokenIncludeSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema, 
}).strict();

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  include: VerificationTokenIncludeSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema, 
}).strict();

export const CravingLevelFindFirstArgsSchema: z.ZodType<Prisma.CravingLevelFindFirstArgs> = z.object({
  select: CravingLevelSelectSchema.optional(),
  include: CravingLevelIncludeSchema.optional(),
  where: CravingLevelWhereInputSchema.optional(), 
  orderBy: z.union([ CravingLevelOrderByWithRelationInputSchema.array(), CravingLevelOrderByWithRelationInputSchema ]).optional(),
  cursor: CravingLevelWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CravingLevelScalarFieldEnumSchema, CravingLevelScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CravingLevelFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CravingLevelFindFirstOrThrowArgs> = z.object({
  select: CravingLevelSelectSchema.optional(),
  include: CravingLevelIncludeSchema.optional(),
  where: CravingLevelWhereInputSchema.optional(), 
  orderBy: z.union([ CravingLevelOrderByWithRelationInputSchema.array(), CravingLevelOrderByWithRelationInputSchema ]).optional(),
  cursor: CravingLevelWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CravingLevelScalarFieldEnumSchema, CravingLevelScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CravingLevelFindManyArgsSchema: z.ZodType<Prisma.CravingLevelFindManyArgs> = z.object({
  select: CravingLevelSelectSchema.optional(),
  include: CravingLevelIncludeSchema.optional(),
  where: CravingLevelWhereInputSchema.optional(), 
  orderBy: z.union([ CravingLevelOrderByWithRelationInputSchema.array(), CravingLevelOrderByWithRelationInputSchema ]).optional(),
  cursor: CravingLevelWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CravingLevelScalarFieldEnumSchema, CravingLevelScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CravingLevelAggregateArgsSchema: z.ZodType<Prisma.CravingLevelAggregateArgs> = z.object({
  where: CravingLevelWhereInputSchema.optional(), 
  orderBy: z.union([ CravingLevelOrderByWithRelationInputSchema.array(), CravingLevelOrderByWithRelationInputSchema ]).optional(),
  cursor: CravingLevelWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CravingLevelGroupByArgsSchema: z.ZodType<Prisma.CravingLevelGroupByArgs> = z.object({
  where: CravingLevelWhereInputSchema.optional(), 
  orderBy: z.union([ CravingLevelOrderByWithAggregationInputSchema.array(), CravingLevelOrderByWithAggregationInputSchema ]).optional(),
  by: CravingLevelScalarFieldEnumSchema.array(), 
  having: CravingLevelScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CravingLevelFindUniqueArgsSchema: z.ZodType<Prisma.CravingLevelFindUniqueArgs> = z.object({
  select: CravingLevelSelectSchema.optional(),
  include: CravingLevelIncludeSchema.optional(),
  where: CravingLevelWhereUniqueInputSchema, 
}).strict();

export const CravingLevelFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CravingLevelFindUniqueOrThrowArgs> = z.object({
  select: CravingLevelSelectSchema.optional(),
  include: CravingLevelIncludeSchema.optional(),
  where: CravingLevelWhereUniqueInputSchema, 
}).strict();

export const EmotionalStateFindFirstArgsSchema: z.ZodType<Prisma.EmotionalStateFindFirstArgs> = z.object({
  select: EmotionalStateSelectSchema.optional(),
  include: EmotionalStateIncludeSchema.optional(),
  where: EmotionalStateWhereInputSchema.optional(), 
  orderBy: z.union([ EmotionalStateOrderByWithRelationInputSchema.array(), EmotionalStateOrderByWithRelationInputSchema ]).optional(),
  cursor: EmotionalStateWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmotionalStateScalarFieldEnumSchema, EmotionalStateScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const EmotionalStateFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EmotionalStateFindFirstOrThrowArgs> = z.object({
  select: EmotionalStateSelectSchema.optional(),
  include: EmotionalStateIncludeSchema.optional(),
  where: EmotionalStateWhereInputSchema.optional(), 
  orderBy: z.union([ EmotionalStateOrderByWithRelationInputSchema.array(), EmotionalStateOrderByWithRelationInputSchema ]).optional(),
  cursor: EmotionalStateWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmotionalStateScalarFieldEnumSchema, EmotionalStateScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const EmotionalStateFindManyArgsSchema: z.ZodType<Prisma.EmotionalStateFindManyArgs> = z.object({
  select: EmotionalStateSelectSchema.optional(),
  include: EmotionalStateIncludeSchema.optional(),
  where: EmotionalStateWhereInputSchema.optional(), 
  orderBy: z.union([ EmotionalStateOrderByWithRelationInputSchema.array(), EmotionalStateOrderByWithRelationInputSchema ]).optional(),
  cursor: EmotionalStateWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmotionalStateScalarFieldEnumSchema, EmotionalStateScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const EmotionalStateAggregateArgsSchema: z.ZodType<Prisma.EmotionalStateAggregateArgs> = z.object({
  where: EmotionalStateWhereInputSchema.optional(), 
  orderBy: z.union([ EmotionalStateOrderByWithRelationInputSchema.array(), EmotionalStateOrderByWithRelationInputSchema ]).optional(),
  cursor: EmotionalStateWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const EmotionalStateGroupByArgsSchema: z.ZodType<Prisma.EmotionalStateGroupByArgs> = z.object({
  where: EmotionalStateWhereInputSchema.optional(), 
  orderBy: z.union([ EmotionalStateOrderByWithAggregationInputSchema.array(), EmotionalStateOrderByWithAggregationInputSchema ]).optional(),
  by: EmotionalStateScalarFieldEnumSchema.array(), 
  having: EmotionalStateScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const EmotionalStateFindUniqueArgsSchema: z.ZodType<Prisma.EmotionalStateFindUniqueArgs> = z.object({
  select: EmotionalStateSelectSchema.optional(),
  include: EmotionalStateIncludeSchema.optional(),
  where: EmotionalStateWhereUniqueInputSchema, 
}).strict();

export const EmotionalStateFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EmotionalStateFindUniqueOrThrowArgs> = z.object({
  select: EmotionalStateSelectSchema.optional(),
  include: EmotionalStateIncludeSchema.optional(),
  where: EmotionalStateWhereUniqueInputSchema, 
}).strict();

export const UserAddictionFindFirstArgsSchema: z.ZodType<Prisma.UserAddictionFindFirstArgs> = z.object({
  select: UserAddictionSelectSchema.optional(),
  include: UserAddictionIncludeSchema.optional(),
  where: UserAddictionWhereInputSchema.optional(), 
  orderBy: z.union([ UserAddictionOrderByWithRelationInputSchema.array(), UserAddictionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserAddictionWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserAddictionScalarFieldEnumSchema, UserAddictionScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserAddictionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserAddictionFindFirstOrThrowArgs> = z.object({
  select: UserAddictionSelectSchema.optional(),
  include: UserAddictionIncludeSchema.optional(),
  where: UserAddictionWhereInputSchema.optional(), 
  orderBy: z.union([ UserAddictionOrderByWithRelationInputSchema.array(), UserAddictionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserAddictionWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserAddictionScalarFieldEnumSchema, UserAddictionScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserAddictionFindManyArgsSchema: z.ZodType<Prisma.UserAddictionFindManyArgs> = z.object({
  select: UserAddictionSelectSchema.optional(),
  include: UserAddictionIncludeSchema.optional(),
  where: UserAddictionWhereInputSchema.optional(), 
  orderBy: z.union([ UserAddictionOrderByWithRelationInputSchema.array(), UserAddictionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserAddictionWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserAddictionScalarFieldEnumSchema, UserAddictionScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserAddictionAggregateArgsSchema: z.ZodType<Prisma.UserAddictionAggregateArgs> = z.object({
  where: UserAddictionWhereInputSchema.optional(), 
  orderBy: z.union([ UserAddictionOrderByWithRelationInputSchema.array(), UserAddictionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserAddictionWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserAddictionGroupByArgsSchema: z.ZodType<Prisma.UserAddictionGroupByArgs> = z.object({
  where: UserAddictionWhereInputSchema.optional(), 
  orderBy: z.union([ UserAddictionOrderByWithAggregationInputSchema.array(), UserAddictionOrderByWithAggregationInputSchema ]).optional(),
  by: UserAddictionScalarFieldEnumSchema.array(), 
  having: UserAddictionScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserAddictionFindUniqueArgsSchema: z.ZodType<Prisma.UserAddictionFindUniqueArgs> = z.object({
  select: UserAddictionSelectSchema.optional(),
  include: UserAddictionIncludeSchema.optional(),
  where: UserAddictionWhereUniqueInputSchema, 
}).strict();

export const UserAddictionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserAddictionFindUniqueOrThrowArgs> = z.object({
  select: UserAddictionSelectSchema.optional(),
  include: UserAddictionIncludeSchema.optional(),
  where: UserAddictionWhereUniqueInputSchema, 
}).strict();

export const SponsorshipFindFirstArgsSchema: z.ZodType<Prisma.SponsorshipFindFirstArgs> = z.object({
  select: SponsorshipSelectSchema.optional(),
  include: SponsorshipIncludeSchema.optional(),
  where: SponsorshipWhereInputSchema.optional(), 
  orderBy: z.union([ SponsorshipOrderByWithRelationInputSchema.array(), SponsorshipOrderByWithRelationInputSchema ]).optional(),
  cursor: SponsorshipWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SponsorshipScalarFieldEnumSchema, SponsorshipScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SponsorshipFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SponsorshipFindFirstOrThrowArgs> = z.object({
  select: SponsorshipSelectSchema.optional(),
  include: SponsorshipIncludeSchema.optional(),
  where: SponsorshipWhereInputSchema.optional(), 
  orderBy: z.union([ SponsorshipOrderByWithRelationInputSchema.array(), SponsorshipOrderByWithRelationInputSchema ]).optional(),
  cursor: SponsorshipWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SponsorshipScalarFieldEnumSchema, SponsorshipScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SponsorshipFindManyArgsSchema: z.ZodType<Prisma.SponsorshipFindManyArgs> = z.object({
  select: SponsorshipSelectSchema.optional(),
  include: SponsorshipIncludeSchema.optional(),
  where: SponsorshipWhereInputSchema.optional(), 
  orderBy: z.union([ SponsorshipOrderByWithRelationInputSchema.array(), SponsorshipOrderByWithRelationInputSchema ]).optional(),
  cursor: SponsorshipWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SponsorshipScalarFieldEnumSchema, SponsorshipScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SponsorshipAggregateArgsSchema: z.ZodType<Prisma.SponsorshipAggregateArgs> = z.object({
  where: SponsorshipWhereInputSchema.optional(), 
  orderBy: z.union([ SponsorshipOrderByWithRelationInputSchema.array(), SponsorshipOrderByWithRelationInputSchema ]).optional(),
  cursor: SponsorshipWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SponsorshipGroupByArgsSchema: z.ZodType<Prisma.SponsorshipGroupByArgs> = z.object({
  where: SponsorshipWhereInputSchema.optional(), 
  orderBy: z.union([ SponsorshipOrderByWithAggregationInputSchema.array(), SponsorshipOrderByWithAggregationInputSchema ]).optional(),
  by: SponsorshipScalarFieldEnumSchema.array(), 
  having: SponsorshipScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SponsorshipFindUniqueArgsSchema: z.ZodType<Prisma.SponsorshipFindUniqueArgs> = z.object({
  select: SponsorshipSelectSchema.optional(),
  include: SponsorshipIncludeSchema.optional(),
  where: SponsorshipWhereUniqueInputSchema, 
}).strict();

export const SponsorshipFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SponsorshipFindUniqueOrThrowArgs> = z.object({
  select: SponsorshipSelectSchema.optional(),
  include: SponsorshipIncludeSchema.optional(),
  where: SponsorshipWhereUniqueInputSchema, 
}).strict();

export const DailyLogFindFirstArgsSchema: z.ZodType<Prisma.DailyLogFindFirstArgs> = z.object({
  select: DailyLogSelectSchema.optional(),
  include: DailyLogIncludeSchema.optional(),
  where: DailyLogWhereInputSchema.optional(), 
  orderBy: z.union([ DailyLogOrderByWithRelationInputSchema.array(), DailyLogOrderByWithRelationInputSchema ]).optional(),
  cursor: DailyLogWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DailyLogScalarFieldEnumSchema, DailyLogScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const DailyLogFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DailyLogFindFirstOrThrowArgs> = z.object({
  select: DailyLogSelectSchema.optional(),
  include: DailyLogIncludeSchema.optional(),
  where: DailyLogWhereInputSchema.optional(), 
  orderBy: z.union([ DailyLogOrderByWithRelationInputSchema.array(), DailyLogOrderByWithRelationInputSchema ]).optional(),
  cursor: DailyLogWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DailyLogScalarFieldEnumSchema, DailyLogScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const DailyLogFindManyArgsSchema: z.ZodType<Prisma.DailyLogFindManyArgs> = z.object({
  select: DailyLogSelectSchema.optional(),
  include: DailyLogIncludeSchema.optional(),
  where: DailyLogWhereInputSchema.optional(), 
  orderBy: z.union([ DailyLogOrderByWithRelationInputSchema.array(), DailyLogOrderByWithRelationInputSchema ]).optional(),
  cursor: DailyLogWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DailyLogScalarFieldEnumSchema, DailyLogScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const DailyLogAggregateArgsSchema: z.ZodType<Prisma.DailyLogAggregateArgs> = z.object({
  where: DailyLogWhereInputSchema.optional(), 
  orderBy: z.union([ DailyLogOrderByWithRelationInputSchema.array(), DailyLogOrderByWithRelationInputSchema ]).optional(),
  cursor: DailyLogWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const DailyLogGroupByArgsSchema: z.ZodType<Prisma.DailyLogGroupByArgs> = z.object({
  where: DailyLogWhereInputSchema.optional(), 
  orderBy: z.union([ DailyLogOrderByWithAggregationInputSchema.array(), DailyLogOrderByWithAggregationInputSchema ]).optional(),
  by: DailyLogScalarFieldEnumSchema.array(), 
  having: DailyLogScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const DailyLogFindUniqueArgsSchema: z.ZodType<Prisma.DailyLogFindUniqueArgs> = z.object({
  select: DailyLogSelectSchema.optional(),
  include: DailyLogIncludeSchema.optional(),
  where: DailyLogWhereUniqueInputSchema, 
}).strict();

export const DailyLogFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DailyLogFindUniqueOrThrowArgs> = z.object({
  select: DailyLogSelectSchema.optional(),
  include: DailyLogIncludeSchema.optional(),
  where: DailyLogWhereUniqueInputSchema, 
}).strict();

export const StreakEventFindFirstArgsSchema: z.ZodType<Prisma.StreakEventFindFirstArgs> = z.object({
  select: StreakEventSelectSchema.optional(),
  include: StreakEventIncludeSchema.optional(),
  where: StreakEventWhereInputSchema.optional(), 
  orderBy: z.union([ StreakEventOrderByWithRelationInputSchema.array(), StreakEventOrderByWithRelationInputSchema ]).optional(),
  cursor: StreakEventWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StreakEventScalarFieldEnumSchema, StreakEventScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const StreakEventFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StreakEventFindFirstOrThrowArgs> = z.object({
  select: StreakEventSelectSchema.optional(),
  include: StreakEventIncludeSchema.optional(),
  where: StreakEventWhereInputSchema.optional(), 
  orderBy: z.union([ StreakEventOrderByWithRelationInputSchema.array(), StreakEventOrderByWithRelationInputSchema ]).optional(),
  cursor: StreakEventWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StreakEventScalarFieldEnumSchema, StreakEventScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const StreakEventFindManyArgsSchema: z.ZodType<Prisma.StreakEventFindManyArgs> = z.object({
  select: StreakEventSelectSchema.optional(),
  include: StreakEventIncludeSchema.optional(),
  where: StreakEventWhereInputSchema.optional(), 
  orderBy: z.union([ StreakEventOrderByWithRelationInputSchema.array(), StreakEventOrderByWithRelationInputSchema ]).optional(),
  cursor: StreakEventWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StreakEventScalarFieldEnumSchema, StreakEventScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const StreakEventAggregateArgsSchema: z.ZodType<Prisma.StreakEventAggregateArgs> = z.object({
  where: StreakEventWhereInputSchema.optional(), 
  orderBy: z.union([ StreakEventOrderByWithRelationInputSchema.array(), StreakEventOrderByWithRelationInputSchema ]).optional(),
  cursor: StreakEventWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const StreakEventGroupByArgsSchema: z.ZodType<Prisma.StreakEventGroupByArgs> = z.object({
  where: StreakEventWhereInputSchema.optional(), 
  orderBy: z.union([ StreakEventOrderByWithAggregationInputSchema.array(), StreakEventOrderByWithAggregationInputSchema ]).optional(),
  by: StreakEventScalarFieldEnumSchema.array(), 
  having: StreakEventScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const StreakEventFindUniqueArgsSchema: z.ZodType<Prisma.StreakEventFindUniqueArgs> = z.object({
  select: StreakEventSelectSchema.optional(),
  include: StreakEventIncludeSchema.optional(),
  where: StreakEventWhereUniqueInputSchema, 
}).strict();

export const StreakEventFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StreakEventFindUniqueOrThrowArgs> = z.object({
  select: StreakEventSelectSchema.optional(),
  include: StreakEventIncludeSchema.optional(),
  where: StreakEventWhereUniqueInputSchema, 
}).strict();

export const LogAbsenceFindFirstArgsSchema: z.ZodType<Prisma.LogAbsenceFindFirstArgs> = z.object({
  select: LogAbsenceSelectSchema.optional(),
  include: LogAbsenceIncludeSchema.optional(),
  where: LogAbsenceWhereInputSchema.optional(), 
  orderBy: z.union([ LogAbsenceOrderByWithRelationInputSchema.array(), LogAbsenceOrderByWithRelationInputSchema ]).optional(),
  cursor: LogAbsenceWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LogAbsenceScalarFieldEnumSchema, LogAbsenceScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const LogAbsenceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LogAbsenceFindFirstOrThrowArgs> = z.object({
  select: LogAbsenceSelectSchema.optional(),
  include: LogAbsenceIncludeSchema.optional(),
  where: LogAbsenceWhereInputSchema.optional(), 
  orderBy: z.union([ LogAbsenceOrderByWithRelationInputSchema.array(), LogAbsenceOrderByWithRelationInputSchema ]).optional(),
  cursor: LogAbsenceWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LogAbsenceScalarFieldEnumSchema, LogAbsenceScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const LogAbsenceFindManyArgsSchema: z.ZodType<Prisma.LogAbsenceFindManyArgs> = z.object({
  select: LogAbsenceSelectSchema.optional(),
  include: LogAbsenceIncludeSchema.optional(),
  where: LogAbsenceWhereInputSchema.optional(), 
  orderBy: z.union([ LogAbsenceOrderByWithRelationInputSchema.array(), LogAbsenceOrderByWithRelationInputSchema ]).optional(),
  cursor: LogAbsenceWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LogAbsenceScalarFieldEnumSchema, LogAbsenceScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const LogAbsenceAggregateArgsSchema: z.ZodType<Prisma.LogAbsenceAggregateArgs> = z.object({
  where: LogAbsenceWhereInputSchema.optional(), 
  orderBy: z.union([ LogAbsenceOrderByWithRelationInputSchema.array(), LogAbsenceOrderByWithRelationInputSchema ]).optional(),
  cursor: LogAbsenceWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const LogAbsenceGroupByArgsSchema: z.ZodType<Prisma.LogAbsenceGroupByArgs> = z.object({
  where: LogAbsenceWhereInputSchema.optional(), 
  orderBy: z.union([ LogAbsenceOrderByWithAggregationInputSchema.array(), LogAbsenceOrderByWithAggregationInputSchema ]).optional(),
  by: LogAbsenceScalarFieldEnumSchema.array(), 
  having: LogAbsenceScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const LogAbsenceFindUniqueArgsSchema: z.ZodType<Prisma.LogAbsenceFindUniqueArgs> = z.object({
  select: LogAbsenceSelectSchema.optional(),
  include: LogAbsenceIncludeSchema.optional(),
  where: LogAbsenceWhereUniqueInputSchema, 
}).strict();

export const LogAbsenceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LogAbsenceFindUniqueOrThrowArgs> = z.object({
  select: LogAbsenceSelectSchema.optional(),
  include: LogAbsenceIncludeSchema.optional(),
  where: LogAbsenceWhereUniqueInputSchema, 
}).strict();

export const SupportContactFindFirstArgsSchema: z.ZodType<Prisma.SupportContactFindFirstArgs> = z.object({
  select: SupportContactSelectSchema.optional(),
  include: SupportContactIncludeSchema.optional(),
  where: SupportContactWhereInputSchema.optional(), 
  orderBy: z.union([ SupportContactOrderByWithRelationInputSchema.array(), SupportContactOrderByWithRelationInputSchema ]).optional(),
  cursor: SupportContactWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SupportContactScalarFieldEnumSchema, SupportContactScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SupportContactFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SupportContactFindFirstOrThrowArgs> = z.object({
  select: SupportContactSelectSchema.optional(),
  include: SupportContactIncludeSchema.optional(),
  where: SupportContactWhereInputSchema.optional(), 
  orderBy: z.union([ SupportContactOrderByWithRelationInputSchema.array(), SupportContactOrderByWithRelationInputSchema ]).optional(),
  cursor: SupportContactWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SupportContactScalarFieldEnumSchema, SupportContactScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SupportContactFindManyArgsSchema: z.ZodType<Prisma.SupportContactFindManyArgs> = z.object({
  select: SupportContactSelectSchema.optional(),
  include: SupportContactIncludeSchema.optional(),
  where: SupportContactWhereInputSchema.optional(), 
  orderBy: z.union([ SupportContactOrderByWithRelationInputSchema.array(), SupportContactOrderByWithRelationInputSchema ]).optional(),
  cursor: SupportContactWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SupportContactScalarFieldEnumSchema, SupportContactScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SupportContactAggregateArgsSchema: z.ZodType<Prisma.SupportContactAggregateArgs> = z.object({
  where: SupportContactWhereInputSchema.optional(), 
  orderBy: z.union([ SupportContactOrderByWithRelationInputSchema.array(), SupportContactOrderByWithRelationInputSchema ]).optional(),
  cursor: SupportContactWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SupportContactGroupByArgsSchema: z.ZodType<Prisma.SupportContactGroupByArgs> = z.object({
  where: SupportContactWhereInputSchema.optional(), 
  orderBy: z.union([ SupportContactOrderByWithAggregationInputSchema.array(), SupportContactOrderByWithAggregationInputSchema ]).optional(),
  by: SupportContactScalarFieldEnumSchema.array(), 
  having: SupportContactScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SupportContactFindUniqueArgsSchema: z.ZodType<Prisma.SupportContactFindUniqueArgs> = z.object({
  select: SupportContactSelectSchema.optional(),
  include: SupportContactIncludeSchema.optional(),
  where: SupportContactWhereUniqueInputSchema, 
}).strict();

export const SupportContactFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SupportContactFindUniqueOrThrowArgs> = z.object({
  select: SupportContactSelectSchema.optional(),
  include: SupportContactIncludeSchema.optional(),
  where: SupportContactWhereUniqueInputSchema, 
}).strict();

export const EmergencyAlertFindFirstArgsSchema: z.ZodType<Prisma.EmergencyAlertFindFirstArgs> = z.object({
  select: EmergencyAlertSelectSchema.optional(),
  include: EmergencyAlertIncludeSchema.optional(),
  where: EmergencyAlertWhereInputSchema.optional(), 
  orderBy: z.union([ EmergencyAlertOrderByWithRelationInputSchema.array(), EmergencyAlertOrderByWithRelationInputSchema ]).optional(),
  cursor: EmergencyAlertWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmergencyAlertScalarFieldEnumSchema, EmergencyAlertScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const EmergencyAlertFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EmergencyAlertFindFirstOrThrowArgs> = z.object({
  select: EmergencyAlertSelectSchema.optional(),
  include: EmergencyAlertIncludeSchema.optional(),
  where: EmergencyAlertWhereInputSchema.optional(), 
  orderBy: z.union([ EmergencyAlertOrderByWithRelationInputSchema.array(), EmergencyAlertOrderByWithRelationInputSchema ]).optional(),
  cursor: EmergencyAlertWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmergencyAlertScalarFieldEnumSchema, EmergencyAlertScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const EmergencyAlertFindManyArgsSchema: z.ZodType<Prisma.EmergencyAlertFindManyArgs> = z.object({
  select: EmergencyAlertSelectSchema.optional(),
  include: EmergencyAlertIncludeSchema.optional(),
  where: EmergencyAlertWhereInputSchema.optional(), 
  orderBy: z.union([ EmergencyAlertOrderByWithRelationInputSchema.array(), EmergencyAlertOrderByWithRelationInputSchema ]).optional(),
  cursor: EmergencyAlertWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmergencyAlertScalarFieldEnumSchema, EmergencyAlertScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const EmergencyAlertAggregateArgsSchema: z.ZodType<Prisma.EmergencyAlertAggregateArgs> = z.object({
  where: EmergencyAlertWhereInputSchema.optional(), 
  orderBy: z.union([ EmergencyAlertOrderByWithRelationInputSchema.array(), EmergencyAlertOrderByWithRelationInputSchema ]).optional(),
  cursor: EmergencyAlertWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const EmergencyAlertGroupByArgsSchema: z.ZodType<Prisma.EmergencyAlertGroupByArgs> = z.object({
  where: EmergencyAlertWhereInputSchema.optional(), 
  orderBy: z.union([ EmergencyAlertOrderByWithAggregationInputSchema.array(), EmergencyAlertOrderByWithAggregationInputSchema ]).optional(),
  by: EmergencyAlertScalarFieldEnumSchema.array(), 
  having: EmergencyAlertScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const EmergencyAlertFindUniqueArgsSchema: z.ZodType<Prisma.EmergencyAlertFindUniqueArgs> = z.object({
  select: EmergencyAlertSelectSchema.optional(),
  include: EmergencyAlertIncludeSchema.optional(),
  where: EmergencyAlertWhereUniqueInputSchema, 
}).strict();

export const EmergencyAlertFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EmergencyAlertFindUniqueOrThrowArgs> = z.object({
  select: EmergencyAlertSelectSchema.optional(),
  include: EmergencyAlertIncludeSchema.optional(),
  where: EmergencyAlertWhereUniqueInputSchema, 
}).strict();

export const StreakFindFirstArgsSchema: z.ZodType<Prisma.StreakFindFirstArgs> = z.object({
  select: StreakSelectSchema.optional(),
  include: StreakIncludeSchema.optional(),
  where: StreakWhereInputSchema.optional(), 
  orderBy: z.union([ StreakOrderByWithRelationInputSchema.array(), StreakOrderByWithRelationInputSchema ]).optional(),
  cursor: StreakWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StreakScalarFieldEnumSchema, StreakScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const StreakFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StreakFindFirstOrThrowArgs> = z.object({
  select: StreakSelectSchema.optional(),
  include: StreakIncludeSchema.optional(),
  where: StreakWhereInputSchema.optional(), 
  orderBy: z.union([ StreakOrderByWithRelationInputSchema.array(), StreakOrderByWithRelationInputSchema ]).optional(),
  cursor: StreakWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StreakScalarFieldEnumSchema, StreakScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const StreakFindManyArgsSchema: z.ZodType<Prisma.StreakFindManyArgs> = z.object({
  select: StreakSelectSchema.optional(),
  include: StreakIncludeSchema.optional(),
  where: StreakWhereInputSchema.optional(), 
  orderBy: z.union([ StreakOrderByWithRelationInputSchema.array(), StreakOrderByWithRelationInputSchema ]).optional(),
  cursor: StreakWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StreakScalarFieldEnumSchema, StreakScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const StreakAggregateArgsSchema: z.ZodType<Prisma.StreakAggregateArgs> = z.object({
  where: StreakWhereInputSchema.optional(), 
  orderBy: z.union([ StreakOrderByWithRelationInputSchema.array(), StreakOrderByWithRelationInputSchema ]).optional(),
  cursor: StreakWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const StreakGroupByArgsSchema: z.ZodType<Prisma.StreakGroupByArgs> = z.object({
  where: StreakWhereInputSchema.optional(), 
  orderBy: z.union([ StreakOrderByWithAggregationInputSchema.array(), StreakOrderByWithAggregationInputSchema ]).optional(),
  by: StreakScalarFieldEnumSchema.array(), 
  having: StreakScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const StreakFindUniqueArgsSchema: z.ZodType<Prisma.StreakFindUniqueArgs> = z.object({
  select: StreakSelectSchema.optional(),
  include: StreakIncludeSchema.optional(),
  where: StreakWhereUniqueInputSchema, 
}).strict();

export const StreakFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StreakFindUniqueOrThrowArgs> = z.object({
  select: StreakSelectSchema.optional(),
  include: StreakIncludeSchema.optional(),
  where: StreakWhereUniqueInputSchema, 
}).strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
}).strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
  create: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
}).strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const PasswordResetTokenCreateArgsSchema: z.ZodType<Prisma.PasswordResetTokenCreateArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  include: PasswordResetTokenIncludeSchema.optional(),
  data: z.union([ PasswordResetTokenCreateInputSchema, PasswordResetTokenUncheckedCreateInputSchema ]),
}).strict();

export const PasswordResetTokenUpsertArgsSchema: z.ZodType<Prisma.PasswordResetTokenUpsertArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  include: PasswordResetTokenIncludeSchema.optional(),
  where: PasswordResetTokenWhereUniqueInputSchema, 
  create: z.union([ PasswordResetTokenCreateInputSchema, PasswordResetTokenUncheckedCreateInputSchema ]),
  update: z.union([ PasswordResetTokenUpdateInputSchema, PasswordResetTokenUncheckedUpdateInputSchema ]),
}).strict();

export const PasswordResetTokenCreateManyArgsSchema: z.ZodType<Prisma.PasswordResetTokenCreateManyArgs> = z.object({
  data: z.union([ PasswordResetTokenCreateManyInputSchema, PasswordResetTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const PasswordResetTokenCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PasswordResetTokenCreateManyAndReturnArgs> = z.object({
  data: z.union([ PasswordResetTokenCreateManyInputSchema, PasswordResetTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const PasswordResetTokenDeleteArgsSchema: z.ZodType<Prisma.PasswordResetTokenDeleteArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  include: PasswordResetTokenIncludeSchema.optional(),
  where: PasswordResetTokenWhereUniqueInputSchema, 
}).strict();

export const PasswordResetTokenUpdateArgsSchema: z.ZodType<Prisma.PasswordResetTokenUpdateArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  include: PasswordResetTokenIncludeSchema.optional(),
  data: z.union([ PasswordResetTokenUpdateInputSchema, PasswordResetTokenUncheckedUpdateInputSchema ]),
  where: PasswordResetTokenWhereUniqueInputSchema, 
}).strict();

export const PasswordResetTokenUpdateManyArgsSchema: z.ZodType<Prisma.PasswordResetTokenUpdateManyArgs> = z.object({
  data: z.union([ PasswordResetTokenUpdateManyMutationInputSchema, PasswordResetTokenUncheckedUpdateManyInputSchema ]),
  where: PasswordResetTokenWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const PasswordResetTokenUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PasswordResetTokenUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PasswordResetTokenUpdateManyMutationInputSchema, PasswordResetTokenUncheckedUpdateManyInputSchema ]),
  where: PasswordResetTokenWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const PasswordResetTokenDeleteManyArgsSchema: z.ZodType<Prisma.PasswordResetTokenDeleteManyArgs> = z.object({
  where: PasswordResetTokenWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const TrustedDeviceCreateArgsSchema: z.ZodType<Prisma.TrustedDeviceCreateArgs> = z.object({
  select: TrustedDeviceSelectSchema.optional(),
  include: TrustedDeviceIncludeSchema.optional(),
  data: z.union([ TrustedDeviceCreateInputSchema, TrustedDeviceUncheckedCreateInputSchema ]),
}).strict();

export const TrustedDeviceUpsertArgsSchema: z.ZodType<Prisma.TrustedDeviceUpsertArgs> = z.object({
  select: TrustedDeviceSelectSchema.optional(),
  include: TrustedDeviceIncludeSchema.optional(),
  where: TrustedDeviceWhereUniqueInputSchema, 
  create: z.union([ TrustedDeviceCreateInputSchema, TrustedDeviceUncheckedCreateInputSchema ]),
  update: z.union([ TrustedDeviceUpdateInputSchema, TrustedDeviceUncheckedUpdateInputSchema ]),
}).strict();

export const TrustedDeviceCreateManyArgsSchema: z.ZodType<Prisma.TrustedDeviceCreateManyArgs> = z.object({
  data: z.union([ TrustedDeviceCreateManyInputSchema, TrustedDeviceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const TrustedDeviceCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TrustedDeviceCreateManyAndReturnArgs> = z.object({
  data: z.union([ TrustedDeviceCreateManyInputSchema, TrustedDeviceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const TrustedDeviceDeleteArgsSchema: z.ZodType<Prisma.TrustedDeviceDeleteArgs> = z.object({
  select: TrustedDeviceSelectSchema.optional(),
  include: TrustedDeviceIncludeSchema.optional(),
  where: TrustedDeviceWhereUniqueInputSchema, 
}).strict();

export const TrustedDeviceUpdateArgsSchema: z.ZodType<Prisma.TrustedDeviceUpdateArgs> = z.object({
  select: TrustedDeviceSelectSchema.optional(),
  include: TrustedDeviceIncludeSchema.optional(),
  data: z.union([ TrustedDeviceUpdateInputSchema, TrustedDeviceUncheckedUpdateInputSchema ]),
  where: TrustedDeviceWhereUniqueInputSchema, 
}).strict();

export const TrustedDeviceUpdateManyArgsSchema: z.ZodType<Prisma.TrustedDeviceUpdateManyArgs> = z.object({
  data: z.union([ TrustedDeviceUpdateManyMutationInputSchema, TrustedDeviceUncheckedUpdateManyInputSchema ]),
  where: TrustedDeviceWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const TrustedDeviceUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TrustedDeviceUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TrustedDeviceUpdateManyMutationInputSchema, TrustedDeviceUncheckedUpdateManyInputSchema ]),
  where: TrustedDeviceWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const TrustedDeviceDeleteManyArgsSchema: z.ZodType<Prisma.TrustedDeviceDeleteManyArgs> = z.object({
  where: TrustedDeviceWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  include: VerificationTokenIncludeSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema, VerificationTokenUncheckedCreateInputSchema ]),
}).strict();

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  include: VerificationTokenIncludeSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema, 
  create: z.union([ VerificationTokenCreateInputSchema, VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema, VerificationTokenUncheckedUpdateInputSchema ]),
}).strict();

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema, VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const VerificationTokenCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema, VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  include: VerificationTokenIncludeSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema, 
}).strict();

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  include: VerificationTokenIncludeSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema, VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema, 
}).strict();

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema, VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const VerificationTokenUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema, VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CravingLevelCreateArgsSchema: z.ZodType<Prisma.CravingLevelCreateArgs> = z.object({
  select: CravingLevelSelectSchema.optional(),
  include: CravingLevelIncludeSchema.optional(),
  data: z.union([ CravingLevelCreateInputSchema, CravingLevelUncheckedCreateInputSchema ]),
}).strict();

export const CravingLevelUpsertArgsSchema: z.ZodType<Prisma.CravingLevelUpsertArgs> = z.object({
  select: CravingLevelSelectSchema.optional(),
  include: CravingLevelIncludeSchema.optional(),
  where: CravingLevelWhereUniqueInputSchema, 
  create: z.union([ CravingLevelCreateInputSchema, CravingLevelUncheckedCreateInputSchema ]),
  update: z.union([ CravingLevelUpdateInputSchema, CravingLevelUncheckedUpdateInputSchema ]),
}).strict();

export const CravingLevelCreateManyArgsSchema: z.ZodType<Prisma.CravingLevelCreateManyArgs> = z.object({
  data: z.union([ CravingLevelCreateManyInputSchema, CravingLevelCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CravingLevelCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CravingLevelCreateManyAndReturnArgs> = z.object({
  data: z.union([ CravingLevelCreateManyInputSchema, CravingLevelCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CravingLevelDeleteArgsSchema: z.ZodType<Prisma.CravingLevelDeleteArgs> = z.object({
  select: CravingLevelSelectSchema.optional(),
  include: CravingLevelIncludeSchema.optional(),
  where: CravingLevelWhereUniqueInputSchema, 
}).strict();

export const CravingLevelUpdateArgsSchema: z.ZodType<Prisma.CravingLevelUpdateArgs> = z.object({
  select: CravingLevelSelectSchema.optional(),
  include: CravingLevelIncludeSchema.optional(),
  data: z.union([ CravingLevelUpdateInputSchema, CravingLevelUncheckedUpdateInputSchema ]),
  where: CravingLevelWhereUniqueInputSchema, 
}).strict();

export const CravingLevelUpdateManyArgsSchema: z.ZodType<Prisma.CravingLevelUpdateManyArgs> = z.object({
  data: z.union([ CravingLevelUpdateManyMutationInputSchema, CravingLevelUncheckedUpdateManyInputSchema ]),
  where: CravingLevelWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CravingLevelUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CravingLevelUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CravingLevelUpdateManyMutationInputSchema, CravingLevelUncheckedUpdateManyInputSchema ]),
  where: CravingLevelWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CravingLevelDeleteManyArgsSchema: z.ZodType<Prisma.CravingLevelDeleteManyArgs> = z.object({
  where: CravingLevelWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const EmotionalStateCreateArgsSchema: z.ZodType<Prisma.EmotionalStateCreateArgs> = z.object({
  select: EmotionalStateSelectSchema.optional(),
  include: EmotionalStateIncludeSchema.optional(),
  data: z.union([ EmotionalStateCreateInputSchema, EmotionalStateUncheckedCreateInputSchema ]),
}).strict();

export const EmotionalStateUpsertArgsSchema: z.ZodType<Prisma.EmotionalStateUpsertArgs> = z.object({
  select: EmotionalStateSelectSchema.optional(),
  include: EmotionalStateIncludeSchema.optional(),
  where: EmotionalStateWhereUniqueInputSchema, 
  create: z.union([ EmotionalStateCreateInputSchema, EmotionalStateUncheckedCreateInputSchema ]),
  update: z.union([ EmotionalStateUpdateInputSchema, EmotionalStateUncheckedUpdateInputSchema ]),
}).strict();

export const EmotionalStateCreateManyArgsSchema: z.ZodType<Prisma.EmotionalStateCreateManyArgs> = z.object({
  data: z.union([ EmotionalStateCreateManyInputSchema, EmotionalStateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const EmotionalStateCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EmotionalStateCreateManyAndReturnArgs> = z.object({
  data: z.union([ EmotionalStateCreateManyInputSchema, EmotionalStateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const EmotionalStateDeleteArgsSchema: z.ZodType<Prisma.EmotionalStateDeleteArgs> = z.object({
  select: EmotionalStateSelectSchema.optional(),
  include: EmotionalStateIncludeSchema.optional(),
  where: EmotionalStateWhereUniqueInputSchema, 
}).strict();

export const EmotionalStateUpdateArgsSchema: z.ZodType<Prisma.EmotionalStateUpdateArgs> = z.object({
  select: EmotionalStateSelectSchema.optional(),
  include: EmotionalStateIncludeSchema.optional(),
  data: z.union([ EmotionalStateUpdateInputSchema, EmotionalStateUncheckedUpdateInputSchema ]),
  where: EmotionalStateWhereUniqueInputSchema, 
}).strict();

export const EmotionalStateUpdateManyArgsSchema: z.ZodType<Prisma.EmotionalStateUpdateManyArgs> = z.object({
  data: z.union([ EmotionalStateUpdateManyMutationInputSchema, EmotionalStateUncheckedUpdateManyInputSchema ]),
  where: EmotionalStateWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const EmotionalStateUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.EmotionalStateUpdateManyAndReturnArgs> = z.object({
  data: z.union([ EmotionalStateUpdateManyMutationInputSchema, EmotionalStateUncheckedUpdateManyInputSchema ]),
  where: EmotionalStateWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const EmotionalStateDeleteManyArgsSchema: z.ZodType<Prisma.EmotionalStateDeleteManyArgs> = z.object({
  where: EmotionalStateWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserAddictionCreateArgsSchema: z.ZodType<Prisma.UserAddictionCreateArgs> = z.object({
  select: UserAddictionSelectSchema.optional(),
  include: UserAddictionIncludeSchema.optional(),
  data: z.union([ UserAddictionCreateInputSchema, UserAddictionUncheckedCreateInputSchema ]),
}).strict();

export const UserAddictionUpsertArgsSchema: z.ZodType<Prisma.UserAddictionUpsertArgs> = z.object({
  select: UserAddictionSelectSchema.optional(),
  include: UserAddictionIncludeSchema.optional(),
  where: UserAddictionWhereUniqueInputSchema, 
  create: z.union([ UserAddictionCreateInputSchema, UserAddictionUncheckedCreateInputSchema ]),
  update: z.union([ UserAddictionUpdateInputSchema, UserAddictionUncheckedUpdateInputSchema ]),
}).strict();

export const UserAddictionCreateManyArgsSchema: z.ZodType<Prisma.UserAddictionCreateManyArgs> = z.object({
  data: z.union([ UserAddictionCreateManyInputSchema, UserAddictionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserAddictionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserAddictionCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserAddictionCreateManyInputSchema, UserAddictionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserAddictionDeleteArgsSchema: z.ZodType<Prisma.UserAddictionDeleteArgs> = z.object({
  select: UserAddictionSelectSchema.optional(),
  include: UserAddictionIncludeSchema.optional(),
  where: UserAddictionWhereUniqueInputSchema, 
}).strict();

export const UserAddictionUpdateArgsSchema: z.ZodType<Prisma.UserAddictionUpdateArgs> = z.object({
  select: UserAddictionSelectSchema.optional(),
  include: UserAddictionIncludeSchema.optional(),
  data: z.union([ UserAddictionUpdateInputSchema, UserAddictionUncheckedUpdateInputSchema ]),
  where: UserAddictionWhereUniqueInputSchema, 
}).strict();

export const UserAddictionUpdateManyArgsSchema: z.ZodType<Prisma.UserAddictionUpdateManyArgs> = z.object({
  data: z.union([ UserAddictionUpdateManyMutationInputSchema, UserAddictionUncheckedUpdateManyInputSchema ]),
  where: UserAddictionWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserAddictionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserAddictionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserAddictionUpdateManyMutationInputSchema, UserAddictionUncheckedUpdateManyInputSchema ]),
  where: UserAddictionWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserAddictionDeleteManyArgsSchema: z.ZodType<Prisma.UserAddictionDeleteManyArgs> = z.object({
  where: UserAddictionWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const SponsorshipCreateArgsSchema: z.ZodType<Prisma.SponsorshipCreateArgs> = z.object({
  select: SponsorshipSelectSchema.optional(),
  include: SponsorshipIncludeSchema.optional(),
  data: z.union([ SponsorshipCreateInputSchema, SponsorshipUncheckedCreateInputSchema ]),
}).strict();

export const SponsorshipUpsertArgsSchema: z.ZodType<Prisma.SponsorshipUpsertArgs> = z.object({
  select: SponsorshipSelectSchema.optional(),
  include: SponsorshipIncludeSchema.optional(),
  where: SponsorshipWhereUniqueInputSchema, 
  create: z.union([ SponsorshipCreateInputSchema, SponsorshipUncheckedCreateInputSchema ]),
  update: z.union([ SponsorshipUpdateInputSchema, SponsorshipUncheckedUpdateInputSchema ]),
}).strict();

export const SponsorshipCreateManyArgsSchema: z.ZodType<Prisma.SponsorshipCreateManyArgs> = z.object({
  data: z.union([ SponsorshipCreateManyInputSchema, SponsorshipCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SponsorshipCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SponsorshipCreateManyAndReturnArgs> = z.object({
  data: z.union([ SponsorshipCreateManyInputSchema, SponsorshipCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SponsorshipDeleteArgsSchema: z.ZodType<Prisma.SponsorshipDeleteArgs> = z.object({
  select: SponsorshipSelectSchema.optional(),
  include: SponsorshipIncludeSchema.optional(),
  where: SponsorshipWhereUniqueInputSchema, 
}).strict();

export const SponsorshipUpdateArgsSchema: z.ZodType<Prisma.SponsorshipUpdateArgs> = z.object({
  select: SponsorshipSelectSchema.optional(),
  include: SponsorshipIncludeSchema.optional(),
  data: z.union([ SponsorshipUpdateInputSchema, SponsorshipUncheckedUpdateInputSchema ]),
  where: SponsorshipWhereUniqueInputSchema, 
}).strict();

export const SponsorshipUpdateManyArgsSchema: z.ZodType<Prisma.SponsorshipUpdateManyArgs> = z.object({
  data: z.union([ SponsorshipUpdateManyMutationInputSchema, SponsorshipUncheckedUpdateManyInputSchema ]),
  where: SponsorshipWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const SponsorshipUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SponsorshipUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SponsorshipUpdateManyMutationInputSchema, SponsorshipUncheckedUpdateManyInputSchema ]),
  where: SponsorshipWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const SponsorshipDeleteManyArgsSchema: z.ZodType<Prisma.SponsorshipDeleteManyArgs> = z.object({
  where: SponsorshipWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const DailyLogCreateArgsSchema: z.ZodType<Prisma.DailyLogCreateArgs> = z.object({
  select: DailyLogSelectSchema.optional(),
  include: DailyLogIncludeSchema.optional(),
  data: z.union([ DailyLogCreateInputSchema, DailyLogUncheckedCreateInputSchema ]),
}).strict();

export const DailyLogUpsertArgsSchema: z.ZodType<Prisma.DailyLogUpsertArgs> = z.object({
  select: DailyLogSelectSchema.optional(),
  include: DailyLogIncludeSchema.optional(),
  where: DailyLogWhereUniqueInputSchema, 
  create: z.union([ DailyLogCreateInputSchema, DailyLogUncheckedCreateInputSchema ]),
  update: z.union([ DailyLogUpdateInputSchema, DailyLogUncheckedUpdateInputSchema ]),
}).strict();

export const DailyLogCreateManyArgsSchema: z.ZodType<Prisma.DailyLogCreateManyArgs> = z.object({
  data: z.union([ DailyLogCreateManyInputSchema, DailyLogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const DailyLogCreateManyAndReturnArgsSchema: z.ZodType<Prisma.DailyLogCreateManyAndReturnArgs> = z.object({
  data: z.union([ DailyLogCreateManyInputSchema, DailyLogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const DailyLogDeleteArgsSchema: z.ZodType<Prisma.DailyLogDeleteArgs> = z.object({
  select: DailyLogSelectSchema.optional(),
  include: DailyLogIncludeSchema.optional(),
  where: DailyLogWhereUniqueInputSchema, 
}).strict();

export const DailyLogUpdateArgsSchema: z.ZodType<Prisma.DailyLogUpdateArgs> = z.object({
  select: DailyLogSelectSchema.optional(),
  include: DailyLogIncludeSchema.optional(),
  data: z.union([ DailyLogUpdateInputSchema, DailyLogUncheckedUpdateInputSchema ]),
  where: DailyLogWhereUniqueInputSchema, 
}).strict();

export const DailyLogUpdateManyArgsSchema: z.ZodType<Prisma.DailyLogUpdateManyArgs> = z.object({
  data: z.union([ DailyLogUpdateManyMutationInputSchema, DailyLogUncheckedUpdateManyInputSchema ]),
  where: DailyLogWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const DailyLogUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.DailyLogUpdateManyAndReturnArgs> = z.object({
  data: z.union([ DailyLogUpdateManyMutationInputSchema, DailyLogUncheckedUpdateManyInputSchema ]),
  where: DailyLogWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const DailyLogDeleteManyArgsSchema: z.ZodType<Prisma.DailyLogDeleteManyArgs> = z.object({
  where: DailyLogWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const StreakEventCreateArgsSchema: z.ZodType<Prisma.StreakEventCreateArgs> = z.object({
  select: StreakEventSelectSchema.optional(),
  include: StreakEventIncludeSchema.optional(),
  data: z.union([ StreakEventCreateInputSchema, StreakEventUncheckedCreateInputSchema ]),
}).strict();

export const StreakEventUpsertArgsSchema: z.ZodType<Prisma.StreakEventUpsertArgs> = z.object({
  select: StreakEventSelectSchema.optional(),
  include: StreakEventIncludeSchema.optional(),
  where: StreakEventWhereUniqueInputSchema, 
  create: z.union([ StreakEventCreateInputSchema, StreakEventUncheckedCreateInputSchema ]),
  update: z.union([ StreakEventUpdateInputSchema, StreakEventUncheckedUpdateInputSchema ]),
}).strict();

export const StreakEventCreateManyArgsSchema: z.ZodType<Prisma.StreakEventCreateManyArgs> = z.object({
  data: z.union([ StreakEventCreateManyInputSchema, StreakEventCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const StreakEventCreateManyAndReturnArgsSchema: z.ZodType<Prisma.StreakEventCreateManyAndReturnArgs> = z.object({
  data: z.union([ StreakEventCreateManyInputSchema, StreakEventCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const StreakEventDeleteArgsSchema: z.ZodType<Prisma.StreakEventDeleteArgs> = z.object({
  select: StreakEventSelectSchema.optional(),
  include: StreakEventIncludeSchema.optional(),
  where: StreakEventWhereUniqueInputSchema, 
}).strict();

export const StreakEventUpdateArgsSchema: z.ZodType<Prisma.StreakEventUpdateArgs> = z.object({
  select: StreakEventSelectSchema.optional(),
  include: StreakEventIncludeSchema.optional(),
  data: z.union([ StreakEventUpdateInputSchema, StreakEventUncheckedUpdateInputSchema ]),
  where: StreakEventWhereUniqueInputSchema, 
}).strict();

export const StreakEventUpdateManyArgsSchema: z.ZodType<Prisma.StreakEventUpdateManyArgs> = z.object({
  data: z.union([ StreakEventUpdateManyMutationInputSchema, StreakEventUncheckedUpdateManyInputSchema ]),
  where: StreakEventWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const StreakEventUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.StreakEventUpdateManyAndReturnArgs> = z.object({
  data: z.union([ StreakEventUpdateManyMutationInputSchema, StreakEventUncheckedUpdateManyInputSchema ]),
  where: StreakEventWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const StreakEventDeleteManyArgsSchema: z.ZodType<Prisma.StreakEventDeleteManyArgs> = z.object({
  where: StreakEventWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const LogAbsenceCreateArgsSchema: z.ZodType<Prisma.LogAbsenceCreateArgs> = z.object({
  select: LogAbsenceSelectSchema.optional(),
  include: LogAbsenceIncludeSchema.optional(),
  data: z.union([ LogAbsenceCreateInputSchema, LogAbsenceUncheckedCreateInputSchema ]),
}).strict();

export const LogAbsenceUpsertArgsSchema: z.ZodType<Prisma.LogAbsenceUpsertArgs> = z.object({
  select: LogAbsenceSelectSchema.optional(),
  include: LogAbsenceIncludeSchema.optional(),
  where: LogAbsenceWhereUniqueInputSchema, 
  create: z.union([ LogAbsenceCreateInputSchema, LogAbsenceUncheckedCreateInputSchema ]),
  update: z.union([ LogAbsenceUpdateInputSchema, LogAbsenceUncheckedUpdateInputSchema ]),
}).strict();

export const LogAbsenceCreateManyArgsSchema: z.ZodType<Prisma.LogAbsenceCreateManyArgs> = z.object({
  data: z.union([ LogAbsenceCreateManyInputSchema, LogAbsenceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const LogAbsenceCreateManyAndReturnArgsSchema: z.ZodType<Prisma.LogAbsenceCreateManyAndReturnArgs> = z.object({
  data: z.union([ LogAbsenceCreateManyInputSchema, LogAbsenceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const LogAbsenceDeleteArgsSchema: z.ZodType<Prisma.LogAbsenceDeleteArgs> = z.object({
  select: LogAbsenceSelectSchema.optional(),
  include: LogAbsenceIncludeSchema.optional(),
  where: LogAbsenceWhereUniqueInputSchema, 
}).strict();

export const LogAbsenceUpdateArgsSchema: z.ZodType<Prisma.LogAbsenceUpdateArgs> = z.object({
  select: LogAbsenceSelectSchema.optional(),
  include: LogAbsenceIncludeSchema.optional(),
  data: z.union([ LogAbsenceUpdateInputSchema, LogAbsenceUncheckedUpdateInputSchema ]),
  where: LogAbsenceWhereUniqueInputSchema, 
}).strict();

export const LogAbsenceUpdateManyArgsSchema: z.ZodType<Prisma.LogAbsenceUpdateManyArgs> = z.object({
  data: z.union([ LogAbsenceUpdateManyMutationInputSchema, LogAbsenceUncheckedUpdateManyInputSchema ]),
  where: LogAbsenceWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const LogAbsenceUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.LogAbsenceUpdateManyAndReturnArgs> = z.object({
  data: z.union([ LogAbsenceUpdateManyMutationInputSchema, LogAbsenceUncheckedUpdateManyInputSchema ]),
  where: LogAbsenceWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const LogAbsenceDeleteManyArgsSchema: z.ZodType<Prisma.LogAbsenceDeleteManyArgs> = z.object({
  where: LogAbsenceWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const SupportContactCreateArgsSchema: z.ZodType<Prisma.SupportContactCreateArgs> = z.object({
  select: SupportContactSelectSchema.optional(),
  include: SupportContactIncludeSchema.optional(),
  data: z.union([ SupportContactCreateInputSchema, SupportContactUncheckedCreateInputSchema ]),
}).strict();

export const SupportContactUpsertArgsSchema: z.ZodType<Prisma.SupportContactUpsertArgs> = z.object({
  select: SupportContactSelectSchema.optional(),
  include: SupportContactIncludeSchema.optional(),
  where: SupportContactWhereUniqueInputSchema, 
  create: z.union([ SupportContactCreateInputSchema, SupportContactUncheckedCreateInputSchema ]),
  update: z.union([ SupportContactUpdateInputSchema, SupportContactUncheckedUpdateInputSchema ]),
}).strict();

export const SupportContactCreateManyArgsSchema: z.ZodType<Prisma.SupportContactCreateManyArgs> = z.object({
  data: z.union([ SupportContactCreateManyInputSchema, SupportContactCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SupportContactCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SupportContactCreateManyAndReturnArgs> = z.object({
  data: z.union([ SupportContactCreateManyInputSchema, SupportContactCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SupportContactDeleteArgsSchema: z.ZodType<Prisma.SupportContactDeleteArgs> = z.object({
  select: SupportContactSelectSchema.optional(),
  include: SupportContactIncludeSchema.optional(),
  where: SupportContactWhereUniqueInputSchema, 
}).strict();

export const SupportContactUpdateArgsSchema: z.ZodType<Prisma.SupportContactUpdateArgs> = z.object({
  select: SupportContactSelectSchema.optional(),
  include: SupportContactIncludeSchema.optional(),
  data: z.union([ SupportContactUpdateInputSchema, SupportContactUncheckedUpdateInputSchema ]),
  where: SupportContactWhereUniqueInputSchema, 
}).strict();

export const SupportContactUpdateManyArgsSchema: z.ZodType<Prisma.SupportContactUpdateManyArgs> = z.object({
  data: z.union([ SupportContactUpdateManyMutationInputSchema, SupportContactUncheckedUpdateManyInputSchema ]),
  where: SupportContactWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const SupportContactUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SupportContactUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SupportContactUpdateManyMutationInputSchema, SupportContactUncheckedUpdateManyInputSchema ]),
  where: SupportContactWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const SupportContactDeleteManyArgsSchema: z.ZodType<Prisma.SupportContactDeleteManyArgs> = z.object({
  where: SupportContactWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const EmergencyAlertCreateArgsSchema: z.ZodType<Prisma.EmergencyAlertCreateArgs> = z.object({
  select: EmergencyAlertSelectSchema.optional(),
  include: EmergencyAlertIncludeSchema.optional(),
  data: z.union([ EmergencyAlertCreateInputSchema, EmergencyAlertUncheckedCreateInputSchema ]),
}).strict();

export const EmergencyAlertUpsertArgsSchema: z.ZodType<Prisma.EmergencyAlertUpsertArgs> = z.object({
  select: EmergencyAlertSelectSchema.optional(),
  include: EmergencyAlertIncludeSchema.optional(),
  where: EmergencyAlertWhereUniqueInputSchema, 
  create: z.union([ EmergencyAlertCreateInputSchema, EmergencyAlertUncheckedCreateInputSchema ]),
  update: z.union([ EmergencyAlertUpdateInputSchema, EmergencyAlertUncheckedUpdateInputSchema ]),
}).strict();

export const EmergencyAlertCreateManyArgsSchema: z.ZodType<Prisma.EmergencyAlertCreateManyArgs> = z.object({
  data: z.union([ EmergencyAlertCreateManyInputSchema, EmergencyAlertCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const EmergencyAlertCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EmergencyAlertCreateManyAndReturnArgs> = z.object({
  data: z.union([ EmergencyAlertCreateManyInputSchema, EmergencyAlertCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const EmergencyAlertDeleteArgsSchema: z.ZodType<Prisma.EmergencyAlertDeleteArgs> = z.object({
  select: EmergencyAlertSelectSchema.optional(),
  include: EmergencyAlertIncludeSchema.optional(),
  where: EmergencyAlertWhereUniqueInputSchema, 
}).strict();

export const EmergencyAlertUpdateArgsSchema: z.ZodType<Prisma.EmergencyAlertUpdateArgs> = z.object({
  select: EmergencyAlertSelectSchema.optional(),
  include: EmergencyAlertIncludeSchema.optional(),
  data: z.union([ EmergencyAlertUpdateInputSchema, EmergencyAlertUncheckedUpdateInputSchema ]),
  where: EmergencyAlertWhereUniqueInputSchema, 
}).strict();

export const EmergencyAlertUpdateManyArgsSchema: z.ZodType<Prisma.EmergencyAlertUpdateManyArgs> = z.object({
  data: z.union([ EmergencyAlertUpdateManyMutationInputSchema, EmergencyAlertUncheckedUpdateManyInputSchema ]),
  where: EmergencyAlertWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const EmergencyAlertUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.EmergencyAlertUpdateManyAndReturnArgs> = z.object({
  data: z.union([ EmergencyAlertUpdateManyMutationInputSchema, EmergencyAlertUncheckedUpdateManyInputSchema ]),
  where: EmergencyAlertWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const EmergencyAlertDeleteManyArgsSchema: z.ZodType<Prisma.EmergencyAlertDeleteManyArgs> = z.object({
  where: EmergencyAlertWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const StreakCreateArgsSchema: z.ZodType<Prisma.StreakCreateArgs> = z.object({
  select: StreakSelectSchema.optional(),
  include: StreakIncludeSchema.optional(),
  data: z.union([ StreakCreateInputSchema, StreakUncheckedCreateInputSchema ]),
}).strict();

export const StreakUpsertArgsSchema: z.ZodType<Prisma.StreakUpsertArgs> = z.object({
  select: StreakSelectSchema.optional(),
  include: StreakIncludeSchema.optional(),
  where: StreakWhereUniqueInputSchema, 
  create: z.union([ StreakCreateInputSchema, StreakUncheckedCreateInputSchema ]),
  update: z.union([ StreakUpdateInputSchema, StreakUncheckedUpdateInputSchema ]),
}).strict();

export const StreakCreateManyArgsSchema: z.ZodType<Prisma.StreakCreateManyArgs> = z.object({
  data: z.union([ StreakCreateManyInputSchema, StreakCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const StreakCreateManyAndReturnArgsSchema: z.ZodType<Prisma.StreakCreateManyAndReturnArgs> = z.object({
  data: z.union([ StreakCreateManyInputSchema, StreakCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const StreakDeleteArgsSchema: z.ZodType<Prisma.StreakDeleteArgs> = z.object({
  select: StreakSelectSchema.optional(),
  include: StreakIncludeSchema.optional(),
  where: StreakWhereUniqueInputSchema, 
}).strict();

export const StreakUpdateArgsSchema: z.ZodType<Prisma.StreakUpdateArgs> = z.object({
  select: StreakSelectSchema.optional(),
  include: StreakIncludeSchema.optional(),
  data: z.union([ StreakUpdateInputSchema, StreakUncheckedUpdateInputSchema ]),
  where: StreakWhereUniqueInputSchema, 
}).strict();

export const StreakUpdateManyArgsSchema: z.ZodType<Prisma.StreakUpdateManyArgs> = z.object({
  data: z.union([ StreakUpdateManyMutationInputSchema, StreakUncheckedUpdateManyInputSchema ]),
  where: StreakWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const StreakUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.StreakUpdateManyAndReturnArgs> = z.object({
  data: z.union([ StreakUpdateManyMutationInputSchema, StreakUncheckedUpdateManyInputSchema ]),
  where: StreakWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const StreakDeleteManyArgsSchema: z.ZodType<Prisma.StreakDeleteManyArgs> = z.object({
  where: StreakWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();