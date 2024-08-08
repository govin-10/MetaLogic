export type StackParamList = {
  PersonRegistration: undefined;
  Detail: {
    PersonData: PersonData;
  };
};

export interface PersonData {
  full_name: string;
  email: string;
  nickname?: string;
  photo: string;
  index: string;
  contact_number: string;
  birth_place: string;
  profession?: string;
  origin_place?: string;
  remarks_migration: string;
  status: 'Alive' | 'Dead' | 'Contactless';
  province: string;
  district: string;
  local_municipality: string;
  ward_no: number;
  dateOfBirth: Date;
}
