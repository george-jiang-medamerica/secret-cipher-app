export interface Cipher {
  id: string;
  name: string;
  icon: string;
  iconType?: 'emoji' | 'image'; // Type of icon: emoji (default) or custom image
  imageUri?: string; // URI for custom image icon
  mapping: { [key: string]: string };
  createdAt: number;
}

export interface EncodedMessage {
  message: string;
  cipherId: string;
}
