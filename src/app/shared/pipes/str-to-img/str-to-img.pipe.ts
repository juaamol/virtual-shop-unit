import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strToImg',
})
export class StrToImgPipe implements PipeTransform {
  transform(srcs: string[], alt?: string): { image: string; name?: string }[] {
    return srcs.map((src) => ({ image: src, name: alt }));
  }
}
