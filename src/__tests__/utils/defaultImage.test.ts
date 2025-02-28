import { defaultImage } from "@/utils/defaultImage";

test("defaultImage should set default character image on error", () => {
  const event = {
    currentTarget: { src: "" },
  } as React.SyntheticEvent<HTMLImageElement>;

  defaultImage(event);
  expect(event.currentTarget.src).toBe("/images/characters/default.jpg");
});