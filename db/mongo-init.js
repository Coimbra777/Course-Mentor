db = db.getSiblingDB("mentor_stats");

db.createUser({
  user: "root",
  pwd: "password",
  roles: [
    {
      role: "dbOwner",
      db: "mentor_stats",
    },
  ],
});
