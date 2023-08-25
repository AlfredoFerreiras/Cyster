"use strict";

const {
  db,
  models: { User, Message, Safespace, GYNDoctor },
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
      content: "Hello I'm Cody and this is the Hub",
      userId: cody.id,
      safespaceId: safespaces[0].id,
    }),
    Message.create({
      content:
        "Hey! I'm murphy and here you can share your thoughts without judgement from the world!",
      userId: murphy.id,
      safespaceId: safespaces[0].id,
    }),
  ]);

  const [Jane, John] = await Promise.all([
    GYNDoctor.create({
      name: "Dr. Jane Smith",
      address: "123 Health St, Wellville, 12345",
      phone: "(123) 456-7890",
      website: "www.drjanesmith.com",
    }),
    GYNDoctor.create({
      name: "Dr. John Doe",
      address: "456 Med Lane, Curetown, 67890",
      phone: "(234) 567-8901",
      website: "www.drjohndoe.com",
    }),
  ]);

  console.log(`seeded ${GYNDoctor.length} GYN doctors`);

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

    GYNDoctor: {
      Jane,
      John,
    },
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
