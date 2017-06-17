// Implementation of the Standard SNES Gamepad as defined by
// the W3C specification: https://w3c.github.io/gamepad/.

/// <reference path="GamepadMapping.ts" />

namespace VictorySoftworks.IO.Gamepad.StandardGamepad {
  export class StandardGamepadMapping implements GamepadMapping {
    public leftJoystickIsPressed(gamepad: Gamepad): boolean {
      return gamepad.buttons[10].pressed;
    }

    public leftJoystickIsMovedUp(gamepad: Gamepad): boolean {
      return parseFloat(gamepad.axes[1].toFixed(1)) < 0;
    }

    public leftJoystickIsMovedDown(gamepad: Gamepad): boolean {
      return parseFloat(gamepad.axes[1].toFixed(1)) > 0;
    }

    public getLeftJoystickVerticalMovementDegree(gamepad: Gamepad): number {
      return parseFloat(gamepad.axes[1].toFixed(1));
    }

    public leftJoystickIsMovedLeft(gamepad: Gamepad): boolean {
      return parseFloat(gamepad.axes[0].toFixed(1)) < 0;
    }

    public leftJoystickIsMovedRight(gamepad: Gamepad): boolean {
      return parseFloat(gamepad.axes[0].toFixed(1)) > 0;
    }

    public getLeftJoystickHorizontalMovementDegree(gamepad: Gamepad): number {
      return parseFloat(gamepad.axes[0].toFixed(1));
    }

    public rightJoystickIsPressed(gamepad: Gamepad): boolean {
      return gamepad.buttons[11].pressed;
    }

    public rightJoystickIsMovedUp(gamepad: Gamepad): boolean {
      return parseFloat(gamepad.axes[3].toFixed(1)) < 0;
    }

    public rightJoystickIsMovedDown(gamepad: Gamepad): boolean {
      return parseFloat(gamepad.axes[3].toFixed(1)) > 0;
    }

    public getRightJoystickVerticalMovementDegree(gamepad: Gamepad): number {
      return parseFloat(gamepad.axes[3].toFixed(1));
    }

    public rightJoystickIsMovedLeft(gamepad: Gamepad): boolean {
      return parseFloat(gamepad.axes[2].toFixed(1)) < 0;
    }

    public rightJoystickIsMovedRight(gamepad: Gamepad): boolean {
      return parseFloat(gamepad.axes[2].toFixed(1)) > 0;
    }

    public getRightJoystickHorizontalMovementDegree(gamepad: Gamepad): number {
      return parseFloat(gamepad.axes[2].toFixed(1));
    }

    public upButtonIsPressed(gamepad: Gamepad): boolean {
      return gamepad.buttons[12].pressed;
    }

    public downButtonIsPressed(gamepad: Gamepad): boolean {
      return gamepad.buttons[13].pressed;
    }

    public leftButtonIsPressed(gamepad: Gamepad): boolean {
      return gamepad.buttons[14].pressed;
    }

    public rightButtonIsPressed(gamepad: Gamepad): boolean {
      return gamepad.buttons[15].pressed;
    }

    public AButtonIsPressed(gamepad: Gamepad): boolean {
      return gamepad.buttons[0].pressed;
    }

    public BButtonIsPressed(gamepad: Gamepad): boolean {
      return gamepad.buttons[1].pressed;
    }

    public XButtonIsPressed(gamepad: Gamepad): boolean {
      return gamepad.buttons[2].pressed;
    }

    public YButtonIsPressed(gamepad: Gamepad): boolean {
      return gamepad.buttons[3].pressed;
    }

    public leftBumperIsPressed(gamepad: Gamepad): boolean {
      return gamepad.buttons[4].pressed;
    }

    public leftTriggerIsPressed(gamepad: Gamepad): boolean {
      return gamepad.buttons[6].pressed;
    }

    public rightBumperIsPressed(gamepad: Gamepad): boolean {
      return gamepad.buttons[5].pressed;
    }

    public rightTriggerIsPressed(gamepad: Gamepad): boolean {
      return gamepad.buttons[7].pressed;
    }

    public selectButtonIsPressed(gamepad: Gamepad): boolean {
      return gamepad.buttons[8].pressed;
    }

    public startButtonIsPressed(gamepad: Gamepad): boolean {
      return gamepad.buttons[9].pressed;
    }

    public homeButtonIsPressed(gamepad: Gamepad): boolean {
      return gamepad.buttons[16].pressed;
    }
  }
}
