import { Direction } from "./Direction";

export interface Vehicle {
    id: number,
    xPosition: number,
    yPosition: number,
    angle: number,
    direction: Direction,
    velocity: number
}