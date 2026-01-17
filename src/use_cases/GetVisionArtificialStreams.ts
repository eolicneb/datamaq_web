// src/use_cases/GetVisionArtificialStreams.ts
// Caso de uso para obtener streams de visión artificial

import { VisionArtificialGateway } from '../interface_adapters/gateway/VisionArtificialGateway';
import type { VisionStream } from '../entities/VisionStream';

export class GetVisionArtificialStreams {
  private gateway: VisionArtificialGateway;

  constructor(gateway?: VisionArtificialGateway) {
    this.gateway = gateway || new VisionArtificialGateway();
  }

  async execute(): Promise<VisionStream[]> {
    // Aquí se pueden agregar reglas de negocio si es necesario
    return await this.gateway.fetchStreams();
  }
}
