import fs from "fs";
import path from "path";

const dbFile = path.join(process.cwd(), "data", "db.json");

function readDB() {
  const data = fs.readFileSync(dbFile, "utf8");
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
}

export default function handler(req, res) {
  const db = readDB();
  const goals = db.goals || [];

  if (req.method === "GET") {
    res.status(200).json(goals);
  }

  else if (req.method === "POST") {
    const newGoal = { id: Date.now().toString(), ...req.body, savedAmount: 0 };
    db.goals.push(newGoal);
    writeDB(db);
    res.status(201).json(newGoal);
  }

  else if (req.method === "PATCH") {
    const { id } = req.query;
    const index = db.goals.findIndex((g) => g.id === id);
    if (index === -1) return res.status(404).json({ error: "Goal not found" });

    db.goals[index] = { ...db.goals[index], ...req.body };
    writeDB(db);
    res.status(200).json(db.goals[index]);
  }

  else if (req.method === "DELETE") {
    const { id } = req.query;
    db.goals = db.goals.filter((g) => g.id !== id);
    writeDB(db);
    res.status(200).json({ message: "Deleted" });
  }

  else {
    res.status(405).end();
  }
}
