import { Component, computed, model, signal } from '@angular/core';

const MAX_PHOTOS = 4;
const MAX_SIZE_MB = 2;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

@Component({
  selector: 'app-photo-gallery-upload',
  styleUrl: './photo-gallery-upload.css',
  templateUrl: './photo-gallery-upload.html',
})
export class PhotoGalleryUpload {

  readonly photos = model<string[]>([]);

  readonly error = signal('');
  readonly maxPhotos = MAX_PHOTOS;
  readonly maxSizeMb = MAX_SIZE_MB;
  readonly canAdd = computed(() => this.photos().length < MAX_PHOTOS);

  async onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    // Se vacía el input para poder volver a elegir el mismo archivo
    input.value = '';

    if (files.length === 0) {
      return;
    }

    let message = '';
    const valid: File[] = [];
    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        message = 'Solo se admiten imágenes JPG, PNG o WebP.';
      } else if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        message = `Cada imagen puede pesar como máximo ${MAX_SIZE_MB} MB.`;
      } else {
        valid.push(file);
      }
    }

    const free = MAX_PHOTOS - this.photos().length;
    if (valid.length > free) {
      message = `Solo se pueden adjuntar ${MAX_PHOTOS} fotos por incidencia.`;
    }

    try {
      const urls = await Promise.all(valid.slice(0, free).map(file => this.readFile(file)));
      this.photos.update(list => [...list, ...urls]);
    } catch {
      message = 'No se ha podido leer alguna de las imágenes.';
    }
    this.error.set(message);
  }

  remove(index: number) {
    this.photos.update(list => list.filter((_, i) => i !== index));
    this.error.set('');
  }

  private readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }
}
