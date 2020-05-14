export const actorByMoviesSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    movieTitle: {
      type: "string",
    },
  },
  required: ["movieTitle"],
  title: "Plan",
};

export const moviesByActorSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    actorName: {
      type: "string",
    },
  },
  required: ["actorName"],
  title: "Plan",
};
