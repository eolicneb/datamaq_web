// src/use_cases/GetVisionArtificialSnapshot.ts
// Caso de uso para obtener snapshot de visión artificial

import { VisionArtificialGateway } from '../interface_adapters/gateway/VisionArtificialGateway';
import type { VisionStream } from '../entities/VisionStream';

export class GetVisionArtificialSnapshot {
  private gateway: VisionArtificialGateway;

  constructor(gateway?: VisionArtificialGateway) {
    this.gateway = gateway || new VisionArtificialGateway();
  }

  async execute(stream: VisionStream): Promise<string> {
    // Aquí se pueden agregar reglas de negocio si es necesario
    return await this.gateway.takeSnapshot(stream);
  }
}
