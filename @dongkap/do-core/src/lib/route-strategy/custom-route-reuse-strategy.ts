import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export interface RootHandler {
  handle: DetachedRouteHandle;
}

export class CustomRouteReuseStrategy implements RouteReuseStrategy {

  private handlers: { [key: string]: RootHandler } = {};
  private isAuthLock: boolean = false;

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return this.isDetachable(route);
  }

  store(route: ActivatedRouteSnapshot, handler: DetachedRouteHandle) {
    const storeKey = this.getResolvedUrl(route);
    if (handler) {
      this.handlers[storeKey] = {
        handle: handler
      };
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const storeKey = this.getResolvedUrl(route);
    if (this.isAttachableForLock(route, storeKey)) {
      return true;
    }
    return false;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    const storeKey = this.getResolvedUrl(route);
    return this.handlers[storeKey]?.handle;
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    current: ActivatedRouteSnapshot
  ): boolean {
    const previousURL = this.getResolvedUrl(current);
    if (previousURL.includes('auth')) {
      this.isAuthLock = true;
    } else {
      this.isAuthLock = false;
    }
    return future.routeConfig === current.routeConfig;
  }

  private getResolvedUrl(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
    .map((v) => v.url.map((segment) => segment.toString()).join('/'))
    .join('/').replace(new RegExp('//','g'), '/');
  }

  private isDetachable(route: ActivatedRouteSnapshot) {
    if (route?.routeConfig?.data?.reuse) {
      return true;
    }
    return false;
  }

  private isAttachableForLock(route: ActivatedRouteSnapshot, storeKey: string) {
    if (this.isDetachable(route) && this.handlers[storeKey]?.handle && this.isAuthLock) {
      return true;
    }
    return false;
  }
}
