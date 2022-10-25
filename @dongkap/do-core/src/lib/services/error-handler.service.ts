import { ErrorHandler, Injectable} from '@angular/core';
import { EMPTY } from 'rxjs';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

  handleError(error: Error) {
    if (error.message) {
      if (error.message.includes('No loader found for file')) {
        return EMPTY;
      } else if ( error.message.includes('mousedown')     || error.message.includes('mousemove') ||
                  error.message.includes('mouseup')       || error.message.includes('mouseout') ||
                  error.message.includes('mousewheel')    || error.message.includes('DOMMouseScroll') ||
                  error.message.includes('dblclick')      || error.message.includes('touchstart') ||
                  error.message.includes('touchmove')     || error.message.includes('touchend')) {
        return EMPTY;
      }
    }
    throw error;
  }

}
