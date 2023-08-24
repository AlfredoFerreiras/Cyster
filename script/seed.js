"use strict";

const {
  db,
  models: { User, Message, Safespace },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const [cody, murphy] = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  // console.log(`seeded ${users.length} users`);
  // console.log("users", users);

  const safespaces = await Promise.all([
    Safespace.create({ topic: "General Chat" }),
  ]);

  console.log(`seeded ${safespaces.length} safespaces`);

  const messages = await Promise.all([
    Message.create({
      content: "Hello from Cody!",
      userId: cody.id,
      safespaceId: safespaces[0].id,
    }),
    Message.create({
      content: "Hi Cody, Murphy here!",
      userId: murphy.id,
      safespaceId: safespaces[0].id,
    }),
  ]);

  console.log(`seeded ${messages.length} messages`);

  console.log(`seeded successfully`);
  return {
    users: {
      cody,
      murphy,
    },
    safespaces: {
      general: safespaces[0],
    },
    messages,
  };
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
