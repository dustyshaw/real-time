import { moveVehicle } from "../component/vehicleUtils"
import { expect, test } from "vitest";
import { Vehicle } from "../types/PlayerInterface";
import { Direction } from "../types/Direction";


test("moves angle right", () => {
    const oldVehicle:Vehicle = {
        id: 1,
        xPosition: 0,
        yPosition: 0,
        angle: 0,
        direction: Direction.Right,
        velocity: 0
    }
    const expectedVehicle:Vehicle = {
        id: 1,
        xPosition: 0,
        yPosition: 0,
        angle: 2,
        direction: Direction.Right,
        velocity: 0
    }
    const updatedVehicle = moveVehicle(oldVehicle)
    expect (updatedVehicle.angle).toBe(2)
    expect (updatedVehicle).toEqual(expectedVehicle)

})

test("moves angle left", () => {
    const oldVehicle:Vehicle = {
        id: 1,
        xPosition: 0,
        yPosition: 0,
        angle: 45,
        direction: Direction.Left,
        velocity: 0
    }
    const expectedVehicle:Vehicle = {
        id: 1,
        xPosition: 0,
        yPosition: 0,
        angle: 43,
        direction: Direction.Left,
        velocity: 0
    }
    const updatedVehicle = moveVehicle(oldVehicle)
    expect (updatedVehicle.angle).toBe(43)
    expect (updatedVehicle).toEqual(expectedVehicle)
})

test("moves down positive x axis", () => {

    const oldVehicle:Vehicle = {
        id: 1,
        xPosition: 0,
        yPosition: 0,
        angle: 90,
        direction: Direction.Straight,
        velocity: 1
    }

    const expectedVehicle:Vehicle = {
        id: 1,
        xPosition: 0,
        yPosition: 1,
        angle: 90,
        direction: Direction.Straight,
        velocity: 1
    }
    const updatedVehicle = moveVehicle(oldVehicle)
    expect (updatedVehicle).toEqual(expectedVehicle)
})

test("moves along 45 degree angle", () => {
    const oldVehicle:Vehicle = {
        id: 1,
        xPosition: 0,
        yPosition: 0,
        angle: 45,
        direction: Direction.Straight,
        velocity: 1
    }
    const expectedVehicle:Vehicle = {
        id: 1,
        xPosition: 1,
        yPosition: 1,
        angle: 45,
        direction: Direction.Straight,
        velocity: 1
    }
    const updatedVehicle = moveVehicle(oldVehicle)
    expect (updatedVehicle).toEqual(expectedVehicle)
})

test("moves along 225 degree angle", () => {
    const oldVehicle:Vehicle = {
        id: 1,
        xPosition: 0,
        yPosition: 0,
        angle: 225,
        direction: Direction.Straight,
        velocity: 1
    }
    const expectedVehicle:Vehicle = {
        id: 1,
        xPosition: -1,
        yPosition: -1,
        angle: 225,
        direction: Direction.Straight,
        velocity: 1
    }
    const updatedVehicle = moveVehicle(oldVehicle)
    expect (updatedVehicle).toEqual(expectedVehicle)
})

test("moves along -45 degree angle", () => {
    const oldVehicle:Vehicle = {
        id: 1,
        xPosition: 0,
        yPosition: 0,
        angle: -45,
        direction: Direction.Straight,
        velocity: 1
    }
    const expectedVehicle:Vehicle = {
        id: 1,
        xPosition: 1,
        yPosition: -1,
        angle: -45,
        direction: Direction.Straight,
        velocity: 1
    }
    const updatedVehicle = moveVehicle(oldVehicle)
    expect (updatedVehicle).toEqual(expectedVehicle)
})

test("accelerates along x axis", () => {
    const oldVehicle:Vehicle = {
        id: 1,
        xPosition: 0,
        yPosition: 0,
        angle: 0,
        direction: Direction.Straight,
        velocity: 2
    }
    const expectedVehicle:Vehicle = {
        id: 1,
        xPosition: 2,
        yPosition: 0,
        angle: 0,
        direction: Direction.Straight,
        velocity: 2
    }
    const updatedVehicle = moveVehicle(oldVehicle)
    expect (updatedVehicle).toEqual(expectedVehicle)
})

test("accelerates along y axise", () => {
    const oldVehicle:Vehicle = {
        id: 1,
        xPosition: 0,
        yPosition: 0,
        angle: 90,
        direction: Direction.Straight,
        velocity: 2
    }
    const expectedVehicle:Vehicle = {
        id: 1,
        xPosition: 0,
        yPosition: 2,
        angle: 90,
        direction: Direction.Straight,
        velocity: 2
    }
    const updatedVehicle = moveVehicle(oldVehicle)
    expect (updatedVehicle).toEqual(expectedVehicle)
})


test("accelerates along 45 angle", () => {
    const oldVehicle:Vehicle = {
        id: 1,
        xPosition: 0,
        yPosition: 0,
        angle: 45,
        direction: Direction.Straight,
        velocity: 10
    }
    const expectedVehicle:Vehicle = {
        id: 1,
        xPosition: 7,
        yPosition: 7,
        angle: 45,
        direction: Direction.Straight,
        velocity: 10
    }
    const updatedVehicle = moveVehicle(oldVehicle)
    expect (updatedVehicle).toEqual(expectedVehicle)
})