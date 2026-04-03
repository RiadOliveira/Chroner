type HandlePressProps = {
  onSingleTap?(): void;
  onDoubleTap?(): void;
};

export class TapHandler {
  private static readonly TAP_TIMEOUT = 200;
  private static timer: NodeJS.Timeout | undefined = undefined;

  public static handlePress({ onSingleTap, onDoubleTap }: HandlePressProps) {
    const startedTimer = !!this.timer;
    clearTimeout(this.timer);

    if (startedTimer) {
      this.resetTimer();
      return onDoubleTap?.();
    }

    this.timer = setTimeout(() => {
      this.resetTimer();
      onSingleTap?.();
    }, this.TAP_TIMEOUT);
  }

  private static resetTimer() {
    this.timer = undefined;
  }
}
