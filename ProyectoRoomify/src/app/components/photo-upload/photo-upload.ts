import { Component, model, signal } from '@angular/core';

const MAX_SIZE_MB = 2;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

@Component({
  selector: 'app-photo-upload',
  styleUrl: './photo-upload.css',
  templateUrl: './photo-upload.html',
})
export class PhotoUpload {
  // Imagen como data URL, o null si no hay foto. El padre la enlaza con [(photo)]
  readonly photo = model<string | null>(null);

  readonly error = signal('');
  readonly maxSizeMb = MAX_SIZE_MB;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    // Se vacía el input para poder volver a elegir el mismo archivo
    input.value = '';

    if (!file) {
      return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      this.error.set('Solo se admiten imágenes JPG, PNG o WebP.');
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      this.error.set(`La imagen no puede superar los ${MAX_SIZE_MB} MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.photo.set(reader.result as string);
      this.error.set('');
    };
    reader.onerror = () => this.error.set('No se ha podido leer la imagen.');
    reader.readAsDataURL(file);
  }

  remove() {
    this.photo.set(null);
    this.error.set('');
  }
}