import { ElementType, RarityType, RoleType, ArtifactType, WeekDay } from '@/app/types';

export const validations = {
  elemento: (value: string): value is ElementType => {
    const elementos: ElementType[] = ['Electro', 'Pyro', 'Cryo', 'Hydro', 'Dendro', 'Anemo', 'Geo'];
    return elementos.includes(value as ElementType);
  },

  rareza: (value: string): value is RarityType => {
    return value === '4 estrellas' || value === '5 estrellas';
  },

  rol: (value: string): value is RoleType => {
    const roles: RoleType[] = ['DPS', 'SubDPS', 'Support', 'Healer', 'Buffer', 'Enabler'];
    return roles.includes(value as RoleType);
  },

  tipoArtefacto: (value: string): value is ArtifactType => {
    const tipos: ArtifactType[] = ['Flor', 'Pluma', 'Reloj', 'Cáliz', 'Corona'];
    return tipos.includes(value as ArtifactType);
  },

  diasDisponible: (value: string): value is WeekDay => {
    const dias: WeekDay[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    return dias.includes(value as WeekDay);
  },

  costoResina: (value: number): boolean => {
    return value > 0 && value <= 60;
  },

  adventureRank: (value: number): boolean => {
    return value > 0 && value <= 60;
  },

  recompensas: (value: string): boolean => {
    return value === 'artefactos' || value === 'materiales';
  }
};