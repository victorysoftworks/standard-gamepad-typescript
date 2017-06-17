namespace VictorySoftworks.IO.Gamepad.StandardGamepad {
  export interface GamepadMapping {
    leftJoystickIsPressed(gamepad: Gamepad): boolean;
    leftJoystickIsMovedUp(gamepad: Gamepad): boolean;
    leftJoystickIsMovedDown(gamepad: Gamepad): boolean;
    leftJoystickIsMovedLeft(gamepad: Gamepad): boolean;
    leftJoystickIsMovedRight(gamepad: Gamepad): boolean;
    getLeftJoystickVerticalMovementDegree(gamepad: Gamepad): number;
    rightJoystickIsPressed(gamepad: Gamepad): boolean;
    rightJoystickIsMovedUp(gamepad: Gamepad): boolean;
    rightJoystickIsMovedDown(gamepad: Gamepad): boolean;
    rightJoystickIsMovedLeft(gamepad: Gamepad): boolean;
    rightJoystickIsMovedRight(gamepad: Gamepad): boolean;
    getRightJoystickVerticalMovementDegree(gamepad: Gamepad): number;
    upButtonIsPressed(gamepad: Gamepad): boolean;
    downButtonIsPressed(gamepad: Gamepad): boolean;
    leftButtonIsPressed(gamepad: Gamepad): boolean;
    rightButtonIsPressed(gamepad: Gamepad): boolean;
    AButtonIsPressed(gamepad: Gamepad): boolean;
    BButtonIsPressed(gamepad: Gamepad): boolean;
    XButtonIsPressed(gamepad: Gamepad): boolean;
    YButtonIsPressed(gamepad: Gamepad): boolean;
    leftBumperIsPressed(gamepad: Gamepad): boolean;
    leftTriggerIsPressed(gamepad: Gamepad): boolean;
    rightBumperIsPressed(gamepad: Gamepad): boolean;
    rightTriggerIsPressed(gamepad: Gamepad): boolean;
    selectButtonIsPressed(gamepad: Gamepad): boolean;
    startButtonIsPressed(gamepad: Gamepad): boolean;
    homeButtonIsPressed(gamepad: Gamepad): boolean;
  }
}
