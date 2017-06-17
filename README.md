# Standard Gamepad

A TypeScript library providing a simple event handler interface for using standard USB gamepads (Xbox One/PS4) in HTML5 game projects.

For more on the :video_game: Gamepad API, see https://w3c.github.io/gamepad/ and https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API.

## Quick Start

The Standard Gamepad library allows you to bind callback functions to gamepad events, such as `onConnected` or `onStartButtonPressed`.

```javascript
import standardGamepad = VictorySoftworks.IO.Gamepad.StandardGamepad;

let mapping = new standardGamepad.StandardGamepadMapping();
let gamepad = new standardGamepad.StandardGamepad(navigator, window, mapping);

gamepad.onConnected(() => {
  console.log('Gamepad connected!');
});

gamepad.onDisconnected(() => {
  console.log('Gamepad disconnected.');
});

gamepad.onAButtonPressed(() => {
  console.log('Samus jumps into the air!');
});

gamepad.onLeftJoystickMovedRight((degree: number) => {
  console.log('Samus runs forward at ' + degree + ' speed!');
});

gamepad.enable();
```

## Method Reference

| Method                    | Parameters                           | Description                                                                                                                                                                                                                        |
|---------------------------|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| enable                    | None                                 | Enables a connected gamepad. If no gamepad is connected, the browser will wait for one to be connected before firing an `onConnected` event.                                                                                       |
| disable                   | None                                 | Disables a gamepad. The browser will stop listening for gamepad connections and button press events until `enable` is called.                                                                                                      |
| reset                     | None                                 | Disables a gamepad and clears all registered callbacks.                                                                                                                                                                            |
| onConnected               | `callback: () => void`               | Binds a callback function to execute when a gamepad is connected.                                                                                                                                                                  |
| onDisconnected            | `callback: () => void`               | Binds a callback function to execute when a gamepad is disconnected.                                                                                                                                                               |
| onLeftJoystickMovedUp     | `callback: (degree: number) => void` | Binds a callback function to execute when the left joystick is moved up. The browser will pass the degree to which the joystick is moved to the callback function, represented by a floating-point value between -0.1 and -1.0.    |
| onLeftJoystickMovedDown   | `callback: (degree: number) => void` | Binds a callback function to execute when the left joystick is moved down. The browser will pass the degree to which the joystick is moved to the callback function, represented by a floating-point value between 0.1 and 1.0.    |
| onLeftJoystickMovedLeft   | `callback: (degree: number) => void` | Binds a callback function to execute when the left joystick is moved left. The browser will pass the degree to which the joystick is moved to the callback function, represented by a floating-point value between -0.1 and -1.0.  |
| onLeftJoystickMovedRight  | `callback: (degree: number) => void` | Binds a callback function to execute when the left joystick is moved right. The browser will pass the degree to which the joystick is moved to the callback function, represented by a floating-point value between 0.1 and 1.0.   |
| OnLeftJoystickPressed     | `callback: () => void`               | Binds a callback function to execute when the left joystick is pressed down.                                                                                                                                                       |
| onRightJoystickMovedUp    | `callback: (degree: number) => void` | Binds a callback function to execute when the right joystick is moved up. The browser will pass the degree to which the joystick is moved to the callback function, represented by a floating-point value between -0.1 and -1.0.   |
| onRightJoystickMovedDown  | `callback: (degree: number) => void` | Binds a callback function to execute when the right joystick is moved down. The browser will pass the degree to which the joystick is moved to the callback function, represented by a floating-point value between 0.1 and 1.0.   |
| onRightJoystickMovedLeft  | `callback: (degree: number) => void` | Binds a callback function to execute when the right joystick is moved left. The browser will pass the degree to which the joystick is moved to the callback function, represented by a floating-point value between -0.1 and -1.0. |
| onRightJoystickMovedRight | `callback: (degree: number) => void` | Binds a callback function to execute when the right joystick is moved right. The browser will pass the degree to which the joystick is moved to the callback function, represented by a floating-point value between 0.1 and 1.0.  |
| OnRightJoystickPressed    | `callback: () => void`               | Binds a callback function to execute when the right joystick is pressed down.                                                                                                                                                      |
| onUpButtonPressed         | `callback: () => void`               | Binds a callback function to execute when the up button is pressed on the directional pad.                                                                                                                                         |
| onDownButtonPressed       | `callback: () => void`               | Binds a callback function to execute when the down button is pressed on the directional pad.                                                                                                                                       |
| onLeftButtonPressed       | `callback: () => void`               | Binds a callback function to execute when the left button is pressed on the directional pad.                                                                                                                                       |
| onRightButtonPressed      | `callback: () => void`               | Binds a callback function to execute when the right button is pressed on the directional pad.                                                                                                                                      |
| onAButtonPressed          | `callback: () => void`               | Binds a callback function to execute when the A button is pressed.                                                                                                                                                                 |
| onBButtonPressed          | `callback: () => void`               | Binds a callback function to execute when the B button is pressed.                                                                                                                                                                 |
| onXButtonPressed          | `callback: () => void`               | Binds a callback function to execute when the X button is pressed.                                                                                                                                                                 |
| onYButtonPressed          | `callback: () => void`               | Binds a callback function to execute when the Y button is pressed.                                                                                                                                                                 |
| onLeftBumperPressed       | `callback: () => void`               | Binds a callback function to execute when the left bumper is pressed.                                                                                                                                                              |
| onLeftTriggerPressed      | `callback: () => void`               | Binds a callback function to execute when the left trigger is pressed.                                                                                                                                                             |
| onRightBumperPressed      | `callback: () => void`               | Binds a callback function to execute when the right bumper is pressed.                                                                                                                                                             |
| onRightTriggerPressed     | `callback: () => void`               | Binds a callback function to execute when the right trigger is pressed.                                                                                                                                                            |
| onSelectButtonPressed     | `callback: () => void`               | Binds a callback function to execute when the select button is pressed.                                                                                                                                                            |
| onStartButtonPressed      | `callback: () => void`               | Binds a callback function to execute when the start button is pressed.                                                                                                                                                             |
| onHomeButtonPressed       | `callback: () => void`               | Binds a callback function to execute when the home button is pressed.                                                                                                                                                              |

## Single-Player Only

The Standard Gamepad library does not currently support multiple gamepads connected to the same computer.
