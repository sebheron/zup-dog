type MustDeclare<T> = {
  [K in keyof T]-?: undefined extends T[K] ? NonNullable<T[K]> | null : T[K];
};

export default MustDeclare;
