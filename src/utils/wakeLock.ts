// Screen Wake Lock manager to keep smartphone screen on during gym rest timers and workouts
class WakeLockManager {
  private sentinel: any = null;
  private isRequested: boolean = false;

  async requestWakeLock(): Promise<boolean> {
    this.isRequested = true;
    if (typeof navigator === 'undefined' || !('wakeLock' in navigator)) {
      return false;
    }

    try {
      if (!this.sentinel || this.sentinel.released) {
        this.sentinel = await (navigator as any).wakeLock.request('screen');
        this.sentinel.addEventListener('release', () => {
          this.sentinel = null;
        });
      }
      return true;
    } catch (err) {
      console.warn('Wake Lock request error:', err);
      return false;
    }
  }

  releaseWakeLock() {
    this.isRequested = false;
    if (this.sentinel && !this.sentinel.released) {
      try {
        this.sentinel.release();
      } catch {
        // Ignore release error
      }
      this.sentinel = null;
    }
  }

  // Re-acquire if page became visible again and user still had rest timer active
  handleVisibilityChange(isActive: boolean) {
    if (typeof document !== 'undefined' && document.visibilityState === 'visible' && (this.isRequested || isActive)) {
      this.requestWakeLock();
    }
  }
}

export const wakeLockManager = new WakeLockManager();
