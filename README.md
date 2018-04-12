# Standard Gamepad

Version: `1.1.1`

A TypeScript library providing a simple interface for using standard USB gamepads (Xbox One/PS4) in HTML5 game projects.

For more on the :video_game: Gamepad API, see https://w3c.github.io/gamepad/ and https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API.

## Event Handler Interface

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

## Manually Reading Pressed Buttons and Joystick Positions

### Pressed Buttons

If you need to read the list of pressed gamepad buttons manually, you can do so with the `getPressedButtons` method.

```javascript
let pressedButtons = gamepad.getPressedButtons();
```

The `getPressedButtons` method returns an Array of `StandardGamepadButton` enumerated values representing each button that is currently pressed:

- `StandardGamepadButton.Up`
- `StandardGamepadButton.Down`
- `StandardGamepadButton.Left`
- `StandardGamepadButton.Right`
- `StandardGamepadButton.A`
- `StandardGamepadButton.B`
- `StandardGamepadButton.X`
- `StandardGamepadButton.Y`
- `StandardGamepadButton.LeftJoystick`
- `StandardGamepadButton.LeftTrigger`
- `StandardGamepadButton.LeftBumper`
- `StandardGamepadButton.RightJoystick`
- `StandardGamepadButton.RightTrigger`
- `StandardGamepadButton.RightBumper`
- `StandardGamepadButton.Select`
- `StandardGamepadButton.Start`
- `StandardGamepadButton.Home`

If no buttons are being pressed on the gamepad, or if there is no gamepad connected, this method returns an empty Array (`[]`).

#### Vanilla JavaScript

If you are using the compiled Standard Gamepad library in a vanilla JavaScript project, the enumerated values are cast to plain strings, such as `"Up"`, `"A"`, or `"Start"`.

### Joystick Positions

You can read the current joystick positions with the `getJoystickPositions` method.

```javascript
let joystickPositions = gamepad.getJoystickPositions();
```

The `getJoystickPositions` method returns a plain object representing the degree to which the left and right joysticks are moved.

The object returned from `getJoystickPositions` has the following structure:

```javascript
{
  'left': {
    'horizontal': number,
    'vertical': number
  },
  'right': {
    'horizontal': number,
    'vertical': number
  }
}
```

The degree of joystick movement is represented by a floating-point value between -1.0 (left/up) and 1.0 (right/down).

If neither joystick is being moved, the values will all be 0. If there is no gamepad connected, this method returns an empty object (`{}`).

### Check Gamepad State within Callbacks

You are encouraged to place your manual checking for button presses and joystick positions inside an `onConnected` callback, preferably within a `setInterval` or `requestAnimationFrame` function that can be cancelled if the `onDisconnected` callback fires.

## Method Reference

| Method                    | Parameters                           | Description                                                                                                                                                                                                                        |
|---------------------------|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| enable                    | None                                 | Enables a connected gamepad. If no gamepad is connected, the browser will wait for one to be connected before firing an `onConnected` event.                                                                                       |
| disable                   | None                                 | Disables a gamepad. The browser will stop listening for gamepad connections and button press events until `enable` is called.                                                                                                      |
| reset                     | None                                 | Disables a gamepad and clears all registered callbacks.                                                                                                                                                                            |
| getPressedButtons         | None                                 | Returns an array of `StandardGamepadButton` enumerated values representing which buttons are being pressed this frame (see above).                                                                                                 |
| getJoystickPositions      | None                                 | Returns a plain object representing the degree to which the left and right joystick are moved horizontally or vertically (see above).                                                                                              |
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
