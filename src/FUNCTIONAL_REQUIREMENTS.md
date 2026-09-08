# Functional Requirements

## 1. Game Platform

* The game must run directly in a modern web browser.
* The game must not require installation.
* The game must be playable using a keyboard.
* The game must function without relying on cloud services or external backend infrastructure.

## 2. Player Character

* The player must control McSquishy, the main character.
* McSquishy must be able to:

  * Move left.
  * Move right.
  * Jump.
* McSquishy must be affected by gravity.
* McSquishy must collide with platforms, walls, and other solid objects.
* The character must not be able to move through solid objects.

## 3. Level

* The game must contain at least one playable side-scrolling level.
* The level must contain:

  * Platforms.
  * Obstacles.
  * Hazards.
  * A defined starting position.
  * A defined end goal.
* The game view must follow the player as they move through the level.
* The player must be prevented from moving outside the intended playable area.

## 4. Hazards and Failure

* The level must contain hazards that the player must avoid.
* Contact with a hazard must cause the player to fail or lose a life.
* Falling outside the playable level must count as a failure.
* After failure, the player must be able to restart from the beginning of the level or from a defined checkpoint.

## 5. Level Completion

* The level must contain a clearly identifiable goal or finish point.
* Reaching the goal must complete the level.
* The game must inform the player when the level has been completed.
* The player must be able to restart the game after completing the level.

## 6. Game States

The game must support the following states:

* Start screen.
* Playing.
* Paused.
* Game over / failure.
* Level completed.

The player must be able to start a game from the start screen.

The player must be able to restart the game after either failing or completing the level.

## 7. User Interface

* The game must display a start screen before gameplay begins.
* The game must provide basic instructions explaining the controls.
* The game must provide visual feedback when the player:

  * Takes damage or fails.
  * Reaches the level goal.
  * Restarts the game.

## 8. Controls

The default keyboard controls must include:

* Left movement.
* Right movement.
* Jump.
* Pause.

The controls should use commonly recognised keys such as the arrow keys, WASD, and Space.
