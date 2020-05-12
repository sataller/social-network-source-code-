import React from "react";
import Status from "./Status";

describe("Profile Status component", () => {
    test("status from props should be in the state", () => {
        const button = create(<Status status="Test complete"/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("Test complete");
    });

    // test("status from props should be in the state", () => {
    //     const button = create(<Status status="Test complete"/>);
    //     const instance = component.getInstance();
    //     expect(instance.state.status).toBe("Test complete");
    // });

});