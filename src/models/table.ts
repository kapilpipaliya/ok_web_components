export interface PersonProps {
  name: string;
  email?: string;
  title?: string;
  role?: string;
}

export interface TableProps {
  data: PersonProps[];
}
