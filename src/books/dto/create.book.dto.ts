export class CreateBookDto {
  readonly title: string;
  readonly description: string;
  readonly authors: string[];
  readonly favorite?: boolean;
  readonly filecover?: string;
  readonly fileName?: string;
  readonly originalNameFileCover?: string;
  readonly originalNameFileName?: string;
}
