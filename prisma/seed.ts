import { prisma } from "../lib/prisma";

async function main() {
  console.log("🌱 Seeding DevLinks database...");

  // ─── USERS ────────────────────────────────────────────────────────────────

  const usersData = [
    {
      name: "Carlos Rakoto",
      email: "carlos@devlinks.io",
      username: "carlos_dev",
      bio: "Fullstack developer passionate about Next.js and mobile apps.",
      role: "Fullstack Developer",
      location: "Antananarivo, Madagascar",
      available: true,
      emailVerified: true,
    },
    {
      name: "Sophie Martin",
      email: "sophie.martin@devlinks.io",
      username: "sophiedev",
      bio: "Frontend engineer crafting beautiful UIs with React and Tailwind.",
      role: "Frontend Developer",
      location: "Paris, France",
      available: true,
      emailVerified: true,
    },
    {
      name: "Liam Johnson",
      email: "liam.johnson@devlinks.io",
      username: "liamj",
      bio: "Backend engineer focused on scalable APIs and cloud infrastructure.",
      role: "Backend Developer",
      location: "London, UK",
      available: false,
      emailVerified: true,
    },
    {
      name: "Yuki Tanaka",
      email: "yuki.tanaka@devlinks.io",
      username: "yukitanaka",
      bio: "Mobile developer building cross-platform apps with Flutter.",
      role: "Mobile Developer",
      location: "Tokyo, Japan",
      available: true,
      emailVerified: true,
    },
    {
      name: "Amara Diallo",
      email: "amara.diallo@devlinks.io",
      username: "amaradev",
      bio: "DevOps & fullstack engineer. Open source contributor.",
      role: "DevOps Engineer",
      location: "Dakar, Senegal",
      available: false,
      emailVerified: true,
    },
  ];

  // ─── SKILLS ───────────────────────────────────────────────────────────────

  const skillsData: Record<string, { name: string; level: number }[]> = {
    carlos_dev: [
      { name: "Next.js", level: 5 },
      { name: "TypeScript", level: 4 },
      { name: "React", level: 5 },
      { name: "Flutter", level: 3 },
      { name: "Prisma", level: 4 },
      { name: "PostgreSQL", level: 3 },
    ],
    sophiedev: [
      { name: "React", level: 5 },
      { name: "Tailwind CSS", level: 5 },
      { name: "TypeScript", level: 4 },
      { name: "Figma", level: 4 },
      { name: "Vue.js", level: 3 },
    ],
    liamj: [
      { name: "Node.js", level: 5 },
      { name: "Express", level: 5 },
      { name: "PostgreSQL", level: 5 },
      { name: "Docker", level: 4 },
      { name: "Redis", level: 4 },
      { name: "GraphQL", level: 3 },
    ],
    yukitanaka: [
      { name: "Flutter", level: 5 },
      { name: "Dart", level: 5 },
      { name: "React Native", level: 4 },
      { name: "Firebase", level: 4 },
      { name: "Swift", level: 3 },
    ],
    amaradev: [
      { name: "Docker", level: 5 },
      { name: "Kubernetes", level: 4 },
      { name: "CI/CD", level: 5 },
      { name: "Node.js", level: 4 },
      { name: "Terraform", level: 3 },
      { name: "Linux", level: 5 },
    ],
  };

  // ─── LINKS ────────────────────────────────────────────────────────────────

  const linksData: Record<string, { platform: string; url: string }[]> = {
    carlos_dev: [
      { platform: "GitHub", url: "https://github.com/carlos_dev" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/carlos_dev" },
      { platform: "Portfolio", url: "https://carlosdev.mg" },
    ],
    sophiedev: [
      { platform: "GitHub", url: "https://github.com/sophiedev" },
      { platform: "Twitter", url: "https://twitter.com/sophiedev" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/sophiemartin" },
    ],
    liamj: [
      { platform: "GitHub", url: "https://github.com/liamj" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/liamjohnson" },
    ],
    yukitanaka: [
      { platform: "GitHub", url: "https://github.com/yukitanaka" },
      { platform: "Twitter", url: "https://twitter.com/yukitanaka_dev" },
    ],
    amaradev: [
      { platform: "GitHub", url: "https://github.com/amaradev" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/amaradiallo" },
      { platform: "Portfolio", url: "https://amara.dev" },
    ],
  };

  // ─── PROJECTS ─────────────────────────────────────────────────────────────

  const projectsData: Record<
    string,
    { title: string; description: string; url: string; imageUrl?: string }[]
  > = {
    carlos_dev: [
      {
        title: "DevLinks",
        description:
          "A fullstack developer directory built with Next.js 14, Prisma, PostgreSQL, and shadcn/ui.",
        url: "https://devlinks.vercel.app",
        imageUrl: "https://placehold.co/600x400?text=DevLinks",
      },
      {
        title: "UtilityKit",
        description:
          "Android utility app featuring BMI calculator, currency converter, and multiplication tables.",
        url: "https://github.com/carlos_dev/utilitykit",
        imageUrl: "https://placehold.co/600x400?text=UtilityKit",
      },
      {
        title: "Météo App",
        description:
          "Weather app for Android using the Open-Meteo API with 7-day forecast and SVG icons.",
        url: "https://github.com/carlos_dev/meteo-app",
        imageUrl: "https://placehold.co/600x400?text=Météo",
      },
    ],
    sophiedev: [
      {
        title: "UIFlow",
        description:
          "A design system and component library built with React and Tailwind CSS.",
        url: "https://uiflow.sophiemartin.fr",
        imageUrl: "https://placehold.co/600x400?text=UIFlow",
      },
      {
        title: "Portfolify",
        description: "SaaS for creating beautiful developer portfolios in minutes.",
        url: "https://portfolify.dev",
        imageUrl: "https://placehold.co/600x400?text=Portfolify",
      },
    ],
    liamj: [
      {
        title: "APIForge",
        description: "REST API boilerplate with Node.js, Express, PostgreSQL, and JWT auth.",
        url: "https://github.com/liamj/apiforge",
        imageUrl: "https://placehold.co/600x400?text=APIForge",
      },
      {
        title: "QueueMaster",
        description:
          "Distributed job queue system built on Redis and Node.js for high-throughput workloads.",
        url: "https://github.com/liamj/queuemaster",
        imageUrl: "https://placehold.co/600x400?text=QueueMaster",
      },
    ],
    yukitanaka: [
      {
        title: "FlutterKit",
        description: "Starter template for Flutter apps with auth, routing, and state management.",
        url: "https://github.com/yukitanaka/flutterkit",
        imageUrl: "https://placehold.co/600x400?text=FlutterKit",
      },
      {
        title: "NearMe",
        description:
          "Location-based Flutter app that finds nearby events and places in real time.",
        url: "https://github.com/yukitanaka/nearme",
        imageUrl: "https://placehold.co/600x400?text=NearMe",
      },
    ],
    amaradev: [
      {
        title: "DockerFlow",
        description:
          "CLI tool to manage Docker Compose environments across multiple projects.",
        url: "https://github.com/amaradev/dockerflow",
        imageUrl: "https://placehold.co/600x400?text=DockerFlow",
      },
      {
        title: "PipelineX",
        description: "Open-source CI/CD pipeline builder with GitHub Actions integration.",
        url: "https://github.com/amaradev/pipelinex",
        imageUrl: "https://placehold.co/600x400?text=PipelineX",
      },
    ],
  };

  // ─── SEED ─────────────────────────────────────────────────────────────────

  for (const userData of usersData) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData,
    });

    console.log(`✅ User created: ${user.username}`);

    // Skills
    for (const skill of skillsData[user.username] ?? []) {
      await prisma.skill.upsert({
        where: { userId_name: { userId: user.id, name: skill.name } },
        update: { level: skill.level },
        create: { ...skill, userId: user.id },
      });
    }
    console.log(`   🎯 Skills seeded for ${user.username}`);

    // Links
    for (const link of linksData[user.username] ?? []) {
      await prisma.link.upsert({
        where: { userId_platform: { userId: user.id, platform: link.platform } },
        update: { url: link.url },
        create: { ...link, userId: user.id },
      });
    }
    console.log(`   🔗 Links seeded for ${user.username}`);

    // Projects
    for (const project of projectsData[user.username] ?? []) {
      await prisma.project.upsert({
        where: { userId_title: { userId: user.id, title: project.title } },
        update: {},
        create: { ...project, userId: user.id },
      });
    }
    console.log(`   📁 Projects seeded for ${user.username}`);
  }

  console.log("\n🎉 Seed complete! DevLinks is ready.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });