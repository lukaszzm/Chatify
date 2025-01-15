import { it, describe, expect } from "vitest";

import { getSecondParticipant } from "./get-second-participant";

describe("getSecondParticipant", () => {
  it("should return the second participant", () => {
    const participants = [
      {
        id: "1",
        firstName: "John",
        lastName: "Smith",
      },
      {
        id: "2",
        firstName: "Jane",
        lastName: "Doe",
      },
    ];
    const myId = "1";

    const result = getSecondParticipant(participants, myId);

    expect(result).toEqual({
      id: "2",
      firstName: "Jane",
      lastName: "Doe",
    });
  });

  it("should throw an error if the second participant is not found", () => {
    const participants = [
      {
        id: "1",
        firstName: "John",
        lastName: "Smith",
      },
    ];
    const myId = "1";

    expect(() => getSecondParticipant(participants, myId)).toThrowError(
      "Second participant not found"
    );
  });
});
