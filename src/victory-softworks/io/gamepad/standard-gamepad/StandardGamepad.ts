// For more on the Gamepad API, see https://w3c.github.io/gamepad/.

/// <reference path="StandardGamepadButton.ts" />
/// <reference path="StandardGamepadEventHandler.ts" />
/// <reference path="StandardGamepadMapping.ts" />

namespace VictorySoftworks.IO.Gamepad.StandardGamepad {
  export class StandardGamepad {
    private gamepad: Gamepad;
    private gamepadWasConnectedPreviousFrame: boolean = false;
    private buttonPressHandlers: Array<StandardGamepadEventHandler> = [];
    private listenerLoopAnimationFrame: number;
    private static readonly HANDLER_TRIGGER = 0;
    private static readonly HANDLER_CALLBACK = 1;

    constructor(private readonly navigator: Navigator,
      private readonly window: Window,
      private readonly mapping: StandardGamepadMapping) { }

    public enable(): void {
      this.startButtonPressListener();
    }

    public disable(): void {
      this.stopButtonPressListener();
    }

    public reset(): void {
      this.stopButtonPressListener();
      this.clearButtonPressHandlers();
    }

    private startButtonPressListener(): void {
      this.listenerLoopAnimationFrame = this.window.requestAnimationFrame(
        () => { this.buttonPressListener() }
      );
    }

    private stopButtonPressListener(): void {
      this.window.cancelAnimationFrame(this.listenerLoopAnimationFrame);
    }

    private clearButtonPressHandlers(): void {
      this.buttonPressHandlers = new Array<StandardGamepadEventHandler>();
    }

    private buttonPressListener(): void {
      this.getConnectedGamepad();

      if (this.gamepadIsConnected()) {
        this.handleGamepadInput();
      } else {
        this.handleDisconnectedGamepad();
      }

      this.startButtonPressListener();
    }

    private getConnectedGamepad(): void {
      this.gamepad = this.navigator.getGamepads()[0];
    }

    private gamepadIsConnected(): boolean {
      return this.gamepad !== null;
    }

    private handleGamepadInput(): void {
      if (!this.gamepadWasConnectedPreviousFrame) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnConnected);
        this.flagGamepadWasConnectedPreviousFrame(true);
      }

      if (this.mapping.leftJoystickIsPressed(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnLeftJoystickPressed);
      }

      if (this.mapping.leftJoystickIsMovedUp(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnLeftJoystickMovedUp,
          this.mapping.getLeftJoystickVerticalMovementDegree(this.gamepad));
      } else if (this.mapping.leftJoystickIsMovedDown(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnLeftJoystickMovedDown,
          this.mapping.getLeftJoystickVerticalMovementDegree(this.gamepad));
      }

      if (this.mapping.leftJoystickIsMovedLeft(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnLeftJoystickMovedLeft,
          this.mapping.getLeftJoystickHorizontalMovementDegree(this.gamepad));
      } else if (this.mapping.leftJoystickIsMovedRight(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnLeftJoystickMovedRight,
          this.mapping.getLeftJoystickHorizontalMovementDegree(this.gamepad));
      }

      if (this.mapping.rightJoystickIsPressed(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnRightJoystickPressed);
      }

      if (this.mapping.rightJoystickIsMovedUp(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnRightJoystickMovedUp,
          this.mapping.getRightJoystickVerticalMovementDegree(this.gamepad));
      } else if (this.mapping.rightJoystickIsMovedDown(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnRightJoystickMovedDown,
          this.mapping.getRightJoystickVerticalMovementDegree(this.gamepad));
      }

      if (this.mapping.rightJoystickIsMovedLeft(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnRightJoystickMovedLeft,
          this.mapping.getRightJoystickHorizontalMovementDegree(this.gamepad));
      } else if (this.mapping.rightJoystickIsMovedRight(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnRightJoystickMovedRight,
          this.mapping.getRightJoystickHorizontalMovementDegree(this.gamepad));
      }

      if (this.mapping.upButtonIsPressed(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnUpButtonPressed);
      } else if (this.mapping.downButtonIsPressed(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnDownButtonPressed);
      }

      if (this.mapping.leftButtonIsPressed(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnLeftButtonPressed);
      } else if (this.mapping.rightButtonIsPressed(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnRightButtonPressed);
      }

      if (this.mapping.AButtonIsPressed(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnAButtonPressed);
      }

      if (this.mapping.BButtonIsPressed(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnBButtonPressed);
      }

      if (this.mapping.XButtonIsPressed(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnXButtonPressed);
      }

      if (this.mapping.YButtonIsPressed(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnYButtonPressed);
      }

      if (this.mapping.leftBumperIsPressed(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnLeftBumperPressed);
      }

      if (this.mapping.leftTriggerIsPressed(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnLeftTriggerPressed);
      }

      if (this.mapping.rightBumperIsPressed(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnRightBumperPressed);
      }

      if (this.mapping.rightTriggerIsPressed(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnRightTriggerPressed);
      }

      if (this.mapping.selectButtonIsPressed(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnSelectButtonPressed);
      }

      if (this.mapping.startButtonIsPressed(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnStartButtonPressed);
      }

      if (this.mapping.homeButtonIsPressed(this.gamepad)) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnHomeButtonPressed);
      }
    }

    private executeButtonPressHandlers(trigger: StandardGamepadEvent, degree?: number) {
      this.buttonPressHandlersByEventType(trigger).forEach(
        handler => handler[StandardGamepad.HANDLER_CALLBACK](degree)
      );
    }

    private buttonPressHandlersByEventType(trigger: StandardGamepadEvent) {
      return this.buttonPressHandlers.filter(
        handler => handler[StandardGamepad.HANDLER_TRIGGER] == trigger
      );
    }

    private handleDisconnectedGamepad(): void {
      if (this.gamepadWasConnectedPreviousFrame) {
        this.executeButtonPressHandlers(StandardGamepadEvent.OnDisconnected);
        this.flagGamepadWasConnectedPreviousFrame(false);
      }
    }

    private flagGamepadWasConnectedPreviousFrame(wasConnected: boolean) {
      this.gamepadWasConnectedPreviousFrame = wasConnected;
    }

    public onConnected(callback: () => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnConnected, callback);
    }

    public onDisconnected(callback: () => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnDisconnected, callback);
    }

    public onLeftJoystickPressed(callback: () => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnLeftJoystickPressed, callback);
    }

    public onLeftJoystickMovedUp(callback: (degree: number) => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnLeftJoystickMovedUp, callback);
    }

    public onLeftJoystickMovedDown(callback: (degree: number) => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnLeftJoystickMovedDown, callback);
    }

    public onLeftJoystickMovedLeft(callback: (degree: number) => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnLeftJoystickMovedLeft, callback);
    }

    public onLeftJoystickMovedRight(callback: (degree: number) => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnLeftJoystickMovedRight, callback);
    }

    public onRightJoystickPressed(callback: () => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnRightJoystickPressed, callback);
    }

    public onRightJoystickMovedUp(callback: (degree: number) => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnRightJoystickMovedUp, callback);
    }

    public onRightJoystickMovedDown(callback: (degree: number) => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnRightJoystickMovedDown, callback);
    }

    public onRightJoystickMovedLeft(callback: (degree: number) => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnRightJoystickMovedLeft, callback);
    }

    public onRightJoystickMovedRight(callback: (degree: number) => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnRightJoystickMovedRight, callback);
    }

    public onUpButtonPressed(callback: () => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnUpButtonPressed, callback);
    }

    public onDownButtonPressed(callback: () => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnDownButtonPressed, callback);
    }

    public onLeftButtonPressed(callback: () => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnLeftButtonPressed, callback);
    }

    public onRightButtonPressed(callback: () => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnRightButtonPressed, callback);
    }

    public onAButtonPressed(callback: () => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnAButtonPressed, callback);
    }

    public onBButtonPressed(callback: () => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnBButtonPressed, callback);
    }

    public onXButtonPressed(callback: () => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnXButtonPressed, callback);
    }

    public onYButtonPressed(callback: () => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnYButtonPressed, callback);
    }

    public onLeftBumperPressed(callback: () => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnLeftBumperPressed, callback);
    }

    public onLeftTriggerPressed(callback: () => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnLeftTriggerPressed, callback);
    }

    public onRightBumperPressed(callback: () => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnRightBumperPressed, callback);
    }

    public onRightTriggerPressed(callback: () => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnRightTriggerPressed, callback);
    }

    public onSelectButtonPressed(callback: () => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnSelectButtonPressed, callback);
    }

    public onStartButtonPressed(callback: () => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnStartButtonPressed, callback);
    }

    public onHomeButtonPressed(callback: () => void): void {
      this.registerButtonPressHandler(StandardGamepadEvent.OnHomeButtonPressed, callback);
    }

    private registerButtonPressHandler(trigger: StandardGamepadEvent, callback: (degree?: number) => void): void {
      this.buttonPressHandlers.push([trigger, callback]);
    }

    public getPressedButtons(): Array<StandardGamepadButton> {
      this.getConnectedGamepad();

      let pressedButtons = new Array<StandardGamepadButton>();

      if (this.gamepadIsConnected()) {
        if (this.mapping.leftJoystickIsPressed(this.gamepad)) {
          pressedButtons.push(StandardGamepadButton.LeftJoystick);
        }

        if (this.mapping.rightJoystickIsPressed(this.gamepad)) {
          pressedButtons.push(StandardGamepadButton.RightJoystick);
        }

        if (this.mapping.upButtonIsPressed(this.gamepad)) {
          pressedButtons.push(StandardGamepadButton.Up);
        }

        if (this.mapping.downButtonIsPressed(this.gamepad)) {
          pressedButtons.push(StandardGamepadButton.Down);
        }

        if (this.mapping.leftButtonIsPressed(this.gamepad)) {
          pressedButtons.push(StandardGamepadButton.Left);
        }

        if (this.mapping.rightButtonIsPressed(this.gamepad)) {
          pressedButtons.push(StandardGamepadButton.Right);
        }

        if (this.mapping.AButtonIsPressed(this.gamepad)) {
          pressedButtons.push(StandardGamepadButton.A);
        }

        if (this.mapping.BButtonIsPressed(this.gamepad)) {
          pressedButtons.push(StandardGamepadButton.B);
        }

        if (this.mapping.XButtonIsPressed(this.gamepad)) {
          pressedButtons.push(StandardGamepadButton.X);
        }

        if (this.mapping.YButtonIsPressed(this.gamepad)) {
          pressedButtons.push(StandardGamepadButton.Y);
        }

        if (this.mapping.leftBumperIsPressed(this.gamepad)) {
          pressedButtons.push(StandardGamepadButton.LeftBumper);
        }

        if (this.mapping.leftTriggerIsPressed(this.gamepad)) {
          pressedButtons.push(StandardGamepadButton.LeftTrigger);
        }

        if (this.mapping.rightBumperIsPressed(this.gamepad)) {
          pressedButtons.push(StandardGamepadButton.RightBumper);
        }

        if (this.mapping.rightTriggerIsPressed(this.gamepad)) {
          pressedButtons.push(StandardGamepadButton.RightTrigger);
        }

        if (this.mapping.startButtonIsPressed(this.gamepad)) {
          pressedButtons.push(StandardGamepadButton.Start);
        }

        if (this.mapping.selectButtonIsPressed(this.gamepad)) {
          pressedButtons.push(StandardGamepadButton.Select);
        }

        if (this.mapping.homeButtonIsPressed(this.gamepad)) {
          pressedButtons.push(StandardGamepadButton.Home);
        }
      }

      return pressedButtons;
    }

    public getJoystickPositions(): object {
      this.getConnectedGamepad();

      if (this.gamepadIsConnected()) {
        return {
          'left': {
            'horizontal': this.mapping.getLeftJoystickHorizontalMovementDegree(this.gamepad),
            'vertical': this.mapping.getLeftJoystickVerticalMovementDegree(this.gamepad)
          },
          'right': {
            'horizontal': this.mapping.getRightJoystickHorizontalMovementDegree(this.gamepad),
            'vertical': this.mapping.getRightJoystickVerticalMovementDegree(this.gamepad)
          }
        };
      } else {
        return {};
      }
    }
  }
}
