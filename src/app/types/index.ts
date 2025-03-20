export type ElementType = 'Electro' | 'Pyro' | 'Cryo' | 'Hydro' | 'Dendro' | 'Anemo' | 'Geo';
export type RarityType = '4 estrellas' | '5 estrellas';
export type RoleType = 'DPS' | 'SubDPS' | 'Support' | 'Healer' | 'Buffer' | 'Enabler';
export type ArtifactType = 'Flor' | 'Pluma' | 'Reloj' | 'Cáliz' | 'Corona';
export type WeekDay = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';

export interface Character {
  ID_personaje: number;
  Nombre: string;
  Elemento: ElementType;
  Rareza: RarityType;
  Arma: string;
  Rol: RoleType;
}

export interface Artifact {
  ID_artefacto: number;
  Nombre: string;
  Tipo: ArtifactType;
  Efecto: string;
}

export interface AscensionMaterial {
  ID_zona: number;
  ID_artefacto: number;
  Nombre_Artefacto: string;
  Dominio: string;
  Dias_Disponible: WeekDay;
  Costo_Resina: number;
}

export interface Build {
  UIDs: number;
  ID_build: number;
  ID_personaje: number;
  Artefacto_Flor: number;
  Artefacto_Pluma: number;
  Artefacto_Reloj: number;
  Artefacto_Caliz: number;
  Artefacto_Corona: number;
  Arma_Recomendada: string;
  Descripcion: string;
}

export interface ArtifactStats {
  ID_build: number;
  ID_artefacto: number;
  ID_stat: number;
  Nombre_Artefacto: string;
  Stat_principal: string;
  Mejor_SubStat1: string;
  Mejor_SubStat2: string;
}

export interface Domain {
  ID_dominio: number;
  Nombre: string;
  Recompensas: 'artefactos' | 'materiales';
  Requerimientos: string;
  Ubicacion: string;
}

export interface User {
  UIDs: number;
  Nombre: string;
  Correo: string;
  AR: number;
  Nivel_Mundo: number;
}