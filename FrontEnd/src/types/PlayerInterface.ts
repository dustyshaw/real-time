import { Direction } from "./Direction";

export interface PlayerInterface {
    id: number,
    xPosition: number,
    yPosition: number,
    angle: number,
    direction: Direction,
    velocity: number
}