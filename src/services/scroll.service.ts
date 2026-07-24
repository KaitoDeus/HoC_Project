import Lenis from "lenis";

export interface IScrollService {
  init(): Lenis | null;
  start(): void;
  stop(): void;
  scrollTo(target: number | string | HTMLElement, options?: { immediate?: boolean; duration?: number }): void;
  resize(): void;
  destroy(): void;
  getLenis(): Lenis | null;
}

type WindowWithLenis = Window & { lenis?: Lenis };

class ScrollService implements IScrollService {
  private static instance: ScrollService;
  private lenisInstance: Lenis | null = null;

  private constructor() {}

  public static getInstance(): ScrollService {
    if (!ScrollService.instance) {
      ScrollService.instance = new ScrollService();
    }
    return ScrollService.instance;
  }

  public init(): Lenis | null {
    if (typeof window === "undefined") return null;

    if (this.lenisInstance) {
      return this.lenisInstance;
    }

    this.lenisInstance = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.5,
    });

    (window as unknown as WindowWithLenis).lenis = this.lenisInstance;
    return this.lenisInstance;
  }

  public start(): void {
    const lenis = this.getLenis();
    lenis?.start();
  }

  public stop(): void {
    const lenis = this.getLenis();
    lenis?.stop();
  }

  public scrollTo(target: number | string | HTMLElement, options?: { immediate?: boolean; duration?: number }): void {
    const lenis = this.getLenis();
    if (lenis) {
      lenis.scrollTo(target, options);
    } else if (typeof window !== "undefined" && typeof target === "number") {
      window.scrollTo({
        top: target,
        behavior: options?.immediate ? ("instant" as ScrollBehavior) : "smooth",
      });
    }
  }

  public resize(): void {
    this.getLenis()?.resize();
  }

  public destroy(): void {
    if (this.lenisInstance) {
      this.lenisInstance.destroy();
      this.lenisInstance = null;
      if (typeof window !== "undefined") {
        delete (window as unknown as Record<string, unknown>).lenis;
      }
    }
  }

  public getLenis(): Lenis | null {
    if (typeof window !== "undefined") {
      const globalLenis = (window as unknown as WindowWithLenis).lenis;
      if (globalLenis) {
        return globalLenis;
      }
    }
    return this.lenisInstance;
  }
}

export const scrollService = ScrollService.getInstance();
