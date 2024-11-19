import { moveVehicle } from "../component/vehicleUtils"
import { expect, test } from "vitest";
import { PlayerInterface } from "../types/PlayerInterface";
import { Direction } from "../types/Direction";


test("moves angle right", () => {

    const oldVehicle:PlayerInterface = {
        id: 1,
        xPosition: 0,
        yPosition: 0,
        angle: 0,
        direction: Direction.Right,
        velocity: 0
    }
    const updatedVehicle = moveVehicle(oldVehicle)
    expect (updatedVehicle.angle).toBe(45)
})

test("moves angle left", () => {

    const oldVehicle:PlayerInterface = {
        id: 1,
        xPosition: 0,
        yPosition: 0,
        angle: 45,
        direction: Direction.Left,
        velocity: 0
    }
    const updatedVehicle = moveVehicle(oldVehicle)
    expect (updatedVehicle.angle).toBe(0)
})

test("moves down positive x axis", () => {

    const oldVehicle:PlayerInterface = {
        id: 1,
        xPosition: 0,
        yPosition: 0,
        angle: 90,
        direction: Direction.Straight,
        velocity: 1
    }

    const expectedVehicle:PlayerInterface = {
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
    const oldVehicle:PlayerInterface = {
        id: 1,
        xPosition: 0,
        yPosition: 0,
        angle: 45,
        direction: Direction.Straight,
        velocity: 1
    }
    const expectedVehicle:PlayerInterface = {
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
    const oldVehicle:PlayerInterface = {
        id: 1,
        xPosition: 0,
        yPosition: 0,
        angle: 225,
        direction: Direction.Straight,
        velocity: 1
    }
    const expectedVehicle:PlayerInterface = {
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
    const oldVehicle:PlayerInterface = {
        id: 1,
        xPosition: 0,
        yPosition: 0,
        angle: -45,
        direction: Direction.Straight,
        velocity: 1
    }
    const expectedVehicle:PlayerInterface = {
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
    const oldVehicle:PlayerInterface = {
        id: 1,
        xPosition: 0,
        yPosition: 0,
        angle: 0,
        direction: Direction.Straight,
        velocity: 2
    }
    const expectedVehicle:PlayerInterface = {
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
    const oldVehicle:PlayerInterface = {
        id: 1,
        xPosition: 0,
        yPosition: 0,
        angle: 90,
        direction: Direction.Straight,
        velocity: 2
    }
    const expectedVehicle:PlayerInterface = {
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