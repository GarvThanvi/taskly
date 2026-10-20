import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  await db.task.deleteMany();
  const newTasks = await db.task.createMany({
    data: [
      {
        title: "Design Landing Page",
        notes:
          "Create wireframes and high-fidelity mockups for the new homepage.",
        priority: "high",
        done: false,
        dueDate: new Date("2026-10-25"), 
      },
      {
        title: "Team Sync Meeting",
        notes: "Weekly catch-up with marketing and engineering teams.",
        priority: "medium",
        done: false,
        dueDate: new Date("2026-10-21"),
      },
      {
        title: "Fix Bug #402",
        notes:
          "Resolve the checkout session crash error reported in production.",
        priority: "low",
        done: false,
        dueDate: new Date("2026-10-20"),
      },
      {
        title: "Update Documentation",
        notes:
          "Add API endpoint updates for the newly introduced microservices.",
        priority: "low",
        done: false,
        dueDate: new Date("2026-10-30"),
      },
      {
        title: "Review Pull Requests",
        notes: "Approve open PRs for the authentication middleware refactor.",
        priority: "medium",
        done: false,
        dueDate: new Date("2026-10-22"),
      },
    ],
  });
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
