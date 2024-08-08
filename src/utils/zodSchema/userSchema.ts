import {z} from 'zod';

const allowedIndex = ['3rd Child', '2nd Child', '1st Child'];
const allowedProvinces = [
  'Province 1',
  'Province 2',
  'Province 3',
  'Province 4',
  'Province 5',
  'Province 6',
  'Province 7',
];
const allowedDistricts = [
  'Kathmandu',
  'Bhaktapur',
  'Lalitpur',
  'Nuwakot',
  'Kavre',
  'Chitwan',
  'Jhapa',
];
const userSchema = z.object({
  full_name: z
    .string()
    .min(6, 'minium 6 characters')
    .max(30, 'maximum 30 characters required'),
  email: z.string().email('Invalid email address'),
  nickname: z.string().optional().default('Not set'),

  index: z.string().refine(val => allowedIndex.includes(val), {
    message: 'invalid index',
  }),
  photo: z.string(),
  birth_place: z.string().min(1, 'place name required'),
  profession: z.string().optional(),
  origin_place: z.string().optional(),
  migration: z.string().min(1, 'elaborate on your migration'),
  status: z.enum(['Alive', 'Dead', 'Contactless']),
  contact_number: z
    .string()
    .regex(
      /^\d{10}$/,
      'Contact number must be exactly 10 digits and in numbers',
    ),
  dateOfBirth: z.date(),
  province: z.string().refine(val => allowedProvinces.includes(val), {
    message: 'invalid index',
  }),
  district: z.string().refine(val => allowedDistricts.includes(val), {
    message: 'invalid index',
  }),
  local_municipality: z.string().min(1, 'Municipality is required'),
  ward_no: z.number().min(1, 'Invalid ward no').max(20, 'Invalid ward no'),
});

export default userSchema;
