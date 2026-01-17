// src/interface_adapters/gateway/VisionArtificialGateway.ts
// Gateway para comunicación con la API de visión artificial
import type { VisionStream } from '../../entities/VisionStream';
import { VISION_ARTIFICIAL_API_URL } from '../../infrastructure/config';

export interface VisionStreamsResponse {
  usb: VisionStream[];
  wifi: VisionStream[];
  img: VisionStream[];
  url: VisionStream[];
}

export class VisionArtificialGateway {
  private baseUrl = VISION_ARTIFICIAL_API_URL;

  async fetchStreams(): Promise<VisionStream[]> {
    const res = await fetch(`${this.baseUrl}/streams`);
    if (!res.ok) throw new Error('No se pudo obtener la lista de streams');
    const text = await res.text();
    if (text.trim().startsWith('<')) throw new Error('Respuesta inesperada del backend');
    let data: VisionStreamsResponse;
    try {
      data = JSON.parse(text).data;
    } catch {
      throw new Error('Respuesta inválida del backend (no es JSON)');
    }
    return [
      ...data.usb.map(s => ({ ...s, tipo: 'usb' })),
      ...data.wifi.map(s => ({ ...s, tipo: 'wifi' })),
      ...data.img.map(s => ({ ...s, tipo: 'img' })),
      ...data.url.map(s => ({ ...s, tipo: 'url' }))
    ];
  }

  getStreamUrl(stream: VisionStream, usarFiltro: boolean): string {
    if (!stream) return '';
    if (stream.tipo == 'url') return (!stream.descripcion) ? '' : stream.descripcion;
    const tipoStream = usarFiltro ? 'filtro/stream.mjpg' : 'original/stream.mjpg';
    return `${this.baseUrl}/${stream.tipo}/${stream.index}/${tipoStream}`;
  }

  async takeSnapshot(stream: VisionStream): Promise<string> {
    if (!stream) throw new Error('No hay stream seleccionado');
    const url = `${this.baseUrl}/${stream.tipo}/${stream.index}/snapshot.jpg`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('No se pudo capturar frame');
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) throw new Error('Respuesta inesperada del backend');
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  }
}
