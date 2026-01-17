// src/interface_adapters/controller/VisionArtificialController.ts
// Controlador para la lógica de visión artificial

import { VisionArtificialGateway } from '../gateway/VisionArtificialGateway';
import type { VisionStream } from '../../entities/VisionStream';

export class VisionArtificialController {
  private gateway: VisionArtificialGateway;

  constructor() {
    this.gateway = new VisionArtificialGateway();
  }

  async getStreams(): Promise<VisionStream[]> {
    return await this.gateway.fetchStreams();
  }

  getStreamUrl(stream: VisionStream, usarFiltro: boolean): string {
    return this.gateway.getStreamUrl(stream, usarFiltro);
  }

  async takeSnapshot(stream: VisionStream): Promise<string> {
    return await this.gateway.takeSnapshot(stream);
  }
}
