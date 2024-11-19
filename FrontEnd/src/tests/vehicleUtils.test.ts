import { moveVehicle } from "../component/vehicleUtils"
import { expect, test } from "vitest";


test("moves direction", () => {
    expect (moveVehicle()).toBe(3);
})