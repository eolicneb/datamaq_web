// src/entities/VisionStream.ts
// Entidad para tipar los datos de streams de visión artificial

export interface VisionStream {
  tipo: string;
  index: number;
  nombre?: string;
  descripcion?: string;
  [key: string]: any;
}
